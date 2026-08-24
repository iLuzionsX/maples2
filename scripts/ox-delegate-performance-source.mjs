import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pickOxAlphaModel, readChatStream } from './ox-delegate.mjs';

const root = process.cwd();
const jobPath = path.join(root, '.ox', 'jobs', 'performance-ab-ox-20260824.json');
const outputDir = path.join(root, 'dist', '__ox');
const targetRelative = 'src/game/OxPerformancePass.js';
const NOUS_BASE_URL = 'https://inference-api.nousresearch.com/v1';

function clean(value, max = 4000) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max);
}

function readRegularFile(relativePath) {
  const absolute = path.resolve(root, relativePath);
  const prefix = `${fs.realpathSync(root)}${path.sep}`;
  const real = fs.realpathSync(absolute);
  if (!real.startsWith(prefix) || real !== absolute) throw new Error(`Unsafe Ox context path: ${relativePath}`);
  const stat = fs.statSync(real);
  if (!stat.isFile() || stat.size > 1_500_000) throw new Error(`Invalid Ox context file: ${relativePath}`);
  return fs.readFileSync(real, 'utf8');
}

function normalizeSource(output) {
  let text = String(output ?? '').replace(/\r\n/g, '\n').trim();
  const fenced = text.match(/^```(?:js|javascript)?\s*\n([\s\S]*?)\n```$/i);
  if (fenced) text = fenced[1].trim();
  if (!text || /```/.test(text)) throw new Error('Ox returned malformed source output.');
  if (Buffer.byteLength(text, 'utf8') > 180_000) throw new Error('Ox source output is unexpectedly large.');
  if (!/export\s+function\s+installOxPerformancePass\s*\(/.test(text)) throw new Error('Ox source must export installOxPerformancePass(game).');
  if (!/from\s+['"]three['"]/.test(text)) throw new Error('Ox source must use the existing Three.js module.');
  if (/\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/.test(text) || /https?:\/\//.test(text)) throw new Error('Ox source may not add network behavior.');
  if (/setPixelRatio\s*\(|shadowMap\.enabled\s*=\s*false|composer\s*=\s*null/.test(text)) throw new Error('Ox source attempted a forbidden quality reduction.');
  return `${text}\n`;
}

async function resolveModel(apiKey, requested, signal) {
  if (requested && requested !== 'auto:ox-alpha') return requested;
  const response = await fetch(`${NOUS_BASE_URL}/models`, { headers: { Authorization: `Bearer ${apiKey}` }, signal });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(clean(data?.error?.message || data?.message, 500) || `Model discovery failed (${response.status})`);
  const model = pickOxAlphaModel(data);
  if (!model) throw new Error('Ox Alpha is not visible to the configured Nous API key.');
  return model;
}

async function runAttempt(job, messages, apiKey, attempt) {
  const controller = new AbortController();
  const timeoutMs = Math.max(30_000, Math.min(240_000, Number(job.request_timeout_ms) || 180_000));
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  let connected = false;
  const heartbeat = setInterval(() => {
    console.log(`OX PERFORMANCE HEARTBEAT attempt=${attempt} elapsed=${Math.round((Date.now() - started) / 1000)}s connected=${connected}`);
  }, 20_000);
  heartbeat.unref?.();

  try {
    const model = await resolveModel(apiKey, job.model || 'auto:ox-alpha', controller.signal);
    const response = await fetch(`${NOUS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', Accept: 'text/event-stream' },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages,
        reasoning_effort: job.reasoning_effort || 'medium',
        include_reasoning: false,
        max_tokens: Number(job.max_tokens) || 7000,
        stream: true,
        tags: ['product=maples', 'workflow=ox-independent-performance-ab'],
      }),
    });
    if (!response.ok) {
      const raw = await response.text().catch(() => '');
      throw new Error(clean(raw, 1000) || `Nous request failed (${response.status})`);
    }
    const streamed = await readChatStream(response, () => {
      connected = true;
      console.log(`OX PERFORMANCE STREAM CONNECTED after ${Date.now() - started}ms`);
    });
    return { source: normalizeSource(streamed.text), model: clean(streamed.model || model, 160) };
  } finally {
    clearTimeout(timer);
    clearInterval(heartbeat);
  }
}

const context = process.env.CONTEXT || '';
if (context !== 'deploy-preview' && context !== 'branch-deploy' && process.env.OX_ALLOW_LOCAL !== '1') {
  throw new Error('Ox performance delegation is only allowed in preview/branch deploy contexts.');
}
const apiKey = clean(process.env.NOUS_API_KEY, 512);
if (apiKey.length < 20 || /\s/.test(apiKey)) throw new Error('NOUS_API_KEY is missing or invalid.');
const job = JSON.parse(fs.readFileSync(jobPath, 'utf8'));
if (!job.enabled) throw new Error('Ox performance source job is disabled.');
if (job.mode !== 'source-rewrite' || JSON.stringify(job.files) !== JSON.stringify([targetRelative])) {
  throw new Error('Ox performance job must be a single-file source rewrite.');
}

const targetSource = readRegularFile(targetRelative);
const contextFiles = Array.isArray(job.context_files) ? job.context_files : [];
let contextBytes = Buffer.byteLength(targetSource);
const contextText = contextFiles.map(relativePath => {
  const source = readRegularFile(relativePath);
  contextBytes += Buffer.byteLength(source);
  if (contextBytes > 1_000_000) throw new Error('Ox performance context exceeds 1 MB.');
  return `\n===== AUTHORITATIVE MAIN FILE: ${relativePath} =====\n${source}\n===== END FILE =====`;
}).join('\n');

const system = [
  'You are Ox Alpha, the independent B-side senior performance engineer for the Maples Three.js action-RPG.',
  'Choose your own optimization strategy from the supplied authoritative latest-main code. You have not seen the competing agent implementation.',
  'Return ONLY complete replacement JavaScript source for OxPerformancePass.js; no Markdown, diff, prose, tests, or invented external files.',
  'The file must import Three.js from three and export installOxPerformancePass(game). It may safely wrap/patch runtime methods, but must preserve exact gameplay and visible quality.',
  'Do not lower pixel ratio, disable post-processing/shadows, remove assets/effects/enemies, reduce environment density, or alter gameplay/camera/UI values.',
].join('\n');
const user = `TASK\n${job.task}\n\nCURRENT TARGET FILE\n${targetSource}\n\nLATEST-MAIN CONTEXT${contextText}`;
const messages = [{ role: 'system', content: system }, { role: 'user', content: user }];

const maxAttempts = Math.max(1, Math.min(3, Number(job.max_attempts) || 2));
const errors = [];
let generated;
for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  try {
    console.log(`OX PERFORMANCE ATTEMPT START ${attempt}/${maxAttempts}`);
    generated = await runAttempt(job, messages, apiKey, attempt);
    break;
  } catch (error) {
    const message = error?.name === 'AbortError' ? 'Ox performance request timed out.' : clean(error?.message || error, 1200);
    errors.push(message);
    console.error(`OX PERFORMANCE ATTEMPT FAIL ${attempt}/${maxAttempts}: ${message}`);
  }
}
if (!generated) throw new Error(`Ox performance generation failed: ${errors.join(' | ')}`);

fs.mkdirSync(outputDir, { recursive: true });
const result = {
  id: job.id,
  model: generated.model,
  mode: 'source-rewrite',
  reasoning_effort: job.reasoning_effort || 'medium',
  files: [targetRelative],
  context_files: contextFiles,
  changed_files: [targetRelative],
  verified: true,
  created_at: new Date().toISOString(),
  output_sha256: crypto.createHash('sha256').update(generated.source).digest('hex'),
  output: generated.source,
};
fs.writeFileSync(path.join(outputDir, `${job.id}.json`), JSON.stringify(result, null, 2));
fs.writeFileSync(path.join(outputDir, 'latest.json'), JSON.stringify({ generated_at: result.created_at, results: [result] }, null, 2));
console.log(`OX PERFORMANCE SOURCE PASS: ${result.model} ${result.output_sha256.slice(0, 12)}`);

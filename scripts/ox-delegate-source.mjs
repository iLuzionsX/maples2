import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pickOxAlphaModel, readChatStream } from './ox-delegate.mjs';

const root = process.cwd();
const jobPath = path.join(root, '.ox', 'jobs', 'graphics-realism-ox-pass.json');
const outDir = path.join(root, 'dist', '__ox');
const NOUS_BASE_URL = 'https://inference-api.nousresearch.com/v1';
const AUTO_MODEL = 'auto:ox-alpha';

function clean(value, max = 4000) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max);
}

function normalizeSource(output) {
  let text = String(output ?? '').replace(/\r\n/g, '\n').trim();
  const fenced = text.match(/^```(?:js|javascript)?\s*\n([\s\S]*?)\n```$/i);
  if (fenced) text = fenced[1].trim();
  if (!text) throw new Error('Ox returned empty source.');
  if (/```/.test(text)) throw new Error('Ox source contains an unexpected Markdown fence.');
  if (Buffer.byteLength(text, 'utf8') > 120_000) throw new Error('Ox source is unexpectedly large.');
  if (!/export\s+function\s+installOxGraphicsPass\s*\(/.test(text)) throw new Error('Ox source must export installOxGraphicsPass(game).');
  if (!/from\s+['"]three['"]/.test(text)) throw new Error('Ox source must use the existing Three.js module.');
  if (/\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/.test(text) || /https?:\/\//.test(text)) throw new Error('Ox source may not add network dependencies.');
  return `${text}\n`;
}

async function resolveModel(apiKey, requested, signal) {
  if (requested !== AUTO_MODEL) return requested;
  const response = await fetch(`${NOUS_BASE_URL}/models`, { headers: { Authorization: `Bearer ${apiKey}` }, signal });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(clean(data?.error?.message || data?.message, 500) || `model discovery failed (${response.status})`);
  const model = pickOxAlphaModel(data);
  if (!model) throw new Error('Ox Alpha is not visible to the configured Nous API key.');
  return model;
}

async function attempt(job, source, apiKey, attemptNo) {
  const controller = new AbortController();
  const timeoutMs = Math.max(30_000, Math.min(240_000, Number(job.request_timeout_ms) || 150_000));
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  let connected = false;
  const heartbeat = setInterval(() => {
    console.log(`OX SOURCE HEARTBEAT attempt=${attemptNo} elapsed=${Math.round((Date.now()-started)/1000)}s connected=${connected}`);
  }, 20_000);
  heartbeat.unref?.();

  try {
    const model = await resolveModel(apiKey, job.model || AUTO_MODEL, controller.signal);
    console.log(`OX SOURCE MODEL: ${model}`);
    const system = [
      'You are Ox Alpha acting as an independent senior real-time graphics/VFX designer for Maples.',
      'You own the B side of an A/B test against another model. Make your own visual decisions.',
      'Return ONLY the complete replacement JavaScript source for the supplied file. No Markdown, no diff, no prose.',
      'Preserve the exported installOxGraphicsPass(game) contract and all gameplay behavior.',
    ].join('\n');
    const user = `TASK\n${job.task}\n\nCURRENT FILE\n${source}`;
    const response = await fetch(`${NOUS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', Accept: 'text/event-stream' },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
        reasoning_effort: job.reasoning_effort || 'low',
        include_reasoning: false,
        max_tokens: Number(job.max_tokens) || 2200,
        stream: true,
        tags: ['product=maples', 'workflow=ox-ab-source-rewrite'],
      }),
    });
    if (!response.ok) {
      const raw = await response.text().catch(() => '');
      throw new Error(clean(raw, 1000) || `Nous request failed (${response.status})`);
    }
    const streamed = await readChatStream(response, () => {
      connected = true;
      console.log(`OX SOURCE STREAM CONNECTED after ${Date.now()-started}ms`);
    });
    const output = normalizeSource(streamed.text);
    return { output, model: clean(streamed.model || model, 160) };
  } finally {
    clearTimeout(timer);
    clearInterval(heartbeat);
  }
}

const context = process.env.CONTEXT || '';
if (context !== 'deploy-preview' && context !== 'branch-deploy' && process.env.OX_ALLOW_LOCAL !== '1') {
  throw new Error('Ox source delegation is only allowed in preview/branch deploy contexts.');
}
const apiKey = clean(process.env.NOUS_API_KEY, 512);
if (apiKey.length < 20 || /\s/.test(apiKey)) throw new Error('NOUS_API_KEY is missing or invalid.');
const job = JSON.parse(fs.readFileSync(jobPath, 'utf8'));
if (!job.enabled) throw new Error('Ox A/B source job is disabled.');
if (job.mode !== 'source-rewrite' || JSON.stringify(job.files) !== JSON.stringify(['src/game/OxGraphicsPass.js'])) {
  throw new Error('Ox A/B source job must be a single-file source-rewrite of OxGraphicsPass.js.');
}
const sourcePath = path.join(root, 'src', 'game', 'OxGraphicsPass.js');
const source = fs.readFileSync(sourcePath, 'utf8');
const maxAttempts = Math.max(1, Math.min(3, Number(job.max_attempts) || 2));
const errors = [];
let generated = null;
for (let i = 1; i <= maxAttempts; i++) {
  try {
    console.log(`OX SOURCE ATTEMPT START ${i}/${maxAttempts}`);
    generated = await attempt(job, source, apiKey, i);
    break;
  } catch (error) {
    const message = error?.name === 'AbortError' ? 'Ox source request timed out.' : clean(error?.message || error, 1200);
    errors.push(message);
    console.error(`OX SOURCE ATTEMPT FAIL ${i}/${maxAttempts}: ${message}`);
  }
}
if (!generated) throw new Error(`Ox source generation failed: ${errors.join(' | ')}`);

fs.mkdirSync(outDir, { recursive: true });
const result = {
  id: job.id,
  model: generated.model,
  mode: 'source-rewrite',
  reasoning_effort: job.reasoning_effort || 'low',
  files: job.files,
  changed_files: job.files,
  verified: true,
  created_at: new Date().toISOString(),
  output_sha256: crypto.createHash('sha256').update(generated.output).digest('hex'),
  output: generated.output,
};
fs.writeFileSync(path.join(outDir, `${job.id}.json`), JSON.stringify(result, null, 2));
console.log(`OX SOURCE DELEGATION PASS: ${result.model} ${result.output_sha256.slice(0,12)}`);

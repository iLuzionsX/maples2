import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const NOUS_BASE_URL = 'https://inference-api.nousresearch.com/v1';
const AUTO_MODEL = 'auto:ox-alpha';
const JOB_DIR = '.ox/jobs';
const OUTPUT_DIR = 'dist/__ox';
const MAX_FILE_BYTES = 1_500_000;
const MAX_TOTAL_BYTES = 6_000_000;

function cleanText(value, max = 20_000) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max);
}

export function extractChatText(response) {
  const content = response?.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content.trim();
  if (!Array.isArray(content)) return '';
  return content.map(part => {
    if (typeof part === 'string') return part;
    if (typeof part?.text === 'string') return part.text;
    return '';
  }).filter(Boolean).join('\n').trim();
}

export function pickOxAlphaModel(response) {
  const rows = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
  const ranked = rows.map(row => {
    const id = cleanText(row?.id || row?.model || row?.name, 160);
    const haystack = [id, row?.name, row?.display_name, row?.description].filter(Boolean).join(' ');
    let score = 0;
    if (/^stealth\/ox-alpha$/i.test(id)) score += 200;
    if (/(?:^|[\s/_:.-])ox[\s/_:.-]*alpha(?:$|[\s/_:.-])/i.test(haystack)) score += 140;
    if (/(?:^|[\s/_:.-])0x[\s/_:.-]*alpha(?:$|[\s/_:.-])/i.test(haystack)) score += 120;
    if (/ox/i.test(id) && /alpha/i.test(id)) score += 70;
    if (/0x/i.test(id) && /alpha/i.test(id)) score += 60;
    if (/:free\b/i.test(id) || /\bfree\b/i.test(haystack)) score += 5;
    return { id, score };
  }).filter(item => item.id && item.score > 0);
  ranked.sort((a, b) => b.score - a.score || a.id.length - b.id.length || a.id.localeCompare(b.id));
  return ranked[0]?.id || '';
}

function safeRelativePath(value) {
  const raw = cleanText(value, 300).replace(/\\/g, '/');
  if (!raw || raw.startsWith('/') || raw.includes('\0')) return '';
  const normalized = path.posix.normalize(raw);
  if (normalized === '..' || normalized.startsWith('../') || normalized.startsWith('.git/') || normalized === '.git') return '';
  return normalized;
}

export function validateJob(raw, fileName = 'job.json') {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error(`${fileName}: job must be an object`);
  const id = cleanText(raw.id || path.basename(fileName, path.extname(fileName)), 80);
  if (!/^[a-z0-9][a-z0-9._-]{0,79}$/i.test(id)) throw new Error(`${fileName}: invalid job id`);
  const task = cleanText(raw.task, 20_000);
  if (!task) throw new Error(`${fileName}: task is required`);
  const files = Array.isArray(raw.files) ? raw.files.map(safeRelativePath).filter(Boolean) : [];
  if (!files.length) throw new Error(`${fileName}: at least one valid file path is required`);
  if (files.length > 64) throw new Error(`${fileName}: too many files (max 64)`);
  if (new Set(files).size !== files.length) throw new Error(`${fileName}: duplicate file paths are not allowed`);
  const model = cleanText(raw.model || AUTO_MODEL, 160);
  if (!/^[a-zA-Z0-9._:/-]+$/.test(model)) throw new Error(`${fileName}: invalid model`);
  const maxTokens = Number.isFinite(Number(raw.max_tokens)) ? Math.trunc(Number(raw.max_tokens)) : 24_000;
  if (maxTokens < 256 || maxTokens > 64_000) throw new Error(`${fileName}: max_tokens must be 256..64000`);
  const mode = raw.mode === 'review' ? 'review' : 'patch';
  return { id, enabled: raw.enabled === true, task, files, model, maxTokens, mode };
}

export function readJobFiles(job, rootDir = process.cwd()) {
  let totalBytes = 0;
  return job.files.map(relativePath => {
    const absolutePath = path.resolve(rootDir, relativePath);
    const root = path.resolve(rootDir) + path.sep;
    if (!absolutePath.startsWith(root)) throw new Error(`${job.id}: path escaped repository root: ${relativePath}`);
    const stat = fs.statSync(absolutePath);
    if (!stat.isFile()) throw new Error(`${job.id}: not a file: ${relativePath}`);
    if (stat.size > MAX_FILE_BYTES) throw new Error(`${job.id}: file exceeds ${MAX_FILE_BYTES} bytes: ${relativePath}`);
    totalBytes += stat.size;
    if (totalBytes > MAX_TOTAL_BYTES) throw new Error(`${job.id}: selected files exceed ${MAX_TOTAL_BYTES} total bytes`);
    return { path: relativePath, content: fs.readFileSync(absolutePath, 'utf8') };
  });
}

export function buildMessages(job, files) {
  const outputRule = job.mode === 'review'
    ? 'Return a concise engineering review with concrete findings, risks, and exact recommended changes. Do not pretend to have run tests.'
    : 'Return ONLY a valid unified diff that can be applied from the repository root. Do not wrap the diff in Markdown fences. Preserve unrelated behavior.';
  const system = [
    'You are a senior software engineer delegated a tightly scoped task in the Maples Three.js browser action-RPG.',
    'Treat the supplied repository files as authoritative. Do not invent APIs or files you were not shown unless the task explicitly requires creating a new file.',
    'Prioritize correctness, integration safety, mobile/browser compatibility, performance, and preservation of working systems.',
    outputRule
  ].join('\n');
  const fileText = files.map(file => `\n===== FILE: ${file.path} =====\n${file.content}\n===== END FILE: ${file.path} =====`).join('\n');
  const user = `TASK\n${job.task}\n\nSELECTED REPOSITORY FILES${fileText}`;
  return [{ role: 'system', content: system }, { role: 'user', content: user }];
}

async function resolveModel(apiKey, requestedModel, signal) {
  if (requestedModel !== AUTO_MODEL) return requestedModel;
  const response = await fetch(`${NOUS_BASE_URL}/models`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    signal
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(cleanText(data?.error?.message || data?.message, 300) || `Nous model discovery failed (${response.status})`);
  const model = pickOxAlphaModel(data);
  if (!model) throw new Error('Ox Alpha is not visible to this Nous Portal API key.');
  return model;
}

async function runJob(job, rootDir, apiKey) {
  const files = readJobFiles(job, rootDir);
  const messages = buildMessages(job, files);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 180_000);
  try {
    const model = await resolveModel(apiKey, job.model, controller.signal);
    const response = await fetch(`${NOUS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages,
        max_tokens: job.maxTokens,
        stream: false,
        tags: ['product=maples', 'workflow=code-delegation']
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(cleanText(data?.error?.message || data?.message, 500) || `Nous request failed (${response.status})`);
    const text = extractChatText(data);
    if (!text) throw new Error('Nous returned no response text.');
    return {
      id: job.id,
      model: cleanText(data.model || model, 160),
      mode: job.mode,
      files: job.files,
      created_at: new Date().toISOString(),
      output: text
    };
  } finally {
    clearTimeout(timeout);
  }
}

function eligibleContext() {
  const context = process.env.CONTEXT || '';
  return context === 'deploy-preview' || context === 'branch-deploy' || process.env.OX_ALLOW_LOCAL === '1';
}

export async function main(rootDir = process.cwd()) {
  const jobDir = path.join(rootDir, JOB_DIR);
  if (!fs.existsSync(jobDir)) {
    console.log('OX DELEGATION SKIP: no job directory');
    return;
  }
  const jobs = fs.readdirSync(jobDir)
    .filter(name => name.endsWith('.json'))
    .sort()
    .map(name => {
      const raw = JSON.parse(fs.readFileSync(path.join(jobDir, name), 'utf8'));
      return validateJob(raw, name);
    })
    .filter(job => job.enabled);

  if (!jobs.length) {
    console.log('OX DELEGATION SKIP: no enabled jobs');
    return;
  }
  if (!eligibleContext()) throw new Error('Enabled Ox jobs are only allowed in Netlify deploy-preview/branch-deploy contexts.');

  const apiKey = cleanText(process.env.NOUS_API_KEY, 512);
  if (apiKey.length < 20 || /\s/.test(apiKey)) throw new Error('NOUS_API_KEY is missing or invalid in the Netlify environment.');

  const outputDir = path.join(rootDir, OUTPUT_DIR);
  fs.mkdirSync(outputDir, { recursive: true });
  const index = [];
  for (const job of jobs) {
    console.log(`OX DELEGATION START: ${job.id}`);
    const result = await runJob(job, rootDir, apiKey);
    const outputPath = path.join(outputDir, `${job.id}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    index.push({ id: result.id, model: result.model, mode: result.mode, file: `${result.id}.json` });
    console.log(`OX DELEGATION PASS: ${job.id} -> ${path.relative(rootDir, outputPath)}`);
  }
  fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify({ jobs: index }, null, 2));
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) {
  main().catch(error => {
    console.error(`OX DELEGATION FAIL: ${error?.message || error}`);
    process.exit(1);
  });
}

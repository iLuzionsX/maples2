import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export const NVIDIA_BASE_URL = (process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1').replace(/\/$/, '');
export const DEFAULT_MODEL = process.env.NVIDIA_MODEL || 'moonshotai/kimi-k3';
const JOB_DIR = '.kimi/jobs';
const OUTPUT_DIR = 'dist/__kimi';
const MAX_FILE_BYTES = 1_500_000;
const MAX_TOTAL_BYTES = 6_000_000;
const REQUEST_TIMEOUT_MS = 600_000;
const REASONING_EFFORTS = new Set(['low', 'medium', 'high', 'max']);
const MODES = new Set(['patch', 'review', 'css-override']);

function cleanText(value, max = 20_000) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max);
}

function contentText(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content.map(part => typeof part === 'string' ? part : typeof part?.text === 'string' ? part.text : typeof part?.content === 'string' ? part.content : '').join('');
}

function safeRelativePath(value) {
  const raw = cleanText(value, 300).replace(/\\/g, '/');
  if (!raw || raw.startsWith('/') || raw.includes('\0')) return '';
  const normalized = path.posix.normalize(raw);
  if (normalized === '..' || normalized.startsWith('../') || normalized === '.git' || normalized.startsWith('.git/')) return '';
  return normalized;
}

export function validateJob(raw, fileName = 'job.json') {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error(`${fileName}: job must be an object`);
  const id = cleanText(raw.id || path.basename(fileName, path.extname(fileName)), 80);
  if (!/^[a-z0-9][a-z0-9._-]{0,79}$/i.test(id) || id.toLowerCase() === 'index') throw new Error(`${fileName}: invalid job id`);
  const task = cleanText(raw.task, 20_000);
  if (!task) throw new Error(`${fileName}: task is required`);
  const files = Array.isArray(raw.files) ? raw.files.map(safeRelativePath).filter(Boolean) : [];
  if (!files.length || new Set(files).size !== files.length) throw new Error(`${fileName}: valid, unique files are required`);
  if (files.length > 64) throw new Error(`${fileName}: too many files (max 64)`);
  const mode = MODES.has(raw.mode) ? raw.mode : 'patch';
  const model = cleanText(raw.model || DEFAULT_MODEL, 160);
  if (!/^[a-zA-Z0-9._:/-]+$/.test(model)) throw new Error(`${fileName}: invalid model`);
  const reasoningEffort = REASONING_EFFORTS.has(raw.reasoning_effort) ? raw.reasoning_effort : 'max';
  const maxTokens = Number.isFinite(Number(raw.max_tokens)) ? Math.trunc(Number(raw.max_tokens)) : 24_000;
  if (maxTokens < 256 || maxTokens > 64_000) throw new Error(`${fileName}: max_tokens must be 256..64000`);
  return { id, enabled: raw.enabled === true, task, files, mode, model, reasoningEffort, maxTokens };
}

export function validateEnabledJobs(jobs) {
  const ids = new Set();
  for (const job of jobs) {
    const key = job.id.toLowerCase();
    if (ids.has(key)) throw new Error(`Duplicate enabled Kimi job id: ${job.id}`);
    ids.add(key);
  }
  return jobs;
}

export function readJobFiles(job, rootDir = process.cwd()) {
  const rootReal = fs.realpathSync(rootDir);
  const rootPrefix = rootReal.endsWith(path.sep) ? rootReal : `${rootReal}${path.sep}`;
  let totalBytes = 0;
  return job.files.map(relativePath => {
    const safePath = safeRelativePath(relativePath);
    if (!safePath) throw new Error(`${job.id}: invalid repository path`);
    const absolutePath = path.resolve(rootReal, safePath);
    if (!absolutePath.startsWith(rootPrefix)) throw new Error(`${job.id}: path escaped repository root`);
    const realPath = fs.realpathSync(absolutePath);
    if (!realPath.startsWith(rootPrefix) || realPath !== absolutePath) throw new Error(`${job.id}: symlinked or escaped paths are not allowed`);
    const stat = fs.statSync(realPath);
    if (!stat.isFile()) throw new Error(`${job.id}: not a regular file: ${safePath}`);
    if (stat.size > MAX_FILE_BYTES) throw new Error(`${job.id}: file exceeds ${MAX_FILE_BYTES} bytes: ${safePath}`);
    totalBytes += stat.size;
    if (totalBytes > MAX_TOTAL_BYTES) throw new Error(`${job.id}: selected files exceed ${MAX_TOTAL_BYTES} bytes`);
    return { path: safePath, content: fs.readFileSync(realPath, 'utf8') };
  });
}

export function buildMessages(job, files) {
  const outputRule = job.mode === 'review'
    ? 'Return a concise engineering review with concrete findings, risks, and exact recommended changes. Do not claim to have run tests.'
    : job.mode === 'css-override'
      ? 'Return ONLY valid CSS override text for the selected stylesheet. Do not use Markdown fences, HTML, scripts, imports, URLs, or prose.'
      : 'Return ONLY a canonical unified diff for the selected existing files. Do not use Markdown fences, prose, new files, deleted files, or renames.';
  const system = [
    'You are Kimi K3, a delegated senior software engineer working as a second agent.',
    'The lead agent owns the repository and will independently review your output.',
    'Treat the supplied files as authoritative. Do not invent unseen APIs or claim validation you did not perform.',
    'Preserve unrelated behavior, public interfaces, browser compatibility, mobile behavior, and performance.',
    outputRule
  ].join('\n');
  const fileText = files.map(file => `\n===== FILE: ${file.path} =====\n${file.content}\n===== END FILE: ${file.path} =====`).join('\n');
  return [{ role: 'system', content: system }, { role: 'user', content: `TASK\n${job.task}\n\nSELECTED REPOSITORY FILES${fileText}` }];
}

function parseStreamEvent(block) {
  const data = block.split('\n').filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n').trim();
  if (!data || data === '[DONE]') return null;
  try { return JSON.parse(data); } catch { return null; }
}

export async function readChatStream(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await response.json();
    return { text: contentText(data?.choices?.[0]?.message?.content).trim(), model: cleanText(data?.model, 160) };
  }
  if (!response.body?.getReader) throw new Error('NVIDIA returned no readable response body.');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let text = '';
  let model = '';
  const consume = block => {
    const payload = parseStreamEvent(block);
    if (!payload) return;
    if (payload.model) model = cleanText(payload.model, 160);
    const choice = payload?.choices?.[0];
    const delta = contentText(choice?.delta?.content) || (typeof choice?.text === 'string' ? choice.text : '');
    if (delta) text += delta;
  };
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n');
    let boundary;
    while ((boundary = buffer.indexOf('\n\n')) >= 0) {
      consume(buffer.slice(0, boundary));
      buffer = buffer.slice(boundary + 2);
    }
  }
  buffer += decoder.decode();
  if (buffer.trim()) consume(buffer);
  return { text: text.trim(), model };
}

function patchPath(value) {
  const raw = String(value ?? '').trim().replace(/^['\"]|['\"]$/g, '').replace(/\\/g, '/');
  if (!raw || raw === '/dev/null') return '';
  const normalized = path.posix.normalize(raw.replace(/^[ab]\//, ''));
  if (!normalized || normalized === '.' || normalized === '..' || normalized.startsWith('../') || normalized.startsWith('/') || normalized === '.git' || normalized.startsWith('.git/')) return '';
  return normalized;
}

export function normalizePatchOutput(output) {
  let text = String(output ?? '').replace(/\r\n/g, '\n').trim();
  if (!text) throw new Error('Kimi patch output is empty.');
  const fenced = text.match(/```(?:diff|patch)?\s*\n([\s\S]*?)\n```/i);
  if (fenced) text = fenced[1].trim();
  const gitStart = text.search(/^diff --git /m);
  const unifiedStart = text.search(/^---\s+(?:a\/|[^\s])/m);
  const start = gitStart >= 0 ? gitStart : unifiedStart;
  if (start < 0) throw new Error('Kimi patch output is not a recognizable unified diff.');
  text = text.slice(start).trim();
  if (/^```/m.test(text) || /^GIT binary patch$/m.test(text) || /^Binary files /m.test(text)) throw new Error('Kimi patch output is unsafe or malformed.');
  return `${text}\n`;
}

export function normalizeCssOverrideOutput(output) {
  let text = String(output ?? '').replace(/\r\n/g, '\n').trim();
  const fence = text.match(/^```(?:css)?\s*\n([\s\S]*?)\n```$/i);
  if (fence) text = fence[1].trim();
  if (!text || /```/.test(text) || /<\/?(?:script|style|link|iframe|object|embed)\b/i.test(text) || /@import\b/i.test(text) || /\burl\s*\(/i.test(text) || /\bexpression\s*\(/i.test(text) || /javascript\s*:/i.test(text)) throw new Error('Kimi CSS output is unsafe or malformed.');
  let depth = 0;
  let sawBlock = false;
  for (const ch of text.replace(/\/\*[\s\S]*?\*\//g, '')) {
    if (ch === '{') { depth += 1; sawBlock = true; }
    if (ch === '}') { depth -= 1; if (depth < 0) throw new Error('Kimi CSS output has unbalanced braces.'); }
  }
  if (!sawBlock || depth !== 0) throw new Error('Kimi CSS output is not structurally valid.');
  return `${text}\n`;
}

export function extractPatchPaths(output) {
  const text = normalizePatchOutput(output);
  const paths = new Set();
  let pendingOld = '';
  let sawHunk = false;
  for (const line of text.split('\n')) {
    const diff = line.match(/^diff --git a\/(.+) b\/(.+)$/);
    if (diff) {
      const left = patchPath(diff[1]);
      const right = patchPath(diff[2]);
      if (!left || !right || left !== right) throw new Error('Kimi renames or invalid patch paths are not allowed.');
      paths.add(right);
      pendingOld = '';
      continue;
    }
    const oldHeader = line.match(/^---\s+(.+?)(?:\t.*)?$/);
    if (oldHeader) {
      pendingOld = patchPath(oldHeader[1]);
      if (!pendingOld) throw new Error('Kimi new/deleted files are not allowed.');
      continue;
    }
    const newHeader = line.match(/^\+\+\+\s+(.+?)(?:\t.*)?$/);
    if (newHeader) {
      const next = patchPath(newHeader[1]);
      if (!next || (pendingOld && pendingOld !== next)) throw new Error('Kimi new/deleted files and renames are not allowed.');
      paths.add(next);
      pendingOld = '';
      continue;
    }
    if (/^@@\s/.test(line)) sawHunk = true;
  }
  if (!paths.size || !sawHunk) throw new Error('Kimi patch output has no valid hunk.');
  return [...paths].sort();
}

export function verifyPatchScope(job, output) {
  const changed = extractPatchPaths(output);
  const allowed = new Set(job.files.map(patchPath));
  const outside = changed.filter(file => !allowed.has(file));
  if (outside.length) throw new Error(`${job.id}: Kimi patch touched undeclared files: ${outside.join(', ')}`);
  return changed;
}

export function verifyPatchApplies(output, rootDir) {
  const result = spawnSync('git', ['apply', '--check', '--whitespace=nowarn', '-'], { cwd: rootDir, input: normalizePatchOutput(output), encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw new Error(`Kimi patch does not apply cleanly${result.stderr ? `: ${String(result.stderr).trim().slice(0, 500)}` : '.'}`);
  return true;
}

export function verifyResult(job, result, rootDir = '') {
  if (!result || result.id !== job.id || result.mode !== job.mode) throw new Error(`${job.id}: result metadata mismatch.`);
  const original = String(result.output ?? '').replace(/\r\n/g, '\n');
  if (!original.trim()) throw new Error(`${job.id}: empty result output.`);
  let output = original.trim();
  let changedFiles = [];
  if (job.mode === 'patch') {
    output = normalizePatchOutput(original);
    changedFiles = verifyPatchScope(job, output);
    if (rootDir) verifyPatchApplies(output, rootDir);
  } else if (job.mode === 'css-override') {
    output = normalizeCssOverrideOutput(original);
    if (job.files.length !== 1 || !job.files[0].endsWith('.css')) throw new Error(`${job.id}: css-override requires one .css file.`);
    changedFiles = job.files;
  }
  return { ...result, output, verified: true, verified_at: new Date().toISOString(), changed_files: changedFiles };
}

async function runJob(job, rootDir, apiKey) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const files = readJobFiles(job, rootDir);
    const response = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', Accept: 'text/event-stream' },
      signal: controller.signal,
      body: JSON.stringify({ model: job.model, messages: buildMessages(job, files), max_tokens: job.maxTokens, reasoning_effort: job.reasoningEffort, temperature: job.mode === 'patch' ? 0.2 : 0.4, stream: true })
    });
    if (!response.ok) {
      const raw = await response.text().catch(() => '');
      let data = {};
      try { data = JSON.parse(raw); } catch {}
      throw new Error(cleanText(data?.error?.message || data?.message || raw, 500) || `NVIDIA request failed (${response.status})`);
    }
    const streamed = await readChatStream(response);
    if (!streamed.text) throw new Error('NVIDIA returned no response text.');
    if (/nvapi-[A-Za-z0-9_-]{20,}/.test(streamed.text)) throw new Error('Kimi output contained an API-key-shaped secret.');
    return { id: job.id, model: cleanText(streamed.model || job.model, 160), mode: job.mode, reasoning_effort: job.reasoningEffort, files: job.files, created_at: new Date().toISOString(), output: streamed.text };
  } catch (error) {
    if (error?.name === 'AbortError') throw new Error(`NVIDIA request exceeded ${REQUEST_TIMEOUT_MS / 1000} seconds.`);
    throw error;
  } finally { clearTimeout(timeout); }
}

function eligibleContext() {
  return process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy' || process.env.KIMI_ALLOW_LOCAL === '1';
}

export async function main(rootDir = process.cwd()) {
  const jobDir = path.join(rootDir, JOB_DIR);
  if (!fs.existsSync(jobDir)) { console.log('KIMI DELEGATION SKIP: no job directory'); return; }
  const jobs = validateEnabledJobs(fs.readdirSync(jobDir).filter(name => name.endsWith('.json')).sort().map(name => validateJob(JSON.parse(fs.readFileSync(path.join(jobDir, name), 'utf8')), name)).filter(job => job.enabled));
  if (!jobs.length) { console.log('KIMI DELEGATION SKIP: no enabled jobs'); return; }
  if (!eligibleContext()) throw new Error('Enabled Kimi jobs are only allowed in Netlify deploy-preview/branch-deploy contexts.');
  const apiKey = cleanText(process.env.NVIDIA_API_KEY, 512);
  if (apiKey.length < 20 || /\s/.test(apiKey)) throw new Error('NVIDIA_API_KEY is missing or invalid in the Netlify environment.');
  const outputDir = path.join(rootDir, OUTPUT_DIR);
  fs.mkdirSync(outputDir, { recursive: true });
  const index = [];
  for (const job of jobs) {
    console.log(`KIMI DELEGATION START: ${job.id}`);
    const result = await runJob(job, rootDir, apiKey);
    fs.writeFileSync(path.join(outputDir, `${job.id}.json`), JSON.stringify(result, null, 2));
    index.push({ id: result.id, model: result.model, mode: result.mode, file: `${result.id}.json` });
    console.log(`KIMI DELEGATION PASS: ${job.id}`);
  }
  fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify({ jobs: index }, null, 2));
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) main().catch(error => { console.error(`KIMI DELEGATION FAIL: ${error?.message || error}`); process.exit(1); });

import path from 'node:path';

export const SCHEMA_VERSION = 1;
export const DEFAULT_MODEL = process.env.NVIDIA_MODEL || 'moonshotai/kimi-k3';
export const DEFAULT_BASE_URL = 'https://integrate.api.nvidia.com/v1';
export const REASONING_EFFORTS = new Set(['low', 'medium', 'high', 'max']);
export const JOB_MODES = new Set(['review', 'implementation']);
export const MAX_ALLOWED_FILES = 128;
export const MAX_FILE_BYTES = 1_500_000;
export const MAX_TOTAL_INPUT_BYTES = 8_000_000;
export const MAX_OUTPUT_BYTES = 1_000_000;
export const MAX_CHANGED_FILES = 32;
export const MAX_PATCH_BYTES = 262_144;

export function cleanText(value, max = 20_000) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .trim()
    .slice(0, max);
}

export function contentText(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content.map(part => {
    if (typeof part === 'string') return part;
    if (typeof part?.text === 'string') return part.text;
    if (typeof part?.content === 'string') return part.content;
    return '';
  }).join('');
}

export function normalizeRelativePath(value, { allowDirectory = false } = {}) {
  const raw = cleanText(value, 300).replace(/\\/g, '/');
  if (!raw || raw.startsWith('/') || raw.includes('\0')) return '';
  const directory = allowDirectory && raw.endsWith('/');
  const normalized = path.posix.normalize(raw);
  if (
    normalized === '.' ||
    normalized === '..' ||
    normalized.startsWith('../') ||
    normalized.startsWith('/') ||
    normalized === '.git' ||
    normalized.startsWith('.git/')
  ) return '';
  return directory ? `${normalized.replace(/\/+$/, '')}/` : normalized;
}

export function isSecretPath(relativePath) {
  const value = String(relativePath || '').replace(/\\/g, '/').toLowerCase();
  const base = value.split('/').pop() || '';
  return (
    /(^|\/)(\.env(?:\.[^/]+)?|credentials(?:\.[^/]+)?|secrets?(?:\.[^/]+)?|\.npmrc|id_(?:rsa|dsa|ecdsa|ed25519))$/.test(value) ||
    /\.(?:pem|key|p12|pfx|jks|keystore|mobileprovision)$/.test(base) ||
    /(?:secret|credential|password|token|api[_-]?key)/.test(base)
  );
}

export function pathIsAllowed(relativePath, allowedFiles) {
  const normalized = normalizeRelativePath(relativePath);
  if (!normalized || isSecretPath(normalized)) return false;
  return allowedFiles.some(allowed => {
    const scope = normalizeRelativePath(allowed, { allowDirectory: true });
    if (!scope) return false;
    return scope.endsWith('/')
      ? normalized === scope.slice(0, -1) || normalized.startsWith(scope)
      : normalized === scope;
  });
}

function asStringList(value, field, maxItems = 128, maxItemLength = 2_000) {
  if (value == null) return [];
  if (!Array.isArray(value)) throw new Error(`${field} must be an array`);
  if (value.length > maxItems) throw new Error(`${field} has too many entries (max ${maxItems})`);
  return value.map(item => cleanText(item, maxItemLength)).filter(Boolean);
}

function validateCommand(command, field) {
  const value = cleanText(command, 500);
  if (!value) throw new Error(`${field} contains an empty command`);
  if (/[\u0000\r\n;&|`$<>]/.test(value)) throw new Error(`${field} contains forbidden shell syntax`);
  if (/\b(?:curl|wget|nc|netcat|ssh|scp|ftp|openssl|printenv|env)\b/i.test(value)) throw new Error(`${field} contains a forbidden network or environment command`);
  if (/(?:^|\s)(?:sh|bash|zsh|fish|pwsh|powershell|cmd)(?:\s|$)/i.test(value)) throw new Error(`${field} cannot invoke a shell`);
  if (/(?:^|\s)(?:-e|--eval|-p|--print)(?:\s|$)/.test(value)) throw new Error(`${field} cannot evaluate inline code`);
  if (/\b(?:git\s+(?:commit|push|reset|checkout|switch|merge|rebase|clean|restore)|npm\s+(?:install|i|ci|exec)|pnpm\s+(?:install|add)|yarn\s+(?:add|install))\b/i.test(value)) throw new Error(`${field} contains a mutating command`);
  if (/(?:^|[\s/])(?:\.env(?:\.|\s|$)|credentials|secrets?|.*\.(?:pem|key|p12|pfx))(?:$|\s)/i.test(value)) throw new Error(`${field} targets a protected secret file`);
  return value;
}

export function validateJob(raw, fileName = 'job.json') {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error(`${fileName}: job must be an object`);
  const id = cleanText(raw.id || path.basename(fileName, path.extname(fileName)), 80);
  if (!/^[a-z0-9][a-z0-9._-]{0,79}$/i.test(id) || /^(?:index|latest)$/i.test(id)) throw new Error(`${fileName}: invalid or reserved job id`);

  const objective = cleanText(raw.objective || raw.task, 24_000);
  if (!objective) throw new Error(`${fileName}: objective is required`);
  const role = cleanText(raw.role || 'independent senior engineer and design reviewer', 2_000);
  const allowedFilesRaw = raw.allowed_files ?? raw.files;
  const allowedFiles = asStringList(allowedFilesRaw, `${fileName}: allowed_files`, MAX_ALLOWED_FILES, 300)
    .map(value => normalizeRelativePath(value, { allowDirectory: true }));
  if (!allowedFiles.length || allowedFiles.some(file => !file || isSecretPath(file))) throw new Error(`${fileName}: valid non-secret allowed_files are required`);
  if (new Set(allowedFiles).size !== allowedFiles.length) throw new Error(`${fileName}: allowed_files must be unique`);

  const legacyMode = raw.mode || (raw.task || raw.files ? 'patch' : null);
  const mode = legacyMode === 'patch' || legacyMode === 'css-override'
    ? 'implementation'
    : JOB_MODES.has(legacyMode) ? legacyMode : 'review';
  const requestedOutput = cleanText(
    raw.requested_output || (legacyMode === 'css-override' ? 'css_override' : mode === 'implementation' ? 'structured_patch' : 'structured_review'),
    80
  );
  if (!/^[a-z0-9_-]+$/i.test(requestedOutput)) throw new Error(`${fileName}: requested_output is invalid`);

  const acceptanceCriteria = asStringList(raw.acceptance_criteria, `${fileName}: acceptance_criteria`, 32, 2_000);
  const commands = asStringList(raw.commands ?? raw.allowed_commands, `${fileName}: commands`, 32, 500)
    .map((command, index) => validateCommand(command, `${fileName}: commands[${index}]`));
  const relevantContext = Array.isArray(raw.relevant_context)
    ? asStringList(raw.relevant_context, `${fileName}: relevant_context`, 32, 4_000)
    : cleanText(raw.relevant_context, 20_000);

  const model = cleanText(raw.model || DEFAULT_MODEL, 160);
  if (!/^[a-zA-Z0-9._:/-]+$/.test(model)) throw new Error(`${fileName}: invalid model`);
  const reasoningEffort = REASONING_EFFORTS.has(raw.reasoning_effort) ? raw.reasoning_effort : 'high';
  const maxTokens = Number.isFinite(Number(raw.max_tokens)) ? Math.trunc(Number(raw.max_tokens)) : 24_000;
  if (maxTokens < 256 || maxTokens > 64_000) throw new Error(`${fileName}: max_tokens must be 256..64000`);
  const maxTurns = Number.isFinite(Number(raw.max_turns)) ? Math.trunc(Number(raw.max_turns)) : 8;
  if (maxTurns < 1 || maxTurns > 16) throw new Error(`${fileName}: max_turns must be 1..16`);
  const timeoutMs = Number.isFinite(Number(raw.timeout_ms)) ? Math.trunc(Number(raw.timeout_ms)) : 720_000;
  if (timeoutMs < 10_000 || timeoutMs > 900_000) throw new Error(`${fileName}: timeout_ms must be 10000..900000`);
  const maxChangedFiles = Number.isFinite(Number(raw.max_changed_files)) ? Math.trunc(Number(raw.max_changed_files)) : 8;
  if (maxChangedFiles < 1 || maxChangedFiles > MAX_CHANGED_FILES) throw new Error(`${fileName}: max_changed_files must be 1..${MAX_CHANGED_FILES}`);
  const maxPatchBytes = Number.isFinite(Number(raw.max_patch_bytes)) ? Math.trunc(Number(raw.max_patch_bytes)) : MAX_PATCH_BYTES;
  if (maxPatchBytes < 1_024 || maxPatchBytes > MAX_PATCH_BYTES) throw new Error(`${fileName}: max_patch_bytes must be 1024..${MAX_PATCH_BYTES}`);
  const retries = Number.isFinite(Number(raw.retries)) ? Math.trunc(Number(raw.retries)) : 3;
  if (retries < 0 || retries > 4) throw new Error(`${fileName}: retries must be 0..4`);

  return {
    schemaVersion: SCHEMA_VERSION,
    id,
    enabled: raw.enabled === true,
    mode,
    legacyMode: legacyMode === 'patch' || legacyMode === 'css-override' ? legacyMode : null,
    objective,
    role,
    allowedFiles,
    relevantContext,
    acceptanceCriteria,
    commands,
    requestedOutput,
    model,
    reasoningEffort,
    maxTokens,
    maxTurns,
    timeoutMs,
    maxChangedFiles,
    maxPatchBytes,
    retries,
    stream: raw.stream !== false,
  };
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

export function stableJobScope(job) {
  return JSON.stringify({
    id: job.id,
    mode: job.mode,
    legacyMode: job.legacyMode,
    allowedFiles: job.allowedFiles,
    commands: job.commands,
    maxChangedFiles: job.maxChangedFiles,
    maxPatchBytes: job.maxPatchBytes,
  });
}

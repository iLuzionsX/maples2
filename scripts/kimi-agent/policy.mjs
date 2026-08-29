import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { isSecretPath, MAX_FILE_BYTES, MAX_OUTPUT_BYTES, MAX_TOTAL_INPUT_BYTES, normalizeRelativePath, pathIsAllowed } from './schema.mjs';
import { redactSecrets } from './security.mjs';
import { validatePatch } from './patch.mjs';

const SAFE_ENV_KEYS = ['PATH', 'NODE_PATH', 'CI', 'LANG', 'LC_ALL', 'TZ', 'TMPDIR', 'TEMP', 'TMP', 'NODE_ENV'];

function inside(rootReal, candidate) {
  const prefix = rootReal.endsWith(path.sep) ? rootReal : `${rootReal}${path.sep}`;
  return candidate === rootReal || candidate.startsWith(prefix);
}

export function resolveRepoRoot(input = process.cwd()) {
  const result = spawnSync('git', ['rev-parse', '--show-toplevel'], { cwd: input, encoding: 'utf8' });
  if (result.status !== 0) throw new Error('Kimi requires a Git repository root.');
  const root = fs.realpathSync(String(result.stdout).trim());
  if (!root || !fs.statSync(root).isDirectory()) throw new Error('Unable to resolve repository root.');
  return root;
}

export class RepoPolicy {
  constructor(job, rootDir, { signal } = {}) {
    this.job = job;
    this.rootDir = fs.realpathSync(rootDir);
    this.signal = signal;
    this.inspected = new Set();
    this.proposed = null;
    this.totalInputBytes = 0;
  }

  relative(value) {
    const normalized = normalizeRelativePath(value);
    if (!normalized || !pathIsAllowed(normalized, this.job.allowedFiles)) throw new Error(`Path is outside the job allowlist: ${value}`);
    return normalized;
  }

  absolute(relative, { mustExist = true } = {}) {
    const safe = this.relative(relative);
    const absolute = path.resolve(this.rootDir, safe);
    if (!inside(this.rootDir, absolute)) throw new Error('Path escaped repository root.');
    if (!mustExist) return { safe, absolute };
    if (!fs.existsSync(absolute)) throw new Error(`File does not exist: ${safe}`);
    const real = fs.realpathSync(absolute);
    if (!inside(this.rootDir, real) || real !== absolute) throw new Error(`Symlinked or escaped paths are not allowed: ${safe}`);
    return { safe, absolute: real };
  }

  readFile(relative) {
    const { safe, absolute } = this.absolute(relative);
    const stat = fs.statSync(absolute);
    if (!stat.isFile()) throw new Error(`Not a regular file: ${safe}`);
    if (isSecretPath(safe)) throw new Error('Secret-file reads are blocked.');
    if (stat.size > MAX_FILE_BYTES) throw new Error(`File exceeds ${MAX_FILE_BYTES} bytes: ${safe}`);
    this.totalInputBytes += stat.size;
    if (this.totalInputBytes > MAX_TOTAL_INPUT_BYTES) throw new Error(`Job input exceeds ${MAX_TOTAL_INPUT_BYTES} bytes.`);
    const content = fs.readFileSync(absolute, 'utf8');
    this.inspected.add(safe);
    return { path: safe, bytes: stat.size, content: redactSecrets(content) };
  }

  search(pattern, relativePath = '', maxResults = 80) {
    const query = String(pattern ?? '').slice(0, 500);
    if (!query) throw new Error('Search pattern is required.');
    const safeMax = Math.max(1, Math.min(Number(maxResults) || 80, 200));
    const targets = relativePath ? [this.relative(relativePath)] : this.job.allowedFiles;
    const args = ['--line-number', '--no-heading', '--color', 'never', '--hidden', '--glob', '!.git/**', '--glob', '!node_modules/**', '--glob', '!dist/**', '--glob', '!.kimi/sessions/**', '--glob', '!.kimi/logs/**', '--max-count', String(safeMax), '--', query, ...targets.map(item => item.replace(/\/$/, '') || '.')];
    const result = spawnSync('rg', args, { cwd: this.rootDir, encoding: 'utf8', maxBuffer: MAX_OUTPUT_BYTES });
    if (result.error?.code === 'ENOENT') throw new Error('Repository search requires ripgrep (`rg`).');
    if (result.status > 1) throw new Error(`Repository search failed: ${String(result.stderr || '').trim().slice(0, 400)}`);
    const lines = String(result.stdout || '').split('\n').filter(Boolean).filter(line => {
      const file = line.split(':', 1)[0];
      return pathIsAllowed(file, this.job.allowedFiles) && !isSecretPath(file);
    }).slice(0, safeMax);
    lines.forEach(line => this.inspected.add(line.split(':', 1)[0]));
    return { pattern: query, path: relativePath || null, matches: redactSecrets(lines).join('\n'), count: lines.length, truncated: lines.length >= safeMax };
  }

  listTree(relativePath = '', depth = 2) {
    const safeDepth = Math.max(0, Math.min(Number(depth) || 2, 5));
    const roots = relativePath ? [this.relative(relativePath)] : this.job.allowedFiles;
    const results = new Set();
    const visit = (safe, level) => {
      const { absolute } = this.absolute(safe);
      const stat = fs.lstatSync(absolute);
      if (stat.isSymbolicLink()) throw new Error(`Symlinked paths are not allowed: ${safe}`);
      if (stat.isFile()) { results.add(safe); return; }
      if (!stat.isDirectory() || level > safeDepth) return;
      for (const entry of fs.readdirSync(absolute, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
        const child = normalizeRelativePath(path.posix.join(safe, entry.name));
        if (!child || isSecretPath(child) || !pathIsAllowed(child, this.job.allowedFiles)) continue;
        visit(child, level + 1);
        if (results.size >= 300) return;
      }
    };
    for (const root of roots) {
      if (root.endsWith('/')) visit(root.slice(0, -1), 0);
      else if (fs.existsSync(path.resolve(this.rootDir, root))) visit(root, 0);
    }
    return { path: relativePath || null, entries: [...results].sort().slice(0, 300), truncated: results.size > 300 };
  }

  git(args, { limit = MAX_OUTPUT_BYTES } = {}) {
    const result = spawnSync('git', ['--no-pager', ...args], { cwd: this.rootDir, encoding: 'utf8', maxBuffer: limit });
    if (result.error || result.status !== 0) throw new Error(`Git command failed: ${String(result.stderr || result.stdout || '').trim().slice(0, 500)}`);
    return redactSecrets(String(result.stdout || '').slice(0, limit));
  }

  status() {
    const pathspecs = this.job.allowedFiles.map(item => item.endsWith('/') ? item : item);
    return { output: this.git(['status', '--short', '--branch', '--untracked-files=all', '--', ...pathspecs]) };
  }

  diff(staged = false) {
    const pathspecs = this.job.allowedFiles.map(item => item.endsWith('/') ? item : item);
    const args = ['diff', '--no-ext-diff', '--no-textconv', '--no-color'];
    if (staged) args.push('--cached');
    args.push('--', ...pathspecs);
    return { staged: Boolean(staged), output: this.git(args, { limit: 2_000_000 }) };
  }

  async runApproved(command) {
    const requested = String(command ?? '').trim();
    if (!this.job.commands.includes(requested)) throw new Error('Command is not in this job allowlist.');
    if (/[\u0000\r\n;&|`$<>]/.test(requested)) throw new Error('Shell syntax is not allowed.');
    const tokens = tokenize(requested);
    validateTokens(tokens, requested);
    const env = Object.fromEntries(SAFE_ENV_KEYS.filter(key => process.env[key] != null).map(key => [key, process.env[key]]));
    env.CI = '1';
    const started = Date.now();
    const result = await spawnCommand(tokens[0], tokens.slice(1), { cwd: this.rootDir, env, signal: this.signal, timeoutMs: this.job.timeoutMs });
    return {
      command: requested,
      exitCode: result.code,
      signal: result.signal,
      stdout: redactSecrets(result.stdout).slice(0, 80_000),
      stderr: redactSecrets(result.stderr).slice(0, 20_000),
      durationMs: Date.now() - started,
    };
  }

  proposePatch(output) {
    if (this.job.mode !== 'implementation') throw new Error('Review-only jobs cannot propose patches.');
    const checked = validatePatch(this.job, output, this.rootDir);
    this.proposed = checked;
    return { accepted: true, changedFiles: checked.changedFiles, bytes: Buffer.byteLength(checked.patch, 'utf8'), appliesCleanly: true };
  }
}

function tokenize(command) {
  const tokens = [];
  let current = '';
  let quote = '';
  for (let i = 0; i < command.length; i += 1) {
    const char = command[i];
    if (quote) {
      if (char === quote) quote = '';
      else current += char;
    } else if (char === '"' || char === "'") quote = char;
    else if (/\s/.test(char)) { if (current) { tokens.push(current); current = ''; } }
    else current += char;
  }
  if (quote) throw new Error('Unterminated command quote.');
  if (current) tokens.push(current);
  if (!tokens.length) throw new Error('Command is empty.');
  return tokens;
}

function validateTokens(tokens, command) {
  const executable = path.basename(tokens[0]);
  const lower = command.toLowerCase();
  if (['sh', 'bash', 'zsh', 'fish', 'pwsh', 'powershell', 'cmd', 'curl', 'wget', 'nc', 'netcat', 'ssh', 'scp', 'env', 'printenv', 'python', 'python3'].includes(executable.toLowerCase())) throw new Error(`Executable is not approved: ${executable}`);
  if (executable === 'npm' && (tokens[1] !== 'run' || !/^(?:build|test(?::[a-z0-9_-]+)*|lint|check|typecheck)(?::[a-z0-9_-]+)*$/i.test(tokens[2] || ''))) throw new Error('Only approved npm test/build scripts may run.');
  if (executable === 'node' && tokens.some(token => /^(?:-e|--eval|-p|--print)$/.test(token))) throw new Error('Inline Node evaluation is not allowed.');
  if (executable === 'git' && !/^(?:git\s+)(?:--no-pager\s+)?(?:status|diff|log|show|ls-files)\b/i.test(lower)) throw new Error('Only read-only Git commands may run.');
  if (tokens.some(token => token.includes('..') || isSecretPath(token))) throw new Error('Command targets a protected path.');
}

function spawnCommand(command, args, { cwd, env, signal, timeoutMs }) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, env, shell: false, signal });
    let stdout = '';
    let stderr = '';
    let settled = false;
    let timedOut = false;
    const timeout = setTimeout(() => { timedOut = true; child.kill('SIGTERM'); }, timeoutMs);
    const finish = (value, error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (error) reject(error); else resolve(value);
    };
    child.stdout.on('data', chunk => { stdout += String(chunk); if (stdout.length > MAX_OUTPUT_BYTES) stdout = `${stdout.slice(0, MAX_OUTPUT_BYTES)}...[TRUNCATED]`; });
    child.stderr.on('data', chunk => { stderr += String(chunk); if (stderr.length > 200_000) stderr = `${stderr.slice(0, 200_000)}...[TRUNCATED]`; });
    child.on('error', error => finish(null, error));
    child.on('close', (code, childSignal) => {
      if (timedOut) finish(null, new Error(`Approved command exceeded ${timeoutMs} milliseconds.`));
      else if (signal?.aborted) finish(null, new Error('Approved command cancelled.'));
      else finish({ code, signal: childSignal || null, stdout, stderr });
    });
  });
}

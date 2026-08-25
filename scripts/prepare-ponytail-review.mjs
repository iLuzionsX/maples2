import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export const JOB_PATH = '.ox/jobs/ponytail-review.json';
export const CONTEXT_PATH = '.ox/context/ponytail-review.diff';
const MAX_FILE_BYTES = 1_500_000;
const MAX_REVIEW_FILES = 63;
const MAX_DIFF_BYTES = 1_500_000;
const EXCLUDED_PREFIXES = ['.git/', '.ox/jobs/', '.ox/context/', 'dist/', 'node_modules/'];
const EXCLUDED_NAMES = new Set(['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock']);
const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico', '.bmp', '.tiff',
  '.glb', '.bin', '.mp3', '.wav', '.ogg', '.m4a', '.mp4', '.webm', '.mov',
  '.woff', '.woff2', '.ttf', '.otf', '.zip', '.gz', '.br', '.pdf'
]);

function runGit(rootDir, args, allowedStatuses = [0]) {
  const result = spawnSync('git', ['-C', rootDir, ...args], {
    encoding: 'utf8',
    maxBuffer: 24 * 1024 * 1024,
  });
  if (result.error) throw new Error(`Unable to run git ${args[0]}: ${result.error.message}`);
  if (!allowedStatuses.includes(result.status)) {
    const detail = String(result.stderr || result.stdout || '').trim().replace(/\s+/g, ' ').slice(0, 600);
    throw new Error(`git ${args.join(' ')} failed${detail ? `: ${detail}` : ''}`);
  }
  return String(result.stdout || '');
}

function normalizeRelativePath(value) {
  const normalized = path.posix.normalize(String(value || '').trim().replace(/\\/g, '/'));
  if (!normalized || normalized === '.' || normalized === '..' || normalized.startsWith('../') || normalized.startsWith('/')) return '';
  return normalized;
}

function resolveBase(rootDir, requestedBase) {
  const requested = String(requestedBase || 'main').trim() || 'main';
  const candidates = requested.includes('/') ? [requested] : [`origin/${requested}`, requested];
  for (const candidate of candidates) {
    const result = spawnSync('git', ['-C', rootDir, 'rev-parse', '--verify', `${candidate}^{commit}`], { encoding: 'utf8' });
    if (result.status === 0) return candidate;
  }
  throw new Error(`Unable to resolve review base "${requested}". Rebase/fetch main or pass --base <ref>.`);
}

function currentBranch(rootDir) {
  return runGit(rootDir, ['rev-parse', '--abbrev-ref', 'HEAD']).trim();
}

function isReviewablePath(rootDir, relativePath) {
  const normalized = normalizeRelativePath(relativePath);
  if (!normalized) return false;
  if (EXCLUDED_PREFIXES.some(prefix => normalized.startsWith(prefix))) return false;
  if (EXCLUDED_NAMES.has(path.posix.basename(normalized))) return false;
  if (BINARY_EXTENSIONS.has(path.posix.extname(normalized).toLowerCase())) return false;

  const absolute = path.resolve(rootDir, normalized);
  const root = path.resolve(rootDir);
  if (!(absolute === root || absolute.startsWith(`${root}${path.sep}`))) return false;
  if (!fs.existsSync(absolute)) return false;
  const stat = fs.lstatSync(absolute);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > MAX_FILE_BYTES) return false;
  const sample = fs.readFileSync(absolute).subarray(0, 8192);
  return !sample.includes(0);
}

function changedPaths(rootDir, baseRef) {
  const tracked = runGit(rootDir, ['diff', '--name-only', '--diff-filter=ACMR', baseRef, '--'])
    .split('\n').map(normalizeRelativePath).filter(Boolean);
  const untracked = runGit(rootDir, ['ls-files', '--others', '--exclude-standard'])
    .split('\n').map(normalizeRelativePath).filter(Boolean);
  return [...new Set([...tracked, ...untracked])].sort();
}

function buildDiff(rootDir, baseRef, files) {
  const tracked = [];
  const untracked = [];
  for (const file of files) {
    const listed = runGit(rootDir, ['ls-files', '--error-unmatch', '--', file], [0, 1, 128]);
    if (listed.trim()) tracked.push(file);
    else untracked.push(file);
  }

  const chunks = [];
  if (tracked.length) {
    chunks.push(runGit(rootDir, ['diff', '--no-ext-diff', '--unified=60', baseRef, '--', ...tracked]));
  }
  for (const file of untracked) {
    chunks.push(runGit(rootDir, ['diff', '--no-index', '--no-ext-diff', '--unified=60', '--', '/dev/null', file], [0, 1]));
  }
  const diff = chunks.filter(Boolean).join('\n').trim();
  if (!diff) throw new Error('No textual diff was produced for the selected files.');
  if (Buffer.byteLength(diff, 'utf8') > MAX_DIFF_BYTES) {
    throw new Error(`Review diff exceeds ${MAX_DIFF_BYTES} bytes. Split the change into a narrower review.`);
  }
  return `${diff}\n`;
}

const REVIEW_TASK = `Act as Maples' independent Ponytail-style simplification reviewer. Review ONLY unnecessary complexity in the supplied branch diff and selected files; do not perform a general correctness review and do not apply changes.

Use this decision order when proposing a cut: unnecessary feature -> existing repo implementation -> JavaScript/Node standard capability -> browser/Three.js native capability -> already-installed dependency -> shorter equivalent logic -> otherwise keep the minimum custom implementation that preserves behavior.

Maples boundary: bespoke combat feel, animation, camera behavior, VFX, environment composition, enemy/boss behavior, art direction, mobile ergonomics, and other player-visible quality are presumed intentional. Never recommend deleting or weakening tests, validation, error handling, security, accessibility, mobile support, performance instrumentation, asset licensing/attribution, or behavior required by the diff. Fewer lines are valuable only when player-visible quality and system correctness are unchanged.

Treat .ox/context/ponytail-review.diff as the authoritative change under review. Use full selected files only to understand integration and reuse opportunities. For each worthwhile finding output one line in this form: file:Lx-Ly: <delete|stdlib|native|yagni|shrink>: <what can go> -> <simpler replacement>. End with exactly "net: -N lines possible." If nothing should be cut, output exactly "Lean already. Ship."`;

export function cleanupReview(rootDir = process.cwd()) {
  for (const relativePath of [JOB_PATH, CONTEXT_PATH]) {
    fs.rmSync(path.join(rootDir, relativePath), { force: true });
  }
  const contextDir = path.join(rootDir, '.ox/context');
  if (fs.existsSync(contextDir) && fs.readdirSync(contextDir).length === 0) fs.rmdirSync(contextDir);
  return { removed: [JOB_PATH, CONTEXT_PATH] };
}

export function prepareReview(rootDir = process.cwd(), options = {}) {
  const root = fs.realpathSync(rootDir);
  const branch = currentBranch(root);
  if (branch === 'main' || branch === 'master') {
    throw new Error('Refusing to enable Ponytail/Ox review on the default branch. Use a feature/PR branch.');
  }

  cleanupReview(root);
  const baseRef = resolveBase(root, options.base || process.env.PONYTAIL_REVIEW_BASE || 'main');
  const files = changedPaths(root, baseRef).filter(file => isReviewablePath(root, file));
  if (!files.length) throw new Error(`No reviewable text files changed relative to ${baseRef}.`);
  if (files.length > MAX_REVIEW_FILES) {
    throw new Error(`Ponytail/Ox review selected ${files.length} files; maximum is ${MAX_REVIEW_FILES}. Split the review into a narrower branch/change.`);
  }

  const diff = buildDiff(root, baseRef, files);
  const contextAbsolute = path.join(root, CONTEXT_PATH);
  fs.mkdirSync(path.dirname(contextAbsolute), { recursive: true });
  const header = `# Maples Ponytail/Ox branch review\n# Base: ${baseRef}\n# Branch: ${branch}\n# Generated: ${new Date().toISOString()}\n\n`;
  fs.writeFileSync(contextAbsolute, `${header}${diff}`);

  const job = {
    id: 'ponytail-review',
    enabled: true,
    mode: 'review',
    reasoning_effort: 'high',
    task: REVIEW_TASK,
    files: [CONTEXT_PATH, ...files],
    model: 'auto:ox-alpha',
    max_tokens: 8000,
  };
  const jobAbsolute = path.join(root, JOB_PATH);
  fs.mkdirSync(path.dirname(jobAbsolute), { recursive: true });
  fs.writeFileSync(jobAbsolute, `${JSON.stringify(job, null, 2)}\n`);
  return { branch, baseRef, files, jobPath: JOB_PATH, contextPath: CONTEXT_PATH };
}

function parseCli(argv) {
  const args = [...argv];
  const cleanup = args.includes('--cleanup');
  const baseIndex = args.indexOf('--base');
  let base = '';
  if (baseIndex >= 0) {
    base = args[baseIndex + 1] || '';
    if (!base) throw new Error('--base requires a git ref.');
  }
  return { cleanup, base };
}

export function main(rootDir = process.cwd(), argv = process.argv.slice(2)) {
  const options = parseCli(argv);
  if (options.cleanup) {
    cleanupReview(rootDir);
    console.log('PONYTAIL REVIEW CLEANUP PASS');
    return;
  }
  const result = prepareReview(rootDir, { base: options.base });
  console.log(`PONYTAIL REVIEW PREPARED: ${result.files.length} files against ${result.baseRef}`);
  console.log(`Commit ${result.jobPath} and ${result.contextPath}, push the PR branch, then inspect the Netlify Ox result.`);
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) {
  try { main(); } catch (error) {
    console.error(`PONYTAIL REVIEW PREPARE FAIL: ${error?.message || error}`);
    process.exit(1);
  }
}

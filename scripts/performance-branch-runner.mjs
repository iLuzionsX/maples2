import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const root = process.cwd();
const baselineCommit = '97e5544358c65d3bc78b13cee3a01a619ae9a96a';
const baselineDir = path.join(root, '.perf-baseline');
const candidateUrl = 'http://127.0.0.1:4173';
const baselineUrl = 'http://127.0.0.1:4174';
const children = [];

function run(command, args, { cwd = root, env = process.env, timeoutMs = 600000 } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, env, shell: false, stdio: 'inherit', detached: true });
    let done = false;
    const timer = setTimeout(() => {
      if (done) return;
      try { process.kill(-child.pid, 'SIGTERM'); } catch { child.kill('SIGTERM'); }
      setTimeout(() => { try { process.kill(-child.pid, 'SIGKILL'); } catch { child.kill('SIGKILL'); } }, 2000).unref();
      done = true;
      reject(new Error(`${command} ${args.join(' ')} timed out`));
    }, timeoutMs);
    child.on('error', error => { if (!done) { done = true; clearTimeout(timer); reject(error); } });
    child.on('exit', code => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      code === 0 ? resolve() : reject(new Error(`${command} ${args.join(' ')} exited ${code}`));
    });
  });
}

function start(command, args, cwd = root) {
  const child = spawn(command, args, { cwd, env: process.env, shell: false, stdio: 'inherit', detached: true });
  children.push(child);
  return child;
}

async function ready(url) {
  for (let i = 0; i < 120; i++) {
    try { if ((await fetch(url, { signal: AbortSignal.timeout(900) })).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error(`Preview unavailable: ${url}`);
}

function stopAll() {
  for (const child of children.splice(0)) {
    try { process.kill(-child.pid, 'SIGTERM'); } catch { try { child.kill('SIGTERM'); } catch {} }
  }
}

function removeBaseline() {
  const result = spawnSync('git', ['worktree', 'remove', '--force', baselineDir], { cwd: root, stdio: 'ignore' });
  if (result.status !== 0) fs.rmSync(baselineDir, { recursive: true, force: true });
  spawnSync('git', ['worktree', 'prune'], { cwd: root, stdio: 'ignore' });
}

async function ensureBaselineCommit() {
  const local = spawnSync('git', ['cat-file', '-e', `${baselineCommit}^{commit}`], { cwd: root, stdio: 'ignore' });
  if (local.status === 0) return;
  console.log(`Fetching pinned baseline ${baselineCommit} for exact-main A/B measurement.`);
  await run('git', ['fetch', '--no-tags', '--depth=1', 'origin', baselineCommit], { timeoutMs: 120000 });
}

const validationEnv = { ...process.env, MAPLES_TEST_BASE_URL: candidateUrl };
try {
  removeBaseline();
  await ensureBaselineCommit();
  await run('git', ['worktree', 'add', '--detach', baselineDir, baselineCommit], { timeoutMs: 120000 });
  const nodeModules = path.join(baselineDir, 'node_modules');
  fs.rmSync(nodeModules, { recursive: true, force: true });
  fs.symlinkSync(path.join(root, 'node_modules'), nodeModules, process.platform === 'win32' ? 'junction' : 'dir');
  await run('npm', ['run', 'build'], { cwd: baselineDir, timeoutMs: 180000 });

  start('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], root);
  start('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4174'], baselineDir);
  await Promise.all([ready(candidateUrl), ready(baselineUrl)]);

  await run('node', ['tests/movement-e2e.mjs'], { env: validationEnv, timeoutMs: 240000 });
  await run('node', ['tests/rowan-animation-e2e.mjs'], { env: validationEnv, timeoutMs: 240000 });
  await run('node', ['tests/ghost-visibility-e2e.mjs'], { env: validationEnv, timeoutMs: 180000 });
  await run('node', ['tests/visual-smoke.mjs'], { env: validationEnv, timeoutMs: 240000 });

  await run('node', ['tests/performance-branches.mjs'], {
    env: {
      ...process.env,
      MAPLES_CANDIDATE_URL: candidateUrl,
      MAPLES_BASELINE_URL: baselineUrl,
      MAPLES_BASELINE_COMMIT: baselineCommit,
      MAPLES_PERF_REPORT: 'dist/perf-branch-report.json',
    },
    timeoutMs: 600000,
  });
  console.log('PERFORMANCE BRANCH RUNNER PASS');
} finally {
  stopAll();
  removeBaseline();
}

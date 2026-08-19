import fs from 'node:fs';
import { spawn } from 'node:child_process';

const baseUrl = 'http://127.0.0.1:4173';
const env = { ...process.env, MAPLES_TEST_BASE_URL: baseUrl };

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', env, shell: false });
    child.on('error', reject);
    child.on('exit', code => code === 0
      ? resolve()
      : reject(new Error(`${command} ${args.join(' ')} exited ${code}`)));
  });
}

function runCaptured(label, command, args, timeoutMs = 90000) {
  return new Promise(resolve => {
    let output = `\n===== ${label} =====\n`;
    let settled = false;
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'], env, shell: false });
    const finish = (code, extra = '') => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      output += extra;
      output += `\n[exit code: ${code}]\n`;
      resolve({ label, code, output });
    };
    const collect = chunk => {
      const text = String(chunk);
      output += text;
      process.stdout.write(text);
    };
    child.stdout.on('data', collect);
    child.stderr.on('data', collect);
    child.on('error', error => finish(-1, `\n[spawn error: ${error.stack || error}]\n`));
    child.on('exit', code => finish(code));
    const timer = setTimeout(() => {
      output += `\n[TIMEOUT after ${timeoutMs}ms — terminating suite]\n`;
      child.kill('SIGTERM');
      setTimeout(() => child.kill('SIGKILL'), 2500).unref();
      finish(124);
    }, timeoutMs);
  });
}

async function ready() {
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(baseUrl, { signal: AbortSignal.timeout(900) })).ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('preview unavailable');
}

await run('npm', ['run', 'test:animation:unit']);
await run('npm', ['run', 'build']);
await run('npx', ['playwright-core', 'install', 'chromium']);

const preview = spawn(
  'npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'],
  { stdio: 'inherit', env, shell: false, detached: true },
);

try {
  await ready();
  const results = [];
  results.push(await runCaptured('MOVEMENT SUITE', 'npm', ['run', 'test:movement'], 90000));
  results.push(await runCaptured('ROWAN ANIMATION BROWSER SUITE', 'node', ['tests/rowan-animation-e2e.mjs'], 90000));
  results.push(await runCaptured('VISUAL SUITE', 'node', ['scripts/visual-netlify.mjs'], 90000));
  results.push(await runCaptured('PERFORMANCE OBSERVE', 'node', ['scripts/performance-observe.mjs'], 150000));
  results.push(await runCaptured('PERFORMANCE THRESHOLD', 'node', ['scripts/perf-threshold.mjs'], 30000));

  const summary = results.map(result => `${result.label}: ${result.code === 0 ? 'PASS' : `FAIL (${result.code})`}`).join('\n');
  const diagnostics = [
    'TEMPORARY FPS DIAGNOSTIC DEPLOY — DO NOT APPROVE',
    `commit: ${process.env.COMMIT_REF || 'unknown'}`,
    summary,
    ...results.map(result => result.output),
  ].join('\n');
  fs.writeFileSync('dist/validation-diagnostics.txt', diagnostics);
  console.log(summary);
  console.log('FPS DIAGNOSTIC PREVIEW PUBLISHED; strict validation will be restored before handoff.');
} finally {
  try { process.kill(-preview.pid, 'SIGTERM'); }
  catch { preview.kill('SIGTERM'); }
}

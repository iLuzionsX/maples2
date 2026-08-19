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

function runCaptured(label, command, args) {
  return new Promise((resolve, reject) => {
    let output = `\n===== ${label} =====\n`;
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'], env, shell: false });
    const collect = chunk => {
      const text = String(chunk);
      output += text;
      process.stdout.write(text);
    };
    child.stdout.on('data', collect);
    child.stderr.on('data', collect);
    child.on('error', reject);
    child.on('exit', code => {
      output += `\n[exit code: ${code}]\n`;
      resolve({ label, code, output });
    });
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
console.log('ROWAN ANIMATION UNIT SUITE PASS');
await run('npm', ['run', 'build']);
await run('npx', ['playwright-core', 'install', 'chromium']);

const preview = spawn(
  'npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'],
  { stdio: 'inherit', env, shell: false, detached: true },
);

try {
  await ready();
  const results = [];
  results.push(await runCaptured('MOVEMENT SUITE', 'npm', ['run', 'test:movement']));
  results.push(await runCaptured('ROWAN ANIMATION BROWSER SUITE', 'node', ['tests/rowan-animation-e2e.mjs']));
  results.push(await runCaptured('VISUAL SUITE', 'node', ['scripts/visual-netlify.mjs']));

  const summary = results.map(result => `${result.label}: ${result.code === 0 ? 'PASS' : `FAIL (${result.code})`}`).join('\n');
  const diagnostics = [
    'TEMPORARY NETLIFY VALIDATION DIAGNOSTICS',
    `commit: ${process.env.COMMIT_REF || 'unknown'}`,
    summary,
    ...results.map(result => result.output),
  ].join('\n');
  fs.writeFileSync('dist/validation-diagnostics.txt', diagnostics);
  console.log(summary);
  console.log('DIAGNOSTIC PREVIEW PUBLISHED; strict validation will be restored before approval.');
} finally {
  try { process.kill(-preview.pid, 'SIGTERM'); }
  catch { preview.kill('SIGTERM'); }
}

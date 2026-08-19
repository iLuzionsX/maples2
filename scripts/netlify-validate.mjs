import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = 'http://127.0.0.1:4173';
const env = { ...process.env, MAPLES_TEST_BASE_URL: baseUrl };
const diagnosticPath = path.resolve('dist/netlify-diagnostic.json');
const report = { generatedAt: new Date().toISOString(), stages: {} };

function tail(text, limit = 12000) {
  return text.length > limit ? text.slice(-limit) : text;
}

function runCapture(command, args) {
  return new Promise(resolve => {
    let stdout = '';
    let stderr = '';
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'], env, shell: false });
    child.stdout.on('data', chunk => { const text = String(chunk); stdout += text; process.stdout.write(text); });
    child.stderr.on('data', chunk => { const text = String(chunk); stderr += text; process.stderr.write(text); });
    child.on('error', error => resolve({ code: -1, stdout: tail(stdout), stderr: tail(`${stderr}\n${error.stack || error}`) }));
    child.on('exit', code => resolve({ code: code ?? -1, stdout: tail(stdout), stderr: tail(stderr) }));
  });
}

function save() {
  fs.mkdirSync(path.dirname(diagnosticPath), { recursive: true });
  fs.writeFileSync(diagnosticPath, JSON.stringify(report, null, 2));
}

async function ready() {
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(baseUrl, { signal: AbortSignal.timeout(900) })).ok) return true;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  return false;
}

report.stages.build = await runCapture('npm', ['run', 'build']);
save();
if (report.stages.build.code !== 0) {
  report.failedStage = 'build';
  save();
  console.error('DIAGNOSTIC MODE: build failed; publishing report instead of approving validation.');
  process.exit(0);
}

report.stages.chromiumInstall = await runCapture('npx', ['playwright-core', 'install', 'chromium']);
save();
if (report.stages.chromiumInstall.code !== 0) {
  report.failedStage = 'chromiumInstall';
  save();
  console.error('DIAGNOSTIC MODE: Chromium install failed; publishing report.');
  process.exit(0);
}

const preview = spawn(
  'npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'],
  { stdio: 'inherit', env, shell: false, detached: true },
);

try {
  report.stages.previewReady = { code: (await ready()) ? 0 : 1 };
  save();
  if (report.stages.previewReady.code !== 0) {
    report.failedStage = 'previewReady';
    save();
  } else {
    report.stages.movement = await runCapture('npm', ['run', 'test:movement']);
    save();
    if (report.stages.movement.code !== 0) {
      report.failedStage = 'movement';
    } else {
      report.stages.visual = await runCapture('node', ['scripts/visual-netlify.mjs']);
      save();
      if (report.stages.visual.code !== 0) report.failedStage = 'visual';
    }
    report.status = report.failedStage ? 'diagnostic-failure' : 'diagnostic-pass';
    save();
  }
} finally {
  try { process.kill(-preview.pid, 'SIGTERM'); }
  catch { preview.kill('SIGTERM'); }
}

console.log(`NETLIFY DIAGNOSTIC COMPLETE: ${report.failedStage || 'all validation stages passed'}`);
console.log('This diagnostic deploy is NOT an approval gate; strict failure behavior will be restored after diagnosis.');

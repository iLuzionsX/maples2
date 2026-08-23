import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const oxDir = path.join(root, 'dist', '__ox');

function writeStatus(stage, ok, detail = '') {
  fs.mkdirSync(oxDir, { recursive: true });
  const payload = {
    generated_at: new Date().toISOString(),
    stage,
    ok,
    detail: String(detail || '').slice(0, 4000),
    commit_ref: process.env.COMMIT_REF || '',
    context: process.env.CONTEXT || '',
  };
  fs.writeFileSync(path.join(oxDir, 'harness-status.json'), JSON.stringify(payload, null, 2));
  fs.writeFileSync(path.join(oxDir, 'index.html'), `<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Maples Ox Harness</title>
<style>
body{margin:0;background:#07100f;color:#f5efdf;font:15px system-ui;padding:24px}
main{max-width:900px;margin:auto}h1{font-size:22px}.ok{color:#8de0bd}.fail{color:#ff9b83}
pre{white-space:pre-wrap;background:#0d1a18;border:1px solid #28423c;padding:16px;border-radius:10px}
a{color:#d9bb72}
</style>
<main>
<h1>Maples — Ox delegation harness</h1>
<p class="${ok ? 'ok' : 'fail'}">${ok ? 'PASS' : 'DIAGNOSTIC PREVIEW'} · ${stage}</p>
<pre>${payload.detail.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</pre>
<p>See <a href="harness-status.json">harness-status.json</a> and the per-job JSON files in this directory.</p>
</main>`);
  return payload;
}

function run(command, args, label, timeoutMs = 900000) {
  return new Promise(resolve => {
    const child = spawn(command, args, {
      cwd: root,
      env: process.env,
      shell: false,
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: true,
    });
    let tail = '';
    const append = chunk => {
      const text = String(chunk);
      tail = (tail + text).slice(-24000);
      process.stdout.write(text);
    };
    child.stdout.on('data', append);
    child.stderr.on('data', chunk => {
      const text = String(chunk);
      tail = (tail + text).slice(-24000);
      process.stderr.write(text);
    });
    let settled = false;
    const finish = (code, error = null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ code, error, tail });
    };
    child.on('error', error => finish(1, error));
    child.on('exit', code => finish(code ?? 1));
    const timer = setTimeout(() => {
      try { process.kill(-child.pid, 'SIGTERM'); } catch { child.kill('SIGTERM'); }
      setTimeout(() => {
        try { process.kill(-child.pid, 'SIGKILL'); } catch { child.kill('SIGKILL'); }
      }, 2000).unref();
      finish(124, new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
}

export async function main() {
  fs.mkdirSync(oxDir, { recursive: true });

  const baseline = await run('npm', ['run', 'build'], 'baseline build', 120000);
  if (baseline.code !== 0) {
    writeStatus('baseline-build', false, baseline.error?.message || baseline.tail);
    throw new Error('Baseline build failed before Ox delegation.');
  }
  writeStatus('baseline-ready', true, 'Baseline build passed; starting Ox delegation.');

  const delegation = await run('node', ['scripts/ox-delegate-resilient.mjs'], 'Ox delegation');
  if (delegation.code !== 0) {
    writeStatus('delegation', false, delegation.error?.message || delegation.tail);
    console.error('OX HARNESS DIAGNOSTIC: delegation failed; publishing baseline plus diagnostics.');
    return;
  }

  const verification = await run('node', ['scripts/ox-verify-output.mjs'], 'Ox verification', 120000);
  if (verification.code !== 0) {
    writeStatus('verification', false, verification.error?.message || verification.tail);
    console.error('OX HARNESS DIAGNOSTIC: verification failed; publishing baseline plus diagnostics.');
    return;
  }

  const render = await run('node', ['scripts/ox-render-graphics-preview.mjs'], 'Ox graphics render', 600000);
  if (render.code !== 0) {
    writeStatus('render-validation', false, render.error?.message || render.tail);
    console.error('OX HARNESS DIAGNOSTIC: patched render validation failed; publishing diagnostics.');
    return;
  }

  writeStatus('complete', true, 'Ox delegation, verification, patched build, desktop validation and mobile validation passed.');
  console.log('OX HARNESS PASS');
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) {
  main().catch(error => {
    console.error(`OX HARNESS FATAL: ${error?.message || error}`);
    process.exit(1);
  });
}

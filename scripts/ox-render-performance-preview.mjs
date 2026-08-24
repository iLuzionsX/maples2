import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const root = process.cwd();
const sourcePath = path.join(root, 'src', 'game', 'OxPerformancePass.js');
const resultPath = path.join(root, 'dist', '__ox', 'performance-ab-ox-20260824.json');
const outputDir = path.join(root, 'dist', '__ox');

function run(command, args, timeoutMs = 600000) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, env: process.env, shell: false, stdio: 'inherit', detached: true });
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

if (!fs.existsSync(resultPath)) throw new Error('Ox performance source result is missing.');
const result = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
if (result.verified !== true || result.mode !== 'source-rewrite') throw new Error('Ox performance source result is not approved.');
if (JSON.stringify(result.changed_files) !== JSON.stringify(['src/game/OxPerformancePass.js'])) throw new Error('Ox performance source changed unexpected files.');
if (!/export\s+function\s+installOxPerformancePass\s*\(/.test(result.output)) throw new Error('Ox performance export contract is missing.');

const syntaxPath = path.join(root, '.ox', '.OxPerformancePass.generated-check.mjs');
fs.mkdirSync(path.dirname(syntaxPath), { recursive: true });
fs.writeFileSync(syntaxPath, result.output);
const syntax = spawnSync(process.execPath, ['--check', syntaxPath], { encoding: 'utf8', maxBuffer: 2 * 1024 * 1024 });
fs.rmSync(syntaxPath, { force: true });
if (syntax.error || syntax.status !== 0) {
  throw new Error(`Ox performance syntax check failed: ${String(syntax.stderr || syntax.stdout || syntax.error?.message || '').trim().slice(0, 1200)}`);
}

const original = fs.readFileSync(sourcePath, 'utf8');
const preservedResult = Buffer.from(JSON.stringify(result, null, 2));
let replaced = false;
try {
  fs.writeFileSync(sourcePath, result.output);
  replaced = true;
  console.log(`OX PERFORMANCE SOURCE INSTALLED: ${result.output_sha256}`);
  await run('node', ['scripts/netlify-validate.mjs'], 600000);

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(resultPath, preservedResult);
  fs.writeFileSync(path.join(outputDir, 'latest.json'), JSON.stringify({ generated_at: result.created_at, results: [result] }, null, 2));
  fs.writeFileSync(path.join(outputDir, 'variant.txt'), `Ox Alpha performance A/B\n${result.model}\n${result.output_sha256}\n`);
  console.log('OX PERFORMANCE SOURCE PREVIEW PASS');
} finally {
  if (replaced) fs.writeFileSync(sourcePath, original);
}

import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const root = process.cwd();
const jobPath = path.join(root, '.ox', 'jobs', 'graphics-realism-ab.json');
const oxDir = path.join(root, 'dist', '__ox');
const resultPath = path.join(oxDir, 'graphics-realism-ab.json');

function run(command, args, timeoutMs = 420000) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const child = spawn(command, args, { cwd: root, stdio: 'inherit', shell: false, detached: true, env: process.env });
    const finish = error => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      error ? reject(error) : resolve();
    };
    child.on('error', finish);
    child.on('exit', code => code === 0 ? finish() : finish(new Error(`${command} ${args.join(' ')} exited ${code}`)));
    const timer = setTimeout(() => {
      try { process.kill(-child.pid, 'SIGTERM'); } catch { child.kill('SIGTERM'); }
      setTimeout(() => { try { process.kill(-child.pid, 'SIGKILL'); } catch { child.kill('SIGKILL'); } }, 2000).unref();
      finish(new Error(`${command} ${args.join(' ')} timed out`));
    }, timeoutMs);
  });
}

function applyPatch(patch, reverse = false) {
  const args = ['apply', '--whitespace=nowarn'];
  if (reverse) args.push('-R');
  args.push('-');
  const result = spawnSync('git', args, { cwd: root, input: patch, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  if (result.error || result.status !== 0) {
    const detail = String(result.stderr || result.stdout || result.error?.message || '').trim().slice(0, 1000);
    throw new Error(`Unable to ${reverse ? 'reverse' : 'apply'} Ox graphics patch${detail ? `: ${detail}` : ''}`);
  }
}

const job = fs.existsSync(jobPath) ? JSON.parse(fs.readFileSync(jobPath, 'utf8')) : null;
if (!job?.enabled) {
  console.log('OX GRAPHICS RENDER SKIP: job disabled');
  process.exit(0);
}
if (!fs.existsSync(resultPath)) throw new Error('Verified Ox graphics result is missing.');
const result = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
if (result.verified !== true || result.mode !== 'patch') throw new Error('Ox graphics result is not a verified patch.');

const allowed = [...job.files].sort();
const changed = [...(result.changed_files || [])].sort();
if (JSON.stringify(allowed.filter(file => changed.includes(file))) !== JSON.stringify(changed)) {
  throw new Error(`Unexpected Ox graphics patch scope: ${JSON.stringify(changed)}`);
}

const preserved = new Map();
if (fs.existsSync(oxDir)) {
  for (const name of fs.readdirSync(oxDir)) {
    const full = path.join(oxDir, name);
    if (fs.statSync(full).isFile()) preserved.set(name, fs.readFileSync(full));
  }
}

let applied = false;
try {
  applyPatch(result.output, false);
  applied = true;
  await run('node', ['scripts/netlify-validate.mjs']);
  fs.mkdirSync(oxDir, { recursive: true });
  for (const [name, data] of preserved) fs.writeFileSync(path.join(oxDir, name), data);
  fs.writeFileSync(path.join(oxDir, 'variant.txt'), `Ox graphics A/B\n${result.output_sha256 || ''}\n`);
  console.log(`OX GRAPHICS PREVIEW PASS: ${changed.join(', ')}`);
} finally {
  if (applied) applyPatch(result.output, true);
}

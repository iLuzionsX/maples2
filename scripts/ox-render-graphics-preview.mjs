import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const root = process.cwd();
const jobDir = path.join(root, '.ox', 'jobs');
const oxDir = path.join(root, 'dist', '__ox');

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
  const result = spawnSync('git', args, {
    cwd: root,
    input: patch,
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) {
    const detail = String(result.stderr || result.stdout || result.error?.message || '').trim().slice(0, 1000);
    throw new Error(`Unable to ${reverse ? 'reverse' : 'apply'} Ox graphics patch${detail ? `: ${detail}` : ''}`);
  }
}

function loadGraphicsJobs() {
  if (!fs.existsSync(jobDir)) return [];
  return fs.readdirSync(jobDir)
    .filter(name => name.endsWith('.json'))
    .sort()
    .map(name => ({
      name,
      job: JSON.parse(fs.readFileSync(path.join(jobDir, name), 'utf8')),
    }))
    .filter(({ job }) => job?.enabled === true && String(job.id || '').startsWith('graphics-realism-'));
}

const jobs = loadGraphicsJobs();
if (!jobs.length) {
  console.log('OX GRAPHICS RENDER SKIP: no enabled graphics jobs');
  process.exit(0);
}

const variants = jobs.map(({ name, job }) => {
  const resultPath = path.join(oxDir, `${job.id}.json`);
  if (!fs.existsSync(resultPath)) throw new Error(`${name}: verified Ox result is missing.`);
  const result = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
  if (result.verified !== true || result.mode !== 'patch') throw new Error(`${job.id}: result is not a verified patch.`);

  const allowed = new Set(Array.isArray(job.files) ? job.files : []);
  const changed = Array.isArray(result.changed_files) ? result.changed_files : [];
  if (!changed.length || changed.some(file => !allowed.has(file))) {
    throw new Error(`${job.id}: unexpected patch scope ${JSON.stringify(changed)}`);
  }
  return { job, result, changed };
});

const preserved = new Map();
if (fs.existsSync(oxDir)) {
  for (const name of fs.readdirSync(oxDir)) {
    const full = path.join(oxDir, name);
    if (fs.statSync(full).isFile()) preserved.set(name, fs.readFileSync(full));
  }
}

const applied = [];
try {
  for (const variant of variants) {
    applyPatch(variant.result.output, false);
    applied.push(variant);
    console.log(`OX GRAPHICS PATCH APPLIED: ${variant.job.id} -> ${variant.changed.join(', ')}`);
  }

  await run('node', ['scripts/netlify-validate.mjs']);

  fs.mkdirSync(oxDir, { recursive: true });
  for (const [name, data] of preserved) fs.writeFileSync(path.join(oxDir, name), data);

  const manifest = {
    generated_at: new Date().toISOString(),
    variant: 'Ox graphics A/B',
    jobs: variants.map(({ job, result, changed }) => ({
      id: job.id,
      model: result.model,
      reasoning_effort: result.reasoning_effort,
      attempts: result.attempts,
      output_sha256: result.output_sha256,
      changed_files: changed,
    })),
  };
  fs.writeFileSync(path.join(oxDir, 'graphics-variant.json'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(
    path.join(oxDir, 'variant.txt'),
    `Ox graphics A/B\n${manifest.jobs.map(item => `${item.id} ${item.output_sha256 || ''}`).join('\n')}\n`,
  );
  console.log(`OX GRAPHICS PREVIEW PASS: ${manifest.jobs.map(item => item.id).join(', ')}`);
} finally {
  for (const variant of applied.reverse()) {
    applyPatch(variant.result.output, true);
  }
}

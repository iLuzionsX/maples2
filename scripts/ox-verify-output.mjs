import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const JOB_DIR = '.ox/jobs';
const OUTPUT_DIR = 'dist/__ox';

function cleanPath(value) {
  const raw = String(value ?? '').trim().replace(/^['"]|['"]$/g, '').replace(/\\/g, '/');
  if (!raw || raw === '/dev/null') return '';
  const withoutPrefix = raw.replace(/^[ab]\//, '');
  const normalized = path.posix.normalize(withoutPrefix);
  if (!normalized || normalized === '.' || normalized === '..' || normalized.startsWith('../') || normalized.startsWith('/') || normalized === '.git' || normalized.startsWith('.git/')) return '';
  return normalized;
}

export function extractPatchPaths(output) {
  const text = String(output ?? '').replace(/\r\n/g, '\n');
  if (!text.trim()) throw new Error('Ox patch output is empty.');
  if (/^```/m.test(text)) throw new Error('Ox patch output must not contain Markdown fences.');
  if (/^GIT binary patch$/m.test(text) || /^Binary files /m.test(text)) throw new Error('Binary patches are not allowed.');

  const paths = new Set();
  let sawPatchHeader = false;
  for (const line of text.split('\n')) {
    const diff = line.match(/^diff --git a\/(.+) b\/(.+)$/);
    if (diff) {
      sawPatchHeader = true;
      const left = cleanPath(diff[1]);
      const right = cleanPath(diff[2]);
      if (!left || !right || left !== right) throw new Error(`Renames or invalid patch paths are not allowed: ${line}`);
      paths.add(right);
      continue;
    }
    const plus = line.match(/^\+\+\+\s+(.+)$/);
    if (plus) {
      sawPatchHeader = true;
      const file = cleanPath(plus[1].split('\t')[0]);
      if (!file) throw new Error(`New/deleted files are not allowed in delegated patches: ${line}`);
      paths.add(file);
    }
  }

  if (!sawPatchHeader || !paths.size || !/^@@\s/m.test(text)) {
    throw new Error('Ox patch output is not a recognizable unified diff.');
  }
  return [...paths].sort();
}

export function verifyPatchScope(job, output) {
  const changed = extractPatchPaths(output);
  const allowed = new Set((job.files || []).map(cleanPath).filter(Boolean));
  if (!allowed.size) throw new Error(`${job.id}: no allowed files were declared.`);
  const outside = changed.filter(file => !allowed.has(file));
  if (outside.length) throw new Error(`${job.id}: Ox patch touched undeclared files: ${outside.join(', ')}`);
  return changed;
}

export function verifyResult(job, result, commitRef = '') {
  if (!result || typeof result !== 'object') throw new Error(`${job.id}: result JSON is invalid.`);
  if (result.id !== job.id) throw new Error(`${job.id}: result id mismatch.`);
  if (result.mode !== job.mode) throw new Error(`${job.id}: result mode mismatch.`);
  const output = String(result.output ?? '').trim();
  if (!output) throw new Error(`${job.id}: empty result output.`);

  const changedFiles = job.mode === 'patch' ? verifyPatchScope(job, output) : [];
  return {
    ...result,
    verified: true,
    verified_at: new Date().toISOString(),
    input_commit: String(commitRef || ''),
    changed_files: changedFiles,
    output_sha256: crypto.createHash('sha256').update(output).digest('hex')
  };
}

function loadEnabledJobs(rootDir) {
  const dir = path.join(rootDir, JOB_DIR);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(name => name.endsWith('.json'))
    .sort()
    .map(name => JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8')))
    .filter(job => job?.enabled === true)
    .map(job => ({
      id: String(job.id || '').trim(),
      mode: job.mode === 'review' ? 'review' : 'patch',
      files: Array.isArray(job.files) ? job.files : []
    }));
}

export function main(rootDir = process.cwd()) {
  const jobs = loadEnabledJobs(rootDir);
  if (!jobs.length) {
    console.log('OX VERIFY SKIP: no enabled jobs');
    return;
  }

  const outputDir = path.join(rootDir, OUTPUT_DIR);
  const verifiedResults = [];
  for (const job of jobs) {
    if (!job.id) throw new Error('Enabled Ox job is missing id.');
    const resultPath = path.join(outputDir, `${job.id}.json`);
    if (!fs.existsSync(resultPath)) throw new Error(`${job.id}: delegated result file is missing.`);
    const raw = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
    const verified = verifyResult(job, raw, process.env.COMMIT_REF || '');
    fs.writeFileSync(resultPath, JSON.stringify(verified, null, 2));
    verifiedResults.push(verified);
    console.log(`OX VERIFY PASS: ${job.id} (${verified.output_sha256.slice(0, 12)})`);
  }

  const manifest = {
    generated_at: new Date().toISOString(),
    input_commit: String(process.env.COMMIT_REF || ''),
    jobs: verifiedResults
  };
  fs.writeFileSync(path.join(outputDir, 'latest.json'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify({
    generated_at: manifest.generated_at,
    input_commit: manifest.input_commit,
    jobs: verifiedResults.map(result => ({
      id: result.id,
      model: result.model,
      mode: result.mode,
      verified: result.verified,
      output_sha256: result.output_sha256,
      file: `${result.id}.json`
    }))
  }, null, 2));
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) {
  try {
    main();
  } catch (error) {
    console.error(`OX VERIFY FAIL: ${error?.message || error}`);
    process.exit(1);
  }
}

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const JOB_DIR = '.ox/jobs';
const OUTPUT_DIR = 'dist/__ox';
const MAX_CSS_OVERRIDE_BYTES = 200_000;

function cleanPath(value) {
  const raw = String(value ?? '').trim().replace(/^['"]|['"]$/g, '').replace(/\\/g, '/');
  if (!raw || raw === '/dev/null') return '';
  const withoutPrefix = raw.replace(/^[ab]\//, '');
  const normalized = path.posix.normalize(withoutPrefix);
  if (!normalized || normalized === '.' || normalized === '..' || normalized.startsWith('../') || normalized.startsWith('/') || normalized === '.git' || normalized.startsWith('.git/')) return '';
  return normalized;
}

export function normalizePatchOutput(output) {
  let text = String(output ?? '').replace(/\r\n/g, '\n').trim();
  if (!text) throw new Error('Ox patch output is empty.');

  const fenced = text.match(/```(?:diff|patch)?\s*\n([\s\S]*?)\n```/i);
  if (fenced) text = fenced[1].trim();

  const gitStart = text.search(/^diff --git /m);
  const unifiedStart = text.search(/^---\s+(?:a\/|[^\s])/m);
  let start = -1;
  if (gitStart >= 0) start = gitStart;
  else if (unifiedStart >= 0) start = unifiedStart;
  if (start < 0) throw new Error('Ox patch output is not a recognizable unified diff.');

  text = text.slice(start).trim();
  if (/^```/m.test(text)) throw new Error('Ox patch output contains an unexpected Markdown fence.');
  if (/^GIT binary patch$/m.test(text) || /^Binary files /m.test(text)) throw new Error('Binary patches are not allowed.');
  return `${text}\n`;
}

function cssStructuralText(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/"(?:\\.|[^"\\])*"/g, '')
    .replace(/'(?:\\.|[^'\\])*'/g, '');
}

export function normalizeCssOverrideOutput(output) {
  let text = String(output ?? '').replace(/\r\n/g, '\n').trim();
  if (!text) throw new Error('Ox CSS override output is empty.');

  const fullFence = text.match(/^```(?:css)?\s*\n([\s\S]*?)\n```$/i);
  if (fullFence) text = fullFence[1].trim();
  if (/```/.test(text)) throw new Error('Ox CSS override contains an unexpected Markdown fence.');
  if (Buffer.byteLength(text, 'utf8') > MAX_CSS_OVERRIDE_BYTES) throw new Error('Ox CSS override is too large.');
  if (/<\/?(?:script|style|link|iframe|object|embed)\b/i.test(text)) throw new Error('Ox CSS override contains HTML.');
  if (/@import\b/i.test(text)) throw new Error('Ox CSS override may not use @import.');
  if (/\burl\s*\(/i.test(text)) throw new Error('Ox CSS override may not load external or embedded URLs.');
  if (/\bexpression\s*\(/i.test(text) || /javascript\s*:/i.test(text)) throw new Error('Ox CSS override contains unsafe CSS.');

  const structural = cssStructuralText(text);
  let depth = 0;
  let sawBlock = false;
  for (const ch of structural) {
    if (ch === '{') {
      depth += 1;
      sawBlock = true;
    } else if (ch === '}') {
      depth -= 1;
      if (depth < 0) throw new Error('Ox CSS override has unbalanced braces.');
    }
  }
  if (!sawBlock || depth !== 0) throw new Error('Ox CSS override is not structurally valid CSS.');
  return `${text}\n`;
}

export function extractPatchPaths(output) {
  const text = normalizePatchOutput(output);
  const paths = new Set();
  let sawHeader = false;
  let sawHunk = false;
  let pendingOld = '';

  for (const line of text.split('\n')) {
    const diff = line.match(/^diff --git a\/(.+) b\/(.+)$/);
    if (diff) {
      sawHeader = true;
      const left = cleanPath(diff[1]);
      const right = cleanPath(diff[2]);
      if (!left || !right || left !== right) throw new Error(`Renames or invalid patch paths are not allowed: ${line}`);
      paths.add(right);
      pendingOld = '';
      continue;
    }

    const minus = line.match(/^---\s+(.+?)(?:\t.*)?$/);
    if (minus) {
      sawHeader = true;
      pendingOld = cleanPath(minus[1]);
      if (!pendingOld) throw new Error(`New/deleted files are not allowed in delegated patches: ${line}`);
      continue;
    }

    const plus = line.match(/^\+\+\+\s+(.+?)(?:\t.*)?$/);
    if (plus) {
      sawHeader = true;
      const next = cleanPath(plus[1]);
      if (!next) throw new Error(`New/deleted files are not allowed in delegated patches: ${line}`);
      if (pendingOld && pendingOld !== next) throw new Error(`Renames are not allowed: ${pendingOld} -> ${next}`);
      paths.add(next);
      pendingOld = '';
      continue;
    }

    if (/^@@\s/.test(line)) sawHunk = true;
  }

  if (!sawHeader || !sawHunk || !paths.size) throw new Error('Ox patch output is not a recognizable unified diff.');
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

export function verifyCssOverrideScope(job, output) {
  normalizeCssOverrideOutput(output);
  const files = (job.files || []).map(cleanPath).filter(Boolean);
  if (files.length !== 1 || !files[0].toLowerCase().endsWith('.css')) {
    throw new Error(`${job.id}: css-override mode requires exactly one declared .css file.`);
  }
  return files;
}

export function verifyPatchApplies(output, rootDir = process.cwd()) {
  const patch = normalizePatchOutput(output);
  const result = spawnSync('git', ['apply', '--check', '--whitespace=nowarn', '-'], {
    cwd: rootDir,
    input: patch,
    encoding: 'utf8',
    maxBuffer: 4 * 1024 * 1024
  });
  if (result.error) throw new Error(`Unable to run git apply --check: ${result.error.message}`);
  if (result.status !== 0) {
    const detail = String(result.stderr || result.stdout || '').trim().replace(/\s+/g, ' ').slice(0, 500);
    throw new Error(`Ox patch does not apply cleanly to the delegated checkout${detail ? `: ${detail}` : '.'}`);
  }
  return true;
}

export function verifyResult(job, result, commitRef = '', rootDir = '') {
  if (!result || typeof result !== 'object') throw new Error(`${job.id}: result JSON is invalid.`);
  if (result.id !== job.id) throw new Error(`${job.id}: result id mismatch.`);
  if (result.mode !== job.mode) throw new Error(`${job.id}: result mode mismatch.`);
  const originalOutput = String(result.output ?? '').replace(/\r\n/g, '\n');
  if (!originalOutput.trim()) throw new Error(`${job.id}: empty result output.`);

  let output;
  let changedFiles = [];
  if (job.mode === 'patch') {
    output = normalizePatchOutput(originalOutput);
    changedFiles = verifyPatchScope(job, output);
    if (rootDir) verifyPatchApplies(output, rootDir);
  } else if (job.mode === 'css-override') {
    output = normalizeCssOverrideOutput(originalOutput);
    changedFiles = verifyCssOverrideScope(job, output);
  } else {
    output = originalOutput.trim();
  }

  return {
    ...result,
    output,
    verified: true,
    verified_at: new Date().toISOString(),
    input_commit: String(commitRef || ''),
    changed_files: changedFiles,
    output_sha256: crypto.createHash('sha256').update(output).digest('hex'),
    normalized_output: output !== originalOutput
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
      mode: job.mode === 'review' ? 'review' : job.mode === 'css-override' ? 'css-override' : 'patch',
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
    const verified = verifyResult(job, raw, process.env.COMMIT_REF || '', rootDir);
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
      reasoning_effort: result.reasoning_effort,
      verified: result.verified,
      changed_files: result.changed_files,
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

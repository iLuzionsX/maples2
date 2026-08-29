import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { MAX_PATCH_BYTES, cleanText, normalizeRelativePath, pathIsAllowed } from './schema.mjs';
import { redactSecrets } from './security.mjs';

export function patchHeaderPath(value) {
  const raw = String(value ?? '').trim().replace(/^['"]|['"]$/g, '').replace(/\\/g, '/');
  const withoutTimestamp = raw.split(/\t/)[0];
  if (!withoutTimestamp || withoutTimestamp === '/dev/null') return '';
  const headerPath = withoutTimestamp.replace(/^[ab]\//, '');
  return normalizeRelativePath(headerPath);
}

export function normalizePatchOutput(output, maxBytes = MAX_PATCH_BYTES) {
  let text = String(output ?? '').replace(/\r\n/g, '\n').trim();
  if (!text) throw new Error('Kimi patch output is empty.');
  const fenced = text.match(/```(?:diff|patch)?\s*\n([\s\S]*?)\n```/i);
  if (fenced) text = fenced[1].trim();
  const gitStart = text.search(/^diff --git /m);
  const unifiedStart = text.search(/^---\s+(?:a\/|[^\s])/m);
  const start = gitStart >= 0 ? gitStart : unifiedStart;
  if (start < 0) throw new Error('Kimi patch output is not a recognizable unified diff.');
  text = text.slice(start).trim();
  if (/^```/m.test(text) || /^GIT binary patch$/m.test(text) || /^Binary files /m.test(text)) throw new Error('Kimi patch output is unsafe or malformed.');
  if (Buffer.byteLength(text, 'utf8') > maxBytes) throw new Error(`Kimi patch exceeds ${maxBytes} bytes.`);
  return `${text}\n`;
}

export function extractPatchPaths(output) {
  const text = normalizePatchOutput(output);
  const paths = new Set();
  let pendingOld = '';
  let sawHunk = false;
  for (const line of text.split('\n')) {
    const diff = line.match(/^diff --git a\/(.+) b\/(.+)$/);
    if (diff) {
      const left = normalizeRelativePath(diff[1]);
      const right = normalizeRelativePath(diff[2]);
      if (!left || !right || left !== right) throw new Error('Kimi renames or invalid patch paths are not allowed.');
      paths.add(right);
      pendingOld = '';
      continue;
    }
    const oldHeader = line.match(/^---\s+(.+?)(?:\t.*)?$/);
    if (oldHeader) {
      pendingOld = patchHeaderPath(oldHeader[1]);
      if (!pendingOld) throw new Error('Kimi new/deleted files are not allowed.');
      continue;
    }
    const newHeader = line.match(/^\+\+\+\s+(.+?)(?:\t.*)?$/);
    if (newHeader) {
      const next = patchHeaderPath(newHeader[1]);
      if (!next || (pendingOld && pendingOld !== next)) throw new Error('Kimi new/deleted files and renames are not allowed.');
      paths.add(next);
      pendingOld = '';
      continue;
    }
    if (/^@@\s/.test(line)) sawHunk = true;
  }
  if (!paths.size || !sawHunk) throw new Error('Kimi patch output has no valid hunk.');
  return [...paths].sort();
}

export function verifyPatchScope(job, output) {
  const normalized = normalizePatchOutput(output, job.maxPatchBytes);
  const changedFiles = extractPatchPaths(normalized);
  if (changedFiles.length > job.maxChangedFiles) throw new Error(`Kimi patch changes ${changedFiles.length} files; max is ${job.maxChangedFiles}.`);
  const outside = changedFiles.filter(file => !pathIsAllowed(file, job.allowedFiles));
  if (outside.length) throw new Error(`${job.id}: Kimi patch touched undeclared files: ${outside.join(', ')}`);
  if (job.legacyMode === 'css-override') throw new Error('CSS override jobs must use a dedicated CSS output and are not supported by the direct patch controller.');
  return { patch: normalized, changedFiles };
}

export function verifyPatchApplies(output, rootDir) {
  const result = spawnSync('git', ['apply', '--check', '--whitespace=nowarn', '-'], {
    cwd: rootDir,
    input: normalizePatchOutput(output),
    encoding: 'utf8',
    maxBuffer: 4 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) {
    const detail = String(result.stderr || result.stdout || '').trim().replace(/[\r\n]+/g, ' ').slice(0, 500);
    throw new Error(`Kimi patch does not apply cleanly${detail ? `: ${detail}` : '.'}`);
  }
  return true;
}

export function validatePatch(job, output, rootDir = '') {
  const checked = verifyPatchScope(job, output);
  if (redactSecrets(checked.patch) !== checked.patch) throw new Error('Kimi patch contains secret-shaped content and was rejected.');
  if (rootDir) verifyPatchApplies(checked.patch, rootDir);
  return checked;
}

export function patchFromResult(result) {
  if (!result) return '';
  if (typeof result.patch === 'string') return result.patch;
  if (typeof result.patch?.content === 'string') return result.patch.content;
  if (typeof result.output === 'string' && /^\s*(?:diff --git|---\s)/m.test(result.output)) return result.output;
  return '';
}

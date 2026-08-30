#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { validateEnabledJobs, validateJob } from './kimi-agent/schema.mjs';
import { validatePatch } from './kimi-agent/patch.mjs';
import { redactSecrets, sanitizedError } from './kimi-agent/security.mjs';

const JOB_DIR = '.kimi/jobs';
const OUTPUT_DIR = 'dist/__kimi';

function loadJobs(rootDir) {
  const directory = path.join(rootDir, JOB_DIR);
  if (!fs.existsSync(directory)) return [];
  return validateEnabledJobs(fs.readdirSync(directory).filter(name => name.endsWith('.json')).sort().map(name => validateJob(JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8')), name)).filter(job => job.enabled));
}

export function verifyArtifact(job, result, rootDir) {
  if (!result || result.job_id !== job.id || result.mode !== job.mode) throw new Error(`${job.id}: result metadata mismatch.`);
  if (result.status === 'completed' && job.mode === 'implementation' && result.patch?.content) {
    const checked = validatePatch(job, result.patch.content, rootDir);
    result.patch = { ...result.patch, format: checked.format || 'unified_diff', content: checked.patch, changed_files: checked.changedFiles, sha256: crypto.createHash('sha256').update(checked.patch).digest('hex') };
    result.files_proposed_for_change = checked.changedFiles;
  } else if (job.mode === 'review' && result.patch != null) {
    throw new Error(`${job.id}: review-only result contains an applicable patch.`);
  }
  result.verified = true;
  result.verified_at = new Date().toISOString();
  return redactSecrets(result);
}

export function main(rootDir = process.cwd()) {
  const jobs = loadJobs(rootDir);
  if (!jobs.length) { console.log('KIMI VERIFY SKIP: no enabled jobs'); return; }
  const outputDir = path.join(rootDir, OUTPUT_DIR);
  const verified = [];
  for (const job of jobs) {
    const resultPath = path.join(outputDir, `${job.id}.json`);
    if (!fs.existsSync(resultPath)) throw new Error(`${job.id}: delegated result is missing.`);
    const result = verifyArtifact(job, JSON.parse(fs.readFileSync(resultPath, 'utf8')), rootDir);
    fs.writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`);
    verified.push(result);
    console.log(`KIMI VERIFY PASS: ${job.id} (${result.status})`);
  }
  const manifest = { schema_version: 1, generated_at: new Date().toISOString(), input_commit: String(process.env.COMMIT_REF || ''), jobs: verified };
  fs.writeFileSync(path.join(outputDir, 'latest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  fs.writeFileSync(path.join(outputDir, 'index.json'), `${JSON.stringify({ schema_version: 1, generated_at: manifest.generated_at, input_commit: manifest.input_commit, jobs: verified.map(result => ({ id: result.job_id, status: result.status, verified: result.verified, changed_files: result.files_proposed_for_change || [], file: `${result.job_id}.json` })) }, null, 2)}\n`);
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) { try { main(); } catch (error) { console.error(`KIMI VERIFY FAIL: ${sanitizedError(error)}`); process.exit(1); } }

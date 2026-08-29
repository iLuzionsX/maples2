import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { validateJob, verifyResult } from './kimi-delegate.mjs';

const JOB_DIR = '.kimi/jobs';
const OUTPUT_DIR = 'dist/__kimi';

export function main(rootDir = process.cwd()) {
  const jobDir = path.join(rootDir, JOB_DIR);
  if (!fs.existsSync(jobDir)) { console.log('KIMI VERIFY SKIP: no job directory'); return; }
  const jobs = fs.readdirSync(jobDir).filter(name => name.endsWith('.json')).sort().map(name => validateJob(JSON.parse(fs.readFileSync(path.join(jobDir, name), 'utf8')), name)).filter(job => job.enabled);
  if (!jobs.length) { console.log('KIMI VERIFY SKIP: no enabled jobs'); return; }
  const outputDir = path.join(rootDir, OUTPUT_DIR);
  const verified = [];
  for (const job of jobs) {
    const resultPath = path.join(outputDir, `${job.id}.json`);
    if (!fs.existsSync(resultPath)) throw new Error(`${job.id}: delegated result is missing.`);
    const result = verifyResult(job, JSON.parse(fs.readFileSync(resultPath, 'utf8')), rootDir);
    result.output_sha256 = crypto.createHash('sha256').update(result.output).digest('hex');
    fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));
    verified.push(result);
    console.log(`KIMI VERIFY PASS: ${job.id} (${result.output_sha256.slice(0, 12)})`);
  }
  const manifest = { generated_at: new Date().toISOString(), input_commit: String(process.env.COMMIT_REF || ''), jobs: verified };
  fs.writeFileSync(path.join(outputDir, 'latest.json'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify({ generated_at: manifest.generated_at, input_commit: manifest.input_commit, jobs: verified.map(result => ({ id: result.id, model: result.model, mode: result.mode, verified: result.verified, changed_files: result.changed_files, output_sha256: result.output_sha256, file: `${result.id}.json` })) }, null, 2));
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) { try { main(); } catch (error) { console.error(`KIMI VERIFY FAIL: ${error?.message || error}`); process.exit(1); } }

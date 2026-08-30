import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateEnabledJobs, validateJob, cleanText } from './kimi-agent/schema.mjs';
import { NvidiaNimClient } from './kimi-agent/nim.mjs';
import { resolveRepoRoot } from './kimi-agent/policy.mjs';
import { runDelegatedSession } from './kimi-agent/session.mjs';
import { createTelemetry, safeRunId, DEFAULT_TELEMETRY_URL, telemetryTokenFromEnv } from './kimi-agent/telemetry.mjs';
import { redactSecrets, sanitizedError } from './kimi-agent/security.mjs';

export const KIMI_JOB_DIR = '.kimi/jobs';
export const KIMI_OUTPUT_DIR = 'dist/__kimi';

function eligibleContext() {
  return process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy' || process.env.KIMI_ALLOW_LOCAL === '1';
}

function loadEnabledJobs(rootDir) {
  const directory = path.join(rootDir, KIMI_JOB_DIR);
  if (!fs.existsSync(directory)) return [];
  const jobs = fs.readdirSync(directory).filter(name => name.endsWith('.json')).sort().map(name => {
    const file = path.join(directory, name);
    if (fs.realpathSync(file) !== file) throw new Error(`${name}: symlinked jobs are not allowed.`);
    return validateJob(JSON.parse(fs.readFileSync(file, 'utf8')), name);
  }).filter(job => job.enabled);
  return validateEnabledJobs(jobs);
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(redactSecrets(value), null, 2)}\n`);
}

function compatibilityTelemetryUrl() {
  if (process.env.KIMI_TELEMETRY_URL) return process.env.KIMI_TELEMETRY_URL;
  return DEFAULT_TELEMETRY_URL;
}

export async function runNetlifyKimi({ rootDir = resolveRepoRoot(), outputDir = path.join(rootDir, KIMI_OUTPUT_DIR) } = {}) {
  const jobs = loadEnabledJobs(rootDir);
  if (!jobs.length) { console.log('KIMI DELEGATION SKIP: no enabled jobs'); return { jobs: [], outputDir }; }
  if (!eligibleContext()) throw new Error('Enabled Kimi jobs are only allowed in Netlify deploy-preview/branch-deploy contexts or KIMI_ALLOW_LOCAL=1.');
  const apiKey = cleanText(process.env.NVIDIA_API_KEY, 512);
  if (apiKey.length < 20 || /\s/.test(apiKey)) throw new Error('NVIDIA_API_KEY is missing or invalid in the Netlify environment.');
  fs.mkdirSync(outputDir, { recursive: true });
  const client = new NvidiaNimClient({ apiKey });
  const results = [];
  for (const job of jobs) {
    const ref = cleanText(process.env.COMMIT_REF || process.env.HEAD || String(Date.now()), 32).replace(/[^a-z0-9._-]/gi, '-');
    const runId = safeRunId(`${job.id}-${ref}`.slice(0, 96));
    const sessionId = `${job.id}-netlify-${ref}`.slice(0, 80);
    const telemetry = createTelemetry({
      rootDir,
      runId,
      url: compatibilityTelemetryUrl(),
      token: telemetryTokenFromEnv(),
      metadata: {
        agent: 'Kimi K3',
        supervisor: 'GPT-5.6 Sol',
        repository: 'iLuzionsX/maples2',
        feature_pr: process.env.REVIEW_ID ? Number(process.env.REVIEW_ID) : null,
        feature_branch: process.env.BRANCH || null,
        preview_url: process.env.DEPLOY_PRIME_URL || null,
        transport: 'netlify-compat',
      },
    });
    console.log(`KIMI DELEGATION START: ${job.id} (${runId})`);
    const { result } = await runDelegatedSession({ job, rootDir, client, sessionId, telemetry });
    writeJson(path.join(outputDir, `${job.id}.json`), { ...result, run_id: runId });
    results.push({ ...result, run_id: runId });
    console.log(`KIMI DELEGATION PASS: ${job.id}`);
  }
  writeJson(path.join(outputDir, 'index.json'), { schema_version: 1, jobs: results.map(result => ({ id: result.job_id, run_id: result.run_id, status: result.status, file: `${result.job_id}.json` })) });
  return { jobs: results, outputDir };
}

export async function main(rootDir = process.cwd()) {
  try {
    return await runNetlifyKimi({ rootDir });
  } catch (error) {
    console.error(`KIMI DELEGATION FAIL: ${sanitizedError(error)}`);
    const outputDir = path.join(rootDir, KIMI_OUTPUT_DIR);
    writeJson(path.join(outputDir, 'error.json'), { schema_version: 1, status: 'failed', error: sanitizedError(error) });
    return { jobs: [], error: sanitizedError(error), outputDir };
  }
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) main().then(result => { if (result.error) process.exitCode = 1; });

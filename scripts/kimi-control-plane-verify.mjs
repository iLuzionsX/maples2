#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateJob, cleanText } from './kimi-agent/schema.mjs';
import { safeRunId } from './kimi-agent/telemetry.mjs';
import { resolveRepoRoot } from './kimi-agent/policy.mjs';

const FORBIDDEN_KEYS = new Set(['raw_output', 'content', 'stdout', 'stderr', 'reasoning', 'thinking', 'message', 'messages', 'assistant_message', 'patch_body', 'secret', 'token']);

function enabledJobs(rootDir) {
  const directory = path.join(rootDir, '.kimi', 'jobs');
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter(name => name.endsWith('.json')).sort().map(name => {
    const file = path.join(directory, name);
    return validateJob(JSON.parse(fs.readFileSync(file, 'utf8')), name);
  }).filter(job => job.enabled);
}

function assertSanitized(value, where = 'root') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertSanitized(item, `${where}[${index}]`));
  if (!value || typeof value !== 'object') return;
  for (const [key, item] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.has(key)) throw new Error(`Public telemetry leaked forbidden key ${where}.${key}`);
    assertSanitized(item, `${where}.${key}`);
  }
}

function runIdFor(job) {
  const ref = cleanText(process.env.COMMIT_REF || process.env.HEAD || '', 32).replace(/[^a-z0-9._-]/gi, '-');
  if (!ref) throw new Error('COMMIT_REF/HEAD is required for control-plane verification.');
  return safeRunId(`${job.id}-${ref}`.slice(0, 96));
}

async function fetchRun(base, runId) {
  let last = null;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const response = await fetch(`${base}/.netlify/functions/kimi-run?run=${encodeURIComponent(runId)}&verify=${Date.now()}`, { headers: { accept: 'application/json' } });
    if (response.ok) return response.json();
    last = new Error(`control-plane read returned ${response.status}`);
    await new Promise(resolve => setTimeout(resolve, 750));
  }
  throw last || new Error('control-plane read failed');
}

export async function verifyControlPlane(rootDir = resolveRepoRoot()) {
  const jobs = enabledJobs(rootDir);
  if (!jobs.length) {
    console.log('KIMI CONTROL PLANE VERIFY SKIP: no enabled jobs');
    return { skipped: true };
  }
  const base = cleanText(process.env.DEPLOY_PRIME_URL, 300).replace(/\/$/, '');
  if (!/^https:\/\/deploy-preview-\d+--maplesttstst\.netlify\.app$/i.test(base)) {
    console.log('KIMI CONTROL PLANE VERIFY SKIP: no published Deploy Preview endpoint');
    return { skipped: true };
  }
  for (const job of jobs) {
    const runId = runIdFor(job);
    const state = await fetchRun(base, runId);
    assertSanitized(state);
    if (state.run_id !== runId) throw new Error(`Run ID mismatch: expected ${runId}, got ${state.run_id || 'none'}`);
    const types = new Set((state.events || []).map(event => event.type));
    for (const required of ['run_started', 'turn_completed', 'run_completed']) {
      if (!types.has(required)) throw new Error(`Run ${runId} is missing ${required} telemetry.`);
    }
    if (!['completed', 'failed', 'cancelled', 'incomplete'].includes(String(state.agent_status || state.status || ''))) {
      throw new Error(`Run ${runId} has no terminal agent status.`);
    }
    if (!state.result || typeof state.result !== 'object') throw new Error(`Run ${runId} has no sanitized result.`);
    console.log(`KIMI CONTROL PLANE VERIFY PASS: ${runId} · ${(state.events || []).length} events · ${state.result.usage?.total_tokens ?? 'n/a'} tokens`);
  }
  return { skipped: false, jobs: jobs.length };
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) verifyControlPlane().catch(error => { console.error(`KIMI CONTROL PLANE VERIFY FAIL: ${error.message}`); process.exit(1); });

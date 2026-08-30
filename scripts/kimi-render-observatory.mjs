#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { resolveRepoRoot } from './kimi-agent/policy.mjs';
import { redactSecrets } from './kimi-agent/security.mjs';

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return null; }
}

function clean(value, max = 1200) {
  return String(value ?? '').replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().slice(0, max);
}

function safeList(value, maxItems = 48, maxChars = 320) {
  return Array.isArray(value) ? value.slice(0, maxItems).map(item => clean(typeof item === 'string' ? item : JSON.stringify(item), maxChars)).filter(Boolean) : [];
}

function publicJob(result) {
  const patch = result?.patch && typeof result.patch === 'object' ? {
    format: clean(result.patch.format, 32) || null,
    changed_files: safeList(result.patch.changed_files, 64, 240),
    bytes: typeof result.patch.content === 'string' ? Buffer.byteLength(result.patch.content) : null,
    sha256: clean(result.patch.sha256, 80) || null,
  } : null;
  const tests = Array.isArray(result?.test_results) ? result.test_results.slice(0, 32).map(item => {
    if (typeof item === 'string') return { command: clean(item, 180), ok: null };
    const exitCode = Number.isFinite(Number(item?.exit_code ?? item?.exitCode ?? item?.code)) ? Number(item?.exit_code ?? item?.exitCode ?? item?.code) : null;
    const ok = typeof item?.ok === 'boolean' ? item.ok : exitCode == null ? null : exitCode === 0;
    return { command: clean(item?.command || item?.result?.command || 'validation', 180), ok, exit_code: exitCode };
  }) : [];
  return {
    id: clean(result?.job_id, 100) || 'unknown-job',
    session_id: clean(result?.session_id, 100) || null,
    status: clean(result?.status, 32) || 'unknown',
    mode: clean(result?.mode, 32) || null,
    model: clean(result?.model, 100) || null,
    reasoning_effort: clean(result?.reasoning_effort, 24) || null,
    summary: clean(result?.summary, 1800),
    findings_count: Array.isArray(result?.findings) ? result.findings.length : 0,
    files_inspected: safeList(result?.files_inspected, 80, 240),
    files_proposed_for_change: safeList(result?.files_proposed_for_change, 80, 240),
    patch,
    tests,
    risks: safeList(result?.risks, 24, 420),
    unresolved_issues: safeList(result?.unresolved_issues, 24, 420),
    turns: Number.isFinite(Number(result?.turns)) ? Number(result.turns) : null,
    usage: result?.usage ? redactSecrets(result.usage) : null,
    error: clean(result?.error, 600) || null,
  };
}

export function buildObservatory(rootDir = resolveRepoRoot()) {
  const base = path.join(rootDir, 'dist', '__kimi');
  const index = readJson(path.join(base, 'index.json'));
  const jobs = [];
  for (const entry of index?.jobs || []) {
    const file = clean(entry?.file, 160);
    if (!file || file.includes('..') || file.includes('/') || file.includes('\\')) continue;
    const result = readJson(path.join(base, file));
    if (result) jobs.push(publicJob(result));
  }
  const delegationError = readJson(path.join(base, 'error.json'));
  return redactSecrets({
    schema_version: 1,
    generated_at: new Date().toISOString(),
    privacy: 'Public engineering telemetry only. Raw model output, hidden reasoning, patch bodies, repository contents, secrets, and command stdout/stderr are excluded.',
    build: {
      context: clean(process.env.CONTEXT, 40) || null,
      commit_ref: clean(process.env.COMMIT_REF || process.env.HEAD, 80) || null,
      review_id: clean(process.env.REVIEW_ID, 24) || null,
      deploy_id: clean(process.env.DEPLOY_ID, 80) || null,
      deploy_url: clean(process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL, 300) || null,
      branch: clean(process.env.BRANCH, 160) || null,
    },
    jobs,
    delegation_error: clean(delegationError?.error, 600) || null,
  });
}

export function writeObservatory(rootDir = resolveRepoRoot()) {
  const output = path.join(rootDir, 'dist', '__kimi', 'observatory', 'trace.json');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(buildObservatory(rootDir), null, 2)}\n`);
  console.log(`KIMI OBSERVATORY READY: ${path.relative(rootDir, output)}`);
  return output;
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) writeObservatory();

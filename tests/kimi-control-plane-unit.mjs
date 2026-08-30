#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { FileTelemetrySink, publicResultTelemetry, safeRunId, validateTelemetryUrl, telemetryTokenFromEnv, DEFAULT_TELEMETRY_URL } from '../scripts/kimi-agent/telemetry.mjs';
import { parseArgs } from '../scripts/kimi-agent.mjs';
import { applyEvent } from '../netlify/functions/kimi-event.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'maples-kimi-control-'));
try {
  assert.equal(safeRunId('maples-animation-0042'), 'maples-animation-0042');
  assert.throws(() => safeRunId('latest'));
  assert.equal(validateTelemetryUrl(DEFAULT_TELEMETRY_URL), DEFAULT_TELEMETRY_URL);
  assert.equal(validateTelemetryUrl('https://deploy-preview-31--maplesttstst.netlify.app/.netlify/functions/kimi-event'), 'https://deploy-preview-31--maplesttstst.netlify.app/.netlify/functions/kimi-event');
  assert.throws(() => validateTelemetryUrl('https://example.com/.netlify/functions/kimi-event'));
  assert.throws(() => validateTelemetryUrl('https://maplesttstst.netlify.app/other'));
  const derived = telemetryTokenFromEnv({ NVIDIA_API_KEY: 'nvapi-test-secret-value-1234567890' });
  assert.equal(derived.length, 64);
  assert.equal(derived.includes('nvapi-test-secret'), false);
  assert.equal(telemetryTokenFromEnv({ KIMI_TELEMETRY_TOKEN: 'explicit', NVIDIA_API_KEY: 'ignored' }), 'explicit');

  const sink = new FileTelemetrySink({ rootDir: root, runId: 'maples-animation-0042', metadata: { feature_pr: 41, supervisor: 'GPT-5.6 Sol' } });
  await sink.emit('run_started', { objective: 'Make combat materially better.', max_tokens: 96000 });
  await sink.emit('turn_completed', { turn: 1, usage: { total_tokens: 1234 } });
  const lines = fs.readFileSync(path.join(root, '.kimi', 'telemetry', 'maples-animation-0042.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
  assert.equal(lines.length, 2);
  assert.equal(lines[0].run_id, 'maples-animation-0042');
  assert.equal(lines[1].data.usage.total_tokens, 1234);

  const publicResult = publicResultTelemetry({
    status: 'completed', summary: 'Visible improvement.', turns: 9,
    usage: { prompt_tokens: 8000, completion_tokens: 2000, total_tokens: 10000 },
    files_inspected: ['src/game/FX.js'], files_proposed_for_change: ['src/game/FX.js'],
    patch: { format: 'unified_diff', content: 'PRIVATE_PATCH_BODY_SHOULD_NOT_PUBLISH', changed_files: ['src/game/FX.js'], sha256: 'abc' },
    test_results: [{ command: 'npm run build', ok: true, stdout: 'PRIVATE_COMMAND_OUTPUT' }],
    risks: [], unresolved_issues: [], raw_output: 'PRIVATE_MODEL_OUTPUT_SHOULD_NOT_PUBLISH',
  });
  const serialized = JSON.stringify(publicResult);
  assert.equal(serialized.includes('PRIVATE_PATCH_BODY_SHOULD_NOT_PUBLISH'), false);
  assert.equal(serialized.includes('PRIVATE_COMMAND_OUTPUT'), false);
  assert.equal(serialized.includes('PRIVATE_MODEL_OUTPUT_SHOULD_NOT_PUBLISH'), false);
  assert.equal(publicResult.patch.bytes > 0, true);
  assert.deepEqual(publicResult.tests, [{ command: 'npm run build', ok: true, exit_code: null }]);

  let lifecycle = applyEvent(null, { run_id: 'run-42', at: '2026-08-30T06:00:00Z', type: 'run_started', data: {}, metadata: {} });
  lifecycle = applyEvent(lifecycle, { run_id: 'run-42', at: '2026-08-30T06:01:00Z', type: 'run_completed', data: { result: { status: 'completed' } }, metadata: {} });
  assert.equal(lifecycle.agent_status, 'completed');
  assert.equal(lifecycle.phase, 'sol_review');
  lifecycle = applyEvent(lifecycle, { run_id: 'run-42', at: '2026-08-30T06:02:00Z', type: 'phase_changed', data: { phase: 'validation', status: 'running' }, metadata: {} });
  assert.equal(lifecycle.agent_status, 'completed', 'Sol validation must not make Kimi look active again');
  assert.equal(lifecycle.status, 'completed');
  assert.equal(lifecycle.phase, 'validation');
  assert.equal(lifecycle.phase_status, 'running');

  const args = parseArgs(['--job', '.kimi/jobs/x.json', '--run-id', 'run-42', '--session', 'mission-42', '--feature-pr', '41', '--feature-branch', 'feature/x', '--preview-url', 'https://example.netlify.app']);
  assert.equal(args.runId, 'run-42');
  assert.equal(args.session, 'mission-42');
  assert.equal(args.featurePr, '41');

  const html = fs.readFileSync(new URL('../public/__kimi/index.html', import.meta.url), 'utf8');
  const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'dashboard script must exist');
  assert.doesNotThrow(() => new Function(script), 'dashboard JavaScript must parse');
  assert.ok(html.includes('maples-agent-top'));
  assert.ok(html.includes('MONITOR ERROR'));
  assert.ok(html.includes('PHASE STATUS'));

  const ingest = fs.readFileSync(new URL('../netlify/functions/kimi-event.mjs', import.meta.url), 'utf8');
  assert.ok(ingest.includes('KIMI_TELEMETRY_TOKEN'));
  assert.ok(ingest.includes('NVIDIA_API_KEY'));
  assert.ok(ingest.includes('timingSafeEqual'));
  assert.ok(ingest.includes('raw_output'));
  assert.ok(ingest.includes('patch_body'));

  const compat = fs.readFileSync(new URL('../scripts/kimi-compat.mjs', import.meta.url), 'utf8');
  assert.ok(compat.includes('DEPLOY_PRIME_URL'));
  assert.ok(compat.includes('/.netlify/functions/kimi-event'));

  console.log('Kimi control-plane unit tests: PASS');
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}

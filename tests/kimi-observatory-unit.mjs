#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildObservatory } from '../scripts/kimi-render-observatory.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'maples-kimi-observatory-'));
const dir = path.join(root, 'dist', '__kimi');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify({ schema_version: 1, jobs: [{ id: 'demo', status: 'completed', file: 'demo.json' }] }));
fs.writeFileSync(path.join(dir, 'demo.json'), JSON.stringify({
  schema_version: 1,
  job_id: 'demo',
  session_id: 'demo-session',
  status: 'completed',
  mode: 'implementation',
  model: 'moonshotai/kimi-k3',
  reasoning_effort: 'max',
  summary: 'Improved combat presentation.',
  findings: ['one', 'two'],
  files_inspected: ['src/game/FX.js'],
  files_proposed_for_change: ['src/game/FX.js'],
  patch: { format: 'unified_diff', content: 'PRIVATE_PATCH_BODY_SHOULD_NOT_PUBLISH', changed_files: ['src/game/FX.js'], sha256: 'abc123' },
  tests_run: ['npm run build'],
  test_results: [{ command: 'npm run build', exit_code: 0, stdout: 'PRIVATE_COMMAND_OUTPUT' }],
  risks: ['mobile perf'],
  unresolved_issues: [],
  turns: 7,
  usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
  raw_output: 'PRIVATE_MODEL_OUTPUT_SHOULD_NOT_PUBLISH',
}));

const trace = buildObservatory(root);
const serialized = JSON.stringify(trace);
assert.equal(trace.jobs.length, 1);
assert.equal(trace.jobs[0].turns, 7);
assert.equal(trace.jobs[0].patch.changed_files[0], 'src/game/FX.js');
assert.equal(trace.jobs[0].patch.bytes, Buffer.byteLength('PRIVATE_PATCH_BODY_SHOULD_NOT_PUBLISH'));
assert.equal(trace.jobs[0].tests[0].command, 'npm run build');
assert.equal(trace.jobs[0].tests[0].ok, true);
assert.equal(serialized.includes('PRIVATE_MODEL_OUTPUT_SHOULD_NOT_PUBLISH'), false);
assert.equal(serialized.includes('PRIVATE_PATCH_BODY_SHOULD_NOT_PUBLISH'), false);
assert.equal(serialized.includes('PRIVATE_COMMAND_OUTPUT'), false);
assert.equal(Object.hasOwn(trace.jobs[0], 'raw_output'), false);
assert.equal(Object.hasOwn(trace.jobs[0].patch, 'content'), false);
assert.equal(Object.hasOwn(trace.jobs[0].tests[0], 'stdout'), false);

fs.rmSync(root, { recursive: true, force: true });
console.log('Kimi Observatory unit: PASS');

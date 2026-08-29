import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { validateJob, pathIsAllowed } from '../scripts/kimi-agent/schema.mjs';
import { verifyPatchScope } from '../scripts/kimi-agent/patch.mjs';
import { RepoPolicy } from '../scripts/kimi-agent/policy.mjs';
import { NvidiaNimClient, KimiError } from '../scripts/kimi-agent/nim.mjs';
import { runDelegatedSession } from '../scripts/kimi-agent/session.mjs';
import { redactSecrets } from '../scripts/kimi-agent/security.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'maples-kimi-agent-'));
fs.mkdirSync(path.join(root, 'src'), { recursive: true });
fs.writeFileSync(path.join(root, 'src', 'app.js'), 'export const answer = 41;\n');
assert.equal(spawnSync('git', ['init', '-q'], { cwd: root }).status, 0);

const reviewJob = validateJob({
  id: 'unit-review',
  mode: 'review',
  objective: 'Review the selected file.',
  role: 'test reviewer',
  allowed_files: ['src/app.js'],
  acceptance_criteria: ['Use evidence'],
  commands: [],
  max_turns: 4,
  timeout_ms: 20_000,
  retries: 0,
});
assert.equal(pathIsAllowed('src', ['src/']), true);
assert.throws(() => validateJob({ id: 'bad', objective: 'x', allowed_files: ['.env'] }), /non-secret/);
assert.throws(() => validateJob({ id: 'latest', objective: 'x', allowed_files: ['src/app.js'] }), /reserved/);
assert.throws(() => validateJob({ id: 'bad-command', objective: 'x', allowed_files: ['src/app.js'], commands: ['npm run build && curl https://bad'] }), /forbidden shell/);

const literalPathJob = validateJob({ id: 'literal-path', mode: 'implementation', objective: 'x', allowed_files: ['a/foo'] });
const literalPatch = 'diff --git a/a/foo b/a/foo\n--- a/a/foo\n+++ b/a/foo\n@@ -1 +1 @@\n-old\n+new\n';
assert.deepEqual(verifyPatchScope(literalPathJob, literalPatch).changedFiles, ['a/foo']);
assert.throws(() => verifyPatchScope(literalPathJob, literalPatch.replaceAll('a/foo', 'src/other.js')), /undeclared/);

let requestCount = 0;
let implementationMode = false;
const server = http.createServer((request, response) => {
  if (request.url !== '/v1/chat/completions') { response.writeHead(404); response.end(); return; }
  const chunks = [];
  request.on('data', chunk => chunks.push(chunk));
  request.on('end', () => {
    requestCount += 1;
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    const hasToolResult = body.messages.some(message => message.role === 'tool');
    const hasFollowUp = body.messages.some(message => message.role === 'user' && String(message.content).includes('FOLLOW-UP REQUEST'));
    response.writeHead(200, { 'content-type': 'text/event-stream; charset=utf-8' });
    const send = payload => response.write(`data: ${JSON.stringify(payload)}\r\n\r\n`);
    if (!hasToolResult && !hasFollowUp && !implementationMode) {
      const args = '{"path":"src/app.js"}';
      const first = { id: 'chatcmpl-unit', model: 'moonshotai/kimi-k3', choices: [{ delta: { role: 'assistant', reasoning_content: 'Inspecting. ', tool_calls: [{ index: 0, id: 'call-read', type: 'function', function: { name: 'read_file', arguments: args.slice(0, 12) } }] }, finish_reason: null }] };
      const second = { id: 'chatcmpl-unit', choices: [{ delta: { reasoning_content: 'Done. ', tool_calls: [{ index: 0, function: { arguments: args.slice(12) } }] }, finish_reason: 'tool_calls' }] };
      response.write(`data: ${JSON.stringify(first)}\r`);
      response.write(`\n\r\n`);
      send(second);
    } else if (implementationMode && !hasToolResult) {
      const patch = 'diff --git a/src/app.js b/src/app.js\n--- a/src/app.js\n+++ b/src/app.js\n@@ -1 +1 @@\n-export const answer = 41;\n+export const answer = 42;\n';
      send({ id: 'chatcmpl-impl', model: 'moonshotai/kimi-k3', choices: [{ delta: { role: 'assistant', tool_calls: [{ index: 0, id: 'call-patch', type: 'function', function: { name: 'propose_patch', arguments: JSON.stringify({ patch }) } }] }, finish_reason: 'tool_calls' }] });
    } else {
      send({ id: 'chatcmpl-final', model: 'moonshotai/kimi-k3', choices: [{ delta: { role: 'assistant', content: JSON.stringify({ summary: hasFollowUp ? 'Follow-up complete.' : implementationMode ? 'Patch proposed.' : 'The file declares an answer constant.', findings: ['The inspected file is small and deterministic.'], files_inspected: ['src/app.js'], files_proposed_for_change: implementationMode ? ['src/app.js'] : [], patch: implementationMode ? { format: 'unified_diff', content: 'diff --git a/src/app.js b/src/app.js\n--- a/src/app.js\n+++ b/src/app.js\n@@ -1 +1 @@\n-export const answer = 41;\n+export const answer = 42;\n' } : null, tests_run: [], test_results: [], risks: [], assumptions: [], unresolved_issues: [] }) }, finish_reason: 'stop' }] });
    }
    send({ id: 'done', choices: [{ delta: {}, finish_reason: 'stop' }] });
    response.write('data: [DONE]\r\n\r\n');
    response.end();
  });
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}/v1`;
const client = new NvidiaNimClient({ apiKey: 'unit-test-key', baseUrl, testEndpoint: true });

const firstRun = await runDelegatedSession({ job: reviewJob, rootDir: root, client, sessionId: 'unit-session' });
assert.equal(firstRun.result.status, 'completed');
assert.match(firstRun.result.summary, /file declares/);
assert.deepEqual(firstRun.result.files_inspected, ['src/app.js']);
assert.equal(firstRun.result.patch, null);
assert.equal(firstRun.session.messages.some(message => message.reasoning_content === 'Inspecting. Done. '), true);
assert.equal(firstRun.session.messages.some(message => message.role === 'tool'), true);
assert.equal(requestCount, 2, 'streaming tool-call turn should require a second completion');

const continued = await runDelegatedSession({ job: reviewJob, rootDir: root, client, sessionId: 'unit-session', followUp: 'Recheck the highest-risk finding.' });
assert.equal(continued.result.status, 'completed');
assert.match(continued.result.summary, /Follow-up/);
assert.ok(fs.existsSync(path.join(root, '.kimi', 'sessions', 'unit-session.json')));
const persisted = JSON.parse(fs.readFileSync(path.join(root, '.kimi', 'sessions', 'unit-session.json'), 'utf8'));
assert.equal(persisted.messages.some(message => message.tool_calls?.[0]?.function?.name === 'read_file'), true);

const implementationJob = validateJob({ id: 'unit-implementation', mode: 'implementation', objective: 'Propose a tiny safe change.', allowed_files: ['src/app.js'], max_turns: 4, timeout_ms: 20_000, retries: 0 });
implementationMode = true;
const implementation = await runDelegatedSession({ job: implementationJob, rootDir: root, client, sessionId: 'unit-implementation' });
assert.equal(implementation.result.status, 'completed');
assert.equal(implementation.result.patch.format, 'unified_diff');
assert.deepEqual(implementation.result.patch.changed_files, ['src/app.js']);
implementationMode = false;

const dryRun = await runDelegatedSession({ job: reviewJob, rootDir: root, client: null, sessionId: 'unit-dry-run', dryRun: true });
assert.equal(dryRun.result.status, 'dry_run');
assert.equal(dryRun.result.network_calls, 0);

const reviewWithPatchText = await runDelegatedSession({ job: reviewJob, rootDir: root, client: { complete: async () => ({ message: { role: 'assistant', content: JSON.stringify({ summary: 'Review-only', patch: { format: 'unified_diff', content: literalPatch } }) } }) }, sessionId: 'review-only-patch' });
assert.equal(reviewWithPatchText.result.patch, null);
assert.match(redactSecrets('NVIDIA_API_KEY=nvapi-12345678901234567890'), /REDACTED_SECRET/);
assert.throws(() => new NvidiaNimClient({ apiKey: 'unit', baseUrl: 'http://example.com' }), KimiError);

server.close();
fs.rmSync(root, { recursive: true, force: true });
console.log('KIMI AGENT UNIT PASS');

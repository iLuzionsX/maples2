#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../public/__kimi/live/index.html', import.meta.url), 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/i);
assert.ok(match, 'live Observatory must contain an inline script');
assert.doesNotThrow(() => new vm.Script(match[1]), 'live Observatory JavaScript must parse');

for (const required of [
  'kimi-top',
  'resources / budgets',
  'TOKENS',
  'TURNS',
  'PATCH',
  'event log',
  'validation',
  '/.netlify/functions/kimi-trace?pr=',
  'trace.build.commit_ref===currentSha',
]) {
  assert.ok(html.includes(required), `live Observatory missing required telemetry marker: ${required}`);
}

for (const forbidden of ['raw_output', 'patch.content']) {
  assert.equal(html.includes(forbidden), false, `live Observatory must not request/render private field: ${forbidden}`);
}

console.log('Kimi live Observatory unit: PASS');

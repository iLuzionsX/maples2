import assert from 'node:assert/strict';
import { isRetryableOxError, resilientConfig } from '../scripts/ox-delegate-resilient.mjs';

const defaults = resilientConfig({});
assert.equal(defaults.requestTimeoutMs, 240000);
assert.equal(defaults.maxAttempts, 2);

const custom = resilientConfig({ request_timeout_ms: 180000, max_attempts: 3 });
assert.equal(custom.requestTimeoutMs, 180000);
assert.equal(custom.maxAttempts, 3);

assert.throws(() => resilientConfig({ request_timeout_ms: 1000 }), /request_timeout_ms/);
assert.throws(() => resilientConfig({ max_attempts: 4 }), /max_attempts/);

assert.equal(isRetryableOxError(Object.assign(new Error('busy'), { status: 429 })), true);
assert.equal(isRetryableOxError(Object.assign(new Error('upstream'), { status: 503 })), true);
assert.equal(isRetryableOxError(Object.assign(new Error('bad request'), { status: 400 })), false);
assert.equal(isRetryableOxError(Object.assign(new Error('aborted'), { name: 'AbortError' })), true);

console.log('OX RESILIENT HARNESS UNIT PASS');

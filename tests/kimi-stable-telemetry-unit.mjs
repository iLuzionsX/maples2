import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../scripts/kimi-compat.mjs', import.meta.url), 'utf8');
const body = source.match(/function compatibilityTelemetryUrl\(\) \{([\s\S]*?)\n\}/)?.[1] || '';

assert.ok(body, 'compatibilityTelemetryUrl must exist');
assert.ok(body.includes('DEFAULT_TELEMETRY_URL'), 'Kimi telemetry must default to the stable production control-plane endpoint');
assert.equal(body.includes('DEPLOY_PRIME_URL'), false, 'Kimi telemetry must not target a deploy preview that may not exist during its own build');
assert.ok(source.includes("preview_url: process.env.DEPLOY_PRIME_URL || null"), 'deploy preview URL must remain available as run metadata');

console.log('KIMI STABLE TELEMETRY UNIT PASS');

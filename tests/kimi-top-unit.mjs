#!/usr/bin/env node
import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync('public/__kimi/top/index.html', 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
assert.equal(scripts.length, 1, 'kimi-top should have one inline script');
new Function(scripts[0]);
assert.match(html, /RUN<\/span>/, 'UI must expose actual run state separately');
assert.match(html, /MONITOR<\/span>/, 'UI must expose monitor state separately');
assert.match(html, /TELEMETRY ERR/, 'monitor failures need their own label');
assert.match(html, /state==='failure'\|\|state==='error'\?'FAILED'/, 'FAILED must be derived from actual run state');
assert.match(html, /kimi-status\?pr=/, 'page should use same-origin telemetry endpoint');
assert.doesNotMatch(html, /fetch\(`https:\/\/api\.github\.com/, 'browser should not directly poll GitHub API');
console.log('KIMI TOP UNIT PASS');

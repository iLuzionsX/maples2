import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  buildMessages,
  extractChatText,
  pickOxAlphaModel,
  readJobFiles,
  validateJob
} from '../scripts/ox-delegate.mjs';

assert.equal(extractChatText({ choices: [{ message: { content: '  patch  ' } }] }), 'patch');
assert.equal(extractChatText({ choices: [{ message: { content: [{ text: 'a' }, { text: 'b' }] } }] }), 'a\nb');

assert.equal(pickOxAlphaModel({ data: [
  { id: 'other/model' },
  { id: 'stealth/ox-alpha', description: 'Ox Alpha' },
  { id: 'vendor/ox-alpha-lite' }
] }), 'stealth/ox-alpha');

const job = validateJob({
  id: 'combat-pass',
  enabled: true,
  task: 'Fix combat timing without changing public APIs.',
  files: ['src/game/Game.js', 'src/game/Character.js'],
  max_tokens: 32000
});
assert.equal(job.mode, 'patch');
assert.equal(job.maxTokens, 32000);
assert.throws(() => validateJob({ task: 'x', files: ['../secret'] }), /valid file path/);

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'maples-ox-'));
try {
  fs.mkdirSync(path.join(temp, 'src', 'game'), { recursive: true });
  fs.writeFileSync(path.join(temp, 'src', 'game', 'Game.js'), 'export const game = true;\n');
  fs.writeFileSync(path.join(temp, 'src', 'game', 'Character.js'), 'export const character = true;\n');
  const files = readJobFiles(job, temp);
  assert.equal(files.length, 2);
  const messages = buildMessages(job, files);
  assert.equal(messages[0].role, 'system');
  assert.match(messages[0].content, /unified diff/i);
  assert.match(messages[1].content, /FILE: src\/game\/Game\.js/);
  assert.match(messages[1].content, /Fix combat timing/);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

console.log('OX DELEGATION UNIT PASS');

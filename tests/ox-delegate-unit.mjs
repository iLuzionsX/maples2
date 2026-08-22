import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  buildMessages,
  extractChatText,
  pickOxAlphaModel,
  readJobFiles,
  validateEnabledJobs,
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
assert.throws(() => validateJob({ id: 'index', task: 'x', files: ['src/game/Game.js'] }), /reserved/);
assert.throws(() => validateEnabledJobs([job, { ...job, id: 'COMBAT-PASS' }]), /Duplicate enabled Ox job id/);

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'maples-ox-'));
const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'maples-ox-outside-'));
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

  fs.writeFileSync(path.join(outside, 'secret.txt'), 'NOUS_API_KEY=must-not-leak\n');
  const symlinkPath = path.join(temp, 'src', 'game', 'LinkedSecret.txt');
  fs.symlinkSync(path.join(outside, 'secret.txt'), symlinkPath);
  const symlinkJob = validateJob({
    id: 'symlink-check',
    task: 'Read selected file.',
    files: ['src/game/LinkedSecret.txt']
  });
  assert.throws(() => readJobFiles(symlinkJob, temp), /resolved path escaped|symlinked paths are not allowed/);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
  fs.rmSync(outside, { recursive: true, force: true });
}

console.log('OX DELEGATION UNIT PASS');

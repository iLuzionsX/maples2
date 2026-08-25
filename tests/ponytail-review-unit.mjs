import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  CONTEXT_PATH,
  JOB_PATH,
  cleanupReview,
  prepareReview,
} from '../scripts/prepare-ponytail-review.mjs';

function git(root, ...args) {
  const result = spawnSync('git', ['-C', root, ...args], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(String(result.stderr || result.stdout || 'git failed').trim());
}

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'maples-ponytail-'));
try {
  git(temp, 'init', '-b', 'main');
  git(temp, 'config', 'user.email', 'maples-test@example.invalid');
  git(temp, 'config', 'user.name', 'Maples Test');

  fs.mkdirSync(path.join(temp, 'src'), { recursive: true });
  fs.writeFileSync(path.join(temp, 'src', 'game.js'), 'export const value = 1;\n');
  git(temp, 'add', '.');
  git(temp, 'commit', '-m', 'base');
  git(temp, 'checkout', '-b', 'feature/review-test');

  fs.writeFileSync(path.join(temp, 'src', 'game.js'), 'export function getValue() {\n  return 1;\n}\n');
  fs.writeFileSync(path.join(temp, 'src', 'new.js'), 'export const newThing = true;\n');

  const result = prepareReview(temp, { base: 'main' });
  assert.deepEqual(result.files, ['src/game.js', 'src/new.js']);

  const job = JSON.parse(fs.readFileSync(path.join(temp, JOB_PATH), 'utf8'));
  assert.equal(job.enabled, true);
  assert.equal(job.mode, 'review');
  assert.equal(job.reasoning_effort, 'high');
  assert.equal(job.model, 'auto:ox-alpha');
  assert.deepEqual(job.files, [CONTEXT_PATH, 'src/game.js', 'src/new.js']);
  assert.match(job.task, /player-visible quality and system correctness are unchanged/i);
  assert.match(job.task, /do not apply changes/i);

  const context = fs.readFileSync(path.join(temp, CONTEXT_PATH), 'utf8');
  assert.match(context, /diff --git a\/src\/game\.js b\/src\/game\.js/);
  assert.match(context, /diff --git a\/src\/new\.js b\/src\/new\.js/);

  cleanupReview(temp);
  assert.equal(fs.existsSync(path.join(temp, JOB_PATH)), false);
  assert.equal(fs.existsSync(path.join(temp, CONTEXT_PATH)), false);

  git(temp, 'checkout', '--', 'src/game.js');
  fs.rmSync(path.join(temp, 'src', 'new.js'));
  git(temp, 'checkout', 'main');
  assert.throws(() => prepareReview(temp, { base: 'main' }), /default branch/);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

console.log('PONYTAIL REVIEW UNIT PASS');

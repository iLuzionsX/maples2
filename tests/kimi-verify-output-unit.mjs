import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { verifyPatchApplies, verifyResult } from '../scripts/kimi-delegate.mjs';

const patch = `diff --git a/src/a.css b/src/a.css\n--- a/src/a.css\n+++ b/src/a.css\n@@ -1 +1 @@\n-.hud { gap: 4px; }\n+.hud { gap: 6px; }\n`;
const job = { id: 'hud', mode: 'patch', files: ['src/a.css'] };
const result = verifyResult(job, { id: 'hud', mode: 'patch', model: 'moonshotai/kimi-k3', output: patch });
assert.equal(result.verified, true);
assert.deepEqual(result.changed_files, ['src/a.css']);

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kimi-verify-'));
try {
  fs.mkdirSync(path.join(root, 'src'), { recursive: true });
  fs.writeFileSync(path.join(root, 'src', 'a.css'), '.hud { gap: 4px; }\n');
  assert.equal(spawnSync('git', ['init'], { cwd: root }).status, 0);
  assert.equal(verifyPatchApplies(patch, root), true);
  assert.throws(() => verifyPatchApplies(patch.replace('gap: 4px', 'gap: 99px'), root), /does not apply/);
} finally { fs.rmSync(root, { recursive: true, force: true }); }
const review = verifyResult({ id: 'review', mode: 'review', files: ['src/a.js'] }, { id: 'review', mode: 'review', model: 'moonshotai/kimi-k3', output: 'Review text.' });
assert.deepEqual(review.changed_files, []);
console.log('KIMI VERIFY UNIT PASS');

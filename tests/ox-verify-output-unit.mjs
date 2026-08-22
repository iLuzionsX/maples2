import assert from 'node:assert/strict';
import {
  extractPatchPaths,
  verifyPatchScope,
  verifyResult
} from '../scripts/ox-verify-output.mjs';

const job = {
  id: 'hud-pass',
  mode: 'patch',
  files: ['src/narrow-hud-fix.css']
};

const patch = `diff --git a/src/narrow-hud-fix.css b/src/narrow-hud-fix.css
--- a/src/narrow-hud-fix.css
+++ b/src/narrow-hud-fix.css
@@ -1,2 +1,2 @@
-.hud { gap: 4px; }
+.hud { gap: 6px; }
`;

assert.deepEqual(extractPatchPaths(patch), ['src/narrow-hud-fix.css']);
assert.deepEqual(verifyPatchScope(job, patch), ['src/narrow-hud-fix.css']);

const verified = verifyResult(job, {
  id: 'hud-pass',
  mode: 'patch',
  model: 'stealth/ox-alpha',
  files: ['src/narrow-hud-fix.css'],
  output: patch
}, 'abc123');
assert.equal(verified.verified, true);
assert.equal(verified.input_commit, 'abc123');
assert.deepEqual(verified.changed_files, ['src/narrow-hud-fix.css']);
assert.match(verified.output_sha256, /^[a-f0-9]{64}$/);

assert.throws(() => verifyPatchScope(job, patch.replaceAll('src/narrow-hud-fix.css', 'src/style.css')), /undeclared files/);
assert.throws(() => extractPatchPaths('```diff\n' + patch + '```'), /Markdown fences/);
assert.throws(() => extractPatchPaths('diff --git a/a.css b/b.css\n--- a/a.css\n+++ b/b.css\n@@ -1 +1 @@\n-a\n+b\n'), /Renames/);
assert.throws(() => extractPatchPaths('not a patch'), /unified diff/);

const review = verifyResult({ id: 'review', mode: 'review', files: ['src/style.css'] }, {
  id: 'review',
  mode: 'review',
  model: 'stealth/ox-alpha',
  output: 'The hierarchy needs more contrast.'
}, 'def456');
assert.equal(review.verified, true);
assert.deepEqual(review.changed_files, []);

console.log('OX VERIFY UNIT PASS');

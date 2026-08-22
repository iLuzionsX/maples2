import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  extractPatchPaths,
  normalizePatchOutput,
  verifyPatchApplies,
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
 .keep { color: white; }
`;

assert.deepEqual(extractPatchPaths(patch), ['src/narrow-hud-fix.css']);
assert.deepEqual(verifyPatchScope(job, patch), ['src/narrow-hud-fix.css']);
assert.equal(normalizePatchOutput(`Here is the patch:\n\n\`\`\`diff\n${patch}\`\`\``), patch);

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
assert.equal(verified.normalized_output, false);

assert.throws(() => verifyPatchScope(job, patch.replaceAll('src/narrow-hud-fix.css', 'src/style.css')), /undeclared files/);
assert.throws(() => extractPatchPaths('diff --git a/a.css b/b.css\n--- a/a.css\n+++ b/b.css\n@@ -1 +1 @@\n-a\n+b\n'), /Renames/);
assert.throws(() => extractPatchPaths('not a patch'), /unified diff/);

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ox-verify-'));
try {
  fs.mkdirSync(path.join(temp, 'src'), { recursive: true });
  fs.writeFileSync(path.join(temp, 'src', 'narrow-hud-fix.css'), '.hud { gap: 4px; }\n.keep { color: white; }\n');
  assert.equal(spawnSync('git', ['init'], { cwd: temp }).status, 0);
  assert.equal(verifyPatchApplies(patch, temp), true);
  const badContext = patch.replace('.hud { gap: 4px; }', '.hud { gap: 999px; }');
  assert.throws(() => verifyPatchApplies(badContext, temp), /does not apply cleanly/);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

const review = verifyResult({ id: 'review', mode: 'review', files: ['src/style.css'] }, {
  id: 'review',
  mode: 'review',
  model: 'stealth/ox-alpha',
  output: 'The hierarchy needs more contrast.'
}, 'def456');
assert.equal(review.verified, true);
assert.deepEqual(review.changed_files, []);

console.log('OX VERIFY UNIT PASS');

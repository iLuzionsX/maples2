import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildMessages, normalizeCssOverrideOutput, normalizePatchOutput, readJobFiles, validateEnabledJobs, validateJob, verifyPatchScope } from '../scripts/kimi-delegate.mjs';

const job = validateJob({ id: 'safe-pass', enabled: true, mode: 'patch', task: 'Improve this safely.', files: ['src/a.js'], model: 'moonshotai/kimi-k3' });
assert.equal(job.reasoningEffort, 'max');
assert.throws(() => validateJob({ id: 'bad', task: 'x', files: ['../secret'] }), /valid, unique files/);
assert.throws(() => validateEnabledJobs([job, { ...job, id: 'SAFE-PASS' }]), /Duplicate enabled/);

const patch = `diff --git a/src/a.js b/src/a.js\n--- a/src/a.js\n+++ b/src/a.js\n@@ -1 +1 @@\n-old\n+new\n`;
assert.equal(normalizePatchOutput(`Here:\n\n\`\`\`diff\n${patch}\`\`\``), patch);
assert.deepEqual(verifyPatchScope(job, patch), ['src/a.js']);
assert.throws(() => verifyPatchScope({ ...job, files: ['src/a.js'] }, patch.replaceAll('src/a.js', 'src/b.js')), /undeclared/);
assert.equal(normalizeCssOverrideOutput('.hud { color: red; }'), '.hud { color: red; }\n');
assert.throws(() => normalizeCssOverrideOutput('.hud { background: url(https://bad); }'), /unsafe/);

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kimi-maples-'));
try {
  fs.mkdirSync(path.join(root, 'src'), { recursive: true });
  fs.writeFileSync(path.join(root, 'src', 'a.js'), 'export const a = true;\n');
  const files = readJobFiles(job, root);
  assert.equal(files[0].path, 'src/a.js');
  const messages = buildMessages(job, files);
  assert.match(messages[0].content, /unified diff/i);
  assert.match(messages[1].content, /FILE: src\/a\.js/);
} finally { fs.rmSync(root, { recursive: true, force: true }); }
console.log('KIMI DELEGATE UNIT PASS');

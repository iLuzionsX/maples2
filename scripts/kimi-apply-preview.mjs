import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const OUTPUT_DIR = 'dist/__kimi';

function main(rootDir = process.cwd()) {
  if (process.env.CONTEXT !== 'deploy-preview' && process.env.KIMI_ALLOW_LOCAL !== '1') {
    throw new Error('Kimi preview apply is only allowed in deploy-preview context.');
  }

  const manifestPath = path.join(rootDir, OUTPUT_DIR, 'latest.json');
  if (!fs.existsSync(manifestPath)) throw new Error('Verified Kimi manifest is missing.');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!Array.isArray(manifest.jobs) || !manifest.jobs.length) throw new Error('No verified Kimi jobs to apply.');

  for (const result of manifest.jobs) {
    if (!result?.verified || result.mode !== 'patch' || !String(result.output || '').trim()) {
      throw new Error(`${result?.id || 'unknown'}: result is not a verified patch.`);
    }
    const apply = spawnSync('git', ['apply', '--whitespace=nowarn', '-'], {
      cwd: rootDir,
      input: result.output,
      encoding: 'utf8',
      maxBuffer: 4 * 1024 * 1024,
    });
    if (apply.error || apply.status !== 0) {
      throw new Error(`${result.id}: verified patch failed during preview apply${apply.stderr ? `: ${String(apply.stderr).trim().slice(0, 500)}` : '.'}`);
    }
    console.log(`KIMI PREVIEW APPLY PASS: ${result.id}`);
  }
}

try { main(); }
catch (error) { console.error(`KIMI PREVIEW APPLY FAIL: ${error?.message || error}`); process.exit(1); }

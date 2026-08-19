import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const env = { ...process.env };
const sourcePath = path.resolve('tests/performance-ab.mjs');
const runtimePath = path.resolve('tests/.performance-ab-high-dpr.mjs');
const source = fs.readFileSync(sourcePath, 'utf8');
let runtimeSource = source;

runtimeSource = runtimeSource.replace(
  "viewport: { width: 800, height: 450 }, deviceScaleFactor: 1",
  "viewport: { width: 800, height: 450 }, deviceScaleFactor: 2",
);
runtimeSource = runtimeSource.replace(
  "if (!node.isMesh || !node.geometry) return;",
  "if (!node.isMesh || !node.geometry || !node.visible) return;",
);

if (runtimeSource === source) throw new Error('Could not apply benchmark runtime corrections');
if (!runtimeSource.includes('deviceScaleFactor: 2')) throw new Error('High-DPR benchmark override was not applied');
if (!runtimeSource.includes('!node.geometry || !node.visible')) throw new Error('Visible-geometry benchmark correction was not applied');
fs.writeFileSync(runtimePath, runtimeSource);

let code;
try {
  code = await new Promise((resolve, reject) => {
    const child = spawn('node', [runtimePath], { stdio: 'inherit', env, shell: false });
    child.on('error', reject);
    child.on('exit', resolve);
  });
} finally {
  fs.rmSync(runtimePath, { force: true });
}

const reportPath = path.resolve('dist/perf-report.json');
if (!fs.existsSync(reportPath)) {
  throw new Error(`performance benchmark exited ${code} without producing dist/perf-report.json`);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
console.log('PERFORMANCE MEASUREMENT COMPLETE', JSON.stringify({
  benchmarkExitCode: code,
  baselinePixelRatio: report.baseline?.quality?.pixelRatio,
  optimizedPixelRatio: report.optimized?.quality?.pixelRatio,
  failures: report.failures || [],
}, null, 2));

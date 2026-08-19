import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const env = { ...process.env };

const code = await new Promise((resolve, reject) => {
  const child = spawn('node', ['tests/performance-ab.mjs'], { stdio: 'inherit', env, shell: false });
  child.on('error', reject);
  child.on('exit', resolve);
});

const reportPath = path.resolve('dist/perf-report.json');
if (!fs.existsSync(reportPath)) {
  throw new Error(`performance benchmark exited ${code} without producing dist/perf-report.json`);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
console.log('PERFORMANCE MEASUREMENT COMPLETE', JSON.stringify({ benchmarkExitCode: code, failures: report.failures || [] }, null, 2));

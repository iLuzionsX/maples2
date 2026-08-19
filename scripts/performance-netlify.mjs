import fs from 'node:fs';
import path from 'node:path';

await import('../tests/performance-ab.mjs');

const reportPath = path.resolve('dist/perf-report.json');
if (!fs.existsSync(reportPath)) throw new Error('Performance benchmark did not publish dist/perf-report.json');

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const failures = [];

if (report.status !== 'complete') failures.push(`benchmark status: ${report.status}${report.error ? ` — ${report.error}` : ''}`);

for (const name of ['desktop', 'mobile']) {
  const result = report[name];
  if (!result) {
    failures.push(`${name}: missing benchmark result`);
    continue;
  }
  for (const error of result.errors || []) failures.push(`${name}: ${error}`);
  if (!result.qualityInvariant) failures.push(`${name}: renderer/asset quality settings changed`);
  if (!result.visualInvariant) {
    failures.push(`${name}: rendered pixels changed beyond tolerance (${JSON.stringify(result.visualDiff)})`);
  }
  if (!(result.drawCallReductionPct >= 5)) {
    failures.push(`${name}: draw-call reduction too small (${result.drawCallReductionPct?.toFixed?.(2) ?? result.drawCallReductionPct}%)`);
  }
  // SwiftShader timing is noisy; reject clear regressions while draw-call reduction is the deterministic GPU-work gate.
  if (!(result.renderImprovementPct >= -5)) {
    failures.push(`${name}: render time regressed materially (${result.renderImprovementPct?.toFixed?.(2) ?? result.renderImprovementPct}%)`);
  }
}

console.log('PERFORMANCE QUALITY GATE');
console.log(JSON.stringify({
  status: report.status,
  desktop: report.desktop && {
    drawCallReductionPct: report.desktop.drawCallReductionPct,
    renderImprovementPct: report.desktop.renderImprovementPct,
    visualInvariant: report.desktop.visualInvariant,
    qualityInvariant: report.desktop.qualityInvariant,
  },
  mobile: report.mobile && {
    drawCallReductionPct: report.mobile.drawCallReductionPct,
    renderImprovementPct: report.mobile.renderImprovementPct,
    visualInvariant: report.mobile.visualInvariant,
    qualityInvariant: report.mobile.qualityInvariant,
  },
}, null, 2));

if (failures.length) {
  console.error(`PERFORMANCE QUALITY GATE FAIL\n${failures.join('\n')}`);
  process.exit(1);
}

console.log('PERFORMANCE QUALITY GATE PASS');

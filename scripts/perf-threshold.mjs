import fs from 'node:fs';
import path from 'node:path';

const report = JSON.parse(fs.readFileSync(path.resolve('dist/perf-report.json'), 'utf8'));
const limits = {
  drawCallReductionPct: 20,
  renderImprovementPct: 3,
  liveFpsImprovementPct: -3,
};

const failures = [];
if (report.failures?.length) failures.push(...report.failures);
if (!report.qualityInvariant) failures.push('quality invariant failed');
if ((report.geometryDeltaPct ?? Infinity) > .01) failures.push(`geometry delta ${report.geometryDeltaPct}%`);
if (!report.visualDiff?.comparable || report.visualDiff.changedPixelRatio > .03 || report.visualDiff.meanAbsoluteChannelDiff > .75) {
  failures.push('visual fingerprint invariant failed');
}
if ((report.drawCallReductionPct ?? -Infinity) < limits.drawCallReductionPct) {
  failures.push(`draw-call reduction ${report.drawCallReductionPct}% < ${limits.drawCallReductionPct}%`);
}
if ((report.renderImprovementPct ?? -Infinity) < limits.renderImprovementPct) {
  failures.push(`render improvement ${report.renderImprovementPct}% < ${limits.renderImprovementPct}%`);
}
if ((report.liveFpsImprovementPct ?? -Infinity) < limits.liveFpsImprovementPct) {
  failures.push(`live FPS improvement ${report.liveFpsImprovementPct}% < ${limits.liveFpsImprovementPct}%`);
}

console.log('PROGRESSIVE PERFORMANCE GATE', JSON.stringify({ limits, failures }, null, 2));
if (failures.length) process.exit(1);

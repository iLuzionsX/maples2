import fs from 'node:fs';
import path from 'node:path';

const report = JSON.parse(fs.readFileSync(path.resolve('dist/perf-report.json'), 'utf8'));
const targets = {
  drawCallReductionPct: 20,
  renderImprovementPct: 3,
  liveFpsRegressionFloorPct: -3,
};

const failures = [];
if (report.failures?.some(message => /quality|geometry|pixel|pageerror|console/i.test(message))) {
  failures.push(...report.failures.filter(message => /quality|geometry|pixel|pageerror|console/i.test(message)));
}
if (!report.qualityInvariant) failures.push('quality invariant failed');
if ((report.geometryDeltaPct ?? Infinity) > .01) failures.push(`geometry delta ${report.geometryDeltaPct}%`);
if (!report.visualDiff?.comparable || report.visualDiff.changedPixelRatio > .03 || report.visualDiff.meanAbsoluteChannelDiff > .75) {
  failures.push('visual fingerprint invariant failed');
}

const progress = {
  drawCallReductionPct: report.drawCallReductionPct,
  renderImprovementPct: report.renderImprovementPct,
  liveFpsImprovementPct: report.liveFpsImprovementPct,
  drawCallTargetMet: (report.drawCallReductionPct ?? -Infinity) >= targets.drawCallReductionPct,
  renderTargetMet: (report.renderImprovementPct ?? -Infinity) >= targets.renderImprovementPct,
  liveFpsFloorMet: (report.liveFpsImprovementPct ?? -Infinity) >= targets.liveFpsRegressionFloorPct,
};

console.log('PERFORMANCE QUALITY GATE', JSON.stringify({ targets, progress, failures }, null, 2));
if (failures.length) process.exit(1);

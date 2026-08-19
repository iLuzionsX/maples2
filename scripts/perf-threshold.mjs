import fs from 'node:fs';
import path from 'node:path';

const report = JSON.parse(fs.readFileSync(path.resolve('dist/perf-report.json'), 'utf8'));
const targets = {
  pixelRatio: 1.8,
  drawCallReductionPct: 20,
  renderImprovementPct: 3,
  liveFpsRegressionFloorPct: -3,
};

const failures = [];
if (report.failures?.some(message => /quality|pixel|pageerror|console/i.test(message))) {
  failures.push(...report.failures.filter(message => /quality|pixel|pageerror|console/i.test(message)));
}
if (!report.qualityInvariant) failures.push('quality invariant failed');
for (const [label, value] of [
  ['baseline', report.baseline?.quality?.pixelRatio],
  ['optimized', report.optimized?.quality?.pixelRatio],
]) {
  if (Math.abs((value ?? 0) - targets.pixelRatio) > .001) failures.push(`${label} pixel ratio ${value} != ${targets.pixelRatio}`);
}

const baselineRenderedTriangles = report.baseline?.renderedTriangles ?? 0;
const optimizedRenderedTriangles = report.optimized?.renderedTriangles ?? 0;
const renderedTriangleDeltaPct = Math.abs(optimizedRenderedTriangles - baselineRenderedTriangles) / Math.max(1, baselineRenderedTriangles) * 100;
if (renderedTriangleDeltaPct > .01) failures.push(`rendered triangle delta ${renderedTriangleDeltaPct}%`);

if (!report.visualDiff?.comparable || report.visualDiff.changedPixelRatio > .03 || report.visualDiff.meanAbsoluteChannelDiff > .75) {
  failures.push('visual fingerprint invariant failed');
}

const progress = {
  drawCallReductionPct: report.drawCallReductionPct,
  renderImprovementPct: report.renderImprovementPct,
  liveFpsImprovementPct: report.liveFpsImprovementPct,
  renderedTriangleDeltaPct,
  drawCallTargetMet: (report.drawCallReductionPct ?? -Infinity) >= targets.drawCallReductionPct,
  renderTargetMet: (report.renderImprovementPct ?? -Infinity) >= targets.renderImprovementPct,
  liveFpsFloorMet: (report.liveFpsImprovementPct ?? -Infinity) >= targets.liveFpsRegressionFloorPct,
};

console.log('PERFORMANCE QUALITY GATE', JSON.stringify({ targets, progress, failures }, null, 2));
if (failures.length) process.exit(1);

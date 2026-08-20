import fs from 'node:fs';
import path from 'node:path';

const report = JSON.parse(fs.readFileSync(path.resolve('dist/perf-report.json'), 'utf8'));
const targets = {
  pixelRatio: 1.8,
  drawCallReductionPct: 20,
  renderRegressionFloorPct: -3,
  liveFpsRegressionFloorPct: -3,
};

const failures = [];
if (!report.baseline || !report.optimized) failures.push('benchmark baseline/optimized case missing');
if (report.failures?.some(message => /quality|pixel|pageerror|console/i.test(message))) {
  failures.push(...report.failures.filter(message => /quality|pixel|pageerror|console/i.test(message)));
}
if (!report.qualityInvariant) failures.push('quality invariant failed');
for (const [label, value] of [
  ['baseline', report.baseline?.quality?.pixelRatio],
  ['optimized', report.optimized?.quality?.pixelRatio],
]) {
  if (!Number.isFinite(value) || Math.abs(value - targets.pixelRatio) > .001) failures.push(`${label} pixel ratio ${value} != ${targets.pixelRatio}`);
}

const baselineRenderedTriangles = report.baseline?.renderedTriangles ?? 0;
const optimizedRenderedTriangles = report.optimized?.renderedTriangles ?? 0;
const renderedTriangleDeltaPct = Math.abs(optimizedRenderedTriangles - baselineRenderedTriangles) / Math.max(1, baselineRenderedTriangles) * 100;
if (!Number.isFinite(renderedTriangleDeltaPct) || renderedTriangleDeltaPct > .01) failures.push(`rendered triangle delta ${renderedTriangleDeltaPct}%`);

if (!report.visualDiff?.comparable || !Number.isFinite(report.visualDiff.changedPixelRatio) || !Number.isFinite(report.visualDiff.meanAbsoluteChannelDiff) || report.visualDiff.changedPixelRatio > .03 || report.visualDiff.meanAbsoluteChannelDiff > .75) {
  failures.push('visual fingerprint invariant failed');
}

const finiteDrawCalls = Number.isFinite(report.drawCallReductionPct);
const finiteRender = Number.isFinite(report.renderImprovementPct);
const finiteLiveFps = Number.isFinite(report.liveFpsImprovementPct);
const progress = {
  drawCallReductionPct: report.drawCallReductionPct,
  renderImprovementPct: report.renderImprovementPct,
  liveFpsImprovementPct: report.liveFpsImprovementPct,
  renderedTriangleDeltaPct,
  drawCallTargetMet: finiteDrawCalls && report.drawCallReductionPct >= targets.drawCallReductionPct,
  renderFloorMet: finiteRender && report.renderImprovementPct >= targets.renderRegressionFloorPct,
  liveFpsFloorMet: finiteLiveFps && report.liveFpsImprovementPct >= targets.liveFpsRegressionFloorPct,
};

if (!progress.drawCallTargetMet) failures.push(`draw-call reduction ${report.drawCallReductionPct}% < ${targets.drawCallReductionPct}%`);
if (!progress.renderFloorMet) failures.push(`render change ${report.renderImprovementPct}% < ${targets.renderRegressionFloorPct}% floor`);
if (!progress.liveFpsFloorMet) failures.push(`live FPS change ${report.liveFpsImprovementPct}% < ${targets.liveFpsRegressionFloorPct}% floor`);

console.log('PERFORMANCE QUALITY GATE', JSON.stringify({ targets, progress, failures }, null, 2));
if (failures.length) process.exit(1);

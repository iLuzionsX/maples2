import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function percentile(values, p) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.max(0, Math.ceil(sorted.length * p) - 1))];
}

async function waitForGame(page, quality) {
  await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__), null, { timeout: 30000 });
  await page.waitForFunction(() => {
    const g = window.__MAPLES_GAME__;
    return g.assetVisualManager?.ready && g.assetVisualManager?.heroReady &&
      g.environmentAssetManager?.ready && g.natureAssetManager?.ready &&
      g.animationPolishManager?.ready && document.querySelector('#enter-btn')?.dataset.ready === 'true';
  }, null, { timeout: 90000 });
  await page.waitForFunction(expected => window.__MAPLES_GAME__.quality === expected, quality, { timeout: 5000 });
  await page.locator('#enter-btn').click();
  await page.waitForTimeout(220);
}

async function sampleLiveFrames(page, frameCount = 30) {
  return page.evaluate(async count => {
    const deltas = [];
    let previous = await new Promise(resolve => requestAnimationFrame(resolve));
    for (let i = 0; i < count + 5; i++) {
      const now = await new Promise(resolve => requestAnimationFrame(resolve));
      if (i >= 5) deltas.push(now - previous);
      previous = now;
    }
    deltas.sort((a, b) => a - b);
    const medianMs = deltas[Math.floor(deltas.length / 2)] || 0;
    const p95Ms = deltas[Math.min(deltas.length - 1, Math.ceil(deltas.length * .95) - 1)] || 0;
    return {
      samples: deltas.length,
      medianMs,
      p95Ms,
      medianFps: medianMs > 0 ? 1000 / medianMs : 0,
      p95Fps: p95Ms > 0 ? 1000 / p95Ms : 0,
    };
  }, frameCount);
}

async function qualitySnapshot(page) {
  return page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    const shadowMaps = [];
    let visibleLights = 0;
    let meshes = 0;
    let instancedMeshes = 0;
    g.scene.traverse(node => {
      if (node.isLight && node.visible) visibleLights++;
      if (node.isMesh) meshes++;
      if (node.isInstancedMesh) instancedMeshes++;
      if (node.isDirectionalLight && node.castShadow) shadowMaps.push({ x: node.shadow.mapSize.x, y: node.shadow.mapSize.y });
    });
    return {
      quality: g.quality,
      pixelRatio: g.renderer.getPixelRatio(),
      shadowType: g.renderer.shadowMap.type,
      toneMapping: g.renderer.toneMapping,
      toneMappingExposure: g.renderer.toneMappingExposure,
      composer: Boolean(g.composer),
      composerPasses: g.composer?.passes?.map(pass => ({
        type: pass.constructor?.name || 'Unknown',
        strength: pass.strength ?? null,
        radius: pass.radius ?? null,
        threshold: pass.threshold ?? null,
      })) || [],
      shadowMaps,
      visibleLights,
      meshes,
      instancedMeshes,
      environmentPieces: g.environmentAssetManager?.count ?? 0,
      naturePieces: g.natureAssetManager?.count ?? 0,
      importedEnemies: g.enemies.filter(e => e.assetVisual).length,
      heroImported: Boolean(g.player.assetVisual),
      animationPolishReady: Boolean(g.animationPolishManager?.ready),
    };
  });
}

async function renderBenchmark(page, iterations = 2) {
  return page.evaluate(({ iterations }) => {
    const g = window.__MAPLES_GAME__;
    const renderer = g.renderer;
    const gl = renderer.getContext();
    const times = [];
    renderer.info.autoReset = false;

    renderer.info.reset();
    g._render();
    gl.finish();

    let calls = 0, triangles = 0, lines = 0, points = 0;
    for (let i = 0; i < iterations; i++) {
      renderer.info.reset();
      const start = performance.now();
      g._render();
      gl.finish();
      times.push(performance.now() - start);
      calls = renderer.info.render.calls;
      triangles = renderer.info.render.triangles;
      lines = renderer.info.render.lines;
      points = renderer.info.render.points;
    }
    renderer.info.autoReset = true;
    renderer.info.reset();
    return { times, calls, triangles, lines, points, width: gl.drawingBufferWidth, height: gl.drawingBufferHeight };
  }, { iterations });
}

async function storeBaselinePixels(page) {
  return page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    const gl = g.renderer.getContext();
    g._render();
    gl.finish();
    const width = gl.drawingBufferWidth, height = gl.drawingBufferHeight;
    const data = new Uint8Array(width * height * 4);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
    window.__MAPLES_BASELINE_PIXELS__ = data;
    return { width, height };
  });
}

async function comparePixels(page) {
  return page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    const gl = g.renderer.getContext();
    g._render();
    gl.finish();
    const width = gl.drawingBufferWidth, height = gl.drawingBufferHeight;
    const after = new Uint8Array(width * height * 4);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, after);
    const before = window.__MAPLES_BASELINE_PIXELS__;
    if (!before || before.length !== after.length) return { comparable: false, width, height };

    let changedPixels = 0;
    let totalAbsDiff = 0;
    let maxChannelDiff = 0;
    for (let i = 0; i < after.length; i += 4) {
      let changed = false;
      for (let c = 0; c < 4; c++) {
        const diff = Math.abs(after[i + c] - before[i + c]);
        totalAbsDiff += diff;
        maxChannelDiff = Math.max(maxChannelDiff, diff);
        if (diff > 1) changed = true;
      }
      if (changed) changedPixels++;
    }
    const pixels = width * height;
    return {
      comparable: true,
      width,
      height,
      pixels,
      changedPixels,
      changedPixelRatio: changedPixels / pixels,
      meanAbsoluteChannelDiff: totalAbsDiff / (pixels * 4),
      maxChannelDiff,
    };
  });
}

function summarizeRender(raw) {
  return {
    medianMs: median(raw.times),
    averageMs: raw.times.reduce((a, b) => a + b, 0) / raw.times.length,
    p95Ms: percentile(raw.times, .95),
    minMs: Math.min(...raw.times),
    maxMs: Math.max(...raw.times),
    calls: raw.calls,
    triangles: raw.triangles,
    lines: raw.lines,
    points: raw.points,
    drawingBuffer: `${raw.width}x${raw.height}`,
  };
}

function qualitySettings(snapshot) {
  const { meshes: _meshes, instancedMeshes: _instancedMeshes, ...settings } = snapshot;
  return settings;
}

async function runCase(browser, { name, baseUrl, dist, contextOptions, quality }) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('favicon')) errors.push(`console: ${msg.text()}`);
  });

  try {
    await page.goto(`${baseUrl}/?perf=off&quality=${quality}`, { waitUntil: 'networkidle' });
    await waitForGame(page, quality);

    const liveBaseline = await sampleLiveFrames(page);
    await page.evaluate(() => window.__MAPLES_GAME__.renderer.setAnimationLoop(null));
    await page.waitForTimeout(40);

    const qualityBefore = await qualitySnapshot(page);
    const baselinePixels = await storeBaselinePixels(page);
    const baseline = summarizeRender(await renderBenchmark(page));
    await page.screenshot({ path: path.join(dist, `perf-${name}-baseline.png`) });

    const performanceStats = await page.evaluate(() => {
      const pass = window.__MAPLES_INSTALL_PERFORMANCE__();
      return { ...pass.stats };
    });
    const qualityAfter = await qualitySnapshot(page);
    const optimized = summarizeRender(await renderBenchmark(page));
    const visualDiff = await comparePixels(page);
    await page.screenshot({ path: path.join(dist, `perf-${name}-optimized.png`) });

    await page.evaluate(() => window.__MAPLES_GAME__.start());
    await page.waitForTimeout(40);
    const liveOptimized = await sampleLiveFrames(page);
    await page.evaluate(() => window.__MAPLES_GAME__.renderer.setAnimationLoop(null));

    return {
      name,
      errors,
      baselinePixels,
      qualityBefore,
      qualityAfter,
      qualityInvariant: JSON.stringify(qualitySettings(qualityBefore)) === JSON.stringify(qualitySettings(qualityAfter)),
      baseline,
      optimized,
      liveBaseline,
      liveOptimized,
      liveFpsImprovementPct: liveBaseline.medianFps > 0
        ? (liveOptimized.medianFps - liveBaseline.medianFps) / liveBaseline.medianFps * 100
        : 0,
      renderImprovementPct: baseline.medianMs > 0 ? (baseline.medianMs - optimized.medianMs) / baseline.medianMs * 100 : 0,
      drawCallReductionPct: baseline.calls > 0 ? (baseline.calls - optimized.calls) / baseline.calls * 100 : 0,
      triangleInvariant: baseline.triangles === optimized.triangles,
      performanceStats,
      visualDiff,
      visualInvariant: visualDiff.comparable && visualDiff.changedPixelRatio <= .001 && visualDiff.meanAbsoluteChannelDiff <= .05,
    };
  } finally {
    await context.close();
  }
}

export async function runPerformanceDiagnostics(browser, options = {}) {
  const baseUrl = options.baseUrl || process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
  const dist = options.dist || path.resolve('dist');
  fs.mkdirSync(dist, { recursive: true });
  const report = {
    generatedAt: new Date().toISOString(),
    status: 'running',
    methodology: 'Same loaded scene before/after installPerformancePass. Full authored high/low renderer presets are preserved. Live requestAnimationFrame samples measure browser frame pacing; stopped-loop gl.finish samples isolate GPU-complete render cost; readPixels compares the exact same frozen scene.',
  };

  try {
    report.desktop = await runCase(browser, {
      name: 'desktop', baseUrl, dist, quality: 'high',
      contextOptions: { viewport: { width: 720, height: 405 }, deviceScaleFactor: 2 },
    });
    report.mobile = await runCase(browser, {
      name: 'mobile', baseUrl, dist, quality: 'low',
      contextOptions: { viewport: { width: 390, height: 640 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    });
    report.status = 'complete';
  } catch (error) {
    report.status = 'benchmark-error';
    report.error = error?.stack || String(error);
    console.error('PERFORMANCE BENCHMARK ERROR');
    console.error(report.error);
  } finally {
    fs.writeFileSync(path.join(dist, 'perf-report.json'), JSON.stringify(report, null, 2));
  }

  console.log('PERFORMANCE A/B REPORT');
  console.log(JSON.stringify(report, null, 2));
  return report;
}

const direct = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (direct) {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  });
  try {
    await runPerformanceDiagnostics(browser);
  } finally {
    await browser.close();
  }
}

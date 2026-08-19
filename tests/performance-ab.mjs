import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const dist = path.resolve('dist');
fs.mkdirSync(dist, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function waitForGame(page, highQuality) {
  await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__));
  await page.waitForFunction(() => {
    const g = window.__MAPLES_GAME__;
    return g.assetVisualManager?.ready && g.assetVisualManager?.heroReady &&
      g.environmentAssetManager?.ready && g.natureAssetManager?.ready &&
      g.animationPolishManager?.ready && document.querySelector('#enter-btn')?.dataset.ready === 'true';
  }, null, { timeout: 90000 });
  if (highQuality) {
    await page.waitForFunction(() => window.__MAPLES_GAME__.quality === 'high', null, { timeout: 5000 });
  }
  await page.locator('#enter-btn').click();
  await page.waitForTimeout(350);
  await page.evaluate(() => window.__MAPLES_GAME__.renderer.setAnimationLoop(null));
}

async function qualitySnapshot(page) {
  return page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    const shadowMaps = [];
    let visibleLights = 0;
    g.scene.traverse(node => {
      if (node.isLight && node.visible) visibleLights++;
      if (node.isDirectionalLight && node.castShadow) {
        shadowMaps.push({ x: node.shadow.mapSize.x, y: node.shadow.mapSize.y });
      }
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
      environmentPieces: g.environmentAssetManager?.count ?? 0,
      naturePieces: g.natureAssetManager?.count ?? 0,
      importedEnemies: g.enemies.filter(e => e.assetVisual).length,
      heroImported: Boolean(g.player.assetVisual),
      animationPolishReady: Boolean(g.animationPolishManager?.ready),
    };
  });
}

async function renderBenchmark(page, iterations = 8) {
  return page.evaluate(({ iterations }) => {
    const g = window.__MAPLES_GAME__;
    const renderer = g.renderer;
    const gl = renderer.getContext();
    const times = [];
    renderer.info.autoReset = false;

    for (let i = 0; i < 2; i++) {
      renderer.info.reset();
      g._render();
      gl.finish();
    }

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
        if (diff > maxChannelDiff) maxChannelDiff = diff;
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

function summarize(raw) {
  return {
    medianMs: median(raw.times),
    averageMs: raw.times.reduce((a, b) => a + b, 0) / raw.times.length,
    minMs: Math.min(...raw.times),
    maxMs: Math.max(...raw.times),
    calls: raw.calls,
    triangles: raw.triangles,
    lines: raw.lines,
    points: raw.points,
    drawingBuffer: `${raw.width}x${raw.height}`,
  };
}

async function runCase(name, contextOptions, expectHigh) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', msg => { if (msg.type() === 'error' && !msg.text().includes('favicon')) errors.push(`console: ${msg.text()}`); });

  await page.goto(`${baseUrl}/?perf=off&capture=1`, { waitUntil: 'networkidle' });
  await waitForGame(page, expectHigh);

  const qualityBefore = await qualitySnapshot(page);
  const baselinePixels = await storeBaselinePixels(page);
  const baselineRaw = await renderBenchmark(page);
  await page.screenshot({ path: path.join(dist, `perf-${name}-baseline.png`) });

  const performanceStats = await page.evaluate(() => {
    const pass = window.__MAPLES_INSTALL_PERFORMANCE__();
    return { ...pass.stats };
  });
  const qualityAfter = await qualitySnapshot(page);
  const optimizedRaw = await renderBenchmark(page);
  const visualDiff = await comparePixels(page);
  await page.screenshot({ path: path.join(dist, `perf-${name}-optimized.png`) });

  const baseline = summarize(baselineRaw);
  const optimized = summarize(optimizedRaw);
  const renderImprovementPct = baseline.medianMs > 0
    ? (baseline.medianMs - optimized.medianMs) / baseline.medianMs * 100
    : 0;
  const drawCallReductionPct = baseline.calls > 0
    ? (baseline.calls - optimized.calls) / baseline.calls * 100
    : 0;

  await context.close();
  return {
    name,
    errors,
    baselinePixels,
    qualityBefore,
    qualityAfter,
    qualityInvariant: JSON.stringify(qualityBefore) === JSON.stringify(qualityAfter),
    baseline,
    optimized,
    renderImprovementPct,
    drawCallReductionPct,
    performanceStats,
    visualDiff,
    visualInvariant: visualDiff.comparable && visualDiff.changedPixelRatio <= 0.001 && visualDiff.meanAbsoluteChannelDiff <= 0.05,
  };
}

let report;
try {
  const desktop = await runCase('desktop', {
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
  }, true);

  const mobile = await runCase('mobile', {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  }, false);

  report = {
    generatedAt: new Date().toISOString(),
    methodology: 'Same loaded scene before/after installPerformancePass; animation loop stopped; WebGL gl.finish() after each render; SwiftShader on Netlify Chromium.',
    desktop,
    mobile,
  };
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(dist, 'perf-report.json'), JSON.stringify(report, null, 2));
console.log('PERFORMANCE A/B REPORT');
console.log(JSON.stringify(report, null, 2));

const hardFailures = [report.desktop, report.mobile].flatMap(result => result.errors);
if (hardFailures.length) {
  console.error(hardFailures.join('\n'));
  process.exit(1);
}

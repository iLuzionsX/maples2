import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const dist = path.resolve('dist');
fs.mkdirSync(dist, { recursive: true });

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function compareFingerprint(before, after) {
  if (!before || !after || before.length !== after.length) return { comparable: false };
  let changed = 0;
  let sum = 0;
  let max = 0;
  const pixels = before.length / 4;
  for (let i = 0; i < before.length; i += 4) {
    let pixelChanged = false;
    for (let c = 0; c < 4; c++) {
      const d = Math.abs(before[i + c] - after[i + c]);
      sum += d;
      max = Math.max(max, d);
      if (d > 2) pixelChanged = true;
    }
    if (pixelChanged) changed++;
  }
  return {
    comparable: true,
    pixels,
    changedPixels: changed,
    changedPixelRatio: changed / pixels,
    meanAbsoluteChannelDiff: sum / before.length,
    maxChannelDiff: max,
  };
}

async function waitReady(page) {
  await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__), null, { timeout: 30000 });
  await page.waitForFunction(() => {
    const g = window.__MAPLES_GAME__;
    return g.quality === 'high' && g.assetVisualManager?.ready && g.assetVisualManager?.heroReady &&
      g.environmentAssetManager?.ready && g.natureAssetManager?.ready &&
      g.animationPolishManager?.ready && document.querySelector('#enter-btn')?.dataset.ready === 'true';
  }, null, { timeout: 90000 });
}

async function freezeAndNormalize(page) {
  await page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    g.renderer.setAnimationLoop(null);
    g.started = false;
    g.gameTime = 0;
    g.cameraYaw = Math.PI;
    g.cameraPitch = .28;
    g.cameraShake = 0;
    g.cameraKick = 0;
    g.camera.position.set(7.5, 5.1, 12.2);
    g.camera.fov = 54;
    g.camera.lookAt(0, 1.2, 0);
    g.camera.updateProjectionMatrix();

    if (g.world) {
      g.world.time = 0;
      for (const f of g.world.fireflies || []) {
        const u = f.userData;
        f.position.x = u.base.x + Math.sin(u.phase) * .45;
        f.position.y = u.base.y + Math.sin(u.phase * 2) * .32;
        f.position.z = u.base.z + Math.cos(u.phase) * .4;
        f.material.opacity = .3 + .55 * (.5 + .5 * Math.sin(u.phase));
      }
      if (g.world.portalRing) g.world.portalRing.rotation.z = 0;
    }

    const pass = g.showcasePass;
    if (pass) {
      pass.time = 0;
      for (const foam of pass.foam || []) {
        const p = foam.userData.phase || 0;
        foam.material.opacity = .16 + (Math.sin(p) * .5 + .5) * .18;
        foam.rotation.z = p;
        foam.scale.setScalar(1 + Math.sin(p) * .08);
      }
      const gust = .74;
      for (const group of pass.swayGroups || []) {
        group.rotation.z = group.userData.baseZ + Math.sin(group.userData.phase || 0) * group.userData.sway * (1 + gust * .75)
          + Math.sin((group.userData.phase || 0) * 1.7) * group.userData.sway * .18;
      }
      pass.root?.traverse(object => {
        if (!object.userData?.showcaseMote) return;
        const u = object.userData;
        object.position.x = u.base.x + Math.sin(u.phase) * .42;
        object.position.y = u.base.y + Math.sin(u.phase * 1.4) * .32;
        object.position.z = u.base.z + Math.cos(u.phase) * .36;
        object.material.opacity = .18 + .34 * (Math.sin(u.phase) * .5 + .5);
      });
    }

    const nature = g.natureAssetManager;
    if (nature?.instances) {
      nature.time = 0;
      for (let i = 0; i < nature.instances.length; i++) {
        const item = nature.instances[i];
        const phase = item.userData.phase || i;
        item.rotation.z = (item.userData.baseRotationZ ?? 0) + Math.sin(phase) * (item.userData.sway || 0);
      }
    }

    g.player.setPosition(0, 0, 9);
    g.player.velocity.set(0, 0, 0);
    g.player.state = 'idle';
    g.player.stateTime = 0;
    g.player.root.visible = true;
    g.player.root.rotation.y = 0;
    g.scene.updateMatrixWorld(true);
  });
}

async function snapshot(page) {
  return page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    const renderer = g.renderer;
    const gl = renderer.getContext();
    const shadowMaps = [];
    let visibleLights = 0;
    let geometryTriangles = 0;
    let sceneMeshes = 0;
    let instancedMeshes = 0;

    g.scene.traverse(node => {
      if (node.isLight && node.visible) visibleLights++;
      if (node.isDirectionalLight && node.castShadow) shadowMaps.push([node.shadow.mapSize.x, node.shadow.mapSize.y]);
      if (!node.isMesh || !node.geometry) return;
      sceneMeshes++;
      if (node.isInstancedMesh) instancedMeshes++;
      const geometry = node.geometry;
      const vertexCount = geometry.index?.count ?? geometry.attributes?.position?.count ?? 0;
      const copies = node.isInstancedMesh ? node.count : 1;
      geometryTriangles += vertexCount / 3 * copies;
    });

    renderer.info.autoReset = false;
    renderer.info.reset();
    g._render();
    gl.finish();
    const calls = renderer.info.render.calls;
    const renderedTriangles = renderer.info.render.triangles;
    renderer.info.autoReset = true;
    renderer.info.reset();

    const sample = document.createElement('canvas');
    sample.width = 96;
    sample.height = 54;
    const ctx = sample.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(g.canvas, 0, 0, sample.width, sample.height);
    const fingerprint = Array.from(ctx.getImageData(0, 0, sample.width, sample.height).data);

    return {
      quality: {
        quality: g.quality,
        pixelRatio: renderer.getPixelRatio(),
        shadowType: renderer.shadowMap.type,
        toneMapping: renderer.toneMapping,
        exposure: renderer.toneMappingExposure,
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
      },
      sceneMeshes,
      instancedMeshes,
      geometryTriangles,
      calls,
      renderedTriangles,
      fingerprint,
    };
  });
}

async function isolatedRenderTimes(page, iterations = 4) {
  return page.evaluate(count => {
    const g = window.__MAPLES_GAME__;
    const renderer = g.renderer;
    const gl = renderer.getContext();
    const values = [];
    for (let i = 0; i < 2; i++) { g._render(); gl.finish(); }
    for (let i = 0; i < count; i++) {
      const start = performance.now();
      g._render();
      gl.finish();
      values.push(performance.now() - start);
    }
    return values;
  }, iterations);
}

async function liveFrameTimes(page, frames = 24) {
  await page.locator('#enter-btn').click();
  await page.evaluate(() => window.__MAPLES_GAME__.start());
  const result = await page.evaluate(async count => {
    const deltas = [];
    let last = await new Promise(resolve => requestAnimationFrame(resolve));
    for (let i = 0; i < count + 5; i++) {
      const now = await new Promise(resolve => requestAnimationFrame(resolve));
      if (i >= 5) deltas.push(now - last);
      last = now;
    }
    return deltas;
  }, frames);
  await page.evaluate(() => window.__MAPLES_GAME__.renderer.setAnimationLoop(null));
  return result;
}

async function runCase(page, optimized) {
  const url = `${baseUrl}/?quality=high${optimized ? '' : '&perf=off'}`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await waitReady(page);
  await freezeAndNormalize(page);
  const frozen = await snapshot(page);
  const renderTimes = await isolatedRenderTimes(page);
  const liveTimes = await liveFrameTimes(page);
  return {
    mode: optimized ? 'optimized' : 'baseline',
    quality: frozen.quality,
    sceneMeshes: frozen.sceneMeshes,
    instancedMeshes: frozen.instancedMeshes,
    geometryTriangles: frozen.geometryTriangles,
    calls: frozen.calls,
    renderedTriangles: frozen.renderedTriangles,
    fingerprint: frozen.fingerprint,
    renderMedianMs: median(renderTimes),
    liveMedianMs: median(liveTimes),
    liveMedianFps: 1000 / median(liveTimes),
  };
}

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

let report;
try {
  const context = await browser.newContext({ viewport: { width: 800, height: 450 }, deviceScaleFactor: 1 });
  await context.addInitScript(() => {
    let seed = 0x5eed1234;
    Math.random = () => {
      seed |= 0;
      seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', msg => { if (msg.type() === 'error' && !msg.text().includes('favicon')) errors.push(`console: ${msg.text()}`); });

  const baseline = await runCase(page, false);
  const optimized = await runCase(page, true);
  const visualDiff = compareFingerprint(baseline.fingerprint, optimized.fingerprint);
  delete baseline.fingerprint;
  delete optimized.fingerprint;

  const drawCallReductionPct = (baseline.calls - optimized.calls) / baseline.calls * 100;
  const renderImprovementPct = (baseline.renderMedianMs - optimized.renderMedianMs) / baseline.renderMedianMs * 100;
  const liveFpsImprovementPct = (optimized.liveMedianFps - baseline.liveMedianFps) / baseline.liveMedianFps * 100;
  const geometryDeltaPct = Math.abs(optimized.geometryTriangles - baseline.geometryTriangles) / Math.max(1, baseline.geometryTriangles) * 100;
  const qualityInvariant = JSON.stringify(baseline.quality) === JSON.stringify(optimized.quality);

  report = {
    generatedAt: new Date().toISOString(),
    methodology: 'One Chromium process/page, deterministic RNG, authored high preset at renderer DPR 1.8, deterministic frozen-scene render test plus live idle-gameplay requestAnimationFrame sampling.',
    errors,
    baseline,
    optimized,
    drawCallReductionPct,
    renderImprovementPct,
    liveFpsImprovementPct,
    geometryDeltaPct,
    qualityInvariant,
    visualDiff,
  };

  const failures = [];
  if (errors.length) failures.push(...errors);
  if (!qualityInvariant) failures.push('renderer/asset quality settings changed');
  if (geometryDeltaPct > .01) failures.push(`scene geometry changed by ${geometryDeltaPct.toFixed(4)}%`);
  if (!visualDiff.comparable || visualDiff.changedPixelRatio > .03 || visualDiff.meanAbsoluteChannelDiff > .75) {
    failures.push(`frozen-scene pixel fingerprint changed too much: ${JSON.stringify(visualDiff)}`);
  }
  if (drawCallReductionPct < 5) failures.push(`draw-call reduction below 5%: ${drawCallReductionPct.toFixed(2)}%`);
  if (renderImprovementPct < 3) failures.push(`GPU-complete render improvement below 3%: ${renderImprovementPct.toFixed(2)}%`);
  if (liveFpsImprovementPct < -3) failures.push(`live FPS regressed more than 3%: ${liveFpsImprovementPct.toFixed(2)}%`);

  report.failures = failures;
  fs.writeFileSync(path.join(dist, 'perf-report.json'), JSON.stringify(report, null, 2));
  console.log('PERFORMANCE A/B');
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) process.exitCode = 1;
  await context.close();
} catch (error) {
  report = { generatedAt: new Date().toISOString(), failures: [error.stack || String(error)] };
  fs.writeFileSync(path.join(dist, 'perf-report.json'), JSON.stringify(report, null, 2));
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser.close();
}

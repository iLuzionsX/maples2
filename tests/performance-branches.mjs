import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const baselineUrl = process.env.MAPLES_BASELINE_URL || 'http://127.0.0.1:4174';
const candidateUrl = process.env.MAPLES_CANDIDATE_URL || 'http://127.0.0.1:4173';
const outputPath = path.resolve(process.env.MAPLES_PERF_REPORT || 'dist/perf-branch-report.json');

const scenarios = [
  { id: 'idle', viewport: { width: 960, height: 540 }, mobile: false },
  { id: 'exploration', viewport: { width: 960, height: 540 }, mobile: false },
  { id: 'combat-vfx', viewport: { width: 960, height: 540 }, mobile: false },
  { id: 'boss', viewport: { width: 960, height: 540 }, mobile: false },
  { id: 'mobile-combat', viewport: { width: 390, height: 844 }, mobile: true },
];

function percentile(values, p) {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(sorted.length * p) - 1));
  return sorted[index];
}

function summarize(times) {
  const averageMs = times.reduce((sum, value) => sum + value, 0) / Math.max(1, times.length);
  const medianMs = percentile(times, .5);
  const p99Ms = percentile(times, .99);
  const worstMs = Math.max(...times);
  return {
    samples: times.length,
    averageMs,
    medianMs,
    p99Ms,
    worstMs,
    averageFpsEquivalent: 1000 / averageMs,
    medianFpsEquivalent: 1000 / medianMs,
    onePercentLowFpsEquivalent: 1000 / p99Ms,
  };
}

function improvementPct(before, after) {
  return (before - after) / Math.max(.0001, before) * 100;
}

async function waitReady(page) {
  await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__), null, { timeout: 30000 });
  await page.waitForFunction(() => {
    const g = window.__MAPLES_GAME__;
    return g.assetVisualManager?.ready && g.assetVisualManager?.heroReady &&
      g.environmentAssetManager?.ready && g.natureAssetManager?.ready &&
      g.animationPolishManager?.ready && document.querySelector('#enter-btn')?.dataset.ready === 'true';
  }, null, { timeout: 90000 });
}

async function prepare(page, scenario) {
  await page.evaluate(({ scenarioId }) => {
    const g = window.__MAPLES_GAME__;
    g.renderer.setAnimationLoop(null);
    g.started = true;
    g.hitStop = 0;
    g.attackCooldown = 0;
    g.spellCooldown = 0;
    g.dodgeCooldown = 0;
    g.combatCombo = 0;
    g.combatComboTimer = 0;
    g.bossPending = false;
    g.victoryTimer = 0;
    g.victoryShown = false;
    g.gameTime = 0;
    g.cameraYaw = Math.PI;
    g.cameraPitch = .28;
    g.cameraShake = 0;
    g.cameraKick = 0;
    g.player.dead = false;
    g.player.hp = g.player.maxHp;
    g.player.mana = g.player.maxMana;
    g.player.setPosition(0, 0, 7.5);
    g.player.velocity.set(0, 0, 0);
    g.player.state = 'idle';
    g.player.stateTime = 0;

    const positions = [
      [-5.5, 3], [5.4, 2], [-7, -5], [6.5, -6], [0, -8.5], [3.5, -3.5], [-3.5, -3.5],
    ];
    while (g.enemies.length < positions.length) g._spawnEnemy();
    for (let i = 0; i < g.enemies.length; i++) {
      const enemy = g.enemies[i];
      const pos = positions[i % positions.length];
      enemy.position.set(pos[0], 0, pos[1]);
      enemy.velocity.set(0, 0, 0);
      enemy.dead = false;
      enemy.remove = false;
      enemy.hp = Math.max(enemy.maxHp, 5000);
      enemy.state = scenarioId === 'idle' ? 'idle' : 'chase';
      enemy.stateTime = 0;
      enemy.hitFlash = 0;
    }

    if (scenarioId === 'boss') {
      if (!g.boss || g.boss.dead) g._spawnBoss();
      g.boss.hp = 10000;
      g.boss.maxHp = 10000;
      g.boss.state = 'chase';
      g.boss.stateTime = 0;
      g.boss.position.set(0, 0, -7.5);
    }

    g.scene.updateMatrixWorld(true);
    g.camera.updateMatrixWorld(true);
  }, { scenarioId: scenario.id });
}

async function measureBlock(page, scenarioId, startFrame, frameCount, warmup = false) {
  return page.evaluate(({ scenarioId, startFrame, frameCount, warmup }) => {
    const g = window.__MAPLES_GAME__;
    const gl = g.renderer.getContext();
    const dt = 1 / 60;
    const times = [];

    const step = frame => {
      let moveX = 0;
      let moveY = 0;
      if (scenarioId === 'exploration') {
        moveX = Math.sin(frame * .043) * .52;
        moveY = .86;
        g.cameraYaw += .0045;
      } else if (scenarioId === 'combat-vfx' || scenarioId === 'mobile-combat') {
        moveX = Math.sin(frame * .09) * .28;
        moveY = Math.cos(frame * .055) * .24;
        g.cameraYaw += .0018;
      } else if (scenarioId === 'boss') {
        moveX = Math.sin(frame * .05) * .18;
        moveY = .12;
        g.cameraYaw += .001;
      }

      if ((scenarioId === 'combat-vfx' || scenarioId === 'mobile-combat' || scenarioId === 'boss') && frame % 24 === 0) {
        g.player.state = 'idle';
        g.player.stateTime = 0;
        g.attackCooldown = 0;
        g._startAttack();
        g.fx.slash(g.player.position, g.player.facing, frame % 72 === 0 ? 2 : 0);
        g.fx.burst(g.player.position, 0xffbe78, scenarioId === 'boss' ? 24 : 16, 4.5, 1);
        g.fx.ring(g.player.position, 0x8de5c3, .2, 2.2, .3);
      }
      if ((scenarioId === 'combat-vfx' || scenarioId === 'mobile-combat' || scenarioId === 'boss') && frame % 42 === 7) {
        g.player.mana = g.player.maxMana;
        g.spellCooldown = 0;
        g._castSpell();
      }

      g.gameTime += dt;
      g.player.update(dt, { x: moveX, y: moveY }, g.cameraYaw);
      g.world.clampToArena(g.player.position);
      g._updateEnemies(dt, dt);
      g._updateProjectiles(dt);
      g._updatePickups(dt);
      g._updateEncounter(dt);
      g.fx.update(dt);
      g.world.update(dt);
      g._updateCamera(dt);
      g._updateHUD();
      g._render();
      gl.finish();
    };

    for (let i = 0; i < frameCount; i++) {
      const frame = startFrame + i;
      const before = performance.now();
      step(frame);
      const elapsed = performance.now() - before;
      if (!warmup) times.push(elapsed);
    }
    return times;
  }, { scenarioId, startFrame, frameCount, warmup });
}

async function rendererSnapshot(page) {
  return page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    const renderer = g.renderer;
    const gl = renderer.getContext();
    renderer.info.autoReset = false;
    renderer.info.reset();
    g._render();
    gl.finish();
    const snapshot = {
      drawCalls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      points: renderer.info.render.points,
      lines: renderer.info.render.lines,
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
    };
    renderer.info.autoReset = true;
    renderer.info.reset();
    let objects = 0;
    let meshes = 0;
    let instancedMeshes = 0;
    let skinnedMeshes = 0;
    let lights = 0;
    g.scene.traverse(node => {
      objects++;
      if (node.isMesh) meshes++;
      if (node.isInstancedMesh) instancedMeshes++;
      if (node.isSkinnedMesh) skinnedMeshes++;
      if (node.isLight && node.visible) lights++;
    });
    return {
      ...snapshot,
      objects,
      meshes,
      instancedMeshes,
      skinnedMeshes,
      lights,
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
      environmentPieces: g.environmentAssetManager?.count ?? 0,
      naturePieces: g.natureAssetManager?.count ?? 0,
      enemyCount: g.enemies.length,
      heroImported: Boolean(g.player.assetVisual),
      importedEnemies: g.enemies.filter(enemy => enemy.assetVisual).length,
      solCachedStaticCullSpheres: g.solPerformancePass?.cachedStaticCullSpheres ?? 0,
    };
  });
}

async function runScenario(browser, scenario, errors) {
  const context = await browser.newContext({
    viewport: scenario.viewport,
    deviceScaleFactor: scenario.mobile ? 2 : 1.5,
    isMobile: scenario.mobile,
    hasTouch: scenario.mobile,
  });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, get: () => 8 });
    Object.defineProperty(navigator, 'deviceMemory', { configurable: true, get: () => 8 });
    let seed = 0x5eed1234;
    Math.random = () => {
      seed |= 0;
      seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  });

  const baselinePage = await context.newPage();
  const candidatePage = await context.newPage();
  const attach = (label, page) => {
    page.on('pageerror', error => errors.push(`${scenario.id}/${label} pageerror: ${error.message}`));
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('favicon')) errors.push(`${scenario.id}/${label} console: ${msg.text()}`);
    });
  };
  attach('baseline', baselinePage);
  attach('candidate', candidatePage);

  await Promise.all([
    baselinePage.goto(baselineUrl, { waitUntil: 'networkidle' }),
    candidatePage.goto(candidateUrl, { waitUntil: 'networkidle' }),
  ]);
  await Promise.all([waitReady(baselinePage), waitReady(candidatePage)]);
  await Promise.all([prepare(baselinePage, scenario), prepare(candidatePage, scenario)]);

  await measureBlock(baselinePage, scenario.id, 0, 12, true);
  await measureBlock(candidatePage, scenario.id, 0, 12, true);

  const baselineTimes = [];
  const candidateTimes = [];
  let frame = 12;
  for (let block = 0; block < 8; block++) {
    if (block % 2 === 0) {
      baselineTimes.push(...await measureBlock(baselinePage, scenario.id, frame, 8));
      candidateTimes.push(...await measureBlock(candidatePage, scenario.id, frame, 8));
    } else {
      candidateTimes.push(...await measureBlock(candidatePage, scenario.id, frame, 8));
      baselineTimes.push(...await measureBlock(baselinePage, scenario.id, frame, 8));
    }
    frame += 8;
  }

  const baseline = summarize(baselineTimes);
  const candidate = summarize(candidateTimes);
  const baselineRenderer = await rendererSnapshot(baselinePage);
  const candidateRenderer = await rendererSnapshot(candidatePage);
  await context.close();

  return {
    viewport: scenario.viewport,
    mobile: scenario.mobile,
    baseline: { ...baseline, renderer: baselineRenderer },
    candidate: { ...candidate, renderer: candidateRenderer },
    averageFrameTimeImprovementPct: improvementPct(baseline.averageMs, candidate.averageMs),
    medianFrameTimeImprovementPct: improvementPct(baseline.medianMs, candidate.medianMs),
    onePercentLowImprovementPct: (candidate.onePercentLowFpsEquivalent - baseline.onePercentLowFpsEquivalent) / Math.max(.0001, baseline.onePercentLowFpsEquivalent) * 100,
    drawCallImprovementPct: improvementPct(baselineRenderer.drawCalls, candidateRenderer.drawCalls),
  };
}

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

const errors = [];
const results = {};
try {
  for (const scenario of scenarios) results[scenario.id] = await runScenario(browser, scenario, errors);
} finally {
  await browser.close();
}

const baselineAll = Object.values(results).flatMap(result => Array(result.baseline.samples).fill(result.baseline.averageMs));
const candidateAll = Object.values(results).flatMap(result => Array(result.candidate.samples).fill(result.candidate.averageMs));
const aggregateBaselineMs = baselineAll.reduce((a, b) => a + b, 0) / Math.max(1, baselineAll.length);
const aggregateCandidateMs = candidateAll.reduce((a, b) => a + b, 0) / Math.max(1, candidateAll.length);
const first = results.idle;
const qualityInvariant = first ? JSON.stringify({
  quality: first.baseline.renderer.quality,
  pixelRatio: first.baseline.renderer.pixelRatio,
  shadowType: first.baseline.renderer.shadowType,
  toneMapping: first.baseline.renderer.toneMapping,
  exposure: first.baseline.renderer.exposure,
  composer: first.baseline.renderer.composer,
  composerPasses: first.baseline.renderer.composerPasses,
  environmentPieces: first.baseline.renderer.environmentPieces,
  naturePieces: first.baseline.renderer.naturePieces,
  heroImported: first.baseline.renderer.heroImported,
}) === JSON.stringify({
  quality: first.candidate.renderer.quality,
  pixelRatio: first.candidate.renderer.pixelRatio,
  shadowType: first.candidate.renderer.shadowType,
  toneMapping: first.candidate.renderer.toneMapping,
  exposure: first.candidate.renderer.exposure,
  composer: first.candidate.renderer.composer,
  composerPasses: first.candidate.renderer.composerPasses,
  environmentPieces: first.candidate.renderer.environmentPieces,
  naturePieces: first.candidate.renderer.naturePieces,
  heroImported: first.candidate.renderer.heroImported,
}) : false;

const report = {
  generatedAt: new Date().toISOString(),
  baselineCommit: process.env.MAPLES_BASELINE_COMMIT || null,
  candidateCommit: process.env.COMMIT_REF || process.env.HEAD || null,
  methodology: 'Exact baseline commit and candidate branch are built separately, served concurrently, and measured in the same headless Chromium/SwiftShader process. Each scenario uses deterministic RNG, fixed 60 Hz simulation steps, GPU-complete gl.finish frame timing, 12 warmup frames, then 64 measured frames interleaved in eight alternating blocks to reduce runner drift.',
  errors,
  qualityInvariant,
  scenarios: results,
  aggregate: {
    baselineAverageFrameMs: aggregateBaselineMs,
    candidateAverageFrameMs: aggregateCandidateMs,
    frameTimeImprovementPct: improvementPct(aggregateBaselineMs, aggregateCandidateMs),
    baselineFpsEquivalent: 1000 / aggregateBaselineMs,
    candidateFpsEquivalent: 1000 / aggregateCandidateMs,
  },
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
console.log('MAPLES BRANCH PERFORMANCE A/B');
console.log(JSON.stringify(report, null, 2));

if (errors.length || !qualityInvariant) process.exitCode = 1;

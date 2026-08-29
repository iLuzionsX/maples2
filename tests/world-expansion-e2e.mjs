import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const outputDir = path.resolve('dist', '__validation');
fs.mkdirSync(outputDir, { recursive: true });
const errors = [];
const captures = [];

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});
const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
const page = await context.newPage();
page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
page.on('console', message => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`);
});

await page.goto(`${baseUrl}/?capture=1`, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__), null, { timeout: 60000 });
await page.waitForFunction(() => document.querySelector('#enter-btn')?.dataset.ready === 'true', null, { timeout: 90000 });
await page.locator('#enter-btn').click();
await page.waitForTimeout(450);

const startup = await page.evaluate(() => {
  const game = window.__MAPLES_GAME__;
  return {
    quality: game.quality,
    hardwareConcurrency: navigator.hardwareConcurrency || null,
    deviceMemory: navigator.deviceMemory || null,
    expansionReady: Boolean(game.worldExpansion?.ready),
    terrainReady: Boolean(game.worldExpansionTerrain?.ready),
    atmosphereReady: Boolean(game.worldExpansionAtmosphere?.ready),
    collisionReady: Boolean(game.worldExpansionCollisionPolish?.ready),
    terrainHiddenLegacy: game.worldExpansionTerrain?.hiddenLegacySurfaces || 0,
    landmarks: game.worldExpansion?.landmarks?.length || 0,
    blockers: game.worldExpansion?.blockers?.length || 0,
    landmarkBlockers: game.worldExpansionCollisionPolish?.landmarkBlockers?.length || 0,
    waterBlocker: game.worldExpansionCollisionPolish?.waterBlocker || null,
    expansionNatureReady: Boolean(game.worldExpansionNature?.ready),
    expansionNatureCount: game.worldExpansionNature?.count || 0,
    reusedBasePrototypes: Boolean(game.worldExpansionNature?.reusedBasePrototypes),
  };
});

// CI hardware classification is not a correctness invariant. Exercise whichever quality
// tier the production detector selects, and record it alongside renderer measurements.
if (!['high', 'low'].includes(startup.quality)) errors.push(`unexpected quality tier: ${startup.quality}`);
if (!startup.expansionReady || !startup.terrainReady || !startup.atmosphereReady || !startup.collisionReady) {
  errors.push(`expanded world not fully ready: ${JSON.stringify(startup)}`);
}
if (startup.terrainHiddenLegacy < 6) errors.push(`legacy geometric ground still exposed: ${startup.terrainHiddenLegacy}`);
if (startup.landmarks < 6) errors.push(`expected authored landmarks, got ${startup.landmarks}`);
if (startup.landmarkBlockers < 7) errors.push(`landmark collider metadata not fully integrated: ${startup.landmarkBlockers}`);
if (!startup.waterBlocker || startup.waterBlocker.type !== 'ellipse') errors.push('Glassmere water must use ellipse-aware collision');
const minimumNature = startup.quality === 'high' ? 250 : 140;
if (!startup.expansionNatureReady || startup.expansionNatureCount < minimumNature || !startup.reusedBasePrototypes) {
  errors.push(`expanded nature pipeline not ready/reused: ${JSON.stringify(startup)}`);
}

// These are intentionally clear traversal samples. Obstacle rejection is verified
// separately below, so a valid Waystone collision cannot masquerade as a route failure.
const locations = [
  { key: 'hollowroad', x: 5, z: 70, yaw: Math.PI },
  { key: 'hollowroad-crossing', x: 7, z: 82, yaw: Math.PI * .9 },
  { key: 'glassmere', x: 52, z: 13, yaw: Math.PI * .55 },
  { key: 'briarwatch', x: -46, z: -20, yaw: Math.PI * 1.35 },
];

for (const location of locations) {
  const state = await page.evaluate(({ x, z, yaw }) => {
    const game = window.__MAPLES_GAME__;
    game.player.position.set(x, 0, z);
    game.cameraYaw = yaw;
    game.cameraPitch = .28;
    game.world.clampToArena(game.player.position);
    return { x: game.player.position.x, z: game.player.position.z };
  }, location);
  if (Math.hypot(state.x - location.x, state.z - location.z) > .08) {
    errors.push(`${location.key} travel point was unexpectedly clamped: ${JSON.stringify(state)}`);
  }
  await page.waitForTimeout(350);
  const render = await page.evaluate(() => {
    const game = window.__MAPLES_GAME__;
    return {
      calls: game.renderer.info.render.calls,
      triangles: game.renderer.info.render.triangles,
      geometries: game.renderer.info.memory.geometries,
      textures: game.renderer.info.memory.textures,
      player: { x: game.player.position.x, y: game.player.position.y, z: game.player.position.z },
    };
  });
  captures.push({ ...location, ...render });
  await page.screenshot({ path: path.join(outputDir, `world-expansion-${location.key}.png`) });
}

const invariants = await page.evaluate(() => {
  const game = window.__MAPLES_GAME__;
  const enemy = game.enemies.find(item => !item.dead) || game.enemies[0];
  const originalEnemy = enemy ? enemy.position.clone() : null;
  let enemyRadius = null;
  if (enemy) {
    enemy.position.set(60, 0, 0);
    game.world.clampToArena(enemy.position);
    enemyRadius = Math.hypot(enemy.position.x, enemy.position.z);
    enemy.position.copy(originalEnemy);
  }

  const water = game.worldExpansionCollisionPolish.waterBlocker;
  game.player.position.set(water.x, 0, water.z);
  game.world.clampToArena(game.player.position);
  const waterNorm = Math.hypot(
    (game.player.position.x - water.x) / (water.radiusX + .34),
    (game.player.position.z - water.z) / (water.radiusZ + .34),
  );

  const waystone = game.worldExpansionCollisionPolish.landmarkBlockers.find(blocker => String(blocker.source).includes('Waystone'));
  let waystoneDistance = null;
  let waystoneRequired = null;
  if (waystone) {
    game.player.position.set(waystone.x, 0, waystone.z);
    game.world.clampToArena(game.player.position);
    waystoneDistance = Math.hypot(game.player.position.x - waystone.x, game.player.position.z - waystone.z);
    waystoneRequired = waystone.radius + .34;
  }

  game.player.position.set(180, 0, 180);
  game.world.clampToArena(game.player.position);
  const firstBoundary = game.player.position.clone();
  game.world.clampToArena(game.player.position);
  const boundaryDelta = game.player.position.distanceTo(firstBoundary);

  return {
    enemyRadius,
    waterNorm,
    waystoneDistance,
    waystoneRequired,
    boundaryDelta,
    authority: {
      playerClampCalls: game.worldTravelAuthority?.playerClampCalls || 0,
      encounterClampCalls: game.worldTravelAuthority?.encounterClampCalls || 0,
    },
  };
});

if (invariants.enemyRadius != null && invariants.enemyRadius > 28.001) errors.push(`enemy escaped encounter bubble: r=${invariants.enemyRadius}`);
if (invariants.waterNorm < .999) errors.push(`player remained inside Glassmere water ellipse: norm=${invariants.waterNorm}`);
if (invariants.waystoneDistance != null && invariants.waystoneDistance + 1e-5 < invariants.waystoneRequired) {
  errors.push(`player remained inside Waystone collider: ${JSON.stringify(invariants)}`);
}
if (invariants.boundaryDelta > 1e-5) errors.push(`world-boundary clamp is not stable: delta=${invariants.boundaryDelta}`);
if (invariants.authority.playerClampCalls < 1 || invariants.authority.encounterClampCalls < 1) {
  errors.push(`travel authority did not exercise both paths: ${JSON.stringify(invariants.authority)}`);
}

fs.writeFileSync(path.join(outputDir, 'world-expansion-runtime.json'), JSON.stringify({ errors, startup, captures, invariants }, null, 2));
await context.close();
await browser.close();

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('WORLD EXPANSION E2E PASS', JSON.stringify({ startup, captures, invariants }));

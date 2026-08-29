import { chromium } from 'playwright';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const errors = [];
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});
const context = await browser.newContext({ viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1 });
const page = await context.newPage();
page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));

await page.goto(`${baseUrl}/?quality=high&capture=1`, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__), null, { timeout: 60000 });
await page.waitForFunction(() => document.querySelector('#enter-btn')?.dataset.ready === 'true', null, { timeout: 90000 });
await page.locator('#enter-btn').click();
await page.waitForTimeout(500);

const result = await page.evaluate(() => {
  const game = window.__MAPLES_GAME__;
  game.renderer.setAnimationLoop(null);
  const manager = game.animationVFXNextLevel;
  const director = game.rowanAnimationDirector;
  const target = game.enemies.find(enemy => !enemy.dead && !enemy.isBoss);
  if (!manager || !director || !target) return { ready: false, reason: 'missing runtime manager, director, or enemy' };

  game.fx.update(2);
  const baselineEffects = game.fx.effects.length;
  const hpBefore = target.hp;
  target.position.set(game.player.position.x, game.player.position.y, game.player.position.z + 1.25);
  game.player.facing = 0;
  game.player.root.rotation.y = 0;

  const began = game.player.beginAttack(2);
  let windowFired = false;
  if (began) {
    for (let i = 0; i < 90 && game.player.state === 'attack'; i++) {
      game.player.update(1 / 60, { x: 0, y: 0 }, game.cameraYaw);
      if (game.player.attackWindow()) {
        windowFired = true;
        game._resolveMelee();
      }
    }
  }

  const hpAfter = target.hp;
  const effectsAfterImpact = game.fx.effects.length;
  const impactBursts = manager.impactBursts;
  const handledEvents = manager.eventsHandled;
  const rigReady = Boolean(manager.state.rig?.model);
  const slash = game.fx.effects.find(effect => effect.obj?.children?.length === 3 && effect.obj.type === 'Group');
  const directionalPoints = game.fx.effects.find(effect => effect.obj?.isPoints);

  game.fx.update(2);
  const effectsAfterCleanup = game.fx.effects.length;

  for (let i = 0; i < 40; i++) game.fx.projectileTrail(game.player.position, 0xff8e57);
  for (let i = 0; i < 24; i++) game.fx.dashTrail(game.player.position, 0x89d7e7);
  const projectilePool = game.fx._nextLevelPools?.get('projectile-sprites');
  const dashPool = game.fx._nextLevelPools?.get('dash-ghosts');
  const pooledActive = game.fx.effects.length;
  game.fx.update(1);

  return {
    ready: manager.ready,
    began,
    windowFired,
    hpBefore,
    hpAfter,
    impactBursts,
    handledEvents,
    rigReady,
    baselineEffects,
    effectsAfterImpact,
    effectsAfterCleanup,
    slashLayers: slash?.obj?.children?.length || 0,
    directionalPoints: Boolean(directionalPoints),
    projectilePoolTotal: projectilePool?.total || 0,
    projectilePoolFree: projectilePool?.free?.length || 0,
    dashPoolTotal: dashPool?.total || 0,
    dashPoolFree: dashPool?.free?.length || 0,
    pooledActive,
    effectsAfterPoolCleanup: game.fx.effects.length,
  };
});

if (!result.ready) errors.push(`next-level manager not ready: ${JSON.stringify(result)}`);
if (!result.began || !result.windowFired) errors.push(`authoritative finisher attack did not reach its hit window: ${JSON.stringify(result)}`);
if (!(result.hpAfter < result.hpBefore)) errors.push(`real melee strike did not damage the nearby target: ${JSON.stringify(result)}`);
if (result.impactBursts < 1 || result.handledEvents < 1) errors.push(`real hit did not feed the animation/VFX event consumers: ${JSON.stringify(result)}`);
if (!result.rigReady) errors.push(`post-director motion rig was not initialized: ${JSON.stringify(result)}`);
if (result.slashLayers !== 3) errors.push(`layered slash hierarchy missing: ${JSON.stringify(result)}`);
if (!result.directionalPoints) errors.push(`directional point-cloud impact missing: ${JSON.stringify(result)}`);
if (result.effectsAfterImpact <= result.baselineEffects) errors.push(`impact did not create transient VFX: ${JSON.stringify(result)}`);
if (result.effectsAfterCleanup > result.baselineEffects) errors.push(`transient impact VFX did not clean up: ${JSON.stringify(result)}`);
if (result.projectilePoolTotal > 18 || result.dashPoolTotal > 10) errors.push(`trail pools exceeded authored desktop caps: ${JSON.stringify(result)}`);
if (result.projectilePoolFree !== result.projectilePoolTotal || result.dashPoolFree !== result.dashPoolTotal) errors.push(`pooled trail objects were not returned after expiry: ${JSON.stringify(result)}`);
if (result.effectsAfterPoolCleanup > result.baselineEffects) errors.push(`pooled trail effects did not drain cleanly: ${JSON.stringify(result)}`);

await context.close();
await browser.close();

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('ANIMATION VFX E2E PASS', result);

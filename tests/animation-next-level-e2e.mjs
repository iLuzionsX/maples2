import { chromium } from 'playwright';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const errors = [];
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});
const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
const page = await context.newPage();
page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
page.on('console', msg => {
  if (msg.type() === 'error' && !msg.text().includes('favicon')) errors.push(`console: ${msg.text()}`);
});

await page.goto(`${baseUrl}/?quality=high&capture=1`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => {
  const g = window.__MAPLES_GAME__;
  return Boolean(
    g?.assetVisualManager?.heroReady &&
    g?.animationNextLevelManager?.ready &&
    g?.enemies?.some(enemy => enemy.assetVisual && !enemy.dead) &&
    document.querySelector('#enter-btn')?.dataset.ready === 'true'
  );
}, null, { timeout: 60000 });
await page.locator('#enter-btn').click();
await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__?.rowanAnimationDirector?.ready), null, { timeout: 60000 });

const result = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  const manager = g.animationNextLevelManager;
  g._updateEncounter = () => {};
  const dt = 1 / 60;
  const zero = { x: 0, y: 0 };

  g.player.state = 'idle';
  g.player.stateTime = 0;
  g.player.velocity.set(0, 0, 0);
  g.player.speed = 0;

  const poseFramesBefore = manager.comboPoseFrames;
  const accepted = g.player.beginAttack(0);
  let strikeFired = false;
  let contact = 0;
  for (let i = 0; i < 80; i++) {
    g.player.update(dt, zero, g.cameraYaw);
    if (g.player.attackWindow()) {
      strikeFired = true;
      contact = manager.lastAttackContact;
      break;
    }
  }
  let recoveryFrames = 0;
  while (g.player.state === 'attack' && recoveryFrames++ < 90) g.player.update(dt, zero, g.cameraYaw);
  g.player.update(dt, zero, g.cameraYaw);

  g.player.state = 'idle';
  g.player.stateTime = 0;
  g.player.velocity.set(0, 0, 0);
  g.player.speed = 0;
  g.cameraYaw = Math.PI;
  g.player.facing = Math.PI;
  g.player.root.rotation.y = Math.PI;
  for (let i = 0; i < 90; i++) g.player.update(dt, { x: 0, y: 1 }, g.cameraYaw);
  for (let i = 0; i < 75; i++) g.player.update(dt, zero, g.cameraYaw);

  const enemy = g.enemies.find(candidate => candidate.assetVisual && !candidate.dead && !candidate.isBoss);
  if (!enemy) throw new Error('Imported enemy unavailable for animation smoke');
  enemy.position.set(g.player.position.x + 6, 0, g.player.position.z + 6);
  enemy.state = 'chase';
  enemy.stateTime = 0;
  enemy.velocity.set((enemy.speed || 2.2) * .45, 0, 0);
  enemy.update(dt, g.player);
  enemy.update(dt, g.player);
  const playbackScale = enemy._animationNextLevel?.lastPlaybackScale;

  enemy.state = 'windup';
  enemy.stateTime = 0;
  enemy.stateDuration = .52;
  enemy.update(dt, g.player);
  const hpBefore = enemy.hp;
  enemy.takeHit(1, g.player.position.clone(), true);
  for (let i = 0; i < 4; i++) enemy.update(dt, g.player);

  return {
    mode: manager.mode,
    version: manager.version,
    contactWindowsPreserved: manager.contactWindowsPreserved,
    rootFallbackFlinchDisabled: manager.rootFallbackFlinchDisabled,
    accepted,
    strikeFired,
    contact,
    returnedIdle: g.player.state === 'idle',
    comboPoseFrames: manager.comboPoseFrames - poseFramesBefore,
    attackAnticipations: manager.attackAnticipations,
    playerStrikeAccents: manager.playerStrikeAccents,
    motionFrames: manager.motionFrames,
    peakMotionEnergy: manager.peakMotionEnergy,
    startEvents: manager.startEvents,
    stopEvents: manager.stopEvents,
    locomotionImpulseFrames: manager.locomotionImpulseFrames,
    velocitySyncedEnemies: manager.velocitySyncedEnemies,
    velocitySyncSamples: manager.velocitySyncSamples,
    playbackScale,
    enemyTookDamage: enemy.hp < hpBefore,
    enemyFlinchEvents: manager.enemyFlinchEvents,
  };
});

if (result.mode !== 'authored-momentum-combat-v2' || result.version !== 2) errors.push(`Unexpected animation system: ${result.mode} v${result.version}`);
if (!result.contactWindowsPreserved) errors.push('Gameplay contact windows are not preserved');
if (!result.rootFallbackFlinchDisabled) errors.push('Enemy flinch may fall back to the imported model root');
if (!result.accepted || !result.strikeFired) errors.push('Real Rowan attack lifecycle did not execute');
if (Math.abs(result.contact - .34) > 1e-9) errors.push(`Combo 0 contact drifted: ${result.contact}`);
if (result.comboPoseFrames < 2 || result.attackAnticipations < 1 || result.playerStrikeAccents < 1) errors.push('Authored Rowan combat presentation did not execute');
if (!result.returnedIdle) errors.push('Rowan did not recover from the attack');
if (result.motionFrames < 60 || result.peakMotionEnergy < .05) errors.push(`Momentum locomotion did not execute: ${result.motionFrames}/${result.peakMotionEnergy}`);
if (result.startEvents < 1 || result.stopEvents < 1 || result.locomotionImpulseFrames < 1) errors.push('Start/stop weighted locomotion presentation did not execute');
if (result.velocitySyncedEnemies < 1 || result.velocitySyncSamples < 1 || !Number.isFinite(result.playbackScale)) errors.push('Imported enemy locomotion was not velocity-synchronized');
if (!result.enemyTookDamage || result.enemyFlinchEvents < 1) errors.push('Enemy damage/reaction path did not execute');

await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  for (let i = 0; i < 12; i++) g.player.update(1 / 60, { x: 0, y: 0 }, g.cameraYaw);
});
await page.waitForTimeout(50);

await context.close();
await browser.close();
if (errors.length) {
  console.error(`Animation next-level browser smoke: ${JSON.stringify(result)}`);
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Animation next-level browser smoke: PASS');

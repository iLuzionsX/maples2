import { chromium } from 'playwright';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const errors = [];
const READY_TIMEOUT = 60000;
const STATE_TIMEOUT = 60000;
const LOCOMOTION_TIMEOUT = 90000;
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
  const importedEnemyReady = g?.enemies?.some(enemy => !enemy.dead && !enemy.isBoss && enemy.assetVisual);
  return Boolean(
    g?.assetVisualManager?.heroReady &&
    importedEnemyReady &&
    document.querySelector('#enter-btn')?.dataset.ready === 'true'
  );
}, null, { timeout: READY_TIMEOUT });

await page.locator('#enter-btn').click();
await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__?.rowanAnimationDirector?.ready), null, { timeout: READY_TIMEOUT });

// Isolate Rowan animation validation from unrelated enemy AI while keeping the
// imported enemies in the scene so melee still goes through the real resolver.
await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  g._updateEnemies = () => {};
  g._updateEncounter = () => {};
  for (const enemy of g.enemies) {
    enemy.velocity?.set?.(0, 0, 0);
    if (!enemy.dead) {
      enemy.state = 'idle';
      enemy.stateTime = 0;
    }
  }
});

const boot = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  const d = g.rowanAnimationDirector;
  return {
    mode: d.mode,
    skeletalRigReady: d.skeletalRigReady,
    secondaryMotionReady: d.secondaryMotionReady,
    footIKReady: d.footIKReady,
    rootProceduralSuppressed: d.rootProceduralSuppressed,
    clipCoverage: d.clipCoverage,
  };
});
if (boot.mode !== 'skeletal-follow-gameplay') errors.push(`Unexpected Rowan animation mode: ${boot.mode}`);
if (!boot.skeletalRigReady) errors.push('Rowan skeletal rig did not resolve required authored bones');
if (!boot.secondaryMotionReady) errors.push('Rowan cape secondary-motion target did not resolve');
if (!boot.footIKReady) errors.push('Rowan foot bones did not resolve for terrain IK');
for (const key of ['idle', 'walk', 'run', 'turnLeft', 'turnRight', 'deathPose']) {
  if (!boot.clipCoverage?.[key]) errors.push(`Missing authored Rowan clip coverage: ${key}`);
}

await page.waitForTimeout(100);

const start = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  return { x: g.player.position.x, z: g.player.position.z };
});
await page.keyboard.down('KeyW');
await page.waitForFunction(({ x, z }) => {
  const g = window.__MAPLES_GAME__;
  return Math.hypot(g.player.position.x - x, g.player.position.z - z) >= 2.0 && g.player.speed > 4.2;
}, start, { timeout: LOCOMOTION_TIMEOUT });

const running = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  const d = g.rowanAnimationDirector;
  const state = d.state;
  const model = g.player.assetVisual;
  return {
    speed: g.player.speed,
    weights: { ...d.locomotionWeights },
    footsteps: d.eventCounts.footstep || 0,
    footIKActive: d.footIKActive,
    groundMeshCount: d.groundMeshCount || 0,
    rootPositionError: model.position.distanceTo(state.restPosition),
    rootScaleError: model.scale.distanceTo(state.restScale),
    rootQuaternionError: model.quaternion.angleTo(state.restQuaternion),
  };
});
if (running.weights.run <= running.weights.walk) errors.push(`Run blend did not dominate at ${running.speed.toFixed(2)} m/s`);
if (running.footsteps < 1) errors.push('No authored gait footstep event fired while running');
if (running.groundMeshCount < 1) errors.push('Terrain IK ground cache is empty');
if (!running.footIKActive) errors.push('Terrain IK did not resolve either Rowan foot to ground');
if (running.rootPositionError > .001 || running.rootScaleError > .001 || running.rootQuaternionError > .001) {
  errors.push(`Imported Rowan root was procedurally displaced: p=${running.rootPositionError}, s=${running.rootScaleError}, q=${running.rootQuaternionError}`);
}

await page.keyboard.up('KeyW');
await page.waitForFunction(() => window.__MAPLES_GAME__.player.speed < .3, null, { timeout: STATE_TIMEOUT });
const stopEvents = await page.evaluate(() => window.__MAPLES_GAME__.rowanAnimationDirector.eventCounts['locomotion:stop'] || 0);
if (stopEvents < 1) errors.push('No deceleration/stop animation event fired');

const startEvents = await page.evaluate(() => window.__MAPLES_GAME__.rowanAnimationDirector.eventCounts['locomotion:start'] || 0);
if (startEvents < 1) errors.push('No acceleration/start animation event fired');

await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  g.player.state = 'idle';
  g.player.stateTime = 0;
  g.player.velocity.set(0, 0, 0);
  g.player.setPosition(0, 0, 5.2);
  g.player.facing = Math.PI;
  g.player.root.rotation.y = Math.PI;
  g.cameraYaw = Math.PI;
  const enemy = g.enemies.find(e => !e.dead && !e.isBoss && e.assetVisual);
  if (!enemy) throw new Error('Rowan melee validation requires an imported enemy target');
  enemy.position.set(0, 0, 3.45);
  enemy.state = 'idle';
  enemy.stateTime = 0;
  enemy.velocity.set(0, 0, 0);
});
await page.waitForTimeout(80);
await page.mouse.click(640, 360);
await page.waitForFunction(() => {
  const d = window.__MAPLES_GAME__.rowanAnimationDirector;
  return (d.eventCounts['attack:anticipation'] || 0) >= 1 &&
    (d.eventCounts['attack:strike'] || 0) >= 1 &&
    (d.eventCounts['weapon-trail:start'] || 0) >= 1;
}, null, { timeout: STATE_TIMEOUT });
const attackEvents = await page.evaluate(() => ({ ...window.__MAPLES_GAME__.rowanAnimationDirector.eventCounts }));
if ((attackEvents['sword:impact'] || 0) < 1) errors.push('Sword impact event did not follow a real melee hit');

await page.waitForFunction(() => window.__MAPLES_GAME__.player.state === 'idle', null, { timeout: STATE_TIMEOUT });
await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  g.player.invuln = 0;
  const source = {
    x: g.player.position.x + Math.cos(g.player.facing),
    y: g.player.position.y,
    z: g.player.position.z - Math.sin(g.player.facing),
  };
  g.player.takeDamage(1, source);
});
await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__.rowanAnimationDirector.hitResponse), null, { timeout: STATE_TIMEOUT });
const hit = await page.evaluate(() => window.__MAPLES_GAME__.rowanAnimationDirector.hitResponse);
if (Math.abs(hit.side) < .7) errors.push(`Directional hit reaction was not classified as a side hit: ${JSON.stringify(hit)}`);

await page.waitForFunction(() => window.__MAPLES_GAME__.player.state === 'idle', null, { timeout: STATE_TIMEOUT });
await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  g.player.beginDodge({ x: 1, y: 0, z: 0 });
});
await page.waitForFunction(() => (window.__MAPLES_GAME__.rowanAnimationDirector.eventCounts['dodge:recover'] || 0) >= 1, null, { timeout: STATE_TIMEOUT });

const final = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  const d = g.rowanAnimationDirector;
  return {
    events: { ...d.eventCounts },
    rootProceduralSuppressed: d.rootProceduralSuppressed,
    locomotionBlendActive: d.locomotionBlendActive,
    weaponTrailEventActive: d.weaponTrailEventActive,
  };
});
if (!final.rootProceduralSuppressed || !final.locomotionBlendActive) errors.push('Rowan authored director did not remain active through gameplay states');

await context.close();
await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('rowan-animation-e2e: PASS');
console.log(JSON.stringify({ boot, running, final }, null, 2));
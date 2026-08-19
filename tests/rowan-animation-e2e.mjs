import { chromium } from 'playwright';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const errors = [];
const READY_TIMEOUT = 60000;
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
    g?.enemies?.some(enemy => !enemy.dead && !enemy.isBoss && enemy.assetVisual) &&
    document.querySelector('#enter-btn')?.dataset.ready === 'true'
  );
}, null, { timeout: READY_TIMEOUT });

await page.locator('#enter-btn').click();
await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__?.rowanAnimationDirector?.ready), null, { timeout: READY_TIMEOUT });

// Keep this a browser integration test, but advance gameplay deterministically.
// Netlify's SwiftShader renderer can be extremely slow in wall-clock time; the
// animation system itself is simulation-time driven and wraps player.update().
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
if (!boot.secondaryMotionReady) errors.push('Rowan cape/hair secondary-motion target did not resolve');
if (!boot.footIKReady) errors.push('Rowan foot bones did not resolve for terrain IK');
for (const key of ['idle', 'walk', 'run', 'turnLeft', 'turnRight', 'deathPose']) {
  if (!boot.clipCoverage?.[key]) errors.push(`Missing authored Rowan clip coverage: ${key}`);
}

const locomotion = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  const d = g.rowanAnimationDirector;
  const dt = 1 / 60;
  const step = (count, move) => {
    for (let i = 0; i < count; i++) g.player.update(dt, move, g.cameraYaw);
  };

  g.cameraYaw = Math.PI;
  g.player.state = 'idle';
  g.player.stateTime = 0;
  g.player.velocity.set(0, 0, 0);
  g.player.setPosition(0, 0, 5.2);
  g.player.facing = Math.PI;
  g.player.root.rotation.y = Math.PI;

  const start = g.player.position.clone();
  step(120, { x: 0, y: 1 });
  const runSnapshot = {
    distance: g.player.position.distanceTo(start),
    speed: g.player.speed,
    weights: { ...d.locomotionWeights },
    footsteps: d.eventCounts.footstep || 0,
    starts: d.eventCounts['locomotion:start'] || 0,
    footIKActive: d.footIKActive,
    groundMeshCount: d.groundMeshCount || 0,
    rootPositionError: g.player.assetVisual.position.distanceTo(d.state.restPosition),
    rootScaleError: g.player.assetVisual.scale.distanceTo(d.state.restScale),
    rootQuaternionError: g.player.assetVisual.quaternion.angleTo(d.state.restQuaternion),
  };

  // Force a genuine sharp gameplay direction change while still locomoting.
  step(35, { x: 1, y: 0 });
  const directionChanges = d.eventCounts['locomotion:direction-change'] || 0;

  step(90, { x: 0, y: 0 });
  return {
    runSnapshot,
    finalSpeed: g.player.speed,
    stops: d.eventCounts['locomotion:stop'] || 0,
    directionChanges,
  };
});

if (locomotion.runSnapshot.distance < 2) errors.push(`Deterministic run covered only ${locomotion.runSnapshot.distance.toFixed(2)} m`);
if (locomotion.runSnapshot.speed <= 4.2) errors.push(`Run speed did not reach authored blend range: ${locomotion.runSnapshot.speed.toFixed(2)} m/s`);
if (locomotion.runSnapshot.weights.run <= locomotion.runSnapshot.weights.walk) errors.push('Run blend did not dominate at full gameplay speed');
if (locomotion.runSnapshot.footsteps < 1) errors.push('No authored gait footstep event fired while running');
if (locomotion.runSnapshot.starts < 1) errors.push('No acceleration/start animation event fired');
if (locomotion.stops < 1) errors.push('No deceleration/stop animation event fired');
if (locomotion.directionChanges < 1) errors.push('No sharp direction-change animation event fired');
if (locomotion.runSnapshot.groundMeshCount < 1) errors.push('Terrain IK ground cache is empty');
if (!locomotion.runSnapshot.footIKActive) errors.push('Terrain IK did not resolve either Rowan foot to ground');
if (locomotion.finalSpeed >= .3) errors.push(`Rowan did not settle after deceleration: ${locomotion.finalSpeed.toFixed(3)} m/s`);
if (locomotion.runSnapshot.rootPositionError > .001 || locomotion.runSnapshot.rootScaleError > .001 || locomotion.runSnapshot.rootQuaternionError > .001) {
  errors.push(`Imported Rowan root was procedurally displaced: p=${locomotion.runSnapshot.rootPositionError}, s=${locomotion.runSnapshot.rootScaleError}, q=${locomotion.runSnapshot.rootQuaternionError}`);
}

const combat = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  const d = g.rowanAnimationDirector;
  const dt = 1 / 60;
  const step = (count, move = { x: 0, y: 0 }, resolveMelee = false) => {
    for (let i = 0; i < count; i++) {
      g.player.update(dt, move, g.cameraYaw);
      if (resolveMelee && g.player.attackWindow()) g._resolveMelee();
    }
  };

  const enemy = g.enemies.find(e => !e.dead && !e.isBoss && e.assetVisual);
  if (!enemy) throw new Error('Rowan melee validation requires an imported enemy target');

  g.player.state = 'idle';
  g.player.stateTime = 0;
  g.player.velocity.set(0, 0, 0);
  g.player.setPosition(0, 0, 5.2);
  g.player.facing = Math.PI;
  g.player.root.rotation.y = Math.PI;
  g.cameraYaw = Math.PI;
  enemy.position.set(0, 0, 3.45);
  enemy.state = 'idle';
  enemy.stateTime = 0;
  enemy.velocity.set(0, 0, 0);

  g.player.beginAttack(0);
  step(40, { x: 0, y: 0 }, true);
  const attackEvents = { ...d.eventCounts };

  // Directional hit reaction.
  g.player.state = 'idle';
  g.player.stateTime = 0;
  g.player.velocity.set(0, 0, 0);
  g.player.invuln = 0;
  const source = {
    x: g.player.position.x + Math.cos(g.player.facing),
    y: g.player.position.y,
    z: g.player.position.z - Math.sin(g.player.facing),
  };
  g.player.takeDamage(1, source);
  const hit = d.hitResponse ? { ...d.hitResponse } : null;
  step(30);

  // Dodge from rest must not masquerade as a locomotion start, and planted
  // contacts from takeoff must be cleared before recovery.
  g.player.state = 'idle';
  g.player.stateTime = 0;
  g.player.velocity.set(0, 0, 0);
  g.player.speed = 0;
  g.player.invuln = 0;
  const startsBeforeDodge = d.eventCounts['locomotion:start'] || 0;
  const dodgeDir = g.player.velocity.clone().set(1, 0, 0);
  g.player.beginDodge(dodgeDir);
  step(40);
  const startsAfterDodge = d.eventCounts['locomotion:start'] || 0;
  const footLocksAfterDodge = [d.state?.foot?.left?.lock, d.state?.foot?.right?.lock].filter(Boolean).length;
  const dodgeRecoveries = d.eventCounts['dodge:recover'] || 0;

  // Lethal hit and authored final pose hold.
  g.player.state = 'idle';
  g.player.stateTime = 0;
  g.player.velocity.set(0, 0, 0);
  g.player.speed = 0;
  g.player.invuln = 0;
  g.player.hp = 1;
  g.player.takeDamage(2, { x: g.player.position.x, y: g.player.position.y, z: g.player.position.z + 1 });
  step(90);

  return {
    attackEvents,
    hit,
    startsBeforeDodge,
    startsAfterDodge,
    footLocksAfterDodge,
    dodgeRecoveries,
    dead: g.player.dead,
    deathPoseHeld: d.deathPoseHeld,
    weaponTrailEventActive: d.weaponTrailEventActive,
    rootProceduralSuppressed: d.rootProceduralSuppressed,
    locomotionBlendActive: d.locomotionBlendActive,
  };
});

if ((combat.attackEvents['attack:anticipation'] || 0) < 1) errors.push('Attack anticipation event did not fire');
if ((combat.attackEvents['attack:strike'] || 0) < 1) errors.push('Attack strike event did not fire');
if ((combat.attackEvents['attack:follow-through'] || 0) < 1) errors.push('Attack follow-through event did not fire');
if ((combat.attackEvents['weapon-trail:start'] || 0) < 1) errors.push('Weapon trail start event did not fire');
if ((combat.attackEvents['weapon-trail:end'] || 0) < 1) errors.push('Weapon trail end event did not fire');
if ((combat.attackEvents['sword:impact'] || 0) < 1) errors.push('Sword impact event did not follow a real melee hit');
if (!combat.hit || Math.abs(combat.hit.side) < .7) errors.push(`Directional hit reaction was not classified as a side hit: ${JSON.stringify(combat.hit)}`);
if (combat.startsAfterDodge !== combat.startsBeforeDodge) errors.push('Dodge incorrectly emitted a locomotion:start event');
if (combat.footLocksAfterDodge !== 0) errors.push('Dodge recovery retained stale planted-foot locks');
if (combat.dodgeRecoveries < 1) errors.push('Dodge recovery animation event did not fire');
if (!combat.dead || !combat.deathPoseHeld) errors.push('Rowan death did not settle into the authored final pose');
if (combat.weaponTrailEventActive) errors.push('Weapon trail event remained active after combat finished');
if (!combat.rootProceduralSuppressed || !combat.locomotionBlendActive) errors.push('Rowan authored director did not remain active through gameplay states');

await context.close();
await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('rowan-animation-e2e: PASS');
console.log(JSON.stringify({ boot, locomotion, combat }, null, 2));

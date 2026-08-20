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
    g?.rowanAnimationDirector?.ready &&
    g?.animationNextLevelManager?.ready &&
    g?.enemies?.some(enemy => enemy.assetVisual && !enemy.dead) &&
    document.querySelector('#enter-btn')?.dataset.ready === 'true'
  );
}, null, { timeout: 60000 });
await page.locator('#enter-btn').click();

const result = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  const manager = g.animationNextLevelManager;
  g._updateEncounter = () => {};
  const dt = 1 / 60;
  const zero = { x: 0, y: 0 };

  const comboChecks = [];
  for (let combo = 0; combo < 3; combo++) {
    if (g.player.state !== 'idle') throw new Error(`Combo ${combo} started before Rowan returned to idle: ${g.player.state}`);
    g.player.velocity.set(0, 0, 0);
    g.player.speed = 0;
    const beforeFrames = manager.comboPoseFrames;
    const beforeFollow = manager.followThroughEvents;
    const accepted = g.player.beginAttack(combo);
    let strikeFired = false;
    let contactAtStrike = 0;
    let impactAtStrike = 0;

    for (let i = 0; i < 80; i++) {
      g.player.update(dt, zero, g.cameraYaw);
      if (g.player.attackWindow()) {
        strikeFired = true;
        contactAtStrike = manager.lastAttackContact;
        impactAtStrike = manager.lastAttackImpact;
        break;
      }
    }

    let recoveryFrames = 0;
    while (g.player.state === 'attack' && recoveryFrames < 90) {
      g.player.update(dt, zero, g.cameraYaw);
      recoveryFrames++;
    }
    // Give every downstream animation layer a clean idle sample before the next combo.
    g.player.update(dt, zero, g.cameraYaw);

    comboChecks.push({
      combo,
      accepted,
      strikeFired,
      contact: contactAtStrike,
      impactAtStrike,
      poseFrames: manager.comboPoseFrames - beforeFrames,
      followThroughEvents: manager.followThroughEvents - beforeFollow,
      returnedIdle: g.player.state === 'idle',
    });
  }

  g.player.velocity.set(0, 0, 0);
  g.player.speed = 0;
  for (let i = 0; i < 24; i++) g.player.update(dt, { x: 0, y: 1 }, g.cameraYaw);
  for (let i = 0; i < 18; i++) g.player.update(dt, { x: 1, y: 0 }, g.cameraYaw);
  for (let i = 0; i < 32; i++) g.player.update(dt, zero, g.cameraYaw);

  const dodgeVector = g.player.velocity.clone().set(1, 0, 0);
  const dodgeAccepted = g.player.beginDodge(dodgeVector);
  for (let i = 0; i < 34; i++) g.player.update(dt, zero, g.cameraYaw);

  const enemy = g.enemies.find(candidate => candidate.assetVisual && !candidate.dead && !candidate.isBoss);
  if (!enemy) throw new Error('Imported enemy unavailable for animation validation');
  enemy.position.set(g.player.position.x + 6, 0, g.player.position.z + 6);
  enemy.state = 'chase';
  enemy.stateTime = 0;
  enemy.velocity.set((enemy.speed || 2.2) * .45, 0, 0);
  enemy.update(dt, g.player);
  enemy.update(dt, g.player);
  const playbackScale = enemy._animationNextLevel?.lastPlaybackScale;

  enemy.state = 'windup';
  enemy.stateTime = 0;
  enemy.stateDuration = enemy.isBoss ? .92 : .52;
  for (let i = 0; i < 6; i++) enemy.update(dt, g.player);

  const hpBefore = enemy.hp;
  enemy.takeHit(1, g.player.position.clone(), true);
  for (let i = 0; i < 5; i++) enemy.update(dt, g.player);
  const enemyTorso = enemy._animationNextLevel?.bones?.torso || null;

  return {
    mode: manager.mode,
    version: manager.version,
    contactWindowsPreserved: manager.contactWindowsPreserved,
    rootFallbackFlinchDisabled: manager.rootFallbackFlinchDisabled,
    playerRigCoverage: manager.playerRigCoverage,
    comboChecks,
    playerStrikeAccents: manager.playerStrikeAccents,
    attackAnticipations: manager.attackAnticipations,
    followThroughEvents: manager.followThroughEvents,
    motionFrames: manager.motionFrames,
    peakMotionEnergy: manager.peakMotionEnergy,
    startEvents: manager.startEvents,
    stopEvents: manager.stopEvents,
    landingEvents: manager.landingEvents,
    locomotionImpulseFrames: manager.locomotionImpulseFrames,
    dodgeAccepted,
    velocitySyncedEnemies: manager.velocitySyncedEnemies,
    velocitySyncSamples: manager.velocitySyncSamples,
    playbackScale,
    enemyTorsoRigsReady: manager.enemyTorsoRigsReady,
    enemyWindups: manager.enemyWindups,
    enemyStatePoseFrames: manager.enemyStatePoseFrames,
    enemyFlinchEvents: manager.enemyFlinchEvents,
    enemyFlinchFrames: manager.enemyFlinchFrames,
    enemyTookDamage: enemy.hp < hpBefore,
    enemyFlinchUsesSkeletalNode: Boolean(enemyTorso?.isBone && enemyTorso !== enemy.assetVisual),
  };
});

if (result.mode !== 'authored-momentum-combat-v2' || result.version !== 2) errors.push(`Unexpected animation system: ${result.mode} v${result.version}`);
if (!result.contactWindowsPreserved) errors.push('Animation system does not report preserved gameplay contact windows');
if (!result.rootFallbackFlinchDisabled) errors.push('Enemy flinch is allowed to fall back to imported model root');
if (result.playerRigCoverage.core < 3) errors.push(`Rowan core rig coverage is too low: ${JSON.stringify(result.playerRigCoverage)}`);
if (result.playerRigCoverage.arms < 2) errors.push(`Rowan authored combat arm coverage is too low: ${JSON.stringify(result.playerRigCoverage)}`);

const expectedContacts = [.34, .32, .52];
for (const check of result.comboChecks) {
  if (!check.accepted) errors.push(`Combo ${check.combo} was rejected by the real Character attack gate`);
  if (!check.strikeFired) errors.push(`Combo ${check.combo} gameplay attack contact did not fire`);
  if (Math.abs(check.contact - expectedContacts[check.combo]) > 1e-9) errors.push(`Combo ${check.combo} visible contact drifted: ${check.contact}`);
  if (check.impactAtStrike < .72) errors.push(`Combo ${check.combo} authored impact was not aligned strongly enough to contact: ${check.impactAtStrike}`);
  if (check.poseFrames < 2) errors.push(`Combo ${check.combo} full-body pose layer did not run`);
  if (check.followThroughEvents < 1) errors.push(`Combo ${check.combo} follow-through event did not execute`);
  if (!check.returnedIdle) errors.push(`Combo ${check.combo} did not complete its real recovery lifecycle`);
}
if (result.playerStrikeAccents < 3 || result.attackAnticipations < 3 || result.followThroughEvents < 3) errors.push('All three player combo event phases did not execute');
if (result.motionFrames < 20 || result.peakMotionEnergy < .1) errors.push(`Momentum-aware locomotion layer did not execute strongly enough: frames=${result.motionFrames}, energy=${result.peakMotionEnergy}`);
if (result.startEvents < 1 || result.stopEvents < 1) errors.push(`Start/stop authored transition events missing: ${result.startEvents}/${result.stopEvents}`);
if (!result.dodgeAccepted || result.landingEvents < 1 || result.locomotionImpulseFrames < 1) errors.push('Dodge landing / locomotion impulse layer did not execute');
if (result.velocitySyncedEnemies < 1 || result.velocitySyncSamples < 1) errors.push('Imported enemy locomotion did not enter velocity-synchronized playback');
if (!(result.playbackScale >= .68 && result.playbackScale < 1)) errors.push(`Partial-speed enemy playback was not scaled below authored full speed: ${result.playbackScale}`);
if (result.enemyTorsoRigsReady < 1) errors.push('No imported enemy torso rig was found for additive reactions');
if (result.enemyWindups < 1 || result.enemyStatePoseFrames < 1) errors.push('Enemy anticipation/attack presentation layer did not execute');
if (!result.enemyTookDamage) errors.push('Enemy damage path changed unexpectedly');
if (result.enemyFlinchEvents < 1 || result.enemyFlinchFrames < 1) errors.push('Directional enemy flinch layer did not execute');
if (!result.enemyFlinchUsesSkeletalNode) errors.push('Enemy flinch is not anchored to a skeletal torso node');

await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  for (let i = 0; i < 12; i++) g.player.update(1 / 60, { x: 0, y: 0 }, g.cameraYaw);
});
await page.waitForTimeout(50);

await browser.close();
if (errors.length) {
  console.error(`Animation next-level browser result: ${JSON.stringify(result)}`);
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Animation next-level authored combat + locomotion browser: PASS');

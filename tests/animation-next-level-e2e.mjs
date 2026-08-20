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

const result = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  const manager = g.animationNextLevelManager;
  g._updateEncounter = () => {};

  const dt = 1 / 60;
  g.player.state = 'idle';
  g.player.stateTime = 0;
  g.player.velocity.set(0, 0, 0);
  g.player.speed = 0;
  g.player.beginAttack(0);
  let strikeFired = false;
  for (let i = 0; i < 30; i++) {
    g.player.update(dt, { x: 0, y: 0 }, g.cameraYaw);
    if (g.player.attackWindow()) {
      strikeFired = true;
      break;
    }
  }

  const enemy = g.enemies.find(candidate => candidate.assetVisual && !candidate.dead && !candidate.isBoss);
  if (!enemy) throw new Error('Imported enemy unavailable for animation validation');
  enemy.position.set(g.player.position.x + 6, 0, g.player.position.z + 6);
  enemy.state = 'chase';
  enemy.stateTime = 0;
  enemy.velocity.set((enemy.speed || 2.2) * .45, 0, 0);
  enemy.update(dt, g.player);
  enemy.update(dt, g.player);
  const playbackScale = enemy._animationNextLevel?.lastPlaybackScale;

  const hpBefore = enemy.hp;
  enemy.takeHit(1, g.player.position.clone(), true);
  for (let i = 0; i < 4; i++) enemy.update(dt, g.player);

  return {
    mode: manager.mode,
    contactWindowsPreserved: manager.contactWindowsPreserved,
    strikeFired,
    lastAttackContact: manager.lastAttackContact,
    playerStrikeAccents: manager.playerStrikeAccents,
    attackAnticipations: manager.attackAnticipations,
    velocitySyncedEnemies: manager.velocitySyncedEnemies,
    velocitySyncSamples: manager.velocitySyncSamples,
    playbackScale,
    enemyFlinchEvents: manager.enemyFlinchEvents,
    enemyFlinchFrames: manager.enemyFlinchFrames,
    enemyTookDamage: enemy.hp < hpBefore,
  };
});

if (result.mode !== 'contact-aligned-layered-polish') errors.push(`Unexpected animation mode: ${result.mode}`);
if (!result.contactWindowsPreserved) errors.push('Animation layer does not report preserved gameplay contact windows');
if (!result.strikeFired) errors.push('Existing gameplay attack contact did not fire');
if (Math.abs(result.lastAttackContact - .34) > 1e-9) errors.push(`Combo 0 visible contact drifted from gameplay threshold: ${result.lastAttackContact}`);
if (result.playerStrikeAccents < 1 || result.attackAnticipations < 1) errors.push('Player animation event accents did not execute');
if (result.velocitySyncedEnemies < 1 || result.velocitySyncSamples < 1) errors.push('Imported enemy locomotion did not enter velocity-synchronized playback');
if (!(result.playbackScale >= .68 && result.playbackScale < 1)) errors.push(`Partial-speed enemy playback was not scaled below authored full speed: ${result.playbackScale}`);
if (!result.enemyTookDamage) errors.push('Enemy damage path changed unexpectedly');
if (result.enemyFlinchEvents < 1 || result.enemyFlinchFrames < 1) errors.push('Directional enemy flinch layer did not execute');

await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Animation next-level browser: PASS');

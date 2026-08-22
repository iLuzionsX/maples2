import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});
const errors = [];

try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(`desktop pageerror: ${error.message}`));
  page.on('console', msg => { if (msg.type() === 'error' && !msg.text().includes('favicon')) errors.push(`desktop console: ${msg.text()}`); });
  await page.goto(`${baseUrl}/?quality=low&capture=1`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelector('#enter-btn')?.dataset.ready === 'true', null, { timeout: 60000 });
  await page.locator('#enter-btn').click();
  await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__?.unifiedActionArchitecture));

  const desktop = await page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    g.renderer.setAnimationLoop(null);
    const p = g.player;
    const report = {};
    const move = { x: 0, y: 0, z: 0 };

    const tickReal = dt => {
      g.gameTime += dt;
      g.attackCooldown = Math.max(0, g.attackCooldown - dt);
      g.spellCooldown = Math.max(0, g.spellCooldown - dt);
      g.dodgeCooldown = Math.max(0, g.dodgeCooldown - dt);
      g.comboDeadline -= dt;
    };
    const frame = (worldDt = 1 / 60, realDt = worldDt, code = null) => {
      tickReal(realDt);
      if (code) g.input.pressed.add(code);
      g._handleInput(move);
      p.update(worldDt, { x: 0, y: 0 }, g.cameraYaw);
      if (p.attackWindow()) g._resolveMelee();
    };
    const advance = (seconds, worldScale = 1) => {
      let remaining = seconds;
      while (remaining > 1e-7) {
        const realDt = Math.min(1 / 60, remaining);
        frame(realDt * worldScale, realDt);
        remaining -= realDt;
      }
    };
    const resetPlayer = () => {
      p.dead = false;
      p.hp = p.maxHp;
      p.mana = p.maxMana;
      p.state = 'idle';
      p.stateTime = 0;
      p.invuln = 0;
      p.velocity.set(0, 0, 0);
      p.setPosition(0, 0, 0);
      p.facing = 0;
      p.root.rotation.y = 0;
      g.cameraYaw = 0;
      g.attackCooldown = 0;
      g.spellCooldown = 0;
      g.dodgeCooldown = 0;
      g.comboDeadline = 0;
      g.actionController.clearBufferedInput();
      for (const projectile of g.projectiles) {
        projectile.mesh?.removeFromParent?.();
        projectile.mesh?.geometry?.dispose?.();
        projectile.mesh?.material?.dispose?.();
      }
      g.projectiles.length = 0;
      g.input.pressed.clear();
      g.input.mobileActions?.clear?.();
    };

    resetPlayer();
    frame(.001, .001, 'Mouse0');
    report.attack1 = { state: p.state, combo: p.comboIndex };
    advance(.24);
    frame(.001, .001, 'Mouse0');
    report.earlyBuffered = g.attackQueued;
    advance(.16);
    report.attack2 = { state: p.state, combo: p.comboIndex };
    advance(.27);
    frame(.001, .001, 'Mouse0');
    advance(.18);
    report.attack3 = { state: p.state, combo: p.comboIndex };

    resetPlayer();
    frame(.001, .001, 'Mouse0');
    advance(.05);
    const projectileBefore = g.projectiles.length;
    frame(.001, .001, 'KeyQ');
    const projectile = g.projectiles.at(-1);
    report.attackToSpell = {
      state: p.state,
      createdSynchronously: g.projectiles.length === projectileBefore + 1,
      enhanced: Boolean(projectile?.mesh?.userData?.showcaseEnhanced),
      cooldown: g.spellCooldown,
      mana: p.mana,
    };

    resetPlayer();
    p.mana = 25;
    const insufficientBefore = g.projectiles.length;
    frame(.001, .001, 'KeyQ');
    advance(.13);
    report.insufficientMana = {
      state: p.state,
      projectileDelta: g.projectiles.length - insufficientBefore,
      buffered: g.actionController.hasBufferedInput('spell'),
    };

    resetPlayer();
    frame(.001, .001, 'Mouse0');
    advance(.15);
    frame(.001, .001, 'Space');
    const dodgeBufferedEarly = g.actionController.hasBufferedInput('dodge');
    advance(.035);
    frame(.001, .001);
    const dodgeStarted = p.state === 'dodge';
    advance(.37);
    const blockedDuringIFrames = p.takeDamage(1, { x: 0, y: 0, z: -1 }) === false;
    advance(.04);
    const hitAfterIFrames = p.takeDamage(1, { x: 0, y: 0, z: -1 }) === true;
    report.dodge = { dodgeBufferedEarly, dodgeStarted, blockedDuringIFrames, hitAfterIFrames };

    resetPlayer();
    for (const enemy of g.enemies) {
      enemy.dead = true;
      enemy.state = 'dead';
    }
    const live = g.enemies.slice(0, 2);
    for (let i = 0; i < live.length; i++) {
      const enemy = live[i];
      enemy.dead = false;
      enemy.remove = false;
      enemy.hp = enemy.maxHp;
      enemy.state = 'idle';
      enemy.stateTime = 0;
      enemy.velocity.set(0, 0, 0);
      enemy.position.set(0, 0, i === 0 ? 1.8 : 3.2);
    }
    const hpBefore = live.map(enemy => enemy.hp);
    frame(.001, .001, 'KeyQ');
    for (let i = 0; i < 18; i++) g._updateProjectiles(.025);
    report.pierce = live.map((enemy, index) => hpBefore[index] - enemy.hp);

    const enemy = live[0];
    enemy.dead = false;
    enemy.remove = false;
    enemy.hp = enemy.maxHp;
    enemy.state = 'chase';
    enemy.stateTime = 0;
    enemy.velocity.set(0, 0, 0);
    enemy.position.set(0, 0, 1);
    p.position.set(0, 0, 0);
    let strikes = 0;
    for (let i = 0; i < 40; i++) {
      enemy.update(1 / 60, p);
      if (enemy.attackEvent) strikes++;
    }
    report.enemyStrikeCount = strikes;

    enemy.state = 'chase';
    enemy.stateTime = 0;
    enemy.velocity.set(0, 0, 0);
    enemy.position.set(0, 0, 1);
    enemy.update(1 / 60, p);
    for (let i = 0; i < 8; i++) enemy.update(1 / 60, p);
    enemy.takeHit(1, { x: 0, y: 0, z: 2 }, false);
    let strikeWhileInterrupted = false;
    for (let i = 0; i < 22; i++) {
      enemy.update(1 / 60, p);
      strikeWhileInterrupted ||= enemy.attackEvent;
    }
    let strikeAfterRecovery = false;
    for (let i = 0; i < 80; i++) {
      enemy.update(1 / 60, p);
      if (enemy.attackEvent) { strikeAfterRecovery = true; break; }
    }
    report.enemyStagger = { strikeWhileInterrupted, strikeAfterRecovery };

    return report;
  });

  assert.deepEqual(desktop.attack1, { state: 'attack', combo: 0 });
  assert.equal(desktop.earlyBuffered, true, 'early attack input should be buffered');
  assert.deepEqual(desktop.attack2, { state: 'attack', combo: 1 });
  assert.deepEqual(desktop.attack3, { state: 'attack', combo: 2 });
  assert.equal(desktop.attackToSpell.state, 'cast');
  assert.equal(desktop.attackToSpell.createdSynchronously, true);
  assert.equal(desktop.attackToSpell.enhanced, true, 'Enhancements must decorate the projectile before _castSpell returns');
  assert.ok(desktop.attackToSpell.cooldown > 2.3);
  assert.ok(desktop.attackToSpell.mana <= 74.1);
  assert.equal(desktop.insufficientMana.state, 'idle');
  assert.equal(desktop.insufficientMana.projectileDelta, 0);
  assert.equal(desktop.insufficientMana.buffered, false, 'invalid spell input should expire on real time');
  assert.deepEqual(desktop.dodge, { dodgeBufferedEarly: true, dodgeStarted: true, blockedDuringIFrames: true, hitAfterIFrames: true });
  assert.ok(desktop.pierce[0] > 0 && desktop.pierce[1] > 0, `spell should pierce two targets: ${JSON.stringify(desktop.pierce)}`);
  assert.equal(desktop.enemyStrikeCount, 1);
  assert.equal(desktop.enemyStagger.strikeWhileInterrupted, false);
  assert.equal(desktop.enemyStagger.strikeAfterRecovery, true);
  await context.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  const mp = await mobile.newPage();
  mp.on('pageerror', error => errors.push(`mobile pageerror: ${error.message}`));
  await mp.goto(`${baseUrl}/?quality=low&capture=1`, { waitUntil: 'networkidle' });
  await mp.waitForFunction(() => document.querySelector('#enter-btn')?.dataset.ready === 'true', null, { timeout: 60000 });
  await mp.locator('#enter-btn').click();
  await mp.waitForFunction(() => window.__MAPLES_GAME__?.mobileCameraControls?.enabled === true);
  await mp.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    g._updateEnemies = () => {};
    g._updateEncounter = () => {};
    g.player.state = 'idle';
    g.player.stateTime = 0;
    g.player.dead = false;
    g.attackCooldown = 0;
    g.comboDeadline = 0;
    g.actionController.clearBufferedInput();
  });
  const attack = mp.locator('.mobile-actions button[data-action="attack"]');
  const box = await attack.boundingBox();
  assert.ok(box, 'mobile attack button must be measurable');
  const serialBefore = await mp.evaluate(() => window.__MAPLES_GAME__.rowanAnimationDirector?.attackSerial || 0);
  const yawBefore = await mp.evaluate(() => window.__MAPLES_GAME__.cameraYaw);
  await mp.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await mp.mouse.down();
  await mp.waitForTimeout(360);
  await mp.mouse.move(box.x + box.width / 2 + 34, box.y + box.height / 2 - 18, { steps: 4 });
  await mp.waitForTimeout(900);
  await mp.mouse.up();
  const mobileReport = await mp.evaluate(() => ({
    serial: window.__MAPLES_GAME__.rowanAnimationDirector?.attackSerial || 0,
    yaw: window.__MAPLES_GAME__.cameraYaw,
  }));
  assert.ok(mobileReport.serial - serialBefore >= 2, `held mobile attack should synthesize repeated combo inputs; got ${mobileReport.serial - serialBefore}`);
  assert.ok(Math.abs(mobileReport.yaw - yawBefore) > .005, 'dragging the held attack button should still steer the camera');
  await mobile.close();
} finally {
  await browser.close();
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('ACTION RUNTIME E2E PASS');

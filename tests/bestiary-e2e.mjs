import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const base = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const out = path.resolve('artifacts');
fs.mkdirSync(out, { recursive: true });
const errors = [];
const notes = {};

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', error => {
  const line = `pageerror: ${error.message}`;
  errors.push(line);
  console.error(line);
});
page.on('console', msg => {
  if (msg.type() === 'error' && !msg.text().includes('favicon')) {
    const line = `console: ${msg.text()}`;
    errors.push(line);
    console.error(line);
  }
});

await page.goto(`${base}/?quality=high&capture=1`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => {
  const g = window.__MAPLES_GAME__;
  return g?.assetVisualManager?.ready && g.assetVisualManager?.heroReady &&
    g.enemies.filter(e => e.assetKind).length >= 5 &&
    document.querySelector('#enter-btn')?.dataset.ready === 'true';
}, null, { timeout: 60000 });

notes.roles = await page.evaluate(() => window.__MAPLES_GAME__.enemies.map(enemy => ({
  role: enemy.bestiaryRole,
  asset: enemy.assetKind,
  hp: enemy.maxHp,
  range: Number(enemy.attackRange.toFixed(2)),
})));

await page.locator('#enter-btn').click();
await page.waitForFunction(() => window.__MAPLES_GAME__.started);

notes.guard = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  const skeleton = g.enemies.find(enemy => enemy.assetKind === 'skeleton' && !enemy.dead);
  skeleton.state = 'chase';
  skeleton.facing = 0;
  skeleton.position.set(0, 0, 0);
  const frontFrom = skeleton.position.clone().set(0, 0, 2);
  const before = skeleton.hp;
  skeleton.takeHit(19, frontFrom, false);
  const frontLoss = before - skeleton.hp;
  skeleton.hp = skeleton.maxHp;
  skeleton.state = 'chase';
  skeleton.dead = false;
  const backFrom = skeleton.position.clone().set(0, 0, -2);
  skeleton.takeHit(19, backFrom, false);
  return { frontLoss, backLoss: skeleton.maxHp - skeleton.hp, maxHp: skeleton.maxHp };
});

await page.evaluate(() => window.__MAPLES_GAME__.player.addXp(100));
await page.waitForFunction(() => !document.querySelector('#oath').classList.contains('hidden'));
await page.screenshot({ path: path.join(out, 'oath-choice.png') });
notes.oathVisible = await page.evaluate(() => {
  const oath = document.querySelector('#oath').getBoundingClientRect();
  return { width: oath.width, height: oath.height, text: document.querySelector('#oath h2').textContent };
});
await page.locator('[data-oath="steel"]').click();
await page.waitForFunction(() => document.querySelector('#oath').classList.contains('hidden'));

await page.evaluate(() => window.__MAPLES_GAME__.player.addXp(200));
await page.waitForFunction(() => !document.querySelector('#oath').classList.contains('hidden'));
await page.locator('[data-oath="ember"]').click();
await page.waitForFunction(() => document.querySelector('#oath').classList.contains('hidden'));

await page.evaluate(() => window.__MAPLES_GAME__.player.addXp(200));
await page.waitForFunction(() => !document.querySelector('#oath').classList.contains('hidden'));
await page.locator('[data-oath="warden"]').click();
await page.waitForFunction(() => document.querySelector('#oath').classList.contains('hidden'));

notes.growth = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  const player = g.player;
  player.state = 'idle';
  player.dead = false;
  player.mana = 22;
  g.spellCooldown = 0;
  g.input.pressed.add('KeyQ');
  const before = g.projectiles.length;
  g._handleInput(player.position.clone().set(0, 0, 1));
  const cast = g.projectiles.length > before;
  player.state = 'idle';
  player.invuln = 0;
  g.dodgeCooldown = 0;
  g.input.pressed.add('Space');
  g._handleInput(player.position.clone().set(0, 0, 1));
  return {
    meleePower: player.meleePower,
    spellPower: player.spellPower,
    spellDiscount: player.spellDiscount,
    castFromDiscountedMana: cast,
    manaAfterCast: player.mana,
    dodgeCooldown: g.dodgeCooldown,
    invuln: player.invuln,
    levelText: g.ui.level.textContent,
  };
});

await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  g.player.oathPending = 0;
  g.player.xp = 0;
  g.player.xpToLevel = 99999;
  g.oathOpen = false;
  g.ui.oath?.classList.add('hidden');
  g.kills = g.objectiveKills;
  g.bossPending = true;
  g.bossTimer = 0.01;
});
await page.waitForFunction(() => window.__MAPLES_GAME__.boss, null, { timeout: 10000 });
await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  const boss = g.boss;
  boss.state = 'chase';
  boss.stateTime = 0;
  boss.bossPhase = 1;
  boss.hp = boss.maxHp * 0.5;
  boss._ruptureCd = 0;
  boss.position.set(0, 0, -10);
  g.player.setPosition(0, 0, -4);
  g.player.dead = false;
  g.player.invuln = 30;
});
notes.bossSamples = await page.evaluate(async () => {
  const g = window.__MAPLES_GAME__;
  const boss = g.boss;
  const samples = [];
  const start = g.gameTime;
  for (let i = 0; i < 90 && !(boss.bossPhase === 2 && (boss.state === 'windup' || boss._pendingRupture || boss._ruptureActive)); i++) {
    await new Promise(resolve => requestAnimationFrame(resolve));
    samples.push({
      phase: boss.bossPhase,
      state: boss.state,
      cd: Number((boss._ruptureCd || 0).toFixed(2)),
      time: Number((g.gameTime - start).toFixed(2)),
      oath: Boolean(g.oathOpen),
      dead: boss.dead,
    });
  }
  return samples.slice(-8);
});
notes.bossAfter = await page.evaluate(() => {
  const g = window.__MAPLES_GAME__;
  return {
    phase: g.boss.bossPhase,
    state: g.boss.state,
    kicker: document.querySelector('.boss-kicker').textContent,
    rupture: Boolean(g.boss._pendingRupture || g.boss._ruptureActive || g.shockwaves.length),
  };
});

const kinds = notes.roles.map(entry => entry.asset);
if (kinds.join(',') !== 'skeleton,ghost,bat,skeleton,ghost') errors.push(`role order ${kinds.join(',')}`);
for (const entry of notes.roles) {
  if (entry.role !== entry.asset) errors.push(`role ${entry.role} diverged from asset ${entry.asset}`);
}
const byKind = Object.fromEntries(notes.roles.map(entry => [entry.asset, entry]));
if (!(byKind.skeleton.hp > byKind.ghost.hp && byKind.ghost.range > byKind.bat.range && byKind.bat.range > byKind.skeleton.range)) {
  errors.push(`role stats did not diverge ${JSON.stringify(notes.roles)}`);
}
if (notes.guard.frontLoss >= notes.guard.backLoss) errors.push(`guard failed ${JSON.stringify(notes.guard)}`);
if (notes.guard.frontLoss !== 8 || notes.guard.backLoss !== 19) errors.push(`unexpected guard amounts ${JSON.stringify(notes.guard)}`);
if (notes.oathVisible.width < 280 || notes.oathVisible.height < 160) errors.push(`oath panel too small ${JSON.stringify(notes.oathVisible)}`);
if (Math.abs(notes.growth.meleePower - 1.18) > 1e-9) errors.push(`steel oath missing ${notes.growth.meleePower}`);
if (Math.abs(notes.growth.spellPower - 1.22) > 1e-9) errors.push(`ember power missing ${notes.growth.spellPower}`);
if (notes.growth.spellDiscount !== 4 || !notes.growth.castFromDiscountedMana) errors.push(`ember discount failed ${JSON.stringify(notes.growth)}`);
if (!(notes.growth.dodgeCooldown < 0.9 && notes.growth.dodgeCooldown > 0.7)) errors.push(`warden cooldown ${notes.growth.dodgeCooldown}`);
if (notes.growth.invuln < 0.47) errors.push(`warden invuln ${notes.growth.invuln}`);
if (!notes.growth.levelText.includes('Warden')) errors.push(`level readout ${notes.growth.levelText}`);
if (notes.bossAfter.phase !== 2 || notes.bossAfter.kicker !== 'ROOTS RUPTURE' || !notes.bossAfter.rupture) {
  errors.push(`boss phase failed ${JSON.stringify(notes.bossAfter)}`);
}

fs.writeFileSync(path.join(out, 'bestiary-report.json'), JSON.stringify({ errors, notes }, null, 2));
await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('bestiary-e2e: PASS');
console.log(JSON.stringify(notes, null, 2));

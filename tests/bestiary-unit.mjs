import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  applyOath,
  bossPhaseForRatio,
  bossSpecial,
  facingDot,
  guardMultiplier,
  levelReadout,
  liveRole,
  resolveIncomingDamage,
  roleForSerial,
  spellCost,
} from '../src/game/BestiaryMath.js';

assert.deepEqual(
  [0, 1, 2, 3, 4, -1].map(roleForSerial),
  ['skeleton', 'ghost', 'bat', 'skeleton', 'ghost', 'bat'],
);

assert.ok(facingDot(0, 0, 0, 0, 1) > 0.99, 'attacker on the forward axis is in front');
assert.ok(facingDot(0, 0, 0, 0, -1) < -0.99, 'attacker behind the forward axis is a backstab');
assert.equal(guardMultiplier(19, false, 0.8), 0.42);
assert.equal(guardMultiplier(19, false, 0.22), 1, 'the guard cone is exclusive of the boundary');
assert.equal(guardMultiplier(19, true, 0.8), 1);
assert.equal(guardMultiplier(34, false, 0.8), 1);
assert.equal(guardMultiplier(19, false, 0), 1);

const guarded = resolveIncomingDamage({
  role: 'skeleton', state: 'chase', facing: 0, fromX: 0, fromZ: 1, damage: 19, context: 'melee',
});
assert.deepEqual(guarded, { amount: 8, guarded: true });

const backstab = resolveIncomingDamage({
  role: 'skeleton', state: 'chase', facing: 0, fromX: 0, fromZ: -1, damage: 19, context: 'melee',
});
assert.deepEqual(backstab, { amount: 19, guarded: false });

const finisher = resolveIncomingDamage({
  role: 'skeleton', facing: 0, fromX: 0, fromZ: 1, damage: 36, context: 'melee',
});
assert.equal(finisher.amount, 36);
assert.equal(finisher.guarded, false);

const boostedChip = resolveIncomingDamage({
  role: 'skeleton', facing: 0, fromX: 0, fromZ: 1, damage: 23, context: 'melee', meleePower: 1.18,
});
assert.equal(boostedChip.amount, 11);
assert.equal(boostedChip.guarded, true);

const empoweredSpell = resolveIncomingDamage({
  role: 'skeleton', facing: 0, fromX: 0, fromZ: 1, damage: 42, context: 'spell', spellPower: 1.22,
});
assert.equal(empoweredSpell.amount, 51);
assert.equal(empoweredSpell.guarded, false);

const exposedBat = resolveIncomingDamage({ role: 'bat', state: 'recover', damage: 20, context: 'melee' });
assert.equal(exposedBat.amount, 26);
const divingBat = resolveIncomingDamage({ role: 'bat', state: 'attack', damage: 20, context: 'melee' });
assert.equal(divingBat.amount, 20);

assert.equal(bossPhaseForRatio(1), 1);
assert.equal(bossPhaseForRatio(0.67), 1);
assert.equal(bossPhaseForRatio(0.66), 2);
assert.equal(bossPhaseForRatio(0.34), 2);
assert.equal(bossPhaseForRatio(0.33), 3);
assert.equal(bossPhaseForRatio(0), 3);

assert.equal(bossSpecial(1, 'chase', 0, 0, 6), null);
assert.equal(bossSpecial(2, 'attack', 0, 0, 6), null);
assert.equal(bossSpecial(2, 'chase', 0, 0, 6), 'rupture');
assert.equal(bossSpecial(2, 'chase', 1, 0, 6), null);
assert.equal(bossSpecial(2, 'chase', 0, 0, 2), null);
assert.equal(bossSpecial(3, 'chase', 0, 0, 8), 'charge');
assert.equal(bossSpecial(3, 'chase', 0, 2, 8), 'rupture');
assert.equal(bossSpecial(3, 'chase', 1, 2, 8), null);

assert.equal(spellCost(0), 26);
assert.equal(spellCost(4), 22);
assert.equal(spellCost(40), 14);

const player = {};
assert.equal(applyOath(player, 'nope'), null);
applyOath(player, 'steel');
applyOath(player, 'steel');
assert.ok(Math.abs(player.meleePower - 1.36) < 1e-9);
applyOath(player, 'ember');
applyOath(player, 'ember');
assert.equal(player.spellDiscount, 8);
assert.ok(Math.abs(player.spellPower - 1.44) < 1e-9);
applyOath(player, 'warden');
applyOath(player, 'warden');
assert.ok(Math.abs(player.dodgeHaste - 0.82 * 0.82) < 1e-9);
assert.equal(player.dodgeInvulnBonus, 0.16);
assert.deepEqual(player.oaths, ['steel', 'steel', 'ember', 'ember', 'warden', 'warden']);
assert.equal(levelReadout(8, []), 'Lv. 8');
assert.equal(levelReadout(8, ['steel']), 'Lv. 8 · Steel');
assert.equal(levelReadout(9, ['steel', 'ember']), 'Lv. 9 · Ember');

assert.equal(liveRole({ isBoss: true, assetKind: 'skeleton' }), 'thornmaw');
assert.equal(liveRole({ assetKind: 'ghost', bestiaryRole: 'bat' }), 'ghost');
assert.equal(liveRole({ bestiaryRole: 'bat' }), 'bat');
assert.equal(liveRole({}), 'skeleton');

const main = fs.readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
const bestiary = fs.readFileSync(new URL('../src/game/Bestiary.js', import.meta.url), 'utf8');

assert.match(main, /installBestiary\(game\)/);
assert.match(html, /id=["']oath["']/);
for (const oath of ['steel', 'ember', 'warden']) {
  assert.match(html, new RegExp(`data-oath=["']${oath}["']`));
}
assert.match(css, /\.oath button[\s\S]*min-height:\s*52px/);
assert.doesNotMatch(css, /backdrop-filter|\.glass\b/i);
assert.match(bestiary, /const result = enemyUpdate\.call\(this, dt, player\)/);
assert.match(bestiary, /hitContext = 'melee'/);
assert.match(bestiary, /hitContext = 'spell'/);
assert.match(bestiary, /attackEvent = false/);

console.log('bestiary-unit: PASS');

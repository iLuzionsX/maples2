import assert from 'node:assert/strict';
import fs from 'node:fs';

const character = fs.readFileSync(new URL('../src/game/Character.js', import.meta.url), 'utf8');
const game = fs.readFileSync(new URL('../src/game/Game.js', import.meta.url), 'utf8');
const enemy = fs.readFileSync(new URL('../src/game/Enemy.js', import.meta.url), 'utf8');
const enhancements = fs.readFileSync(new URL('../src/game/Enhancements.js', import.meta.url), 'utf8');

assert.match(character, /requestAttack\(\)/, 'Character should own attack requests/buffering');
assert.match(character, /this\.attackBuffer=\.18/, 'attack input buffer should be ~180ms');
assert.match(character, /this\.comboTimer=Math\.max\(0,this\.comboTimer-realDt\)/, 'combo timing should use real time through hit-stop');
assert.match(character, /get attackPhase\(\)/, 'Character should expose authoritative attack phase');
assert.match(character, /this\.facing=this\.attackFacing/, 'committed swings should lock facing');
assert.match(character, /if\(this\.attackProgress<spec\.recoveryStart\)return false/, 'dodge cancel should only open in late recovery');

for (const legacy of ['attackCooldown', 'comboDeadline', 'attackQueued', 'comboStep']) {
  assert.ok(!game.includes(`this.${legacy}`), `Game should not own legacy ${legacy} action timing`);
}
assert.match(game, /player\.update\(dt, move, this\.cameraYaw, realDt\)/, 'Game should pass real time into Character');
assert.match(game, /e\.attackRange\+\(e\.isBoss\?\.55:\.3\)/, 'enemy damage reach should derive from declared attack range');

assert.match(enemy, /attackEventFired=false/, 'enemy attacks should track one-shot active events');
assert.match(enemy, /p>=impact/, 'enemy damage event should occur during active attack progress');
assert.ok(!/state='attack';[^\n]*attackEvent=true/.test(enemy), 'windup transition must not deal damage immediately');
assert.match(enemy, /\['windup','attack','stagger'\]/, 'enemy facing should stay committed through windup and attack');

assert.match(enhancements, /Character\.prototype\.update = function \(dt, move, cameraYaw, realDt = dt\)/, 'enhancement wrapper must preserve realDt');
assert.match(enhancements, /characterUpdate\.call\(this, dt, move, cameraYaw, realDt\)/, 'enhancement wrapper must forward realDt');

console.log('combat-architecture-unit: PASS');

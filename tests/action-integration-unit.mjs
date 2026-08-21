import assert from 'node:assert/strict';
import * as THREE from 'three';
import { Game } from '../src/game/Game.js';
import { Character } from '../src/game/Character.js';
import { Enemy } from '../src/game/Enemy.js';
import { installUnifiedActionArchitecture } from '../src/game/UnifiedActionArchitecture.js';

function makeFx() {
  return {
    ring() {}, dashTrail() {}, burst() {}, slash() {}, projectileTrail() {}, add() {}, levelUp() {},
  };
}

function makeAudio() {
  return {
    swing() {}, dash() {}, hurt() {}, spell() {}, hit() {}, pickup() {}, level() {}, noise() {},
  };
}

function makeGame() {
  const scene = new THREE.Scene();
  const fx = makeFx();
  const audio = makeAudio();
  const player = new Character(scene, fx, audio);
  const pressed = new Set();
  const game = {
    scene,
    fx,
    audio,
    player,
    enemies: [],
    projectiles: [],
    gameTime: 0,
    cameraKick: 0,
    attackCooldown: 0,
    spellCooldown: 0,
    dodgeCooldown: 0,
    comboStep: 0,
    comboDeadline: 0,
    attackQueued: false,
    _faceNearestTarget() {},
    _castSpell: Game.prototype._castSpell,
    input: {
      consume(action) {
        if (!pressed.has(action)) return false;
        pressed.delete(action);
        return true;
      },
    },
  };
  installUnifiedActionArchitecture(game);
  return {
    game,
    player,
    press(action) { pressed.add(action); },
    advanceReal(dt) {
      game.gameTime += dt;
      game.attackCooldown = Math.max(0, game.attackCooldown - dt);
      game.spellCooldown = Math.max(0, game.spellCooldown - dt);
      game.dodgeCooldown = Math.max(0, game.dodgeCooldown - dt);
      game.comboDeadline -= dt;
    },
  };
}

{
  const { game, player } = makeGame();
  assert.equal(game._startAttack(), true);
  assert.equal(player.state, 'attack');
  assert.equal(player.comboIndex, 0);
  assert.equal(game.attackCooldown, 0.22);
  assert.equal(game.comboDeadline, 0.72);

  player.update(0.13, { x: 0, y: 0 }, 0);
  assert.equal(player.attackWindow(), true, 'compat attackWindow consumes the controller strike event');
  assert.equal(player.attackWindow(), false, 'strike is one-shot');
}

{
  const { game, player, press, advanceReal } = makeGame();
  game._startAttack();
  player.update(0.25, { x: 0, y: 0 }, 0);
  advanceReal(0.25);
  press('attack');
  game._handleInput(new THREE.Vector3());
  assert.equal(player.comboIndex, 0, 'early input buffers instead of cancelling the swing');

  player.update(0.10, { x: 0, y: 0 }, 0);
  advanceReal(0.10);
  game._handleInput(new THREE.Vector3());
  player.update(0.04, { x: 0, y: 0 }, 0);
  assert.equal(player.state, 'idle');
  advanceReal(0.04);
  game._handleInput(new THREE.Vector3());
  assert.equal(player.state, 'attack');
  assert.equal(player.comboIndex, 1, 'buffered attack commits only after the prior swing completes');
}

{
  const { game, player, press, advanceReal } = makeGame();
  game._startAttack();
  player.update(0.05, { x: 0, y: 0 }, 0);
  advanceReal(0.05);
  press('attack');
  game._handleInput(new THREE.Vector3());
  advanceReal(0.17);
  game._handleInput(new THREE.Vector3());
  assert.equal(game.attackQueued, false, 'buffer expires on the real clock');
  assert.equal(player.comboIndex, 0);
}

{
  const { game, player } = makeGame();
  game._startAttack();
  player.update(0.17, { x: 0, y: 0 }, 0);
  assert.equal(player.beginDodge(new THREE.Vector3(1, 0, 0)), false, 'attack→dodge is locked before 180ms');
  player.update(0.02, { x: 0, y: 0 }, 0);
  assert.equal(player.beginDodge(new THREE.Vector3(1, 0, 0)), true, 'attack→dodge opens after 180ms');
  assert.equal(player.state, 'dodge');
  player.update(0.39, { x: 0, y: 0 }, 0);
  assert.ok(player.invuln > 0);
  player.update(0.02, { x: 0, y: 0 }, 0);
  assert.equal(player.invuln, 0);
}

{
  const { game, player } = makeGame();
  game._startAttack();
  player.update(0.05, { x: 0, y: 0 }, 0);
  const beforeMana = player.mana;
  const beforeProjectiles = game.projectiles.length;
  assert.equal(game._castSpell(), true, 'cast can cancel an active sword swing');
  assert.equal(player.state, 'cast');
  assert.equal(player.mana, beforeMana - 26);
  assert.equal(game.projectiles.length, beforeProjectiles + 1, 'core projectile exists synchronously on return');
  assert.equal(game.spellCooldown, 2.35);
  const projectile = game.projectiles.at(-1);
  assert.equal(projectile.pierce, 2);
  assert.equal(projectile.life, 1.45);
  assert.ok(Math.abs(projectile.velocity.length() - 13.5) < 1e-9);
  projectile.mesh.removeFromParent();
  projectile.mesh.geometry.dispose();
  projectile.mesh.material.dispose();
}

{
  const { game, player } = makeGame();
  player.mana = 25;
  assert.equal(game._castSpell(), false);
  assert.equal(game.projectiles.length, 0);
  player.mana = 100;
  assert.equal(player.beginCast(), true);
  game.spellCooldown = 0;
  assert.equal(player.beginAttack(0), true, 'cast→attack preserves legacy cancel behavior');
}

{
  const { game, player, press } = makeGame();
  player.hp = 100;
  game._startAttack();
  press('attack');
  game._handleInput(new THREE.Vector3());
  assert.equal(game.attackQueued, true);
  assert.equal(player.takeDamage(5, new THREE.Vector3(0, 0, -1)), true);
  assert.equal(player.state, 'hurt');
  assert.equal(game.attackQueued, false, 'hurt interruption clears buffered combat input');
  assert.equal(player.beginAttack(0), false, 'hurt is a real action lock');
  player.update(0.29, { x: 0, y: 0 }, 0);
  assert.equal(player.state, 'idle');

  player.invuln = 0;
  player.hp = 1;
  assert.equal(player.takeDamage(2, new THREE.Vector3(0, 0, -1)), true);
  assert.equal(player.dead, true);
  assert.equal(player.state, 'dead');
  assert.equal(player.beginAttack(0), false);
  assert.equal(player.beginCast(), false);
}

{
  const scene = new THREE.Scene();
  const fx = makeFx();
  const audio = makeAudio();
  const target = { position: new THREE.Vector3(0, 0, 0) };
  const enemy = new Enemy(scene, fx, audio, new THREE.Vector3(0, 0, 1), 'briarling');
  enemy.state = 'chase';
  enemy.stateTime = 0;
  enemy.velocity.set(0, 0, 0);

  enemy.update(1 / 60, target);
  assert.equal(enemy.state, 'windup');
  assert.ok(enemy.actionController?.isActive, 'enemy windup attaches the shared action timeline');
  let strikes = 0;
  for (let i = 0; i < 40; i++) {
    enemy.update(1 / 60, target);
    if (enemy.attackEvent) strikes++;
  }
  assert.equal(strikes, 1, 'enemy strike event is emitted exactly once by the timeline');
}

{
  const scene = new THREE.Scene();
  const fx = makeFx();
  const audio = makeAudio();
  const target = { position: new THREE.Vector3(0, 0, 0) };
  const enemy = new Enemy(scene, fx, audio, new THREE.Vector3(0, 0, 1), 'briarling');
  enemy.state = 'chase';
  enemy.stateTime = 0;
  enemy.velocity.set(0, 0, 0);
  enemy.update(1 / 60, target);
  for (let i = 0; i < 10; i++) enemy.update(1 / 60, target);
  assert.equal(enemy.state, 'windup');
  enemy.takeHit(1, new THREE.Vector3(0, 0, 2), false);
  assert.equal(enemy.state, 'stagger');
  assert.equal(enemy.actionController.isActive, false, 'stagger cancels the pending strike timeline');

  let strayStrikes = 0;
  for (let i = 0; i < 20; i++) {
    enemy.update(1 / 60, target);
    if (enemy.attackEvent) strayStrikes++;
  }
  assert.equal(strayStrikes, 0);

  let attackedAgain = false;
  for (let i = 0; i < 80; i++) {
    enemy.update(1 / 60, target);
    if (enemy.attackEvent) { attackedAgain = true; break; }
  }
  assert.equal(attackedAgain, true, 'enemy can enter a fresh timeline and attack after stagger recovery');
}

console.log('ACTION INTEGRATION UNIT PASS');

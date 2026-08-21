import * as THREE from 'three';
import { Character } from './Character.js';
import { Enemy } from './Enemy.js';
import { ActionController } from './ActionController.js';
import { ENEMY_ACTIONS, PLAYER_ACTIONS, PLAYER_INPUT_TTLS, resolvePlayerInput } from './ActionDefinitions.js';

const V = THREE.Vector3;
const damp = THREE.MathUtils.damp;
const PLAYER_ACTION_IDS = Object.freeze({ dodge: 'dodge', cast: 'cast', hurt: 'hurt', dead: 'dead' });

let characterPrototypesPatched = false;
let enemyPrototypesPatched = false;
let legacyCharacter = null;
let legacyEnemy = null;

function normalizeCombo(value) {
  const numeric = Number.isFinite(value) ? Math.trunc(value) : 0;
  return ((numeric % 3) + 3) % 3;
}

function defineCompat(object, name, get, set) {
  delete object[name];
  Object.defineProperty(object, name, {
    configurable: true,
    enumerable: true,
    get,
    set,
  });
}

function setPlayerStateFromCompatibility(player, nextState) {
  const controller = player.actionController;
  if (!controller) return;
  if (nextState === 'idle' || nextState == null) {
    controller.stop();
    controller.clearBufferedInput();
    return;
  }
  let actionId = null;
  if (nextState === 'attack') actionId = `attack${normalizeCombo(controller.comboIndex) + 1}`;
  else actionId = PLAYER_ACTION_IDS[nextState] || null;
  if (actionId) controller.start(actionId, { force: true, skipCooldown: true });
}

function patchCharacterPrototypes() {
  if (characterPrototypesPatched) return;
  characterPrototypesPatched = true;
  legacyCharacter = {
    beginAttack: Character.prototype.beginAttack,
    beginDodge: Character.prototype.beginDodge,
    beginCast: Character.prototype.beginCast,
    takeDamage: Character.prototype.takeDamage,
    attackWindow: Character.prototype.attackWindow,
    update: Character.prototype.update,
  };

  Character.prototype.beginAttack = function (combo = null) {
    const controller = this.actionController;
    if (!controller) return legacyCharacter.beginAttack.call(this, combo);
    if (this.dead) return false;
    const index = Number.isFinite(combo) ? normalizeCombo(combo) : controller.nextComboIndex();
    if (!controller.start(`attack${index + 1}`)) return false;
    this.audio?.swing?.(index);
    return true;
  };

  Character.prototype.beginDodge = function (moveDir) {
    const controller = this.actionController;
    if (!controller) return legacyCharacter.beginDodge.call(this, moveDir);
    if (this.dead || !controller.start('dodge')) return false;

    this.dodgeDir.copy(moveDir || { x: 0, y: 0, z: 0 });
    if (this.dodgeDir.lengthSq() < .01) this.dodgeDir.set(Math.sin(this.facing), 0, Math.cos(this.facing));
    this.dodgeDir.normalize();
    this.audio?.dash?.();
    this.fx?.ring?.(this.position, 0x8ddded, .18, 1.1, .25);
    return true;
  };

  Character.prototype.beginCast = function () {
    const controller = this.actionController;
    if (!controller) return legacyCharacter.beginCast?.call(this) ?? false;
    if (this._actionCastReentry && controller.state === 'cast') return true;
    if (this.dead || !controller.start('cast')) return false;
    this.velocity.multiplyScalar(.55);
    return true;
  };

  Character.prototype.takeDamage = function (amount, from) {
    const controller = this.actionController;
    if (!controller) return legacyCharacter.takeDamage.call(this, amount, from);
    if (controller.isInvulnerable || this.dead) return false;

    this.hp = Math.max(0, this.hp - amount);
    controller.setInvulnerability(.52);
    this.hitFlash = .18;
    this.audio?.hurt?.();
    if (from) {
      const away = this._actionScratch?.away || new V();
      away.copy(this.position).sub(from);
      away.y = 0;
      if (away.lengthSq() > .01) this.velocity.add(away.normalize().multiplyScalar(3.2));
    }

    controller.clearBufferedInput();
    if (this.hp <= 0) {
      this.dead = true;
      controller.start('dead', { force: true, skipCooldown: true });
    } else {
      controller.start('hurt', { force: true, skipCooldown: true });
    }
    return true;
  };

  Character.prototype.attackWindow = function () {
    const controller = this.actionController;
    if (!controller) return legacyCharacter.attackWindow.call(this);
    return Boolean(controller.consumeEvent('strike'));
  };

  Character.prototype.update = function (dt, move, cameraYaw) {
    const controller = this.actionController;
    if (!controller) return legacyCharacter.update.call(this, dt, move, cameraYaw);

    controller.advanceWorld(dt, { deferCompletion: true });
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    this.mana = Math.min(this.maxMana, this.mana + dt * 8);

    const scratch = this._actionScratch;
    const forward = scratch.forward.set(Math.sin(cameraYaw), 0, Math.cos(cameraYaw));
    const right = scratch.right.set(Math.cos(cameraYaw), 0, -Math.sin(cameraYaw));
    const desired = scratch.desired.copy(forward).multiplyScalar(move.y).addScaledVector(right, move.x);
    if (desired.lengthSq() > 1) desired.normalize();

    const movementScale = controller.movementScale;
    const turnScale = controller.turnScale;
    if (controller.state === 'dodge') {
      const t = controller.duration > 0 ? Math.min(1, controller.time / controller.duration) : 1;
      const speed = THREE.MathUtils.lerp(12.5, 4.8, t);
      this.velocity.x = this.dodgeDir.x * speed;
      this.velocity.z = this.dodgeDir.z * speed;
      if (Math.floor(controller.time * 35) !== Math.floor((controller.time - dt) * 35)) this.fx?.dashTrail?.(this.position);
      this.facing = Math.atan2(this.dodgeDir.x, this.dodgeDir.z);
    } else {
      const moving = desired.lengthSq() > .01;
      const targetSpeed = moving ? 5.25 * movementScale : 0;
      if (moving) desired.normalize();
      this.velocity.x = damp(this.velocity.x, moving ? desired.x * targetSpeed : 0, moving ? 16 : 11, dt);
      this.velocity.z = damp(this.velocity.z, moving ? desired.z * targetSpeed : 0, moving ? 16 : 11, dt);
      if (moving && turnScale > 0) {
        const targetFacing = Math.atan2(desired.x, desired.z);
        const delta = Math.atan2(Math.sin(targetFacing - this.facing), Math.cos(targetFacing - this.facing));
        this.facing += delta * (1 - Math.exp(-dt * 14 * turnScale));
      }
    }

    this.root.position.addScaledVector(this.velocity, dt);
    this.root.rotation.y = this.facing;
    this.speed = Math.hypot(this.velocity.x, this.velocity.z);

    controller.finalizeWorldStep();
    this._animate(dt);
  };
}

function ensureEnemyController(enemy) {
  if (enemy.actionController) return enemy.actionController;
  enemy.actionController = new ActionController({ actions: ENEMY_ACTIONS, context: enemy });
  return enemy.actionController;
}

function enemyActionId(enemy) {
  return enemy.isBoss ? 'bossStrike' : 'briarStrike';
}

function patchEnemyPrototypes() {
  if (enemyPrototypesPatched) return;
  enemyPrototypesPatched = true;
  legacyEnemy = {
    update: Enemy.prototype.update,
    takeHit: Enemy.prototype.takeHit,
  };

  Enemy.prototype.takeHit = function (...args) {
    const result = legacyEnemy.takeHit.apply(this, args);
    if (result && (this.dead || this.state === 'stagger')) this.actionController?.stop();
    return result;
  };

  Enemy.prototype.update = function (dt, player) {
    const controller = ensureEnemyController(this);
    const wasStrikePhase = this.state === 'windup' || this.state === 'attack';
    if (this.state === 'windup' && !controller.isActive) controller.start(enemyActionId(this), { force: true, skipCooldown: true });
    if (wasStrikePhase && controller.isActive) controller.advanceWorld(dt, { deferCompletion: true });

    const result = legacyEnemy.update.call(this, dt, player);
    const legacyStrike = Boolean(this.attackEvent);
    this.attackEvent = false;

    if (this.state === 'windup' && !controller.isActive) controller.start(enemyActionId(this), { force: true, skipCooldown: true });
    if (this.dead || this.state === 'stagger') controller.stop();

    if (legacyStrike) this.attackEvent = Boolean(controller.consumeEvent('strike'));
    if (controller.isActive && !['windup', 'attack'].includes(this.state)) controller.stop();
    controller.finalizeWorldStep();
    return result;
  };
}

function attachPlayerController(game) {
  const player = game.player;
  const initial = {
    state: player.state,
    stateTime: player.stateTime,
    stateDuration: player.stateDuration,
    comboIndex: player.comboIndex,
    attackEventFired: player.attackEventFired,
    invuln: player.invuln,
    attackCooldown: game.attackCooldown,
    spellCooldown: game.spellCooldown,
    dodgeCooldown: game.dodgeCooldown,
    comboStep: game.comboStep,
    comboDeadline: game.comboDeadline,
    attackQueued: game.attackQueued,
  };

  const controller = new ActionController({ actions: PLAYER_ACTIONS, inputResolver: resolvePlayerInput, context: player });
  controller.comboIndex = normalizeCombo(initial.comboIndex ?? initial.comboStep);
  controller.setComboDeadline(initial.comboDeadline);
  controller.setCooldown('attack', initial.attackCooldown);
  controller.setCooldown('spell', initial.spellCooldown);
  controller.setCooldown('dodge', initial.dodgeCooldown);
  controller.setInvulnerability(initial.invuln);

  player.actionController = controller;
  player.actionDefinitions = PLAYER_ACTIONS;
  player._actionScratch = {
    forward: new V(),
    right: new V(),
    desired: new V(),
    away: new V(),
  };

  defineCompat(player, 'state', () => controller.state, value => setPlayerStateFromCompatibility(player, value));
  defineCompat(player, 'stateTime', () => controller.time, value => controller.setTime(value));
  defineCompat(player, 'stateDuration', () => controller.duration, value => controller.setDuration(value));
  defineCompat(player, 'comboIndex', () => controller.comboIndex, value => { controller.comboIndex = normalizeCombo(value); });
  defineCompat(player, 'attackEventFired', () => controller.hasEventFired('strike'), value => controller.setEventFired('strike', Boolean(value)));
  defineCompat(player, 'comboDeadline', () => controller.comboDeadline, value => controller.setComboDeadline(value));
  defineCompat(player, 'invuln', () => controller.invulnerabilityRemaining, value => controller.setInvulnerability(value));

  if (initial.state && initial.state !== 'idle') {
    controller.comboIndex = normalizeCombo(initial.comboIndex);
    setPlayerStateFromCompatibility(player, initial.state);
    controller.setTime(initial.stateTime);
    controller.setDuration(initial.stateDuration);
    controller.setEventFired('strike', Boolean(initial.attackEventFired));
  } else {
    controller.idleTime = Math.max(0, initial.stateTime || 0);
    controller.lastDuration = Math.max(0, initial.stateDuration || 0);
  }

  defineCompat(game, 'attackCooldown', () => controller.cooldown('attack'), value => controller.setCooldown('attack', value));
  defineCompat(game, 'spellCooldown', () => controller.cooldown('spell'), value => controller.setCooldown('spell', value));
  defineCompat(game, 'dodgeCooldown', () => controller.cooldown('dodge'), value => controller.setCooldown('dodge', value));
  defineCompat(game, 'comboDeadline', () => controller.comboDeadline, value => controller.setComboDeadline(value));
  defineCompat(game, 'comboStep', () => controller.comboIndex, value => { controller.comboIndex = normalizeCombo(value); });
  defineCompat(game, 'attackQueued', () => controller.hasBufferedInput('attack'), value => {
    if (value) controller.bufferInput('attack', null, PLAYER_INPUT_TTLS.attack);
    else controller.clearBufferedInput('attack');
  });

  if (initial.attackQueued) controller.bufferInput('attack', null, PLAYER_INPUT_TTLS.attack);
  game.actionController = controller;
  game.actionDefinitions = PLAYER_ACTIONS;
  return controller;
}

function installCombatCompatibility(game, controller) {
  const enhancedCastSpell = game._castSpell.bind(game);
  const inputClock = { lastRealTime: game.gameTime || 0 };

  game._startAttack = function () {
    this._faceNearestTarget?.(4.6, .05);
    return this.player.beginAttack();
  };

  game._castSpell = function () {
    if (!this.player.beginCast()) return false;
    const before = this.projectiles.length;
    this.player._actionCastReentry = true;
    try {
      enhancedCastSpell();
    } finally {
      this.player._actionCastReentry = false;
    }
    return this.projectiles.length > before;
  };

  const dispatchBuffered = () => {
    const ready = controller.peekReadyInput();
    if (!ready) return false;
    let committed = false;
    if (ready.input === 'attack') {
      committed = game._startAttack() !== false;
    } else if (ready.input === 'dodge') {
      committed = game.player.beginDodge(ready.payload);
      if (committed) game.cameraKick = .75;
    } else if (ready.input === 'spell') {
      committed = game._castSpell() !== false;
    }
    if (committed) controller.consumeBufferedInput(ready.serial);
    return committed;
  };

  game._handleInput = function (moveWorld) {
    const now = this.gameTime || 0;
    const realElapsed = Math.max(0, now - inputClock.lastRealTime);
    inputClock.lastRealTime = now;
    controller.advanceReal(realElapsed, { cooldowns: false, combo: false, buffer: true });
    dispatchBuffered();

    if (this.input.consume('attack')) controller.bufferInput('attack', null, PLAYER_INPUT_TTLS.attack);
    if (this.input.consume('dodge')) {
      controller.bufferInput('dodge', { x: moveWorld.x, y: moveWorld.y, z: moveWorld.z }, PLAYER_INPUT_TTLS.dodge);
    }
    if (this.input.consume('spell')) controller.bufferInput('spell', null, PLAYER_INPUT_TTLS.spell);
    dispatchBuffered();
  };
}

export function installUnifiedActionArchitecture(game) {
  if (game.unifiedActionArchitecture) return game.unifiedActionArchitecture;
  patchCharacterPrototypes();
  patchEnemyPrototypes();
  const controller = attachPlayerController(game);
  installCombatCompatibility(game, controller);

  for (const enemy of game.enemies || []) ensureEnemyController(enemy);
  const architecture = {
    controller,
    playerActions: PLAYER_ACTIONS,
    enemyActions: ENEMY_ACTIONS,
    inputTtls: PLAYER_INPUT_TTLS,
    version: 1,
  };
  game.unifiedActionArchitecture = architecture;
  return architecture;
}

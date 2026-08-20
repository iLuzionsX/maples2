import * as THREE from 'three';
import { Enemy } from './Enemy.js';
import { localHitResponse } from './RowanAnimationMath.js';
import {
  hitSpringEnvelope,
  playerAttackTiming,
  velocityPlaybackScale,
} from './AnimationTiming.js';

const Q = THREE.Quaternion;
const E = THREE.Euler;
const enemyManagers = new WeakMap();
let enemyPrototypePatched = false;

function addLocalRotation(node, x, y, z, scratch) {
  if (!node || (!x && !y && !z)) return;
  scratch.euler.set(x, y, z, 'XYZ');
  scratch.quaternion.setFromEuler(scratch.euler);
  node.quaternion.multiply(scratch.quaternion);
}

function findTorsoNode(root) {
  let best = null;
  root?.traverse(node => {
    if (best || !node.name) return;
    const name = node.name.toLowerCase();
    if (node.isBone && /(chest|spine2|spine_2|upperbody|upper_body)/.test(name)) best = node;
  });
  if (best) return best;
  root?.traverse(node => {
    if (best || !node.name) return;
    const name = node.name.toLowerCase();
    if (node.isBone && /(spine|hips|pelvis|body)/.test(name)) best = node;
  });
  return best;
}

function patchEnemyAnimator(enemy, state, manager) {
  const animator = enemy.assetAnimator;
  if (!animator || state.animator === animator) return;
  state.animator = animator;

  if (!animator.__maplesVelocitySynchronized) {
    const baseUpdate = animator.update.bind(animator);
    animator.update = (dt, requestedScale = 1) => {
      let scale = requestedScale;
      if (animator.key === 'run' || animator.key === 'walk') {
        const actualSpeed = Math.hypot(enemy.velocity?.x || 0, enemy.velocity?.z || 0);
        const referenceSpeed = Math.max(.45, enemy.speed || (enemy.isBoss ? 1.55 : 2.2));
        scale = velocityPlaybackScale(actualSpeed, referenceSpeed, enemy.isBoss ? .72 : .68, enemy.isBoss ? 1.16 : 1.34);
        state.lastPlaybackScale = scale;
        manager.velocitySyncSamples++;
      }
      return baseUpdate(dt, scale);
    };
    animator.__maplesVelocitySynchronized = true;
    manager.velocitySyncedEnemies++;
  }
}

function ensureEnemyState(enemy, manager) {
  if (!enemy.assetVisual) return null;
  let state = enemy._animationNextLevel;
  if (state?.model === enemy.assetVisual) {
    patchEnemyAnimator(enemy, state, manager);
    return state;
  }

  state = {
    model: enemy.assetVisual,
    torso: findTorsoNode(enemy.assetVisual),
    animator: null,
    lastPlaybackScale: 1,
    scratch: { quaternion: new Q(), euler: new E() },
  };
  enemy._animationNextLevel = state;
  patchEnemyAnimator(enemy, state, manager);
  manager.enemyVisualsReady++;
  return state;
}

function updateEnemyPresentation(enemy, dt) {
  const manager = enemyManagers.get(enemy);
  if (!manager || enemy.remove) return;
  const state = ensureEnemyState(enemy, manager);
  if (!state) return;

  const hit = enemy._animationNextLevelHit;
  if (hit) {
    hit.elapsed += dt;
    const envelope = hitSpringEnvelope(hit.elapsed, hit.duration);
    if (envelope > 0) {
      const target = state.torso || state.model;
      const strength = hit.strength * envelope;
      addLocalRotation(
        target,
        hit.front * .105 * strength,
        hit.side * .045 * strength,
        -hit.side * .14 * strength,
        state.scratch,
      );
      manager.enemyFlinchFrames++;
    }
    if (hit.elapsed >= hit.duration) enemy._animationNextLevelHit = null;
  }
}

function patchEnemyPrototype() {
  if (enemyPrototypePatched) return;
  enemyPrototypePatched = true;

  const baseTakeHit = Enemy.prototype.takeHit;
  Enemy.prototype.takeHit = function (damage, from, crit = false) {
    const response = from
      ? localHitResponse(this.facing, from.x, from.z, this.position.x, this.position.z)
      : { front: 1, side: 0, angle: 0 };
    const result = baseTakeHit.call(this, damage, from, crit);
    if (result) {
      const manager = enemyManagers.get(this);
      const strength = (this.isBoss ? .72 : 1) * (crit ? 1.22 : 1);
      this._animationNextLevelHit = {
        elapsed: 0,
        duration: this.isBoss ? .28 : .22,
        front: response.front,
        side: response.side,
        strength,
      };
      if (manager) manager.enemyFlinchEvents++;
    }
    return result;
  };

  const baseUpdate = Enemy.prototype.update;
  Enemy.prototype.update = function (...args) {
    const result = baseUpdate.apply(this, args);
    updateEnemyPresentation(this, args[0] || 0);
    return result;
  };
}

function applyPlayerContactLayer(game, manager, dt) {
  const player = game.player;
  const director = game.rowanAnimationDirector;
  const state = director?.state;
  const bones = state?.bones;
  if (!bones || !player.assetVisual) return;

  if (player.state === 'attack') {
    const progress = player.stateTime / Math.max(.01, player.stateDuration);
    const timing = playerAttackTiming(player.comboIndex, progress);
    const side = player.comboIndex === 0 ? -1 : player.comboIndex === 1 ? 1 : -.45;
    const finisher = player.comboIndex === 2 ? 1.28 : 1;
    const anticipation = timing.anticipation;
    const impact = timing.impact * finisher;
    const follow = timing.followThrough;

    addLocalRotation(bones.hips, anticipation * .025 - impact * .042 + follow * .02, side * (-anticipation * .038 + impact * .055), side * impact * .012, manager.scratch);
    addLocalRotation(bones.spine, anticipation * .042 - impact * .078 + follow * .032, side * (-anticipation * .062 + impact * .09), side * (-anticipation * .018 + impact * .028), manager.scratch);
    addLocalRotation(bones.chest, anticipation * .036 - impact * .096 + follow * .036, side * (-anticipation * .078 + impact * .112), side * (-anticipation * .024 + impact * .038), manager.scratch);
    addLocalRotation(bones.head, -anticipation * .018 + impact * .035, side * (anticipation * .028 - impact * .04), -side * impact * .018, manager.scratch);

    manager.contactAlignmentActive = timing.impact > .02;
    manager.lastAttackContact = timing.contact;
    manager.lastAttackImpact = timing.impact;
  } else {
    manager.contactAlignmentActive = false;
    manager.lastAttackImpact = 0;
    if (player.state === 'idle' && player.speed < .18) {
      manager.idleClock += dt;
      const breath = Math.sin(manager.idleClock * 2.05) * .0065;
      const gaze = Math.sin(manager.idleClock * .73) * .005;
      addLocalRotation(bones.chest, breath, gaze, 0, manager.scratch);
      addLocalRotation(bones.head, -breath * .42, -gaze * .7, gaze * .25, manager.scratch);
    }
  }
}

function installEventAccents(game, manager, director) {
  const events = director?.events;
  if (!events) return;

  manager.unsubscribers.push(events.on('attack:anticipation', event => {
    manager.lastAttackSerial = event.serial;
    manager.attackAnticipations++;
  }));

  manager.unsubscribers.push(events.on('attack:strike', event => {
    const accent = event.combo === 2 ? .28 : .13;
    game.cameraKick = Math.max(game.cameraKick || 0, accent);
    manager.playerStrikeAccents++;
  }));

  manager.unsubscribers.push(events.on('sword:impact', event => {
    const bossHit = event.targets?.some(target => target.isBoss);
    game.cameraKick = Math.max(game.cameraKick || 0, bossHit ? .58 : (event.combo === 2 ? .46 : .24));
    manager.impactAccents += event.targets?.length || 1;
  }));
}

export function installAnimationNextLevel(game, director = game.rowanAnimationDirector) {
  patchEnemyPrototype();

  const manager = {
    ready: true,
    mode: 'contact-aligned-layered-polish',
    contactWindowsPreserved: true,
    playerStrikeAccents: 0,
    attackAnticipations: 0,
    impactAccents: 0,
    enemyFlinchEvents: 0,
    enemyFlinchFrames: 0,
    enemyVisualsReady: 0,
    velocitySyncedEnemies: 0,
    velocitySyncSamples: 0,
    contactAlignmentActive: false,
    lastAttackContact: 0,
    lastAttackImpact: 0,
    lastAttackSerial: 0,
    idleClock: 0,
    scratch: { quaternion: new Q(), euler: new E() },
    unsubscribers: [],
  };

  game.animationNextLevelManager = manager;
  installEventAccents(game, manager, director);

  for (const enemy of game.enemies) enemyManagers.set(enemy, manager);
  const baseSpawnEnemy = game._spawnEnemy.bind(game);
  game._spawnEnemy = (...args) => {
    const enemy = baseSpawnEnemy(...args);
    enemyManagers.set(enemy, manager);
    return enemy;
  };

  const basePlayerUpdate = game.player.update.bind(game.player);
  game.player.update = (...args) => {
    const result = basePlayerUpdate(...args);
    applyPlayerContactLayer(game, manager, args[0] || 0);
    return result;
  };

  return manager;
}

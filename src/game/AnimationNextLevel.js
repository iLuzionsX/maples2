import * as THREE from 'three';
import { Enemy } from './Enemy.js';
import { localHitResponse } from './RowanAnimationMath.js';
import {
  clamp01,
  hitSpringEnvelope,
  impulsePulse,
  playerComboPose,
  playerMotionPose,
  velocityPlaybackScale,
} from './AnimationTiming.js';

const Q = THREE.Quaternion;
const E = THREE.Euler;
const damp = THREE.MathUtils.damp;
const enemyManagers = new WeakMap();
let enemyPrototypePatched = false;

function wrapAngle(angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function addLocalRotation(node, x, y, z, scratch, scale = 1) {
  if (!node || scale === 0 || (!x && !y && !z)) return;
  scratch.euler.set(x * scale, y * scale, z * scale, 'XYZ');
  scratch.quaternion.setFromEuler(scratch.euler);
  node.quaternion.multiply(scratch.quaternion);
}

function applyPart(node, part, scratch, scale = 1) {
  if (!part) return;
  addLocalRotation(node, part.x || 0, part.y || 0, part.z || 0, scratch, scale);
}

function findRigNode(root, patterns, { bonesOnly = true } = {}) {
  let found = null;
  root?.traverse(node => {
    if (found || !node.name || (bonesOnly && !node.isBone)) return;
    const name = node.name.toLowerCase();
    if (patterns.some(pattern => pattern.test(name))) found = node;
  });
  return found;
}

function findSideBone(root, part, side) {
  const letter = side === 'left' ? 'l' : 'r';
  const word = side;
  const patterns = part === 'upperArm'
    ? [
        new RegExp(`upper.?arm[._ -]?${letter}$`, 'i'),
        new RegExp(`${word}.*upper.?arm`, 'i'),
        new RegExp(`upper.?arm.*${word}`, 'i'),
        new RegExp(`arm[._ -]?${letter}$`, 'i'),
      ]
    : [
        new RegExp(`lower.?arm[._ -]?${letter}$`, 'i'),
        new RegExp(`fore.?arm[._ -]?${letter}$`, 'i'),
        new RegExp(`${word}.*(lower.?arm|fore.?arm)`, 'i'),
        new RegExp(`(lower.?arm|fore.?arm).*${word}`, 'i'),
      ];
  return findRigNode(root, patterns);
}

function findEnemyRig(root) {
  return {
    hips: findRigNode(root, [/hips/i, /pelvis/i, /root/i]),
    torso: findRigNode(root, [/chest/i, /spine.?2/i, /upper.?body/i]) || findRigNode(root, [/spine/i, /body/i]),
    head: findRigNode(root, [/head/i, /neck/i]),
    upperArmL: findSideBone(root, 'upperArm', 'left'),
    upperArmR: findSideBone(root, 'upperArm', 'right'),
  };
}

function ensurePlayerRig(game, manager) {
  const directorState = game.rowanAnimationDirector?.state;
  const model = game.player.assetVisual;
  if (!directorState?.bones || !model) return null;
  if (manager.playerRig?.model === model) return manager.playerRig;

  const rig = {
    model,
    hips: directorState.bones.hips,
    spine: directorState.bones.spine,
    chest: directorState.bones.chest,
    head: directorState.bones.head,
    upperLegL: directorState.bones.upperLegL,
    upperLegR: directorState.bones.upperLegR,
    lowerLegL: directorState.bones.lowerLegL,
    lowerLegR: directorState.bones.lowerLegR,
    upperArmL: findSideBone(model, 'upperArm', 'left'),
    upperArmR: findSideBone(model, 'upperArm', 'right'),
    lowerArmL: findSideBone(model, 'lowerArm', 'left'),
    lowerArmR: findSideBone(model, 'lowerArm', 'right'),
  };
  manager.playerRig = rig;
  manager.playerRigCoverage = {
    core: [rig.hips, rig.spine, rig.chest, rig.head].filter(Boolean).length,
    arms: [rig.upperArmL, rig.upperArmR, rig.lowerArmL, rig.lowerArmR].filter(Boolean).length,
    legs: [rig.upperLegL, rig.upperLegR, rig.lowerLegL, rig.lowerLegR].filter(Boolean).length,
  };
  return rig;
}

function updatePlayerMotion(manager, player, dt) {
  const motion = manager.motion;
  const speed = player.speed || 0;
  const rawAcceleration = dt > .0001 ? (speed - motion.previousSpeed) / dt : 0;
  const rawTurnRate = dt > .0001 ? wrapAngle((player.facing || 0) - motion.previousFacing) / dt : 0;
  const sin = Math.sin(player.facing || 0);
  const cos = Math.cos(player.facing || 0);
  const vx = player.velocity?.x || 0;
  const vz = player.velocity?.z || 0;
  const lateralSpeed = vx * cos - vz * sin;

  motion.acceleration = damp(motion.acceleration, THREE.MathUtils.clamp(rawAcceleration, -24, 24), 14, dt);
  motion.turnRate = damp(motion.turnRate, THREE.MathUtils.clamp(rawTurnRate, -16, 16), 16, dt);
  motion.lateralSpeed = damp(motion.lateralSpeed, lateralSpeed, 15, dt);
  motion.previousSpeed = speed;
  motion.previousFacing = player.facing || 0;

  const pose = playerMotionPose({
    speed,
    acceleration: motion.acceleration,
    lateralSpeed: motion.lateralSpeed,
    turnRate: motion.turnRate,
  });
  motion.energy = pose.energy;
  manager.peakMotionEnergy = Math.max(manager.peakMotionEnergy, pose.energy);
  manager.lastMotionPose = pose;
  return pose;
}

function locomotionPresentationEligible(player) {
  return !player.dead && !['attack', 'dodge', 'hurt', 'cast', 'dead'].includes(player.state);
}

function applyPlayerMotionLayer(rig, manager, player, pose) {
  if (!locomotionPresentationEligible(player)) return;
  const scale = player.speed > .2 ? 1 : .35;
  applyPart(rig.hips, pose.hips, manager.scratch, scale);
  applyPart(rig.spine, pose.spine, manager.scratch, scale);
  applyPart(rig.chest, pose.chest, manager.scratch, scale);
  applyPart(rig.head, pose.head, manager.scratch, scale);
  manager.motionFrames++;
}

function applyTransitionImpulses(rig, manager) {
  const pulse = manager.pulses;
  const start = impulsePulse(pulse.start, .24);
  const stop = impulsePulse(pulse.stop, .30);
  const pivot = impulsePulse(pulse.pivot, .22) * pulse.pivotSign;
  const landing = impulsePulse(pulse.landing, .26);

  if (start > 0) {
    addLocalRotation(rig.hips, -.055 * start, 0, 0, manager.scratch);
    addLocalRotation(rig.spine, -.075 * start, 0, 0, manager.scratch);
    addLocalRotation(rig.chest, -.06 * start, 0, 0, manager.scratch);
    manager.locomotionImpulseFrames++;
  }
  if (stop > 0) {
    addLocalRotation(rig.hips, .055 * stop, 0, 0, manager.scratch);
    addLocalRotation(rig.spine, .085 * stop, 0, 0, manager.scratch);
    addLocalRotation(rig.chest, .07 * stop, 0, 0, manager.scratch);
    addLocalRotation(rig.upperLegL, .05 * stop, 0, 0, manager.scratch);
    addLocalRotation(rig.upperLegR, .05 * stop, 0, 0, manager.scratch);
    manager.locomotionImpulseFrames++;
  }
  if (pivot !== 0) {
    addLocalRotation(rig.hips, 0, .04 * pivot, -.055 * pivot, manager.scratch);
    addLocalRotation(rig.spine, 0, .065 * pivot, -.08 * pivot, manager.scratch);
    addLocalRotation(rig.chest, 0, .08 * pivot, -.095 * pivot, manager.scratch);
    addLocalRotation(rig.head, 0, -.04 * pivot, .045 * pivot, manager.scratch);
    manager.locomotionImpulseFrames++;
  }
  if (landing > 0) {
    addLocalRotation(rig.hips, .07 * landing, 0, 0, manager.scratch);
    addLocalRotation(rig.spine, .045 * landing, 0, 0, manager.scratch);
    addLocalRotation(rig.head, -.028 * landing, 0, 0, manager.scratch);
    addLocalRotation(rig.upperLegL, .10 * landing, 0, 0, manager.scratch);
    addLocalRotation(rig.upperLegR, .10 * landing, 0, 0, manager.scratch);
    addLocalRotation(rig.lowerLegL, -.13 * landing, 0, 0, manager.scratch);
    addLocalRotation(rig.lowerLegR, -.13 * landing, 0, 0, manager.scratch);
    manager.locomotionImpulseFrames++;
  }
}

function applyPlayerAttackLayer(rig, manager, player) {
  if (player.state !== 'attack') {
    manager.contactAlignmentActive = false;
    manager.lastAttackImpact = 0;
    return;
  }

  const progress = player.stateTime / Math.max(.01, player.stateDuration);
  const pose = playerComboPose(player.comboIndex, progress);
  const { timing } = pose;
  applyPart(rig.hips, pose.hips, manager.scratch);
  applyPart(rig.spine, pose.spine, manager.scratch);
  applyPart(rig.chest, pose.chest, manager.scratch);
  applyPart(rig.head, pose.head, manager.scratch);
  applyPart(rig.upperArmR, pose.upperArmR, manager.scratch);
  applyPart(rig.lowerArmR, pose.lowerArmR, manager.scratch);
  applyPart(rig.upperArmL, pose.upperArmL, manager.scratch);
  applyPart(rig.lowerArmL, pose.lowerArmL, manager.scratch);
  applyPart(rig.upperLegL, pose.upperLegL, manager.scratch);
  applyPart(rig.upperLegR, pose.upperLegR, manager.scratch);
  applyPart(rig.lowerLegL, pose.lowerLegL, manager.scratch);
  applyPart(rig.lowerLegR, pose.lowerLegR, manager.scratch);

  manager.contactAlignmentActive = timing.impact > .02;
  manager.lastAttackContact = timing.contact;
  manager.lastAttackImpact = timing.impact;
  manager.lastComboIndex = player.comboIndex;
  manager.comboPoseFrames++;
  manager.peakComboImpact = Math.max(manager.peakComboImpact, timing.impact);
}

function applyIdleLife(rig, manager, player, dt) {
  if (player.state !== 'idle' || player.speed >= .18) return;
  manager.idleClock += dt;
  const breath = Math.sin(manager.idleClock * 2.05);
  const weight = Math.sin(manager.idleClock * .71 + .8);
  addLocalRotation(rig.chest, breath * .0068, weight * .0045, weight * .0025, manager.scratch);
  addLocalRotation(rig.head, -breath * .003, -weight * .006, weight * .0035, manager.scratch);
  addLocalRotation(rig.upperArmL, breath * .0025, 0, weight * .002, manager.scratch);
  addLocalRotation(rig.upperArmR, -breath * .0025, 0, -weight * .002, manager.scratch);
  manager.idleLifeFrames++;
}

function tickPulses(manager, dt) {
  manager.pulses.start += dt;
  manager.pulses.stop += dt;
  manager.pulses.pivot += dt;
  manager.pulses.landing += dt;
}

function updatePlayerPresentation(game, manager, dt) {
  const player = game.player;
  const rig = ensurePlayerRig(game, manager);
  if (!rig) return;
  tickPulses(manager, dt);
  const motionPose = updatePlayerMotion(manager, player, dt);
  applyPlayerMotionLayer(rig, manager, player, motionPose);
  applyTransitionImpulses(rig, manager);
  applyPlayerAttackLayer(rig, manager, player);
  applyIdleLife(rig, manager, player, dt);
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

  const bones = findEnemyRig(enemy.assetVisual);
  state = {
    model: enemy.assetVisual,
    bones,
    animator: null,
    lastPlaybackScale: 1,
    lastState: enemy.state,
    clock: 0,
    scratch: { quaternion: new Q(), euler: new E() },
  };
  enemy._animationNextLevel = state;
  patchEnemyAnimator(enemy, state, manager);
  manager.enemyVisualsReady++;
  if (bones.torso) manager.enemyTorsoRigsReady++;
  if (enemy.isBoss) manager.bossVisualsReady++;
  return state;
}

function applyEnemyStatePose(enemy, state, manager, dt) {
  const bones = state.bones;
  const torso = bones.torso;
  if (!torso) return;
  state.clock += dt;

  if (state.lastState !== enemy.state) {
    manager.enemyStateTransitions++;
    if (enemy.state === 'windup') manager.enemyWindups++;
    if (enemy.state === 'attack') manager.enemyAttacks++;
    if (enemy.state === 'recover') manager.enemyRecovers++;
    state.lastState = enemy.state;
  }

  const speed = Math.hypot(enemy.velocity?.x || 0, enemy.velocity?.z || 0);
  if (enemy.state === 'chase') {
    const speed01 = clamp01(speed / Math.max(.4, enemy.speed || 2.2));
    const gait = Math.sin(state.clock * (enemy.isBoss ? 5.2 : 8.1));
    addLocalRotation(torso, -speed01 * (enemy.isBoss ? .035 : .045), 0, gait * speed01 * (enemy.isBoss ? .012 : .018), state.scratch);
    addLocalRotation(bones.head, speed01 * .012, 0, -gait * speed01 * .01, state.scratch);
    manager.enemyLocomotionPoseFrames++;
  }

  const progress = clamp01(enemy.stateTime / Math.max(.01, enemy.stateDuration || 1));
  if (enemy.state === 'windup') {
    const wind = Math.sin(progress * Math.PI * .5);
    const weight = enemy.isBoss ? 1.35 : 1;
    addLocalRotation(torso, .10 * wind * weight, 0, -.025 * wind, state.scratch);
    addLocalRotation(bones.head, -.045 * wind * weight, 0, .018 * wind, state.scratch);
    addLocalRotation(bones.upperArmL, -.075 * wind * weight, 0, -.035 * wind, state.scratch);
    addLocalRotation(bones.upperArmR, -.075 * wind * weight, 0, .035 * wind, state.scratch);
    manager.enemyStatePoseFrames++;
  } else if (enemy.state === 'attack') {
    const drive = Math.sin(Math.PI * clamp01(progress / .72));
    const weight = enemy.isBoss ? 1.28 : 1;
    addLocalRotation(torso, -.14 * drive * weight, 0, .035 * drive, state.scratch);
    addLocalRotation(bones.head, .05 * drive * weight, 0, -.02 * drive, state.scratch);
    addLocalRotation(bones.upperArmL, .08 * drive, 0, -.025 * drive, state.scratch);
    addLocalRotation(bones.upperArmR, .08 * drive, 0, .025 * drive, state.scratch);
    manager.enemyStatePoseFrames++;
  } else if (enemy.state === 'recover') {
    const recover = impulsePulse(enemy.stateTime, enemy.stateDuration || .46);
    const weight = enemy.isBoss ? 1.22 : 1;
    addLocalRotation(torso, .07 * recover * weight, 0, -.018 * recover, state.scratch);
    addLocalRotation(bones.head, -.03 * recover * weight, 0, .012 * recover, state.scratch);
    manager.enemyStatePoseFrames++;
  } else if (enemy.state === 'dead') {
    const collapse = clamp01(progress);
    addLocalRotation(torso, .10 * collapse * (enemy.isBoss ? 1.2 : 1), 0, .08 * collapse, state.scratch);
    addLocalRotation(bones.head, -.05 * collapse, 0, -.06 * collapse, state.scratch);
    manager.enemyDeathPoseFrames++;
  }

  if (enemy.isBoss && ['windup', 'attack', 'recover'].includes(enemy.state)) manager.bossPresentationFrames++;
}

function applyEnemyFlinch(enemy, state, manager, dt) {
  const hit = enemy._animationNextLevelHit;
  if (!hit) return;
  hit.elapsed += dt;
  const envelope = hitSpringEnvelope(hit.elapsed, hit.duration);
  if (envelope > 0 && state.bones.torso) {
    const strength = hit.strength * envelope;
    addLocalRotation(
      state.bones.torso,
      hit.front * .12 * strength,
      hit.side * .055 * strength,
      -hit.side * .16 * strength,
      state.scratch,
    );
    addLocalRotation(
      state.bones.head,
      -hit.front * .055 * strength,
      -hit.side * .035 * strength,
      hit.side * .075 * strength,
      state.scratch,
    );
    addLocalRotation(state.bones.upperArmL, .025 * strength, 0, hit.side * .035 * strength, state.scratch);
    addLocalRotation(state.bones.upperArmR, .025 * strength, 0, hit.side * .035 * strength, state.scratch);
    manager.enemyFlinchFrames++;
  }
  if (hit.elapsed >= hit.duration) enemy._animationNextLevelHit = null;
}

function updateEnemyPresentation(enemy, dt) {
  const manager = enemyManagers.get(enemy);
  if (!manager || enemy.remove) return;
  const state = ensureEnemyState(enemy, manager);
  if (!state) return;
  applyEnemyStatePose(enemy, state, manager, dt);
  applyEnemyFlinch(enemy, state, manager, dt);
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
      const strength = (this.isBoss ? .78 : 1) * (crit ? 1.28 : 1);
      this._animationNextLevelHit = {
        elapsed: 0,
        duration: this.dead ? (this.isBoss ? .36 : .26) : (this.isBoss ? .31 : .23),
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

function installEventAccents(game, manager, director) {
  const events = director?.events;
  if (!events) return;

  manager.unsubscribers.push(events.on('attack:anticipation', event => {
    manager.lastAttackSerial = event.serial;
    manager.attackAnticipations++;
    manager.peakComboImpact = 0;
  }));

  manager.unsubscribers.push(events.on('attack:strike', event => {
    const accent = event.combo === 2 ? .34 : (event.combo === 1 ? .19 : .17);
    game.cameraKick = Math.max(game.cameraKick || 0, accent);
    manager.playerStrikeAccents++;
  }));

  manager.unsubscribers.push(events.on('attack:follow-through', () => {
    manager.followThroughEvents++;
  }));

  manager.unsubscribers.push(events.on('sword:impact', event => {
    const bossHit = event.targets?.some(target => target.isBoss);
    game.cameraKick = Math.max(game.cameraKick || 0, bossHit ? .68 : (event.combo === 2 ? .54 : .30));
    manager.impactAccents += event.targets?.length || 1;
  }));

  manager.unsubscribers.push(events.on('locomotion:start', () => {
    manager.pulses.start = 0;
    manager.startEvents++;
  }));
  manager.unsubscribers.push(events.on('locomotion:stop', () => {
    manager.pulses.stop = 0;
    manager.stopEvents++;
  }));
  manager.unsubscribers.push(events.on('locomotion:direction-change', event => {
    manager.pulses.pivot = 0;
    manager.pulses.pivotSign = event.direction || 1;
    manager.pivotEvents++;
  }));
  manager.unsubscribers.push(events.on('dodge:recover', () => {
    manager.pulses.landing = 0;
    manager.landingEvents++;
  }));
}

export function installAnimationNextLevel(game, director = game.rowanAnimationDirector) {
  if (game.animationNextLevelManager?.version === 2) return game.animationNextLevelManager;
  patchEnemyPrototype();

  const manager = {
    ready: true,
    version: 2,
    mode: 'authored-momentum-combat-v2',
    contactWindowsPreserved: true,
    rootFallbackFlinchDisabled: true,
    playerStrikeAccents: 0,
    attackAnticipations: 0,
    followThroughEvents: 0,
    impactAccents: 0,
    startEvents: 0,
    stopEvents: 0,
    pivotEvents: 0,
    landingEvents: 0,
    enemyFlinchEvents: 0,
    enemyFlinchFrames: 0,
    enemyVisualsReady: 0,
    enemyTorsoRigsReady: 0,
    bossVisualsReady: 0,
    velocitySyncedEnemies: 0,
    velocitySyncSamples: 0,
    enemyStateTransitions: 0,
    enemyWindups: 0,
    enemyAttacks: 0,
    enemyRecovers: 0,
    enemyStatePoseFrames: 0,
    enemyLocomotionPoseFrames: 0,
    enemyDeathPoseFrames: 0,
    bossPresentationFrames: 0,
    motionFrames: 0,
    locomotionImpulseFrames: 0,
    comboPoseFrames: 0,
    idleLifeFrames: 0,
    contactAlignmentActive: false,
    lastAttackContact: 0,
    lastAttackImpact: 0,
    lastAttackSerial: 0,
    lastComboIndex: -1,
    peakComboImpact: 0,
    peakMotionEnergy: 0,
    lastMotionPose: null,
    idleClock: 0,
    playerRig: null,
    playerRigCoverage: { core: 0, arms: 0, legs: 0 },
    motion: {
      previousSpeed: game.player.speed || 0,
      previousFacing: game.player.facing || 0,
      acceleration: 0,
      lateralSpeed: 0,
      turnRate: 0,
      energy: 0,
    },
    pulses: { start: 99, stop: 99, pivot: 99, pivotSign: 1, landing: 99 },
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
    updatePlayerPresentation(game, manager, args[0] || 0);
    return result;
  };

  return manager;
}

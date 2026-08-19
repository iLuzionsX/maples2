import * as THREE from 'three';
import {
  clamp01,
  crossedPhase,
  localHitResponse,
  locomotionWeights,
  pulseAmount,
  stanceWeight,
  wrapAngle,
} from './RowanAnimationMath.js';

const V = THREE.Vector3;
const Q = THREE.Quaternion;
const E = THREE.Euler;
const clamp = THREE.MathUtils.clamp;
const damp = THREE.MathUtils.damp;

const CLIPS = {
  idle: ['Idle'],
  walk: ['Walking_A', 'Walking_B'],
  run: ['Running_A', 'Running_B'],
  turnLeft: ['Running_Strafe_Left'],
  turnRight: ['Running_Strafe_Right'],
  deathPose: ['Death_A_Pose', 'Death_B_Pose'],
};

const LOCOMOTION_KEYS = ['idle', 'walk', 'run', 'turnLeft', 'turnRight'];
const NON_LOCOMOTION_STATES = new Set(['attack', 'dodge', 'hurt', 'cast', 'dead']);
const LEFT_CONTACT = .12;
const RIGHT_CONTACT = .62;

function nowSeconds() {
  return performance.now() * .001;
}

function locomotionEligible(player, state = player?.state) {
  return Boolean(player && !player.dead && !NON_LOCOMOTION_STATES.has(state));
}

function clipByNames(clips, names) {
  for (const name of names) {
    const exact = clips.find(clip => clip.name === name);
    if (exact) return exact;
    const fuzzy = clips.find(clip => clip.name.toLowerCase().includes(name.toLowerCase()));
    if (fuzzy) return fuzzy;
  }
  return null;
}

function findNode(root, names) {
  if (!root) return null;
  const wanted = names.map(name => name.toLowerCase());
  let exact = null;
  let fuzzy = null;
  root.traverse(node => {
    if (exact) return;
    const name = (node.name || '').toLowerCase();
    if (!name) return;
    if (wanted.includes(name)) exact = node;
    else if (!fuzzy && wanted.some(candidate => name.includes(candidate))) fuzzy = node;
  });
  return exact || fuzzy;
}

function isDescendantOf(node, ancestor) {
  let current = node;
  while (current) {
    if (current === ancestor) return true;
    current = current.parent;
  }
  return false;
}

function applyLocalRotation(node, x = 0, y = 0, z = 0) {
  if (!node || (!x && !y && !z)) return;
  node.quaternion.multiply(new Q().setFromEuler(new E(x, y, z, 'XYZ')));
}

function actionFor(animator, clip, loop = true) {
  if (!animator || !clip) return null;
  const action = animator.mixer.clipAction(clip);
  action.enabled = true;
  action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
  action.clampWhenFinished = !loop;
  action.play();
  return action;
}

function initializeActions(animator) {
  const actions = {};
  for (const key of LOCOMOTION_KEYS) {
    const clip = clipByNames(animator.clips || [], CLIPS[key]);
    actions[key] = clip ? { clip, action: actionFor(animator, clip, true) } : null;
  }
  const deathPoseClip = clipByNames(animator.clips || [], CLIPS.deathPose);
  actions.deathPose = deathPoseClip ? { clip: deathPoseClip, action: actionFor(animator, deathPoseClip, false) } : null;
  if (actions.deathPose?.action) {
    actions.deathPose.action.paused = true;
    actions.deathPose.action.setEffectiveWeight(0);
  }
  for (const key of LOCOMOTION_KEYS) {
    if (!actions[key]?.action) continue;
    actions[key].action.paused = true;
    actions[key].action.setEffectiveWeight(0);
  }
  return actions;
}

class AnimationEventBus {
  constructor(manager) {
    this.manager = manager;
    this.listeners = new Map();
  }

  on(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(listener);
    return () => this.off(type, listener);
  }

  off(type, listener) {
    this.listeners.get(type)?.delete(listener);
  }

  emit(type, detail = {}) {
    this.manager.eventCounts[type] = (this.manager.eventCounts[type] || 0) + 1;
    const event = { type, time: nowSeconds(), ...detail };
    for (const listener of this.listeners.get(type) || []) listener(event);
    for (const listener of this.listeners.get('*') || []) listener(event);
    return event;
  }
}

function resetImportedRoot(state, player) {
  const polish = player._animationPolish;
  if (polish?.model === state.model) {
    state.restPosition.copy(polish.restPosition);
    state.restQuaternion.copy(polish.restQuaternion);
    state.restScale.copy(polish.restScale);
  }
  state.model.position.copy(state.restPosition);
  state.model.quaternion.copy(state.restQuaternion);
  state.model.scale.copy(state.restScale);
}

function updateLogicalRootY(manager, player) {
  const current = player.root.position.y;
  if (Math.abs(current - manager.logicalRootY) > .24) manager.logicalRootY = current;
  player.root.position.y = manager.logicalRootY;
}

function initializeRig(game, manager) {
  const player = game.player;
  const model = player.assetVisual;
  const animator = player.assetAnimator;
  if (!model || !animator) return null;
  if (manager.state?.model === model) return manager.state;

  const polish = player._animationPolish;
  const restPosition = polish?.model === model ? polish.restPosition.clone() : model.position.clone();
  const restQuaternion = polish?.model === model ? polish.restQuaternion.clone() : model.quaternion.clone();
  const restScale = polish?.model === model ? polish.restScale.clone() : model.scale.clone();
  model.position.copy(restPosition);
  model.quaternion.copy(restQuaternion);
  model.scale.copy(restScale);
  model.updateMatrixWorld(true);

  const state = {
    model,
    animator,
    restPosition,
    restQuaternion,
    restScale,
    actions: initializeActions(animator),
    bones: {
      hips: findNode(model, ['hips']),
      spine: findNode(model, ['spine']),
      chest: findNode(model, ['chest']),
      head: findNode(model, ['head']),
      upperLegL: findNode(model, ['upperleg.l']),
      upperLegR: findNode(model, ['upperleg.r']),
      lowerLegL: findNode(model, ['lowerleg.l']),
      lowerLegR: findNode(model, ['lowerleg.r']),
      footL: findNode(model, ['foot.l']),
      footR: findNode(model, ['foot.r']),
      toesL: findNode(model, ['toes.l']),
      toesR: findNode(model, ['toes.r']),
    },
    cape: findNode(model, ['Knight_Cape', 'cape']),
    hair: findNode(model, ['hair', 'ponytail', 'braid']),
    capeRest: null,
    hairRest: null,
    gaitPhase: 0,
    previousGaitPhase: 0,
    gaitDistance: 0,
    idleClock: 0,
    lastSpeed: player.speed || 0,
    lastFacing: player.facing || 0,
    startElapsed: 99,
    stopElapsed: 99,
    turnElapsed: 99,
    turnDirection: 0,
    dodgeRecoveryElapsed: 99,
    lastPlayerState: player.state,
    lastAttackSerial: manager.attackSerial,
    lastAttackAction: null,
    comboCarry: null,
    trailActive: false,
    footProbeElapsed: 0,
    groundRefreshElapsed: 99,
    groundMeshes: [],
    raycaster: new THREE.Raycaster(),
    foot: {
      left: { bone: null, baseClearance: .08, groundY: manager.logicalRootY, lock: null, hit: null },
      right: { bone: null, baseClearance: .08, groundY: manager.logicalRootY, lock: null, hit: null },
    },
  };

  state.foot.left.bone = state.bones.footL;
  state.foot.right.bone = state.bones.footR;
  state.capeRest = state.cape?.quaternion.clone() || null;
  state.hairRest = state.hair?.quaternion.clone() || null;

  for (const foot of [state.foot.left, state.foot.right]) {
    if (!foot.bone) continue;
    const world = foot.bone.getWorldPosition(new V());
    foot.baseClearance = clamp(world.y - player.root.position.y, .035, .32);
    foot.groundY = player.root.position.y;
  }

  model.userData.rowanAuthoredDirector = true;
  manager.state = state;
  manager.ready = true;
  manager.skeletalRigReady = Boolean(state.bones.hips && state.bones.spine && state.bones.footL && state.bones.footR);
  manager.secondaryMotionReady = Boolean(state.cape || state.hair);
  manager.footIKReady = Boolean(state.bones.footL && state.bones.footR);
  manager.clipCoverage = {
    idle: Boolean(state.actions.idle),
    walk: Boolean(state.actions.walk),
    run: Boolean(state.actions.run),
    turnLeft: Boolean(state.actions.turnLeft),
    turnRight: Boolean(state.actions.turnRight),
    deathPose: Boolean(state.actions.deathPose),
  };
  return state;
}

function setLocomotionAction(entry, weight, phase, timeScale = 1) {
  if (!entry?.action || !entry.clip) return;
  const action = entry.action;
  action.enabled = weight > .0001;
  action.paused = true;
  action.setEffectiveWeight(weight);
  action.setEffectiveTimeScale(timeScale);
  action.time = entry.clip.duration * (((phase % 1) + 1) % 1);
}

function silenceLocomotion(state) {
  for (const key of LOCOMOTION_KEYS) {
    const action = state.actions[key]?.action;
    if (!action) continue;
    action.setEffectiveWeight(0);
    action.paused = true;
  }
}

function updateLocomotion(state, manager, player, dt, turnRate, acceleration) {
  if (!locomotionEligible(player)) {
    silenceLocomotion(state);
    return { weights: locomotionWeights(0), speed01: 0, moving: false, turnWeight: 0 };
  }

  const speed = player.speed || 0;
  const speed01 = clamp01(speed / 5.25);
  const moving = speed > .12;
  const turnIntensity = speed > 1.0
    ? clamp(Math.abs(turnRate) * .085 + Math.max(0, 1 - state.turnElapsed / .24) * .44, 0, .72)
    : 0;
  const weights = locomotionWeights(speed, 5.25, turnIntensity);

  state.idleClock += dt;
  state.previousGaitPhase = state.gaitPhase;
  if (moving) {
    const strideLength = THREE.MathUtils.lerp(1.22, 1.92, speed01);
    state.gaitDistance += speed * dt;
    state.gaitPhase = (state.gaitDistance / strideLength) % 1;
  }

  const turnRight = turnRate >= 0;
  const turnEntry = turnRight ? state.actions.turnRight : state.actions.turnLeft;
  const unusedTurn = turnRight ? state.actions.turnLeft : state.actions.turnRight;
  const turnWeight = turnEntry ? weights.turn : 0;
  const redistributed = turnEntry ? 1 - weights.turn : 1;
  const baseTotal = Math.max(.0001, weights.idle + weights.walk + weights.run);
  const idle = (weights.idle / baseTotal) * redistributed;
  const walk = (weights.walk / baseTotal) * redistributed;
  const run = (weights.run / baseTotal) * redistributed;

  const idlePhase = (state.idleClock / Math.max(.001, state.actions.idle?.clip?.duration || 2.4)) % 1;
  setLocomotionAction(state.actions.idle, idle, idlePhase, 1);
  setLocomotionAction(state.actions.walk, walk, state.gaitPhase, THREE.MathUtils.lerp(.78, 1.28, speed01));
  setLocomotionAction(state.actions.run, run, state.gaitPhase, THREE.MathUtils.lerp(.78, 1.14, speed01));
  setLocomotionAction(turnEntry, turnWeight, state.gaitPhase, 1);
  if (unusedTurn?.action) unusedTurn.action.setEffectiveWeight(0);

  state.animator.mixer.update(0);
  manager.locomotionWeights = { idle, walk, run, turn: turnWeight };
  manager.locomotionBlendActive = true;

  if (moving && speed > .7) {
    if (crossedPhase(state.previousGaitPhase, state.gaitPhase, LEFT_CONTACT)) {
      manager.events.emit('footstep', { foot: 'left', speed, speed01, position: player.position.clone() });
    }
    if (crossedPhase(state.previousGaitPhase, state.gaitPhase, RIGHT_CONTACT)) {
      manager.events.emit('footstep', { foot: 'right', speed, speed01, position: player.position.clone() });
    }
  }

  return { weights: manager.locomotionWeights, speed01, moving, turnWeight, acceleration };
}

function detectTransitions(state, manager, player, dt, acceleration, turnRate) {
  state.startElapsed += dt;
  state.stopElapsed += dt;
  state.turnElapsed += dt;
  state.dodgeRecoveryElapsed += dt;

  const speed = player.speed || 0;
  const transitionEligible = locomotionEligible(player) && locomotionEligible(player, state.lastPlayerState);
  if (transitionEligible && state.lastSpeed < .32 && speed > .58 && acceleration > 2.2) {
    state.startElapsed = 0;
    manager.events.emit('locomotion:start', { speed, acceleration });
  }
  if (transitionEligible && state.lastSpeed > 1.15 && speed < .82 && acceleration < -2.2) {
    state.stopElapsed = 0;
    manager.events.emit('locomotion:stop', { speed, acceleration });
  }
  if (transitionEligible && speed > 1.35 && Math.abs(turnRate) > 3.9 && state.turnElapsed > .13) {
    state.turnElapsed = 0;
    state.turnDirection = Math.sign(turnRate) || 1;
    manager.events.emit('locomotion:direction-change', { direction: state.turnDirection, turnRate, speed });
  }

  if (state.lastPlayerState === 'dodge' && player.state === 'idle') {
    state.dodgeRecoveryElapsed = 0;
    manager.events.emit('dodge:recover', { position: player.position.clone() });
  }
  if (state.lastPlayerState === 'attack' && player.state !== 'attack') {
    manager.lastAttackEndedAt = nowSeconds();
    if (state.trailActive) {
      state.trailActive = false;
      manager.events.emit('weapon-trail:end', {
        combo: player.comboIndex,
        serial: manager.attackSerial,
        interrupted: player.state !== 'idle',
      });
    }
  }

  state.lastPlayerState = player.state;
}

function applyLocomotionPoseLayer(state, player, acceleration, turnRate) {
  if (!locomotionEligible(player)) return;
  const bones = state.bones;
  const start = pulseAmount(state.startElapsed, .25);
  const stop = pulseAmount(state.stopElapsed, .28);
  const turnPulse = pulseAmount(state.turnElapsed, .23) * state.turnDirection;
  const recover = pulseAmount(state.dodgeRecoveryElapsed, .23);
  const speed01 = clamp01((player.speed || 0) / 5.25);
  const accelerationLean = clamp(acceleration * .0055, -.045, .045);
  const steeringLean = clamp(turnRate * .018 * speed01, -.075, .075);

  applyLocalRotation(bones.hips, -start * .075 + stop * .065 - accelerationLean * .45 + recover * .035, turnPulse * .035, -steeringLean * .4);
  applyLocalRotation(bones.spine, -start * .08 + stop * .09 - accelerationLean * .7 + recover * .045, turnPulse * .055, -steeringLean * .62);
  applyLocalRotation(bones.chest, -start * .055 + stop * .07 - accelerationLean * .55 + recover * .035, turnPulse * .07, -steeringLean * .75);
  applyLocalRotation(bones.head, start * .035 - stop * .045 + accelerationLean * .28 - recover * .025, -turnPulse * .035, steeringLean * .35);

  if (stop > 0) {
    applyLocalRotation(bones.upperLegL, stop * .045, 0, 0);
    applyLocalRotation(bones.upperLegR, stop * .045, 0, 0);
    applyLocalRotation(bones.lowerLegL, -stop * .07, 0, 0);
    applyLocalRotation(bones.lowerLegR, -stop * .07, 0, 0);
  }
}

function applyAttackPoseLayer(state, manager, player) {
  if (player.state !== 'attack') return;
  const p = clamp01(player.stateTime / Math.max(.01, player.stateDuration));
  const combo = player.comboIndex || 0;
  const anticipation = 1 - THREE.MathUtils.smoothstep(p, .05, combo === 2 ? .35 : .25);
  const strikeStart = combo === 2 ? .38 : .25;
  const strikeEnd = combo === 2 ? .73 : .62;
  const strike = Math.sin(Math.PI * clamp01((p - strikeStart) / Math.max(.01, strikeEnd - strikeStart)));
  const follow = THREE.MathUtils.smoothstep(p, strikeEnd, .98);
  const side = combo === 0 ? -1 : combo === 1 ? 1 : -.45;

  applyLocalRotation(state.bones.hips, anticipation * .035 - strike * .035 + follow * .018, side * (-anticipation * .08 + strike * .11), side * strike * .018);
  applyLocalRotation(state.bones.spine, anticipation * .045 - strike * .065 + follow * .025, side * (-anticipation * .12 + strike * .17), side * (-anticipation * .025 + strike * .035));
  applyLocalRotation(state.bones.chest, anticipation * .03 - strike * .075 + follow * .025, side * (-anticipation * .14 + strike * .2), side * (-anticipation * .035 + strike * .045));
  applyLocalRotation(state.bones.head, -anticipation * .018 + strike * .03, side * (anticipation * .05 - strike * .07), -side * strike * .025);

  if (!manager.followThroughSerials.has(manager.attackSerial) && p >= (combo === 2 ? .76 : .66)) {
    manager.followThroughSerials.add(manager.attackSerial);
    manager.events.emit('attack:follow-through', { combo, serial: manager.attackSerial, progress: p });
  }

  const shouldTrail = p >= (combo === 2 ? .19 : .13) && p <= (combo === 2 ? .9 : .86);
  if (shouldTrail !== state.trailActive) {
    state.trailActive = shouldTrail;
    manager.events.emit(shouldTrail ? 'weapon-trail:start' : 'weapon-trail:end', { combo, serial: manager.attackSerial });
  }
}

function applyHitPoseLayer(state, manager, player) {
  if (player.state !== 'hurt' || !manager.hitResponse) return;
  const p = clamp01(player.stateTime / Math.max(.01, player.stateDuration || .28));
  const pulse = Math.sin(Math.PI * p);
  const { front, side } = manager.hitResponse;
  applyLocalRotation(state.bones.hips, front * .055 * pulse, side * .03 * pulse, -side * .055 * pulse);
  applyLocalRotation(state.bones.spine, front * .11 * pulse, side * .055 * pulse, -side * .11 * pulse);
  applyLocalRotation(state.bones.chest, front * .135 * pulse, side * .07 * pulse, -side * .145 * pulse);
  applyLocalRotation(state.bones.head, -front * .08 * pulse, -side * .05 * pulse, side * .1 * pulse);
}

function updateComboCarry(state, manager, player, dt) {
  if (state.lastAttackSerial !== manager.attackSerial && player.state === 'attack') {
    const current = state.animator.action;
    const previous = state.lastAttackAction;
    const gap = nowSeconds() - manager.lastAttackEndedAt;
    if (previous && current && previous !== current && gap < .2) {
      previous.enabled = true;
      previous.paused = true;
      const previousClip = previous.getClip?.();
      if (previousClip?.duration) previous.time = Math.max(previous.time, previousClip.duration * .86);
      state.comboCarry = { action: previous, current, elapsed: 0, duration: .095 };
    }
    state.lastAttackAction = current;
    state.lastAttackSerial = manager.attackSerial;
  }

  if (!state.comboCarry) return;
  const carry = state.comboCarry;
  carry.elapsed += dt;
  const t = clamp01(carry.elapsed / carry.duration);
  const weight = (1 - t) * .24;
  carry.action.enabled = weight > .001;
  carry.action.setEffectiveWeight(weight);
  if (carry.current) carry.current.setEffectiveWeight(1 - weight);
  state.animator.mixer.update(0);
  if (t >= 1) {
    carry.action.setEffectiveWeight(0);
    state.comboCarry = null;
  }
}

function updateDeathPose(state, manager, player) {
  const entry = state.actions.deathPose;
  if (!entry?.action || player.state !== 'dead') {
    if (entry?.action) entry.action.setEffectiveWeight(0);
    return;
  }
  if (player.stateTime < 1.02) return;

  const action = entry.action;
  action.enabled = true;
  action.paused = true;
  action.time = Math.max(0, entry.clip.duration * .95);
  action.setEffectiveWeight(1);
  if (state.animator.action && state.animator.action !== action) state.animator.action.setEffectiveWeight(0);
  state.animator.mixer.update(0);
  manager.deathPoseHeld = true;
}

function updateSecondaryMotion(state, player, dt, speed01, turnRate, acceleration) {
  const time = nowSeconds();
  if (state.cape && state.capeRest) {
    const speedLag = speed01 * .22;
    const accelLag = clamp(acceleration * .008, -.045, .065);
    const attackSnap = player.state === 'attack'
      ? Math.sin(Math.PI * clamp01(player.stateTime / Math.max(.01, player.stateDuration))) * .045
      : 0;
    const flutter = Math.sin(time * 7.2) * (.008 + speed01 * .018);
    const roll = clamp(-turnRate * .01, -.065, .065) + flutter;
    const target = state.capeRest.clone().multiply(new Q().setFromEuler(new E(.02 + speedLag + accelLag + attackSnap, 0, roll, 'XYZ')));
    state.cape.quaternion.slerp(target, 1 - Math.exp(-dt * 8.2));
  }
  if (state.hair && state.hairRest && state.hair !== state.cape) {
    const flutter = Math.sin(time * 9.4 + .8) * (.006 + speed01 * .012);
    const target = state.hairRest.clone().multiply(new Q().setFromEuler(new E(-speed01 * .035, 0, clamp(-turnRate * .005, -.035, .035) + flutter, 'XYZ')));
    state.hair.quaternion.slerp(target, 1 - Math.exp(-dt * 10.5));
  }
}

function refreshGroundMeshes(state, game, player) {
  state.groundMeshes.length = 0;
  game.scene.traverse(node => {
    if (!node.isMesh || !node.visible || !node.geometry) return;
    if (!node.receiveShadow && !node.userData?.groundSurface) return;
    if (isDescendantOf(node, player.root)) return;
    if (game.enemies.some(enemy => isDescendantOf(node, enemy.root))) return;
    if (/shadow|trail|ribbon|telegraph|damage/i.test(node.name || '')) return;
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    if (materials.some(material => material?.transparent && (material.opacity ?? 1) < .45)) return;
    state.groundMeshes.push(node);
  });
}

function probeFootGround(state, game, player, footState) {
  const foot = footState.bone;
  if (!foot || !state.groundMeshes.length) return null;
  const world = foot.getWorldPosition(new V());
  const origin = world.clone();
  origin.y += .72;
  state.raycaster.set(origin, new V(0, -1, 0));
  state.raycaster.near = 0;
  state.raycaster.far = 1.55;
  const hits = state.raycaster.intersectObjects(state.groundMeshes, false);
  const hit = hits.find(candidate => candidate.point.y <= origin.y + .01);
  if (!hit) return null;
  return { y: hit.point.y, point: hit.point.clone(), object: hit.object };
}

function applyWorldDeltaToNode(node, worldDelta, amount = 1) {
  if (!node?.parent || worldDelta.lengthSq() < 1e-10) return;
  const parentQ = node.parent.getWorldQuaternion(new Q()).invert();
  const local = worldDelta.clone().applyQuaternion(parentQ).multiplyScalar(amount);
  node.position.add(local);
}

function updateFootIK(state, manager, game, player, dt) {
  if (!manager.footIKReady) return;
  if (player.state === 'dodge' || player.state === 'dead') {
    for (const footState of [state.foot.left, state.foot.right]) {
      footState.lock = null;
      footState.hit = null;
    }
    manager.footIKActive = false;
    return;
  }
  state.groundRefreshElapsed += dt;
  state.footProbeElapsed += dt;
  if (state.groundRefreshElapsed > 1.0) {
    state.groundRefreshElapsed = 0;
    refreshGroundMeshes(state, game, player);
    manager.groundMeshCount = state.groundMeshes.length;
  }

  const probeInterval = state.groundMeshes.length > 260 ? .085 : .05;
  if (state.footProbeElapsed >= probeInterval) {
    state.footProbeElapsed %= probeInterval;
    state.model.updateMatrixWorld(true);
    state.foot.left.hit = probeFootGround(state, game, player, state.foot.left);
    state.foot.right.hit = probeFootGround(state, game, player, state.foot.right);
  }

  const locomoting = player.speed > .28 && !['attack', 'hurt', 'cast'].includes(player.state);
  const leftWeight = locomoting ? stanceWeight(state.gaitPhase, LEFT_CONTACT) : 1;
  const rightWeight = locomoting ? stanceWeight(state.gaitPhase, RIGHT_CONTACT) : 1;
  const entries = [
    [state.foot.left, leftWeight, 'left'],
    [state.foot.right, rightWeight, 'right'],
  ];

  let lockCorrection = new V();
  let lockWeight = 0;
  state.model.updateMatrixWorld(true);

  for (const [footState, weight, label] of entries) {
    const foot = footState.bone;
    if (!foot) continue;
    const hit = footState.hit;
    const world = foot.getWorldPosition(new V());

    if (hit) {
      footState.groundY = damp(footState.groundY, hit.y, 18, dt);
      const desiredY = footState.groundY + footState.baseClearance;
      const dy = clamp(desiredY - world.y, -.11, .13);
      applyWorldDeltaToNode(foot, new V(0, dy, 0), clamp(weight * .9, .2, .9));
    }

    if (!locomoting) {
      footState.lock = null;
      continue;
    }

    if (weight > .78 && !footState.lock) {
      const contact = hit?.point?.clone() || world.clone();
      footState.lock = new V(contact.x, world.y, contact.z);
      manager.events.emit('foot-lock', { foot: label, position: footState.lock.clone() });
    } else if (weight < .2) {
      footState.lock = null;
    }

    if (footState.lock && weight > .25) {
      const refreshed = foot.getWorldPosition(new V());
      const correction = footState.lock.clone().sub(refreshed);
      correction.y = 0;
      const max = .045;
      correction.x = clamp(correction.x, -max, max);
      correction.z = clamp(correction.z, -max, max);
      lockCorrection.addScaledVector(correction, weight);
      lockWeight += weight;
    }
  }

  if (lockWeight > .001 && state.bones.hips) {
    lockCorrection.multiplyScalar(1 / lockWeight);
    applyWorldDeltaToNode(state.bones.hips, lockCorrection, .72);
  }

  manager.footIKActive = Boolean(state.foot.left.hit || state.foot.right.hit);
  manager.footProbeHz = Math.round(1 / probeInterval);
}

function realignWeaponRibbon(player) {
  const polish = player._animationPolish;
  if (!polish?.ribbon || player.state !== 'attack') return;
  const p = clamp01(player.stateTime / Math.max(.01, player.stateDuration));
  const active = player.root.visible && p > .13 && p < .88;
  if (!active) return;
  if (polish.ribbon.samples.length) polish.ribbon.samples.pop();
  polish.ribbon.update(0, polish.sword, true, player.comboIndex, player.comboIndex === 2 ? 1.35 : 1);
}

function updateDirector(game, manager, dt) {
  const player = game.player;
  const state = initializeRig(game, manager);
  if (!state) return;

  updateLogicalRootY(manager, player);
  resetImportedRoot(state, player);
  const speed = player.speed || 0;
  const acceleration = dt > .0001 ? clamp((speed - state.lastSpeed) / dt, -24, 24) : 0;
  const turnRate = dt > .0001 ? wrapAngle(player.facing - state.lastFacing) / dt : 0;

  detectTransitions(state, manager, player, dt, acceleration, turnRate);
  const locomotion = updateLocomotion(state, manager, player, dt, turnRate, acceleration);
  // Mixer-based combo carry must be sampled before procedural skeletal overlays,
  // otherwise its zero-delta mixer evaluation erases the new strike pose.
  updateComboCarry(state, manager, player, dt);
  applyLocomotionPoseLayer(state, player, acceleration, turnRate);
  applyAttackPoseLayer(state, manager, player);
  applyHitPoseLayer(state, manager, player);
  updateDeathPose(state, manager, player);
  updateSecondaryMotion(state, player, dt, locomotion.speed01 || clamp01(speed / 5.25), turnRate, acceleration);
  state.model.updateMatrixWorld(true);
  updateFootIK(state, manager, game, player, dt);
  state.model.updateMatrixWorld(true);
  realignWeaponRibbon(player);

  state.lastSpeed = speed;
  state.lastFacing = player.facing;
  manager.acceleration = acceleration;
  manager.turnRate = turnRate;
  manager.rootProceduralSuppressed = true;
  manager.actionPoseIsolation = true;
  manager.comboCarryOrdered = true;
}

function installGameplayEventHooks(game, manager) {
  const player = game.player;

  const beginAttack = player.beginAttack.bind(player);
  player.beginAttack = combo => {
    const result = beginAttack(combo);
    if (result) {
      manager.attackSerial++;
      manager.followThroughSerials.delete(manager.attackSerial);
      manager.events.emit('attack:anticipation', { combo: player.comboIndex, serial: manager.attackSerial });
    }
    return result;
  };

  const attackWindow = player.attackWindow.bind(player);
  player.attackWindow = () => {
    const fired = attackWindow();
    if (fired) manager.events.emit('attack:strike', { combo: player.comboIndex, serial: manager.attackSerial, position: player.position.clone() });
    return fired;
  };

  const takeDamage = player.takeDamage.bind(player);
  player.takeDamage = (amount, from) => {
    const response = from
      ? localHitResponse(player.facing, from.x, from.z, player.position.x, player.position.z)
      : { front: 1, side: 0, angle: 0 };
    const result = takeDamage(amount, from);
    if (result) {
      manager.hitResponse = response;
      manager.events.emit('hit-reaction', { ...response, amount, lethal: player.dead });
    }
    return result;
  };

  const beginDodge = player.beginDodge.bind(player);
  player.beginDodge = moveDir => {
    const result = beginDodge(moveDir);
    if (result) manager.events.emit('dodge:start', { direction: player.dodgeDir.clone(), position: player.position.clone() });
    return result;
  };

  const resolveMelee = game._resolveMelee.bind(game);
  game._resolveMelee = (...args) => {
    const before = new Map(game.enemies.map(enemy => [enemy, enemy.hp]));
    const result = resolveMelee(...args);
    const targets = game.enemies.filter(enemy => before.has(enemy) && enemy.hp < before.get(enemy));
    if (targets.length) {
      manager.events.emit('sword:impact', {
        combo: player.comboIndex,
        serial: manager.attackSerial,
        targets,
        position: player.position.clone(),
      });
    }
    return result;
  };
}

function installDefaultEventConsumers(game, manager) {
  const player = game.player;
  manager.events.on('footstep', event => {
    const gain = .014 + event.speed01 * .012;
    const filter = event.foot === 'left' ? 620 : 710;
    player.audio?.noise?.(.028, gain, filter);
  });
  manager.events.on('attack:strike', event => {
    player.audio?.noise?.(.035, event.combo === 2 ? .035 : .024, event.combo === 2 ? 1450 : 1750);
  });
  manager.events.on('weapon-trail:start', () => { manager.weaponTrailEventActive = true; });
  manager.events.on('weapon-trail:end', () => { manager.weaponTrailEventActive = false; });
  manager.events.on('sword:impact', event => { manager.lastImpactCount = event.targets.length; });
}

export function installRowanAnimationDirector(game) {
  const manager = {
    ready: false,
    state: null,
    mode: 'skeletal-follow-gameplay',
    logicalRootY: game.player.root.position.y,
    attackSerial: 0,
    lastAttackEndedAt: -999,
    followThroughSerials: new Set(),
    hitResponse: null,
    eventCounts: {},
    locomotionWeights: { idle: 1, walk: 0, run: 0, turn: 0 },
    locomotionBlendActive: false,
    skeletalRigReady: false,
    secondaryMotionReady: false,
    footIKReady: false,
    footIKActive: false,
    rootProceduralSuppressed: false,
    deathPoseHeld: false,
    weaponTrailEventActive: false,
    lastImpactCount: 0,
    actionPoseIsolation: false,
    comboCarryOrdered: false,
  };
  manager.events = new AnimationEventBus(manager);
  game.rowanAnimationDirector = manager;
  game.rowanAnimationEvents = manager.events;

  installGameplayEventHooks(game, manager);
  installDefaultEventConsumers(game, manager);

  const baseUpdate = game.player.update.bind(game.player);
  game.player.update = (...args) => {
    const result = baseUpdate(...args);
    updateDirector(game, manager, args[0] || 0);
    return result;
  };

  return manager;
}
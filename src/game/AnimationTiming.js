const PLAYER_ATTACK_CONTACT = Object.freeze([0.34, 0.32, 0.52]);

const COMBO_PROFILES = Object.freeze([
  Object.freeze({
    side: -1,
    hipsYaw: 0.15,
    chestYaw: 0.22,
    chestRoll: 0.055,
    weaponPitch: -0.10,
    weaponYaw: 0.16,
    weaponRoll: 0.24,
    guardPitch: 0.045,
    guardRoll: -0.08,
    crouch: 0.025,
    headCounter: 0.055,
  }),
  Object.freeze({
    side: 1,
    hipsYaw: 0.13,
    chestYaw: 0.19,
    chestRoll: -0.11,
    weaponPitch: -0.18,
    weaponYaw: -0.07,
    weaponRoll: -0.20,
    guardPitch: 0.075,
    guardRoll: 0.06,
    crouch: 0.04,
    headCounter: 0.07,
  }),
  Object.freeze({
    side: -0.35,
    hipsYaw: 0.09,
    chestYaw: 0.10,
    chestRoll: 0.02,
    weaponPitch: -0.32,
    weaponYaw: 0.03,
    weaponRoll: 0.08,
    guardPitch: 0.11,
    guardRoll: -0.035,
    crouch: 0.12,
    headCounter: 0.045,
  }),
]);

export function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

export function smoothstep(edge0, edge1, value) {
  if (edge0 === edge1) return value < edge0 ? 0 : 1;
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function attackContactForCombo(combo = 0) {
  return PLAYER_ATTACK_CONTACT[Math.max(0, Math.min(PLAYER_ATTACK_CONTACT.length - 1, combo | 0))];
}

export function asymmetricPulse(progress, center, rise, fall) {
  const p = clamp01(progress);
  if (p <= center) return smoothstep(center - rise, center, p);
  return 1 - smoothstep(center, center + fall, p);
}

export function playerAttackTiming(combo = 0, progress = 0) {
  const p = clamp01(progress);
  const contact = attackContactForCombo(combo);
  const finisher = combo === 2;
  const anticipationEnd = Math.max(.12, contact - (finisher ? .085 : .065));
  const anticipation = 1 - smoothstep(.035, anticipationEnd, p);
  const impact = asymmetricPulse(p, contact, finisher ? .24 : .18, finisher ? .14 : .115);
  const followStart = Math.min(.86, contact + (finisher ? .075 : .055));
  const followThrough = smoothstep(followStart, finisher ? .86 : .78, p) * (1 - smoothstep(finisher ? .88 : .84, 1, p));
  const settle = smoothstep(finisher ? .80 : .74, .98, p);
  return { progress: p, contact, anticipation, impact, followThrough, settle };
}

export function playerComboPose(combo = 0, progress = 0) {
  const timing = playerAttackTiming(combo, progress);
  const profile = COMBO_PROFILES[Math.max(0, Math.min(COMBO_PROFILES.length - 1, combo | 0))];
  const a = timing.anticipation;
  const i = timing.impact;
  const f = timing.followThrough;
  const s = timing.settle;
  const side = profile.side;
  const finisher = combo === 2 ? 1.24 : 1;
  const crouch = profile.crouch * (a * .8 + i * finisher - f * .32);

  return {
    timing,
    hips: {
      x: crouch * .42 - i * .035 * finisher + f * .02,
      y: side * (-a * profile.hipsYaw + i * profile.hipsYaw * 1.18 - f * profile.hipsYaw * .32),
      z: side * (i * .025 - a * .012),
    },
    spine: {
      x: -a * .055 - i * .075 * finisher + f * .04 + s * .012,
      y: side * (-a * profile.chestYaw * .72 + i * profile.chestYaw - f * profile.chestYaw * .28),
      z: side * (-a * profile.chestRoll * .45 + i * profile.chestRoll * .78),
    },
    chest: {
      x: -a * .04 - i * .095 * finisher + f * .045 + s * .015,
      y: side * (-a * profile.chestYaw + i * profile.chestYaw * 1.2 - f * profile.chestYaw * .36),
      z: side * (-a * profile.chestRoll + i * profile.chestRoll * 1.15),
    },
    head: {
      x: a * .025 + i * .035 - f * .018,
      y: -side * (-a * profile.headCounter + i * profile.headCounter * 1.15),
      z: -side * i * .035,
    },
    upperArmR: {
      x: a * profile.weaponPitch + i * profile.weaponPitch * .78 + f * .08,
      y: side * (a * -profile.weaponYaw + i * profile.weaponYaw),
      z: side * (a * -profile.weaponRoll * .55 + i * profile.weaponRoll * finisher - f * profile.weaponRoll * .24),
    },
    lowerArmR: {
      x: -a * .06 + i * .08,
      y: side * i * .06,
      z: side * (a * -.10 + i * .13 * finisher),
    },
    upperArmL: {
      x: a * profile.guardPitch + i * profile.guardPitch * .82,
      y: -side * (a * .045 + i * .035),
      z: side * (a * profile.guardRoll + i * profile.guardRoll * .55),
    },
    lowerArmL: {
      x: a * .035 + i * .05,
      y: -side * i * .035,
      z: -side * (a * .04 + i * .045),
    },
    upperLegL: { x: crouch, y: 0, z: combo === 2 ? -.025 * i : 0 },
    upperLegR: { x: crouch, y: 0, z: combo === 2 ? .025 * i : 0 },
    lowerLegL: { x: -crouch * 1.35, y: 0, z: 0 },
    lowerLegR: { x: -crouch * 1.35, y: 0, z: 0 },
  };
}

export function playerMotionPose({ speed = 0, maxSpeed = 5.25, acceleration = 0, lateralSpeed = 0, turnRate = 0 } = {}) {
  const speed01 = clamp01(speed / Math.max(.01, maxSpeed));
  const accel01 = Math.max(-1, Math.min(1, acceleration / 12));
  const lateral01 = Math.max(-1, Math.min(1, lateralSpeed / Math.max(.01, maxSpeed)));
  const turn01 = Math.max(-1, Math.min(1, turnRate / 8));
  const bank = lateral01 * .65 + turn01 * .55 * speed01;

  return {
    speed01,
    energy: Math.min(1, Math.abs(accel01) * .45 + Math.abs(bank) * .55 + speed01 * .18),
    hips: { x: -speed01 * .018 - accel01 * .032, y: turn01 * .022, z: -bank * .045 },
    spine: { x: -speed01 * .028 - accel01 * .046, y: turn01 * .032, z: -bank * .068 },
    chest: { x: -speed01 * .024 - accel01 * .038, y: turn01 * .038, z: -bank * .082 },
    head: { x: speed01 * .008 + accel01 * .018, y: -turn01 * .022, z: bank * .038 },
  };
}

export function impulsePulse(elapsed, duration = .26) {
  if (!(elapsed >= 0) || elapsed >= duration || duration <= 0) return 0;
  const t = clamp01(elapsed / duration);
  return Math.sin(Math.PI * t) * Math.exp(-1.35 * t);
}

export function hitSpringEnvelope(elapsed, duration = .22) {
  if (!(elapsed >= 0) || elapsed >= duration || duration <= 0) return 0;
  const t = clamp01(elapsed / duration);
  const snap = Math.sin(Math.PI * Math.min(1, t * 1.55));
  return Math.max(0, snap * Math.exp(-1.8 * t));
}

export function velocityPlaybackScale(actualSpeed, referenceSpeed = 2.2, min = .68, max = 1.35) {
  if (!(referenceSpeed > 0)) return 1;
  return Math.max(min, Math.min(max, actualSpeed / referenceSpeed));
}

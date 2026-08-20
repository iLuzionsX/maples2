const PLAYER_ATTACK_CONTACT = Object.freeze([0.34, 0.32, 0.52]);

export function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

export function smoothstep(edge0, edge1, value) {
  if (edge0 === edge1) return value < edge0 ? 0 : 1;
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function attackContactForCombo(combo = 0) {
  const index = Math.max(0, Math.min(PLAYER_ATTACK_CONTACT.length - 1, combo | 0));
  return PLAYER_ATTACK_CONTACT[index];
}

export function asymmetricPulse(progress, center, anticipationWidth, releaseWidth) {
  const p = clamp01(progress);
  const c = clamp01(center);
  if (p <= c) return smoothstep(Math.max(0, c - anticipationWidth), c, p);
  return 1 - smoothstep(c, Math.min(1, c + releaseWidth), p);
}

export function playerAttackTiming(combo = 0, progress = 0) {
  const p = clamp01(progress);
  const contact = attackContactForCombo(combo);
  const finisher = combo === 2;
  const anticipationStart = finisher ? 0.035 : 0.025;
  const anticipationEnd = Math.max(anticipationStart + 0.01, contact - (finisher ? 0.075 : 0.055));
  const anticipation = smoothstep(anticipationStart, anticipationEnd, p) *
    (1 - smoothstep(contact - 0.018, contact + 0.012, p));
  const impact = asymmetricPulse(p, contact, finisher ? 0.12 : 0.09, finisher ? 0.19 : 0.15);
  const followThrough = smoothstep(contact + 0.035, finisher ? 0.79 : 0.66, p) *
    (1 - smoothstep(finisher ? 0.93 : 0.88, 1, p));
  const settle = smoothstep(finisher ? 0.78 : 0.68, 0.98, p);
  return { progress: p, contact, anticipation, impact, followThrough, settle };
}

export function hitSpringEnvelope(elapsed, duration = 0.22) {
  if (elapsed < 0 || duration <= 0 || elapsed >= duration) return 0;
  const t = elapsed / duration;
  const attack = smoothstep(0, 0.12, t);
  const release = 1 - smoothstep(0.12, 1, t);
  return attack * release;
}

export function velocityPlaybackScale(actualSpeed, referenceSpeed = 2.2, min = 0.68, max = 1.35) {
  const reference = Math.max(0.001, Math.abs(referenceSpeed));
  const raw = Math.max(0, actualSpeed) / reference;
  return Math.max(min, Math.min(max, raw));
}

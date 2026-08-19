export function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

export function smoothstep(edge0, edge1, value) {
  if (edge0 === edge1) return value < edge0 ? 0 : 1;
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function wrapAngle(value) {
  return Math.atan2(Math.sin(value), Math.cos(value));
}

export function locomotionWeights(speed, maxSpeed = 5.25, turnWeight = 0) {
  const speed01 = clamp01(speed / Math.max(.001, maxSpeed));
  const locomotion = smoothstep(.035, .17, speed01);
  const run = smoothstep(.47, .82, speed01);
  const turn = clamp01(turnWeight) * locomotion;
  const base = Math.max(0, 1 - turn);
  const idle = (1 - locomotion) * base;
  const moving = locomotion * base;
  const walk = moving * (1 - run);
  const runWeight = moving * run;
  const sum = idle + walk + runWeight + turn;
  if (sum <= .00001) return { idle: 1, walk: 0, run: 0, turn: 0, speed01 };
  return {
    idle: idle / sum,
    walk: walk / sum,
    run: runWeight / sum,
    turn: turn / sum,
    speed01,
  };
}

export function crossedPhase(previous, current, marker) {
  const p = ((previous % 1) + 1) % 1;
  const c = ((current % 1) + 1) % 1;
  const m = ((marker % 1) + 1) % 1;
  if (c >= p) return p < m && c >= m;
  return p < m || c >= m;
}

export function circularPhaseDistance(a, b) {
  const delta = Math.abs((((a - b) + .5) % 1 + 1) % 1 - .5);
  return delta;
}

export function stanceWeight(phase, center, plantedRadius = .105, releaseRadius = .23) {
  const distance = circularPhaseDistance(phase, center);
  if (distance <= plantedRadius) return 1;
  if (distance >= releaseRadius) return 0;
  return 1 - smoothstep(plantedRadius, releaseRadius, distance);
}

export function pulseAmount(elapsed, duration) {
  if (elapsed < 0 || elapsed >= duration || duration <= 0) return 0;
  const t = elapsed / duration;
  return Math.sin(Math.PI * t);
}

export function localHitResponse(playerFacing, sourceX, sourceZ, playerX, playerZ) {
  const dx = sourceX - playerX;
  const dz = sourceZ - playerZ;
  const length = Math.hypot(dx, dz);
  if (length < .00001) return { front: 1, side: 0, angle: 0 };
  const incoming = Math.atan2(dx / length, dz / length);
  const angle = wrapAngle(incoming - playerFacing);
  return {
    front: Math.cos(angle),
    side: Math.sin(angle),
    angle,
  };
}

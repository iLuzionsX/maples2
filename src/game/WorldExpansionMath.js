const EPSILON = 1e-6;

export function pointInCircle(x, z, zone) {
  const dx = x - zone.x;
  const dz = z - zone.z;
  const radius = zone.radius + EPSILON;
  return dx * dx + dz * dz <= radius * radius;
}

export function closestPointOnSegment2D(x, z, ax, az, bx, bz) {
  const abx = bx - ax;
  const abz = bz - az;
  const lengthSq = abx * abx + abz * abz;
  if (lengthSq <= EPSILON) return { x: ax, z: az, t: 0 };
  const t = Math.max(0, Math.min(1, ((x - ax) * abx + (z - az) * abz) / lengthSq));
  return { x: ax + abx * t, z: az + abz * t, t };
}

export function pointInCapsule(x, z, zone) {
  const nearest = closestPointOnSegment2D(x, z, zone.ax, zone.az, zone.bx, zone.bz);
  const dx = x - nearest.x;
  const dz = z - nearest.z;
  const radius = zone.radius + EPSILON;
  return dx * dx + dz * dz <= radius * radius;
}

export function pointInZone(x, z, zone) {
  if (zone.type === 'circle') return pointInCircle(x, z, zone);
  if (zone.type === 'capsule') return pointInCapsule(x, z, zone);
  throw new Error(`Unknown travel-zone type: ${zone.type}`);
}

function closestPointInCircle(x, z, zone) {
  const dx = x - zone.x;
  const dz = z - zone.z;
  const distance = Math.hypot(dx, dz);
  if (distance <= zone.radius || distance <= EPSILON) return { x, z, distance: 0 };
  const scale = zone.radius / distance;
  return {
    x: zone.x + dx * scale,
    z: zone.z + dz * scale,
    distance: distance - zone.radius,
  };
}

function closestPointInCapsule(x, z, zone) {
  const spine = closestPointOnSegment2D(x, z, zone.ax, zone.az, zone.bx, zone.bz);
  const dx = x - spine.x;
  const dz = z - spine.z;
  const distance = Math.hypot(dx, dz);
  if (distance <= zone.radius || distance <= EPSILON) return { x, z, distance: 0 };
  const scale = zone.radius / distance;
  return {
    x: spine.x + dx * scale,
    z: spine.z + dz * scale,
    distance: distance - zone.radius,
  };
}

export function closestPointInZone(x, z, zone) {
  if (zone.type === 'circle') return closestPointInCircle(x, z, zone);
  if (zone.type === 'capsule') return closestPointInCapsule(x, z, zone);
  throw new Error(`Unknown travel-zone type: ${zone.type}`);
}

export function clampPointToTravelNetwork(x, z, zones) {
  if (!Array.isArray(zones) || zones.length === 0) return { x, z, zoneIndex: -1, clamped: false };

  for (let i = 0; i < zones.length; i++) {
    if (pointInZone(x, z, zones[i])) return { x, z, zoneIndex: i, clamped: false };
  }

  let best = null;
  let bestIndex = -1;
  for (let i = 0; i < zones.length; i++) {
    const candidate = closestPointInZone(x, z, zones[i]);
    if (!best || candidate.distance < best.distance) {
      best = candidate;
      bestIndex = i;
    }
  }

  return { x: best.x, z: best.z, zoneIndex: bestIndex, clamped: true };
}

export function pushPointOutsideCircle(x, z, blocker, padding = 0) {
  const radius = blocker.radius + padding;
  const dx = x - blocker.x;
  const dz = z - blocker.z;
  const distance = Math.hypot(dx, dz);
  if (distance + EPSILON >= radius) return { x, z, pushed: false };

  if (distance <= EPSILON) {
    return { x: blocker.x + radius, z: blocker.z, pushed: true };
  }

  const scale = radius / distance;
  return {
    x: blocker.x + dx * scale,
    z: blocker.z + dz * scale,
    pushed: true,
  };
}

export function applyCircularBlockers(x, z, blockers, padding = 0) {
  let px = x;
  let pz = z;
  let pushed = false;
  for (const blocker of blockers || []) {
    const result = pushPointOutsideCircle(px, pz, blocker, padding);
    px = result.x;
    pz = result.z;
    pushed ||= result.pushed;
  }
  return { x: px, z: pz, pushed };
}

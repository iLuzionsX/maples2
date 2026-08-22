import * as THREE from 'three';

const EPSILON = .002;

function pushOutAabb(position, blocker, radius) {
  const dx = position.x - blocker.cx;
  const dz = position.z - blocker.cz;
  const px = blocker.hx + radius - Math.abs(dx);
  const pz = blocker.hz + radius - Math.abs(dz);
  if (px <= 0 || pz <= 0) return false;
  if (px < pz) position.x += (dx < 0 ? -1 : 1) * (px + EPSILON);
  else position.z += (dz < 0 ? -1 : 1) * (pz + EPSILON);
  return true;
}

function pushOutCircle(position, blocker, radius) {
  let dx = position.x - blocker.x;
  let dz = position.z - blocker.z;
  const combined = blocker.radius + radius;
  const distanceSq = dx*dx + dz*dz;
  if (distanceSq >= combined*combined) return false;
  if (distanceSq < 1e-8) { dx = 1; dz = 0; }
  const distance = Math.sqrt(dx*dx + dz*dz);
  const push = combined - distance + EPSILON;
  position.x += dx / distance * push;
  position.z += dz / distance * push;
  return true;
}

function boxBlocker(model) {
  model.updateWorldMatrix(true, true);
  const box = new THREE.Box3().setFromObject(model);
  if (box.isEmpty()) return null;
  const width = box.max.x - box.min.x;
  const depth = box.max.z - box.min.z;
  if (!Number.isFinite(width) || !Number.isFinite(depth) || width < .1 || depth < .1) return null;
  return {
    kind: 'box',
    cx: (box.min.x + box.max.x) * .5,
    cz: (box.min.z + box.max.z) * .5,
    hx: Math.max(.18, width * .43),
    hz: Math.max(.18, depth * .43),
    source: model.name || 'town-environment'
  };
}

export function installTownExpansionCollisions(town) {
  if (!town?.presentation?.ready || town.presentationCollision) return town?.presentationCollision || null;
  const blockers = [];

  for (const model of town.presentation.environment || []) {
    if (/Torch|Glade_Arch/i.test(model.name || '')) continue;
    const blocker = boxBlocker(model);
    if (blocker) blockers.push(blocker);
  }

  for (const model of town.presentation.nature || []) {
    if (model.userData?.kind !== 'pine') continue;
    blockers.push({
      kind: 'circle',
      x: model.position.x,
      z: model.position.z,
      radius: .42 * Math.max(.75, model.scale.x || 1),
      source: 'expanded-pine'
    });
  }

  const state = town.presentationCollision = { blockers, pushes: 0 };
  const originalUpdate = town.update.bind(town);
  town.update = function updateTownWithExpansionCollisions(dt) {
    const result = originalUpdate(dt);
    const player = this.game.player;
    if (!player || player.position.z <= 9.4) return result;
    const radius = player.radius || .38;
    for (let pass = 0; pass < 2; pass++) {
      for (const blocker of blockers) {
        const pushed = blocker.kind === 'box'
          ? pushOutAabb(player.position, blocker, radius)
          : pushOutCircle(player.position, blocker, radius);
        if (pushed) state.pushes++;
      }
    }
    return result;
  };

  town.__expandedAssetCollisions = blockers.length > 0;
  return state;
}

import * as THREE from 'three';

const _box = new THREE.Box3();
const _point = new THREE.Vector3();

export function pushCircle(pos, radius, block) {
  const dx = pos.x - block.x;
  const dz = pos.z - block.z;
  const min = radius + block.radius;
  const distSq = dx * dx + dz * dz;
  if (distSq >= min * min) return false;
  if (distSq < 1e-8) {
    pos.x += min;
    return true;
  }
  const dist = Math.sqrt(distSq);
  const scale = (min - dist) / dist;
  pos.x += dx * scale;
  pos.z += dz * scale;
  return true;
}

export function pushBox(pos, radius, block) {
  const closestX = Math.min(block.maxX, Math.max(block.minX, pos.x));
  const closestZ = Math.min(block.maxZ, Math.max(block.minZ, pos.z));
  let dx = pos.x - closestX;
  let dz = pos.z - closestZ;
  const distSq = dx * dx + dz * dz;
  if (distSq >= radius * radius) return false;
  if (distSq > 1e-8) {
    const dist = Math.sqrt(distSq);
    const push = radius - dist;
    pos.x += (dx / dist) * push;
    pos.z += (dz / dist) * push;
    return true;
  }
  const left = pos.x - block.minX;
  const right = block.maxX - pos.x;
  const down = pos.z - block.minZ;
  const up = block.maxZ - pos.z;
  const min = Math.min(left, right, down, up);
  if (min === left) pos.x = block.minX - radius;
  else if (min === right) pos.x = block.maxX + radius;
  else if (min === down) pos.z = block.minZ - radius;
  else pos.z = block.maxZ + radius;
  return true;
}

export function overlaps(blockers, x, z, radius) {
  const pos = { x, z };
  for (const block of blockers) {
    if (block.radius != null) {
      const dx = x - block.x;
      const dz = z - block.z;
      const min = radius + block.radius;
      if (dx * dx + dz * dz < min * min) return true;
    } else if (pushBox(pos, radius, block)) {
      return true;
    }
  }
  return false;
}

function resolve(blockers, pos, radius) {
  for (let pass = 0; pass < 2; pass++) {
    for (const block of blockers) {
      if (block.radius != null) pushCircle(pos, radius, block);
      else pushBox(pos, radius, block);
    }
  }
}

export function separateBoth(a, aRadius, b, bRadius) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  const min = aRadius + bRadius;
  const distSq = dx * dx + dz * dz;
  if (distSq >= min * min) return false;
  if (distSq < 1e-8) {
    a.x -= min * 0.5;
    b.x += min * 0.5;
    return true;
  }
  const dist = Math.sqrt(distSq);
  const push = (min - dist) / dist * 0.5;
  a.x += dx * push;
  a.z += dz * push;
  b.x -= dx * push;
  b.z -= dz * push;
  return true;
}

export function separate(pos, radius, other, otherRadius, amount = 1) {
  const dx = pos.x - other.x;
  const dz = pos.z - other.z;
  const min = radius + otherRadius;
  const distSq = dx * dx + dz * dz;
  if (distSq >= min * min) return false;
  if (distSq < 1e-8) {
    pos.x += min * amount;
    return true;
  }
  const dist = Math.sqrt(distSq);
  const push = ((min - dist) / dist) * amount;
  pos.x += dx * push;
  pos.z += dz * push;
  return true;
}

function addCircle(blockers, x, z, radius) {
  if (radius > 0.12) blockers.push({ x, z, radius });
}

function addOffsetCircles(blockers, object, offsets) {
  object.updateWorldMatrix(true, false);
  for (const [x, z, radius] of offsets) {
    _point.set(x, 0, z);
    object.localToWorld(_point);
    const scale = Math.max(Math.abs(object.scale.x), Math.abs(object.scale.z));
    addCircle(blockers, _point.x, _point.z, radius * scale);
  }
}

export function installCollision(game) {
  const decor = game.world.decor;
  const blockers = [];
  decor.updateMatrixWorld(true);

  decor.traverse(object => {
    if (!object.userData) return;
    if (object.userData.solidOffsets) {
      addOffsetCircles(blockers, object, object.userData.solidOffsets);
      return;
    }
    if (object.userData.solidBox) {
      _box.setFromObject(object);
      const height = _box.max.y - _box.min.y;
      if (height < 0.45) return;
      const inset = 0.12;
      const minX = _box.min.x + inset;
      const maxX = _box.max.x - inset;
      const minZ = _box.min.z + inset;
      const maxZ = _box.max.z - inset;
      if (maxX > minX && maxZ > minZ) blockers.push({ minX, maxX, minZ, maxZ });
      return;
    }
    if (object.userData.solidRadius > 0) {
      object.getWorldPosition(_point);
      addCircle(blockers, _point.x, _point.z, object.userData.solidRadius);
    }
  });

  const collision = {
    blockers,
    resolve(pos, radius) { resolve(blockers, pos, radius); },
    separate(pos, radius, other, otherRadius, amount) { separate(pos, radius, other, otherRadius, amount); },
    separateBoth(a, aRadius, b, bRadius) { separateBoth(a, aRadius, b, bRadius); },
    overlaps(x, z, radius) { return overlaps(blockers, x, z, radius); },
  };
  game.world.collision = collision;
  return collision;
}

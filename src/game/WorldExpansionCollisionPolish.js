import * as THREE from 'three';
import {
  clampPointToTravelNetwork,
  applyEnvironmentBlockers,
} from './WorldExpansionMath.js';

const _worldPoint = new THREE.Vector3();
const _worldPosition = new THREE.Vector3();
const _worldQuaternion = new THREE.Quaternion();
const _worldScale = new THREE.Vector3();

function landmarkCircleBlockers(landmark) {
  const result = [];
  const colliders = landmark.userData?.colliders || [];
  if (!colliders.length) return result;

  landmark.updateWorldMatrix(true, true);
  landmark.matrixWorld.decompose(_worldPosition, _worldQuaternion, _worldScale);
  const radiusScale = Math.max(Math.abs(_worldScale.x), Math.abs(_worldScale.z));

  for (const collider of colliders) {
    if (collider.type !== 'circle') continue;
    _worldPoint.set(collider.x || 0, 0, collider.z || 0).applyMatrix4(landmark.matrixWorld);
    result.push({
      type: 'circle',
      x: _worldPoint.x,
      z: _worldPoint.z,
      radius: collider.radius * radiusScale,
      source: landmark.name || landmark.userData?.sculptSpec || 'landmark',
    });
  }

  return result;
}

function findFenWater(root) {
  let water = null;
  root?.traverse(node => {
    if (!water && node.isMesh && node.userData?.worldExpansionWater) water = node;
  });
  return water;
}

function waterEllipseBlocker(water) {
  if (!water) return null;
  water.updateWorldMatrix(true, true);
  const box = new THREE.Box3().setFromObject(water);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  if (!Number.isFinite(size.x) || !Number.isFinite(size.z) || size.x <= 0 || size.z <= 0) return null;

  // Glassmere's pool is deliberately elliptical. Using the rendered bounds keeps
  // collision aligned with the shoreline instead of approximating it with a circle.
  return {
    type: 'ellipse',
    x: center.x,
    z: center.z,
    radiusX: size.x * .5,
    radiusZ: size.z * .5,
    rotation: 0,
    source: 'GlassmereFenWater',
  };
}

export function installWorldExpansionCollisionPolish(game) {
  if (game.worldExpansionCollisionPolish) return game.worldExpansionCollisionPolish;
  const expansion = game.worldExpansion;
  if (!expansion?.root) return null;

  const manager = game.worldExpansionCollisionPolish = {
    ready: false,
    originalBlockers: [...(expansion.blockers || [])],
    landmarkBlockers: [],
    waterBlocker: null,
  };

  const blockers = [];
  const waterBlocker = waterEllipseBlocker(findFenWater(expansion.root));
  if (waterBlocker) {
    blockers.push(waterBlocker);
    manager.waterBlocker = waterBlocker;
  }

  for (const landmark of expansion.landmarks || []) {
    const derived = landmarkCircleBlockers(landmark);
    blockers.push(...derived);
    manager.landmarkBlockers.push(...derived);
  }

  expansion.blockers = blockers;

  const previousClampPlayer = game.world.clampPlayerToWorld?.bind(game.world);
  const zones = expansion.regions || game.world.playerTravelZones || [];
  game.world.playerTravelZones = zones;
  game.world.clampPlayerToWorld = pos => {
    const clamped = clampPointToTravelNetwork(pos.x, pos.z, zones);
    const blocked = applyEnvironmentBlockers(clamped.x, clamped.z, expansion.blockers, .34);
    const finalPoint = clampPointToTravelNetwork(blocked.x, blocked.z, zones);
    pos.x = finalPoint.x;
    pos.z = finalPoint.z;
  };
  game.world.clampPlayerToWorld.previousClamp = previousClampPlayer;

  expansion.notes?.push('Landmark collision is derived from img2threejs collider metadata after world transforms.');
  expansion.notes?.push('Glassmere water collision follows the rendered elliptical shoreline.');
  manager.ready = true;
  return manager;
}

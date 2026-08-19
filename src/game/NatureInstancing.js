import * as THREE from 'three';

const _inverseRoot = new THREE.Matrix4();
const _instanceMatrix = new THREE.Matrix4();

function canInstance(mesh) {
  if (!mesh?.isMesh || mesh.isSkinnedMesh || mesh.isInstancedMesh || !mesh.visible) return false;
  if (!mesh.geometry || mesh.geometry.morphAttributes && Object.values(mesh.geometry.morphAttributes).some(list => list?.length)) return false;
  const material = mesh.material;
  if (!material || Array.isArray(material)) return false;
  if (material.transparent || material.opacity < .999 || material.blending !== THREE.NormalBlending) return false;
  return true;
}

function collectSlots(root) {
  root.updateMatrixWorld(true);
  _inverseRoot.copy(root.matrixWorld).invert();
  const slots = [];
  root.traverse(mesh => {
    if (!canInstance(mesh)) return;
    slots.push({
      mesh,
      geometry: mesh.geometry,
      material: mesh.material,
      relative: new THREE.Matrix4().multiplyMatrices(_inverseRoot, mesh.matrixWorld),
      castShadow: mesh.castShadow,
      receiveShadow: mesh.receiveShadow,
      renderOrder: mesh.renderOrder,
      layers: mesh.layers.mask,
    });
  });
  return slots;
}

function slotCompatible(a, b) {
  return Boolean(a && b &&
    a.geometry === b.geometry &&
    a.material === b.material &&
    a.renderOrder === b.renderOrder &&
    a.layers === b.layers);
}

function updateBatchMatrices(batchRecord) {
  const { batch, entries } = batchRecord;
  for (let i = 0; i < entries.length; i++) {
    const { root, relative } = entries[i];
    root.updateMatrix();
    _instanceMatrix.multiplyMatrices(root.matrix, relative);
    batch.setMatrixAt(i, _instanceMatrix);
  }
  batch.instanceMatrix.needsUpdate = true;
}

export async function installNatureInstancing(game) {
  if (game.natureInstancingManager) return game.natureInstancingManager;

  const manager = game.natureAssetManager;
  const result = game.natureInstancingManager = {
    ready: false,
    batches: [],
    sourceMeshesHidden: 0,
    estimatedDrawCallsSaved: 0,
    skippedSlots: 0,
  };

  if (!manager?.ready || !manager.instances?.length) {
    result.ready = true;
    return result;
  }

  // ShowcaseQualityGate installs its final wind wrapper on the frame after nature becomes ready.
  // Wait one frame so our matrix upload runs after every authored wind layer has updated the roots.
  await new Promise(resolve => requestAnimationFrame(resolve));

  const decor = game.world.decor;
  const byKind = new Map();
  for (const root of manager.instances) {
    const kind = root.userData.kind || 'nature';
    if (!byKind.has(kind)) byKind.set(kind, []);
    byKind.get(kind).push(root);
  }

  for (const [kind, roots] of byKind) {
    const rootSlots = roots.map(collectSlots);
    const slotCount = Math.max(0, ...rootSlots.map(slots => slots.length));

    for (let slotIndex = 0; slotIndex < slotCount; slotIndex++) {
      const exemplar = rootSlots[0]?.[slotIndex];
      if (!exemplar) { result.skippedSlots++; continue; }

      const groups = new Map();
      let compatible = true;
      for (let i = 0; i < roots.length; i++) {
        const slot = rootSlots[i]?.[slotIndex];
        if (!slotCompatible(exemplar, slot)) { compatible = false; break; }
        const key = `${slot.castShadow ? 1 : 0}|${slot.receiveShadow ? 1 : 0}`;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push({ root: roots[i], slot });
      }
      if (!compatible) { result.skippedSlots++; continue; }

      for (const entriesForFlags of groups.values()) {
        if (entriesForFlags.length < 2) continue;
        const first = entriesForFlags[0].slot;
        const batch = new THREE.InstancedMesh(first.geometry, first.material, entriesForFlags.length);
        batch.name = `PerformanceNature_${kind}_${slotIndex}_${entriesForFlags.length}`;
        batch.castShadow = first.castShadow;
        batch.receiveShadow = first.receiveShadow;
        batch.renderOrder = first.renderOrder;
        batch.layers.mask = first.layers;
        batch.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        batch.userData.performanceNatureBatch = true;
        decor.add(batch);

        const record = {
          batch,
          entries: entriesForFlags.map(({ root, slot }) => ({ root, relative: slot.relative })),
        };
        updateBatchMatrices(record);
        batch.computeBoundingBox();
        batch.computeBoundingSphere();
        result.batches.push(record);

        for (const { slot } of entriesForFlags) {
          slot.mesh.visible = false;
          result.sourceMeshesHidden++;
        }
        result.estimatedDrawCallsSaved += entriesForFlags.length - 1;
      }
    }
  }

  if (result.batches.length) {
    const baseWorldUpdate = game.world.update.bind(game.world);
    game.world.update = dt => {
      baseWorldUpdate(dt);
      for (const record of result.batches) updateBatchMatrices(record);
    };
  }

  result.ready = true;
  console.info('[Maples nature instancing]', {
    batches: result.batches.length,
    sourceMeshesHidden: result.sourceMeshesHidden,
    estimatedDrawCallsSaved: result.estimatedDrawCallsSaved,
    skippedSlots: result.skippedSlots,
  });
  return result;
}

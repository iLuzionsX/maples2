import * as THREE from 'three';

const _inverseRoot = new THREE.Matrix4();
const _instanceMatrix = new THREE.Matrix4();
const _projection = new THREE.Matrix4();
const _frustum = new THREE.Frustum();

function canInstance(mesh) {
  if (!mesh?.isMesh || mesh.isSkinnedMesh || mesh.isInstancedMesh || !mesh.visible) return false;
  if (!mesh.geometry || mesh.geometry.morphAttributes && Object.values(mesh.geometry.morphAttributes).some(list => list?.length)) return false;
  const material = mesh.material;
  if (!material || Array.isArray(material) || material.visible === false) return false;
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
      alwaysVisible: mesh.frustumCulled === false,
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

function updateBatchMatrices(batchRecord, frustum = null) {
  const { batch, entries } = batchRecord;
  let visibleCount = 0;

  for (let i = 0; i < entries.length; i++) {
    const { root, relative, mesh, alwaysVisible } = entries[i];
    if (frustum && !alwaysVisible && !frustum.intersectsObject(mesh)) continue;
    _instanceMatrix.multiplyMatrices(root.matrix, relative);
    batch.setMatrixAt(visibleCount++, _instanceMatrix);
  }

  batch.count = visibleCount;
  batch.visible = visibleCount > 0;
  if (visibleCount > 0) batch.instanceMatrix.needsUpdate = true;
  return visibleCount;
}

export async function installNatureInstancing(game) {
  if (game.natureInstancingManager) return game.natureInstancingManager;

  const manager = game.natureAssetManager;
  const result = game.natureInstancingManager = {
    ready: false,
    batches: [],
    roots: [],
    sourceMeshesHidden: 0,
    estimatedDrawCallsSaved: 0,
    skippedSlots: 0,
    visibleInstances: 0,
    culledInstances: 0,
    sync() {
      if (!result.batches.length) return;

      // Every nature root can feed multiple mesh-slot batches. Update each root matrix
      // once per frame instead of repeating the same work for every slot.
      for (const root of result.roots) root.updateMatrix();

      _projection.multiplyMatrices(game.camera.projectionMatrix, game.camera.matrixWorldInverse);
      _frustum.setFromProjectionMatrix(_projection);

      let visibleInstances = 0;
      let totalInstances = 0;
      for (const record of result.batches) {
        totalInstances += record.entries.length;
        visibleInstances += updateBatchMatrices(record, _frustum);
      }
      result.visibleInstances = visibleInstances;
      result.culledInstances = totalInstances - visibleInstances;
    },
  };

  if (!manager?.ready || !manager.instances?.length) {
    result.ready = true;
    return result;
  }

  // ShowcaseQualityGate installs its final wind wrapper on the frame after nature becomes ready.
  // Wait one frame so all authored wind layers are present before the source meshes are batched.
  await new Promise(resolve => requestAnimationFrame(resolve));

  const decor = game.world.decor;
  const byKind = new Map();
  result.roots = [...manager.instances];
  for (const root of result.roots) {
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
        // Off-screen casters can still affect visible pixels. Leave shadow-casting
        // meshes on Three.js' native path so instancing never changes shadow coverage.
        if (first.castShadow) continue;

        const batch = new THREE.InstancedMesh(first.geometry, first.material, entriesForFlags.length);
        batch.name = `PerformanceNature_${kind}_${slotIndex}_${entriesForFlags.length}`;
        batch.castShadow = false;
        batch.receiveShadow = first.receiveShadow;
        batch.renderOrder = first.renderOrder;
        batch.layers.mask = first.layers;
        // We compact the batch using the exact source-mesh frustum test before every render.
        batch.frustumCulled = false;
        batch.instanceMatrix.setUsage(THREE.StreamDrawUsage);
        batch.userData.performanceNatureBatch = true;
        decor.add(batch);

        const record = {
          batch,
          entries: entriesForFlags.map(({ root, slot }) => ({
            root,
            relative: slot.relative,
            mesh: slot.mesh,
            alwaysVisible: slot.alwaysVisible,
          })),
        };
        for (const root of roots) root.updateMatrix();
        updateBatchMatrices(record);
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
    // Sync immediately before rendering. This preserves every authored wind/root transform,
    // while per-source frustum tests preserve the original off-screen triangle culling.
    const previousSceneBeforeRender = game.scene.onBeforeRender;
    game.scene.onBeforeRender = function (...args) {
      previousSceneBeforeRender?.apply(this, args);
      result.sync();
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

import * as THREE from 'three';

const identityMatrix = new THREE.Matrix4();

export function optimizeSolStaticCulling(game) {
  const records = game.performancePass?.staticBatches || [];
  let cached = 0;

  for (const record of records) {
    for (const entry of record.entries || []) {
      const mesh = entry.mesh;
      if (!mesh?.isMesh || entry.solStaticCullProxy) continue;
      if (!mesh.geometry?.boundingSphere) mesh.geometry?.computeBoundingSphere?.();
      if (!mesh.geometry?.boundingSphere) continue;

      // PerformancePass' source meshes are static and hidden after batching. Cache the
      // exact world-space sphere Three.js would derive on every Frustum.intersectsObject
      // call, then give that culling-only proxy an identity transform. This removes a
      // matrix/sphere transform per source instance per render without changing which
      // instances pass the frustum test.
      const worldSphere = mesh.geometry.boundingSphere.clone().applyMatrix4(mesh.matrixWorld);
      entry.solStaticCullProxy = mesh;
      entry.mesh = {
        boundingSphere: worldSphere,
        matrixWorld: identityMatrix,
      };
      cached++;
    }
  }

  if (game.solPerformancePass) game.solPerformancePass.cachedStaticCullSpheres = cached;
  return cached;
}

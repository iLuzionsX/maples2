import * as THREE from 'three';

const Y_AXIS = new THREE.Vector3(0, 1, 0);

export function installTownPerformanceGuard(town) {
  if (!town || town.__allocationStableMatrices) return town;

  // TownSystem intentionally owns the matrices; replace only its hot helper so
  // the 16-resident animation pass reuses the scratch objects it already owns.
  town._setPart = function setTownNpcPart(inst, index, npc, localX, localY, localZ, scaleX=1, scaleY=1, scaleZ=1, extraYaw=0) {
    const yaw = npc.facing + extraYaw;
    this._tmpOffset.set(localX, localY, localZ).applyAxisAngle(Y_AXIS, yaw).add(npc.position);
    this._tmp.position.copy(this._tmpOffset);
    this._tmp.rotation.set(0, yaw, 0);
    this._tmp.scale.set(scaleX, scaleY, scaleZ);
    this._tmp.updateMatrix();
    inst.setMatrixAt(index, this._tmp.matrix);
  };

  town.__allocationStableMatrices = true;
  return town;
}

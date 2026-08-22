import * as THREE from 'three';
import { isTownSafeZone } from './TownData.js';

const Y_AXIS = new THREE.Vector3(0, 1, 0);
const WALLET_KEY = 'maples.town.coins.v1';
const STARTER_COINS = 75;

export function installTownRuntimeGuards(town) {
  if (!town || town.__runtimeGuardsInstalled) return town;

  // TownSystem owns the matrices; replace only its hot helper so the 16-resident
  // animation pass reuses scratch objects instead of allocating vectors per limb.
  town._setPart = function setTownNpcPart(inst, index, npc, localX, localY, localZ, scaleX=1, scaleY=1, scaleZ=1, extraYaw=0) {
    const yaw = npc.facing + extraYaw;
    this._tmpOffset.set(localX, localY, localZ).applyAxisAngle(Y_AXIS, yaw).add(npc.position);
    this._tmp.position.copy(this._tmpOffset);
    this._tmp.rotation.set(0, yaw, 0);
    this._tmp.scale.set(scaleX, scaleY, scaleZ);
    this._tmp.updateMatrix();
    inst.setMatrixAt(index, this._tmp.matrix);
  };

  // The base reader converts a missing localStorage value through Number(null).
  // Correct only the true first-run case; an intentionally spent-down zero stays zero.
  try {
    if (localStorage.getItem(WALLET_KEY) === null && town.coins === 0) {
      town.coins = STARTER_COINS;
      localStorage.setItem(WALLET_KEY, String(STARTER_COINS));
      town._updateCoinUI();
    }
  } catch {}

  // Opening a blocking modal in the hostile glade would remove the player's
  // controls while enemies continue simulating. Settings remain available on
  // the title screen and anywhere inside the warded town, never mid-encounter.
  const openSettings = town.openSettings.bind(town);
  town.openSettings = function openTownSettingsSafely() {
    if (this.game.started && !isTownSafeZone(this.game.player.position)) {
      this.game.toast?.('Return to Lumenwood to change settings.', 1.4);
      return false;
    }
    openSettings();
    return true;
  };

  town.__allocationStableMatrices = true;
  town.__runtimeGuardsInstalled = true;
  return town;
}

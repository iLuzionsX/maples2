import * as THREE from 'three';
import { isTownSafeZone } from './TownData.js';

const Y_AXIS = new THREE.Vector3(0, 1, 0);
const WALLET_KEY = 'maples.town.coins.v1';
const STARTER_COINS = 75;
const GLADE_RADIUS = 28;
const TOWN_MIN_Z = 9.4;
const TOWN_MAX_Z = 33.15;
const TOWN_HALF_WIDTH = 18.2;

// cx, cz, halfWidth, halfDepth. These stay deliberately simple and cheap:
// town buildings are stylized box footprints and do not need a physics engine.
const TOWN_BLOCKERS = [
  [-11.8,18.5,2.65,2.30],[11.8,18.2,2.65,2.30],
  [-11.8,25.7,2.65,2.30],[11.8,25.5,2.65,2.30],
  [-6.4,30.5,2.65,2.30],[6.4,30.5,2.65,2.30],
  [-16.2,14.7,2.05,1.95],[16.0,14.9,2.05,1.95],
  [-16.0,29.8,2.05,1.95],[16.1,29.5,2.05,1.95],
  [-5.6,20.7,1.25,.68],[5.8,20.5,1.25,.68],[-5.4,24.1,1.25,.68],
  [-3.25,10.8,.58,.65],[3.25,10.8,.58,.65]
];

function pushOutAabb(position, cx, cz, halfX, halfZ, radius) {
  const dx = position.x - cx;
  const dz = position.z - cz;
  const px = halfX + radius - Math.abs(dx);
  const pz = halfZ + radius - Math.abs(dz);
  if (px <= 0 || pz <= 0) return false;
  if (px < pz) position.x += (dx < 0 ? -1 : 1) * px;
  else position.z += (dz < 0 ? -1 : 1) * pz;
  return true;
}

function pushOutCircle(position, cx, cz, combinedRadius) {
  let dx = position.x - cx;
  let dz = position.z - cz;
  const d2 = dx*dx + dz*dz;
  if (d2 >= combinedRadius*combinedRadius) return false;
  if (d2 < 1e-8) { dx = 1; dz = 0; }
  const d = Math.sqrt(dx*dx + dz*dz);
  const push = combinedRadius - d;
  position.x += dx / d * push;
  position.z += dz / d * push;
  return true;
}

function resolveTownCollisions(town) {
  const player = town.game.player;
  if (!player) return;
  const position = player.position;
  if (position.z < TOWN_MIN_Z || Math.abs(position.x) > 19.8) return;
  const radius = player.radius || .38;

  // Two passes handle corners where resolving one blocker enters another.
  for (let pass=0; pass<2; pass++) {
    for (const [cx,cz,hx,hz] of TOWN_BLOCKERS) pushOutAabb(position,cx,cz,hx,hz,radius);
    pushOutCircle(position,0,22.1,2.25+radius);
  }

  // Residents remain tangible without expensive rigid-body simulation.
  for (const npc of town.npcs) pushOutCircle(position,npc.position.x,npc.position.z,.38+radius);
}

function installAuthoredWorldBounds(town) {
  const world = town.game.world;
  world.clampToArena = function clampToGladeOrTown(position) {
    if (position.z > TOWN_MIN_Z) {
      position.x = THREE.MathUtils.clamp(position.x, -TOWN_HALF_WIDTH, TOWN_HALF_WIDTH);
      position.z = Math.min(position.z, TOWN_MAX_Z);
      return;
    }
    const distance = Math.hypot(position.x, position.z);
    if (distance > GLADE_RADIUS) {
      const scale = GLADE_RADIUS / distance;
      position.x *= scale;
      position.z *= scale;
    }
  };
}

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

  // The gate ward is a true gameplay boundary, including the boss. Thornmaw
  // still spawns and fights normally in the southern glade but cannot be kited
  // through the populated square.
  town._protectTown = function protectLumenwood() {
    for (const enemy of this.game.enemies) {
      if (enemy.dead) continue;
      if (enemy.position.z > 9) {
        enemy.position.z = 9;
        if (enemy.velocity?.z > 0) enemy.velocity.z = 0;
      }
    }
  };

  installAuthoredWorldBounds(town);

  const updateTown = town.update.bind(town);
  town.update = function updateTownWithCollisions(dt) {
    if (this.game.started) resolveTownCollisions(this);
    updateTown(dt);
  };

  town.__allocationStableMatrices = true;
  town.__townCollisions = true;
  town.__authoredWorldBounds = true;
  town.__runtimeGuardsInstalled = true;
  return town;
}

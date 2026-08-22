import * as THREE from 'three';
import { isTownSafeZone } from './TownData.js';

const Y_AXIS = new THREE.Vector3(0, 1, 0);
const WALLET_KEY = 'maples.town.coins.v1';
const STARTER_COINS = 75;
const GLADE_RADIUS = 28;
const TOWN_MIN_Z = 9.4;
const TOWN_MAX_Z = 33.15;
const TOWN_HALF_WIDTH = 18.2;
const COLLISION_EPSILON = 0.002;
const MODAL_HOSTILE_MARGIN = 1.5;

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
  if (px < pz) position.x += (dx < 0 ? -1 : 1) * (px + COLLISION_EPSILON);
  else position.z += (dz < 0 ? -1 : 1) * (pz + COLLISION_EPSILON);
  return true;
}

function pushOutCircle(position, cx, cz, combinedRadius) {
  let dx = position.x - cx;
  let dz = position.z - cz;
  const d2 = dx*dx + dz*dz;
  if (d2 >= combinedRadius*combinedRadius) return false;
  if (d2 < 1e-8) { dx = 1; dz = 0; }
  const d = Math.sqrt(dx*dx + dz*dz);
  const push = combinedRadius - d + COLLISION_EPSILON;
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

function hostileCanThreatenModal(town) {
  const player = town.game.player;
  if (!player) return false;
  for (const enemy of town.game.enemies || []) {
    if (!enemy || enemy.dead || enemy.remove || !enemy.position) continue;
    const dx = enemy.position.x - player.position.x;
    const dz = enemy.position.z - player.position.z;
    const attackRange = Number.isFinite(enemy.attackRange) ? enemy.attackRange : (enemy.isBoss ? 2.4 : 1.45);
    const threatRange = attackRange + MODAL_HOSTILE_MARGIN;
    if (dx*dx + dz*dz <= threatRange*threatRange) return true;
  }
  return false;
}

function canOpenBlockingTownModal(town) {
  if (!town.game.started) return true;
  return isTownSafeZone(town.game.player.position) && !hostileCanThreatenModal(town);
}

function installNous0xUi(town) {
  const panel = town.ui?.settings;
  if (!panel) return;
  const title = panel.querySelector('header h2');
  const subtitle = panel.querySelector('header p');
  const labels = panel.querySelectorAll('.town-field > span');
  const note = panel.querySelector('.town-security-note');
  if (title) title.textContent = '0x Alpha';
  if (subtitle) subtitle.textContent = 'Nous Portal-powered free-form NPC conversations.';
  if (labels[0]) labels[0].textContent = 'Nous Portal API key';
  if (labels[1]) labels[1].textContent = 'Model';
  if (town.ui.aiModel) town.ui.aiModel.placeholder = 'auto:0x-alpha';
  if (note) note.textContent = 'Your Nous key stays only in this browser tab session. Maples sends it over HTTPS to the same-origin relay only when you explicitly test or talk; the relay forwards that request to Nous Portal and never stores the key.';

  const syncSettings = town._syncSettingsUI.bind(town);
  town._syncSettingsUI = function syncNousSettings(message='') {
    syncSettings(message);
    if (!message) this.ui.aiStatus.textContent = this.ai.configured ? `Nous ready · ${this.ai.modelLabel}` : 'Local dialogue active.';
  };

  const testAI = town._testAI.bind(town);
  town._testAI = async function testNousAI() {
    await testAI();
    if (this.ai.configured && this.ui.aiStatus.textContent.toLowerCase().startsWith('connected')) {
      this.ui.aiStatus.textContent = `Connected · ${this.ai.modelLabel}`;
    }
  };

  const refreshDialogue = town._refreshDialogueComposer.bind(town);
  town._refreshDialogueComposer = function refreshNousDialogue() {
    refreshDialogue();
    if (this.ai.configured) this.ui.dialogueStatus.textContent = `Nous · ${this.ai.modelLabel}`;
  };

  town._syncSettingsUI();
  town.__nous0xUi = true;
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

  // Every input-blocking town modal uses the same safety gate. This covers
  // Settings, NPC dialogue, and shop panels so Rowan can never lose controls
  // while a ward-edge hostile remains inside its attack/lunge envelope.
  const rejectUnsafeModal = function rejectUnsafeTownModal() {
    if (canOpenBlockingTownModal(this)) return false;
    this.game.toast?.('Move deeper into Lumenwood before stopping to interact.', 1.4);
    return true;
  };

  const openSettings = town.openSettings.bind(town);
  town.openSettings = function openTownSettingsSafely() {
    if (rejectUnsafeModal.call(this)) return false;
    openSettings();
    return true;
  };

  const openDialogue = town.openDialogue.bind(town);
  town.openDialogue = function openTownDialogueSafely(npc) {
    if (rejectUnsafeModal.call(this)) return false;
    openDialogue(npc);
    return true;
  };

  const openShop = town.openShop.bind(town);
  town.openShop = function openTownShopSafely(shopId) {
    if (rejectUnsafeModal.call(this)) return false;
    openShop(shopId);
    return true;
  };

  // While any blocking town panel owns input, freeze hostile AI/combat updates.
  // The entry gate above prevents opening under immediate threat; this lifetime
  // guard prevents an enemy from moving laterally along the ward and attacking
  // after Rowan's movement and combat controls have already been cleared.
  const updateEnemies = town.game._updateEnemies.bind(town.game);
  town.game._updateEnemies = (...args) => {
    if (town.modalOpen) return;
    return updateEnemies(...args);
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
  installNous0xUi(town);

  const updateTown = town.update.bind(town);
  town.update = function updateTownWithCollisions(dt) {
    if (this.game.started && this.modalOpen && !canOpenBlockingTownModal(this)) {
      this.closePanels();
      this.game.toast?.('A nearby threat interrupted the interaction.', 1.2);
    }
    if (this.game.started) resolveTownCollisions(this);
    updateTown(dt);
  };

  town.__allocationStableMatrices = true;
  town.__townCollisions = true;
  town.__authoredWorldBounds = true;
  town.__modalHostileSafety = true;
  town.__modalCombatPause = true;
  town.__runtimeGuardsInstalled = true;
  return town;
}

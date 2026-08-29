import assert from 'node:assert/strict';
import {
  clampPointToTravelNetwork,
  pointInZone,
  applyCircularBlockers,
} from '../src/game/WorldExpansionMath.js';
import { WORLD_EXPANSION_REGIONS } from '../src/game/WorldExpansion.js';
import {
  LANDMARK_SCULPT_SPECS,
  buildLumenspireBeacon,
  buildRootboundGate,
  buildWaystoneCairn,
} from '../src/game/ProceduralLandmarks.js';
import { installWorldTravelAuthority } from '../src/game/WorldTravelAuthority.js';

function assertInsideNetwork(x, z, message) {
  assert.ok(WORLD_EXPANSION_REGIONS.some(zone => pointInZone(x, z, zone)), message);
}

assertInsideNetwork(0, 0, 'combat glade must remain in the player travel network');
assertInsideNetwork(4, 60, 'Hollowroad must be continuously traversable');
assertInsideNetwork(52, 13, 'Glassmere path must be continuously traversable');
assertInsideNetwork(-46, -20, 'Briarwatch trail must be continuously traversable');
assertInsideNetwork(7, 88, 'Hollowroad Crossing destination must be traversable');
assertInsideNetwork(66, 16, 'Glassmere Fen destination must be traversable');
assertInsideNetwork(-64, -32, 'Briarwatch Rise destination must be traversable');

const farOutside = clampPointToTravelNetwork(180, 180, WORLD_EXPANSION_REGIONS);
assert.equal(farOutside.clamped, true, 'far-off points must clamp back to the authored network');
assertInsideNetwork(farOutside.x, farOutside.z, 'clamped point must land inside the authored network');

const routePoint = clampPointToTravelNetwork(5, 70, WORLD_EXPANSION_REGIONS);
assert.equal(routePoint.clamped, false, 'valid outer-route movement must not be forced back into the glade');
assert.equal(routePoint.x, 5);
assert.equal(routePoint.z, 70);

const waterBlocker = { x: 70.7, z: 19.5, radius: 6.15 };
const blocked = applyCircularBlockers(70.7, 19.5, [waterBlocker], .34);
assert.equal(blocked.pushed, true, 'environment blockers must reject occupied landmark/water centers');
assert.ok(Math.hypot(blocked.x - waterBlocker.x, blocked.z - waterBlocker.z) >= 6.49 - 1e-6);

for (const [key, spec] of Object.entries(LANDMARK_SCULPT_SPECS)) {
  assert.ok(spec.classification, `${key} needs a classification`);
  assert.ok(spec.silhouette, `${key} needs an authored silhouette target`);
  assert.ok(spec.materials.length >= 3, `${key} needs deliberate material separation`);
  assert.ok(spec.sockets.length >= 2, `${key} needs reusable sockets`);
  assert.ok(spec.collider, `${key} needs collision metadata`);
}

const beacon = buildLumenspireBeacon({ quality: 'low' });
assert.equal(beacon.userData.sculptSpec, 'lumenspireBeacon');
assert.ok(beacon.userData.sockets.beaconLight, 'beacon must expose a light socket');
assert.ok(beacon.userData.colliders.length > 0, 'beacon must expose collider metadata');

const gate = buildRootboundGate({ quality: 'low' });
assert.equal(gate.userData.sculptSpec, 'rootboundGate');
assert.ok(gate.userData.sockets.rune, 'gate must expose a rune socket');
assert.equal(gate.userData.colliders.length, 2, 'gate must keep a walk-through opening between paired colliders');

const cairn = buildWaystoneCairn({ quality: 'low' });
assert.equal(cairn.userData.sculptSpec, 'waystoneCairn');
assert.ok(cairn.userData.sockets.interaction, 'waystone must expose an interaction socket');

const playerPosition = { x: 0, z: 0 };
const enemyPosition = { x: 60, z: 0 };
let playerClamps = 0;
let encounterClamps = 0;
const fakeGame = {
  player: { position: playerPosition },
  world: {
    clampPlayerToWorld(pos) {
      playerClamps++;
      pos.x = 40;
    },
    clampToArena(pos) {
      encounterClamps++;
      pos.x = 28;
    },
  },
};
installWorldTravelAuthority(fakeGame);
fakeGame.world.clampToArena(playerPosition);
fakeGame.world.clampToArena(enemyPosition);
assert.equal(playerClamps, 1, 'player clamp must route through expanded travel authority');
assert.equal(encounterClamps, 1, 'enemy clamp must retain original encounter containment');
assert.equal(playerPosition.x, 40);
assert.equal(enemyPosition.x, 28);

console.log('world-expansion-unit: PASS');

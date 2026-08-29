import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  clampPointToTravelNetwork,
  pointInZone,
  applyCircularBlockers,
} from '../src/game/WorldExpansionMath.js';
import { installWorldTravelAuthority } from '../src/game/WorldTravelAuthority.js';

const TEST_REGIONS = Object.freeze([
  Object.freeze({ id: 'glade-core', type: 'circle', x: 0, z: 0, radius: 28 }),
  Object.freeze({ id: 'hollowroad', type: 'capsule', ax: 0, az: 20, bx: 6, bz: 78, radius: 6.7 }),
  Object.freeze({ id: 'hollowroad-crossing', type: 'circle', x: 7, z: 80, radius: 18 }),
  Object.freeze({ id: 'glassmere-path', type: 'capsule', ax: 20, az: 4, bx: 64, bz: 16, radius: 6.2 }),
  Object.freeze({ id: 'glassmere-fen', type: 'circle', x: 66, z: 16, radius: 18 }),
  Object.freeze({ id: 'briarwatch-trail', type: 'capsule', ax: -19, az: -2, bx: -62, bz: -31, radius: 6 }),
  Object.freeze({ id: 'briarwatch-rise', type: 'circle', x: -64, z: -32, radius: 18 }),
]);

function assertInsideNetwork(x, z, message) {
  assert.ok(TEST_REGIONS.some(zone => pointInZone(x, z, zone)), message);
}

function assertContinuousLine(ax, az, bx, bz, steps, message) {
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = ax + (bx - ax) * t;
    const z = az + (bz - az) * t;
    assertInsideNetwork(x, z, `${message} at t=${t.toFixed(2)} (${x.toFixed(2)}, ${z.toFixed(2)})`);
  }
}

assertInsideNetwork(0, 0, 'combat glade must remain in the player travel network');
assertInsideNetwork(4, 60, 'Hollowroad must be traversable');
assertInsideNetwork(52, 13, 'Glassmere Path must be traversable');
assertInsideNetwork(-46, -20, 'Briarwatch Trail must be traversable');
assertInsideNetwork(7, 88, 'Hollowroad Crossing destination must be traversable');
assertInsideNetwork(66, 16, 'Glassmere Fen destination must be traversable');
assertInsideNetwork(-64, -32, 'Briarwatch Rise destination must be traversable');

assertContinuousLine(0, 20, 6, 78, 48, 'Hollowroad cannot contain a travel gap');
assertContinuousLine(20, 4, 64, 16, 40, 'Glassmere Path cannot contain a travel gap');
assertContinuousLine(-19, -2, -62, -31, 40, 'Briarwatch Trail cannot contain a travel gap');

const farOutside = clampPointToTravelNetwork(180, 180, TEST_REGIONS);
assert.equal(farOutside.clamped, true, 'far-off points must clamp back to the authored network');
assertInsideNetwork(farOutside.x, farOutside.z, 'clamped point must land inside the authored network');

const routePoint = clampPointToTravelNetwork(5, 70, TEST_REGIONS);
assert.equal(routePoint.clamped, false, 'valid outer-route movement must not be forced back into the glade');
assert.equal(routePoint.x, 5);
assert.equal(routePoint.z, 70);

const waterBlocker = { x: 70.7, z: 19.5, radius: 6.15 };
const blocked = applyCircularBlockers(70.7, 19.5, [waterBlocker], .34);
assert.equal(blocked.pushed, true, 'environment blockers must reject occupied landmark/water centers');
assert.ok(Math.hypot(blocked.x - waterBlocker.x, blocked.z - waterBlocker.z) >= 6.49 - 1e-6);

// Keep this Node gate dependency-light. The browser E2E is responsible for actually
// constructing/rendering Three.js geometry; here we verify the authored runtime contracts.
const worldSource = fs.readFileSync(new URL('../src/game/WorldExpansion.js', import.meta.url), 'utf8');
for (const region of TEST_REGIONS) {
  assert.ok(worldSource.includes(`id: '${region.id}'`), `WorldExpansion must retain authored region ${region.id}`);
}
assert.ok(worldSource.includes('game.world.playerTravelZones = WORLD_EXPANSION_REGIONS'), 'expanded travel zones must be published on World');
assert.ok(worldSource.includes('game.world.clampPlayerToWorld = pos =>'), 'expanded player clamp must remain installed');
assert.ok(worldSource.includes('buildGlassmereFen'), 'Glassmere Fen visual layer must remain installed');
assert.ok(worldSource.includes('buildDistantSilhouettes'), 'long-range silhouette layer must remain installed');

const landmarkSource = fs.readFileSync(new URL('../src/game/ProceduralLandmarks.js', import.meta.url), 'utf8');
for (const specKey of ['lumenspireBeacon', 'rootboundGate', 'waystoneCairn']) {
  assert.ok(landmarkSource.includes(`${specKey}: Object.freeze({`), `missing img2threejs sculpt spec ${specKey}`);
}
for (const socket of ['beaconLight', 'lookout', 'banner', 'rune', 'leftLantern', 'rightLantern', 'interaction']) {
  assert.ok(landmarkSource.includes(`'${socket}'`), `missing reusable landmark socket ${socket}`);
}
assert.ok(landmarkSource.includes('root.userData.colliders.push'), 'procedural landmarks must retain collider metadata');
assert.ok(landmarkSource.includes('reviewTargets:'), 'procedural landmarks must retain img2threejs review targets');

const natureSource = fs.readFileSync(new URL('../src/game/WorldExpansionNature.js', import.meta.url), 'utf8');
assert.ok(natureSource.includes('prototype.clone(true)'), 'expanded nature must clone existing prototypes');
assert.ok(natureSource.includes('baseManager.instances.push(...manager.instances)'), 'expanded nature must feed the existing animation/instancing manager');
assert.equal(natureSource.includes('GLTFLoader'), false, 'expanded nature must not duplicate-load GLBs and break identity-based batching');

const mainSource = fs.readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
for (const installer of [
  'installWorldExpansion(game)',
  'installLandmarkSilhouettePolish(game)',
  'installWorldExpansionAtmosphere(game)',
  'installWorldTravelAuthority(game)',
  'installWorldExpansionNature(game)',
]) {
  assert.ok(mainSource.includes(installer), `main startup must retain ${installer}`);
}

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

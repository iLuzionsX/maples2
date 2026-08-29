import assert from 'node:assert/strict';
import {
  clampPointToTravelNetwork,
  pointInZone,
  applyCircularBlockers,
} from '../src/game/WorldExpansionMath.js';
import { installWorldTravelAuthority } from '../src/game/WorldTravelAuthority.js';

const REGIONS = [
  { type: 'circle', x: 0, z: 0, radius: 28 },
  { type: 'capsule', ax: 0, az: 20, bx: 6, bz: 78, radius: 6.7 },
  { type: 'circle', x: 7, z: 80, radius: 18 },
  { type: 'capsule', ax: 20, az: 4, bx: 64, bz: 16, radius: 6.2 },
  { type: 'circle', x: 66, z: 16, radius: 18 },
  { type: 'capsule', ax: -19, az: -2, bx: -62, bz: -31, radius: 6 },
  { type: 'circle', x: -64, z: -32, radius: 18 },
];

const inside = (x, z) => REGIONS.some(zone => pointInZone(x, z, zone));
assert.ok(inside(0, 0), 'glade must remain traversable');
assert.ok(inside(5, 70), 'Hollowroad must be traversable outside the original arena');
assert.ok(inside(52, 13), 'Glassmere Path must be traversable');
assert.ok(inside(-46, -20), 'Briarwatch Trail must be traversable');

const farOutside = clampPointToTravelNetwork(180, 180, REGIONS);
assert.equal(farOutside.clamped, true);
assert.ok(inside(farOutside.x, farOutside.z), 'clamping must return points to the travel network');

const validOuterPoint = clampPointToTravelNetwork(5, 70, REGIONS);
assert.equal(validOuterPoint.clamped, false, 'valid outer movement must not be clamped back into the glade');
assert.deepEqual([validOuterPoint.x, validOuterPoint.z], [5, 70]);

const blocker = { x: 70.7, z: 19.5, radius: 6.15 };
const pushed = applyCircularBlockers(blocker.x, blocker.z, [blocker], .34);
assert.equal(pushed.pushed, true);
assert.ok(Math.hypot(pushed.x - blocker.x, pushed.z - blocker.z) >= 6.489, 'blockers must push the player outside occupied geometry');

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
assert.equal(playerClamps, 1, 'player must use expanded travel authority');
assert.equal(encounterClamps, 1, 'enemies must retain original encounter containment');
assert.equal(playerPosition.x, 40);
assert.equal(enemyPosition.x, 28);

console.log('world-expansion-unit: PASS');

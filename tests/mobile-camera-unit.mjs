import assert from 'node:assert/strict';
import {
  angleToTarget,
  selectMobileCombatTarget,
  shortestAngleDelta,
} from '../src/game/MobileCameraControls.js';

const deg = value => value * Math.PI / 180;

assert.ok(Math.abs(shortestAngleDelta(deg(179), deg(-179)) - deg(2)) < 1e-9, 'angle wrap should take the short +2° path');
assert.ok(Math.abs(shortestAngleDelta(deg(-179), deg(179)) + deg(2)) < 1e-9, 'angle wrap should take the short -2° path');
assert.ok(Math.abs(angleToTarget({ x: 0, z: 0 }, { x: 1, z: 0 }) - Math.PI / 2) < 1e-9, 'target yaw should match Game/Character convention');

const enemies = [
  { position: { x: 0, z: 3 }, dead: false },
  { position: { x: 1, z: 2 }, dead: false },
  { position: { x: 0, z: -1 }, dead: false },
  { position: { x: 0, z: 1 }, dead: true },
];
const target = selectMobileCombatTarget({ x: 0, z: 0 }, 0, enemies, { maxRange: 5, coneCos: 0 });
assert.equal(target, enemies[1], 'selection should prefer a closer visible target while excluding dead/behind targets');

const none = selectMobileCombatTarget({ x: 0, z: 0 }, 0, [{ position: { x: 0, z: -2 } }], { maxRange: 5, coneCos: 0 });
assert.equal(none, null, 'targets outside the camera cone should not be magnetized');

console.log('MOBILE CAMERA UNIT SUITE PASS');
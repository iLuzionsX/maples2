import assert from 'node:assert/strict';
import {
  CAMERA_PITCH_MAX,
  CAMERA_PITCH_MIN,
  installCameraPitchControls,
  nextCameraPitch,
} from '../src/game/CameraPitchControls.js';
import {
  angleToTarget,
  selectMobileCombatTarget,
  shortestAngleDelta,
  shouldEnableMobileControls,
} from '../src/game/MobileCameraControls.js';

const deg = value => value * Math.PI / 180;

assert.equal(shouldEnableMobileControls({ coarse: true, touchPoints: 0, width: 1440 }), true, 'coarse pointers should use mobile controls');
assert.equal(shouldEnableMobileControls({ coarse: false, touchPoints: 5, width: 390 }), true, 'narrow touch layouts should use mobile controls');
assert.equal(shouldEnableMobileControls({ coarse: false, touchPoints: 5, width: 1440 }), false, 'wide fine-pointer touch laptops should preserve desktop controls');

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

assert.equal(nextCameraPitch(0.28, 1000), CAMERA_PITCH_MIN, 'large upward look input should reach the expanded upward pitch limit');
assert.equal(nextCameraPitch(0.28, -1000), CAMERA_PITCH_MAX, 'large downward look input should preserve the existing downward pitch limit');
assert.ok(nextCameraPitch(-0.06, 300) < -0.5, 'normal upward drag should travel substantially past the old -0.06 clamp');

let renderedPitch = null;
const fakeGame = {
  cameraPitch: 0.28,
  input: { consumeLook: () => ({ x: 4, y: 600 }) },
  _updateCamera() {
    renderedPitch = this.cameraPitch;
    return renderedPitch;
  },
};
const pitchState = installCameraPitchControls(fakeGame);
const interceptedLook = fakeGame.input.consumeLook();
assert.deepEqual(interceptedLook, { x: 4, y: 0 }, 'expanded pitch controller should preserve horizontal look and own only vertical pitch');
fakeGame.cameraPitch = -0.06; // simulate Game.js applying its legacy clamp during the frame
fakeGame._updateCamera(1 / 60);
assert.ok(renderedPitch < -0.7, 'camera placement should receive the expanded upward pitch after the legacy clamp runs');
assert.equal(pitchState.desiredPitch, renderedPitch, 'camera pitch state should remain synchronized after camera updates');

console.log('MOBILE CAMERA UNIT SUITE PASS');

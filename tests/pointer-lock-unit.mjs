import assert from 'node:assert/strict';

class FakeTarget {
  constructor() { this.listeners = new Map(); }
  addEventListener(type, handler) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(handler);
  }
  dispatch(type, event = {}) {
    for (const handler of this.listeners.get(type) || []) handler(event);
  }
}

const windowTarget = new FakeTarget();
globalThis.addEventListener = windowTarget.addEventListener.bind(windowTarget);
globalThis.matchMedia = () => ({ matches: false });
globalThis.innerWidth = 1280;

const documentTarget = new FakeTarget();
const rootStyle = { cursor: 'none' };
const bodyStyle = { cursor: 'none' };
let exitCount = 0;

globalThis.document = Object.assign(documentTarget, {
  hidden: false,
  pointerLockElement: null,
  documentElement: { style: rootStyle },
  body: { style: bodyStyle },
  querySelector: () => null,
  querySelectorAll: () => [],
  exitPointerLock() {
    exitCount++;
    this.pointerLockElement = null;
    this.dispatch('pointerlockchange');
  },
});

const canvasTarget = new FakeTarget();
let requestCount = 0;
const canvas = Object.assign(canvasTarget, {
  style: { cursor: 'none' },
  requestPointerLock() {
    requestCount++;
    document.pointerLockElement = canvas;
    document.dispatch('pointerlockchange');
    return Promise.resolve();
  },
});

const { Input } = await import('../src/game/Input.js');
const input = new Input(canvas);

canvas.dispatch('mousedown', { button: 0 });
assert.equal(requestCount, 1, 'desktop canvas press should request pointer lock');
assert.equal(input.pointerLocked, true, 'pointerlockchange should mark input locked');

document.dispatch('mousemove', { movementX: 12, movementY: -8 });
assert.equal(input.mouseDX, 12);
assert.equal(input.mouseDY, -8);

windowTarget.dispatch('blur');
assert.equal(exitCount, 1, 'window blur must explicitly release pointer lock');
assert.equal(document.pointerLockElement, null);
assert.equal(input.pointerLocked, false);
assert.equal(input.mouseDX, 0, 'unlock should discard stale look delta');
assert.equal(input.mouseDY, 0, 'unlock should discard stale look delta');
assert.equal(canvas.style.cursor, '', 'canvas cursor must be restored');
assert.equal(rootStyle.cursor, '', 'document cursor must be restored');
assert.equal(bodyStyle.cursor, '', 'body cursor must be restored');

canvas.dispatch('mousedown', { button: 0 });
document.hidden = true;
document.dispatch('visibilitychange');
assert.equal(exitCount, 2, 'hidden document must release pointer lock');
assert.equal(input.pointerLocked, false);

document.hidden = false;
canvas.dispatch('mousedown', { button: 0 });
windowTarget.dispatch('pagehide');
assert.equal(exitCount, 3, 'pagehide must release pointer lock before navigation/close');

canvas.dispatch('mousedown', { button: 0 });
windowTarget.dispatch('beforeunload');
assert.equal(exitCount, 4, 'beforeunload must release pointer lock as a final teardown guard');

console.log('Pointer-lock lifecycle regression checks passed.');

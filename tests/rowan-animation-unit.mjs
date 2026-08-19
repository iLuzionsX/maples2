import assert from 'node:assert/strict';
import {
  crossedPhase,
  localHitResponse,
  locomotionWeights,
  pulseAmount,
  stanceWeight,
} from '../src/game/RowanAnimationMath.js';

for (const speed of [0, .2, .7, 1.8, 3.1, 4.4, 5.25]) {
  const weights = locomotionWeights(speed, 5.25, .35);
  const sum = weights.idle + weights.walk + weights.run + weights.turn;
  assert.ok(Math.abs(sum - 1) < 1e-9, `weights must normalize at speed ${speed}`);
  for (const value of [weights.idle, weights.walk, weights.run, weights.turn]) {
    assert.ok(value >= 0 && value <= 1, 'weights must stay bounded');
  }
}

assert.ok(locomotionWeights(0).idle > .99, 'idle dominates at rest');
assert.ok(locomotionWeights(1.5).walk > locomotionWeights(1.5).run, 'walk dominates at moderate speed');
assert.ok(locomotionWeights(5.25).run > .9, 'run dominates near maximum speed');
assert.ok(locomotionWeights(3.5, 5.25, .7).turn > .5, 'sharp turns can visibly take over the locomotion layer');

assert.equal(crossedPhase(.08, .13, .12), true, 'normal phase crossing fires');
assert.equal(crossedPhase(.96, .04, .02), true, 'wrapped phase crossing fires');
assert.equal(crossedPhase(.2, .3, .8), false, 'unreached marker stays quiet');

assert.equal(stanceWeight(.12, .12), 1, 'foot is fully planted at its contact center');
assert.ok(stanceWeight(.25, .12) > 0 && stanceWeight(.25, .12) < 1, 'foot releases smoothly');
assert.equal(stanceWeight(.45, .12), 0, 'swing foot is unlocked');

assert.ok(pulseAmount(.12, .24) > .99, 'transition pulse peaks halfway through');
assert.equal(pulseAmount(.24, .24), 0, 'transition pulse ends cleanly');

const front = localHitResponse(0, 0, 1, 0, 0);
assert.ok(front.front > .99 && Math.abs(front.side) < .001, 'front hit classifies as front');
const right = localHitResponse(0, 1, 0, 0, 0);
assert.ok(right.side > .99 && Math.abs(right.front) < .001, 'right-side hit classifies as right');

console.log('Rowan animation math: PASS');
// Netlify strict validation retrigger after locomotion-state gating fix.

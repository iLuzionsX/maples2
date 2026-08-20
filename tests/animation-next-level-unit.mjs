import assert from 'node:assert/strict';
import {
  attackContactForCombo,
  hitSpringEnvelope,
  impulsePulse,
  playerAttackTiming,
  playerComboPose,
  playerMotionPose,
  velocityPlaybackScale,
} from '../src/game/AnimationTiming.js';

const expectedContacts = [.34, .32, .52];
for (let combo = 0; combo < 3; combo++) {
  const contact = attackContactForCombo(combo);
  assert.equal(contact, expectedContacts[combo], `combo ${combo} gameplay contact changed`);
  const before = playerAttackTiming(combo, Math.max(0, contact - .08));
  const at = playerAttackTiming(combo, contact);
  const after = playerAttackTiming(combo, Math.min(1, contact + .08));
  assert.equal(at.impact, 1, `combo ${combo} visible impact must peak at gameplay contact`);
  assert.ok(before.impact < at.impact, `combo ${combo} impact should build toward contact`);
  assert.ok(after.impact < at.impact, `combo ${combo} impact should release after contact`);
  for (const value of Object.values(at)) {
    if (typeof value === 'number' && value !== contact) assert.ok(value >= 0 && value <= 1, 'timing envelope escaped normalized range');
  }
}

const horizontal = playerComboPose(0, expectedContacts[0]);
const diagonal = playerComboPose(1, expectedContacts[1]);
const finisher = playerComboPose(2, expectedContacts[2]);
assert.ok(horizontal.chest.y < -.2, 'horizontal slash needs a strong left-to-right torso silhouette');
assert.ok(diagonal.chest.z < -.1, 'diagonal slash needs a distinct roll silhouette');
assert.ok(Math.abs(finisher.chest.y) < Math.abs(horizontal.chest.y), 'finisher should read more vertical than horizontal');
assert.ok(Math.abs(finisher.upperLegL.x) > Math.abs(horizontal.upperLegL.x) * 2, 'finisher needs substantially deeper leg drive');
assert.notDeepEqual(horizontal.upperArmR, diagonal.upperArmR, 'combo arm poses must not collapse into the same silhouette');

const calm = playerMotionPose({ speed: 0, acceleration: 0, lateralSpeed: 0, turnRate: 0 });
const sprintTurn = playerMotionPose({ speed: 5.25, acceleration: 12, lateralSpeed: 2.2, turnRate: 5.5 });
const hardStop = playerMotionPose({ speed: 1.2, acceleration: -18, lateralSpeed: -1.5, turnRate: -7 });
assert.equal(calm.energy, 0, 'stationary pose should not invent locomotion energy');
assert.ok(sprintTurn.energy > .7, 'full-speed acceleration/turn should create readable body momentum');
assert.ok(hardStop.energy > .4, 'hard deceleration should remain visible');
for (const pose of [sprintTurn, hardStop]) {
  for (const part of [pose.hips, pose.spine, pose.chest, pose.head]) {
    for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(part[axis]) < .2, 'momentum layer must remain additive and bounded');
  }
}

assert.equal(impulsePulse(-.01), 0, 'transition impulse cannot fire before event');
assert.ok(impulsePulse(.05) > 0, 'transition impulse should engage quickly');
assert.equal(impulsePulse(.3, .26), 0, 'transition impulse must end cleanly');
assert.equal(hitSpringEnvelope(-.01), 0, 'hit spring cannot fire before hit');
assert.ok(hitSpringEnvelope(.035) > .2, 'hit spring should snap on quickly');
assert.equal(hitSpringEnvelope(.23, .22), 0, 'hit spring must settle within its duration');

assert.equal(velocityPlaybackScale(0, 2.2), .68, 'locomotion playback needs a safe minimum');
assert.equal(velocityPlaybackScale(2.2, 2.2), 1, 'reference velocity should play at authored speed');
assert.equal(velocityPlaybackScale(9, 2.2), 1.35, 'locomotion playback needs a safe maximum');

console.log('Animation next-level timing and authored poses: PASS');

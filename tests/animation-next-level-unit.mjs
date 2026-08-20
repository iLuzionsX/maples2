import assert from 'node:assert/strict';
import {
  attackContactForCombo,
  hitSpringEnvelope,
  playerAttackTiming,
  velocityPlaybackScale,
} from '../src/game/AnimationTiming.js';

for (let combo = 0; combo < 3; combo++) {
  const contact = attackContactForCombo(combo);
  const atContact = playerAttackTiming(combo, contact);
  const before = playerAttackTiming(combo, Math.max(0, contact - 0.08));
  const after = playerAttackTiming(combo, Math.min(1, contact + 0.12));
  assert.equal(atContact.impact, 1, `combo ${combo} must peak exactly at its gameplay contact frame`);
  assert.ok(before.impact < atContact.impact, `combo ${combo} must build toward contact`);
  assert.ok(after.impact < atContact.impact, `combo ${combo} must release after contact`);
  assert.ok(atContact.contact === contact, 'timing profile must preserve the existing gameplay damage window');
  for (const value of [atContact.anticipation, atContact.impact, atContact.followThrough, atContact.settle]) {
    assert.ok(value >= 0 && value <= 1, 'attack envelopes stay bounded');
  }
}

assert.ok(playerAttackTiming(2, 0.35).anticipation > 0.6, 'finisher keeps a readable anticipation before contact');
assert.ok(playerAttackTiming(0, 0.72).followThrough > 0.25, 'light attacks preserve visible follow-through');

assert.equal(hitSpringEnvelope(-0.01), 0, 'hit spring is inactive before impact');
assert.equal(hitSpringEnvelope(0.22), 0, 'hit spring settles fully by its duration');
assert.ok(hitSpringEnvelope(0.04) > 0.5, 'hit spring snaps on quickly');
assert.ok(hitSpringEnvelope(0.16) > 0 && hitSpringEnvelope(0.16) < 1, 'hit spring eases out instead of popping');

assert.equal(velocityPlaybackScale(0, 2.2), 0.68, 'near-stationary enemies keep a bounded minimum playback rate');
assert.ok(Math.abs(velocityPlaybackScale(2.2, 2.2) - 1) < 1e-9, 'reference travel speed maps to authored playback speed');
assert.equal(velocityPlaybackScale(8, 2.2), 1.35, 'playback speed remains capped under impulses');

console.log('Animation next-level timing: PASS');

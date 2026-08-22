export function polishMosswakeBridge(town) {
  const state = town?.bridgeApproach;
  const deck = state?.deck;
  if (!deck?.length) return false;

  const last = Math.max(1, deck.length - 1);
  for (let i = 0; i < deck.length; i++) {
    const t = i / last;
    // Rowan's controller remains on y=0. Keep the repaired timber crown subtle
    // so the bridge reads as dimensional without visually swallowing his feet.
    deck[i].position.y = .012 + Math.sin(t * Math.PI) * .035;
    deck[i].scale.y = .42;
  }

  // Keep Blackbriar Run visibly beneath the deck. The bridge has no vertical
  // character physics, so the visual waterline must not overlap the end planks.
  if (state.water) state.water.position.y = .014;
  if (state.riverbed) state.riverbed.position.y = -.042;

  state.deckGroundAligned = true;
  state.waterlinePolished = true;
  return true;
}

export function polishMosswakeBridge(town) {
  const state = town?.bridgeApproach;
  const deck = state?.deck;
  if (!deck?.length) return false;

  const last = Math.max(1, deck.length - 1);
  for (let i = 0; i < deck.length; i++) {
    const t = i / last;
    // Rowan's controller remains on y=0. Keep the timber deck extremely low
    // profile so he appears to stand on it even without vertical character physics.
    deck[i].position.y = .03 + Math.sin(t * Math.PI) * .015;
    deck[i].scale.y = .08;
  }

  // The stream stays visibly above the grass plane but below the underside of
  // every repaired plank, avoiding both hidden water and submerged bridge ends.
  if (state.water) state.water.position.y = .016;
  if (state.riverbed) state.riverbed.position.y = -.042;

  state.deckGroundAligned = true;
  state.waterlinePolished = true;
  return true;
}

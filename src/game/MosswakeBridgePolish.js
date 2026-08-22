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
  state.deckGroundAligned = true;
  return true;
}

import * as THREE from 'three';

// Independent Ox Alpha A/B extension point. The Netlify delegation harness replaces
// this file with Ox-authored source for validation; the accepted source is then
// committed verbatim before final measurement.
export function installOxPerformancePass(game) {
  if (game.oxPerformancePass) return game.oxPerformancePass;
  game.oxPerformancePass = { enabled: true, author: 'ox-alpha' };
  return game.oxPerformancePass;
}

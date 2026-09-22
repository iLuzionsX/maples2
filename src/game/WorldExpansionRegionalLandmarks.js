import { buildBriarwatchOathBell } from './RegionalLandmarks.js';
import { attachStaticLanternLight } from './ProceduralLandmarks.js';

export function installWorldExpansionRegionalLandmarks(game) {
  if (game.worldExpansionRegionalLandmarks) return game.worldExpansionRegionalLandmarks;
  const expansion = game.worldExpansion;
  if (!expansion?.root) return null;

  const manager = game.worldExpansionRegionalLandmarks = {
    ready: false,
    landmarks: [],
    lights: [],
  };

  const oathBell = buildBriarwatchOathBell({ quality: game.quality });
  oathBell.position.set(-64.2, 0, -35.6);
  oathBell.rotation.y = -.34;
  oathBell.scale.setScalar(.98);
  expansion.root.add(oathBell);
  expansion.landmarks.push(oathBell);
  manager.landmarks.push(oathBell);

  const emberLight = attachStaticLanternLight(oathBell, 'ember', {
    color: 0xe88c5b,
    intensity: game.quality === 'high' ? .9 : .55,
    distance: game.quality === 'high' ? 7.5 : 5.5,
  });
  if (emberLight) {
    expansion.lights.push(emberLight);
    manager.lights.push(emberLight);
  }

  expansion.notes?.push('Briarwatch is anchored by the original img2threejs-style Oath Bell landmark: cracked watch-stone, blackthorn crown, bronze bell and restrained ember oath-light.');
  manager.ready = true;
  return manager;
}

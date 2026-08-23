import * as THREE from 'three';

/**
 * Ox A/B visual extension point.
 *
 * This file intentionally starts as a no-op. The enabled Ox delegation job is
 * allowed to change ONLY this file. `installOxGraphicsPass(game)` runs after
 * ShowcasePass and before the performance pass.
 *
 * Available contracts:
 * - game.scene: THREE.Scene
 * - game.renderer: THREE.WebGLRenderer
 * - game.camera: THREE.PerspectiveCamera
 * - game.world: World with `decor` Group and `update(dt)`
 * - game.fx: FXSystem with burst/slash/ring/dashTrail/projectileTrail/heal/levelUp/add
 * - game.quality: 'high' | 'low'
 * - game.composer: EffectComposer on high quality, otherwise undefined
 *
 * Preserve gameplay. Visual-only wrappers around existing FX methods are okay.
 * Keep allocations and draw calls restrained, especially on low/mobile quality.
 */
export function installOxGraphicsPass(game) {
  if (!game || game.oxGraphicsPass) return game?.oxGraphicsPass || null;

  const pass = {
    source: 'ox-alpha',
    update() {},
    dispose() {},
  };

  game.oxGraphicsPass = pass;
  return pass;
}

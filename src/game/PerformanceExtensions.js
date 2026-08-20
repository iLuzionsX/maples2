import * as THREE from 'three';

const EMPTY = Object.freeze([]);

function buildDynamicRoots(game) {
  const roots = new Set();
  const world = game.world;
  const showcase = game.showcasePass;

  if (world.portal) roots.add(world.portal);
  for (const firefly of world.fireflies || EMPTY) roots.add(firefly);
  if (showcase?.root) roots.add(showcase.root);
  if (showcase?.water) roots.add(showcase.water);
  for (const foam of showcase?.foam || EMPTY) roots.add(foam);
  for (const group of showcase?.swayGroups || EMPTY) roots.add(group);
  for (const shadow of showcase?.dynamicShadows?.values?.() || EMPTY) roots.add(shadow);
  for (const item of game.natureAssetManager?.instances || EMPTY) roots.add(item);

  return roots;
}

function belongsToDynamicSubtree(node, decor, dynamicRoots) {
  for (let current = node; current && current !== decor; current = current.parent) {
    if (dynamicRoots.has(current) || current.userData?.assetNature || current.userData?.showcaseMote) return true;
  }
  return false;
}

function freezeStaticDecorMatrices(game, stats) {
  const decor = game.world.decor;
  const dynamicRoots = buildDynamicRoots(game);
  decor.updateMatrixWorld(true);

  let frozen = 0;
  decor.traverse(node => {
    if (node === decor || belongsToDynamicSubtree(node, decor, dynamicRoots)) return;
    if (node.isSkinnedMesh || node.isBone) return;
    node.matrixAutoUpdate = false;
    node.matrixWorldAutoUpdate = false;
    frozen++;
  });

  stats.frozenStaticObjects = frozen;
  return frozen;
}

function installRuntimeHotPaths(game, stats) {
  const projectileTarget = new THREE.Vector3();
  const damagePosition = new THREE.Vector3();
  const pickupVector = new THREE.Vector3();

  game._updateProjectiles = dt => {
    for (let i = game.projectiles.length - 1; i >= 0; i--) {
      const p = game.projectiles[i];
      p.life -= dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
      p.mesh.rotation.x += dt * 8;
      p.mesh.rotation.y += dt * 11;
      game.fx.projectileTrail(p.mesh.position);
      let exploded = false;

      for (const e of game.enemies) {
        if (e.dead || p.hits.has(e)) continue;
        const hitR = e.radius + .45;
        projectileTarget.copy(e.position);
        projectileTarget.y += e.isBoss ? 1.6 : .75;
        if (p.mesh.position.distanceTo(projectileTarget) < hitR) {
          p.hits.add(e);
          p.pierce--;
          const crit = Math.random() < .16;
          const dmg = Math.round(42 * (crit ? 1.55 : 1));
          e.takeHit(dmg, game.player.position, crit);
          damagePosition.copy(e.position);
          damagePosition.y += e.isBoss ? 2.8 : 1.45;
          game._damageNumber(damagePosition, dmg, crit);
          game._addCombatCombo();
          game.fx.burst(p.mesh.position, 0xff8a55, 24, 5.5, 1.0);
          game.fx.ring(e.position, 0xff8154, .18, 2.2, .3);
          game.cameraShake = Math.max(game.cameraShake, .38);
          game.hitStop = .055;
          if (p.pierce <= 0) { exploded = true; break; }
        }
      }

      if (p.life <= 0 || exploded) {
        game.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        game.projectiles.splice(i, 1);
      }
    }
    stats.projectileFrames++;
  };

  game._updatePickups = dt => {
    for (let i = game.pickups.length - 1; i >= 0; i--) {
      const p = game.pickups[i];
      p.age += dt;
      p.mesh.rotation.y += dt * 5;
      p.mesh.position.y += Math.sin(p.age * 4 + p.phase) * dt * .12;
      pickupVector.copy(game.player.position);
      pickupVector.y += .8;
      pickupVector.sub(p.mesh.position);
      const d = pickupVector.length();
      if (p.age > .35 && d < 6) p.mesh.position.addScaledVector(pickupVector.normalize(), dt * (4 + Math.max(0, 6 - d) * 2.4));
      if (d < .55) {
        const leveled = game.player.addXp(p.value);
        game.player.hp = Math.min(game.player.maxHp, game.player.hp + 1.8);
        game.player.mana = Math.min(game.player.maxMana, game.player.mana + 2.5);
        game.audio.pickup();
        if (leveled) game.toast(`LEVEL ${game.player.level}`, 1.4);
        game.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        game.pickups.splice(i, 1);
      }
    }
    stats.pickupFrames++;
  };
}

export function installPerformanceExtensions(game) {
  if (game.performanceExtensions) return game.performanceExtensions;

  const stats = {
    projectileFrames: 0,
    pickupFrames: 0,
    frozenStaticObjects: 0,
  };

  // Deliberately do not replace game._updateEnemies here. CinematicPolish and
  // AnimationPolish wrap that method to style asynchronously attached GLB enemies
  // and bosses. Preserving those wrappers is part of the zero-quality-loss contract.
  installRuntimeHotPaths(game, stats);

  const extension = {
    stats,
    freezeStaticDecor() {
      if (stats.frozenStaticObjects) return stats.frozenStaticObjects;
      const frozen = freezeStaticDecorMatrices(game, stats);
      console.info('[Maples performance extensions]', { frozenStaticObjects: frozen }, stats);
      return frozen;
    },
  };

  game.performanceExtensions = extension;
  return extension;
}

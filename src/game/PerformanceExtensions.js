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
  const separation = new THREE.Vector3();
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

  game._updateEnemies = (dt, realDt) => {
    let hasRemoved = false;
    for (const e of game.enemies) {
      e.update(dt, game.player);
      game.world.clampToArena(e.position);
      if (e.remove) hasRemoved = true;

      if (e.attackEvent && !game.player.dead) {
        const dist = e.position.distanceTo(game.player.position);
        const hitRange = e.isBoss ? 4.35 : 1.75;
        if (dist < hitRange) {
          if (game.player.takeDamage(e.damage, e.position)) {
            game.ui.damageFlash.classList.add('hit');
            setTimeout(() => game.ui.damageFlash.classList.remove('hit'), 55);
            game.cameraShake = Math.max(game.cameraShake, e.isBoss ? .78 : .42);
            game.hitStop = e.isBoss ? .055 : .035;
          }
        }
      }

      if (e.dead && !e.userDataRewarded) {
        e.userDataRewarded = true;
        if (e.isBoss) {
          game.victoryTimer = 1.65;
          game.ui.bossFill.style.transform = 'scaleX(0)';
          game.toast('ANCIENT WARDEN DEFEATED', 1.5);
          game.cameraShake = .8;
          game.fx.levelUp(e.position);
        } else {
          game.kills++;
          game._spawnEssence(e.position, e.reward);
          game._updateQuest();
          if (game.kills >= game.objectiveKills && !game.boss && !game.bossPending) {
            game.bossPending = true;
            game.bossTimer = 1.8;
            game.toast('The forest is answering…', 1.6);
          }
        }
      }
    }

    for (let i = 0; i < game.enemies.length; i++) {
      for (let j = i + 1; j < game.enemies.length; j++) {
        const a = game.enemies[i];
        const b = game.enemies[j];
        if (a.dead || b.dead) continue;
        separation.copy(a.position).sub(b.position);
        separation.y = 0;
        const len = separation.length();
        const min = a.radius + b.radius + .25;
        if (len > 0 && len < min) {
          separation.multiplyScalar((min - len) / len * .035);
          a.position.add(separation);
          b.position.sub(separation);
        }
      }
    }

    if (hasRemoved) game.enemies = game.enemies.filter(e => !e.remove);

    if (game.player.dead) {
      game.respawnTimer += realDt;
      if (game.respawnTimer > 1.6) {
        game.player.dead = false;
        game.player.hp = game.player.maxHp;
        game.player.mana = game.player.maxMana;
        game.player.state = 'idle';
        game.player.stateTime = 0;
        game.player.root.rotation.set(0, game.player.facing, 0);
        game.player.rig.body.rotation.set(0, 0, 0);
        game.player.rig.head.rotation.set(0, 0, 0);
        game.player.setPosition(0, 0, 9);
        game.respawnTimer = 0;
        game.toast('The grove restores you', 1.2);
        game.fx.levelUp(game.player.position);
      }
    }
    stats.enemyFrames++;
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
    enemyFrames: 0,
    projectileFrames: 0,
    pickupFrames: 0,
    frozenStaticObjects: 0,
  };

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

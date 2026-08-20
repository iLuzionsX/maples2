import * as THREE from 'three';

const EMPTY = Object.freeze([]);
const _inverseDecor = new THREE.Matrix4();
const _viewProjection = new THREE.Matrix4();
const _cameraFrusta = new WeakMap();

function textureId(texture) {
  return texture?.uuid || '';
}

function colorId(color) {
  return color?.isColor ? color.getHexString() : '';
}

function materialSignature(material) {
  if (!material || Array.isArray(material) || material.visible === false) return null;
  if (material.transparent || material.opacity < .999 || material.blending !== THREE.NormalBlending) return null;
  if (!material.isMeshStandardMaterial && !material.isMeshBasicMaterial && !material.isMeshLambertMaterial && !material.isMeshPhongMaterial) return null;
  if (material.clippingPlanes?.length || material.stencilWrite) return null;

  return [
    material.type,
    colorId(material.color),
    colorId(material.emissive),
    material.emissiveIntensity ?? '',
    material.roughness ?? '',
    material.metalness ?? '',
    material.side,
    material.shadowSide ?? '',
    material.flatShading ? 1 : 0,
    material.vertexColors ? 1 : 0,
    material.alphaTest ?? 0,
    material.depthTest ? 1 : 0,
    material.depthWrite ? 1 : 0,
    material.depthFunc ?? '',
    material.colorWrite ? 1 : 0,
    material.toneMapped ? 1 : 0,
    material.fog ? 1 : 0,
    material.wireframe ? 1 : 0,
    material.polygonOffset ? 1 : 0,
    material.polygonOffsetFactor ?? 0,
    material.polygonOffsetUnits ?? 0,
    material.premultipliedAlpha ? 1 : 0,
    material.dithering ? 1 : 0,
    material.alphaToCoverage ? 1 : 0,
    material.envMapIntensity ?? '',
    material.aoMapIntensity ?? '',
    material.lightMapIntensity ?? '',
    material.normalScale?.x ?? '',
    material.normalScale?.y ?? '',
    textureId(material.map),
    textureId(material.normalMap),
    textureId(material.roughnessMap),
    textureId(material.metalnessMap),
    textureId(material.aoMap),
    textureId(material.emissiveMap),
    textureId(material.alphaMap),
    textureId(material.bumpMap),
    material.bumpScale ?? '',
    textureId(material.displacementMap),
    textureId(material.lightMap),
    textureId(material.envMap),
  ].join('|');
}

function geometrySignature(geometry) {
  if (!geometry || geometry.morphAttributes && Object.values(geometry.morphAttributes).some(list => list?.length)) return null;
  if (geometry.parameters) return `${geometry.type}:${JSON.stringify(geometry.parameters)}`;
  return `uuid:${geometry.uuid}`;
}

function buildDynamicRoots(game) {
  const roots = new Set();
  const world = game.world;
  const showcase = game.showcasePass;

  if (world.portal) roots.add(world.portal);
  for (const firefly of world.fireflies || EMPTY) roots.add(firefly);
  if (showcase?.water) roots.add(showcase.water);
  for (const foam of showcase?.foam || EMPTY) roots.add(foam);
  for (const group of showcase?.swayGroups || EMPTY) roots.add(group);
  for (const shadow of showcase?.dynamicShadows?.values?.() || EMPTY) roots.add(shadow);
  for (const item of game.natureAssetManager?.instances || EMPTY) roots.add(item);

  return roots;
}

function isStaticShadowMesh(mesh, game, dynamicRoots) {
  if (!mesh.isMesh || mesh.isSkinnedMesh || mesh.isInstancedMesh || !mesh.visible || !mesh.castShadow) return false;
  if (mesh.customDepthMaterial || mesh.customDistanceMaterial) return false;
  if (mesh.userData?.showcaseMote || mesh.userData?.assetNature) return false;

  const decor = game.world.decor;
  for (let node = mesh; node && node !== decor; node = node.parent) {
    if (!node.visible || dynamicRoots.has(node) || node.userData?.assetNature) return false;
  }
  return true;
}

function sourceBoundingSphere(mesh) {
  if (mesh.boundingSphere !== undefined) {
    if (mesh.boundingSphere === null && typeof mesh.computeBoundingSphere === 'function') mesh.computeBoundingSphere();
    return mesh.boundingSphere || null;
  }
  if (!mesh.geometry.boundingSphere) mesh.geometry.computeBoundingSphere();
  return mesh.geometry.boundingSphere || null;
}

function getCameraFrustum(camera) {
  let state = _cameraFrusta.get(camera);
  if (!state) {
    state = { matrix: new THREE.Matrix4(), frustum: new THREE.Frustum(), version: 0 };
    _cameraFrusta.set(camera, state);
  }

  _viewProjection.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  if (!state.matrix.equals(_viewProjection)) {
    state.matrix.copy(_viewProjection);
    state.frustum.setFromProjectionMatrix(state.matrix);
    state.version++;
  }
  return state;
}

function syncShadowBatch(record, camera) {
  if (!camera) return;
  const cameraState = getCameraFrustum(camera);
  if (record.lastCamera === camera && record.lastCameraVersion === cameraState.version) return;

  const { batch, entries } = record;
  let visibleCount = 0;
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (!entry.alwaysVisible && entry.worldSphere && !cameraState.frustum.intersectsSphere(entry.worldSphere)) continue;
    batch.setMatrixAt(visibleCount++, entry.matrix);
  }

  batch.count = visibleCount;
  if (visibleCount > 0) batch.instanceMatrix.needsUpdate = true;
  record.lastCamera = camera;
  record.lastCameraVersion = cameraState.version;
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

    // Preserve the original array-replacement behavior on removal frames, but avoid
    // allocating a fresh array during every normal gameplay frame.
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

function batchStaticShadowCasters(game, stats, records) {
  const decor = game.world.decor;
  const dynamicRoots = buildDynamicRoots(game);
  const groups = new Map();

  decor.updateMatrixWorld(true);
  _inverseDecor.copy(decor.matrixWorld).invert();

  decor.traverse(mesh => {
    if (!isStaticShadowMesh(mesh, game, dynamicRoots)) return;
    const geometryKey = geometrySignature(mesh.geometry);
    const materialKey = materialSignature(mesh.material);
    if (!geometryKey || !materialKey) return;

    const localMatrix = new THREE.Matrix4().multiplyMatrices(_inverseDecor, mesh.matrixWorld);
    if (localMatrix.determinant() <= 0) return;
    const sourceSphere = sourceBoundingSphere(mesh);
    const worldSphere = sourceSphere?.clone().applyMatrix4(mesh.matrixWorld) || null;
    const key = [
      geometryKey,
      materialKey,
      mesh.receiveShadow ? 1 : 0,
      mesh.renderOrder || 0,
      mesh.layers.mask,
    ].join('::');

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({
      mesh,
      matrix: localMatrix,
      worldSphere,
      alwaysVisible: mesh.frustumCulled === false,
    });
  });

  let batchedMeshes = 0;
  let batches = 0;
  let savedDrawCalls = 0;

  for (const entries of groups.values()) {
    if (entries.length < 3) continue;
    const first = entries[0].mesh;
    const batch = new THREE.InstancedMesh(first.geometry, first.material, entries.length);
    batch.name = `PerformanceShadowBatch_${first.geometry.type}_${entries.length}`;
    batch.castShadow = true;
    batch.receiveShadow = first.receiveShadow;
    batch.renderOrder = first.renderOrder;
    batch.layers.mask = first.layers.mask;
    // Per-source culling is applied in the render and shadow callbacks below.
    batch.frustumCulled = false;
    batch.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    batch.userData.performanceShadowBatch = true;
    decor.add(batch);

    const record = {
      batch,
      entries,
      lastCamera: null,
      lastCameraVersion: -1,
    };

    batch.onBeforeRender = (renderer, object, camera) => syncShadowBatch(record, camera);
    batch.onBeforeShadow = (renderer, object, camera, shadowCamera) => syncShadowBatch(record, shadowCamera);
    records.push(record);

    for (const { mesh } of entries) {
      mesh.visible = false;
      // These transforms are static and are retained only as source/proxy data. Avoid
      // recomputing their local/world matrices during the scene walk every frame.
      mesh.matrixAutoUpdate = false;
      mesh.matrixWorldAutoUpdate = false;
    }

    batchedMeshes += entries.length;
    batches++;
    savedDrawCalls += entries.length - 1;
  }

  stats.shadowBatchedMeshes += batchedMeshes;
  stats.shadowBatches += batches;
  stats.shadowEstimatedDrawCallsSaved += savedDrawCalls;
  return { batchedMeshes, batches, savedDrawCalls };
}

export function installPerformanceExtensions(game) {
  if (game.performanceExtensions) return game.performanceExtensions;

  const stats = {
    enemyFrames: 0,
    projectileFrames: 0,
    pickupFrames: 0,
    shadowBatchedMeshes: 0,
    shadowBatches: 0,
    shadowEstimatedDrawCallsSaved: 0,
  };
  const shadowBatches = [];

  installRuntimeHotPaths(game, stats);

  const extension = {
    stats,
    shadowBatches,
    batchShadowCasters() {
      if (shadowBatches.length) return {
        batchedMeshes: stats.shadowBatchedMeshes,
        batches: stats.shadowBatches,
        savedDrawCalls: stats.shadowEstimatedDrawCallsSaved,
      };
      const result = batchStaticShadowCasters(game, stats, shadowBatches);
      console.info('[Maples performance extensions]', result, stats);
      return result;
    },
  };

  game.performanceExtensions = extension;
  return extension;
}

import * as THREE from 'three';

const EMPTY = Object.freeze([]);
const _inverseDecor = new THREE.Matrix4();

function textureId(texture) {
  return texture?.uuid || '';
}

function colorId(color) {
  return color?.isColor ? color.getHexString() : '';
}

function materialSignature(material) {
  if (!material || Array.isArray(material)) return null;
  if (material.transparent || material.opacity < .999 || material.blending !== THREE.NormalBlending) return null;
  if (!material.isMeshStandardMaterial && !material.isMeshBasicMaterial && !material.isMeshLambertMaterial && !material.isMeshPhongMaterial) return null;

  return [
    material.type,
    colorId(material.color),
    colorId(material.emissive),
    material.emissiveIntensity ?? '',
    material.roughness ?? '',
    material.metalness ?? '',
    material.side,
    material.flatShading ? 1 : 0,
    material.vertexColors ? 1 : 0,
    material.alphaTest ?? 0,
    material.depthTest ? 1 : 0,
    material.depthWrite ? 1 : 0,
    material.toneMapped ? 1 : 0,
    material.fog ? 1 : 0,
    material.wireframe ? 1 : 0,
    material.polygonOffset ? 1 : 0,
    material.polygonOffsetFactor ?? 0,
    material.polygonOffsetUnits ?? 0,
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

function isDynamicMesh(mesh, game, dynamicRoots) {
  if (mesh.isSkinnedMesh || mesh.isInstancedMesh || !mesh.visible) return true;
  if (mesh.userData?.showcaseMote || mesh.userData?.assetNature) return true;

  const decor = game.world.decor;
  for (let node = mesh; node && node !== decor; node = node.parent) {
    if (dynamicRoots.has(node) || node.userData?.assetNature) return true;
  }
  return false;
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

function batchStaticDecor(game, stats) {
  const decor = game.world.decor;
  const dynamicRoots = buildDynamicRoots(game);
  const groups = new Map();

  decor.updateMatrixWorld(true);
  _inverseDecor.copy(decor.matrixWorld).invert();

  decor.traverse(mesh => {
    if (!mesh.isMesh || isDynamicMesh(mesh, game, dynamicRoots)) return;

    const geometryKey = geometrySignature(mesh.geometry);
    const materialKey = materialSignature(mesh.material);
    if (!geometryKey || !materialKey) return;

    const key = [
      geometryKey,
      materialKey,
      mesh.castShadow ? 1 : 0,
      mesh.receiveShadow ? 1 : 0,
      mesh.renderOrder || 0,
      mesh.layers.mask,
    ].join('::');

    const matrix = new THREE.Matrix4().multiplyMatrices(_inverseDecor, mesh.matrixWorld);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ mesh, matrix });
  });

  let batchedMeshes = 0;
  let batches = 0;
  let savedDrawCalls = 0;

  for (const entries of groups.values()) {
    if (entries.length < 3) continue;
    const first = entries[0].mesh;
    const batch = new THREE.InstancedMesh(first.geometry, first.material, entries.length);
    batch.name = `PerformanceBatch_${first.geometry.type}_${entries.length}`;
    batch.castShadow = first.castShadow;
    batch.receiveShadow = first.receiveShadow;
    batch.renderOrder = first.renderOrder;
    batch.layers.mask = first.layers.mask;
    batch.frustumCulled = true;
    batch.instanceMatrix.setUsage(THREE.StaticDrawUsage);

    for (let i = 0; i < entries.length; i++) batch.setMatrixAt(i, entries[i].matrix);
    batch.instanceMatrix.needsUpdate = true;
    batch.computeBoundingBox();
    batch.computeBoundingSphere();
    decor.add(batch);

    for (const { mesh } of entries) mesh.parent?.remove(mesh);

    batchedMeshes += entries.length;
    batches++;
    savedDrawCalls += entries.length - 1;
  }

  stats.rebatches++;
  stats.batchedMeshes += batchedMeshes;
  stats.instancedBatches += batches;
  stats.estimatedDrawCallsSaved += savedDrawCalls;
  return { batchedMeshes, batches, savedDrawCalls };
}

function installHudCache(game, stats) {
  const cache = Object.create(null);
  game._updateHUD = () => {
    const p = game.player;
    const hpScale = p.hp / p.maxHp;
    const hpText = `${Math.ceil(p.hp)} / ${p.maxHp}`;
    const manaScale = p.mana / p.maxMana;
    const xpScale = p.xp / p.xpToLevel;
    const levelText = `Lv. ${p.level}`;
    const comboHidden = game.combatCombo < 2 || game.combatComboTimer <= 0;

    if (cache.hpScale !== hpScale) { cache.hpScale = hpScale; game.ui.hpFill.style.transform = `scaleX(${hpScale})`; }
    if (cache.hpText !== hpText) { cache.hpText = hpText; game.ui.hpText.textContent = hpText; }
    if (cache.manaScale !== manaScale) { cache.manaScale = manaScale; game.ui.manaFill.style.transform = `scaleX(${manaScale})`; }
    if (cache.xpScale !== xpScale) { cache.xpScale = xpScale; game.ui.xpFill.style.transform = `scaleX(${xpScale})`; }
    if (cache.levelText !== levelText) { cache.levelText = levelText; game.ui.level.textContent = levelText; }
    if (cache.comboHidden !== comboHidden) { cache.comboHidden = comboHidden; game.ui.combo.classList.toggle('hidden', comboHidden); }
    stats.hudFrames++;
  };
}

function installScratchMath(game) {
  const moveForward = new THREE.Vector3();
  const moveRight = new THREE.Vector3();

  game._moveVector = move => {
    moveForward.set(Math.sin(game.cameraYaw), 0, Math.cos(game.cameraYaw)).multiplyScalar(move.y);
    moveRight.set(Math.cos(game.cameraYaw), 0, -Math.sin(game.cameraYaw)).multiplyScalar(move.x);
    return moveForward.add(moveRight);
  };

  game._updateEncounter = dt => {
    if (game.kills < game.objectiveKills && !game.bossPending) {
      let living = 0;
      for (const enemy of game.enemies) if (!enemy.dead && !enemy.isBoss) living++;
      const totalPossible = game.kills + living;
      if (living < 4 && totalPossible < game.objectiveKills) game._spawnEnemy();
      else if (living < 4 && game.kills < game.objectiveKills) game._spawnEnemy();
    }
    if (game.bossPending) { game.bossTimer -= dt; if (game.bossTimer <= 0) game._spawnBoss(); }
    if (game.boss && !game.boss.dead) game.ui.bossFill.style.transform = `scaleX(${game.boss.hp / game.boss.maxHp})`;
    if (game.victoryTimer > 0) {
      game.victoryTimer -= dt;
      if (game.victoryTimer <= 0 && !game.victoryShown) {
        game.victoryShown = true;
        game.ui.victory.classList.remove('hidden');
        document.exitPointerLock?.();
      }
    }
  };
}

function optimizeShowcaseUpdate(game, stats) {
  const pass = game.showcasePass;
  if (!pass?.root || pass._performanceWrapped) return;
  pass._performanceWrapped = true;

  const motes = [];
  pass.root.traverse(object => { if (object.userData?.showcaseMote) motes.push(object); });
  const originalUpdate = pass.update.bind(pass);
  const nativeTraverse = pass.root.traverse;

  pass.update = dt => {
    const manager = game.natureAssetManager;
    const savedInstances = manager?.instances;
    const savedTraverse = pass.root.traverse;

    // ShowcasePass' nature sway is immediately overwritten by NatureAssets before render.
    // QualityGate's later micro-gust still runs, so hiding these instances here changes no pixels.
    if (manager?.instances?.length) manager.instances = EMPTY;
    pass.root.traverse = callback => { for (const mote of motes) callback(mote); };

    try {
      originalUpdate(dt);
      stats.showcaseFrames++;
    } finally {
      pass.root.traverse = savedTraverse || nativeTraverse;
      if (manager && savedInstances) manager.instances = savedInstances;
    }
  };
}

export function installPerformancePass(game) {
  if (game.performancePass) return game.performancePass;

  const stats = {
    rebatches: 0,
    batchedMeshes: 0,
    instancedBatches: 0,
    estimatedDrawCallsSaved: 0,
    hudFrames: 0,
    showcaseFrames: 0,
  };

  installHudCache(game, stats);
  installScratchMath(game);
  optimizeShowcaseUpdate(game, stats);

  const pass = {
    stats,
    rebatch() {
      const result = batchStaticDecor(game, stats);
      console.info('[Maples performance]', result, stats);
      return result;
    },
  };

  game.performancePass = pass;
  pass.rebatch();
  return pass;
}

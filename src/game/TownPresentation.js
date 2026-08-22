import * as THREE from 'three';
import { clone as cloneSkeleton } from 'three/addons/utils/SkeletonUtils.js';

const Y_AXIS = new THREE.Vector3(0, 1, 0);
const SURFACE_CACHE = new WeakMap();
const GLADE_RADIUS = 34;
const NORTH_HALF_WIDTH = 28;
const NORTH_MAX_Z = 50;
const TOWN_CONNECTION_Z = 9.4;

function hash2(x, y, seed) {
  let h = Math.imul((x | 0) ^ seed, 0x27d4eb2d);
  h = Math.imul(h ^ ((y | 0) + 0x9e3779b9), 0x85ebca6b);
  h ^= h >>> 15;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function smoothstep01(t) {
  return t * t * (3 - 2 * t);
}

function valueNoise(x, y, seed) {
  const x0 = Math.floor(x), y0 = Math.floor(y);
  const tx = smoothstep01(x - x0), ty = smoothstep01(y - y0);
  const a = hash2(x0, y0, seed), b = hash2(x0 + 1, y0, seed);
  const c = hash2(x0, y0 + 1, seed), d = hash2(x0 + 1, y0 + 1, seed);
  const ab = THREE.MathUtils.lerp(a, b, tx);
  const cd = THREE.MathUtils.lerp(c, d, tx);
  return THREE.MathUtils.lerp(ab, cd, ty);
}

function fbm(x, y, seed) {
  let value = 0, amplitude = .55, frequency = 1;
  for (let octave = 0; octave < 4; octave++) {
    value += valueNoise(x * frequency, y * frequency, seed + octave * 977) * amplitude;
    frequency *= 2.05;
    amplitude *= .5;
  }
  return value / 1.03125;
}

function surfaceSample(kind, u, v) {
  const broad = fbm(u * 5.1, v * 5.1, kind === 'grass' ? 4127 : kind === 'dirt' ? 9137 : 15137);
  const fine = fbm(u * 22.0, v * 22.0, kind === 'grass' ? 7331 : kind === 'dirt' ? 11317 : 17321);

  if (kind === 'grass') {
    const blade = Math.max(0, .5 - Math.abs((u * 74 + v * 33) % 1 - .5)) * .12;
    const h = THREE.MathUtils.clamp(.28 + broad * .43 + fine * .22 + blade, 0, 1);
    return { h, color: [44 + h * 34, 78 + h * 43, 49 + h * 31] };
  }

  if (kind === 'dirt') {
    const pebble = hash2(Math.floor(u * 96), Math.floor(v * 96), 24181) > .935 ? .2 : 0;
    const h = THREE.MathUtils.clamp(.3 + broad * .4 + fine * .18 + pebble, 0, 1);
    return { h, color: [91 + h * 45, 69 + h * 37, 48 + h * 25] };
  }

  const cols = 10, rows = 10;
  const cx = u * cols, cy = v * rows;
  const ix = Math.floor(cx), iy = Math.floor(cy);
  const fx = cx - ix, fy = cy - iy;
  const jitterX = (hash2(ix, iy, 38117) - .5) * .22;
  const jitterY = (hash2(ix, iy, 42131) - .5) * .22;
  const dx = Math.abs(fx - .5 - jitterX);
  const dy = Math.abs(fy - .5 - jitterY);
  const mortar = Math.max(dx, dy) > .43 ? 1 : 0;
  const stoneSeed = hash2(ix, iy, 45707);
  const h = mortar ? .13 : THREE.MathUtils.clamp(.44 + stoneSeed * .22 + broad * .18 + fine * .08, 0, 1);
  const moss = Math.max(0, broad - .62) * (mortar ? 1.7 : .45);
  return {
    h,
    color: mortar
      ? [70 + moss * 28, 77 + moss * 42, 70 + moss * 23]
      : [102 + h * 35 - moss * 12, 109 + h * 31 + moss * 18, 101 + h * 26 - moss * 6]
  };
}

function buildSurfaceSet(renderer, kind, size = 128) {
  let rendererCache = SURFACE_CACHE.get(renderer);
  if (!rendererCache) {
    rendererCache = new Map();
    SURFACE_CACHE.set(renderer, rendererCache);
  }
  if (rendererCache.has(kind)) return rendererCache.get(kind);

  const heights = new Float32Array(size * size);
  const colorData = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const index = y * size + x;
      const sample = surfaceSample(kind, x / size, y / size);
      heights[index] = sample.h;
      const ci = index * 4;
      colorData[ci] = THREE.MathUtils.clamp(Math.round(sample.color[0]), 0, 255);
      colorData[ci + 1] = THREE.MathUtils.clamp(Math.round(sample.color[1]), 0, 255);
      colorData[ci + 2] = THREE.MathUtils.clamp(Math.round(sample.color[2]), 0, 255);
      colorData[ci + 3] = 255;
    }
  }

  const normalData = new Uint8Array(size * size * 4);
  const strength = kind === 'stone' ? 8.5 : kind === 'dirt' ? 5.8 : 4.4;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const xm = (x - 1 + size) % size, xp = (x + 1) % size;
      const ym = (y - 1 + size) % size, yp = (y + 1) % size;
      const left = heights[y * size + xm], right = heights[y * size + xp];
      const down = heights[ym * size + x], up = heights[yp * size + x];
      const nx = (left - right) * strength;
      const ny = 2;
      const nz = (down - up) * strength;
      const inv = 1 / Math.max(.0001, Math.hypot(nx, ny, nz));
      const i = (y * size + x) * 4;
      normalData[i] = Math.round((nx * inv * .5 + .5) * 255);
      normalData[i + 1] = Math.round((nz * inv * .5 + .5) * 255);
      normalData[i + 2] = Math.round((ny * inv * .5 + .5) * 255);
      normalData[i + 3] = 255;
    }
  }

  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy?.() || 1);
  const map = new THREE.DataTexture(colorData, size, size, THREE.RGBAFormat);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = maxAniso;
  map.needsUpdate = true;

  const normalMap = new THREE.DataTexture(normalData, size, size, THREE.RGBAFormat);
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.anisotropy = maxAniso;
  normalMap.needsUpdate = true;

  const result = { map, normalMap };
  rendererCache.set(kind, result);
  return result;
}

function surfaceMaterial(renderer, kind, repeatX, repeatY) {
  const base = buildSurfaceSet(renderer, kind);
  const map = base.map.clone();
  const normalMap = base.normalMap.clone();
  map.wrapS = map.wrapT = normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeatX, repeatY);
  normalMap.repeat.set(repeatX, repeatY);
  map.needsUpdate = normalMap.needsUpdate = true;
  return new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map,
    normalMap,
    normalScale: new THREE.Vector2(kind === 'stone' ? .72 : kind === 'dirt' ? .52 : .42, kind === 'stone' ? .72 : kind === 'dirt' ? .52 : .42),
    roughness: kind === 'stone' ? .88 : .97,
    metalness: 0
  });
}

function addGround(parent, geometry, material, x, z, y = .014, rotationY = 0) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.rotation.z = rotationY;
  mesh.position.set(x, y, z);
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  mesh.userData.townSurface = true;
  parent.add(mesh);
  return mesh;
}

function addRoadSegment(parent, renderer, a, b, width, repeatScale = 2.8) {
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const length = Math.hypot(dx, dz);
  const mat = surfaceMaterial(renderer, 'dirt', width / repeatScale, length / repeatScale);
  return addGround(
    parent,
    new THREE.PlaneGeometry(width, length, 1, 1),
    mat,
    (a[0] + b[0]) * .5,
    (a[1] + b[1]) * .5,
    .024,
    -Math.atan2(dx, dz)
  );
}

function installSurfaceWorld(town, manager) {
  const { game, root } = town;
  const renderer = game.renderer;

  const earth = new THREE.Mesh(
    new THREE.BoxGeometry(66, 1.15, 88),
    new THREE.MeshStandardMaterial({ color: 0x4d4435, roughness: 1 })
  );
  earth.position.set(0, -.59, 8);
  earth.receiveShadow = true;
  earth.userData.townSurface = true;
  root.add(earth);

  manager.surfaces.grass = addGround(root, new THREE.PlaneGeometry(64, 86), surfaceMaterial(renderer, 'grass', 21, 28), 0, 8, .012);

  const mainRoadPoints = [[0,-31],[0,-18],[.5,-5],[-.35,9.8],[0,22.1],[.25,36],[0,48.5]];
  for (let i = 0; i < mainRoadPoints.length - 1; i++) manager.surfaces.roads.push(addRoadSegment(root, renderer, mainRoadPoints[i], mainRoadPoints[i + 1], 5.1));
  manager.surfaces.roads.push(addRoadSegment(root, renderer, [-25,22.2], [25,22.2], 4.6));
  manager.surfaces.roads.push(addRoadSegment(root, renderer, [-19,36.1], [19,36.1], 3.5));
  manager.surfaces.roads.push(addRoadSegment(root, renderer, [-18,22.2], [-24,31.5], 2.7));
  manager.surfaces.roads.push(addRoadSegment(root, renderer, [18,22.2], [24,31.5], 2.7));

  manager.surfaces.plaza = addGround(root, new THREE.CircleGeometry(6.15, 48), surfaceMaterial(renderer, 'stone', 6.5, 6.5), 0, 22.1, .035);
  manager.surfaces.gateApron = addGround(root, new THREE.PlaneGeometry(9.2, 5.0), surfaceMaterial(renderer, 'stone', 4.8, 2.6), 0, 10.8, .033);

  const terrace = addGround(root, new THREE.PlaneGeometry(18, 8.5), surfaceMaterial(renderer, 'stone', 9, 4), 0, 41.5, .026);
  terrace.userData.townNorthTerrace = true;
  manager.surfaces.terrace = terrace;

  game.world.arenaRadius = Math.max(game.world.arenaRadius || 28, GLADE_RADIUS);
  game.world.clampToArena = position => {
    if (position.z > TOWN_CONNECTION_Z) {
      position.x = THREE.MathUtils.clamp(position.x, -NORTH_HALF_WIDTH, NORTH_HALF_WIDTH);
      position.z = Math.min(position.z, NORTH_MAX_Z);
      return;
    }
    const distance = Math.hypot(position.x, position.z);
    if (distance > GLADE_RADIUS) {
      const scale = GLADE_RADIUS / distance;
      position.x *= scale;
      position.z *= scale;
    }
  };

  manager.bounds = { gladeRadius: GLADE_RADIUS, halfWidth: NORTH_HALF_WIDTH, northMaxZ: NORTH_MAX_Z };
  town.__expandedWorldBounds = true;
  town.__surfaceDetail = true;
}

function cloneEnvironmentRoot(game, name, position, rotationY = 0, scaleMultiplier = 1) {
  const source = game.environmentAssetManager?.roots?.find(root => root.name === name);
  if (!source) return null;
  const clone = source.clone(true);
  const baseY = source.position.y;
  clone.position.set(position[0], position[1] ?? baseY, position[2]);
  clone.rotation.y = rotationY;
  clone.scale.copy(source.scale).multiplyScalar(scaleMultiplier);
  clone.userData.assetTownEnvironment = true;
  clone.traverse(node => {
    if (!node.isMesh) return;
    node.castShadow = false;
    node.receiveShadow = true;
    node.frustumCulled = true;
  });
  return clone;
}

function installEnvironmentLayer(town, manager) {
  const { game, root } = town;
  const placements = [
    ['KayKit_Glade_Arch', [0,0,10.6], 0, 1.08],
    ['KayKit_Shrine_Stairs', [0,.018,39.1], 0, .92],
    ['KayKit_Broken_Ruin', [-23.8,0,34.2], .28, .82],
    ['KayKit_Broken_Ruin', [23.5,0,34.0], -.35, .78],
    ['KayKit_Broken_Ruin', [-25.2,0,17.5], 1.12, .72],
    ['KayKit_Broken_Ruin', [25.0,0,17.8], -1.1, .72],
    ['KayKit_Ruin_Pillar', [-8.0,0,40.2], .15, .8],
    ['KayKit_Ruin_Pillar', [8.0,0,40.2], -.15, .8],
    ['KayKit_Lit_Torch', [-3.0,.03,10.55], 0, .92],
    ['KayKit_Lit_Torch', [3.0,.03,10.55], Math.PI, .92],
    ['KayKit_Lit_Torch', [-5.2,.03,22.1], .35, .86],
    ['KayKit_Lit_Torch', [5.2,.03,22.1], -.35, .86],
  ];

  for (const [name, position, rotationY, scale] of placements) {
    const model = cloneEnvironmentRoot(game, name, position, rotationY, scale);
    if (!model) continue;
    root.add(model);
    manager.environment.push(model);
  }

  for (const [x,z] of [[-3,10.55],[3,10.55]]) {
    const light = new THREE.PointLight(0xffa85a, game.quality === 'high' ? 1.25 : .82, 5.5, 2);
    light.position.set(x,1.7,z);
    light.castShadow = false;
    root.add(light);
    manager.lights.push(light);
  }
}

function seededRandom(seed = 0x91A73F) {
  return () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function installExpandedNature(town, manager) {
  const natureManager = town.game.natureAssetManager;
  if (!natureManager?.instances?.length) return;
  const templates = new Map();
  for (const item of natureManager.instances) if (item?.userData?.kind && !templates.has(item.userData.kind)) templates.set(item.userData.kind, item);
  const random = seededRandom();
  const high = town.game.quality === 'high';
  const counts = { pine: high ? 22 : 12, bush: high ? 26 : 14, fern: high ? 34 : 18, grass: high ? 46 : 24 };

  for (const [kind, count] of Object.entries(counts)) {
    const template = templates.get(kind);
    if (!template) continue;
    for (let i = 0; i < count; i++) {
      let x, z;
      if (kind === 'pine') {
        const side = i % 3;
        if (side === 0) { x = -24.5 - random() * 5.5; z = 10 + random() * 38; }
        else if (side === 1) { x = 24.5 + random() * 5.5; z = 10 + random() * 38; }
        else { x = -24 + random() * 48; z = 44 + random() * 5; }
      } else {
        const edgeBias = random();
        x = (random() - .5) * (edgeBias > .55 ? 55 : 44);
        z = 10 + random() * 39;
        if (Math.abs(x) < 9 && z > 16 && z < 39) x += (x < 0 ? -1 : 1) * (8 + random() * 6);
      }

      const clone = template.clone(true);
      const sourceY = template.position.y;
      clone.position.set(x, sourceY, z);
      clone.rotation.y = random() * Math.PI * 2;
      clone.rotation.z = clone.userData.baseRotationZ || 0;
      clone.scale.copy(template.scale).multiplyScalar(.72 + random() * .7);
      clone.userData = { ...template.userData, assetNature: true, townExpansion: true, phase: random() * Math.PI * 2 };
      clone.traverse(node => {
        if (!node.isMesh) return;
        node.castShadow = high && kind === 'pine' && i < 5;
        node.receiveShadow = true;
        node.frustumCulled = true;
      });
      town.game.world.decor.add(clone);
      natureManager.instances.push(clone);
      manager.nature.push(clone);
    }
  }
  natureManager.count = natureManager.instances.length;
}

function roleAccessory(role, color) {
  const group = new THREE.Group();
  group.userData.townVillagerAccessory = true;
  const dark = new THREE.MeshStandardMaterial({ color: 0x3d342e, roughness: .9 });
  const accent = new THREE.MeshStandardMaterial({ color, roughness: .82 });
  if (/blacksmith/i.test(role)) {
    const apron = new THREE.Mesh(new THREE.BoxGeometry(.5,.62,.055), accent);
    apron.position.set(0,1.0,.29); group.add(apron);
  } else if (/apothecary|arcanist/i.test(role)) {
    const satchel = new THREE.Mesh(new THREE.BoxGeometry(.28,.32,.13), accent);
    satchel.position.set(.34,.94,.08); satchel.rotation.z=-.08; group.add(satchel);
  } else if (/innkeeper|provisioner/i.test(role)) {
    const apron = new THREE.Mesh(new THREE.BoxGeometry(.46,.5,.05), accent);
    apron.position.set(0,.92,.29); group.add(apron);
  } else {
    const pouch = new THREE.Mesh(new THREE.BoxGeometry(.22,.24,.12), dark);
    pouch.position.set(-.33,.83,.08); group.add(pouch);
  }
  group.traverse(node => { if (node.isMesh) { node.castShadow=false; node.receiveShadow=true; } });
  return group;
}

function configureVillagerModel(model, npc, index, high) {
  const gearNames = new Set(['1H_Sword_Offhand','Badge_Shield','Rectangle_Shield','Round_Shield','Spike_Shield','1H_Sword','2H_Sword','Knight_Helmet','Knight_Cape']);
  const tint = new THREE.Color(npc.color || 0x657765);
  model.traverse(node => {
    if (gearNames.has(node.name)) node.visible = false;
    if (!node.isMesh && !node.isSkinnedMesh) return;
    node.castShadow = high && index < 2;
    node.receiveShadow = true;
    if (node.isSkinnedMesh) node.frustumCulled = false;
    const sourceList = Array.isArray(node.material) ? node.material : [node.material];
    const copies = sourceList.filter(Boolean).map(source => {
      const copy = source.clone();
      if (copy.color && /Body|Arm|Leg/i.test(node.name)) copy.color.lerp(tint, .5);
      if (copy.color && /Head/i.test(node.name)) copy.color.lerp(new THREE.Color([0xe2b08c,0xc78f6c,0xa97658,0xd4a17b][index % 4]), .3);
      if ('roughness' in copy) copy.roughness = Math.max(.68, copy.roughness ?? .8);
      return copy;
    });
    if (copies.length) node.material = Array.isArray(node.material) ? copies : copies[0];
  });
}

function findClip(clips, names) {
  for (const name of names) {
    const exact = clips?.find(clip => clip.name === name);
    if (exact) return exact;
  }
  return null;
}

function installHeroVillagers(town, manager) {
  const source = town.game.player?.assetVisual;
  const clips = town.game.player?.assetAnimator?.clips || [];
  if (!source) return;
  const keepers = town.npcs.filter(npc => npc.keeper).slice(0, 6);
  const high = town.game.quality === 'high';
  keepers.forEach((npc, index) => {
    const model = cloneSkeleton(source);
    configureVillagerModel(model, npc, index, high);
    const y = model.position.y;
    model.position.set(npc.position.x, y, npc.position.z);
    model.rotation.y = npc.facing;
    model.scale.multiplyScalar(.92 + (index % 4) * .035);
    model.add(roleAccessory(npc.role, npc.color));
    model.userData.assetTownVillager = true;
    town.dynamic.add(model);
    npc.assetVillager = model;
    npc.assetVillagerY = y;
    manager.villagers.push(model);

    const clip = findClip(clips, ['Unarmed_Idle','Idle']);
    if (clip) {
      const mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(clip);
      action.time = (index / Math.max(1, keepers.length)) * Math.min(clip.duration, 1.3);
      action.setEffectiveTimeScale(.88 + index * .035);
      action.play();
      manager.mixers.push(mixer);
    }
  });
}

function makeInstanced(geometry, count, roughness = .86, high = false) {
  const material = new THREE.MeshStandardMaterial({ color:0xffffff, roughness, vertexColors:true });
  const inst = new THREE.InstancedMesh(geometry, material, count);
  inst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  inst.castShadow = high;
  inst.receiveShadow = true;
  inst.frustumCulled = true;
  return inst;
}

function installInstancedVillagers(town, manager) {
  const count = town.npcs.length;
  const high = town.game.quality === 'high';
  const meshes = {
    torso: makeInstanced(new THREE.CylinderGeometry(.27,.35,.72,8), count, .84, high),
    head: makeInstanced(new THREE.SphereGeometry(.225,9,7), count, .88, high),
    legL: makeInstanced(new THREE.CylinderGeometry(.075,.09,.52,6), count, .9, high),
    legR: makeInstanced(new THREE.CylinderGeometry(.075,.09,.52,6), count, .9, high),
    armL: makeInstanced(new THREE.CapsuleGeometry(.06,.36,3,5), count, .86, high),
    armR: makeInstanced(new THREE.CapsuleGeometry(.06,.36,3,5), count, .86, high),
    hair: makeInstanced(new THREE.SphereGeometry(.232,8,6), count, .92, false),
    hat: makeInstanced(new THREE.ConeGeometry(.26,.36,7), count, .9, false),
    belt: makeInstanced(new THREE.TorusGeometry(.29,.024,5,14), count, .78, false),
  };
  for (const mesh of Object.values(meshes)) town.dynamic.add(mesh);
  manager.instancedVillagers = meshes;

  town.npcs.forEach((npc, index) => {
    const body = new THREE.Color(npc.color || 0x647466);
    const skin = new THREE.Color([0xe2b08c,0xc78f6c,0xa97658,0xd4a17b][index % 4]);
    const dark = new THREE.Color([0x332e2a,0x2d4038,0x443947,0x4b3d30][index % 4]);
    const hair = new THREE.Color([0x382c26,0x674837,0x242526,0x8a694d][index % 4]);
    meshes.torso.setColorAt(index, body);
    meshes.head.setColorAt(index, skin);
    meshes.legL.setColorAt(index, dark);
    meshes.legR.setColorAt(index, dark);
    meshes.armL.setColorAt(index, body.clone().lerp(skin,.12));
    meshes.armR.setColorAt(index, body.clone().lerp(skin,.12));
    meshes.hair.setColorAt(index, hair);
    meshes.hat.setColorAt(index, dark);
    meshes.belt.setColorAt(index, new THREE.Color(0x4a3527));
  });
  for (const mesh of Object.values(meshes)) if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

  const object = new THREE.Object3D();
  const offset = new THREE.Vector3();
  function setPart(inst, index, npc, x, y, z, sx=1, sy=1, sz=1, pitch=0, yawOffset=0, roll=0) {
    const yaw = npc.facing + yawOffset;
    offset.set(x,y,z).applyAxisAngle(Y_AXIS,yaw).add(npc.position);
    object.position.copy(offset);
    object.rotation.set(pitch,yaw,roll,'YXZ');
    object.scale.set(sx,sy,sz);
    object.updateMatrix();
    inst.setMatrixAt(index,object.matrix);
  }

  const originalUpdate = town._updateNpcMatrices.bind(town);
  town._updateNpcMatrices = function updatePresentationNpcMatrices(force=false) {
    originalUpdate(force);
    if (!force && this.game.quality !== 'high' && this.frame % 2) return;
    for (const npc of this.npcs) {
      const hidden = Boolean(npc.assetVillager);
      const visible = hidden ? .001 : 1;
      const moving = !npc.keeper && npc.route.length > 1 && npc.pause <= 0;
      const step = moving ? Math.sin(this.time*8+npc.phase) : 0;
      const bob = moving ? Math.abs(step)*.035 : Math.sin(this.time*1.7+npc.phase)*.012;
      const swing = moving ? step*.42 : Math.sin(this.time*1.2+npc.phase)*.025;
      setPart(meshes.torso,npc.index,npc,0,1.08+bob,0,visible,visible,visible);
      setPart(meshes.head,npc.index,npc,0,1.72+bob,.01,visible,visible,visible);
      setPart(meshes.legL,npc.index,npc,-.11,.43+step*.035,.01,visible,visible,visible,step*.12);
      setPart(meshes.legR,npc.index,npc,.11,.43-step*.035,.01,visible,visible,visible,-step*.12);
      setPart(meshes.armL,npc.index,npc,-.34,1.15+bob,0,visible,visible,visible,swing);
      setPart(meshes.armR,npc.index,npc,.34,1.15+bob,0,visible,visible,visible,-swing);
      const hatVisible = visible * ((npc.index % 4 === 0 || /Warden|Mason|Carpenter/i.test(npc.role)) ? 1 : .001);
      const hairVisible = visible * (hatVisible > .01 ? .52 : 1);
      setPart(meshes.hair,npc.index,npc,0,1.88+bob,-.01,hairVisible, hairVisible*.58, hairVisible);
      setPart(meshes.hat,npc.index,npc,0,2.04+bob,0,hatVisible,hatVisible,hatVisible);
      setPart(meshes.belt,npc.index,npc,0,.88+bob,0,visible,visible,visible,Math.PI/2);
    }
    for (const mesh of Object.values(meshes)) mesh.instanceMatrix.needsUpdate = true;
  };

  for (const old of Object.values(town.npcMeshes || {})) old.visible = false;
  town._updateNpcMatrices(true);
}

function installVillagerUpdate(town, manager) {
  const originalUpdate = town.update.bind(town);
  town.update = function updateTownPresentation(dt) {
    const result = originalUpdate(dt);
    for (const mixer of manager.mixers) mixer.update(dt);
    for (const npc of this.npcs) {
      const model = npc.assetVillager;
      if (!model) continue;
      model.position.x = npc.position.x;
      model.position.z = npc.position.z;
      model.position.y = npc.assetVillagerY;
      model.rotation.y = npc.facing;
    }
    return result;
  };
}

export function installTownPresentation(town) {
  if (!town || town.presentation?.ready) return town?.presentation || null;
  const manager = town.presentation = {
    ready: false,
    surfaces: { grass:null, roads:[], plaza:null, gateApron:null, terrace:null },
    environment: [],
    nature: [],
    villagers: [],
    instancedVillagers: null,
    mixers: [],
    lights: [],
    bounds: null,
    failures: []
  };

  try {
    installSurfaceWorld(town, manager);
    installEnvironmentLayer(town, manager);
    installExpandedNature(town, manager);
    installHeroVillagers(town, manager);
    installInstancedVillagers(town, manager);
    installVillagerUpdate(town, manager);
    manager.ready = true;
    town.__assetTownPresentation = true;
  } catch (error) {
    manager.failures.push(String(error?.stack || error));
    console.error('Could not complete the expanded Lumenwood presentation layer.', error);
  }
  return manager;
}

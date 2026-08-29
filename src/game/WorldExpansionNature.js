import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const cache = new Map();
const V = new THREE.Vector3();

const NATURE = Object.freeze({
  pine: '/assets/nature/lumen-pine.glb',
  bush: '/assets/nature/flowering-bush.glb',
  fern: '/assets/nature/fern.glb',
  grass: '/assets/nature/wispy-grass.glb',
});

function seededRandom(seed = 0x574F4F44) {
  return () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function load(url) {
  if (!cache.has(url)) cache.set(url, loader.loadAsync(url));
  return cache.get(url);
}

function configure(root, renderer, { castShadow = false } = {}) {
  const anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy?.() || 1);
  root.traverse(node => {
    if (!node.isMesh) return;
    node.castShadow = castShadow;
    node.receiveShadow = true;
    node.frustumCulled = true;
    if (node.material?.map) node.material.map.anisotropy = anisotropy;
    if (node.material && 'roughness' in node.material) node.material.roughness = Math.max(.72, node.material.roughness ?? .8);
  });
  return root;
}

function normalize(root, targetHeight) {
  root.updateMatrixWorld(true);
  let box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(V);
  if (size.y > .001) root.scale.multiplyScalar(targetHeight / size.y);
  root.updateMatrixWorld(true);
  box = new THREE.Box3().setFromObject(root);
  const center = box.getCenter(V);
  root.position.x -= center.x;
  root.position.z -= center.z;
  root.position.y -= box.min.y;
  root.updateMatrixWorld(true);
  return root;
}

function place(parent, template, { x, z, scale, ry, kind, sway, castShadow = false }) {
  const model = template.clone(true);
  model.position.x += x;
  model.position.z += z;
  model.scale.multiplyScalar(scale);
  model.rotation.y = ry;
  model.userData.assetNature = true;
  model.userData.worldExpansionNature = true;
  model.userData.kind = kind;
  model.userData.baseRotationZ = model.rotation.z;
  model.userData.sway = sway;
  model.userData.phase = (x * .37 + z * .53) % (Math.PI * 2);
  if (!castShadow) model.traverse(node => { if (node.isMesh) node.castShadow = false; });
  parent.add(model);
  return model;
}

function corridorSample(random, corridor, sideMin = 1.2, sideMax = 7.5) {
  const t = random();
  const x = THREE.MathUtils.lerp(corridor.ax, corridor.bx, t);
  const z = THREE.MathUtils.lerp(corridor.az, corridor.bz, t);
  const dx = corridor.bx - corridor.ax;
  const dz = corridor.bz - corridor.az;
  const length = Math.hypot(dx, dz) || 1;
  const nx = -dz / length;
  const nz = dx / length;
  const side = random() < .5 ? -1 : 1;
  const offset = corridor.radius + sideMin + random() * (sideMax - sideMin);
  return { x: x + nx * offset * side, z: z + nz * offset * side };
}

function ringSample(random, cx, cz, inner, outer) {
  const a = random() * Math.PI * 2;
  const r = THREE.MathUtils.lerp(inner, outer, Math.sqrt(random()));
  return { x: cx + Math.cos(a) * r, z: cz + Math.sin(a) * r };
}

export async function installWorldExpansionNature(game) {
  if (game.worldExpansionNature) return game.worldExpansionNature;

  const manager = game.worldExpansionNature = {
    ready: false,
    count: 0,
    instances: [],
    failures: [],
  };

  try {
    const [pineGltf, bushGltf, fernGltf, grassGltf] = await Promise.all([
      load(NATURE.pine), load(NATURE.bush), load(NATURE.fern), load(NATURE.grass),
    ]);

    const pine = normalize(configure(pineGltf.scene.clone(true), game.renderer, { castShadow: true }), 6.4);
    const bush = normalize(configure(bushGltf.scene.clone(true), game.renderer, { castShadow: true }), 1.15);
    const fern = normalize(configure(fernGltf.scene.clone(true), game.renderer), .72);
    const grass = normalize(configure(grassGltf.scene.clone(true), game.renderer), .42);

    const parent = game.world.decor;
    const random = seededRandom();
    const high = game.quality === 'high';
    const corridors = [
      { ax: 0, az: 22, bx: 6, bz: 78, radius: 6.7 },
      { ax: 20, az: 4, bx: 64, bz: 16, radius: 6.2 },
      { ax: -19, az: -2, bx: -62, bz: -31, radius: 6.0 },
    ];
    const destinations = [
      { x: 7, z: 80, inner: 12.2, outer: 18.6 },
      { x: 66, z: 16, inner: 12.2, outer: 18.6 },
      { x: -64, z: -32, inner: 12.2, outer: 18.6 },
    ];

    const add = (template, point, kind, scaleMin, scaleMax, swayMin, swayMax, castShadow = false) => {
      const instance = place(parent, template, {
        x: point.x,
        z: point.z,
        scale: THREE.MathUtils.lerp(scaleMin, scaleMax, random()),
        ry: random() * Math.PI * 2,
        kind,
        sway: THREE.MathUtils.lerp(swayMin, swayMax, random()),
        castShadow,
      });
      manager.instances.push(instance);
      return instance;
    };

    const pineCount = high ? 46 : 24;
    for (let i = 0; i < pineCount; i++) {
      const point = i < Math.floor(pineCount * .58)
        ? corridorSample(random, corridors[i % corridors.length], 2.0, 10.5)
        : ringSample(random, destinations[i % destinations.length].x, destinations[i % destinations.length].z, 12.2, 19.4);
      add(pine, point, 'pine', .78, 1.32, .008, .018, high && i < 7);
    }

    const bushCount = high ? 58 : 30;
    for (let i = 0; i < bushCount; i++) {
      const point = i % 2
        ? corridorSample(random, corridors[i % corridors.length], .9, 6.4)
        : ringSample(random, destinations[i % destinations.length].x, destinations[i % destinations.length].z, 8.8, 17.2);
      add(bush, point, 'bush', .58, 1.15, .012, .022, high && i < 5);
    }

    const fernCount = high ? 84 : 44;
    for (let i = 0; i < fernCount; i++) {
      const point = i % 3
        ? corridorSample(random, corridors[i % corridors.length], .55, 5.2)
        : ringSample(random, destinations[i % destinations.length].x, destinations[i % destinations.length].z, 5.5, 16.5);
      add(fern, point, 'fern', .52, 1.15, .018, .038, false);
    }

    const grassCount = high ? 112 : 58;
    for (let i = 0; i < grassCount; i++) {
      const point = i % 4
        ? corridorSample(random, corridors[i % corridors.length], .25, 4.8)
        : ringSample(random, destinations[i % destinations.length].x, destinations[i % destinations.length].z, 4.5, 16.8);
      add(grass, point, 'grass', .5, 1.35, .022, .05, false);
    }

    // The existing nature animation + instancing pipeline owns these roots once the
    // base nature manager is ready, so the expansion gets the same wind and batching.
    if (game.natureAssetManager?.instances) {
      game.natureAssetManager.instances.push(...manager.instances);
      game.natureAssetManager.count = game.natureAssetManager.instances.length;
    }

    manager.count = manager.instances.length;
    manager.ready = true;
    return manager;
  } catch (error) {
    manager.failures.push(String(error));
    console.error('Could not install expanded-world nature layer.', error);
    return manager;
  }
}

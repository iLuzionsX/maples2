import * as THREE from 'three';

function seededRandom(seed = 0x574F4F44) {
  return () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function prototypeFor(manager, kind) {
  return manager?.instances?.find(instance => instance.userData?.kind === kind) || null;
}

function place(parent, prototype, { x, z, scale, ry, kind, sway, castShadow = false }) {
  const model = prototype.clone(true);
  const baseY = prototype.position.y;
  const baseRotationZ = prototype.userData.baseRotationZ ?? prototype.rotation.z;
  model.position.set(x, baseY, z);
  model.scale.copy(prototype.scale).multiplyScalar(scale);
  model.rotation.set(prototype.rotation.x, ry, baseRotationZ);
  model.userData.assetNature = true;
  model.userData.worldExpansionNature = true;
  model.userData.kind = kind;
  model.userData.baseRotationZ = baseRotationZ;
  model.userData.sway = sway;
  model.userData.phase = (x * .37 + z * .53) % (Math.PI * 2);
  model.traverse(node => {
    if (!node.isMesh) return;
    node.castShadow = castShadow;
    node.receiveShadow = true;
    node.frustumCulled = true;
  });
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
    reusedBasePrototypes: false,
  };

  try {
    const baseManager = game.natureAssetManager;
    if (!baseManager?.ready || !baseManager.instances?.length) {
      throw new Error('Base nature assets are not ready; expanded nature requires the existing shared prototypes.');
    }

    const pine = prototypeFor(baseManager, 'pine');
    const bush = prototypeFor(baseManager, 'bush');
    const fern = prototypeFor(baseManager, 'fern');
    const grass = prototypeFor(baseManager, 'grass');
    if (!pine || !bush || !fern || !grass) {
      throw new Error('One or more base nature prototypes are missing.');
    }

    const parent = game.world.decor;
    const random = seededRandom();
    const high = game.quality === 'high';
    const corridors = [
      { ax: 0, az: 22, bx: 6, bz: 78, radius: 6.7 },
      { ax: 20, az: 4, bx: 64, bz: 16, radius: 6.2 },
      { ax: -19, az: -2, bx: -62, bz: -31, radius: 6.0 },
    ];
    const destinations = [
      { x: 7, z: 80 },
      { x: 66, z: 16 },
      { x: -64, z: -32 },
    ];

    const add = (prototype, point, kind, scaleMin, scaleMax, swayMin, swayMax, castShadow = false) => {
      const instance = place(parent, prototype, {
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
      const destination = destinations[i % destinations.length];
      const point = i < Math.floor(pineCount * .58)
        ? corridorSample(random, corridors[i % corridors.length], 2.0, 10.5)
        : ringSample(random, destination.x, destination.z, 12.2, 19.4);
      add(pine, point, 'pine', .76, 1.22, .008, .018, high && i < 7);
    }

    const bushCount = high ? 58 : 30;
    for (let i = 0; i < bushCount; i++) {
      const destination = destinations[i % destinations.length];
      const point = i % 2
        ? corridorSample(random, corridors[i % corridors.length], .9, 6.4)
        : ringSample(random, destination.x, destination.z, 8.8, 17.2);
      add(bush, point, 'bush', .62, 1.18, .012, .022, high && i < 5);
    }

    const fernCount = high ? 84 : 44;
    for (let i = 0; i < fernCount; i++) {
      const destination = destinations[i % destinations.length];
      const point = i % 3
        ? corridorSample(random, corridors[i % corridors.length], .55, 5.2)
        : ringSample(random, destination.x, destination.z, 5.5, 16.5);
      add(fern, point, 'fern', .62, 1.28, .018, .038, false);
    }

    const grassCount = high ? 112 : 58;
    for (let i = 0; i < grassCount; i++) {
      const destination = destinations[i % destinations.length];
      const point = i % 4
        ? corridorSample(random, corridors[i % corridors.length], .25, 4.8)
        : ringSample(random, destination.x, destination.z, 4.5, 16.8);
      add(grass, point, 'grass', .62, 1.42, .022, .05, false);
    }

    // Push clones of the *existing* base roots into the existing animation/instancing
    // manager. clone(true) preserves the exact geometry/material identities that the
    // batcher requires, avoiding a second GLTF load and avoiding incompatible groups.
    baseManager.instances.push(...manager.instances);
    baseManager.count = baseManager.instances.length;

    manager.count = manager.instances.length;
    manager.reusedBasePrototypes = true;
    manager.ready = true;
    return manager;
  } catch (error) {
    manager.failures.push(String(error));
    console.error('Could not install expanded-world nature layer.', error);
    return manager;
  }
}

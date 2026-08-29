import * as THREE from 'three';

function seededRandom(seed) {
  return () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function groundMaterial(color, roughness = .98) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0,
    flatShading: false,
  });
}

function createTrailGeometry({ ax, az, bx, bz, width, segments = 12, jitter = .5, widthVariation = .08, seed = 1 }) {
  const random = seededRandom(seed);
  const dx = bx - ax;
  const dz = bz - az;
  const length = Math.hypot(dx, dz) || 1;
  const nx = -dz / length;
  const nz = dx / length;
  const positions = [];
  const uvs = [];
  const indices = [];
  let drift = 0;
  let widthDrift = 0;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const envelope = Math.sin(Math.PI * t);
    drift = THREE.MathUtils.lerp(drift, (random() * 2 - 1) * jitter, .52);
    widthDrift = THREE.MathUtils.lerp(widthDrift, (random() * 2 - 1) * widthVariation, .46);
    const offset = drift * envelope;
    const halfWidth = width * .5 * (1 + widthDrift * envelope);
    const cx = THREE.MathUtils.lerp(ax, bx, t) + nx * offset;
    const cz = THREE.MathUtils.lerp(az, bz, t) + nz * offset;

    positions.push(
      cx + nx * halfWidth, 0, cz + nz * halfWidth,
      cx - nx * halfWidth, 0, cz - nz * halfWidth,
    );
    uvs.push(0, t * 5, 1, t * 5);

    if (i < segments) {
      const base = i * 2;
      indices.push(base, base + 2, base + 1, base + 2, base + 3, base + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function createTrailMesh(spec, material, y, name) {
  const mesh = new THREE.Mesh(createTrailGeometry(spec), material);
  mesh.position.y = y;
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  mesh.name = name;
  mesh.userData.worldExpansionTerrainPolish = true;
  return mesh;
}

function createIrregularPatch({ x, z, radius, segments = 36, variation = .05, seed = 1, y = 0 }, material, name) {
  const random = seededRandom(seed);
  const positions = [0, 0, 0];
  const indices = [];

  for (let i = 0; i < segments; i++) {
    const angle = i / segments * Math.PI * 2;
    const localRadius = radius * (1 + (random() * 2 - 1) * variation);
    positions.push(Math.cos(angle) * localRadius, 0, Math.sin(angle) * localRadius);
  }
  for (let i = 0; i < segments; i++) {
    indices.push(0, i + 1, ((i + 1) % segments) + 1);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  mesh.name = name;
  mesh.userData.worldExpansionTerrainPolish = true;
  return mesh;
}

function hideLegacyExpansionSurfaces(root) {
  let hidden = 0;
  root.traverse(node => {
    if (!node.isMesh || !node.userData?.worldExpansionSurface) return;
    node.visible = false;
    hidden++;
  });
  return hidden;
}

function addGroundBreakup(root, high) {
  const material = groundMaterial(0x4b5549, .99);
  const geometry = new THREE.CircleGeometry(.55, 8);
  const count = high ? 72 : 36;
  const patches = new THREE.InstancedMesh(geometry, material, count);
  const random = seededRandom(0x4252454B);
  const dummy = new THREE.Object3D();
  const routes = [
    { ax: 0, az: 23, bx: 6, bz: 76, halfWidth: 4.2 },
    { ax: 22, az: 4.8, bx: 61, bz: 15.2, halfWidth: 3.8 },
    { ax: -22, az: -3.8, bx: -59, bz: -28.8, halfWidth: 3.6 },
  ];

  for (let i = 0; i < count; i++) {
    const route = routes[i % routes.length];
    const t = random();
    const dx = route.bx - route.ax;
    const dz = route.bz - route.az;
    const length = Math.hypot(dx, dz) || 1;
    const nx = -dz / length;
    const nz = dx / length;
    const side = (random() * 2 - 1) * route.halfWidth;
    const x = THREE.MathUtils.lerp(route.ax, route.bx, t) + nx * side;
    const z = THREE.MathUtils.lerp(route.az, route.bz, t) + nz * side;
    const scale = .35 + random() * 1.1;

    dummy.position.set(x, .026, z);
    dummy.rotation.set(-Math.PI / 2, 0, random() * Math.PI);
    dummy.scale.set(scale * (1.3 + random() * 1.5), scale * (.45 + random() * .35), 1);
    dummy.updateMatrix();
    patches.setMatrixAt(i, dummy.matrix);
  }

  patches.instanceMatrix.needsUpdate = true;
  patches.castShadow = false;
  patches.receiveShadow = true;
  patches.name = 'WorldExpansion_GroundBreakup';
  patches.userData.worldExpansionTerrainPolish = true;
  root.add(patches);
  return patches;
}

export function installWorldExpansionTerrain(game) {
  if (game.worldExpansionTerrain) return game.worldExpansionTerrain;
  const expansion = game.worldExpansion;
  if (!expansion?.root) return null;

  const high = game.quality === 'high';
  const root = new THREE.Group();
  root.name = 'WorldExpansionTerrainPolish';
  root.userData.worldExpansionTerrainPolish = true;
  expansion.root.add(root);

  const manager = game.worldExpansionTerrain = {
    ready: false,
    root,
    hiddenLegacySurfaces: hideLegacyExpansionSurfaces(expansion.root),
    surfaces: [],
  };

  const floorNorth = groundMaterial(0x3b5143, .995);
  const floorEast = groundMaterial(0x354b43, .995);
  const floorWest = groundMaterial(0x434a40, .995);
  const roadNorth = groundMaterial(0x675f4f, .97);
  const roadEast = groundMaterial(0x5b5d50, .975);
  const roadWest = groundMaterial(0x62594b, .98);
  const stone = groundMaterial(0x73776d, .92);

  const routes = [
    { key: 'Hollowroad', ax: 0, az: 20, bx: 6, bz: 78, floorWidth: 22.5, roadWidth: 9.6, inlayWidth: 2.5, jitter: .62, floor: floorNorth, road: roadNorth, seed: 0x484F4C4C },
    { key: 'Glassmere', ax: 20, az: 4, bx: 64, bz: 16, floorWidth: 21.0, roadWidth: 8.5, inlayWidth: 2.25, jitter: .5, floor: floorEast, road: roadEast, seed: 0x474C4153 },
    { key: 'Briarwatch', ax: -19, az: -2, bx: -62, bz: -31, floorWidth: 20.5, roadWidth: 8.0, inlayWidth: 2.1, jitter: .48, floor: floorWest, road: roadWest, seed: 0x42524941 },
  ];

  for (const route of routes) {
    const common = { ax: route.ax, az: route.az, bx: route.bx, bz: route.bz, segments: high ? 16 : 11 };
    const floor = createTrailMesh({ ...common, width: route.floorWidth, jitter: 1.25, widthVariation: .11, seed: route.seed }, route.floor, -.055, `${route.key}_ForestFloor`);
    const road = createTrailMesh({ ...common, width: route.roadWidth, jitter: route.jitter, widthVariation: .065, seed: route.seed ^ 0x11111111 }, route.road, .006, `${route.key}_Trail`);
    const inlay = createTrailMesh({ ...common, width: route.inlayWidth, jitter: route.jitter * .45, widthVariation: .11, seed: route.seed ^ 0x22222222 }, stone, .024, `${route.key}_StoneInlay`);
    root.add(floor, road, inlay);
    manager.surfaces.push(floor, road, inlay);
  }

  const destinations = [
    { key: 'HollowroadCrossing', x: 7, z: 80, floorRadius: 22.0, roadRadius: 17.25, floor: floorNorth, road: roadNorth, seed: 0x4E4F5254 },
    { key: 'GlassmereFen', x: 66, z: 16, floorRadius: 22.2, roadRadius: 17.2, floor: floorEast, road: roadEast, seed: 0x46454E21 },
    { key: 'BriarwatchRise', x: -64, z: -32, floorRadius: 21.8, roadRadius: 17.2, floor: floorWest, road: roadWest, seed: 0x52495345 },
  ];

  for (const destination of destinations) {
    const floor = createIrregularPatch({ x: destination.x, z: destination.z, radius: destination.floorRadius, variation: .075, segments: high ? 46 : 30, seed: destination.seed, y: -.06 }, destination.floor, `${destination.key}_ForestFloor`);
    const clearing = createIrregularPatch({ x: destination.x, z: destination.z, radius: destination.roadRadius, variation: .032, segments: high ? 44 : 28, seed: destination.seed ^ 0x33333333, y: .004 }, destination.road, `${destination.key}_Clearing`);
    root.add(floor, clearing);
    manager.surfaces.push(floor, clearing);
  }

  // Blend each authored road into the original glade instead of exposing a hard rectangle seam.
  const transitions = [
    [0, 22, 7.1, roadNorth, 0xA001],
    [20, 4, 6.8, roadEast, 0xA002],
    [-19, -2, 6.6, roadWest, 0xA003],
  ];
  for (const [x, z, radius, material, seed] of transitions) {
    const patch = createIrregularPatch({ x, z, radius, variation: .09, segments: high ? 28 : 20, seed, y: .008 }, material, 'WorldExpansion_GladeTransition');
    root.add(patch);
    manager.surfaces.push(patch);
  }

  manager.groundBreakup = addGroundBreakup(root, high);
  manager.ready = true;
  return manager;
}

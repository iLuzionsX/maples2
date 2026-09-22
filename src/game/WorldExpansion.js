import * as THREE from 'three';
import {
  clampPointToTravelNetwork,
  applyCircularBlockers,
} from './WorldExpansionMath.js';
import {
  buildLumenspireBeacon,
  buildRootboundGate,
  buildWaystoneCairn,
  attachStaticLanternLight,
} from './ProceduralLandmarks.js';

function seededRandom(seed = 0x4D41504C) {
  return () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function standard(color, roughness = .88, metalness = 0, emissive = 0x000000, emissiveIntensity = 0) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    emissive,
    emissiveIntensity,
    flatShading: true,
  });
}

function place(parent, object, x, y, z, ry = 0, scale = 1) {
  object.position.set(x, y, z);
  object.rotation.y = ry;
  object.scale.setScalar(scale);
  parent.add(object);
  return object;
}

function createSegmentSurface(ax, az, bx, bz, width, material, y = .014) {
  const dx = bx - ax;
  const dz = bz - az;
  const length = Math.hypot(dx, dz);
  const surface = new THREE.Mesh(new THREE.BoxGeometry(width, .08, length), material);
  surface.position.set((ax + bx) * .5, y - .04, (az + bz) * .5);
  surface.rotation.y = Math.atan2(dx, dz);
  surface.receiveShadow = true;
  surface.castShadow = false;
  surface.userData.worldExpansionSurface = true;
  return surface;
}

function createRegionDisc(x, z, radius, material, y = .008, segments = 48) {
  const disc = new THREE.Mesh(new THREE.CircleGeometry(radius, segments), material);
  disc.rotation.x = -Math.PI / 2;
  disc.position.set(x, y, z);
  disc.receiveShadow = true;
  disc.userData.worldExpansionSurface = true;
  return disc;
}

function createRockMass(material, x, z, sx, sy, sz, rotation = 0) {
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(1, 0), material);
  rock.position.set(x, sy * .52 - .08, z);
  rock.scale.set(sx, sy, sz);
  rock.rotation.set(.04, rotation, -.03);
  rock.castShadow = false;
  rock.receiveShadow = true;
  rock.userData.worldExpansionRock = true;
  return rock;
}

function buildCliffShelf(parent, random, material, { cx, cz, radius, startAngle, endAngle, count, height = 4.5 }) {
  for (let i = 0; i < count; i++) {
    const t = count <= 1 ? .5 : i / (count - 1);
    const angle = THREE.MathUtils.lerp(startAngle, endAngle, t) + (random() - .5) * .07;
    const r = radius + (random() - .5) * 2.8;
    const x = cx + Math.cos(angle) * r;
    const z = cz + Math.sin(angle) * r;
    const rock = createRockMass(
      material,
      x,
      z,
      2.6 + random() * 2.5,
      height * (.72 + random() * .5),
      2.1 + random() * 2.4,
      -angle + random() * .4,
    );
    parent.add(rock);
  }
}

function makeInstancedScatter(parent, random, {
  geometry,
  material,
  count,
  sample,
  minScale = .5,
  maxScale = 1.2,
  y = 0,
  name,
}) {
  const instanced = new THREE.InstancedMesh(geometry, material, count);
  instanced.name = name;
  instanced.castShadow = false;
  instanced.receiveShadow = true;
  instanced.frustumCulled = true;
  const dummy = new THREE.Object3D();

  for (let i = 0; i < count; i++) {
    const point = sample(i, random);
    const scale = THREE.MathUtils.lerp(minScale, maxScale, random());
    dummy.position.set(point.x, y + (point.y || 0), point.z);
    dummy.rotation.set((random() - .5) * .1, random() * Math.PI * 2, (random() - .5) * .1);
    dummy.scale.set(scale * (.75 + random() * .5), scale, scale * (.75 + random() * .5));
    dummy.updateMatrix();
    instanced.setMatrixAt(i, dummy.matrix);
  }
  instanced.instanceMatrix.needsUpdate = true;
  parent.add(instanced);
  return instanced;
}

function scatterAlongCorridors(parent, random, high) {
  const pebbleMaterial = standard(0x59665e, .98);
  const tuftMaterial = standard(0x3b694d, .98);
  const stumpMaterial = standard(0x5a4636, .96);

  const corridors = [
    { ax: 0, az: 22, bx: 6, bz: 78, width: 8.2 },
    { ax: 21, az: 5, bx: 64, bz: 16, width: 7.4 },
    { ax: -20, az: -3, bx: -62, bz: -31, width: 7.2 },
  ];

  const sampleCorridorEdge = () => {
    const corridor = corridors[Math.floor(random() * corridors.length)];
    const t = random();
    const x = THREE.MathUtils.lerp(corridor.ax, corridor.bx, t);
    const z = THREE.MathUtils.lerp(corridor.az, corridor.bz, t);
    const dx = corridor.bx - corridor.ax;
    const dz = corridor.bz - corridor.az;
    const len = Math.hypot(dx, dz) || 1;
    const nx = -dz / len;
    const nz = dx / len;
    const side = random() < .5 ? -1 : 1;
    const edge = corridor.width * .5 + 1.1 + random() * 4.8;
    return { x: x + nx * edge * side, z: z + nz * edge * side };
  };

  makeInstancedScatter(parent, random, {
    geometry: new THREE.DodecahedronGeometry(.34, 0),
    material: pebbleMaterial,
    count: high ? 110 : 58,
    sample: sampleCorridorEdge,
    minScale: .45,
    maxScale: 1.4,
    y: .1,
    name: 'WorldExpansion_PebbleScatter',
  });

  makeInstancedScatter(parent, random, {
    geometry: new THREE.ConeGeometry(.085, .68, 5),
    material: tuftMaterial,
    count: high ? 145 : 72,
    sample: sampleCorridorEdge,
    minScale: .65,
    maxScale: 1.45,
    y: .32,
    name: 'WorldExpansion_GrassTufts',
  });

  makeInstancedScatter(parent, random, {
    geometry: new THREE.CylinderGeometry(.18, .24, .5, 7),
    material: stumpMaterial,
    count: high ? 24 : 12,
    sample: sampleCorridorEdge,
    minScale: .7,
    maxScale: 1.45,
    y: .23,
    name: 'WorldExpansion_StumpScatter',
  });
}

function buildGlassmereFen(parent, random, high, waterMaterial, rockMaterial, reedMaterial) {
  const group = new THREE.Group();
  group.name = 'WorldExpansion_GlassmereFen';
  group.position.set(66, 0, 16);
  parent.add(group);

  const water = new THREE.Mesh(new THREE.CircleGeometry(6.4, high ? 48 : 28), waterMaterial);
  water.rotation.x = -Math.PI / 2;
  water.scale.set(1.25, .82, 1);
  water.position.set(4.7, .055, 3.5);
  water.receiveShadow = false;
  water.userData.worldExpansionWater = true;
  group.add(water);

  const bank = new THREE.Mesh(new THREE.RingGeometry(6.15, 7.3, high ? 48 : 28), standard(0x475c4c, .98));
  bank.rotation.x = -Math.PI / 2;
  bank.scale.set(1.25, .82, 1);
  bank.position.copy(water.position).setY(.025);
  bank.receiveShadow = true;
  group.add(bank);

  const reedGeo = new THREE.ConeGeometry(.035, .85, 5);
  const reeds = new THREE.InstancedMesh(reedGeo, reedMaterial, high ? 82 : 40);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < reeds.count; i++) {
    const angle = random() * Math.PI * 2;
    const radius = 6.3 + random() * 1.15;
    dummy.position.set(4.7 + Math.cos(angle) * radius * 1.25, .42, 3.5 + Math.sin(angle) * radius * .82);
    const scale = .72 + random() * .7;
    dummy.scale.set(scale * .8, scale, scale * .8);
    dummy.rotation.y = random() * Math.PI * 2;
    dummy.updateMatrix();
    reeds.setMatrixAt(i, dummy.matrix);
  }
  reeds.instanceMatrix.needsUpdate = true;
  reeds.castShadow = false;
  reeds.receiveShadow = true;
  group.add(reeds);

  for (let i = 0; i < (high ? 14 : 8); i++) {
    const angle = random() * Math.PI * 2;
    const radius = 7.2 + random() * 3.2;
    group.add(createRockMass(
      rockMaterial,
      4.7 + Math.cos(angle) * radius * 1.18,
      3.5 + Math.sin(angle) * radius * .82,
      .55 + random() * 1.4,
      .45 + random() * 1.1,
      .6 + random() * 1.5,
      random() * Math.PI,
    ));
  }

  return { group, water, blocker: { x: 70.7, z: 19.5, radius: 6.15 } };
}

function buildDistantSilhouettes(parent, random, high) {
  const farStone = standard(0x52635c, .99);
  const farGreen = standard(0x2f5144, .99);
  const count = high ? 22 : 12;
  const coneGeo = new THREE.ConeGeometry(1, 1, 6);
  const rockGeo = new THREE.DodecahedronGeometry(1, 0);

  const treeLine = new THREE.InstancedMesh(coneGeo, farGreen, count * 2);
  const ridge = new THREE.InstancedMesh(rockGeo, farStone, count);
  const dummy = new THREE.Object3D();

  for (let i = 0; i < count; i++) {
    const angle = i / count * Math.PI * 2 + .12;
    const radius = 112 + random() * 22;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    dummy.position.set(x, 6 + random() * 4, z);
    dummy.scale.set(7 + random() * 6, 12 + random() * 10, 7 + random() * 7);
    dummy.rotation.y = random() * Math.PI;
    dummy.updateMatrix();
    ridge.setMatrixAt(i, dummy.matrix);

    for (let j = 0; j < 2; j++) {
      const idx = i * 2 + j;
      dummy.position.set(x + (j ? 5 : -4) + (random() - .5) * 4, 9 + random() * 3, z + (random() - .5) * 7);
      dummy.scale.set(3.2 + random() * 2.5, 18 + random() * 10, 3.2 + random() * 2.5);
      dummy.rotation.y = random() * Math.PI;
      dummy.updateMatrix();
      treeLine.setMatrixAt(idx, dummy.matrix);
    }
  }
  ridge.instanceMatrix.needsUpdate = true;
  treeLine.instanceMatrix.needsUpdate = true;
  ridge.castShadow = false;
  treeLine.castShadow = false;
  ridge.receiveShadow = true;
  treeLine.receiveShadow = true;
  ridge.name = 'WorldExpansion_DistantRidge';
  treeLine.name = 'WorldExpansion_DistantTreeLine';
  parent.add(ridge, treeLine);
}

export const WORLD_EXPANSION_REGIONS = Object.freeze([
  Object.freeze({ id: 'glade-core', label: 'Sunken Glade', type: 'circle', x: 0, z: 0, radius: 28 }),
  Object.freeze({ id: 'hollowroad', label: 'Hollowroad', type: 'capsule', ax: 0, az: 20, bx: 6, bz: 78, radius: 6.7 }),
  Object.freeze({ id: 'hollowroad-crossing', label: 'Hollowroad Crossing', type: 'circle', x: 7, z: 80, radius: 18 }),
  Object.freeze({ id: 'glassmere-path', label: 'Glassmere Path', type: 'capsule', ax: 20, az: 4, bx: 64, bz: 16, radius: 6.2 }),
  Object.freeze({ id: 'glassmere-fen', label: 'Glassmere Fen', type: 'circle', x: 66, z: 16, radius: 18 }),
  Object.freeze({ id: 'briarwatch-trail', label: 'Briarwatch Trail', type: 'capsule', ax: -19, az: -2, bx: -62, bz: -31, radius: 6 }),
  Object.freeze({ id: 'briarwatch-rise', label: 'Briarwatch Rise', type: 'circle', x: -64, z: -32, radius: 18 }),
]);

export function installWorldExpansion(game) {
  if (game.worldExpansion) return game.worldExpansion;

  const random = seededRandom();
  const high = game.quality === 'high';
  const parent = new THREE.Group();
  parent.name = 'WorldExpansionRoot';
  parent.userData.worldExpansion = true;
  game.world.decor.add(parent);

  const manager = game.worldExpansion = {
    ready: false,
    root: parent,
    regions: WORLD_EXPANSION_REGIONS,
    landmarks: [],
    blockers: [],
    surfaces: [],
    lights: [],
    notes: [
      'Combat enemies remain confined to the original glade radius.',
      'Player travel uses a union of authored circles/capsules instead of one giant rectangle.',
      'Outer vistas use low-cost instanced silhouettes and deterministic micro-detail.',
    ],
  };

  const road = standard(0x665e4e, .97);
  const roadEdge = standard(0x4a5f4e, .99);
  const crossing = standard(0x526954, .97);
  const rise = standard(0x4e5f51, .98);
  const fen = standard(0x455d51, .98);
  const rock = standard(0x59675f, .97);
  const darkRock = standard(0x43514b, .99);
  const reed = standard(0x4b7754, .98);
  const water = new THREE.MeshPhysicalMaterial({
    color: 0x4a8376,
    roughness: .18,
    metalness: 0,
    clearcoat: .55,
    clearcoatRoughness: .16,
    transparent: true,
    opacity: .82,
    depthWrite: true,
  });

  const routeSurfaces = [
    createSegmentSurface(0, 21, 6, 78, 10.4, road),
    createSegmentSurface(20, 4, 64, 16, 9.2, roadEdge),
    createSegmentSurface(-19, -2, -62, -31, 8.8, roadEdge),
    createRegionDisc(7, 80, 17.4, crossing),
    createRegionDisc(66, 16, 17.4, fen),
    createRegionDisc(-64, -32, 17.4, rise),
  ];
  for (const surface of routeSurfaces) {
    parent.add(surface);
    manager.surfaces.push(surface);
  }

  // Layer thin stone ribbons over the wider dirt paths so the routes read at distance
  // without turning the entire outer map into one uniform surface.
  const stoneRibbon = standard(0x72766b, .93);
  const ribbons = [
    createSegmentSurface(.5, 25, 5.7, 74, 3.4, stoneRibbon, .055),
    createSegmentSurface(24, 5.2, 59, 14.6, 2.9, stoneRibbon, .055),
    createSegmentSurface(-23, -4, -57, -27.8, 2.7, stoneRibbon, .055),
  ];
  for (const ribbon of ribbons) parent.add(ribbon);

  buildCliffShelf(parent, random, darkRock, {
    cx: 7, cz: 80, radius: 20.5, startAngle: -.15, endAngle: Math.PI * .95, count: high ? 13 : 8, height: 5.2,
  });
  buildCliffShelf(parent, random, rock, {
    cx: -64, cz: -32, radius: 20.2, startAngle: Math.PI * .7, endAngle: Math.PI * 1.85, count: high ? 14 : 8, height: 5.7,
  });
  buildCliffShelf(parent, random, darkRock, {
    cx: 66, cz: 16, radius: 20.6, startAngle: Math.PI * 1.15, endAngle: Math.PI * 2.1, count: high ? 12 : 7, height: 4.2,
  });

  scatterAlongCorridors(parent, random, high);
  buildDistantSilhouettes(parent, random, high);

  const fenSet = buildGlassmereFen(parent, random, high, water, rock, reed);
  manager.blockers.push(fenSet.blocker);

  const gate = buildRootboundGate({ quality: game.quality });
  place(parent, gate, 3.1, 0, 31.5, .04, 1.03);
  attachStaticLanternLight(gate, 'leftLantern', { color: 0x8cefc7, intensity: high ? 1.1 : .7, distance: 6.5 });
  attachStaticLanternLight(gate, 'rightLantern', { color: 0x8cefc7, intensity: high ? 1.1 : .7, distance: 6.5 });
  manager.landmarks.push(gate);
  manager.blockers.push(
    { x: .55, z: 31.5, radius: 1.05 },
    { x: 5.65, z: 31.5, radius: 1.05 },
  );

  const beacon = buildLumenspireBeacon({ quality: game.quality });
  place(parent, beacon, 7.2, 0, 87.5, -.32, .92);
  const beaconLight = attachStaticLanternLight(beacon, 'beaconLight', {
    color: 0x8ff4d0,
    intensity: high ? 2.0 : 1.1,
    distance: high ? 14 : 9,
  });
  if (beaconLight) manager.lights.push(beaconLight);
  manager.landmarks.push(beacon);
  manager.blockers.push({ x: 7.2, z: 87.5, radius: 2.45 });

  const cairnPlacements = [
    [57.2, 12.6, -.12, 1.0, 0xffc877],
    [73.4, 9.8, .52, .92, 0x8ff0c7],
    [-56.3, -25.8, -.62, 1.04, 0xffb86a],
    [-69.5, -39.4, .26, .88, 0x8fe6c5],
  ];
  for (const [x, z, ry, scale, runeColor] of cairnPlacements) {
    const cairn = buildWaystoneCairn({ quality: game.quality, runeColor });
    place(parent, cairn, x, 0, z, ry, scale);
    manager.landmarks.push(cairn);
    manager.blockers.push({ x, z, radius: 1.35 * scale });
  }

  // Deliberate foreground props: small enough to batch, but dense enough that the
  // outer routes do not read as empty geometry between hero landmarks.
  const logMaterial = standard(0x5c4938, .96);
  const logGeo = new THREE.CylinderGeometry(.16, .21, 1.8, 7);
  const logScatter = new THREE.InstancedMesh(logGeo, logMaterial, high ? 34 : 18);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < logScatter.count; i++) {
    const zone = WORLD_EXPANSION_REGIONS[1 + (i % 6)];
    let x;
    let z;
    if (zone.type === 'circle') {
      const a = random() * Math.PI * 2;
      const r = zone.radius * (.55 + random() * .28);
      x = zone.x + Math.cos(a) * r;
      z = zone.z + Math.sin(a) * r;
    } else {
      const t = random();
      x = THREE.MathUtils.lerp(zone.ax, zone.bx, t) + (random() - .5) * zone.radius * 1.9;
      z = THREE.MathUtils.lerp(zone.az, zone.bz, t) + (random() - .5) * zone.radius * 1.9;
    }
    dummy.position.set(x, .18, z);
    dummy.rotation.set(Math.PI / 2 + (random() - .5) * .25, random() * Math.PI, random() * Math.PI);
    const s = .62 + random() * .65;
    dummy.scale.set(s, s, s);
    dummy.updateMatrix();
    logScatter.setMatrixAt(i, dummy.matrix);
  }
  logScatter.instanceMatrix.needsUpdate = true;
  logScatter.castShadow = false;
  logScatter.receiveShadow = true;
  logScatter.name = 'WorldExpansion_FallenLogs';
  parent.add(logScatter);

  const originalClampPlayer = game.world.clampPlayerToWorld?.bind(game.world);
  game.world.playerTravelZones = WORLD_EXPANSION_REGIONS;
  game.world.clampPlayerToWorld = pos => {
    const clamped = clampPointToTravelNetwork(pos.x, pos.z, WORLD_EXPANSION_REGIONS);
    const blocked = applyCircularBlockers(clamped.x, clamped.z, manager.blockers, .34);
    const finalPoint = clampPointToTravelNetwork(blocked.x, blocked.z, WORLD_EXPANSION_REGIONS);
    pos.x = finalPoint.x;
    pos.z = finalPoint.z;
  };
  game.world.clampPlayerToWorld.originalClamp = originalClampPlayer;

  manager.ready = true;
  return manager;
}

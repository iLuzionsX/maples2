import * as THREE from 'three';

const Y = new THREE.Vector3(0, 1, 0);

function standard(color, roughness = .82, metalness = 0, emissive = 0x000000, emissiveIntensity = 0) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    emissive,
    emissiveIntensity,
    flatShading: true,
  });
}

function mesh(geometry, material, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, cast = true, receive = true } = {}) {
  const result = new THREE.Mesh(geometry, material);
  result.position.set(x, y, z);
  result.rotation.set(rx, ry, rz);
  result.castShadow = cast;
  result.receiveShadow = receive;
  return result;
}

function addSocket(root, name, x, y, z) {
  const socket = new THREE.Object3D();
  socket.name = name;
  socket.position.set(x, y, z);
  root.add(socket);
  root.userData.sockets[name] = socket;
  return socket;
}

function tube(points, radius, material, radialSegments = 6) {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
  return mesh(new THREE.TubeGeometry(curve, Math.max(6, points.length * 4), radius, radialSegments, false), material);
}

function addCrossBrace(root, material, ax, ay, az, bx, by, bz, thickness = .12) {
  const a = new THREE.Vector3(ax, ay, az);
  const b = new THREE.Vector3(bx, by, bz);
  const midpoint = a.clone().add(b).multiplyScalar(.5);
  const direction = b.clone().sub(a);
  const length = direction.length();
  const brace = mesh(new THREE.BoxGeometry(thickness, length, thickness), material, {
    x: midpoint.x, y: midpoint.y, z: midpoint.z,
  });
  brace.quaternion.setFromUnitVectors(Y, direction.normalize());
  root.add(brace);
  return brace;
}

function markLandmark(root, specKey) {
  root.userData.worldExpansionLandmark = true;
  root.userData.sculptSpec = specKey;
  root.userData.sockets = {};
  root.userData.colliders = [];
  return root;
}

export const LANDMARK_SCULPT_SPECS = Object.freeze({
  lumenspireBeacon: Object.freeze({
    classification: 'object',
    silhouette: 'tiered stone plinth, narrow timber lookout, steep copper cap, luminous circular beacon',
    majorVolumes: ['octagonal stone footing', 'four-post timber tower', 'cross-braced lookout deck', 'faceted roof', 'rune beacon assembly'],
    materials: ['moss-dark stone', 'aged warm timber', 'oxidized copper', 'brass hardware', 'mint emissive crystal'],
    sockets: ['beaconLight', 'lookout', 'banner'],
    collider: { type: 'circle', radius: 2.65 },
    targetTriangles: 'low-thousands; reusable real-time landmark',
    reviewTargets: ['tower taper', 'brace readability', 'roof-to-beacon hierarchy', 'off-axis silhouette'],
  }),
  rootboundGate: Object.freeze({
    classification: 'hybrid',
    silhouette: 'paired broken piers overtaken by arcing roots, asymmetrical crown, suspended way-rune',
    majorVolumes: ['stone piers', 'root arch', 'secondary root fingers', 'hanging rune', 'moss shelves'],
    materials: ['cool weathered stone', 'dark bark', 'moss', 'aged brass', 'soft green emissive rune'],
    sockets: ['rune', 'leftLantern', 'rightLantern'],
    collider: { type: 'paired-circles', radius: 1.05 },
    targetTriangles: 'low-thousands; traversal gateway',
    reviewTargets: ['clear walk-through opening', 'root contact with stone', 'asymmetry', 'readability at 40-60m'],
  }),
  waystoneCairn: Object.freeze({
    classification: 'object',
    silhouette: 'leaning central monolith surrounded by low supporting stones and a brass compass ring',
    majorVolumes: ['faceted monolith', 'three support stones', 'ground ring', 'inset rune'],
    materials: ['dark grey-green stone', 'lichen accent', 'aged brass', 'amber emissive rune'],
    sockets: ['rune', 'interaction'],
    collider: { type: 'circle', radius: 1.55 },
    targetTriangles: 'sub-2k; repeatable navigation prop',
    reviewTargets: ['lean angle', 'rune visibility', 'grounded weight', 'distinct silhouette from common ruin pillars'],
  }),
});

export function buildLumenspireBeacon({ quality = 'high' } = {}) {
  const root = markLandmark(new THREE.Group(), 'lumenspireBeacon');
  root.name = 'Img2ThreeJS_LumenspireBeacon';

  const stone = standard(0x59685f, .94);
  const stoneDark = standard(0x3f4c47, .98);
  const moss = standard(0x4a6e50, .98);
  const timber = standard(0x624936, .9);
  const timberDark = standard(0x3f3028, .94);
  const copper = standard(0x7e6a54, .5, .48);
  const brass = standard(0xb28b4d, .42, .58, 0x6d4b1f, .05);
  const lumen = standard(0x8df4cd, .24, .04, 0x52e8b7, 1.9);

  const base = mesh(new THREE.CylinderGeometry(2.55, 2.9, .52, 8), stoneDark, { y: .26 });
  root.add(base);
  const step = mesh(new THREE.CylinderGeometry(2.15, 2.45, .32, 8), stone, { y: .68 });
  root.add(step);
  const mossShelf = mesh(new THREE.CylinderGeometry(2.05, 2.08, .06, 8), moss, { y: .87, cast: false });
  root.add(mossShelf);

  const postGeometry = new THREE.BoxGeometry(.34, 4.5, .34);
  const postOffsets = [[-1.28, -1.28], [1.28, -1.28], [-1.28, 1.28], [1.28, 1.28]];
  for (const [x, z] of postOffsets) {
    const post = mesh(postGeometry, timber, { x, y: 3.12, z, ry: (x + z) * .025 });
    root.add(post);
    const foot = mesh(new THREE.CylinderGeometry(.34, .42, .24, 6), brass, { x, y: 1.01, z });
    root.add(foot);
  }

  addCrossBrace(root, timberDark, -1.28, 1.35, -1.34, 1.28, 4.25, -1.34, .13);
  addCrossBrace(root, timberDark, 1.28, 1.35, -1.30, -1.28, 4.25, -1.30, .13);
  addCrossBrace(root, timberDark, -1.34, 1.5, 1.28, -1.34, 4.2, -1.28, .12);
  addCrossBrace(root, timberDark, 1.34, 1.5, 1.28, 1.34, 4.2, -1.28, .12);

  const deck = mesh(new THREE.CylinderGeometry(2.12, 2.22, .28, 8), timberDark, { y: 5.12 });
  root.add(deck);
  const deckTop = mesh(new THREE.CylinderGeometry(2.0, 2.0, .08, 8), timber, { y: 5.31, cast: false });
  root.add(deckTop);

  const railPostGeo = new THREE.BoxGeometry(.12, .78, .12);
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2 + Math.PI / 8;
    const x = Math.cos(a) * 1.78;
    const z = Math.sin(a) * 1.78;
    root.add(mesh(railPostGeo, timberDark, { x, y: 5.72, z, ry: -a }));
  }
  const rail = mesh(new THREE.TorusGeometry(1.78, .075, 5, 8), timberDark, { y: 6.04, rx: Math.PI / 2 });
  root.add(rail);

  const roof = mesh(new THREE.ConeGeometry(2.45, 1.58, 8), copper, { y: 6.78, ry: Math.PI / 8 });
  root.add(roof);
  const roofBand = mesh(new THREE.CylinderGeometry(.92, 1.24, .34, 8), brass, { y: 7.38 });
  root.add(roofBand);

  const beaconSpine = mesh(new THREE.CylinderGeometry(.16, .22, 1.6, 8), brass, { y: 8.25 });
  root.add(beaconSpine);
  const beaconRing = mesh(new THREE.TorusGeometry(.72, .09, 8, quality === 'high' ? 32 : 18), brass, { y: 8.68, rx: Math.PI / 2 });
  root.add(beaconRing);
  const crystal = mesh(new THREE.OctahedronGeometry(.42, 1), lumen, { y: 8.68 });
  crystal.scale.y = 1.45;
  root.add(crystal);

  const runeDisc = mesh(new THREE.CircleGeometry(.31, 20), lumen, { x: 0, y: 5.82, z: 2.14, cast: false, receive: false });
  root.add(runeDisc);

  const bannerMaterial = new THREE.MeshStandardMaterial({ color: 0x6b3141, roughness: .92, metalness: 0, side: THREE.DoubleSide, flatShading: true });
  const banner = mesh(new THREE.PlaneGeometry(.88, 1.52, 1, 2), bannerMaterial, { x: -1.68, y: 4.15, z: .04, ry: Math.PI / 2, rz: -.08, cast: false });
  root.add(banner);

  addSocket(root, 'beaconLight', 0, 8.68, 0);
  addSocket(root, 'lookout', 0, 5.45, 0);
  addSocket(root, 'banner', -1.68, 4.15, 0);
  root.userData.colliders.push({ type: 'circle', x: 0, z: 0, radius: 2.65 });

  return root;
}

export function buildRootboundGate({ quality = 'high' } = {}) {
  const root = markLandmark(new THREE.Group(), 'rootboundGate');
  root.name = 'Img2ThreeJS_RootboundGate';

  const stone = standard(0x66756d, .95);
  const stoneDark = standard(0x4e5c56, .98);
  const bark = standard(0x493c31, .98);
  const barkLight = standard(0x624c38, .96);
  const moss = standard(0x4b704e, .99);
  const brass = standard(0x9f7e49, .48, .5);
  const rune = standard(0x89f0c4, .24, .02, 0x4ce0ad, 1.7);

  const pierGeo = new THREE.CylinderGeometry(.82, 1.02, 3.8, 7);
  for (const side of [-1, 1]) {
    const x = side * 2.55;
    root.add(mesh(pierGeo, stone, { x, y: 1.9, z: 0, rz: side * .035 }));
    root.add(mesh(new THREE.CylinderGeometry(1.02, 1.18, .35, 7), stoneDark, { x, y: .18, z: 0 }));
    root.add(mesh(new THREE.BoxGeometry(1.35, .26, 1.2), moss, { x: x - side * .08, y: 3.82, z: .02, rz: side * .07, cast: false }));
  }

  const primaryRoot = tube([
    [-3.0, .45, .12], [-2.65, 2.8, .02], [-1.65, 4.65, -.08], [0, 5.15, -.12], [1.7, 4.55, -.06], [2.65, 2.65, .04], [3.02, .55, .1],
  ], .26, bark, quality === 'high' ? 8 : 6);
  root.add(primaryRoot);

  const secondaryA = tube([
    [-2.65, 1.2, -.18], [-1.75, 3.05, -.42], [-.35, 4.05, -.6], [.55, 4.1, -.55],
  ], .13, barkLight, 6);
  root.add(secondaryA);
  const secondaryB = tube([
    [2.72, 1.1, .22], [2.15, 2.85, .45], [1.2, 4.15, .48], [.35, 4.82, .28],
  ], .15, barkLight, 6);
  root.add(secondaryB);

  const rootFingerGeo = new THREE.ConeGeometry(.11, 1.2, 5);
  for (let i = 0; i < 6; i++) {
    const side = i % 2 ? 1 : -1;
    const finger = mesh(rootFingerGeo, bark, {
      x: side * (2.45 + (i % 3) * .16),
      y: .55,
      z: (i - 2.5) * .17,
      rz: side * (.5 + (i % 3) * .12),
      ry: i * .72,
    });
    root.add(finger);
  }

  const runeFrame = mesh(new THREE.TorusGeometry(.48, .065, 7, quality === 'high' ? 28 : 18), brass, { y: 4.52, rx: Math.PI / 2 });
  root.add(runeFrame);
  const runeCore = mesh(new THREE.OctahedronGeometry(.22, 0), rune, { y: 4.52, cast: false, receive: false });
  runeCore.scale.y = 1.35;
  root.add(runeCore);
  const chain = mesh(new THREE.CylinderGeometry(.035, .035, .52, 6), brass, { y: 4.94 });
  root.add(chain);

  for (const side of [-1, 1]) {
    const plate = mesh(new THREE.BoxGeometry(.36, .58, .12), brass, { x: side * 2.22, y: 2.42, z: .82, ry: side * .1 });
    root.add(plate);
    const glow = mesh(new THREE.SphereGeometry(.12, 8, 6), rune, { x: side * 2.22, y: 2.42, z: .9, cast: false, receive: false });
    root.add(glow);
  }

  addSocket(root, 'rune', 0, 4.52, 0);
  addSocket(root, 'leftLantern', -2.22, 2.42, .9);
  addSocket(root, 'rightLantern', 2.22, 2.42, .9);
  root.userData.colliders.push({ type: 'circle', x: -2.55, z: 0, radius: 1.05 });
  root.userData.colliders.push({ type: 'circle', x: 2.55, z: 0, radius: 1.05 });

  return root;
}

export function buildWaystoneCairn({ quality = 'high', runeColor = 0xffc36c } = {}) {
  const root = markLandmark(new THREE.Group(), 'waystoneCairn');
  root.name = 'Img2ThreeJS_WaystoneCairn';

  const stone = standard(0x59665f, .96);
  const stoneLight = standard(0x6c786e, .94);
  const lichen = standard(0x617852, .99);
  const brass = standard(0xa88750, .44, .52);
  const rune = standard(runeColor, .28, .04, runeColor, 1.35);

  const monolith = mesh(new THREE.CylinderGeometry(.62, .84, 3.25, 6), stone, { y: 1.67, rz: -.12, ry: .28 });
  monolith.scale.z = .78;
  root.add(monolith);
  const crown = mesh(new THREE.ConeGeometry(.66, .72, 6), stoneLight, { x: -.2, y: 3.42, rz: -.18, ry: .28 });
  crown.scale.z = .8;
  root.add(crown);

  const supportGeo = new THREE.DodecahedronGeometry(.58, 0);
  const supports = [[-.88, .35, .58, .85], [.82, .31, .48, .74], [.24, .26, -.92, .68]];
  for (const [x, y, z, scale] of supports) {
    const support = mesh(supportGeo, stoneLight, { x, y, z, ry: x * .6 + z });
    support.scale.set(scale, scale * .72, scale * .9);
    root.add(support);
  }

  const groundRing = mesh(new THREE.TorusGeometry(1.38, .085, 6, quality === 'high' ? 28 : 18), brass, { y: .06, rx: Math.PI / 2, cast: false });
  root.add(groundRing);
  const mossPatch = mesh(new THREE.CylinderGeometry(1.16, 1.26, .055, 10), lichen, { y: .035, cast: false });
  root.add(mossPatch);

  const runeDisc = mesh(new THREE.CircleGeometry(.29, 18), rune, { x: .04, y: 2.05, z: .59, rx: -.03, ry: .08, cast: false, receive: false });
  root.add(runeDisc);
  const runeFrame = mesh(new THREE.TorusGeometry(.34, .045, 6, 18), brass, { x: .04, y: 2.05, z: .6, rx: -.03, ry: .08, cast: false });
  root.add(runeFrame);

  addSocket(root, 'rune', .04, 2.05, .62);
  addSocket(root, 'interaction', 0, 1.1, 1.3);
  root.userData.colliders.push({ type: 'circle', x: 0, z: 0, radius: 1.55 });

  return root;
}

export function attachStaticLanternLight(root, socketName, { color = 0x9bf2ce, intensity = 1.35, distance = 8 } = {}) {
  const socket = root.userData?.sockets?.[socketName];
  if (!socket) return null;
  const light = new THREE.PointLight(color, intensity, distance, 2);
  light.castShadow = false;
  socket.add(light);
  return light;
}

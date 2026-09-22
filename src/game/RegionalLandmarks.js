import * as THREE from 'three';

const Y = new THREE.Vector3(0, 1, 0);

function standard(color, roughness = .86, metalness = 0, emissive = 0x000000, emissiveIntensity = 0) {
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
  return mesh(new THREE.TubeGeometry(curve, Math.max(8, points.length * 5), radius, radialSegments, false), material);
}

function beamBetween(material, a, b, thickness = .16) {
  const start = new THREE.Vector3(...a);
  const end = new THREE.Vector3(...b);
  const midpoint = start.clone().add(end).multiplyScalar(.5);
  const direction = end.clone().sub(start);
  const length = direction.length();
  const beam = mesh(new THREE.BoxGeometry(thickness, length, thickness), material, {
    x: midpoint.x,
    y: midpoint.y,
    z: midpoint.z,
  });
  beam.quaternion.setFromUnitVectors(Y, direction.normalize());
  return beam;
}

export const REGIONAL_LANDMARK_SCULPT_SPECS = Object.freeze({
  briarwatchOathBell: Object.freeze({
    classification: 'hybrid',
    silhouette: 'paired leaning watch-piers, blackthorn crossbeam, suspended bronze oath bell, broken thorn crown',
    majorVolumes: ['octagonal stone plinth', 'two leaning watch-piers', 'thornwood lintel', 'suspended bell', 'asymmetric thorn crown', 'ember oath-stone'],
    materials: ['cold weathered stone', 'charred thornwood', 'oxidized bronze', 'dark iron', 'moss', 'restrained ember rune'],
    sockets: ['bell', 'ember', 'interaction'],
    collider: { type: 'circle', radius: 2.05 },
    targetTriangles: 'low-thousands; destination hero prop with no skinned animation',
    reviewTargets: ['negative space beneath bell', 'asymmetric crown readability', 'bell silhouette at 35-60m', 'grounded stone weight', 'distinct from Rootbound Gate'],
    inferredGeometry: ['rear faces and hidden root intersections are authored from structural logic rather than a multi-view reference'],
  }),
});

export function buildBriarwatchOathBell({ quality = 'high' } = {}) {
  const root = new THREE.Group();
  root.name = 'Img2ThreeJS_BriarwatchOathBell';
  root.userData.worldExpansionLandmark = true;
  root.userData.sculptSpec = 'briarwatchOathBell';
  root.userData.sculptSpecData = REGIONAL_LANDMARK_SCULPT_SPECS.briarwatchOathBell;
  root.userData.sockets = {};
  root.userData.colliders = [];

  const stone = standard(0x56615c, .96);
  const stoneDark = standard(0x3d4744, .99);
  const moss = standard(0x4e674a, .99);
  const thorn = standard(0x44352d, .98);
  const thornLight = standard(0x5c4432, .96);
  const bronze = standard(0x806044, .46, .5);
  const bronzeEdge = standard(0xaa8052, .4, .58);
  const iron = standard(0x353a38, .6, .72);
  const ember = standard(0xe68c54, .28, .02, 0xd86d3f, 1.45);

  const base = mesh(new THREE.CylinderGeometry(2.15, 2.45, .48, 8), stoneDark, { y: .24 });
  root.add(base);
  const upperBase = mesh(new THREE.CylinderGeometry(1.78, 2.02, .28, 8), stone, { y: .62 });
  root.add(upperBase);
  const mossShelf = mesh(new THREE.CylinderGeometry(1.68, 1.74, .055, 8), moss, { y: .79, cast: false });
  root.add(mossShelf);

  const pierGeometry = new THREE.CylinderGeometry(.52, .7, 3.75, 7);
  for (const side of [-1, 1]) {
    const pier = mesh(pierGeometry, stone, {
      x: side * 1.25,
      y: 2.55,
      z: .08 * side,
      rz: side * -.09,
      ry: side * .08,
    });
    root.add(pier);

    const foot = mesh(new THREE.CylinderGeometry(.7, .83, .25, 7), stoneDark, {
      x: side * 1.38,
      y: .91,
      z: .06 * side,
    });
    root.add(foot);

    const mossCap = mesh(new THREE.BoxGeometry(.88, .12, .66), moss, {
      x: side * 1.07,
      y: 4.24,
      z: .04 * side,
      rz: side * -.09,
      cast: false,
    });
    root.add(mossCap);
  }

  const lintel = tube([
    [-1.72, 4.28, .02], [-.9, 4.52, -.08], [.15, 4.4, -.12], [1.72, 4.58, .06],
  ], .22, thorn, quality === 'high' ? 8 : 6);
  root.add(lintel);
  root.add(beamBetween(iron, [-1.2, 4.08, .02], [1.26, 4.18, .02], .09));

  const chain = mesh(new THREE.CylinderGeometry(.035, .035, .72, 6), iron, { x: .08, y: 3.88, z: .03 });
  root.add(chain);
  const hanger = mesh(new THREE.TorusGeometry(.19, .035, 6, 14), iron, { x: .08, y: 4.23, z: .03 });
  root.add(hanger);

  const bell = mesh(new THREE.ConeGeometry(.62, 1.05, quality === 'high' ? 12 : 9, 1, true), bronze, {
    x: .08,
    y: 3.28,
    z: .03,
  });
  bell.scale.y = 1.04;
  root.add(bell);
  const bellLip = mesh(new THREE.TorusGeometry(.62, .075, 7, quality === 'high' ? 24 : 16), bronzeEdge, {
    x: .08,
    y: 2.77,
    z: .03,
    rx: Math.PI / 2,
  });
  root.add(bellLip);
  const clapper = mesh(new THREE.SphereGeometry(.12, 8, 6), iron, { x: .08, y: 2.72, z: .03 });
  root.add(clapper);

  const crownLeft = tube([
    [-1.28, 4.35, -.02], [-1.62, 4.95, -.16], [-1.37, 5.48, -.24], [-1.82, 5.83, -.3],
  ], .11, thornLight, 6);
  root.add(crownLeft);
  const crownRight = tube([
    [.92, 4.46, -.08], [1.32, 5.02, .04], [1.18, 5.54, .16], [1.62, 5.92, .22],
  ], .13, thorn, 6);
  root.add(crownRight);
  root.add(beamBetween(thornLight, [-1.55, 5.18, -.18], [-2.0, 5.44, -.28], .09));
  root.add(beamBetween(thorn, [1.28, 5.15, .08], [1.88, 5.38, .21], .1));
  root.add(beamBetween(thorn, [1.32, 5.48, .15], [.98, 6.02, .05], .085));

  const oathStone = mesh(new THREE.OctahedronGeometry(.27, 0), ember, { x: -.72, y: 1.28, z: .98, cast: false, receive: false });
  oathStone.scale.y = 1.4;
  root.add(oathStone);
  const oathFrame = mesh(new THREE.TorusGeometry(.34, .045, 6, 18), bronzeEdge, { x: -.72, y: 1.28, z: 1.02, cast: false });
  root.add(oathFrame);

  const brokenTablet = mesh(new THREE.BoxGeometry(.62, .92, .18), stone, { x: 1.35, y: 1.18, z: 1.2, ry: -.28, rz: -.12 });
  root.add(brokenTablet);
  const tabletMoss = mesh(new THREE.BoxGeometry(.48, .06, .2), moss, { x: 1.27, y: 1.62, z: 1.2, ry: -.28, rz: -.12, cast: false });
  root.add(tabletMoss);

  addSocket(root, 'bell', .08, 3.28, .03);
  addSocket(root, 'ember', -.72, 1.28, 1.02);
  addSocket(root, 'interaction', 0, 1.15, 2.0);
  root.userData.colliders.push({ type: 'circle', x: 0, z: 0, radius: 2.05 });
  return root;
}

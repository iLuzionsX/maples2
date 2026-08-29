import * as THREE from 'three';

function makeMistMaterial(color, opacity) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.NormalBlending,
    side: THREE.DoubleSide,
    toneMapped: true,
  });
}

export function installWorldExpansionAtmosphere(game) {
  if (game.worldExpansionAtmosphere) return game.worldExpansionAtmosphere;

  const high = game.quality === 'high';
  const manager = game.worldExpansionAtmosphere = {
    ready: false,
    originalFogDensity: game.scene.fog?.isFogExp2 ? game.scene.fog.density : null,
    mist: [],
  };

  // The compact glade used dense fog to terminate a 30m scene. The larger authored
  // map needs longer readable sightlines, while still retaining atmospheric depth.
  if (game.scene.fog?.isFogExp2) game.scene.fog.density = high ? .0118 : .0145;
  if (game.scene.background?.isColor) game.scene.background.lerp(new THREE.Color(0x829b94), .18);

  const root = game.worldExpansion?.root || game.world.decor;
  const mistMaterial = makeMistMaterial(0x8da69d, high ? .085 : .065);
  const zones = [
    [7, 1.55, 66, 28, 8, 0.02],
    [66, 1.25, 16, 31, 9, 0.18],
    [-64, 2.05, -32, 30, 10, -0.14],
  ];

  for (const [x, y, z, width, depth, rotation] of zones) {
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(width, depth, 1, 1), mistMaterial.clone());
    sheet.rotation.x = -Math.PI / 2;
    sheet.rotation.z = rotation;
    sheet.position.set(x, y, z);
    sheet.frustumCulled = true;
    sheet.userData.worldExpansionMist = true;
    root.add(sheet);
    manager.mist.push(sheet);
  }

  // A restrained cool fill keeps shadow-side detail readable in the outer routes
  // after the sightline extension; it does not cast a second expensive shadow map.
  const outerFill = new THREE.DirectionalLight(0xa7c8c1, high ? .32 : .24);
  outerFill.position.set(26, 18, 42);
  outerFill.castShadow = false;
  root.add(outerFill);
  manager.outerFill = outerFill;

  manager.ready = true;
  return manager;
}

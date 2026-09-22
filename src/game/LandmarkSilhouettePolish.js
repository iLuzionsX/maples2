import * as THREE from 'three';

function findTorusAtHeight(root, y, tolerance = .08) {
  let match = null;
  root.traverse(node => {
    if (match || !node.isMesh || node.geometry?.type !== 'TorusGeometry') return;
    if (Math.abs(node.position.y - y) <= tolerance) match = node;
  });
  return match;
}

export function installLandmarkSilhouettePolish(game) {
  if (game.landmarkSilhouettePolish) return game.landmarkSilhouettePolish;

  const manager = game.landmarkSilhouettePolish = {
    ready: false,
    corrected: [],
  };

  for (const landmark of game.worldExpansion?.landmarks || []) {
    if (landmark.userData?.sculptSpec === 'rootboundGate') {
      const runeFrame = findTorusAtHeight(landmark, 4.52);
      if (runeFrame) {
        // TorusGeometry is born in the XY plane. Keep this rune vertical so it faces
        // an approaching player instead of becoming a nearly invisible horizontal halo.
        runeFrame.rotation.set(0, 0, 0);
        manager.corrected.push('rootboundGate:runeFrame');
      }
    }

    if (landmark.userData?.sculptSpec === 'lumenspireBeacon') {
      const beaconFrame = findTorusAtHeight(landmark, 8.68);
      if (beaconFrame) {
        beaconFrame.rotation.set(0, 0, 0);
        const crossFrame = beaconFrame.clone();
        crossFrame.material = beaconFrame.material;
        crossFrame.rotation.y = Math.PI / 2;
        crossFrame.name = 'Img2ThreeJS_LumenspireBeacon_CrossFrame';
        landmark.add(crossFrame);
        manager.corrected.push('lumenspireBeacon:crossedBeaconFrame');
      }
    }
  }

  manager.ready = true;
  return manager;
}

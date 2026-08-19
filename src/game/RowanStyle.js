import * as THREE from 'three';

const PALETTE = {
  Knight_Body: {
    color: 0x244d48, roughness: .78, metalness: .02, detail: 'cloth',
  },
  Knight_ArmLeft: {
    color: 0x6f5744, roughness: .74, metalness: .03, detail: 'leather',
  },
  Knight_ArmRight: {
    color: 0x6f5744, roughness: .74, metalness: .03, detail: 'leather',
  },
  Knight_LegLeft: {
    color: 0x183835, roughness: .82, metalness: .01, detail: 'cloth',
  },
  Knight_LegRight: {
    color: 0x183835, roughness: .82, metalness: .01, detail: 'cloth',
  },
  Knight_Head: {
    color: 0xf1c8a8, roughness: .7, metalness: 0,
  },
  Knight_Helmet: {
    color: 0x8b927f, roughness: .27, metalness: .72, accent: 0xc6a45b, sculpt: 'helmet',
  },
  Knight_Cape: {
    color: 0x762f35, roughness: .88, metalness: 0, emissive: 0x163e36,
    emissiveIntensity: .12, detail: 'cloth', rune: true, sculpt: 'cape',
  },
  Round_Shield: {
    color: 0x263e3b, roughness: .38, metalness: .38, emissive: 0x1e6f5d,
    emissiveIntensity: .24, accent: 0xc6a45b, rune: true, sculpt: 'shield',
  },
  '1H_Sword': {
    color: 0xc6d7d1, roughness: .18, metalness: .86, emissive: 0x44c6a5,
    emissiveIntensity: .55, accent: 0x8b6a37, rune: true, sculpt: 'sword',
  },
};

const shared = {
  runeMap: null,
  clothDetail: null,
  leatherDetail: null,
};

function makeRuneMap() {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / (size - 1);
      const v = y / (size - 1);
      const center = Math.abs(u - .5) < .035;
      const side = Math.abs(Math.abs(u - .5) - .17) < .022;
      const chevronPhase = (v * 4) % 1;
      const chevron = Math.abs(chevronPhase - (.28 + Math.abs(u - .5) * .9)) < .032;
      const seal = Math.abs(Math.hypot((u - .5) * 1.5, (v - .5) * .9) - .19) < .022;
      const on = center || (side && v > .08 && v < .92) || chevron || seal;
      const i = (y * size + x) * 4;
      const value = on ? 255 : 0;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function makeSurfaceDetail(kind) {
  const size = 32;
  const data = new Uint8Array(size * size * 4);
  let seed = kind === 'leather' ? 0x51f15e : 0xa13c77;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const weave = kind === 'cloth'
        ? ((x % 4 === 0 || y % 4 === 0) ? 18 : 0)
        : Math.sin(x * .7 + y * .35) * 7;
      const value = THREE.MathUtils.clamp(198 + weave + (random() - .5) * 28, 150, 236);
      const i = (y * size + x) * 4;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(kind === 'cloth' ? 5 : 3, kind === 'cloth' ? 7 : 4);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function getRuneMap() {
  shared.runeMap ||= makeRuneMap();
  return shared.runeMap;
}

function getSurfaceDetail(kind) {
  if (kind === 'cloth') shared.clothDetail ||= makeSurfaceDetail('cloth');
  if (kind === 'leather') shared.leatherDetail ||= makeSurfaceDetail('leather');
  return kind === 'cloth' ? shared.clothDetail : shared.leatherDetail;
}

function styleMaterial(material, style, hasUv) {
  if (!material || material.userData?.rowanStyled) return;
  material.userData ||= {};
  material.userData.rowanStyled = true;

  if (material.color && style.color != null) material.color.setHex(style.color);
  if ('roughness' in material && style.roughness != null) material.roughness = style.roughness;
  if ('metalness' in material && style.metalness != null) material.metalness = style.metalness;
  if ('envMapIntensity' in material) material.envMapIntensity = style.metalness > .3 ? 1.18 : .72;

  if (hasUv && style.detail && 'roughnessMap' in material) {
    material.roughnessMap = getSurfaceDetail(style.detail);
  }

  if (material.emissive && style.emissive != null) {
    material.emissive.setHex(style.emissive);
    material.emissiveIntensity = style.emissiveIntensity ?? .1;
    if (hasUv && style.rune) material.emissiveMap = getRuneMap();
  }

  material.needsUpdate = true;
}

function styleNode(node, style) {
  if (!node?.material) return;
  const hasUv = !!node.geometry?.attributes?.uv;
  const materials = Array.isArray(node.material) ? node.material : [node.material];
  for (const material of materials) styleMaterial(material, style, hasUv);
}

function sculptGeometry(node, kind) {
  if (!node?.geometry?.attributes?.position || node.userData?.rowanSculpted) return false;
  node.userData ||= {};
  node.userData.rowanSculpted = true;

  const geometry = node.geometry.clone();
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  if (!box) return false;

  const size = box.getSize(new THREE.Vector3());
  if (size.lengthSq() < 1e-8) return false;
  const center = box.getCenter(new THREE.Vector3());
  const position = geometry.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i);
    const nx = size.x > 1e-6 ? (v.x - center.x) / (size.x * .5) : 0;
    const ny = size.y > 1e-6 ? (v.y - box.min.y) / size.y : .5;
    const nz = size.z > 1e-6 ? (v.z - center.z) / (size.z * .5) : 0;

    if (kind === 'helmet') {
      if (ny > .58) {
        const crown = (ny - .58) / .42;
        const ridge = 1 - THREE.MathUtils.clamp(Math.abs(nx) * .78, 0, 1);
        v.y += size.y * .115 * crown * (.42 + ridge * .58);
        v.x *= 1 + .045 * crown;
      }
      if (Math.abs(nx) > .72 && ny > .4) v.x *= 1.035;
    }

    if (kind === 'cape') {
      if (ny < .38) {
        const hem = 1 - ny / .38;
        v.x = center.x + (v.x - center.x) * (1 + hem * .16);
        if (Math.abs(nx) < .26 && ny < .15) {
          const notch = (1 - Math.abs(nx) / .26) * (1 - ny / .15);
          v.y += size.y * .13 * notch;
        }
      }
    }

    if (kind === 'shield') {
      const angle = Math.atan2(nz, nx);
      const facet = 1 + Math.cos(angle * 6 + Math.PI / 6) * .035;
      v.x = center.x + (v.x - center.x) * facet;
      v.z = center.z + (v.z - center.z) * facet;
      if (ny < .28) {
        const taper = THREE.MathUtils.lerp(.86, 1, ny / .28);
        v.x = center.x + (v.x - center.x) * taper;
      }
    }

    if (kind === 'sword') {
      const dimensions = [size.x, size.y, size.z];
      const major = dimensions.indexOf(Math.max(...dimensions));
      const min = major === 0 ? box.min.x : major === 1 ? box.min.y : box.min.z;
      const extent = dimensions[major] || 1;
      const c = major === 0 ? v.x : major === 1 ? v.y : v.z;
      const t = THREE.MathUtils.clamp((c - min) / extent, 0, 1);
      const leaf = .965 + Math.sin(Math.PI * t) * .085;
      if (major !== 0) v.x = center.x + (v.x - center.x) * leaf;
      if (major !== 1) v.y = center.y + (v.y - center.y) * leaf;
      if (major !== 2) v.z = center.z + (v.z - center.z) * leaf;
    }

    position.setXYZ(i, v.x, v.y, v.z);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  node.geometry = geometry;
  return true;
}

function addMaterialAccent(node, style) {
  if (!style.accent || !node?.material) return;
  const materials = Array.isArray(node.material) ? node.material : [node.material];
  for (const material of materials) {
    if (!material?.color || !material.userData?.rowanStyled) continue;
    material.userData.rowanAccent = style.accent;
  }
}

function applyRowanLook(player) {
  const model = player?.assetVisual;
  if (!model || model.userData.rowanLookApplied) return false;
  model.userData.rowanLookApplied = true;
  model.userData.rowanIdentity = 'Glade Warden';

  model.traverse(node => {
    const style = PALETTE[node.name];
    if (!style) return;
    styleNode(node, style);
    if (style.sculpt) sculptGeometry(node, style.sculpt);
    addMaterialAccent(node, style);
  });

  // Keep Rowan readable in bloom without adding another dynamic light to the scene.
  const sword = model.getObjectByName('1H_Sword');
  if (sword?.material) {
    const materials = Array.isArray(sword.material) ? sword.material : [sword.material];
    for (const material of materials) {
      if ('emissiveIntensity' in material) material.emissiveIntensity = Math.max(material.emissiveIntensity || 0, .55);
    }
  }

  return true;
}

export function installRowanStyle(game) {
  const state = game.rowanStyle = {
    ready: false,
    identity: 'Glade Warden',
    preservesImportedRig: true,
  };
  const started = performance.now();

  const poll = () => {
    if (applyRowanLook(game.player)) {
      state.ready = true;
      return;
    }
    if (performance.now() - started < 15000) requestAnimationFrame(poll);
  };

  poll();
  return state;
}

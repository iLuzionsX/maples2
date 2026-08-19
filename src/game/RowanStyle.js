import * as THREE from 'three';

const SWORD_STYLE = {
  color: 0xc6d7d1,
  roughness: .18,
  metalness: .86,
  emissive: 0x44c6a5,
  emissiveIntensity: .55,
  rune: true,
  sculpt: 'sword',
};

const PALETTE = {
  Knight_Body: {
    color: 0x244d48, roughness: .8, metalness: .02, detail: 'cloth',
  },
  Knight_ArmLeft: {
    color: 0x6f5744, roughness: .76, metalness: .03, detail: 'leather',
  },
  Knight_ArmRight: {
    color: 0x6f5744, roughness: .76, metalness: .03, detail: 'leather',
  },
  Knight_LegLeft: {
    color: 0x183835, roughness: .84, metalness: .01, detail: 'cloth',
  },
  Knight_LegRight: {
    color: 0x183835, roughness: .84, metalness: .01, detail: 'cloth',
  },
  Knight_Head: {
    color: 0xf1c8a8, roughness: .7, metalness: 0,
  },
  Knight_Helmet: {
    color: 0x69736b,
    accent: 0xc6a45b,
    roughness: .26,
    metalness: .76,
    sculpt: 'helmet',
  },
  Knight_Cape: {
    color: 0x762f35,
    roughness: .9,
    metalness: 0,
    emissive: 0x163e36,
    emissiveIntensity: .12,
    detail: 'cloth',
    rune: true,
    sculpt: 'cape',
  },
  Round_Shield: {
    color: 0x263e3b,
    accent: 0xc6a45b,
    roughness: .38,
    metalness: .4,
    emissive: 0x1e6f5d,
    emissiveIntensity: .24,
    rune: true,
    sculpt: 'shield',
  },
  '1H_Sword': SWORD_STYLE,
  '2H_Sword': SWORD_STYLE,
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
        ? ((x % 4 === 0 || y % 4 === 0) ? 10 : 0)
        : Math.sin(x * .7 + y * .35) * 6;
      const base = kind === 'cloth' ? 236 : 218;
      const value = THREE.MathUtils.clamp(base + weave + (random() - .5) * 20, kind === 'cloth' ? 216 : 190, 255);
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
  if ('aoMapIntensity' in material) material.aoMapIntensity = .9;

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

    if (kind === 'helmet') {
      if (ny > .55) {
        const crown = (ny - .55) / .45;
        const ridge = 1 - THREE.MathUtils.clamp(Math.abs(nx) * .82, 0, 1);
        v.y += size.y * .16 * crown * (.38 + ridge * .62);
        v.x = center.x + (v.x - center.x) * (1 + .055 * crown);
      }
      if (Math.abs(nx) > .72 && ny > .4) {
        v.x = center.x + (v.x - center.x) * 1.035;
      }
    }

    if (kind === 'cape' && ny < .4) {
      const hem = 1 - ny / .4;
      v.x = center.x + (v.x - center.x) * (1 + hem * .18);
      if (Math.abs(nx) < .27 && ny < .16) {
        const notch = (1 - Math.abs(nx) / .27) * (1 - ny / .16);
        v.y += size.y * .14 * notch;
      }
    }

    if (kind === 'shield') {
      if (ny < .34) {
        const taper = THREE.MathUtils.lerp(.7, 1, ny / .34);
        v.x = center.x + (v.x - center.x) * taper;
      } else if (ny > .82) {
        const shoulder = THREE.MathUtils.lerp(1, .94, (ny - .82) / .18);
        v.x = center.x + (v.x - center.x) * shoulder;
      }
    }

    if (kind === 'sword') {
      const dimensions = [size.x, size.y, size.z];
      const major = dimensions.indexOf(Math.max(...dimensions));
      const min = major === 0 ? box.min.x : major === 1 ? box.min.y : box.min.z;
      const extent = dimensions[major] || 1;
      const c = major === 0 ? v.x : major === 1 ? v.y : v.z;
      const t = THREE.MathUtils.clamp((c - min) / extent, 0, 1);
      const leaf = .955 + Math.sin(Math.PI * t) * .105;
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

function addVertexAccent(node, style) {
  if (!style.accent || !node?.geometry?.attributes?.position || !node.material) return false;
  const geometry = node.geometry;
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  if (!box) return false;

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const base = new THREE.Color(style.color);
  const accent = new THREE.Color(style.accent);
  const mixed = new THREE.Color();
  const v = new THREE.Vector3();

  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i);
    const nx = size.x > 1e-6 ? Math.abs((v.x - center.x) / (size.x * .5)) : 0;
    const ny = size.y > 1e-6 ? (v.y - box.min.y) / size.y : .5;
    let weight = 0;

    if (style.sculpt === 'helmet') {
      const ridge = (1 - THREE.MathUtils.smoothstep(nx, .12, .42)) * THREE.MathUtils.smoothstep(ny, .5, .82);
      const brim = THREE.MathUtils.smoothstep(nx, .72, .98) * (1 - THREE.MathUtils.smoothstep(ny, .6, .84));
      weight = Math.max(ridge * .74, brim * .58);
    } else if (style.sculpt === 'shield') {
      const sideRim = THREE.MathUtils.smoothstep(nx, .76, .98);
      const topRim = THREE.MathUtils.smoothstep(ny, .84, .98);
      const bottomRim = 1 - THREE.MathUtils.smoothstep(ny, .04, .2);
      weight = Math.max(sideRim, topRim, bottomRim) * .78;
    }

    mixed.copy(base).lerp(accent, THREE.MathUtils.clamp(weight, 0, 1));
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const materials = Array.isArray(node.material) ? node.material : [node.material];
  for (const material of materials) {
    if (!material?.color) continue;
    material.color.setHex(0xffffff);
    material.vertexColors = true;
    material.needsUpdate = true;
  }
  return true;
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
    addVertexAccent(node, style);
  });

  // Keep Rowan readable in bloom without adding another dynamic light to the scene.
  for (const swordName of ['1H_Sword', '2H_Sword']) {
    const sword = model.getObjectByName(swordName);
    if (!sword?.material) continue;
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

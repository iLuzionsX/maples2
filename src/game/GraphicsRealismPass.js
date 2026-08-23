import * as THREE from 'three';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

const V = THREE.Vector3;
const TAU = Math.PI * 2;

function seededRandom(seed = 0x47525850) {
  return () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function radialTexture(inner = 'rgba(255,255,255,1)', middle = 'rgba(255,255,255,.42)') {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 62);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(.24, middle);
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    contrast: { value: 1.035 },
    saturation: { value: 1.035 },
    vignette: { value: .105 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float contrast;
    uniform float saturation;
    uniform float vignette;
    varying vec2 vUv;
    void main() {
      vec4 source = texture2D(tDiffuse, vUv);
      vec3 color = source.rgb;
      float luma = dot(color, vec3(.2126, .7152, .0722));
      color = mix(vec3(luma), color, saturation);
      color = (color - .5) * contrast + .5;
      float d = distance(vUv, vec2(.5));
      float edge = smoothstep(.30, .72, d);
      color *= 1.0 - edge * vignette;
      gl_FragColor = vec4(max(color, vec3(0.0)), source.a);
    }
  `,
};

class GraphicsRealismPass {
  constructor(game) {
    this.game = game;
    this.scene = game.scene;
    this.world = game.world;
    this.quality = game.quality;
    this.time = 0;
    this.random = seededRandom();
    this.dynamicRoot = new THREE.Group();
    this.dynamicRoot.name = 'Graphics_Realism_Atmosphere';
    this.scene.add(this.dynamicRoot);
    this.particleLayers = [];
    this.mistSprites = [];

    this._tuneRendererAndLighting();
    this._addGradePass();
    this._buildGroundVariation();
    this._buildAtmosphere();
    this._hookUpdate();
  }

  _tuneRendererAndLighting() {
    const renderer = this.game.renderer;
    renderer.toneMappingExposure = .93;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    let key = null;
    const fills = [];
    this.scene.traverse(object => {
      if (object.isHemisphereLight) object.intensity = Math.min(object.intensity, 1.18);
      if (!object.isDirectionalLight) return;
      if (object.castShadow && (!key || object.intensity > key.intensity)) key = object;
      else fills.push(object);
    });

    if (key) {
      key.intensity = Math.min(key.intensity, 3.45);
      key.shadow.bias = -.00014;
      key.shadow.normalBias = .018;
    }
    for (const fill of fills) fill.intensity = Math.min(fill.intensity, .52);

    if (this.scene.fog?.isFogExp2) {
      this.scene.fog.color.set(0x6f8780);
      this.scene.fog.density = .0195;
    }
    if (this.scene.background?.isColor) this.scene.background.set(0x849e98);
  }

  _addGradePass() {
    const composer = this.game.composer;
    if (!composer || this.quality !== 'high') return;
    const pass = new ShaderPass(GradeShader);
    pass.name = 'GraphicsRealismGrade';
    const outputIndex = composer.passes.findIndex(item => item?.constructor?.name === 'OutputPass');
    if (outputIndex >= 0 && composer.insertPass) composer.insertPass(pass, outputIndex);
    else composer.addPass(pass);
    this.gradePass = pass;
  }

  _buildGroundVariation() {
    const makeLayer = (name, color, opacity, count, radiusMin, radiusMax) => {
      const geometry = new THREE.CircleGeometry(1, 14);
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 1,
        metalness: 0,
        transparent: true,
        opacity,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      });
      const mesh = new THREE.InstancedMesh(geometry, material, count);
      mesh.name = name;
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = .014;
      mesh.receiveShadow = false;
      mesh.frustumCulled = true;
      const matrix = new THREE.Matrix4();
      const rotation = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      for (let i = 0; i < count; i++) {
        const a = this.random() * TAU;
        const r = radiusMin + this.random() * (radiusMax - radiusMin);
        const sx = .9 + this.random() * 2.6;
        const sy = .65 + this.random() * 1.75;
        rotation.setFromAxisAngle(new V(0, 0, 1), this.random() * TAU);
        scale.set(sx, sy, 1);
        matrix.compose(new V(Math.cos(a) * r, Math.sin(a) * r, 0), rotation, scale);
        mesh.setMatrixAt(i, matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      this.world.decor.add(mesh);
      return mesh;
    };

    const count = this.quality === 'high' ? 30 : 16;
    this.soilPatches = makeLayer('Realism_Soil_Variation', 0x263d31, .105, count, 3.5, 21.5);
    this.mossPatches = makeLayer('Realism_Moss_Variation', 0x6f8154, .07, Math.max(10, count - 8), 4.5, 22.5);
  }

  _makePointLayer({ name, count, color, size, opacity, yMin, yMax, speed, additive = false }) {
    const positions = new Float32Array(count * 3);
    const bases = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const a = this.random() * TAU;
      const r = 4 + this.random() * 25;
      const x = Math.cos(a) * r;
      const y = yMin + this.random() * (yMax - yMin);
      const z = Math.sin(a) * r;
      positions[i * 3] = bases[i * 3] = x;
      positions[i * 3 + 1] = bases[i * 3 + 1] = y;
      positions[i * 3 + 2] = bases[i * 3 + 2] = z;
      phases[i] = this.random() * TAU;
      speeds[i] = speed * (.65 + this.random() * .75);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    const material = new THREE.PointsMaterial({
      color,
      size,
      map: radialTexture(),
      transparent: true,
      opacity,
      depthWrite: false,
      alphaTest: .015,
      sizeAttenuation: true,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      toneMapped: !additive,
    });
    const points = new THREE.Points(geometry, material);
    points.name = name;
    points.frustumCulled = false;
    this.dynamicRoot.add(points);
    this.particleLayers.push({ points, bases, phases, speeds });
  }

  _buildAtmosphere() {
    const high = this.quality === 'high';
    this._makePointLayer({
      name: 'Realism_Dust_Motes', count: high ? 74 : 34, color: 0xd9c99b, size: high ? .095 : .085,
      opacity: .23, yMin: .35, yMax: 4.8, speed: .22, additive: false,
    });
    this._makePointLayer({
      name: 'Realism_Forest_Spores', count: high ? 46 : 20, color: 0xa2e4c8, size: high ? .072 : .062,
      opacity: .3, yMin: .5, yMax: 5.6, speed: .34, additive: true,
    });

    const mistTexture = radialTexture('rgba(255,255,255,.62)', 'rgba(255,255,255,.24)');
    const mistCount = high ? 12 : 7;
    for (let i = 0; i < mistCount; i++) {
      const material = new THREE.SpriteMaterial({
        map: mistTexture,
        color: i % 3 === 0 ? 0x93afa6 : 0xa7b7ad,
        transparent: true,
        opacity: .038 + this.random() * .027,
        depthWrite: false,
        depthTest: true,
        blending: THREE.NormalBlending,
        toneMapped: true,
      });
      const sprite = new THREE.Sprite(material);
      const a = i / mistCount * TAU + this.random() * .35;
      const r = 18 + this.random() * 10;
      sprite.position.set(Math.cos(a) * r, .95 + this.random() * 1.1, Math.sin(a) * r);
      const width = 6.5 + this.random() * 6.5;
      sprite.scale.set(width, 2.1 + this.random() * 2.2, 1);
      sprite.userData.base = sprite.position.clone();
      sprite.userData.phase = this.random() * TAU;
      this.dynamicRoot.add(sprite);
      this.mistSprites.push(sprite);
    }
  }

  _hookUpdate() {
    const baseWorldUpdate = this.world.update.bind(this.world);
    this.world.update = dt => {
      baseWorldUpdate(dt);
      this.update(dt);
    };
  }

  update(dt) {
    this.time += dt;
    for (const layer of this.particleLayers) {
      const attribute = layer.points.geometry.attributes.position;
      const positions = attribute.array;
      for (let i = 0; i < layer.phases.length; i++) {
        const phase = layer.phases[i];
        const speed = layer.speeds[i];
        const ix = i * 3;
        positions[ix] = layer.bases[ix] + Math.sin(this.time * speed + phase) * .42;
        positions[ix + 1] = layer.bases[ix + 1] + Math.sin(this.time * speed * .73 + phase * 1.7) * .24;
        positions[ix + 2] = layer.bases[ix + 2] + Math.cos(this.time * speed * .61 + phase) * .34;
      }
      attribute.needsUpdate = true;
    }

    for (const mist of this.mistSprites) {
      const base = mist.userData.base;
      const phase = mist.userData.phase;
      mist.position.x = base.x + Math.sin(this.time * .065 + phase) * 1.35;
      mist.position.z = base.z + Math.cos(this.time * .052 + phase) * 1.05;
      mist.material.opacity *= 1;
    }
  }
}

export function installGraphicsRealismPass(game) {
  if (!game || game.graphicsRealismPass) return game?.graphicsRealismPass || null;
  const pass = new GraphicsRealismPass(game);
  game.graphicsRealismPass = pass;
  return pass;
}

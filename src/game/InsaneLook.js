import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { TexturePass } from 'three/addons/postprocessing/TexturePass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const V = THREE.Vector3;
const TAU = Math.PI * 2;

const POST_VERTEX = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SSAO_SHADER = {
  name: 'MintContact',
  uniforms: {
    tDiffuse: { value: null },
    tDepth: { value: null },
    uNear: { value: 0.08 },
    uFar: { value: 500 },
    uTexel: { value: new THREE.Vector2(1 / 1280, 1 / 720) },
    uStrength: { value: 0.62 },
    uKernel: { value: [] },
  },
  vertexShader: POST_VERTEX,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;
    uniform float uNear;
    uniform float uFar;
    uniform vec2 uTexel;
    uniform float uStrength;
    uniform vec2 uKernel[8];
    varying vec2 vUv;

    float viewZ(float depth) {
      return (uNear * uFar) / ((uFar - uNear) * depth - uFar);
    }

    void main() {
      float depth = texture2D(tDepth, vUv).x;
      float z = viewZ(depth);
      float occ = 0.0;
      for (int i = 0; i < 8; i++) {
        vec2 suv = vUv + uKernel[i] * uTexel;
        float sz = viewZ(texture2D(tDepth, suv).x);
        float diff = sz - z;
        occ += clamp(diff * 2.1, 0.0, 1.0) * (1.0 - smoothstep(0.35, 2.4, diff));
      }
      occ = occ / 8.0 * (1.0 - smoothstep(0.96, 1.0, depth));
      vec3 col = texture2D(tDiffuse, vUv).rgb * mix(1.0, 0.64, occ * uStrength);
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

const OPTICS_SHADER = {
  name: 'MintOptics',
  uniforms: {
    tDiffuse: { value: null },
    tDepth: { value: null },
    uInverseProjection: { value: new THREE.Matrix4() },
    uCameraWorld: { value: new THREE.Matrix4() },
    uPrevViewProjection: { value: new THREE.Matrix4() },
    uTexel: { value: new THREE.Vector2(1 / 1280, 1 / 720) },
    uNear: { value: 0.08 },
    uFar: { value: 500 },
    uFocus: { value: -10 },
    uCoCScale: { value: 0.85 },
    uMaxCoC: { value: 18 },
    uBlurScale: { value: 1 },
    uSun: { value: new THREE.Vector2(0.72, 0.78) },
    uSunActive: { value: 1 },
    uGodray: { value: 0.2 },
  },
  vertexShader: POST_VERTEX,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;
    uniform mat4 uInverseProjection;
    uniform mat4 uCameraWorld;
    uniform mat4 uPrevViewProjection;
    uniform vec2 uTexel;
    uniform float uNear;
    uniform float uFar;
    uniform float uFocus;
    uniform float uCoCScale;
    uniform float uMaxCoC;
    uniform float uBlurScale;
    uniform vec2 uSun;
    uniform float uSunActive;
    uniform float uGodray;
    varying vec2 vUv;

    float viewZ(float depth) {
      return (uNear * uFar) / ((uFar - uNear) * depth - uFar);
    }

    vec3 sampleColor(vec2 uv) {
      vec3 s = texture2D(tDiffuse, uv).rgb;
      float luma = dot(s, vec3(0.2126, 0.7152, 0.0722));
      return s * (1.0 + smoothstep(1.15, 2.6, luma) * 1.35);
    }

    void main() {
      float depth = texture2D(tDepth, vUv).x;
      float z = viewZ(depth);
      float coc = clamp(abs(z - uFocus) * uCoCScale, 0.0, uMaxCoC);
      vec3 accum = texture2D(tDiffuse, vUv).rgb;
      float weight = 1.0;
      if (coc > 0.45) {
        for (int i = 0; i < 11; i++) {
          float a = float(i) * 2.39996323;
          float r = sqrt((float(i) + 0.5) / 11.0);
          vec2 off = vec2(cos(a), sin(a)) * r * coc * uTexel;
          accum += sampleColor(vUv + off);
          weight += 1.0;
        }
      }
      vec3 col = accum / weight;

      vec4 clip = vec4(vUv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
      vec4 view = uInverseProjection * clip;
      view /= view.w;
      vec4 world = uCameraWorld * vec4(view.xyz, 1.0);
      vec4 prevClip = uPrevViewProjection * vec4(world.xyz, 1.0);
      vec2 prevUv = prevClip.xy / prevClip.w * 0.5 + 0.5;
      vec2 velocity = (vUv - prevUv) * uBlurScale;
      float vlen = length(velocity);
      if (vlen > 0.022) velocity *= 0.022 / vlen;
      if (vlen > 0.0015) {
        vec3 motion = vec3(0.0);
        for (int i = 0; i < 7; i++) {
          float t = float(i) / 6.0 - 0.5;
          motion += texture2D(tDiffuse, vUv + velocity * t).rgb;
        }
        col = mix(col, motion / 7.0, smoothstep(0.0015, 0.01, length(velocity)));
      }

      if (uSunActive > 0.5 && uGodray > 0.001) {
        vec2 delta = (uSun - vUv) / 8.0;
        float light = 0.0;
        vec2 p = vUv;
        for (int i = 0; i < 8; i++) {
          p += delta;
          light += smoothstep(0.986, 0.9995, texture2D(tDepth, p).x);
        }
        float fade = smoothstep(1.2, 0.15, length(uSun - vUv));
        col += vec3(0.73, 1.0, 0.90) * (light / 8.0) * fade * uGodray;
      }

      float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
      float shadow = pow(1.0 - smoothstep(0.0, 0.22, luma), 1.15);
      col += vec3(0.55, 0.92, 0.78) * shadow * 0.028;
      float mid = smoothstep(0.03, 0.22, luma) * (1.0 - smoothstep(0.55, 1.8, luma));
      col *= mix(vec3(1.0), vec3(0.93, 1.07, 0.99), mid * 0.72);
      col += vec3(0.006, 0.016, 0.011) * mid;
      float hi = smoothstep(0.9, 2.8, luma);
      col = mix(col, col * vec3(1.06, 1.015, 0.92), hi * 0.42);
      float haze = smoothstep(18.0, 70.0, -z) * (1.0 - smoothstep(0.2, 1.6, luma));
      col = mix(col, vec3(0.55, 0.84, 0.74), haze * 0.07);
      gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
    }
  `,
};

const FINISH_SHADER = {
  name: 'MintFinish',
  uniforms: {
    tDiffuse: { value: null },
    tGrain: { value: null },
    uGrainOffset: { value: new THREE.Vector2() },
    uAberration: { value: 0 },
  },
  vertexShader: POST_VERTEX,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform sampler2D tGrain;
    uniform vec2 uGrainOffset;
    uniform float uAberration;
    varying vec2 vUv;

    vec3 toLinear(vec3 c) { return pow(max(c, vec3(0.0)), vec3(2.2)); }
    vec3 toSrgb(vec3 c) { return pow(max(c, vec3(0.0)), vec3(1.0 / 2.2)); }

    void main() {
      vec2 uv = vUv;
      vec3 srgb;
      srgb.r = texture2D(tDiffuse, uv + vec2(uAberration, 0.0)).r;
      srgb.g = texture2D(tDiffuse, uv).g;
      srgb.b = texture2D(tDiffuse, uv - vec2(uAberration, 0.0)).b;
      vec3 col = toLinear(srgb);
      float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col += vec3(0.008, 0.016, 0.012) * (1.0 - smoothstep(0.0, 0.35, luma));
      vec2 centered = (uv - 0.5) * vec2(1.12, 1.22);
      float vig = smoothstep(0.38, 1.18, length(centered));
      col *= mix(1.0, 0.82, vig);
      col = mix(col, col * vec3(0.78, 0.95, 0.88), vig * 0.5);
      float grain = texture2D(tGrain, uv * vec2(2.6, 1.7) + uGrainOffset).r - 0.5;
      col += grain * 0.011;
      gl_FragColor = vec4(toSrgb(col), 1.0);
    }
  `,
};

const WATER_VERTEX = /* glsl */`
  uniform float uTime;
  uniform mat4 uTextureMatrix;
  varying vec2 vUv;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying vec4 vReflect;
  void main() {
    vUv = uv;
    vec3 p = position;
    float wave = sin(p.x * 1.65 + uTime * 2.15) * 0.05 + sin(p.z * 2.7 - uTime * 1.5) * 0.032;
    wave += sin((p.x + p.z) * 4.4 + uTime * 1.15) * 0.012;
    p.y += wave;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vWorld = world.xyz;
    vReflect = uTextureMatrix * world;
    float dx = cos(p.x * 1.65 + uTime * 2.15) * 1.65 * 0.05;
    float dz = cos(p.z * 2.7 - uTime * 1.5) * 2.7 * 0.032;
    vNormal = normalize(mat3(modelMatrix) * vec3(-dx, 1.0, -dz));
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const WATER_FRAGMENT = /* glsl */`
  uniform sampler2D uReflection;
  uniform sampler2D uNormalMap;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uReflect;
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  uniform vec3 uSun;
  uniform vec3 uCameraPos;
  varying vec2 vUv;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying vec4 vReflect;

  void main() {
    vec2 flowA = vUv * vec2(4.2, 1.35) + vec2(uTime * 0.035, uTime * 0.018);
    vec2 flowB = vUv * vec2(7.4, 2.1) - vec2(uTime * 0.022, uTime * 0.031);
    vec3 n1 = texture2D(uNormalMap, flowA).xyz * 2.0 - 1.0;
    vec3 n2 = texture2D(uNormalMap, flowB).xyz * 2.0 - 1.0;
    vec3 n = normalize(vec3(n1.xy * 0.85 + n2.xy, 0.65));
    vec2 uv = vReflect.xy / max(vReflect.w, 0.0001) + n.xy * 0.028;
    uv = clamp(uv, vec2(0.001), vec2(0.999));
    vec3 refl = texture2D(uReflection, uv).rgb;
    vec3 viewDir = normalize(uCameraPos - vWorld);
    float fres = pow(1.0 - clamp(dot(normalize(vNormal), viewDir), 0.0, 1.0), 2.6);
    float edge = smoothstep(0.0, 0.16, vUv.y) * (1.0 - smoothstep(0.84, 1.0, vUv.y));
    vec3 water = mix(uDeep, uShallow, 0.42 + edge * 0.48);
    float sparkle = pow(clamp(n.z, 0.0, 1.0), 28.0);
    float caustic = pow(0.5 + 0.5 * sin(vWorld.x * 5.5 + n.x * 9.0 + uTime * 1.8), 6.0);
    vec3 col = mix(water, refl, mix(0.62, 0.94, fres) * edge * uReflect);
    col += uShallow * caustic * 0.07;
    col += uSun * sparkle * 0.7;
    gl_FragColor = vec4(col, 0.9);
  }
`;

function seeded(seed = 0x51A7E) {
  return () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function makePass(shader) {
  const pass = new ShaderPass(shader);
  pass.material.depthTest = false;
  pass.material.depthWrite = false;
  pass.material.toneMapped = false;
  return pass;
}

function flatDataTexture(r, g, b) {
  const texture = new THREE.DataTexture(new Uint8Array([r, g, b, 255]), 1, 1);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function grainTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(size, size);
  const rand = seeded(0x6A11);
  for (let i = 0; i < size * size; i++) {
    const n = Math.floor(118 + rand() * 80);
    image.data[i * 4] = n;
    image.data[i * 4 + 1] = n;
    image.data[i * 4 + 2] = n;
    image.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.NoColorSpace;
  return texture;
}

function contactKernel() {
  const rand = seeded(0xC0FFEE);
  const kernel = [];
  for (let i = 0; i < 8; i++) {
    const radius = 7 + rand() * 16;
    const angle = rand() * TAU;
    kernel.push(new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius));
  }
  return kernel;
}

function configureRepeat(texture, repeatX, repeatY) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.NoColorSpace;
  texture.repeat.set(repeatX, repeatY);
  texture.anisotropy = 8;
  return texture;
}

function ensureUv2(geometry) {
  if (!geometry?.attributes?.uv || geometry.attributes.uv2) return;
  geometry.setAttribute('uv2', geometry.attributes.uv.clone());
}

function isBloomPass(pass) {
  return pass && 'strength' in pass && 'threshold' in pass && 'radius' in pass;
}

function isOutputPass(pass) {
  return Boolean(pass?.uniforms?.toneMappingExposure);
}

export function installInsaneLook(game) {
  const look = new InsaneLook(game);
  game.insaneLook = look;
  return look;
}

class InsaneLook {
  constructor(game) {
    this.game = game;
    this.scene = game.scene;
    this.high = game.quality === 'high';
    this.texturesReady = false;
    this.focus = -12;
    this.focusPoint = new V();
    this._materialScan = 0;
    this.sunFar = new V();
    this.lastCameraPosition = new V();
    this.prevViewProjection = new THREE.Matrix4();
    this.currentViewProjection = new THREE.Matrix4();
    this.hasPreviousCamera = false;
    this.sunNdc = new THREE.Vector3();
    this.textureMatrix = new THREE.Matrix4();
    this.mirror = new THREE.Object3D();
    this.mirror.rotation.x = -Math.PI / 2;
    this.mirror.position.y = 0.055;
    this._reflectionScratch = {
      plane: new THREE.Plane(),
      normal: new V(),
      reflectorWorld: new V(),
      cameraWorld: new V(),
      rotation: new THREE.Matrix4(),
      lookAt: new V(0, 0, -1),
      clip: new THREE.Vector4(),
      view: new V(),
      target: new V(),
      q: new THREE.Vector4(),
    };

    this._linearizeExisting();
    this._applyMood();
    this._loadTextures();
    this._buildTargets();
    this._buildAtmosphereMeshes();
    this._upgradeWater();
    this._buildPost();
    this._hookFrame();
    this.ready = Promise.all([this._loadEnvironment(), this._texturePromise]).then(() => {
      this.dress(this.scene);
    });
    this.resize();
  }

  _linearizeExisting() {
    this.scene.traverse(node => this._linearizeMaterials(node.material));
  }

  _linearizeMaterials(material) {
    const list = Array.isArray(material) ? material : [material];
    for (const entry of list) {
      if (entry && entry.toneMapped) entry.toneMapped = false;
    }
  }

  _applyMood() {
    const { scene, game } = this;
    // One Neutral grade at the end of the chain. Materials stay linear so bloom,
    // depth of field and the mint lift see real light instead of a pre-crushed image.
    game.renderer.toneMapping = THREE.NeutralToneMapping;
    game.renderer.toneMappingExposure = this.high ? 1.02 : 0.94;
    scene.environmentIntensity = 1.08;
    scene.fog?.color?.setHex(0x8ecfb8);
    if (scene.fog?.isFogExp2) scene.fog.density = this.high ? 0.0165 : 0.02;
    scene.background?.setHex?.(0xb7eadc);

    let sun = null;
    scene.traverse(object => {
      const uniforms = object.material?.uniforms;
      if (uniforms?.turbidity && uniforms?.rayleigh) {
        uniforms.turbidity.value = 2.35;
        uniforms.rayleigh.value = 1.05;
        uniforms.mieCoefficient.value = 0.0024;
        uniforms.mieDirectionalG.value = 0.76;
      }
      if (object.isHemisphereLight) {
        object.color.setHex(0xe7fff6);
        object.groundColor.setHex(0x4f8f6e);
        object.intensity = 0.92;
      }
      if (object.isDirectionalLight && object.castShadow && !sun) sun = object;
    });
    this.sun = sun;
    if (sun) {
      sun.color.setHex(0xfff3d4);
      sun.intensity = 3.45;
      sun.shadow.intensity = 0.86;
      sun.shadow.radius = 2;
      const sky = scene.children.find(child => child.material?.uniforms?.sunPosition);
      sky?.material.uniforms.sunPosition.value.copy(sun.position).normalize();
    }
    scene.traverse(object => {
      if (!object.isDirectionalLight || object === sun) return;
      object.color.setHex(0xcfffea);
      object.intensity = Math.min(object.intensity, 0.38);
    });

    const decor = game.world?.decor;
    const ground = decor?.children?.[0];
    const clearing = decor?.children?.[1];
    ground?.material?.color?.setHex(0x4e8d68);
    clearing?.material?.color?.setHex(0x6fbf8e);
    const shadows = game.showcasePass?.shadowMaterial;
    if (shadows) {
      shadows.color?.setHex(0x1a3b34);
      shadows.opacity = 0.34;
    }
  }

  _loadTextures() {
    const loader = new THREE.TextureLoader();
    const load = (url, repeatX, repeatY) => new Promise(resolve => {
      loader.load(url, texture => resolve(configureRepeat(texture, repeatX, repeatY)), undefined, () => resolve(null));
    });
    this.grassNormal = flatDataTexture(128, 128, 255);
    this.grassRough = flatDataTexture(210, 210, 210);
    this.grassAo = flatDataTexture(255, 255, 255);
    this.rockNormal = flatDataTexture(128, 128, 255);
    this.waterNormal = flatDataTexture(128, 128, 255);
    this._texturePromise = Promise.all([
      load('/assets/look/leafy_grass_nor_gl_1k.jpg', 6, 6),
      load('/assets/look/leafy_grass_rough_1k.jpg', 6, 6),
      load('/assets/look/leafy_grass_ao_1k.jpg', 6, 6),
      load('/assets/look/mossy_rock_nor_gl_1k.jpg', 3.5, 3.5),
      load('/assets/look/waternormals.jpg', 1, 1),
    ]).then(([grassNormal, grassRough, grassAo, rockNormal, waterNormal]) => {
      if (grassNormal) this.grassNormal = grassNormal;
      if (grassRough) this.grassRough = grassRough;
      if (grassAo) this.grassAo = grassAo;
      if (rockNormal) this.rockNormal = rockNormal;
      if (waterNormal) {
        this.waterNormal = waterNormal;
        if (this.game.showcasePass?.waterUniforms?.uNormalMap) {
          this.game.showcasePass.waterUniforms.uNormalMap.value = waterNormal;
        }
      }
      this.texturesReady = true;
    });
  }

  _loadEnvironment() {
    const pmrem = new THREE.PMREMGenerator(this.game.renderer);
    const fallback = new THREE.Scene();
    const gradient = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        top: { value: new THREE.Color(0xe7fff6) },
        horizon: { value: new THREE.Color(0xf7f6e4) },
        ground: { value: new THREE.Color(0x6eae8c) },
      },
      vertexShader: `varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec3 vDir; uniform vec3 top; uniform vec3 horizon; uniform vec3 ground;
        void main(){ float h = normalize(vDir).y; vec3 c = mix(horizon, top, smoothstep(0.0, 0.45, h)); c = mix(ground, c, smoothstep(-0.25, 0.08, h)); gl_FragColor = vec4(c, 1.0); }`,
    });
    fallback.add(new THREE.Mesh(new THREE.SphereGeometry(12, 24, 16), gradient));
    const provisional = pmrem.fromScene(fallback, 0.04);
    this.scene.environment = provisional.texture;

    return new Promise(resolve => {
      new RGBELoader().load('/assets/look/meadow_1k.hdr', hdr => {
        hdr.mapping = THREE.EquirectangularReflectionMapping;
        const target = pmrem.fromEquirectangular(hdr);
        this.scene.environment = target.texture;
        hdr.dispose();
        pmrem.dispose();
        resolve();
      }, undefined, () => {
        pmrem.dispose();
        resolve();
      });
    });
  }

  _buildTargets() {
    const { renderer } = this.game;
    const size = new THREE.Vector2();
    renderer.getDrawingBufferSize(size);
    this.depthTexture = new THREE.DepthTexture(size.x, size.y);
    this.depthTexture.type = THREE.UnsignedShortType;
    this.beauty = new THREE.WebGLRenderTarget(size.x, size.y, {
      type: THREE.HalfFloatType,
      depthTexture: this.depthTexture,
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
    });
    this.beauty.texture.colorSpace = THREE.LinearSRGBColorSpace;
    this.reflectionTarget = new THREE.WebGLRenderTarget(Math.max(2, size.x >> 1), Math.max(2, size.y >> 1), {
      type: THREE.HalfFloatType,
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
    });
    this.reflectionTarget.texture.colorSpace = THREE.LinearSRGBColorSpace;
    this.reflectionCamera = new THREE.PerspectiveCamera();
  }

  _buildAtmosphereMeshes() {
    const rand = seeded(0xBEE5);
    this.shafts = [];
    this.hiddenInReflection = [];
    const sunDir = (this.sun?.position || new V(-18, 28, 13)).clone().normalize();
    const side = new V(-sunDir.z, 0, sunDir.x).normalize();
    const align = new THREE.Quaternion().setFromUnitVectors(new V(0, 1, 0), sunDir);
    const streak = this._shaftTexture();
    for (let i = 0; i < (this.high ? 5 : 3); i++) {
      const material = new THREE.MeshBasicMaterial({
        map: streak,
        color: 0xf4fff8,
        transparent: true,
        opacity: 0.026 + rand() * 0.012,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        toneMapped: false,
      });
      const shaft = new THREE.Mesh(new THREE.PlaneGeometry(2.4 + rand() * 1.4, 22), material);
      shaft.quaternion.copy(align);
      shaft.position.copy(side).multiplyScalar((i - 2) * 3.4).add(new V(0, 8.5, 0));
      shaft.userData.mintShaft = true;
      shaft.userData.baseOpacity = material.opacity;
      shaft.renderOrder = 4;
      this.scene.add(shaft);
      this.shafts.push(shaft);
      this.hiddenInReflection.push(shaft);
    }

    const mistMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec3 vWorld; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: `uniform float uTime; varying vec3 vWorld;
        void main(){
          float r = length(vWorld.xz);
          float band = smoothstep(7.0, 14.0, r) * (1.0 - smoothstep(23.0, 31.0, r));
          float wisp = 0.65 + 0.35 * sin(vWorld.x * 0.35 + vWorld.z * 0.22 + uTime * 0.35);
          float alpha = band * wisp * 0.08;
          gl_FragColor = vec4(0.78, 0.97, 0.90, alpha);
        }`,
    });
    const mist = new THREE.Mesh(new THREE.CircleGeometry(32, 48), mistMaterial);
    mist.rotation.x = -Math.PI / 2;
    mist.position.y = 0.28;
    mist.renderOrder = 3;
    mist.userData.mintMist = true;
    this.scene.add(mist);
    this.mist = mist;
    this.hiddenInReflection.push(mist);

    this.puddles = [];
    const spots = [[1.6, 2.4, 1.15], [-2.8, 5.2, 0.85], [3.6, -1.4, 0.95], [-6.5, -3.2, 0.7]];
    for (const [x, z, radius] of spots) {
      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        uniforms: {
          uReflection: { value: this.reflectionTarget.texture },
          uNormalMap: { value: this.waterNormal },
          uTextureMatrix: { value: this.textureMatrix },
          uTime: { value: 0 },
          uReflect: { value: this.high ? 1 : 0 },
          uCameraPos: { value: new V() },
        },
        vertexShader: `uniform mat4 uTextureMatrix; varying vec3 vWorld; varying vec4 vReflect; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; vReflect = uTextureMatrix * w; gl_Position = projectionMatrix * viewMatrix * w; }`,
        fragmentShader: `uniform sampler2D uReflection; uniform sampler2D uNormalMap; uniform float uTime; uniform float uReflect; uniform vec3 uCameraPos; varying vec3 vWorld; varying vec4 vReflect;
          void main(){
            vec3 n = texture2D(uNormalMap, vWorld.xz * 0.35 + vec2(uTime * 0.02, uTime * 0.015)).xyz * 2.0 - 1.0;
            vec2 uv = vReflect.xy / max(vReflect.w, 0.0001) + n.xy * 0.02;
            vec3 refl = texture2D(uReflection, clamp(uv, 0.001, 0.999)).rgb;
            vec3 viewDir = normalize(uCameraPos - vWorld);
            float fres = pow(1.0 - clamp(viewDir.y, 0.0, 1.0), 2.2);
            vec3 water = mix(vec3(0.10, 0.28, 0.26), vec3(0.55, 0.90, 0.78), fres);
            vec3 col = mix(water, refl, (0.58 + fres * 0.36) * uReflect);
            float radius = length(vWorld.xz - vec2(${x.toFixed(2)}, ${z.toFixed(2)}));
            float alpha = (1.0 - smoothstep(${(radius * 0.72).toFixed(3)}, ${radius.toFixed(3)}, radius)) * 0.82;
            gl_FragColor = vec4(col, alpha);
          }`,
      });
      const puddle = new THREE.Mesh(new THREE.CircleGeometry(radius, 24), material);
      puddle.rotation.x = -Math.PI / 2;
      puddle.position.set(x, 0.036, z);
      puddle.renderOrder = 3;
      puddle.userData.mintPuddle = true;
      this.scene.add(puddle);
      this.puddles.push(puddle);
      this.hiddenInReflection.push(puddle);
    }
  }

  _shaftTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.18, 'rgba(255,255,255,.85)');
    gradient.addColorStop(0.72, 'rgba(255,255,255,.35)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 256);
    const across = ctx.createLinearGradient(0, 0, 64, 0);
    across.addColorStop(0, 'rgba(0,0,0,.85)');
    across.addColorStop(0.5, 'rgba(0,0,0,0)');
    across.addColorStop(1, 'rgba(0,0,0,.85)');
    ctx.fillStyle = across;
    ctx.fillRect(0, 0, 64, 256);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  _upgradeWater() {
    const pass = this.game.showcasePass;
    const material = pass?.water?.material;
    if (!material?.isShaderMaterial || !pass.waterUniforms) return;
    const uniforms = pass.waterUniforms;
    uniforms.uReflection = { value: this.reflectionTarget.texture };
    uniforms.uNormalMap = { value: this.waterNormal };
    uniforms.uTextureMatrix = { value: this.textureMatrix };
    uniforms.uResolution = { value: new THREE.Vector2(1, 1) };
    uniforms.uReflect = { value: this.high ? 1 : 0 };
    uniforms.uCameraPos = { value: new V() };
    uniforms.uDeep.value.setHex(0x11464c);
    uniforms.uShallow.value.setHex(0x8fe6c8);
    uniforms.uSun.value.setHex(0xfff7df);
    material.vertexShader = WATER_VERTEX;
    material.fragmentShader = WATER_FRAGMENT;
    material.toneMapped = false;
    material.needsUpdate = true;
    this.hiddenInReflection.push(pass.water);
    this.waterUniforms = uniforms;
  }

  _buildPost() {
    let composer = this.game.composer;
    if (!composer) {
      composer = new EffectComposer(this.game.renderer);
      composer.addPass(new RenderPass(this.scene, this.game.camera));
      composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.2, 0.35, 0.85));
      composer.addPass(new OutputPass());
      this.game.composer = composer;
    }

    const bloom = composer.passes.find(isBloomPass);
    const output = composer.passes.find(isOutputPass);
    if (bloom) {
      bloom.threshold = this.high ? 1.55 : 1.7;
      bloom.strength = this.high ? 0.24 : 0.14;
      bloom.radius = this.high ? 0.48 : 0.28;
    }

    this.texturePass = new TexturePass(this.beauty.texture);
    this.contactPass = makePass(SSAO_SHADER);
    this.contactPass.uniforms.uKernel.value = contactKernel();
    this.contactPass.uniforms.uStrength.value = this.high ? 0.85 : 0.45;
    this.contactPass.uniforms.tDepth.value = this.depthTexture;
    this.contactPass.enabled = this.high;
    this.opticsPass = makePass(OPTICS_SHADER);
    this.opticsPass.uniforms.tDepth.value = this.depthTexture;
    this.opticsPass.uniforms.uCoCScale.value = this.high ? 1.25 : 0.48;
    this.opticsPass.uniforms.uMaxCoC.value = this.high ? 24 : 8;
    this.opticsPass.uniforms.uGodray.value = this.high ? 0.09 : 0.03;
    this.finishPass = makePass(FINISH_SHADER);
    this.finishPass.uniforms.tGrain.value = grainTexture();

    composer.passes = [];
    for (const pass of [this.texturePass, this.contactPass, bloom, this.opticsPass, output, this.finishPass]) {
      if (pass) composer.addPass(pass);
    }
  }

  _hookFrame() {
    const game = this.game;
    const previousRender = game._render.bind(game);
    game._render = () => {
      this._catchNewMaterials();
      this._syncScene();
      this.renderReflection();
      this.renderBeauty();
      this._syncPost();
      previousRender();
      this._storeCamera();
    };
    const previousResize = game._resize.bind(game);
    game._resize = () => {
      previousResize();
      this.resize();
    };
  }

  _catchNewMaterials() {
    this._materialScan = (this._materialScan + 1) | 0;
    if (this._materialScan % 24 !== 0) return;
    this.scene.traverse(node => this._linearizeMaterials(node.material));
  }

  dress(root) {
    root.traverse(node => {
      if (!node.isMesh || !node.material || node.userData.mintPuddle || node.userData.mintShaft || node.userData.mintMist) return;
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      for (const material of materials) this._dressMaterial(material, node.geometry);
    });
  }

  _dressMaterial(material, geometry) {
    if (!material?.isMeshStandardMaterial) return;
    this._linearizeMaterials(material);
    if (material.aoMap) ensureUv2(geometry);
    if (material.userData.mintDressed === 'full') return;

    if (!material.userData.mintDressed) {
      const color = material.color;
      const green = color && color.g > color.r * 1.02 && color.g >= color.b * 0.82;
      if (green && !material.map && color.r < 0.42) color.lerp(new THREE.Color(0xc8f3de), 0.06);
      if ((material.metalness ?? 0) > 0.25) material.envMapIntensity = 1.35;
      else if (!material.map) material.envMapIntensity = 0.62;
      material.userData.mintDressed = 'base';
    }

    if (!this.texturesReady || material.map || material.userData.mintPuddle) return;
    const color = material.color;
    const green = color && color.g > color.r * 0.96 && color.g >= color.b * 0.8;
    if (green && (material.roughness ?? 1) >= 0.72) {
      material.normalMap = this.grassNormal;
      material.normalScale ??= new THREE.Vector2();
      material.normalScale.set(0.48, 0.48);
      material.roughnessMap = this.grassRough;
      material.aoMap = this.grassAo;
      material.aoMapIntensity = 0.38;
      material.bumpMap = null;
      ensureUv2(geometry);
    } else if ((material.roughness ?? 1) >= 0.86 && (material.metalness ?? 0) < 0.2) {
      material.normalMap = this.rockNormal;
      material.normalScale ??= new THREE.Vector2();
      material.normalScale.set(0.36, 0.36);
      material.bumpMap = null;
    }
    material.needsUpdate = true;
    material.userData.mintDressed = 'full';
  }

  resize() {
    const renderer = this.game.renderer;
    const view = new THREE.Vector2();
    renderer.getDrawingBufferSize(view);
    const width = Math.max(2, view.x);
    const height = Math.max(2, view.y);
    this.beauty.setSize(width, height);
    const reflectionWidth = Math.max(2, Math.floor(width * (this.high ? 0.5 : 0.25)));
    const reflectionHeight = Math.max(2, Math.floor(height * (this.high ? 0.5 : 0.25)));
    this.reflectionTarget.setSize(reflectionWidth, reflectionHeight);
    const resolution = new THREE.Vector2(width, height);
    const texel = new THREE.Vector2(1 / width, 1 / height);
    if (this.waterUniforms) this.waterUniforms.uResolution.value.copy(resolution);
    this.contactPass.uniforms.uTexel.value.copy(texel);
    this.opticsPass.uniforms.uTexel.value.copy(texel);
  }

  renderBeauty() {
    const renderer = this.game.renderer;
    const previous = renderer.getRenderTarget();
    const previousAutoClear = renderer.autoClear;
    renderer.autoClear = true;
    renderer.setRenderTarget(this.beauty);
    renderer.render(this.scene, this.game.camera);
    renderer.setRenderTarget(previous);
    renderer.autoClear = previousAutoClear;
  }

  renderReflection() {
    if (!this.high || !this.waterUniforms) return;
    const renderer = this.game.renderer;
    const camera = this.game.camera;
    const virtual = this.reflectionCamera;
    const s = this._reflectionScratch;
    this.mirror.updateMatrixWorld(true);

    s.reflectorWorld.setFromMatrixPosition(this.mirror.matrixWorld);
    s.cameraWorld.setFromMatrixPosition(camera.matrixWorld);
    s.rotation.extractRotation(this.mirror.matrixWorld);
    s.normal.set(0, 0, 1).applyMatrix4(s.rotation);
    s.view.subVectors(s.reflectorWorld, s.cameraWorld);
    if (s.view.dot(s.normal) > 0) return;

    s.view.reflect(s.normal).negate().add(s.reflectorWorld);
    s.rotation.extractRotation(camera.matrixWorld);
    s.lookAt.set(0, 0, -1).applyMatrix4(s.rotation).add(s.cameraWorld);
    s.target.subVectors(s.reflectorWorld, s.lookAt);
    s.target.reflect(s.normal).negate().add(s.reflectorWorld);

    virtual.position.copy(s.view);
    virtual.up.set(0, 1, 0).applyMatrix4(s.rotation);
    virtual.up.reflect(s.normal);
    virtual.far = camera.far;
    virtual.lookAt(s.target);
    virtual.updateMatrixWorld();
    virtual.projectionMatrix.copy(camera.projectionMatrix);

    s.plane.setFromNormalAndCoplanarPoint(s.normal, s.reflectorWorld);
    s.plane.applyMatrix4(virtual.matrixWorldInverse);
    s.clip.set(s.plane.normal.x, s.plane.normal.y, s.plane.normal.z, s.plane.constant);
    const projection = virtual.projectionMatrix;
    s.q.set(
      (Math.sign(s.clip.x) + projection.elements[8]) / projection.elements[0],
      (Math.sign(s.clip.y) + projection.elements[9]) / projection.elements[5],
      -1,
      (1 + projection.elements[10]) / projection.elements[14],
    );
    s.clip.multiplyScalar(2 / s.clip.dot(s.q));
    projection.elements[2] = s.clip.x;
    projection.elements[6] = s.clip.y;
    projection.elements[10] = s.clip.z + 1 - 0.003;
    projection.elements[14] = s.clip.w;
    this.textureMatrix.set(
      0.5, 0, 0, 0.5,
      0, 0.5, 0, 0.5,
      0, 0, 0.5, 0.5,
      0, 0, 0, 1,
    );
    this.textureMatrix.multiply(virtual.projectionMatrix);
    this.textureMatrix.multiply(virtual.matrixWorldInverse);

    const hidden = [];
    for (const object of this.hiddenInReflection) {
      if (object?.visible) {
        object.visible = false;
        hidden.push(object);
      }
    }
    const previousTarget = renderer.getRenderTarget();
    const previousShadowUpdate = renderer.shadowMap.autoUpdate;
    const previousXr = renderer.xr.enabled;
    renderer.shadowMap.autoUpdate = false;
    renderer.xr.enabled = false;
    renderer.setRenderTarget(this.reflectionTarget);
    renderer.state.buffers.depth.setMask(true);
    renderer.clear();
    renderer.render(this.scene, virtual);
    renderer.shadowMap.autoUpdate = previousShadowUpdate;
    renderer.xr.enabled = previousXr;
    renderer.setRenderTarget(previousTarget);
    for (const object of hidden) object.visible = true;
  }

  _syncScene() {
    const camera = this.game.camera;
    const time = this.game.world?.time || 0;
    const passTime = this.game.showcasePass?.time;
    if (this.waterUniforms && passTime != null) this.waterUniforms.uTime.value = passTime;
    if (this.waterUniforms) this.waterUniforms.uCameraPos.value.copy(camera.position);
    if (this.mist) this.mist.material.uniforms.uTime.value = time;
    for (const shaft of this.shafts) {
      shaft.material.opacity = shaft.userData.baseOpacity * (0.82 + Math.sin(time * 0.7 + shaft.position.x) * 0.18);
    }
    for (const puddle of this.puddles) {
      puddle.material.uniforms.uTime.value = time;
      puddle.material.uniforms.uCameraPos.value.copy(camera.position);
      puddle.material.uniforms.uNormalMap.value = this.waterNormal;
    }
  }

  _syncPost() {
    const camera = this.game.camera;
    this.focusPoint.copy(this.game.player.position);
    this.focusPoint.y += 1.15;
    const focusTarget = -camera.position.distanceTo(this.focusPoint);
    if (Math.abs(focusTarget - this.focus) > 2.5) this.focus = focusTarget;
    else this.focus += (focusTarget - this.focus) * 0.18;

    const moved = this.hasPreviousCamera ? camera.position.distanceTo(this.lastCameraPosition) : 0;
    const blurScale = !this.hasPreviousCamera || moved > 1.35 ? 0 : 1;
    const time = this.game.world?.time || 0;
    const sunActive = this._projectSun();
    const optics = this.opticsPass.uniforms;
    optics.uInverseProjection.value.copy(camera.projectionMatrixInverse);
    optics.uCameraWorld.value.copy(camera.matrixWorld);
    optics.uPrevViewProjection.value.copy(this.hasPreviousCamera ? this.prevViewProjection : this._currentViewProjection());
    optics.uFocus.value = this.focus;
    optics.uBlurScale.value = blurScale;
    optics.uNear.value = camera.near;
    optics.uFar.value = camera.far;
    optics.uSun.value.set(this.sunNdc.x * 0.5 + 0.5, this.sunNdc.y * 0.5 + 0.5);
    optics.uSunActive.value = sunActive;
    this.contactPass.uniforms.uNear.value = camera.near;
    this.contactPass.uniforms.uFar.value = camera.far;
    const finish = this.finishPass.uniforms;
    finish.uGrainOffset.value.set(time * 0.013, time * 0.021);
    finish.uAberration.value = blurScale * Math.min(moved, 0.8) * 0.0016;
  }

  _projectSun() {
    if (!this.sun) return 0;
    this.sunFar.copy(this.sun.position).normalize().multiplyScalar(400).add(this.game.camera.position);
    this.sunNdc.copy(this.sunFar).project(this.game.camera);
    if (this.sunNdc.z > 1) return 0;
    return 1;
  }

  _currentViewProjection() {
    return this.currentViewProjection.multiplyMatrices(this.game.camera.projectionMatrix, this.game.camera.matrixWorldInverse);
  }

  _storeCamera() {
    this.prevViewProjection.copy(this._currentViewProjection());
    this.lastCameraPosition.copy(this.game.camera.position);
    this.hasPreviousCamera = true;
  }
}

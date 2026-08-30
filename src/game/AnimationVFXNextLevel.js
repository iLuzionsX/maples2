import * as THREE from 'three';
import { FXSystem } from './FX.js';

const V = THREE.Vector3;
const Q = THREE.Quaternion;
const E = THREE.Euler;
const clamp = THREE.MathUtils.clamp;
const damp = THREE.MathUtils.damp;
const smoothstep = THREE.MathUtils.smoothstep;
const TAU = Math.PI * 2;

const ATTACK_PROFILES = [
  { windupEnd: .25, contact: .43, halfWidth: .16, followEnd: .72 },
  { windupEnd: .22, contact: .39, halfWidth: .15, followEnd: .69 },
  { windupEnd: .37, contact: .58, halfWidth: .18, followEnd: .82 },
];

const SLASH_CORE = new THREE.TorusGeometry(1.05, .052, 7, 44, Math.PI * .98);
const SLASH_GLOW = new THREE.TorusGeometry(1.06, .15, 7, 44, Math.PI * .98);
const SLASH_EDGE = new THREE.TorusGeometry(1.035, .024, 6, 44, Math.PI * .98);
const RING_CORE = new THREE.RingGeometry(.9, 1, 48);
const RING_GLOW = new THREE.RingGeometry(.78, 1.1, 48);
const DASH_GEO = new THREE.CapsuleGeometry(.27, .74, 4, 8);
const SLASH_COLORS = [0xb9ffe3, 0x8ff5d1, 0xffc861];
const SLASH_ACCENTS = [0xf2fff8, 0xdffff4, 0xfff0b0];

function makeSoftParticleTexture(size = 32) {
  const data = new Uint8Array(size * size * 4);
  const center = (size - 1) * .5;
  const radius = size * .5;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - center) / radius;
      const dy = (y - center) / radius;
      const d = Math.sqrt(dx * dx + dy * dy);
      const edge = Math.max(0, 1 - d);
      const alpha = Math.round(255 * edge * edge * (3 - 2 * edge));
      const i = (y * size + x) * 4;
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = alpha;
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.needsUpdate = true;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

const SOFT_PARTICLE = makeSoftParticleTexture();

export function effectBudgetForQuality(quality) {
  return quality === 'low' ? .62 : 1;
}

export function attackMotionProfile(progress, combo = 0) {
  const p = clamp(Number.isFinite(progress) ? progress : 0, 0, 1);
  const index = clamp(Math.round(combo) || 0, 0, 2);
  const profile = ATTACK_PROFILES[index];
  const anticipation = 1 - smoothstep(p, .035, profile.windupEnd);
  const strikeStart = profile.contact - profile.halfWidth;
  const strikeEnd = profile.contact + profile.halfWidth;
  const strikePhase = clamp((p - strikeStart) / Math.max(.001, strikeEnd - strikeStart), 0, 1);
  const strike = Math.sin(Math.PI * strikePhase);
  const followThrough = smoothstep(p, profile.contact + .035, profile.followEnd);
  const recovery = smoothstep(p, profile.followEnd, .985);
  return {
    anticipation,
    strike: Math.pow(Math.max(0, strike), index === 2 ? 1.22 : 1.08),
    followThrough,
    recovery,
    contact: profile.contact,
  };
}

function qualityScale(fx) {
  return effectBudgetForQuality(fx?._nextLevelQuality || 'high');
}

function scaledCount(fx, count, minimum = 2) {
  return Math.max(minimum, Math.round(Math.min(48, Math.max(1, count)) * qualityScale(fx)));
}

function addManagedEffect(fx, obj, life, updater, onExpire = null) {
  fx.scene.add(obj);
  fx.effects.push({ obj, life, maxLife: life, updater, onExpire });
  return obj;
}

function makeMaterial(color, opacity = 1, blending = THREE.AdditiveBlending) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending,
  });
}

function makePointsMaterial(color, size, opacity = 1, blending = THREE.AdditiveBlending) {
  return new THREE.PointsMaterial({
    color,
    size,
    map: SOFT_PARTICLE,
    transparent: true,
    opacity,
    depthWrite: false,
    blending,
    alphaTest: .012,
    sizeAttenuation: true,
  });
}

function randomUnit(out) {
  let x = Math.random() * 2 - 1;
  let y = Math.random() * 2 - 1;
  let z = Math.random() * 2 - 1;
  let length = Math.hypot(x, y, z);
  if (length < .001) { x = 1; y = .2; z = 0; length = Math.hypot(x, y); }
  out.set(x / length, y / length, z / length);
  return out;
}

function spawnPointCloud(fx, position, {
  color = 0xffffff,
  count = 12,
  force = 3,
  size = .14,
  life = .45,
  gravity = 2.5,
  drag = 1.25,
  upward = .65,
  spread = 1,
  opacity = .9,
  direction = null,
  blending = THREE.AdditiveBlending,
  originRadius = .12,
} = {}) {
  const total = scaledCount(fx, count);
  const positions = new Float32Array(total * 3);
  const velocities = new Float32Array(total * 3);
  const dir = new V();
  const rand = new V();
  if (direction) {
    dir.copy(direction);
    if (dir.lengthSq() < .0001) dir.set(0, .2, 1);
    dir.normalize();
  }

  for (let i = 0; i < total; i++) {
    randomUnit(rand);
    const i3 = i * 3;
    const r = Math.random() * originRadius;
    positions[i3] = rand.x * r;
    positions[i3 + 1] = Math.abs(rand.y) * r;
    positions[i3 + 2] = rand.z * r;

    if (direction) {
      randomUnit(rand);
      const forward = force * (.45 + Math.random() * .75);
      velocities[i3] = dir.x * forward + rand.x * force * spread * .5;
      velocities[i3 + 1] = Math.max(.1, dir.y * forward + Math.abs(rand.y) * force * upward);
      velocities[i3 + 2] = dir.z * forward + rand.z * force * spread * .5;
    } else {
      randomUnit(rand);
      const speed = force * (.35 + Math.random() * .75);
      velocities[i3] = rand.x * speed * spread;
      velocities[i3 + 1] = Math.abs(rand.y) * speed * upward + .18;
      velocities[i3 + 2] = rand.z * speed * spread;
    }
  }

  const geometry = new THREE.BufferGeometry();
  const attribute = new THREE.BufferAttribute(positions, 3);
  attribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', attribute);
  geometry.boundingSphere = new THREE.Sphere(new V(), Math.max(2.5, force * life * 1.8));
  const material = makePointsMaterial(color, size, opacity, blending);
  const points = new THREE.Points(geometry, material);
  points.position.copy(position);
  points.frustumCulled = true;
  points.renderOrder = 9;
  points.userData.disposeGeometry = true;
  points.userData.disposeMaterial = true;

  const decay = Math.exp(-drag / 60);
  addManagedEffect(fx, points, life, (effect, dt, t) => {
    const frameDecay = Math.pow(decay, dt * 60);
    for (let i = 0; i < total; i++) {
      const i3 = i * 3;
      velocities[i3] *= frameDecay;
      velocities[i3 + 1] = velocities[i3 + 1] * frameDecay - gravity * dt;
      velocities[i3 + 2] *= frameDecay;
      positions[i3] += velocities[i3] * dt;
      positions[i3 + 1] += velocities[i3 + 1] * dt;
      positions[i3 + 2] += velocities[i3 + 2] * dt;
    }
    attribute.needsUpdate = true;
    effect.obj.material.opacity = Math.pow(Math.max(0, 1 - t), 1.35) * opacity;
  });
  return points;
}

function ensurePool(fx, key, factory, max) {
  if (!fx._nextLevelPools) fx._nextLevelPools = new Map();
  if (!fx._nextLevelPools.has(key)) fx._nextLevelPools.set(key, { free: [], total: 0, max, factory });
  return fx._nextLevelPools.get(key);
}

function acquirePooled(fx, key, factory, max) {
  const pool = ensurePool(fx, key, factory, max);
  const object = pool.free.pop();
  if (object) return { object, pool };
  if (pool.total >= pool.max) return null;
  pool.total++;
  return { object: pool.factory(), pool };
}

function returnPooled(pool, object) {
  object.visible = false;
  pool.free.push(object);
}

function patchFXSystem() {
  if (FXSystem.prototype._nextLevelPatched) return;
  FXSystem.prototype._nextLevelPatched = true;

  FXSystem.prototype.update = function (dt) {
    this.clock += dt;
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const effect = this.effects[i];
      effect.life -= dt;
      const t = 1 - Math.max(0, effect.life) / Math.max(.0001, effect.maxLife);
      effect.updater?.(effect, dt, t);
      if (effect.life > 0) continue;
      this.scene.remove(effect.obj);
      effect.onExpire?.(effect);
      effect.obj.traverse?.(object => {
        if (object.geometry?.dispose && object.userData.disposeGeometry) object.geometry.dispose();
        if (object.material?.dispose && object.userData.disposeMaterial) object.material.dispose();
      });
      this.effects.splice(i, 1);
    }
  };

  FXSystem.prototype.burst = function (position, color = 0xffbe78, count = 14, force = 4, size = 1) {
    return spawnPointCloud(this, position, {
      color,
      count,
      force,
      size: .115 * size,
      life: .42 + Math.min(.16, force * .018),
      gravity: 5.5,
      drag: 1.05,
      upward: .72,
      spread: 1,
      opacity: .95,
      originRadius: .18 * size,
    });
  };

  FXSystem.prototype.impactBurst = function (position, direction, combo = 0, emphasize = false) {
    const finisher = combo === 2;
    const color = finisher ? 0xffc861 : combo === 1 ? 0x8ff5d1 : 0xb9ffe3;
    const result = spawnPointCloud(this, position, {
      color,
      count: finisher ? 20 : 12,
      force: finisher ? 5.4 : 4.1,
      size: finisher ? .165 : .135,
      life: finisher ? .48 : .36,
      gravity: 4.4,
      drag: 1.45,
      upward: .48,
      spread: .82,
      opacity: .98,
      direction,
      originRadius: finisher ? .2 : .12,
    });
    if (finisher && emphasize) this.ring(position, 0xffd578, .16, 1.45, .22);
    return result;
  };

  FXSystem.prototype.groundBurst = function (position, intensity = 1) {
    return spawnPointCloud(this, position, {
      color: 0x9c987e,
      count: 5 + Math.round(intensity * 4),
      force: 1.15 + intensity * .55,
      size: .13 + intensity * .025,
      life: .38 + intensity * .08,
      gravity: .7,
      drag: 2.7,
      upward: .38,
      spread: 1.25,
      opacity: .28,
      blending: THREE.NormalBlending,
      originRadius: .24 + intensity * .08,
    });
  };

  FXSystem.prototype.slash = function (position, rotationY, combo = 0) {
    const index = clamp(combo | 0, 0, 2);
    const group = new THREE.Group();
    const glow = new THREE.Mesh(SLASH_GLOW, makeMaterial(SLASH_COLORS[index], .2));
    const core = new THREE.Mesh(SLASH_CORE, makeMaterial(SLASH_COLORS[index], .98));
    const edge = new THREE.Mesh(SLASH_EDGE, makeMaterial(SLASH_ACCENTS[index], .94));
    for (const mesh of [glow, core, edge]) mesh.userData.disposeMaterial = true;
    group.add(glow, core, edge);
    group.position.copy(position).add(new V(0, 1.13, 0));
    const baseZ = index === 2 ? -.74 : index === 1 ? .31 : .2;
    group.rotation.set(Math.PI / 2.42, rotationY - Math.PI * .48, baseZ);
    const baseScale = index === 2 ? 1.42 : 1.08;
    group.scale.setScalar(baseScale);
    group.renderOrder = 8;
    const life = index === 2 ? .245 : .19;
    return addManagedEffect(this, group, life, (effect, dt, t) => {
      const expansion = 1 + (index === 2 ? .42 : .3) * (1 - Math.pow(1 - t, 2.4));
      effect.obj.scale.setScalar(baseScale * expansion);
      const fade = Math.pow(Math.max(0, 1 - t), 1.32);
      glow.material.opacity = fade * (index === 2 ? .25 : .19);
      core.material.opacity = fade * .98;
      edge.material.opacity = fade * .93;
      effect.obj.rotation.z = baseZ + (index === 2 ? .22 : .11) * t;
    });
  };

  FXSystem.prototype.ring = function (position, color = 0x7cf2d1, start = .3, end = 3.2, life = .35) {
    const group = new THREE.Group();
    const glow = new THREE.Mesh(RING_GLOW, makeMaterial(color, .16));
    const core = new THREE.Mesh(RING_CORE, makeMaterial(color, .72));
    glow.userData.disposeMaterial = true;
    core.userData.disposeMaterial = true;
    group.add(glow, core);
    group.rotation.x = -Math.PI / 2;
    group.position.copy(position).add(new V(0, .045, 0));
    group.scale.setScalar(start);
    return addManagedEffect(this, group, life, (effect, dt, t) => {
      const eased = 1 - Math.pow(1 - t, 2.25);
      const scale = THREE.MathUtils.lerp(start, end, eased);
      effect.obj.scale.setScalar(scale);
      const fade = Math.pow(Math.max(0, 1 - t), 1.45);
      glow.material.opacity = fade * .16;
      core.material.opacity = fade * .72;
    });
  };

  FXSystem.prototype.projectileTrail = function (position, color = 0xff8e57) {
    const acquired = acquirePooled(this, 'projectile-sprites', () => {
      const material = new THREE.SpriteMaterial({
        color: 0xffffff,
        map: SOFT_PARTICLE,
        transparent: true,
        opacity: .72,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(material);
      sprite.renderOrder = 8;
      return sprite;
    }, this._nextLevelQuality === 'low' ? 10 : 18);
    if (!acquired) return null;
    const { object: sprite, pool } = acquired;
    sprite.visible = true;
    sprite.material.color.setHex(color);
    sprite.material.opacity = .66;
    sprite.position.copy(position);
    const base = .18 + Math.random() * .11;
    sprite.scale.setScalar(base);
    return addManagedEffect(this, sprite, .2, (effect, dt, t) => {
      const scale = base * (1 + t * .9);
      effect.obj.scale.setScalar(scale);
      effect.obj.material.opacity = Math.pow(Math.max(0, 1 - t), 1.7) * .62;
    }, () => returnPooled(pool, sprite));
  };

  FXSystem.prototype.dashTrail = function (position, color = 0x89d7e7) {
    const acquired = acquirePooled(this, 'dash-ghosts', () => {
      const material = makeMaterial(0xffffff, .22);
      const mesh = new THREE.Mesh(DASH_GEO, material);
      mesh.renderOrder = 7;
      return mesh;
    }, this._nextLevelQuality === 'low' ? 6 : 10);
    if (!acquired) return null;
    const { object: mesh, pool } = acquired;
    if (!this._nextLevelDashPosition) this._nextLevelDashPosition = position.clone();
    const dx = position.x - this._nextLevelDashPosition.x;
    const dz = position.z - this._nextLevelDashPosition.z;
    const angle = Math.abs(dx) + Math.abs(dz) > .002 ? Math.atan2(dx, dz) : 0;
    this._nextLevelDashPosition.copy(position);
    mesh.visible = true;
    mesh.material.color.setHex(color);
    mesh.material.opacity = .22;
    mesh.position.copy(position).add(new V(0, .78, 0));
    mesh.rotation.set(Math.PI / 2, angle, 0);
    mesh.scale.set(.88, 1.25, .88);
    return addManagedEffect(this, mesh, .19, (effect, dt, t) => {
      effect.obj.material.opacity = Math.pow(Math.max(0, 1 - t), 1.65) * .2;
      effect.obj.scale.set(.88 + t * .15, 1.25 + t * .35, .88 + t * .15);
    }, () => returnPooled(pool, mesh));
  };

  FXSystem.prototype.heal = function (position) {
    const count = scaledCount(this, 14, 7);
    const positions = new Float32Array(count * 3);
    const radii = new Float32Array(count);
    const phases = new Float32Array(count);
    const rises = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      radii[i] = .22 + Math.random() * .58;
      phases[i] = Math.random() * TAU;
      rises[i] = .65 + Math.random() * 1.05;
    }
    const geometry = new THREE.BufferGeometry();
    const attribute = new THREE.BufferAttribute(positions, 3);
    attribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', attribute);
    geometry.boundingSphere = new THREE.Sphere(new V(0, .7, 0), 2.5);
    const material = makePointsMaterial(0x8dffbd, .15, .8);
    const points = new THREE.Points(geometry, material);
    points.position.copy(position);
    points.userData.disposeGeometry = true;
    points.userData.disposeMaterial = true;
    return addManagedEffect(this, points, 1.05, (effect, dt, t) => {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const angle = phases[i] + t * TAU * (1.1 + (i % 3) * .08);
        const radius = radii[i] * (1 - t * .42);
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = .12 + rises[i] * t * 1.55;
        positions[i3 + 2] = Math.sin(angle) * radius;
      }
      attribute.needsUpdate = true;
      effect.obj.material.opacity = Math.sin(Math.PI * t) * .78;
    });
  };

  FXSystem.prototype.levelUp = function (position) {
    this.ring(position, 0xffdd80, .34, 4.1, .72);
    this.ring(position, 0x92ffd0, .18, 2.75, .88);
    const up = new V(0, 1, 0);
    spawnPointCloud(this, position.clone().add(new V(0, .18, 0)), {
      color: 0xffd979,
      count: 24,
      force: 4.5,
      size: .15,
      life: 1.05,
      gravity: -.45,
      drag: 1.85,
      upward: .58,
      spread: .62,
      opacity: .9,
      direction: up,
      originRadius: .7,
    });
    spawnPointCloud(this, position.clone().add(new V(0, .12, 0)), {
      color: 0xa1f1d0,
      count: 18,
      force: 3.35,
      size: .125,
      life: 1.2,
      gravity: -.3,
      drag: 2.1,
      upward: .52,
      spread: .85,
      opacity: .75,
      direction: up,
      originRadius: .92,
    });
  };
}

function findNode(root, names) {
  if (!root) return null;
  const wanted = names.map(name => name.toLowerCase());
  let exact = null;
  let fuzzy = null;
  root.traverse(node => {
    if (exact) return;
    const name = String(node.name || '').toLowerCase();
    if (!name) return;
    if (wanted.includes(name)) exact = node;
    else if (!fuzzy && wanted.some(candidate => name.includes(candidate))) fuzzy = node;
  });
  return exact || fuzzy;
}

function buildMotionRig(model) {
  return {
    model,
    hips: findNode(model, ['hips']),
    spine: findNode(model, ['spine']),
    chest: findNode(model, ['chest']),
    head: findNode(model, ['head']),
    upperArmL: findNode(model, ['upperarm.l', 'upper_arm_l', 'arm.l']),
    upperArmR: findNode(model, ['upperarm.r', 'upper_arm_r', 'arm.r']),
    lowerArmL: findNode(model, ['lowerarm.l', 'lower_arm_l', 'forearm.l']),
    lowerArmR: findNode(model, ['lowerarm.r', 'lower_arm_r', 'forearm.r']),
    cape: findNode(model, ['knight_cape', 'cape']),
    hair: findNode(model, ['hair', 'ponytail', 'braid']),
  };
}

function rotateLocal(node, x, y, z, state) {
  if (!node || (!x && !y && !z)) return;
  state.euler.set(x, y, z, 'XYZ');
  state.quaternion.setFromEuler(state.euler);
  node.quaternion.multiply(state.quaternion);
}

function ensureMotionRig(game, state) {
  const model = game.player.assetVisual;
  if (!model) return null;
  if (state.rig?.model !== model) state.rig = buildMotionRig(model);
  return state.rig;
}

function updateMotionLayer(game, director, state, dt) {
  const player = game.player;
  const rig = ensureMotionRig(game, state);
  if (!rig) return;

  state.startImpulse = damp(state.startImpulse, 0, 10.5, dt);
  state.stopImpulse = damp(state.stopImpulse, 0, 9.5, dt);
  state.turnImpulse = damp(state.turnImpulse, 0, 11.5, dt);
  state.stepImpulse = damp(state.stepImpulse, 0, 15, dt);
  state.impactImpulse = damp(state.impactImpulse, 0, 20, dt);
  state.landingImpulse = damp(state.landingImpulse, 0, 12, dt);
  state.capeKick = damp(state.capeKick, 0, 8.5, dt);

  const speed01 = clamp((player.speed || 0) / 5.25, 0, 1);
  const acceleration = director?.acceleration || 0;
  const turnRate = director?.turnRate || 0;
  const gaitPhase = director?.state?.gaitPhase || 0;
  const stride = Math.sin(gaitPhase * TAU * 2) * speed01;
  const accelerationLean = clamp(acceleration * .0045, -.04, .04);
  const steering = clamp(turnRate * .0085 * speed01, -.055, .055);

  if (!['attack', 'dodge', 'hurt', 'cast', 'dead'].includes(player.state)) {
    rotateLocal(rig.hips,
      -state.startImpulse * .028 + state.stopImpulse * .035 - accelerationLean * .35 + state.landingImpulse * .026,
      state.turnImpulse * .018,
      stride * .007 - steering * .32,
      state);
    rotateLocal(rig.spine,
      -state.startImpulse * .038 + state.stopImpulse * .044 - accelerationLean * .5 + state.landingImpulse * .034,
      state.turnImpulse * .028,
      -stride * .009 - steering * .48,
      state);
    rotateLocal(rig.chest,
      -state.startImpulse * .026 + state.stopImpulse * .034 - accelerationLean * .42,
      state.turnImpulse * .036,
      stride * .012 - steering * .58,
      state);
    rotateLocal(rig.head, state.startImpulse * .018 - state.stopImpulse * .02, -state.turnImpulse * .018, steering * .22, state);
  }

  if (player.state === 'attack') {
    const combo = clamp(player.comboIndex | 0, 0, 2);
    const p = player.stateTime / Math.max(.01, player.stateDuration);
    const motion = attackMotionProfile(p, combo);
    const side = combo === 0 ? -1 : combo === 1 ? 1 : -.42;
    const finisher = combo === 2 ? 1 : 0;
    const brace = motion.anticipation * (finisher ? .075 : .045);
    const drive = motion.strike * (finisher ? 1.22 : 1);
    const settle = motion.followThrough * (1 - motion.recovery);

    rotateLocal(rig.hips, brace * .45 - drive * (.025 + finisher * .025), side * (-brace * .7 + drive * .07), side * drive * .018, state);
    rotateLocal(rig.spine, brace - drive * (.05 + finisher * .025) + settle * .022, side * (-brace + drive * .11), side * (-brace * .28 + drive * .035), state);
    rotateLocal(rig.chest, brace * .8 - drive * (.065 + finisher * .035) + settle * .03, side * (-brace * 1.2 + drive * .15), side * (-brace * .4 + drive * .052), state);
    rotateLocal(rig.head, -brace * .24 + drive * .025, side * (brace * .42 - drive * .05), -side * drive * .026, state);

    const armDrive = drive * (finisher ? .13 : .09);
    const armBrace = brace * (finisher ? .7 : .5);
    rotateLocal(rig.upperArmR, -armDrive - armBrace, side * armDrive * .35, side * armDrive * .26, state);
    rotateLocal(rig.lowerArmR, armDrive * .48, 0, -side * armDrive * .18, state);
    if (finisher) {
      rotateLocal(rig.upperArmL, -armDrive * .46, 0, -side * armDrive * .24, state);
      rotateLocal(rig.lowerArmL, armDrive * .2, 0, 0, state);
    }

    if (state.impactImpulse > .001) {
      rotateLocal(rig.chest, state.impactImpulse * .035, -side * state.impactImpulse * .04, side * state.impactImpulse * .022, state);
      rotateLocal(rig.upperArmR, state.impactImpulse * .025, 0, -side * state.impactImpulse * .025, state);
    }
  } else if (player.state === 'dodge') {
    const p = clamp(player.stateTime / Math.max(.01, player.stateDuration), 0, 1);
    const tuck = Math.sin(Math.PI * p);
    rotateLocal(rig.hips, -.055 * tuck, 0, state.turnImpulse * .018, state);
    rotateLocal(rig.spine, -.082 * tuck, 0, -state.turnImpulse * .025, state);
    rotateLocal(rig.chest, -.07 * tuck, 0, state.turnImpulse * .032, state);
    rotateLocal(rig.head, .035 * tuck, 0, -state.turnImpulse * .015, state);
  } else if (player.state === 'cast') {
    const p = clamp(player.stateTime / Math.max(.01, player.stateDuration), 0, 1);
    const pulse = Math.sin(Math.PI * p);
    rotateLocal(rig.spine, -.028 * pulse, -.055 * pulse, .018 * pulse, state);
    rotateLocal(rig.chest, -.045 * pulse, -.072 * pulse, .024 * pulse, state);
    rotateLocal(rig.upperArmL, -.08 * pulse, 0, -.065 * pulse, state);
    rotateLocal(rig.upperArmR, -.04 * pulse, 0, .035 * pulse, state);
  } else if (player.state === 'hurt' && director?.hitResponse) {
    const p = clamp(player.stateTime / Math.max(.01, player.stateDuration || .28), 0, 1);
    const pulse = Math.sin(Math.PI * p);
    const { front = 1, side = 0 } = director.hitResponse;
    rotateLocal(rig.spine, front * .055 * pulse, side * .035 * pulse, -side * .065 * pulse, state);
    rotateLocal(rig.chest, front * .07 * pulse, side * .045 * pulse, -side * .085 * pulse, state);
    rotateLocal(rig.head, -front * .035 * pulse, -side * .028 * pulse, side * .05 * pulse, state);
  }

  const secondary = speed01 * .012 + state.capeKick * .055 + Math.abs(state.turnImpulse) * .016;
  if (rig.cape) rotateLocal(rig.cape, secondary, 0, -steering * .32 + state.turnImpulse * .018, state);
  if (rig.hair && rig.hair !== rig.cape) rotateLocal(rig.hair, -secondary * .28, 0, -steering * .18 + state.turnImpulse * .01, state);
}

export function installAnimationVFXNextLevel(game, director = game.rowanAnimationDirector) {
  patchFXSystem();
  game.fx._nextLevelQuality = game.quality;

  const state = {
    rig: null,
    quaternion: new Q(),
    euler: new E(),
    direction: new V(),
    impactPosition: new V(),
    startImpulse: 0,
    stopImpulse: 0,
    turnImpulse: 0,
    stepImpulse: 0,
    impactImpulse: 0,
    landingImpulse: 0,
    capeKick: 0,
    eventsHandled: 0,
    impactBursts: 0,
  };

  const events = director?.events || game.rowanAnimationEvents;
  const listen = (type, handler) => events?.on?.(type, event => {
    state.eventsHandled++;
    handler(event);
  });

  listen('locomotion:start', () => { state.startImpulse = 1; });
  listen('locomotion:stop', () => { state.stopImpulse = 1; });
  listen('locomotion:direction-change', event => { state.turnImpulse = clamp(event.direction || 0, -1, 1); });
  listen('footstep', event => { state.stepImpulse = Math.max(state.stepImpulse, .45 + (event.speed01 || 0) * .4); });
  listen('attack:anticipation', event => { state.capeKick = Math.max(state.capeKick, event.combo === 2 ? .48 : .24); });
  listen('attack:follow-through', event => { state.capeKick = Math.max(state.capeKick, event.combo === 2 ? 1 : .52); });
  listen('dodge:start', () => { state.capeKick = Math.max(state.capeKick, .72); });
  listen('dodge:recover', event => {
    state.landingImpulse = 1;
    game.fx.groundBurst?.(event.position || game.player.position, game.quality === 'low' ? .62 : .85);
  });
  listen('hit-reaction', event => {
    state.impactPosition.copy(game.player.position).y += .9;
    game.fx.burst(state.impactPosition, event.lethal ? 0xff6d60 : 0xff9b7f, event.lethal ? 13 : 8, event.lethal ? 3.6 : 2.5, .78);
  });
  listen('sword:impact', event => {
    state.impactImpulse = Math.max(state.impactImpulse, event.combo === 2 ? 1 : .62);
    state.capeKick = Math.max(state.capeKick, event.combo === 2 ? .9 : .45);
    const playerPosition = game.player.position;
    const targets = event.targets || [];
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      if (!target?.position) continue;
      state.direction.copy(target.position).sub(playerPosition);
      state.direction.y = .08;
      if (state.direction.lengthSq() < .001) state.direction.set(Math.sin(game.player.facing), .08, Math.cos(game.player.facing));
      state.direction.normalize();
      state.impactPosition.copy(target.position).y += target.isBoss ? 1.35 : .78;
      game.fx.impactBurst?.(state.impactPosition, state.direction, event.combo || 0, i === 0);
      state.impactBursts++;
    }
  });

  const baseUpdate = game.player.update.bind(game.player);
  game.player.update = (...args) => {
    const result = baseUpdate(...args);
    updateMotionLayer(game, director, state, args[0] || 0);
    return result;
  };

  const manager = {
    ready: true,
    quality: game.quality,
    state,
    get eventsHandled() { return state.eventsHandled; },
    get impactBursts() { return state.impactBursts; },
  };
  game.animationVFXNextLevel = manager;
  return manager;
}

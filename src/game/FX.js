import * as THREE from 'three';

const V = THREE.Vector3;

function makeSoftTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 62);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(.16, 'rgba(255,255,255,.92)');
  g.addColorStop(.42, 'rgba(255,255,255,.32)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export class FXSystem {
  constructor(scene) {
    this.scene = scene;
    this.effects = [];
    this.clock = 0;
    this._softTexture = makeSoftTexture();
    this._geo = {
      orb: new THREE.SphereGeometry(.09, 8, 6),
      spark: new THREE.TetrahedronGeometry(.07, 0),
      slash: new THREE.TorusGeometry(1.05, .045, 6, 36, Math.PI * .92),
      slashGlow: new THREE.TorusGeometry(1.05, .095, 6, 36, Math.PI * .92),
      ring: new THREE.RingGeometry(.6, .68, 36),
      shard: new THREE.ConeGeometry(.055, .35, 5),
    };
  }

  _sprite(color, opacity = .75, size = .18, additive = true) {
    const material = new THREE.SpriteMaterial({
      map: this._softTexture,
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      depthTest: true,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      toneMapped: !additive,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(size, size, 1);
    sprite.userData.disposeMaterial = true;
    return sprite;
  }

  add(obj, life, updater) {
    this.scene.add(obj);
    this.effects.push({ obj, life, maxLife: life, updater });
    return obj;
  }

  burst(position, color = 0xffbe78, count = 14, force = 4, size = 1) {
    const total = Math.max(4, Math.min(36, count));
    for (let i = 0; i < total; i++) {
      const debris = i % 5 === 0;
      let particle;
      if (debris) {
        const material = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: .72,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          toneMapped: false,
        });
        particle = new THREE.Mesh(this._geo.shard, material);
        particle.scale.setScalar(size * (.42 + Math.random() * .42));
        particle.userData.disposeMaterial = true;
      } else {
        particle = this._sprite(color, .82, size * (.13 + Math.random() * .15), true);
        particle.material.rotation = Math.random() * Math.PI;
      }
      particle.position.copy(position).add(new V((Math.random() - .5) * .24, Math.random() * .28, (Math.random() - .5) * .24));
      const radial = new V((Math.random() - .5), .2 + Math.random() * .8, (Math.random() - .5)).normalize();
      const vel = radial.multiplyScalar(force * (.45 + Math.random() * .75));
      const spin = new V(Math.random() * 9, Math.random() * 9, Math.random() * 9);
      this.add(particle, .28 + Math.random() * .38, (effect, dt, t) => {
        vel.y -= (debris ? 10.5 : 5.6) * dt;
        effect.obj.position.addScaledVector(vel, dt);
        if (debris) {
          effect.obj.rotation.x += spin.x * dt;
          effect.obj.rotation.y += spin.y * dt;
          effect.obj.rotation.z += spin.z * dt;
          effect.obj.material.opacity = Math.pow(1 - t, 1.65) * .72;
        } else {
          const fade = Math.pow(1 - t, 1.8);
          effect.obj.material.opacity = fade * .82;
          const stretch = 1 + Math.min(2.2, vel.length() * .13) * (1 - t);
          effect.obj.scale.set(size * .12 * stretch, size * .12 * Math.max(.35, fade), 1);
        }
      });
    }
  }

  slash(position, rotationY, combo = 0) {
    const colors = [0xd8ffe2, 0xa8efcf, 0xffd07b];
    const color = colors[combo % 3];
    const group = new THREE.Group();
    group.position.copy(position).add(new V(0, 1.15, 0));
    group.rotation.set(Math.PI / 2.5, rotationY - (Math.PI * .46), combo === 2 ? -.65 : .25);
    group.scale.setScalar(combo === 2 ? 1.25 : 1);

    const glow = new THREE.Mesh(
      this._geo.slashGlow,
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .12, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false })
    );
    glow.userData.disposeMaterial = true;
    group.add(glow);

    const core = new THREE.Mesh(
      this._geo.slash,
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .74, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false })
    );
    core.userData.disposeMaterial = true;
    group.add(core);
    group.userData.disposeMaterial = true;

    this.add(group, .17, (effect, dt, t) => {
      const s = 1 + t * .26;
      effect.obj.scale.multiplyScalar(1 + dt * 1.7);
      core.material.opacity = Math.pow(1 - t, 1.4) * .74;
      glow.material.opacity = Math.pow(1 - t, 2.1) * .12;
      glow.scale.setScalar(s);
    });
  }

  ring(position, color = 0x7cf2d1, start = .3, end = 3.2, life = .35) {
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: .58,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
    const mesh = new THREE.Mesh(this._geo.ring, mat);
    mesh.userData.disposeMaterial = true;
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.copy(position).add(new V(0, .04, 0));
    mesh.scale.setScalar(start);
    this.add(mesh, life, (effect, dt, t) => {
      const s = THREE.MathUtils.lerp(start, end, 1 - Math.pow(1 - t, 2));
      effect.obj.scale.setScalar(s);
      effect.obj.material.opacity = Math.pow(1 - t, 1.35) * .58;
    });
  }

  dashTrail(position, color = 0x89d7e7) {
    const mist = this._sprite(color, .19, .5, true);
    mist.position.copy(position).add(new V((Math.random() - .5) * .18, .72, (Math.random() - .5) * .18));
    mist.scale.set(.55, .92, 1);
    this.add(mist, .24, (effect, dt, t) => {
      effect.obj.position.y += dt * .18;
      effect.obj.material.opacity = Math.pow(1 - t, 1.8) * .18;
      effect.obj.scale.x *= 1 + dt * 2.2;
      effect.obj.scale.y *= 1 + dt * .8;
    });
  }

  projectileTrail(position, color = 0xff8e57) {
    const sprite = this._sprite(color, .46, .19 + Math.random() * .13, true);
    sprite.position.copy(position).add(new V((Math.random() - .5) * .08, (Math.random() - .5) * .08, (Math.random() - .5) * .08));
    this.add(sprite, .18 + Math.random() * .08, (effect, dt, t) => {
      effect.obj.material.opacity = Math.pow(1 - t, 1.9) * .46;
      const s = Math.max(.018, (1 - t) * .26);
      effect.obj.scale.set(s, s, 1);
    });
  }

  heal(position) {
    for (let i = 0; i < 11; i++) {
      const sprite = this._sprite(i % 4 === 0 ? 0xc4ffe0 : 0x8dffbd, .5, .11 + Math.random() * .1, true);
      sprite.position.copy(position).add(new V((Math.random() - .5) * .82, .18 + Math.random() * .62, (Math.random() - .5) * .82));
      const phase = Math.random() * Math.PI * 2;
      const rise = .65 + Math.random() * .7;
      this.add(sprite, .78 + Math.random() * .48, (effect, dt, t) => {
        effect.obj.position.y += dt * rise;
        effect.obj.position.x += Math.sin(this.clock * 4.2 + phase) * dt * .18;
        effect.obj.position.z += Math.cos(this.clock * 3.6 + phase) * dt * .14;
        effect.obj.material.opacity = Math.sin(Math.PI * t) * .5;
      });
    }
  }

  levelUp(position) {
    this.ring(position, 0xffdd80, .4, 4.2, .7);
    this.ring(position, 0x92ffd0, .2, 2.7, .9);
    for (let i = 0; i < 24; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = .35 + Math.random() * 1.2;
      const color = i % 2 ? 0xffd979 : 0xa1f1d0;
      const sprite = this._sprite(color, .65, .1 + Math.random() * .11, true);
      sprite.position.copy(position).add(new V(Math.cos(a) * r, .18 + Math.random() * .45, Math.sin(a) * r));
      const rise = 1.3 + Math.random() * 2.7;
      this.add(sprite, .92 + Math.random() * .52, (effect, dt, t) => {
        effect.obj.position.y += rise * dt;
        effect.obj.position.x += Math.sin(a + t * 5) * dt * .12;
        effect.obj.material.opacity = Math.sin(Math.PI * Math.min(1, t * 1.08)) * (1 - t) * .9;
        const s = .08 + (1 - t) * .12;
        effect.obj.scale.set(s, s, 1);
      });
    }
  }

  update(dt) {
    this.clock += dt;
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const effect = this.effects[i];
      effect.life -= dt;
      const t = 1 - Math.max(0, effect.life) / effect.maxLife;
      effect.updater?.(effect, dt, t);
      if (effect.life <= 0) {
        this.scene.remove(effect.obj);
        effect.obj.traverse?.(object => {
          if (object.userData?.disposeMaterial && object.material?.dispose) object.material.dispose();
        });
        if (effect.obj.userData?.disposeMaterial && effect.obj.material?.dispose) effect.obj.material.dispose();
        this.effects.splice(i, 1);
      }
    }
  }
}

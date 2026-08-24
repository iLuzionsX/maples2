import * as THREE from 'three';
import { Character } from './Character.js';
import { Enemy } from './Enemy.js';

const clamp = THREE.MathUtils.clamp;
const damp = THREE.MathUtils.damp;
const characterScratch = new WeakMap();
const enemyScratch = new WeakMap();

function getCharacterScratch(character) {
  let scratch = characterScratch.get(character);
  if (!scratch) {
    scratch = {
      forward: new THREE.Vector3(),
      right: new THREE.Vector3(),
      desired: new THREE.Vector3(),
    };
    characterScratch.set(character, scratch);
  }
  return scratch;
}

function getEnemyScratch(enemy) {
  let scratch = enemyScratch.get(enemy);
  if (!scratch) {
    scratch = { toPlayer: new THREE.Vector3() };
    enemyScratch.set(enemy, scratch);
  }
  return scratch;
}

function installCharacterHotPath() {
  if (Character.prototype.__solPerformanceUpdateInstalled) return;
  Character.prototype.__solPerformanceUpdateInstalled = true;

  Character.prototype.update = function update(dt, move, cameraYaw) {
    this.invuln = Math.max(0, this.invuln - dt);
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    this.mana = Math.min(this.maxMana, this.mana + dt * 8);
    this.stateTime += dt;

    const scratch = getCharacterScratch(this);
    const forward = scratch.forward.set(Math.sin(cameraYaw), 0, Math.cos(cameraYaw));
    const right = scratch.right.set(Math.cos(cameraYaw), 0, -Math.sin(cameraYaw));
    const desired = scratch.desired.copy(forward).multiplyScalar(move.y).addScaledVector(right, move.x);
    let desiredLengthSq = desired.lengthSq();
    if (desiredLengthSq > 1) {
      desired.normalize();
      desiredLengthSq = 1;
    }
    const hasDesired = desiredLengthSq > .01;

    let movementAllowed = 1;
    if (this.state === 'attack') movementAllowed = this.comboIndex === 2 ? .16 : .34;
    if (this.state === 'hurt' || this.state === 'dead') movementAllowed = 0;

    if (this.state === 'dodge') {
      const t = this.stateTime / this.stateDuration;
      const speed = THREE.MathUtils.lerp(12.5, 4.8, t);
      this.velocity.x = this.dodgeDir.x * speed;
      this.velocity.z = this.dodgeDir.z * speed;
      if (Math.floor(this.stateTime * 35) !== Math.floor((this.stateTime - dt) * 35)) this.fx.dashTrail(this.position);
      this.facing = Math.atan2(this.dodgeDir.x, this.dodgeDir.z);
    } else {
      if (hasDesired) desired.normalize();
      const targetSpeed = hasDesired ? 5.25 * movementAllowed : 0;
      this.velocity.x = damp(this.velocity.x, hasDesired ? desired.x * targetSpeed : 0, hasDesired ? 16 : 11, dt);
      this.velocity.z = damp(this.velocity.z, hasDesired ? desired.z * targetSpeed : 0, hasDesired ? 16 : 11, dt);
      if (hasDesired && movementAllowed > .25) {
        const targetFacing = Math.atan2(desired.x, desired.z);
        const delta = ((targetFacing - this.facing + Math.PI) % (Math.PI * 2)) - Math.PI;
        this.facing += delta * (1 - Math.exp(-dt * 14));
      }
    }

    this.root.position.addScaledVector(this.velocity, dt);
    this.root.rotation.y = this.facing;
    this.speed = Math.hypot(this.velocity.x, this.velocity.z);

    const state = this.state;
    if ((state === 'attack' || state === 'dodge' || state === 'hurt') && this.stateTime >= this.stateDuration) {
      this.state = 'idle';
      this.stateTime = 0;
    }
    this._animate(dt);
  };
}

function installEnemyHotPath() {
  if (Enemy.prototype.__solPerformanceUpdateInstalled) return;
  Enemy.prototype.__solPerformanceUpdateInstalled = true;

  Enemy.prototype.update = function update(dt, player) {
    this.stateTime += dt;
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    this.attackEvent = false;
    if (this.dead) {
      const p = clamp(this.stateTime / this.stateDuration, 0, 1);
      this.root.scale.setScalar((this.isBoss ? 1.08 : this.scaleBase) * (1 - p * .72));
      this.root.rotation.z = p * (this.isBoss ? .65 : 1.15);
      this.root.position.y = -p * (this.isBoss ? .3 : .15);
      this.root.traverse(object => {
        if (object.material && 'opacity' in object.material && object.material.transparent) object.material.opacity = 1 - p;
      });
      if (p >= 1) {
        this.remove = true;
        this.scene.remove(this.root);
      }
      return;
    }

    const toPlayer = getEnemyScratch(this).toPlayer.copy(player.position).sub(this.position);
    toPlayer.y = 0;
    const dist = toPlayer.length();
    const hasDirection = dist > .001;
    if (hasDirection) toPlayer.multiplyScalar(1 / dist);
    else toPlayer.set(0, 0, 0);

    if (this.state === 'spawn') {
      const p = clamp(this.stateTime / this.stateDuration, 0, 1);
      const bounce = 1 - Math.pow(1 - p, 3);
      this.root.scale.setScalar((this.isBoss ? 1.08 : this.scaleBase) * bounce);
      if (p >= 1) { this.state = 'idle'; this.stateTime = 0; }
    } else if (this.state === 'idle') {
      if (dist < (this.isBoss ? 18 : 12)) { this.state = 'chase'; this.stateTime = 0; }
    } else if (this.state === 'chase') {
      if (dist < this.attackRange) {
        this.state = 'windup';
        this.stateTime = 0;
        this.stateDuration = this.isBoss ? .92 : .52;
        this.velocity.multiplyScalar(.35);
      } else {
        this.velocity.x = damp(this.velocity.x, toPlayer.x * this.speed, 8, dt);
        this.velocity.z = damp(this.velocity.z, toPlayer.z * this.speed, 8, dt);
      }
    } else if (this.state === 'windup') {
      this.velocity.multiplyScalar(Math.exp(-dt * 9));
      if (this.stateTime > this.stateDuration) {
        this.state = 'attack';
        this.stateTime = 0;
        this.stateDuration = this.isBoss ? .5 : .24;
        this.attackEvent = true;
        this.attackSerial++;
        if (this.isBoss) this.fx.ring(this.position, 0xff785f, .25, 4.6, .55);
      }
    } else if (this.state === 'attack') {
      if (this.stateTime < this.stateDuration * .48) {
        this.velocity.x = toPlayer.x * (this.isBoss ? 3.7 : 5.4);
        this.velocity.z = toPlayer.z * (this.isBoss ? 3.7 : 5.4);
      } else this.velocity.multiplyScalar(Math.exp(-dt * 12));
      if (this.stateTime > this.stateDuration) {
        this.state = 'recover';
        this.stateTime = 0;
        this.stateDuration = this.isBoss ? .72 : .46;
      }
    } else if (this.state === 'recover') {
      this.velocity.multiplyScalar(Math.exp(-dt * 10));
      if (this.stateTime > this.stateDuration) { this.state = 'chase'; this.stateTime = 0; }
    } else if (this.state === 'stagger') {
      this.velocity.multiplyScalar(Math.exp(-dt * 8));
      if (this.stateTime > this.stateDuration) { this.state = 'chase'; this.stateTime = 0; }
    }

    if (this.state !== 'windup' && this.state !== 'stagger' && hasDirection) {
      const target = Math.atan2(toPlayer.x, toPlayer.z);
      const delta = ((target - this.facing + Math.PI) % (Math.PI * 2)) - Math.PI;
      this.facing += delta * (1 - Math.exp(-dt * 8));
    }
    this.position.addScaledVector(this.velocity, dt);
    this.root.rotation.y = this.facing;
    this._animate(dt, dist);
  };
}

function installCameraHotPaths(game) {
  const forward = new THREE.Vector3();
  const target = new THREE.Vector3();
  const offset = new THREE.Vector3();
  const ideal = new THREE.Vector3();
  const lookTarget = new THREE.Vector3();
  const introTarget = new THREE.Vector3(0, 1.3, 1.5);
  const introIdeal = new THREE.Vector3();

  game._updateCamera = dt => {
    const p = game.player.position;
    forward.set(Math.sin(game.cameraYaw), 0, Math.cos(game.cameraYaw));
    const horizontal = 6.8;
    target.copy(p).setY(p.y + 1.25).addScaledVector(forward, .55);
    const cp = Math.cos(game.cameraPitch);
    const sp = Math.sin(game.cameraPitch);
    offset.set(-Math.sin(game.cameraYaw) * horizontal * cp, 3.1 + horizontal * sp * .72, -Math.cos(game.cameraYaw) * horizontal * cp);
    ideal.copy(target).add(offset);
    const alpha = 1 - Math.exp(-dt * 9.5);
    game.camera.position.lerp(ideal, alpha);

    game.cameraShake = damp(game.cameraShake, 0, 7, dt);
    game.cameraKick = damp(game.cameraKick, 0, 6, dt);
    if (game.cameraShake > .01) {
      const s = game.cameraShake * game.cameraShake;
      game.camera.position.x += (Math.random() - .5) * s * .28;
      game.camera.position.y += (Math.random() - .5) * s * .21;
      game.camera.position.z += (Math.random() - .5) * s * .28;
    }
    lookTarget.copy(target).addScaledVector(forward, game.cameraKick * .5);
    game.camera.lookAt(lookTarget);
    const targetFov = 54 + (game.player.speed / 5.2) * 2.2 + game.cameraKick * 2.8;
    game.camera.fov = damp(game.camera.fov, targetFov, 7, dt);
    game.camera.updateProjectionMatrix();
  };

  game._introCamera = dt => {
    const t = game.gameTime * .17;
    const radius = 13.5;
    introIdeal.set(Math.sin(t) * radius, 5.2 + Math.sin(t * .7) * .7, Math.cos(t) * radius + 1.5);
    game.camera.position.lerp(introIdeal, 1 - Math.exp(-dt * 1.4));
    game.camera.lookAt(introTarget);
  };
}

export function installSolPerformancePass(game) {
  if (game.solPerformancePass) return game.solPerformancePass;
  game.solPerformanceCandidateEnabled = true;
  installCharacterHotPath();
  installEnemyHotPath();
  installCameraHotPaths(game);
  game.solPerformancePass = {
    strategy: 'scratch-vector hot paths plus exact static-culling sphere cache',
  };
  return game.solPerformancePass;
}

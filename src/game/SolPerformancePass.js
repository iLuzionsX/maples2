import * as THREE from 'three';

const damp = THREE.MathUtils.damp;

function installEnemyLoopHotPath(game) {
  const original = game._updateEnemies.bind(game);
  if (original.__solOptimized) return;

  const optimized = function updateEnemies(dt, realDt) {
    for (const enemy of this.enemies) {
      enemy.update(dt, this.player);
      this.world.clampToArena(enemy.position);

      if (enemy.attackEvent && !this.player.dead) {
        const dist = enemy.position.distanceTo(this.player.position);
        const hitRange = enemy.isBoss ? 4.35 : 1.75;
        if (dist < hitRange && this.player.takeDamage(enemy.damage, enemy.position)) {
          this.ui.damageFlash.classList.add('hit');
          setTimeout(() => this.ui.damageFlash.classList.remove('hit'), 55);
          this.cameraShake = Math.max(this.cameraShake, enemy.isBoss ? .78 : .42);
          this.hitStop = enemy.isBoss ? .055 : .035;
        }
      }

      if (enemy.dead && !enemy.userDataRewarded) {
        enemy.userDataRewarded = true;
        if (enemy.isBoss) {
          this.victoryTimer = 1.65;
          this.ui.bossFill.style.transform = 'scaleX(0)';
          this.toast('ANCIENT WARDEN DEFEATED', 1.5);
          this.cameraShake = .8;
          this.fx.levelUp(enemy.position);
        } else {
          this.kills++;
          this._spawnEssence(enemy.position, enemy.reward);
          this._updateQuest();
          if (this.kills >= this.objectiveKills && !this.boss && !this.bossPending) {
            this.bossPending = true;
            this.bossTimer = 1.8;
            this.toast('The forest is answering…', 1.6);
          }
        }
      }
    }

    // Same pairwise soft-separation math as Game.js, but scalar-only so the hot
    // pack loop does not allocate a Vector3 for every live enemy pair every frame.
    for (let i = 0; i < this.enemies.length; i++) {
      const a = this.enemies[i];
      if (a.dead) continue;
      for (let j = i + 1; j < this.enemies.length; j++) {
        const b = this.enemies[j];
        if (b.dead) continue;
        const dx = a.position.x - b.position.x;
        const dz = a.position.z - b.position.z;
        const lenSq = dx * dx + dz * dz;
        if (lenSq <= 0) continue;
        const min = a.radius + b.radius + .25;
        if (lenSq >= min * min) continue;
        const len = Math.sqrt(lenSq);
        const scale = (min - len) / len * .035;
        const sx = dx * scale;
        const sz = dz * scale;
        a.position.x += sx;
        a.position.z += sz;
        b.position.x -= sx;
        b.position.z -= sz;
      }
    }

    // Preserve the authored array-replacement semantics for wrapper compatibility.
    this.enemies = this.enemies.filter(enemy => !enemy.remove);

    if (this.player.dead) {
      this.respawnTimer += realDt;
      if (this.respawnTimer > 1.6) {
        this.player.dead = false;
        this.player.hp = this.player.maxHp;
        this.player.mana = this.player.maxMana;
        this.player.state = 'idle';
        this.player.stateTime = 0;
        this.player.root.rotation.set(0, this.player.facing, 0);
        this.player.rig.body.rotation.set(0, 0, 0);
        this.player.rig.head.rotation.set(0, 0, 0);
        this.player.setPosition(0, 0, 9);
        this.respawnTimer = 0;
        this.toast('The grove restores you', 1.2);
        this.fx.levelUp(this.player.position);
      }
    }
  };
  optimized.__solOptimized = true;
  game._updateEnemies = optimized;
}

function installCameraHotPaths(game) {
  const forward = new THREE.Vector3();
  const target = new THREE.Vector3();
  const offset = new THREE.Vector3();
  const ideal = new THREE.Vector3();
  const lookTarget = new THREE.Vector3();
  const introTarget = new THREE.Vector3(0, 1.3, 1.5);
  const introIdeal = new THREE.Vector3();

  // Matches the current Enhancements.js camera exactly; only temporary vectors are reused.
  game._updateCamera = dt => {
    const playerPos = game.player.position;
    forward.set(Math.sin(game.cameraYaw), 0, Math.cos(game.cameraYaw));
    const horizontal = 6.05;
    target.copy(playerPos).setY(playerPos.y + 1.35).addScaledVector(forward, .62);
    const cp = Math.cos(game.cameraPitch);
    const sp = Math.sin(game.cameraPitch);
    offset.set(
      -Math.sin(game.cameraYaw) * horizontal * cp,
      2.45 + horizontal * sp * .58,
      -Math.cos(game.cameraYaw) * horizontal * cp,
    );
    ideal.copy(target).add(offset);
    game.camera.position.lerp(ideal, 1 - Math.exp(-dt * 9.5));

    game.cameraShake = damp(game.cameraShake, 0, 7, dt);
    game.cameraKick = damp(game.cameraKick, 0, 6, dt);
    if (game.cameraShake > .01) {
      const strength = game.cameraShake * game.cameraShake;
      game.camera.position.x += (Math.random() - .5) * strength * .28;
      game.camera.position.y += (Math.random() - .5) * strength * .21;
      game.camera.position.z += (Math.random() - .5) * strength * .28;
    }
    lookTarget.copy(target).addScaledVector(forward, game.cameraKick * .5);
    game.camera.lookAt(lookTarget);
    const targetFov = 50.5 + (game.player.speed / 5.2) * 2.6 + game.cameraKick * 3.1;
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
  installEnemyLoopHotPath(game);
  installCameraHotPaths(game);
  game.solPerformancePass = {
    strategy: 'allocation-free enemy separation and authored-camera scratch vectors plus exact static culling sphere cache',
  };
  return game.solPerformancePass;
}

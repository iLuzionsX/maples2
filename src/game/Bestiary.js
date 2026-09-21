import * as THREE from 'three';
import { Character } from './Character.js';
import { Enemy } from './Enemy.js';
import { Game } from './Game.js';
import {
  BOSS_PHASE_LABELS,
  OATHS,
  ROLE_STATS,
  applyOath,
  bossPhaseForRatio,
  bossSpecial,
  levelReadout,
  liveRole,
  resolveIncomingDamage,
  roleForSerial,
  spellCost,
} from './BestiaryMath.js';

const V = THREE.Vector3;
const BAR_BG = new THREE.PlaneGeometry(0.92, 0.09);
const BAR_FILL = new THREE.PlaneGeometry(0.86, 0.052);
const BOLT_GEO = new THREE.SphereGeometry(0.16, 8, 6);

let prototypesPatched = false;
let activeGame = null;
let roleSerial = 0;

function chime(audio, freq, slide = 140) {
  audio?.tone?.(freq, 0.1, 'sine', 0.045, slide);
  audio?.noise?.(0.04, 0.03, 1500);
}

function registerEnemy(enemy) {
  if (!enemy || enemy.bestiaryNoted) return;
  enemy.bestiaryNoted = true;
  if (enemy.isBoss) {
    enemy.bestiaryRole = 'thornmaw';
    enemy.bossPhase = enemy.bossPhase || 1;
    enemy._ruptureCd = 4.2;
    enemy._chargeCd = 5.4;
    return;
  }
  enemy.bestiaryRole = roleForSerial(roleSerial++);
  enemy.orbitSign = roleSerial % 2 === 0 ? 1 : -1;
  enemy._blinkCd = 0.6;
  ensureRole(enemy);
}

function ensureRole(enemy) {
  const role = liveRole(enemy);
  if (role === 'thornmaw' || enemy.bestiaryApplied === role) return;
  const stats = ROLE_STATS[role];
  if (!stats) return;
  if (!enemy.bestiaryBase) {
    enemy.bestiaryBase = {
      maxHp: enemy.maxHp,
      hpRatio: enemy.maxHp > 0 ? enemy.hp / enemy.maxHp : 1,
      speed: enemy.speed,
      radius: enemy.radius,
    };
  }
  const base = enemy.bestiaryBase;
  enemy.maxHp = Math.max(1, Math.round(base.maxHp * stats.hp));
  enemy.hp = Math.max(1, Math.round(enemy.maxHp * base.hpRatio));
  enemy.speed = base.speed * stats.speed;
  enemy.attackRange = stats.attackRange;
  enemy.damage = stats.damage;
  enemy.radius = stats.radius;
  enemy.bestiaryRole = role;
  enemy.bestiaryApplied = role;
  enemy.telegraph?.material?.color?.setHex(stats.telegraph);
  if (enemy.hpFill?.material?.color) enemy.hpFill.material.color.setHex(stats.bar);
}

function horizontalDir(from, to, out = new V()) {
  out.copy(to).sub(from);
  out.y = 0;
  if (out.lengthSq() < 0.0001) out.set(0, 0, 1);
  else out.normalize();
  return out;
}

function spawnBolt(enemy, game) {
  const forward = horizontalDir(enemy.position, game.player.position);
  const mesh = new THREE.Mesh(
    BOLT_GEO,
    new THREE.MeshBasicMaterial({
      color: 0xd8fff6,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  mesh.position.copy(enemy.position).add(new V(0, 1.2, 0)).addScaledVector(forward, 0.55);
  game.scene.add(mesh);
  game.enemyBolts.push({
    mesh,
    velocity: forward.multiplyScalar(7.4),
    life: 1.7,
    damage: enemy.damage,
    owner: enemy,
  });
  enemy.fx?.ring(enemy.position, 0x7ee8cf, 0.18, 1.5, 0.26);
  chime(game.audio, 760, 180);
}

function spawnShockwave(enemy, game) {
  const mesh = new THREE.Mesh(
    new THREE.RingGeometry(0.82, 1, 42),
    new THREE.MeshBasicMaterial({
      color: enemy.bossPhase >= 3 ? 0xff4d3a : 0xff7a45,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.copy(enemy.position);
  mesh.position.y = 0.07;
  game.scene.add(mesh);
  game.shockwaves.push({
    mesh,
    position: enemy.position.clone(),
    radius: 0.55,
    maxRadius: enemy.bossPhase >= 3 ? 8.6 : 6.4,
    speed: 7.2,
    damage: enemy.bossPhase >= 3 ? 18 : 14,
    hit: false,
    owner: enemy,
  });
  enemy.fx?.ring(enemy.position, 0xff6a3c, 0.3, 2.4, 0.45);
  game.audio?.noise?.(0.16, 0.07, 240);
  game.cameraShake = Math.max(game.cameraShake || 0, 0.45);
}

function enterBossPhase(enemy, phase, game) {
  enemy.bossPhase = phase;
  enemy._ruptureCd = 0.85;
  enemy._chargeCd = phase >= 3 ? 1.1 : 6;
  const kicker = game.ui?.bossKicker;
  if (kicker) kicker.textContent = BOSS_PHASE_LABELS[phase] || BOSS_PHASE_LABELS[1];
  if (phase === 2) {
    game.toast('The roots rupture — move', 1.5);
    game.audio?.boss?.();
  } else if (phase === 3) {
    game.toast('THORNMAW RENDS THE GLADE', 1.6);
    game.audio?.boss?.();
    game.cameraShake = Math.max(game.cameraShake || 0, 0.72);
    const angle = Math.random() * Math.PI * 2;
    game._spawnEnemy?.(enemy.position.x + Math.cos(angle) * 4.2, enemy.position.z + Math.sin(angle) * 4.2);
  }
  enemy.fx?.ring(enemy.position, phase === 3 ? 0xff4a38 : 0xff8a55, 0.35, phase === 3 ? 6.5 : 4.8, 0.7);
}

function blinkGhost(enemy, player) {
  const away = horizontalDir(player.position, enemy.position);
  const side = new V(away.z, 0, -away.x).multiplyScalar(enemy.orbitSign || 1);
  enemy.position.addScaledVector(away, 3.15).addScaledVector(side, 1.35);
  enemy.velocity.set(0, 0, 0);
  enemy._blinkCd = 2.35;
  enemy.fx?.ring(enemy.position, 0x7ee8cf, 0.12, 1.3, 0.28);
}

function tuneEnemy(enemy, dt, player, before, game) {
  if (!enemy || enemy.remove) return;
  ensureRole(enemy);
  const role = liveRole(enemy);
  enemy._blinkCd = Math.max(0, (enemy._blinkCd || 0) - dt);
  if (enemy.isBoss && !enemy.dead) {
    enemy._ruptureCd = Math.max(0, (enemy._ruptureCd || 0) - dt);
    enemy._chargeCd = Math.max(0, (enemy._chargeCd || 0) - dt);
    const phase = bossPhaseForRatio(enemy.hp / enemy.maxHp);
    if (phase !== (enemy.bossPhase || 1) && enemy.state !== 'spawn') enterBossPhase(enemy, phase, game);
  }

  if (!enemy.dead && before !== enemy.state) {
    const timing = ROLE_STATS[role];
    if (timing && enemy.state === 'windup') enemy.stateDuration = timing.windup;
    if (timing && enemy.state === 'recover') enemy.stateDuration = timing.recover;
    if (role === 'ghost' && enemy.state === 'attack') spawnBolt(enemy, game);
    if (enemy.isBoss && enemy.state === 'attack' && enemy._pendingRupture) {
      spawnShockwave(enemy, game);
      enemy._pendingRupture = false;
      enemy._ruptureActive = true;
    }
  }

  if (role === 'ghost' && enemy.state === 'attack') {
    enemy.velocity.set(0, 0, 0);
    enemy.attackEvent = false;
  }
  if (enemy._ruptureActive && enemy.state === 'attack') {
    enemy.velocity.set(0, 0, 0);
    enemy.attackEvent = false;
  }
  if (enemy.state !== 'attack') enemy._ruptureActive = false;

  const lunging = enemy.state === 'attack' && enemy.stateTime < enemy.stateDuration * 0.5;
  if (role === 'bat' && lunging) enemy.velocity.multiplyScalar(ROLE_STATS.bat.diveScale);
  if (role === 'skeleton' && lunging) enemy.velocity.multiplyScalar(0.82);
  if (role === 'bat' && enemy.state === 'chase') {
    const perp = new V(Math.cos(enemy.facing), 0, -Math.sin(enemy.facing));
    enemy.velocity.addScaledVector(perp, enemy.speed * 0.62 * (enemy.orbitSign || 1));
  }

  if (enemy.isBoss && lunging && enemy._pendingCharge) {
    const dir = horizontalDir(enemy.position, player.position);
    enemy.velocity.set(dir.x * 11.2, 0, dir.z * 11.2);
  }
  if (enemy.state !== 'windup' && enemy.state !== 'attack') enemy._pendingCharge = false;

  if (role === 'ghost' && !enemy.dead && (enemy.state === 'chase' || enemy.state === 'recover')) {
    const dist = enemy.position.distanceTo(player.position);
    if (dist < ROLE_STATS.ghost.blinkRange && enemy._blinkCd <= 0 && enemy.state !== 'spawn') blinkGhost(enemy, player);
  }

  if (enemy.isBoss && !enemy.dead && enemy.state === 'chase') {
    const dist = enemy.position.distanceTo(player.position);
    const special = bossSpecial(enemy.bossPhase || 1, enemy.state, enemy._ruptureCd, enemy._chargeCd, dist);
    if (special === 'charge') {
      enemy.state = 'windup';
      enemy.stateTime = 0;
      enemy.stateDuration = 0.52;
      enemy._pendingCharge = true;
      enemy._chargeCd = 6.4;
      enemy.velocity.multiplyScalar(0.2);
    } else if (special === 'rupture') {
      enemy.state = 'windup';
      enemy.stateTime = 0;
      enemy.stateDuration = 1.12;
      enemy._pendingRupture = true;
      enemy._ruptureCd = enemy.bossPhase >= 3 ? 4.4 : 5.6;
      enemy.velocity.multiplyScalar(0.15);
    }
  }

}

function disposeObject(object) {
  object.parent?.remove(object);
  object.traverse?.(node => {
    if (node.material && node.userData?.disposeMaterial !== false) {
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      for (const material of materials) material.dispose?.();
    }
  });
}

function tickBolts(game, dt) {
  const player = game.player;
  for (let i = game.enemyBolts.length - 1; i >= 0; i--) {
    const bolt = game.enemyBolts[i];
    bolt.life -= dt;
    bolt.mesh.position.addScaledVector(bolt.velocity, dt);
    const aim = player.position.clone();
    aim.y += 0.9;
    const hit = bolt.mesh.position.distanceTo(aim) < 0.72;
    if (hit && !player.dead) {
      if (player.takeDamage(bolt.damage, bolt.owner?.position || bolt.mesh.position)) {
        game.ui?.damageFlash?.classList.add('hit');
        setTimeout(() => game.ui?.damageFlash?.classList.remove('hit'), 55);
        game.cameraShake = Math.max(game.cameraShake || 0, 0.28);
      }
      game.fx?.burst(bolt.mesh.position, 0xb8fff0, 10, 3.2, 0.7);
    }
    if (hit || bolt.life <= 0) {
      disposeObject(bolt.mesh);
      game.enemyBolts.splice(i, 1);
    }
  }
}

function tickShockwaves(game, dt) {
  const player = game.player;
  for (let i = game.shockwaves.length - 1; i >= 0; i--) {
    const wave = game.shockwaves[i];
    wave.radius += wave.speed * dt;
    wave.mesh.position.copy(wave.position);
    wave.mesh.position.y = 0.07;
    wave.mesh.scale.setScalar(wave.radius);
    wave.mesh.material.opacity = Math.max(0, 0.9 * (1 - wave.radius / wave.maxRadius));
    const dist = Math.hypot(player.position.x - wave.position.x, player.position.z - wave.position.z);
    if (!wave.hit && Math.abs(dist - wave.radius) < 0.85 && wave.radius > 1.15 && !player.dead) {
      wave.hit = true;
      if (player.takeDamage(wave.damage, wave.position)) {
        game.ui?.damageFlash?.classList.add('hit');
        setTimeout(() => game.ui?.damageFlash?.classList.remove('hit'), 55);
        game.cameraShake = Math.max(game.cameraShake || 0, 0.62);
        game.hitStop = Math.max(game.hitStop || 0, 0.04);
      }
    }
    if (wave.radius >= wave.maxRadius) {
      wave.mesh.geometry.dispose();
      disposeObject(wave.mesh);
      game.shockwaves.splice(i, 1);
    }
  }
}

function syncBars(game) {
  const tracked = game.bestiaryBars;
  for (const enemy of game.enemies) {
    if (enemy.isBoss || enemy.dead || enemy.remove) continue;
    const role = liveRole(enemy);
    const stats = ROLE_STATS[role];
    if (!stats) continue;
    const engaged = enemy.state === 'chase' || enemy.state === 'windup' || enemy.state === 'attack' || enemy.state === 'recover' || enemy.state === 'stagger' || enemy.hp < enemy.maxHp;
    if (!engaged) {
      if (enemy.hpBar) enemy.hpBar.visible = false;
      continue;
    }
    if (!enemy.hpBar) {
      const group = new THREE.Group();
      const bg = new THREE.Mesh(BAR_BG, new THREE.MeshBasicMaterial({ color: 0x140e0c, transparent: true, opacity: 0.82, depthTest: false, side: THREE.DoubleSide }));
      const fill = new THREE.Mesh(BAR_FILL, new THREE.MeshBasicMaterial({ color: stats.bar, depthTest: false, side: THREE.DoubleSide }));
      fill.position.z = 0.01;
      group.add(bg, fill);
      game.scene.add(group);
      enemy.hpBar = group;
      enemy.hpFill = fill;
      tracked.add(enemy);
    }
    const ratio = Math.max(0, enemy.hp / enemy.maxHp);
    enemy.hpBar.visible = true;
    enemy.hpBar.position.copy(enemy.position);
    enemy.hpBar.position.y += 2.15;
    enemy.hpBar.lookAt(game.camera.position);
    enemy.hpFill.scale.x = Math.max(0.001, ratio);
    enemy.hpFill.position.x = (ratio - 1) * 0.43;
    enemy.hpFill.material.color.setHex(stats.bar);
  }
  for (const enemy of tracked) {
    if (game.enemies.includes(enemy) && !enemy.dead && !enemy.remove) continue;
    if (enemy.hpBar) {
      disposeObject(enemy.hpBar);
      enemy.hpBar = null;
      enemy.hpFill = null;
    }
    tracked.delete(enemy);
  }
}

function openOath(game) {
  game.oathOpen = true;
  game.input?.pressed?.clear();
  game.input?.mobileActions?.clear();
  game.ui?.oath?.classList.remove('hidden');
  game.input?.releasePointerLock?.();
}

function chooseOath(game, id) {
  if (!game.oathOpen) return;
  const oath = applyOath(game.player, id);
  if (!oath) return;
  game.player.oathPending = Math.max(0, (game.player.oathPending || 1) - 1);
  game.oathOpen = game.player.oathPending > 0;
  if (!game.oathOpen) game.ui?.oath?.classList.add('hidden');
  game.toast(oath.toast, 1.35);
  chime(game.audio, id === 'ember' ? 620 : id === 'warden' ? 490 : 540, 90);
  if (!game.oathOpen && !game.input?.isCoarse) game.input?.requestPointerLock?.();
}

function pollOathKeys(game) {
  const map = [['Digit1', 'steel'], ['Digit2', 'ember'], ['Digit3', 'warden']];
  for (const [code, id] of map) {
    if (game.input?.pressed?.has(code)) {
      game.input.pressed.delete(code);
      chooseOath(game, id);
      return;
    }
  }
}

function patchPrototypes() {
  const enemyUpdate = Enemy.prototype.update;
  Enemy.prototype.update = function (dt, player) {
    const before = this.state;
    const result = enemyUpdate.call(this, dt, player);
    if (activeGame) tuneEnemy(this, dt, player, before, activeGame);
    return result;
  };

  const takeHit = Enemy.prototype.takeHit;
  Enemy.prototype.takeHit = function (damage, from, crit = false) {
    const game = activeGame;
    const resolved = resolveIncomingDamage({
      role: liveRole(this),
      state: this.state,
      facing: this.facing,
      enemyX: this.position.x,
      enemyZ: this.position.z,
      fromX: from?.x ?? this.position.x,
      fromZ: from?.z ?? this.position.z,
      damage,
      crit,
      meleePower: game?.player?.meleePower || 1,
      spellPower: game?.player?.spellPower || 1,
      context: game?.hitContext || null,
    });
    if (game) game.pendingDamageNumber = resolved.amount;
    if (resolved.guarded && game && !game.seenGuard) {
      game.seenGuard = true;
      game.toast('Brace — circle behind, or break it with Ember', 1.35);
      chime(game.audio, 910, -220);
    }
    const landed = takeHit.call(this, resolved.amount, from, crit);
    if (!landed && game) game.pendingDamageNumber = null;
    return landed;
  };

  const addXp = Character.prototype.addXp;
  Character.prototype.addXp = function (amount) {
    const leveled = addXp.call(this, amount);
    if (leveled) this.oathPending = (this.oathPending || 0) + 1;
    return leveled;
  };

  const frame = Game.prototype._frame;
  Game.prototype._frame = function () {
    if (this.started && !this.oathOpen && this.player?.oathPending > 0 && !this.victoryShown && !this.player.dead) openOath(this);
    if (this.oathOpen) {
      const dt = Math.min(0.033, this.clock.getDelta());
      pollOathKeys(this);
      this.world.update(dt);
      this.fx.update(dt);
      this._render();
      return;
    }
    return frame.call(this);
  };

  const handleInput = Game.prototype._handleInput;
  Game.prototype._handleInput = function (moveWorld) {
    const player = this.player;
    const cost = spellCost(player?.spellDiscount || 0);
    const realMana = player?.mana ?? 0;
    const shortfall = Math.max(0, 26 - cost);
    if (player && shortfall > 0 && player.mana >= cost && player.mana < 26) player.mana += shortfall;
    const boosted = player?.mana ?? realMana;
    const dodgeBefore = this.dodgeCooldown;
    handleInput.call(this, moveWorld);
    if (player) {
      const spent = boosted - player.mana;
      if (spent >= 25.5) player.mana = Math.min(player.maxMana, realMana - cost);
      else player.mana = realMana - spent;
    }
    if (this.dodgeCooldown > dodgeBefore + 0.01 && player?.dodgeHaste && player.dodgeHaste < 1) {
      this.dodgeCooldown *= player.dodgeHaste;
    }
  };

  const damageNumber = Game.prototype._damageNumber;
  Game.prototype._damageNumber = function (worldPos, amount, crit) {
    const shown = this.pendingDamageNumber ?? amount;
    this.pendingDamageNumber = null;
    return damageNumber.call(this, worldPos, shown, crit);
  };
}

function bindInstance(game) {
  game.enemyBolts = [];
  game.shockwaves = [];
  game.bestiaryBars = new Set();
  game.oathOpen = false;
  game.ui.oath = document.querySelector('#oath');
  game.ui.bossKicker = document.querySelector('.boss-kicker');

  const spawnEnemy = game._spawnEnemy.bind(game);
  game._spawnEnemy = (...args) => {
    const enemy = spawnEnemy(...args);
    registerEnemy(enemy);
    return enemy;
  };
  for (const enemy of game.enemies) registerEnemy(enemy);

  const updateEnemies = game._updateEnemies.bind(game);
  game._updateEnemies = (dt, realDt) => {
    const result = updateEnemies(dt, realDt);
    tickBolts(game, dt);
    tickShockwaves(game, dt);
    syncBars(game);
    return result;
  };

  const resolveMelee = game._resolveMelee.bind(game);
  game._resolveMelee = function (...args) {
    this.hitContext = 'melee';
    try { return resolveMelee(...args); }
    finally { this.hitContext = null; }
  };

  const updateProjectiles = game._updateProjectiles.bind(game);
  game._updateProjectiles = function (dt) {
    this.hitContext = 'spell';
    try { return updateProjectiles(dt); }
    finally { this.hitContext = null; }
  };

  const beginDodge = game.player.beginDodge.bind(game.player);
  game.player.beginDodge = function (moveDir) {
    const ok = beginDodge(moveDir);
    if (ok && this.dodgeInvulnBonus) this.invuln += this.dodgeInvulnBonus;
    return ok;
  };

  const updateHud = game._updateHUD.bind(game);
  game._updateHUD = function () {
    updateHud();
    const text = levelReadout(this.player.level, this.player.oaths);
    if (this.ui.level.textContent !== text) this.ui.level.textContent = text;
  };

  document.querySelectorAll('#oath [data-oath]').forEach(button => {
    button.addEventListener('click', () => chooseOath(game, button.dataset.oath));
  });
}

export function installBestiary(game) {
  if (!prototypesPatched) {
    prototypesPatched = true;
    patchPrototypes();
  }
  activeGame = game;
  bindInstance(game);
  return { roles: ROLE_STATS, oaths: OATHS };
}

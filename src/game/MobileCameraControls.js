const nowMs = () => (globalThis.performance?.now?.() ?? Date.now());

export function shortestAngleDelta(from, to) {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

export function angleToTarget(origin, target) {
  return Math.atan2(target.x - origin.x, target.z - origin.z);
}

export function selectMobileCombatTarget(playerPosition, cameraYaw, enemies, { maxRange = 5, coneCos = -0.1 } = {}) {
  const fx = Math.sin(cameraYaw);
  const fz = Math.cos(cameraYaw);
  let best = null;
  let bestScore = Infinity;

  for (const enemy of enemies || []) {
    if (!enemy || enemy.dead || enemy.remove || !enemy.position) continue;
    const dx = enemy.position.x - playerPosition.x;
    const dz = enemy.position.z - playerPosition.z;
    const distance = Math.hypot(dx, dz);
    if (distance < 0.001 || distance > maxRange) continue;
    const dot = (dx * fx + dz * fz) / distance;
    if (dot < coneCos) continue;

    // Prefer close targets, but bias toward enemies already near screen center.
    const score = distance + (1 - dot) * 2.4 - (enemy.isBoss ? 0.2 : 0);
    if (score < bestScore) {
      best = enemy;
      bestScore = score;
    }
  }
  return best;
}

export function installMobileCameraControls(game) {
  if (game.mobileCameraControls) return game.mobileCameraControls;

  const coarse = globalThis.matchMedia?.('(pointer: coarse)')?.matches ?? false;
  const touchCapable = (globalThis.navigator?.maxTouchPoints || 0) > 0;
  const enabled = coarse || touchCapable;
  const state = game.mobileCameraControls = {
    enabled,
    focusTarget: null,
    focusUntil: 0,
    lastLookAt: -Infinity,
    canvasLookActive: false,
    actionPointers: new Map(),
    attackPointers: new Set(),
    nextHeldAttackAt: 0,
  };
  if (!enabled) return state;

  const { input, player, canvas } = game;
  const originalConsumeLook = input.consumeLook.bind(input);
  input.consumeLook = () => {
    const look = originalConsumeLook();
    if (Math.abs(look.x) + Math.abs(look.y) > 0.01) state.lastLookAt = nowMs();
    // The original touch path is intentionally brisk for mouse parity. Mobile benefits
    // from a calmer response so small thumb adjustments do not over-rotate the camera.
    return { x: look.x * 0.74, y: look.y * 0.74 };
  };

  const updateCanvasLookState = touches => {
    state.canvasLookActive = [...touches].some(touch => touch.clientX > innerWidth * 0.35);
    if (state.canvasLookActive) state.lastLookAt = nowMs();
  };
  canvas.addEventListener('touchstart', event => updateCanvasLookState(event.touches), { passive: true });
  canvas.addEventListener('touchmove', event => updateCanvasLookState(event.touches), { passive: true });
  canvas.addEventListener('touchend', event => updateCanvasLookState(event.touches), { passive: true });
  canvas.addEventListener('touchcancel', event => updateCanvasLookState(event.touches), { passive: true });

  const actionButtons = [...document.querySelectorAll('.mobile-actions button')];
  for (const button of actionButtons) {
    button.addEventListener('pointerdown', event => {
      button.setPointerCapture?.(event.pointerId);
      state.actionPointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
        startX: event.clientX,
        startY: event.clientY,
        dragging: false,
      });
      if (button.dataset.action === 'attack') {
        state.attackPointers.add(event.pointerId);
        state.nextHeldAttackAt = nowMs() + 235;
      }
    });
    button.addEventListener('pointermove', event => {
      const pointer = state.actionPointers.get(event.pointerId);
      if (!pointer) return;
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!pointer.dragging && Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY) >= 4) pointer.dragging = true;
      if (!pointer.dragging) return;

      // Action buttons double as a camera touch surface. This lets the right thumb stay
      // on combat while the left thumb keeps moving instead of hopping between zones.
      input.mouseDX += dx * 0.9;
      input.mouseDY += dy * 0.9;
      state.lastLookAt = nowMs();
    });
    const endPointer = event => {
      state.actionPointers.delete(event.pointerId);
      state.attackPointers.delete(event.pointerId);
    };
    button.addEventListener('pointerup', endPointer);
    button.addEventListener('pointercancel', endPointer);
  }

  const originalConsume = input.consume.bind(input);
  input.consume = action => {
    const consumed = originalConsume(action);
    if (action !== 'attack') return consumed;

    const held = state.attackPointers.size > 0;
    const now = nowMs();
    if (consumed) {
      if (held) state.nextHeldAttackAt = now + 205;
      return true;
    }
    if (held && now >= state.nextHeldAttackAt) {
      state.nextHeldAttackAt = now + 145;
      return true;
    }
    return false;
  };

  const setFocus = (target, durationMs) => {
    if (!target) return;
    state.focusTarget = target;
    state.focusUntil = nowMs() + durationMs;
    player.facing = angleToTarget(player.position, target.position);
    player.root.rotation.y = player.facing;
  };

  const originalStartAttack = game._startAttack.bind(game);
  game._startAttack = () => {
    const target = selectMobileCombatTarget(player.position, game.cameraYaw, game.enemies, {
      maxRange: 4.4,
      coneCos: -0.12,
    });
    setFocus(target, 900);
    return originalStartAttack();
  };

  const originalCastSpell = game._castSpell.bind(game);
  game._castSpell = () => {
    const target = selectMobileCombatTarget(player.position, game.cameraYaw, game.enemies, {
      maxRange: 14,
      coneCos: -0.22,
    });
    setFocus(target, 1100);
    return originalCastSpell();
  };

  // Character.update normally allows low-speed steering during the first two combo
  // attacks. Re-assert the assisted facing after that update so mobile attacks do not
  // swing away from the target just because the movement stick is still held.
  const originalPlayerUpdate = player.update.bind(player);
  player.update = (dt, move, cameraYaw) => {
    const result = originalPlayerUpdate(dt, move, cameraYaw);
    const target = state.focusTarget;
    if (target && !target.dead && !target.remove && player.state === 'attack') {
      player.facing = angleToTarget(player.position, target.position);
      player.root.rotation.y = player.facing;
    }
    return result;
  };

  const originalUpdateCamera = game._updateCamera.bind(game);
  game._updateCamera = dt => {
    const now = nowMs();
    const target = state.focusTarget;
    if (target && (target.dead || target.remove || now > state.focusUntil || player.position.distanceTo(target.position) > 16)) {
      state.focusTarget = null;
    }

    const draggingAction = [...state.actionPointers.values()].some(pointer => pointer.dragging);
    const manualLook = state.canvasLookActive || draggingAction || now - state.lastLookAt < 260;
    if (!manualLook && state.focusTarget) {
      const desiredYaw = angleToTarget(player.position, state.focusTarget.position);
      const yawAlpha = 1 - Math.exp(-dt * (player.state === 'attack' ? 7.2 : 4.8));
      game.cameraYaw += shortestAngleDelta(game.cameraYaw, desiredYaw) * yawAlpha;
      game.cameraPitch += (0.24 - game.cameraPitch) * (1 - Math.exp(-dt * 3.2));
    }

    return originalUpdateCamera(dt);
  };

  const introHelp = document.querySelector('#intro small');
  if (introHelp) introHelp.textContent = 'Left stick move · Drag right side or combat buttons to look · Hold ✦ to combo';

  return state;
}

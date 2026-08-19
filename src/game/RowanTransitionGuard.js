const TRANSITION_SPEED = .42;
const NON_LOCOMOTION_STATES = new Set(['attack', 'dodge', 'hurt', 'cast', 'dead']);

function locomotionEligible(player, state = player?.state) {
  return Boolean(player && !player.dead && !NON_LOCOMOTION_STATES.has(state));
}

export function installFrameInvariantRowanTransitions(game, manager) {
  if (!game?.player || !manager?.events) return manager;

  const rawEmit = manager.events.emit.bind(manager.events);
  manager.events.emit = (type, detail = {}) => {
    if ((type === 'locomotion:start' || type === 'locomotion:stop') && !locomotionEligible(game.player)) {
      return { type, suppressed: true, ...detail };
    }
    return rawEmit(type, detail);
  };

  const baseUpdate = game.player.update.bind(game.player);
  game.player.update = (...args) => {
    const dt = Math.max(.0001, args[0] || 0);
    const previousSpeed = game.player.speed || 0;
    const previousState = game.player.state;
    const startCount = manager.eventCounts['locomotion:start'] || 0;
    const stopCount = manager.eventCounts['locomotion:stop'] || 0;

    const result = baseUpdate(...args);

    const currentSpeed = game.player.speed || 0;
    const acceleration = (currentSpeed - previousSpeed) / dt;
    const state = manager.state;
    const eligible = locomotionEligible(game.player) && locomotionEligible(game.player, previousState);

    if (state && !eligible) {
      state.startElapsed = Math.max(state.startElapsed, .25);
      state.stopElapsed = Math.max(state.stopElapsed, .28);
      return result;
    }

    if (
      state &&
      (manager.eventCounts['locomotion:start'] || 0) === startCount &&
      previousSpeed <= TRANSITION_SPEED &&
      currentSpeed > TRANSITION_SPEED &&
      acceleration > 0
    ) {
      state.startElapsed = 0;
      manager.events.emit('locomotion:start', { speed: currentSpeed, acceleration, frameInvariant: true });
    }

    if (
      state &&
      (manager.eventCounts['locomotion:stop'] || 0) === stopCount &&
      previousSpeed >= TRANSITION_SPEED &&
      currentSpeed < TRANSITION_SPEED &&
      acceleration < 0
    ) {
      state.stopElapsed = 0;
      manager.events.emit('locomotion:stop', { speed: currentSpeed, acceleration, frameInvariant: true });
    }

    return result;
  };

  manager.frameInvariantTransitions = true;
  return manager;
}

const TRANSITION_SPEED = .42;

export function installFrameInvariantRowanTransitions(game, manager) {
  if (!game?.player || !manager?.events) return manager;

  const baseUpdate = game.player.update.bind(game.player);
  game.player.update = (...args) => {
    const dt = Math.max(.0001, args[0] || 0);
    const previousSpeed = game.player.speed || 0;
    const startCount = manager.eventCounts['locomotion:start'] || 0;
    const stopCount = manager.eventCounts['locomotion:stop'] || 0;

    const result = baseUpdate(...args);

    const currentSpeed = game.player.speed || 0;
    const acceleration = (currentSpeed - previousSpeed) / dt;
    const state = manager.state;

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

const TRANSITION_SPEED = .42;
const NON_LOCOMOTION_STATES = new Set(['attack', 'dodge', 'hurt', 'cast', 'dead']);
const TRANSITION_DURATIONS = { start: .25, stop: .28, turn: .23, dodgeRecovery: .23 };

function locomotionEligible(player, state = player?.state) {
  return Boolean(player && !player.dead && !NON_LOCOMOTION_STATES.has(state));
}

function clearFootContacts(manager) {
  const foot = manager.state?.foot;
  for (const contact of [foot?.left, foot?.right]) {
    if (!contact) continue;
    contact.lock = null;
    contact.hit = null;
  }
  manager.footIKActive = false;
}

function clearNonLocomotionPulses(manager) {
  const state = manager.state;
  if (!state) return;
  state.startElapsed = Math.max(state.startElapsed, TRANSITION_DURATIONS.start);
  state.stopElapsed = Math.max(state.stopElapsed, TRANSITION_DURATIONS.stop);
  state.turnElapsed = Math.max(state.turnElapsed, TRANSITION_DURATIONS.turn);
}

export function installFrameInvariantRowanTransitions(game, manager) {
  if (!game?.player || !manager?.events) return manager;

  let updateContext = null;
  const rawEmit = manager.events.emit.bind(manager.events);
  manager.events.emit = (type, detail = {}) => {
    const currentLocomotionEligible = locomotionEligible(game.player);
    const startedInLocomotion = updateContext?.startedInLocomotion ?? currentLocomotionEligible;

    if (
      ['locomotion:start', 'locomotion:stop', 'locomotion:direction-change'].includes(type) &&
      (!currentLocomotionEligible || !startedInLocomotion)
    ) {
      return { type, suppressed: true, ...detail };
    }

    if (type === 'dodge:recover' && game.player.state !== 'idle') {
      return { type, suppressed: true, ...detail };
    }

    return rawEmit(type, detail);
  };

  const baseUpdate = game.player.update.bind(game.player);
  game.player.update = (...args) => {
    const dt = Math.max(.0001, args[0] || 0);
    const previousSpeed = game.player.speed || 0;
    const previousState = game.player.state;
    const startedInLocomotion = locomotionEligible(game.player, previousState);
    const startCount = manager.eventCounts['locomotion:start'] || 0;
    const stopCount = manager.eventCounts['locomotion:stop'] || 0;

    // A planted contact from the takeoff pose must never survive into a dodge frame.
    if (previousState === 'dodge') clearFootContacts(manager);

    updateContext = { previousState, startedInLocomotion };
    let result;
    try {
      result = baseUpdate(...args);
    } finally {
      updateContext = null;
    }

    const currentState = game.player.state;
    const currentSpeed = game.player.speed || 0;
    const acceleration = (currentSpeed - previousSpeed) / dt;
    const state = manager.state;
    const eligible = startedInLocomotion && locomotionEligible(game.player, currentState);

    if (currentState === 'dodge' || previousState === 'dodge') clearFootContacts(manager);

    if (state && !eligible) {
      clearNonLocomotionPulses(manager);
      if (previousState === 'dodge' && currentState !== 'idle') {
        state.dodgeRecoveryElapsed = Math.max(state.dodgeRecoveryElapsed, TRANSITION_DURATIONS.dodgeRecovery);
      }
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
  manager.transitionStateIsolation = true;
  return manager;
}

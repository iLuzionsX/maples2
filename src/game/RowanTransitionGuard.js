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

function clearInterruptedComboCarry(manager) {
  const carry = manager.state?.comboCarry;
  if (!carry) return;
  carry.action?.setEffectiveWeight?.(0);
  if (carry.current) carry.current.setEffectiveWeight(1);
  manager.state.comboCarry = null;
  manager.comboCarryInterrupted = true;
}

function finishPulse(manager, type) {
  const state = manager.state;
  if (!state) return;
  if (type === 'locomotion:start') state.startElapsed = TRANSITION_DURATIONS.start;
  else if (type === 'locomotion:stop') state.stopElapsed = TRANSITION_DURATIONS.stop;
  else if (type === 'locomotion:direction-change') state.turnElapsed = TRANSITION_DURATIONS.turn;
  else if (type === 'dodge:recover') state.dodgeRecoveryElapsed = TRANSITION_DURATIONS.dodgeRecovery;
}

function clearNonLocomotionPulses(manager) {
  finishPulse(manager, 'locomotion:start');
  finishPulse(manager, 'locomotion:stop');
  finishPulse(manager, 'locomotion:direction-change');
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
      finishPulse(manager, type);
      return { type, suppressed: true, ...detail };
    }

    if (type === 'dodge:recover' && game.player.state !== 'idle') {
      finishPulse(manager, type);
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

    // If gameplay has already interrupted an attack between frames, remove any
    // residual combo blend before the director can sample it over hurt/dodge/cast.
    if (previousState !== 'attack') clearInterruptedComboCarry(manager);
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
    if (currentState !== 'attack') clearInterruptedComboCarry(manager);

    if (state && !eligible) {
      clearNonLocomotionPulses(manager);
      if (previousState === 'dodge' && currentState !== 'idle') {
        finishPulse(manager, 'dodge:recover');
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
  manager.authoredActionPoseFinal = true;
  return manager;
}

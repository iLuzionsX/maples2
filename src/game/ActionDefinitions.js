export const PLAYER_INPUT_TTLS = Object.freeze({
  attack: 0.16,
  dodge: 0.18,
  spell: 0.12,
});

const attack = (comboIndex, duration, cooldown, activeAt, movementScale, turnScale, combat) => ({
  id: `attack${comboIndex + 1}`,
  kind: 'attack',
  state: 'attack',
  comboIndex,
  duration,
  cooldownKey: 'attack',
  cooldown,
  comboWindow: 0.72,
  guard: context => !context?.dead,
  movementScale,
  turnScale,
  cancelWindows: {
    dodge: { fromTime: 0.18 },
    cast: { fromTime: 0 },
  },
  events: [{ name: 'strike', atProgress: activeAt }],
  combat,
});

export const PLAYER_ACTIONS = Object.freeze({
  attack1: attack(0, 0.38, 0.22, 0.34, 0.34, 1, {
    damage: 19, range: 2.15, arcDot: 0.22, critChance: 0.12, critMultiplier: 1.72,
  }),
  attack2: attack(1, 0.42, 0.24, 0.32, 0.34, 1, {
    damage: 23, range: 2.25, arcDot: 0.15, critChance: 0.12, critMultiplier: 1.72,
  }),
  attack3: attack(2, 0.58, 0.35, 0.52, 0.16, 0, {
    damage: 36, range: 2.75, arcDot: -0.15, critChance: 0.24, critMultiplier: 1.72,
  }),
  dodge: {
    id: 'dodge',
    kind: 'dodge',
    state: 'dodge',
    duration: 0.44,
    cooldownKey: 'dodge',
    cooldown: 0.92,
    guard: context => !context?.dead,
    movementScale: 0,
    turnScale: 0,
    invulnerability: { fromTime: 0, toTime: 0.40 },
  },
  cast: {
    id: 'cast',
    kind: 'cast',
    state: 'cast',
    duration: 0.34,
    cooldownKey: 'spell',
    cooldown: 2.35,
    movementScale: 1,
    turnScale: 1,
    cancelWindows: {
      attack: { fromTime: 0 },
      dodge: { fromTime: 0 },
    },
    guard: context => !context?.dead && (context?.mana ?? Infinity) >= 26,
    combat: {
      manaCost: 26,
      damage: 42,
      critChance: 0.16,
      critMultiplier: 1.55,
      projectileSpeed: 13.5,
      life: 1.45,
      pierce: 2,
    },
  },
  hurt: {
    id: 'hurt',
    kind: 'hurt',
    state: 'hurt',
    duration: 0.28,
    movementScale: 0,
    turnScale: 0,
  },
  dead: {
    id: 'dead',
    kind: 'dead',
    state: 'dead',
    duration: Infinity,
    movementScale: 0,
    turnScale: 0,
  },
});

export function resolvePlayerInput(input, controller) {
  if (input === 'attack') return `attack${controller.nextComboIndex() + 1}`;
  if (input === 'dodge') return 'dodge';
  if (input === 'spell') return 'cast';
  return null;
}

export const ENEMY_ACTIONS = Object.freeze({
  briarStrike: {
    id: 'briarStrike',
    kind: 'enemyAttack',
    state: 'enemyAttack',
    duration: 0.76,
    windupDuration: 0.52,
    attackDuration: 0.24,
    events: [{ name: 'strike', atTime: 0.52 }],
  },
  bossStrike: {
    id: 'bossStrike',
    kind: 'enemyAttack',
    state: 'enemyAttack',
    duration: 1.42,
    windupDuration: 0.92,
    attackDuration: 0.50,
    events: [{ name: 'strike', atTime: 0.92 }],
  },
});

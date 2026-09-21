// Combat identity for the Sunken Glade. Pure so the roles, boss phases, and oaths
// can be tested without a WebGL context.

export const ROLES = ['skeleton', 'ghost', 'bat'];

export const ROLE_STATS = {
  skeleton: {
    name: 'Briar Warden',
    hp: 1.55,
    speed: 0.72,
    attackRange: 1.72,
    damage: 14,
    radius: 0.62,
    windup: 0.78,
    recover: 0.62,
    telegraph: 0xe7c27a,
    bar: 0xe7c27a,
  },
  ghost: {
    name: 'Glade Wisp',
    hp: 0.68,
    speed: 0.95,
    attackRange: 6.7,
    damage: 10,
    radius: 0.46,
    windup: 0.64,
    recover: 0.48,
    telegraph: 0x7ee8cf,
    bar: 0x8ef3dc,
    blinkRange: 2.45,
  },
  bat: {
    name: 'Skyrend',
    hp: 0.56,
    speed: 1.58,
    attackRange: 3.55,
    damage: 9,
    radius: 0.42,
    windup: 0.3,
    recover: 0.96,
    telegraph: 0xc7a6f5,
    bar: 0xd2b6ff,
    diveScale: 1.72,
  },
};

export const OATHS = {
  steel: {
    label: 'Steel Oath',
    toast: 'Steel Oath — your blade cuts deeper',
    meleePower: 0.18,
    detail: 'Melee hits harder. A heavy cut still breaks a warden’s brace.',
  },
  ember: {
    label: 'Ember Oath',
    toast: 'Ember Oath — the lance burns hotter',
    spellPower: 0.22,
    spellDiscount: 4,
    detail: 'Ember Lance hits harder and spends less mana.',
  },
  warden: {
    label: 'Warden Oath',
    toast: 'Warden Oath — evade comes easier',
    dodgeInvuln: 0.08,
    dodgeHaste: 0.82,
    detail: 'Evade returns sooner, and the invulnerable beat lasts longer.',
  },
};

export const BOSS_PHASE_LABELS = {
  1: 'ANCIENT WARDEN',
  2: 'ROOTS RUPTURE',
  3: 'RENDING CHARGE',
};

const GUARD_FRONT_DOT = 0.22;
const GUARD_BREAK_DAMAGE = 34;
const GUARD_FACTOR = 0.42;
const BAT_EXPOSED_FACTOR = 1.28;
const BASE_SPELL_COST = 26;
const MIN_SPELL_COST = 14;

export function roleForSerial(serial) {
  const index = ((serial % ROLES.length) + ROLES.length) % ROLES.length;
  return ROLES[index];
}

export function liveRole(enemy) {
  if (!enemy || enemy.isBoss) return 'thornmaw';
  if (enemy.assetKind === 'ghost' || enemy.assetKind === 'bat' || enemy.assetKind === 'skeleton') return enemy.assetKind;
  return enemy.bestiaryRole || 'skeleton';
}

export function facingDot(facing, enemyX, enemyZ, fromX, fromZ) {
  const dx = fromX - enemyX;
  const dz = fromZ - enemyZ;
  const len = Math.hypot(dx, dz);
  if (len < 0.001) return 1;
  return (dx / len) * Math.sin(facing) + (dz / len) * Math.cos(facing);
}

export function guardMultiplier(damage, crit, dot) {
  if (crit || damage >= GUARD_BREAK_DAMAGE) return 1;
  if (dot > GUARD_FRONT_DOT) return GUARD_FACTOR;
  return 1;
}

export function resolveIncomingDamage({
  role,
  state,
  facing = 0,
  enemyX = 0,
  enemyZ = 0,
  fromX = 0,
  fromZ = 0,
  damage,
  crit = false,
  meleePower = 1,
  spellPower = 1,
  context = null,
}) {
  let amount = damage;
  if (context === 'melee') amount = Math.round(amount * meleePower);
  if (context === 'spell') amount = Math.round(amount * spellPower);
  if (role === 'bat' && state === 'recover') amount = Math.round(amount * BAT_EXPOSED_FACTOR);
  let guarded = false;
  if (role === 'skeleton') {
    const dot = facingDot(facing, enemyX, enemyZ, fromX, fromZ);
    const factor = guardMultiplier(amount, crit, dot);
    guarded = factor < 1;
    amount = Math.max(1, Math.round(amount * factor));
  }
  return { amount, guarded };
}

export function bossPhaseForRatio(ratio) {
  if (ratio > 0.66) return 1;
  if (ratio > 0.33) return 2;
  return 3;
}

export function bossSpecial(phase, state, ruptureCd, chargeCd, distance) {
  if (phase < 2 || state !== 'chase') return null;
  if (phase >= 3 && chargeCd <= 0 && distance > 4.2 && distance < 13) return 'charge';
  if (ruptureCd <= 0 && distance > 2.8 && distance < 10.5) return 'rupture';
  return null;
}

export function spellCost(discount = 0) {
  return Math.max(MIN_SPELL_COST, BASE_SPELL_COST - discount);
}

export function applyOath(player, id) {
  const oath = OATHS[id];
  if (!oath || !player) return null;
  player.meleePower = (player.meleePower || 1) + (oath.meleePower || 0);
  player.spellPower = (player.spellPower || 1) + (oath.spellPower || 0);
  player.spellDiscount = (player.spellDiscount || 0) + (oath.spellDiscount || 0);
  player.dodgeInvulnBonus = (player.dodgeInvulnBonus || 0) + (oath.dodgeInvuln || 0);
  player.dodgeHaste = (player.dodgeHaste ?? 1) * (oath.dodgeHaste ?? 1);
  player.oaths = [...(player.oaths || []), id];
  return oath;
}

export function levelReadout(level, oaths = []) {
  const latest = oaths[oaths.length - 1];
  const name = OATHS[latest]?.label?.replace(' Oath', '');
  return name ? `Lv. ${level} · ${name}` : `Lv. ${level}`;
}

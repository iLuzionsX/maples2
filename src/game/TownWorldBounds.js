import * as THREE from 'three';

const GLADE_RADIUS = 34;
const TOWN_HALF_WIDTH = 28;
const TOWN_NORTH_EDGE = 50;
const NORTH_TRAIL_HALF_WIDTH = 18;
const NORTH_MAX_Z = 68;
const SOUTH_HALF_WIDTH = 26;
const SOUTH_MIN_Z = -62;
const SOUTH_CONNECTION_Z = -24;
const TOWN_CONNECTION_Z = 9.4;

function clampEnemyToCombatGlade(position) {
  if (!position) return;
  const distance = Math.hypot(position.x, position.z);
  if (distance <= GLADE_RADIUS) return;
  const scale = GLADE_RADIUS / Math.max(distance, .0001);
  position.x *= scale;
  position.z *= scale;
}

export function installTownWorldBounds(town) {
  if (!town?.presentation?.ready) return null;
  const game = town.game;
  const state = town.worldBounds = {
    gladeRadius: GLADE_RADIUS,
    townHalfWidth: TOWN_HALF_WIDTH,
    townNorthEdge: TOWN_NORTH_EDGE,
    northTrailHalfWidth: NORTH_TRAIL_HALF_WIDTH,
    northMaxZ: NORTH_MAX_Z,
    southHalfWidth: SOUTH_HALF_WIDTH,
    southMinZ: SOUTH_MIN_Z,
    clampEnemyToCombatGlade,
  };

  game.world.arenaRadius = Math.max(game.world.arenaRadius || 28, NORTH_MAX_Z);
  game.world.clampToArena = position => {
    if (position.z > TOWN_NORTH_EDGE) {
      // The larger northern region is an authored forest road, not an empty rectangle.
      // Players must reach it through the road corridor instead of cutting around town scenery.
      if (Math.abs(position.x) > NORTH_TRAIL_HALF_WIDTH) {
        position.x = THREE.MathUtils.clamp(position.x, -TOWN_HALF_WIDTH, TOWN_HALF_WIDTH);
        position.z = TOWN_NORTH_EDGE;
        return;
      }
      position.x = THREE.MathUtils.clamp(position.x, -NORTH_TRAIL_HALF_WIDTH, NORTH_TRAIL_HALF_WIDTH);
      position.z = Math.min(position.z, NORTH_MAX_Z);
      return;
    }

    if (position.z > TOWN_CONNECTION_Z) {
      position.x = THREE.MathUtils.clamp(position.x, -TOWN_HALF_WIDTH, TOWN_HALF_WIDTH);
      position.z = Math.min(position.z, TOWN_NORTH_EDGE);
      return;
    }

    if (position.z < SOUTH_CONNECTION_Z) {
      position.x = THREE.MathUtils.clamp(position.x, -SOUTH_HALF_WIDTH, SOUTH_HALF_WIDTH);
      position.z = Math.max(position.z, SOUTH_MIN_Z);
      return;
    }

    const distance = Math.hypot(position.x, position.z);
    if (distance > GLADE_RADIUS) {
      const scale = GLADE_RADIUS / distance;
      position.x *= scale;
      position.z *= scale;
    }
  };

  // Player travel can now extend far past the combat glade. Keep enemies on the
  // original encounter footprint so the map expansion does not silently enlarge
  // aggro/chase space or allow the boss to follow Rowan down the travel road.
  const updateEnemies = game._updateEnemies.bind(game);
  game._updateEnemies = function updateEnemiesInsideCombatGlade(...args) {
    for (const enemy of this.enemies || []) clampEnemyToCombatGlade(enemy?.position);
    const result = updateEnemies(...args);
    for (const enemy of this.enemies || []) clampEnemyToCombatGlade(enemy?.position);
    return result;
  };

  town.presentation.bounds = {
    ...town.presentation.bounds,
    gladeRadius: GLADE_RADIUS,
    halfWidth: TOWN_HALF_WIDTH,
    northMaxZ: NORTH_MAX_Z,
    northTrailHalfWidth: NORTH_TRAIL_HALF_WIDTH,
    southHalfWidth: SOUTH_HALF_WIDTH,
    southMinZ: SOUTH_MIN_Z,
  };
  if (town.bridgeApproach) town.bridgeApproach.bounds = { ...state, clampEnemyToCombatGlade: undefined };
  town.__authoredLargerWorldBounds = true;
  town.__expandedWorldCombatContainment = true;
  return state;
}

export function installWorldTravelAuthority(game) {
  if (game.worldTravelAuthority) return game.worldTravelAuthority;

  const world = game.world;
  const originalClampToArena = world.clampToArena.bind(world);

  const authority = {
    originalClampToArena,
    playerClampCalls: 0,
    encounterClampCalls: 0,
  };

  world.clampToArena = pos => {
    if (pos === game.player.position && typeof world.clampPlayerToWorld === 'function') {
      authority.playerClampCalls++;
      world.clampPlayerToWorld(pos);
      return;
    }
    authority.encounterClampCalls++;
    originalClampToArena(pos);
  };

  game.worldTravelAuthority = authority;
  return authority;
}

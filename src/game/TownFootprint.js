export function clearLumenwoodFootprint(game) {
  const decor = game?.world?.decor;
  if (!decor) return { hiddenRoots: 0, hiddenMeshes: 0 };

  let hiddenRoots = 0;
  let hiddenMeshes = 0;

  // The original glade intentionally scatters procedural and imported nature
  // across the old circular arena. Lumenwood occupies the northern extension;
  // retire only decor whose root origin lands inside that authored footprint.
  // Large base terrain at the origin, the southern shrine/portal, and the
  // combat-field ruins therefore remain untouched.
  for (const child of [...decor.children]) {
    if (child === game.world.portal) continue;
    const { x, z } = child.position;
    if (z <= 9.7 || Math.abs(x) >= 19.2) continue;

    child.userData.lumenwoodCleared = true;
    child.traverse(node => {
      if (node.isMesh && node.visible) hiddenMeshes++;
      node.visible = false;
    });
    hiddenRoots++;
  }

  return { hiddenRoots, hiddenMeshes };
}

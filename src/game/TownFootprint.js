export function clearLumenwoodFootprint(game) {
  const decor = game?.world?.decor;
  if (!decor) return { hiddenRoots: 0, hiddenMeshes: 0, natureRemoved: 0 };

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

  // NatureInstancing groups the imported foliage roots after this cleanup.
  // Remove retired roots from that source list entirely so a hidden first
  // exemplar can never suppress batching for the remaining forest foliage.
  let natureRemoved = 0;
  const nature = game.natureAssetManager;
  if (nature?.instances) {
    const kept = nature.instances.filter(root => !root.userData?.lumenwoodCleared);
    natureRemoved = nature.instances.length - kept.length;
    nature.instances = kept;
    nature.count = kept.length;
  }

  return { hiddenRoots, hiddenMeshes, natureRemoved };
}

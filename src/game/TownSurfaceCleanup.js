export function hideLegacyFlatTownSurfaces(town) {
  if (!town?.root) return 0;
  let hidden = 0;
  for (const child of town.root.children) {
    if (!child?.isMesh || child.position.z <= 9) continue;
    const type = child.geometry?.type;
    if (type !== 'PlaneGeometry' && type !== 'CircleGeometry') continue;
    child.visible = false;
    child.userData.replacedByDetailedSurface = true;
    hidden += 1;
  }
  town.__legacyTownSurfacesHidden = hidden;
  return hidden;
}

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

export function finalizeDetailedTownSurfaces(town) {
  const roads = town?.presentation?.surfaces?.roads || [];
  for (const road of roads) {
    // TownPresentation stores each segment heading in rotation.z while creating
    // the plane. Once the plane is horizontal, that heading belongs on world Y.
    const heading = road.rotation.z;
    road.rotation.set(-Math.PI / 2, heading, 0, 'XYZ');
    road.updateMatrix();
  }
  town.__townRoadSurfacesFlat = roads.length > 0;
  return roads.length;
}

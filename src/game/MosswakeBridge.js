import * as THREE from 'three';
import { TOWN_FACTS, FALLBACK_LINES } from './TownData.js';

const GLADE_RADIUS = 34;
const NORTH_HALF_WIDTH = 36;
const NORTH_MAX_Z = 68;
const SOUTH_HALF_WIDTH = 26;
const SOUTH_MIN_Z = -62;
const SOUTH_CONNECTION_Z = -24;
const TOWN_CONNECTION_Z = 9.4;
const STREAM_Z = 6.45;
const STREAM_HALF_DEPTH = 3.1;
const BRIDGE_HALF_WIDTH = 2.55;
const EPSILON = .002;

function cloneDetailedMaterial(source, repeatX, repeatY) {
  const material = source?.clone?.() || new THREE.MeshStandardMaterial({ color:0x516947, roughness:.95 });
  if (material.map) {
    material.map = material.map.clone();
    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set(repeatX, repeatY);
    material.map.needsUpdate = true;
  }
  if (material.normalMap) {
    material.normalMap = material.normalMap.clone();
    material.normalMap.wrapS = material.normalMap.wrapT = THREE.RepeatWrapping;
    material.normalMap.repeat.set(repeatX, repeatY);
    material.normalMap.needsUpdate = true;
  }
  return material;
}

function addGroundPlane(parent, width, depth, x, z, y, material, name) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, y, z);
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  mesh.name = name;
  mesh.userData.townSurface = true;
  mesh.userData.bridgeApproach = true;
  parent.add(mesh);
  return mesh;
}

function addRoad(parent, sourceMaterial, a, b, width, name) {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const length = Math.hypot(dx, dz);
  const group = new THREE.Group();
  group.name = name;
  group.position.set((a[0] + b[0]) * .5, .021, (a[1] + b[1]) * .5);
  group.rotation.y = Math.atan2(dx, dz);
  const material = cloneDetailedMaterial(sourceMaterial, width / 2.8, length / 2.8);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(width, length), material);
  road.rotation.x = -Math.PI / 2;
  road.receiveShadow = true;
  road.castShadow = false;
  road.userData.townSurface = true;
  road.userData.bridgeApproach = true;
  group.add(road);
  parent.add(group);
  return group;
}

function cloneEnvironment(town, name, position, rotationY = 0, scaleMultiplier = 1) {
  const source = town.game.environmentAssetManager?.roots?.find(root => root.name === name);
  if (!source) return null;
  const clone = source.clone(true);
  clone.name = `${name}_Mosswake`;
  clone.position.set(position[0], position[1] ?? source.position.y, position[2]);
  clone.rotation.y = rotationY;
  clone.scale.copy(source.scale).multiplyScalar(scaleMultiplier);
  clone.userData.assetTownEnvironment = true;
  clone.userData.bridgeApproach = true;
  clone.traverse(node => {
    if (!node.isMesh) return;
    node.castShadow = false;
    node.receiveShadow = true;
    node.frustumCulled = true;
  });
  town.root.add(clone);
  town.presentation.environment.push(clone);
  return clone;
}

function addBridge(town, state) {
  const root = new THREE.Group();
  root.name = 'MosswakeBridge';
  root.userData.bridgeApproach = true;
  town.root.add(root);

  const wood = new THREE.MeshStandardMaterial({ color:0x6b4a31, roughness:.9, metalness:0 });
  const darkWood = new THREE.MeshStandardMaterial({ color:0x493323, roughness:.94, metalness:0 });
  const iron = new THREE.MeshStandardMaterial({ color:0x403f3a, roughness:.6, metalness:.34 });
  const plankCount = 13;
  const bridgeLength = 7.7;

  for (let i = 0; i < plankCount; i++) {
    const t = i / (plankCount - 1);
    const localZ = (t - .5) * bridgeLength;
    const arch = Math.sin(t * Math.PI) * .16;
    const plank = new THREE.Mesh(new THREE.BoxGeometry(5.15, .18, .62), wood.clone());
    plank.material.color.offsetHSL((i % 3 - 1) * .008, 0, (i % 4 - 1.5) * .012);
    plank.position.set(0, .16 + arch, STREAM_Z + localZ);
    plank.rotation.y = (i % 2 ? 1 : -1) * .006;
    plank.receiveShadow = true;
    plank.castShadow = town.game.quality === 'high' && i % 3 === 0;
    root.add(plank);
    state.deck.push(plank);
  }

  for (const x of [-1.82, 1.82]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(.24, .22, bridgeLength + .65), darkWood);
    beam.position.set(x, .02, STREAM_Z);
    beam.receiveShadow = true;
    root.add(beam);
  }

  const postZ = [-3.4,-2.05,-.7,.7,2.05,3.4];
  for (const x of [-2.35, 2.35]) {
    for (const z of postZ) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(.16, 1.15, .16), darkWood);
      post.position.set(x, .67, STREAM_Z + z);
      post.castShadow = false;
      post.receiveShadow = true;
      root.add(post);
    }
    const rail = new THREE.Mesh(new THREE.BoxGeometry(.12, .12, bridgeLength + .25), darkWood);
    rail.position.set(x, 1.1, STREAM_Z);
    root.add(rail);
    const lowerRail = rail.clone();
    lowerRail.position.y = .68;
    root.add(lowerRail);
  }

  for (const x of [-2.36,2.36]) {
    for (const z of [STREAM_Z - 3.45, STREAM_Z + 3.45]) {
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(.13,.16,.16,8), iron);
      cap.position.set(x,1.33,z);
      root.add(cap);
    }
  }

  state.root = root;
}

function addBlackbriarRun(town, state) {
  const root = town.root;
  const riverbed = new THREE.Mesh(
    new THREE.BoxGeometry(73, .08, STREAM_HALF_DEPTH * 2 + .7),
    new THREE.MeshStandardMaterial({ color:0x31453a, roughness:.98 })
  );
  riverbed.position.set(0, .018, STREAM_Z);
  riverbed.receiveShadow = true;
  riverbed.name = 'BlackbriarRunBed';
  root.add(riverbed);

  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(72.5, STREAM_HALF_DEPTH * 2),
    new THREE.MeshPhysicalMaterial({
      color:0x395f66,
      roughness:.26,
      metalness:0,
      transparent:true,
      opacity:.84,
      transmission:0,
      clearcoat:.32,
      clearcoatRoughness:.38,
      depthWrite:false
    })
  );
  water.rotation.x = -Math.PI / 2;
  water.position.set(0,.072,STREAM_Z);
  water.renderOrder = 2;
  water.name = 'BlackbriarRunWater';
  root.add(water);

  const bankMaterial = new THREE.MeshStandardMaterial({ color:0x5b4d39, roughness:1 });
  for (const z of [STREAM_Z - STREAM_HALF_DEPTH - .18, STREAM_Z + STREAM_HALF_DEPTH + .18]) {
    const bank = new THREE.Mesh(new THREE.BoxGeometry(73,.16,.56), bankMaterial);
    bank.position.set(0,.065,z);
    bank.receiveShadow = true;
    root.add(bank);
  }

  state.water = water;
  state.riverbed = riverbed;
}

function addStoryScenery(town, state) {
  const placements = [
    ['KayKit_Ruin_Pillar',[-6.3,-.05,5.45],.24,.67],
    ['KayKit_Ruin_Pillar',[6.6,-.08,7.55],-.3,.58],
    ['KayKit_Broken_Ruin',[-9.1,-.06,2.85],1.13,.54],
    ['KayKit_Broken_Ruin',[10.2,-.08,9.45],-1.06,.48],
    ['KayKit_Lit_Torch',[-2.9,.02,10.15],0,.78],
    ['KayKit_Lit_Torch',[2.9,.02,10.15],Math.PI,.78],
  ];
  for (const [name,position,rotation,scale] of placements) {
    const model = cloneEnvironment(town,name,position,rotation,scale);
    if (model) state.storyScenery.push(model);
  }

  for (const x of [-2.9,2.9]) {
    const light = new THREE.PointLight(0xffa85a, town.game.quality === 'high' ? .78 : .46, 4.7, 2);
    light.position.set(x,1.55,10.15);
    light.castShadow = false;
    town.root.add(light);
    state.lights.push(light);
  }

  const postMat = new THREE.MeshStandardMaterial({ color:0x4e3725, roughness:.92 });
  const plaqueMat = new THREE.MeshStandardMaterial({ color:0x7a5a38, roughness:.86 });
  const sign = new THREE.Group();
  sign.name = 'MosswakeBridgeStoryMarker';
  const post = new THREE.Mesh(new THREE.BoxGeometry(.14,1.55,.14),postMat);
  post.position.y=.77;
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(1.65,.58,.12),plaqueMat);
  plaque.position.set(.55,1.32,0);
  plaque.rotation.z=-.035;
  sign.add(post,plaque);
  sign.position.set(-4.2,0,1.6);
  sign.rotation.y=.12;
  town.root.add(sign);
  state.storyMarker = sign;
}

function addApproachNature(town, state) {
  const natureManager = town.game.natureAssetManager;
  if (!natureManager?.instances?.length) return;
  const templates = new Map();
  for (const item of natureManager.instances) {
    const kind = item?.userData?.kind;
    if (kind && !templates.has(kind)) templates.set(kind,item);
  }
  const placements = [
    ['pine',-22,-49,1.15],['pine',21,-53,.96],['pine',-18,-38,.88],['pine',23,-34,1.05],
    ['pine',-30,57,1.1],['pine',29,60,.98],['pine',-24,65,.84],['pine',25,66,.9],
    ['bush',-8,-45,.86],['bush',10,-41,.92],['bush',-14,57,.9],['bush',14,61,.82],
    ['fern',-6,-36,.8],['fern',7,-39,.86],['fern',-10,53,.82],['fern',9,56,.9],
    ['grass',-5,-52,.8],['grass',5,-50,.86],['grass',-12,63,.78],['grass',11,64,.8]
  ];
  for (let i=0;i<placements.length;i++) {
    const [kind,x,z,scale]=placements[i];
    const template=templates.get(kind);
    if(!template) continue;
    const clone=template.clone(true);
    clone.position.set(x,template.position.y,z);
    clone.rotation.y=(i*.91)% (Math.PI*2);
    clone.rotation.z=clone.userData.baseRotationZ||0;
    clone.scale.copy(template.scale).multiplyScalar(scale);
    clone.userData={...template.userData,assetNature:true,townExpansion:true,bridgeApproach:true,phase:i*.47};
    clone.traverse(node=>{if(node.isMesh){node.castShadow=town.game.quality==='high'&&kind==='pine'&&i<4;node.receiveShadow=true;node.frustumCulled=true;}});
    town.game.world.decor.add(clone);
    natureManager.instances.push(clone);
    town.presentation.nature.push(clone);
    state.nature.push(clone);
  }
  natureManager.count=natureManager.instances.length;
}

function pushOutAabb(position, blocker, radius) {
  const dx=position.x-blocker.cx;
  const dz=position.z-blocker.cz;
  const px=blocker.hx+radius-Math.abs(dx);
  const pz=blocker.hz+radius-Math.abs(dz);
  if(px<=0||pz<=0) return false;
  if(px<pz) position.x+=(dx<0?-1:1)*(px+EPSILON);
  else position.z+=(dz<0?-1:1)*(pz+EPSILON);
  return true;
}

function installRiverCollision(town,state) {
  const outer=GLADE_RADIUS-.25;
  const leftWidth=outer-BRIDGE_HALF_WIDTH;
  const blockers=[
    {kind:'water',cx:-(BRIDGE_HALF_WIDTH+leftWidth*.5),cz:STREAM_Z,hx:leftWidth*.5,hz:STREAM_HALF_DEPTH,source:'blackbriar-run-west'},
    {kind:'water',cx:BRIDGE_HALF_WIDTH+leftWidth*.5,cz:STREAM_Z,hx:leftWidth*.5,hz:STREAM_HALF_DEPTH,source:'blackbriar-run-east'}
  ];
  state.blockers=blockers;
  const originalUpdate=town.update.bind(town);
  town.update=function updateTownWithMosswakeBridge(dt){
    const result=originalUpdate(dt);
    const player=this.game.player;
    if(!player) return result;
    const radius=player.radius||.38;
    for(const blocker of blockers) if(pushOutAabb(player.position,blocker,radius)) state.waterPushes++;
    return result;
  };
}

function installWorldBounds(town,state) {
  const game=town.game;
  game.world.arenaRadius=Math.max(game.world.arenaRadius||28,68);
  game.world.clampToArena=position=>{
    if(position.z>TOWN_CONNECTION_Z){
      position.x=THREE.MathUtils.clamp(position.x,-NORTH_HALF_WIDTH,NORTH_HALF_WIDTH);
      position.z=Math.min(position.z,NORTH_MAX_Z);
      return;
    }
    if(position.z<SOUTH_CONNECTION_Z){
      position.x=THREE.MathUtils.clamp(position.x,-SOUTH_HALF_WIDTH,SOUTH_HALF_WIDTH);
      position.z=Math.max(position.z,SOUTH_MIN_Z);
      return;
    }
    const distance=Math.hypot(position.x,position.z);
    if(distance>GLADE_RADIUS){
      const scale=GLADE_RADIUS/distance;
      position.x*=scale;
      position.z*=scale;
    }
  };
  state.bounds={
    gladeRadius:GLADE_RADIUS,
    northHalfWidth:NORTH_HALF_WIDTH,
    northMaxZ:NORTH_MAX_Z,
    southHalfWidth:SOUTH_HALF_WIDTH,
    southMinZ:SOUTH_MIN_Z
  };
  town.presentation.bounds={
    ...town.presentation.bounds,
    halfWidth:NORTH_HALF_WIDTH,
    northMaxZ:NORTH_MAX_Z,
    southHalfWidth:SOUTH_HALF_WIDTH,
    southMinZ:SOUTH_MIN_Z
  };
}

function installBridgeStory() {
  const facts=[
    'Mosswake Bridge is the final crossing over Blackbriar Run before Lumenwood’s southern gate.',
    'The original stone span was broken by a spring flood years ago; Rook kept the surviving piers and Fenn rebuilt the middle in timber so the town road could reopen.',
    'Wardens keep two lanterns burning on the town side of Mosswake Bridge because travelers sometimes report green lights moving upstream after dark.'
  ];
  for(const fact of facts) if(!TOWN_FACTS.includes(fact)) TOWN_FACTS.push(fact);
  const lines={
    darran:'Mosswake is the line I watch most closely. Once you cross north, you are under Lumenwood’s ward. South of it, keep your sword loose.',
    fenn:'Those bridge planks are mine. The old flood took the center span, but Rook’s stone piers refused to move, so we built around what survived.',
    rook:'Flood broke the bridge, not the piers. Good stone knows when to be stubborn.',
    pell:'Blackbriar Run looks shallow until it rains. I have seen green lights under Mosswake twice, and I was sober both times.'
  };
  for(const [id,line] of Object.entries(lines)) {
    const list=FALLBACK_LINES[id];
    if(list&&!list.includes(line)) list.unshift(line);
  }
}

export function installMosswakeBridge(town) {
  if(!town?.presentation?.ready||town.bridgeApproach?.ready) return town?.bridgeApproach||null;
  const state=town.bridgeApproach={
    ready:false,
    deck:[],
    storyScenery:[],
    nature:[],
    lights:[],
    blockers:[],
    waterPushes:0,
    root:null,
    water:null,
    riverbed:null,
    storyMarker:null,
    bounds:null
  };

  const grassSource=town.presentation.surfaces.grass?.material;
  const dirtSource=town.presentation.surfaces.roads?.[0]?.material;
  const outerGrass=cloneDetailedMaterial(grassSource,25,46);
  state.outerGround=addGroundPlane(town.root,76,140,0,3,.006,outerGrass,'LumenwoodOuterWorld');
  state.southRoad=addRoad(town.root,dirtSource,[0,SOUTH_MIN_Z+2],[0,-31],5.2,'OldSouthRoad');
  state.northRoad=addRoad(town.root,dirtSource,[.15,48.4],[0,65.5],4.2,'NorthWatchRoad');
  state.southFork=addRoad(town.root,dirtSource,[0,-46],[-13,-55],2.75,'OldFerryTrack');

  addBlackbriarRun(town,state);
  addBridge(town,state);
  addStoryScenery(town,state);
  addApproachNature(town,state);
  installWorldBounds(town,state);
  installRiverCollision(town,state);
  installBridgeStory();

  state.ready=true;
  town.__mosswakeBridge=true;
  town.__largerWorldApproach=true;
  return state;
}

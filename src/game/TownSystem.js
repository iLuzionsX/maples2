import * as THREE from 'three';
import { CloudAIClient } from './CloudAI.js';
import { NPC_PLACEMENTS, SHOPS, TOWN_FACTS, TOWN_NAME, fallbackLine, getNpc, getShop, isTownSafeZone } from './TownData.js';

const V = THREE.Vector3;
const clamp = THREE.MathUtils.clamp;
const WALLET_KEY = 'maples.town.coins.v1';

function material(color, roughness=.82, metalness=0, emissive=0x000000, emissiveIntensity=0) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, emissive, emissiveIntensity, flatShading:true });
}

function mesh(geometry, mat, cast=true) {
  const m = new THREE.Mesh(geometry, mat);
  m.castShadow = cast;
  m.receiveShadow = true;
  return m;
}

function readCoins() {
  try {
    const value = Number(localStorage.getItem(WALLET_KEY));
    return Number.isFinite(value) ? clamp(Math.floor(value), 0, 9999) : 75;
  } catch { return 75; }
}

function writeCoins(value) {
  try { localStorage.setItem(WALLET_KEY, String(value)); } catch {}
}

export function installLumenwoodTown(game) {
  if (game.lumenwoodTown) return game.lumenwoodTown;
  const town = new LumenwoodTown(game);
  game.lumenwoodTown = town;
  return town;
}

class LumenwoodTown {
  constructor(game) {
    this.game = game;
    this.scene = game.scene;
    this.root = new THREE.Group();
    this.root.name = 'LumenwoodCrossing';
    this.scene.add(this.root);
    this.dynamic = new THREE.Group();
    this.dynamic.name = 'LumenwoodLife';
    this.scene.add(this.dynamic);
    this.ai = new CloudAIClient();
    this.coins = readCoins();
    this.lastKillCount = game.kills || 0;
    this.time = 0;
    this.frame = 0;
    this.nearest = null;
    this.activeNpc = null;
    this.modalOpen = false;
    this.dialogueHistory = new Map();
    this.localLineSeed = 0;
    this.smoke = [];
    this.npcs = [];
    this._tmp = new THREE.Object3D();
    this._tmpOffset = new V();
    this._tmpQuat = new THREE.Quaternion();
    this._tmpScale = new V(1,1,1);

    this._extendWorld();
    this._buildTown();
    this._buildNpcInstances();
    this._buildUI();
    this._installHooks();
  }

  _extendWorld() {
    this.game.world.arenaRadius = Math.max(this.game.world.arenaRadius || 28, 36);

    const earth = mesh(new THREE.BoxGeometry(38, 1.0, 23), material(0x405b49, .98), false);
    earth.position.set(0, -.54, 22.25);
    this.root.add(earth);

    const lawn = mesh(new THREE.PlaneGeometry(36.5, 21.5), material(0x536f55, .98), false);
    lawn.rotation.x = -Math.PI / 2;
    lawn.position.set(0, .012, 22.15);
    this.root.add(lawn);

    const roadMat = material(0x7c8172, .96);
    const road = mesh(new THREE.PlaneGeometry(5.2, 23), roadMat, false);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, .028, 21.5);
    this.root.add(road);

    const crossRoad = mesh(new THREE.PlaneGeometry(25, 4.4), roadMat, false);
    crossRoad.rotation.x = -Math.PI / 2;
    crossRoad.position.set(0, .031, 22.2);
    this.root.add(crossRoad);

    const plaza = mesh(new THREE.CircleGeometry(5.0, 32), material(0x85877a, .93), false);
    plaza.rotation.x = -Math.PI / 2;
    plaza.position.set(0, .04, 22.1);
    this.root.add(plaza);

    this._buildGate();
    this._buildFountain();
  }

  _buildGate() {
    const stone = material(0x66756c, .93);
    const wood = material(0x574438, .94);
    const glow = material(0x8be0bc, .45, 0, 0x4fc79e, 1.5);
    const group = new THREE.Group();
    group.position.set(0, 0, 10.8);
    for (const x of [-3.25, 3.25]) {
      const tower = mesh(new THREE.BoxGeometry(1.15, 4.6, 1.3), stone);
      tower.position.set(x, 2.3, 0);
      group.add(tower);
      const cap = mesh(new THREE.ConeGeometry(1.05, 1.45, 4), material(0x334d44, .87));
      cap.position.set(x, 5.05, 0);
      cap.rotation.y = Math.PI / 4;
      group.add(cap);
    }
    const beam = mesh(new THREE.BoxGeometry(7.6, .55, .65), wood);
    beam.position.set(0, 4.15, 0);
    group.add(beam);
    const ward = mesh(new THREE.TorusGeometry(1.3, .055, 6, 30), glow, false);
    ward.position.set(0, 3.58, .38);
    group.add(ward);
    const lanternGeo = new THREE.OctahedronGeometry(.14, 0);
    for (const x of [-2.45, 2.45]) {
      const lantern = mesh(lanternGeo, glow, false);
      lantern.position.set(x, 3.3, .55);
      group.add(lantern);
    }
    this.root.add(group);
  }

  _buildFountain() {
    const g = new THREE.Group();
    g.position.set(0, 0, 22.1);
    const stone = material(0x718078, .88);
    const water = material(0x68c4ae, .24, .05, 0x3f9d89, .25);
    const basin = mesh(new THREE.CylinderGeometry(2.05, 2.25, .42, 24), stone);
    basin.position.y = .22;
    g.add(basin);
    const pool = mesh(new THREE.CylinderGeometry(1.78, 1.78, .08, 28), water, false);
    pool.position.y = .48;
    g.add(pool);
    const column = mesh(new THREE.CylinderGeometry(.28, .4, 1.8, 8), stone);
    column.position.y = 1.18;
    g.add(column);
    const crown = mesh(new THREE.OctahedronGeometry(.42, 0), material(0x9adfc0, .25, .1, 0x6bd5ac, 1.1), false);
    crown.position.y = 2.25;
    g.add(crown);
    this.fountainCrown = crown;
    this.root.add(g);
  }

  _buildTown() {
    SHOPS.forEach((shop, index) => this._buildShop(shop, index));

    const homes = [
      [-16.2, 14.7, 0x6f5947], [16.0, 14.9, 0x53695b],
      [-16.0, 29.8, 0x65516c], [16.1, 29.5, 0x6d6049]
    ];
    homes.forEach(([x,z,color], i) => this._buildHouse(x,z,color,i));

    this._buildMarketStalls();
    this._buildLanterns();
    this._buildTownGreen();
  }

  _buildShop(shop, index) {
    const g = new THREE.Group();
    g.position.set(shop.position[0], 0, shop.position[1]);
    const wall = material(index % 2 ? 0x736656 : 0x697260, .9);
    const timber = material(0x46392f, .93);
    const roofMat = material(index % 2 ? 0x3d5950 : 0x4e5149, .86);
    const accent = material(shop.accent, .55, .05, shop.accent, .12);
    const windowMat = material(0xffd58c, .35, 0, 0xffb65f, 1.25);

    const body = mesh(new THREE.BoxGeometry(5.3, 3.5, 4.6), wall);
    body.position.y = 1.75;
    g.add(body);

    for (const sx of [-1,1]) {
      const post = mesh(new THREE.BoxGeometry(.22, 3.7, .25), timber);
      post.position.set(sx*2.5, 1.85, 2.18);
      g.add(post);
    }

    const roof = mesh(new THREE.ConeGeometry(3.75, 2.15, 4), roofMat);
    roof.position.y = 4.48;
    roof.rotation.y = Math.PI / 4;
    roof.scale.z = .88;
    g.add(roof);

    const frontX = shop.position[0] < -8 ? 1 : shop.position[0] > 8 ? -1 : 0;
    const frontZ = shop.position[1] > 28 ? -1 : 0;
    const door = mesh(new THREE.BoxGeometry(frontX ? .18 : 1.15, 1.92, frontZ ? .18 : 1.15), timber);
    door.position.set(frontX*2.68, 1.02, frontZ*2.34);
    g.add(door);

    const sign = mesh(new THREE.BoxGeometry(frontX ? .16 : 1.4, .55, frontZ ? .16 : 1.4), accent, false);
    sign.position.set(frontX*2.82, 2.65, frontZ*2.48);
    g.add(sign);

    const windowPositions = frontX
      ? [[frontX*2.69,1.8,-1.25],[frontX*2.69,1.8,1.25]]
      : [[-1.45,1.8,frontZ*2.35],[1.45,1.8,frontZ*2.35]];
    windowPositions.forEach(([x,y,z]) => {
      const w = mesh(new THREE.BoxGeometry(frontX ? .12 : .78, .75, frontX ? .78 : .12), windowMat, false);
      w.position.set(x,y,z);
      g.add(w);
    });

    const chimney = mesh(new THREE.BoxGeometry(.55,1.7,.55), material(0x5e625b,.95));
    chimney.position.set(-1.45,4.8,-.7);
    g.add(chimney);
    this._addSmoke(g.position.x - 1.45, 5.75, g.position.z - .7, index);
    this.root.add(g);
  }

  _buildHouse(x,z,color,index) {
    const g = new THREE.Group();
    g.position.set(x,0,z);
    const body = mesh(new THREE.BoxGeometry(4.1,2.8,3.9), material(color,.92));
    body.position.y = 1.4;
    g.add(body);
    const roof = mesh(new THREE.ConeGeometry(3.1,1.8,4), material(index%2?0x384c42:0x4b443d,.9));
    roof.position.y = 3.65;
    roof.rotation.y = Math.PI/4;
    g.add(roof);
    const windowMat = material(0xffcf7a,.3,0,0xffaa55,.85);
    const window = mesh(new THREE.BoxGeometry(.11,.62,.72), windowMat, false);
    window.position.set(x < 0 ? 2.08 : -2.08,1.55,.45);
    g.add(window);
    this.root.add(g);
  }

  _buildMarketStalls() {
    const wood = material(0x5a4334,.95);
    const cloths = [material(0xb45f55,.82), material(0x567f70,.82), material(0xb39053,.82)];
    const spots = [[-5.6,20.7],[5.8,20.5],[-5.4,24.1]];
    spots.forEach(([x,z],i) => {
      const g = new THREE.Group(); g.position.set(x,0,z);
      const table = mesh(new THREE.BoxGeometry(2.25,.16,.95),wood); table.position.y=.85; g.add(table);
      for(const px of [-.9,.9]){ const leg=mesh(new THREE.BoxGeometry(.12,.85,.12),wood);leg.position.set(px,.42,0);g.add(leg); }
      const awning = mesh(new THREE.BoxGeometry(2.5,.1,1.35),cloths[i%cloths.length],false); awning.position.y=2.05; g.add(awning);
      for(const px of [-1.05,1.05]){ const pole=mesh(new THREE.BoxGeometry(.08,2,.08),wood);pole.position.set(px,1,0);g.add(pole); }
      for(let n=0;n<5;n++){ const goods=mesh(new THREE.DodecahedronGeometry(.12+(n%2)*.05,0), material([0xb96b4f,0xc4a15e,0x6c9c66][n%3],.86), false);goods.position.set(-.75+n*.36,1.03,(n%2)*.17-.1);g.add(goods); }
      this.root.add(g);
    });
  }

  _buildLanterns() {
    const postMat = material(0x3c4039,.75,.25);
    const lanternMat = material(0xffcb72,.3,0,0xffa64d,2.0);
    const positions = [[-4,15],[4,15],[-4,19],[4,19],[-4,26],[4,26],[-10,22],[10,22]];
    positions.forEach(([x,z]) => {
      const post=mesh(new THREE.CylinderGeometry(.06,.09,2.7,7),postMat);post.position.set(x,1.35,z);this.root.add(post);
      const lantern=mesh(new THREE.OctahedronGeometry(.16,0),lanternMat,false);lantern.position.set(x,2.72,z);this.root.add(lantern);
    });
  }

  _buildTownGreen() {
    const leaf = material(0x3f7654,.94);
    const flowerColors = [0xe3b45f,0xbe7868,0x8fb6d9];
    for(let i=0;i<24;i++){
      const side=i%2?-1:1;
      const x=side*(8.4+(i%4)*1.3);
      const z=13.5+((i*3.7)%17);
      const bush=mesh(new THREE.IcosahedronGeometry(.38+(i%3)*.08,1),leaf,false);bush.position.set(x,.33,z);bush.scale.y=.72;this.root.add(bush);
      if(i%3===0){const flower=mesh(new THREE.SphereGeometry(.07,6,4),material(flowerColors[i%3],.8),false);flower.position.set(x+.2,.66,z-.1);this.root.add(flower);}
    }
  }

  _addSmoke(x,y,z,phase) {
    const smokeMat = new THREE.MeshBasicMaterial({color:0xc8d0c7,transparent:true,opacity:.15,depthWrite:false});
    for(let i=0;i<3;i++){
      const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(.25+i*.06,1),smokeMat.clone());
      puff.position.set(x+(i-.8)*.08,y+i*.42,z);
      puff.userData = { baseY:y+i*.42, phase:phase+i*.9 };
      this.dynamic.add(puff);
      this.smoke.push(puff);
    }
  }

  _buildNpcInstances() {
    const count = NPC_PLACEMENTS.length;
    const bodyMat = new THREE.MeshStandardMaterial({color:0xffffff,roughness:.83,flatShading:true,vertexColors:true});
    const skinMat = new THREE.MeshStandardMaterial({color:0xffffff,roughness:.88,flatShading:true,vertexColors:true});
    const darkMat = new THREE.MeshStandardMaterial({color:0xffffff,roughness:.9,flatShading:true,vertexColors:true});
    this.npcMeshes = {
      body: new THREE.InstancedMesh(new THREE.CapsuleGeometry(.22,.62,3,6), bodyMat, count),
      head: new THREE.InstancedMesh(new THREE.SphereGeometry(.23,8,6), skinMat, count),
      legL: new THREE.InstancedMesh(new THREE.CapsuleGeometry(.075,.34,3,5), darkMat, count),
      legR: new THREE.InstancedMesh(new THREE.CapsuleGeometry(.075,.34,3,5), darkMat, count),
      hat: new THREE.InstancedMesh(new THREE.ConeGeometry(.27,.42,6), darkMat, count)
    };
    Object.values(this.npcMeshes).forEach(inst => {
      inst.castShadow = true;
      inst.receiveShadow = true;
      inst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this.dynamic.add(inst);
    });

    NPC_PLACEMENTS.forEach((placement,index) => {
      const profile = getNpc(placement.id);
      const pos = new V(placement.position[0],0,placement.position[1]);
      const npc = {
        ...placement, ...profile, index, position:pos, facing:index%2?Math.PI*.25:-Math.PI*.25,
        route:(placement.route || []).map(([x,z]) => new V(x,0,z)), routeIndex:0,
        pause:.5+((index*13)%17)/10, speed:.62+(index%4)*.08, phase:index*.73
      };
      this.npcs.push(npc);
      this.npcMeshes.body.setColorAt(index,new THREE.Color(profile?.color || 0x617565));
      this.npcMeshes.head.setColorAt(index,new THREE.Color([0xe4b28e,0xc8916e,0x9e6c50,0xd5a27b][index%4]));
      const dark = new THREE.Color([0x3e342e,0x283c38,0x49404f,0x554530][index%4]);
      this.npcMeshes.legL.setColorAt(index,dark);
      this.npcMeshes.legR.setColorAt(index,dark);
      this.npcMeshes.hat.setColorAt(index,dark);
    });
    Object.values(this.npcMeshes).forEach(inst => { if(inst.instanceColor) inst.instanceColor.needsUpdate=true; });
    this._updateNpcMatrices(true);
  }

  _setPart(inst, index, npc, localX, localY, localZ, scaleX=1, scaleY=1, scaleZ=1, extraYaw=0) {
    const yaw = npc.facing + extraYaw;
    this._tmpOffset.set(localX,localY,localZ).applyAxisAngle(new V(0,1,0),yaw).add(npc.position);
    this._tmp.position.copy(this._tmpOffset);
    this._tmp.rotation.set(0,yaw,0);
    this._tmp.scale.set(scaleX,scaleY,scaleZ);
    this._tmp.updateMatrix();
    inst.setMatrixAt(index,this._tmp.matrix);
  }

  _updateNpcMatrices(force=false) {
    if (!force && this.game.quality !== 'high' && this.frame % 2) return;
    for(const npc of this.npcs){
      const moving = !npc.keeper && npc.route.length > 1 && npc.pause <= 0;
      const step = moving ? Math.sin(this.time*8+npc.phase) : 0;
      const bob = moving ? Math.abs(step)*.035 : Math.sin(this.time*1.8+npc.phase)*.012;
      this._setPart(this.npcMeshes.body,npc.index,npc,0,1.08+bob,0,1,1,1);
      this._setPart(this.npcMeshes.head,npc.index,npc,0,1.92+bob,0,1,1,1);
      this._setPart(this.npcMeshes.legL,npc.index,npc,-.11,.44+step*.035,.01,1,1,1);
      this._setPart(this.npcMeshes.legR,npc.index,npc,.11,.44-step*.035,.01,1,1,1);
      const hatScale = npc.index%3===0 || npc.keeper ? 1 : .001;
      this._setPart(this.npcMeshes.hat,npc.index,npc,0,2.25+bob,0,hatScale,hatScale,hatScale);
    }
    Object.values(this.npcMeshes).forEach(inst => inst.instanceMatrix.needsUpdate=true);
  }

  _buildUI() {
    const wrap = document.createElement('div');
    wrap.id = 'town-ui';
    wrap.innerHTML = `
      <button id="town-settings-btn" class="town-settings-btn" aria-label="Game settings" title="Settings">⚙</button>
      <button id="town-interact" class="town-interact hidden" type="button"></button>
      <div id="town-nameplate" class="town-nameplate hidden"><strong></strong><span></span></div>

      <section id="town-dialogue" class="town-panel town-dialogue hidden" aria-label="NPC dialogue">
        <header><div><small>LUMENWOOD CROSSING</small><h2 id="town-dialogue-name">Townsfolk</h2><p id="town-dialogue-role">Resident</p></div><button data-town-close aria-label="Close dialogue">×</button></header>
        <div id="town-dialogue-log" class="town-dialogue-log"></div>
        <div id="town-dialogue-status" class="town-dialogue-status"></div>
        <div class="town-dialogue-compose">
          <input id="town-dialogue-input" maxlength="400" autocomplete="off" placeholder="Ask something…" />
          <button id="town-dialogue-send">Ask</button>
        </div>
        <footer>
          <button id="town-dialogue-more" class="quiet">Hear more</button>
          <button id="town-dialogue-shop" class="quiet hidden">Browse shop</button>
        </footer>
      </section>

      <section id="town-shop" class="town-panel town-shop hidden" aria-label="Shop">
        <header><div><small>LOCAL SHOP</small><h2 id="town-shop-name">Shop</h2><p id="town-shop-copy"></p></div><button data-shop-close aria-label="Close shop">×</button></header>
        <div class="town-wallet">WARDEN COIN <strong id="town-coins">◈ ${this.coins}</strong></div>
        <div id="town-shop-wares" class="town-shop-wares"></div>
        <footer><button id="town-shop-talk" class="quiet">Talk to shopkeeper</button></footer>
      </section>

      <section id="town-settings" class="town-panel town-settings hidden" aria-label="Settings">
        <header><div><small>MAPLES SETTINGS</small><h2>Cloud AI</h2><p>Optional free-form NPC conversations.</p></div><button data-settings-close aria-label="Close settings">×</button></header>
        <label class="town-toggle"><input id="town-ai-enabled" type="checkbox"><span><strong>Enable Cloud AI dialogue</strong><small>Authored local dialogue always remains available.</small></span></label>
        <label class="town-field"><span>OpenAI API key</span><input id="town-ai-key" type="password" autocomplete="off" spellcheck="false" placeholder="sk-…"></label>
        <label class="town-field"><span>Model</span><input id="town-ai-model" type="text" autocomplete="off" spellcheck="false" value="gpt-5.6"></label>
        <p class="town-security-note">Your key is kept only for this browser tab session, sent over HTTPS to Maples’ same-origin relay when you choose to talk, and is never committed to the game. Use a restricted project key with a spend limit.</p>
        <div id="town-ai-status" class="town-ai-status">Local dialogue active.</div>
        <footer><button id="town-ai-clear" class="quiet">Forget key</button><button id="town-ai-test" class="quiet">Test</button><button id="town-ai-save">Save</button></footer>
      </section>
      <div id="town-modal-shade" class="town-modal-shade hidden"></div>
    `;
    document.body.appendChild(wrap);

    this.ui = {
      interact: wrap.querySelector('#town-interact'), nameplate: wrap.querySelector('#town-nameplate'),
      dialogue: wrap.querySelector('#town-dialogue'), dialogueName: wrap.querySelector('#town-dialogue-name'), dialogueRole: wrap.querySelector('#town-dialogue-role'),
      dialogueLog: wrap.querySelector('#town-dialogue-log'), dialogueStatus: wrap.querySelector('#town-dialogue-status'),
      dialogueInput: wrap.querySelector('#town-dialogue-input'), dialogueSend: wrap.querySelector('#town-dialogue-send'), dialogueMore: wrap.querySelector('#town-dialogue-more'), dialogueShop: wrap.querySelector('#town-dialogue-shop'),
      shop: wrap.querySelector('#town-shop'), shopName: wrap.querySelector('#town-shop-name'), shopCopy: wrap.querySelector('#town-shop-copy'), shopWares: wrap.querySelector('#town-shop-wares'), coins: wrap.querySelector('#town-coins'), shopTalk: wrap.querySelector('#town-shop-talk'),
      settingsBtn: wrap.querySelector('#town-settings-btn'), settings: wrap.querySelector('#town-settings'), aiEnabled: wrap.querySelector('#town-ai-enabled'), aiKey: wrap.querySelector('#town-ai-key'), aiModel: wrap.querySelector('#town-ai-model'), aiStatus: wrap.querySelector('#town-ai-status'), aiSave: wrap.querySelector('#town-ai-save'), aiTest: wrap.querySelector('#town-ai-test'), aiClear: wrap.querySelector('#town-ai-clear'),
      shade: wrap.querySelector('#town-modal-shade')
    };

    this._syncSettingsUI();
    this.ui.interact.addEventListener('click', () => this.nearest && this.openDialogue(this.nearest));
    this.ui.settingsBtn.addEventListener('click', () => this.openSettings());
    wrap.querySelector('[data-town-close]').addEventListener('click', () => this.closePanels());
    wrap.querySelector('[data-shop-close]').addEventListener('click', () => this.closePanels());
    wrap.querySelector('[data-settings-close]').addEventListener('click', () => this.closePanels());
    this.ui.shade.addEventListener('click', () => this.closePanels());
    this.ui.dialogueSend.addEventListener('click', () => this._submitDialogue());
    this.ui.dialogueInput.addEventListener('keydown', e => { if(e.key==='Enter' && !e.shiftKey){e.preventDefault();this._submitDialogue();} });
    this.ui.dialogueMore.addEventListener('click', () => this._localReply());
    this.ui.dialogueShop.addEventListener('click', () => this.activeNpc?.shopId && this.openShop(this.activeNpc.shopId));
    this.ui.shopTalk.addEventListener('click', () => this.activeNpc && this.openDialogue(this.activeNpc));
    this.ui.aiSave.addEventListener('click', () => this._saveAISettings());
    this.ui.aiTest.addEventListener('click', () => this._testAI());
    this.ui.aiClear.addEventListener('click', () => {
      this.ui.aiKey.value='';
      this.ai.configure({apiKey:'',enabled:false});
      this._syncSettingsUI('Key forgotten. Local dialogue active.');
    });

    addEventListener('keydown', e => {
      if (this.modalOpen) {
        if (e.code === 'Escape') { e.preventDefault(); this.closePanels(); }
        if (!['Tab'].includes(e.code)) e.stopImmediatePropagation();
        return;
      }
      if (e.code === 'KeyE' && this.nearest && this.game.started) {
        e.preventDefault(); e.stopImmediatePropagation(); this.openDialogue(this.nearest);
      }
    }, true);
  }

  _syncSettingsUI(message='') {
    const settings = this.ai.settings;
    this.ui.aiEnabled.checked = settings.enabled;
    this.ui.aiKey.value = settings.apiKey;
    this.ui.aiModel.value = settings.model;
    this.ui.aiStatus.textContent = message || (this.ai.configured ? `Cloud AI ready · ${settings.model}` : 'Local dialogue active.');
    if (this.activeNpc) this._refreshDialogueComposer();
  }

  _saveAISettings() {
    this.ai.configure({ enabled:this.ui.aiEnabled.checked, apiKey:this.ui.aiKey.value, model:this.ui.aiModel.value });
    this._syncSettingsUI(this.ai.configured ? 'Cloud AI saved for this tab session.' : 'Settings saved. Add a key to enable Cloud AI.');
  }

  async _testAI() {
    this._saveAISettings();
    if (!this.ai.configured) return;
    this.ui.aiTest.disabled = true;
    this.ui.aiStatus.textContent = 'Testing secure relay…';
    try {
      const reply = await this.ai.test();
      this.ui.aiStatus.textContent = reply.toLowerCase().includes('connected') ? `Connected · ${this.ai.settings.model}` : `Relay responded · ${reply.slice(0,60)}`;
    } catch (error) {
      this.ui.aiStatus.textContent = error.message;
    } finally { this.ui.aiTest.disabled = false; }
  }

  _setModal(panel) {
    [this.ui.dialogue,this.ui.shop,this.ui.settings].forEach(el => el.classList.add('hidden'));
    panel.classList.remove('hidden');
    this.ui.shade.classList.remove('hidden');
    this.modalOpen = true;
    this.game.input.keys.clear();
    this.game.input.pressed.clear();
    this.game.input.mobileMove.x = this.game.input.mobileMove.y = 0;
    document.exitPointerLock?.();
  }

  closePanels() {
    [this.ui.dialogue,this.ui.shop,this.ui.settings,this.ui.shade].forEach(el => el.classList.add('hidden'));
    this.modalOpen = false;
    this.activeNpc = null;
    this.game.input.keys.clear();
  }

  openSettings() {
    this._syncSettingsUI();
    this._setModal(this.ui.settings);
  }

  openDialogue(npc) {
    this.activeNpc = npc;
    this.ui.dialogueName.textContent = npc.name;
    this.ui.dialogueRole.textContent = npc.role;
    this.ui.dialogueShop.classList.toggle('hidden', !npc.shopId);
    const history = this.dialogueHistory.get(npc.id) || [];
    if (!history.length) {
      history.push({role:'npc',text:fallbackLine(npc.id,this.localLineSeed++)});
      this.dialogueHistory.set(npc.id,history);
    }
    this._renderDialogue();
    this._refreshDialogueComposer();
    this._setModal(this.ui.dialogue);
    if (this.ai.configured) setTimeout(() => this.ui.dialogueInput.focus(), 50);
  }

  _refreshDialogueComposer() {
    if (!this.ui?.dialogueInput) return;
    const cloud = this.ai.configured;
    this.ui.dialogueInput.disabled = !cloud;
    this.ui.dialogueSend.disabled = !cloud;
    this.ui.dialogueInput.placeholder = cloud ? 'Ask something in your own words…' : 'Enable Cloud AI in Settings for free-form conversation';
    this.ui.dialogueStatus.textContent = cloud ? `Cloud dialogue · ${this.ai.settings.model}` : 'Authored local dialogue · Cloud AI optional';
  }

  _renderDialogue() {
    const history = this.dialogueHistory.get(this.activeNpc?.id) || [];
    this.ui.dialogueLog.replaceChildren();
    history.slice(-8).forEach(turn => {
      const row = document.createElement('div');
      row.className = `town-line ${turn.role === 'player' ? 'player' : 'npc'}`;
      const label = document.createElement('small');
      label.textContent = turn.role === 'player' ? 'ROWAN' : this.activeNpc.name.toUpperCase();
      const p = document.createElement('p');
      p.textContent = turn.text;
      row.append(label,p);
      this.ui.dialogueLog.appendChild(row);
    });
    this.ui.dialogueLog.scrollTop = this.ui.dialogueLog.scrollHeight;
  }

  _localReply() {
    if (!this.activeNpc) return;
    const history = this.dialogueHistory.get(this.activeNpc.id) || [];
    history.push({role:'npc',text:fallbackLine(this.activeNpc.id,this.localLineSeed++)});
    if(history.length>10) history.splice(0,history.length-10);
    this.dialogueHistory.set(this.activeNpc.id,history);
    this._renderDialogue();
  }

  async _submitDialogue() {
    if (!this.activeNpc || !this.ai.configured) return;
    const line = this.ui.dialogueInput.value.trim();
    if (!line) return;
    const npc = this.activeNpc;
    const history = this.dialogueHistory.get(npc.id) || [];
    history.push({role:'player',text:line.slice(0,400)});
    this.ui.dialogueInput.value='';
    this.ui.dialogueInput.disabled=true;
    this.ui.dialogueSend.disabled=true;
    this.ui.dialogueStatus.textContent='Listening…';
    this._renderDialogue();
    try {
      const response = await this.ai.talk({ npc, playerLine:line, history:history.slice(0,-1), context:this._gameContext(npc) });
      if (this.activeNpc?.id !== npc.id) return;
      history.push({role:'npc',text:response});
      if(history.length>10) history.splice(0,history.length-10);
      this.dialogueHistory.set(npc.id,history);
      this._renderDialogue();
      this.ui.dialogueStatus.textContent=`Cloud dialogue · ${this.ai.settings.model}`;
    } catch (error) {
      if (this.activeNpc?.id !== npc.id) return;
      history.push({role:'npc',text:fallbackLine(npc.id,this.localLineSeed++)});
      this.dialogueHistory.set(npc.id,history);
      this._renderDialogue();
      this.ui.dialogueStatus.textContent=`Cloud unavailable · ${error.message}`;
    } finally {
      if (this.activeNpc?.id === npc.id) {
        this.ui.dialogueInput.disabled=false;
        this.ui.dialogueSend.disabled=false;
        this.ui.dialogueInput.focus();
      }
    }
  }

  _gameContext(npc) {
    const shop = npc.shopId ? getShop(npc.shopId) : null;
    return [
      ...TOWN_FACTS,
      `Rowan currently has ${Math.round(this.game.player.hp)}/${this.game.player.maxHp} health and ${Math.round(this.game.player.mana)}/${this.game.player.maxMana} mana.`,
      `Rowan has defeated ${this.game.kills}/${this.game.objectiveKills} Briarbound in the active encounter.`,
      `Rowan carries ${this.coins} Warden Coin.`,
      this.game.boss ? 'Thornmaw has awakened in the southern glade.' : 'Thornmaw has not yet awakened.',
      shop ? `${npc.name} works at ${shop.name}. Available wares are: ${shop.wares.map(w=>`${w.name} (${w.cost} coin)`).join(', ')}.` : ''
    ].filter(Boolean).join(' ');
  }

  openShop(shopId) {
    const shop = getShop(shopId);
    if (!shop) return;
    const keeper = this.npcs.find(n => n.name === shop.keeper);
    if (keeper) this.activeNpc = keeper;
    this.ui.shopName.textContent = shop.name;
    this.ui.shopCopy.textContent = shop.description;
    this._updateCoinUI();
    this.ui.shopWares.replaceChildren();
    shop.wares.forEach(ware => {
      const card = document.createElement('button');
      card.className='town-ware';
      card.disabled=this.coins<ware.cost;
      const copy=document.createElement('span');
      const title=document.createElement('strong'); title.textContent=ware.name;
      const detail=document.createElement('small'); detail.textContent=ware.detail;
      copy.append(title,detail);
      const cost=document.createElement('b'); cost.textContent=`◈ ${ware.cost}`;
      card.append(copy,cost);
      card.addEventListener('click',()=>this._purchase(shop,ware));
      this.ui.shopWares.appendChild(card);
    });
    this._setModal(this.ui.shop);
  }

  _purchase(shop,ware) {
    if(this.coins<ware.cost) return;
    const player=this.game.player;
    if(ware.kind==='heal') player.hp=Math.min(player.maxHp,player.hp+ware.amount);
    else if(ware.kind==='mana') player.mana=Math.min(player.maxMana,player.mana+ware.amount);
    else if(ware.kind==='meal') { player.hp=Math.min(player.maxHp,player.hp+ware.heal); player.mana=Math.min(player.maxMana,player.mana+ware.mana); }
    else if(ware.kind==='rest') { player.hp=player.maxHp; player.mana=player.maxMana; }
    this.coins-=ware.cost;
    writeCoins(this.coins);
    this._updateCoinUI();
    this.game.toast?.(`${ware.name} · ${shop.name}`,1.25);
    this.openShop(shop.id);
  }

  _updateCoinUI() {
    if(this.ui?.coins) this.ui.coins.textContent=`◈ ${this.coins}`;
  }

  _installHooks() {
    const worldUpdate = this.game.world.update.bind(this.game.world);
    this.game.world.update = dt => { worldUpdate(dt); this.update(dt); };

    const spawnEnemy = this.game._spawnEnemy.bind(this.game);
    this.game._spawnEnemy = (x,z,type='briarling') => {
      const enemy = spawnEnemy(x,z,type);
      if (!enemy.isBoss && isTownSafeZone(enemy.position)) {
        enemy.position.z = -Math.max(8,Math.abs(enemy.position.z));
      }
      return enemy;
    };
  }

  update(dt) {
    this.time += dt;
    this.frame++;
    this._updateTownMotion(dt);
    this._updateNpcLife(dt);
    this._protectTown();
    this._awardTownCoins();
    this._updateNearestNpc();
    this._updateNpcMatrices();
  }

  _updateTownMotion(dt) {
    if(this.fountainCrown){ this.fountainCrown.rotation.y+=dt*.45; this.fountainCrown.position.y=2.25+Math.sin(this.time*1.7)*.035; }
    for(const puff of this.smoke){ const u=puff.userData; const t=(this.time*.15+u.phase)%1; puff.position.y=u.baseY+t*1.8; puff.position.x+=Math.sin(this.time*.5+u.phase)*dt*.02; puff.material.opacity=.16*(1-t); puff.scale.setScalar(.7+t*.9); }
  }

  _updateNpcLife(dt) {
    for(const npc of this.npcs){
      if(this.activeNpc?.id===npc.id) {
        const toPlayer=this.game.player.position.clone().sub(npc.position); npc.facing=Math.atan2(toPlayer.x,toPlayer.z); continue;
      }
      if(npc.keeper || npc.route.length<2){
        const player=this.game.player.position;
        const dx=player.x-npc.position.x,dz=player.z-npc.position.z;
        if(dx*dx+dz*dz<22) npc.facing=Math.atan2(dx,dz);
        continue;
      }
      if(npc.pause>0){npc.pause-=dt;continue;}
      const target=npc.route[npc.routeIndex % npc.route.length];
      const dx=target.x-npc.position.x,dz=target.z-npc.position.z;
      const dist=Math.hypot(dx,dz);
      if(dist<.18){npc.routeIndex=(npc.routeIndex+1)%npc.route.length;npc.pause=.8+((npc.index*7+npc.routeIndex*3)%16)/10;continue;}
      npc.facing=Math.atan2(dx,dz);
      const step=Math.min(dist,npc.speed*dt);
      npc.position.x+=dx/dist*step;npc.position.z+=dz/dist*step;
    }
  }

  _protectTown() {
    for(const enemy of this.game.enemies){
      if(enemy.dead || enemy.isBoss) continue;
      if(enemy.position.z>9){ enemy.position.z=9; if(enemy.velocity?.z>0) enemy.velocity.z=0; }
    }
  }

  _awardTownCoins() {
    const kills=this.game.kills||0;
    if(kills<=this.lastKillCount) return;
    this.coins+=Math.min(60,(kills-this.lastKillCount)*6);
    this.lastKillCount=kills;
    writeCoins(this.coins);
    this._updateCoinUI();
  }

  _updateNearestNpc() {
    if(!this.game.started || this.modalOpen){this.ui.interact.classList.add('hidden');this.ui.nameplate.classList.add('hidden');return;}
    const player=this.game.player.position;
    let nearest=null,best=3.6*3.6;
    for(const npc of this.npcs){const dx=npc.position.x-player.x,dz=npc.position.z-player.z,d2=dx*dx+dz*dz;if(d2<best){best=d2;nearest=npc;}}
    this.nearest=nearest;
    if(!nearest){this.ui.interact.classList.add('hidden');this.ui.nameplate.classList.add('hidden');return;}
    this.ui.interact.textContent=`${matchMedia('(pointer: coarse)').matches?'Talk':'E · Talk'} to ${nearest.name}`;
    this.ui.interact.classList.remove('hidden');
    const strong=this.ui.nameplate.querySelector('strong');const span=this.ui.nameplate.querySelector('span');strong.textContent=nearest.name;span.textContent=nearest.role;
    this.ui.nameplate.classList.remove('hidden');
  }
}

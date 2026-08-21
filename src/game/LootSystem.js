import * as THREE from 'three';
import { LootEngine, SLOTS, rarityRank, formatStat, normalizeLegacyItem, clampCombatStats } from './LootCore.js';

const CAPACITY=32;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const safeParse=(value,fallback)=>{try{return JSON.parse(value)??fallback;}catch{return fallback;}};
const slotLabel=slot=>({weapon:'Weapon',armor:'Armor',ring:'Ring',charm:'Charm'}[slot]||slot);
const statOrder=['might','guard','vitality','focus'];

function statRows(item){
  if(!item)return '<div class="loot-empty">Nothing equipped</div>';
  return statOrder.filter(key=>(item.stats?.[key]||0)>0).map(key=>`<span><b>${formatStat(key,item.stats[key]).split(' +')[0]}</b><strong>+${item.stats[key]}</strong></span>`).join('');
}

function buildDropMesh(item){
  const color=new THREE.Color(item.color);
  const group=new THREE.Group();
  const core=new THREE.Mesh(
    new THREE.OctahedronGeometry(.16,0),
    new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:1.9,roughness:.28,metalness:.18,flatShading:true})
  );
  const ring=new THREE.Mesh(
    new THREE.TorusGeometry(.27,.026,6,18),
    new THREE.MeshBasicMaterial({color,transparent:true,opacity:.78,depthWrite:false})
  );
  ring.rotation.x=Math.PI/2;
  const beam=new THREE.Mesh(
    new THREE.PlaneGeometry(.06,rarityRank(item.rarity)>=3?1.9:1.15),
    new THREE.MeshBasicMaterial({color,transparent:true,opacity:rarityRank(item.rarity)>=2?.34:.18,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending})
  );
  beam.position.y=.62; beam.rotation.y=Math.PI/4;
  group.add(core,ring,beam);
  return group;
}

export function installLootSystem(game){
  const engine=new LootEngine({level:game.player.level});
  const v2=safeParse(localStorage.getItem('maples.loot.v2'),null);
  const v1=!v2?safeParse(localStorage.getItem('maples.loot.v1'),{}):{};
  const source=v2||v1||{};
  const inventory=(Array.isArray(source.inventory)?source.inventory:[]).map(normalizeLegacyItem).filter(Boolean).slice(0,CAPACITY);
  for(const item of inventory){ item.score=engine.score(item); item.salvageXp=engine.salvageValue(item); }
  const equipped={weapon:null,armor:null,ring:null,charm:null,...(source.equipped||{})};
  for(const slot of SLOTS) if(!inventory.some(i=>i.id===equipped[slot]&&i.slot===slot))equipped[slot]=null;

  const state={
    inventory,equipped,
    caches:Number.isFinite(source.caches)?source.caches:1,
    ancientCaches:Number.isFinite(source.ancientCaches)?source.ancientCaches:0,
    killMarks:0,panelOpen:false,selectedId:null,filter:'all',sort:'recommended',salvageArmed:false,
  };
  engine.dryStreak=Number.isFinite(source.dryStreak)?source.dryStreak:0;
  const fieldDrops=[];

  const root=document.createElement('div');
  root.id='loot-system';
  root.innerHTML=`
    <button id="loot-toggle" class="loot-toggle" aria-label="Open inventory"><span>✦</span><b>GEAR</b><i id="cache-badge"></i></button>
    <div id="loot-panel" class="loot-panel hidden" role="dialog" aria-modal="true" aria-label="Inventory and relic caches">
      <div class="loot-head"><div><small>WARDEN LOADOUT</small><h2>Relics & Gear</h2></div><button id="loot-close" aria-label="Close inventory">×</button></div>
      <div class="loot-summary" id="loot-summary"></div>
      <div class="cache-row">
        <button id="open-cache" class="cache-card"><span>GLADE CACHE</span><strong id="cache-count">0</strong><small>Combat reward · smart slot bias · Epic bad-luck protection</small></button>
        <button id="open-ancient" class="cache-card ancient"><span>ANCIENT CACHE</span><strong id="ancient-count">0</strong><small>Boss reward · guaranteed Rare+ first relic</small></button>
      </div>
      <div id="loot-reveal" class="loot-reveal"></div>
      <div class="inventory-toolbar">
        <div class="filter-chips" role="group" aria-label="Inventory filters">
          ${['all',...SLOTS,'favorites'].map(key=>`<button data-filter="${key}" class="${key==='all'?'active':''}">${key==='all'?'All':key==='favorites'?'★ Favorites':slotLabel(key)}</button>`).join('')}
        </div>
        <select id="loot-sort" aria-label="Sort inventory"><option value="recommended">Recommended</option><option value="rarity">Rarity</option><option value="newest">Newest</option></select>
      </div>
      <div class="equipment-grid">
        <section><div class="section-title"><span>EQUIPPED</span><small>4-slot loadout</small></div><div id="equipped-list" class="equipped-list"></div></section>
        <section class="inventory-section"><div class="section-title"><span>INVENTORY</span><small id="inventory-count"></small></div><div id="inventory-list" class="inventory-list"></div></section>
        <aside id="loot-detail" class="loot-detail"></aside>
      </div>
      <div class="inventory-footer"><button id="salvage-junk" class="salvage-junk">Salvage Common + Uncommon</button><small>Favorites and equipped items are always protected.</small></div>
    </div>`;
  document.querySelector('#hud').appendChild(root);

  const $=s=>root.querySelector(s);
  const ui={panel:$('#loot-panel'),toggle:$('#loot-toggle'),close:$('#loot-close'),badge:$('#cache-badge'),cache:$('#cache-count'),ancient:$('#ancient-count'),reveal:$('#loot-reveal'),equipped:$('#equipped-list'),inventory:$('#inventory-list'),count:$('#inventory-count'),summary:$('#loot-summary'),detail:$('#loot-detail'),sort:$('#loot-sort'),salvageJunk:$('#salvage-junk')};
  const equippedItem=slot=>state.inventory.find(i=>i.id===state.equipped[slot])||null;
  const selectedItem=()=>state.inventory.find(i=>i.id===state.selectedId)||null;
  const freeSlots=()=>CAPACITY-state.inventory.length;

  const persist=()=>localStorage.setItem('maples.loot.v2',JSON.stringify({
    inventory:state.inventory,equipped:state.equipped,caches:state.caches,ancientCaches:state.ancientCaches,dryStreak:engine.dryStreak,
  }));

  function combatStats(){
    const totals={might:0,guard:0,vitality:0,focus:0};
    for(const slot of SLOTS){
      const item=equippedItem(slot); if(!item)continue;
      for(const key of statOrder)totals[key]+=item.stats?.[key]||0;
    }
    return clampCombatStats({
      damageMultiplier:1+totals.might/180,
      defenseMultiplier:1-totals.guard/240,
      bonusHealth:totals.vitality,
      bonusMana:totals.focus,
    });
  }

  function applyPlayerStats(){
    const s=combatStats();
    const hpRatio=game.player.maxHp?game.player.hp/game.player.maxHp:1;
    const manaRatio=game.player.maxMana?game.player.mana/game.player.maxMana:1;
    const baseHp=100+Math.max(0,game.player.level-7)*12;
    const baseMana=100+Math.max(0,game.player.level-7)*7;
    game.player.maxHp=baseHp+s.bonusHealth;
    game.player.maxMana=baseMana+s.bonusMana;
    game.player.hp=clamp(game.player.maxHp*hpRatio,Math.min(1,game.player.maxHp),game.player.maxHp);
    game.player.mana=clamp(game.player.maxMana*manaRatio,0,game.player.maxMana);
    game.lootCombatStats=s;
  }

  function applyVisuals(){
    const model=game.player.assetVisual; if(!model)return;
    const weapon=equippedItem('weapon'), armor=equippedItem('armor');
    model.traverse(node=>{
      const name=node.name||'';
      if(name==='1H_Sword')node.visible=!weapon||weapon.archetype!=='greatsword';
      if(name==='2H_Sword')node.visible=weapon?.archetype==='greatsword';
      if(!node.material)return;
      const mats=Array.isArray(node.material)?node.material:[node.material];
      mats.forEach(mat=>{
        if(!mat.color)return;
        if(!mat.userData.lootBaseColor)mat.userData.lootBaseColor=`#${mat.color.getHexString()}`;
        mat.color.set(mat.userData.lootBaseColor);
        const target=/Sword/i.test(name)?weapon:/Helmet|Cape|Shield|Armor|Plate|Knight/i.test(name)?armor:null;
        if(!target)return;
        mat.color.lerp(new THREE.Color(target.color),clamp(.12+rarityRank(target.rarity)*.055,.12,.34));
        if('metalness'in mat)mat.metalness=clamp((mat.metalness||.3)+rarityRank(target.rarity)*.04,0,1);
      });
    });
  }

  function comparison(item){
    const peer=equippedItem(item.slot);
    return Math.round(engine.score(item)-engine.score(peer));
  }

  function renderItem(item,{equipped=false}={}){
    const delta=comparison(item);
    const active=item.id===state.selectedId?' selected':'';
    return `<button class="loot-item ${equipped?'is-equipped':''}${active}" data-id="${item.id}" style="--rarity:${item.color}" aria-label="${item.rarityLabel} ${item.name}">
      <i>${item.symbol}</i><div class="loot-item-main"><small>${item.rarityLabel} · Lv ${item.level} · ${slotLabel(item.slot)}</small><strong>${item.name}</strong><div class="loot-stats">${statRows(item)}</div></div>
      <em class="loot-score ${delta>0?'up':delta<0?'down':''}">${equipped?'EQUIPPED':delta===0?'≈':delta>0?`+${delta}`:delta}</em>${item.favorite?'<span class="favorite-mark">★</span>':''}
    </button>`;
  }

  function sortItems(items){
    return items.sort((a,b)=>{
      if(state.sort==='newest')return (b.acquiredAt||0)-(a.acquiredAt||0);
      if(state.sort==='rarity')return rarityRank(b.rarity)-rarityRank(a.rarity)||engine.score(b)-engine.score(a);
      const ae=state.equipped[a.slot]===a.id,be=state.equipped[b.slot]===b.id;
      return Number(be)-Number(ae)||Math.sign(comparison(b))-Math.sign(comparison(a))||rarityRank(b.rarity)-rarityRank(a.rarity)||engine.score(b)-engine.score(a);
    });
  }

  function renderDetail(){
    const item=selectedItem();
    if(!item){ui.detail.innerHTML='<div class="loot-empty detail-empty">Select an item to compare, favorite, equip, or salvage it.</div>';return;}
    const equipped=state.equipped[item.slot]===item.id;
    const delta=comparison(item);
    ui.detail.innerHTML=`<div class="detail-card" style="--rarity:${item.color}"><small>${item.symbol} ${item.rarityLabel.toUpperCase()} · ${slotLabel(item.slot).toUpperCase()}</small><h3>${item.name}</h3><div class="detail-compare ${delta>0?'up':delta<0?'down':''}">${equipped?'Currently equipped':delta===0?'Comparable to equipped':delta>0?`+${delta} loadout score`:`${delta} loadout score`}</div><div class="loot-stats detail-stats">${statRows(item)}</div><div class="detail-actions"><button data-action="equip" ${equipped?'disabled':''}>${equipped?'Equipped':'Equip'}</button><button data-action="favorite">${item.favorite?'★ Favorited':'☆ Favorite'}</button><button data-action="salvage" ${equipped?'disabled':''}>Salvage +${item.salvageXp} XP</button></div></div>`;
  }

  function render(){
    const stats=combatStats();
    ui.cache.textContent=state.caches; ui.ancient.textContent=state.ancientCaches;
    const cacheTotal=state.caches+state.ancientCaches; ui.badge.textContent=cacheTotal||''; ui.badge.classList.toggle('empty',!cacheTotal);
    ui.count.textContent=`${state.inventory.length} / ${CAPACITY}`;
    ui.summary.innerHTML=`<span><b>+${Math.round((stats.damageMultiplier-1)*100)}%</b> damage</span><span><b>${Math.round((1-stats.defenseMultiplier)*100)}%</b> reduction</span><span><b>+${stats.bonusHealth}</b> health</span><span><b>+${stats.bonusMana}</b> mana</span>`;
    ui.equipped.innerHTML=SLOTS.map(slot=>`<div class="equip-slot"><b>${slotLabel(slot).toUpperCase()}</b>${equippedItem(slot)?renderItem(equippedItem(slot),{equipped:true}):'<div class="loot-empty">Empty slot</div>'}</div>`).join('');
    let visible=[...state.inventory];
    if(state.filter==='favorites')visible=visible.filter(item=>item.favorite);
    else if(SLOTS.includes(state.filter))visible=visible.filter(item=>item.slot===state.filter);
    visible=sortItems(visible);
    ui.inventory.innerHTML=visible.length?visible.map(item=>renderItem(item)).join(''):'<div class="loot-empty inventory-empty">No items in this view.</div>';
    root.querySelectorAll('[data-filter]').forEach(btn=>btn.classList.toggle('active',btn.dataset.filter===state.filter));
    const junk=state.inventory.filter(item=>!item.favorite&&!Object.values(state.equipped).includes(item.id)&&rarityRank(item.rarity)<=1);
    ui.salvageJunk.disabled=!junk.length;
    ui.salvageJunk.textContent=state.salvageArmed?`Tap again: salvage ${junk.length} items`:junk.length?`Salvage ${junk.length} Common + Uncommon`:'No junk to salvage';
    renderDetail();
  }

  function setPanel(open){
    state.panelOpen=open; state.salvageArmed=false; ui.panel.classList.toggle('hidden',!open); ui.toggle.classList.toggle('active',open);
    if(open)document.exitPointerLock?.();
    else if(game.started&&!matchMedia('(pointer: coarse)').matches)game.canvas.requestPointerLock?.();
    render();
  }

  function select(id){ state.selectedId=id; state.salvageArmed=false; render(); }
  function equip(id){
    const item=state.inventory.find(i=>i.id===id); if(!item)return;
    state.equipped[item.slot]=item.id; applyPlayerStats(); applyVisuals(); persist(); render();
    game.toast(`${item.symbol} ${item.rarityLabel.toUpperCase()} ${slotLabel(item.slot).toUpperCase()} EQUIPPED`,1.15);
  }
  function toggleFavorite(id){ const item=state.inventory.find(i=>i.id===id);if(!item)return;item.favorite=!item.favorite;persist();render(); }

  function salvage(ids){
    const protectedIds=new Set(Object.values(state.equipped));
    const targets=state.inventory.filter(item=>ids.includes(item.id)&&!item.favorite&&!protectedIds.has(item.id));
    if(!targets.length)return;
    const xp=targets.reduce((sum,item)=>sum+engine.salvageValue(item),0);
    const targetIds=new Set(targets.map(i=>i.id));
    state.inventory=state.inventory.filter(item=>!targetIds.has(item.id));
    if(targetIds.has(state.selectedId))state.selectedId=null;
    const leveled=game.player.addXp(xp); if(leveled)applyPlayerStats();
    persist();render();game.toast(`SALVAGED ${targets.length} · +${xp} XP`,1.25);
  }

  function smartSlot(){
    const empty=SLOTS.filter(slot=>!equippedItem(slot));
    if(empty.length&&Math.random()<.72)return empty[Math.floor(Math.random()*empty.length)];
    const ranked=SLOTS.map(slot=>[slot,engine.score(equippedItem(slot))]).sort((a,b)=>a[1]-b[1]);
    return Math.random()<.5?ranked[0][0]:null;
  }

  function addItems(items,{reveal=true}={}){
    if(items.length>freeSlots())return false;
    for(const item of items)state.inventory.push(item);
    state.selectedId=items[0]?.id||state.selectedId;
    if(reveal){
      ui.reveal.innerHTML=items.map(item=>`<div class="reveal-card" style="--rarity:${item.color}"><small>${item.symbol} ${item.rarityLabel.toUpperCase()} ${slotLabel(item.slot).toUpperCase()}</small><strong>${item.name}</strong><div class="loot-stats">${statRows(item)}</div><button data-equip="${item.id}">Equip now</button></div>`).join('');
      ui.reveal.classList.remove('pop');void ui.reveal.offsetWidth;ui.reveal.classList.add('pop');
    }
    persist();render();return true;
  }

  function openCache(kind){
    const count=kind==='ancient'?state.ancientCaches:state.caches; const needed=kind==='ancient'?2:1;
    if(count<=0)return;
    if(freeSlots()<needed){game.toast(`INVENTORY FULL · ${needed} FREE SLOT${needed>1?'S':''} NEEDED`,1.5);return;}
    engine.level=game.player.level;
    const drops=engine.openCache(kind,{preferredSlot:smartSlot()});
    if(kind==='ancient')state.ancientCaches--;else state.caches--;
    addItems(drops);
    playLootAudio(drops[0]);
    if(drops.some(i=>rarityRank(i.rarity)>=3))game.fx.levelUp(game.player.position);
    game.toast(`${drops[0].symbol} ${drops[0].rarityLabel.toUpperCase()} RELIC DISCOVERED`,1.35);
  }

  function playLootAudio(item){
    game.audio.pickup();
    const rank=rarityRank(item.rarity);
    if(rank>=2){game.audio.tone(520+rank*80,.12,'sine',.045,180);setTimeout(()=>game.audio.tone(720+rank*90,.14,'triangle',.035,150),65);}
  }

  function spawnFieldDrop(position,{minimum='common',boosted=false}={}){
    if(fieldDrops.length>=8)return;
    engine.level=game.player.level;
    const item=engine.generate({minimum,boosted,slot:smartSlot()});
    const mesh=buildDropMesh(item); mesh.position.copy(position).add(new THREE.Vector3((Math.random()-.5)*.7,.35,(Math.random()-.5)*.7)); game.scene.add(mesh);
    const label=document.createElement('div');label.className='field-loot-label';label.style.setProperty('--rarity',item.color);label.innerHTML=`<b>${item.symbol} ${item.name}</b><small>${item.rarityLabel} · ${slotLabel(item.slot)}</small>`;document.querySelector('#damage-layer')?.appendChild(label);
    fieldDrops.push({item,mesh,label,age:0,phase:Math.random()*Math.PI*2,fullToastAt:0});
  }

  function updateFieldDrops(dt){
    for(let i=fieldDrops.length-1;i>=0;i--){
      const drop=fieldDrops[i];drop.age+=dt;drop.mesh.rotation.y+=dt*1.8;
      drop.mesh.position.y+=Math.sin(drop.age*3.4+drop.phase)*dt*.055;
      const target=game.player.position.clone().add(new THREE.Vector3(0,.75,0));const to=target.sub(drop.mesh.position);const d=to.length();
      if(drop.age>.32&&d<4.8&&freeSlots()>0)drop.mesh.position.addScaledVector(to.normalize(),dt*(2.6+Math.max(0,4.8-d)*1.4));
      if(drop.label){
        const p=drop.mesh.position.clone().add(new THREE.Vector3(0,.68,0)).project(game.camera);
        const visible=p.z<1&&Math.abs(p.x)<1.2&&Math.abs(p.y)<1.2;drop.label.style.display=visible?'block':'none';
        if(visible){drop.label.style.left=`${(p.x*.5+.5)*innerWidth}px`;drop.label.style.top=`${(-p.y*.5+.5)*innerHeight}px`;}
      }
      if(d<.58){
        if(freeSlots()<=0){if(drop.age-drop.fullToastAt>1.5){drop.fullToastAt=drop.age;game.toast('INVENTORY FULL · Gear remains on the ground',1.2);}continue;}
        state.inventory.push(drop.item);state.selectedId=drop.item.id;persist();render();playLootAudio(drop.item);
        game.toast(`${drop.item.symbol} ${drop.item.rarityLabel.toUpperCase()} ${slotLabel(drop.item.slot).toUpperCase()} FOUND`,1.2);
        game.scene.remove(drop.mesh);drop.mesh.traverse(obj=>{obj.geometry?.dispose?.();if(obj.material){const mats=Array.isArray(obj.material)?obj.material:[obj.material];mats.forEach(m=>m.dispose?.());}});drop.label?.remove();fieldDrops.splice(i,1);
      }
    }
  }

  ui.toggle.addEventListener('click',()=>setPanel(!state.panelOpen));ui.close.addEventListener('click',()=>setPanel(false));
  $('#open-cache').addEventListener('click',()=>openCache('glade'));$('#open-ancient').addEventListener('click',()=>openCache('ancient'));
  ui.sort.addEventListener('change',()=>{state.sort=ui.sort.value;render();});
  root.addEventListener('click',e=>{
    const filter=e.target.closest('[data-filter]')?.dataset.filter;if(filter){state.filter=filter;state.salvageArmed=false;render();return;}
    const equipId=e.target.closest('[data-equip]')?.dataset.equip;if(equipId){equip(equipId);return;}
    const itemId=e.target.closest('.loot-item')?.dataset.id;if(itemId){select(itemId);return;}
    const action=e.target.closest('[data-action]')?.dataset.action;if(!action)return;const item=selectedItem();if(!item)return;
    if(action==='equip')equip(item.id);else if(action==='favorite')toggleFavorite(item.id);else if(action==='salvage')salvage([item.id]);
  });
  ui.salvageJunk.addEventListener('click',()=>{
    const junk=state.inventory.filter(item=>!item.favorite&&!Object.values(state.equipped).includes(item.id)&&rarityRank(item.rarity)<=1);
    if(!junk.length)return;if(!state.salvageArmed){state.salvageArmed=true;render();return;}state.salvageArmed=false;salvage(junk.map(i=>i.id));
  });
  addEventListener('keydown',e=>{
    if(e.code==='KeyI'&&!e.repeat){e.preventDefault();setPanel(!state.panelOpen);}
    else if(e.code==='Escape'&&state.panelOpen){e.preventDefault();setPanel(false);}
  });

  const originalSpawnEnemy=game._spawnEnemy.bind(game);
  const wrapEnemy=enemy=>{
    if(!enemy||enemy.userDataLootWrapped)return enemy;enemy.userDataLootWrapped=true;
    const takeHit=enemy.takeHit.bind(enemy);enemy.takeHit=(amount,...rest)=>takeHit(Math.round(amount*(game.lootCombatStats?.damageMultiplier||1)),...rest);return enemy;
  };
  game._spawnEnemy=(...args)=>wrapEnemy(originalSpawnEnemy(...args));for(const enemy of game.enemies)wrapEnemy(enemy);

  const takeDamage=game.player.takeDamage.bind(game.player);
  game.player.takeDamage=(amount,...rest)=>takeDamage(Math.max(1,Math.round(amount*(game.lootCombatStats?.defenseMultiplier||1))),...rest);

  const spawnEssence=game._spawnEssence.bind(game);
  game._spawnEssence=(position,reward)=>{spawnEssence(position,reward);if(Math.random()<.32)spawnFieldDrop(position);};
  const updatePickups=game._updatePickups.bind(game);game._updatePickups=dt=>{updatePickups(dt);updateFieldDrops(dt);};

  const updateEnemies=game._updateEnemies.bind(game);
  game._updateEnemies=(dt,realDt)=>{
    const beforeKills=game.kills;updateEnemies(dt,realDt);const gained=Math.max(0,game.kills-beforeKills);
    if(gained){state.killMarks+=gained;while(state.killMarks>=4){state.killMarks-=4;state.caches++;game.toast('GLADE CACHE EARNED · Press I',1.35);}persist();render();}
    if(game.boss?.dead&&!game.boss.userDataLootCacheGranted){game.boss.userDataLootCacheGranted=true;state.ancientCaches++;persist();render();game.toast('ANCIENT CACHE EARNED · Press I',1.8);}
  };

  const visualPoll=setInterval(()=>{if(game.player.assetVisual){clearInterval(visualPoll);applyVisuals();}},150);
  applyPlayerStats();render();persist();
  game.loot={engine,state,open:()=>setPanel(true),equip,openCache,spawnFieldDrop,fieldDrops};
  return game.loot;
}

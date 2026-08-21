export const RARITIES = [
  { key:'common', label:'Common', weight:50, stat:1.00, affixes:1, color:'#c8d2ca', symbol:'◇', salvage:5 },
  { key:'uncommon', label:'Uncommon', weight:28, stat:1.13, affixes:1, color:'#7fe2a3', symbol:'✦', salvage:8 },
  { key:'rare', label:'Rare', weight:14, stat:1.32, affixes:2, color:'#73b8ff', symbol:'◆', salvage:13 },
  { key:'epic', label:'Epic', weight:6, stat:1.58, affixes:3, color:'#c493ff', symbol:'✧', salvage:21 },
  { key:'legendary', label:'Legendary', weight:2, stat:1.92, affixes:4, color:'#ffbf63', symbol:'★', salvage:34 },
];

export const SLOTS = ['weapon','armor','ring','charm'];

const BASES = {
  weapon: [
    ['longsword','Longsword',1.00], ['greatsword','Greatsword',1.12], ['runeblade','Runeblade',1.06],
  ],
  armor: [
    ['wardplate','Warden Plate',1.00], ['briarplate','Briar Plate',1.08], ['lumenmail','Lumen Mail',.96],
  ],
  ring: [
    ['signet','Signet',1.00], ['thornband','Thornband',1.04], ['sunring','Sun Ring',.98],
  ],
  charm: [
    ['reliquary','Reliquary',1.00], ['emberseal','Ember Seal',1.05], ['moonward','Moonward',.98],
  ],
};

const PREFIXES = ['Briar','Ember','Lumen','Oath','Moon','Ash','Thorn','Dawn'];
const SUFFIXES = ['of the Glade','of Resolve','of Cinders','of Echoes','of the Warden','of First Light'];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const pick=(arr,rng)=>arr[Math.min(arr.length-1,Math.floor(rng()*arr.length))];

export function rarityRank(key){ return Math.max(0,RARITIES.findIndex(r=>r.key===key)); }
export function rarityFor(key){ return RARITIES[rarityRank(key)] || RARITIES[0]; }
export function formatStat(key,value){
  const labels={might:'Might',guard:'Guard',vitality:'Vitality',focus:'Focus'};
  return `${labels[key]||key} +${value}`;
}

function statPool(slot, level, base, rng){
  const roll=(min,max)=>Math.round(min+rng()*(max-min));
  if(slot==='weapon') return [['might',roll(3+level*.32,5+level*.52)],['focus',roll(2,4+level*.28)],['vitality',roll(2,3+level*.2)],['guard',roll(1,2+level*.16)]];
  if(slot==='armor') return [['guard',roll(3+level*.28,5+level*.48)],['vitality',roll(5+level*.65,8+level*.92)],['focus',roll(2,3+level*.22)],['might',roll(1,2+level*.15)]];
  if(slot==='ring') return [['might',roll(2+level*.18,4+level*.34)],['guard',roll(2+level*.16,4+level*.30)],['focus',roll(3+level*.25,5+level*.4)],['vitality',roll(3+level*.3,5+level*.5)]];
  return [['focus',roll(4+level*.38,7+level*.62)],['vitality',roll(4+level*.42,7+level*.7)],['might',roll(2+level*.18,4+level*.32)],['guard',roll(1+level*.12,3+level*.22)]];
}

export class LootEngine {
  constructor({ rng=Math.random, level=7, pityAt=6 }={}){
    this.rng=rng; this.level=level; this.pityAt=pityAt; this.dryStreak=0; this.serial=0;
  }

  rollRarity({ minimum='common', boosted=false }={}){
    const minimumRank=rarityRank(minimum);
    const pityFloor=this.dryStreak>=this.pityAt?3:minimumRank;
    const floor=Math.max(minimumRank,pityFloor);
    const eligible=RARITIES.slice(floor);
    const weights=eligible.map(r=>r.weight*(boosted && rarityRank(r.key)>=2?1.65:1));
    const total=weights.reduce((sum,n)=>sum+n,0);
    let roll=this.rng()*total;
    let chosen=eligible[eligible.length-1];
    for(let i=0;i<eligible.length;i++){ roll-=weights[i]; if(roll<=0){chosen=eligible[i];break;} }
    if(rarityRank(chosen.key)>=3)this.dryStreak=0; else this.dryStreak++;
    return chosen;
  }

  generate({ level=this.level, minimum='common', boosted=false, slot=null }={}){
    const targetSlot=SLOTS.includes(slot)?slot:pick(SLOTS,this.rng);
    const rarity=this.rollRarity({minimum,boosted});
    const [archetype,baseName,baseScale]=pick(BASES[targetSlot],this.rng);
    const itemLevel=Math.max(1,Math.round(level+(this.rng()-.42)*2));
    const pool=statPool(targetSlot,itemLevel,baseScale,this.rng);
    const stats={might:0,guard:0,vitality:0,focus:0};

    const primary=targetSlot==='weapon'?'might':targetSlot==='armor'?'guard':targetSlot==='ring'?'might':'focus';
    const primaryBase=Math.max(1,Math.round((5+itemLevel*.7)*rarity.stat*baseScale));
    stats[primary]=primaryBase;

    const affixes=[];
    while(affixes.length<rarity.affixes && pool.length){
      const index=Math.floor(this.rng()*pool.length);
      const [stat,raw]=pool.splice(index,1)[0];
      const value=Math.max(1,Math.round(raw*rarity.stat));
      stats[stat]+=value; affixes.push({stat,value});
    }

    const item={
      id:`loot-${Date.now().toString(36)}-${(++this.serial).toString(36)}`,
      name:`${pick(PREFIXES,this.rng)} ${baseName} ${pick(SUFFIXES,this.rng)}`,
      slot:targetSlot, archetype, level:itemLevel,
      rarity:rarity.key, rarityLabel:rarity.label, color:rarity.color, symbol:rarity.symbol,
      stats, affixes, favorite:false, acquiredAt:Date.now()+this.serial,
    };
    item.score=this.score(item);
    item.salvageXp=this.salvageValue(item);
    return item;
  }

  openCache(kind='glade', { preferredSlot=null }={}){
    if(kind==='ancient') return [
      this.generate({minimum:'rare',boosted:true,slot:preferredSlot}),
      this.generate({minimum:'uncommon',boosted:true}),
    ];
    return [this.generate({boosted:true,slot:preferredSlot})];
  }

  score(item){
    if(!item)return 0;
    const s=item.stats||{};
    return (s.might||0)*3.2+(s.guard||0)*2.9+(s.vitality||0)*.72+(s.focus||0)*1.15;
  }

  salvageValue(item){
    if(!item)return 0;
    const rarity=rarityFor(item.rarity);
    return Math.max(1,Math.round(rarity.salvage+(item.level||1)*1.4));
  }
}

export function normalizeLegacyItem(item){
  if(!item || typeof item!=='object')return null;
  if(item.stats && ['might','guard','vitality','focus'].some(k=>Number.isFinite(item.stats[k])))return item;
  const old=item.stats||{};
  const slot=SLOTS.includes(item.slot)?item.slot:(item.slot==='armor'?'armor':'weapon');
  const stats={might:0,guard:0,vitality:0,focus:0};
  stats.might=Math.max(0,Math.round((old.power||0)*.55));
  stats.guard=Math.max(0,Math.round((old.defense||0)*.55));
  stats.vitality=Math.max(0,Math.round(old.health||0));
  stats.focus=Math.max(0,Math.round(old.mana||0));
  const rarity=rarityFor(item.rarity);
  return {...item,slot,stats,symbol:rarity.symbol,color:item.color||rarity.color,rarityLabel:item.rarityLabel||rarity.label,favorite:Boolean(item.favorite),acquiredAt:item.acquiredAt||Date.now()};
}

export function clampCombatStats(stats){
  return {
    damageMultiplier:clamp(stats.damageMultiplier||1,1,1.85),
    defenseMultiplier:clamp(stats.defenseMultiplier||1,.58,1),
    bonusHealth:Math.max(0,Math.round(stats.bonusHealth||0)),
    bonusMana:Math.max(0,Math.round(stats.bonusMana||0)),
  };
}

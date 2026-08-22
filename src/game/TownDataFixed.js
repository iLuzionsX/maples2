export const TOWN_NAME = 'Lumenwood Crossing';

export const SHOPS = [
  { id:'anvil', name:'Ember & Anvil', keeper:'Ilyra', role:'blacksmith', position:[-11.8,18.5], accent:0xc96f4b, description:'A copper-roofed forge where wardens mend armor before entering the Briarwild.', wares:[
    {id:'field-repair',name:'Field Repair',cost:12,kind:'heal',amount:24,detail:'Restore 24 health.'},
    {id:'full-repair',name:'Warden Refit',cost:28,kind:'heal',amount:60,detail:'Restore 60 health.'}
  ]},
  { id:'remedies', name:'Moonwell Remedies', keeper:'Orin', role:'apothecary', position:[11.8,18.2], accent:0x79d4ac, description:'Herbs, tonics and old forest remedies hang beneath a blue-green awning.', wares:[
    {id:'briar-tonic',name:'Briar Tonic',cost:14,kind:'heal',amount:42,detail:'Restore 42 health.'},
    {id:'moonwater',name:'Moonwater Vial',cost:15,kind:'mana',amount:48,detail:'Restore 48 mana.'}
  ]},
  { id:'provisions', name:'Foxglove Provisions', keeper:'Maeve', role:'provisioner', position:[-11.8,25.7], accent:0xd3a85b, description:'Warm bread, dried berries, rope and road supplies crowd every shelf.', wares:[
    {id:'honey-loaf',name:'Honey Loaf',cost:9,kind:'meal',heal:22,mana:12,detail:'Restore 22 health and 12 mana.'},
    {id:'warden-lunch',name:'Warden Lunch',cost:18,kind:'meal',heal:40,mana:25,detail:'Restore 40 health and 25 mana.'}
  ]},
  { id:'inn', name:"Wayfarer's Rest", keeper:'Bram', role:'innkeeper', position:[11.8,25.5], accent:0xb98563, description:'A lantern-bright inn with a hearth large enough to dry a soaked adventuring party.', wares:[
    {id:'supper',name:'Hot Supper',cost:14,kind:'meal',heal:30,mana:30,detail:'Restore 30 health and 30 mana.'},
    {id:'rest',name:'Room & Full Rest',cost:30,kind:'rest',detail:'Fully restore health and mana.'}
  ]},
  { id:'arcanum', name:'Starling Arcanum', keeper:'Sella', role:'arcanist', position:[-6.4,30.5], accent:0x8aa6ee, description:'A tiny rune shop humming with bottled starlight and warding charms.', wares:[
    {id:'starwater',name:'Starwater Flask',cost:16,kind:'mana',amount:58,detail:'Restore 58 mana.'},
    {id:'deep-starwater',name:'Deep Starwater',cost:29,kind:'mana',amount:100,detail:'Fully restore mana.'}
  ]},
  { id:'outfitter', name:'Moss & Thread', keeper:'Nessa', role:'outfitter', position:[6.4,30.5], accent:0x9a9f69, description:'Travel cloaks, stitched packs and rainproof wrappings made for the old forest roads.', wares:[
    {id:'trail-tea',name:'Trail Tea',cost:11,kind:'meal',heal:16,mana:28,detail:'Restore 16 health and 28 mana.'},
    {id:'camp-kit',name:'Camp Kit',cost:24,kind:'meal',heal:48,mana:18,detail:'Restore 48 health and 18 mana.'}
  ]}
];

const NPC_DEFS = [
  ['Ilyra','Blacksmith','Practical, dry-witted, fiercely protective of young wardens.','The forge, local guards, damaged gear, and patrol rumors.'],
  ['Orin','Apothecary','Gentle, precise, fascinated by strange plants.','Herbs, Briarbound corruption, tonics, and forest ecology.'],
  ['Maeve','Provisioner','Fast-talking, warm, observant, remembers everyone who passes through.','Travelers, trade gossip, road conditions, and ordinary town life.'],
  ['Bram','Innkeeper','Booming hospitality hiding a careful judge of character.','Visitors, old stories, celebrations, and rumors overheard at the hearth.'],
  ['Sella','Arcanist','Curious, elegant, slightly absent-minded when discussing magic.','Runes, old wards, Thornmaw legends, and Lumenwood magic.'],
  ['Nessa','Outfitter','Unflappable, witty, values preparation over bravado.','Trails, weather, packs, clothing, and what scouts actually need.'],
  ['Darran','Gate Warden','Disciplined, plainspoken, suspicious of trouble but kind to townsfolk.','Patrol routes, gate security, monster sightings, and the southern glade.'],
  ['Elowen','Street Bard','Playful, theatrical, collects stories faster than coins.','Songs, local legends, romances, embarrassments, and festival traditions.'],
  ['Hobb','Gardener','Patient, cheerful, talks to seedlings as if they answer.','Gardens, weather signs, bees, mushrooms, and town gossip.'],
  ['Fenn','Carpenter','Measured, meticulous, quietly proud of the town.','Buildings, repairs, timber, old foundations, and expansion plans.'],
  ['Aster','Pilgrim','Thoughtful, soft-spoken, attentive to old shrines.','Roadside shrines, travelers, regional history, and local customs.'],
  ['Cora','Baker','Energetic, generous, incapable of whispering.','Food, morning gossip, deliveries, market prices, and town families.'],
  ['Vale','Scout','Laconic, sharp-eyed, more comfortable outdoors than indoors.','Tracks, monster movement, hidden paths, and danger beyond the gate.'],
  ['Rook','Mason','Gruff, funny when least expected, proud of durable work.','Stonework, town walls, ruins, quarries, and old tunnels.'],
  ['Tovin','Courier','Restless, optimistic, always halfway to the next errand.','Messages, nearby settlements, road delays, and parcels.'],
  ['Pell','Fisher','Relaxed, superstitious, tells stories that improve every retelling.','Streams, fish, odd lights in the reeds, and weather.' ]
];

const keeperShop = new Map(SHOPS.map(shop => [shop.keeper, shop.id]));
export const NPCS = NPC_DEFS.map(([name,role,personality,knowledge],index)=>({
  id:name.toLowerCase(),name,role,personality,knowledge,shopId:keeperShop.get(name)||null,
  color:[0x4f7868,0x8f5e54,0x596c87,0x7e684e,0x665b86,0x6f7651][index%6]
}));

export const NPC_PLACEMENTS = [
  {id:'ilyra',position:[-8.8,18.4],keeper:true},{id:'orin',position:[8.8,18.2],keeper:true},
  {id:'maeve',position:[-8.8,25.7],keeper:true},{id:'bram',position:[8.8,25.5],keeper:true},
  {id:'sella',position:[-6.4,27.8],keeper:true},{id:'nessa',position:[6.4,27.8],keeper:true},
  {id:'darran',position:[-2.4,12.2],route:[[-2.4,12.2],[2.4,12.2],[2.4,14.1],[-2.4,14.1]]},
  {id:'elowen',position:[2,21.2],route:[[2,21.2],[-1.4,22],[1.2,23.2]]},
  {id:'hobb',position:[-5,22.8],route:[[-5,22.8],[-6.2,24.2],[-4.4,25.2]]},
  {id:'fenn',position:[5.8,16.2],route:[[5.8,16.2],[3.8,18],[6,19.3]]},
  {id:'aster',position:[0,28.2],route:[[0,28.2],[-2.8,26.6],[2.8,26.6]]},
  {id:'cora',position:[-2.4,19.1],route:[[-2.4,19.1],[-4,20.5],[-2.2,22.2]]},
  {id:'vale',position:[3.5,14.8],route:[[3.5,14.8],[6.2,15.2],[5.4,17.3]]},
  {id:'rook',position:[-6.4,15.7],route:[[-6.4,15.7],[-4.9,17.4],[-7,18.7]]},
  {id:'tovin',position:[.2,16.7],route:[[.2,16.7],[4.4,20.2],[0,24],[-4.4,20.2]]},
  {id:'pell',position:[4.6,24.1],route:[[4.6,24.1],[5.8,22.6],[3.6,21.7]]}
];

export const TOWN_FACTS = [
  'Lumenwood Crossing is the last safe settlement before the Briarwild.',
  'The southern gate opens toward the Sunken Glade, where the Briarbound have gathered.',
  'The central plaza is Lantern Square and its old well glows faintly after sunset.',
  'Six businesses ring the square: a forge, apothecary, provisions shop, inn, arcanum, and outfitter.',
  'NPCs may share rumors and flavor, but cannot grant mechanical rewards unless the game UI actually provides them.'
];

export const FALLBACK_LINES = {
  ilyra:['Hold still, Warden. I can hear that armor complaining from here.','Steel remembers every bad decision. Luckily, it can be persuaded to forget.'],
  orin:['The moonmint is flowering early. The forest is trying to tell us something.','If the briars scratch you, clean the wound before you start telling heroic stories about it.'],
  maeve:['Road dust on your boots and that look in your eye—yes, I have supplies.','Buy before dusk. After dusk, Bram buys half my bread and calls it hospitality.'],
  bram:['A hot meal first. Heroics are easier when your hands stop shaking.','Every traveler has a story. The clever ones live long enough to revise it.'],
  sella:['The wards hummed when you crossed the square. Interesting. Slightly alarming, but interesting.','Magic is mostly patience, Rowan. The sparks are just how it shows off.'],
  nessa:['A brave traveler with wet socks is just a miserable traveler. Prepare properly.','Good cloth will not win a fight, but bad cloth can absolutely lose one.'],
  darran:['South gate is clear for now. I would like to keep the “for now” part boring.','If Vale raises two fingers, we close the gate. Three means run first, ask later.'],
  elowen:['I have already written a verse about you. It improves considerably if you survive.','Lantern Square has excellent acoustics and terrible critics.'],
  hobb:['Mind the blue flowers. They survived three winters and one courier.','The soil near the south wall tastes wrong. No, I will not explain how I know.'],
  fenn:['That beam has another fifty years in it. Sixty if Rook stops leaning on it.','A town is a promise made out of timber, stone, and repairs.'],
  aster:['The old road feels quieter when people still greet one another.','There are shrines older than these walls. Some are best visited without boasting.'],
  cora:['If you are saving the world, take a roll. Saving things is hungry work.','Maeve says my cinnamon is too expensive. Maeve is wrong.'],
  vale:['Tracks doubled beyond the birches. Something is pushing the small beasts inward.','Wind is from the south. If you smell iron, turn back.'],
  rook:['Wall is sound. Gate hinge is not. Guess which one everyone notices.','Old stone talks if you know where to put a chisel. Mostly it says “stop.”'],
  tovin:['No time—well, perhaps ten seconds. What do you need?','I have crossed Lantern Square twelve times today and somehow I am still late.'],
  pell:['Fish stopped biting when the briars woke. They know things before we do.','Saw green light under the reeds last night. Could have been magic. Could have been my lantern.']
};

export const getNpc = id => NPCS.find(npc=>npc.id===id)||null;
export const getShop = id => SHOPS.find(shop=>shop.id===id)||null;
export function fallbackLine(id,seed=0){const lines=FALLBACK_LINES[id]||['Good roads to you, Warden.'];return lines[Math.abs(seed)%lines.length];}
export function isTownSafeZone(position){return Boolean(position&&position.z>10&&Math.abs(position.x)<18.5);}

import assert from 'node:assert/strict';
import { NPCS, NPC_PLACEMENTS, SHOPS, fallbackLine, getNpc, getShop, isTownSafeZone } from '../src/game/TownData.js';
import { clearLumenwoodFootprint } from '../src/game/TownFootprint.js';
import { buildInstructions, extractChatText, handler, pickNous0xAlphaModel } from '../netlify/functions/ai-dialogue.mjs';

assert.equal(SHOPS.length, 6, 'town should expose six distinct shops');
assert.equal(NPCS.length, 16, 'town should have a substantial resident cast');
assert.equal(NPC_PLACEMENTS.length, NPCS.length, 'every resident needs a world placement');
assert.equal(new Set(NPCS.map(n => n.id)).size, NPCS.length, 'NPC ids must be unique');
assert.equal(new Set(SHOPS.map(s => s.id)).size, SHOPS.length, 'shop ids must be unique');

for (const shop of SHOPS) {
  const keeper = NPCS.find(npc => npc.name === shop.keeper);
  assert.ok(keeper, `${shop.name} needs a keeper NPC`);
  assert.equal(keeper.shopId, shop.id, `${shop.name} keeper should link back to the shop`);
  assert.ok(shop.wares.length >= 2, `${shop.name} should sell at least two usable services/items`);
  for (const ware of shop.wares) {
    assert.ok(ware.cost > 0, `${ware.name} must have a positive price`);
    assert.match(ware.kind, /^(heal|mana|meal|rest)$/);
  }
}

for (const placement of NPC_PLACEMENTS) {
  assert.ok(getNpc(placement.id), `placement ${placement.id} must reference a resident`);
  assert.equal(placement.position.length, 2);
}

assert.equal(getShop('inn')?.name, "Wayfarer's Rest");
assert.notEqual(fallbackLine('ilyra', 0), fallbackLine('ilyra', 1));
assert.equal(isTownSafeZone({x:0,z:18}), true);
assert.equal(isTownSafeZone({x:0,z:0}), false);
assert.equal(isTownSafeZone({x:30,z:18}), false);

function fakeRoot(x,z,meshCount=1){
  const nodes=Array.from({length:meshCount},()=>({isMesh:true,visible:true}));
  return {position:{x,z},userData:{},visible:true,traverse(fn){fn(this);for(const node of nodes)fn(node);},nodes};
}
const ground=fakeRoot(0,0);
const townPine=fakeRoot(4,18,2);townPine.userData.assetNature=true;
const southPine=fakeRoot(4,-18,2);southPine.userData.assetNature=true;
const portal=fakeRoot(0,-18,2);
const fakeGame={world:{decor:{children:[ground,townPine,southPine,portal]},portal},natureAssetManager:{instances:[townPine,southPine],count:2}};
const cleared=clearLumenwoodFootprint(fakeGame);
assert.equal(cleared.hiddenRoots,1);
assert.equal(cleared.natureRemoved,1);
assert.equal(townPine.nodes.every(node=>node.visible===false),true,'town foliage should be fully retired');
assert.equal(southPine.nodes.every(node=>node.visible===true),true,'combat-field foliage should remain');
assert.deepEqual(fakeGame.natureAssetManager.instances,[southPine]);

const instructions = buildInstructions(getNpc('sella'), 'Rowan has 50 health.', false);
assert.match(instructions, /Stay in character/);
assert.match(instructions, /Never invent a mechanical reward/);
assert.match(instructions, /Sella/);

assert.equal(extractChatText({choices:[{message:{content:'Lantern Square is quiet tonight.'}}]}), 'Lantern Square is quiet tonight.');
assert.equal(extractChatText({choices:[{message:{content:[{type:'text',text:'The ward is holding.'}]}}]}), 'The ward is holding.');
assert.equal(extractChatText({choices:[]}), '');

const discovered = pickNous0xAlphaModel({data:[
  {id:'meta/llama-4-scout:free',name:'Llama 4 Scout'},
  {id:'nousresearch/0x-alpha:free',name:'0x Alpha'},
  {id:'other/alpha-model',name:'Alpha'}
]});
assert.equal(discovered,'nousresearch/0x-alpha:free','0x Alpha discovery should prefer the matching Nous catalog entry');
assert.equal(pickNous0xAlphaModel({data:[{id:'other/model'}]}),'','discovery should not silently substitute another model');

const missingOrigin = await handler({
  httpMethod:'POST',
  headers:{host:'maples.example'},
  body:JSON.stringify({apiKey:'sk-nous-test-session-only-1234567890',playerLine:'Hello'})
});
assert.equal(missingOrigin.statusCode,403,'relay must reject requests without a verified browser Origin');

const missingKey = await handler({
  httpMethod:'POST',
  headers:{host:'maples.example',origin:'https://maples.example'},
  body:JSON.stringify({playerLine:'Hello'})
});
assert.equal(missingKey.statusCode,400,'relay must never fall back to a server-owned provider key');

console.log(`town-ai-unit: ${NPCS.length} NPCs, ${SHOPS.length} shops, footprint + Nous 0x Alpha BYOK guards PASS`);

import assert from 'node:assert/strict';
import { NPCS, NPC_PLACEMENTS, SHOPS, fallbackLine, getNpc, getShop, isTownSafeZone } from '../src/game/TownData.js';
import { buildInstructions, extractOutputText } from '../netlify/functions/ai-dialogue.mjs';

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

const instructions = buildInstructions(getNpc('sella'), 'Rowan has 50 health.', false);
assert.match(instructions, /Stay in character/);
assert.match(instructions, /Never invent a mechanical reward/);
assert.match(instructions, /Sella/);

const output = extractOutputText({
  output: [
    {type:'reasoning',content:[]},
    {type:'message',content:[{type:'output_text',text:'Lantern Square is quiet tonight.'}]}
  ]
});
assert.equal(output, 'Lantern Square is quiet tonight.');
assert.equal(extractOutputText({output:[]}), '');

console.log(`town-ai-unit: ${NPCS.length} NPCs, ${SHOPS.length} shops, relay helpers PASS`);

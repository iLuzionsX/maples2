import assert from 'node:assert/strict';
import { LootEngine, RARITIES, SLOTS, rarityRank, normalizeLegacyItem } from '../src/game/LootCore.js';

const fixed=value=>()=>value;

{
  const engine=new LootEngine({rng:fixed(.01),level:7});
  for(const slot of SLOTS){
    const item=engine.generate({slot});
    assert.equal(item.slot,slot);
    assert.ok(item.name.length>8);
    assert.ok(Number.isFinite(item.score)&&item.score>0);
    assert.ok(Object.values(item.stats).every(v=>Number.isFinite(v)&&v>=0));
    assert.ok(item.salvageXp>0);
  }
}

{
  const engine=new LootEngine({rng:fixed(.01),level:7});
  const drops=engine.openCache('ancient');
  assert.equal(drops.length,2);
  assert.ok(rarityRank(drops[0].rarity)>=rarityRank('rare'));
  assert.ok(rarityRank(drops[1].rarity)>=rarityRank('uncommon'));
}

{
  const engine=new LootEngine({rng:fixed(.01),level:7,pityAt:2});
  engine.generate();
  engine.generate();
  const pity=engine.generate();
  assert.ok(rarityRank(pity.rarity)>=rarityRank('epic'));
}

{
  const engine=new LootEngine({rng:fixed(.99),level:10});
  const item=engine.generate({minimum:'legendary',slot:'weapon'});
  assert.equal(item.rarity,'legendary');
  assert.equal(item.affixes.length,RARITIES.find(r=>r.key==='legendary').affixes);
}

{
  const migrated=normalizeLegacyItem({id:'old',slot:'weapon',rarity:'rare',stats:{power:40,crit:4,mana:8}});
  assert.equal(migrated.slot,'weapon');
  assert.ok(migrated.stats.might>0);
  assert.equal(migrated.stats.focus,8);
}

console.log('LOOT SYSTEM UNIT SUITE PASS');

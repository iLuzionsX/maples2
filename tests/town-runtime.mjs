import { chromium } from 'playwright';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const errors = [];
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox','--disable-setuid-sandbox','--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']
});

async function collect(page, label) {
  page.on('pageerror', error => errors.push(`${label} pageerror: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error' && !message.text().includes('favicon')) errors.push(`${label} console: ${message.text()}`);
  });
}

const desktop = await browser.newContext({ viewport:{width:1280,height:720}, deviceScaleFactor:1 });
const page = await desktop.newPage();
await collect(page,'desktop');
await page.goto(baseUrl,{waitUntil:'networkidle'});
await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__ && window.__MAPLES_TOWN__));
await page.waitForFunction(() => document.querySelector('#enter-btn')?.dataset.ready === 'true',null,{timeout:90000});

const boot = await page.evaluate(() => {
  const town=window.__MAPLES_TOWN__, game=window.__MAPLES_GAME__;
  return {
    npcCount:town.npcs.length,
    rootName:town.root.name,
    dynamicName:town.dynamic.name,
    arenaRadius:game.world.arenaRadius,
    starterCoins:town.coins,
    runtimeGuards:Boolean(town.__runtimeGuardsInstalled&&town.__allocationStableMatrices&&town.__townCollisions&&town.__authoredWorldBounds&&town.__modalHostileSafety&&town.__nous0xUi),
    settingsVisible:Boolean(document.querySelector('#town-settings-btn')),
    interactVisible:Boolean(document.querySelector('#town-interact')),
    providerTitle:document.querySelector('#town-settings header h2')?.textContent,
    defaultModel:document.querySelector('#town-ai-model')?.value,
    townObjects:town.root.children.length
  };
});
if(boot.npcCount!==16) errors.push(`desktop expected 16 NPCs, got ${boot.npcCount}`);
if(boot.rootName!=='LumenwoodCrossing'||boot.dynamicName!=='LumenwoodLife') errors.push('town scene roots missing');
if(boot.arenaRadius<36) errors.push(`town arena was not expanded: ${boot.arenaRadius}`);
if(boot.starterCoins!==75) errors.push(`first-run wallet expected 75 coins, got ${boot.starterCoins}`);
if(!boot.runtimeGuards) errors.push('town runtime guards did not install');
if(boot.providerTitle!=='0x Alpha'||boot.defaultModel!=='auto:0x-alpha') errors.push(`Nous 0x Alpha settings did not initialize: ${JSON.stringify(boot)}`);
if(!boot.settingsVisible||!boot.interactVisible||boot.townObjects<20) errors.push('town UI/environment did not install completely');

await page.locator('#enter-btn').click();
const collision = await page.evaluate(() => {
  const town=window.__MAPLES_TOWN__, game=window.__MAPLES_GAME__, player=game.player;
  player.setPosition(-11.8,0,18.5);
  town.update(0);
  const x=player.position.x,z=player.position.z;
  const insideShop=Math.abs(x+11.8)<3.03&&Math.abs(z-18.5)<2.68;
  const fakeBoss={dead:false,isBoss:true,position:{z:12},velocity:{z:1}};
  game.enemies.push(fakeBoss);
  town._protectTown();
  game.enemies.pop();

  const glade={x:35,z:0};
  game.world.clampToArena(glade);
  const townPoint={x:15,z:32};
  game.world.clampToArena(townPoint);
  const townOverflow={x:30,z:40};
  game.world.clampToArena(townOverflow);

  return {x,z,insideShop,bossZ:fakeBoss.position.z,bossVz:fakeBoss.velocity.z,glade,townPoint,townOverflow};
});
if(collision.insideShop) errors.push(`shop collision failed: ${JSON.stringify(collision)}`);
if(collision.bossZ!==9||collision.bossVz!==0) errors.push(`town ward failed against boss: ${JSON.stringify(collision)}`);
if(Math.hypot(collision.glade.x,collision.glade.z)>28.001) errors.push(`glade boundary exposed outer ring: ${JSON.stringify(collision.glade)}`);
if(collision.townPoint.x!==15||collision.townPoint.z!==32) errors.push(`authored town interior was incorrectly clamped: ${JSON.stringify(collision.townPoint)}`);
if(collision.townOverflow.x>18.201||collision.townOverflow.z>33.151) errors.push(`town outer boundary failed: ${JSON.stringify(collision.townOverflow)}`);

await page.evaluate(() => {
  const town=window.__MAPLES_TOWN__;
  town.openDialogue(town.npcs.find(n=>n.id==='ilyra'));
});
await page.waitForSelector('#town-dialogue:not(.hidden)');
const dialogue = await page.evaluate(() => ({
  name:document.querySelector('#town-dialogue-name')?.textContent,
  localLine:document.querySelector('#town-dialogue-log .town-line p')?.textContent,
  inputDisabled:document.querySelector('#town-dialogue-input')?.disabled,
  shopButtonHidden:document.querySelector('#town-dialogue-shop')?.classList.contains('hidden')
}));
if(dialogue.name!=='Ilyra'||!dialogue.localLine||!dialogue.inputDisabled||dialogue.shopButtonHidden) errors.push('local NPC dialogue state is incomplete');

await page.evaluate(() => window.__MAPLES_TOWN__.openShop('anvil'));
await page.waitForSelector('#town-shop:not(.hidden)');
const before = await page.evaluate(() => {
  const t=window.__MAPLES_TOWN__,p=window.__MAPLES_GAME__.player;
  p.hp=40;
  return {coins:t.coins,hp:p.hp,wares:document.querySelectorAll('.town-ware').length};
});
await page.locator('.town-ware').first().click();
const after = await page.evaluate(() => ({coins:window.__MAPLES_TOWN__.coins,hp:window.__MAPLES_GAME__.player.hp}));
if(before.wares!==2||after.coins!==before.coins-12||after.hp!==64) errors.push(`shop transaction failed: ${JSON.stringify({before,after})}`);

const safety = await page.evaluate(() => {
  const town=window.__MAPLES_TOWN__, game=window.__MAPLES_GAME__, player=game.player;
  town.closePanels();
  player.setPosition(0,0,0);
  const blocked=town.openSettings();
  const blockedModal=town.modalOpen;

  const wardHostile={dead:false,remove:false,isBoss:false,attackRange:1.45,position:{x:0,z:9}};
  game.enemies.push(wardHostile);
  player.setPosition(0,0,10.1);
  const wardEdgeBlocked=town.openSettings();
  const wardEdgeModal=town.modalOpen;
  const dialogueBlocked=town.openDialogue(town.npcs.find(n=>n.id==='darran'));
  const dialogueModal=town.modalOpen;
  const shopBlocked=town.openShop('anvil');
  const shopModal=town.modalOpen;
  game.enemies.pop();

  player.setPosition(0,0,18);
  const allowed=town.openSettings();
  return {blocked,blockedModal,wardEdgeBlocked,wardEdgeModal,dialogueBlocked,dialogueModal,shopBlocked,shopModal,allowed,allowedModal:town.modalOpen};
});
if(
  safety.blocked!==false||safety.blockedModal||
  safety.wardEdgeBlocked!==false||safety.wardEdgeModal||
  safety.dialogueBlocked!==false||safety.dialogueModal||
  safety.shopBlocked!==false||safety.shopModal||
  safety.allowed!==true||!safety.allowedModal
) errors.push(`safe modal gate failed: ${JSON.stringify(safety)}`);

await page.fill('#town-ai-key','sk-nous-test-session-only-1234567890');
await page.check('#town-ai-enabled');
await page.click('#town-ai-save');
const settings = await page.evaluate(() => ({
  enabled:window.__MAPLES_TOWN__.ai.settings.enabled,
  model:window.__MAPLES_TOWN__.ai.settings.model,
  label:window.__MAPLES_TOWN__.ai.modelLabel,
  sessionKey:sessionStorage.getItem('maples.ai.key.v1'),
  persistent:localStorage.getItem('maples.ai.settings.v1'),
  localKeyLeak:localStorage.getItem('maples.ai.key.v1'),
  keyLabel:document.querySelector('#town-settings .town-field span')?.textContent
}));
if(!settings.enabled||settings.model!=='auto:0x-alpha'||settings.label!=='0x Alpha · auto'||!settings.sessionKey?.startsWith('sk-nous-test-')||settings.localKeyLeak) errors.push(`session-scoped Nous settings failed: ${JSON.stringify(settings)}`);
if(settings.keyLabel!=='Nous Portal API key') errors.push(`Nous settings label missing: ${settings.keyLabel}`);
if((settings.persistent||'').includes('sk-nous-test-')) errors.push('API key leaked into persistent settings');
await page.click('#town-ai-clear');
await page.click('[data-settings-close]');

await desktop.close();

const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
const mp=await mobile.newPage();
await collect(mp,'mobile');
await mp.goto(baseUrl,{waitUntil:'networkidle'});
await mp.waitForFunction(() => Boolean(window.__MAPLES_TOWN__) && document.querySelector('#enter-btn')?.dataset.ready==='true',null,{timeout:90000});
await mp.locator('#enter-btn').click();
await mp.evaluate(() => {
  const game=window.__MAPLES_GAME__;
  game.player.setPosition(0,0,18);
  window.__MAPLES_TOWN__.openSettings();
});
await mp.waitForSelector('#town-settings:not(.hidden)');
const mobileLayout=await mp.evaluate(() => {
  const panel=document.querySelector('#town-settings').getBoundingClientRect();
  const button=document.querySelector('#town-settings-btn').getBoundingClientRect();
  const controls=getComputedStyle(document.querySelector('#mobile-controls')).display;
  return {left:panel.left,right:panel.right,width:panel.width,viewport:innerWidth,settingsButton:button.width,controls,providerTitle:document.querySelector('#town-settings header h2')?.textContent};
});
if(mobileLayout.left<0||mobileLayout.right>mobileLayout.viewport+1||mobileLayout.width>mobileLayout.viewport) errors.push(`mobile settings overflow: ${JSON.stringify(mobileLayout)}`);
if(mobileLayout.settingsButton<40||mobileLayout.controls==='none'||mobileLayout.providerTitle!=='0x Alpha') errors.push('mobile Nous town/settings controls are not touch-ready');
await mobile.close();
await browser.close();

if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('town-runtime: desktop + mobile + Nous 0x Alpha settings PASS');
console.log(JSON.stringify({boot,collision,dialogue,before,after,safety,settings,mobileLayout},null,2));

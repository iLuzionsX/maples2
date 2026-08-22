import { chromium } from 'playwright';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const errors = [];
const browser = await chromium.launch({
  headless:true,
  args:['--no-sandbox','--disable-setuid-sandbox','--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']
});
const page = await browser.newPage({ viewport:{width:1280,height:720} });
page.on('pageerror',error=>errors.push(`pageerror: ${error.message}`));
page.on('console',message=>{if(message.type()==='error'&&!message.text().includes('favicon')) errors.push(`console: ${message.text()}`);});

await page.goto(baseUrl,{waitUntil:'networkidle'});
await page.waitForFunction(()=>Boolean(window.__MAPLES_GAME__&&window.__MAPLES_TOWN__));
await page.waitForFunction(()=>document.querySelector('#enter-btn')?.dataset.ready==='true',null,{timeout:90000});
await page.locator('#enter-btn').click();

const result = await page.evaluate(() => {
  const town=window.__MAPLES_TOWN__;
  const game=window.__MAPLES_GAME__;
  const state=town.bridgeApproach;
  const glade={x:35,z:0};
  const south={x:40,z:-80};
  const northTrail={x:0,z:80};
  const northOffroad={x:40,z:60};
  game.world.clampToArena(glade);
  game.world.clampToArena(south);
  game.world.clampToArena(northTrail);
  game.world.clampToArena(northOffroad);
  return {
    ready:Boolean(state?.ready&&state?.deckGroundAligned&&town.__mosswakeBridge&&town.__largerWorldApproach&&town.__authoredLargerWorldBounds),
    deck:state?.deck?.length||0,
    storyScenery:state?.storyScenery?.length||0,
    nature:state?.nature?.length||0,
    storyMarker:state?.storyMarker?.name||null,
    waterName:state?.water?.name||null,
    blockers:state?.blockers?.length||0,
    bounds:state?.bounds||null,
    presentationBounds:town.presentation?.bounds||null,
    arenaRadius:game.world.arenaRadius,
    glade,south,northTrail,northOffroad
  };
});

await browser.close();
if(!result.ready) errors.push(`Mosswake Bridge did not initialize: ${JSON.stringify(result)}`);
if(result.deck<13||result.storyScenery<6||result.nature<16) errors.push(`bridge/world asset population incomplete: ${JSON.stringify(result)}`);
if(result.storyMarker!=='MosswakeBridgeStoryMarker'||result.waterName!=='BlackbriarRunWater'||result.blockers!==2) errors.push(`bridge environmental story layer incomplete: ${JSON.stringify(result)}`);
if(!result.bounds||result.bounds.southMinZ>-62||result.bounds.northMaxZ<68||result.bounds.northTrailHalfWidth<18) errors.push(`larger world bounds incomplete: ${JSON.stringify(result.bounds)}`);
if(!result.presentationBounds||result.presentationBounds.southMinZ>-62||result.presentationBounds.northMaxZ<68) errors.push(`presentation did not inherit larger bounds: ${JSON.stringify(result.presentationBounds)}`);
if(result.arenaRadius<34||result.arenaRadius>40) errors.push(`combat arena radius changed unexpectedly: ${result.arenaRadius}`);
if(Math.hypot(result.glade.x,result.glade.z)>34.001) errors.push(`combat glade boundary regressed: ${JSON.stringify(result.glade)}`);
if(result.south.x>26.001||result.south.z<-62.001) errors.push(`southern approach boundary failed: ${JSON.stringify(result.south)}`);
if(Math.abs(result.northTrail.x)>.001||result.northTrail.z>68.001) errors.push(`northern road extension failed: ${JSON.stringify(result.northTrail)}`);
if(result.northOffroad.x>28.001||result.northOffroad.z>50.001) errors.push(`north outskirts could bypass the authored road: ${JSON.stringify(result.northOffroad)}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('MOSSWAKE BRIDGE INIT/BOUNDS PASS');
console.log(JSON.stringify(result,null,2));

import { chromium } from 'playwright';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox','--disable-setuid-sandbox','--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']
});
const page = await browser.newPage({ viewport:{width:1280,height:720} });
const errors = [];
page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
page.on('console', message => {
  if (message.type() === 'error' && !message.text().includes('favicon')) errors.push(`console: ${message.text()}`);
});

await page.goto(baseUrl,{waitUntil:'networkidle'});
await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__ && window.__MAPLES_TOWN__));
await page.waitForFunction(() => document.querySelector('#enter-btn')?.dataset.ready === 'true',null,{timeout:90000});
await page.locator('#enter-btn').click();

const result = await page.evaluate(() => {
  const town=window.__MAPLES_TOWN__, player=window.__MAPLES_GAME__.player;
  const blockers=town.presentationCollision?.blockers||[];
  const blocker=blockers.find(item=>item.kind==='box')||blockers[0];
  if(!blocker) return {installed:Boolean(town.__expandedAssetCollisions),count:0,inside:true,source:null};

  if(blocker.kind==='box') player.setPosition(blocker.cx,0,blocker.cz);
  else player.setPosition(blocker.x,0,blocker.z);
  town.update(0);

  const radius=player.radius||.38;
  let inside;
  if(blocker.kind==='box') {
    inside=Math.abs(player.position.x-blocker.cx)<blocker.hx+radius&&Math.abs(player.position.z-blocker.cz)<blocker.hz+radius;
  } else {
    inside=Math.hypot(player.position.x-blocker.x,player.position.z-blocker.z)<blocker.radius+radius;
  }
  return {installed:Boolean(town.__expandedAssetCollisions),count:blockers.length,inside,source:blocker.source,player:{x:player.position.x,z:player.position.z}};
});

await browser.close();
if(!result.installed||result.count<8) errors.push(`expected expanded asset collision proxies, got ${JSON.stringify(result)}`);
if(result.inside) errors.push(`player remained inside expanded asset blocker: ${JSON.stringify(result)}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('TOWN EXPANSION COLLISION PASS');
console.log(JSON.stringify(result,null,2));

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const outputDir = path.resolve('dist', '__validation');
fs.mkdirSync(outputDir, { recursive: true });
const errors = [];

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
const context = await browser.newContext({ viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1 });
const page = await context.newPage();
page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
await page.goto(`${baseUrl}/?quality=high&capture=1`, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__), null, { timeout: 60000 });
await page.waitForFunction(() => document.querySelector('#enter-btn')?.dataset.ready === 'true', null, { timeout: 90000 });
await page.locator('#enter-btn').click();
await page.waitForTimeout(250);

const start = await page.evaluate(() => ({ x: window.__MAPLES_GAME__.player.position.x, z: window.__MAPLES_GAME__.player.position.z }));
await page.keyboard.down('KeyW');
await page.waitForTimeout(700);
await page.keyboard.up('KeyW');
const end = await page.evaluate(() => ({ x: window.__MAPLES_GAME__.player.position.x, z: window.__MAPLES_GAME__.player.position.z }));
const movementDistance = Math.hypot(end.x - start.x, end.z - start.z);
if (movementDistance < 0.15) errors.push(`movement=${movementDistance.toFixed(3)}m`);

const state = await page.evaluate(() => {
  const r = selector => { const x = document.querySelector(selector).getBoundingClientRect(); return { left:x.left,right:x.right,top:x.top,bottom:x.bottom,width:x.width,height:x.height }; };
  document.querySelector('#boss-ui').classList.remove('hidden');
  return { topbar:r('.topbar'), quest:r('.quest'), boss:r('#boss-ui'), scrollWidth:document.documentElement.scrollWidth };
});
const overlap = (a,b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
if (overlap(state.topbar, state.boss)) errors.push(`boss/topbar overlap ${JSON.stringify(state)}`);
if (overlap(state.quest, state.boss)) errors.push(`boss/quest overlap ${JSON.stringify(state)}`);
if (state.boss.left < 0 || state.boss.right > 1024) errors.push(`boss outside viewport ${JSON.stringify(state.boss)}`);
if (state.scrollWidth > 1024) errors.push(`scrollWidth=${state.scrollWidth}`);

await page.screenshot({ path: path.join(outputDir, 'ui-production-desktop-1024.png') });
fs.writeFileSync(path.join(outputDir, 'ui-production-desktop.json'), JSON.stringify({ errors, movementDistance, state }, null, 2));
await context.close();
await browser.close();
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('UI PRODUCTION DESKTOP E2E PASS');

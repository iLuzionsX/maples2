import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const outputDir = path.resolve('dist', '__validation');
fs.mkdirSync(outputDir, { recursive: true });
const errors = [];
const results = {};

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
const page = await context.newPage();
page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
await page.goto(`${baseUrl}/?quality=high&capture=1`, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__), null, { timeout: 60000 });
await page.waitForFunction(() => document.querySelector('#enter-btn')?.dataset.ready === 'true', null, { timeout: 90000 });
await page.locator('#enter-btn').click();
await page.waitForTimeout(250);

const overlap = (a,b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
for (const width of [390, 320]) {
  await page.setViewportSize({ width, height: 844 });
  await page.waitForTimeout(150);
  const state = await page.evaluate(() => {
    const r = selector => { const x = document.querySelector(selector).getBoundingClientRect(); return { left:x.left,right:x.right,top:x.top,bottom:x.bottom,width:x.width,height:x.height }; };
    const buttons = [...document.querySelectorAll('.mobile-actions button')].map(button => {
      const x = button.getBoundingClientRect();
      return { action:button.dataset.action,left:x.left,right:x.right,top:x.top,bottom:x.bottom,width:x.width,height:x.height };
    });
    return {
      topbar:r('.topbar'),
      quest:r('.quest'),
      joystick:r('.joystick'),
      buttons,
      controlsDisplay:getComputedStyle(document.querySelector('#mobile-controls')).display,
      scrollWidth:document.documentElement.scrollWidth,
    };
  });
  results[width] = state;
  if (state.controlsDisplay === 'none') errors.push(`${width}px mobile controls hidden`);
  if (state.topbar.left < 0 || state.topbar.right > width || state.quest.left < 0 || state.quest.right > width) errors.push(`${width}px top HUD outside viewport ${JSON.stringify(state)}`);
  if (overlap(state.topbar, state.quest)) errors.push(`${width}px top HUD overlap ${JSON.stringify(state)}`);
  if (state.scrollWidth > width) errors.push(`${width}px horizontal clipping scrollWidth=${state.scrollWidth}`);
  for (const button of state.buttons) {
    if (button.width < 44 || button.height < 44) errors.push(`${width}px ${button.action} target=${button.width.toFixed(1)}x${button.height.toFixed(1)}`);
    if (overlap(state.joystick, button)) errors.push(`${width}px joystick/${button.action} overlap`);
    if (button.left < 0 || button.right > width || button.top < 0 || button.bottom > 844) errors.push(`${width}px ${button.action} outside viewport`);
  }
  await page.screenshot({ path: path.join(outputDir, `ui-production-mobile-${width}.png`) });
}

fs.writeFileSync(path.join(outputDir, 'ui-production-mobile.json'), JSON.stringify({ errors, results }, null, 2));
await context.close();
await browser.close();
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('UI PRODUCTION MOBILE E2E PASS');

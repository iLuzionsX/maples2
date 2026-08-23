import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const outputDir = path.resolve('dist', '__validation');
fs.mkdirSync(outputDir, { recursive: true });

const errors = [];
const results = {};
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

function overlap(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

async function waitForGame(page) {
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  await page.goto(`${baseUrl}/?quality=high&capture=1`, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__), null, { timeout: 60000 });
  await page.waitForFunction(() => document.querySelector('#enter-btn')?.dataset.ready === 'true', null, { timeout: 90000 });
}

const desktop = await browser.newContext({ viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1 });
const dp = await desktop.newPage();
await waitForGame(dp);
await dp.locator('#enter-btn').click();
await dp.waitForTimeout(250);

const movementStart = await dp.evaluate(() => {
  const p = window.__MAPLES_GAME__.player.position;
  return { x: p.x, z: p.z };
});
await dp.keyboard.down('KeyW');
await dp.waitForTimeout(700);
await dp.keyboard.up('KeyW');
const movementEnd = await dp.evaluate(() => {
  const p = window.__MAPLES_GAME__.player.position;
  return { x: p.x, z: p.z };
});
results.movementDistance = Math.hypot(movementEnd.x - movementStart.x, movementEnd.z - movementStart.z);
if (results.movementDistance < 0.15) errors.push(`Desktop movement smoke failed: ${results.movementDistance.toFixed(3)}m`);

results.desktop = await dp.evaluate(() => {
  const rect = selector => {
    const r = document.querySelector(selector).getBoundingClientRect();
    return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
  };
  const boss = document.querySelector('#boss-ui');
  boss.classList.remove('hidden');
  return {
    viewport: { width: innerWidth, height: innerHeight },
    topbar: rect('.topbar'),
    quest: rect('.quest'),
    boss: rect('#boss-ui'),
    scrollWidth: document.documentElement.scrollWidth,
  };
});
if (overlap(results.desktop.topbar, results.desktop.boss)) errors.push('1024px boss HUD overlaps player HUD');
if (overlap(results.desktop.quest, results.desktop.boss)) errors.push('1024px boss HUD overlaps quest HUD');
if (results.desktop.boss.left < 0 || results.desktop.boss.right > 1024) errors.push('1024px boss HUD leaves viewport');
if (results.desktop.scrollWidth > 1024) errors.push(`1024px horizontal clipping: scrollWidth=${results.desktop.scrollWidth}`);
await dp.screenshot({ path: path.join(outputDir, 'ui-production-1024.png') });
await desktop.close();

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
const mp = await mobile.newPage();
await waitForGame(mp);
await mp.locator('#enter-btn').click();
await mp.waitForTimeout(300);

for (const width of [390, 320]) {
  await mp.setViewportSize({ width, height: 844 });
  await mp.waitForTimeout(150);
  const state = await mp.evaluate(() => {
    const rect = selector => {
      const r = document.querySelector(selector).getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    };
    const buttons = [...document.querySelectorAll('.mobile-actions button')].map(button => {
      const r = button.getBoundingClientRect();
      return { action: button.dataset.action, left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    });
    return {
      viewport: { width: innerWidth, height: innerHeight },
      topbar: rect('.topbar'),
      quest: rect('.quest'),
      joystick: rect('.joystick'),
      buttons,
      controlsDisplay: getComputedStyle(document.querySelector('#mobile-controls')).display,
      scrollWidth: document.documentElement.scrollWidth,
    };
  });
  results[`mobile${width}`] = state;
  if (state.controlsDisplay === 'none') errors.push(`${width}px mobile controls hidden`);
  if (state.topbar.left < 0 || state.quest.right > width) errors.push(`${width}px top HUD leaves viewport`);
  if (overlap(state.topbar, state.quest)) errors.push(`${width}px player and quest HUD overlap`);
  if (state.scrollWidth > width) errors.push(`${width}px horizontal clipping: scrollWidth=${state.scrollWidth}`);
  for (const button of state.buttons) {
    if (button.width < 44 || button.height < 44) errors.push(`${width}px ${button.action} target below 44px (${button.width}x${button.height})`);
    if (overlap(state.joystick, button)) errors.push(`${width}px joystick overlaps ${button.action} control`);
    if (button.left < 0 || button.right > width || button.top < 0 || button.bottom > 844) errors.push(`${width}px ${button.action} control leaves viewport`);
  }
  await mp.screenshot({ path: path.join(outputDir, `ui-production-${width}.png`) });
}

await mobile.close();
await browser.close();

fs.writeFileSync(path.join(outputDir, 'ui-production-report.json'), JSON.stringify({ errors, results }, null, 2));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('UI PRODUCTION E2E PASS');

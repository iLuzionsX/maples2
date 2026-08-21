import { chromium } from 'playwright';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const mode = process.env.MAPLES_LOOT_E2E_MODE || 'all';
const READY_TIMEOUT = 60000;
const errors = [];
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

async function openGame(context) {
  await context.addInitScript(() => {
    try {
      localStorage.removeItem('maples.loot.v1');
      localStorage.removeItem('maples.loot.v2');
    } catch {}
  });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('favicon')) errors.push(`console: ${msg.text()}`);
  });
  await page.goto(`${baseUrl}/?quality=high&capture=1`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => {
    const g = window.__MAPLES_GAME__;
    return Boolean(
      g?.loot &&
      g?.assetVisualManager?.heroReady &&
      g?.enemies?.some(enemy => !enemy.dead && !enemy.isBoss && enemy.assetVisual) &&
      document.querySelector('#enter-btn')?.dataset.ready === 'true'
    );
  }, null, { timeout: READY_TIMEOUT });
  await page.locator('#enter-btn').click();
  await page.waitForFunction(
    () => Boolean(window.__MAPLES_GAME__?.started && window.__MAPLES_GAME__?.rowanAnimationDirector?.ready),
    null,
    { timeout: READY_TIMEOUT }
  );
  return page;
}

async function runDesktop() {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const page = await openGame(context);
  await page.keyboard.press('i');
  await page.locator('#loot-panel:not(.hidden)').waitFor();
  await page.locator('#open-cache').click();
  await page.waitForFunction(() => window.__MAPLES_GAME__.loot.state.inventory.length === 1);

  const first = await page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    const item = g.loot.state.inventory[0];
    return {
      id: item.id,
      slot: item.slot,
      symbol: item.symbol,
      selected: g.loot.state.selectedId,
      count: g.loot.state.inventory.length,
    };
  });
  if (first.count !== 1 || first.selected !== first.id) errors.push('Opening a Glade Cache did not add/select exactly one item');
  if (!first.symbol) errors.push('Rarity symbol missing from generated item');

  await page.locator('[data-action="favorite"]').click();
  if (!await page.evaluate(() => window.__MAPLES_GAME__.loot.state.inventory[0].favorite)) errors.push('Favorite action did not persist on selected item');
  await page.locator('[data-action="equip"]').click();
  const equipped = await page.evaluate(({ slot, id }) => ({
    equipped: window.__MAPLES_GAME__.loot.state.equipped[slot] === id,
    stats: window.__MAPLES_GAME__.lootCombatStats,
  }), first);
  if (!equipped.equipped) errors.push('Equip action did not update the correct equipment slot');
  if (!equipped.stats || equipped.stats.damageMultiplier < 1 || equipped.stats.defenseMultiplier > 1) errors.push('Equipped item did not produce valid combat stats');
  if (!await page.locator('[data-action="salvage"]').isDisabled()) errors.push('Equipped item salvage protection is not enforced in UI');

  const fieldDropState = await page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    const before = g.loot.state.inventory.length;
    g.loot.spawnFieldDrop(g.player.position.clone(), { minimum: 'rare', boosted: true });
    for (let i = 0; i < 240 && g.loot.state.inventory.length === before; i++) g._updatePickups(1 / 60);
    return { before, count: g.loot.state.inventory.length, worldDrops: g.loot.fieldDrops.length };
  });
  if (fieldDropState.count <= fieldDropState.before) errors.push('In-world gear pickup was not collected into inventory');
  if (fieldDropState.worldDrops !== 0) errors.push('Collected world drop was not cleaned up');
  await context.close();
}

async function runMobile() {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  const page = await openGame(context);
  await page.locator('#loot-toggle').tap();
  await page.locator('#loot-panel:not(.hidden)').waitFor();
  const mobileLayout = await page.evaluate(() => {
    const panelEl = document.querySelector('#loot-panel');
    const panel = panelEl.getBoundingClientRect();
    const controls = [...panelEl.querySelectorAll('button, select')].filter(el => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    });
    return {
      panel: { x: panel.x, y: panel.y, width: panel.width, height: panel.height },
      inner: { width: innerWidth, height: innerHeight },
      undersized: controls.filter(el => el.getBoundingClientRect().height < 43.5).map(el => el.id || el.textContent.trim().slice(0, 24)),
      overflow: panelEl.scrollWidth - panelEl.clientWidth,
      toggle: document.querySelector('#loot-toggle').getBoundingClientRect().height,
    };
  });
  if (
    Math.abs(mobileLayout.panel.x) > 1 ||
    Math.abs(mobileLayout.panel.y) > 1 ||
    Math.abs(mobileLayout.panel.width - mobileLayout.inner.width) > 2 ||
    Math.abs(mobileLayout.panel.height - mobileLayout.inner.height) > 2
  ) errors.push(`Mobile inventory is not full-screen: ${JSON.stringify(mobileLayout.panel)}`);
  if (mobileLayout.toggle < 48) errors.push(`Mobile gear button is too small: ${mobileLayout.toggle}px`);
  if (mobileLayout.undersized.length) errors.push(`Mobile inventory has undersized controls: ${mobileLayout.undersized.join(', ')}`);
  if (mobileLayout.overflow > 2) errors.push(`Mobile inventory horizontally overflows by ${mobileLayout.overflow}px`);

  await page.locator('#open-cache').tap();
  await page.waitForFunction(() => window.__MAPLES_GAME__.loot.state.inventory.length === 1);
  await page.locator('[data-filter="weapon"]').tap();
  if (await page.evaluate(() => window.__MAPLES_GAME__.loot.state.filter) !== 'weapon') errors.push('Mobile tap filter did not switch inventory category');
  await page.locator('[data-filter="all"]').tap();
  await page.locator('.loot-item').first().tap();
  if (!await page.locator('.detail-card').isVisible()) errors.push('Mobile tap selection did not expose item detail actions');
  await context.close();
}

try {
  if (mode === 'desktop' || mode === 'all') await runDesktop();
  if (mode === 'mobile' || mode === 'all') await runMobile();
} finally {
  await browser.close();
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`LOOT / INVENTORY ${mode.toUpperCase()} E2E PASS`);

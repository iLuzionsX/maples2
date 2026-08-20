import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/?quality=high&capture=1`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => {
    const g = window.__MAPLES_GAME__;
    return Boolean(g?.assetVisualManager?.ready && g.enemies?.some(e => e.assetKind === 'ghost' && e.assetVisual));
  }, null, { timeout: 60000 });

  const report = await page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    const ghost = g.enemies.find(e => !e.dead && e.assetKind === 'ghost' && e.assetVisual);
    if (!ghost) return null;

    const meshes = [];
    ghost.assetVisual.traverse(node => {
      if (!node.isMesh && !node.isSkinnedMesh) return;
      const materials = (Array.isArray(node.material) ? node.material : [node.material]).filter(Boolean);
      meshes.push({
        name: node.name,
        skinned: Boolean(node.isSkinnedMesh),
        visible: node.visible,
        frustumCulled: node.frustumCulled,
        vertices: node.geometry?.attributes?.position?.count ?? 0,
        materials: materials.map(material => ({
          opacity: material.opacity ?? 1,
          transparent: Boolean(material.transparent),
          depthWrite: Boolean(material.depthWrite),
        })),
      });
    });

    return {
      rootVisible: ghost.root.visible,
      modelVisible: ghost.assetVisual.visible,
      modelYaw: ghost.assetVisual.rotation.y,
      meshes,
    };
  });

  assert.ok(report, 'ghost imported visual should exist');
  assert.equal(report.rootVisible, true, 'ghost root must be visible');
  assert.equal(report.modelVisible, true, 'ghost imported model must be visible');
  assert.ok(Math.abs(report.modelYaw) < 1e-4, `ghost model yaw should be 0, got ${report.modelYaw}`);
  assert.ok(report.meshes.length > 0, 'ghost must contain at least one renderable mesh');
  assert.ok(report.meshes.some(mesh => mesh.vertices > 0), 'ghost mesh must contain geometry');
  assert.ok(report.meshes.every(mesh => mesh.visible), 'all ghost render meshes must be visible');
  assert.ok(report.meshes.filter(mesh => mesh.skinned).every(mesh => mesh.frustumCulled === false), 'ghost skinned meshes must not be frustum culled');
  assert.ok(report.meshes.flatMap(mesh => mesh.materials).every(material => material.opacity >= 0.99), 'ghost materials must be fully visible');
  assert.ok(report.meshes.flatMap(mesh => mesh.materials).every(material => material.transparent === false), 'ghost materials must not use broken conversion transparency');
  assert.ok(report.meshes.flatMap(mesh => mesh.materials).every(material => material.depthWrite === true), 'ghost materials must write depth');

  await page.locator('#enter-btn').click();
  await page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    const ghost = g.enemies.find(e => !e.dead && e.assetKind === 'ghost' && e.assetVisual);
    for (const enemy of g.enemies) enemy.root.visible = enemy === ghost;
    g.cameraYaw = Math.PI;
    g.player.setPosition(0, 0, 5.2);
    g.player.velocity.set(0, 0, 0);
    g.player.state = 'idle';
    ghost.position.set(0, 0, 3.25);
    ghost.velocity.set(0, 0, 0);
    ghost.state = 'idle';
    ghost.stateTime = 0;
    ghost.root.visible = true;
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'dist/ghost-visibility.png' });

  console.log('ghost-visibility-e2e: PASS');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}

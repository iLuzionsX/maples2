import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { chromium } from 'playwright';

const root = process.cwd();
const oxDir = path.join(root, 'dist', '__ox');
const resultPath = path.join(oxDir, 'ui-ux-production-pass.json');
const baseUrl = 'http://127.0.0.1:4173';
const captureDir = path.join(root, 'dist', '__captures');

if (!fs.existsSync(resultPath)) throw new Error('Verified Ox result is missing.');
const result = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
if (result.verified !== true) throw new Error('Ox result was not verifier-approved.');
if (JSON.stringify(result.changed_files) !== JSON.stringify(['src/premium-ui.css'])) {
  throw new Error(`Unexpected Ox patch scope: ${JSON.stringify(result.changed_files)}`);
}

const preservedOx = new Map();
for (const name of fs.readdirSync(oxDir)) {
  const full = path.join(oxDir, name);
  if (fs.statSync(full).isFile()) preservedOx.set(name, fs.readFileSync(full));
}

function run(command, args, timeoutMs = 120000) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const child = spawn(command, args, { stdio: 'inherit', shell: false, detached: true });
    const finish = error => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      error ? reject(error) : resolve();
    };
    child.on('error', finish);
    child.on('exit', code => code === 0 ? finish() : finish(new Error(`${command} ${args.join(' ')} exited ${code}`)));
    const timer = setTimeout(() => {
      try { process.kill(-child.pid, 'SIGTERM'); } catch { child.kill('SIGTERM'); }
      setTimeout(() => { try { process.kill(-child.pid, 'SIGKILL'); } catch { child.kill('SIGKILL'); } }, 2500).unref();
      finish(new Error(`${command} ${args.join(' ')} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
}

async function ready() {
  for (let i = 0; i < 120; i++) {
    try { if ((await fetch(baseUrl, { signal: AbortSignal.timeout(900) })).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('Preview server did not become ready.');
}

function applyPatch(reverse = false) {
  const args = ['apply', '--whitespace=nowarn'];
  if (reverse) args.push('-R');
  args.push('-');
  const applied = spawnSync('git', args, {
    cwd: root,
    input: result.output,
    encoding: 'utf8',
    maxBuffer: 4 * 1024 * 1024,
  });
  if (applied.status !== 0) throw new Error(String(applied.stderr || applied.stdout || 'git apply failed').trim());
}

async function waitForGame(page) {
  await page.goto(`${baseUrl}/?quality=high&capture=1`, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForFunction(() => Boolean(window.__MAPLES_GAME__), null, { timeout: 60000 });
  await page.waitForFunction(() => document.querySelector('#enter-btn')?.dataset.ready === 'true', null, { timeout: 90000 });
}

let patchApplied = false;
let preview;
let browser;
try {
  applyPatch(false);
  patchApplied = true;

  await run('npm', ['run', 'build'], 90000);
  fs.mkdirSync(path.join(root, 'dist', '__ox'), { recursive: true });
  for (const [name, data] of preservedOx) fs.writeFileSync(path.join(root, 'dist', '__ox', name), data);

  await run('npx', ['playwright-core', 'install', 'chromium'], 300000);
  preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], {
    stdio: 'inherit', shell: false, detached: true,
  });
  await ready();

  browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  });
  fs.mkdirSync(captureDir, { recursive: true });

  const desktop = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const page = await desktop.newPage();
  await waitForGame(page);
  await page.locator('#enter-btn').click();
  await page.waitForFunction(() => window.__MAPLES_GAME__?.animationPolishManager?.playerReady, null, { timeout: 30000 });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(captureDir, 'ox-desktop-gameplay.png') });

  await page.evaluate(() => {
    const g = window.__MAPLES_GAME__;
    g.kills = g.objectiveKills;
    g.bossPending = true;
    g.bossTimer = .03;
    g.player.setPosition(0, 0, -6.3);
    g.player.facing = Math.PI;
    g.player.root.rotation.y = Math.PI;
    g.cameraYaw = Math.PI;
  });
  await page.waitForFunction(() => {
    const g = window.__MAPLES_GAME__;
    const bossUi = document.querySelector('#boss-ui');
    return Boolean(g?.boss?.assetVisual) && bossUi && getComputedStyle(bossUi).display !== 'none';
  }, null, { timeout: 90000 });
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(captureDir, 'ox-desktop-boss.png') });
  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
  });
  const mobilePage = await mobile.newPage();
  await waitForGame(mobilePage);
  await mobilePage.locator('#enter-btn').click();
  await mobilePage.waitForFunction(() => window.__MAPLES_GAME__?.animationPolishManager?.playerReady, null, { timeout: 30000 });
  await mobilePage.waitForTimeout(700);
  await mobilePage.screenshot({ path: path.join(captureDir, 'ox-mobile-gameplay.png') });
  await mobile.close();

  const meta = {
    generated_at: new Date().toISOString(),
    ox_model: result.model,
    input_commit: result.input_commit,
    output_sha256: result.output_sha256,
    changed_files: result.changed_files,
    captures: [
      { file: 'ox-desktop-gameplay.png', viewport: '1280x720', state: 'gameplay' },
      { file: 'ox-desktop-boss.png', viewport: '1280x720', state: 'boss' },
      { file: 'ox-mobile-gameplay.png', viewport: '390x844', state: 'mobile gameplay' },
    ],
  };
  fs.writeFileSync(path.join(captureDir, 'meta.json'), JSON.stringify(meta, null, 2));
  fs.writeFileSync(path.join(captureDir, 'index.html'), `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ox Alpha UI Capture</title><style>body{margin:0;background:#07100f;color:#f5efdf;font:15px system-ui;padding:24px}main{max-width:1320px;margin:auto}h1{font-size:22px}p{color:#a9b7ad}.shot{margin:24px 0 36px}.shot h2{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#d9bb72}.shot img{display:block;max-width:100%;height:auto;border:1px solid rgba(217,187,114,.35);border-radius:12px;box-shadow:0 16px 45px #0008}code{word-break:break-all}</style><main><h1>Maples — Ox Alpha UI render</h1><p>Verifier-approved patch: <code>${result.output_sha256}</code></p><div class="shot"><h2>Desktop gameplay · 1280×720</h2><img src="ox-desktop-gameplay.png"></div><div class="shot"><h2>Desktop boss · 1280×720</h2><img src="ox-desktop-boss.png"></div><div class="shot"><h2>Mobile gameplay · 390×844</h2><img src="ox-mobile-gameplay.png"></div></main>`);

  console.log(`OX RENDER PASS: ${result.output_sha256}`);
} finally {
  if (browser) await browser.close().catch(() => {});
  if (preview) {
    try { process.kill(-preview.pid, 'SIGTERM'); } catch { preview.kill('SIGTERM'); }
  }
  if (patchApplied) {
    try { applyPatch(true); } catch {}
  }
}

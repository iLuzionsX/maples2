import fs from 'node:fs';
import { spawn } from 'node:child_process';

const baseUrl = 'http://127.0.0.1:4173';
const env = { ...process.env, MAPLES_TEST_BASE_URL: baseUrl };
function run(command, args, timeoutMs = 120000) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const child = spawn(command, args, { stdio: 'inherit', env, shell: false, detached: true });
    const finish = error => { if (settled) return; settled = true; clearTimeout(timer); error ? reject(error) : resolve(); };
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
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(baseUrl, { signal: AbortSignal.timeout(900) })).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('preview unavailable');
}

const tempPath = 'tests/.rowan-rig-diagnostic.mjs';
fs.writeFileSync(tempPath, `import assert from 'node:assert/strict';\nimport { chromium } from 'playwright';\nconst baseUrl = process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173';\nconst browser = await chromium.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox','--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist'] });\nconst context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });\nconst page = await context.newPage();\nawait page.goto(\`${'${baseUrl}'}/?perf=off&quality=high&capture=1\`, { waitUntil: 'networkidle' });\nawait page.waitForFunction(() => { const g = window.__MAPLES_GAME__; return Boolean(g?.assetVisualManager?.heroReady && g?.enemies?.some(e => !e.dead && !e.isBoss && e.assetVisual) && document.querySelector('#enter-btn')?.dataset.ready === 'true'); }, null, { timeout: 60000 });\nawait page.locator('#enter-btn').click();\nawait page.waitForFunction(() => Boolean(window.__MAPLES_GAME__?.rowanAnimationDirector?.ready), null, { timeout: 60000 });\nconst boot = await page.evaluate(() => { const d = window.__MAPLES_GAME__.rowanAnimationDirector; return { mode:d.mode, skeletalRigReady:d.skeletalRigReady, secondaryMotionReady:d.secondaryMotionReady, footIKReady:d.footIKReady, clipCoverage:d.clipCoverage }; });\nassert.equal(boot.mode, 'skeletal-follow-gameplay');\nassert.equal(boot.skeletalRigReady, true);\nassert.equal(boot.secondaryMotionReady, true);\nassert.equal(boot.footIKReady, true);\nfor (const key of ['idle','walk','run','turnLeft','turnRight','deathPose']) assert.equal(boot.clipCoverage?.[key], true, key);\nconsole.log('ROWAN RIG ASSERTIONS PASS', JSON.stringify(boot));\nawait context.close();\nawait browser.close();\n`);
await run('npm', ['run', 'build'], 90000);
await run('npx', ['playwright-core', 'install', 'chromium'], 300000);
const preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], { stdio: 'inherit', env, shell: false, detached: true });
try { await ready(); await run('node', [tempPath], 180000); }
finally { try { process.kill(-preview.pid, 'SIGTERM'); } catch { preview.kill('SIGTERM'); } fs.rmSync(tempPath, { force: true }); }

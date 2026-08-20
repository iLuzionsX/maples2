import fs from 'node:fs';
import { spawn } from 'node:child_process';

const baseUrl = 'http://127.0.0.1:4173';
const env = { ...process.env, MAPLES_TEST_BASE_URL: baseUrl };

function run(command, args, timeoutMs = 120000) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const child = spawn(command, args, { stdio: 'inherit', env, shell: false, detached: true });
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
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(baseUrl, { signal: AbortSignal.timeout(900) })).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('preview unavailable');
}

// Temporary binary isolation: execute the unchanged Rowan browser test through
// all boot + deterministic locomotion assertions, stopping before combat.
const source = fs.readFileSync('tests/rowan-animation-e2e.mjs', 'utf8');
const marker = 'const combat = await page.evaluate';
const markerIndex = source.indexOf(marker);
if (markerIndex < 0) throw new Error('Could not isolate Rowan locomotion section');
const tempPath = 'tests/.rowan-locomotion-after-rig-fix.mjs';
fs.writeFileSync(tempPath, `${source.slice(0, markerIndex)}\nawait context.close();\nawait browser.close();\nif (errors.length) { console.error(errors.join('\\n')); process.exit(1); }\nconsole.log('ROWAN LOCOMOTION ASSERTIONS PASS');\n`);

await run('npm', ['run', 'build'], 90000);
await run('npx', ['playwright-core', 'install', 'chromium'], 300000);
const preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], { stdio: 'inherit', env, shell: false, detached: true });
try {
  await ready();
  await run('node', [tempPath], 180000);
} finally {
  try { process.kill(-preview.pid, 'SIGTERM'); } catch { preview.kill('SIGTERM'); }
  fs.rmSync(tempPath, { force: true });
}

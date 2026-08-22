import fs from 'node:fs';
import { spawn } from 'node:child_process';

const baseUrl = 'http://127.0.0.1:4173';
const env = { ...process.env, MAPLES_TEST_BASE_URL: baseUrl };
const diagnostic = { stages: [] };

function run(command, args, timeoutMs = 120000) {
  return new Promise((resolve, reject) => {
    let settled = false;
    let output = '';
    const child = spawn(command, args, { stdio: ['ignore','pipe','pipe'], env, shell: false, detached: true });
    child.stdout.on('data', chunk => { const text=chunk.toString(); output+=text; process.stdout.write(text); });
    child.stderr.on('data', chunk => { const text=chunk.toString(); output+=text; process.stderr.write(text); });
    const finish = error => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      error ? reject(Object.assign(error,{output})) : resolve(output);
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

async function stage(name, command, args, timeoutMs) {
  try {
    const output = await run(command,args,timeoutMs);
    diagnostic.stages.push({name,ok:true,output:output.slice(-6000)});
    return true;
  } catch (error) {
    diagnostic.stages.push({name,ok:false,error:error.message,output:String(error.output||'').slice(-12000)});
    return false;
  }
}

async function ready() {
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(baseUrl, { signal: AbortSignal.timeout(900) })).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('preview unavailable');
}

const source = fs.readFileSync('tests/rowan-animation-e2e.mjs', 'utf8');
const marker = 'const combat = await page.evaluate';
const markerIndex = source.indexOf(marker);
if (markerIndex < 0) throw new Error('Could not isolate Rowan locomotion section');
const tempPath = 'tests/.rowan-locomotion-after-rig-fix.mjs';
fs.writeFileSync(tempPath, `${source.slice(0, markerIndex)}\nawait context.close();\nawait browser.close();\nif (errors.length) { console.error(errors.join('\\n')); process.exit(1); }\nconsole.log('ROWAN LOCOMOTION ASSERTIONS PASS');\n`);

await stage('build','npm',['run','build'],90000);
await stage('chromium','npx',['playwright-core','install','chromium'],300000);
const preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], { stdio:'inherit', env, shell:false, detached:true });
try {
  try { await ready(); diagnostic.previewReady=true; }
  catch(error) { diagnostic.previewReady=false; diagnostic.previewError=error.message; }
  if (diagnostic.previewReady) {
    await stage('rowan-locomotion','node',[tempPath],180000);
    await stage('town-runtime','node',['tests/town-runtime.mjs'],180000);
    await stage('town-expansion-collision','node',['tests/town-expansion-collision.mjs'],180000);
    await stage('town-bridge-approach','node',['tests/town-bridge-approach.mjs'],180000);
  }
} finally {
  try { process.kill(-preview.pid, 'SIGTERM'); } catch { preview.kill('SIGTERM'); }
  fs.rmSync(tempPath, { force:true });
}

fs.mkdirSync('dist',{recursive:true});
fs.writeFileSync('dist/validation-diagnostic.json',JSON.stringify(diagnostic,null,2));
console.log('Diagnostic validation report written to dist/validation-diagnostic.json');

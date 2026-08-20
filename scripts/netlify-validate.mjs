import { spawn } from 'node:child_process';

const env = { ...process.env };

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
    child.on('exit', code => code === 0
      ? finish()
      : finish(new Error(`${command} ${args.join(' ')} exited ${code}`)));
    const timer = setTimeout(() => {
      try { process.kill(-child.pid, 'SIGTERM'); }
      catch { child.kill('SIGTERM'); }
      setTimeout(() => {
        try { process.kill(-child.pid, 'SIGKILL'); }
        catch { child.kill('SIGKILL'); }
      }, 2500).unref();
      finish(new Error(`${command} ${args.join(' ')} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
}

// Diagnostic isolation: unit tests + production build only. Do not merge this state.
await run('npm', ['run', 'test:animation:unit'], 90000);
console.log('ROWAN ANIMATION UNIT SUITE PASS');
await run('npm', ['run', 'build'], 90000);
console.log('VITE PRODUCTION BUILD PASS');
console.log('NETLIFY UNIT/BUILD DIAGNOSTIC PASS');

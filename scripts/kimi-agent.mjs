#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateJob } from './kimi-agent/schema.mjs';
import { resolveRepoRoot } from './kimi-agent/policy.mjs';
import { NvidiaNimClient } from './kimi-agent/nim.mjs';
import { runDelegatedSession } from './kimi-agent/session.mjs';
import { redactSecrets, sanitizedError } from './kimi-agent/security.mjs';

function usage() {
  return `Usage: npm run kimi -- --job .kimi/jobs/example.json [options]

Options:
  --session <id>       Persist/resume a multi-turn session under .kimi/sessions/
  --follow-up <text>   Add a follow-up user turn to an existing session
  --dry-run             Validate and print the execution plan without calling NVIDIA
  --review-only         Force review-only mode; no patch tool is exposed
  --implementation     Force implementation mode; returns a validated patch, never applies it
  --no-stream           Disable streamed responses
  --output <path>       Write the structured result beneath the repository root
  --root <path>         Run against a repository below this path
  --json                Print JSON only (default)
`;
}

function parseArgs(argv) {
  const args = { stream: true, json: true };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') { console.log(usage()); process.exit(0); }
    if (arg === '--job') args.job = argv[++i];
    else if (arg === '--session') args.session = argv[++i];
    else if (arg === '--follow-up') args.followUp = argv[++i];
    else if (arg === '--root') args.root = argv[++i];
    else if (arg === '--output') args.output = argv[++i];
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg === '--review-only') args.reviewOnly = true;
    else if (arg === '--implementation') args.implementation = true;
    else if (arg === '--no-stream') args.stream = false;
    else if (arg === '--json') args.json = true;
    else throw new Error(`Unknown option: ${arg}`);
  }
  if (!args.job) throw new Error('--job is required.');
  return args;
}

function readJob(file, rootDir) {
  const absolute = path.resolve(rootDir, file);
  const prefix = rootDir.endsWith(path.sep) ? rootDir : `${rootDir}${path.sep}`;
  if (absolute !== rootDir && !absolute.startsWith(prefix)) throw new Error('Job file must be inside the repository root.');
  if (!fs.existsSync(absolute) || fs.realpathSync(absolute) !== absolute) throw new Error('Job file must be an existing regular file, not a symlink.');
  return validateJob(JSON.parse(fs.readFileSync(absolute, 'utf8')), path.relative(rootDir, absolute));
}

function outputPath(value, rootDir) {
  if (!value) return null;
  const absolute = path.resolve(rootDir, value);
  const prefix = rootDir.endsWith(path.sep) ? rootDir : `${rootDir}${path.sep}`;
  if (!absolute.startsWith(prefix) || /(?:^|[\\/])(?:\.env|credentials|secrets?)(?:[.\\/]|$)/i.test(absolute)) throw new Error('--output must be a non-secret path inside the repository.');
  if (fs.existsSync(absolute) && fs.realpathSync(absolute) !== absolute) throw new Error('--output cannot be a symlink.');
  return absolute;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const rootDir = resolveRepoRoot(args.root || process.cwd());
  let job = readJob(args.job, rootDir);
  if (args.reviewOnly && args.implementation) throw new Error('--review-only and --implementation cannot be combined.');
  if (args.reviewOnly) job = { ...job, mode: 'review', legacyMode: null, requestedOutput: 'structured_review' };
  if (args.implementation) job = { ...job, mode: 'implementation', legacyMode: null, requestedOutput: 'structured_patch' };
  if (!args.dryRun) job = { ...job, stream: args.stream };
  const abort = new AbortController();
  const cancel = () => abort.abort();
  process.once('SIGINT', cancel);
  process.once('SIGTERM', cancel);
  const client = args.dryRun ? null : new NvidiaNimClient();
  const { result } = await runDelegatedSession({ job, rootDir, client, sessionId: args.session || job.id, followUp: args.followUp || '', dryRun: Boolean(args.dryRun), signal: abort.signal, onTextDelta: delta => { if (!args.json) process.stderr.write(delta); } });
  const serialized = `${JSON.stringify(redactSecrets(result), null, 2)}\n`;
  const target = outputPath(args.output, rootDir);
  if (target) { fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, serialized, { mode: 0o600 }); }
  process.stdout.write(serialized);
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) main().catch(error => { process.stderr.write(`KIMI ERROR ${error?.code || 'FAILED'}: ${sanitizedError(error)}\n`); process.exit(1); });

export { main, parseArgs };

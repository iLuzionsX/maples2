#!/usr/bin/env node
import process from 'node:process';
import { createTelemetry, safeRunId, DEFAULT_TELEMETRY_URL, telemetryTokenFromEnv } from './kimi-agent/telemetry.mjs';
import { resolveRepoRoot } from './kimi-agent/policy.mjs';

function parse(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--run') out.run = argv[++i];
    else if (arg === '--phase') out.phase = argv[++i];
    else if (arg === '--status') out.status = argv[++i];
    else if (arg === '--message') out.message = argv[++i];
    else if (arg === '--preview-url') out.previewUrl = argv[++i];
    else if (arg === '--feature-pr') out.featurePr = Number(argv[++i]);
    else if (arg === '--owner') out.owner = argv[++i];
    else if (arg === '--telemetry-url') out.telemetryUrl = argv[++i];
    else throw new Error(`Unknown option: ${arg}`);
  }
  if (!out.run) throw new Error('--run is required.');
  return out;
}

async function main() {
  const args = parse(process.argv.slice(2));
  const rootDir = resolveRepoRoot(process.cwd());
  const runId = safeRunId(args.run);
  const telemetry = createTelemetry({
    rootDir,
    runId,
    url: args.telemetryUrl || process.env.KIMI_TELEMETRY_URL || DEFAULT_TELEMETRY_URL,
    token: telemetryTokenFromEnv(),
    metadata: { supervisor: 'GPT-5.6 Sol', repository: 'iLuzionsX/maples2' },
  });
  if (args.previewUrl) {
    await telemetry.emit('preview_ready', { url: args.previewUrl, feature_pr: args.featurePr || null });
  } else if (args.owner) {
    await telemetry.emit('owner_feedback', { state: args.owner, message: args.message || '' });
  } else {
    if (!args.phase) throw new Error('--phase, --preview-url, or --owner is required.');
    await telemetry.emit('phase_changed', { phase: args.phase, status: args.status || null, message: args.message || '' });
  }
  process.stdout.write(`${JSON.stringify({ ok: true, run_id: runId })}\n`);
}

main().catch(error => { process.stderr.write(`KIMI RUN STATE ERROR: ${error.message}\n`); process.exit(1); });

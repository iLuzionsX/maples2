import fs from 'node:fs';
import path from 'node:path';
import { redactSecrets } from './security.mjs';

const RUN_ID_RE = /^[a-z0-9][a-z0-9._-]{0,95}$/i;

export function safeRunId(value) {
  const runId = String(value || '').trim();
  if (!RUN_ID_RE.test(runId) || /^(?:latest|index)$/i.test(runId)) throw new Error('Invalid or reserved Kimi run id.');
  return runId;
}

function numeric(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function publicUsage(usage) {
  if (!usage || typeof usage !== 'object') return null;
  const input = numeric(usage.input_tokens ?? usage.prompt_tokens);
  const output = numeric(usage.output_tokens ?? usage.completion_tokens);
  const total = numeric(usage.total_tokens ?? usage.totalTokens ?? usage.total) ?? (input != null || output != null ? (input || 0) + (output || 0) : null);
  return { input_tokens: input, output_tokens: output, total_tokens: total };
}

function cleanList(value, max = 80) {
  return Array.isArray(value) ? value.slice(0, max).map(item => String(item || '').slice(0, 320)).filter(Boolean) : [];
}

export function publicResultTelemetry(result) {
  const tests = Array.isArray(result?.test_results) ? result.test_results.slice(0, 40).map(item => ({
    command: String(item?.command || item?.result?.command || 'validation').slice(0, 180),
    ok: typeof item?.ok === 'boolean' ? item.ok : Number.isFinite(Number(item?.exit_code ?? item?.exitCode ?? item?.code)) ? Number(item?.exit_code ?? item?.exitCode ?? item?.code) === 0 : null,
    exit_code: Number.isFinite(Number(item?.exit_code ?? item?.exitCode ?? item?.code)) ? Number(item?.exit_code ?? item?.exitCode ?? item?.code) : null,
  })) : [];
  const patchContent = typeof result?.patch?.content === 'string' ? result.patch.content : '';
  return redactSecrets({
    status: String(result?.status || 'unknown').slice(0, 32),
    summary: String(result?.summary || '').slice(0, 1800),
    turns: numeric(result?.turns),
    usage: publicUsage(result?.usage),
    files_inspected: cleanList(result?.files_inspected),
    files_proposed_for_change: cleanList(result?.files_proposed_for_change),
    patch: result?.patch ? {
      format: String(result.patch.format || 'unified_diff').slice(0, 32),
      changed_files: cleanList(result.patch.changed_files),
      bytes: Buffer.byteLength(patchContent),
      sha256: String(result.patch.sha256 || '').slice(0, 80) || null,
    } : null,
    tests,
    risks: cleanList(result?.risks, 24),
    unresolved_issues: cleanList(result?.unresolved_issues, 24),
    error: result?.error ? String(result.error).slice(0, 600) : null,
  });
}

function eventEnvelope(runId, sequence, type, data, metadata) {
  return redactSecrets({
    schema_version: 1,
    run_id: runId,
    sequence,
    at: new Date().toISOString(),
    type: String(type || 'event').slice(0, 64),
    metadata,
    data,
  });
}

export class FileTelemetrySink {
  constructor({ rootDir, runId, metadata = {} }) {
    this.rootDir = rootDir;
    this.runId = safeRunId(runId);
    this.metadata = redactSecrets(metadata);
    this.sequence = 0;
  }

  async emit(type, data = {}) {
    this.sequence += 1;
    const event = eventEnvelope(this.runId, this.sequence, type, data, this.metadata);
    const directory = path.join(this.rootDir, '.kimi', 'telemetry');
    fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
    fs.appendFileSync(path.join(directory, `${this.runId}.jsonl`), `${JSON.stringify(event)}\n`, { mode: 0o600 });
    fs.writeFileSync(path.join(directory, `${this.runId}.state.json`), `${JSON.stringify({ run_id: this.runId, latest: event }, null, 2)}\n`, { mode: 0o600 });
    return event;
  }
}

export class HttpTelemetrySink {
  constructor({ url, token, runId, metadata = {} }) {
    this.url = String(url || '').trim();
    this.token = String(token || '').trim();
    this.runId = safeRunId(runId);
    this.metadata = redactSecrets(metadata);
    this.sequence = 0;
    if (!/^https:\/\//i.test(this.url)) throw new Error('Kimi telemetry URL must use HTTPS.');
  }

  async emit(type, data = {}) {
    this.sequence += 1;
    const event = eventEnvelope(this.runId, this.sequence, type, data, this.metadata);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(this.token ? { authorization: `Bearer ${this.token}` } : {}) },
        body: JSON.stringify(event),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Telemetry endpoint returned ${response.status}.`);
      return event;
    } finally {
      clearTimeout(timer);
    }
  }
}

export class TelemetryMux {
  constructor(sinks = []) { this.sinks = sinks.filter(Boolean); }
  async emit(type, data = {}) {
    const settled = await Promise.allSettled(this.sinks.map(sink => sink.emit(type, data)));
    return settled.find(item => item.status === 'fulfilled')?.value || null;
  }
}

export function createTelemetry({ rootDir, runId, url = '', token = '', metadata = {} }) {
  const sinks = [new FileTelemetrySink({ rootDir, runId, metadata })];
  if (url) sinks.push(new HttpTelemetrySink({ url, token, runId, metadata }));
  return new TelemetryMux(sinks);
}

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { buildResult } from './result.mjs';
import { stableJobScope, contentText } from './schema.mjs';
import { RepoPolicy } from './policy.mjs';
import { toolDefinitionsFor, dispatchTool, toolResultContent } from './tools.mjs';
import { redactSecrets, safeJson, sanitizedError } from './security.mjs';
import { KimiError } from './nim.mjs';
import { publicResultTelemetry, publicUsage } from './telemetry.mjs';

export function systemPrompt(job) {
  const context = Array.isArray(job.relevantContext) ? job.relevantContext.join('\n- ') : job.relevantContext;
  const criteria = job.acceptanceCriteria.length ? `\nAcceptance criteria:\n- ${job.acceptanceCriteria.join('\n- ')}` : '';
  const commands = job.commands.length ? job.commands.join(', ') : '(none; do not claim tests were run)';
  return [
    `You are Kimi K3, acting as ${job.role} for the Maples Three.js browser action-RPG.`,
    'GPT-5.6 Sol is the lead engineer. Your response is advisory and inspectable; never commit, merge, or apply changes.',
    'Preserve working systems and the existing commercial-indie stylized fantasy direction. Consider environment, lighting, VFX, combat feel, enemies, animation, camera, UI, mobile, performance, and regression risk.',
    `Job mode: ${job.mode}.`,
    job.mode === 'review' ? 'This is review-only: do not propose or return an applicable patch. Explain findings and recommendations only.' : job.legacyMode === 'css-override' ? 'Legacy CSS compatibility mode: submit only a safe stylesheet override through propose_css_override. The controller only validates and returns it; it never applies it.' : 'Implementation mode: you may submit a unified diff through propose_patch. The controller only validates and returns it; it never applies it.',
    `Allowed repository scope: ${job.allowedFiles.join(', ')}`,
    `Approved commands (exact matches only): ${commands}`,
    'Never read, search for, or reproduce secrets, credentials, environment files, private keys, or API keys. Do not make network calls through tools.',
    'Use repository tools before making claims about code. Do not claim to have run tests unless a run_approved_command result says so.',
    `Return the requested output as JSON with keys: summary, findings, files_inspected, files_proposed_for_change, patch, tests_run, test_results, risks, assumptions, unresolved_issues. ${job.mode === 'review' ? 'Set patch to null.' : 'Set patch to an object containing format and content when a change is justified.'}`,
    context ? `Relevant context:\n${context}` : '',
    criteria,
  ].filter(Boolean).join('\n');
}

export function initialPrompt(job) {
  return `Delegated objective:\n${job.objective}\n\nStart by inspecting the smallest relevant set of allowlisted files. Work in a focused, reproducible way. When finished, return the structured JSON result described in the system instructions.`;
}

function copyAssistantMessage(message) {
  const clone = JSON.parse(JSON.stringify(message || {}));
  clone.role = 'assistant';
  if (clone.content == null && !clone.tool_calls?.length) clone.content = '';
  return redactSecrets(clone);
}

function sessionPath(rootDir, sessionId) {
  return path.join(rootDir, '.kimi', 'sessions', `${sessionId}.json`);
}

function assertNoSymlinkPath(rootDir, target) {
  let current = rootDir;
  const relative = path.relative(rootDir, target);
  for (const part of relative.split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) throw new Error('Kimi session/log paths cannot traverse symlinks.');
  }
}

function safeSessionId(value) {
  const raw = String(value || '').trim();
  if (!/^[a-z0-9][a-z0-9._-]{0,79}$/i.test(raw) || /^(?:index|latest)$/i.test(raw)) throw new Error('Invalid or reserved session id.');
  return raw;
}

export function loadSession(rootDir, sessionId) {
  const safeId = safeSessionId(sessionId);
  const file = sessionPath(rootDir, safeId);
  if (!fs.existsSync(file)) return null;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!data || data.schema_version !== 1 || data.session_id !== safeId || !Array.isArray(data.messages)) throw new Error('Kimi session file is invalid.');
  return data;
}

function saveSession(rootDir, session) {
  const file = sessionPath(rootDir, session.session_id);
  assertNoSymlinkPath(rootDir, file);
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  const sanitized = redactSecrets({ ...session, updated_at: new Date().toISOString() });
  fs.writeFileSync(file, `${JSON.stringify(sanitized, null, 2)}\n`, { mode: 0o600 });
  return file;
}

function writeLog(rootDir, sessionId, event) {
  const file = path.join(rootDir, '.kimi', 'logs', `${sessionId}.jsonl`);
  assertNoSymlinkPath(rootDir, file);
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  fs.appendFileSync(file, `${safeJson({ at: new Date().toISOString(), ...event }, 200_000)}\n`, { mode: 0o600 });
}

async function emitTelemetry(telemetry, type, data = {}) {
  if (!telemetry?.emit) return;
  try { await telemetry.emit(type, data); } catch {}
}

function dryRunPlan(job, rootDir) {
  return {
    schema_version: 1,
    status: 'dry_run',
    job_id: job.id,
    mode: job.mode,
    repository_root: rootDir,
    model: job.model,
    endpoint: 'https://integrate.api.nvidia.com/v1/chat/completions',
    allowed_files: job.allowedFiles,
    commands: job.commands,
    max_turns: job.maxTurns,
    max_tokens: job.maxTokens,
    timeout_ms: job.timeoutMs,
    max_changed_files: job.maxChangedFiles,
    max_patch_bytes: job.maxPatchBytes,
    network_calls: 0,
    writes: 'none',
  };
}

export async function runDelegatedSession({ job, rootDir, client, sessionId = job.id, followUp = '', dryRun = false, onTextDelta, signal, telemetry = null }) {
  if (dryRun) return { result: dryRunPlan(job, rootDir), session: null };
  const safeId = safeSessionId(sessionId);
  let session = loadSession(rootDir, safeId);
  if (session) {
    if (session.job_scope !== stableJobScope(job)) throw new Error('Existing session scope does not match this job; start a new session.');
    if (followUp) session.messages.push({ role: 'user', content: `FOLLOW-UP REQUEST\n${followUp}` });
  } else {
    session = {
      schema_version: 1,
      session_id: safeId,
      job_id: job.id,
      job_scope: stableJobScope(job),
      created_at: new Date().toISOString(),
      messages: [{ role: 'system', content: systemPrompt(job) }, { role: 'user', content: initialPrompt(job) }],
      tool_events: [],
      turns: 0,
    };
  }
  const policy = new RepoPolicy(job, rootDir, { signal });
  const tools = toolDefinitionsFor(job);
  let assistantText = '';
  let usage = null;
  let status = 'completed';
  let error = null;
  await emitTelemetry(telemetry, 'run_started', {
    job_id: job.id,
    session_id: safeId,
    model: job.model,
    mode: job.mode,
    reasoning_effort: job.reasoningEffort,
    max_turns: job.maxTurns,
    max_tokens: job.maxTokens,
    max_changed_files: job.maxChangedFiles,
    max_patch_bytes: job.maxPatchBytes,
    timeout_ms: job.timeoutMs,
    allowed_files: job.allowedFiles,
    objective: job.objective,
    follow_up: Boolean(followUp),
  });
  try {
    for (let turn = 0; turn < job.maxTurns; turn += 1) {
      if (signal?.aborted) throw new KimiError('CANCELLED', 'Kimi session cancelled.');
      session.turns += 1;
      await emitTelemetry(telemetry, 'turn_started', { turn: session.turns });
      const response = await client.complete({ model: job.model, messages: session.messages, tools, maxTokens: job.maxTokens, reasoningEffort: job.reasoningEffort, temperature: job.mode === 'implementation' ? 0.2 : 0.35, stream: job.stream, timeoutMs: job.timeoutMs, retries: job.retries, signal, onChunk: chunk => {
        const delta = contentText(chunk?.choices?.[0]?.delta?.content);
        if (delta) onTextDelta?.(delta);
      }});
      usage = response.usage || usage;
      await emitTelemetry(telemetry, 'turn_completed', { turn: session.turns, usage: publicUsage(usage) });
      const assistant = copyAssistantMessage(response.message);
      session.messages.push(assistant);
      assistantText = contentText(assistant.content);
      writeLog(rootDir, safeId, { event: 'assistant', turn: session.turns, message: assistant });
      const calls = Array.isArray(assistant.tool_calls) ? assistant.tool_calls : [];
      if (!calls.length) break;
      for (const call of calls) {
        const toolName = call?.function?.name || '';
        const args = call?.function?.arguments || '{}';
        await emitTelemetry(telemetry, 'tool_started', { turn: session.turns, tool: toolName });
        const result = await dispatchTool(policy, toolName, args);
        const toolEvent = { name: toolName, call_id: call.id || '', result };
        session.tool_events.push(redactSecrets(toolEvent));
        session.messages.push({ role: 'tool', tool_call_id: call.id || `call-${session.turns}`, name: toolName, content: toolResultContent(result) });
        writeLog(rootDir, safeId, { event: 'tool', turn: session.turns, tool: toolName, result });
        await emitTelemetry(telemetry, 'tool_completed', { turn: session.turns, tool: toolName, ok: result?.ok !== false });
      }
    }
    if (session.turns >= job.maxTurns && Array.isArray(session.messages.at(-1)?.tool_calls) && session.messages.at(-1).tool_calls.length) {
      status = 'incomplete';
      error = `Maximum turns (${job.maxTurns}) reached while tools were still requested.`;
    }
  } catch (caught) {
    status = caught?.code === 'CANCELLED' ? 'cancelled' : 'failed';
    error = sanitizedError(caught);
    writeLog(rootDir, safeId, { event: 'error', error });
    await emitTelemetry(telemetry, 'run_error', { status, error });
  }
  const result = buildResult({ job, sessionId: safeId, assistantText, policy, toolEvents: session.tool_events, turns: session.turns, usage, status, error });
  session.last_result = result;
  session.proposed_patch = policy.proposed;
  saveSession(rootDir, session);
  await emitTelemetry(telemetry, 'run_completed', { status: result.status, result: publicResultTelemetry(result) });
  return { result, session };
}

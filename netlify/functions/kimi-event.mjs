import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

const DENY_KEYS = /^(?:raw_output|content|stdout|stderr|reasoning|thinking|messages?|assistant_message|patch_body|secret|token)$/i;
const RUN_ID_RE = /^[a-z0-9][a-z0-9._-]{0,95}$/i;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}

function expectedToken() {
  if (process.env.KIMI_TELEMETRY_TOKEN) return String(process.env.KIMI_TELEMETRY_TOKEN);
  if (!process.env.NVIDIA_API_KEY) return '';
  return crypto.createHash('sha256').update(`maples-kimi-telemetry-v1:${process.env.NVIDIA_API_KEY}`).digest('hex');
}

function secureEqual(a, b) {
  const left = Buffer.from(String(a || ''));
  const right = Buffer.from(String(b || ''));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function sanitize(value, depth = 0) {
  if (depth > 6) return '[truncated]';
  if (Array.isArray(value)) return value.slice(0, 100).map(item => sanitize(item, depth + 1));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, item] of Object.entries(value)) {
      if (DENY_KEYS.test(key)) continue;
      out[key] = sanitize(item, depth + 1);
    }
    return out;
  }
  if (typeof value === 'string') return value.slice(0, 4000);
  if (typeof value === 'number' || typeof value === 'boolean' || value == null) return value;
  return String(value).slice(0, 1000);
}

function updateFeatureContext(next, data = {}) {
  const featurePr = Number(data.feature_pr);
  if (Number.isInteger(featurePr) && featurePr > 0) {
    next.feature_pr = featurePr;
    next.metadata = { ...(next.metadata || {}), feature_pr: featurePr };
  }
  if (data.feature_branch) {
    const featureBranch = String(data.feature_branch).slice(0, 240);
    next.feature_branch = featureBranch;
    next.metadata = { ...(next.metadata || {}), feature_branch: featureBranch };
  }
}

export function applyEvent(previous, event) {
  const state = previous && typeof previous === 'object' ? previous : { schema_version: 1, run_id: event.run_id, events: [] };
  const events = Array.isArray(state.events) ? state.events : [];
  const next = {
    ...state,
    schema_version: 1,
    run_id: event.run_id,
    updated_at: event.at || new Date().toISOString(),
    events: [...events, event].slice(-250),
  };
  const data = event.data || {};
  if (event.type === 'run_started') {
    next.agent_status = 'running';
    next.status = 'running';
    next.phase = 'kimi';
    next.phase_status = 'running';
    next.started_at = event.at;
    next.metadata = { ...(next.metadata || {}), ...(event.metadata || {}), ...data };
    updateFeatureContext(next, data);
  } else if (event.type === 'turn_completed') {
    next.turns = data.turn ?? next.turns;
    next.usage = data.usage ?? next.usage;
  } else if (event.type === 'tool_completed') {
    next.last_tool = data.tool || null;
  } else if (event.type === 'run_completed') {
    const agentStatus = data.result?.status || data.status || 'completed';
    next.agent_status = agentStatus;
    next.status = agentStatus;
    next.phase = agentStatus === 'completed' ? 'sol_review' : 'attention';
    next.phase_status = agentStatus === 'completed' ? 'waiting_for_owner' : 'attention';
    if (data.result && typeof data.result === 'object' && agentStatus === 'completed') {
      const handoff = 'KIMI COMPLETE · SOL REVIEW WAITING FOR OWNER\nNEXT: Return to ChatGPT and say "review".';
      const summary = String(data.result.summary || '').trim();
      next.result = { ...data.result, summary: summary ? `${summary}\n\n${handoff}` : handoff };
    } else {
      next.result = data.result || null;
    }
    next.completed_at = event.at;
  } else if (event.type === 'phase_changed') {
    next.phase = data.phase || next.phase;
    if (data.status) next.phase_status = data.status;
    if (data.message) next.phase_message = data.message;
    updateFeatureContext(next, data);
  } else if (event.type === 'preview_ready') {
    next.phase = 'owner_playtest';
    next.phase_status = 'ready';
    next.preview_url = data.url || next.preview_url;
    updateFeatureContext(next, data);
  } else if (event.type === 'owner_feedback') {
    next.owner_feedback = { state: data.state || 'changes_requested', message: data.message || '', at: event.at };
    next.phase = data.state === 'approved' ? 'approved' : 'revision';
    next.phase_status = data.state || 'changes_requested';
  }
  return next;
}

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  const expected = expectedToken();
  if (!expected) return json({ error: 'telemetry_not_configured' }, 503);
  const supplied = String(request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!secureEqual(supplied, expected)) return json({ error: 'unauthorized' }, 401);
  let raw;
  try { raw = await request.json(); } catch { return json({ error: 'invalid_json' }, 400); }
  if (!RUN_ID_RE.test(String(raw?.run_id || ''))) return json({ error: 'invalid_run_id' }, 400);
  const event = sanitize(raw);
  event.run_id = String(raw.run_id);
  event.at = String(raw.at || new Date().toISOString());
  event.type = String(raw.type || 'event').slice(0, 64);
  event.sequence = Number.isFinite(Number(raw.sequence)) ? Number(raw.sequence) : 0;
  const store = getStore({ name: 'maples-kimi-runs', consistency: 'strong' });
  const key = `runs/${event.run_id}/state`;
  const previous = await store.get(key, { type: 'json', consistency: 'strong' });
  const state = applyEvent(previous, event);
  await store.setJSON(key, state);
  await store.setJSON('latest', { run_id: event.run_id, updated_at: state.updated_at });
  return json({ ok: true, run_id: event.run_id, sequence: event.sequence });
}

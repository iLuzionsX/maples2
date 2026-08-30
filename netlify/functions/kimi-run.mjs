import { getStore } from '@netlify/blobs';

const RUN_ID_RE = /^[a-z0-9][a-z0-9._-]{0,95}$/i;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store, max-age=0' } });
}

export default async function handler(request) {
  if (request.method !== 'GET') return json({ error: 'method_not_allowed' }, 405);
  const url = new URL(request.url);
  let runId = String(url.searchParams.get('run') || 'latest').trim();
  const store = getStore({ name: 'maples-kimi-runs', consistency: 'strong' });
  if (runId === 'latest') {
    const latest = await store.get('latest', { type: 'json', consistency: 'strong' });
    if (!latest?.run_id) return json({ error: 'no_runs' }, 404);
    runId = String(latest.run_id);
  }
  if (!RUN_ID_RE.test(runId)) return json({ error: 'invalid_run_id' }, 400);
  const state = await store.get(`runs/${runId}/state`, { type: 'json', consistency: 'strong' });
  if (!state) return json({ error: 'run_not_found', run_id: runId }, 404);
  return json(state);
}

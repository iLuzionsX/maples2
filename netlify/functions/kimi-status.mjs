const REPO = 'iLuzionsX/maples2';
const SITE = 'maplesttstst';
const GH = 'https://api.github.com';

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store, max-age=0',
      'access-control-allow-origin': '*',
    },
    body: JSON.stringify(body),
  };
}

async function gh(path) {
  const r = await fetch(`${GH}${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'maples-kimi-observatory',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });
  if (!r.ok) throw new Error(`GitHub ${r.status} ${path}`);
  return r.json();
}

async function loadEnabledJob(sha) {
  const items = await gh(`/repos/${REPO}/contents/.kimi/jobs?ref=${encodeURIComponent(sha)}`);
  for (const item of Array.isArray(items) ? items : []) {
    if (!item?.name?.endsWith('.json') || !item.download_url) continue;
    const r = await fetch(item.download_url, { headers: { 'User-Agent': 'maples-kimi-observatory' } });
    if (!r.ok) continue;
    const job = await r.json();
    if (!job?.enabled) continue;
    return {
      id: job.id || null,
      mode: job.mode || null,
      model: job.model || 'moonshotai/kimi-k3',
      reasoning_effort: job.reasoning_effort || null,
      objective: job.objective || null,
      max_turns: job.max_turns ?? null,
      max_tokens: job.max_tokens ?? null,
      max_changed_files: job.max_changed_files ?? null,
      max_patch_bytes: job.max_patch_bytes ?? null,
      timeout_ms: job.timeout_ms ?? null,
      allowed_files: Array.isArray(job.allowed_files) ? job.allowed_files : [],
    };
  }
  return null;
}

async function loadTrace(pr, sha) {
  const url = `https://deploy-preview-${pr}--${SITE}.netlify.app/__kimi/observatory/trace.json?t=${Date.now()}`;
  try {
    const r = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!r.ok) return { state: 'unavailable', trace: null };
    const trace = await r.json();
    const matching = trace?.build?.commit_ref === sha;
    return { state: matching ? 'current' : 'stale', trace };
  } catch {
    return { state: 'unavailable', trace: null };
  }
}

export default async (request) => {
  const url = new URL(request.url);
  const pr = Number(url.searchParams.get('pr'));
  if (!Number.isInteger(pr) || pr <= 0) return json(400, { ok: false, telemetry_error: 'invalid pr' });

  try {
    const pull = await gh(`/repos/${REPO}/pulls/${pr}`);
    const sha = pull?.head?.sha || '';
    if (!sha) return json(502, { ok: false, telemetry_error: 'PR head missing' });

    const combined = await gh(`/repos/${REPO}/commits/${sha}/status`);
    const netlify = (combined?.statuses || []).find((s) => String(s?.context || '').startsWith('netlify/')) || null;
    const run_state = netlify?.state || combined?.state || 'unknown';

    const [job, traceResult] = await Promise.all([
      loadEnabledJob(sha).catch(() => null),
      loadTrace(pr, sha),
    ]);

    return json(200, {
      ok: true,
      pr,
      head: {
        sha,
        branch: pull?.head?.ref || null,
        updated_at: pull?.updated_at || null,
      },
      run: {
        state: run_state,
        description: netlify?.description || null,
        updated_at: netlify?.updated_at || netlify?.created_at || pull?.updated_at || null,
        target_url: netlify?.target_url || null,
      },
      job,
      trace_state: traceResult.state,
      trace: traceResult.trace,
    });
  } catch (error) {
    return json(200, {
      ok: false,
      telemetry_error: String(error?.message || error),
      pr,
    });
  }
};

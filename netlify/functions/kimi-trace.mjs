const SITE = 'maplesttstst.netlify.app';

export default async (request) => {
  const url = new URL(request.url);
  const pr = Number(url.searchParams.get('pr'));
  if (!Number.isInteger(pr) || pr < 1 || pr > 99999) {
    return Response.json({ error: 'invalid_pr' }, { status: 400 });
  }

  const target = `https://deploy-preview-${pr}--${SITE}/__kimi/observatory/trace.json?t=${Date.now()}`;
  try {
    const response = await fetch(target, {
      headers: { accept: 'application/json' },
      redirect: 'follow',
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      return Response.json({ error: 'trace_unavailable', status: response.status }, {
        status: response.status === 404 ? 404 : 502,
        headers: { 'cache-control': 'no-store' },
      });
    }
    const trace = await response.json();
    return Response.json(trace, {
      headers: {
        'cache-control': 'no-store, max-age=0',
        'x-content-type-options': 'nosniff',
      },
    });
  } catch (error) {
    return Response.json({ error: 'trace_fetch_failed', message: String(error?.message || error).slice(0, 160) }, {
      status: 502,
      headers: { 'cache-control': 'no-store' },
    });
  }
};

import { contentText, DEFAULT_BASE_URL, cleanText } from './schema.mjs';
import { redactSecrets } from './security.mjs';

const RETRYABLE_STATUSES = new Set([408, 409, 425, 429, 500, 502, 503, 504]);

export class KimiError extends Error {
  constructor(code, message, { status = null, retryable = false } = {}) {
    super(message);
    this.name = 'KimiError';
    this.code = code;
    this.status = status;
    this.retryable = retryable;
  }
}

export function validateEndpoint(value = DEFAULT_BASE_URL, { test = false } = {}) {
  let url;
  try { url = new URL(value); } catch { throw new KimiError('INVALID_ENDPOINT', 'NVIDIA endpoint is not a valid URL.'); }
  if (url.protocol !== 'https:' && !(test && url.hostname === '127.0.0.1')) throw new KimiError('INVALID_ENDPOINT', 'NVIDIA endpoint must use HTTPS.');
  if (!test && url.hostname !== 'integrate.api.nvidia.com') throw new KimiError('ENDPOINT_NOT_ALLOWED', 'Only the NVIDIA NIM endpoint integrate.api.nvidia.com is allowed.');
  if (!test && url.pathname.replace(/\/$/, '') !== '/v1') throw new KimiError('ENDPOINT_NOT_ALLOWED', 'Only the NVIDIA NIM /v1 endpoint is allowed.');
  return `${url.origin}${url.pathname.replace(/\/$/, '')}`;
}

function linkAbortSignal(external, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new KimiError('TIMEOUT', `NVIDIA request exceeded ${timeoutMs} milliseconds.`)), timeoutMs);
  const onAbort = () => controller.abort(external?.reason || new KimiError('CANCELLED', 'Kimi session cancelled.'));
  if (external) {
    if (external.aborted) onAbort();
    else external.addEventListener('abort', onAbort, { once: true });
  }
  return { signal: controller.signal, dispose: () => { clearTimeout(timer); external?.removeEventListener('abort', onAbort); } };
}

function parseErrorBody(raw, status) {
  let data = {};
  try { data = JSON.parse(raw); } catch {}
  const message = cleanText(data?.error?.message || data?.message || raw || `NVIDIA request failed (${status})`, 700) || `NVIDIA request failed (${status})`;
  if (status === 401) return new KimiError('AUTH_FAILED', 'NVIDIA authentication failed. Check NVIDIA_API_KEY.', { status });
  if (status === 403) return new KimiError('FORBIDDEN', 'NVIDIA rejected access to this model or endpoint.', { status });
  if (status === 404) return new KimiError('MODEL_NOT_FOUND', `NVIDIA model or endpoint was not found: ${message}`, { status });
  if (status === 429) return new KimiError('RATE_LIMITED', `NVIDIA rate limit reached: ${message}`, { status, retryable: true });
  return new KimiError('NVIDIA_HTTP_ERROR', message, { status, retryable: RETRYABLE_STATUSES.has(status) });
}

function parseSseBlock(block) {
  const data = block.split('\n').filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n').trim();
  if (!data || data === '[DONE]') return null;
  try { return JSON.parse(data); } catch { throw new KimiError('STREAM_PARSE_ERROR', 'NVIDIA returned malformed streaming JSON.'); }
}

function mergeToolCall(target, delta, index) {
  const current = target[index] || { index, id: '', type: 'function', function: { name: '', arguments: '' } };
  if (delta.id) current.id = delta.id;
  if (delta.type) current.type = delta.type;
  if (delta.function?.name) current.function.name += delta.function.name;
  if (delta.function?.arguments) current.function.arguments += delta.function.arguments;
  for (const [key, value] of Object.entries(delta)) if (!['id', 'type', 'function', 'index'].includes(key)) current[key] = value;
  target[index] = current;
}

export function mergeChatChunk(state, chunk) {
  if (chunk?.model) state.model = cleanText(chunk.model, 160);
  if (chunk?.usage) state.usage = chunk.usage;
  const choice = chunk?.choices?.[0];
  if (!choice) return state;
  if (choice.finish_reason) state.finish_reason = choice.finish_reason;
  const delta = choice.delta || {};
  if (delta.role) state.message.role = delta.role;
  if (delta.content != null) state.message.content = `${state.message.content || ''}${contentText(delta.content)}`;
  if (delta.reasoning_content != null) state.message.reasoning_content = `${state.message.reasoning_content || ''}${contentText(delta.reasoning_content)}`;
  if (delta.reasoning != null) state.message.reasoning = `${state.message.reasoning || ''}${contentText(delta.reasoning)}`;
  if (Array.isArray(delta.tool_calls)) delta.tool_calls.forEach((toolCall, index) => mergeToolCall(state.toolCalls, toolCall, toolCall.index ?? index));
  for (const [key, value] of Object.entries(delta)) if (!['role', 'content', 'reasoning_content', 'reasoning', 'tool_calls'].includes(key)) state.message[key] = value;
  return state;
}

export async function readChatResponse(response, { onChunk } = {}) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await response.json();
    const message = data?.choices?.[0]?.message || {};
    return { model: cleanText(data?.model, 160), usage: data?.usage || null, finish_reason: data?.choices?.[0]?.finish_reason || null, message, toolCalls: message.tool_calls || [] };
  }
  if (!response.body?.getReader) throw new KimiError('NO_RESPONSE_BODY', 'NVIDIA returned no readable response body.');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const state = { model: '', usage: null, finish_reason: null, message: { role: 'assistant', content: '' }, toolCalls: [] };
  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    buffer = buffer.replace(/\r\n?/g, '\n');
    let boundary;
    while ((boundary = buffer.indexOf('\n\n')) >= 0) {
      const event = parseSseBlock(buffer.slice(0, boundary));
      buffer = buffer.slice(boundary + 2);
      if (event) { mergeChatChunk(state, event); onChunk?.(event); }
    }
  }
  buffer += decoder.decode();
  buffer = buffer.replace(/\r\n?/g, '\n');
  if (buffer.trim()) { const event = parseSseBlock(buffer); if (event) { mergeChatChunk(state, event); onChunk?.(event); } }
  state.message.tool_calls = state.toolCalls.sort((a, b) => a.index - b.index).map(({ index, ...call }) => call);
  if (!state.message.tool_calls.length) delete state.message.tool_calls;
  return state;
}

export class NvidiaNimClient {
  constructor({ apiKey = process.env.NVIDIA_API_KEY, baseUrl = process.env.NVIDIA_BASE_URL || DEFAULT_BASE_URL, fetchImpl = globalThis.fetch, testEndpoint = false } = {}) {
    if (!apiKey || /\s/.test(apiKey)) throw new KimiError('MISSING_API_KEY', 'NVIDIA_API_KEY is missing or invalid.');
    if (typeof fetchImpl !== 'function') throw new KimiError('NO_FETCH', 'Node fetch is unavailable.');
    this.apiKey = apiKey;
    this.baseUrl = validateEndpoint(baseUrl, { test: testEndpoint });
    this.fetch = fetchImpl;
  }

  async complete({ model, messages, tools = [], maxTokens, reasoningEffort, temperature = 0.2, stream = true, timeoutMs = 720_000, retries = 3, signal, onChunk }) {
    const body = {
      model,
      messages,
      max_tokens: maxTokens,
      reasoning_effort: reasoningEffort,
      temperature,
      stream: Boolean(stream),
    };
    if (tools.length) body.tools = tools;
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      if (signal?.aborted) throw new KimiError('CANCELLED', 'Kimi session cancelled.');
      const linked = linkAbortSignal(signal, timeoutMs);
      try {
        const response = await this.fetch(`${this.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json', Accept: stream ? 'text/event-stream' : 'application/json' },
          body: JSON.stringify(body),
          signal: linked.signal,
        });
        if (!response.ok) {
          const requestError = parseErrorBody(await response.text().catch(() => ''), response.status);
          requestError.retryAfter = response.headers.get('retry-after');
          throw requestError;
        }
        const result = await readChatResponse(response, { onChunk });
        if (!result.message || (!result.message.content && !result.message.tool_calls?.length)) throw new KimiError('EMPTY_RESPONSE', 'NVIDIA returned no assistant content or tool call.');
        return result;
      } catch (error) {
        const reason = linked.signal.reason;
        if (signal?.aborted) throw new KimiError('CANCELLED', 'Kimi session cancelled.');
        if (reason?.code === 'TIMEOUT' || error?.name === 'AbortError') throw new KimiError('TIMEOUT', `NVIDIA request exceeded ${timeoutMs} milliseconds.`);
        lastError = error instanceof KimiError ? error : new KimiError('NETWORK_ERROR', redactSecrets(error?.message || String(error)), { retryable: true });
        if (!lastError.retryable || attempt >= retries) throw lastError;
        const retryAfter = Number(responseRetryAfter(error?.retryAfter)) || 0;
        const delay = Math.min(10_000, retryAfter || (500 * (2 ** attempt)) + Math.floor(Math.random() * 250));
        await new Promise(resolve => setTimeout(resolve, delay));
      } finally { linked.dispose(); }
    }
    throw lastError || new KimiError('NVIDIA_ERROR', 'NVIDIA request failed.');
  }
}

function responseRetryAfter(value) {
  if (!value) return 0;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric * 1_000 : 0;
}

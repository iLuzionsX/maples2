const SECRET_PATTERNS = [
  /nvapi-[A-Za-z0-9_-]{12,}/g,
  /sk-[A-Za-z0-9_-]{20,}/g,
  /gh[pousr]_[A-Za-z0-9_]{20,}/g,
  /github_pat_[A-Za-z0-9_]{20,}/g,
  /AKIA[0-9A-Z]{16}/g,
  /Bearer\s+[A-Za-z0-9._~+/=-]{16,}/gi,
  /-----BEGIN [^-]+ PRIVATE KEY-----[\s\S]*?-----END [^-]+ PRIVATE KEY-----/g,
];

export function redactSecrets(value) {
  if (typeof value === 'string') {
    let output = value;
    for (const pattern of SECRET_PATTERNS) output = output.replace(pattern, '[REDACTED_SECRET]');
    output = output.replace(/((?:api[_-]?key|access[_-]?token|secret|password|private[_-]?key)\s*[=:]\s*["']?)[A-Za-z0-9_./+=:-]{16,}/gi, '$1[REDACTED_SECRET]');
    return output;
  }
  if (Array.isArray(value)) return value.map(redactSecrets);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, redactSecrets(item)]));
  return value;
}

export function safeJson(value, maxBytes = 1_000_000) {
  const text = JSON.stringify(redactSecrets(value));
  return text.length > maxBytes ? `${text.slice(0, maxBytes)}...[TRUNCATED]` : text;
}

export function sanitizedError(error) {
  const message = redactSecrets(String(error?.message || error || 'Unknown error')).replace(/[\r\n]+/g, ' ').slice(0, 700);
  return message || 'Unknown error';
}

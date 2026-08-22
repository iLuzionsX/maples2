const SETTINGS_KEY = 'maples.ai.settings.v1';
const SESSION_KEY = 'maples.ai.key.v1';
const DEFAULT_MODEL = 'auto:0x-alpha';

function safeStorage(storage, method, ...args) {
  try { return storage?.[method]?.(...args); } catch { return null; }
}

export function loadAISettings() {
  let saved = {};
  try { saved = JSON.parse(safeStorage(localStorage, 'getItem', SETTINGS_KEY) || '{}'); } catch {}
  return {
    enabled: Boolean(saved.enabled),
    model: typeof saved.model === 'string' && saved.model.trim() && saved.model !== 'gpt-5.6' ? saved.model.trim() : DEFAULT_MODEL,
    apiKey: safeStorage(sessionStorage, 'getItem', SESSION_KEY) || ''
  };
}

export function saveAISettings(settings) {
  const normalized = {
    enabled: Boolean(settings.enabled),
    model: String(settings.model || DEFAULT_MODEL).trim().slice(0, 120) || DEFAULT_MODEL,
    apiKey: String(settings.apiKey || '').trim()
  };
  safeStorage(localStorage, 'setItem', SETTINGS_KEY, JSON.stringify({ enabled: normalized.enabled, model: normalized.model }));
  if (normalized.apiKey) safeStorage(sessionStorage, 'setItem', SESSION_KEY, normalized.apiKey);
  else safeStorage(sessionStorage, 'removeItem', SESSION_KEY);
  return normalized;
}

export function clearAIKey() {
  safeStorage(sessionStorage, 'removeItem', SESSION_KEY);
}

export class CloudAIClient {
  constructor() {
    this.settings = loadAISettings();
    this.resolvedModel = '';
  }

  configure(next) {
    const previousKey = this.settings.apiKey;
    const previousModel = this.settings.model;
    this.settings = saveAISettings({ ...this.settings, ...next });
    if (previousKey !== this.settings.apiKey || previousModel !== this.settings.model) this.resolvedModel = '';
    return this.settings;
  }

  get configured() {
    return this.settings.enabled && this.settings.apiKey.length >= 20;
  }

  get modelLabel() {
    return this.resolvedModel || (this.settings.model === DEFAULT_MODEL ? '0x Alpha · auto' : this.settings.model);
  }

  async test() {
    if (!this.configured) throw new Error('Add a Nous Portal API key and enable Cloud AI first.');
    return this._request({
      test: true,
      npc: { name: 'Lumenwood relay', role: 'connection test', personality: '', knowledge: '' },
      playerLine: 'Reply with the single word Connected.',
      context: 'Connection test only.',
      history: []
    });
  }

  async talk({ npc, playerLine, context, history = [] }) {
    if (!this.configured) throw new Error('Cloud AI is not configured.');
    return this._request({ npc, playerLine, context, history });
  }

  async _request(payload) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18000);
    try {
      const response = await fetch('/.netlify/functions/ai-dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        credentials: 'same-origin',
        signal: controller.signal,
        body: JSON.stringify({
          ...payload,
          apiKey: this.settings.apiKey,
          model: this.resolvedModel || this.settings.model
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Cloud AI request failed (${response.status}).`);
      if (!data.text || typeof data.text !== 'string') throw new Error('Cloud AI returned no dialogue.');
      if (typeof data.model === 'string' && data.model.trim()) this.resolvedModel = data.model.trim();
      return data.text.trim();
    } catch (error) {
      if (error?.name === 'AbortError') throw new Error('Cloud AI timed out. Local dialogue is still available.');
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}

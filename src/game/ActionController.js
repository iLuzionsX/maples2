const clamp01 = value => Math.max(0, Math.min(1, value));

function eventThreshold(event, duration) {
  if (Number.isFinite(event.atTime)) return Math.max(0, event.atTime);
  if (Number.isFinite(event.atProgress) && Number.isFinite(duration)) return Math.max(0, duration * event.atProgress);
  return 0;
}

function windowAllows(window, time, progress) {
  if (!window) return false;
  if (Number.isFinite(window.fromTime) && time < window.fromTime) return false;
  if (Number.isFinite(window.toTime) && time > window.toTime) return false;
  if (Number.isFinite(window.fromProgress) && progress < window.fromProgress) return false;
  if (Number.isFinite(window.toProgress) && progress > window.toProgress) return false;
  return true;
}

export class ActionController {
  constructor({ actions = {}, inputResolver = null, context = null } = {}) {
    this.actions = actions;
    this.inputResolver = inputResolver;
    this.context = context;

    this.currentAction = null;
    this.actionTime = 0;
    this.actionDuration = 0;
    this.idleTime = 0;
    this.lastDuration = 0;
    this.comboIndex = 0;
    this.comboDeadline = 0;
    this.extraInvulnerability = 0;

    this.cooldowns = Object.create(null);
    this.bufferedInput = null;
    this._bufferSerial = 0;
    this._actionSerial = 0;
    this._pendingEvents = [];
    this._firedEventKeys = new Set();
    this._firedEventNames = new Set();
    this._completionPending = false;
  }

  get definition() {
    return this.currentAction ? this.actions[this.currentAction] || null : null;
  }

  get state() {
    return this.definition?.state || 'idle';
  }

  get time() {
    return this.currentAction ? this.actionTime : this.idleTime;
  }

  get duration() {
    return this.currentAction ? this.actionDuration : this.lastDuration;
  }

  get progress() {
    if (!this.currentAction || !Number.isFinite(this.actionDuration) || this.actionDuration <= 0) return 0;
    return clamp01(this.actionTime / this.actionDuration);
  }

  get movementScale() {
    return this.definition?.movementScale ?? 1;
  }

  get turnScale() {
    return this.definition?.turnScale ?? 1;
  }

  get isActive() {
    return Boolean(this.currentAction);
  }

  get isInvulnerable() {
    if (this.extraInvulnerability > 0) return true;
    const window = this.definition?.invulnerability;
    if (!window) return false;
    return this.actionTime >= (window.fromTime || 0) && this.actionTime < (window.toTime ?? Infinity);
  }

  get invulnerabilityRemaining() {
    let remaining = Math.max(0, this.extraInvulnerability);
    const window = this.definition?.invulnerability;
    if (window && this.actionTime >= (window.fromTime || 0) && this.actionTime < (window.toTime ?? Infinity)) {
      remaining = Math.max(remaining, Math.max(0, (window.toTime ?? this.actionTime) - this.actionTime));
    }
    return remaining;
  }

  cooldown(key) {
    return Math.max(0, this.cooldowns[key] || 0);
  }

  setCooldown(key, value) {
    this.cooldowns[key] = Math.max(0, Number(value) || 0);
  }

  setComboDeadline(value) {
    this.comboDeadline = Math.max(0, Number(value) || 0);
  }

  setInvulnerability(value) {
    this.extraInvulnerability = Math.max(0, Number(value) || 0);
  }

  setTime(value) {
    const next = Math.max(0, Number(value) || 0);
    if (this.currentAction) this.actionTime = next;
    else this.idleTime = next;
  }

  setDuration(value) {
    const next = Math.max(0, Number(value) || 0);
    if (this.currentAction) this.actionDuration = next;
    this.lastDuration = next;
  }

  nextComboIndex() {
    return this.comboDeadline > 0 ? (this.comboIndex + 1) % 3 : 0;
  }

  resolveInput(input) {
    return this.inputResolver ? this.inputResolver(input, this) : input;
  }

  canStart(actionId) {
    const target = this.actions[actionId];
    if (!target) return false;
    if (target.cooldownKey && this.cooldown(target.cooldownKey) > 0) return false;
    if (typeof target.guard === 'function' && !target.guard(this.context, this)) return false;
    if (!this.currentAction) return true;

    const current = this.definition;
    if (!current) return true;
    const windows = current.cancelWindows || {};
    const window = windows[actionId] || windows[target.kind] || null;
    return windowAllows(window, this.actionTime, this.progress);
  }

  start(actionId, { force = false, skipCooldown = false, payload = null } = {}) {
    const target = this.actions[actionId];
    if (!target) return false;
    if (!force && !this.canStart(actionId)) return false;

    if (this.currentAction) this.stop(force ? 'forced' : 'cancelled');

    this.currentAction = actionId;
    this.actionTime = 0;
    this.actionDuration = Number.isFinite(target.duration) ? Math.max(0, target.duration) : Infinity;
    this.lastDuration = this.actionDuration;
    this.idleTime = 0;
    this._completionPending = false;
    this._actionSerial += 1;
    this._pendingEvents.length = 0;
    this._firedEventKeys.clear();
    this._firedEventNames.clear();

    if (Number.isInteger(target.comboIndex)) this.comboIndex = target.comboIndex;
    if (target.kind === 'attack' && Number.isFinite(target.comboWindow)) this.setComboDeadline(target.comboWindow);
    if (!skipCooldown && target.cooldownKey && Number.isFinite(target.cooldown)) this.setCooldown(target.cooldownKey, target.cooldown);

    this._emitDueEvents(target, payload);
    return true;
  }

  stop() {
    if (!this.currentAction) return false;
    const serial = this._actionSerial;
    this._pendingEvents = this._pendingEvents.filter(event => event.actionSerial !== serial);
    this.currentAction = null;
    this.actionTime = 0;
    this.idleTime = 0;
    this._completionPending = false;
    return true;
  }

  advanceReal(dt, { cooldowns = true, combo = true, buffer = true } = {}) {
    const elapsed = Math.max(0, Number(dt) || 0);
    if (cooldowns) {
      for (const key of Object.keys(this.cooldowns)) this.cooldowns[key] = Math.max(0, this.cooldowns[key] - elapsed);
    }
    if (combo) this.comboDeadline = Math.max(0, this.comboDeadline - elapsed);
    if (buffer && this.bufferedInput) {
      this.bufferedInput.remaining -= elapsed;
      if (this.bufferedInput.remaining <= 0) this.bufferedInput = null;
    }
  }

  advanceWorld(dt, { deferCompletion = false } = {}) {
    const elapsed = Math.max(0, Number(dt) || 0);
    this.extraInvulnerability = Math.max(0, this.extraInvulnerability - elapsed);

    if (!this.currentAction) {
      this.idleTime += elapsed;
      return;
    }

    this.actionTime += elapsed;
    this._emitDueEvents(this.definition, null);

    if (Number.isFinite(this.actionDuration) && this.actionTime >= this.actionDuration) {
      if (deferCompletion) this._completionPending = true;
      else this.complete();
    }
  }

  finalizeWorldStep() {
    if (this._completionPending) this.complete();
  }

  complete() {
    if (!this.currentAction) return false;
    this.currentAction = null;
    this.actionTime = 0;
    this.idleTime = 0;
    this._completionPending = false;
    return true;
  }

  bufferInput(input, payload = null, ttl = 0.16) {
    const remaining = Math.max(0, Number(ttl) || 0);
    this.bufferedInput = {
      input,
      payload,
      remaining,
      serial: ++this._bufferSerial,
    };
    return this.bufferedInput.serial;
  }

  peekReadyInput() {
    const buffered = this.bufferedInput;
    if (!buffered) return null;
    const actionId = this.resolveInput(buffered.input);
    if (!actionId || !this.canStart(actionId)) return null;
    return { ...buffered, actionId };
  }

  consumeBufferedInput(serial) {
    if (!this.bufferedInput || this.bufferedInput.serial !== serial) return false;
    this.bufferedInput = null;
    return true;
  }

  clearBufferedInput(input = null) {
    if (!this.bufferedInput) return false;
    if (input && this.bufferedInput.input !== input) return false;
    this.bufferedInput = null;
    return true;
  }

  hasBufferedInput(input = null) {
    return Boolean(this.bufferedInput && (!input || this.bufferedInput.input === input));
  }

  consumeEvent(name) {
    const index = this._pendingEvents.findIndex(event => event.name === name);
    if (index < 0) return null;
    return this._pendingEvents.splice(index, 1)[0];
  }

  hasPendingEvent(name) {
    return this._pendingEvents.some(event => event.name === name);
  }

  hasEventFired(name) {
    return this._firedEventNames.has(name);
  }

  setEventFired(name, fired) {
    if (fired) {
      this._firedEventNames.add(name);
      return;
    }
    this._firedEventNames.delete(name);
    const definition = this.definition;
    for (let i = 0; i < (definition?.events?.length || 0); i++) {
      if (definition.events[i].name === name) this._firedEventKeys.delete(`${this._actionSerial}:${i}`);
    }
    this._pendingEvents = this._pendingEvents.filter(event => event.name !== name || event.actionSerial !== this._actionSerial);
  }

  _emitDueEvents(definition, payload) {
    if (!definition) return;
    const events = definition.events || [];
    for (let index = 0; index < events.length; index++) {
      const event = events[index];
      const key = `${this._actionSerial}:${index}`;
      if (this._firedEventKeys.has(key)) continue;
      if (this.actionTime + 1e-9 < eventThreshold(event, this.actionDuration)) continue;
      this._firedEventKeys.add(key);
      this._firedEventNames.add(event.name);
      this._pendingEvents.push({
        name: event.name,
        actionId: this.currentAction,
        actionSerial: this._actionSerial,
        data: event.data || null,
        payload,
      });
    }
  }
}

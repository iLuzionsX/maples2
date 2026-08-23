import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  buildMessages,
  pickOxAlphaModel,
  readChatStream,
  readJobFiles,
  validateEnabledJobs,
  validateJob,
} from './ox-delegate.mjs';
import { verifyResult } from './ox-verify-output.mjs';

const NOUS_BASE_URL = 'https://inference-api.nousresearch.com/v1';
const AUTO_MODEL = 'auto:ox-alpha';
const JOB_DIR = '.ox/jobs';
const OUTPUT_DIR = 'dist/__ox';
const DEFAULT_TIMEOUT_MS = 240_000;
const DEFAULT_ATTEMPTS = 2;
const DEFAULT_PARALLEL = 2;

function clean(value, max = 2000) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .trim()
    .slice(0, max);
}

function boundedInt(value, fallback, min, max, name) {
  if (value == null || value === '') return fallback;
  const parsed = Math.trunc(Number(value));
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    throw new Error(`${name} must be ${min}..${max}`);
  }
  return parsed;
}

export function resilientConfig(raw = {}) {
  return {
    requestTimeoutMs: boundedInt(raw.request_timeout_ms, DEFAULT_TIMEOUT_MS, 30_000, 480_000, 'request_timeout_ms'),
    maxAttempts: boundedInt(raw.max_attempts, DEFAULT_ATTEMPTS, 1, 3, 'max_attempts'),
  };
}

export function isRetryableOxError(error) {
  if (!error) return false;
  if (error.name === 'AbortError' || error.name === 'TimeoutError' || error.name === 'TypeError' || error.name === 'OxOutputError') return true;
  const status = Number(error.status || 0);
  return status === 408 || status === 409 || status === 425 || status === 429 || status >= 500;
}

class OxOutputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OxOutputError';
  }
}

class OxHttpError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'OxHttpError';
    this.status = status;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function eligibleContext() {
  const context = process.env.CONTEXT || '';
  return context === 'deploy-preview' || context === 'branch-deploy' || process.env.OX_ALLOW_LOCAL === '1';
}

async function resolveModel(apiKey, requestedModel, signal) {
  if (requestedModel !== AUTO_MODEL) return requestedModel;
  const response = await fetch(`${NOUS_BASE_URL}/models`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    signal,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new OxHttpError(
      clean(data?.error?.message || data?.message, 500) || `Nous model discovery failed (${response.status})`,
      response.status,
    );
  }
  const model = pickOxAlphaModel(data);
  if (!model) throw new Error('Ox Alpha is not visible to this Nous Portal API key.');
  return model;
}

async function oneAttempt(job, config, messages, model, apiKey, attempt) {
  const controller = new AbortController();
  const startedAt = Date.now();
  let connected = false;
  const timeout = setTimeout(() => controller.abort(), config.requestTimeoutMs);
  const heartbeat = setInterval(() => {
    const elapsed = Math.round((Date.now() - startedAt) / 1000);
    console.log(`OX HEARTBEAT: ${job.id} attempt=${attempt}/${config.maxAttempts} elapsed=${elapsed}s connected=${connected}`);
  }, 20_000);
  heartbeat.unref?.();

  try {
    const response = await fetch(`${NOUS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages,
        reasoning_effort: job.reasoningEffort,
        include_reasoning: false,
        max_tokens: job.maxTokens,
        stream: true,
        tags: ['product=maples', 'workflow=code-delegation-resilient'],
      }),
    });

    if (!response.ok) {
      const raw = await response.text().catch(() => '');
      let data = {};
      try { data = JSON.parse(raw); } catch {}
      throw new OxHttpError(
        clean(data?.error?.message || data?.message || raw, 800) || `Nous request failed (${response.status})`,
        response.status,
      );
    }

    const streamed = await readChatStream(response, () => {
      connected = true;
      console.log(`OX STREAM CONNECTED: ${job.id} attempt=${attempt} after=${Date.now() - startedAt}ms`);
    });
    if (!streamed.text) throw new Error('Nous returned no response text.');
    console.log(`OX STREAM COMPLETE: ${job.id} attempt=${attempt} duration=${Date.now() - startedAt}ms outputChars=${streamed.text.length}`);
    return { text: streamed.text, model: clean(streamed.model || model, 160) };
  } finally {
    clearTimeout(timeout);
    clearInterval(heartbeat);
  }
}

async function runJob(job, config, rootDir, apiKey) {
  const files = readJobFiles(job, rootDir);
  const messages = buildMessages(job, files);

  const modelController = new AbortController();
  const modelTimer = setTimeout(() => modelController.abort(), 30_000);
  let model;
  try {
    model = await resolveModel(apiKey, job.model, modelController.signal);
  } finally {
    clearTimeout(modelTimer);
  }

  const errors = [];
  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    console.log(
      `OX ATTEMPT START: ${job.id} ${attempt}/${config.maxAttempts} model=${model} ` +
      `reasoning=${job.reasoningEffort} maxTokens=${job.maxTokens} timeoutMs=${config.requestTimeoutMs}`,
    );
    try {
      const streamed = await oneAttempt(job, config, messages, model, apiKey, attempt);
      const candidate = {
        id: job.id,
        model: streamed.model,
        mode: job.mode,
        reasoning_effort: job.reasoningEffort,
        files: job.files,
        created_at: new Date().toISOString(),
        attempts: attempt,
        output: streamed.text,
      };
      try {
        verifyResult(job, candidate, process.env.COMMIT_REF || '', rootDir);
      } catch (error) {
        throw new OxOutputError(`Verifier rejected Ox output: ${clean(error?.message || error, 1000)}`);
      }
      return candidate;
    } catch (error) {
      const timedOut = error?.name === 'AbortError';
      const message = timedOut
        ? `Nous/Ox attempt exceeded ${Math.round(config.requestTimeoutMs / 1000)} seconds.`
        : clean(error?.message || error, 1000);
      const retryable = timedOut || isRetryableOxError(error);
      errors.push(message);
      console.error(`OX ATTEMPT FAIL: ${job.id} ${attempt}/${config.maxAttempts} retryable=${retryable}: ${message}`);
      if (!retryable || attempt >= config.maxAttempts) {
        const finalError = new Error(errors.join(' | '));
        finalError.attempts = attempt;
        throw finalError;
      }
      await delay(1250 * attempt);
    }
  }
  throw new Error('Ox attempts exhausted.');
}

async function runPool(items, limit, worker) {
  const output = new Array(items.length);
  let cursor = 0;
  async function consume() {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      try {
        output[index] = { status: 'fulfilled', value: await worker(items[index], index) };
      } catch (reason) {
        output[index] = { status: 'rejected', reason };
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => consume()));
  return output;
}

function loadJobs(rootDir) {
  const jobDir = path.join(rootDir, JOB_DIR);
  if (!fs.existsSync(jobDir)) return [];
  return validateEnabledJobs(
    fs.readdirSync(jobDir)
      .filter(name => name.endsWith('.json'))
      .sort()
      .map(name => {
        const raw = JSON.parse(fs.readFileSync(path.join(jobDir, name), 'utf8'));
        return { raw, job: validateJob(raw, name), config: resilientConfig(raw) };
      })
      .filter(item => item.job.enabled)
      .map(item => ({ ...item.job, resilient: item.config })),
  );
}

export async function main(rootDir = process.cwd()) {
  const jobs = loadJobs(rootDir);
  if (!jobs.length) {
    console.log('OX RESILIENT DELEGATION SKIP: no enabled jobs');
    return;
  }
  if (!eligibleContext()) throw new Error('Enabled Ox jobs are only allowed in Netlify deploy-preview/branch-deploy contexts.');

  const apiKey = clean(process.env.NOUS_API_KEY, 512);
  if (apiKey.length < 20 || /\s/.test(apiKey)) throw new Error('NOUS_API_KEY is missing or invalid in the Netlify environment.');

  const outputDir = path.join(rootDir, OUTPUT_DIR);
  fs.mkdirSync(outputDir, { recursive: true });
  const parallel = boundedInt(process.env.OX_MAX_PARALLEL, DEFAULT_PARALLEL, 1, 4, 'OX_MAX_PARALLEL');
  console.log(`OX RESILIENT PLAN: jobs=${jobs.length} parallel=${Math.min(parallel, jobs.length)}`);

  const settled = await runPool(jobs, parallel, async job => {
    console.log(`OX DELEGATION START: ${job.id}`);
    const result = await runJob(job, job.resilient, rootDir, apiKey);
    fs.writeFileSync(path.join(outputDir, `${job.id}.json`), JSON.stringify(result, null, 2));
    console.log(`OX DELEGATION PASS: ${job.id}`);
    return result;
  });

  const index = [];
  const failures = [];
  settled.forEach((entry, i) => {
    const job = jobs[i];
    if (entry.status === 'fulfilled') {
      const result = entry.value;
      index.push({
        id: result.id,
        model: result.model,
        mode: result.mode,
        reasoning_effort: result.reasoning_effort,
        attempts: result.attempts,
        status: 'success',
        file: `${result.id}.json`,
      });
      return;
    }
    const failure = {
      id: job.id,
      mode: job.mode,
      reasoning_effort: job.reasoningEffort,
      files: job.files,
      failed_at: new Date().toISOString(),
      attempts: Number(entry.reason?.attempts || job.resilient.maxAttempts),
      error: clean(entry.reason?.message || entry.reason, 2000),
    };
    failures.push(failure);
    fs.writeFileSync(path.join(outputDir, `${job.id}.failure.json`), JSON.stringify(failure, null, 2));
    index.push({ id: job.id, status: 'failure', file: `${job.id}.failure.json`, attempts: failure.attempts });
  });

  fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify({
    generated_at: new Date().toISOString(),
    jobs: index,
  }, null, 2));

  if (failures.length) {
    throw new Error(`Ox delegation failed: ${failures.map(item => `${item.id}: ${item.error}`).join(' || ')}`);
  }
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) {
  main().catch(error => {
    console.error(`OX RESILIENT DELEGATION FAIL: ${error?.message || error}`);
    process.exit(1);
  });
}

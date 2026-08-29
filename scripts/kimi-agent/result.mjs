import crypto from 'node:crypto';
import { contentText, MAX_OUTPUT_BYTES, cleanText } from './schema.mjs';
import { validatePatch } from './patch.mjs';
import { redactSecrets } from './security.mjs';

function list(value, max = 64) {
  if (!Array.isArray(value)) return value ? [cleanText(value, 2_000)] : [];
  return value.map(item => cleanText(item, 2_000)).filter(Boolean).slice(0, max);
}

function objectFromText(text) {
  const raw = String(text || '').trim();
  const fenced = raw.match(/```json\s*\n([\s\S]*?)\n```/i);
  const candidate = fenced ? fenced[1].trim() : raw;
  try { return JSON.parse(candidate); } catch {}
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start >= 0 && end > start) {
    try { return JSON.parse(candidate.slice(start, end + 1)); } catch {}
  }
  return null;
}

export function buildResult({ job, sessionId, assistantText, policy, toolEvents, turns, usage, status = 'completed', error = null }) {
  const parsed = objectFromText(assistantText);
  const patchText = policy.proposed?.patch || (job.mode === 'implementation' ? (typeof parsed?.patch === 'string' ? parsed.patch : parsed?.patch?.content) : '') || '';
  let patch = null;
  const risks = list(parsed?.risks);
  const unresolved = list(parsed?.unresolved_issues);
  if (job.mode === 'review' && patchText) unresolved.push('Review-only mode discarded a patch-like response; no applicable patch was accepted.');
  if (job.mode === 'implementation' && patchText) {
    try {
      const checked = policy.proposed || validatePatch(job, patchText, policy.rootDir);
      patch = { format: checked.format || 'unified_diff', content: checked.patch, changed_files: checked.changedFiles, sha256: crypto.createHash('sha256').update(checked.patch).digest('hex') };
    } catch (patchError) {
      unresolved.push(`Patch was rejected by scope validation: ${String(patchError.message).slice(0, 500)}`);
    }
  }
  const filesInspected = [...policy.inspected].sort();
  const proposedFiles = patch?.changed_files || list(parsed?.files_proposed_for_change);
  const summary = cleanText(parsed?.summary || (assistantText && job.mode === 'review' ? assistantText : status === 'completed' ? 'Kimi completed the delegated job.' : 'Kimi did not complete the delegated job.'), 8_000);
  const findings = Array.isArray(parsed?.findings) ? parsed.findings.slice(0, 64).map(item => typeof item === 'string' ? cleanText(item, 4_000) : redactSecrets(item)) : [];
  const testResults = Array.isArray(parsed?.test_results) ? parsed.test_results.slice(0, 64).map(item => redactSecrets(item)) : toolEvents.filter(event => event.name === 'run_approved_command').map(event => event.result);
  return redactSecrets({
    schema_version: 1,
    job_id: job.id,
    session_id: sessionId,
    status,
    mode: job.mode,
    model: job.model,
    reasoning_effort: job.reasoningEffort,
    summary,
    findings,
    files_inspected: filesInspected,
    files_proposed_for_change: proposedFiles,
    patch,
    tests_run: testResults.map(result => result?.command || result).filter(Boolean),
    test_results: testResults,
    risks,
    assumptions: list(parsed?.assumptions),
    unresolved_issues: [...new Set(unresolved)],
    turns,
    usage: usage || null,
    error: error ? cleanText(error, 800) : null,
    raw_output: cleanText(contentText(assistantText), MAX_OUTPUT_BYTES),
  });
}

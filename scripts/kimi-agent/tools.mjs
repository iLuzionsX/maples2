import { safeJson } from './security.mjs';

export const TOOL_DEFINITIONS = [
  { type: 'function', function: { name: 'read_file', description: 'Read one UTF-8 regular file inside the job allowlist.', parameters: { type: 'object', properties: { path: { type: 'string' } }, required: ['path'], additionalProperties: false } } },
  { type: 'function', function: { name: 'search_repository', description: 'Search only the allowlisted repository scope with ripgrep.', parameters: { type: 'object', properties: { pattern: { type: 'string' }, path: { type: 'string' }, max_results: { type: 'integer', minimum: 1, maximum: 200 } }, required: ['pattern'], additionalProperties: false } } },
  { type: 'function', function: { name: 'list_tree', description: 'List files only inside the allowlisted repository scope.', parameters: { type: 'object', properties: { path: { type: 'string' }, depth: { type: 'integer', minimum: 0, maximum: 5 } }, additionalProperties: false } } },
  { type: 'function', function: { name: 'git_status', description: 'Inspect Git status limited to the allowlisted scope.', parameters: { type: 'object', properties: {}, additionalProperties: false } } },
  { type: 'function', function: { name: 'git_diff', description: 'Inspect the current Git diff limited to the allowlisted scope.', parameters: { type: 'object', properties: { staged: { type: 'boolean' } }, additionalProperties: false } } },
  { type: 'function', function: { name: 'run_approved_command', description: 'Run one exact, pre-approved read-only test or build command.', parameters: { type: 'object', properties: { command: { type: 'string' } }, required: ['command'], additionalProperties: false } } },
];

const PATCH_TOOL = { type: 'function', function: { name: 'propose_patch', description: 'Submit a unified diff for validation. It is never applied, committed, or merged by this agent.', parameters: { type: 'object', properties: { patch: { type: 'string' } }, required: ['patch'], additionalProperties: false } } };
const CSS_TOOL = { type: 'function', function: { name: 'propose_css_override', description: 'Submit a safe CSS override for the legacy Netlify compatibility path. It is never applied automatically.', parameters: { type: 'object', properties: { css: { type: 'string' } }, required: ['css'], additionalProperties: false } } };

export function toolDefinitionsFor(job) {
  if (job.mode !== 'implementation') return TOOL_DEFINITIONS;
  return [...TOOL_DEFINITIONS, job.legacyMode === 'css-override' ? CSS_TOOL : PATCH_TOOL];
}

export async function dispatchTool(policy, name, rawArguments) {
  let args;
  try { args = rawArguments ? JSON.parse(rawArguments) : {}; } catch { return { ok: false, error: 'Tool arguments were not valid JSON.' }; }
  try {
    let result;
    if (name === 'read_file') result = policy.readFile(args.path);
    else if (name === 'search_repository') result = policy.search(args.pattern, args.path || '', args.max_results);
    else if (name === 'list_tree') result = policy.listTree(args.path || '', args.depth);
    else if (name === 'git_status') result = policy.status();
    else if (name === 'git_diff') result = policy.diff(Boolean(args.staged));
    else if (name === 'run_approved_command') result = await policy.runApproved(args.command);
    else if (name === 'propose_patch') result = policy.proposePatch(args.patch);
    else if (name === 'propose_css_override') result = policy.proposeCssOverride(args.css);
    else return { ok: false, error: `Unknown tool: ${name}` };
    return { ok: true, result };
  } catch (error) {
    return { ok: false, error: String(error?.message || error).slice(0, 800) };
  }
}

export function toolResultContent(value) {
  return safeJson(value, 500_000);
}

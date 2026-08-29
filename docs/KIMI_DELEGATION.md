# Kimi K3 delegation

GPT-5.6 Sol remains the lead engineer. Kimi K3 is a subordinate specialist reached through the direct CLI or the existing Netlify Deploy Preview compatibility path:

```text
Sol → kimi-agent controller → scoped repository tools → NVIDIA NIM / moonshotai/kimi-k3
Sol → Netlify compatibility entrypoint → same controller/schema → NVIDIA NIM / moonshotai/kimi-k3
```

The controller is patch-first. Kimi can inspect and explain, and implementation jobs can return a validated unified diff. The controller never applies, commits, merges, or pushes a Kimi patch.

## Job schema

Jobs use `.kimi/templates/*.json` as examples and can be copied to `.kimi/jobs/*.json` for a deliberate Netlify run. The shared fields are:

```json
{
  "schema_version": 1,
  "id": "fps-review",
  "enabled": false,
  "mode": "review",
  "objective": "Investigate the reported issue.",
  "role": "senior Three.js performance engineer",
  "allowed_files": ["src/game/PerformancePass.js"],
  "relevant_context": "Preserve working systems and mobile behavior.",
  "acceptance_criteria": ["Separate evidence from hypotheses"],
  "commands": ["npm run build"],
  "requested_output": "structured_review",
  "reasoning_effort": "high",
  "max_turns": 8,
  "max_tokens": 24000,
  "timeout_ms": 720000,
  "max_changed_files": 8,
  "max_patch_bytes": 262144,
  "retries": 3,
  "stream": true
}
```

Legacy Netlify jobs using `task`, `files`, and `mode: "patch"` remain readable. They are normalized into the shared schema.

## Modes

- `review`: only review findings and recommendations are returned. The patch tool is not exposed and `patch` must be `null`.
- `implementation`: Kimi may call `propose_patch`. The unified diff is checked for allowed paths, file count, byte size, renames, new/deleted files, binary content, and clean application. It is returned for Sol to inspect; it is never applied automatically.
- `--dry-run`: validates the job and prints the exact policy plan without calling NVIDIA.

The controlled tools are `read_file`, `search_repository`, `list_tree`, `git_status`, `git_diff`, `run_approved_command`, and (implementation mode only) `propose_patch`. Shell access, arbitrary writes, commit/merge/push operations, and arbitrary network access are not exposed.

## Direct CLI

Set the key in the process environment only:

```bash
export NVIDIA_API_KEY='...'
npm run kimi -- --job .kimi/templates/fps-performance-investigation.json --session fps-review
```

Useful variants:

```bash
# Validate scope and limits without an API request.
npm run kimi -- --job .kimi/templates/fps-performance-investigation.json --dry-run

# Force review-only even if a copied job was configured for implementation.
npm run kimi -- --job .kimi/templates/independent-code-review.json --review-only --session review-1

# Return a validated patch candidate; never apply it.
npm run kimi -- --job .kimi/templates/ab-implementation-proposal.json --implementation --session ab-1 --output .kimi/out/ab-1.json

# Continue the same Kimi conversation with all prior assistant/tool-call state.
npm run kimi -- --job .kimi/templates/independent-code-review.json --session review-1 --follow-up "Recheck the highest-risk finding against the tests."
```

Sessions and debug logs are written under `.kimi/sessions/` and `.kimi/logs/`, are redacted, and are ignored by Git. The API key is never written to a prompt, session, result, or log.

## Netlify compatibility

The existing `maplesttstst` Deploy Preview bridge remains available through `scripts/kimi-delegate.mjs` and `scripts/kimi-verify-output.mjs`. It runs only when a job is enabled and the build is a Deploy Preview/branch deploy (or `KIMI_ALLOW_LOCAL=1` is deliberately set). Results are published as `/__kimi/<job-id>.json`, `/__kimi/index.json`, and `/__kimi/latest.json`.

Enable a job only on a feature branch or draft PR. Run the full validation, inspect the structured result and patch independently, then disable/remove the job before ordinary pushes. Do not make gameplay or visual changes directly on `main`, and do not merge without explicit owner approval.

## Security boundaries

The controller resolves a real Git repository root, rejects path traversal and symlink escapes, blocks secret-file paths and secret-shaped content, caps input/output/turns/tokens/time, validates exact commands against a non-shell allowlist, uses a minimal command environment without API credentials, restricts the production endpoint to NVIDIA NIM over HTTPS, retries only transient HTTP failures, and handles cancellation. The controller logs metadata and redacted tool results, not credentials.

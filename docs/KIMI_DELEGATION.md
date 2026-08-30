# Kimi K3 delegation and Maples Agent Control Plane

GPT-5.6 Sol is the lead engineer. Kimi K3 is a bounded subordinate specialist. Kimi may inspect scoped repository state, run explicitly approved commands, and return a validated patch proposal; it never applies, commits, pushes, merges, or owns a feature branch.

## First-principles model

Three things are deliberately separate:

1. **Agent Run** — the engineering mission and its telemetry/history.
2. **Feature PR** — the candidate game/code changes Sol has reviewed and chosen to integrate.
3. **Game Deploy Preview** — the Netlify build the owner actually play-tests.

A Run ID survives Kimi follow-ups, Sol review, validation, preview creation, and owner feedback. A PR number or Netlify deploy ID is metadata attached to a run, never the run identity itself.

```text
Owner prompt
   ↓
GPT-5.6 Sol — inspect / scope / branch / acceptance criteria
   ↓
Kimi controller — bounded repository tools + NVIDIA NIM
   ├── sanitized live events → Maples Agent Control Plane
   └── structured patch proposal → Sol review
                                   ↓
                            accepted changes only
                                   ↓
                           clean Feature PR
                                   ↓
                       tests + Netlify game preview
                                   ↓
                              owner play-test
```

## Permanent Observatory

After the infrastructure is merged, the stable dashboard is:

```text
https://maplesttstst.netlify.app/__kimi/
```

It shows the latest run by default. Historical/specific runs use:

```text
https://maplesttstst.netlify.app/__kimi/?run=RUN_ID
```

The UI is intentionally btop-like and reports public engineering telemetry: phase/status, model, token and turn usage, tool names, files inspected/proposed, patch byte/file metadata, validation results, risks, feature PR/branch, game preview, Sol review phase, and owner feedback.

It never publishes private chain-of-thought, raw assistant/model messages, repository file contents, patch bodies, secrets, or command stdout/stderr.

## Direct CLI — preferred execution path

Set the NVIDIA key in the process environment only:

```bash
export NVIDIA_API_KEY='...'
```

Start a new mission/run:

```bash
npm run kimi -- \
  --job .kimi/templates/ab-implementation-proposal.json \
  --implementation \
  --session combat-motion \
  --run-id maples-combat-motion-0042 \
  --feature-branch feature/combat-motion-v3
```

Continue the same Kimi conversation **and the same control-plane run**:

```bash
npm run kimi -- \
  --job .kimi/templates/ab-implementation-proposal.json \
  --implementation \
  --session combat-motion \
  --run-id maples-combat-motion-0042 \
  --follow-up "Preserve the dodge improvement; redesign melee contact and aftermath from first principles."
```

If `--run-id` is omitted, the controller creates a unique timestamped Run ID. Use an explicit Run ID when several Kimi/Sol/owner iterations should remain one mission.

The controller automatically targets the permanent Maples telemetry endpoint. An explicit `KIMI_TELEMETRY_URL`/`--telemetry-url` is accepted only for the existing `maplesttstst` production site or one of its Deploy Previews. Telemetry authentication is derived one-way from the existing NVIDIA key unless `KIMI_TELEMETRY_TOKEN` is explicitly configured; the NVIDIA key itself is never transmitted to the control plane.

## Sol lifecycle updates

After Kimi returns, Sol owns the rest of the run lifecycle:

```bash
# Sol is reviewing the structured patch.
npm run kimi:state -- --run maples-combat-motion-0042 --phase sol_review --message "Reviewing scope, architecture and visual-risk claims."

# Accepted patch is being validated on the clean feature branch.
npm run kimi:state -- --run maples-combat-motion-0042 --phase validation --status running

# The actual game preview is ready for owner play-test.
npm run kimi:state -- \
  --run maples-combat-motion-0042 \
  --feature-pr 41 \
  --preview-url https://deploy-preview-41--maplesttstst.netlify.app

# Owner requests another pass.
npm run kimi:state -- --run maples-combat-motion-0042 --owner changes_requested --message "Dodge approved; melee still lacks weight."

# Owner approves. This records approval; it does not merge anything.
npm run kimi:state -- --run maples-combat-motion-0042 --owner approved
```

No lifecycle event can merge a PR. Merge remains an explicit owner-approved GitHub action performed by Sol.

## Durable run store

The permanent control plane uses Netlify Blobs (`maples-kimi-runs`) because site-wide Blobs persist across deploys. The write function requires authentication and performs a second server-side sanitization pass. The public read function exposes only the sanitized state needed by the Observatory.

Run state is bounded to the latest 250 sanitized events. Telemetry is advisory/observability data; repository files, Git history, tests, and Netlify remain the authoritative engineering sources.

## Job schema

Jobs use `.kimi/templates/*.json` as examples and can be copied to `.kimi/jobs/*.json` for deliberate compatibility-path runs. Core fields include:

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

## Controller boundaries

- `review`: no patch tool; findings/recommendations only.
- `implementation`: Kimi may call `propose_patch`; the controller validates scope, changed-file count, patch bytes, file operations, binary content, and clean application, then returns the patch to Sol without applying it.
- `--dry-run`: validates the exact policy plan without calling NVIDIA.

Controlled tools are `read_file`, `search_repository`, `list_tree`, `git_status`, `git_diff`, `run_approved_command`, and (implementation only) `propose_patch`. There is no unrestricted shell, arbitrary file-write tool, arbitrary network tool, commit, push, or merge capability.

## Netlify compatibility trigger

`.kimi/jobs/*.json` plus `scripts/kimi-delegate.mjs` remains a compatibility trigger for environments where Sol cannot invoke the direct CLI. It uses the same controller and now emits the same Run-ID telemetry. Enabled jobs remain feature-branch/PR-only and must be disabled or removed after results are retrieved.

The compatibility path is a trigger mechanism, not the control plane architecture. The long-term preferred flow is direct controller execution → durable telemetry → Sol-reviewed Feature PR → Netlify game preview.

## Security boundaries

The controller resolves a real Git repository root, blocks path traversal/symlink escapes and secret-file/content access, caps input/output/turns/tokens/time, validates exact commands against a non-shell allowlist, uses a minimal command environment without API credentials, restricts the production model endpoint to NVIDIA NIM over HTTPS, restricts telemetry to the `maplesttstst` control-plane endpoint, retries only transient model HTTP failures, and handles cancellation.

Local sessions/logs/telemetry are redacted and ignored by Git. Remote telemetry is sanitized twice. Secrets remain environment variables only.

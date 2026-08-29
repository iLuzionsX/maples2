# Kimi K3 delegation through Netlify

This repository can delegate narrowly scoped coding and review jobs to NVIDIA NIM Kimi K3 through the existing Netlify Deploy Preview boundary. Codex remains the lead agent: it chooses the files, reviews the result, runs the normal tests, and decides what is applied.

## One-time Netlify secret

In the existing Netlify site (`maplesttstst`), add `NVIDIA_API_KEY` as a sensitive environment variable for **Deploy Previews only**. Keep untrusted deploy protection enabled. Never commit the key or expose it to Vite/client code. The build skips Kimi entirely when no job is enabled, so ordinary deploys do not require a live request.

## Create or enable a job

On a non-`main` feature branch with a PR, copy `.kimi/jobs/kimi-smoke.json` or add `.kimi/jobs/<job-id>.json`:

```json
{
  "id": "mobile-hud-kimi-review",
  "enabled": true,
  "mode": "review",
  "task": "Review this scoped change for regressions, mobile compatibility, and performance. Do not claim to have run tests.",
  "files": ["src/game/Game.js", "src/game/Input.js"],
  "model": "moonshotai/kimi-k3",
  "reasoning_effort": "max",
  "max_tokens": 24000
}
```

`mode` may be `patch`, `review`, or `css-override`. Patch jobs must return a unified diff; CSS override jobs must return only structurally valid CSS. Only explicitly listed regular files are sent. Path traversal, symlinks, oversized input, duplicate job IDs, binary patches, renames, new/deleted files, and undeclared changes are rejected.

## Build and review flow

The Netlify build runs the normal validation, then the Ox bridge, then the Kimi bridge, then the existing visual preview renderer. Kimi artifacts are published at `/__kimi/<job-id>.json`, `/__kimi/index.json`, and `/__kimi/latest.json`.

For patch jobs, verification normalizes harmless Markdown wrapping, checks the allowlist, and runs `git apply --check` against the delegated checkout. The API key is never written to an artifact or log. Prompts, selected source, and generated results are public in a Deploy Preview and must not contain confidential data.

## ChatGPT operating loop

1. Inspect the latest `main` and create a narrowly scoped job on a feature branch.
2. Push the job and wait for a successful Deploy Preview.
3. Read `/__kimi/latest.json` and independently review the result.
4. Apply only the parts that survive review, then run the repository's normal validation.
5. Disable or delete the job before the next ordinary push so later previews do not repeat the request.

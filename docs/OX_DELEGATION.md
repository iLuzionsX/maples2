# Ox Alpha delegation through Netlify

This repository's agent runtime may not have arbitrary outbound network access. Netlify Deploy Previews are the execution boundary for delegated Ox Alpha coding/design calls, keeping the Nous API key out of browser code and Git history.

## One-time secret setup

In the existing Netlify site (`maplesttstst`), configure `NOUS_API_KEY` as a sensitive build environment variable for **Deploy Previews only**. Keep untrusted deploy protection enabled. Never expose the key to Vite/client code and never commit it.

## Create or enable a job

On a non-`main` feature branch with a PR, add or enable `.ox/jobs/<job-id>.json`:

```json
{
  "id": "combat-controller-review",
  "enabled": true,
  "mode": "patch",
  "task": "Implement the requested scoped change while preserving behavior outside this task. Return only a canonical unified diff.",
  "files": [
    "src/game/Game.js",
    "src/game/Character.js"
  ],
  "model": "auto:ox-alpha",
  "max_tokens": 24000
}
```

`mode` may be `patch` or `review`. `auto:ox-alpha` discovers the available Ox Alpha model from the authenticated Nous model catalog. Explicit model IDs such as `stealth/ox-alpha` are also supported.

Only explicitly listed regular files are sent. Repository path escapes and symlinks are rejected, total input size is bounded, job IDs must be unique, and production builds refuse enabled jobs.

## Delegation and verification

The Netlify build runs the normal game validation, then `scripts/ox-delegate.mjs`, then `scripts/ox-verify-output.mjs`.

For patch jobs, the verifier:

1. Normalizes a legitimate unified diff if Ox wrapped it in harmless prose or a single Markdown diff fence.
2. Rejects binary patches, renames, new/deleted files, malformed diffs, and any path not declared in the job.
3. Runs `git apply --check` against the exact delegated checkout so a structurally valid but stale/broken patch is rejected.
4. Records the verified commit, changed files, and SHA-256 of the normalized output.

Published review artifacts are available at:

- `/__ox/<job-id>.json` — individual delegated result
- `/__ox/index.json` — compact result index
- `/__ox/latest.json` — complete verified manifest for the current successful delegation build

The API key is never included in these files. Because the repository and Deploy Preview are public, job prompts, selected source content sent to Ox, and generated results must all be treated as public information.

## ChatGPT operating loop

The intended loop is:

1. Inspect the latest branch/repository state.
2. Create a narrowly scoped Ox job with only the files Ox needs.
3. Push the job to the feature branch and let the Deploy Preview delegate it.
4. Require a successful verification build before considering the output.
5. Read `/__ox/latest.json` and independently review the proposed patch/review; never trust delegated output automatically.
6. Apply or rewrite only the parts that survive review, then run the repository's normal validation.
7. Immediately disable or delete the job before the next ordinary push so later Deploy Previews do not repeat the inference call.

The checked-in smoke job is intentionally disabled after validation. Re-enable a job only for a deliberate delegation run.

# Ox Alpha delegation through Netlify

This repository's agent runtime may not have arbitrary outbound network access. Netlify does, so deploy previews can act as the execution boundary for delegated coding calls without exposing a Nous API key to browser code or Git history.

## One-time secret setup

In the existing Netlify site (`maplesttstst`), create an environment variable named `NOUS_API_KEY` containing a Nous Portal API key. Scope it to **Deploy Previews** and **Branch Deploys** only. Do not expose it to the Vite client and do not commit it to this repository.

## Create a job

On a non-`main` feature branch, add `.ox/jobs/<job-id>.json`:

```json
{
  "id": "combat-controller-review",
  "enabled": true,
  "mode": "patch",
  "task": "Implement the requested scoped change while preserving current behavior outside the task.",
  "files": [
    "src/game/Game.js",
    "src/game/Character.js"
  ],
  "model": "auto:ox-alpha",
  "max_tokens": 24000
}
```

`mode` may be `patch` (unified diff only) or `review`. `auto:ox-alpha` discovers the current Ox Alpha model from the authenticated Nous `/v1/models` catalog.

## Result

During a Netlify Deploy Preview/Branch Deploy, `scripts/ox-delegate.mjs` reads the selected repository files server-side, calls Nous, and writes the response to:

`/__ox/<job-id>.json`

The API key is never written into the output. After the result is reviewed and integrated, disable or delete the job before pushing the next revision so a later deploy does not spend tokens repeating the same request.

Production builds refuse to execute enabled jobs.

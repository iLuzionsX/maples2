# Ponytail + Ox review workflow

Use this as a simplification gate after an implementation is already working. It does not replace correctness, performance, gameplay, visual, mobile, or regression review.

## Flow

1. Start from latest `main` on a feature/PR branch.
2. Implement the change with Sol and/or Ox as appropriate.
3. Run normal tests and inspect the game first.
4. Run `npm run ox:ponytail:prepare`.
5. Commit the generated `.ox/jobs/ponytail-review.json` and `.ox/context/ponytail-review.diff`, then push the PR branch.
6. Netlify runs the existing Ox delegation bridge in `review` mode. Inspect `__ox/ponytail-review.json` on the Deploy Preview.
7. Sol reviews every suggestion. Apply only cuts that preserve behavior and player-visible quality, then rerun normal validation.
8. Run `npm run ox:ponytail:cleanup`, commit the cleanup, and push again so later Deploy Previews do not repeat inference.
9. Never merge without explicit owner approval.

Use `npm run ox:ponytail:prepare -- --base <ref>` when the review base is not `main`.

## Review boundary

Ponytail/Ox hunts unnecessary complexity only: duplicated implementations, speculative abstraction, needless dependencies, native/platform reinvention, dead flexibility, and logic that can be materially smaller without changing behavior.

It must not trade away bespoke combat feel, animation, camera behavior, VFX, environment composition, enemy/boss behavior, art direction, mobile ergonomics, tests, validation, error handling, security, accessibility, performance instrumentation, or asset licensing/attribution.

The reviewer is advisory. Sol remains responsible for architecture, integration, validation, and deciding whether a suggested deletion is actually safe.

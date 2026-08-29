---
name: imagegen
description: Generate or edit project images and game assets with OpenAI image generation. Use for concept art, UI/game assets, textures, mockups, background removal/replacement, inpainting, compositing, transparent assets, and batch variants.
---

# ImageGen

Use this skill when an image asset would materially improve the project.

## Workflow

1. Classify the request as generate, edit, or batch.
2. Preserve exact user constraints and, for edits, state invariants explicitly.
3. Turn the request into a compact production spec: subject, intended use, composition, style, lighting, palette, materials, exact text, constraints, and avoid-list.
4. Prefer the host's native OpenAI image-generation capability when available. Otherwise use the OpenAI Images API through the official SDK.
5. For edits, preserve untouched regions and use masks/input fidelity where appropriate.
6. Inspect the output for composition, readability, text accuracy, edge quality, transparency, and consistency with the game's stylized fantasy direction.
7. Iterate with one targeted change at a time rather than broad prompt rewrites.
8. Store final project assets in an appropriate `public/` asset directory with stable descriptive filenames and document third-party/generated asset provenance when relevant.

## Defaults

- Prefer the current best OpenAI image model available to the host.
- For production assets, favor high quality over cheap/fast drafts unless explicitly asked otherwise.
- Never invent logos, text, characters, or decorative elements the user did not request.
- For strict edits, repeat invariants on every iteration.
- For game assets, account for alpha edges, mipmapping, mobile readability, compression, and runtime cost.

## Useful request classes

- `stylized-concept`: environment, creature, weapon, armor, VFX, mood or key art.
- `game-asset`: sprite, icon, decal, texture source, UI ornament, material reference.
- `ui-mockup`: shippable-looking game HUD/menu concepts.
- `precise-object-edit`: change only specified parts of an existing image.
- `background-extraction`: transparent cutout.
- `compositing`: combine supplied references with matched perspective/lighting.

## Provenance

Adapted from the OpenAI-authored `imagegen` agent skill distributed in `davila7/claude-code-templates` (upstream skill path: `cli-tool/components/skills/creative-design/imagegen`).
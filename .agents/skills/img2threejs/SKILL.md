---
name: img2threejs
description: Turn an object or character reference image into a quality-gated, animation-ready procedural Three.js model built in code. Use for image-to-3D reconstruction, detail-accurate rebuilds, sculpt specs, staged code generation, and reference-matched game props or characters.
---

# img2threejs

Reconstruct the visible subject from a reference image as a code-first Three.js model. Do not treat a single image as proof of hidden geometry; label inferred regions and request additional views when fidelity depends on them.

## Maple workflow

1. Inspect the reference visually before coding. Separate observed facts from inference.
2. Classify the target as object, character, or hybrid and define the real-time use case.
3. Decompose macro → meso → micro: silhouette, major volumes, joints/attachments, materials, then identity-defining details.
4. Write a compact sculpt spec before implementation: component hierarchy, topology strategy, materials/PBR evidence, pivots, sockets, colliders, animation/action anchors, triangle budget, and critical review targets.
5. Build in locked passes: blockout → structure → form → materials → lighting → interaction/rigging → optimization.
6. After every pass, render against the reference from the matched camera plus meaningful off-axis views. A front-view match alone is not sufficient.
7. Correct exactly one root-cause group at a time: camera, silhouette, proportions, topology, attachment placement, materials, or lighting.
8. Keep reconstruction decisions in data/specs where practical rather than burying them only in renderer code.
9. Validate hierarchy, handedness, collisions, attachment anchors, action readiness, mobile performance, and the existing Maples animation/combat contracts before integration.
10. Report approximation limits explicitly.

## Hard rules

- Reconstruction-by-code, not downloaded art packs masquerading as reconstruction.
- Prefer primitives, `Shape`/extrusion, curves/tubes, generated geometry, instancing, procedural shaders and project-approved textures.
- Left/right mirrored parts must be reflections, not rotated duplicates.
- Materials cannot repair incorrect silhouette or topology.
- For patterned/reference-matched surfaces, use reference-derived projection/texture evidence where licensing and project constraints allow; do not approximate a distinctive pattern with a generic material and call it matched.
- Characters need continuous head/body forms where the silhouette requires them; avoid floating primitive assemblies for organic anatomy.
- Every model intended for gameplay must expose useful pivots/sockets/colliders and remain animation-ready.
- Preserve existing working Maples systems and test desktop/mobile behavior and performance after integration.

## Upstream full pipeline

This repo-local router is adapted from the official Apache-2.0 `img2threejs/img2threejs` skill, version 1.5.1. The upstream project contains its full deterministic `forge/` gates, grimoire references, character pipeline, comparison tooling and self-correction scripts. When a task needs that full pipeline, use the upstream skill/repository as the authoritative extended implementation rather than inventing incompatible replacements.

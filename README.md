# Emberfall — Maples

**Emberfall** is a self-contained Three.js third-person action-RPG vertical slice: bright storybook fantasy, readable tabletop-inspired encounters, responsive melee/magic, and a browser-first rendering stack that scales down to touch devices.

## Play

- **WASD** — move
- **Mouse** — orbit camera
- **Left click / 1** — three-hit Arc Slash combo
- **Q** — Ember Lance
- **Space** — invulnerable dash
- Touch devices get a virtual stick and action buttons automatically.

## The Sunken Glade vertical slice

The encounter combines authored gameplay with locally vendored GLTF art:

- **Rowan:** an imported, rigged KayKit Knight with sword, shield, helmet and cape. His visible rig cross-fades native idle/walk/run, three one-handed attacks, dodge, spellcast, hit and death clips while Emberfall's own combat windows remain authoritative.
- **Briarbound:** three imported Quaternius creature families with different tactics. Skeletons brace against frontal hits until a heavy cut, a critical, or Ember Lance breaks the guard. Wisps hang back and throw hex bolts, blinking away if you close. Bats orbit and dive, then sit exposed through a long recovery.
- **Thornmaw:** a separate imported Quaternius demon boss with its own scale, presentation, health bar and shrine reveal. Below two-thirds health the roots rupture in an expanding ring; below one-third Thornmaw charges and calls another briarbound.
- **World:** the procedural Lumenwood foundation is layered with KayKit arches, stairs, pillars, ruined walls and torches plus a curated Quaternius Stylized Nature subset for textured pines, flowering bushes, ferns and grass.
- **Combat feel:** three-hit melee chaining, soft target facing, attack lunges, dodge i-frames, mana projectile magic, criticals, hit-stop, knockback/stagger, camera impulse, damage numbers and layered sword/spell VFX.
- **Progression:** essence pickups, health/mana recovery, XP, and a level-up oath. Steel deepens melee, Ember cheapens and strengthens the lance, Warden shortens the evade cooldown and lengthens its invulnerable beat. Death recovery and encounter escalation lead into the boss.
- **Presentation:** atmospheric sky/fog, dynamic lighting/shadows, bloom on the high tier, procedural WebAudio, a reactive portal, readable enemy windups, a boss-reveal camera and a polished fantasy HUD.
- **Mobile:** adaptive rendering quality, virtual movement stick and touch action buttons.

All third-party 3D art used by this branch is shipped locally in `public/assets/`; provenance and CC0 licensing are documented in [`THIRD_PARTY_ASSETS.md`](./THIRD_PARTY_ASSETS.md). No external model CDN is required at runtime.

## Play

The current glade is published at https://iluzionsx.github.io/maples2/

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Validation

Validation is intentionally run **without GitHub Actions** so development does not depend on paid Actions minutes.

```bash
npm run build
npm run test:movement
npm run test:visual
```

`npm run test:movement` covers keyboard/touch movement direction, camera-relative movement, imported hero facing, vertical camera-look direction, desktop/mobile HUD layout bounds, and mobile controls.

`npm run test:bestiary` checks creature roles, skeleton guard, Thornmaw phase thresholds, and oath math. With the preview server running, `npm run test:bestiary:e2e` plays those systems in the browser.

`npm run test:visual` is the Playwright gameplay/showcase gate against the production preview. It verifies that the imported hero, normal enemies, boss, ruin set and nature layer actually attach, then drives the real combat state machine and captures:

1. title/world composition
2. first melee impact at the animation-driven hit event
3. third-hit combo finisher at its hit event
4. Ember Lance while the projectile is live
5. Thornmaw during the explicit boss-reveal hold
6. the adaptive mobile layout

For a PR, the same browser suites can be run directly against its Netlify Deploy Preview instead of starting a local server:

```bash
MAPLES_TEST_BASE_URL=https://deploy-preview-<PR_NUMBER>--maplesttstst.netlify.app npm run test:movement
```

Keep the normal branch → PR → Netlify Deploy Preview → play-test/approval → merge workflow. `docs/asset-inventory.json` records the vendored GLBs' bounds, node names, skins and animation clip names used for integration.

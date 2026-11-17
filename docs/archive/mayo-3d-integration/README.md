# Archived: real-time 3D Mayo in the landing

Archived on 2026-11-17. These files are kept for reference and are **not compiled**
(`tsconfig.json` excludes `docs/**`; nothing under `src/` imports them).

## What the files were

| File (relative to the repo root when live) | Role |
|---|---|
| `src/lib/mayo/moments.ts` | The 10 moments of Mayo's journey: clip per moment, camera pose, light preset, gaze rule. |
| `src/lib/mayo/lighting.ts` | Light presets per island (dawn → night) and the blend between two presets. |
| `src/lib/mayo/scene.ts` | The reference three.js scene ported to TypeScript: renderer, lights, materials, clips, camera per moment, cursor gaze. |
| `src/components/world/mayo-stage.tsx` | Full tier: one square transparent fixed canvas that travelled between the `MayoFigure` slots, blending camera, model rotation and island light with the scroll (55 % hold / 45 % travel). |
| `src/components/world/mayo-stage-loader.tsx` | Decided whether to load the 3D at all (full tier, WebGL available, no reduced motion) after parse + idle, with `next/dynamic` and no SSR. |

The model itself (`public/mayo/mayo.glb`, 1.63 MB) was removed from the repo; its
source of truth is the `mayo-3d` repository (`mayo-3d/dist/`). The captured poses
in `public/mayo/poses/` stay in the landing as the fallback images.

## Commits that introduced them

- `418ff81` feat: integrate the real Mayo with image tiers and a travelling 3D canvas
- `6473a11` fix: load the 3D Mayo after parse and idle, pin three in the lockfile
- `538a717` feat: mirror Mayo's swapped night presets, shadow edge fade and recaptured poses

Design and verification notes: `docs/plans/2026-11-17-mayo-3d-en-la-landing.md`,
task record `odd/tasks/mayo-3d-integration.md`.

## Why it was archived

Juani's decision (2026-11-17): Mayo in the landing becomes a **painted character in
the style of the islands**, animated by frames (a few frames per pose at 4–8 fps,
with mouth and tongue gestures where it fits), instead of a real-time GLB. The 3D
model stays as the identity and pose reference for the painter. Nothing is lost:
this folder holds the integration exactly as it last ran.

## How to bring it back

1. Restore the files to their original paths:
   `docs/archive/mayo-3d-integration/src/lib/mayo/*` → `src/lib/mayo/`,
   `docs/archive/mayo-3d-integration/src/components/world/*` → `src/components/world/`.
2. `npm i three@0.187.0 @types/three@0.187.0` (the version the model was validated with).
3. Copy `mayo.glb` from `mayo-3d/dist/` to `public/mayo/mayo.glb` and re-add
   `export const mayoModelUrl = "/mayo/mayo.glb";` to `src/content/stage.ts`.
4. Mount `<MayoStageLoader />` in `src/app/page.tsx` next to `<WorldMotion />`.
5. Restore the CSS that was removed from `src/app/world.css`: the `.mayo-stage` /
   `.mayo-stage--ready` rules and `html[data-mayo3d="ready"] .mayo__picture { visibility: hidden; }`
   (see commit `418ff81`).

# Ambient motion: living sky, living light, pointer depth

Objective: make the island world feel alive (sky, light, depth) at the quality of the painted plates without regressing mobile performance. Branch: `juanikitro/landing-ambiente` (from `juanikitro/landing-redesign` a7fa6f0). Delivery: one commit per effect, no push/merge/deploy, `git -c gc.auto=0`. Runner: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`; Playwright (Chrome, Firefox, WebKit) at 1440x900, 1366x768, 390x844, 360x800; Lighthouse mobile median of 5 and throttled phone load, before/after.

## Specs

- S1. Juani (2026-11-24): "cielo vivo (pero de buena calidad, no un css barato)". Chosen: cloud layers drifting slowly behind each island with real depth (parallax between layers, soft volumetric look matching the painted plates, not flat CSS blobs); occasional bird flocks crossing the day islands (flapping silhouettes with boid-like spacing, a few per minute at most); island 7 (night) stars that twinkle subtly and a rare shooting star. Quality bar: painted and alive, at the level of the plates.
- S2. "luz viva en las ilustraciones". Chosen: the island 6 campfire flickers its warm light on the scene, Juani's avatar and Mayo; the island 7 lantern and fireflies pulse; a gentle breeze moves grass and leaves where it reads well (displacement or masked layers) without smearing the painted detail.
- S3. "profundidad con el mouse (y analiza la opcion de aplicarlo tambien al giroscopio del celular)". Chosen: on desktop, islands and backgrounds shift a few pixels following the pointer using the existing island/background layer pairs, translate only, no tilt, eased and interruptible. Analyse device-orientation parallax on phones (iOS permission from a gesture, Android open, battery, motion sickness); if clean (opt-in via a tap, calm amplitude, off with reduced motion), implement it behind that opt-in.
- S4. Performance: no regression against Lighthouse mobile ~83 and ~5.8 s throttled phone load. Effects load only near their island, pause off screen and in hidden tabs, single shared rAF loop, compositor transforms first, canvas/WebGL only where it clearly beats CSS and only for the visible island; respect Save-Data and low-end devices. Measure before/after.
- S5. Reduced motion (`prefers-reduced-motion`, `html[data-motion-tier="reduced"]`): no ambient motion, static and good-looking.
- S6. Do not interfere with `AUTO_GUIDANCE_ENABLED = false` or island 3's play-once assembly. No new dependencies without approval. Do not repaint Mayo or the plates. CSS in one delimited block of `world.css`; code in new components where possible.
- S7. Doc `docs/plans/2026-11-24-ambiente.md` (Spanish, neutral Rioplatense): what each effect does, how, its cost, how to turn it off, the gyroscope analysis. Media (short videos or frame sequences) per effect.

## Tasks

- [ ] T1 (S1, S4, S5) inline. Ambient foundation (tier, shared loop, visibility) + drifting painted clouds.
- [ ] T2 (S1) inline. Bird flocks on the day islands (canvas, only while a flock crosses a visible island).
- [ ] T3 (S1) inline. Island 7 stars twinkle on the painted stars + rare shooting star.
- [ ] T4 (S2) inline. Island 6 firelight on the scene, Juani and Mayo.
- [ ] T5 (S2) inline. Island 7 lantern flicker and firefly blinks.
- [ ] T6 (S2) inline. Breeze in the tree canopies (WebGL displacement, visible island only).
- [ ] T7 (S3) inline. Pointer depth on the layer pairs.
- [ ] T8 (S3) inline. Gyroscope analysis + opt-in.
- [ ] T9 (S4, S7) inline. Measurements, cross-browser pass, media, doc.

## Log

- L1 (2026-11-24) Juani verbatim: "Quiero que despliegues un agente especializado para implementar: - cielo vivo (pero de buena calidad, no un css barato) - luz viva en las ilustraciones - profundidad con el mouse (y analiza la opcion de aplicarlo tambien al giroscopio del celular)". Details chosen with the coordinator: see S1-S3.
- L2 (2026-11-24) Baseline built from a7fa6f0 and kept as a standalone server in the session scratchpad for interleaved before/after measurement. Route: inline for every task (no writer trigger: one agent, units depend on a shared foundation).

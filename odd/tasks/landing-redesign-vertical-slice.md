# Landing redesign: visual bible + vertical slice (hero + island 3)

Objective: design the Mayo island world landing and ship a working vertical slice (hero + rock assembly) with real scroll, three performance tiers and a provisional Mayo image. Branch: `juanikitro/landing-redesign`. Delivery: ask-on-risk, work-unit commits on the branch, no push. Runner: `npm run lint`, `npm run typecheck`, `npm run build`; browser checks with Playwright at 1440 px and 390 px.

## Specs

- S1. Spec of record is `docs/plans/2026-11-16-landing-redesign-mayo-world.md`; "Do not reopen approved decisions; ask Juani (one question at a time) only about genuinely open ones."
- S2. Visual bible: "palette (evolved moss/leaf green, mint as night "light", warm peachy beige), type pairing tests, light/sky per island, camera angles, and ready-to-paste ChatGPT (Juani has ChatGPT Pro) image prompts for the hero (island 1) and the rock assembly (island 3), including separate layered/isolated assets (each rock alone on a plain background, etc.). Guide Juani step by step; he generates and hands you the images."
- S3. Vertical slice: "hero + island 3 working with real scroll. Scroll-Driven Animations in CSS (animation-timeline: view()/scroll() under @supports) for the rock assembly; no scroll hijacking".
- S4. "promise "Webs que venden. Sistemas que ordenan." and CTA visible in the first fold without depending on animation".
- S5. "three tiers (full / lite / static for prefers-reduced-motion)". Reduced motion shows the rocks already assembled (spec decision 12).
- S6. "use a provisional Mayo image until the 3D model exists (another agent in worktree mayo-3d-character builds the GLB + 8–10 static poses; coordinate through Juani)".
- S7. Verification: "Verify in a real browser at desktop and 390 px (no horizontal scroll, keyboard focus, reduced motion), document what changed and how it was verified in docs/plans/, and open a visible local browser for Juani to try it."
- S8. Rules: "production is Railway (push to master deploys) — never push or merge without Juani's explicit request; never deploy with Vercel. Conventional commits, no co-author lines. Ask before adding dependencies (Three.js will be needed later; propose it with its tradeoff)."
- S9. Commercial substance in `src/content/*.ts` "must stay intact". Hero promise is kept verbatim. Copy for the islands is proposed to Juani before being implemented beyond the slice.
- S10. Stop for Juani's approval after step 3 (bible, slice, verification). Juani generates the images in parallel; the slice ships with placeholder plates that are swapped when his images arrive.

## Tasks

- [ ] T1 (S2) route: inline. Visual bible `docs/plans/2026-11-16-biblia-visual-mundo-mayo.md`: palette tokens, type decision with evidence, sky/light/camera per island, prompts and step-by-step guide. Commit: pending.
- [ ] T2 (S3, S4, S5, S9) route: inline. New token set and fonts (Instrument Sans, Fraunces, Caveat), new page shell for the island journey replacing the Umbral Vivo hero; hero island with promise + CTA in first fold; tier detection reused from motion-controller. Commit: pending.
- [ ] T3 (S3, S5) route: inline. Island 3: rocks assembled with CSS Scroll-Driven Animations under `@supports`, fallback (lite/static) already assembled; three platforms host the existing `CommercialPlans`. Commit: pending.
- [ ] T4 (S6) route: inline. Provisional Mayo image component with the three tiers (static image now; slot for the GLB later). Commit: pending.
- [ ] T5 (S7) route: inline. Browser verification at 1440 and 390 px, reduced motion, keyboard focus, no horizontal scroll; verification doc in `docs/plans/`; open local browser. Commit: pending.

## Log

- L1 (2026-11-16) User request verbatim: "Dedicated session: design and build the new Mayofy landing (web and custom-software studio led by Juani). Talk to Juani in neutral Rioplatense Spanish; technical artifacts (code, comments) in English; project docs follow the existing Spanish convention in docs/plans/. Your specification is docs/plans/2026-11-16-landing-redesign-mayo-world.md (read it fully first). [...] Scope of THIS session, in order (stop for Juani's approval after step 3): 1. Visual bible [...] 2. Vertical slice [...] 3. Verify in a real browser at desktop and 390 px [...] Rules: production is Railway (push to master deploys) — never push or merge without Juani's explicit request; never deploy with Vercel. Conventional commits, no co-author lines. Ask before adding dependencies (Three.js will be needed later; propose it with its tradeoff). Gotchas: if you rebuild while `next start` runs, restart the server; .env.local cannot be read; in the main checkout `git fetch` fails due to a broken refs/codex ref (use `git ls-remote`, `-c gc.auto=0`)."
- L2 (2026-11-16) Exploration: worktree had no `node_modules`; ran `npm ci`. Next 16.2.10 docs live in `node_modules/next/dist/docs/` (`priority` on Image is deprecated in favour of `preload`). All candidate fonts exist in `next/font/google` (Instrument_Sans, Geist, Fraunces, Caveat, Kalam, Patrick_Hand). References opened in Playwright: Villex (particle galaxy assembling on scroll, dark), Terratrack (scroll video with heavy sans), GetLayers mossy rock, ReactBits.
- L3 (2026-11-16) Type test (scratchpad `type-tests.html`, screenshots at 1440/390): Instrument Sans 600 + Fraunces italic (opsz 120, SOFT 60) + Caveat chosen. Geist reads colder and more "developer tool"; Patrick Hand reads childish; Kalam is fine but Caveat has more warmth and rhythm for Mayo's notes. Contrast (WCAG): ink/beige 12.8, moss/beige 6.3, moss/beige-deep 5.2, mint/night 13.4, night-ink-soft/night 9.7, bark/beige 5.96; leaf/beige 3.58 (large text or decoration only).
- Next step: T1 bible written, then T2.

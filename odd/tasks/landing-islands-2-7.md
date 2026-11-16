# Landing redesign: islands 2 and 4–7, cloud fall, navigation

Objective: extend the approved vertical slice to the full 7-island journey with provisional art, the cloud-fall transition, the complete pill navigation, the paw progress indicator and the mobile WhatsApp float, keeping the commercial substance verbatim. Branch: `juanikitro/landing-redesign`. Delivery: ask-on-risk, work-unit commits, no push. Runner: `npm run lint`, `npm run typecheck`, `npm run build`; Playwright checks at 1440 and 390 px.

## Specs

- S1. Juani (2026-11-16): "quiero que sigas construyendo las islas con el arte provisorio" after approving the bible and the slice ("apruebo la biblia. Sobre los dialogos de mayo, eliminalos, no me gusta que hable. el resto esta aprobado"). Mayo never speaks: no notes, no text.
- S2. Journey per spec table (docs/plans/2026-11-16-landing-redesign-mayo-world.md): 2 Rocas sueltas (mañana, el problema: el negocio desordenado), 4 Taller o invernadero (tarde dorada: sistemas a medida, automatizaciones y bot "Próximamente"), 5 Jardín de trabajos (atardecer: trabajos y proceso), 6 Isla de las preguntas (crepúsculo: FAQ y mantenimiento), 7 Isla de Juani (noche estrellada: quién está detrás, agenda Cal.com y contacto). Fusions: "el proceso pasa a la isla de trabajos, el mantenimiento a la FAQ y las automatizaciones a la isla de sistemas".
- S3. Transition 1→2: "la caída de Mayo entre nubes [...] Va como secuencia corta de imágenes livianas, no como video atado al scroll. En el nivel liviano se reemplaza por una sola imagen." Provisional: CSS cloud layers with scroll-driven parallax and a provisional Mayo; the real frames come from the asset agent.
- S4. Navigation (decision 15): "Pill flotante con Packs, Trabajos, Preguntas y el CTA "Agendá tu diagnóstico"." "Indicador de progreso con una huella de Mayo: al costado en escritorio y abajo en celular, con clic para ir a cada isla." "CTA flotante de WhatsApp en celular desde la isla 2."
- S5. Copy rule (decision 14): substance unchanged; island titles and intros are rewritten only after Juani approves them. Until then the islands use the existing strings from `src/content/site.ts` and `src/content/commercial-plans.ts` verbatim; proposed copy goes to `docs/plans/2026-11-16-texto-islas-propuesta.md`.
- S6. Cal.com (decision 16) needs Juani's booking link; until it exists the island 7 scheduling block links to WhatsApp and the slot is documented.
- S7. Tiers and accessibility as in the slice: full / lite / static, no horizontal scroll at 390, keyboard focus, reduced motion, first fold independent of animation.
- S8. Rules: never push/merge; no new dependencies without asking; conventional commits.

## Tasks

- [x] T1 (S2, S5) inline. Island 2 "Rocas sueltas": morning scene, scattered rocks, Mayo idle, attention copy verbatim. Commit: islands commit (see L3).
- [x] T2 (S3) inline. Cloud fall transition with provisional cloud layers and Mayo. Commit: islands commit (see L3).
- [x] T3 (S2, S5) inline. Island 4 "Taller": golden scene, systems copy + extensions + bot "Próximamente" moved from island 3. Commit: islands commit (see L3).
- [x] T4 (S2, S5) inline. Island 5 "Jardín de trabajos": sunset scene, projects (real links, placeholders) + six-step process path. Commit: islands commit (see L3).
- [x] T5 (S2, S5) inline. Island 6 "Preguntas": dusk scene, FAQ + maintenance moved from island 3. Commit: islands commit (see L3).
- [x] T6 (S2, S6) inline. Island 7 "Juani": night scene, founder copy, scheduling slot, contact form, footer. Commit: islands commit (see L3).
- [x] T7 (S4) inline. Full pill nav, paw progress indicator, mobile WhatsApp float. Commit: islands commit (see L3).
- [x] T8 (S5) inline. Proposed island copy document for Juani's approval. Commit: islands commit (see L3).
- [x] T9 (S7) inline. Verification at 1440/390, keyboard, progress, float; doc docs/plans/2026-11-16-islas-2-7-mundo-mayo.md. Commit: islands commit (see L3).

## Log

- L1 (2026-11-16) Juani verbatim: "quiero que sigas construyendo las islas con el arte provisorio, pero antes dame el prompt para que otro agente de codex me guie para la creacion de las imagenes y video" then "arranca". Prompt delivered in docs/plans/2026-11-16-prompt-agente-imagenes.md (21c8588).
- L2 (2026-11-16) Built inline (T1-T8). Legacy globals.css collisions renamed again: `.founder`→`.host`, `.contact`→`.reach`, `.faq`→`.questions`, `.process`→`.steps`, `.text-link`→`.host-link`. Projects list typed through `ProjectEntry[]` because `url` is optional only on placeholders. Mobile footer padded 5.5rem so the bottom paw bar never covers the links.
- L3 (2026-11-16) T9: Playwright 1440/390: scrollWidth = innerWidth both; paw progress aria-current follows the visible island; WhatsApp float visible past the hero on 390; FAQ summary opens with Enter; lint/typecheck/build clean. Doc: docs/plans/2026-11-16-islas-2-7-mundo-mayo.md. Risk: item 6 (no automated tests) → independent verifier launched.
- L4 (2026-11-16) Independent verifier on b89618a: S2/S3/S4/S5/S7 PASS, no blockers. Advisory applied: IslandProgress moved after IslandNav in the DOM so the paw links are early in Tab order. Advisory noted: legacy commercial-plans.tsx is unused (delete with the legacy route migration).
- Next step: Juani approves the copy proposal and shares the Cal.com link; asset agent delivers images; mount them.

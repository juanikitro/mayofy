# Landing redesign: follow-ups while assets are produced

Objective: publish the approved bot prices, make the contact form deliver to Juani's mailbox, give every project one case-study template, migrate the remaining routes to the Mayo world and retire the legacy stylesheet. Branch: `juanikitro/landing-redesign`. Delivery: ask-on-risk, work-unit commits, no push. Runner: `npm run lint`, `npm run typecheck`, `npm run build`; Playwright at 1440/390.

## Specs

- S1. Juani (2026-11-16): "3. apruebo los precios, aunque probablemente los cambie despues" → publish the bot tiers approved in `docs/plans/landing-iteration-backlog.md` item 4: Bot Esencial desde USD 120 (2 a 3 semanas), Bot Integrado desde USD 250 (4 a 6 semanas), abono USD 30 por mes; Meta fees and AI usage billed separately. Keep the "Próximamente" label and the "Quiero que me avisen" CTA.
- S2. "4. CONTACT_FORM_ENDPOINT debe ser jpkitro@gmail.com por ahora". The route requires an HTTPS URL; an email value is mapped to a FormSubmit endpoint that emails that address. Setting the variable in Railway is a config change that needs Juani's explicit go.
- S3. "5. Crea un template para que cada proyecto que cargue siga un mismo camino, luego entrare en detalle con eso" → one case-study page template in the Mayo world for every project (real and placeholder), documented so each new project follows the same path.
- S4. "6. Postergalo para el final, al igual que el SEO, la performance y todo lo que haya que hacer relacionado" → Open Graph image, SEO and performance work are deferred.
- S5. "Migra /privacidad" → privacy page in the Mayo world; with it, `/proyectos/[slug]` and `/not-found` migrate too so `globals.css`, `tokens.css`, the legacy components and the legacy fonts can be removed.
- S6. Mayo never speaks; commercial substance verbatim except the approved bot prices; no new dependencies; no push.

## Tasks

- [ ] T1 (S1) inline. Bot tiers in `commercial-plans.ts` and island 4. Commit: pending.
- [ ] T2 (S2) inline. Email → FormSubmit mapping in `/api/contact`, README and backlog updated. Commit: pending.
- [ ] T3 (S3) inline. World case-study template at `/proyectos/[slug]` for all projects, works grid links to it, docs/plans template guide. Commit: pending.
- [ ] T4 (S5) inline. `/privacidad` and `not-found` in the world; shared `SiteNav` with absolute links. Commit: pending.
- [ ] T5 (S5) inline. Remove legacy stylesheet, tokens, components, fonts; port contact form and details styles into world.css. Commit: pending.
- [ ] T6 (S5, S6) inline. Verification 1440/390 of home, a case page, privacy and 404; docs. Commit: pending.

## Log

- L1 (2026-11-16) Juani verbatim: "1 y 2 dependen de los assets asi que esperamos 3. apruebo los precios, aunque probablemente los cambie despues 4. CONTACT_FORM_ENDPOINT debe ser jpkitro@gmail.com por ahora 5. Crea un template para que cada proyecto que cargue siga un mismo camino, luego entrare en detalle con eso 6. Postergalo para el final, al igual que el SEO, la performance y todo lo que haya que hacer relacionado Migra /privacidad".

# Site Brief 6: Epic Bariloche

## Goal

Write or refine one `SiteSpec` for this business and create its real frontend artifact. Use the agent session context, judgement, and frontend skill. Do not call the OpenAI API from repo scripts.

## Hard Rules

- Use only verified data below.
- Do not invent services, years, awards, guarantees, prices, certifications, owners, staff, or claims.
- Visible copy must be Spanish argentino, natural, local, commercial, and strong enough to sell the next action.
- If useful commercial facts are missing, use safe AI-assisted filler: generic rubro imagery, process visuals, texture, section names, microcopy, and "a confirmar" offers. Never present them as verified facts.
- Internal placeholders may exist in specs, but the customer-facing HTML must not show raw brackets, "placeholder", "demo", "editable", "template", "landing", or "creado con IA".
- Avoid generic filler like "soluciones integrales", "calidad garantizada", "experiencia unica", "creado con IA".
- Keep the business name isolated to this one site.
- Make the page feel designed for "escuelas de ski y snowboard, alquiler de equipos y traslados al Cerro Catedral" in San Carlos de Bariloche, not like a SaaS template.
- Final generation expects an `agent_frontend`. The renderer fallback is only for rough preview.

## Business Snapshot

- id: `google-ChIJC6B38shxGpYRL1Pr4RpX5nk`
- slug: `epic-bariloche`
- name: Epic Bariloche
- category: Services
- inferred profile: Taller mecanico
- requested segment: escuelas de ski y snowboard, alquiler de equipos y traslados al Cerro Catedral
- city: San Carlos de Bariloche
- address: R8400 San Carlos de Bariloche, Río Negro Province, Argentina
- phone: 03543 15-60-6807
- hours summary: Lunes a Domingo: 8:30 a. m. – 6:30 p. m.
- rating: 4.3 / 5 (209 reseñas)
- service baseline: ski shop

## Suggested Commercial Profile

```json
{
  "tone": "practical-workshop",
  "customer_type": "Conductores que necesitan diagnostico, mantenimiento o una primera consulta confiable.",
  "hero_claim": "Primero entender que le pasa al auto. Despues, coordinar bien el turno.",
  "services": [
    "Mecanica general",
    "Service",
    "Diagnostico",
    "Consulta por turno"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "4.3 / 5",
      "body": "209 resenas registradas en las fuentes disponibles.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Rubro",
      "title": "Taller mecanico",
      "body": "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas.",
      "meta": "Base verificada"
    },
    {
      "label": "Agenda",
      "title": "Lunes a Domingo: 8:30 a. m. – 6:30 p. m.",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "03543 15-60-6807"
    },
    {
      "label": "Confianza",
      "title": "Mas de [X] vehiculos",
      "body": "Placeholder editable para volumen real, anos o trabajos terminados si el negocio lo confirma.",
      "meta": "Demo editable",
      "is_demo": true
    }
  ],
  "service_cards": [
    {
      "label": "Diagnostico",
      "title": "Consulta con sintomas",
      "body": "La landing pide ruido, falla, kilometraje y contexto antes de prometer una solucion."
    },
    {
      "label": "Service",
      "title": "Mantenimiento ordenado",
      "body": "Bloque para service o revision si el taller lo confirma.",
      "is_demo": true
    },
    {
      "label": "Turno",
      "title": "Llamar con datos",
      "body": "CTA enfocado en coordinar horario, necesidad y disponibilidad."
    }
  ],
  "why_choose": [
    {
      "title": "Consulta mas clara",
      "body": "El visitante sabe que informacion dar antes de llevar el auto."
    },
    {
      "title": "Confianza visible",
      "body": "Resenas, rating y direccion aparecen como respaldo local."
    },
    {
      "title": "Sin diagnostico inventado",
      "body": "La landing no promete fallas resueltas ni marcas atendidas si no existen datos."
    }
  ],
  "packages": [
    {
      "name": "Diagnostico inicial",
      "price_label": "A confirmar",
      "body": "Para evaluar sintomas y definir siguiente paso.",
      "items": [
        "Sintoma",
        "Kilometraje",
        "Turno"
      ],
      "is_demo": true
    },
    {
      "name": "Service preventivo",
      "price_label": "[Editable]",
      "body": "Espacio para servicios confirmados por el taller.",
      "items": [
        "Aceite/filtros si aplica",
        "Revision",
        "Datos del vehiculo"
      ],
      "is_demo": true
    },
    {
      "name": "Reparacion puntual",
      "price_label": "[Presupuesto editable]",
      "body": "Bloque para trabajos reales luego de diagnostico.",
      "items": [
        "Falla reportada",
        "Revision presencial",
        "Piezas a confirmar"
      ],
      "is_demo": true
    }
  ],
  "gallery": [
    {
      "label": "Antes",
      "title": "Foto real del ingreso",
      "body": "Espacio para mostrar el estado inicial del vehiculo, pieza o consulta.",
      "meta": "Placeholder visual",
      "is_demo": true
    },
    {
      "label": "Despues",
      "title": "Resultado o entrega",
      "body": "Lugar reservado para una foto propia del negocio, sin usar stock generico.",
      "meta": "Editable",
      "is_demo": true
    },
    {
      "label": "Taller mecanico",
      "title": "Detalle del trabajo",
      "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      "meta": "Foto a reemplazar",
      "is_demo": true
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Contar sintomas",
      "body": "Ruido, falla, testigo, perdida o mantenimiento pendiente."
    },
    {
      "step": "02",
      "title": "Enviar datos",
      "body": "Modelo, kilometraje y urgencia ayudan a ordenar la consulta."
    },
    {
      "step": "03",
      "title": "Coordinar turno",
      "body": "Contacto y horario quedan visibles para avanzar."
    },
    {
      "step": "04",
      "title": "Definir trabajo",
      "body": "Repuestos, precio y plazo se confirman despues del diagnostico real."
    }
  ],
  "final_cta": {
    "title": "Epic Bariloche: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: taller mecanico, direccion y horario.",
    "primary_label": "Consultar turno",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Convenient, walkable location close to the Cerro Catedral base. Pablo took a great care of me early July selecting the perfect board and waxing it. Great customer service from all staff, fair prices, would surely use them again." — Ales Cevela (5/5)
2. "Ricky and the guys at EPIC Bariloche was bloody amazing. Not only great gear and service but Ricky also helped immensely with great backcountry recommendations and was able to provide all the equipment necessary. If in Bariloche for snowboarding and skiing the guys at EPIC are the absolute best option." — Declan Walters (5/5)
3. "Great ski/snowboard rental shop very close to Cerro Catedral! The staff is very friendly and some can speak a little English too. They have a dedicated storage area upstairs so that you don’t have to take all your rented gear with you overnight on multi-day rentals." — Vincent Tang (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJC6B38shxGpYRL1Pr4RpX5nk/photos/AaVGc3mWnrLfQqSIfqKxnhUVb-QpCRlO6HCkPmgtnYo3dKzzLWz9Gj3EhnwY796wZZhQB2_mNtpSRRziwFCWXzPlWcT_tihCYad_sxmWVVJzrpEXBGWsV8x4qqAE5dO81umWLR-SjOUqPvsRcG8RmyLity1dbTpJMouTdIMksnk1ykughhy0K8lNqOUJT-rXfu01L3mJMiHKRZPLEi54q5n6GRVhwFFgSX2dYbeX4r3gZQStD-zgCcUg0lkMs0KirNQyxN4CWnGADatLWmr2x0fNvRq3V7qfMJJKKLZjPi6mYxmRBAW5Iibs0GKSQNC-xqYQiDAZlL15B5TVvmgDdQxZkHZcI2O8TTxdwvDIluJlf2pNAT4wVt9NKcTVjIK1VezytYRR98h4uBpnwzrGWMztRXx-3s2L0aEvqjYxUGeRGefJbP-4l1AO5Zs7vneQpnYD/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJC6B38shxGpYRL1Pr4RpX5nk/photos/AaVGc3molSukTF1UJtZ-WNgV3HUNIczImEqYQtgwNO1nkzCQryOtzoF93y1gUk-4AYJ7or5qqRCsXmoU0qrHd0OVgWqnU7VsgQk_FHUvcpzhmrKW4x7ykO3rQ-gadCFO7TQ4fau0i9kJhXug_73lVJ6gdWdw7p05nQyvIJpb3BfViE6FfY-39FmoO_gJrLqTL69vxng_jYOTF7kd1lfRZxJbDKgiDrPSE7SK3wqfRRmhpv1ekr7rFpIi1cvF5QPk0bB7r2ZwC89mwGbZ8nkftP1oyOz6is14zBbNa4bDuXnRw5_UluiHvH3fqLZvEM0_D_C2lLabd5e58T1KazStmVixOiVaAUKpLVRrvcXQZqjxqwPOTawyK6Hp6Rn2VTrYwlfwTnR8Ko39K0QtOSqj5A8H-qwCzsM2OfH9LuQ7vu9BrXs8T4hTEoELVOY9EfgdmvW8/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJC6B38shxGpYRL1Pr4RpX5nk/photos/AaVGc3mHrIrGrdYFSo48CsBqOADf6GjZ05XJAThnY2aF_egwderpnBOtQI-VIOgUhgStHafdIXPHJtgXC7UniTiE4Is9lF8Zr5eXUnN_suIs0Y3yT9AsNa9D7T1RtHS5BGkZj6_BakdmaUH041pz802RFmHJhJWm2Gu1CdW3n3QxudWhk2Q1IxPvfBFjJDPwxfctanio74AZd3MLIsdOhcQ4udAGGKBUAmXts2fmLUIrSCFjbWLiwv7IIbsFDqLQ0I0N6EPfQ5ngy1B2p54VI45m_ucpNAgayVst4EH9zQVklwNYN2XGbMDFxV0xcWj4E_2Lj4-IPsUypietW9HlIlMmr_wXpY0EstnaOz3vjSyEODMe_iiDqOp_m9aPzUv-RMW_Wl7MifrYOxKyoCTQZY7C9BOhyGR-JdsUS-Pm40IaylZfvMFr/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=8783803896203793199&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/116541960422084983279/reviews
- https://www.google.com/maps/contrib/111294275136244927668/reviews
- https://www.google.com/maps/contrib/106225560111966575739/reviews


## Recommended Design Direction

- Use cues from the escuelas de ski y snowboard, alquiler de equipos y traslados al Cerro Catedral domain and the local retail/service context in San Carlos de Bariloche.
- Quality matters more than cheap or fast generation.
- Choose one proven conversion template: `hero-proof-offer`, `editorial-local-story`, `visual-menu`, `service-diagnostic`, `catalog-counter`, or `urgent-call-first`.
- Build a real landing structure: strong hero, trust bar, services, why choose, offer/options, before/after or gallery, process, reviews/contact, final CTA.
- Make sparse data look intentional: use AI-generated generic imagery and crafted microcopy where the source data is thin. Do not leave empty generic cards.
- Automotive references to emulate structurally: strong claim + numbers + services + CTA to booking; urban/aggressive wrapping/custom style; detailing service taxonomy; emotional hero; packages; before/after; reviews.
- You may use plain HTML/CSS or a framework/library if it materially improves the final UI. You have broad discretion to use frontend/UI, animation, and icon libraries such as Aceternity UI (https://ui.aceternity.com/components), shadcn/ui (https://ui.shadcn.com/docs/components), Magic UI (https://magicui.design/), Framer Motion, GSAP, Motion One, lucide-react, React Icons, or similar component/motion kits when they raise product quality.
- If using a framework, build/export it yourself and point `agent_frontend.output_dir` at the static output.
- Avoid making the 10 pages share the same hero rhythm, card system, font pairing, spacing scale, or composition.
- Prefer concrete microcopy based on the signals above.
- Vary `visual_mood` and `composition` across this 10-site batch.
- Avoid repeating the same hero rhythm, proof order, and CTA wording from nearby briefs.
- If the page would otherwise look templated, use a high-conversion template deliberately: first viewport promise + proof + CTA, visible image, objection handling, offer/options, process, final CTA. Make it polished rather than novel.

## Current Spec, If Any

```json
null
```


## SiteSpec Schema Shape

Return one object with:

- `business_id`
- `slug`
- `visual_mood`: one of `roadside-urgent`, `workshop-trust`, `precision-service`, `neighborhood-direct`, `fleet-utility`
- `composition`: one of `split-command`, `poster-bay`, `route-card`, `service-ledger`, `photo-board`
- `headline`
- `subheadline`
- `primary_cta`
- `secondary_cta`
- `service_tags`: 3 to 5 strings
- `proof_points`: 3 to 4 strings
- `resource_title`
- `resource_items`: 3 to 4 strings
- `review_heading`
- `contact_heading`
- `image_prompt`
- `design_notes`
- `conversion_template`: one of `hero-proof-offer`, `editorial-local-story`, `visual-menu`, `service-diagnostic`, `catalog-counter`, `urgent-call-first`
- `design_brief`: required for future/remake quality:
  - `market_position`: what this page sells and for whom
  - `visual_thesis`: concrete art direction tied to the business/rubro
  - `copy_voice`: how the copy should sound and what it must avoid
  - `layout_signature`: what makes this page structurally specific
  - `asset_plan`: how real photos and safe AI generic imagery are used
  - `ai_fill_plan.copy`: how AI enriches thin data without false claims
  - `ai_fill_plan.imagery`: what non-specific images/textures can be generated
  - `ai_fill_plan.boundaries`: explicit limits: no fake prices, stock, brands, years, awards, guarantees, services or reviews
  - `anti_patterns`: visible failure modes to avoid
  - `rewrite_targets`: what to improve if remaking an existing page
- `commercial`: recommended for sellable landings:
  - `tone`: `premium-detailing`, `urban-custom`, `practical-workshop`, `fast-local`, `parts-counter`, or `bodyshop-craft`
  - `customer_type`
  - `hero_claim`
  - `trust_bar`: 3 to 5 cards with `label`, `title`, `body`, optional `meta`, optional `is_demo`
  - `service_cards`: 3 to 6 benefit-led service cards
  - `why_choose`: 3 to 5 reasons tied to the business/rubro
  - `packages`: 2 to 4 offer/options; no fake prices
  - `gallery`: 2 to 4 before/after, real-photo or AI-safe generic visual blocks
  - `process`: 3 to 5 steps from inquiry to visit/booking
  - `final_cta`: `title`, `body`, `primary_label`, `secondary_label`
  - `editable_note`: short warning for placeholders
- `agent_frontend`: required for final quality generation:
  - `mode`: `static-files` or `framework-build`
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/san-carlos-de-bariloche-escuelas-de-ski-y-snowboard-alquiler-de-equipos-y-traslados-al-cerro-catedral/epic-bariloche`
  - `output_dir`: required only for `framework-build`; points to the static build output copied by the generator
  - `build_command`: optional note, not executed by the generator
  - `libraries`: optional list of real libraries used
  - `notes`: short explanation of the visual direction and why it fits this business
- `creative`: object used by the renderer to make the page feel custom:
  - `concept`: commercial idea for this specific business
  - `audience`: who is likely to search/contact
  - `visual_direction`: concrete art direction, not generic adjectives
  - `layout`: one of `studio-detail`, `wash-flow`, `oil-bay`, `roadside-rescue`, `bodyshop-craft`, `parts-counter`, `mechanic-ledger`
  - `texture`: one of `polished-glass`, `water-ripple`, `oil-label`, `road-markings`, `primer-dust`, `parts-shelf`, `service-ledger`
  - `hero_angle`: one strong commercial sentence for the hero
  - `hero_cards`: 2 to 4 cards with `label`, `value`, optional `note`
  - `sections`: 3 to 5 blocks. Each block has `type`, `eyebrow`, `title`, `body`, `items`, optional `callout`.

Creative block `type` values:

- `service-board`
- `process`
- `quote-strip`
- `quick-actions`
- `material-story`
- `metric-grid`

The `agent_frontend` artifact is the main place where the page stops being a template. The `design_brief` and `creative` objects remain useful as planning metadata and fallback input, but the final UI must be authored.

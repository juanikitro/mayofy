# Site Brief 1: Sandrik - Alquiler ropa nieve

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

- id: `google-ChIJaUSB-G17GpYRB7RJDo88-1M`
- slug: `sandrik-alquiler-ropa-nieve`
- name: Sandrik - Alquiler ropa nieve
- category: Clothing Store
- inferred profile: Indumentaria
- requested segment: escuelas de ski y snowboard, alquiler de equipos y traslados al Cerro Catedral
- city: San Carlos de Bariloche
- address: Sargento A. Rolando 277, San Martín 297, R8400 San Carlos de Bariloche, Río Negro, Argentina
- phone: 0294 466-1332
- hours summary: Lunes a Domingo: 9:00 a. m. – 1:00 p. m., 4:00 – 9:00 p. m.
- rating: 4.3 / 5 (162 reseñas)
- service baseline: ski shop

## Suggested Commercial Profile

```json
{
  "tone": "premium-detailing",
  "customer_type": "Personas que quieren consultar disponibilidad o acercarse al local con una idea clara.",
  "hero_claim": "Ver, consultar y pasar por el local sin perder datos.",
  "services": [
    "Ropa",
    "Atencion en local",
    "Consulta por disponibilidad",
    "Ubicacion comercial"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "4.3 / 5",
      "body": "162 resenas registradas en las fuentes disponibles.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Rubro",
      "title": "Indumentaria",
      "body": "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas.",
      "meta": "Base verificada"
    },
    {
      "label": "Agenda",
      "title": "Lunes a Domingo: 9:00 a. m. – 1:00 p. m., 4:00 – 9:00 p. m.",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0294 466-1332"
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
      "label": "Local",
      "title": "Visita con direccion clara",
      "body": "Horario, ubicacion y contacto aparecen arriba."
    },
    {
      "label": "Consulta",
      "title": "Disponibilidad a confirmar",
      "body": "No se inventan marcas, talles, precios ni stock."
    },
    {
      "label": "Vidriera",
      "title": "Fotos reales primero",
      "body": "La galeria queda lista para imagenes del local o productos reales.",
      "is_demo": true
    }
  ],
  "why_choose": [
    {
      "title": "Sin stock falso",
      "body": "La pagina invita a consultar disponibilidad real."
    },
    {
      "title": "Datos del local",
      "body": "Direccion, horario y contacto evitan busquedas extra."
    },
    {
      "title": "Fotos editables",
      "body": "La vidriera se completa con material propio."
    }
  ],
  "packages": [
    {
      "name": "Consulta de prenda",
      "price_label": "Precio a confirmar",
      "body": "Para preguntar por disponibilidad real.",
      "items": [
        "Tipo de prenda",
        "Talle",
        "Color si aplica"
      ],
      "is_demo": true
    },
    {
      "name": "Visita al local",
      "price_label": "Sin precio publicado",
      "body": "Direccion y horario para acercarse.",
      "items": [
        "Horario",
        "Direccion",
        "Contacto"
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
      "label": "Indumentaria",
      "title": "Detalle del trabajo",
      "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      "meta": "Foto a reemplazar",
      "is_demo": true
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Consultar prenda",
      "body": "El cliente pregunta por tipo, talle o disponibilidad."
    },
    {
      "step": "02",
      "title": "Confirmar stock",
      "body": "El local responde con datos reales."
    },
    {
      "step": "03",
      "title": "Coordinar visita",
      "body": "Direccion y horario visibles."
    }
  ],
  "final_cta": {
    "title": "Sandrik - Alquiler ropa nieve: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: indumentaria, direccion y horario.",
    "primary_label": "Consultar disponibilidad",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "🧥🎿 💖  La atención es un sueño: amables, pacientes y siempre dispuestos a ayudar con cada detalle para que te vayas perfectamente equipado.
El local es amplio, cómodo y muy bien organizado. Podés probarte todo con tranquilidad y elegir la ropa ideal según la actividad que vayas a hacer: esquí, caminatas o simplemente disfrutar de los paisajes nevados.

La indumentaria es de excelente calidad, con materiales tecnológicos que realmente protegen del frío, el viento y la humedad.
Gracias a eso, pude disfrutar de mis días en la nieve sin pasar frío y con total comodidad.
Los precios son muy buenos en relación a la calidad del servicio — se nota el cuidado y la experiencia del equipo y hay todos los talles.

Como único detalle a mejorar: las botas podrían tener un mejor agarre, ya que varias personas del grupo notamos que se resbalaban un poco sobre la nieve. Nada grave, pero es algo que vale la pena revisar, porque todo lo demás fue impecable.
Atención cálida, precios justos y ropa técnica de primer nivel. Un lugar para recomendar y volver cada temporada." — Evelin Ulloa (4/5)
2. "El dueño súper amable y considerado. La verdad nos atendieron de 10 y este año vuelvo a elegirlos. 10/10 en cuanto precio, calidad y limpieza de la ropa todo excelente.. 🫶🏻❤️✨" — Florencia Navarro (5/5)
3. "La experiencia Sandrik es super recomedable!!! La amabilidad de la flia la buena predisposición  y paciencia con los cliente es en todo momento, las Camperas tienen muy lindo diseño super coloridas y muy abrigadas, telas de muy buena calidad , los equipos son nuevos entregan todo impecable y los Precios súper Económicos." — Hernán Dileo (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJaUSB-G17GpYRB7RJDo88-1M/photos/AaVGc3mrTouO1dTCIo1wqWBgHFlzkGfwMYVEpdKuBV1X_xSUZib2ratmKP1uhlrmSnso8XS9SAfWoHB8HF4g6B9B37rThJlsXAhkIwByMGDHbxQp7IfDAVsnwu9Shgb1z3769agL1A-QVgxQ1hnjgdvlTCd7OhN6BC0d9xgetDf1BkSe9mf9WnJpd4_dPiFlzOaTDw276u4FiHC6lHQMCEWNTkgMA8JNyeZJVQNnlGok1-U-fr4pE2QK4xvsQRetPVOpx_9PAQOg6tslgOrg-c5NWq6NuEs49ZjQ3JRIWQTu_X4EUrfVo3c1wuxQFyyTJwbZdzEEqMkrpPgVyzaZzqK88jhECR8PcGl3m3eP0S_h_BXXzYdrQB-UDBVKapVIz7YTAxneVYcpHJmAT4RCk3gijXkPSm4ZCrKo2QOjftdhYQ8/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJaUSB-G17GpYRB7RJDo88-1M/photos/AaVGc3ntgJN8vat-M0pkA2S4bQh3YTf-PLvJhdhb9EmzDkQlrFXm7d1N4sDp4K9ut4JzcwSqFlHtFUOuvGy6HhBFzWkOQjToCzTRmHUnLA6lftTa2WtMko6sHJ7VDvIrjrNKOAMNhUDEr9DHmUC9QMKwiD0VpquBS17KQT4BkS66KbMCZOsX8aQcefvaVcjLoJI8bpfkd6n3bUm2p4cAtAc6bekRNLy5GtpzYPVVHUtiGBySZp2rIxcBCEoE4YZBUhUIcZGhqKbovCow8OGoX456P7d2h6-6GEIRpVG4ISWJwrUo7lF6_WMP-e5R9RTbqMF9wBQBpvzyGNOo5RPoURZpZVFGSsiTjPrH-GZdT2ajFUDS2DWviZNRmRRR6gzYaGkKn-9YQazAG0g5xGhL1nEOAhAaGTT2m2f20m8pJHjxWxgLh6JD2CYAGG3UdqaYCiTb/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJaUSB-G17GpYRB7RJDo88-1M/photos/AaVGc3lR0vt8P4phDr-ynZcuVCV9_61osj5dYMnwxtgB601XQ7zTGk4dX7MQCyvkrGcth7_3x4Y6rVS8iDoaIcJZX_riWTELcdxTz_VfP1-YsRIurWweFNfE9p6hQQRBG4mGpFEm_Cp9U2-8AKxYOcXcM2aIv_7Hx0uBmzmuvjw51crwdxImO9TcPdHJM0JMLqGQDSvBT-F3MWdh6bmHglQv--MYBubPZNLfdZekCc2zebF7RnukGzbnm3_T7VBCcXWwT2P1BaeFRP10jNzys2Y1xYexVjR1ogiB8nr_-2IiysHDQlpif920hpXPWddYm6CTrRIYP4urxZwW156IWlvYjhTwPCWh9kBDc_ILTuk934AJSBRPOgZFIXOV4oz1y9hX20tnxxF0PUDmp16WdNQcUTVavhkSvXf5ZVeaAV4EhlgzFrfK/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=6051497109420094471&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/101906573520610288236/reviews
- https://www.google.com/maps/contrib/109660221841280260803/reviews
- https://www.google.com/maps/contrib/103755381013376851126/reviews


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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/san-carlos-de-bariloche-escuelas-de-ski-y-snowboard-alquiler-de-equipos-y-traslados-al-cerro-catedral/sandrik-alquiler-ropa-nieve`
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

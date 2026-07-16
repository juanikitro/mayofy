# Site Brief 1: Infinity X Car Detail

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
- Make the page feel designed for "lavadero y detailing de autos" in Santiago de Chile, not like a SaaS template.
- Final generation expects an `agent_frontend`. The renderer fallback is only for rough preview.

## Business Snapshot

- id: `google-ChIJaWdb5QvFYpYRNC9yPxq32X4`
- slug: `infinity-x-car-detail`
- name: Infinity X Car Detail
- category: Sporting Goods Store
- inferred profile: Detailing y estetica vehicular
- requested segment: lavadero y detailing de autos
- city: Santiago de Chile
- address: Manuel Barrios 6050, 7560369 Las Condes, Región Metropolitana, Chile
- phone: 9 4935 0078
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 5 / 5 (17 reseñas)
- service baseline: car detailing

## Suggested Commercial Profile

```json
{
  "tone": "premium-detailing",
  "customer_type": "Personas que cuidan el auto, quieren recuperar brillo, proteger terminaciones o reservar un lavado detallado.",
  "hero_claim": "Que el auto vuelva a sentirse cuidado, limpio y listo para mirar de cerca.",
  "services": [
    "Detailing",
    "Interior",
    "Exterior",
    "Proteccion o consulta"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "5.0 / 5",
      "body": "17 resenas registradas en las fuentes disponibles.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Rubro",
      "title": "Detailing y estetica vehicular",
      "body": "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas.",
      "meta": "Base verificada"
    },
    {
      "label": "Agenda",
      "title": "Lunes a Sabado; Domingo cerrado",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "9 4935 0078"
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
      "label": "Interior",
      "title": "Habitaculo con sensacion de estreno",
      "body": "Copy pensado para vender limpieza profunda, orden visual y confort sin inventar tratamientos no verificados."
    },
    {
      "label": "Exterior",
      "title": "Brillo y terminacion visible",
      "body": "Bloque preparado para lavado detallado, descontaminado o correccion si el negocio lo confirma."
    },
    {
      "label": "Proteccion",
      "title": "Cuidado despues del lavado",
      "body": "Espacio editable para ceramicos, selladores o mantenimiento cuando existan datos reales.",
      "is_demo": true
    }
  ],
  "why_choose": [
    {
      "title": "Resultado fotografiable",
      "body": "La estructura empuja a mostrar antes/despues, detalles y terminaciones reales."
    },
    {
      "title": "Reserva simple",
      "body": "El CTA lleva a consultar turno, tipo de vehiculo y necesidad concreta."
    },
    {
      "title": "Prueba social visible",
      "body": "Rating, resenas y comentarios quedan arriba, no escondidos al final."
    }
  ],
  "packages": [
    {
      "name": "Lavado detallado",
      "price_label": "Precio a confirmar",
      "body": "Para exterior e interior con foco en presentacion general.",
      "items": [
        "Exterior",
        "Interior",
        "Terminacion visual"
      ],
      "is_demo": true
    },
    {
      "name": "Interior profundo",
      "price_label": "[Desde editable]",
      "body": "Paquete editable para butacas, alfombras, plasticos y olor.",
      "items": [
        "Aspirado detallado",
        "Superficies interiores",
        "Fotos del estado inicial"
      ],
      "is_demo": true
    },
    {
      "name": "Proteccion premium",
      "price_label": "[Presupuesto editable]",
      "body": "Lugar para ceramico, sellador o proteccion si el negocio lo ofrece.",
      "items": [
        "Evaluacion previa",
        "Producto a confirmar",
        "Mantenimiento recomendado"
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
      "label": "Detailing",
      "title": "Detalle del trabajo",
      "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      "meta": "Foto a reemplazar",
      "is_demo": true
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Contar el estado del auto",
      "body": "El cliente consulta por interior, exterior o detalle puntual."
    },
    {
      "step": "02",
      "title": "Elegir nivel de trabajo",
      "body": "La pagina propone paquetes editables y deja claro que el precio se confirma."
    },
    {
      "step": "03",
      "title": "Reservar turno",
      "body": "CTA directo a telefono o WhatsApp cuando esta disponible."
    },
    {
      "step": "04",
      "title": "Registrar resultado",
      "body": "Bloque de galeria listo para cargar fotos reales del trabajo terminado."
    }
  ],
  "final_cta": {
    "title": "Infinity X Car Detail: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: detailing y estetica vehicular, direccion y horario.",
    "primary_label": "Reservar turno",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "El mejor lugar donde llevar tus autos para servicio de detailing y estetica automotríz. La atención es persobalizada y te dejan en claro todo lo realizable en sus autos. Muy ordenado limpio y muy buenos profesionales. Los resultados están a la vista." — Kevin Antoine Yuseff Bonnemaison (5/5)
2. "Excelente atención por parte de Mauricio, trabajan impecable en el taller, he llevado un par de Autos y el resultado es espectacular" — Joaquin Saiz (5/5)
3. "Excelente servicio,  responsables,atención cordial y precios justos" — Carolin Beltran (Soa Datos) (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJaWdb5QvFYpYRNC9yPxq32X4/photos/AWCwydgfClFayRZtsRfdJ5edwDpIqCk0Lz9s4-nxc8J1kgtfulUnHEmsmE9rp0rwWfoxq2Ufo4wNLwtGwYFvRxOwUd0sh_7uBOmfu8jO2VauVGtXkfDJlJmTQbp1ea5IZZCIiUQIz2Gg0xsOdxZhpUiKyqAaH96b06VRl0vWEMWxmZkqZHoBWA0ue-RJqFDiqfrrMXSD2JdgIsy4E4TLstSypsKumYFKh6Ker5Tz1wz9BgPHIhGqtnIQwzsLhgEz8iZP2OS5Ffct-iPsRJ5PBULlBeUU_3WO5aqVzIkRU1O3VTugYPVjEtKTJT-eICqUoe2wVj35WR17THj73n_7umDkvt2eNryRUf1P0j6vyCR-UKsFbYnLiM1dRCgMZO6cH6fWj88ExC1zmJucCe9GLSjeHuhA2tX2IPFNTGkKYc--nhBK-A/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJaWdb5QvFYpYRNC9yPxq32X4/photos/AWCwydjiuLCpdytOLrrpUdxj8AOx5-cxdGSrQD75PvPCNXKGCkMFV2G7oA2_Q6UJJgFtu8-VjHe_P7O6EiUlplIMQE2Sf-LIynTvkq7_iHELGz0WjLy5p-HsgN9RIVblUZLT1QObknqqrJOn7gMRhE8sIRTY7Iwc0pNq1-t2HJGUldA_6vS-Qjc3VAEqLNHcaingsr3sQP0nqoX98bgn05wOUqkOUlQGIRH8PNiU1RCuGlw9wY94jJhkUFe_-qxSiO2R1UXBXb9dCNOoRIRNNJEj0hBKcL75aMIgtN-S-c1og3iQAU3Coh-qo-ApeoBtyAXkR_Q2q9xKwo0avd7ZzYHZ2jpk-zCU_ex7EuxpKo7PCmt0S7_9VumJrQKzeghuIhOi9zF1JHcMUiZxzwsTb7y6z-dERVgqqGkku3THq9qkQdTeZUhL/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJaWdb5QvFYpYRNC9yPxq32X4/photos/AWCwydjkHlPtv22kgcYHmeWwVqIm__PLbbEAv2MjxEjTuhyOcBqjBfPPxdMlOhgbi7vf93fIEtvh1zhfDPHv37FDRpEBiO89UV5FKWrD_rpiXb8UCepKyvRR9o_AGTdWo-DTqoJI9QMs0qIKK2Jfu9P4eT7T_Gj00BIveLLClGHaKFB9yb0yIsTNXRHSofPuzhBaQBGm0kJN6mv5CjBtR6nXlXWeGbVQd9RkL2P4YerP_WKVfPhg7YyjJRJzWpBGy3wAFEtbE3LPXoltpjZrkk4ndwWwouFnt9Ar6P1ock0R2vvOhgEmNDbDLPMsSAnLHCC7K0px-1a6s0_L9n_l8q-rq-FqXF-HmTOk4Fhy13kCjAXM1ghyFg1zsOJyKQj9gHwnefo8t7WfPSicLBrNUoC7rSa9HFTAdl2MSkXTbJV65Ns1Dz1Z/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=9140538242086612788&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/115347403194733454842/reviews
- https://www.google.com/maps/contrib/100162463821096706368/reviews
- https://www.google.com/maps/contrib/101137911389046799939/reviews


## Recommended Design Direction

- Use cues from the lavadero y detailing de autos domain and the local retail/service context in Santiago de Chile.
- Quality matters more than cheap or fast generation.
- Choose one proven conversion template: `hero-proof-offer`, `editorial-local-story`, `visual-menu`, `service-diagnostic`, `catalog-counter`, or `urgent-call-first`.
- Build a real landing structure: strong hero, trust bar, services, why choose, offer/options, before/after or gallery, process, reviews/contact, final CTA.
- Make sparse data look intentional: use AI-generated generic imagery and crafted microcopy where the source data is thin. Do not leave empty generic cards.
- Automotive references to emulate structurally: strong claim + numbers + services + CTA to booking; urban/aggressive wrapping/custom style; detailing service taxonomy; emotional hero; packages; before/after; reviews.
- You may use plain HTML/CSS or a framework/library if it materially improves the final UI. You have broad discretion to use frontend/UI, animation, and icon libraries such as Aceternity UI (https://ui.aceternity.com/components), shadcn/ui (https://ui.shadcn.com/docs/components), Magic UI (https://magicui.design/), Framer Motion, GSAP, Motion One, lucide-react, React Icons, or similar component/motion kits when they raise product quality.
- If using a framework, build/export it yourself and point `agent_frontend.output_dir` at the static output.
- Avoid making the 3 pages share the same hero rhythm, card system, font pairing, spacing scale, or composition.
- Prefer concrete microcopy based on the signals above.
- Vary `visual_mood` and `composition` across this 3-site batch.
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/santiago-de-chile-lavadero-y-detailing-de-autos/infinity-x-car-detail`
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

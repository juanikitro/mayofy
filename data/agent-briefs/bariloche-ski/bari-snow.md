# Site Brief 9: Bari Snow

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

- id: `google-ChIJi7WvSQBxGpYRH3RIELkAnrw`
- slug: `bari-snow`
- name: Bari Snow
- category: Store
- inferred profile: Store
- requested segment: escuelas de ski y snowboard, alquiler de equipos y traslados al Cerro Catedral
- city: San Carlos de Bariloche
- address: Francisco de Biedma 55, R8400 San Carlos de Bariloche, Río Negro, Argentina
- phone: 0294 421-2523
- hours summary: Lunes a Domingo: 9:00 a. m. – 8:00 p. m.
- rating: 4.6 / 5 (78 reseñas)
- service baseline: ski shop

## Suggested Commercial Profile

```json
{
  "tone": "practical-workshop",
  "customer_type": "Clientes locales que necesitan entender el servicio, llamar y llegar sin friccion.",
  "hero_claim": "Una landing clara para convertir una busqueda local en una consulta concreta.",
  "services": [
    "ski shop",
    "Atencion en local",
    "Consulta directa",
    "Ubicacion en San Carlos de Bariloche"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "4.6 / 5",
      "body": "78 resenas registradas en las fuentes disponibles.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Rubro",
      "title": "Store",
      "body": "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas.",
      "meta": "Base verificada"
    },
    {
      "label": "Agenda",
      "title": "Lunes a Domingo: 9:00 a. m. – 8:00 p. m.",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0294 421-2523"
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
      "label": "Servicio",
      "title": "ski shop",
      "body": "El servicio principal se muestra sin agregar prestaciones no verificadas."
    },
    {
      "label": "Contacto",
      "title": "Consulta directa",
      "body": "Telefono, direccion y horario se ordenan para reducir friccion."
    },
    {
      "label": "Prueba",
      "title": "Referencias publicas",
      "body": "Rating y resenas reales sostienen la decision."
    }
  ],
  "why_choose": [
    {
      "title": "Datos en orden",
      "body": "Nombre, direccion y contacto en un solo lugar."
    },
    {
      "title": "Sin claims falsos",
      "body": "No se inventan servicios, premios, precios ni trayectoria."
    },
    {
      "title": "CTA claro",
      "body": "La pagina empuja al siguiente paso verificable."
    }
  ],
  "packages": [
    {
      "name": "Consulta inicial",
      "price_label": "A confirmar",
      "body": "Bloque editable para convertir visitas en consultas utiles.",
      "items": [
        "Necesidad",
        "Horario",
        "Contacto"
      ],
      "is_demo": true
    },
    {
      "name": "Servicio principal",
      "price_label": "[Editable]",
      "body": "Espacio para detallar alcance cuando el negocio lo confirme.",
      "items": [
        "ski shop",
        "Alcance a confirmar",
        "Datos reales"
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
      "label": "Store",
      "title": "Detalle del trabajo",
      "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      "meta": "Foto a reemplazar",
      "is_demo": true
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Contar la necesidad",
      "body": "El visitante consulta el servicio principal."
    },
    {
      "step": "02",
      "title": "Confirmar disponibilidad",
      "body": "El negocio valida horario, alcance y datos."
    },
    {
      "step": "03",
      "title": "Coordinar visita",
      "body": "Direccion y contacto quedan visibles."
    }
  ],
  "final_cta": {
    "title": "Bari Snow: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: store, direccion y horario.",
    "primary_label": "Consultar",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Top" — Guilherme Otávio (5/5)
2. "**Review para Bari Snow - 1 estrela**

Tivemos uma experiência absolutamente terrível com a Bari Snow em Bariloche. Alugamos quatro equipamentos de ski com base na confiança nas indicações do dono da loja, já que era a nossa primeira vez. Logo no início, durante a aula com o instrutor, descobrimos que um dos equipamentos simplesmente não encaixava na bota correspondente. O instrutor, surpreso, nos alertou sobre a péssima qualidade dos equipamentos fornecidos.

Quando retornamos à loja para resolver a situação, fomos completamente ignorados pelo proprietário, que se recusou a trocar o equipamento defeituoso ou oferecer qualquer solução. Para piorar, ele nos ameaçou quando mencionamos a possibilidade de reclamar e, de forma absurda, não devolveu o documento de identidade que havia sido deixado como garantia.

Mesmo tendo pago 100% do valor da locação antecipadamente, fomos obrigados a alugar outro equipamento em outra loja para continuar nossa experiência de esqui. A Bari Snow foi a pior escolha que poderíamos ter feito, e a falta de profissionalismo e respeito por parte do proprietário transformou o que deveria ser um momento divertido em um grande transtorno. Evitem essa loja a todo custo!" — Joao Vitor Coutinho (1/5)
3. "Melhor loja para alugar equipamentos de ski .. aluguei uma prancha de snow, lucy dono da loja fez todos os ajustem. Além de ter um excelente preço" — Escame (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJi7WvSQBxGpYRH3RIELkAnrw/photos/AaVGc3mWpFyHiO4lscNBST1LqoMA4lHBifpU-fbLkS4HrVN_RMf9WQsFR9jJGcgnig660B8cRdPqQ2hNw1D-reyRDSLxhNwlpNuEC9nDKmIvYLOrNSFpbmoH99F1IIfVIgG8XRUCqgguN1PhJgnTDTBt-uZL4dqHn7gc7YIX9vwbTFUH1ReA7yqh_-P75vdV7isIX0tagbaAl7TlBAp_3j_f7jgHg3UrP_QdsGaK4scr83AEmY78w5jYtOTv5ZA6J3cSbZaEdn3yjUUxMCn3zNgluZzhvKdmJDx1O7GkNRiLAvE3x7K2LJl-U-TEJ3uCtVKI0IzDtPZ2JDSXvz44XVS7CasRE251VwRx8hegNeHQJ-oid0y-LduJuCosPnEvpzilXhZvurpEGJs6KVNxFZAhLtlU3K4L1jCR6AkRyrWm4al4-A/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJi7WvSQBxGpYRH3RIELkAnrw/photos/AaVGc3mrPFdO9r57gqgkkAGf-3zKVxSiqwF2y0hw_GjY3hsFUJ-8gg90j2J43ZSlpu67QMuzMdq6Wbqk-YY-_hgB8beTtWJgMXvVNihWLS-9tTc4VwL436vd-uxGaGa8qPuhxDTj_JzLELSQz5V8GAawOVr4f885pizckheoBHw9zrLJoJ2q5wRINkAyUO1NwrHLaybkC3LHPixR51ldY7Ft8tcgiTImDLSSpLtGOcXj-O5UnbmKAAiXJeIRTVdjeoB5QP71B1oXH7mgcH1RRoGpJW0SYOzg2iTB1vgPbPFA6PoF3cL62EiMRLwAf8CeCQyRtdo8Z9634MxyZjsfNFo7_7kOpBMA1qeVLHhpH6fxiHgup2kPFk7magMpRWnmeciGwOSL_WSdMENla-tKchY36ICYkPLbr36UnIPsomoY6YvsuQ/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJi7WvSQBxGpYRH3RIELkAnrw/photos/AaVGc3lCkjcHGT4_q7zUZYTo5d2gWmH81VEeRecn6W3omjsA11UDOX8dsvTNlgZPu5FG7S0xGe66IJ8VvaNZecVfPQcgGR5-6cDPlW0_kO_3QEcHX4n_hqsTu3Gtv55QSNdNn93l5Do3o5l1_0LpquNDhDKzK_AN6-O7AoNy5NaXE-H1tKO5RiKMljCsLRRkV1I4xafN4c9Zs4NmzyKFWvmBrIBIFCmZxpHHCvh_W17ogq3agEvVBkaH_g-9C-9Vw1AByM31zZ0DwpQmkZUAmr1KNFta1iRjUiWp0FZRlZer4BOxPu6eacnGlUozu-1kXSVB8noN2EH_wIJzADGKkIG1uOnbFtKThNFHQkMTGGOL3wWvQbvSPGr1c1lU-XQuNUh690-0wAFe1WBHpEBKsBAZylYzoGFhIhwrRM7PwowCG4S4ZctK/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=13591301520292869151&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/117359545908225760436/reviews
- https://www.google.com/maps/contrib/112841381749454203705/reviews
- https://www.google.com/maps/contrib/100493554119607059074/reviews


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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/san-carlos-de-bariloche-escuelas-de-ski-y-snowboard-alquiler-de-equipos-y-traslados-al-cerro-catedral/bari-snow`
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

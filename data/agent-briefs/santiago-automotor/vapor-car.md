# Site Brief 2: VAPOR CAR

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

- id: `google-ChIJx3dSsZjFYpYR9-uj3z7VQdw`
- slug: `vapor-car`
- name: VAPOR CAR
- category: Car Wash
- inferred profile: Lavadero de autos
- requested segment: lavadero y detailing de autos
- city: Santiago de Chile
- address: Av. Vicuña Mackenna 665, 8330435 Santiago, Región Metropolitana, Chile
- phone: 9 5246 9350
- hours summary: Lunes a Domingo: 9:00 a. m. – 8:30 p. m.
- rating: 4.7 / 5 (342 reseñas)
- service baseline: lavadero de autos

## Suggested Commercial Profile

```json
{
  "tone": "premium-detailing",
  "customer_type": "Conductores que quieren resolver lavado, interior o exterior sin comparar mil mensajes.",
  "hero_claim": "Salir con el auto limpio, prolijo y sin vueltas.",
  "services": [
    "Lavado exterior",
    "Interior",
    "Lavado completo",
    "Consulta por disponibilidad"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "4.7 / 5",
      "body": "342 resenas registradas en las fuentes disponibles.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Rubro",
      "title": "Lavadero de autos",
      "body": "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas.",
      "meta": "Base verificada"
    },
    {
      "label": "Agenda",
      "title": "Lunes a Domingo: 9:00 a. m. – 8:30 p. m.",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "9 5246 9350"
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
      "label": "Exterior",
      "title": "Carroceria presentable",
      "body": "Servicio explicado desde el beneficio: llegar con el auto limpio y una terminacion cuidada."
    },
    {
      "label": "Interior",
      "title": "Cabina lista para usar",
      "body": "Bloque para aspirado, superficies y detalles internos solo si el negocio los confirma.",
      "is_demo": true
    },
    {
      "label": "Turno",
      "title": "Pasar o coordinar",
      "body": "La landing reduce friccion: horario, direccion, telefono y CTA visibles."
    }
  ],
  "why_choose": [
    {
      "title": "Rapidez para decidir",
      "body": "El usuario ve servicio, horario, resenas y contacto en el primer scroll."
    },
    {
      "title": "Servicios empaquetados",
      "body": "Combos demo ayudan a vender sin inventar precios; se editan antes de publicar."
    },
    {
      "title": "Fotos con contexto",
      "body": "Galeria pensada para autos reales del lavadero, no imagen generica vacia."
    }
  ],
  "packages": [
    {
      "name": "Lavado exterior",
      "price_label": "Precio a confirmar",
      "body": "Para resolver presentacion diaria del auto.",
      "items": [
        "Exterior",
        "Secado",
        "Terminacion visual"
      ],
      "is_demo": true
    },
    {
      "name": "Completo interior/exterior",
      "price_label": "[Desde editable]",
      "body": "Combo demo para vender una visita mas completa.",
      "items": [
        "Exterior",
        "Interior",
        "Consulta por demora"
      ],
      "is_demo": true
    },
    {
      "name": "Detalle puntual",
      "price_label": "[Editable]",
      "body": "Espacio para agregar motor, tapizados o tratamiento si se verifica.",
      "items": [
        "Necesidad puntual",
        "Foto previa",
        "Turno a confirmar"
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
      "label": "Lavado",
      "title": "Detalle del trabajo",
      "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      "meta": "Foto a reemplazar",
      "is_demo": true
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Elegir tipo de lavado",
      "body": "Exterior, interior o completo segun necesidad."
    },
    {
      "step": "02",
      "title": "Confirmar horario",
      "body": "La pagina muestra disponibilidad publicada y contacto."
    },
    {
      "step": "03",
      "title": "Dejar o esperar",
      "body": "Texto editable segun modalidad real del negocio."
    },
    {
      "step": "04",
      "title": "Retirar limpio",
      "body": "La galeria puede mostrar resultados reales del local."
    }
  ],
  "final_cta": {
    "title": "VAPOR CAR: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: lavadero de autos, direccion y horario.",
    "primary_label": "Consultar lavado",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Super!!" — Roberth “VENDETTA [FEO]” (5/5)
2. "Muy eficientes , lo he llevado dos veces , me salió 30 mil full completo y encerado …perfecto" — Luis M (5/5)
3. "como el forro fui a lavar la moto un asco como la lavaro la moto super mal lavada no vuelvo mas" — nelson vasquez (1/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJx3dSsZjFYpYR9-uj3z7VQdw/photos/AWCwydh-mmzXqszRjDp4vD4iDnIZOPmGklCfKrcb0PbxppMWHkzaQb5e4IpN_6siyq5FR8v2FdhJEi5nahNpkioW20GIzv0lbtyRLkxZg3vSObRXTDib633EnVSQuaqnKD8tAJK3Q2CWHzVa0bUbPSKQ6eM764g6chw42Ij2I7U-IFnnB--P6sQTRNoPfsX9xz862dLky11WGaMcL7DQ0nCH1luViGlOKQDRKd0w34ezUzZ2Gydim9bxV4czFueEEmmUAgidO5f_p2px3Ox3cb-63GSIIGvLMj87OKCEO2fs8RRBs40qqwM9Yf2c_jKP5JmD0stg8rqJKoIYZjD7RL7YFBdkMrFyuM3gXaXPD5anHh3oVAqS0aIW4Sgd-6ZWd66sVuKUazmoFkoTvIFcopv_0PAf0qq0mHLNY89Q6Oy67Y8f7JwZ/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJx3dSsZjFYpYR9-uj3z7VQdw/photos/AWCwydjBS4B34p4NUaM9RVtfYQ-sdxW-AVi_z-CWta9nWkbu-Ud121DWOKkKTedEkA1uSBqx3WPxk1SHKcl6KDBzXD_PJW9rgmMClwHELn1n3TnNWXYkXtJl8tjpyLML4ueHj0pKJdVU2DqtRLkD1KtdsT3KUa38uwCpz2KeXrIWj3yL2ReXLbhyqffBBU9wQ3JXLYvPpvhJsYMnQywnfyPqZ8QsR8OIJqWcGEnlXM7GivkEkaoRP8c-V7B5fFaCKKcU7-nmFhN3XBQ2_ZuxLutW6JI74poq2Wd5W3Xel8ZSjJjmVDUruAVn2eG7tr7padPxQb4VI472QFJDEpzxo_LQNT2PPaW-EMlEF9zVm8CkSJ87HcmAISpFjHsgc3QKPpkWYBwxEnNwUOC9kcUt7ZduIJHDb25w01zvRnvWaFS7ZJbqCe4N8PWCGDKZLGlJ8-HQ/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJx3dSsZjFYpYR9-uj3z7VQdw/photos/AWCwydj4n6Ndmd9d8nbMgTWsBnID4Xn82nf07JrQ_Oh2ad3VRCk0nX6lkP7uB-xh2D5QwFFzo0NmvSKI3C-NHlu_7QvzFoj4EJL5hUgUCnHvav0BYsqX-44seJr3NdGGeACz7ld3eZXVrIFEQwNF10LeqkChOaQNXyy6qatMwMucRe8tIv2Zf9BOqG1BqzItiT-Nl1QUpsO812tH1ErMELvzkQRZmb9WSzY3Isq5VliUwqr3PT4OCKcXPa5PrwEONS8bHALngERYgTQdcX83t5QyeZM7QRKUlA0-kVc0fsEozTRQ9AEfXM2oOGtEs8zWxj4GAc0DolMzEGgAm3seviGh85PhROY10l3E4rUlv73RdT2y8UjUooOQjNXhJrHbqOm_t93mTFWQjYGiTqi2NKwPcdWELD74wTqLf7Yem4cVdYE/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=15871201027847089143&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/111575829085919734883/reviews
- https://www.google.com/maps/contrib/109040011421107626021/reviews
- https://www.google.com/maps/contrib/108436157412003261297/reviews


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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/santiago-de-chile-lavadero-y-detailing-de-autos/vapor-car`
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

# Site Brief 3: Lavado de autos El Cafetero 2

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

- id: `google-ChIJQ7Uje3LFYpYRHo1MUdeq4WU`
- slug: `lavado-de-autos-el-cafetero-2`
- name: Lavado de autos El Cafetero 2
- category: Car Wash
- inferred profile: Lavadero de autos
- requested segment: lavadero y detailing de autos
- city: Santiago de Chile
- address: San Isidro 827, 8330729 Santiago, Región Metropolitana, Chile
- phone: 9 9065 4600
- hours summary: Lunes: 9:00 a. m. – 7:00 p. m.
- rating: 4.4 / 5 (117 reseñas)
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
      "title": "4.4 / 5",
      "body": "117 resenas registradas en las fuentes disponibles.",
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
      "title": "Lunes: 9:00 a. m. – 7:00 p. m.",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "9 9065 4600"
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
    "title": "Lavado de autos El Cafetero 2: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: lavadero de autos, direccion y horario.",
    "primary_label": "Consultar lavado",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Personal muy amable. Tiene un sector de espera muy cómodo y limpio" — Ricardo Sasmay (5/5)
2. "Muy buen lugar, el auto quedó impeque y tiene sala de espera. Me salió 12.000, así que volveré." — P (5/5)
3. "Fui cliente por mucho tiempo, hubo cambio de administración y ahora es pésimo el servicio." — Claudia Diaz (1/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJQ7Uje3LFYpYRHo1MUdeq4WU/photos/AWCwydhieyBnIeIdotJ8E84jMs1gDLZ1MBHysNiSmWmDmwTNHl41jfcfVrSAWQpM1T7wiTrOJvQIIDed8W2C9NBAcche3JIV9_eegvYShsHJHLR_tmqzuwl7xn-i8NWx6sr_cy6oZTxpRZpC7zWPLWyR7oBhoYpSL9xW3u1dDU5Jm4Vz7nqSwiYUUrjDwAOoJsGvXxzMt5XaG23Dawbp4osFPy8yy1WMnKKkm8OxCfNuqVUMmskYMnzF2RyMGonEMIYMBgFmH_p40NFKOKjzTS2SDJr3MNOuwxhr4yoGEIMIj_ZIbZUkBb1-lI1al3iEDlh3augzeZoUixQfu5fINT6JPKTetXe9p_hKd7Zmdk1KbqH6M3gIMH6jKni-Y5Eata-F6SWwT6g5y7nHOU75RxcFtV8EEI1GUQng4GvDhvAeXy1cgS_AFSWh__1JvJVYu7k7/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJQ7Uje3LFYpYRHo1MUdeq4WU/photos/AWCwydgy8sIAl3iE1Vpvxk6dNw7j6UhJaGClaQ9sTirN6pObB9RRna6dz13GgDjrzi31dJUaxMLjJNJABkLVrbVW9xBH4G973N0rQS1qF-LnfHEOHsCa7qrNvuBaa3dSVHmZHdKf6ysHsv_tW5Aap3nk2Q796xPj9sr7ZBY253KXPvLbT_oavjrKPA92uoX37bY1fiwcIKb6ib89iTAw4Fe3VJqyhR6ULU3udZVCjTC18rQkalWr1r0KUbc0cuxeB0yhkvchQDdKM6mVGwmJ_9lPYZALAtEksOXJrQU1d8viX9N6C7mEEt0IO2_MhXW2yXxksL0xK_wKBhC2vSxEd0_EbcBuKhok1PHsJ0JWzo4U4Cu8xLD5ap0nY1SHT3DtQBBnV4nYwtpmyzRjL4fE3h5GpRSIFcqcS5Sp63EwjGPPxR0/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJQ7Uje3LFYpYRHo1MUdeq4WU/photos/AWCwydjaOyR0YRQ6ZqeqG-MUykqSoxwy0EaFw9mL6JLT7_upLCKgl37OCMJTkOTfKWdvuA43Hrj-hG_UwpMY-PBBCYudr16vupRlO48MKV9r_tD7o5Fx6-V5bB_2zPCe9EDpf5JUNE4W3qDxO9kzMs_U0f1LJFUDNsYi4DeJvKfgk1y0FHCFO66bLmOod1YtQD9Q4iTToPJZiwlcx0_TshSHKnDozDH9LdxjFkGt5KdOp86Rv9t-rJX0lJTRCLDbwEgQHoBSBVM_ieZTcF_hGiqtT-s2svnlevg31BLaUs-vbDLlqOSU5XF0Bg3ncWKYadOFq0HYheikxv9T7g5t0RWrYsDtbc7dC9Lzwo5-_cW713T7qOZIuGniofyTmWRCcset3lZrt0Dy6KeNLTwlmYp6jJWquP_6T3DMJ_WT-VsfmWfMR-vC26y44WfRgFJjcA/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=7341336709349281054&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/101929320413754300420/reviews
- https://www.google.com/maps/contrib/114367743198622212878/reviews
- https://www.google.com/maps/contrib/109836897080047858521/reviews


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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/santiago-de-chile-lavadero-y-detailing-de-autos/lavado-de-autos-el-cafetero-2`
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

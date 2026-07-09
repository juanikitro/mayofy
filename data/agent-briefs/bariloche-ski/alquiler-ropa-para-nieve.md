# Site Brief 8: Alquiler Ropa Para Nieve

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

- id: `google-ChIJW3ukkESHGpYRuNvepYeDAmo`
- slug: `alquiler-ropa-para-nieve`
- name: Alquiler Ropa Para Nieve
- category: Clothing Store
- inferred profile: Indumentaria
- requested segment: escuelas de ski y snowboard, alquiler de equipos y traslados al Cerro Catedral
- city: San Carlos de Bariloche
- address: Las Americas 359, R8402 Dina Huapi, Río Negro, Argentina
- phone: 0294 453-0283
- hours summary: Abierto 24 horas
- rating: 4.9 / 5 (17 reseñas)
- service baseline: alquiler de ropa de nieve

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
      "title": "4.9 / 5",
      "body": "17 resenas registradas en las fuentes disponibles.",
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
      "title": "Abierto 24 horas",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0294 453-0283"
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
    "title": "Alquiler Ropa Para Nieve: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: indumentaria, direccion y horario.",
    "primary_label": "Consultar disponibilidad",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "La ropa es ideal para la ocasión. El servicio que ofrecen es excelente. Son muy cálidos tuvieron el gran gesto de alcanzarnos la indumentaria a nuestro punto mas cómodo, se adecuaron a nuestros horarios y nos trasladaron en un momento a donde estábamos alojados ya que llovía mucho. Cosas que no se ven habitualmente. Mas que agradecidos y super recomendable. Y precios accesibles. De seguro en la próxima ocasión vamos a acudir a ellos para esta necesidad. Variedad en talles y colores." — Solange Fernandez (5/5)
2. "Seba es un fenómeno.
Nos trajo la ropa a la casa a las 00:00h.
Tenía mucha variedad y a muy buen valor.
Volveremos!!!" — Nahue Dobos (5/5)
3. "Excelente servicio, la ropa impecable , Carla y sebas bien predispuestos a la hora tanto de entregar como para devolver la ropa. Lo recomiendo" — Daniel Mamani (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJW3ukkESHGpYRuNvepYeDAmo/photos/AaVGc3kblULMO0bq57KUo9bvEebU3V2eBv8SxBpuqOKu-ix0B0w5xQeysRZzcy1KZsexiwKlFVa3F8eHhUz0kYi2SM79Qz7Zfs7qLUTjf1a__BUzvgtGstdBiehJHt_lfBzoj16dH_tYFd50BjO8GY4qDgPgoo4SU0Ec3hlwi9-k-gWIONzGyfK1_NakVmZFiGX7kLL2Nvy6rnvwSuZcvd24M1UykR8FpzzuJZBSw294VKDvTjLRmnoHX-iTx0agR5LaSoM2w22oNFpzXH1lnTgNQxcGegKPYHZO-NYiJC9ByS4uhTKjdyiVVdgRvTfnUXbvHdJ5GtOqPEcpxve_tTAbHp7_XK7iSEu94nKyVYMQW4JrJO6c01LHPB5EBlDSIBC7FfKJeOxLiy1ItReu751pndN9QahhJeNdNHcMNA33AAGo3Myx/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJW3ukkESHGpYRuNvepYeDAmo/photos/AaVGc3kE5FOMTqMesSa4Yx3wfo8JeFFS1fXb-GJtPljzEbtgQfWOmaBn5kf2s1UFJsR-ApT1iWidOLVeWTIoAJEgnaFvAyqdAIfWDJM9ovlg-yKI7TuuI_VlljpKE0yG8JVN_DuSffLfgOFmsmmv7YtDfZCfYeg8tZIFhTRkYz4i44SqpDX6Hv4q9COtPtzIigQF-50JffvP54AuWcJdMMOZ4s0oHAJekaWRyiFS9cYbaM2jhDT6OEFc45pk2JRUBjvejtjVAvkpw8euKtzHdnVWSOL5kGVNjG6XounIxPbhXjd-OB7e6acsDEYI2djLBlUjW7IJaKq95ODfPkrmJdRyshz1xxr5SPjK1HuZB5t3IA-BX2oSSO2PUtuILstGCi4q-ZUdwVE2LBZlGopTBPk6UOxU97pPc9m7MyjFWvtG13CSYw/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJW3ukkESHGpYRuNvepYeDAmo/photos/AaVGc3kyKD4NmdxE5uBUMZP2bCDqKf20p7w7YVNVX2ZlFsMbFqXpp455EP2eDrS-q30LewBy49o6BPKfo7odpuBQG-8sLbDU22vDv1R14kuYYSIMxkqzZCZU8aBBKrb_Et82ig9-pFNlil3Qt6ov0YkI7kevK5GLlFSp5jj9gz9GL_v1oJHm4gVqyGF-kqXY9F6dDuMc473A8iIACg94MJIMIf8vPw0jrvmYxU3tMHupi2Muw2Fm_VbRlpM5ApYipDermVNn6bbJSHJ03dJpx5VNAgxuv6nId8AUhA-EaaJuOusDWF8ClJtsOSp8VIyJOu0lV_hp_YPxY4RtawD-XxxpPBFkqNdcO1XsCrrK5Rjrbejq_ByeB35wEnebwt6Q6AfVpMJX7F6U8WuSPCLAZe2TH6LEBa2LIcFZRBVtXgP_-b9SGw/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=7638812536600452024&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/111226257022639244662/reviews
- https://www.google.com/maps/contrib/116531767982379949756/reviews
- https://www.google.com/maps/contrib/118241552165226752466/reviews


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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/san-carlos-de-bariloche-escuelas-de-ski-y-snowboard-alquiler-de-equipos-y-traslados-al-cerro-catedral/alquiler-ropa-para-nieve`
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

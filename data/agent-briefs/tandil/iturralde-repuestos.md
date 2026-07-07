# Site Brief 6: Iturralde - Repuestos

## Goal

Write or refine one `SiteSpec` for this business and create its real frontend artifact. Use the agent session context, judgement, and frontend skill. Do not call the OpenAI API from repo scripts.

## Hard Rules

- Use only verified data below.
- Do not invent services, years, awards, guarantees, prices, certifications, owners, staff, or claims.
- Visible copy must be Spanish argentino, natural, local, commercial, and strong enough to sell the next action.
- If useful commercial facts are missing, use clearly editable demo placeholders instead of weak filler. Examples: "[X] vehiculos atendidos", "[Precio editable]", "Opiniones reales proximamente". Never present placeholders as verified facts.
- Avoid generic filler like "soluciones integrales", "calidad garantizada", "experiencia unica", "creado con IA".
- Keep the business name isolated to this one site.
- Make the page feel designed for "servicios vehiculares" in Tandil, not like a SaaS template.
- Final generation expects an `agent_frontend`. The renderer fallback is only for rough preview.

## Business Snapshot

- id: `google-ChIJn0YZfYcfkZURojKDl1MpvRE`
- slug: `iturralde-repuestos`
- name: Iturralde - Repuestos
- category: Auto Parts Store
- inferred profile: Repuestos para autos
- requested segment: servicios vehiculares
- city: Tandil
- address: 9 de Julio 1556, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 401-7903
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 4.6 / 5 (295 reseñas)
- service baseline: repuestos autos

## Suggested Commercial Profile

```json
{
  "tone": "parts-counter",
  "customer_type": "Clientes que buscan disponibilidad de una pieza, accesorio o dato de mostrador.",
  "hero_claim": "Consulta de repuesto con el dato del auto listo desde el primer mensaje.",
  "services": [
    "Repuestos",
    "Accesorios",
    "Consulta por disponibilidad",
    "Atencion en local"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "4.6 / 5",
      "body": "295 resenas registradas en las fuentes disponibles.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Rubro",
      "title": "Repuestos para autos",
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
      "meta": "0249 401-7903"
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
      "label": "Consulta",
      "title": "Pedir pieza con datos",
      "body": "Modelo, ano, motor o foto de la pieza antes de hablar de stock."
    },
    {
      "label": "Mostrador",
      "title": "Direccion y horario",
      "body": "La pagina facilita llegar o llamar sin inventar catalogo."
    },
    {
      "label": "Disponibilidad",
      "title": "Stock a confirmar",
      "body": "El bloque comercial explica que marcas, precios y unidades se validan en el contacto.",
      "is_demo": true
    }
  ],
  "why_choose": [
    {
      "title": "Menos ida y vuelta",
      "body": "El usuario sabe que datos mandar para que la consulta sea util."
    },
    {
      "title": "Mostrador claro",
      "body": "Direccion, horario y telefono dominan la landing."
    },
    {
      "title": "Sin catalogo falso",
      "body": "No se listan marcas, stock ni promociones si no estan verificadas."
    }
  ],
  "packages": [
    {
      "name": "Consulta por pieza",
      "price_label": "Precio a confirmar",
      "body": "Para pedir disponibilidad con datos del vehiculo.",
      "items": [
        "Modelo",
        "Ano o motor",
        "Foto o codigo si existe"
      ],
      "is_demo": true
    },
    {
      "name": "Accesorio puntual",
      "price_label": "[Editable]",
      "body": "Bloque para accesorios reales si el comercio los confirma.",
      "items": [
        "Tipo de accesorio",
        "Compatibilidad",
        "Stock a validar"
      ],
      "is_demo": true
    },
    {
      "name": "Retiro en local",
      "price_label": "A coordinar",
      "body": "CTA para confirmar horario y direccion antes de pasar.",
      "items": [
        "Horario",
        "Direccion",
        "Telefono"
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
      "label": "Repuestos",
      "title": "Detalle del trabajo",
      "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      "meta": "Foto a reemplazar",
      "is_demo": true
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Mandar dato del vehiculo",
      "body": "Modelo, ano, motor o foto de la pieza."
    },
    {
      "step": "02",
      "title": "Validar compatibilidad",
      "body": "El local confirma si corresponde consultar stock."
    },
    {
      "step": "03",
      "title": "Confirmar precio y retiro",
      "body": "Precio, marca y disponibilidad no se inventan en la landing."
    },
    {
      "step": "04",
      "title": "Pasar por mostrador",
      "body": "Direccion y horario quedan visibles."
    }
  ],
  "final_cta": {
    "title": "Iturralde - Repuestos: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: repuestos para autos, direccion y horario.",
    "primary_label": "Consultar repuesto",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Recibí una excelente atención del empleado que me toco" — Lorena Blanco (5/5)
2. "Buena atención y precio!" — Guillermo Zubigaray (5/5)
3. "Excelentes muy linda atención" — Beatriz Ruarte (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJn0YZfYcfkZURojKDl1MpvRE/photos/AaVGc3lZ4kWJZTxKwI3KYGFAdYRBGC4i_ZzmZYQ6UDwMWnV11xCvenPRGOXYM0rD8iBTfdX8KdK0fpiq3l_1G8-LgJcD1euxR1Mv1sNC5y9-5dlBbr-KBBeNqV_vQL_6vL13IUwRlfYddqcgh7FCpzmMPIcDWSTvW06syVF1u82ldrsrrxTlHrVqGMwmp6vn3nhij0p8GnVwk-ynbbyPnr1vfoHgKwMCHOrsGILAy2Vz_ZDQmOHUqNRcitnshD6QtPzETpGBlWshs-glljoTB6eBccGGoBuGKI5XtNV6JdfxkJQKzwcFOgN2iI-UwT84g75oJzoOqhoyrVPxuzwqj2qUyFyQOlV7Pcd5ZDYh2gQ9VlpCjONnH8JKG7qrcO4qk1REQEeDMkZ4X1bzmjOBFLXMtMg_V1TOEVPJr9hMXmZuBZR5Y6DU/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJn0YZfYcfkZURojKDl1MpvRE/photos/AaVGc3l7G7J5IVxQa494K4r7Mph7eSt635qIvl_x2t6AzmoE7MApStfziF8brvoKLdBFR0YkAJkJaN2q_L-wC2aPm9MHWuUhw_gZyPceSnT7pg0PQSVjpk0EeFVwMjgdAJgeZJwyvxAfMRqzw9jufnkdyBckVoTLoymR_lOHvX7eOMDK9UpHOgpstlxH0iJ5n-MDmqrpIfPAIJcb1m525fRo_p1vNv8w60SO5jgH_J31Hxu0wuudSQwLFI82qyNRCA-RSi6IA5SPeqLiVMlNNqgQHJk7QXn32Q3UN5TR-1Gf8SGvJFhiDujLlyPpZ1K9inRewUPdi44rn_Ci-QcJfy6msDyWhOu05KWU4Vacmw1IezEXL4mhmbsSeAn1jy0ruWKSBs8cKYOhrqJt7C5XN0Fu1dAmiqiyLWV3125rLkxF7I3Oug/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJn0YZfYcfkZURojKDl1MpvRE/photos/AaVGc3mpJUg9WhMYeC_Uaz-wNtSFqE6AouE0PI5Ww6RM8BK851eyWAdIduzJ62igz0Yyc_Vic5aveEL3U3jMjWZZgwt0M9Ysq3o1Vi2_ad667Er0BgsMsCug8xbCrrur9SmSdGmJyNqVSeYNbkO2DDJTD6tugRHAnsQ2bpR0MxgQs7OgyvaxZwF1m-wyo4nzpMCCywgpPQ7CZN3ZWrhReaGm1lwJEMVkrCspvIgiZrquE--mcjq-UtYiTxzH2S6iu5JKrQjj7BTLXf5UcHsfqcuQajd-dgBiDYnrby_-_ngbkRUnVW8oP8izk00fj7C1xEUlBW_5MBFFuQbz7q7w8v3QNxI4FVpeGXE3NI2bA_e3OFOi7AVKSSztYKnsk5a0pCknCOxrOWDJO5dho2NqqV2h8G8aEUC3DyCMfsFlNtYATt8/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=1278223308244071074&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/115410606694359915259/reviews
- https://www.google.com/maps/contrib/105454300057162681743/reviews
- https://www.google.com/maps/contrib/114354342686868698368/reviews

## Recommended Design Direction

- Use automotive conversion cues: premium/detailing or urban/custom art direction, strong hero, trust numbers, services, editable packages, before/after, reviews, booking CTA, practical contact and location.
- Quality matters more than cheap or fast generation.
- Build a real landing structure: strong hero, trust bar, services, why choose, editable packages, before/after or gallery placeholders, process, reviews/contact, final CTA.
- Make sparse data look intentional: use editable placeholders with labels, visual empty states, and future-review slots. Do not leave thin generic copy.
- Automotive references to emulate structurally: strong claim + numbers + services + CTA to booking; urban/aggressive wrapping/custom style; detailing service taxonomy; emotional hero; packages; before/after; reviews.
- You may use plain HTML/CSS or a framework/library if it materially improves the final UI. You have broad discretion to use frontend/UI, animation, and icon libraries such as Aceternity UI (https://ui.aceternity.com/components), shadcn/ui (https://ui.shadcn.com/docs/components), Magic UI (https://magicui.design/), Framer Motion, GSAP, Motion One, lucide-react, React Icons, or similar component/motion kits when they raise product quality.
- If using a framework, build/export it yourself and point `agent_frontend.output_dir` at the static output.
- Avoid making ten pages share the same hero rhythm, card system, font pairing, spacing scale, or composition.
- Prefer concrete microcopy based on the signals above.
- Vary `visual_mood` and `composition` across the 10 sites.
- Avoid repeating the same hero rhythm, proof order, and CTA wording from nearby briefs.

## Current Spec, If Any

```json
{
  "business_id": "google-ChIJn0YZfYcfkZURojKDl1MpvRE",
  "slug": "iturralde-repuestos",
  "visual_mood": "fleet-utility",
  "composition": "split-command",
  "headline": "Iturralde",
  "subheadline": "Repuestos para autos en 9 de Julio 1556: telefono, horario y referencias de atencion para consultar antes de acercarte.",
  "primary_cta": "Consultar repuesto",
  "secondary_cta": "Ver mostrador",
  "service_tags": [
    "Repuestos",
    "Consulta por pieza",
    "Atencion en local",
    "Horario de mostrador"
  ],
  "proof_points": [
    "4.6 sobre 5 con 295 reseñas",
    "9 de Julio 1556, Tandil",
    "Lunes a sabado con horario registrado",
    "Reseñas que mencionan buena atencion"
  ],
  "resource_title": "Mostrador digital para preguntar primero y moverse despues",
  "resource_items": [
    "Telefono visible para consultar disponibilidad sin prometer stock.",
    "Direccion y horario ordenados para decidir si acercarse.",
    "Reseñas publicas enfocadas en atencion y precio."
  ],
  "review_heading": "Referencias de mostrador",
  "contact_heading": "Preguntar por la pieza",
  "image_prompt": "Escena editorial realista para local de repuestos automotores en Tandil, mostrador, estanterias, piezas y accesorios, sin texto ni logos inventados.",
  "design_notes": "Landing tipo mostrador: compacta, utilitaria y orientada a llamada o visita sin inventar stock.",
  "commercial": {
    "tone": "parts-counter",
    "customer_type": "Clientes que buscan disponibilidad de una pieza, accesorio o dato de mostrador.",
    "hero_claim": "Consulta de repuesto con el dato del auto listo desde el primer mensaje.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.6 / 5",
        "body": "295 resenas registradas en las fuentes disponibles.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Rubro",
        "title": "Repuestos para autos",
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
        "meta": "0249 401-7903"
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
        "label": "Consulta",
        "title": "Pedir pieza con datos",
        "body": "Modelo, ano, motor o foto de la pieza antes de hablar de stock."
      },
      {
        "label": "Mostrador",
        "title": "Direccion y horario",
        "body": "La pagina facilita llegar o llamar sin inventar catalogo."
      },
      {
        "label": "Disponibilidad",
        "title": "Stock a confirmar",
        "body": "El bloque comercial explica que marcas, precios y unidades se validan en el contacto.",
        "is_demo": true
      }
    ],
    "why_choose": [
      {
        "title": "Menos ida y vuelta",
        "body": "El usuario sabe que datos mandar para que la consulta sea util."
      },
      {
        "title": "Mostrador claro",
        "body": "Direccion, horario y telefono dominan la landing."
      },
      {
        "title": "Sin catalogo falso",
        "body": "No se listan marcas, stock ni promociones si no estan verificadas."
      }
    ],
    "packages": [
      {
        "name": "Consulta por pieza",
        "price_label": "Precio a confirmar",
        "body": "Para pedir disponibilidad con datos del vehiculo.",
        "items": [
          "Modelo",
          "Ano o motor",
          "Foto o codigo si existe"
        ],
        "is_demo": true
      },
      {
        "name": "Accesorio puntual",
        "price_label": "[Editable]",
        "body": "Bloque para accesorios reales si el comercio los confirma.",
        "items": [
          "Tipo de accesorio",
          "Compatibilidad",
          "Stock a validar"
        ],
        "is_demo": true
      },
      {
        "name": "Retiro en local",
        "price_label": "A coordinar",
        "body": "CTA para confirmar horario y direccion antes de pasar.",
        "items": [
          "Horario",
          "Direccion",
          "Telefono"
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
        "label": "Repuestos",
        "title": "Detalle del trabajo",
        "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
        "meta": "Foto a reemplazar",
        "is_demo": true
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Mandar dato del vehiculo",
        "body": "Modelo, ano, motor o foto de la pieza."
      },
      {
        "step": "02",
        "title": "Validar compatibilidad",
        "body": "El local confirma si corresponde consultar stock."
      },
      {
        "step": "03",
        "title": "Confirmar precio y retiro",
        "body": "Precio, marca y disponibilidad no se inventan en la landing."
      },
      {
        "step": "04",
        "title": "Pasar por mostrador",
        "body": "Direccion y horario quedan visibles."
      }
    ],
    "final_cta": {
      "title": "Iturralde - Repuestos: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: repuestos para autos, direccion y horario.",
      "primary_label": "Consultar repuesto",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Mostrador de repuestos: convertir una busqueda de pieza en una consulta concreta y verificable.",
    "audience": "Personas que necesitan consultar por una pieza o accesorio antes de acercarse al local.",
    "visual_direction": "Catalogo utilitario con foto real del local, etiquetas cortas y CTA de consulta.",
    "layout": "parts-counter",
    "texture": "parts-shelf",
    "hero_angle": "La landing no promete stock: deja claro donde llamar, cuando ir y que referencias publicas existen.",
    "hero_cards": [
      {
        "label": "Rating",
        "value": "4.6",
        "note": "295 reseñas"
      },
      {
        "label": "Consulta",
        "value": "0249 401-7903",
        "note": "Telefono visible"
      },
      {
        "label": "Direccion",
        "value": "9 de Julio 1556",
        "note": "Tandil"
      }
    ],
    "sections": [
      {
        "type": "service-board",
        "eyebrow": "Mostrador",
        "title": "Para repuestos, la conversion empieza con una pregunta concreta.",
        "body": "La pagina muestra contacto, ubicacion y horario sin inventar marcas, precios ni disponibilidad.",
        "items": [
          {
            "label": "Rubro",
            "value": "Repuestos para autos"
          },
          {
            "label": "Antes de ir",
            "value": "Consultar por telefono"
          },
          {
            "label": "Local",
            "value": "9 de Julio 1556"
          }
        ],
        "callout": "El valor comercial es reducir la duda antes de moverse."
      },
      {
        "type": "metric-grid",
        "eyebrow": "Senales",
        "title": "Alto volumen de reseñas y datos publicos listos.",
        "body": "La confianza se apoya en rating, direccion, horario y comentarios sobre atencion.",
        "items": [
          {
            "label": "Valoracion",
            "value": "4.6"
          },
          {
            "label": "Reseñas",
            "value": "295"
          },
          {
            "label": "Horario",
            "value": "Lunes a sabado"
          },
          {
            "label": "Rubro",
            "value": "Auto Parts Store"
          }
        ]
      },
      {
        "type": "quick-actions",
        "eyebrow": "Accion",
        "title": "Preguntar por la pieza, confirmar y recien despues acercarse.",
        "body": "La llamada tiene mas sentido que un formulario porque cada consulta depende del vehiculo y la pieza.",
        "items": [
          {
            "label": "Telefono",
            "value": "0249 401-7903"
          },
          {
            "label": "Direccion",
            "value": "9 de Julio 1556"
          },
          {
            "label": "Domingo",
            "value": "Cerrado"
          }
        ]
      }
    ]
  },
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/tandil-servicios-vehiculares/iturralde-repuestos",
    "libraries": [
      "HTML",
      "CSS"
    ],
    "notes": "Landing estatica autoria de agente, con direccion visual propia y foto local del build final."
  }
}
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
- `commercial`: recommended for sellable landings:
  - `tone`: `premium-detailing`, `urban-custom`, `practical-workshop`, `fast-local`, `parts-counter`, or `bodyshop-craft`
  - `customer_type`
  - `hero_claim`
  - `trust_bar`: 3 to 5 cards with `label`, `title`, `body`, optional `meta`, optional `is_demo`
  - `service_cards`: 3 to 6 benefit-led service cards
  - `why_choose`: 3 to 5 reasons tied to the business/rubro
  - `packages`: 2 to 4 demo/editable commercial packages; no fake prices
  - `gallery`: 2 to 4 before/after or real-photo placeholders
  - `process`: 3 to 5 steps from inquiry to visit/booking
  - `final_cta`: `title`, `body`, `primary_label`, `secondary_label`
  - `editable_note`: short warning for placeholders
- `agent_frontend`: required for final quality generation:
  - `mode`: `static-files` or `framework-build`
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/tandil-servicios-vehiculares/iturralde-repuestos`
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

The `agent_frontend` artifact is the main place where the page stops being a template. The `creative` object remains useful as planning metadata and fallback input, but the final UI must be authored.

# Site Brief 2: Boxes Centro de Autolavado

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

- id: `google-ChIJgQWPWu4fkZURxYv2oFi4q3g`
- slug: `boxes-centro-de-autolavado`
- name: Boxes Centro de Autolavado
- category: Car Wash
- inferred profile: Lavadero de autos
- requested segment: servicios vehiculares
- city: Tandil
- address: Av. Buzón 632, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0297 15-539-0936
- hours summary: Lunes: 9:00 a. m. – 8:00 p. m.
- rating: 4.4 / 5 (353 reseñas)
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
      "body": "353 resenas registradas en las fuentes disponibles.",
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
      "title": "Lunes: 9:00 a. m. – 8:00 p. m.",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0297 15-539-0936"
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
    "title": "Boxes Centro de Autolavado: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: lavadero de autos, direccion y horario.",
    "primary_label": "Consultar lavado",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Affordable and quick way to keep your car clean" — Rodrigo Lanza (5/5)
2. "Muy buena atención de las chicas. Llevando tus propios productos de limpieza es una excelente opción 3000 la ficha al 6/2/26" — Rubén Carballo (4/5)
3. "excelente lugar, para alguien que le chupa un huevo el auto. No te dejan hacer espuma en un balde para usar la manopla, y pretenden que usemos un cepillo que lo mas parecido a esto es una lija 200. Despues las fichas y el tiempo de lavado bien." — BRUNO MASSON (2/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJgQWPWu4fkZURxYv2oFi4q3g/photos/AaVGc3kpss2VMvUgCaWGRyGUxSjHm5suvPUmcIZ24kQU12P0ohfLL0XvCIN4-qUqv058eKismK0QroHmV072N4wbeJUZe1cQrM4SSgxarcIsuBpDVONuqrd0vhXfI1MnYzu_t3JfzFuy41H0lPo_wf-7hFEAL2ZeckcY85vdZ-_0dwVL8vfCQLgGNqmH59esm_T2gAfbZB7RkWRk5KKu1Pozeis2Vt359JjI0RUyXz0NgSj_u_v8TF8y3JgmBb-u9TeMeL6GWG9C8txeut8WyH0kg5vcWBmzvhOJGhyFioBZf7pYtcouJlSkvCDIUCI51LopV6s19TT6d_OK4EjXLRAymS2jGBz7Zm21W9q3YH_ubRP2YK0c7V8tq6fLmagMhqWbDQQ9dvwFBzWsXVK0HJabe8m-LwhsouBPa72p-nQRzQJXPA/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJgQWPWu4fkZURxYv2oFi4q3g/photos/AaVGc3lCWMI_WanDe5SUFXkyKdWbtAq5FuT1zQxE-AJsohrDSl5CGgnBECk0aqwgzYtNbTsAp8uM7UFXmO91PZ06QETG_PcaAuCdl5rCEe4eAqpzjNVs_5S-FcauVcdGXbL4CRhAlKwtEvZ7ZbsmmJhTy1hNZeSHPL5buPhQMYsEReA3Mh8LzMoIkqDWtZC-QvsZ9qAiBMzttEzu7X726vtcD24j65eaWfv1HScAnOEzvVUfo4t8sAmwN8jbNlbBvz6hKOk5yjEpsgRX-eGApEp_3mu1AZBPjSivj_FnQLpvMsF7Ie5ujpg_Jmjq1BFzQUg_XuPA5E3VHN8qtH-4YydtFQyOAgk6fUQK90gY0MGheIxO7cV560ICVOeCYniB7zxaFKt_V_O7BGvNdYo54PuhkLJqorVXZj5SANw0myEBsKPPSmVx/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJgQWPWu4fkZURxYv2oFi4q3g/photos/AaVGc3mObFYZrXq9ymQSsJT2E1NFMfFuithxz8Uhz1ES_0hvqj3350-iydGYrRUhDg3UTe6BcccCFg35Ef16-EfjiTAm0ZJku_Qdmkad_IfmKavMfCbACo_0r9m18xahYXdb4VEBq9nYp-6-E-GUs2hiRZDNXVlT4hf_iL0SWdiZ1OVYT1bfv6KALGfJveRcvh5kDPT8WYCa9qWXaUYcKJeXhvgfH_L00O1YSvwiNO4gegtBCZpEflqZXWMOsG-9SIQJ40VOz5sAZ7qmzqQRrxyyvYMZ8CLU7TXZWA_cPVWgVn-NQcK3yLOlxO9dNTO1rFV4MEiOWsdR7BaJ_qesmFriNMtha3zGbsTRDuwxEhxTvKDmObnWypbNAny1W-U_TA1DgAxD7YLe_jD32vhwQraby5b3706_9uodfUWSRW8PJPMMEg/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=8695246196366019525&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/106843368096774089863/reviews
- https://www.google.com/maps/contrib/100906789810156838122/reviews
- https://www.google.com/maps/contrib/106000086355812923170/reviews

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
  "business_id": "google-ChIJgQWPWu4fkZURxYv2oFi4q3g",
  "slug": "boxes-centro-de-autolavado",
  "visual_mood": "neighborhood-direct",
  "composition": "poster-bay",
  "headline": "Boxes Centro de Autolavado",
  "subheadline": "Autolavado en Tandil con alto volumen de reseñas, horarios amplios y datos listos para decidir si acercarse.",
  "primary_cta": "Consultar lavado",
  "secondary_cta": "Ver horarios",
  "service_tags": [
    "Lavado",
    "Autos",
    "Motos y camionetas",
    "Atención todos los días"
  ],
  "proof_points": [
    "4.4 sobre 5 con 353 reseñas",
    "Abre de lunes a domingo",
    "Av. Buzón 632, Tandil",
    "Reseñas que destacan rapidez y practicidad"
  ],
  "resource_title": "Lavado práctico, datos visibles y decisión rápida",
  "resource_items": [
    "Horario extendido para planificar la visita.",
    "Teléfono y dirección en primer plano.",
    "Reseñas suficientes para evaluar experiencia real."
  ],
  "review_heading": "Lo que pesa en un lavadero",
  "contact_heading": "Ubicar el box y consultar",
  "image_prompt": "Escena editorial realista para autolavado en Tandil, box de lavado, agua, auto limpio, luz natural, sin texto ni logos inventados.",
  "design_notes": "Landing clara y fluida, con sensación de agua, tránsito rápido y servicio barrial.",
  "commercial": {
    "tone": "premium-detailing",
    "customer_type": "Conductores que quieren resolver lavado, interior o exterior sin comparar mil mensajes.",
    "hero_claim": "Salir con el auto limpio, prolijo y sin vueltas.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.4 / 5",
        "body": "353 resenas registradas en las fuentes disponibles.",
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
        "title": "Lunes: 9:00 a. m. – 8:00 p. m.",
        "body": "Horario publicado para orientar la primera consulta.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Contacto",
        "title": "Telefono directo",
        "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
        "meta": "0297 15-539-0936"
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
      "title": "Boxes Centro de Autolavado: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: lavadero de autos, direccion y horario.",
      "primary_label": "Consultar lavado",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Autolavado de paso: una página que reduce fricción y resuelve ubicación, horario y llamado.",
    "audience": "Personas que quieren lavar el auto sin investigar demasiado y necesitan saber si conviene ir ahora.",
    "visual_direction": "Superficie clara, ritmo horizontal, acentos de agua y bloques de decisión corta.",
    "layout": "wash-flow",
    "texture": "water-ripple",
    "hero_angle": "La venta es practicidad: está abierto, se ubica fácil y tiene volumen de reseñas.",
    "hero_cards": [
      {
        "label": "Reseñas",
        "value": "353",
        "note": "Alto volumen para comparar"
      },
      {
        "label": "Horario",
        "value": "Todos los días",
        "note": "Según registro de Places"
      },
      {
        "label": "Zona",
        "value": "Av. Buzón 632",
        "note": "Tandil"
      }
    ],
    "sections": [
      {
        "type": "metric-grid",
        "eyebrow": "Decisión",
        "title": "Un lavadero se elige por cercanía, horario y confianza suficiente.",
        "body": "Por eso la landing evita relleno y muestra volumen de reseñas, dirección y teléfono antes de cualquier texto largo.",
        "items": [
          {
            "label": "Calificación",
            "value": "4.4"
          },
          {
            "label": "Reseñas",
            "value": "353"
          },
          {
            "label": "Servicio",
            "value": "Lavadero de autos"
          }
        ],
        "callout": "El foco comercial no es adornar: es que la persona sepa si le sirve acercarse."
      },
      {
        "type": "process",
        "eyebrow": "Flujo",
        "title": "Mirar horario, llamar si hace falta, ir al box.",
        "body": "La estructura acompaña el comportamiento real de quien busca un lavado: poco texto, datos concretos y CTA cercano.",
        "items": [
          {
            "label": "1",
            "value": "Confirmar horario"
          },
          {
            "label": "2",
            "value": "Guardar dirección"
          },
          {
            "label": "3",
            "value": "Consultar por teléfono"
          }
        ]
      },
      {
        "type": "quote-strip",
        "eyebrow": "Reseñas",
        "title": "Rapidez y practicidad aparecen como señales de uso.",
        "body": "Las opiniones no se maquillan: se usan como referencia concreta de experiencia.",
        "items": [
          {
            "label": "Señal",
            "value": "Quick way to keep your car clean"
          },
          {
            "label": "Señal",
            "value": "Buena atención"
          }
        ]
      }
    ]
  },
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/tandil-servicios-vehiculares/boxes-centro-de-autolavado",
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/tandil-servicios-vehiculares/boxes-centro-de-autolavado`
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

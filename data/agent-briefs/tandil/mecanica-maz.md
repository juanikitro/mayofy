# Site Brief 10: Mecanica Maz

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

- id: `google-ChIJ-5QG4ichkZURyv_V-AdPjS0`
- slug: `mecanica-maz`
- name: Mecanica Maz
- category: Car repair and maintenance service
- inferred profile: Taller mecanico
- requested segment: servicios vehiculares
- city: Tandil
- address: Laprida 961, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 464-3419
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 4.9 / 5 (31 reseñas)
- service baseline: taller mecanico

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
      "title": "4.9 / 5",
      "body": "31 resenas registradas en las fuentes disponibles.",
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
      "title": "Lunes a Sabado; Domingo cerrado",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0249 464-3419"
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
    "title": "Mecanica Maz: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: taller mecanico, direccion y horario.",
    "primary_label": "Consultar turno",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "La verdad Excelente servicio. Estaba de viaje y un sábado por la tarde tuve un problema mecánico, me remolcaron el auto me solucionaron el problema aún estando  cerrado, super predispuestos. Lo dejaron impecable. Muy profesionales y rápidos. ¡Totalmente recomendado el taller de Marcelo!" MECÁNICA MAZ" — Dmdi (5/5)
2. "Marcelo,un genio,me arreglaron el auto después de un problema que tuve en pleno viaje hacia Villa Gesell,me demostró ser un tipo de mucha confianza y su atención de primera,después del mal momento vivido por la rotura del auto es bueno encontrarse con gente asi,que este dispuesta a ayudar.
Hasta me llevo el auto a Villa Gesell.
Totalmente recomendable,un 10.
Gracias Marcelo" — Bodegón De La Sexta (5/5)
3. "Excelente atención sábado por la tarde y domingo aunque no fuera su horario habitual de trabajo para resolver el problema de nuestra camioneta. Trato muy agradable. Super recomendable." — Marta Toledo (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJ-5QG4ichkZURyv_V-AdPjS0/photos/AaVGc3lNj_nrGV3UVqziVcbs0YsZF4sN6Q3jLeO7cSkQIkqoC7d0d8kI3Q1zT5UZeBFYaGZLF06hHk4Q3gUfZl-smSehUXbm1UqU2M7CcKSwQ-UXMRLKkMqnL-2QhbcudNg_bUkvJenqIIoti2NM1WDP1EXIQO02EH-S-5O_mS_D-SM-SE0pB6Eb9on1uqXkjdVNNd2gTHCTQmjVdTnCdYENK64gJPixaPRlyX3wUzMLMsijxo-qcIuCZbqCk3fQfL_22gjYKTsx4jlbsVty2P3Tp4ceinSXbZ_X3FwoC_62cEWwxHj6SxPLiUN-D6xV7iSd375FRg7rlUSGBOnxw-hoEwqqjO72y4QVpD4Q5zdM14u6D_x9qdwiyyT3x2oFy8zP6z9k5t3py4uEjAl-0ecoqfiovyZJbjqoFbVYHQTnya5IO_nj/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJ-5QG4ichkZURyv_V-AdPjS0/photos/AaVGc3mWf4nrriaxG91mqDxI1H9YUYZzDGaDjb2rp7QAU5-vzOfwGleiM6aJ_0TqBP_nNCE7qIc97xkmiYktSLP1LboH5jv4rLM_Cf9RP_9zLbH7lZtg0bS-FE15L4KuESq5gBjwXDSr0lrJ5RVGrWqpjV1c13v_2nqzKu4frv7YgCZjEBb1P0xPp_3zA8BRbCdJdfnT5eEv4dPuNTKHolmW0nk37cfz1_x0yxidasR0f7moBz7iYwTQl2rSxbzuIVbd2ND6kg_a139X2kF6mBQe2Tv1xrr1B7FKuv-v0pjq2iXf-Gp6UYE6GVCCbcYo492-leANbT1GrYKB4KpBhidBlwROMAcq3Gb4HdCWxAZ-Y63QffUyahIUgZNb7CI_cFvmMTmKf75B0O0PKv4sD_kh3sGi1LWqFW9c_tDjqZPwadM/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJ-5QG4ichkZURyv_V-AdPjS0/photos/AaVGc3ne57Ufcw3iradiY5Y44Wso1SjAM4ERxIzxmYB4iU3hxKHm1RjRiD_cuXK9cUZDqPG9c3HmWBBmCt4DId2ltZMymKjwYA0CPiZoqipz281Q-xTDQ5EX-3kgLo2gkt4tahfJiwhA4z9u91TthiQDYzXV4TBzLFmzUOnweI6mZQJUIJV3jcPIdDsYdvYp7xVa3-ySqQJ77uKhKhpkdHUvfJaZHLeO9N7QU-QfRoezYj2tcJKJ6AcfQd1mf_vk5eKrpHHC3zZsoNefqSSIjg4APJhYFL06Kyo4bv0zYdXyD9csXQ_ni1EwEyRu096SxQNz6jpE6VGIJbdPenlRIcFoH0Dur9QajGumxQM__G4GrN4hRbSPQbb28UyzwYcpsNaENuFvCyWY2i8t4ZdSxrDXekQdHdwI9mpilv8CUBr4ZkjAZA/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=3282366599081099210&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/109353906510349668458/reviews
- https://www.google.com/maps/contrib/103338033766732641992/reviews
- https://www.google.com/maps/contrib/116252791366780941958/reviews

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
  "business_id": "google-ChIJ-5QG4ichkZURyv_V-AdPjS0",
  "slug": "mecanica-maz",
  "visual_mood": "workshop-trust",
  "composition": "photo-board",
  "headline": "Mecanica Maz",
  "subheadline": "Taller mecánico en Laprida 961 con reseñas de viajeros, problemas resueltos y atención fuera de lo habitual.",
  "primary_cta": "Consultar taller",
  "secondary_cta": "Ver referencias",
  "service_tags": [
    "Mecánica",
    "Service",
    "Diagnóstico",
    "Consulta por turno"
  ],
  "proof_points": [
    "4.9 sobre 5 con 31 reseñas",
    "Laprida 961, Tandil",
    "Lunes a sábado",
    "Reseñas mencionan viajes y problemas mecánicos"
  ],
  "resource_title": "Cuando el auto falla en viaje, la confianza pesa más",
  "resource_items": [
    "Reseñas con casos de viaje.",
    "Teléfono visible para explicar el problema.",
    "Dirección clara dentro de Tandil."
  ],
  "review_heading": "Casos reales, no slogans",
  "contact_heading": "Consultar por el problema mecánico",
  "image_prompt": "Escena editorial realista para taller mecánico en Tandil, auto en revisión, herramientas y luz de taller, sin texto ni logos inventados.",
  "design_notes": "Landing de taller con relato de rescate en viaje, confianza y datos rápidos.",
  "commercial": {
    "tone": "practical-workshop",
    "customer_type": "Conductores que necesitan diagnostico, mantenimiento o una primera consulta confiable.",
    "hero_claim": "Primero entender que le pasa al auto. Despues, coordinar bien el turno.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.9 / 5",
        "body": "31 resenas registradas en las fuentes disponibles.",
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
        "title": "Lunes a Sabado; Domingo cerrado",
        "body": "Horario publicado para orientar la primera consulta.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Contacto",
        "title": "Telefono directo",
        "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
        "meta": "0249 464-3419"
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
      "title": "Mecanica Maz: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: taller mecanico, direccion y horario.",
      "primary_label": "Consultar turno",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Taller de confianza para imprevistos: usar reseñas de viaje como eje comercial.",
    "audience": "Conductores locales o de paso que necesitan resolver un problema mecánico y buscan referencia rápida.",
    "visual_direction": "Bitácora de ruta y taller, composición con foto inclinada, bloques de caso y CTA de consulta.",
    "layout": "mechanic-ledger",
    "texture": "service-ledger",
    "hero_angle": "La landing se apoya en una historia fuerte: un problema en viaje, remolque y resolución según reseña.",
    "hero_cards": [
      {
        "label": "Rating",
        "value": "4.9",
        "note": "31 reseñas"
      },
      {
        "label": "Caso",
        "value": "Problema en viaje",
        "note": "Mencionado por clientes"
      },
      {
        "label": "Dirección",
        "value": "Laprida 961",
        "note": "Tandil"
      }
    ],
    "sections": [
      {
        "type": "material-story",
        "eyebrow": "Historia",
        "title": "La reseña cuenta una escena: sábado, viaje y problema mecánico.",
        "body": "Ese relato vale más que cualquier frase genérica. La landing lo convierte en confianza para la próxima consulta.",
        "items": [
          {
            "label": "Situación",
            "value": "Auto con problema en viaje"
          },
          {
            "label": "Respuesta",
            "value": "Remolque y solución según reseña"
          },
          {
            "label": "Percepción",
            "value": "Profesionales y rápidos"
          }
        ],
        "callout": "El sitio vende tranquilidad con evidencia pública."
      },
      {
        "type": "quick-actions",
        "eyebrow": "Consulta",
        "title": "Explicar el problema es el primer paso.",
        "body": "La página guía hacia una llamada concreta, con dirección y horario listos.",
        "items": [
          {
            "label": "Teléfono",
            "value": "0249 464-3419"
          },
          {
            "label": "Dirección",
            "value": "Laprida 961"
          },
          {
            "label": "Horario",
            "value": "Lunes a sábado"
          }
        ]
      },
      {
        "type": "quote-strip",
        "eyebrow": "Prueba",
        "title": "“Me solucionaron el problema... super predispuestos.”",
        "body": "La página deja que esa señal haga el trabajo comercial.",
        "items": [
          {
            "label": "Atención",
            "value": "Trato muy agradable"
          },
          {
            "label": "Confianza",
            "value": "Totalmente recomendado"
          }
        ]
      }
    ]
  },
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/tandil-servicios-vehiculares/mecanica-maz",
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/tandil-servicios-vehiculares/mecanica-maz`
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

# Site Brief 1: Luxe Detailing

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

- id: `google-ChIJJYacq7vhkJURcwnaYFx1g20`
- slug: `luxe-detailing`
- name: Luxe Detailing
- category: Car Wash
- inferred profile: Detailing y estetica vehicular
- requested segment: servicios vehiculares
- city: Tandil
- address: Los Aromos 678, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 420-6233
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 4.9 / 5 (13 reseñas)
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
      "title": "4.9 / 5",
      "body": "13 resenas registradas en las fuentes disponibles.",
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
      "meta": "0249 420-6233"
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
    "title": "Luxe Detailing: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: detailing y estetica vehicular, direccion y horario.",
    "primary_label": "Reservar turno",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Excelente, trabajo prolijo y bien ejecutado. Totalmente recomendado" — Soledad Larsen (5/5)
2. "Exelente servicio y muy buena atención!" — martina zuzulich (5/5)
3. "Muy Buen servicio,  amabilidad y Responsabilidad, lo recomiendo" — Laura Milco (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJJYacq7vhkJURcwnaYFx1g20/photos/AaVGc3k8HZCOl6i5Ksp-B7ndzVOQTaLzfYkJ8c35fsUZ0sYQl6vVcthjvEJ_Xgp2heuGPIRyoWyijfSP3UmmqDEnYUxBU09HU4zUbkj3YhZ77IQWCTD5C82GpIqbnIceMco6VJ0zXBCdd_vx0LK6oXsJXPwZtAupEjG4Bbko-SRoJjxgVr1ZsyMUT-Z6pgGRonR_ca3hveLw7bWMQiAqTQ4ughDkETXcCfk82mDaaInAj-bzw1IMW1LAhKqG-1UYRjdjjQUSiBTgP8LOcX4Q7gCUNTWAn7Ty2WXy5r9MW81PK4-0uniiHUhYRoqf2JNthD1unvZMvYUVFxkDsMTOAVFQgDtoghZlwv93T0WcQbGKUTOlLgH9M096c5HpOapLCWcakGQfae_NXqkjlOrteoWX9IFyZMNYx4Rp9omUtLPo3PKpjEvjaw_FWCtF27GDiACf/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJJYacq7vhkJURcwnaYFx1g20/photos/AaVGc3nbutzCKgv6Xnnp7yfNyhDSPDspG1_QyAE3B-Rp0uIRetbbYhKLcUPzKuHEJNkz46AeZF2yEHzXzXMa68i62X4Xh4NXa0IRqKW1gr00pxqzdD7-HNGoYrMLstpODYnKX8FT4RdYYA-QtXihuOObrWNv1AUkrvPgOEZkLLTLXtFXjtJW_i9Zd0mjPtXYyJG3Av1TTDc74hPougDIRSWm8qDnQBRgY0ZMvdFu1JRHjWN09FU-Fo4nx-oJxowiX0tkC8JuWQsyh2S7KX3PB5WRYLqAZU8Pm8O7jw_Ddm-jP7k4K14bQ_LZneQ3FKAUGPUl011Eq3P_z2dbs8MvMpfrLQhQ8apHYbgy7EGMudltrMHdGM8iiaHAdA6mhd0nMlYBRwJy8zK14H1Ivuox9v0Jy9pvjn79x1yMFYLmhxFh2aKEFkSt95wyyuVQdnd7rw/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJJYacq7vhkJURcwnaYFx1g20/photos/AaVGc3l3_yUzzaZCfDlm7GN1yUDIv1lG-1sxeq-c08xI2geeBGoLRjkkhXN2drl2FU2aBknBKOkuSaktPM_8hByOHpTFeAR7x1sjjVBEFqTJyUI4JSXr-YjKgjWAvCimg47rSPRFC7GJbrOs0stdRpJZGlPGab-hdd4CgLQ74ENEtKYOJJard4ChV7Fd2YvL6kNLw5J2-GJivWqFqQ1ThrPFKELJllcC47d-Vhg9UmkQS7vVTRZ9kkrEpcsB1QyZgbZx08T27m6blV-fU5nJ90ZF78Y1qTEvnFxFrP5BlNTvhxagMohT-uWBr2WCwH2x_KItA1F0BYKH010S2JOnNnrX5rSIhZ0UYA_xRnWY-mN3EBKqQtTCXxx1AHTy_ukELzMveRqPd8uGBPn1Kjay5b2u3zWgolTZJFBHY0NJXcZBWKWE8z2jDnRxN6VOF8F3ryWw/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=7891280011705583987&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/113371931244349919704/reviews
- https://www.google.com/maps/contrib/111241466954489538662/reviews
- https://www.google.com/maps/contrib/100609865891538751799/reviews

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
  "business_id": "google-ChIJJYacq7vhkJURcwnaYFx1g20",
  "slug": "luxe-detailing",
  "visual_mood": "precision-service",
  "composition": "split-command",
  "headline": "Luxe Detailing",
  "subheadline": "Detailing en Tandil para quien quiere ver el auto prolijo antes de moverse: contacto directo, reseñas claras y ubicación a mano.",
  "primary_cta": "Consultar detailing",
  "secondary_cta": "Ver ubicación",
  "service_tags": [
    "Detailing",
    "Cuidado exterior",
    "Interior",
    "Consulta por turno"
  ],
  "proof_points": [
    "4.9 sobre 5 con 13 reseñas",
    "Lunes a sábado con horario registrado",
    "Los Aromos 678, Tandil",
    "Reseñas que hablan de trabajo prolijo y buena atención"
  ],
  "resource_title": "Una consulta simple para dejar el auto presentable",
  "resource_items": [
    "Teléfono visible para coordinar turno.",
    "Foto real del lugar como contexto visual.",
    "Reseñas breves para evaluar trato y terminación."
  ],
  "review_heading": "Señales de terminación",
  "contact_heading": "Coordinar el cuidado del auto",
  "image_prompt": "Escena editorial realista para detailing vehicular en Tandil, auto limpio, reflejos cuidados, luz natural, sin texto ni logos inventados.",
  "design_notes": "Landing tipo estudio: oscura, precisa, con foco en brillo, terminación y decisión rápida.",
  "commercial": {
    "tone": "premium-detailing",
    "customer_type": "Personas que cuidan el auto, quieren recuperar brillo, proteger terminaciones o reservar un lavado detallado.",
    "hero_claim": "Que el auto vuelva a sentirse cuidado, limpio y listo para mirar de cerca.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.9 / 5",
        "body": "13 resenas registradas en las fuentes disponibles.",
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
        "meta": "0249 420-6233"
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
      "title": "Luxe Detailing: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: detailing y estetica vehicular, direccion y horario.",
      "primary_label": "Reservar turno",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Estudio de detalle: menos urgencia, más terminación visible y confianza por reseñas concretas.",
    "audience": "Dueños de autos que quieren coordinar cuidado exterior o interior sin perder tiempo preguntando datos básicos.",
    "visual_direction": "Oscuro pulido, foto protagonista, placas inclinadas de precisión y microcopy corto.",
    "layout": "studio-detail",
    "texture": "polished-glass",
    "hero_angle": "La página vende una primera impresión: ver el trabajo, leer dos señales de confianza y tocar para consultar.",
    "hero_cards": [
      {
        "label": "Valoración",
        "value": "4.9",
        "note": "13 reseñas públicas"
      },
      {
        "label": "Señal real",
        "value": "Trabajo prolijo",
        "note": "Mencionado en reseñas"
      },
      {
        "label": "Acción",
        "value": "Turno por teléfono",
        "note": "0249 420-6233"
      }
    ],
    "sections": [
      {
        "type": "service-board",
        "eyebrow": "Detalle",
        "title": "No hace falta prometer lujo: alcanza con mostrar prolijidad.",
        "body": "La landing ordena lo que una persona necesita antes de consultar: rubro, ubicación, teléfono, horarios y reseñas sobre el trabajo.",
        "items": [
          {
            "label": "Servicio",
            "value": "Detailing"
          },
          {
            "label": "Cuidado",
            "value": "Exterior e interior"
          },
          {
            "label": "Consulta",
            "value": "Por turno"
          }
        ],
        "callout": "Ideal para captar consultas de gente que ya sabe que quiere mejorar la presentación del auto."
      },
      {
        "type": "quote-strip",
        "eyebrow": "Prueba social",
        "title": "“Trabajo prolijo y bien ejecutado.”",
        "body": "La reseña destacada no exagera: funciona porque habla de ejecución, no de slogans.",
        "items": [
          {
            "label": "Soledad Larsen",
            "value": "Totalmente recomendado"
          },
          {
            "label": "Laura Milco",
            "value": "Amabilidad y responsabilidad"
          }
        ]
      },
      {
        "type": "quick-actions",
        "eyebrow": "Consulta",
        "title": "Del interés al llamado en un solo bloque.",
        "body": "El CTA aparece con el dato clave: teléfono, ubicación y horario resumido.",
        "items": [
          {
            "label": "Teléfono",
            "value": "0249 420-6233"
          },
          {
            "label": "Dirección",
            "value": "Los Aromos 678"
          },
          {
            "label": "Horario",
            "value": "Lunes a sábado"
          }
        ]
      }
    ]
  },
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/tandil-servicios-vehiculares/luxe-detailing",
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/tandil-servicios-vehiculares/luxe-detailing`
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

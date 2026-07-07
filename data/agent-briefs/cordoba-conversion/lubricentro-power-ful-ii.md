# Site Brief 3: Lubricentro Power Ful II

## Goal

Write or refine one `SiteSpec` for this business and create its real frontend artifact. Use the agent session context, judgement, and frontend skill. Do not call the OpenAI API from repo scripts.

## Hard Rules

- Use only verified data below.
- Do not invent services, years, awards, guarantees, prices, certifications, owners, staff, or claims.
- Visible copy must be Spanish argentino, natural, local, commercial, and strong enough to sell the next action.
- If useful commercial facts are missing, use clearly editable demo placeholders instead of weak filler. Examples: "[X] vehiculos atendidos", "[Precio editable]", "Opiniones reales proximamente". Never present placeholders as verified facts.
- Avoid generic filler like "soluciones integrales", "calidad garantizada", "experiencia unica", "creado con IA".
- Keep the business name isolated to this one site.
- Make the page feel designed for "servicios vehiculares de alta conversion" in Cordoba Capital, not like a SaaS template.
- Final generation expects an `agent_frontend`. The renderer fallback is only for rough preview.

## Business Snapshot

- id: `google-ChIJqyfxNjmZMpQRdiRnTRv5uXY`
- slug: `lubricentro-power-ful-ii`
- name: Lubricentro Power Ful II
- category: Car repair and maintenance service
- inferred profile: Lubricentro
- requested segment: servicios vehiculares de alta conversion
- city: Cordoba Capital
- address: Manuel Cardeñosa 3875, X5009EXU Córdoba, Argentina
- phone: 0351 351-7691
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 4.8 / 5 (119 reseñas)
- service baseline: lubricentro

## Suggested Commercial Profile

```json
{
  "tone": "practical-workshop",
  "customer_type": "Conductores que necesitan mantenimiento simple, filtros o cambio de aceite con datos claros.",
  "hero_claim": "Mantenimiento del auto sin vueltas: dato, consulta y turno.",
  "services": [
    "Cambio de aceite",
    "Lubricantes",
    "Filtros",
    "Consulta por mantenimiento"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "4.8 / 5",
      "body": "119 resenas registradas en las fuentes disponibles.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Rubro",
      "title": "Lubricentro",
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
      "meta": "0351 351-7691"
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
      "label": "Aceite",
      "title": "Cambio con datos del vehiculo",
      "body": "Pide modelo, kilometraje y uso del auto antes de prometer producto o precio."
    },
    {
      "label": "Filtros",
      "title": "Chequeo de consumibles",
      "body": "Bloque editable para filtros y repuestos de mantenimiento cuando haya disponibilidad real.",
      "is_demo": true
    },
    {
      "label": "Agenda",
      "title": "Consulta de paso",
      "body": "CTA directo para confirmar horario y evitar ir sin datos."
    }
  ],
  "why_choose": [
    {
      "title": "Menos friccion",
      "body": "La pagina dice que informacion llevar para que la consulta sea util."
    },
    {
      "title": "Sin inventar marcas",
      "body": "Marcas, stock y precios quedan fuera hasta que el negocio los confirme."
    },
    {
      "title": "Mantenimiento ordenado",
      "body": "Servicios, proceso y contacto aparecen en un flujo logico."
    }
  ],
  "packages": [
    {
      "name": "Cambio de aceite",
      "price_label": "Precio a confirmar",
      "body": "Paquete demo para publicar cuando se definan productos y mano de obra.",
      "items": [
        "Aceite a confirmar",
        "Filtro si corresponde",
        "Datos del vehiculo"
      ],
      "is_demo": true
    },
    {
      "name": "Chequeo rapido",
      "price_label": "[Editable]",
      "body": "Bloque para mantenimiento preventivo si el negocio lo ofrece.",
      "items": [
        "Kilometraje",
        "Uso del auto",
        "Consulta de consumibles"
      ],
      "is_demo": true
    },
    {
      "name": "Kit mantenimiento",
      "price_label": "[Presupuesto editable]",
      "body": "Espacio para combos reales de filtros o lubricantes.",
      "items": [
        "Stock a confirmar",
        "Marca no inventada",
        "Turno sujeto a agenda"
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
      "label": "Lubricentro",
      "title": "Detalle del trabajo",
      "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      "meta": "Foto a reemplazar",
      "is_demo": true
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Enviar datos del auto",
      "body": "Modelo, motor si se conoce y kilometraje."
    },
    {
      "step": "02",
      "title": "Confirmar producto",
      "body": "El negocio valida lubricante, filtro y disponibilidad real."
    },
    {
      "step": "03",
      "title": "Coordinar visita",
      "body": "Horario, direccion y telefono quedan visibles."
    },
    {
      "step": "04",
      "title": "Registrar proximo cambio",
      "body": "Campo editable para recomendaciones reales del local."
    }
  ],
  "final_cta": {
    "title": "Lubricentro Power Ful II: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: lubricentro, direccion y horario.",
    "primary_label": "Consultar mantenimiento",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Excelente atención. Muy amables y muy buenos precios.  100% recomendables.!" — Marina Cervera (5/5)
2. "Excelente atención de Seba, lo recomiendo" — Natali quipildor (5/5)
3. "Exelente atención .muy buenos precios .recomendables 100%" — Juan Brandalise (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJqyfxNjmZMpQRdiRnTRv5uXY/photos/AaVGc3n7tMj0OJNmPf7c7DKsofwsQGS_GtaswVWGTgHSZHmH1S1GKCgvrqIX0U9PChjfVigHS6M1-TZHUI8qIMIB9u2izYGeYOW_9JSuqo8nWk9p5dmcvPKG_a509hM_0fQW_zSmiteIUTvZ9vSQeTCnYgcxKv7DgUCoksW6l5u6VdrwOoOqmvG4v_0BBBluzmJndHZGQvF23t9KtSOGXdRs3pe-lqUcybSLTH3gqbVdMrgptF6Wn-gEmduuMVrLFTcZRBZusYNMs3SkiBRU5oPQWIoAVR0BqGG7OGVWbZAhNxoDSiC1385B3P0ttEb7aiwM4Vf4Essg2MriWrU1MEjs7PPxQxhvUyzvK0Ww8rXIDAr6jteOfR6ahGh8KJQSwkiDaSNt1hgSoergQ4SxeVbFuRAAqjvZVoHMyXYXVzdcvhg7z8Rpp2agIWMqOgW1Mg/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJqyfxNjmZMpQRdiRnTRv5uXY/photos/AaVGc3l544UCpVzh_mfQojjaUJ6T-MIRglfjUR9WO9wVH5on4ZKRD9TCUE1P7bItbCEEOq2KjpcgObZhKUcS-xtU8cnFWxmO0CEVtYcmt9Ta0O4NL8G_micE6qVNcHD7wAVqEcC_bLSSOmkbJJZCCKxCnJw_C3arCcEpDLcBkuDk96ijxZDckNJpJ50NJcqaSDF4Qw-Ni1XblOVDZHxLVDXPtVpqNaqMiljsH7wUqfD2FZOVvLH4dLcCqBldpnpALPRZi34qMbT19nWi64y_scM35Dvx8t3X4EBwntEsm1tzCs1V1V2DBro7U0yLMFVjnuK3zjyK6yNtXbjNCtnfErcnHI9mYo2hKJZzzK0vJLnOoOFjsHoYF2dFBbFPFgnjOlXTl7t_E5yVD4U1F9x4AxT1bKVUsxTU1C91nSNsZoKqFwNtFUOghPHMiWzhwOu2QA/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJqyfxNjmZMpQRdiRnTRv5uXY/photos/AaVGc3l30zRrJpDwj95jxjxOOhg2xhKffwT3vYOIPWMDjQajqfKRnzYxxP5lGBpXJK6thsklFmmGOS30UArfq2THSk_2lBLsJWuap-Npz099I7dEz24rqL7ObyK-IiqV2QbV9LYawIdABY44c4WC8LPGzWoAbXOQUW-Fn-Xn7mXh7TJRIhHVbAxm7N7Cmmbz_UNk7EKIlzURi3xt79-zknsUIpLz7_s2yk9gDKaIppGeGE9rIn0h8dO5uIo4Ixv3qLvPtJtMA3joOZeBkDJAtqoc7VeToT3YUxd7I1YWVZRyxW3_ietmg1rb9K8Hr3ui2HYuLctDZwkSMipK_bCO5aH3kjIdpq33VZ_IahzjJWJH0jcbiE6lSzWx2MbILbi3zxKUNRLOCm-2tB2OgTcN42eEwlOQXZ4Rry6MIxu0ZcHvO5FHS-nO/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=8555142862825006198&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/109069668040839013612/reviews
- https://www.google.com/maps/contrib/111686198308513978084/reviews
- https://www.google.com/maps/contrib/117375151004216940915/reviews

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
  "business_id": "google-ChIJqyfxNjmZMpQRdiRnTRv5uXY",
  "slug": "lubricentro-power-ful-ii",
  "visual_mood": "precision-service",
  "composition": "route-card",
  "headline": "Lubricentro Power Ful II",
  "subheadline": "Mantenimiento del auto sin vueltas: dato, consulta y turno. Lubricentro en Tandil con contacto, horarios, ubicacion y referencias publicas arriba del pliegue.",
  "primary_cta": "Consultar mantenimiento",
  "secondary_cta": "Ver ubicacion",
  "service_tags": [
    "Cambio de aceite",
    "Lubricantes",
    "Filtros",
    "Consulta por mantenimiento"
  ],
  "proof_points": [
    "4.8 sobre 5 con 119 reseñas",
    "Horario: Lunes a Sabado; Domingo cerrado",
    "Direccion: Manuel Cardeñosa 3875, X5009EXU Córdoba",
    "Reseñas que destacan: \"Excelente atención. Muy amables y muy buenos precios.  100% recomendables.!\""
  ],
  "resource_title": "Mantenimiento simple, sin promesas de stock",
  "resource_items": [
    "La consulta pide modelo, kilometraje y necesidad.",
    "No se inventan marcas, stock, garantia ni precios.",
    "Horario registrado: Lunes a Sabado; Domingo cerrado."
  ],
  "review_heading": "Lo que valoran quienes ya fueron",
  "contact_heading": "Llegar o llamar sin vueltas",
  "image_prompt": "Escena editorial realista para lubricentro en Tandil, area de mantenimiento, bidones de aceite, filtros y herramientas ordenadas, luz natural, sin texto, sin logos inventados.",
  "design_notes": "Mood precision-service, composicion route-card, tono comercial practical-workshop. Evitar estetica SaaS generica; usar recursos visuales del rubro lubricentro, direccion, prueba social, paquetes editables y CTA de turno.",
  "commercial": {
    "tone": "practical-workshop",
    "customer_type": "Conductores que necesitan mantenimiento simple, filtros o cambio de aceite con datos claros.",
    "hero_claim": "Mantenimiento del auto sin vueltas: dato, consulta y turno.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.8 / 5",
        "body": "119 resenas registradas en las fuentes disponibles.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Rubro",
        "title": "Lubricentro",
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
        "meta": "0351 351-7691"
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
        "label": "Aceite",
        "title": "Cambio con datos del vehiculo",
        "body": "Pide modelo, kilometraje y uso del auto antes de prometer producto o precio."
      },
      {
        "label": "Filtros",
        "title": "Chequeo de consumibles",
        "body": "Bloque editable para filtros y repuestos de mantenimiento cuando haya disponibilidad real.",
        "is_demo": true
      },
      {
        "label": "Agenda",
        "title": "Consulta de paso",
        "body": "CTA directo para confirmar horario y evitar ir sin datos."
      }
    ],
    "why_choose": [
      {
        "title": "Menos friccion",
        "body": "La pagina dice que informacion llevar para que la consulta sea util."
      },
      {
        "title": "Sin inventar marcas",
        "body": "Marcas, stock y precios quedan fuera hasta que el negocio los confirme."
      },
      {
        "title": "Mantenimiento ordenado",
        "body": "Servicios, proceso y contacto aparecen en un flujo logico."
      }
    ],
    "packages": [
      {
        "name": "Cambio de aceite",
        "price_label": "Precio a confirmar",
        "body": "Paquete demo para publicar cuando se definan productos y mano de obra.",
        "items": [
          "Aceite a confirmar",
          "Filtro si corresponde",
          "Datos del vehiculo"
        ],
        "is_demo": true
      },
      {
        "name": "Chequeo rapido",
        "price_label": "[Editable]",
        "body": "Bloque para mantenimiento preventivo si el negocio lo ofrece.",
        "items": [
          "Kilometraje",
          "Uso del auto",
          "Consulta de consumibles"
        ],
        "is_demo": true
      },
      {
        "name": "Kit mantenimiento",
        "price_label": "[Presupuesto editable]",
        "body": "Espacio para combos reales de filtros o lubricantes.",
        "items": [
          "Stock a confirmar",
          "Marca no inventada",
          "Turno sujeto a agenda"
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
        "label": "Lubricentro",
        "title": "Detalle del trabajo",
        "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
        "meta": "Foto a reemplazar",
        "is_demo": true
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Enviar datos del auto",
        "body": "Modelo, motor si se conoce y kilometraje."
      },
      {
        "step": "02",
        "title": "Confirmar producto",
        "body": "El negocio valida lubricante, filtro y disponibilidad real."
      },
      {
        "step": "03",
        "title": "Coordinar visita",
        "body": "Horario, direccion y telefono quedan visibles."
      },
      {
        "step": "04",
        "title": "Registrar proximo cambio",
        "body": "Campo editable para recomendaciones reales del local."
      }
    ],
    "final_cta": {
      "title": "Lubricentro Power Ful II: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: lubricentro, direccion y horario.",
      "primary_label": "Consultar mantenimiento",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Mantenimiento del auto sin vueltas: dato, consulta y turno. Direccion comercial para Conductores que necesitan mantenimiento simple, filtros o cambio de aceite con datos claros.",
    "audience": "Conductores que necesitan mantenimiento simple, filtros o cambio de aceite con datos claros.",
    "visual_direction": "Servicio local con jerarquia fuerte, datos arriba, pasos claros y tarjetas de accion.",
    "layout": "oil-bay",
    "texture": "oil-label",
    "hero_angle": "Mantenimiento del auto sin vueltas: dato, consulta y turno.",
    "hero_cards": [
      {
        "label": "Prueba social",
        "value": "4.8 / 5",
        "note": "Dato verificado"
      },
      {
        "label": "Rubro",
        "value": "Lubricentro",
        "note": "Base verificada"
      },
      {
        "label": "Agenda",
        "value": "Lunes a Sabado; Domingo cerrado",
        "note": "Dato verificado"
      },
      {
        "label": "Contacto",
        "value": "Telefono directo",
        "note": "0351 351-7691"
      }
    ],
    "sections": [
      {
        "type": "service-board",
        "eyebrow": "Servicios",
        "title": "Mantenimiento simple, sin promesas de stock",
        "body": "El contenido se centra en convertir la primera consulta en algo concreto: datos del vehiculo, horario, direccion y telefono.",
        "items": [
          {
            "label": "Aceite",
            "value": "Cambio con datos del vehiculo",
            "note": "Pide modelo, kilometraje y uso del auto antes de prometer producto o precio."
          },
          {
            "label": "Filtros",
            "value": "Chequeo de consumibles",
            "note": "Bloque editable para filtros y repuestos de mantenimiento cuando haya disponibilidad real."
          },
          {
            "label": "Agenda",
            "value": "Consulta de paso",
            "note": "CTA directo para confirmar horario y evitar ir sin datos."
          }
        ]
      },
      {
        "type": "process",
        "eyebrow": "Proceso",
        "title": "De consulta a turno sin perder contexto",
        "body": "El usuario entiende que informacion enviar, que se confirma y como avanzar.",
        "items": [
          {
            "label": "01",
            "value": "Enviar datos del auto",
            "note": "Modelo, motor si se conoce y kilometraje."
          },
          {
            "label": "02",
            "value": "Confirmar producto",
            "note": "El negocio valida lubricante, filtro y disponibilidad real."
          },
          {
            "label": "03",
            "value": "Coordinar visita",
            "note": "Horario, direccion y telefono quedan visibles."
          },
          {
            "label": "04",
            "value": "Registrar proximo cambio",
            "note": "Campo editable para recomendaciones reales del local."
          }
        ]
      },
      {
        "type": "metric-grid",
        "eyebrow": "Confianza",
        "title": "Datos reales arriba, placeholders editables separados",
        "body": "La pagina combina fuentes verificadas con bloques demo marcados para completar.",
        "items": [
          {
            "label": "Prueba social",
            "value": "4.8 / 5",
            "note": "119 resenas registradas en las fuentes disponibles."
          },
          {
            "label": "Rubro",
            "value": "Lubricentro",
            "note": "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas."
          },
          {
            "label": "Agenda",
            "value": "Lunes a Sabado; Domingo cerrado",
            "note": "Horario publicado para orientar la primera consulta."
          },
          {
            "label": "Contacto",
            "value": "Telefono directo",
            "note": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado."
          }
        ]
      },
      {
        "type": "quick-actions",
        "eyebrow": "Accion",
        "title": "Lubricentro Power Ful II: el proximo paso es simple",
        "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: lubricentro, direccion y horario.",
        "items": [
          {
            "label": "CTA",
            "value": "Consultar mantenimiento",
            "note": "0351 351-7691"
          },
          {
            "label": "Ubicacion",
            "value": "Manuel Cardeñosa 3875, X5009EXU Córdoba, Argentina"
          },
          {
            "label": "Horario",
            "value": "Lunes a Sabado; Domingo cerrado"
          }
        ]
      }
    ]
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/cordoba-capital-servicios-vehiculares-de-alta-conversion/lubricentro-power-ful-ii`
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

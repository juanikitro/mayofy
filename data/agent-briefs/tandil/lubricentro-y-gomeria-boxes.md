# Site Brief 3: Lubricentro y Gomeria BOXES

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

- id: `google-ChIJzZSnpU4hkZURfE9Ok88wjqc`
- slug: `lubricentro-y-gomeria-boxes`
- name: Lubricentro y Gomeria BOXES
- category: Car repair and maintenance service
- inferred profile: Lubricentro
- requested segment: servicios vehiculares
- city: Tandil
- address: Ameghino 898, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 443-7843
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 4.7 / 5 (44 reseñas)
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
      "title": "4.7 / 5",
      "body": "44 resenas registradas en las fuentes disponibles.",
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
      "meta": "0249 443-7843"
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
    "title": "Lubricentro y Gomeria BOXES: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: lubricentro, direccion y horario.",
    "primary_label": "Consultar mantenimiento",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Espetacular la atención recomendable cien por ciento." — Marcelo Cabrera (5/5)
2. "Excelente atención siempre con toda la onda!" — Nicolas “Nekoo Wilson” Davalo (5/5)
3. "Excelente atención, muy buenos precios" — Jorge Ferreira (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJzZSnpU4hkZURfE9Ok88wjqc/photos/AaVGc3kz1JyDSHZ70ZGEGkj_K4Tk4gu1yNL6pB1cLfGGFcEdFK0TpvRun3jqhqjiHE6BW0Bk-PWRCcqjJB5MwNvqb9-83oWk7YzPSj898PbRyHwLDad2BVn8qpSLeFWtqX-dmsrdWIxwR9fNn2xRzaNRDU7YJW9KWZ4Jbro2sKEaxJ3IjsFCqa1Blc345HcGhhmeKwTJlIlZ4f9LcbuJU_GopcTN9sPpKbTAuyIN_R004UwglrYlS34gzSZYJ6FxRR4JlGobc9V9_-mPkkbpx_Znj6JQo94qoMVv2rZTFDhfMwh0tuJS3U4kmk8zXMvr_nbldk4izmBpd3J3MNIAv3l8_NxtGJiw2jb58AaIgWA2N9LZ_38IKSWIzzQDmmN1Rb5zFU5wtuqzGUwBN8642TQnkXnWWBlbxWAJf_UyAzNkJzAtX3SY/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJzZSnpU4hkZURfE9Ok88wjqc/photos/AaVGc3n4KQ6mSGo-lTnwjUX-sqEZK3t6YtMEXa8gi0vbgKcCKLE1X6wCkhlWczJKNNfQh3XnkSSM2NitrAZHJ8H2Kt2eRf7ux6BriWXuLkeKbxCW_-FFDmXSEwT78269A44hRFEuvR51BShuvhC9LSHEcmwJ_9IsPWLKqt8MEdasueU7HHWbf_6_ao2diNIxzlE5N8o4hCugTl74MMAVAUooW4LAGKdVBUggjbwNk51UhbuM197yoi2bvxuCn4RuWdZ7kquRyrJ2_KGRTWlRVKuJE7tzrSTB4GoECAkI_DXb-xbtF1_rm8Iszlemyn1Jd4rz6Fz0Pk5Ov--k8VgnNN2tJNqwzqUiE8ohgBKCl4Ko_zPUlGEAVLL7wXWgGWFyaopaMal1sjKGom4pVtvz7QwWeMmp96jsZzt-a0maD0cpiFc/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJzZSnpU4hkZURfE9Ok88wjqc/photos/AaVGc3lmlVk9ppIMCiei_aGPYIFSd31lvh96Y-gmRQYqb5s_Nbm9KANE3DMlLnNf5pk2bIdo9qW9ZZREPxbWKQcnmOSgGAOaab4fLdeantpIl06NHahRYkEr9og7LZxYxlnbD2SqTqe_iEIQjVbHZW43pHOSF8ijzF5ud9YwN-ZtcLiI7U_wXiqZ-LaF8Xr8Auipxp4ETc3JbuFp4F1IknDAJIjSVEG_OSmZitoQjVWT60J8ZKQ6SSCmRxiGvOm-vp_-7q1O8gPXF7YzS4RFMaFRuqq3XTxgmzUvd_gXFwrPLT2gjMiUQKUidv_Nk-d8ILinQQeco4OIlHZlEZVio1sf2p1s0axdA2Fk_M9SNq2k7jQRO0oNKM0AgsPnivV05MNQJhCo8jYGioeyudmrA9nbOXu-CHgHuD-OR960bQvERsJa4BtI/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=12073641319114624892&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/114794676651209773522/reviews
- https://www.google.com/maps/contrib/102596455314038319399/reviews
- https://www.google.com/maps/contrib/116963754561078897502/reviews

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
  "business_id": "google-ChIJzZSnpU4hkZURfE9Ok88wjqc",
  "slug": "lubricentro-y-gomeria-boxes",
  "visual_mood": "precision-service",
  "composition": "route-card",
  "headline": "BOXES",
  "subheadline": "Lubricentro y gomería en Ameghino 898: una landing pensada para mantenimiento, disponibilidad y contacto directo.",
  "primary_cta": "Consultar mantenimiento",
  "secondary_cta": "Ver dirección",
  "service_tags": [
    "Lubricentro",
    "Gomería",
    "Filtros y aceite",
    "Consulta en local"
  ],
  "proof_points": [
    "4.7 sobre 5 con 44 reseñas",
    "Lunes a sábado",
    "Ameghino 898, Tandil",
    "Reseñas sobre atención y precios"
  ],
  "resource_title": "Mantenimiento liviano con datos de contacto al frente",
  "resource_items": [
    "Servicio mixto: lubricentro y gomería.",
    "Horario partido registrado de lunes a sábado.",
    "Teléfono disponible para consultar antes de ir."
  ],
  "review_heading": "Señales de atención",
  "contact_heading": "Consultar antes de acercarse",
  "image_prompt": "Escena editorial realista para lubricentro y gomería en Tandil, aceite, filtros, cubiertas y herramientas ordenadas, sin texto ni logos inventados.",
  "design_notes": "Landing técnica tipo etiqueta de mantenimiento, con grilla precisa y CTA sobrio.",
  "commercial": {
    "tone": "practical-workshop",
    "customer_type": "Conductores que necesitan mantenimiento simple, filtros o cambio de aceite con datos claros.",
    "hero_claim": "Mantenimiento del auto sin vueltas: dato, consulta y turno.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.7 / 5",
        "body": "44 resenas registradas en las fuentes disponibles.",
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
        "meta": "0249 443-7843"
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
      "title": "Lubricentro y Gomeria BOXES: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: lubricentro, direccion y horario.",
      "primary_label": "Consultar mantenimiento",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Ficha de mantenimiento: la landing debe sentirse como un tablero de servicio, clara y confiable.",
    "audience": "Conductores que buscan resolver cambio de aceite, filtros, cubiertas o una consulta de mantenimiento.",
    "visual_direction": "Industrial limpio, líneas de etiqueta, tarjetas tipo checklist y foto con tratamiento técnico.",
    "layout": "oil-bay",
    "texture": "oil-label",
    "hero_angle": "El sitio vende orden: rubro mixto, teléfono, horario y reseñas sin hacer promesas no verificadas.",
    "hero_cards": [
      {
        "label": "Rubro",
        "value": "Lubricentro + gomería",
        "note": "Servicio mixto"
      },
      {
        "label": "Rating",
        "value": "4.7",
        "note": "44 reseñas"
      },
      {
        "label": "Dirección",
        "value": "Ameghino 898",
        "note": "Tandil"
      }
    ],
    "sections": [
      {
        "type": "service-board",
        "eyebrow": "Mantenimiento",
        "title": "Una página para quien quiere resolver algo del auto, no leer un folleto.",
        "body": "La propuesta presenta el mix lubricentro/gomería como dato central y deja el contacto listo para confirmar disponibilidad.",
        "items": [
          {
            "label": "Aceite",
            "value": "Consulta por lubricación"
          },
          {
            "label": "Cubiertas",
            "value": "Gomería"
          },
          {
            "label": "Antes de ir",
            "value": "Llamar al 0249 443-7843"
          }
        ]
      },
      {
        "type": "process",
        "eyebrow": "Chequeo",
        "title": "Horario, rubro y teléfono: el mínimo útil bien presentado.",
        "body": "El bloque funciona como una orden de trabajo previa: qué se consulta, dónde queda y cuándo abre.",
        "items": [
          {
            "label": "1",
            "value": "Revisar horario partido"
          },
          {
            "label": "2",
            "value": "Consultar disponibilidad"
          },
          {
            "label": "3",
            "value": "Ir a Ameghino 898"
          }
        ],
        "callout": "No se inventan marcas ni stock: se vende claridad."
      },
      {
        "type": "quote-strip",
        "eyebrow": "Referencia",
        "title": "“Excelente atención, muy buenos precios.”",
        "body": "La reseña se usa como indicio de experiencia, no como garantía.",
        "items": [
          {
            "label": "Reseña",
            "value": "Atención recomendable"
          },
          {
            "label": "Reseña",
            "value": "Muy buena onda"
          }
        ]
      }
    ]
  },
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/tandil-servicios-vehiculares/lubricentro-y-gomeria-boxes",
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/tandil-servicios-vehiculares/lubricentro-y-gomeria-boxes`
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

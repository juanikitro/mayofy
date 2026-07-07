# Site Brief 9: "Taller Di Sipio" Chapa Y Pintura

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

- id: `google-ChIJvR7setMhkZURnH2gJ7F19Wc`
- slug: `taller-di-sipio-chapa-y-pintura`
- name: "Taller Di Sipio" Chapa Y Pintura
- category: Car repair and maintenance service
- inferred profile: Chapa y pintura
- requested segment: servicios vehiculares
- city: Tandil
- address: C. Almafuerte 943, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 460-4088
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 4.9 / 5 (35 reseñas)
- service baseline: chapa y pintura autos

## Suggested Commercial Profile

```json
{
  "tone": "bodyshop-craft",
  "customer_type": "Dueños de autos que necesitan evaluar un golpe, pintura o terminacion antes de dejar el vehiculo.",
  "hero_claim": "El golpe se consulta con fotos, alcance claro y criterio de terminacion.",
  "services": [
    "Chapa",
    "Pintura",
    "Reparaciones",
    "Consulta con fotos"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "4.9 / 5",
      "body": "35 resenas registradas en las fuentes disponibles.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Rubro",
      "title": "Chapa y pintura",
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
      "meta": "0249 460-4088"
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
      "label": "Chapa",
      "title": "Evaluacion del dano",
      "body": "Pide fotos y zona afectada antes de prometer plazos o presupuestos."
    },
    {
      "label": "Pintura",
      "title": "Terminacion visible",
      "body": "La landing deja lugar para mostrar trabajos reales de color, brillo y ajuste."
    },
    {
      "label": "Consulta",
      "title": "Primer diagnostico",
      "body": "CTA para enviar imagenes y coordinar una visita al taller."
    }
  ],
  "why_choose": [
    {
      "title": "Oficio, no plantilla",
      "body": "Visual editorial de taller, superficies, marcas de trabajo y proceso."
    },
    {
      "title": "Antes/despues necesario",
      "body": "La pagina obliga a mostrar evidencia visual cuando el negocio la tenga."
    },
    {
      "title": "Sin plazos inventados",
      "body": "Tiempo, garantia y presupuesto quedan a confirmar con el caso real."
    }
  ],
  "packages": [
    {
      "name": "Evaluacion con fotos",
      "price_label": "Sin precio publicado",
      "body": "Para entender dano, zona y necesidad antes de presupuestar.",
      "items": [
        "Fotos del golpe",
        "Zona afectada",
        "Direccion del taller"
      ],
      "is_demo": true
    },
    {
      "name": "Reparacion puntual",
      "price_label": "[Presupuesto editable]",
      "body": "Bloque demo para trabajos chicos cuando el taller lo confirme.",
      "items": [
        "Alcance a definir",
        "Materiales a confirmar",
        "Turno"
      ],
      "is_demo": true
    },
    {
      "name": "Pintura / terminacion",
      "price_label": "[A cotizar]",
      "body": "Espacio para trabajos de pintura verificados por el negocio.",
      "items": [
        "Color",
        "Paneles afectados",
        "Revision presencial"
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
      "label": "Chapa y pintura",
      "title": "Detalle del trabajo",
      "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      "meta": "Foto a reemplazar",
      "is_demo": true
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Enviar fotos",
      "body": "Golpe, lateral afectado, detalle de pintura o pieza."
    },
    {
      "step": "02",
      "title": "Separar alcance",
      "body": "Se define si requiere visita, repuesto o presupuesto formal."
    },
    {
      "step": "03",
      "title": "Coordinar taller",
      "body": "Contacto, horario y direccion se muestran sin friccion."
    },
    {
      "step": "04",
      "title": "Cargar antes/despues",
      "body": "La galeria queda lista para trabajos reales terminados."
    }
  ],
  "final_cta": {
    "title": "\"Taller Di Sipio\" Chapa Y Pintura: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: chapa y pintura, direccion y horario.",
    "primary_label": "Consultar reparacion",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Hola! Increíble su trabajo, súper recomendable y la rapidez en la que se entregó el trabajo a requerir. Doy 5 estrellas por qué solo hasta ahí se puede pero sino pondría 10. Éxitos chicos muy buen taller!" — Agustín Serna (5/5)
2. "Excelente Atencion de parte de Gaston y los chicos.
Me prometieron que iba a llevar una semana el arreglo y tardaron justamente eso.
Se le sumaron cosas en el medio y me revolvieron todo de forma practica sin complicaciones para mi.
Quedo Impecable todo, mejor de lo que me imagine.
Muchas gracias al taller por todo.
Saludos y recomiendo.
☆☆☆☆☆☆" — C. Rodriguez (5/5)
3. "El trabajo perfecto y en tiempo, se cumplió todo lo que me dijeron. La atención excelente" — Mauricio Gallo (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJvR7setMhkZURnH2gJ7F19Wc/photos/AaVGc3mSDHEsaC2mU9ptu4q3mSPnf4E61nC_zv1A4ztqCrKC1I7dFSOrQal7CYxrwmyBzjAh1hbeS-vkvknfeKDE0EXgSQG6y3tzS1HoKocLL0GrIgcDv_PqPk3JLY5O2AujzTZXLMG4lZ8ZY_ujYIP1VW7KRn14CeYXLdMbpYeAxNUc8kbyjowmsrghydndhoVwOyHmNP_u4Swso2A8HBec60b5vVZxkwxw0PBBhE3RIezj6rdjnyCO23YF7g0pKPn_sY72NKClwaKyVd0q53fJt--cQYiPdNvXpGJ2UV_4SCYCQxPaOl-td3pO646QwwKY7P4UotJ88FJhXbA1oT3v6L4WQKMCS5c0V4Q4jf8sdtG6gaC_4p6tudu4KiR7PReBeNejoGQ1-T_O0U3xxD42jKWSUTAvquTkJkEdAv5quHU4Ww/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJvR7setMhkZURnH2gJ7F19Wc/photos/AaVGc3m0vXV87-mu156LyU83hIS51Fq2tu8BGQFDuaG1ZnXpsSZmTXxkgfX7Ukv9d8UCqKaumiHFKDelg2WEgWs6Z8VZ5H0zfgOpz6eOzBqMymDo8fVwGTTwMeBMmwhB1WBAp0CjTsaDeagIkV872wnyaIvhgOAXAmEN7Yk1USx021HFYIdkmerjduQ-7AnM7y3XPFRL3fcf5mWI51BgIbTlEmVqf5EYEHCeER5OQg7SFrUlJm8uPFaZ7LtWW5PKeUlgvfvALrd9Ldbae0ecfe_MwWCHmddQQkVfxumf4zksI49QIk9qFmpWyhqVL0tD8BLwPMjSEpanEGXJj3XxleNQn3z2zL3dDJuwfYju4UUoD7bennzyEiTOILePVop4NrIAFrFQoUmiNVgTW2T0f374pREvaRRkOgURWowxiCpS_wA/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJvR7setMhkZURnH2gJ7F19Wc/photos/AaVGc3mGmAbpNLgMlBsptSXLXc5kQwmjoRCCh3aBi3Mv-SydJrz8KkoeCKoflr_ec1vQuJBbXNxZwmDSQgF-RWlT5KJN1Z1NkOf1EgOFCqh9LvuV8mYgRXLbSgQeCXQU2uVbelDU3p_6r1THL9NYbev31hj9WXLPIWzPHJAYVxNYx_ZgwAl2zoWtayb2ik3OxsSu3B1XcbtSZkhUy2Q0yyLnfqfPQ-Sn_Q31ICqZcBoZSOIaUDR6EElUriJ62qngUBuzTEmtvrLXsCQ3VIZ4_pu44R0xtxaxN5COyd_59ZNQt3s8S4NtBKPHhXy9MwApGKkVUhE-DdT-Ue5Rytwcc2mVKDkt0-APtV0voTMuJ0Z_fOLr_uCH9X4GVzl4XvAooR8olCWbahGJBTKHt325ICkr1mjovGDznk8rFr-mM_ut8Nyae7Y/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=7491022958935178652&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/116763191828152012720/reviews
- https://www.google.com/maps/contrib/100446112842809053791/reviews
- https://www.google.com/maps/contrib/112054032969436708869/reviews

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
  "business_id": "google-ChIJvR7setMhkZURnH2gJ7F19Wc",
  "slug": "taller-di-sipio-chapa-y-pintura",
  "visual_mood": "precision-service",
  "composition": "service-ledger",
  "headline": "Di Sipio Chapa y Pintura",
  "subheadline": "Taller de chapa y pintura en Almafuerte 943 con reseñas que destacan rapidez, atención y trabajos cumplidos.",
  "primary_cta": "Consultar reparación",
  "secondary_cta": "Ver horarios",
  "service_tags": [
    "Chapa",
    "Pintura",
    "Reparaciones",
    "Consulta por trabajo"
  ],
  "proof_points": [
    "4.9 sobre 5 con 35 reseñas",
    "C. Almafuerte 943, Tandil",
    "Lunes a sábado",
    "Reseñas mencionan rapidez y cumplimiento"
  ],
  "resource_title": "Una landing para consultar carrocería con expectativas claras",
  "resource_items": [
    "No inventa presupuestos ni plazos.",
    "Usa reseñas reales sobre rapidez y atención.",
    "Deja teléfono, dirección y horario al alcance."
  ],
  "review_heading": "Rapidez y cumplimiento",
  "contact_heading": "Consultar por el arreglo",
  "image_prompt": "Escena editorial realista para taller de chapa y pintura en Tandil, carrocería en preparación, herramientas y luz de trabajo, sin texto ni logos inventados.",
  "design_notes": "Landing de taller de carrocería con estética de ficha de trabajo y reseñas como prueba.",
  "commercial": {
    "tone": "bodyshop-craft",
    "customer_type": "Dueños de autos que necesitan evaluar un golpe, pintura o terminacion antes de dejar el vehiculo.",
    "hero_claim": "El golpe se consulta con fotos, alcance claro y criterio de terminacion.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.9 / 5",
        "body": "35 resenas registradas en las fuentes disponibles.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Rubro",
        "title": "Chapa y pintura",
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
        "meta": "0249 460-4088"
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
        "label": "Chapa",
        "title": "Evaluacion del dano",
        "body": "Pide fotos y zona afectada antes de prometer plazos o presupuestos."
      },
      {
        "label": "Pintura",
        "title": "Terminacion visible",
        "body": "La landing deja lugar para mostrar trabajos reales de color, brillo y ajuste."
      },
      {
        "label": "Consulta",
        "title": "Primer diagnostico",
        "body": "CTA para enviar imagenes y coordinar una visita al taller."
      }
    ],
    "why_choose": [
      {
        "title": "Oficio, no plantilla",
        "body": "Visual editorial de taller, superficies, marcas de trabajo y proceso."
      },
      {
        "title": "Antes/despues necesario",
        "body": "La pagina obliga a mostrar evidencia visual cuando el negocio la tenga."
      },
      {
        "title": "Sin plazos inventados",
        "body": "Tiempo, garantia y presupuesto quedan a confirmar con el caso real."
      }
    ],
    "packages": [
      {
        "name": "Evaluacion con fotos",
        "price_label": "Sin precio publicado",
        "body": "Para entender dano, zona y necesidad antes de presupuestar.",
        "items": [
          "Fotos del golpe",
          "Zona afectada",
          "Direccion del taller"
        ],
        "is_demo": true
      },
      {
        "name": "Reparacion puntual",
        "price_label": "[Presupuesto editable]",
        "body": "Bloque demo para trabajos chicos cuando el taller lo confirme.",
        "items": [
          "Alcance a definir",
          "Materiales a confirmar",
          "Turno"
        ],
        "is_demo": true
      },
      {
        "name": "Pintura / terminacion",
        "price_label": "[A cotizar]",
        "body": "Espacio para trabajos de pintura verificados por el negocio.",
        "items": [
          "Color",
          "Paneles afectados",
          "Revision presencial"
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
        "label": "Chapa y pintura",
        "title": "Detalle del trabajo",
        "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
        "meta": "Foto a reemplazar",
        "is_demo": true
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Enviar fotos",
        "body": "Golpe, lateral afectado, detalle de pintura o pieza."
      },
      {
        "step": "02",
        "title": "Separar alcance",
        "body": "Se define si requiere visita, repuesto o presupuesto formal."
      },
      {
        "step": "03",
        "title": "Coordinar taller",
        "body": "Contacto, horario y direccion se muestran sin friccion."
      },
      {
        "step": "04",
        "title": "Cargar antes/despues",
        "body": "La galeria queda lista para trabajos reales terminados."
      }
    ],
    "final_cta": {
      "title": "\"Taller Di Sipio\" Chapa Y Pintura: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: chapa y pintura, direccion y horario.",
      "primary_label": "Consultar reparacion",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Ficha de reparación: orientar a quien llega con un problema visual del auto.",
    "audience": "Personas que necesitan consultar chapa, pintura o reparación y quieren referencias antes de llamar.",
    "visual_direction": "Editorial de taller, textura de polvo de primer, bloques amplios y citas como prueba de cumplimiento.",
    "layout": "bodyshop-craft",
    "texture": "primer-dust",
    "hero_angle": "La venta está en la confianza: rapidez mencionada, atención y trabajo cumplido.",
    "hero_cards": [
      {
        "label": "Rating",
        "value": "4.9",
        "note": "35 reseñas"
      },
      {
        "label": "Señal",
        "value": "Rapidez",
        "note": "Mencionada por clientes"
      },
      {
        "label": "Dirección",
        "value": "Almafuerte 943",
        "note": "Tandil"
      }
    ],
    "sections": [
      {
        "type": "quote-strip",
        "eyebrow": "Reseña",
        "title": "“Increíble su trabajo... y la rapidez.”",
        "body": "La landing abre con una señal que importa: cuando el auto entra a taller, la incertidumbre baja si hay referencias concretas.",
        "items": [
          {
            "label": "Atención",
            "value": "Excelente según reseñas"
          },
          {
            "label": "Cumplimiento",
            "value": "Trabajo perfecto y en tiempo"
          }
        ]
      },
      {
        "type": "process",
        "eyebrow": "Consulta",
        "title": "Un arreglo se conversa con el caso adelante.",
        "body": "Por eso el sitio empuja a llamar y coordinar, no a cerrar una promesa imposible por web.",
        "items": [
          {
            "label": "1",
            "value": "Llamar"
          },
          {
            "label": "2",
            "value": "Contar el trabajo"
          },
          {
            "label": "3",
            "value": "Coordinar revisión"
          }
        ]
      },
      {
        "type": "metric-grid",
        "eyebrow": "Datos",
        "title": "Lo verificable queda visible.",
        "body": "Rating, dirección, teléfono y horario sostienen la conversión sin adornar.",
        "items": [
          {
            "label": "Teléfono",
            "value": "0249 460-4088"
          },
          {
            "label": "Horario",
            "value": "Lunes a sábado"
          },
          {
            "label": "Rubro",
            "value": "Chapa y pintura"
          }
        ],
        "callout": "Diseñada para vender consulta, no para inventar catálogo."
      }
    ]
  },
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/tandil-servicios-vehiculares/taller-di-sipio-chapa-y-pintura",
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/tandil-servicios-vehiculares/taller-di-sipio-chapa-y-pintura`
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

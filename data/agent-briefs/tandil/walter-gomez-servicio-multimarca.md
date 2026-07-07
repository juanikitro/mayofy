# Site Brief 7: Walter Gomez Servicio Multimarca

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

- id: `google-ChIJ_7T3RIUfkZURLiDXAheqeg8`
- slug: `walter-gomez-servicio-multimarca`
- name: Walter Gomez Servicio Multimarca
- category: Car repair and maintenance service
- inferred profile: Taller mecanico
- requested segment: servicios vehiculares
- city: Tandil
- address: Av. Marconi 1678, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 442-2400
- hours summary: Lunes a Domingo: 8:30 a. m. – 6:00 p. m.
- rating: 4.7 / 5 (75 reseñas)
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
      "title": "4.7 / 5",
      "body": "75 resenas registradas en las fuentes disponibles.",
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
      "title": "Lunes a Domingo: 8:30 a. m. – 6:00 p. m.",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0249 442-2400"
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
    "title": "Walter Gomez Servicio Multimarca: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: taller mecanico, direccion y horario.",
    "primary_label": "Consultar turno",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Fui por recomendación. Se aflojó el cubre cárter del auto justo antes de pegar la vuelta a bs as. Lo llamé y le expliqué q tenía q salir a la ruta. El mismo día me hizo lugar en el taller para subirlo al elevador y revisarlo. La verdad q quedé sorprendida. Empatía y honestidad es lo que los diferencia. En 20 minutos me devolvió el auto en óptimas condiciones. Gracias Walter!!!" — Lucia Pereira Pinto (5/5)
2. "La verdad que se nota la honestidad de Walter. Excelente atención con respecto al problema del auto! Súper recomendable y de confianza , es re importante eso, te dije la posta y te da solución efectiva! Gracias!!!" — Lourdes Lizarraga (5/5)
3. "Mecánico con buena atención, se pueden hacer servicios o distintas reparaciones. Se puede hacer pago con billeteras" — Cejota Asti (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJ_7T3RIUfkZURLiDXAheqeg8/photos/AaVGc3l7HW9s-qr5aYP6SRp6SeRTW5_q-sS47ZDpKIVgJLoOBckrZjnWoXRRALGBmFQG3JcFwdI-J-rVsPjXaaNHkM20RP92mmNBe655NhLc6Gj0QpRJsOkL_6uCRhFTLV5QG3mkSziVsG0TEuseewTANsfePrkuYh4Fel73s0-COUg7oEBZxGjzeZXs2EaL5mYdsxMzRrYbmcRsJRR0P_Ys4d-ZqyrXiuHesHSa7J2GtEPoKp9TXvG4oZeIO7EMQ6lSYaJsJeG231AUGsKKR2i6dX1SRRInBOYEvgWMboxy2BL6kUeOtK_iDsTU2_Qplb2BYhobP4oZu7XrDWIAqaxcwOWS0DdOprsEsYopLdI_70mDTMD08oluIfsg5vVnh2HeXnGYRtr5cEp87tymFKqZ7gEsobd3PQdX5K98X6v71-KZK_Fs/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJ_7T3RIUfkZURLiDXAheqeg8/photos/AaVGc3nx0K_34ZQ-TmqH_VLX7halQwN4H8J7PXZQ6QlWSCBIRe2NigMEwcyaXMvdQhW4t7dVpBXS_5ocn1uM2Aa6EChItxg0XzqZXwW31C7Q0JGwXS0SoK3DLVC245eollSYXDdAugpy5ksFPdPayd0d-5eK8YgauynR1xcgIORXyF4QmoumyPdfed9qqUtBH1j5Bq2YQi9SnW8kPx18C_xbO8ESDxfDkiZxSmnlxgXJt7jBkEQD8KPGyuGKqlj-KDe3_06_0bG7bxjDnP92Jw6Q5TBbFUPA4Q7jRmkUTVDQ01JV_nidH8_kvSApx3x2LnY_JNbEZediRXJ0QXiIU9iRQZ0GhUNxI0_keS_A9nSs6DIpalkZ39l4X2Sf6LhLt4lxFSQuRrdWb3dTGSUl_gbErSbJPj7HxGlFDcmH-DcjxYKUMA/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJ_7T3RIUfkZURLiDXAheqeg8/photos/AaVGc3lQGIDgchtL0R5qxBZx2gp_Nj-rSEgNmQHGCl3VN4NqficTg550_5u0hhIqGLXlVpR-je89T8Pt6hkBhAqTIQEipk19Ds4g7kNvXu6_lCx6OirwiEF5XSa2mHlRLITdluWTbyq_kbjTS3zPfarBLvXIjS5AlWheNBygVrO2mXzPZdPG_OZGmjvj40HAqTPzkmD8jTRwNxj4wmuyor1TakH9j-YQ9IJxiVWrIhEvVJwjMIKfEc4kehzTKvMwBzBWVyIy2vWuVAnTy1GwQbnjx612XwtnVrQdfbFHJM_76lbYVJwm7FzcT0RRryW-yA-D-6ZFArkJzEZEzZD-IHtHJAi-nIYardf2WzDqkRr-PXoR0oVZWi6E9t69ckxT1neqByYUZaZJjhZOc-r2RN4iBz8zg1OzH8ddigLtep6FSuwR8urx/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=1115390873536241710&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/110499468016956596258/reviews
- https://www.google.com/maps/contrib/118056081427812917219/reviews
- https://www.google.com/maps/contrib/106811214303404458247/reviews

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
  "business_id": "google-ChIJ_7T3RIUfkZURLiDXAheqeg8",
  "slug": "walter-gomez-servicio-multimarca",
  "visual_mood": "workshop-trust",
  "composition": "poster-bay",
  "headline": "Walter Gomez Servicio Multimarca",
  "subheadline": "Taller mecánico en Av. Marconi con reseñas que destacan atención, honestidad y resolución de problemas del auto.",
  "primary_cta": "Consultar turno",
  "secondary_cta": "Ver reseñas",
  "service_tags": [
    "Mecánica",
    "Service",
    "Reparaciones",
    "Consulta por turno"
  ],
  "proof_points": [
    "4.7 sobre 5 con 75 reseñas",
    "Av. Marconi 1678, Tandil",
    "Horario todos los días según registro",
    "Reseñas mencionan honestidad y solución efectiva"
  ],
  "resource_title": "Un taller se elige por confianza antes que por ruido",
  "resource_items": [
    "Reseñas con situaciones concretas.",
    "Dirección y teléfono visibles.",
    "Horarios registrados para planificar consulta."
  ],
  "review_heading": "Confianza en palabras de clientes",
  "contact_heading": "Consultar el problema del auto",
  "image_prompt": "Escena editorial realista para taller mecánico multimarca en Tandil, elevador, herramientas, auto en revisión, luz natural, sin texto ni logos inventados.",
  "design_notes": "Landing tipo bitácora de taller: ordenada, confiable y apoyada en reseñas de casos reales.",
  "commercial": {
    "tone": "practical-workshop",
    "customer_type": "Conductores que necesitan diagnostico, mantenimiento o una primera consulta confiable.",
    "hero_claim": "Primero entender que le pasa al auto. Despues, coordinar bien el turno.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.7 / 5",
        "body": "75 resenas registradas en las fuentes disponibles.",
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
        "title": "Lunes a Domingo: 8:30 a. m. – 6:00 p. m.",
        "body": "Horario publicado para orientar la primera consulta.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Contacto",
        "title": "Telefono directo",
        "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
        "meta": "0249 442-2400"
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
      "title": "Walter Gomez Servicio Multimarca: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: taller mecanico, direccion y horario.",
      "primary_label": "Consultar turno",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Bitácora de confianza: convertir reseñas de honestidad y resolución en una página de taller vendible.",
    "audience": "Conductores que necesitan revisar un problema, hacer service o encontrar un taller confiable.",
    "visual_direction": "Editorial mecánico, grilla de diagnóstico, bloques sobrios y foco en casos reales.",
    "layout": "mechanic-ledger",
    "texture": "service-ledger",
    "hero_angle": "La landing vende tranquilidad: otros llegaron con un problema y describieron atención concreta.",
    "hero_cards": [
      {
        "label": "Rating",
        "value": "4.7",
        "note": "75 reseñas"
      },
      {
        "label": "Señal",
        "value": "Honestidad",
        "note": "Mencionada por clientes"
      },
      {
        "label": "Dirección",
        "value": "Av. Marconi 1678",
        "note": "Tandil"
      }
    ],
    "sections": [
      {
        "type": "material-story",
        "eyebrow": "Confianza",
        "title": "La reseña fuerte no dice “somos buenos”: cuenta una situación real.",
        "body": "Un cliente menciona un cubre cárter flojo antes de viajar y una revisión rápida. Ese caso ordena el relato comercial.",
        "items": [
          {
            "label": "Caso",
            "value": "Problema antes de salir a ruta"
          },
          {
            "label": "Respuesta",
            "value": "Revisión en el día"
          },
          {
            "label": "Percepción",
            "value": "Empatía y honestidad"
          }
        ],
        "callout": "La página usa casos reales como prueba, no frases vacías."
      },
      {
        "type": "process",
        "eyebrow": "Turno",
        "title": "Un taller necesita entender el síntoma antes de prometer solución.",
        "body": "El CTA invita a consultar turno o explicar el problema, sin afirmar diagnósticos no verificados.",
        "items": [
          {
            "label": "1",
            "value": "Llamar"
          },
          {
            "label": "2",
            "value": "Explicar el síntoma"
          },
          {
            "label": "3",
            "value": "Coordinar revisión"
          }
        ]
      },
      {
        "type": "quote-strip",
        "eyebrow": "Reseña",
        "title": "“Te dice la posta y te da solución efectiva.”",
        "body": "La frase tiene peso comercial porque habla del miedo principal: llevar el auto y no saber si confiar.",
        "items": [
          {
            "label": "Señal",
            "value": "Buena atención"
          },
          {
            "label": "Señal",
            "value": "Distintas reparaciones"
          }
        ]
      }
    ]
  },
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/tandil-servicios-vehiculares/walter-gomez-servicio-multimarca",
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/tandil-servicios-vehiculares/walter-gomez-servicio-multimarca`
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

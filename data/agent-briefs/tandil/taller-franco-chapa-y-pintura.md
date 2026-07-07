# Site Brief 5: Taller Franco Chapa y Pintura

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

- id: `google-ChIJw2Yfye4fkZURKgs9NhpTdAs`
- slug: `taller-franco-chapa-y-pintura`
- name: Taller Franco Chapa y Pintura
- category: Car repair and maintenance service
- inferred profile: Detailing y estetica vehicular
- requested segment: servicios vehiculares
- city: Tandil
- address: Saavedra 458, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 454-4214
- hours summary: Lunes a Viernes; Sabado, Domingo cerrado
- rating: 4.7 / 5 (67 reseñas)
- service baseline: chapa y pintura autos

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
      "title": "4.7 / 5",
      "body": "67 resenas registradas en las fuentes disponibles.",
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
      "title": "Lunes a Viernes; Sabado, Domingo cerrado",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0249 454-4214"
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
    "title": "Taller Franco Chapa y Pintura: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: detailing y estetica vehicular, direccion y horario.",
    "primary_label": "Reservar turno",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Excelente atención de todo el equipo, ademas de arreglarle ese golpe, pedi un pulido y quedo espectacular. Recomendables! Gracias" — Yohana Romeo (5/5)
2. "Excelentes. Atención muy buena,eficiencia y el auto quedo impecable." — Laura (5/5)
3. "me tuvieron mi auto un tiempo como favor por un choque que tuve❤️" — Alexis Botta (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJw2Yfye4fkZURKgs9NhpTdAs/photos/AaVGc3mUb1YR8GtUGRsFI-uAXRYlDltqFqnx4h_Ln8NCMAhNRAJ78awe-cAFJz_6DqVtKUpVILeoSz232JRy983DLQFW5r9Ts9ZsINX0Elvk0uLA3NKbauYtlVHZflAtK9BJQGYy2Q99A1rJQeQ8579HvxQ8hBx2aZFGHCmoQD6rkSkXOiMvRIV9M3ofhDC9Q4gEj81hkypAn0Tniu14hkYqJukH9XKLUz_thAmHSgfhUjRsnCb_nBAl08b9J3s7eABdQa9ksLz5KmExmMt76wXA_R-uO-NYF8SHU2lbzYqqevfMeZ-ttW_LLTzwuJZMlyJc4cAx0u3HJmmFNrdM7m6rdPP7XUit86q_woqtEMzxCgmzIZeYL4NLp87hx9ETFbkS5yJDkmoA3E8UvSbu-SX-UMaVcqUoqanv_oXFkyVmgPwod94/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJw2Yfye4fkZURKgs9NhpTdAs/photos/AaVGc3m3DXd0yEsDIYinptjSQbrhWrcKR6rqKuagbslnf4V7hM9OROsmE3-Pa85SABlWMla81_tzml5AsPjY24gWJLEgDHcCgMuGdMfYmhCYxwoXWZFGdKcFGaHbJzqQG8RfXqeeC_5EKwEtEU5Cda_XZCzLkUtkQzvsrerMIHBn-rJU6i33uwcS6fYfZWHSHz-HAOw4IPoufaJhbjRdYRKzLbeP7HEKfDgE6pA9ukbMy4sLGO0WreUdJeYKvaJmA1Jrt6pgsKVD8RE59Y82dP9IRPqgaCh3wxZh0ILHMMGDisZ92wDNXXB6cQB9q_bVJt7KP--Jc9roIk6CqBxov0xbWcp54Ix0VTrIlQIRJpMQ5JFNMzrFyYCpRRCWCQBA6cw8tdgzqttacfO7WbqdKsRK75H5TqvOAzjIjgaZLGOdkA0EaroX/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJw2Yfye4fkZURKgs9NhpTdAs/photos/AaVGc3mJGx92PcQZW_VUns-tKNo1dCsBKMDX3Df0e2mvTgS8DCzzR-mli1Gtl_Sn37lBSb6L0eMjzNL5ZDvSeocdlk-aBmIG54SQ2GSvSyWDGBc_HMnXNRWkHIvvhOYn9iHdSKmw8BQAoucrb5BxwYamQdNdextwbM8oLm4NaBb2cNSRvnVn2QDLI985G669q8zM3mdabcDm6RYeGCZlN3QPFxWebACRyNSA1osSvULi8FzoQNGB66TTrcR9RvNTgJnvl2tiyPoQltbQaDEWwW2fq_w57vCwciuR8XJlWTA4YT5XMPvoWmbisapfOML0851KiJ81ndKq1iSjZshJExl-iFarmXt_KkOgjpRZbcCCaruiBnrTLVLW6yevna5ddgmCixNtM0-Q47ZYZ5_oFNImr0lEogRwyLVWR_P23gaawEO7JtrA/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=825376003759868714&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/117221580555716877546/reviews
- https://www.google.com/maps/contrib/114422848452428716349/reviews
- https://www.google.com/maps/contrib/109992400346699219886/reviews

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
  "business_id": "google-ChIJw2Yfye4fkZURKgs9NhpTdAs",
  "slug": "taller-franco-chapa-y-pintura",
  "visual_mood": "precision-service",
  "composition": "photo-board",
  "headline": "Taller Franco Chapa y Pintura",
  "subheadline": "Chapa, pintura y reparación de carrocería en Tandil con reseñas que hablan de golpes, pulido y terminación.",
  "primary_cta": "Consultar reparación",
  "secondary_cta": "Ver trabajos mencionados",
  "service_tags": [
    "Chapa",
    "Pintura",
    "Pulido",
    "Consulta por trabajo"
  ],
  "proof_points": [
    "4.7 sobre 5 con 67 reseñas",
    "Saavedra 458, Tandil",
    "Lunes a viernes con horario registrado",
    "Reseñas mencionan golpes, pulido y auto impecable"
  ],
  "resource_title": "Carrocería: antes de pedir presupuesto, mirá señales reales",
  "resource_items": [
    "Las reseñas mencionan trabajos concretos.",
    "El teléfono está visible para consultar el caso.",
    "La landing evita prometer plazos o resultados no verificados."
  ],
  "review_heading": "Terminación mencionada por clientes",
  "contact_heading": "Consultar el trabajo de carrocería",
  "image_prompt": "Escena editorial realista para taller de chapa y pintura en Tandil, carrocería, lijado, pulido y luz de taller, sin texto ni logos inventados.",
  "design_notes": "Landing editorial de oficio: textura de primer, bloques de proceso y reseñas sobre terminación.",
  "commercial": {
    "tone": "premium-detailing",
    "customer_type": "Personas que cuidan el auto, quieren recuperar brillo, proteger terminaciones o reservar un lavado detallado.",
    "hero_claim": "Que el auto vuelva a sentirse cuidado, limpio y listo para mirar de cerca.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.7 / 5",
        "body": "67 resenas registradas en las fuentes disponibles.",
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
        "title": "Lunes a Viernes; Sabado, Domingo cerrado",
        "body": "Horario publicado para orientar la primera consulta.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Contacto",
        "title": "Telefono directo",
        "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
        "meta": "0249 454-4214"
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
      "title": "Taller Franco Chapa y Pintura: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: detailing y estetica vehicular, direccion y horario.",
      "primary_label": "Reservar turno",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Oficio y terminación: una landing que vende confianza sin mostrar un portfolio inventado.",
    "audience": "Personas que tienen un golpe, necesitan pintar o quieren consultar un trabajo de carrocería.",
    "visual_direction": "Fondo claro con acento de taller, foto como evidencia y bloques que parecen fichas de proceso.",
    "layout": "bodyshop-craft",
    "texture": "primer-dust",
    "hero_angle": "El valor está en las señales verificadas: golpes resueltos, pulido mencionado y atención destacada.",
    "hero_cards": [
      {
        "label": "Señal",
        "value": "Golpes y pulido",
        "note": "Mencionados en reseñas"
      },
      {
        "label": "Rating",
        "value": "4.7",
        "note": "67 reseñas"
      },
      {
        "label": "Dirección",
        "value": "Saavedra 458",
        "note": "Tandil"
      }
    ],
    "sections": [
      {
        "type": "material-story",
        "eyebrow": "Oficio",
        "title": "La página no inventa un portfolio: usa lo que la gente ya dijo.",
        "body": "Las reseñas hablan de arreglar golpes, pedir pulido y recibir el auto en buen estado. Ese es el eje comercial.",
        "items": [
          {
            "label": "Chapa",
            "value": "Consulta por reparación"
          },
          {
            "label": "Pintura",
            "value": "Trabajo de carrocería"
          },
          {
            "label": "Pulido",
            "value": "Mencionado en reseñas"
          }
        ],
        "callout": "La confianza se construye con señales concretas, no con promesas."
      },
      {
        "type": "process",
        "eyebrow": "Consulta",
        "title": "Un caso de chapa necesita contexto antes de cotizar.",
        "body": "Por eso el CTA invita a consultar el trabajo, sin inventar precios ni tiempos.",
        "items": [
          {
            "label": "1",
            "value": "Llamar"
          },
          {
            "label": "2",
            "value": "Describir el golpe"
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
        "title": "“Arreglarle ese golpe... y quedó espectacular.”",
        "body": "La frase conecta directo con la intención de búsqueda: reparar y recuperar presentación.",
        "items": [
          {
            "label": "Atención",
            "value": "Excelente atención del equipo"
          },
          {
            "label": "Resultado",
            "value": "Auto impecable"
          }
        ]
      }
    ]
  },
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/tandil-servicios-vehiculares/taller-franco-chapa-y-pintura",
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/tandil-servicios-vehiculares/taller-franco-chapa-y-pintura`
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

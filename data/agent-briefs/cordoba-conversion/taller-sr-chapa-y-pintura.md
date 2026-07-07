# Site Brief 2: Taller SR. Chapa y pintura

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

- id: `google-ChIJCURt-D6YMpQRtFgR9fQuZXY`
- slug: `taller-sr-chapa-y-pintura`
- name: Taller SR. Chapa y pintura
- category: Car repair and maintenance service
- inferred profile: Chapa y pintura
- requested segment: servicios vehiculares de alta conversion
- city: Cordoba Capital
- address: Juan de Santiso y Moscoso 760, X5000 Córdoba, Argentina
- phone: 0351 549-1346
- hours summary: Lunes a Viernes; Sabado, Domingo cerrado
- rating: 4.8 / 5 (188 reseñas)
- service baseline: chapa pintura autos

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
      "title": "4.8 / 5",
      "body": "188 resenas registradas en las fuentes disponibles.",
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
      "title": "Lunes a Viernes; Sabado, Domingo cerrado",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0351 549-1346"
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
    "title": "Taller SR. Chapa y pintura: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: chapa y pintura, direccion y horario.",
    "primary_label": "Consultar reparacion",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "I found this place through Google reviews and, as someone from India who doesn’t speak great Spanish, I was struggling to find a reliable shop to fix my car after an accident. César was fantastic—professional, helpful, and honest. The price was reasonable, and most importantly, the job was completed within the promised timeframe. Highly recommend!" — Saurabh Khanvilkar (5/5)
2. "Más que conforme con la excelente calidad del trabajo y tiempo de entrega. Me dejaron como nuevo el parachoques y hasta una limpieza incluida que parece un espejo del brillo. Ya la próxima vuelvo por el abrillantado" — Jeziel Ruani (5/5)
3. "Fui al Taller para repararle unos detalles a mi auto y la verdad realizaron un trabajo excelente. Destaco la prolijidad con la que hicieron la reparación, ya que quedo prácticamente imperceptible." — Maximiliano Ocampo (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJCURt-D6YMpQRtFgR9fQuZXY/photos/AaVGc3lohNd0pc1Dvoe8uJeuMW0bnQF5zglRuS9JB6JLOVRT3AbS2zKVonkuvmOs-NKOKsrHoJTz_p8ZN7-S8Gd3hnNo6yCotG7qVnK9oDDjb4argjEdge02yfBw9-IXckfFDoIfdkdtDAaIk0KhEwcFOGHc0Mb-UATXF9dKGae92GLdaQFxEresMMdLkg9G4XaiY8M3vvg_iFJGGAD6Vkk50V5YTqqyizPMF96kbEncXlrkV95bGO2yiwmYrQgsKqjS4SoWq1cFbZy8n8AfHvUsPA662HyZ4VMOztv-AbWJM9b2QwnCPDiwxQhWgrLJpFUelizjUzeY5GsyyMFCOhwwWjX9FmZAsRDL9jMbY2wK7tOxIhq_TSlHRlduGISns5227a4lvqyTOG9dgVkvz8Kmyy6E3J9Q3x_9jNYIwQ9uSmkT_3h_KhPaO_b7DmySVA/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJCURt-D6YMpQRtFgR9fQuZXY/photos/AaVGc3lujPprporMXT3MvXGtlsYQhoxT9psk_snNY5q2rZPBgQfSzAf6aRM4N9-o1rVpj5Da7NYIOj3QN2h5co3inGPc7tS_EKpJe0yhsL7IYozpbi7cyTWZ7lOtH6a4f-jMRYFzsPowqko7MYG0adN9yWlEkILT1lZfujV4eufXqy0fjR5B8arRCtVVXdeHPbzcy7u9Uz5RP3W0n6liEsOcp-Ai3dLr9LWUg4a_PrtoD3dQcAnqRgBwzSgxmqAFz1qvaUR0YAb26c8ZUMp43OiH3rejMro6gFYCG4x4wqNRNgYBEqyUpUm8-3wJiYjnx1WzdI4zAM4fIqGYf3H9DAso1eu2sQ32GNSv6f8hV8hj_hAzqe_LnUwPxjcnqpCUyQmDW1ueWrUtrynPZInC7dvDIFHN4-_BxpeV612aCGAuKcKYIA/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJCURt-D6YMpQRtFgR9fQuZXY/photos/AaVGc3kAfB-zhfNwQmVnprmri_V7gr0K2Ck0DHRLTM-QmayyOCHz_X3ZTEteEYAq8v_j-X1fw9REz7JD4zMigyJGbNXDepp1qBYi71d2aLVUcWHH8M0a-iO08shKizgjUsgJWy353y-nyMckZqHH3rUu3MQaetSOhOJcJdFV4rmgkbTaAGCdiR5GE7wLIa1AeOJDA0eeU9FSbT9ltjUzN5VUBQ4sEqWR-hF2fVe10mCEBpUvmylDuJlHhhkfURJC5LkmBA_oyCUIu2PBMHHqLaoPHqHDTgc3R2_uqVFfz0nVm0mjqd9Ski83CVfYbD3Ta2C3gAqxyPUw44a21S8rpM72q5okTZqUwrQBGvJGP5523NTO_icgC6CphnpFKELFHh2UTL6XIGZp5WXaFjmfH9QNvmCx8j5xFrn0tU9Pxd6oyizT-Fi6/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=8531276698741725364&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/115956117949944651132/reviews
- https://www.google.com/maps/contrib/114555354826781461809/reviews
- https://www.google.com/maps/contrib/113994155429515697370/reviews

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
  "business_id": "google-ChIJCURt-D6YMpQRtFgR9fQuZXY",
  "slug": "taller-sr-chapa-y-pintura",
  "visual_mood": "precision-service",
  "composition": "poster-bay",
  "headline": "Taller SR. Chapa y pintura",
  "subheadline": "El golpe se consulta con fotos, alcance claro y criterio de terminacion. Chapa y pintura en Tandil con contacto, horarios, ubicacion y referencias publicas arriba del pliegue.",
  "primary_cta": "Consultar reparacion",
  "secondary_cta": "Ver ubicacion",
  "service_tags": [
    "Chapa",
    "Pintura",
    "Reparaciones",
    "Consulta con fotos"
  ],
  "proof_points": [
    "4.8 sobre 5 con 188 reseñas",
    "Horario: Lunes a Viernes; Sabado, Domingo cerrado",
    "Direccion: Juan de Santiso y Moscoso 760, X5000 Córdoba",
    "Reseñas que destacan: \"I found this place through Google reviews and, as someone from India who doesn’t speak great...\""
  ],
  "resource_title": "Para evaluar una reparacion de carroceria",
  "resource_items": [
    "Direccion y contacto visibles para consultar el trabajo.",
    "Resenas publicas para revisar referencias de terminacion y atencion.",
    "Horario registrado: Lunes a Viernes; Sabado, Domingo cerrado."
  ],
  "review_heading": "Lo que valoran quienes ya fueron",
  "contact_heading": "Llegar o llamar sin vueltas",
  "image_prompt": "Escena editorial realista para taller de chapa y pintura en Tandil, carroceria en reparacion, herramientas y luz de trabajo, luz natural, sin texto, sin logos inventados.",
  "design_notes": "Mood precision-service, composicion poster-bay, tono comercial bodyshop-craft. Evitar estetica SaaS generica; usar recursos visuales del rubro chapa y pintura, direccion, prueba social, paquetes editables y CTA de turno.",
  "commercial": {
    "tone": "bodyshop-craft",
    "customer_type": "Dueños de autos que necesitan evaluar un golpe, pintura o terminacion antes de dejar el vehiculo.",
    "hero_claim": "El golpe se consulta con fotos, alcance claro y criterio de terminacion.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.8 / 5",
        "body": "188 resenas registradas en las fuentes disponibles.",
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
        "title": "Lunes a Viernes; Sabado, Domingo cerrado",
        "body": "Horario publicado para orientar la primera consulta.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Contacto",
        "title": "Telefono directo",
        "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
        "meta": "0351 549-1346"
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
      "title": "Taller SR. Chapa y pintura: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: chapa y pintura, direccion y horario.",
      "primary_label": "Consultar reparacion",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "El golpe se consulta con fotos, alcance claro y criterio de terminacion. Direccion comercial para Dueños de autos que necesitan evaluar un golpe, pintura o terminacion antes de dejar el vehiculo.",
    "audience": "Dueños de autos que necesitan evaluar un golpe, pintura o terminacion antes de dejar el vehiculo.",
    "visual_direction": "Servicio local con jerarquia fuerte, datos arriba, pasos claros y tarjetas de accion.",
    "layout": "bodyshop-craft",
    "texture": "primer-dust",
    "hero_angle": "El golpe se consulta con fotos, alcance claro y criterio de terminacion.",
    "hero_cards": [
      {
        "label": "Prueba social",
        "value": "4.8 / 5",
        "note": "Dato verificado"
      },
      {
        "label": "Rubro",
        "value": "Chapa y pintura",
        "note": "Base verificada"
      },
      {
        "label": "Agenda",
        "value": "Lunes a Viernes; Sabado, Domingo cerrado",
        "note": "Dato verificado"
      },
      {
        "label": "Contacto",
        "value": "Telefono directo",
        "note": "0351 549-1346"
      }
    ],
    "sections": [
      {
        "type": "service-board",
        "eyebrow": "Servicios",
        "title": "Para evaluar una reparacion de carroceria",
        "body": "La pagina ordena la consulta sin prometer presupuesto, plazo ni resultado no verificado.",
        "items": [
          {
            "label": "Chapa",
            "value": "Evaluacion del dano",
            "note": "Pide fotos y zona afectada antes de prometer plazos o presupuestos."
          },
          {
            "label": "Pintura",
            "value": "Terminacion visible",
            "note": "La landing deja lugar para mostrar trabajos reales de color, brillo y ajuste."
          },
          {
            "label": "Consulta",
            "value": "Primer diagnostico",
            "note": "CTA para enviar imagenes y coordinar una visita al taller."
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
            "value": "Enviar fotos",
            "note": "Golpe, lateral afectado, detalle de pintura o pieza."
          },
          {
            "label": "02",
            "value": "Separar alcance",
            "note": "Se define si requiere visita, repuesto o presupuesto formal."
          },
          {
            "label": "03",
            "value": "Coordinar taller",
            "note": "Contacto, horario y direccion se muestran sin friccion."
          },
          {
            "label": "04",
            "value": "Cargar antes/despues",
            "note": "La galeria queda lista para trabajos reales terminados."
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
            "note": "188 resenas registradas en las fuentes disponibles."
          },
          {
            "label": "Rubro",
            "value": "Chapa y pintura",
            "note": "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas."
          },
          {
            "label": "Agenda",
            "value": "Lunes a Viernes; Sabado, Domingo cerrado",
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
        "title": "Taller SR. Chapa y pintura: el proximo paso es simple",
        "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: chapa y pintura, direccion y horario.",
        "items": [
          {
            "label": "CTA",
            "value": "Consultar reparacion",
            "note": "0351 549-1346"
          },
          {
            "label": "Ubicacion",
            "value": "Juan de Santiso y Moscoso 760, X5000 Córdoba, Argentina"
          },
          {
            "label": "Horario",
            "value": "Lunes a Viernes; Sabado, Domingo cerrado"
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/cordoba-capital-servicios-vehiculares-de-alta-conversion/taller-sr-chapa-y-pintura`
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

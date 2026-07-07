# Site Brief 4: Gomería y auxilio 24 horas Landeyro

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

- id: `google-ChIJ9dpiFKcfkZURJST1CIrToxg`
- slug: `gomeria-y-auxilio-24-horas-landeyro`
- name: Gomería y auxilio 24 horas Landeyro
- category: Car repair and maintenance service
- inferred profile: Gomeria
- requested segment: servicios vehiculares
- city: Tandil
- address: J. M. Dhers 25, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 463-9850
- hours summary: Lunes: Abierto 24 horas
- rating: 4.8 / 5 (176 reseñas)
- service baseline: gomeria

## Suggested Commercial Profile

```json
{
  "tone": "fast-local",
  "customer_type": "Conductores que necesitan resolver una cubierta rapido.",
  "hero_claim": "Cuando una cubierta te frena, el CTA tiene que estar primero.",
  "services": [
    "Cubiertas",
    "Pinchaduras",
    "Auxilio",
    "Atencion 24 horas"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "4.8 / 5",
      "body": "176 resenas registradas en las fuentes disponibles.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Rubro",
      "title": "Gomeria",
      "body": "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas.",
      "meta": "Base verificada"
    },
    {
      "label": "Agenda",
      "title": "Lunes: Abierto 24 horas",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0249 463-9850"
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
      "label": "Pinchadura",
      "title": "Resolver sin perder tiempo",
      "body": "La landing prioriza telefono, ubicacion y el dato de disponibilidad."
    },
    {
      "label": "Cubiertas",
      "title": "Consulta por medida",
      "body": "El copy pide medida y modelo antes de hablar de stock, marca o precio."
    },
    {
      "label": "Auxilio",
      "title": "Llamar primero",
      "body": "CTA de urgencia arriba y bloque de horario visible."
    }
  ],
  "why_choose": [
    {
      "title": "Consulta concreta",
      "body": "Pedir medida, estado y urgencia evita mensajes que no se pueden responder."
    },
    {
      "title": "Confianza local",
      "body": "Rating, resenas y direccion aparecen como prueba rapida."
    },
    {
      "title": "Sin stock inventado",
      "body": "Marcas, medidas disponibles y precios quedan a confirmar."
    }
  ],
  "packages": [
    {
      "name": "Pinchadura",
      "price_label": "Precio a confirmar",
      "body": "Consulta demo para evaluar reparacion o reemplazo.",
      "items": [
        "Estado de la cubierta",
        "Medida",
        "Disponibilidad"
      ],
      "is_demo": true
    },
    {
      "name": "Cambio de cubierta",
      "price_label": "[Presupuesto editable]",
      "body": "Bloque editable para venta o montaje si el local lo confirma.",
      "items": [
        "Medida a consultar",
        "Stock a confirmar",
        "Trabajo en local"
      ],
      "is_demo": true
    },
    {
      "name": "Auxilio",
      "price_label": "[Editable]",
      "body": "Campo para condiciones reales de auxilio.",
      "items": [
        "Ubicacion del vehiculo",
        "Telefono visible",
        "Disponibilidad real"
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
      "label": "Gomeria",
      "title": "Detalle del trabajo",
      "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      "meta": "Foto a reemplazar",
      "is_demo": true
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Contar el problema",
      "body": "Pinchadura, cubierta baja, cambio o consulta por medida."
    },
    {
      "step": "02",
      "title": "Mandar dato clave",
      "body": "Medida, foto o ubicacion si aplica."
    },
    {
      "step": "03",
      "title": "Confirmar disponibilidad",
      "body": "El negocio valida horario, stock o auxilio real."
    },
    {
      "step": "04",
      "title": "Resolver en local",
      "body": "Direccion y contacto quedan listos para ir."
    }
  ],
  "final_cta": {
    "title": "Gomería y auxilio 24 horas Landeyro: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: gomeria, direccion y horario.",
    "primary_label": "Consultar auxilio",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Me atendieron muy rápido y bien. Está las 24 hs abierta. No la conocía, me la recomendaron.
Tuve que dejar el neumático para reparar y al otro día ya estaba listo" — Facundo Velazquez (5/5)
2. "Exelente atención de parte de Darío me solución el problema de la pinchadura de la moto rápido y con eficiencia es muy prolijo en su trabajo 100% recomendable" — Fer Tuzio (5/5)
3. "Muy buena atención
Trabaja feriados, yo fui un domingo. Y tiene muy buenos precios.
El trabajo EXCELENTE" — Mario Treviño (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJ9dpiFKcfkZURJST1CIrToxg/photos/AaVGc3llP_RfL_YjznPRSqmr1ko4WSFosNT9C_mnXLNUGZjvsKGrvRaP3b3Fb_y_Aq5pJgNHOU4IGD4VGJ1-fYQuQn5yjzD3FxRJfa2cVGSpntDAItpk4EaDuVpfFk0g5dztxiDiQ7E-may6HLeHlck7_VdykeV0fpS7EdkWTzaCTnhATYDFd9US3tF940B79AKZH0isD7k8UOd-k1HoaCAk-pB7JN_yVbaIvAUCdYerReNYwjBgY9AMd9fiJAXnwDRb0njP2WFeRFsKA76LxoTFw1pxLhetRbZYrSRQs35dlX9jdCN6E8-tvGINotvE3KhLE7NE71ItHAKUFn34wMJ9Cwz6J-zJ_yjcYGmxG8BhQ0EIGA5OF3EuaJUB6HJ2Z8lBfl20aYHeONj2oEDiYMNm5_4kq-qOSzXVTRM--YDI2I6UKwFm08qDQJeyLT-PJ5ms/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJ9dpiFKcfkZURJST1CIrToxg/photos/AaVGc3ldFCsnOOHhVn5VRd8BID5dMRWU4dwgZMeBk_RthB1XnIruXdijNXyc_HzGkucPHiAZxtwVaQUMFUv7fhkMHHd6IIg_Eii15qNovvqsTGT1RO4qokCFIGbW4ZygVGubguvI3V5d-YepLcoosWA87xteAWCS9aDI1YTCbeo9tKBzEXVPk3c6a2-QdG4P-reXjWEQr35Q5NU1sP8ZuYBXcAFaL5d1KMpRI5-M-y2gPA4WNRqEtQrWv98rxb8McrvkrPxyUH_RM92x4Xw53yJ_H23HbicHO0YWCxoNk4w0r20Im8LrP7EARhLFW2lkk5bEPj-H_82lW5uQiIgHPgjdbcAMSqUuGjNGIT36twFN4yf0YJJl-6K5s2AI50hNTgmYcXggygbyxfwlrorb7a0fz2Erugfy2AQb_SsI2SRnKYeHLg/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJ9dpiFKcfkZURJST1CIrToxg/photos/AaVGc3lVJWvhcJHgalsPvR9ZA9rLW7NpoO4M1Y9b9nEGOdymAishxXjfKd4_YtWLULWJg15ymDUGmArXBUROngNTP72IBk-IatIED9nY9qHId17W6HuvBDIAfzy8EkRzAkMWo_o0zmxnFGFBnOTBu_JbusK0BfrPlIoOpbu2Wo50MWBK78VCEtSiIcAbghmLuCtHyLENcF3El3OTgkC0RWmwL6Ldb_0hUmvn6CxDpF_Urm-XDd7-2Z1r2kNmCaY6C0YjJ-P8nSYsss6H6JE6MxcaMaNINHAeUo8o_BDjJzkX4pKsAWlkpKh_LvX2s5iXj0t__tbJ8t1BoFfEt28R--0OcQYUC0yAD6S79xwLm7ZYHXJmK_RySRjNpxLlktUFrvHauvraBd4MaAvtJcgoaQPCKGhEEMb5qrNHAKzHETK4ZUjYtl0O/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=1775495267923338277&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/108185185838634872860/reviews
- https://www.google.com/maps/contrib/108822080919033194773/reviews
- https://www.google.com/maps/contrib/103278932373762639400/reviews

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
  "business_id": "google-ChIJ9dpiFKcfkZURJST1CIrToxg",
  "slug": "gomeria-y-auxilio-24-horas-landeyro",
  "visual_mood": "roadside-urgent",
  "composition": "route-card",
  "headline": "Landeyro: gomería y auxilio 24 horas",
  "subheadline": "Gomería en J. M. Dhers 25 con atención 24 horas de lunes a sábado y reseñas que hablan de rapidez.",
  "primary_cta": "Consultar auxilio",
  "secondary_cta": "Ver datos",
  "service_tags": [
    "Gomería",
    "Auxilio",
    "Pinchaduras",
    "24 horas"
  ],
  "proof_points": [
    "4.8 sobre 5 con 176 reseñas",
    "24 horas de lunes a sábado",
    "J. M. Dhers 25, Tandil",
    "Reseñas mencionan feriados, domingos y reparación rápida"
  ],
  "resource_title": "Datos críticos para una cubierta que no espera",
  "resource_items": [
    "Teléfono en primer plano.",
    "Horario 24 horas destacado con domingo parcial.",
    "Ubicación exacta para llegar o pedir auxilio."
  ],
  "review_heading": "Rapidez y disponibilidad",
  "contact_heading": "Llamar o llegar al local",
  "image_prompt": "Escena editorial realista para gomería y auxilio 24 horas en Tandil, cubierta, herramientas y local de ruta, sin texto ni logos inventados.",
  "design_notes": "Landing de auxilio con estética vial y tarjetas de decisión rápida.",
  "commercial": {
    "tone": "fast-local",
    "customer_type": "Conductores que necesitan resolver una cubierta rapido.",
    "hero_claim": "Cuando una cubierta te frena, el CTA tiene que estar primero.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.8 / 5",
        "body": "176 resenas registradas en las fuentes disponibles.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Rubro",
        "title": "Gomeria",
        "body": "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas.",
        "meta": "Base verificada"
      },
      {
        "label": "Agenda",
        "title": "Lunes: Abierto 24 horas",
        "body": "Horario publicado para orientar la primera consulta.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Contacto",
        "title": "Telefono directo",
        "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
        "meta": "0249 463-9850"
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
        "label": "Pinchadura",
        "title": "Resolver sin perder tiempo",
        "body": "La landing prioriza telefono, ubicacion y el dato de disponibilidad."
      },
      {
        "label": "Cubiertas",
        "title": "Consulta por medida",
        "body": "El copy pide medida y modelo antes de hablar de stock, marca o precio."
      },
      {
        "label": "Auxilio",
        "title": "Llamar primero",
        "body": "CTA de urgencia arriba y bloque de horario visible."
      }
    ],
    "why_choose": [
      {
        "title": "Consulta concreta",
        "body": "Pedir medida, estado y urgencia evita mensajes que no se pueden responder."
      },
      {
        "title": "Confianza local",
        "body": "Rating, resenas y direccion aparecen como prueba rapida."
      },
      {
        "title": "Sin stock inventado",
        "body": "Marcas, medidas disponibles y precios quedan a confirmar."
      }
    ],
    "packages": [
      {
        "name": "Pinchadura",
        "price_label": "Precio a confirmar",
        "body": "Consulta demo para evaluar reparacion o reemplazo.",
        "items": [
          "Estado de la cubierta",
          "Medida",
          "Disponibilidad"
        ],
        "is_demo": true
      },
      {
        "name": "Cambio de cubierta",
        "price_label": "[Presupuesto editable]",
        "body": "Bloque editable para venta o montaje si el local lo confirma.",
        "items": [
          "Medida a consultar",
          "Stock a confirmar",
          "Trabajo en local"
        ],
        "is_demo": true
      },
      {
        "name": "Auxilio",
        "price_label": "[Editable]",
        "body": "Campo para condiciones reales de auxilio.",
        "items": [
          "Ubicacion del vehiculo",
          "Telefono visible",
          "Disponibilidad real"
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
        "label": "Gomeria",
        "title": "Detalle del trabajo",
        "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
        "meta": "Foto a reemplazar",
        "is_demo": true
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Contar el problema",
        "body": "Pinchadura, cubierta baja, cambio o consulta por medida."
      },
      {
        "step": "02",
        "title": "Mandar dato clave",
        "body": "Medida, foto o ubicacion si aplica."
      },
      {
        "step": "03",
        "title": "Confirmar disponibilidad",
        "body": "El negocio valida horario, stock o auxilio real."
      },
      {
        "step": "04",
        "title": "Resolver en local",
        "body": "Direccion y contacto quedan listos para ir."
      }
    ],
    "final_cta": {
      "title": "Gomería y auxilio 24 horas Landeyro: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: gomeria, direccion y horario.",
      "primary_label": "Consultar auxilio",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Puesto de auxilio: una landing que funciona como panel de ruta para llamada y llegada.",
    "audience": "Conductores que necesitan reparar una cubierta, dejar un neumático o resolver fuera de horario.",
    "visual_direction": "Contraste vial, tarjetas diagonales, teléfono grande y dirección como coordenada principal.",
    "layout": "roadside-rescue",
    "texture": "road-markings",
    "hero_angle": "La diferencia comercial es disponibilidad: 24 horas de lunes a sábado y reseñas sobre rapidez.",
    "hero_cards": [
      {
        "label": "Horario",
        "value": "24 hs",
        "note": "Lunes a sábado"
      },
      {
        "label": "Rating",
        "value": "4.8",
        "note": "176 reseñas"
      },
      {
        "label": "Dirección",
        "value": "J. M. Dhers 25",
        "note": "Tandil"
      }
    ],
    "sections": [
      {
        "type": "quick-actions",
        "eyebrow": "Auxilio",
        "title": "La página resuelve el primer minuto de la urgencia.",
        "body": "Muestra teléfono, dirección y horario antes de cualquier bloque secundario.",
        "items": [
          {
            "label": "Teléfono",
            "value": "0249 463-9850"
          },
          {
            "label": "Ubicación",
            "value": "J. M. Dhers 25"
          },
          {
            "label": "Domingo",
            "value": "8:00 a 14:00"
          }
        ]
      },
      {
        "type": "quote-strip",
        "eyebrow": "Prueba",
        "title": "“Me atendieron muy rápido y bien.”",
        "body": "En una gomería de auxilio, rapidez y disponibilidad valen más que un texto largo.",
        "items": [
          {
            "label": "Feriados",
            "value": "Mencionados en reseñas"
          },
          {
            "label": "Trabajo",
            "value": "Excelente según cliente"
          }
        ],
        "callout": "La landing empuja a llamar, no a navegar."
      },
      {
        "type": "process",
        "eyebrow": "Ruta",
        "title": "Llamar, dejar el neumático, seguir viaje.",
        "body": "La estructura se apoya en una reseña concreta donde el neumático quedó listo al día siguiente.",
        "items": [
          {
            "label": "1",
            "value": "Consultar"
          },
          {
            "label": "2",
            "value": "Coordinar reparación"
          },
          {
            "label": "3",
            "value": "Retirar o seguir viaje"
          }
        ]
      }
    ]
  },
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/tandil-servicios-vehiculares/gomeria-y-auxilio-24-horas-landeyro",
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/tandil-servicios-vehiculares/gomeria-y-auxilio-24-horas-landeyro`
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

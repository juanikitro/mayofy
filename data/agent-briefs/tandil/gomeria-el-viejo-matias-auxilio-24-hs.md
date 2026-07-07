# Site Brief 8: Gomería El Viejo Matias - Auxilio 24 hs

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

- id: `google-ChIJAwmJ8ZwfkZURyusZGKQR2fs`
- slug: `gomeria-el-viejo-matias-auxilio-24-hs`
- name: Gomería El Viejo Matias - Auxilio 24 hs
- category: Car repair and maintenance service
- inferred profile: Gomeria
- requested segment: servicios vehiculares
- city: Tandil
- address: Av. Rivadavia 799, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 424-3685
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 4.7 / 5 (328 reseñas)
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
      "title": "4.7 / 5",
      "body": "328 resenas registradas en las fuentes disponibles.",
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
      "title": "Lunes a Sabado; Domingo cerrado",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0249 424-3685"
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
    "title": "Gomería El Viejo Matias - Auxilio 24 hs: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: gomeria, direccion y horario.",
    "primary_label": "Consultar auxilio",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Cool" — Melissa Crescente (4/5)
2. "Muy buena atención, y honestos, además, si le gustan los animales, son buena gente, lastima que no me acuerdo el nombre del Salchi negro, pero es muy macanudo, igual que los dueños de la gomeria" — Sebastian Caresani (5/5)
3. "Excelente servicio, muy atentos y rápidos para resolver" — Ramiro Diez (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJAwmJ8ZwfkZURyusZGKQR2fs/photos/AaVGc3nW2aJbBbGu7tl1UWqbzPTV81pK74Mr-ZCa2ugiWF_b5HwROMBTpDs6VxGynNIj9Amu4srAEMkzBqduDQoXt4h2FkXySTpD_g0OKzjL7sPbKTQhf38A_F5PluP94shxlh4cvk4KjCyTND_4ztkJ4aTwtY5DJtKXmYlYLFR3ZtHb6UVNywYFAlRcGW68nYKfZjiHlof4bKgAjbS69f1Om3GsB0QQ4gj49ZyH_ShZ6BU4jj3sFiBXLGgI5OvYeKpBQM-RcnFNHKH2dJfbzqHhFPPv2Ky7t9DP4PXbnRMFluf2_W64TP-8itu_JE8zyngTLNVKJqA5CobXVEosd7IeR1b-4Cy92U_QvW9dP2pJkgVb0oQpFWASPPdCeHQbhPxpDYF3wf17ylVv6PgfyHwzOQfR-1sKqUXlhd56F8VOiCw/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJAwmJ8ZwfkZURyusZGKQR2fs/photos/AaVGc3moE22wSCyxfFbmvQEoybSUYwbUyZaervSqkzAZJHIHqGayLRchYqYONFgv4TPJlLw3BpHvqUAghAyKZqlJf7dC3QAUiUWeJISrHuJUXLWreUVJe9uRa0lHyaKWKQSxl27-CAKEniPfCy9aYzD9rqLUDrwz1UhkOp5DUJ4xn-ALGCMg87vrWIl3Z1r_A7MlZHWKWC35ORy8E5Zey2AGyZgtETAZ5EYmnA8vhs3FL3uoEsYS47M7Ru3shjMWAtdawBVmC5ePtzPtgfXkl4kb8PkdFPrlZ-DaqdIaL1WjcdFI5vED1RLqa0yckMdFA5z9kXXAxNl1zOg1aLTQ70EDzES3fa54jbJiJiMhwFTwWv6YtweQfMgXOlClE1UMEJ1sP2EJFl535kx_qv6nxd0-Z16sq9O-OdlCz-WRqtayUBaAJLA/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJAwmJ8ZwfkZURyusZGKQR2fs/photos/AaVGc3lBzYOoI3_9FT9o82hCgXaxce5LCPCt5e3fewgUxtSePADf5NTkSgNdecKemXvwSZZ8LcNTopBrbNKR702RxG_qk9U9Np39x3xdQlCUqFnO8Ll_ExgNZ_5mQ3t7EE_PNBrsLiwuGB1hjMH9_wOoXm2AqGfTD_7mr4bwhi6mW9KeKZ6IIb2aWAt1cYJ8N35UNB8C3lXNoG43Tg801ARljE3e0kVv_YiNbZpdjRFydoh5eSmYj3VxJkagpxC10Z4UWvOqpae9RDDVrVSutsbjCW2A6D6entHoMPUuQg8eSlpUq49uf4R9iZP-JzGXyXtPYiQc-bGy-r_-ULZlfCy4G3fRA569-vNfSyuwmh0-rWNArqvW7I5upJfugdWKxdYx5Qlcq56XoHyZikkpvBJEYcJwr-9nt8-SoO29JaxDdHhFqQ/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=18147555569942784970&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/109387220208276783035/reviews
- https://www.google.com/maps/contrib/107892723580353262726/reviews
- https://www.google.com/maps/contrib/100514625051061215817/reviews

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
  "business_id": "google-ChIJAwmJ8ZwfkZURyusZGKQR2fs",
  "slug": "gomeria-el-viejo-matias-auxilio-24-hs",
  "visual_mood": "neighborhood-direct",
  "composition": "service-ledger",
  "headline": "El Viejo Matias",
  "subheadline": "Gomeria en Av. Rivadavia 799 con muchas reseñas, telefono visible y horario registrado de lunes a sabado.",
  "primary_cta": "Llamar a la gomeria",
  "secondary_cta": "Ver horario",
  "service_tags": [
    "Gomeria",
    "Auxilio en el nombre",
    "Atencion local",
    "Consulta por telefono"
  ],
  "proof_points": [
    "4.7 sobre 5 con 328 reseñas",
    "Av. Rivadavia 799, Tandil",
    "Horario registrado de lunes a sabado",
    "Reseñas mencionan rapidez, atencion y honestidad"
  ],
  "resource_title": "Una gomeria barrial con datos de contacto sin vueltas",
  "resource_items": [
    "Telefono visible desde el primer bloque.",
    "Horario real mostrado sin afirmar disponibilidad no verificada.",
    "Reseñas publicas con foco en atencion y rapidez."
  ],
  "review_heading": "Atencion y rapidez mencionadas",
  "contact_heading": "Consultar por cubierta o auxilio",
  "image_prompt": "Escena editorial realista para gomeria local en Tandil, cubiertas, herramientas y frente de taller, sin texto ni logos inventados.",
  "design_notes": "Landing de gomeria local: directa, con energia de taller de barrio y sin prometer 24 hs como disponibilidad.",
  "commercial": {
    "tone": "fast-local",
    "customer_type": "Conductores que necesitan resolver una cubierta rapido.",
    "hero_claim": "Cuando una cubierta te frena, el CTA tiene que estar primero.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.7 / 5",
        "body": "328 resenas registradas en las fuentes disponibles.",
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
        "title": "Lunes a Sabado; Domingo cerrado",
        "body": "Horario publicado para orientar la primera consulta.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Contacto",
        "title": "Telefono directo",
        "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
        "meta": "0249 424-3685"
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
      "title": "Gomería El Viejo Matias - Auxilio 24 hs: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: gomeria, direccion y horario.",
      "primary_label": "Consultar auxilio",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Gomeria de barrio: llamada rapida, direccion clara y prueba social por volumen de reseñas.",
    "audience": "Conductores que necesitan resolver una cubierta o consultar auxilio durante el horario publicado.",
    "visual_direction": "Panel de taller barrial, contraste de ruta suave, foto real y telefono como accion principal.",
    "layout": "roadside-rescue",
    "texture": "road-markings",
    "hero_angle": "Aunque el nombre menciona auxilio 24 hs, la landing muestra el horario verificado y empuja a llamar para confirmar.",
    "hero_cards": [
      {
        "label": "Rating",
        "value": "4.7",
        "note": "328 reseñas"
      },
      {
        "label": "Direccion",
        "value": "Av. Rivadavia 799",
        "note": "Tandil"
      },
      {
        "label": "Horario",
        "value": "Lunes a sabado",
        "note": "Domingo cerrado"
      }
    ],
    "sections": [
      {
        "type": "quick-actions",
        "eyebrow": "Consulta",
        "title": "Si hay una cubierta de por medio, el telefono tiene que estar primero.",
        "body": "La pagina evita vueltas: llamada, direccion y horario real para confirmar antes de moverse.",
        "items": [
          {
            "label": "Telefono",
            "value": "0249 424-3685"
          },
          {
            "label": "Direccion",
            "value": "Av. Rivadavia 799"
          },
          {
            "label": "Horario",
            "value": "Lunes a sabado"
          }
        ],
        "callout": "No se afirma disponibilidad 24 hs: se muestra lo verificado y se invita a llamar."
      },
      {
        "type": "quote-strip",
        "eyebrow": "Resenas",
        "title": "“Excelente servicio, muy atentos y rapidos para resolver.”",
        "body": "La cita funciona porque habla del criterio que mas importa en una gomeria: resolver sin demora.",
        "items": [
          {
            "label": "Atencion",
            "value": "Muy buena segun reseñas"
          },
          {
            "label": "Confianza",
            "value": "Honestidad mencionada"
          }
        ]
      },
      {
        "type": "process",
        "eyebrow": "Paso a paso",
        "title": "Llamar, explicar la situacion y coordinar el proximo movimiento.",
        "body": "La estructura acompaña una decision practica y local, no un recorrido largo de lectura.",
        "items": [
          {
            "label": "1",
            "value": "Llamar"
          },
          {
            "label": "2",
            "value": "Contar el problema"
          },
          {
            "label": "3",
            "value": "Confirmar horario o llegada"
          }
        ]
      }
    ]
  },
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/tandil-servicios-vehiculares/gomeria-el-viejo-matias-auxilio-24-hs",
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/tandil-servicios-vehiculares/gomeria-el-viejo-matias-auxilio-24-hs`
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

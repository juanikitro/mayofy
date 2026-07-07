# Site Brief 1: Autocentro CarDetail

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

- id: `google-ChIJWVVlan-jMpQRYjdNl9aOKds`
- slug: `autocentro-cardetail`
- name: Autocentro CarDetail
- category: negocio local
- inferred profile: Detailing y estetica vehicular
- requested segment: servicios vehiculares de alta conversion
- city: Cordoba Capital
- address: Puvr Olimpia 1851, X5000 Córdoba, Argentina
- phone: 0351 15-265-8259
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 5 / 5 (92 reseñas)
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
      "title": "5.0 / 5",
      "body": "92 resenas registradas en las fuentes disponibles.",
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
      "meta": "0351 15-265-8259"
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
    "title": "Autocentro CarDetail: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: detailing y estetica vehicular, direccion y horario.",
    "primary_label": "Reservar turno",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Facu y Mauri dejaron mi auto impecable! Lo hicieron en menos tiempo del que me dijeron.  Siempre atentos y profesionales. Muy contenta con el resultado. Mi auto está más lindo que nunca.  Listo para su próximo dueño" — Maria del Rosario Castro Tomassini (5/5)
2. "Excelente atención,  muy bien el trabajo , muy conforme, gracias!!" — Victor Hugo Ponce (5/5)
3. "Excelente los trabajos que realizan,  lleve 3 autos y quedaron espectaculares.  La atención de Mauricio y los chicos es de primera. Super recomendable 👌" — Francisco Achaval (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJWVVlan-jMpQRYjdNl9aOKds/photos/AaVGc3ny2VURA9xY6yYOD466K6ZooSppSJE5ertmCB-JNrRFRAmXHCiI9nPo3O3ENfiPbs1pGEGMpq45uXZQANe3LsGosIy_wiXlrkvApZ-BigcWNqrmru6qT6hO_3MKPM4b3D7Gibb6Z1n8IZV270SomTiOGjQkuV3TXre_5amfJvsrmchv9o8qqMvSEmek2X5TKqfcwer1syiCyjmHwn5-yUwzPYzVg0O7TBq5aeqxPdpUqjKcbenvvaq7EILHnpphAF_knrhmJE-DkxWg4djSj-Omea1BcdTITJqniuVM1j1HPLe30Oz7NMs1r7CO-999tS5w7CAxTGmfre2HKWjlbFhtQvURUNxb-YYSp0UAx_4v_Qw41DFXynSGzEJbYGOXSsXeczgkrjOU44rUsi7N_B8xG2X_Q9CwikHZoeFB9XqHrA/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJWVVlan-jMpQRYjdNl9aOKds/photos/AaVGc3mnRnoZvNGRr3cBt-q71kFbVq56R7nyTcz6tm0kJFXak-WhubBlbH7uznJOO3a07T2XjXvHMSQ5tqYjW0pomWCaOhGW0GNezY2z-qmagE4owu5TZjqjt-kb1eUaDKTMlrjtadRUzLkzZ3u5i87lLnM35EXEDxeDVixSCkcuEK1LIM57KnGRCl4-ns7aVLTedZR8uzsQ-DAVvP-pUjLEduTAHiCMCv5hYMz4qecaX-RKZCsOr412QRUk1NRB9rLrFJonMnxBNAl8bXS-bEELX1GZwxfVGy-b6pIyGrXieEuWmmgPSmIopyn__eMy7eZWUjUPhcu-BO6ZFpDYXJgaJoWFI-6SKzDDG-J24qewdqY8dVSbNoQPPh_ck-5gvUkKSGw3ogGMDLVPjZ-hqFncjQUw37UfHKVcVZDmRBzNguNj73kiTId4Q3cxsx_L8UEL/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJWVVlan-jMpQRYjdNl9aOKds/photos/AaVGc3lC9UFGk6IotFURrxMsBaOuuh5YwPhatwIQnzOpLSOrFNU4cW8voVz-Yefbao--f4eipgENNTTnWtMU_kLIEcitr9Kf8jES6cFA4iNkXzASEMGE8DKpVXklRgDy83k17CD5rBTorSgafzgs6gXTZcwnbf8C7Rho_0e-7mg9zokSP6Ms0EmVUC8q8Gs7qArNWb3nkuFEcM2Ajy64W4gs4WVQKZ38zXlSfUC1oZlE1AiGl1KdP2rmW0LE8nkzhB6W1LSvJ9FwfreL5Obms414XUkjJBvxsQLSVQq3OKzfKlI1wpjMSp6R7NjFvUXRCzkgCaJbG1prst-kp__bntR9ADTPWh4gt8PzPbSKQ8GM-YE2Q6Z2KZqGqvdiVrNaJ_WzBYIpk7Y9uOVYZ1ImlhIkiv8PCmgF8PVUJdEDyzI771QkWFp16KiSZyBYpli4l5Zo/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=15792310620663920482&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/107060537356117623166/reviews
- https://www.google.com/maps/contrib/113857557393304799770/reviews
- https://www.google.com/maps/contrib/105254022738435117382/reviews

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
  "business_id": "google-ChIJWVVlan-jMpQRYjdNl9aOKds",
  "slug": "autocentro-cardetail",
  "visual_mood": "neighborhood-direct",
  "composition": "split-command",
  "headline": "Autocentro CarDetail",
  "subheadline": "Que el auto vuelva a sentirse cuidado, limpio y listo para mirar de cerca. Detailing y estetica vehicular en Tandil con contacto, horarios, ubicacion y referencias publicas arriba del pliegue.",
  "primary_cta": "Reservar turno",
  "secondary_cta": "Ver ubicacion",
  "service_tags": [
    "Detailing",
    "Interior",
    "Exterior",
    "Proteccion o consulta"
  ],
  "proof_points": [
    "5.0 sobre 5 con 92 reseñas",
    "Horario: Lunes a Sabado; Domingo cerrado",
    "Direccion: Puvr Olimpia 1851, X5000 Córdoba",
    "Reseñas que destacan: \"Facu y Mauri dejaron mi auto impecable! Lo hicieron en menos tiempo del que me dijeron.  Sie...\""
  ],
  "resource_title": "Servicios pensados para que el auto se note",
  "resource_items": [
    "Hero emocional, servicios claros y CTA de turno.",
    "Paquetes demo editables para subir el valor percibido sin falsear precios.",
    "Horario registrado: Lunes a Sabado; Domingo cerrado."
  ],
  "review_heading": "Lo que valoran quienes ya fueron",
  "contact_heading": "Llegar o llamar sin vueltas",
  "image_prompt": "Escena editorial realista para lavadero o estudio de detailing en Tandil, auto limpio, agua, espuma y terminaciones cuidadas, luz natural, sin texto, sin logos inventados.",
  "design_notes": "Mood neighborhood-direct, composicion split-command, tono comercial premium-detailing. Evitar estetica SaaS generica; usar recursos visuales del rubro detailing y estetica vehicular, direccion, prueba social, paquetes editables y CTA de turno.",
  "commercial": {
    "tone": "premium-detailing",
    "customer_type": "Personas que cuidan el auto, quieren recuperar brillo, proteger terminaciones o reservar un lavado detallado.",
    "hero_claim": "Que el auto vuelva a sentirse cuidado, limpio y listo para mirar de cerca.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "5.0 / 5",
        "body": "92 resenas registradas en las fuentes disponibles.",
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
        "meta": "0351 15-265-8259"
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
      "title": "Autocentro CarDetail: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: detailing y estetica vehicular, direccion y horario.",
      "primary_label": "Reservar turno",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar."
  },
  "creative": {
    "concept": "Que el auto vuelva a sentirse cuidado, limpio y listo para mirar de cerca. Direccion comercial para Personas que cuidan el auto, quieren recuperar brillo, proteger terminaciones o reservar un lavado detallado.",
    "audience": "Personas que cuidan el auto, quieren recuperar brillo, proteger terminaciones o reservar un lavado detallado.",
    "visual_direction": "Automotor premium, textura brillante, espacios amplios, antes/despues y servicios empaquetados.",
    "layout": "studio-detail",
    "texture": "polished-glass",
    "hero_angle": "Que el auto vuelva a sentirse cuidado, limpio y listo para mirar de cerca.",
    "hero_cards": [
      {
        "label": "Prueba social",
        "value": "5.0 / 5",
        "note": "Dato verificado"
      },
      {
        "label": "Rubro",
        "value": "Detailing y estetica vehicular",
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
        "note": "0351 15-265-8259"
      }
    ],
    "sections": [
      {
        "type": "service-board",
        "eyebrow": "Servicios",
        "title": "Servicios pensados para que el auto se note",
        "body": "La landing debe vender resultado visual y reserva de turno, apoyada en datos reales y placeholders editables.",
        "items": [
          {
            "label": "Interior",
            "value": "Habitaculo con sensacion de estreno",
            "note": "Copy pensado para vender limpieza profunda, orden visual y confort sin inventar tratamientos no verificados."
          },
          {
            "label": "Exterior",
            "value": "Brillo y terminacion visible",
            "note": "Bloque preparado para lavado detallado, descontaminado o correccion si el negocio lo confirma."
          },
          {
            "label": "Proteccion",
            "value": "Cuidado despues del lavado",
            "note": "Espacio editable para ceramicos, selladores o mantenimiento cuando existan datos reales."
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
            "value": "Contar el estado del auto",
            "note": "El cliente consulta por interior, exterior o detalle puntual."
          },
          {
            "label": "02",
            "value": "Elegir nivel de trabajo",
            "note": "La pagina propone paquetes editables y deja claro que el precio se confirma."
          },
          {
            "label": "03",
            "value": "Reservar turno",
            "note": "CTA directo a telefono o WhatsApp cuando esta disponible."
          },
          {
            "label": "04",
            "value": "Registrar resultado",
            "note": "Bloque de galeria listo para cargar fotos reales del trabajo terminado."
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
            "value": "5.0 / 5",
            "note": "92 resenas registradas en las fuentes disponibles."
          },
          {
            "label": "Rubro",
            "value": "Detailing y estetica vehicular",
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
        "title": "Autocentro CarDetail: el proximo paso es simple",
        "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: detailing y estetica vehicular, direccion y horario.",
        "items": [
          {
            "label": "CTA",
            "value": "Reservar turno",
            "note": "0351 15-265-8259"
          },
          {
            "label": "Ubicacion",
            "value": "Puvr Olimpia 1851, X5000 Córdoba, Argentina"
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/cordoba-capital-servicios-vehiculares-de-alta-conversion/autocentro-cardetail`
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

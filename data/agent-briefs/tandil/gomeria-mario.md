# Site Brief 6: Gomeria mario

## Goal

Write or refine one `SiteSpec` for this business. Use the agent session context and judgement. Do not call the OpenAI API from repo scripts.

## Hard Rules

- Use only verified data below.
- Do not invent services, years, awards, guarantees, prices, certifications, owners, staff, or claims.
- Visible copy must be Spanish argentino, natural, local, commercial, and not exaggerated.
- Avoid generic filler like "soluciones integrales", "calidad garantizada", "experiencia unica", "creado con IA".
- Keep the business name isolated to this one site.
- Make the page feel designed for "servicios vehiculares" in Tandil, not like a SaaS template.

## Business Snapshot

- id: `google-ChIJL51RDSEfkZURlmL_ISmpXCU`
- slug: `gomeria-mario`
- name: Gomeria mario
- category: Car repair and maintenance service
- inferred profile: Gomeria
- requested segment: servicios vehiculares
- city: Tandil
- address: Sandino 530, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 15-430-9406
- hours summary: Lunes a Viernes; Sabado, Domingo cerrado
- rating: 4.9 / 5 (67 reseñas)
- service baseline: gomeria

## Useful Real Signals

### Reviews

1. "Mario crack" — Camilo Fernandez (5/5)
2. "Exelente atención y muy buena onda , Mario un genio" — Rodrigo ramos varela (5/5)
3. "Excelente atención Mario! Gracias!
Muy amable, rápido, buen precio y se puede transferir! Muy recomendable!!" — RO (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJL51RDSEfkZURlmL_ISmpXCU/photos/AaVGc3lToifcsWC_trDveM1XfnNp1Ij8lrbAD0UvAAroNkawbZdGgVhOuj_vsosBPCabUaOoyq_fx8wJEHqlCXYhV8ygnM3PBxfnMPkDs89wAPy5jfjom4v3JSS0s8HkJl-d6U1bS9Ie9NnqApBBw5xWlcxBSBTG5FyeuYEf0E1puYvrNIDWCtEnGKXQAfd4NofMoVGdqYlR4LNG3oXcw6JMVLZtlH7rH52A3KwmgMndhibyfP3i99swoMjQ8xcgA1TglPgTLu3YzuIr3Ew5W0N-GyT9OJafxEO-L070W-dE7GnFsTAlxEngWNIMfgPmE6R8YjHfVkhBIvqZ8HT1CgqoSrmb-3B20aMYWAmZn_e1J_3FvD548I3SVRyhBf8YN5i8__H7SXqcjlzDZ_1dXTDxYoPceAquVJOVA_np3F2UfGg/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJL51RDSEfkZURlmL_ISmpXCU/photos/AaVGc3mZTYYxWVtSLMqRW4lki4ldy9Yq9y-JjrvtO8ZSKVHujV2jbCkLrv8tfF_MPlP7VzWAeOA48XZMpN8MDzlJlv0hm1vnN-mozCz6dXbz6eC_o69C9u8N26VHdDtHlrgWPNREblpcW_xTORvT6Xj5Yv2Lmya70PJWGKsuE8zgY9y6S9uDGiDBOY0HPSaGt9H95pPXVZc2Q9J-VZB6Qb-pm3ZG6J11U80LFZXTnznUoqsqqh8okB7lznAuHS9gPvLmhOK4xR9Qk4gm-bmfU1IvLIs_B_Gp8vKgYgFxxQzC7Fz9O9NllZSIIeiofup_9BycQBYmzlrn6jhCNKA-rF7MulZjmzPGWttoPXOS9HLLqXv6rYB0JVMLZYVqJtbA_30zpk03DROQ2hrJV_400etlUTh4PUixcviNWjEYboiOry6vYg/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJL51RDSEfkZURlmL_ISmpXCU/photos/AaVGc3nWoWaOBwSCgBs5o3d8d_LgYuKWsjNBKXo0obfxC9Z01eDzXpl1L2gUpv1Qa0SwRSZZKF0-Q-n519fyNC4eNtGrk8RBpvqw6kEiBOCP2C_y93UGTe3G2nq9dD2rdk-trWPTakIv4mVM9nuK8PZz16_xYviKdLvPJDld63ZR9F0DHzncoUkF6m0S_eKH1m1cJ232w__UZ-UgqLyBRnk52JPPPFFjWX1HgAnRWzmH7LwArXbxTHyv3oVWf014iQHFFW9lg4lUchlpPO--QbCEHgW_H_7DcyGgVHBhf4uhGvy9yETm41dPJFpblovQsrd0BFC3tGhR3VzAGCiCKYwqRkCygB2o-mGXAub5EP-s3BYuqqxxGVoN64kFw0pSJH85LaK7q99ipNHfpTfEnao6dC3KYdsiyv703omm2L7IF1ys2Q/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=2692212671389852310&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/108669108252853520757/reviews
- https://www.google.com/maps/contrib/117657003879021708537/reviews
- https://www.google.com/maps/contrib/113713576705171469529/reviews

## Recommended Design Direction

- Use automotive/local-service cues: route, workshop, tires, urgency, practical contact, opening hours, location.
- Prefer concrete microcopy based on the signals above.
- Vary `visual_mood` and `composition` across the 10 sites.
- Avoid repeating the same hero rhythm, proof order, and CTA wording from nearby briefs.

## Current Spec, If Any

```json
{
  "business_id": "google-ChIJL51RDSEfkZURlmL_ISmpXCU",
  "slug": "gomeria-mario",
  "visual_mood": "roadside-urgent",
  "composition": "split-command",
  "headline": "Gomeria mario",
  "subheadline": "Gomeria en Tandil con datos concretos para decidir rapido: contacto, horarios, ubicacion y referencias publicas.",
  "primary_cta": "Consultar disponibilidad",
  "secondary_cta": "Ver datos del local",
  "service_tags": [
    "Cubiertas",
    "Pinchaduras",
    "Balanceo y consulta",
    "Atencion en local"
  ],
  "proof_points": [
    "4.9 sobre 5 con 67 reseñas",
    "Horario: Lunes a Viernes; Sabado, Domingo cerrado",
    "Direccion: Sandino 530, B7000 Tandil",
    "Reseñas que destacan: \"Exelente atención y muy buena onda , Mario un genio\""
  ],
  "resource_title": "Para resolver cubiertas sin perder tiempo",
  "resource_items": [
    "Direccion visible para llegar directo al local.",
    "Telefono disponible para consultar antes de ir.",
    "Horario registrado: Lunes a Viernes; Sabado, Domingo cerrado."
  ],
  "review_heading": "Lo que valoran quienes ya fueron",
  "contact_heading": "Llegar o llamar sin vueltas",
  "image_prompt": "Escena editorial realista para gomeria en Tandil, fachada de local barrial, herramientas y cubiertas, luz natural, sin texto, sin logos inventados.",
  "design_notes": "Mood roadside-urgent, composicion split-command. Evitar estetica SaaS generica; usar recursos visuales de ruta, taller, cubiertas, direccion y prueba social."
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

# Site Brief 3: Gomería El Viejo Matias - Auxilio 24 hs

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

## Useful Real Signals

### Reviews

1. "Cool" — Melissa Crescente (4/5)
2. "Muy buena atención, y honestos, además, si le gustan los animales, son buena gente, lastima que no me acuerdo el nombre del Salchi negro, pero es muy macanudo, igual que los dueños de la gomeria" — Sebastian Caresani (5/5)
3. "Excelente servicio, muy atentos y rápidos para resolver" — Ramiro Diez (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJAwmJ8ZwfkZURyusZGKQR2fs/photos/AaVGc3lwdtidpZg0Bk5P_Z5m8MUu8pYv7rifIBg1upQZ8LlDW4JYucMikv6AulYKazmaZ18AR3sw8nn-95pjkCF_Epb3HPRlFze5VTk4wPHjwSQHp14jdue_gYP8naJ0zjkalDIKiYnp39ohisow-CEj8xpjrFSo92-judQqNCJi3d9N-MIHGCL5wN2h-qmlshj8pKz7kmqdDSgRko_0r-3fbejhAhSHW8yER_Oc3trlenfkznk7PLITYXlpywyDxI_MeJPUbt_oOYSdcmNM61_RTjifAv23R_YiXsnS9fMqD9bvgp6gJFQZmEdAGsk54fBmsT6fHjMLzMIe6QwVzJiamIjaXUrYIQDvMBXSf7yDD8cexlIc-9G4kHjWAyeha61AwsXZbOTw_RokOv1qXcOeKHwhkX2_K6313UZXpIuM8Os/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJAwmJ8ZwfkZURyusZGKQR2fs/photos/AaVGc3l_TmJXsGg0XuOmzj5IruKUnlYrjSMKN7hSgqKcJl4wMxAU6zcA0hyicHBV90QtEh8wAyuyRCrVwtiykSdeTRlWYOvjRnkdlemUxMj15wOLlcIElIaIxH6RwjEZU1sU2cO0iiQj4reWWAXiGRzKinZ53KxfY6pb3XwVAVpOFWkD1uhiWLeq7KHyoJ5RR2CenKLpPB56ve_nIWgpyx5IUdIXcU6HgX0A1SrGHNxpgWAaChqj2-KMMfSOEaYDtf8zdnrlGM-IQk-XFSdjK9Iq06rLcEm0Q0zB9RHkIG95_4cEpLzDJL1LaJI05RinjEcMJons4rkQLOzBI3dn5CqgTyhzuXD-LLYXPXRRtKDiuthFDLrKPrPjNG5zKZBXCwGOZ_MZ-8Ch6WAVnPpjJ55HOKgWcFCgCsZD2yxWmusOX4TEQUI/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJAwmJ8ZwfkZURyusZGKQR2fs/photos/AaVGc3lIem7e3lLzlzIOTl9-wW2iieRB8kIP9ZT7HlpQlRIfcNOK1MP670zDyYta9YwSSu8v2yk8fyN-ZXgVSs7WcQO3sRYNG9HfTX1MV78MtxwCfSIxoLJ6EsiqoK3MCou6AIeUbvB63ZsYul36p3xHUx4Iq60T5S7rLcVhfbWjROtM8wpEuExD3PdcYsgdWk5LSDL3EtVsWkE2Jbuq4hm4ognNGLRJi8smFRTg9m5LSS0YKPIudlxEf-52aFxY5PU1o33bYVVPCd_LlPowlx4h2SUGQkDTPVvoGMDJZ92INvV2nEa_M8k73v7xL3lCFxqDBvs8K6qrQNCBJMq0GWmABRUyDaOcMourguj5iQvwAu4Xp1ZprR98rRiM11OWvpBFr3q3tQh_TWFf9ci-edip5lGP9ReXc6r06QoYFm3WO4dElA/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=18147555569942784970&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/109387220208276783035/reviews
- https://www.google.com/maps/contrib/107892723580353262726/reviews
- https://www.google.com/maps/contrib/100514625051061215817/reviews

## Recommended Design Direction

- Use automotive/local-service cues: route, workshop, tires, urgency, practical contact, opening hours, location.
- Prefer concrete microcopy based on the signals above.
- Vary `visual_mood` and `composition` across the 10 sites.
- Avoid repeating the same hero rhythm, proof order, and CTA wording from nearby briefs.

## Current Spec, If Any

```json
{
  "business_id": "google-ChIJAwmJ8ZwfkZURyusZGKQR2fs",
  "slug": "gomeria-el-viejo-matias-auxilio-24-hs",
  "visual_mood": "roadside-urgent",
  "composition": "route-card",
  "headline": "Gomería El Viejo Matias - Auxilio 24 hs",
  "subheadline": "Gomeria en Tandil con datos concretos para decidir rapido: contacto, horarios, ubicacion y referencias publicas.",
  "primary_cta": "Consultar auxilio",
  "secondary_cta": "Ver datos del local",
  "service_tags": [
    "Cubiertas",
    "Pinchaduras",
    "Auxilio",
    "Atencion 24 horas"
  ],
  "proof_points": [
    "4.7 sobre 5 con 328 reseñas",
    "Horario: Lunes a Sabado; Domingo cerrado",
    "Direccion: Av. Rivadavia 799, B7000 Tandil",
    "Reseñas que destacan: \"Muy buena atención, y honestos, además, si le gustan los animales, son buena gente, lastima ...\""
  ],
  "resource_title": "Para resolver cubiertas sin perder tiempo",
  "resource_items": [
    "Direccion visible para llegar directo al local.",
    "Contacto util para urgencias y auxilios.",
    "Horario registrado: Lunes a Sabado; Domingo cerrado."
  ],
  "review_heading": "Lo que valoran quienes ya fueron",
  "contact_heading": "Llegar o llamar sin vueltas",
  "image_prompt": "Escena editorial realista para gomeria en Tandil, fachada de local barrial, herramientas y cubiertas, luz natural, sin texto, sin logos inventados.",
  "design_notes": "Mood roadside-urgent, composicion route-card. Evitar estetica SaaS generica; usar recursos visuales de ruta, taller, cubiertas, direccion y prueba social."
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

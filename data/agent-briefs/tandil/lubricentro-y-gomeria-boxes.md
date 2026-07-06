# Site Brief 7: Lubricentro y Gomeria BOXES

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

- id: `google-ChIJzZSnpU4hkZURfE9Ok88wjqc`
- slug: `lubricentro-y-gomeria-boxes`
- name: Lubricentro y Gomeria BOXES
- category: Car repair and maintenance service
- inferred profile: Gomeria
- requested segment: servicios vehiculares
- city: Tandil
- address: Ameghino 898, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 443-7843
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 4.7 / 5 (44 reseñas)
- service baseline: lubricentro

## Useful Real Signals

### Reviews

1. "Espetacular la atención recomendable cien por ciento." — Marcelo Cabrera (5/5)
2. "Excelente atención siempre con toda la onda!" — Nicolas “Nekoo Wilson” Davalo (5/5)
3. "Excelente atención, muy buenos precios" — Jorge Ferreira (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJzZSnpU4hkZURfE9Ok88wjqc/photos/AaVGc3mun6bYeXFXd0fLw_P6wBjfbetgEkhIXVSU0QMg3vaSZMmwlDLOfeQ5mj4ZBY79zjXFoPKW6zq-w9171XWscz5YHqlv6w4jNxYutp8mBLSP7Qh8wquMaAOxknS1xV8PmpWcodJqwwWuE7mfX3v1-2EnNngiZwSC6_idw5YyzZ8jNzw7sPLn5LRGSlznvy2zcrnJLluv3XYwb3DwuLreKw7t1OPJZWG95n5h3LBDbChH86HhWhKOnl1g-LXQ-Xqpw1RuOdazAgcn4l_x52C-qeBGaFgfX49iWogrCPnrEXjIYqc5dYW01H22pvjjNKZcfiH7wXeajXDEY8xlCLftMxdJ_1KIEph0MHnXrQ3553MjDZFyQqrKPlB10mXTvIR6cuovf9M2-cFsLrd3lPF2DdFSh2A0GO-ji4n3zM-0ba9gmvoD/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJzZSnpU4hkZURfE9Ok88wjqc/photos/AaVGc3lS8QoCDfmZ7kPgaxDDZRDNrE5J2GfDseDbDwAtBxfKoqrAAosIslrG-vFsQpGOcmDXIi3ELEBG-LtqjMeI7OsidPCTbjbNjYehXuL4JhlKCaMzIWU2N5k85VQ1g-U_yP8p76xMorM_uun5dVlwE9nefJVhhfQxaV8hF1SIaKVVTsPwUm6ZO76lg5ObUGwx2EOjfJuYyNqH6O3REYGD_ZP9ekZdpgZpUE_IwZScsLO8542C23fydlkdauKx168c2KSWKmSWVyWNacTSDhOm2VUuuDtqaqpSISL52u0GIg5plsLwLS4i9efEOnoLEgU_SbHgCWLORmWag2TgT70rGOCMmSvGYamVJqz8C9iTIv3FYSKEaLOFV9_efcpaGf_5YlbgliffU5i6EEBoZaX6ey9eUjdQ4XjP168asGyML7Q/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJzZSnpU4hkZURfE9Ok88wjqc/photos/AaVGc3lqJlkhCyCpRsp-ZTGP42amwUCcWiBxbhRSSZEbBY5opwSccK3OvsOTX9ddc1l8639j8JhPgYo72iZOQ59mpv1OuOk5w_djitAiQSJxIx1GPJQDCg8DEbBqkPQLHbEj5mC2Jf-1uuRDXC9I1wyEHymDkqpWh1p-npQGns4wyKRuwrD6-zmcg2WIsx0e_ams2y20TOzCSNpdY8NT8stkcrff1iZOCLHaBaujaXx_KPt-PTjhW9p18h1yPu0NUVAHC-tMVfVOO0SyBlP3CXytseLNqHubrA55N-LibelUZaE304xyDioPoFGcfKlOTHzzoENcfzZFTeHJ37oZNL3khtgu7sP2mTi84mDVqhPfO9c-iiJuoMjjsbxxhH7U3GHHfR4l1M3kHUWzslQOWwNfrYFI10Ee7Lw0UI2KEN3V68QLWAgH/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=12073641319114624892&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/114794676651209773522/reviews
- https://www.google.com/maps/contrib/102596455314038319399/reviews
- https://www.google.com/maps/contrib/116963754561078897502/reviews

## Recommended Design Direction

- Use automotive/local-service cues: route, workshop, tires, urgency, practical contact, opening hours, location.
- Prefer concrete microcopy based on the signals above.
- Vary `visual_mood` and `composition` across the 10 sites.
- Avoid repeating the same hero rhythm, proof order, and CTA wording from nearby briefs.

## Current Spec, If Any

```json
{
  "business_id": "google-ChIJzZSnpU4hkZURfE9Ok88wjqc",
  "slug": "lubricentro-y-gomeria-boxes",
  "visual_mood": "precision-service",
  "composition": "poster-bay",
  "headline": "Lubricentro y Gomeria BOXES",
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
    "4.7 sobre 5 con 44 reseñas",
    "Horario: Lunes a Sabado; Domingo cerrado",
    "Direccion: Ameghino 898, B7000 Tandil",
    "Reseñas que destacan: \"Espetacular la atención recomendable cien por ciento.\""
  ],
  "resource_title": "Para resolver cubiertas sin perder tiempo",
  "resource_items": [
    "Direccion visible para llegar directo al local.",
    "Telefono disponible para consultar antes de ir.",
    "Horario registrado: Lunes a Sabado; Domingo cerrado."
  ],
  "review_heading": "Lo que valoran quienes ya fueron",
  "contact_heading": "Llegar o llamar sin vueltas",
  "image_prompt": "Escena editorial realista para gomeria en Tandil, fachada de local barrial, herramientas y cubiertas, luz natural, sin texto, sin logos inventados.",
  "design_notes": "Mood precision-service, composicion poster-bay. Evitar estetica SaaS generica; usar recursos visuales de ruta, taller, cubiertas, direccion y prueba social."
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

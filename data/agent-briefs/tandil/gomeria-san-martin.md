# Site Brief 5: Gomería San Martin

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

- id: `google-ChIJPUsqo-8fkZURoRYh0Tfv-RQ`
- slug: `gomeria-san-martin`
- name: Gomería San Martin
- category: Car repair and maintenance service
- inferred profile: Gomeria
- requested segment: servicios vehiculares
- city: Tandil
- address: Venezuela 762, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 457-6925
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 4.9 / 5 (71 reseñas)
- service baseline: gomeria

## Useful Real Signals

### Reviews

1. "Nos solucionó la pinchada y pudimos seguir viaje. Un genio Oscar! Trabajador honesto. Gracias 🙏" — Sofía - Hola Buenos Aires (5/5)
2. "Un genio, super recomendado. Buen precio." — Francisco Levaggi (5/5)
3. "Óscar un ídolo !!! Nos salvó gran servicio recomiendo" — Natalia Maldonado Torrón (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJPUsqo-8fkZURoRYh0Tfv-RQ/photos/AaVGc3mFhvxYyMG3RR3KHmoAlpo-WiPKLZMgYHTtuEqYDMuBZiNbRNnILpRzKvfhvpkHQNWBdC_Dyn0K_9EBtUmYFripv5WyRzoelDUMx9KFLV-UOugGFbw6dl2pg8-5EtDpO8mZ91akcCbc_YZMZf3okgLuUUdVursPW7iUJqhbce1tDhQad4pzYX9UaHIq5Tf7hLHmGtKyvT8ISylP856GS1r1a60CpgWucFTcXbkpbzbNtoMj2ou04EWMeUzAgRVKgfOxbcUrUX5uw7obkg3M6VnIJmotPS-6xrJY_JwPfa-REucb1KMgR9OGtT5n-kEnkhZ7rXVHqddttrzL9xHHElGjuB1ZrEWY54Pjwt65eNITVYwZtcJHmjqs0QAZDj-O1GpaDgGdsiGtSp0GEnwx9qlEozWGWV2jadxC3GM7TvN33PbjnXXPCka8FT8wRmDd/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJPUsqo-8fkZURoRYh0Tfv-RQ/photos/AaVGc3nXvzswF0YIlbNiQ6jYeiqirpMInjqII6x8YhjI8QwZUnrAucv_ihF_XpLRZJQ29Se2-WD06ikEfCRIsS-hxSEXoq-3uIVdQ3bKSyxgDJqRdDZ7bsxKw5cTA8cY-iO9_JzxSE03ntg7TjiUbje3odB1ervHMPMhAMHenQLHpXQ1YiyoC70CY_R551QKK9zpY22BoHE9yLeSw5-SCVUDR53GJnx3J1kLmNMEfNdQBVcVxTgIlDT0R5wUHqZEhO_l3XKaROGwofG3Su5w51U2PgcIo82mlOFTJtWmCfLsCX30D0rNS3rZ9rDy94_mNIJY8mAttSNXZ1YOyiU0-S332sebRk3bQL41zG__U2-CmXXMIyImReEahx_BmuNo6dAnYxtfH-3WOWM_tgTgoKKx4FAqgmItm17Fso6z4doOvuBcWMAB/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJPUsqo-8fkZURoRYh0Tfv-RQ/photos/AaVGc3kocHkfN1CifGL163SoO6PX0-gCX14tJWBiR2msdZUjOAIRGnjLv7r7BARQQHdDnfGuqHMnYOGsdRI0wZy9cd8eTmRj-en79KzwpyvIS72heNLWY8c74DfUpaTaRdsIUB8llhpavp9AdtVR3gEuAwuAAPqg97KB2lgg6m9Fq9vfn4ezaPBcBgC7uC6nqrjQ2rn0y0XWvORlktye6wQoYT4F1RwJyX45El2_9XU-6EH5caqziUzkLhl8tDuexSX1kYLMtbFda5Y774ZG25E3kk6utUzdP0maWhIIZIsDfWmqVQoFtU32qgRvsGLMcxsFfyokDyJvldJ-Fe1FJr1-155GxuDGzICbv2S9lUk7yFTRNsthMdpr4BNisugErJ7iZN40yXwBfnwvTIlWnwLRC6EtCBlALD2z3MnKVVBIVyd0-V7PFG7mKzqTnlstFzVy/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=1511502172970358433&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/111107164854240334044/reviews
- https://www.google.com/maps/contrib/118391134475698725145/reviews
- https://www.google.com/maps/contrib/111954555459688636857/reviews

## Recommended Design Direction

- Use automotive/local-service cues: route, workshop, tires, urgency, practical contact, opening hours, location.
- Prefer concrete microcopy based on the signals above.
- Vary `visual_mood` and `composition` across the 10 sites.
- Avoid repeating the same hero rhythm, proof order, and CTA wording from nearby briefs.

## Current Spec, If Any

```json
{
  "business_id": "google-ChIJPUsqo-8fkZURoRYh0Tfv-RQ",
  "slug": "gomeria-san-martin",
  "visual_mood": "fleet-utility",
  "composition": "photo-board",
  "headline": "Gomería San Martin",
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
    "4.9 sobre 5 con 71 reseñas",
    "Horario: Lunes a Sabado; Domingo cerrado",
    "Direccion: Venezuela 762, B7000 Tandil",
    "Reseñas que destacan: \"Nos solucionó la pinchada y pudimos seguir viaje. Un genio Oscar! Trabajador honesto. Gracia...\""
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
  "design_notes": "Mood fleet-utility, composicion photo-board. Evitar estetica SaaS generica; usar recursos visuales de ruta, taller, cubiertas, direccion y prueba social."
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

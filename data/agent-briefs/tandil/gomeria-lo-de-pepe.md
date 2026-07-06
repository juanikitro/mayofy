# Site Brief 10: Gomeria lo de Pepe

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

- id: `google-ChIJk0E4QFwfkZUR1qykqg4Z9Zs`
- slug: `gomeria-lo-de-pepe`
- name: Gomeria lo de Pepe
- category: Car repair and maintenance service
- inferred profile: Gomeria
- requested segment: servicios vehiculares
- city: Tandil
- address: Juan de San Martin casa 26, B7000 Tandil, Provincia de Buenos Aires, Argentina
- phone: 0249 406-0008
- hours summary: Lunes: 8:00 a. m. – 8:00 p. m.
- rating: 4.9 / 5 (30 reseñas)
- service baseline: gomeria

## Useful Real Signals

### Reviews

1. "Excelente atención la de Pepe! Me salvó un domingo a la tarde!! 100/10" — Milagros Lauge (5/5)
2. "Muy buena atención fuimos el domingo muy piola y barato" — Martina Leonardi (5/5)
3. "Excelente servicio, disponibilidad horaria y auxilio si mandas un mensaja WhatsApp Grande Pepe!!
Era hora de aparecer en Google!!" — Zero 28 (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJk0E4QFwfkZUR1qykqg4Z9Zs/photos/AaVGc3n-Oze6yyJ97ZfAWZxKm4I0jcPGrqqHWXpSY5F3Mtd3mgavWFnoqSFjjwomwlSXyF2Gw4fjwOzVyMaqwKKENrI3gZOxJIIqU1qPdzjC36DgtJpll3Y4wwls44E-f0-2z1hlzqD2uCEy3u-oz6SKV_g1KfzMOqOspkiptHxKso8htxzVCJXt4Lk6HkzvOOahViTKNCv7TIqjAQiI2wJ23PJoUWgy-S3zvaevUjorUmrEz9sIsvDx6ulMwnqPtAc47HTEFWfyx1vE3zZf87D7Ps_Po0OneRkd4O_RRfyGPwoEk6AdfOgx_drCjKLrz1lg5L5o5Y1yBn-4RTyIzsFleqeDqtTPziELESXAedEAwyt2xyyiAKiUXWagQU3v9VLoCCszhjmAUygLgqRTwxid8Aj8tvrLLuDeIUmi5NYioLaaQQ/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJk0E4QFwfkZUR1qykqg4Z9Zs/photos/AaVGc3koPmpKR5ANbknVlCdgdLaPlSL5eogTr3aZzDo2W7i1jMKcJaPhoiRDxlxae7VXfLYk7J86F8AvEmkj1Ux6snfrh0MGVI7nMPB0Sog5jHXqdg8GrFYV82lsLcFyZWTL1WpH45gYaObtPsHuza_DKM5vtQp94Dn2CIgmX5-qmMDHAK6fyhL-vh2bKyMzlAYRIQqgZARHWpSbqFNKgr87XS77E8MLO9nJKFqgtDT_ApshhVUOe_OlJjoT4jMyH45ft2FVoU6tBESBfbPRQLrS8ieGZHRg1Mln4yyI6nKalpu78cx2X6nzR9PT8Tb9WBhCCHdxfVYDx7ScfK2DtZAaUBgW44qPqg5heFGstWpCwccFluoblnOJoJ51dmvp5mgY_VrMJqy2F1yt-nHEWr-DIJTKGrcHmrSiZwodVElYy3JYoqeT/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJk0E4QFwfkZUR1qykqg4Z9Zs/photos/AaVGc3mEoMl3ErwlcbtcuLZXbc_JasnfMTOPyAJWOR6zPGEwPLu6wj9X-_kwsF0_hm4mtnSM6WzasYuPPGE9iECRpV8AOyV-anUACk_i6CP8Nsk_d_3DB4Z7-zxCAMyYK3iUuWSJ6gy7d3gzcMcp3UpHuAXd8FsrKWoo88sswXw83TnN-NkxwUUW1Z-YmsB223EROmkKjdyGIWgAYrEDTo0D-duRzZoJy4OIeHFvByjWDcwMwgC4CL8kq1cSwISg03sJZieHFrgv_EKnnmoxRXJeSdA1fMfLbUZvapVVsfr2JVmrHbAhV1gUuRgkCsq0dsN2G3CKFMsuCrsu_jou7fa260-d0yqG-OS9tCYNOnbB_UihlR_h0qQ4A-uRrythw1lnDuq3P2x2imSAZ4CWZn7ey7GQ2vpiWOn_nfCQW4WIH7Pn-7pw/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=11237915995956096214&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/105139567005139669633/reviews
- https://www.google.com/maps/contrib/108188688030912150882/reviews
- https://www.google.com/maps/contrib/106406300496339860490/reviews

## Recommended Design Direction

- Use automotive/local-service cues: route, workshop, tires, urgency, practical contact, opening hours, location.
- Prefer concrete microcopy based on the signals above.
- Vary `visual_mood` and `composition` across the 10 sites.
- Avoid repeating the same hero rhythm, proof order, and CTA wording from nearby briefs.

## Current Spec, If Any

```json
{
  "business_id": "google-ChIJk0E4QFwfkZUR1qykqg4Z9Zs",
  "slug": "gomeria-lo-de-pepe",
  "visual_mood": "fleet-utility",
  "composition": "photo-board",
  "headline": "Gomeria lo de Pepe",
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
    "4.9 sobre 5 con 30 reseñas",
    "Horario: Lunes: 8:00 a. m. – 8:00 p. m.",
    "Direccion: Juan de San Martin casa 26, B7000 Tandil",
    "Reseñas que destacan: \"Excelente atención la de Pepe! Me salvó un domingo a la tarde!! 100/10\""
  ],
  "resource_title": "Para resolver cubiertas sin perder tiempo",
  "resource_items": [
    "Direccion visible para llegar directo al local.",
    "Contacto util para urgencias y auxilios.",
    "Horario registrado: Lunes: 8:00 a. m. – 8:00 p. m.."
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

# Data Rules

## Regla central

No inventar informacion. Si un dato no se puede verificar, usar `null`, explicar el motivo en `missing_data_reason` y no aprobar el negocio para generacion final.

En copy comercial si puede haber placeholders de ejemplo, pero deben verse como placeholders editables y no como hechos. Correcto: `[X] vehiculos atendidos`, `[Precio editable]`, `Opiniones reales proximamente`, `Marca a confirmar`. Incorrecto: publicar "1500 vehiculos atendidos", "10 anos de experiencia", marcas, garantias, stock o precios sin evidencia.

## Evidencia por dato

Cada negocio debe incluir `verification.field_evidence` para los campos principales:

- `name`
- `address`
- `rating`
- `reviews`
- `photos`
- `website_check`
- `main_product_or_service`
- `category`

Si existen telefono u horario, tambien deben tener evidencia.

## Fotos

Cada foto debe guardar:

- URL de origen.
- Tipo de imagen.
- URL fuente.
- Fecha de captura si esta disponible.
- Estado de permiso.

Solo `usage_status: "allowed"` puede usarse para generar un sitio final.

Por decision local del proyecto, las fotos encontradas por Google Places se cargan como `allowed` por defecto y el paso manual de permiso queda omitido.

El HTML final no apunta directo al endpoint de Google Places. Durante `npm run generate`, la foto se descarga como asset local si hay `GOOGLE_PLACES_API_KEY`; si no, se usa una imagen SVG local de fallback.

Las fotos ya versionadas en el repo pueden referenciarse por ruta local relativa al repo y el generador las copia como asset del sitio.

## Resenas de Google Places

Las resenas obtenidas por Places API deben conservar texto y atribucion. Antes de mostrarlas publicamente, verificar las politicas vigentes de Google Maps Platform para author attribution y orden de resenas.

## Ausencia de sitio web propio

`has_own_website` solo puede ser `false` si `website_check` contiene fuentes revisadas y evidencia. No alcanza con no conocer un dominio.

## Mocks

Los mocks deben llevar `is_mock: true` y fuentes `mock://`. Los comandos finales los rechazan.

Los mocks pueden incluir datos comerciales de ejemplo para probar estructura visual, siempre marcados como mock o editable. No deben copiarse a datasets finales sin reemplazar esos campos por evidencia real.

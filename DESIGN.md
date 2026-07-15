# Design

> Regla clave: este proyecto **no tiene un sistema visual global fijo**. Cada landing deriva su
> propio sistema (paleta, tipografía, motivos) del negocio real. Por eso el detector de IMPECCABLE
> corre con `detector.designSystem.enabled=false` (ver `.impeccable/config.json`): las reglas de
> consistencia de design-system no aplican, pero las 46 reglas anti-slop y de calidad sí. La barra
> operativa vigente son los golden samples de `docs/DESIGN_STANDARDS.md`.

## Theme

Se decide por negocio, extraída de las fotos verificadas. No hay tema único. Dos landings de una
misma tanda jamás comparten sistema visual, par tipográfico ni composición de hero. Los golden
samples ilustran el rango: póster tipográfico crema/negro/amarillo (cerrajería), boutique editorial
cálida (depilación), despacho de urgencia dark con acento ámbar (calderas).

## Color

Sin paleta global. Por landing: una dominante + un acento filoso, definidos en CSS variables,
derivados de la identidad real del local. El CTA de contacto es el color más caliente de la página.
Contraste AA obligatorio en texto. Evitar por reflejo el fondo crema/beige cuando no lo pide la
dirección de arte del negocio.

## Typography

Sin par tipográfico global. Por landing: un par display + cuerpo distintivo, cargado de Google Fonts,
con escala dramática (display enorme en hero, cuerpo 16–18px). **Prohibidas** por genéricas:
Inter, Roboto, Arial, system-ui, Space Grotesk. Reservar mayúsculas y tracking amplio para labels
cortos, nunca para cuerpos de texto.

## Components & Layout

Estructura comercial completa de un scroll, mobile-first: hero fuerte con prueba social (rating +
reseñas), trust bar, servicios, razones para elegir, opciones de contacto, galería/antes-después
cuando aplica, reseñas literales con autor, y CTA final. Barra sticky de llamada en mobile; CTA
`tel:` arriba del fold; link "Cómo llegar" a Google Maps; horarios siempre visibles. Texturas y
motivos del oficio en CSS/SVG inline (sin assets externos).

## Motion

Sobrio y progresivo: reveals escalonados en carga + IntersectionObserver en scroll con `script.js`
vanilla mínimo. `prefers-reduced-motion` siempre respetado. Sin JS pesado ni CDNs.

## Constraints

- Estático: HTML/CSS + `script.js` vanilla liviano. **Única dependencia externa permitida: Google Fonts.**
- Imágenes locales reales (o SVG/CSS inline); nunca imágenes remotas ni rutas a archivos inexistentes.
- Footer con el texto exacto `Creado por JuaniKitro`.
- Nada de datos inventados (precios, stock, promos, años, premios, garantías, reseñas no verificadas).
  Ver `docs/DATA_RULES.md`.
- Toda decisión visual queda subordinada a `docs/DESIGN_STANDARDS.md` y `docs/DATA_RULES.md`.
  Si IMPECCABLE sugiere copy o assets, quedan sujetos a esas reglas de datos.

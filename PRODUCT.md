# Product

## Register

brand

## Platform

web

## Users

Dueños y dueñas de PyMEs y comercios locales de Argentina (cerrajerías, centros de estética, service técnico, oficios, gastronomía de barrio) que hoy no tienen una web propia o tienen una muy pobre. Se les acerca esta landing como muestra comercial: una página de un solo scroll, pensada para mobile, que un cliente potencial recibe por WhatsApp y usa para decidir en segundos si llama, escribe o cómo llegar. La audiencia final que la navega es el vecino/cliente del negocio buscando resolver algo concreto y urgente (una urgencia, un turno, un presupuesto).

## Product Purpose

Generar, negocio por negocio, una landing de alta conversión que parezca hecha a medida del comercio real —no una plantilla— y que sirva como pieza de venta del servicio de MAYOFY/JuaniKitro. El éxito es una página que el dueño sienta propia y que empuje al visitante a contactar. Cada landing nace de datos verificados del negocio (rating, reseñas literales, horarios, teléfono, dirección, fotos reales) y de una dirección de arte extraída de esas fotos.

## Positioning

Cada landing tiene una sola dirección de arte comprometida, derivada del negocio real, imposible de confundir con una plantilla de IA. La identidad sale del local (su cartel, sus colores, su oficio), nunca de un template.

## Conversion & proof

- Primary y secondary CTA: CTA primario `tel:` (llamar) arriba del fold y barra sticky de llamada en mobile; CTA secundario según el negocio (WhatsApp `wa.me` si está verificado, o "Cómo llegar" a Google Maps). Nunca inventar canales: si no hay WhatsApp/Instagram verificado, el fallback es el teléfono publicado.
- La línea que el visitante recuerda a los 10 segundos: qué resuelve el negocio y que puede contactarlo ya (ej.: "Si es de llaves, es acá").
- Belief ladder: (1) esto es un negocio real de mi zona, (2) resuelve exactamente lo que necesito, (3) otros ya confiaron (rating + reseñas literales con autor), (4) contactarlo es inmediato y sin fricción.
- Proof on hand: solo prueba social verificada del dataset del negocio — rating y cantidad de reseñas exactos, reseñas citadas literales con su autor. Prohibido fabricar testimonios, premios, años de experiencia, cantidades atendidas, marcas o garantías. Ver docs/DATA_RULES.md.

## Brand Personality

Voz en español argentino (vos), de barrio, directa y cálida, con oficio. Tres palabras: real, cercana, resolutiva. El registro emocional cambia por rubro pero siempre transmite confianza inmediata y urgencia útil (no ansiedad). El copy nace de lo que ya dicen las reseñas reales del negocio.

## Anti-references

- Estética genérica de IA / "AI slop": gradientes violeta, glows de color sobre dark theme, bordes laterales gruesos tipo "side-tab", chips eyebrow tracked-caps sobre el hero, marcadores de sección numerados 01/02/03 como andamiaje editorial, em-dashes en cadena, cuerpos de texto en mayúsculas.
- Fuentes por defecto sin carácter: Inter, Roboto, Arial, system-ui, Space Grotesk.
- Layout tipo SaaS/plantilla, dashboards, o cualquier composición que no salga de la identidad del negocio real.
- Fondo crema/beige "por reflejo" cuando no lo pide la dirección de arte del negocio.
- Cualquier dato no verificado presentado como hecho (precios, stock, promos, años, zonas de cobertura, claims médicos/técnicos).

## Design Principles

- La identidad sale del negocio real, nunca de un template: paleta, motivos y texturas se extraen de las fotos verificadas.
- Una dirección de arte por negocio, comprometida y distinta de las demás de la tanda (paleta, par tipográfico y composición de hero no se repiten).
- Conversión primero: el CTA de contacto es el elemento visual más caliente de la página.
- Verdad de datos por encima de todo: no inventar; hueco sin evidencia se resuelve con `null` o placeholder editable visible, nunca con un hecho falso.
- Subir la barra sobre el slop: igualar o superar los golden samples de docs/DESIGN_STANDARDS.md y pasar el detector de IMPECCABLE.

## Accessibility & Inclusion

Contraste AA en texto, `lang="es-AR"`, semántica correcta, `alt` descriptivos reales, foco visible. Motion sobrio y progresivo con `prefers-reduced-motion` siempre respetado. Mobile primero (barra sticky de llamada, CTA arriba del fold).

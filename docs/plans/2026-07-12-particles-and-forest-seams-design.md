# Partículas y costuras de bosque — diseño aprobado

**Fecha:** 12 de julio de 2026  
**Estado:** aprobado para implementación

## Objetivo

Recuperar la profundidad atmosférica de las partículas durante todo el scroll y sumar dos momentos de bosque de alto impacto sin volver a introducir el costo de rendimiento ni la sensación de secciones apiladas que ya se corrigieron.

## Dirección elegida

La home conserva la macroestructura fotográfica y el sistema nocturno actual. Los nuevos recursos funcionan como capas y costuras entre secciones, no como bloques de contenido independientes.

### ParticleField

- Campo SVG fijo, decorativo y sin interacción.
- Tres grupos de partículas con escalas y opacidades distintas para sugerir profundidad.
- El movimiento continuo ocurre únicamente mediante `transform` y `opacity` sobre los grupos completos.
- La posición fija produce profundidad relativa mientras el contenido se desplaza, sin calcular el scroll ni leer geometría.
- No usa Canvas, sombras rasterizadas, conexiones O(n²), `mix-blend-mode` ni listeners nuevos.
- `lite` reduce densidad; `reduced` presenta una composición estática.

### ForestRift

- Reemplaza el puente de copa entre Trabajos y Qué hacemos.
- Escena fotográfica generada específicamente para Mayofy: bosque húmedo nocturno, troncos verticales monumentales y una abertura verde asimétrica.
- No contiene personas, edificios, texto, logos ni elementos fantásticos explícitos.
- El encuadre debe admitir una lectura panorámica en desktop y un recorte vertical en móvil.
- La imagen se carga de forma diferida, no tiene parallax continuo y se disuelve hacia los fondos vecinos mediante capas tonales.

### CanopyConvergence

- Reemplaza el puente de agua entre FAQ y Contacto.
- SVG procedural con masas de copa laterales y tres corrientes/raíces que convergen hacia la entrada del CTA.
- Se revela una sola vez usando el `IntersectionObserver` ya existente para `[data-bridge]`.
- Después del reveal queda estático. En `lite` y `reduced` aparece directamente en su estado final.

## Integración

Orden relevante de la home:

1. Trabajos
2. `ForestRift`
3. Qué hacemos
4. Resto del recorrido comercial
5. FAQ
6. `CanopyConvergence`
7. Contacto

Las dos costuras se solapan tonalmente con las secciones vecinas para evitar bordes duros. El verde `#00F69D` sigue siendo una señal focal, no un lavado general.

## Rendimiento y accesibilidad

- Sin dependencias nuevas.
- Sin trabajo JavaScript por scroll para las partículas.
- Imagen responsive con `next/image`, `sizes` y carga diferida.
- Animación limitada a `transform`, `opacity` y dibujo de trazos una sola vez.
- Capas decorativas con `aria-hidden="true"` y `pointer-events: none`.
- Verificación responsive en 320, 375, 414, 768 y 1280 px.
- Comparación focalizada del costo de scroll contra el perfil previo.

## Archivos previstos

- Crear `src/components/particle-field.tsx`.
- Crear `src/components/forest-rift.tsx`.
- Crear `src/components/canopy-convergence.tsx`.
- Crear assets responsive bajo `public/images/`.
- Modificar `src/app/page.tsx` y `src/app/globals.css`.
- Actualizar documentación de QA y memoria Hallmark.

No se eliminan componentes existentes; solamente se sustituyen dos instancias de `SectionBridge` en la composición de la home.

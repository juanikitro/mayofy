# Mayofy — Diseño aprobado para proyectos y casos

**Fecha:** 12 de julio de 2026  
**Estado:** aprobado para implementación  
**Fuente visual:** sistema `Umbral Vivo` existente

## Objetivo

Incorporar el trabajo como prueba temprana del nivel de Mayofy. La selección aparece después de explicar que la atención ya existe y antes de desarrollar la oferta completa.

## Home

- Título de sección: `Primero, el trabajo.`
- Seis proyectos placeholder, siempre identificados como contenido pendiente.
- Los primeros tres se muestran como portales editoriales grandes y asimétricos.
- Los tres restantes permanecen dentro de un disclosure nativo `Ver más proyectos`.
- Cada proyecto enlaza a una página individual.
- La expansión no requiere una isla cliente ni una dependencia de interacción.

## Páginas individuales

- Ruta estática: `/proyectos/[slug]`.
- Macroestructura: `Workbench`, adaptada a trabajos web y landings.
- Navegación: `N9 Edge-aligned minimal`.
- Cierre: `Ft5 Statement`.
- Recorrido: contexto, desafío, alcance, decisiones, recorrido de conversión, resultado, galería y CTA.
- Los placeholders no afirman clientes, métricas ni resultados y se publican con `noindex`.

## Contenido

Los seis casos viven en un único archivo TypeScript tipado. Cada campo pendiente usa copy explícito como `Nombre del proyecto`, `Visual pendiente` o `Resultado a completar`. Reemplazar contenido no requiere modificar componentes ni estilos.

## Dirección visual

- Se conserva la paleta nocturna y el verde `#00F69D`.
- La home mantiene la macroestructura `Photographic`.
- Los casos cambian a una voz más técnica: títulos funcionales, capturas dominantes y anotaciones breves.
- Cada portal cambia la relación entre visual y texto para evitar una grilla uniforme.
- Los visuales placeholder son composiciones vectoriales abstractas y declaradas como tales, no capturas falsas.

## Interacción y rendimiento

- `details/summary` para mostrar más proyectos.
- Server Components para selección, contenido y páginas de caso.
- `generateStaticParams` y `dynamicParams = false`.
- Solo `transform` y `opacity` en reveals.
- `prefers-reduced-motion`, foco visible y targets mínimos de 44 px.

## Criterios de aceptación

- Tres proyectos visibles por defecto y seis después de expandir.
- Los seis tienen enlaces de detalle funcionales.
- Ningún placeholder parece un cliente o resultado real.
- Sin overflow en 320, 375, 414 y 768 px.
- La sección aparece antes de la oferta y mantiene el recorrido completamente oscuro.

# Mayofy — Plan de implementación del portfolio

**Estado:** preview técnico V1 implementado; contenido final, validación completa y publicación pendientes  
**Dirección aprobada:** `Umbral Vivo`  
**Stack previsto:** Next.js + TypeScript + Vercel

## Objetivo de entrega V1

Publicar en `mayofy.vercel.app` una home terminada, responsive y medible, con contacto real por WhatsApp, formulario breve y una selección pequeña de proyectos sólidos. La V1 debe demostrar nivel sin incluir secciones vacías ni alcance diferido presentado como terminado.

## Fase 0 — Insumos y contrato

- [ ] Confirmar número de WhatsApp, correo y canales públicos.
- [ ] Definir proyectos disponibles y cuáles son reales o conceptuales.
- [ ] Confirmar señales de experiencia publicables.
- [ ] Recibir fotografía de Juani según el brief de diseño.
- [ ] Elegir analítica, proveedor del formulario y antispam.
- [ ] Revisar y aprobar el copy completo.

**Salida:** contenido suficiente para construir sin inventar pruebas ni dejar placeholders públicos.

## Fase 1 — Base técnica

- [ ] Crear la aplicación Next.js con TypeScript y App Router.
- [ ] Configurar lint, formato y scripts focalizados según las versiones instaladas.
- [ ] Definir estructura de rutas para home y casos.
- [ ] Crear tokens globales de color, tipografía, espacio, movimiento y capas.
- [ ] Configurar fuentes con carga optimizada y fallbacks.
- [ ] Añadir metadatos base, `robots`, sitemap y Open Graph.

**Archivos probables:** `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/sitemap.ts`, `app/robots.ts`, `content/*`, `components/*`, `public/*`.

**Validación:** arranque local, typecheck focalizado, estructura semántica inicial y ausencia de errores de consola.

## Fase 2 — Sistema visual y shell

- [ ] Implementar tokens de `Umbral Vivo` sin valores cromáticos improvisados.
- [ ] Construir header, navegación y footer accesibles.
- [ ] Implementar contenedores, ritmo editorial y transiciones de contraste.
- [ ] Definir estados completos de links, botones y controles.
- [ ] Añadir soporte global de `prefers-reduced-motion`.
- [ ] Registrar la dirección en `.hallmark/log.json` al comenzar el build productivo.

**Validación:** contraste AA, teclado, foco visible, targets de 44 px y responsive en 320/375/414/768 px.

## Fase 3 — Hero y dirección de arte

- [ ] Generar o producir la escena hero siguiendo el brief fotográfico.
- [ ] Revisar anatomía natural, coherencia de luz, texturas y señales de imagen artificial.
- [ ] Preparar crops independientes para móvil y escritorio.
- [ ] Implementar `HeroThreshold` con contenido y CTA disponibles antes de los efectos.
- [ ] Añadir apertura del umbral y deriva orgánica con degradación de rendimiento.
- [ ] Precargar únicamente el asset crítico correcto para cada viewport.

**Validación:** CTA dentro del primer pliegue, LCP razonable en móvil, sin layout shift y hero comprensible con JavaScript o movimiento desactivado.

## Fase 4 — Recorrido comercial

- [ ] Construir `AttentionTransition` y `OfferPath`.
- [ ] Construir `ProcessSequence` con el lanzamiento integral.
- [ ] Añadir `CapabilitiesAside` con automatizaciones e integraciones subordinadas.
- [ ] Implementar FAQ accesible.
- [x] Afinar el recorrido oscuro continuo: petróleo → mineral → verde profundo → petróleo.

**Validación:** lectura de oferta sin jerga, orden comercial correcto y ausencia de estructura repetitiva de tarjetas.

## Fase 5 — Proyectos y confianza

- [ ] Modelar contenido tipado para proyectos.
- [ ] Construir `ProjectPortal` con variantes según el material real.
- [ ] Crear rutas individuales solamente para casos con contenido suficiente.
- [ ] Etiquetar explícitamente proyectos conceptuales.
- [ ] Implementar `FounderTrust` con retrato, voz singular y señales verificadas.
- [ ] Optimizar capturas, videos o demos sin datos sensibles.

**Validación:** ningún cliente, resultado, logo o número sin fuente y autorización; presencia de Juani secundaria pero visible.

## Fase 6 — Conversión

- [ ] Implementar generador de enlaces de WhatsApp con mensaje contextual.
- [ ] Implementar formulario mínimo con validación, estados y antispam.
- [ ] Definir manejo de errores sin perder la información escrita.
- [ ] Añadir aviso de privacidad y canal alternativo.
- [ ] Instrumentar eventos mínimos y respetuosos.

**Validación:** prueba real de enlaces y envío en entorno de preview; teclado, lector de pantalla básico, estados de carga/error/éxito y protección antispam.

## Fase 7 — QA y endurecimiento

- [ ] Ejecutar Hallmark slop test completo y corregir todos los gates aplicables.
- [ ] Revisar responsive visual en 320, 375, 414, 768, 1280 y 1440 px.
- [ ] Verificar Chrome, Edge, Firefox y Safari/iOS si hay dispositivo disponible.
- [ ] Revisar consola, enlaces, metadata, sitemap y páginas 404.
- [ ] Auditar imágenes, fuentes, bundle y Core Web Vitals.
- [ ] Probar `prefers-reduced-motion`, teclado y contraste.
- [ ] Revisar el copy final y todos los mensajes precargados.

**Salida:** preview de Vercel listo para aprobación final, todavía no promocionado como producción.

## Fase 8 — Publicación

- [ ] Configurar variables de entorno sin exponer secretos.
- [ ] Desplegar preview final en Vercel.
- [ ] Obtener aprobación consolidada.
- [ ] Promover la versión aprobada a `mayofy.vercel.app`.
- [ ] Ejecutar smoke test de home, casos, WhatsApp, formulario y analítica.
- [ ] Documentar cómo actualizar proyectos y contenido.

## Orden de implementación sugerido

1. Base técnica y tokens.
2. Hero funcional sin motion.
3. Recorrido comercial completo.
4. Proyectos y confianza con datos reales.
5. Contacto y medición.
6. Motion, dirección de arte final y optimización.
7. QA integral y despliegue.

Este orden mantiene siempre una página legible y funcional. Los efectos se incorporan cuando la oferta, el contenido y la conversión ya están resueltos.

## Fuera de alcance V1

- CMS o panel administrativo;
- blog;
- múltiples páginas por ciudad;
- precios públicos;
- automatizaciones complejas;
- mantenimiento o campañas como flujo integrado;
- sistema de cuentas;
- CRM propio;
- WebGL salvo que una prueba concreta demuestre valor central y rendimiento aceptable.

## Condición para comenzar

La implementación empieza cuando Juani apruebe explícitamente este diseño y plan. Los insumos de la Fase 0 pueden completarse durante las primeras fases, pero ningún contenido inventado se usará para simular que están resueltos.

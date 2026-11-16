# Islas 2 y 4 a 7, caída entre nubes y navegación completa

**Fecha:** 16 de noviembre de 2026
**Estado:** construido con arte provisorio y verificado en local; texto aprobado aplicado y Cal.com embebido. Pendiente: imágenes del agente de producción. No está publicado.
**Rama:** `juanikitro/landing-redesign`. Sin push.
**Depende de:** `2026-11-16-landing-redesign-mayo-world.md`, `2026-11-16-biblia-visual-mundo-mayo.md`, `2026-11-16-porcion-vertical-mundo-mayo.md`.

## Qué cambió

El recorrido ahora tiene las 7 islas en el orden aprobado, con el cielo avanzando de amanecer a noche, y la navegación completa de la decisión 15.

- `src/components/world/islands.tsx`: islas 2 (`#problema`, mañana), 4 (`#sistemas`, tarde dorada), 5 (`#trabajos`, atardecer), 6 (`#contacto`, crepúsculo: Juani, agenda y contacto) y 7 (`#preguntas`, noche: FAQ y mantenimiento). El orden 6/7 se invirtió a pedido de Juani el 16 de noviembre; los cielos acompañan el cambio. Cada una usa los títulos y entradas actuales de `src/content/site.ts` sin cambios; la sustancia comercial se lee de `src/content/commercial-plans.ts` y `src/content/projects.ts`.
- Fusiones aplicadas según la especificación: el bot "Próximamente" y las automatizaciones sueltas pasaron de la isla 3 a la 4; el mantenimiento pasó a la isla 6 junto con la FAQ; el proceso de seis pasos vive en la isla 5 con los trabajos. `pack-details.tsx` queda con packs, pago y garantías.
- `src/components/world/island-scene.tsx`: escena provisoria genérica (cielo por isla, estrellas en 6 y 7, isla ancha) y adornos por isla en SVG: rocas sueltas, invernadero con piezas desenterradas, sendero de seis piedras, luciérnagas con farol, fogón con banco.
- `src/components/world/cloud-fall.tsx`: transición entre las islas 1 y 2. Tres capas de nubes y Mayo cayendo, movidas con Scroll-Driven Animations sobre un escenario fijo de 160vh (120vh en celular). En movimiento reducido se muestra una sola imagen fija de 60vh. Cuando lleguen los 10 a 12 cuadros del agente de producción, reemplazan a las capas SVG; el nivel liviano usa el primer cuadro.
- `src/components/world/island-nav.tsx`: pill con Packs, Trabajos, Preguntas y el CTA.
- `src/components/world/island-progress.tsx`: indicador de progreso con huella de Mayo (al costado en escritorio, abajo en celular) con clic a cada isla y `aria-current` en la isla visible, más el CTA flotante de WhatsApp en celular, que aparece al salir del hero y queda fuera del orden de tabulación mientras está oculto.
- `src/components/world/mayo-figure.tsx`: poses `fall`, `play`, `dig`, `run`, `chase` y `rest` como variantes de clase sobre la misma Mayo provisoria; cada una marca el lugar que ocupará la pose fija o el modelo 3D.
- `src/app/world.css`: estilos de las islas, variantes nocturnas (`.isle--dark`: menta como luz, paneles azul noche), adornos, caída, progreso y flotante. Clases nuevas que chocaban con `globals.css` se renombraron (`.host`, `.reach`, `.questions`, `.steps`, `.host-link`).
- `docs/plans/2026-11-16-texto-islas-propuesta.md`: propuesta de títulos y entradas por isla para que Juani apruebe.

## Cómo se verificó

Con Playwright sobre `next dev` en Chromium, 1440×900 y 390×844:

| Chequeo | Resultado |
|---|---|
| Scroll horizontal | No en ninguno de los dos anchos (`scrollWidth` igual a `innerWidth`), incluida la caída y las islas nocturnas |
| Caída entre nubes | Capas y Mayo se mueven con el scroll sobre el escenario fijo |
| Progreso con huella | `aria-current="location"` sigue la isla visible (comprobado en la 7) |
| Flotante de WhatsApp | Visible en celular una vez pasado el hero |
| FAQ con teclado | El primer `summary` recibe foco y Enter lo abre |
| `npm run lint`, `npm run typecheck`, `npm run build` | Sin errores |

No verificado: Firefox y Safari reales, dispositivo físico, nivel liviano real, lector de pantalla.

Un verificador independiente (agente de solo lectura) repitió las pruebas sobre `b89618a`: S2, S3, S4, S5 y S7 en PASS, sin bloqueos. Avisos atendidos o registrados: el indicador de huellas quedaba último en el orden de tabulación (después del pie); se movió en el DOM justo después del pill para que esté a pocos Tab del inicio. `src/components/commercial-plans.tsx` quedó como componente viejo sin uso; se elimina al migrar las rutas restantes. El `aria-current` del indicador se demora durante saltos largos con scroll suave; se asienta solo.

## Limitaciones y pendientes

- Arte provisorio en SVG en todas las islas y en la caída; se reemplaza por las imágenes del agente de producción sin cambiar la estructura.
- Texto: aplicado el 16 de noviembre de 2026 desde `2026-11-16-texto-islas-propuesta.md`, en `src/content/islands.ts`. La isla 1 conserva la promesa.
- Cal.com: `src/components/world/cal-booking.tsx` embebe la agenda `mayofy-first-meeting` inline con el cargador oficial de Cal.com (`app.cal.com/embed/embed.js`, sin dependencia npm), visible dentro de la isla sin botón previo y con alto adaptado al calendario (ancla `#agenda`); queda un enlace directo a Cal.com como alternativa sin JavaScript. Los CTA "Agendá tu diagnóstico" del hero y del pill llevan a `#agenda`; WhatsApp sigue visible como alternativa en el hero y en la isla 7. `/privacidad` menciona Cal.com entre los servicios.
- El formulario de contacto reutiliza `contact-form.tsx` con sus estilos de `globals.css`; se migra al mundo nuevo junto con `/privacidad` y `/proyectos`.
- Las rutas `/proyectos/[slug]` de los placeholders siguen con la hoja vieja.

# Porción vertical del mundo de Mayo: hero e isla de rocas

**Fecha:** 16 de noviembre de 2026
**Estado:** construida y verificada en local, pendiente de aprobación de Juani. No está publicada.
**Rama:** `juanikitro/landing-redesign` (worktree `landing-redesign`). Sin push.
**Depende de:** `2026-11-16-landing-redesign-mayo-world.md` (decisiones) y `2026-11-16-biblia-visual-mundo-mayo.md` (paleta, tipografía, prompts).

## Qué cambió

La página de inicio pasa a ser el comienzo del recorrido por islas: la isla 1 (hero, amanecer) y la isla 3 (las rocas se ensamblan, mediodía) con los packs. Las demás islas, el texto nuevo, la navegación completa y Cal.com quedan para después de la aprobación.

- `src/app/page.tsx`: nueva página de inicio. Hero con la promesa "Webs que venden. Sistemas que ordenan." y los dos CTA en el primer pliegue, renderizados en el servidor y sin depender de ninguna animación. Debajo, la isla de rocas y el detalle de los packs. Cierra con un pie de página nocturno.
- `src/app/world.css`: hoja de estilos nueva del mundo de Mayo, con los tokens de la biblia visual. Está acotada al contenedor `.world` para no romper `/privacidad` ni `/proyectos`, que siguen usando `globals.css` hasta que migren.
- `src/app/layout.tsx`: carga Instrument Sans, Fraunces (cursiva variable, ejes `opsz` y `SOFT`) y Caveat con `next/font/google`. Las fuentes viejas siguen cargadas para las rutas que todavía no migraron.
- `src/components/world/`:
  - `hero-island.tsx`: escena provisoria de la isla 1 dibujada en SVG por capas (cielo, islas lejanas, isla principal, hojas en primer plano). Cada capa corresponde a una imagen de la biblia y se reemplaza sin tocar la estructura.
  - `rock-island.tsx`: isla 3. Tres plataformas de cuatro rocas cada una, con una tarjeta resumen por pack (nombre, precio "desde", plazo y enlace al detalle).
  - `pack-details.tsx`: toda la sustancia comercial (packs, pago, bot "Próximamente", garantías, mantenimiento y automatizaciones), leída sin cambios de `src/content/commercial-plans.ts`.
  - `mayo-figure.tsx`: Mayo provisoria en SVG plano. Ocupa el lugar que después toma el GLB (nivel completo) y las poses fijas (niveles liviano y estático) del worktree `mayo-3d-character`.
  - `island-nav.tsx`: pill flotante con marca, "Packs" y el CTA. "Trabajos" y "Preguntas" se agregan cuando existan sus islas.
  - `world-motion.tsx`: detecta el nivel de rendimiento y lo expone en `data-motion-tier` del `html`.

## Cómo funciona el ensamble de rocas

- El estado por defecto de cada roca es **su posición final en la plataforma**. La animación va de "dispersa" a "en su lugar", así que cualquier navegador o nivel que no anime muestra las plataformas ya armadas sin CSS adicional.
- La animación está atada al scroll con Scroll-Driven Animations de CSS dentro de `@supports (animation-timeline: view())`. No hay JavaScript ni captura del scroll: el usuario scrollea normalmente.
- En escritorio, la sección `.rocks` mide 240vh y declara `view-timeline-name: --rocks`; el escenario (`.rocks__stage`) es `position: sticky` y ocupa la pantalla mientras la sección pasa. Las rocas usan `animation-range: cover 28% … cover 57%` escalonado; las tarjetas aparecen entre `cover 54%` y `60%`, y Mayo en la plataforma 3 entre `58%` y `63%`. Así todo termina de armarse antes de que el escenario se despegue.
- En celular (hasta 48rem) no hay escenario fijo: cada plataforma tiene su propio `view-timeline-name: --platform` y sus rocas llegan mientras la plataforma entra en pantalla (`entry 10% … entry 95%`), con la dispersión reducida al 45% para que nunca salgan del ancho de la pantalla.
- Los desplazamientos de dispersión viven en variables CSS por roca (`--sx`, `--sy`, `--sr`), definidas en `rock-island.tsx`.

## Niveles de rendimiento

| Nivel | Cuándo | Qué se ve |
|---|---|---|
| Completo | Por defecto, navegadores con `animation-timeline` | Rocas que se ensamblan con el scroll, Mayo salta al vacío al salir del hero, cielo con parallax leve, Mayo respira. |
| Liviano | `saveData`, conexión 2G/3G, `deviceMemory` ≤ 2 o ≤ 2 núcleos | Plataformas ya armadas, sin animaciones de scroll; Mayo respira con una animación CSS simple. |
| Estático | `prefers-reduced-motion: reduce` | Todo armado y quieto. Lo aplica la media query (funciona sin JavaScript) y, además, el atributo `data-motion-tier="reduced"`. |

El nivel se calcula en `world-motion.tsx`, pero el hero, el mensaje y los CTA no dependen de que ese código corra.

## Cómo se verificó

Con Playwright sobre `next dev` en `http://localhost:3010`, en Chromium:

| Chequeo | Escritorio 1440×900 | Celular 390×844 |
|---|---|---|
| Promesa y CTA en el primer pliegue sin animación | Sí (captura del hero sin scroll) | Sí |
| Scroll horizontal | No: `scrollWidth` 1440 = `innerWidth` | No: `scrollWidth` 390 = `innerWidth`, también con las rocas dispersas |
| Ensamble con scroll | Rocas dispersas al entrar, armadas con tarjetas y Mayo al final del escenario fijo | Cada plataforma se arma al entrar en pantalla |
| Movimiento reducido (`emulateMedia reducedMotion`) | `data-motion-tier="reduced"`, `animation-name: none`, `transform: none`, tarjetas y Mayo visibles (opacidad 1) | Misma CSS |
| Teclado | Tab recorre: skip link → marca → Packs → CTA del nav → CTA principal → Ver packs → tres tarjetas de plataforma; todos con `outline` visible | No se repitió en celular |
| `npm run lint`, `npm run typecheck`, `npm run build` | Sin errores | — |

Capturas de la verificación: en el scratchpad de la sesión (no se versionan).

Además, un verificador independiente (agente de solo lectura, sin acceso a este contexto) repitió las pruebas sobre el commit `0a5b5cf`: S3, S5, S7 y S9 en PASS, y S4 con un bloqueo a 390 px: la nota manuscrita de Mayo tapaba la palabra "gratis" del CTA principal. Se corrigió moviendo la nota (`.mayo-note--dawn` en celular) y se volvió a medir: los rectángulos de la nota y de los dos CTA ya no se superponen y `scrollWidth` sigue en 390. Hallazgo útil del verificador: Chromium reporta la transformación final de una animación atada al scroll como `matrix(1, 0, 0, 1, 0, 0)` y no como `none`.

No verificado: Firefox y Safari reales (la vía sin soporte de `animation-timeline` se cubre por diseño, pero no se observó), celular físico, nivel "liviano" en un dispositivo real (solo por lógica del detector) y el detalle expandido de cada pack con lector de pantalla.

## Limitaciones y pendientes

- Todas las imágenes son provisorias (SVG plano). Se reemplazan por las que Juani genere con los prompts de la biblia visual; las rocas provisorias no tienen el encastre que tendrán las generadas.
- Las notas manuscritas de Mayo ("¡Guau! Acá empieza todo." y "Una roca por pack.") son texto propuesto, pendiente de aprobación según la regla de texto del rediseño.
- La marca en el nav es texto; el PNG del wordmark es para fondo oscuro y necesita una versión para beige.
- Se cargan seis familias tipográficas mientras conviven el mundo nuevo y las rutas viejas. Al migrar `/privacidad` y `/proyectos` se eliminan Cormorant, Manrope e IBM Plex Mono y `globals.css` se reduce.
- Las islas 2 y 4 a 7, la caída entre nubes, el indicador de progreso con huella, el CTA flotante de WhatsApp y Cal.com quedan para después de la aprobación.
- Three.js no se agregó: se propone al integrar el GLB de Mayo (costo: unos 150 KB comprimidos más el modelo, cargado solo en el nivel completo y después del primer pliegue).

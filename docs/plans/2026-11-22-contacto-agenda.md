# Isla 6: la agenda de Cal.com sin trampa de scroll y con la ropa de la isla

Pedido de Juani, 22 de noviembre de 2026: "Despliega un agente dedicado a arreglar eso. si es posible, modifica la caja del cal.com para que sea mas acorde al reseto de la pagina".

"Eso" es el hallazgo **A4** de la prueba de usuario simulada (`docs/plans/2026-11-20-prueba-usuario.md`): en el celular, el calendario atrapaba el dedo, y la caja de Cal.com se veía como un widget pegado.

Rama: `juanikitro/landing-contacto-cal`. Archivos: `src/components/world/cal-booking.tsx`, `src/components/world/host-island.tsx`, `src/content/site.ts` (`scheduling`) y el bloque "Island 6: Cal.com booking" de `src/app/world.css`.

## Qué pasaba (evidencia)

- La trampa era nuestra, no de Cal.com. Nuestro CSS limitaba la caja en el celular a `max-height: min(44rem, 82svh)` con `overflow-y: auto`. Cal.com, en cambio, ya agranda el iframe a la altura de su contenido: medía **1.735 px** adentro de una caja de **656 px**, y adentro del iframe no hay ningún scroll propio.
- Se midió con los mismos deslizamientos táctiles por CDP de la prueba (`Input.dispatchTouchEvent` con inercia; ver `contacto-agenda/scripts/flick.cjs`). En el sitio en vivo, con el dedo apoyado sobre el calendario, **3 de 3 deslizamientos hacia abajo movieron la página 0 px**.
- En escritorio, la vista de mes (`month_view`) de Cal.com pone los horarios en una columna de 437 px que scrollea adentro (1.072 px de contenido). Con el puntero sobre esa columna, **4 muescas de rueda hacia abajo y 1 hacia arriba movieron la página 0 px**.
- El encabezado de Cal.com mostraba "Mayofy First Meeting" en inglés, "30m", "Cal Video" y el selector "America/Argentina/Buenos Aires". El fondo era casi negro y el acento, el de Cal.com.

## Qué cambió

1. **Sin scroll adentro, en ningún ancho.** Se sacaron el `max-height` y el `overflow` de la caja: el iframe toma la altura de su contenido y el panel crece con él. Cualquier deslizamiento o muesca sobre el calendario mueve la página.
2. **Vista de columnas (`column_view`).** En escritorio muestra el mes y, al lado, los horarios de dos días completos, sin columna con scroll propio. En el celular y en tablet (iframe de menos de unos 768 px), Cal.com apila el mes y los horarios del día elegido en una sola columna, igual que antes.
3. **Opciones que se probaron y se descartaron:**
   - `useSlotsViewOnSmallScreen` deja el calendario del celular en 367 px, pero abre los horarios en una capa fija de 367 px que scrollea adentro (1.173 px de contenido). Era la misma trampa, más chica.
   - La vista de mes deja la columna de horarios con scroll propio en escritorio.
4. **Autoscroll de Cal.com apagado** (`disableAutoScroll`). Cal.com puede mover la página por su cuenta (`__scrollByDistance`, `scrollIntoView` al cambiar de ruta). Apagado, la página se mueve solo cuando la mueve el lector. Al tocar un día, la página no se movió (0 px).
5. **La caja con la ropa de la isla:**
   - Se ocultó el encabezado de Cal.com (`hideEventTypeDetails`). En su lugar va un encabezado propio en la tipografía del sitio: "Elegí un día y un horario" y "Son 30 minutos por videollamada. Los horarios se muestran en tu hora local." Así desaparecen el título en inglés, "30m" y "Cal Video".
   - Los colores de Cal.com salen de los tokens del sitio con `cssVarsPerTheme` (doc de Cal.com: https://cal.com/docs/developing/guides/embeds/customize-embed-css-variables). `cal-booking.tsx` lee de `world.css`, en tiempo de ejecución, `--booking-surface`, `--night-ink`, `--night-ink-soft`, `--night-deep` y `--mint`, y arma con ellos las variables `cal-bg`, `cal-brand`, `cal-text*`, `cal-border*` y `radius`. Las mezclas se hacen en `oklab`: en `oklch`, la mezcla de menta con azul giraba el tono y los días disponibles salían azules.
   - `cal-bg` y `cal-bg-muted` (el fondo que pinta el contenedor del calendario) son la misma superficie que el panel, así que el iframe no se nota. Se quitó el borde propio de Cal.com.
   - El panel es un azul noche un poco más claro que el cielo de la isla, con el radio del sitio, una línea fina y la sombra suave de los paneles oscuros.
6. **Estado de carga claro.** Mientras Cal.com no avisa que está listo (`linkReady`), queda el esqueleto del mes con la línea visible "Cargando la agenda…". El esqueleto respira solo si no hay movimiento reducido.
7. **Si falla, un enlace en lugar de una caja vacía.** Si no carga el script, Cal.com avisa `linkFailed`, o pasan 15 s sin `linkReady`, el panel muestra "La agenda no cargó. Podés abrirla en Cal.com o escribirnos por WhatsApp." y el botón "Abrir la agenda en Cal.com". Si `linkReady` llega tarde, el calendario vuelve a aparecer. Antes, a los 15 s se ocultaba el esqueleto aunque no hubiera calendario. El enlace chico de abajo ("Si la agenda no carga, abrila en Cal.com") se oculta en ese estado para no repetir la acción.
8. El CSS de la agenda quedó en un solo bloque, "Island 6: Cal.com booking", en `world.css`. Antes estaba repartido en tres lugares.

## Cómo se verificó

Playwright con Chromium headless contra `next dev`. Los scripts están en `docs/plans/contacto-agenda/scripts/` (`lib.cjs` es el de la prueba de usuario).

| Prueba | Antes (mayofy.dev) | Después |
|---|---|---|
| 360x800: altura de la caja / del iframe | 656 / 1.735 px, `overflow: auto` | 1.495 / 1.495 px, sin overflow |
| 360x800: 3 deslizamientos hacia abajo con el dedo en el calendario | 0, 0, 0 px | 426, 502, 438 px |
| 360x800: deslizamientos hacia arriba con el dedo en el calendario | (no comparable) | −451, −365 px |
| 360x800: después de tocar un día, deslizar sobre la lista de horarios | — | 457 px; la página no se mueve sola al tocar (0 px) |
| 1366x768: 4 muescas abajo y 1 arriba sobre los horarios | 0, 0, 0, 0, 0 px (vista de mes, medido en local) | 100, 100, 100, 100, −100 px |
| 1366x768: lo mismo sobre el mes y sobre el encabezado | — | 100 px por muesca |
| Scroll propio adentro del iframe (360, 768, 1024, 1366, 1440) | columna de horarios en escritorio | ninguno |

- **Estados:** script bloqueado → error al instante. Iframe bloqueado → "Cargando la agenda…" y, a los 15 s, el error. Script demorado 9 s → esqueleto con la línea de carga (captura `a03`).
- **Anchos** 320, 360, 390, 768, 1024, 1366 y 1440: sin desborde horizontal. El panel queda alineado con el borde del texto de la isla (16 px en el celular, 80 px en escritorio). El enlace de respaldo mide 44 px de alto.
- **Movimiento reducido** (`prefers-reduced-motion: reduce`): el esqueleto no se anima.
- **Teclado:** desde "Escribir por WhatsApp", Tab entra al calendario de Cal.com (días y horarios son botones del iframe), y el foco se ve en el enlace de respaldo.
- **Consola:** cero errores con la agenda cargada.
- `eslint`, `tsc --noEmit` y `next build` sin errores.
- No se reservó ningún turno: la prueba llegó hasta tocar un día y ver sus horarios. El paso siguiente sería tocar un horario y llenar el formulario de Cal.com.

Capturas en `docs/plans/contacto-agenda/`:

- `a01`: celular, la agenda completa en tres pantallas.
- `a02`: escritorio, vista de columnas.
- `a03`: celular, carga y error.
- `a04`: tablet de 768 px.

## Límites

- **La agenda es larga en el celular:** 1.495 px, casi dos pantallas, porque Cal.com lista los 24 horarios del día. Es el precio de no tener scroll adentro. Si molesta, la alternativa es un botón "Elegir día y hora" que abra Cal.com en su ventana de pantalla completa: es un solo scroll, pero agrega un toque.
- **El texto de los horarios sigue siendo de Cal.com:** "7:00am", y el selector "12 h / 24hs" queda a la vista. El formato de 24 h y el idioma del título del evento se configuran en la cuenta de Cal.com, no desde el código. El título ya no se muestra.
- **"30 minutos por videollamada" está escrito en `site.ts`.** Si Juani cambia la duración o el lugar del evento en Cal.com, hay que actualizar ese texto.
- **Las fuentes de adentro del iframe son las de Cal.com.** Las CSS variables no cambian la tipografía, y no se puede cargar la del sitio adentro de un iframe de otro dominio.
- **Lo que no se pudo probar:** un Android y un iPhone reales (los toques son emulados por CDP) y un touchpad de precisión. El acomodo por secciones (`section-snap.tsx`) es de otro agente; con la isla 6 más alta se comportó como en cualquier sección alta (sin tirones hacia atrás en las mediciones).

# Isla 3: pulido de los packs (24 de noviembre de 2026)

Rama `juanikitro/landing-isla3-pulido`. Pedido de Juani (24/11, la parte de la isla 3), resumido: cambiar la etiqueta verde, sumar un (?) por card con la letra chica, que los (?) se abran también con hover, recortar y reescribir los copies de "Qué incluye", un hover más interesante en las cards y un efecto de profundidad de la isla sobre las cards.

Quedan **sin implementar a propósito** (Juani elige antes): la estética y el hover nuevos de los marcadores de precio sobre las rocas (`.platform__marker`) y la forma de evitar que la card crezca al darla vuelta. Ver "Cómo crece hoy la card dada vuelta" al final.

## Qué cambió

### 1. Copy (`src/content/commercial-plans.ts`)

- La etiqueta verde del pack del medio pasa de "Para ordenar tu negocio" a **"Recomendación de la casa"**.
- Los ítems de "Incluye" de los tres packs se reescribieron en palabras simples, con el mismo significado y la misma cantidad de promesas (salvo los recortes que pidió Juani). Las listas "No incluye" y "Se cotiza aparte" no se tocaron.

**Landing** (9 ítems → 8: se borró uno a pedido)

| Antes | Después |
|---|---|
| Un cuestionario breve para conocer tu negocio, tu servicio y a quién querés atraer. | Unas preguntas cortas para entender tu negocio y a quién le querés vender. |
| Una página con hasta 5 secciones para contar lo importante sin marear a nadie. | Una página que cuenta lo importante sin marear a nadie. |
| Un diseño cuidado y adaptado a tu rubro. | Un diseño prolijo, pensado para tu rubro. |
| Textos base para presentar tu negocio, ajustables a tu estilo. | Los textos ya escritos, ajustados a tu forma de hablar. |
| Botones para que te escriban por WhatsApp con el mensaje listo. | Un botón para que te escriban por WhatsApp con el mensaje ya armado. |
| Enlaces a Instagram, ubicación y las redes que uses. | Tu Instagram, tu ubicación en el mapa y tus otras redes, a un toque. |
| Una buena presentación cuando compartís el enlace por WhatsApp o redes. | *(eliminado)* |
| Tu dominio conectado y la página publicada. | La página publicada en tu propia dirección web, del estilo tunegocio.com. |
| Una instancia de ajustes antes de publicar. | Una vuelta de cambios antes de publicarla. |

**Gestión** (8 ítems)

| Antes | Después |
|---|---|
| Un sistema para ordenar tu negocio: turnos, stock, pedidos o tienda online. | Un sistema para ordenar lo que más tiempo te lleva: turnos, stock, pedidos o ventas online. |
| Un panel para verlo y manejarlo todo desde el celular o la compu. | Tu propio panel para ver y manejar todo desde el celular o la compu. |
| Un enlace para que tus clientes reserven, compren o pidan solos; lo mandás por WhatsApp o lo ponés en Instagram. | Un enlace para que tus clientes reserven, compren o pidan solos, sin esperar a que les contestes. |
| Avisos automáticos por correo para vos y tus clientes, como el recordatorio del turno. | Correos automáticos para vos y tus clientes, como el recordatorio del turno. |
| Un botón para mandar avisos por WhatsApp con el mensaje ya escrito. | Un botón para avisar por WhatsApp con el mensaje ya escrito. |
| Acceso para una persona administradora. | Acceso para una persona: vos o quien maneje el negocio. |
| Carga inicial de tus datos: servicios, horarios, productos o tu lista de clientes. | Cargamos tus datos para que arranques: servicios, horarios, productos o clientes. |
| Una charla para enseñarte a usarlo. | Una capacitación para que lo manejes sin ayuda desde el primer día. |

**Sistema a Medida** (8 ítems)

| Antes | Después |
|---|---|
| Relevamiento de tus procesos y de lo que hoy se hace a mano. | Vemos cómo trabajás hoy y qué se sigue haciendo a mano. |
| Diseño del sistema y de sus datos pensado para tu caso. | Un sistema diseñado para tu forma de trabajar. |
| Cada uno ve lo que le toca. | Un historial de cambios: quién hizo qué y cuándo. |
| Pantallas con la información que necesitás para decidir. | Los números que necesitás para decidir, a la vista. |
| Integración con lo que ya usás: facturación, planillas o pagos. | Se conecta con lo que ya usás: facturación, planillas o cobros. |
| Entregas por etapas para que lo uses antes de terminarlo todo. | Entregas por etapas: empezás a usarlo antes de que esté terminado. |
| Documentación y capacitación para tu equipo. | Capacitación y guías de uso para tu equipo. |
| Si ya tenés Gestión, el sistema crece desde ahí, sin empezar de cero. | Si ya tenés Gestión, crecemos desde ahí, sin empezar de cero. |

### 2. Un (?) por card con la letra chica

Cada card tiene un (?) al lado del precio. Adentro, en este orden:

| Card | Contenido del (?) |
|---|---|
| Landing | La dirección web, el alojamiento y otros servicios se pagan aparte. · El mantenimiento mensual es opcional. · ¿Necesitás varias páginas? La web institucional arranca desde USD 95 y se entrega en 3 a 4 semanas. |
| Gestión | El precio final depende de lo que necesite tu negocio. Si es algo grande, sube y se acerca al de un Sistema a Medida. Queda escrito en la propuesta, antes de empezar. · El mantenimiento mensual es opcional. · ¿También querés una página para mostrar tu negocio? Sumá el pack Landing. |
| Sistema a Medida | El alcance y el precio final se definen después de la primera charla. · El mantenimiento mensual es opcional. |

Esos textos salieron del cuerpo de la card: la línea "El mantenimiento mensual es opcional." bajo el precio, la nota al pie con "(*)" y la nota del dorso. Sin cotización del blue cacheada, bajo el precio queda sólo "Se puede pagar en pesos." (antes decía también lo del mantenimiento). El nombre accesible del (?) es "Más sobre el precio de <pack>". Al no haber más nota al pie, la grilla de la card pasa de 5 a 4 filas compartidas.

### 3. Toggletips accesibles por hover (`src/components/world/toggletip.tsx`)

`PaymentTip` se reemplazó por un componente compartido, `Toggletip`, que usan "Cómo se paga" y los tres (?) nuevos:

- **Con mouse:** se abre al apoyar el puntero 120 ms sobre el (?). Queda abierto mientras el puntero viaja al globo (hay un "puente" invisible en el hueco y 220 ms de gracia) y se cierra al salir de los dos. Un click lo fija abierto; otro click lo cierra.
- **Táctil:** un toque lo abre y otro lo cierra. Un toque afuera también lo cierra (con eventos de puntero, porque iOS Safari no manda `click` al tocar algo que no es clickeable).
- **Teclado:** al enfocar el (?) se abre; Enter o Espacio lo cierran y lo vuelven a abrir. Escape lo cierra y deja el foco en el (?). Mover el foco a otro lado lo cierra.
- **Dónde aparece:** el globo es un popover manual (`popover="manual"`), así que vive en la capa superior: no lo recorta la card, el carrusel del celular ni la cara 3D. La posición la calcula `src/lib/toggletip-placement.ts` (con tests): abierto con click, toque o teclado, aparece **arriba** del (?) y, si no entra bajo el header, la página baja lo justo para que entre arriba (el arreglo previo del celular). Abierto con hover nunca mueve la página: arriba si entra, si no abajo. Mientras está abierto sigue al (?) cuando se scrollea la página o el carrusel, del mismo lado; si el (?) sale de la pantalla por un swipe, se cierra.
- `html[data-popover-open]` se mantiene mientras haya algún globo abierto (un contador por si dos se superponen un instante).

### 4. Hover de las cards (`src/components/world/card-light.tsx`, `world.css` "Pack card hover")

Sólo con puntero que hace hover y sin movimiento reducido (`prefers-reduced-motion` ni `html[data-motion-tier="reduced"]`). Además de la subida de 2 px y la sombra más profunda que ya había: una luz cálida y suave sigue al puntero por el fondo de la card, debajo del texto; el borde de la card destacada se afirma y el botón "Quiero…" se despierta con su sombra. Sin inclinación ni escala, así el texto no se ve borroso. La luz se mueve sólo con `translate` en su propia capa, una vez por cuadro.

### 5. Profundidad de la isla sobre las cards (`world.css`, "The island over the cards")

Una bruma fría en la parte de arriba del frente de cada card, como la sombra del borde de la isla flotante. Mientras la isla todavía se ve encima de las cards la sombra está entera; a medida que las cards suben y la isla se va, se afina y se retrae hacia arriba (línea de tiempo de vista sobre `.packs`, no sobre el scroller del carrusel). Sólo `opacity` y `scale`, debajo del texto, sin cambios de layout. Con movimiento reducido o sin soporte de `animation-timeline` queda quieta a media intensidad.

## Cómo se verificó

- `npm run lint`, `npm run typecheck`, `npm test` (incluye 6 tests nuevos de la ubicación del globo; RED observado antes de cada implementación) y `npm run build`: sin errores.
- Playwright sobre `next dev` (`waitUntil: "domcontentloaded"`), Chromium a 1440×900, 1366×768, 390×844 y 360×800, más WebKit a 390×844: 43 chequeos de los toggletips pasan dos veces seguidas: hover con demora, viaje al globo, cierre al salir, click que fija, Escape (fijado y con hover, sin reabrir mientras el puntero sigue encima), foco por teclado, Enter, los tres (?) y "Cómo se paga" con hover sin mover la página, toques en el celular (abre arriba y dentro de la pantalla, segundo toque cierra, toque afuera cierra). El carrusel del celular sigue con `overflow-y: hidden`, scroll sólo horizontal y sin scroll horizontal de la página. Sin errores de consola (sólo los recursos de terceros que el script bloquea a propósito).
- Hover de las cards a 1440 y 1366: la luz sigue al puntero (`--x`/`--y` cambian, `opacity` 1). Con `reducedMotion: reduce` la luz no se muestra y la sombra de la isla queda quieta (`animation: none`, opacidad 0,75).
- Ya no aparece en el cuerpo de ninguna card "(*)", "mantenimiento mensual", ni las notas movidas.
- Capturas antes y después (fuera del repo): `C:\Users\Juanito\AppData\Local\Temp\claude\C--Users-Juanito-orca-workspaces-mayofy-landing-landing-isla3-pulido\450854d7-67a2-4dc5-a267-cb76c112a4b3\scratchpad\shots\before\` y `...\shots\after\` (y `...\shots\final\` para los globos).

## Límites

- En navegadores sin `animation-timeline` la sombra de la isla es estática; en navegadores sin Popover API el globo usa `hidden` y posición fija, y una cara 3D podría recortarlo.
- El comentario de `guided-scroll.ts` todavía nombra `PaymentTip`; no se tocó ese archivo para no cruzarse con otros cambios.
- No se probó en un iPhone real ni con lector de pantalla.

## Cómo crecía la card dada vuelta (para elegir alternativa; resuelto con tabs en la segunda vuelta, abajo)

- **Escritorio y tablet:** el dorso es `position: absolute` con `inset: 0 0 auto` y `min-height: 100%`, y su lista no scrollea (`.pack .flip__scroll { overflow: visible }`, pedido del 24/11 de no tener scroll interno). Entonces el dorso mide lo que su contenido: a 1440 el frente mide 603 px y el dorso 683 px en Landing (+80) y 774 px en Gestión (+171). Sobresale hacia abajo y tapa la franja de garantías (`.pack[data-flipped] { z-index: 4 }`); las otras dos cards no cambian.
- **Celular:** el dorso pasa a `position: relative` y el frente a `absolute`, así que la card toma la altura del dorso: a 390, Landing pasa de 640 a 866 px (+226) y Gestión de 608 a 911 px (+303), y el carrusel cambia de alto.

## Segunda vuelta: carteles de madera y tabs en el dorso (24 de noviembre de 2026)

Elección de Juani: "Marcadores de precio, elijo el cartel de madera" y "Sobre la card que crece, añadamos tabs al dorso, siempre una abierta, además de la mejora en los textos puede quedar bien".

### 1. Carteles de madera en la isla 3 (`platform-markers.tsx`, `rock-island.tsx`, `stage.ts`, `world.css` "Wooden signs")

- Cada marcador de precio es un cartel chico de madera pintada: una tabla con veta (cada cartel muestra otro tramo de la misma veta), luz cálida en los bordes de arriba e izquierda y sombra abajo y a la derecha, como la luz de las placas pintadas. Un clavo arriba al centro y una estaca de madera que baja hasta la roca, en lugar del palito crema. Todo es CSS; no se agregó ninguna imagen.
- Nombre y precio van escritos en la tabla y la flecha se mantiene en escritorio. En el celular el nombre va sobre el precio, sin flecha (ya era así antes), con un ancho máximo para que el tercer cartel no toque el borde a 360 px.
- **Hover (con puntero) o foco por teclado:** la tabla se balancea como un cartel colgado, un péndulo amortiguado alrededor del clavo (dos vaivenes en 1,5 s y queda quieta), y el cartel y su roca suben 4 px. La roca sube con una copia de la placa pintada recortada al contorno de esa pila de rocas (`platformLiftOutlines` en `stage.ts`, trazado desde las pinturas) que se desvanece en el pie; es la misma imagen, no se descarga nada nuevo. La roca sólo sube cuando las plataformas ya están armadas.
- El foco por teclado tiene además el anillo visible. Un cartel al que se llega con Tab antes de que su plataforma se arme se muestra igual (nunca hay foco sobre algo invisible).
- Sin balanceo ni subida con `prefers-reduced-motion` ni con `html[data-motion-tier="reduced"]`.
- Se mantienen el objetivo de click de 44 px o más y la pista para lectores de pantalla.

### 2. Tabs en el dorso de las cards de packs (`pack-tabs.tsx`, `flip-card.tsx`, `commercial-plans.ts`, `src/lib/tab-keys.ts`)

- El dorso de cada pack muestra sus grupos como tabs, siempre una abierta. Al dar vuelta la card se abre la primera (FlipCard vuelve a montar el dorso en cada vuelta con `resetBack`).
- El dorso queda exactamente sobre el frente, en escritorio y en el celular. La tab abierta entra en esa altura, así que la card dada vuelta ya no crece, no tapa la franja de garantías, no cambia el alto del carrusel y no scrollea por dentro.
- Los grupos se reordenaron y se renombraron para que sean etiquetas cortas (tres entran en el ancho de una card de celular). Los textos de cada punto no cambiaron, sólo de grupo:

| Pack | Tabs |
|---|---|
| Landing | Tu página · El proceso · No incluye |
| Gestión | Tu sistema · El arranque · Extras (antes "Se cotiza aparte") |
| Sistema a Medida | Tu sistema · El proceso |

- **Accesibilidad:** patrón ARIA de tabs (`tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`/`aria-labelledby`), una sola parada de Tab en la fila; Izquierda/Derecha cambian de tab (con vuelta al principio) e Inicio/Fin van a los extremos, y el foco sigue a la tab abierta. Tab pasa de la tab a su panel. Cada tab mide 44 px de alto. La lógica de teclas está en `src/lib/tab-keys.ts` con tests.
- **Dentro del carrusel del celular:** la fila de tabs no scrollea por su cuenta y no toma los gestos (`touch-action` por defecto), así que un deslizamiento lateral que empieza sobre una tab mueve el carrusel y no cambia de tab; un toque cambia de tab.
- `DetailGroups` (`pack-groups.tsx`) queda sólo para el dorso de la card de mantenimiento.

### Alturas del frente y del dorso, antes y después (px)

Medidas con Playwright (Chromium), la card dada vuelta, revisando cada tab. "Pisa" es cuánto baja el dorso sobre la franja de garantías (negativo: no la toca). "Carrusel" es el alto de la fila de cards del celular.

| Viewport | Card | Antes: frente / dorso | Antes: pisa / carrusel | Después: frente / dorso | Después: pisa / carrusel |
|---|---|---|---|---|---|
| 1440×900 | Landing | 603 / 683 | 60 / — | 603 / 603 | −20 / — |
| 1440×900 | Gestión | 603 / 774 | 151 / — | 603 / 603 | −20 / — |
| 1440×900 | Sistema | 603 / 603 | −20 / — | 603 / 603 | −20 / — |
| 1366×768 | Landing | 603 / 706 | 83 / — | 603 / 603 | −20 / — |
| 1366×768 | Gestión | 603 / 774 | 151 / — | 603 / 603 | −20 / — |
| 1366×768 | Sistema | 603 / 603 | −20 / — | 603 / 603 | −20 / — |
| 390×844 | Landing | 640 / 866 | — / 712→938 | 640 / 640 | — / 712→712 |
| 390×844 | Gestión | 640 / 911 | — / 712→983 | 640 / 640 | — / 712→712 |
| 390×844 | Sistema | 640 / 640 | — / 712→712 | 640 / 640 | — / 712→712 |
| 360×800 | Landing | 682 / 888 | — / 754→960 | 682 / 682 | — / 754→754 |
| 360×800 | Gestión | 682 / 957 | — / 754→1029 | 682 / 682 | — / 754→754 |
| 360×800 | Sistema | 682 / 682 | — / 754→754 | 682 / 682 | — / 754→754 |

La tab más cargada (Gestión, "Tu sistema") deja todavía 119 px libres a 360×800 y 130 px a 1440×900 entre el último punto y "Volver", así que no hizo falta recortar textos ni espacios.

### Cómo se verificó

- `npm run lint`, `npm run typecheck`, `npm test` (4 tests nuevos de `tabIndexForKey`; RED observado antes de escribir el módulo) y `npm run build`: sin errores.
- Playwright sobre `next dev`, dos corridas seguidas, Chromium a 1440×900, 1366×768 (con movimiento reducido), 390×844 y 360×800 táctil, y WebKit a 390×844 táctil: roles y relaciones ARIA, primera tab abierta, una sola parada de Tab, tabs de 44 px, flechas/Inicio/Fin con el foco siguiendo, Tab al panel, click y toque cambian de tab, dar vuelta otra vez abre la primera, deslizar de lado sobre una tab mueve el carrusel una card sin cambiar de tab (Chromium, eventos táctiles reales por CDP), sin scroll horizontal de la página. Sin errores de consola.
- Carteles: dentro de la pantalla y de 44 px o más a 1440, 1366, 390, 360 y WebKit 390; hover y foco balancean y suben la roca; el balanceo termina quieto; con movimiento reducido no hay animación ni subida. Sin errores de consola.
- Capturas (fuera del repo), en `C:\Users\Juanito\AppData\Local\Temp\claude\C--Users-Juanito-orca-workspaces-mayofy-landing-landing-isla3-pulido\335aa93f-654f-418c-8834-7a9959d81f72\scratchpad\shots\`: `tabs-before\` y `tabs-after\` (cada card dada vuelta, cada tab, cuatro tamaños) y `tabs-round\` (carteles en reposo, hover y foco).

### Límites

- En WebKit no se pudo simular un deslizamiento táctil real; ahí se comprobó el toque y que las tabs no bloquean el gesto (`touch-action: auto`). No se probó en un iPhone real ni con lector de pantalla.
- Las tabs de Sistema a Medida son dos, no tres: no hay un grupo "No incluye" para ese pack.

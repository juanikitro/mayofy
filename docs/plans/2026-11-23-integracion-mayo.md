# Integración de Mayo en las islas 2, 3, 6 y 7

Pedido de Juani (23/11/2026): mejorar la integración de Mayo (interacción con el entorno, luces y sombras, velocidad de las animaciones que responden al scroll) en todas las islas menos la 1, 4 y 5. En la isla 3 faltaba sombra y la animación resultaba incómoda.

## Qué cambió

**Primera entrega (f6fdbc8, solo código)**

- Isla 3: una sombra de contacto, separada de las tiras, sigue el desplazamiento de Mayo a la altura de sus patas, también durante los relevos entre tiras.
- Isla 3: la vuelta al cuadro de unión avanza al ritmo normal del bucle. El ajuste por scroll se reparte sobre el 80 % del tramo en lugar del 25 %. La altura sigue en 320 vh y el scroll guiado no cambió.
- Islas 2, 6 y 7: menos repeticiones del ciclo en cada tramo.

**Segunda entrega (tiras repintadas)**

Las tiras de escritorio (`*-tira.avif`/`.webp`, 12 cuadros de 640 px) y las de celular (`*-tira-cel.avif`) se pintaron de nuevo con la hoja de estilo `70-mayo-hoja-estilo.png` como referencia de identidad: pelaje carbón, pechera blanca y una línea blanca fina en la frente. Las tiras anteriores se habían corrido a un marrón cálido.

- Isla 2 (`problem-v2`): Mayo juega con una reverencia y un salto corto en el claro, entre las rocas.
- Isla 3 (`packs-mira`): Mayo gira la cabeza siguiendo las rocas que caen, antes del salto.
- Isla 6 (`host-v2`): Mayo pasa de echada a sentada, mirando la fogata. El cambio de pose obligó a agregar una capa de contacto CSS (`mayoAnchors.host.contact`), porque la sombra pintada de la pose echada ya no servía.
- Isla 7 (`questions-v2`): Mayo, sentada, levanta la cabeza hacia la luciérnaga. Se rehízo la capa de contacto para la nueva silueta.
- Ritmo del bucle: isla 2 de 1,4 s a 2 s e isla 7 de 2,2 s a 2,6 s (`world.css`).

**Tercera entrega (pedido de Juani del 24/11/2026: sombra tenue, segundo salto de la isla 3, isla 6 y luz de las islas 6 y 7)**

- **Luz en las islas 6 y 7.** La luz cálida se agrega por código sobre las tiras, sin tocar la silueta ni el canal alfa, con `integracion-mayo/relight.js` (`sharp`):
  - Borde de luz: se aclaran con modo pantalla los píxeles de la silueta expuestos hacia la fuente, medidos a 5, 12 y 22 px hacia la luz y apenas hacia arriba, y difuminados 3 px.
  - Lavado cálido: un tinte multiplicado que crece hacia el lado de la fuente.
  - Isla 6: fogata desde la derecha, `255,140,50`, borde 1 y lavado 0,5.
  - Isla 7: farol desde la izquierda, `255,165,80`, borde 1 y lavado 0,42.
  - Una primera pasada (borde 0,8-0,9 y lavado 0,3-0,35) quedó demasiado sutil, así que se rehízo con más intensidad partiendo de las tiras sin iluminar.
  - Las tiras de celular (256 y 224 px) se regeneran desde la de escritorio ya iluminada.
  - Para repetirlo: `node docs/plans/integracion-mayo/relight.js <repo> host-v2 1 255,140,50 1 0.5 --write`. Hay que partir de la tira sin iluminar (commit 5673265), porque aplicarlo dos veces acumula el efecto.
- **Isla 6, la mirada hacia Juani.** Mayo ya giraba la cabeza de quien lee (cuadros 1-3) hacia el fuego (4-7) y después hacia Juani (10-12), pero el bucle en el tiempo la barría sin pausa en 3,2 s y la mirada a Juani duraba un instante. Ahora el bucle (`mayo-host-gaze`, 5 s ida y vuelta) se detiene: mira hacia afuera un momento, sostiene el fuego unos 1,3 s y sostiene a Juani unos 2,5 s. En la placa, Juani la mira desde el banco, así que la escena se lee como un intercambio de miradas.
- **Segundo salto de la isla 3.** El salto largo recorre 2,7 anchos de Mayo y antes ocupaba 40 vh, igual que el salto chico, con 20 vh en el aire. Con la rueda cruzaba unos 300 px en dos pasos. Ahora cada salto tiene su propio tramo (`timing.hops: [52, 92, 152]`, animaciones `packs-mayo-hop` y `packs-mayo-leap`):
  - Salto chico: 40 vh.
  - Salto largo: 60 vh, de los cuales 30 en el aire. Aterriza a la par de la tercera plataforma (128,9 vh).
  - Se corre todo lo posterior 20 vh: sentarse en 152-180, bucle sentado desde 198, fundido de la placa en 184-202 y descansos `data-scroll-rest` en 80, 140 y 204 vh.
  - La sección sigue midiendo 320 vh (220 vh de scroll fijado) y no se tocó el código del scroll guiado.
- **Sombra de contacto más marcada.** Isla 2: la proyectada sube a 0,66 y la oclusión bajo las patas a 0,86 y 0,82, y se reubicó bajo las patas de la reverencia. Isla 3: el contacto (`.packs-mayo::before`) pasa del marrón al verde sombra del pasto, con un núcleo denso bajo las patas dentro de un charco más suave.

**Cuarta entrega (24/11/2026, "mejora la sombra de este frame", isla 2)**

La sombra de la isla 2 seguía sin verse por dos motivos:

- **Medidas que no coincidían con la tira:** una oclusión caía en x 33 %, donde no hay ninguna pata.
- **Radios demasiado chicos:** Mayo mide unos 120 px en pantalla, así que un radio vertical de 2 a 4 % de su celda son 3 a 5 px, y casi todo queda tapado por su cuerpo.

Las 12 posturas de la reverencia apoyan las patas en el mismo lugar: la trasera en x 23-31 % (apoyo en y 83 %) y las delanteras en x 44-55 % y 66-77 % (apoyo en y 88 %). La capa nueva (`mayoAnchors.problem.contact`, tinte `18 36 6`) tiene:

- una oclusión por pata, con radio vertical de 5,5 %;
- una penumbra bajo el pecho;
- una sombra proyectada hacia abajo a la izquierda, como la de las rocas.

Los valores se eligieron comparando variantes inyectadas en el navegador. En `integracion-mayo/sombra-isla-2.jpg`, de izquierda a derecha: la versión anterior, una variante intermedia y la elegida.

## Evidencia

- `integracion-mayo/isla-{2,3,6,7}.jpg`: cuatro cuadros por isla. Arriba, la tira anterior; abajo, la nueva (en la 6 y la 7, con la luz final).
- `integracion-mayo/en-escena.jpg`: Mayo en su placa a 1440x900, en tres puntos del scroll por isla (filas 2, 3, 6 y 7), antes de la tercera entrega.
- `integracion-mayo/luz-6-7.jpg`: la primera pasada de luz, que quedó demasiado sutil.
- `integracion-mayo/ajustes-finales.jpg`: estado final. Arriba, la sombra en las islas 2 y 3; abajo, la isla 6 (Mayo mira a Juani con la luz del fuego) y la isla 7.

## Verificación (24/11/2026)

- Lint, typecheck y `next build` (Turbopack, con `node_modules` propio) pasan.
- Isla 3 a 1440x900 con rueda (100 px por paso): el salto largo ahora ocupa tres pasos, a unos 105 px de pantalla cada uno; antes eran dos pasos, de 150 a 175 px cada uno. Se lee la secuencia mirar, salto chico, salto largo, aterrizar y sentarse.
- Isla 3 a 390x844, recorriendo la sección: el salto chico ocurre entre 60 y 80 vh y el largo entre 100 y 140 vh.
- Islas 2, 6 y 7 se animan en el tiempo, no con el scroll (decisión de Juani del 20/11). La isla 6 se midió durante 10 s: sostiene a Juani y al fuego como se describe arriba.
- 390x844: las tiras `-cel` de las islas 2, 6 y 7 cargan. Sin errores de consola ni desborde horizontal.
- Movimiento reducido: ninguna animación de Mayo queda activa.
- Cero errores de consola en escritorio y celular.
- Trackpad simulado (deslizamientos de unos 280 px en pasos de 1 a 30 px cada 16 ms, con inercia): la isla 3 avanza sin cortes. Un deslizamiento moderado cubre el salto largo entero, que se ve animado en unos 0,35 s, más o menos la duración natural de un salto.
- Táctil a 390x844 con eventos `touchStart`/`touchMove`/`touchEnd` de CDP (deslizamientos de 300 px): la página se desplaza entre 285 y 800 px por deslizamiento, con inercia y scroll guiado. El salto largo ocurre durante un deslizamiento y la página se detiene después del aterrizaje (descanso de 140 vh). Sin errores ni desborde.

## Limitaciones

- La luz de las islas 6 y 7 es un retoque por código, no una pintura: el borde cálido sigue la silueta, pero no modela volumen como lo haría una pasada pintada.
- Trackpad y toque se probaron con eventos simulados en Chromium, no en hardware real. Falta que Juani lo pruebe con su trackpad y su teléfono (Safari en iPhone incluido, donde el scroll por animaciones de CSS tiene soporte propio).

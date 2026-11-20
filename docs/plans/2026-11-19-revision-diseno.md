# Revisión de diseño de la landing (mundo de Mayo), segunda vuelta

**Fecha:** 19 de noviembre de 2026
**Rama:** `juanikitro/landing-design-review-2`, creada desde `juanikitro/landing-redesign` (`7e7ab59`). No está publicada ni mergeada.
**Método:** skill `design-taste-frontend` (checker y finish gate) y revisión en Chromium (Playwright) a 1440 × 900 y 390 × 844, con pasadas a 1280, 1024 y 320 px.
**Alcance:** todo menos la isla 3 (`#packs`, plataformas, detalle de packs), que trabaja otro agente. No se reabren decisiones aprobadas ni se toca el copy ni las imágenes.

## Pedido de Juani (textual)

> "quiero que lances un agente que utilice la skill /design-taste-frontend para hacer una revision de diseño ya que creo que hay mucho que mejorar, por ejemplo: el tamaño de mayonesa [Mayo] al lado de los otros elementos naturales, transiciones visibles entre cielos, secciones vacias de utilidad sin impacto, [...] la interaccion con mayo, su animacion y el entorno (corriendo a destiempo), el tamaño de la UI de la integracion de cal.com y el formulario"

**Cambio de alcance durante la revisión:** Juani aprobó repintar a Mayo en el lugar sobre recortes de cada placa v2 (hero, islas 2, 4, 5, 6 y 7). Por eso esta rama **no cambia el tamaño, la posición, la sombra ni el scrub de Mayo**: los dos commits que lo hacían quedaron revertidos y se documentan abajo como propuesta.

## Capturas

`docs/plans/revision-diseno/antes/` (servidor del coordinador, puerto 3010) y `docs/plans/revision-diseno/despues/` (esta rama, puerto 3011). `d-` es 1440 × 900, `m-` es 390 × 844; el número es la pantalla dentro de la sección. Además: `*-inicio-salida.jpg` (salida del hero hacia la caída), `d-trabajos-pie.jpg` (pie de la isla 5 hacia la 6) y `despues/m-contacto-agenda.jpg` (agenda en celular).

## 1. Costuras de cielo

### Banda dura bajo la isla del hero y al pie de las islas

- **Hallazgo:** en 9.png y 10.png, bajo la isla del hero, una banda plana de color con un borde horizontal. Lo mismo al pie de las islas 4 a 7 en escritorio y el "recuadro más claro" alrededor de la isla 2 en celular.
- **Causa:** el fondo del par de parallax (`plate-background-drift`) subía un 9 % por encima de la isla fija. Al subir dejaba al descubierto, abajo, el degradado CSS de la sección (que termina en un color plano), y el borde inferior de la imagen se veía como línea. Además el movimiento era al revés: el cielo lejano iba más rápido que la isla, que es lo que se lee como "cerca".
- **Corrección (`dfbb31b`):** en el hero y en las islas 2 y 4 a 7 el fondo ahora **baja** un 7 % (`plate-background-depth`): el cielo lejano va más lento que la isla y se lee como profundidad. Su último 14 % se funde (`mask-image`) con el cielo de la sección, que termina en el color de la última fila de la placa, así que el pie nunca dibuja una línea. En celular el hero no tiene par propio (la placa única trae la isla pintada), así que ya no deriva: antes se llevaba la isla y dejaba a Mayo flotando durante la salida. La isla 3 conserva su deriva propia.
- Antes / después: `antes/d-inicio-salida.jpg` → `despues/d-inicio-salida.jpg`; `antes/d-trabajos-pie.jpg` → `despues/d-trabajos-pie.jpg`.

### Paso del hero a la caída

- **Hallazgo:** debajo de la banda anterior aparecía una franja lavanda fría que cortaba el amanecer.
- **Causa:** los cuadros de la caída avanzan con el rango `cover` de la sección, que empieza cuando su borde superior entra por abajo. Cuando ese borde llega a la mitad de la pantalla ya está opaco el cuadro 02, que no tiene el velo del cuadro 01; su cielo lavanda tocaba directamente el del hero.
- **Corrección (`6ae6ccc`):** el escenario de la caída lleva su propio velo con el último color del hero (por encima de los cuadros y de las nubes de atrás, por debajo de Mayo). Se mantiene opaco hasta el 60 % del tramo `cover 0 %`–`contain 0 %` y desaparece cuando el escenario queda fijo. En la caída quieta (movimiento reducido) el velo queda puesto.

### Atardecer → crepúsculo → noche → footer

- **Hallazgo:** al terminar la isla 5 el cielo pasaba de rosa a azul noche en 6rem (~100 px): se leía como banda. Lo mismo, más suave, entre las islas 6 y 7.
- **Corrección (`a8fee39`):** el pie fundido de cada placa termina en un color intermedio (violeta de primer crepúsculo, azul de crepúsculo, azul noche que retoma el footer) y los degradados de entrada del crepúsculo y la noche pasan a 7rem. Cada cambio de luz se reparte en ~200 px entre el pie de una isla y el arranque de la siguiente, en escritorio y en celular.

## 2. Espacio vacío sin intención

- **Hallazgo:** en la isla 2 (11.png) la frase corta quedaba arriba a la izquierda, una isla chica abajo al centro y una pantalla de cielo vacío entre ambas.
- **Corrección (`dfb2114`):** desde 64rem la placa de la isla 2 crece un 25 % y se corre a la derecha (`anchorX: "30%"` en `stage.ts`, que sólo actúa mientras la placa está escalada). La holgura del contenido y el cielo usan la escala (`--plate-scale`), así que el texto sigue encima de la isla y la sección sigue midiendo una pantalla a 1440 × 900. Las rocas que nombra el texto ("como estas rocas") ahora ocupan el ancho debajo de él. En celular no cambia.
- Antes / después: `antes/d-problema-0.jpg` → `despues/d-problema-0.jpg`.
- Las demás islas están cargadas de contenido (paneles, trabajos, pasos, FAQ); no se encontró otra pantalla vacía. El bloque de Juani en la isla 6 deja libre la mitad derecha de su primera pantalla, igual que todas las islas (texto a la izquierda); se dejó así.

## 3. Cal.com y formulario

| Medida | Antes (3010) | Después |
| --- | --- | --- |
| Isla 6 a 1440 × 900 | 2763 px | 2309 px |
| Cal.com a 1440 | 1040 × 570 px en una caja oscura de 1230 px | 824 × 534 px |
| Formulario a 1440 | 716 px de alto, columna junto a otra vacía | 413 px, tres columnas |
| Isla 6 a 390 × 844 | 4087 px | 2860 px |
| Cal.com a 390 | 1631 px (dos pantallas) | 692 px visibles, desplazable por dentro |

- **Causa:** Cal.com se estiraba a todo el panel; su vista compacta (mes y horarios lado a lado) aparece desde un marco de ~820 px y se apila por debajo de ~760 px (medido). El formulario era una columna de 760 px con un espacio vacío a su izquierda, dentro de una segunda tarjeta oscura, con campos de 48 px y un mensaje de 9rem.
- **Corrección (`f23100f`, `4948f0d`, `68a36c2`):**
  - Cal.com con el ancho de su vista compacta (51,5rem) desde 64rem. Desde 88rem la invitación, su texto y el enlace a WhatsApp van primero sobre el borde izquierdo del panel y la agenda a la derecha.
  - El formulario reparte sus campos en tres columnas desde 64rem (el mensaje ocupa dos), se apoya en el panel en lugar de una segunda tarjeta y usa campos de 44 px (área táctil mínima) con texto de 1rem y un mensaje de 6,5rem. El orden del tabulador sigue la lectura (fila por fila) y el anillo de foco se ve.
  - En celular Cal.com muestra el día elegido con todos sus horarios en una columna: su marco se detiene en `min(44rem, 82svh)` y se desplaza por dentro, con los primeros horarios asomando al pie. La rueda o el dedo recorren la agenda hasta su final y después siguen con la página (verificado con rueda; el gesto táctil no se pudo probar en un teléfono real).
- Antes / después: `antes/d-contacto-0..3.jpg` → `despues/d-contacto-0..2.jpg`; `antes/m-contacto-*.jpg` → `despues/m-contacto-*.jpg` y `despues/m-contacto-agenda.jpg`.

## 4. Mayo (propuesta, no aplicada en esta rama)

Con la repintada en el lugar aprobada, el tamaño, el ángulo, la luz y la sombra de Mayo los define cada tira nueva. Lo que se midió queda como referencia para el ilustrador y para montar las tiras.

### Escala frente a árboles, rocas y banco (`22bc9b5`, revertido en `3bbaf5f`)

| Lugar | Hallazgo | Tamaño probado (escritorio / celular) |
| --- | --- | --- |
| Hero | Sentada, alta como el 70 % del árbol (8.png) | 10 % → 6,5 %; 22 % → 14,5 %: la cabeza a un tercio del árbol, apenas por encima del cartel |
| Isla 2 | Más alta que las rocas con musgo | 10,5 % → 8,5 %; 22 % → 18 %: como las rocas |
| Isla 5 | Su zancada cubría tres piedras del sendero | 10 % → 8 %; 20 % → 16 %: unas dos piedras |
| Isla 6 | Echada, casi tan larga como el banco | 10,5 % → 8,5 %; 21 % → 17 %: la mitad del banco, la cabeza bajo el asiento |
| Isla 7 | Correcta frente al farol; grande para una isla lejana | 7 % → 6 %; 18 % → 15,5 % |

Regla útil para pintar: sentada o parada, la cabeza de Mayo a un tercio de la altura de un árbol adulto; parada, como una roca grande con musgo; echada, la mitad de un banco de troncos.

### Carrera de la isla 5 "a destiempo" (`ecbc139`, revertido en `8461fa3`)

- **Medición sobre la tira actual:** en los cuadros de apoyo la pata plantada casi no se mueve dentro de la celda (f1→f2 +6,5 %, f2→f3 +0,2 %, f6→f7 −1 % del ancho de celda). Una carrera "en el lugar" bien pintada desplaza la pata apoyada hacia atrás a velocidad constante; ésta no, así que cualquier recorrido la hace patinar.
- **Lo que más se nota:** el recorrido (`mayo-travel`) era continuo mientras la tira, escalonada con `steps()`, sostiene cada pose durante ~30 px de scroll. Con el scroll lento Mayo se desliza con la pose quieta.
- **Propuesta (en `ecbc139`):** el recorrido avanza una vez por cuadro pintado, en los mismos límites de paso que la tira (`steps(vueltas × cuadros, jump-none)` sobre el mismo rango), y las vueltas siguen el largo del cuerpo (~87 % de la celda): una zancada por largo de cuerpo. Con el tamaño actual (10 %) y el recorrido de 22 % de la placa son 2,2 celdas; con 8 % serían 3 vueltas en escritorio. En celular el prado es más corto (20 % de la placa con 16 %, 1,25 celdas): 1,5 vueltas, con un nuevo `cyclesMobile`. Medido: 36 posiciones de recorrido a 1440 y 18 a 390, cada una coincide con un cambio de cuadro y ninguna ocurre entre dos.
- **Para la tira nueva:** pintar la carrera con la pata apoyada retrocediendo a velocidad constante y medir ese avance por cuadro; con él se fija el recorrido por vuelta (avance por cuadro × 12) y se elimina el patinazo también entre pasos. El coordinador aplica `ecbc139` cuando llegue la tira.

### Hero, caída e isla 7

Sin cambios: el hero sigue sentado sin salto, la caída corre su bucle por tiempo y la isla 7 queda en su lugar (ya en `landing-redesign`).

## 5. Checker del skill

Finish gate en 3 rondas: **85 → 82 FAIL, `GATE: OPEN 82 (rounds used up)`**. Cuatro waivers en `.taste-skill/waivers.json` (no versionado), todos falsos positivos medidos:

- `text-contrast` en el cuerpo y en "estoy yo" de la isla 6: texto claro sobre el cielo de crepúsculo (~9:1); el checker lee el beige de la página detrás de la escena.
- `shader-lint`: el "script" es el payload RSC de Next.js (JSON con nombres de clase); la página no tiene WebGL.
- `contrast` en la nota del footer: tinta noche sobre el fondo noche (~9:1).

Quedan abiertos, a propósito:

- **Decisiones aprobadas del concepto:** animaciones ligadas al scroll y escenas fijas (`scroll-linked`, `pinned`, `moment-none`, `effect-kind`), secciones de más de dos pantallas y la caída sin contenido (`section-height`, `one-section`, `section-air`, `section-gaps`), navegación en píldora e indicador de huellas (`nav`, `nav-covers`), dos estilos de botón (`button-styles`).
- **Copy aprobado:** `copy-fact`, `copy-headings`, los marcadores de trabajos 4 a 6 (`placeholder`, `card-visual`) y el número de WhatsApp real (`phone-number`).
- **Isla 3 y detalle de packs (otro agente):** `flush`, `stagger`, `no-visual`, `focus-visible`, `hidden-content`, `empty-area`, `container-edges` de `#packs` y `.packs__payment`.
- **`spill` de las capas de fondo:** el fondo que deriva sale de su placa a propósito y lo recorta la sección (`overflow: clip`).
- **`spill` del campo de referencia a 390:** el formulario termina 18 px dentro de la caja de la placa de la isla 6, en su zona transparente; no se ve ninguna superposición.
- **`container-edges` del enlace "Si la agenda no carga" a 1440:** empieza en el borde izquierdo de la agenda, no en el del panel. Alinearlo a la derecha no satisfacía el chequeo y se leía peor, así que se dejó bajo la agenda.

## Verificación

- Chromium (Playwright) sobre `next dev` en el puerto 3011, a 1440 × 900 y 390 × 844, con 1280 × 720/800, 1024 × 768 y 320 px para la isla 2, la agenda y el desborde horizontal: sin scroll horizontal a 320 y 390.
- Teclado: el primer Tab llega a "Saltar al contenido"; en el formulario el foco recorre los campos fila por fila con su anillo visible.
- Movimiento reducido emulado: ningún fondo deriva, las tiras de Mayo quedan en su primer cuadro y el velo de la caída queda puesto.
- `npm run lint` (sin errores; las advertencias son sólo de los scripts de captura en `.playwright-mcp/`, ignorado por git), `npm run typecheck` y `npm run build` limpios. No hay test runner en el repo.

## Pendiente

- Probar en el teléfono de Juani (`http://192.168.1.30:3011`), sobre todo el desplazamiento táctil dentro de la agenda.
- Montar las tiras repintadas y aplicar `ecbc139` a la carrera de la isla 5.

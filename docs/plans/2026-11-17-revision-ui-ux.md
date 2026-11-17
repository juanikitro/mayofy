# Revisión de UI/UX de la landing (mundo de Mayo)

**Fecha:** 17 de noviembre de 2026
**Rama:** `juanikitro/landing-ui-review`, creada desde `juanikitro/landing-redesign` (`72668fa`) y rebasada el mismo día sobre `f7b0bba`, que monta los pares de parallax de las islas 3 a 7. No está publicada ni mergeada.
**Alcance:** maquetación y estructura de lo construido: alineación, ubicación de cada elemento, superposiciones, ritmo y fluidez de las animaciones. No se reabren decisiones aprobadas, no se reescribe copy y no se tocan imágenes de `public/`.
**Método:** skill `design-taste-frontend` (checker y finish gate) más revisión en Chromium real a 1440 × 900, 1280 × 720, 1024 × 768, 820 × 1180, 390 × 844 y 320 px.

## Resumen

La landing tenía cuatro problemas estructurales que se repetían en casi todas las islas:

1. **Costuras de cielo.** Cada sección pintaba su propio degradado y terminaba en un color distinto del que empezaba la siguiente: bandas azules, naranjas y violetas entre islas, y una franja al pie de las islas con parallax.
2. **Paneles sobre la isla.** El contenido de las islas 4 a 7 terminaba por debajo del borde superior de la isla pintada: el formulario tapaba la cabeza de Mayo, el mantenimiento tapaba a Mayo y al farol.
3. **Tres bordes izquierdos distintos.** Hero en 48 px, islas en una columna centrada de 768 px que arrancaba en 336 px, detalle de packs y footer en 48 px. El indicador de huellas tapaba el borde derecho de las tarjetas.
4. **Mayo fuera de su ancla en el hero.** La animación de salto pisaba el `transform` de anclaje: Mayo quedaba medio cuerpo a la derecha y un cuerpo más abajo, sobre el borde de la isla.

A eso se suman problemas puntuales: objetos flotando en el cielo en celular, tarjetas de packs despegadas de sus plataformas, rocas cruzando el título, el texto del hero pisando el árbol, la caída con un final de cielo vacío y animaciones que forzaban relayout en cada cuadro.

## Cambios por sección

Las capturas están en `docs/plans/revision-ui-ux/antes/` (servidor del coordinador, puerto 3010) y `docs/plans/revision-ui-ux/despues/` (esta rama, puerto 3011). `d-` es 1440 × 900 y `m-` es 390 × 844; el número es la pantalla dentro de la sección.

### Hero (isla 1)

| Hallazgo | Regla | Corrección |
| --- | --- | --- |
| Mayo sentada sobre el borde frontal de la isla, no en el prado: la animación `mayo-leap` usaba `transform` con `fill: both` y reemplazaba el `translate(-50%, -patas)` del anclaje. Pasaba también en celular. | Ubicación | `mayo-leap` anima las propiedades individuales `translate` y `rotate`, que se suman al anclaje. |
| El cuerpo de texto y "Ver packs" pisaban el árbol a 1440, 1280 y 1024 px. | Superposición | En escritorio la isla recortada y Mayo se corren 12vw a la derecha (20vw hasta 75rem) mientras la capa de cielo sigue cubriendo la sección; la promesa ocupa dos líneas (48rem) y el cuerpo 34ch. |
| A 390 × 844 el primer pliegue mostraba sólo texto: la isla y Mayo quedaban debajo. | Primer pliegue | El hero termina donde la isla necesita lugar (`padding` = la parte de la placa móvil que ocupa la isla, arte desde 67,5 %); Mayo sentada a la derecha del árbol (64 %), fuera del enlace de WhatsApp. |
| Al salir del hero aparecía una franja beige al pie. | Costura | El cielo del hero ya no deriva debajo de la placa (la deriva destapaba el fondo de la página). |

Antes / después: `antes/d-inicio-0.jpg` → `despues/d-inicio-0.jpg`; `antes/m-inicio-0.jpg` → `despues/m-inicio-0.jpg`.

### Caída entre nubes (transición 1 → 2)

| Hallazgo | Regla | Corrección |
| --- | --- | --- |
| Empezaba en beige después de un hero malva: corte duro. | Costura | Degradado desde la última fila de la placa del hero (`#b38fa0`) hasta la primera de la isla 2 (`#90c5fb`). |
| Mayo pasaba por delante de todas las nubes, no "entre" ellas. | Orden Z | La capa cercana pasa por delante de Mayo. |
| El último tercio mostraba cielo vacío y nubes cortadas en línea recta. | Animación | Las capas media y cercana llevan nubes en su borde inferior (pintadas fuera de la caja del SVG) y el escenario se desvanece en sus bordes. Las nubes tienen un degradado de luz desde arriba. |

Antes / después: `antes/d-fall-1.jpg` → `despues/d-fall-1.jpg`.

### Isla 2 (rocas sueltas)

| Hallazgo | Regla | Corrección |
| --- | --- | --- |
| Banda azul saturada de 90 px arriba y franja al pie cuando el fondo derivaba. | Costura | Cielo continuo (ver "Cómo funciona el cielo"). |
| Contenido en una columna centrada que no coincidía con el hero. | Alineación | Borde izquierdo común. |
| En celular las rocas flotaban sobre la isla y Mayo estaba debajo del prado. | Ubicación | Posiciones propias en la placa móvil para las ocho rocas y para Mayo. |

Antes / después: `antes/d-problema-0.jpg` → `despues/d-problema-0.jpg`; `antes/m-problema-0.jpg` → `despues/m-problema-0.jpg`.

### Isla 3 (packs y ensamble de rocas)

| Hallazgo | Regla | Corrección |
| --- | --- | --- |
| Las rocas sueltas pasaban por detrás del título y lo volvían ilegible durante el ensamble. | Superposición | Las rocas llegan desde abajo y los costados; la pieza superior sólo baja 12vh. |
| Las tres tarjetas colgaban de una misma línea sobre plataformas de distinta altura: la primera flotaba ~60 px sobre sus rocas. | Ubicación | Cada tarjeta apoya sobre la roca más alta de su plataforma (calculado de las coordenadas de `stage.ts`): se lee como una escalera hacia el pack más grande. Las tres tienen el mismo ancho. |
| El ensamble era lineal: las rocas llegaban a velocidad plena. | Animación | `ease-out` sobre el rango de scroll: viajan rápido al principio y se asientan despacio. |
| Una tarjeta enfocada con Tab antes del ensamble estaba en `opacity: 0`. | Accesibilidad | Con `:focus-visible` la tarjeta se muestra de inmediato. |
| Paso de durazno a azul mediodía en 90 px. | Costura | La placa funde su tercio superior con el cielo (`--plate-fade: 0.32`). |

Antes / después: `antes/d-packs-0.jpg` y `antes/d-packs-1.jpg` → `despues/d-packs-0.jpg` y `despues/d-packs-1.jpg`.

### Detalle de packs

| Hallazgo | Regla | Corrección |
| --- | --- | --- |
| La etiqueta "Web y sistema en uno" bajaba 18 px el nombre y el precio de la tarjeta del medio; cada bloque empezaba a otra altura. | Alineación | Las tres tarjetas comparten filas con `subgrid` (encabezado, "Ideal para", botón, nota, detalle) y la etiqueta va sobre el borde superior de la destacada. En celular cada tarjeta va sola, sin fila vacía. |
| Banda azul seguida de beige al terminar la isla 3. | Costura | Franja de 8rem a todo el ancho desde el último color de la placa hasta el beige. |

Antes / después: `antes/d-packs-detalle-0.jpg` → `despues/d-packs-detalle-0.jpg`.

### Isla 4 (sistemas)

| Hallazgo | Regla | Corrección |
| --- | --- | --- |
| Cielo naranja plano con una línea dura donde empezaba la placa y otra al pie. | Costura | Cielo continuo. |
| Torre de paneles centrada y la isla al fondo. | Alineación, ritmo | Desde 64rem, automatizaciones (7/12) y bot (5/12) lado a lado con la misma altura. La sección baja de 1939 a 1698 px. |
| "Próximamente" flotaba centrado a la izquierda del título del bot. | Alineación | La etiqueta va arriba del título. |
| En celular el invernadero, la caja y la maceta quedaban en el aire. | Ubicación | Posiciones propias en la placa móvil; Mayo más chica (22 %) en una isla que en celular es más angosta. |

Antes / después: `antes/d-sistemas-1.jpg` → `despues/d-sistemas-0.jpg`; `antes/m-sistemas-3.jpg` → `despues/m-sistemas-2.jpg`.

### Isla 5 (trabajos)

| Hallazgo | Regla | Corrección |
| --- | --- | --- |
| Texto gris y verde sobre violeta plano: contraste insuficiente para el cuerpo y el antetítulo. | Contraste | El atardecer mantiene el texto sobre durazno claro y recién se vuelve violeta hacia la isla. |
| Grilla de trabajos en tres columnas angostas dentro de 768 px. | Alineación | La grilla ocupa todo el ancho en tres columnas y los seis pasos quedan en una fila; la sección baja de 1711 a 1499 px. |
| El panel de pasos tapaba el borde superior de la isla. | Superposición | Holgura calculada (ver "Cómo funciona la holgura"). |
| En celular las piedras y los hitos del sendero flotaban en el cielo. | Ubicación | Doce posiciones móviles a lo largo del sendero de la placa móvil. |

Antes / después: `antes/d-trabajos-0.jpg` → `despues/d-trabajos-0.jpg`; `antes/m-trabajos-3.jpg` → `despues/m-trabajos-2.jpg`.

### Isla 6 (Juani, agenda y contacto)

| Hallazgo | Regla | Corrección |
| --- | --- | --- |
| El formulario tapaba la cabeza de Mayo y el fogón. | Superposición | Holgura calculada. |
| Cal.com en una columna de ~720 px usaba su diseño apilado: 1940 px de alto. | Tamaño, ritmo | El panel de reserva ocupa todo el ancho: Cal.com muestra el mes y los horarios lado a lado (570 px). El enlace a WhatsApp va al lado del formulario. La sección baja de 3550 a 2763 px. |
| Paso de rosa a azul noche sin transición. | Costura | El crepúsculo cae en los primeros 6rem (4rem en celular), antes del texto claro. |
| En celular el banco flotaba sobre la isla. | Ubicación | Banco y fogón sobre el claro de la placa móvil; Mayo echada mirando al fogón (24 %). |

Antes / después: `antes/d-contacto-0.jpg` y `antes/d-contacto-2.jpg` → `despues/d-contacto-0.jpg` y `despues/d-contacto-2.jpg`.

### Isla 7 (preguntas)

| Hallazgo | Regla | Corrección |
| --- | --- | --- |
| El mantenimiento tapaba a Mayo, el farol y la copa del árbol. | Superposición | Holgura calculada. |
| FAQ y mantenimiento apilados en una columna centrada. | Alineación, ritmo | Desde 64rem, FAQ (7/12) y mantenimiento (5/12, fijo al hacer scroll) lado a lado; la sección baja de 1641 a 1598 px, aun dejando a la vista el árbol completo. |
| En celular el farol y las luciérnagas flotaban en el cielo. | Ubicación | Posiciones propias; la luciérnaga perseguida también tiene su destino móvil. |

Antes / después: `antes/d-preguntas-1.jpg` → `despues/d-preguntas-0.jpg`.

### Navegación y footer

| Hallazgo | Regla | Corrección |
| --- | --- | --- |
| El indicador de huellas (derecha) tapaba las tarjetas de packs y los paneles, que llegaban a 1392 px. | Superposición, bordes | En la home el margen lateral pasa a 5rem desde 48rem: el contenido va de 80 a 1360 px y el indicador queda libre (1379 px). |
| Enlaces de texto fuera de párrafos (casos, LinkedIn, WhatsApp) con 24 px de alto. | Área táctil | 44 px de alto mínimo. |
| Corte de azul a negro al entrar al footer. | Costura | El footer arranca con el último color de la isla 7 y llega al negro en 7rem. |
| Títulos h3 en cuatro tamaños. | Ritmo tipográfico | Un tamaño para todos los títulos de tarjeta y panel (1,35rem). |

## Cómo funciona

### El cielo continuo

Cada escena con placa define cuatro colores en `world.css`: `--sky-from` (el último color de la sección anterior), `--sky-hold` (sobre el que va el texto), `--sky-plate` (la primera fila de la placa) y `--sky-bottom` (la última). El degradado llega a `--sky-plate` justo donde empieza la placa: `IslandPlate` expone la relación alto/ancho de la placa (`plateSceneStyle`, variables `--plate-h` y `--plate-h-m`) y el cielo la usa con unidades de contenedor (`100cqh - 100cqw * --plate-h`). La placa además funde sus primeras filas con una máscara (`--plate-fade`, 9 % por defecto). Los colores son el promedio de la primera y la última fila de cada placa (de su capa de fondo cuando la isla tiene par de parallax, porque es lo que se ve en la unión); las placas móviles tienen los suyos.

### La holgura sobre la isla

`stage.ts` registra en cada placa `clear: { desktop, mobile }`: la parte de su alto, medida desde abajo, que ocupa el arte (prado, objetos, Mayo). El `padding` inferior de `.isle` es esa parte de la placa más un margen; como un `padding` en porcentaje se mide contra el ancho de la sección, que es el ancho de la placa, la cuenta vale en cualquier pantalla. Se midió sobre el canal alfa de los recortes de cada isla y sobre los objetos: el techo del invernadero arranca al 47 % de la placa, los arbustos de la isla 5 al 45,7 % y los árboles de las islas 6 y 7 al 30,6 % y al 19,3 %. Una primera estimación sobre capturas había dejado esos dos árboles parcialmente tapados; los recortes de los pares de parallax permitieron corregirla.

### Objetos en la placa móvil

Las placas móviles encuadran la isla más abajo y más ancha. Cada objeto de `plateObjects` recibe como último argumento su posición en la placa móvil (`[x, y, ancho, destino de la persecución]`), leída sobre las placas con una grilla del 5 %. `PlateObjects` pasa ambas posiciones como variables CSS y la media query elige.

## Animaciones revisadas

| Animación | Juicio | Cambio |
| --- | --- | --- |
| Salto de Mayo al salir del hero | Bien de rango (salida 0 a 55 %), pero rompía el anclaje en reposo. | Propiedades individuales. |
| Ensamble de rocas | Rango correcto (28 a 57 % del recorrido, con 300 px de pausa ya armado); lineal y cruzando el título. | `ease-out` y nuevas direcciones. |
| Caída entre nubes | La sensación de caída viene de las nubes que suben; Mayo siempre por delante y final vacío. | Orden Z, nubes inferiores, bordes desvanecidos. |
| Carrera (isla 5) y persecución (isla 7) | Animaban `left`: relayout en cada cuadro de scroll, en el hilo principal. | `translate` con desplazamientos en anchos propios, en el compositor; el flote de la luciérnaga se suma con `animation-composition`. |
| Parallax de fondos (9 %) | Sutil y correcto; destapaba una franja al pie. | El cielo termina con el color del pie de la placa. |
| Tiras de Mayo (`steps()`, 8 a 10 fps, ping-pong) | Correctas; no se tocaron. | Ninguno. |
| Flote de objetos (5 s, 1,5 %) y brillo de luciérnagas (3,2 s) | Discretos y escalonados; se ganan su lugar. | Ninguno. |

El nivel `reduced` sigue apagando todo: verificado con `prefers-reduced-motion: reduce` (tarjetas visibles, rocas armadas, sprites quietos, Mayo en su ancla).

## Lo que quedó como estaba, a propósito

- **Animaciones ligadas al scroll, secciones de más de dos pantallas, isla 3 fija y caída sin contenido.** El checker del skill las marca (`scroll-linked`, `section-height`, `one-section`, `empty-area`), pero son decisiones aprobadas del concepto.
- **Navegación en píldora centrada e indicador de huellas fijo abajo en celular.** El checker pide una barra de borde a borde (`nav`, `nav-covers`); la píldora y el indicador son decisiones aprobadas.
- **Copy.** El checker marca títulos sin sustantivo, la falta de un dato duro en el primer pliegue y los marcadores de trabajos 4 a 6 (`copy-headings`, `copy-fact`, `placeholder`). El copy está aprobado; los marcadores son contenido pendiente del portfolio.
- **Botones de las islas oscuras en menta.** Son la variante del mismo sistema sobre fondo noche (decisión de paleta de la biblia visual).
- **El número de WhatsApp.** Es el canal real de Juani (`phone-number`).
- **Tarjetas de packs sobre el borde de la isla.** Las plataformas cuelgan del borde frontal como en la porción vertical aprobada; sólo se movieron las tarjetas.
- **La isla de contacto en celular sigue alta (~4100 px):** Cal.com usa su diseño apilado por debajo de ~1000 px de ancho.

## Verificación

- Chromium (Playwright) contra `next dev` en el puerto 3011: 1440 × 900, 1280 × 720, 1024 × 768, 820 × 1180, 390 × 844 y 320 px. Sin scroll horizontal en 1440, 390 y 320; sin errores de consola.
- Después del rebase sobre `f7b0bba` se repitieron las capturas "después" y la revisión a 1440 × 900 y 390 × 844 con los siete pares de parallax montados: sin scroll horizontal, sin errores de consola, contenido por encima de cada isla y cielo continuo en las uniones.
- Teclado: el primer Tab llega al enlace "Saltar al contenido"; las tarjetas de packs enfocadas se ven con su anillo.
- Movimiento reducido emulado: todo en reposo y visible.
- `npm run lint`, `npm run typecheck` y `npm run build` sin errores. No hay test runner en el repo.
- Finish gate del skill (`gate.mjs`, 3 rondas): bajó de 82 a 70 FAIL y cerró en `GATE: OPEN 70 (rounds used up)`. Los FAIL abiertos son los del apartado anterior. Cinco waivers en `.taste-skill/waivers.json` (no versionado): `text-contrast` en contacto (el checker lee el beige de la página detrás de la escena), `hidden-content` y `scroll-linked` en las plataformas (aparición por scroll, decisión aprobada), `focus-visible` (el scroll suave todavía corre cuando el checker mide; verificado a mano) y `no-visual` en las tarjetas de precios.

## Pendiente

- Probar en el teléfono real de Juani (`http://192.168.1.30:3011`).
- Para los pintores: el lote C de cuadros de nubes reemplazaría las nubes SVG provisionales de la caída; un par de parallax del hero en celular permitiría correr la isla también en celular.
- Revisar en un navegador sin `animation-composition` (Safari < 16, Firefox < 115): la luciérnaga perseguida flota pero no avanza.

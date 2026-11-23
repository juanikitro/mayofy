# Navegación: adiós a la barra de patitas, una píldora que sabe dónde estás

Fecha: 22 de noviembre de 2026. Rama: `juanikitro/landing-navegacion` (desde `juanikitro/landing-redesign`).

## El pedido

> "desplega otro agente especifico para eliminar la barra de patitas. En su lugar mejoraria la barra flotante de arriba para que sea igual de util pero igual de moderna y fachera" (Juani, 22/11/2026)

La barra de patitas (vertical a la derecha en la laptop, abajo en el celular) marcaba la isla actual y saltaba a cada isla. En la isla 6, a 1440 px, tapaba el retrato pintado de Juani. La prueba con usuaria simulada (`2026-11-20-prueba-usuario.md`) ya había mostrado que el menú de arriba era lo que más ayudaba y que las patitas tapaban campos del formulario.

## Qué se sacó

- `src/components/world/island-progress.tsx` (la barra y su montaje en `src/app/page.tsx`).
- Todo su CSS en `src/app/world.css`: estilos base, versión de celular, burbujas y etiquetas, el aviso de 2,5 s con el nombre de la isla, la animación de entrada, las patitas "visitadas", los objetivos de 44 px y las reglas que la escondían sobre la agenda y el formulario.
- Las referencias a la barra en comentarios de otras islas.

Se conserva:

- El **botón flotante de WhatsApp** del celular, que vivía en el mismo componente: ahora es `src/components/world/whatsapp-float.tsx`, con la misma lógica (aparece después del héroe, se aparta sobre la isla 6, la agenda y el formulario, y mientras un campo tiene foco). Como ya no hay barra abajo, bajó de 4,5 rem a 1 rem del borde (más el área segura del teléfono).
- El **margen lateral de 5 rem** del inicio en pantallas anchas: existía para dejar lugar a la barra, pero todas las islas se compusieron con él (bordes izquierdo y derecho iguales, el retrato de la isla 6, la tarjeta de la isla 2). Sacarlo corría el texto 32 px a la izquierda y dejaba los bordes desparejos, así que queda, con un comentario nuevo que explica por qué.
- `use-active-island.ts`, que todavía usa el índice de casos (`study-index.tsx`).

## La nueva píldora

Un solo componente, `src/components/world/island-nav.tsx`, y un solo bloque de CSS al final de `world.css` ("Pill navigation (round 11, 2026-11-22)").

**Pantallas anchas (desde 56 rem, unos 900 px):**

- `Mayofy · Qué hacemos · Packs · Sistemas · Trabajos · Quién soy · Preguntas · Agendá`. Las seis islas, con nombres que entiende cualquiera; "Mayofy" lleva al inicio.
- Una **ficha verde suave se desliza** detrás de la isla que se está leyendo (se mueve con `transform` y ajusta su ancho; nada más se reacomoda). Sobre el héroe no hay ficha.
- Una **línea fina en el borde inferior** de la píldora se llena a medida que se baja por la página: es el "cuánto falta" que daban las patitas.
- "Agendá" queda siempre a la vista.

**Celular y tablet (menos de 56 rem):**

- `Mayofy · [Sistemas ▾] · Agendá`. El botón del medio muestra el nombre de la isla actual (sin número desde el 23/11; ver "Ronda 2").
- Al tocarlo se abre, debajo de la píldora y con su mismo ancho, **la lista del recorrido**: "El recorrido · 4 de 7", las siete islas numeradas, las ya pasadas con el número en verde y la actual marcada con "Estás acá". Tocar una isla la cierra y lleva ahí.
- Se cierra con Escape (el foco vuelve al botón), tocando afuera, saliendo con Tab o eligiendo una isla. Las flechas arriba y abajo, Inicio y Fin recorren la lista.
- La misma línea de progreso en el borde de la píldora.

**Cómo sabe dónde estás:** en cada cuadro en que la página se movió, la isla actual es la última cuya parte de arriba ya pasó el 35 % superior de la pantalla (`packs-detalle` cuenta como Packs). El progreso se escribe como variable CSS (`--story`) sin volver a dibujar el componente. Es más fiel que el observador anterior, que en las islas largas (320 vh) a veces marcaba la vecina.

**Enlaces:** en el inicio son `#id` comunes, así que `hash-link-history.tsx` sigue manteniendo el botón Atrás. En las otras páginas (privacidad, casos, 404) son enlaces del router a `/#id` y no muestran línea de progreso.

**Movimiento y accesibilidad:**

- Todo usa los tokens de movimiento del sitio (`--m-*`, `--ease-*`); con movimiento reducido duran 0 y no hay desplazamientos: la ficha salta, la lista aparece.
- La lista entra 6 px desde arriba y sus filas se asientan de a una (20 ms entre cada una). Todas las transiciones se pueden interrumpir.
- `aria-current="location"` en la isla actual (enlace y fila), `aria-expanded` y `aria-controls` en el botón, nombre accesible "Secciones. Estás en: Sistemas". La lista cerrada queda `inert` y oculta: no recibe toques ni foco.
- Anillo de foco visible y dentro de la píldora. Todos los objetivos miden 44 px o más (las filas de la lista, 48 px).

**Estética:** vidrio crema con un brillo de 1 px arriba y un filo cálido, la sombra que aparece al empezar a bajar (como antes), los números en Fraunces cursiva como las palabras destacadas de los títulos, el verde musgo del sitio y los radios propios (píldora y `--radius`). La lista es crema sólido, para que se lea bien sobre cualquier isla.

Dos detalles técnicos que salieron al probar:

- **El vidrio es una capa propia** (`.island-nav__glass`), no el fondo de la píldora. Con el desenfoque puesto en la píldora, la lista (que vive adentro) no podía desenfocar lo que tiene detrás y se veía el título de la isla a través.
- **El crema ahora es crema.** La mezcla anterior, `color-mix(in oklch, var(--cream) 82%, transparent)`, pierde el tono del crema y la píldora se veía lila. Ahora se usa el color relativo `oklch(from var(--cream) l c h / 84%)`, con la mezcla vieja como respaldo para navegadores sin color relativo.
- En celulares chicos (360 px) se ajustan los espacios para que "Qué hacemos", el nombre más largo, entre entero junto a "Mayofy" y "Agendá".

![Antes: las patitas tapan a Juani en la isla 6 (1440)](navegacion/c01_antes_1440_isla6_patitas_tapan_a_juani.jpg)
![Antes: la barra de patitas en el celular (390)](navegacion/c02_antes_390_barra_de_patitas.jpg)
![Después: isla 6 libre (1440)](navegacion/c03_despues_1440_isla6_libre.jpg)
![Salto a Packs: ficha y línea de progreso (1440)](navegacion/c04_1440_salto_a_packs_ficha_y_linea.jpg)
![Salto a Trabajos (1366)](navegacion/c05_1366_salto_a_trabajos.jpg)
![Salto a Sistemas (1024)](navegacion/c06_1024_salto_a_sistemas.jpg)
![Isla 6 libre en el celular (390)](navegacion/c07_390_isla6_libre.jpg)
![La lista abierta con el teclado, foco en la isla actual (390)](navegacion/c08_390_lista_abierta_con_teclado.jpg)
![La lista abierta (360)](navegacion/c09_360_lista_abierta.jpg)
![La píldora a 360 con el nombre entero](navegacion/c10_360_pildora_nombre_entero.jpg)
![Con movimiento reducido (390)](navegacion/c11_390_movimiento_reducido.jpg)
![En privacidad: la lista lleva a las islas del inicio (390)](navegacion/c12_390_privacidad_lista.jpg)

## Verificación

Con el servidor de desarrollo propio (puerto 3018) y Chromium de Playwright, sobre la rama ya unida con `juanikitro/landing-redesign` (00a2858, que trae la limpieza y la ronda de SEO). Los scripts quedaron en `docs/plans/navegacion/scripts/` (`recorrido.cjs`, `teclado-y-otra-ruta.cjs`, `ancho-pildora.cjs`).

En 1440x900, 1366x768, 1024x768, 390x844 y 360x800 (los dos últimos como celular, con toque), `recorrido.cjs` hace:

1. **Recorrido real con la rueda**, de a 300 px con pausas, de arriba hasta el final. En cada paso compara la isla que cruzó la línea de lectura con la que marca la píldora (enlace con `aria-current` o nombre del botón). Resultado en los cinco tamaños: pasa por las siete islas en orden, la marca sigue a la lectura sin desfases entre muestras estables, la línea de progreso termina en 1 y no hay desborde horizontal en ningún momento.
2. **Saltos** a las seis islas desde la píldora (en celular, abriendo la lista y tocando cada isla). En todos: la dirección cambia a `#id`, se llega a esa isla, la píldora la marca, la lista se cierra sola y el título de la isla queda debajo de la píldora, nunca tapado.
3. **Atrás** dos veces después de los saltos: vuelve a `#contacto` y después a `#trabajos`, sin salir de la página.
4. **Teclado** (celular): Enter abre la lista (`aria-expanded="true"`) con el foco en una isla, la flecha abajo pasa a la siguiente, Escape la cierra y devuelve el foco al botón; tocar afuera la cierra; salir con Tab la cierra. En escritorio el orden de Tab es: saltar al contenido, Mayofy, las seis islas, Agendá y después el contenido; el anillo de foco se ve en todos.
5. **Objetivos de toque:** ningún enlace ni botón de la píldora o de la lista mide menos de 44 px de alto.
6. **Errores de consola:** cero en todas las pasadas.

Además:

- **Movimiento reducido** (390, `prefers-reduced-motion: reduce`): la misma pasada completa sin fallas; las transiciones de la lista duran 0 s.
- `teclado-y-otra-ruta.cjs`: abriendo la lista con el teclado en la isla 4, el foco cae en "4 Sistemas a medida · Estás acá". En `/privacidad` la píldora muestra "Secciones", sin línea de progreso, y elegir "Packs y precios" lleva a `/#packs` con la píldora marcando Packs.
- **Isla 6:** a 1440 y a 390 no hay nada encima del retrato de Juani ni de la agenda (capturas c03 y c07). El botón de WhatsApp sigue escondiéndose sobre la isla 6.
- `npm run lint`, `npm run typecheck` y `next build`: sin errores.

## Límites

- Navegador emulado: Chromium de escritorio en modo headless, con emulación de celular. No se probó en un iPhone ni en un Android reales, ni con un lector de pantalla real (sí se revisaron los nombres accesibles, `aria-current`, `aria-expanded` e `inert`).
- La píldora de escritorio es más ancha que antes (unos 770 px con las seis islas). Entre 900 y 1024 px entra con margen; por debajo de 56 rem cambia al botón con la lista.
- La ficha que se desliza (escritorio) y la caja del nombre (celular) animan su ancho: son cajas chicas dentro del encabezado fijo y no reacomodan el contenido de la página. Son las únicas excepciones a la regla del sitio de no animar anchos.
- La píldora no se esconde sobre el formulario: arriba de la pantalla no tapa campos, y los campos ya se detienen debajo de ella al recibir foco (`scroll-margin`). Lo que se aparta sobre el formulario y la agenda es el botón de WhatsApp, como antes.
- El margen lateral de 5 rem del inicio queda como estaba (ver "Qué se sacó"). Si algún día se quiere aprovechar el ancho que dejaba la barra, hay que revisar isla por isla.
- Los nombres ("Qué hacemos", "Quién soy y agenda", etc.) son una propuesta en lenguaje simple; Juani puede cambiarlos en `src/components/world/island-nav.tsx`.

## Ronda 2 (23/11/2026): animación en el celular y sin número

> "me gusta el nuevo navbar. quiero hacer los siguientes cambios: En mobile, añadir una animacion al redimensionamiento del navbar cuando se cambia de seccion (animacion similar a en desktop). Tambien le quitaria la numeracion en el navbar (no la quitaria del listado)" (Juani, 23/11/2026)

**Qué cambió:**

- **Sin número en la píldora del celular.** El botón muestra solo el nombre ("Packs ▾"). La lista "El recorrido" conserva los números, el "4 de 7" y las islas pasadas en verde. Al sacar el círculo hay más lugar: a 360 px "Qué hacemos" entra con aire (píldora de 299 px en un espacio de 328).
- **La píldora cambia de tamaño con suavidad.** Antes, al pasar de "Qué hacemos" a "Packs", la píldora saltaba de golpe 54 px. Ahora el nombre vive en una caja (`WhereLabel`, en `island-nav.tsx`) que mide el nombre nuevo y pasa a ese ancho en 520 ms con la misma curva que la ficha de escritorio (`--m-reveal`, `--ease-travel`); la píldora, centrada, se acomoda con ella. Mientras tanto el nombre viejo sale hacia arriba desvaneciéndose y el nuevo entra desde abajo, como un cuentakilómetros. Si se vuelve a una isla anterior, el movimiento es al revés: el nuevo baja desde arriba.
- **Interrumpible:** si la isla cambia de nuevo a mitad de camino, la transición de ancho sigue desde donde está hacia el ancho nuevo, sin saltos.
- **Al cargar no hay animación:** el primer ancho se pone sin transición, así la píldora no "crece desde cero".
- **Movimiento reducido:** el cambio es instantáneo (los tokens de movimiento valen 0 y el nombre viejo ni se dibuja).
- El nombre accesible del botón no cambia ("Secciones. Estás en: Packs"); el nombre que sale y la caja de medida están ocultos para lectores de pantalla.

**Cuadros de la animación** (a 1/5 de velocidad, un cuadro cada 66 ms reales; script `docs/plans/navegacion/scripts/cuadros-redimension.cjs`):

| Momento | 0 | 66 ms | 132 ms | 198 ms | 264 ms | 330 ms | 396 ms | 462 ms |
|---|---|---|---|---|---|---|---|---|
| Ancho de la píldora, "Qué hacemos" → "Packs" (390) | 324 | 323 | 317 | 301 | 280 | 272 | 270 | 270 |
| Ancho de la píldora, "Packs" → "Qué hacemos" (390) | 270 | 271 | 275 | 287 | 308 | 319 | 323 | 324 |

![Cuadros: bajando de Qué hacemos a Packs (390)](navegacion/c13_390_cuadros_redimension_bajando.jpg)
![Cuadros: subiendo de Packs a Qué hacemos (390)](navegacion/c14_390_cuadros_redimension_subiendo.jpg)
![Cuadros: de Sistemas a Trabajos (360)](navegacion/c15_360_cuadros_redimension.jpg)
![La lista conserva los números (390)](navegacion/c16_390_lista_conserva_numeros.jpg)

**Verificación (390x844 y 360x800, como celular, con toque):** la pasada completa de `recorrido.cjs` (ahora compara el nombre del botón con la isla que se está leyendo) recorrió las siete islas con la rueda sin desfases, los seis saltos desde la lista llegaron a su isla con el título visible, Atrás volvió a `#contacto` y `#trabajos`, el teclado abre, recorre y cierra la lista devolviendo el foco, no hay desborde horizontal, todos los objetivos miden 44 px o más y no hubo errores de consola. Con movimiento reducido (390) la misma pasada también pasó y las transiciones duran 0 s. `npm run lint`, `npm run typecheck` y `next build`: sin errores. Escritorio no cambia (el botón y su caja solo existen debajo de 56 rem).

**Límite:** con la lista abierta, si la isla cambia (por ejemplo, al desplazarse con la lista abierta), la lista acompaña el nuevo ancho de la píldora; con nombres cortos ("Packs") la lista mide 2 px más que la píldora por su ancho mínimo de 17 rem.


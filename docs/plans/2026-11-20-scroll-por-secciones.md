# Scroll por secciones (snapping suave)

Pedido de Juani, 20 de noviembre de 2026: "quiero que implementes full page scroll con scroll snapping entre secciones (no tan estricto)".

## Qué hace

`src/components/world/section-snap.tsx` (`SectionSnap`, montado en `src/app/page.tsx`) acomoda la página cuando el lector termina de scrollear:

- **Puntos de descanso:**
  - el comienzo de cada hijo de `main`;
  - en las secciones más altas que la pantalla, el final de su última pantalla;
  - los bordes de los dos tramos guiados (isla 4 y seis pasos, cuando están fijados);
  - el final de la página.
- **Costuras:** son dos puntos separados por una pantalla o menos, es decir, la pantalla muestra parte de una sección y parte de la siguiente. Ahí la página siempre se acomoda y sigue al punto siguiente en la dirección del scroll: alcanza con una muesca de la rueda. Un toque de menos de 24 px vuelve al punto más cercano.
- **Dentro de una sección alta** (caída, isla 2, rocas, packs): solo se acomoda cuando el punto que viene en la dirección del scroll está a menos de un cuarto de pantalla, y nunca hacia atrás. Así las escenas que avanzan con el scroll se pueden leer en cualquier posición. Esto es lo "no tan estricto".
- **Dentro de los tramos guiados** no hace nada: `WorkshopController` (isla 4) y `SenderoController` (seis pasos) siguen siendo dueños de esos tramos.

## Por qué así y no con CSS `scroll-snap`

Los tramos guiados mueven la página cuadro a cuadro con `guided-scroll.ts`. Con `scroll-snap-type` activo, el navegador vuelve a ajustar cada uno de esos `scrollTo` cerca de un punto, y además no deja coordinar quién manda en cada tramo. `SectionSnap` usa el mismo desplazamiento guiado: curva suave, entre 380 y 900 ms según la distancia, y se corta con cualquier entrada del lector (rueda, toque, puntero o tecla).

## Cuándo no actúa

- Si el scroll no lo empezó el lector con la rueda, el dedo, las teclas de scroll o la barra de desplazamiento. Por ejemplo: el foco movido con Tab, un enlace interno o buscar en la página. Así nunca se aleja de un elemento enfocado.
- Con `prefers-reduced-motion: reduce` o con `html[data-motion-tier="reduced"]`.
- Mientras corre otro desplazamiento guiado.

## Verificación (Playwright, 20/11)

A 1440x900:

| Prueba | Resultado |
|---|---|
| Una muesca desde el hero | llega a la caída (0 → 900) |
| Una muesca dentro de las rocas | se queda donde está (4410 → 4510) |
| Cerca del final de la isla 2 | completa la sección (3300 → 3510) |
| Subiendo dentro de la isla 2 | vuelve al comienzo (2600 → 2340) |
| Costura isla 2 → rocas | sigue en la dirección del scroll, en las dos direcciones |
| Dentro de los seis pasos | el que actúa es su propio controlador |
| Tab | no mueve la página |

A 390x844: una muesca desde el hero llega a la caída, y la costura entre la caída y la isla 2 se completa. Con movimiento reducido la página no se mueve sola.

En todas las pruebas: sin desborde horizontal y sin errores de consola. Lint y typecheck limpios.

## Límites

- No se probó en un celular real con inercia táctil, ni en Safari o Firefox. En navegadores sin `scrollend`, el reposo se detecta tras 160 ms sin scroll, igual que en los tramos guiados.
- Al aterrizar en el comienzo de la isla 4, su propio controlador puede seguir hasta centrar la primera tarjeta, como ya pasaba antes.

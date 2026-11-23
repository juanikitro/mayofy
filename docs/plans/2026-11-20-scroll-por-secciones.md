# Scroll por secciones (snapping suave)

Pedidos de Juani:

- 20 de noviembre de 2026: "quiero que implementes full page scroll con scroll snapping entre secciones (no tan estricto)".
- 22 de noviembre de 2026, después de la prueba simulada con usuaria (`2026-11-20-prueba-usuario.md`): "Tambien creo que el scroll guiado esta molestando mas que ayudando. Pero si quiero mantener ese efecto de pagina premium que te guia a leer una historia en mayofy, solo quisiera arreglarlo (tanto para desktop como mobile). Quiero que despliegues un agente especializado en frontend con /frontend-design y /design-taste-frontend para lograr que el scroll genere una sensacion premium sin perder UX y simpleza".

## Principios (22/11)

La página sigue guiando la lectura, pero quien lee manda siempre. Son cinco reglas, y cada una sale de un hallazgo de la prueba:

1. **Se acomoda recién cuando termina el gesto, no cuando para el scroll.** Un gesto es una muesca o varias seguidas, un deslizamiento del touchpad con su inercia, un dedo con su envión o una tecla. Termina cuando no hubo entrada durante 320 ms y la página quedó quieta. Antes se reaccionaba a cada `scrollend`, y un touchpad que manda eventos chicos dispara uno por evento (B1).
2. **Nunca se mueve en contra de quien lee.** El acomodo va solo hacia donde iba el gesto. Se eliminó la vuelta atrás de los toques de menos de 24 px, que era la causa de B1 y A1. La dirección se lee de la entrada misma (la suma de la rueda, la tecla, el dedo), no de posiciones: el navegador puede haber scrolleado antes de que la página oiga el primer evento de la rueda.
3. **La entrada por pasos pide un paso; la entrada continua ya dejó la página donde la quiere.** Una muesca de rueda o una tecla en una costura sigue a la sección siguiente: es el efecto de página completa. Con el dedo o el touchpad, la costura solo se completa si ya pasó más de la mitad; si no, la página queda donde la dejó quien lee (M1). Se distingue por el tamaño del primer evento de la rueda: una muesca empieza en 50 px o más, un touchpad empieza chico.
4. **Un envión no saltea nada.** El envión de un dedo se frena antes del primer punto de descanso, piedra o tarjeta que esté pasando el lugar donde se apoyó el dedo. Si el dedo ya lo pasó, se frena en el acto. El dedo en sí nunca se frena. Así un deslizamiento no lleva más allá del final de una sección, donde están sus botones (M1), ni saltea un paso o una tarjeta (M2).
5. **Cualquier entrada gana en el acto, y con movimiento reducido la página nunca se mueve sola.** Rueda, toque, puntero o tecla cortan cualquier desplazamiento guiado. Un clic (un enlace del menú, un botón) termina el gesto, así que su scroll nunca se acomoda ni se frena. Con `prefers-reduced-motion: reduce` o `html[data-motion-tier="reduced"]` no hay acomodo ni freno del envión.

Lo que se buscó es menos maquinaria, no más: un solo rastreador de gestos compartido reemplaza tres lecturas de `scrollend` y la regla de los 24 px. Los tres controladores conservan su lógica de destino.

## Qué hace

`src/components/world/guided-scroll.ts` es la base compartida:

- `onGestureEnd(fn)` avisa una vez por gesto, con la posición final, la dirección y si fue por pasos (rueda con muescas o teclas) o continuo (dedo o touchpad).
- `addMomentumStops(fn)` registra puntos que el envión de un dedo no pasa. El envión se frena bloqueando el `overflow` de la página unos 120 ms: es lo que frena una inercia en los navegadores móviles, y un `scrollTo` no lo hace (se probó en Chromium). Solo se hace cuando la barra de scroll no ocupa lugar, así no mueve el diseño.
- `guideScrollTo(top, ms, curva)` es el desplazamiento guiado, cuadro a cuadro, que se corta con cualquier entrada.

`src/components/world/section-snap.tsx` (`SectionSnap`, montado en `src/app/page.tsx`):

- **Puntos de descanso:**
  - el comienzo de cada hijo de `main`;
  - en las secciones más altas que la pantalla, el final de su última pantalla;
  - los bordes de los dos tramos guiados (isla 4 y seis pasos, cuando están fijados);
  - los marcadores `data-scroll-rest` de cada sección;
  - el final de la página.
- **Costuras** (dos puntos a una pantalla o menos): con rueda o teclas sigue al punto siguiente en la dirección del gesto. Con dedo o touchpad solo completa si ya pasó más de la mitad.
- **Dentro de una sección alta:** solo completa si el punto que viene está a menos de un cuarto de pantalla, así las escenas que avanzan con el scroll se leen en cualquier posición.
- **Dentro de los tramos guiados** no hace nada: mandan `WorkshopController` y `SenderoController`.
- El desplazamiento frena al llegar (`easeOutQuad`). Entre secciones dura de 400 a 1.100 ms según la distancia. Hacia un marcador `data-scroll-rest`, que es una pose de la escena, va al ritmo de lectura de la escena: de 450 a 1.600 ms. Así lo que pasa justo antes de la pose, como los saltos de Mayo en la isla 3, no se ve apurado.

`src/components/world/sendero-controller.tsx` (seis pasos): si el gesto termina con Mayo entre dos piedras, completa el tramo en la dirección del gesto, al ritmo pintado (sin cambios en la duración). Cada piedra es un punto que el envión no pasa.

`src/components/world/workshop-controller.tsx` (isla 4): si el gesto termina con una tarjeta fuera del centro, centra la siguiente en la dirección del gesto. Con dedo o touchpad, solo si esa tarjeta ya está a menos de media separación de su lugar. Cada tarjeta centrada es un punto que el envión no pasa.

## Cómo agrega una sección sus propios puntos de descanso

Sin escribir otro controlador: un marcador dentro de la sección, en el flujo que scrollea (no dentro de un escenario fijo).

```tsx
<span className="rocks__rest" data-scroll-rest aria-hidden="true" style={{ top: "120vh" }} />
```

La página descansa con el marcador arriba de la pantalla. Siguen las mismas reglas: solo después del gesto, solo hacia adelante y nunca con movimiento reducido. Además, el envión no lo pasa. La isla 3 ya los usa en 80, 120 y 184 vh (Mayo después del salto chico, después del salto largo y sentada con la lámina pintada; ver `2026-11-19-isla-3-rocas.md`, iteración 7).

## Por qué así y no con CSS `scroll-snap`

Los tramos guiados mueven la página cuadro a cuadro. Con `scroll-snap-type` activo, el navegador vuelve a ajustar cada uno de esos `scrollTo` cerca de un punto, y además no deja coordinar quién manda en cada tramo. El ajuste nativo también recorre los tramos en 200 a 400 ms, y Mayo se vería apurada, que es lo que Juani ya había marcado en los seis pasos.

## Cuándo no actúa

- Si el scroll no vino de un gesto de quien lee: el foco movido con Tab, un enlace interno (`HashLinkHistory`), buscar en la página o la barra de desplazamiento.
- Con movimiento reducido.
- Mientras corre otro desplazamiento guiado.

## Verificación (22 y 23/11)

Se usaron los scripts de la prueba con usuaria (`lib.cjs`), con las mismas formas de entrada, más un banco propio con semilla fija, así "antes" y "después" reciben exactamente las mismas entradas:

- **Touchpad:** 18 a 40 eventos de 5 a 30 px cada 16 ms. También una deriva lenta, de 2 a 4 px cada 40 a 90 ms.
- **Rueda:** de 1 a 3 muescas de 100 px, separadas 120, 200 y 300 ms, en cinco costuras (final de la isla 2, rocas, detalle de packs, contacto y comienzo de Preguntas), y hacia arriba. Ráfagas de 5 a 9 muescas a 40-70 ms.
- **Teclas:** Espacio, AvPág, flechas y Mayús+Espacio.
- **Toques reales de CDP con inercia:** cortos de 150 a 320 px y largos de 380 a 500 px; el repro de la recomendación de la isla 2; recorridos por la isla 3, la isla 4 y los seis pasos.

Laptop a 1366 × 768. Celular a 360 × 800, y además con 4G rápido y CPU x4.

"Antes" es `juanikitro/landing-redesign` en `00a2858`, con la misma geometría que "después" (incluye la isla 3 de 320 vh con sus marcadores todavía inertes). "Después" es esta rama con esa misma base fusionada. Una pasada sobre `d03a311` (lo publicado al momento de la prueba) dio lo mismo: touchpad 30 de 30 sin avance y rueda 17 de 49 sin avance.

| Entrada | Antes | Después |
|---|---|---|
| Touchpad desde el héroe (30 gestos) | 28 sin avance; en 21 la página volvió sola hacia atrás | 0 sin avance, 0 hacia atrás |
| Touchpad lento al leer (6) | 1 retroceso; en 2 la página se movió en contra | 0 |
| Rueda, 1 a 3 muescas en costuras (49) | 19 sin avance; 12 rebotes en contra | 0 sin avance, 0 rebotes |
| Ráfagas de rueda (7) y teclas (6) | 0 problemas | 0 problemas |
| Isla 4, de a una muesca | saltea la tarjeta 01 | 01 → 02 → 03 → 04, sin saltos |
| Seis pasos, de a una muesca | saltea el paso 1 | 1 → 6, una muesca por paso, al ritmo pintado |
| Isla 3, de a una muesca | 16 muescas de 13 vh, sin poses | 5 muescas: 80, 120, 184 y 220 vh, y la sección siguiente |
| Isla 3: duración del salto chico y del largo con una muesca | — (sin acomodo) | 545 y 530 ms (277 y 383 ms con la curva y los tiempos de sección) |
| Celular, 14 deslizamientos desde arriba | 0 en contra; la página se movió sola 2.497 px | 0 en contra; se movió sola 512 px |
| Celular, isla 4 | saltea 2 tarjetas (01 y 03) | 0 salteadas |
| Celular, seis pasos | saltea el paso 2 | 0 salteados |
| Celular, isla 3 | se detiene en 37, 70, 106, 131, 161 vh (ninguna pose) | 80, 120, 184, 220 vh: las tres poses |
| Celular con 4G y CPU x4: isla 4 y seis pasos | saltea 1 tarjeta | 0 salteados; se movió sola 322 px contra 2.778 |

La recomendación de la isla 2 (M1) ya no se reproduce en la base nueva, porque la isla 2 cambió de largo. Sobre la geometría anterior, un deslizamiento corto después de elegir el caso llevaba a la isla 3 en 1 a 3 de 5 intentos; con este cambio, en 0 de 5, con los botones a la vista.

Otras comprobaciones, sobre el código final:

- **Movimiento reducido** a 1440 × 900, 1366 × 768, 390 × 844 y 360 × 800, con rueda, touchpad y toques: la página no se movió sola ni una vez.
- **Teclado:** 25 Tab seguidos no disparan ningún acomodo, y el foco queda en pantalla.
- **Menú de arriba:** los seis enlaces llegan a su sección (borde superior en 0) y no hay acomodo después, en los cuatro tamaños.
- Sin scroll horizontal y sin errores de consola en los cuatro tamaños.
- Lint, typecheck y build limpios.

Videos con un indicador en pantalla (posición, última entrada y "la página se acomoda sola" mientras se mueve sin que nadie la toque), en `docs/plans/scroll-premium/`:

| Antes | Después | Qué muestra |
|---|---|---|
| `antes_laptop_touchpad_heroe.mp4` | `despues_laptop_touchpad_heroe.mp4` | B1: cuatro gestos de touchpad desde el héroe |
| `antes_laptop_rueda_dos_muescas_preguntas.mp4` | `despues_laptop_rueda_dos_muescas_preguntas.mp4` | A1: dos muescas seguidas al comienzo de Preguntas |
| `antes_laptop_rueda_isla3.mp4` | `despues_laptop_rueda_isla3.mp4` | Isla 3 de a una muesca: de pose en pose |
| `antes_celular_seis_pasos.mp4` | `despues_celular_seis_pasos.mp4` | M2: deslizamientos por los seis pasos |
| `antes_celular_isla4.mp4` | `despues_celular_isla4.mp4` | M2: deslizamientos por la isla 4 |

Los scripts del banco (`bench.cjs`, `extra.cjs`, `vid.cjs`, `fling.cjs`) y sus registros JSON quedaron en la carpeta temporal del agente, fuera del repositorio.

## Límites

- Todo se probó en Chromium headless, con la rueda y el touchpad sintéticos (`mouse.wheel`) y con toques reales de CDP (`Input.dispatchTouchEvent`), que el navegador sigue con inercia. Falta probar en hardware: un touchpad viejo sin precisión, uno de precisión de Windows, el trackpad de una Mac (manda la inercia como eventos de rueda: el gesto termina cuando la inercia se apaga), un mouse de rueda libre y un Android y un iPhone reales.
- El freno del envión con `overflow: hidden` es la técnica conocida para Chrome en Android y Safari en iOS, pero solo se comprobó en Chromium headless. Si un navegador no la respeta, el envión sigue y después rige la regla de la mitad: nunca hay un salto hacia atrás.
- La distinción muesca o touchpad es una heurística por el tamaño del primer evento. Si un touchpad rápido empieza con 50 px o más, se trata como muesca y completa la costura hacia adelante. Si un mouse manda muescas chicas, se trata como continuo y la página queda donde la dejó.
- Si el dedo mismo arrastra más allá de una piedra o una tarjeta, quien lee la ve pasar a su propio ritmo y el freno no la recupera, porque eso sería ir hacia atrás.

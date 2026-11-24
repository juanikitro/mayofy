# Celular: carrusel de packs, "Cómo se paga (?)" y la barra de los seis pasos

Pedidos de Juani, 24 de noviembre de 2026:

1. "En mobile, quiero que los packs se hagan con un carrusel (infinito) y no alineados verticalmente"
2. "Quiero debajo de "Cómo se paga" este en un (?) que abra un tooltip con la explicacion"
3. "En mobile, la seccion de "Seis pasos, sin sorpresas" debe reemplazarse el sendero__bar ya que parece que el scroll es horizontal y no lo es"

Este documento registra qué cambió, por qué, cómo funciona, cómo se verificó y qué queda pendiente.

## 1. Packs en carrusel infinito (solo celular)

### Qué cambió

- Hasta 768 px de ancho (el mismo corte `max-width: 48rem` que usa todo el sitio), las tres tarjetas dejan de apilarse. Ahora son una fila que se desliza de costado: una tarjeta al centro y las vecinas asomando por los bordes.
- La fila es infinita en los dos sentidos: después de Sistema a Medida viene Landing, y antes de Landing viene Sistema a Medida.
- Debajo hay dos flechas y tres puntos, uno por pack. Una píldora verde marca el pack visible y sigue al dedo (ver "Segunda vuelta").
- Las tarjetas vecinas se ven un poco más chicas y transparentes, para que quede claro cuál está al frente.
- En tablet y computadora no cambia nada: siguen las tres tarjetas en fila, alineadas por filas como antes.

### Cómo funciona

- Archivos: `src/components/world/pack-carousel.tsx` (nuevo, la lógica) y `src/components/world/pack-details.tsx` (arma las tarjetas).
- El deslizamiento es el scroll nativo del navegador con `scroll-snap`. No hay dependencia nueva.
- Para el efecto infinito, `PackDetails` dibuja dos copias de las últimas tarjetas antes de las reales y dos copias de las primeras después. Las copias tienen `inert` y `aria-hidden`: no se enfocan con el teclado ni las lee un lector de pantalla, y no tienen `id`. Cuando el deslizamiento termina sobre una copia, la fila salta sin animación a la tarjeta real que copia. La persona no ve el salto porque las dos son iguales.
- `scroll-snap-stop: always` hace que un deslizamiento fuerte avance una sola tarjeta. Así nunca se pasa de largo las copias.
- Un deslizamiento de costado mueve solo el carrusel. Uno vertical mueve la página. El navegador fija cada toque en un eje, así que el carrusel no pelea con el scroll guiado de la página.
- Los enlaces a `#pack-<id>` siguen funcionando: los marcadores de la isla 3, la recomendación de la isla 2, el enlace del taller y un enlace compartido con `#pack-sistema` centran la tarjeta correcta. Lo mismo pasa cuando una tarjeta recibe el foco con Tab.
- Sin JavaScript, las copias y los controles se ocultan y la fila se desliza entre las tres tarjetas reales.
- Con movimiento reducido, las flechas y los puntos cambian de tarjeta al instante, sin animación.

### Accesibilidad

- El carrusel es una región con nombre ("Los tres packs").
- Las flechas se llaman "Pack anterior" y "Pack siguiente". Cada punto se llama "Ver el pack Landing", etc., y el actual lleva `aria-current`.
- Los botones miden 44 px de alto.

## 2. "Cómo se paga (?)"

### Qué cambió

- El bloque con las cuatro líneas de pago, debajo de "En todos los packs", ahora es un botón "Cómo se paga" con un signo (?) al lado.
- Al tocarlo o hacer clic se abre un globo con las mismas cuatro líneas, arriba del (?) si entra (ver "Segunda vuelta"). Funciona igual en celular y en computadora.
- `/terminos` no cambia: sigue mostrando el texto completo.

### Cómo funciona

- Archivo: `src/components/world/payment-tip.tsx` (nuevo).
- El título sigue siendo un encabezado (`h3`) y adentro tiene el botón, con `aria-expanded` y `aria-controls`.
- Se abre y se cierra con toque, clic, Enter o Espacio. Escape lo cierra y deja el foco en el botón. Un toque afuera, o mover el foco con Tab a otro lugar, también lo cierra. Deslizar el dedo para leer no lo cierra.
- No se abre solo con pasar el mouse, para que funcione igual en pantallas táctiles.
- El texto queda en el HTML aunque el globo esté cerrado (atributo `hidden`), y el contenido sigue saliendo de `commercialIntro.payment` en `src/content/commercial-plans.ts`.

## 3. Seis pasos: barra vertical en el celular

### Qué cambió

- Antes, debajo del paso actual había seis rayitas en fila horizontal. Parecían una barra para deslizar de costado, pero la sección avanza bajando la página.
- Ahora, a la izquierda del paso actual hay un riel vertical con seis puntos. Se va llenando de arriba hacia abajo a medida que la página baja, igual que el scroll. El punto del paso actual es más grande y tiene un anillo.
- La tarjeta del paso dice "Paso 3 de 6" arriba del título.
- Cada punto sigue siendo un botón que lleva a su paso, con su nombre ("Paso 3: …") y `aria-current="step"` en el actual, como antes (`sendero-controller.tsx` no cambió).
- En computadora no cambia nada. Con movimiento reducido el riel no aparece y se ven los seis pasos, como antes.

### Cómo funciona

- Solo CSS, en el bloque "Mobile packs carousel, payment toggletip and six-steps rail" al final de `src/app/world.css`. Se borraron las reglas de la barra horizontal.
- El relleno del riel usa la misma línea de tiempo de scroll (`--sendero`) que el resto de la sección.
- "Paso N de 6" sale de un contador CSS, así que no hubo que tocar el contenido.
- No se tocaron `guided-scroll.ts`, `section-snap.tsx` ni la isla 3 (`rock-island`).

## Verificación

Se probó con Playwright en Chromium, con el servidor de desarrollo local:

| Prueba | 390x844 | 360x800 |
|---|---|---|
| Deslizar con el dedo (toques simulados por CDP) avanza una tarjeta por gesto | Sí | Sí |
| Tres deslizamientos seguidos vuelven a Landing; hacia atrás desde Landing va a Sistema a Medida | Sí | Sí |
| Un deslizamiento vertical (o casi vertical) sobre el carrusel mueve la página y no el carrusel | Sí | Sí |
| Flechas y puntos, incluida la vuelta completa | Sí | Sí |
| `/#pack-sistema`, marcadores de la isla 3 y botones de la isla 2 centran la tarjeta correcta | Sí | Sí |
| Sin scroll horizontal de la página | Sí | Sí |
| Globo de pago: abre con toque, cierra con toque afuera, abre con Enter, cierra con Escape y devuelve el foco | Sí | Sí |
| Riel de los seis pasos: marca el paso 1, 3 y 6 según el scroll; tocar el punto 5 lleva al paso 5 | Sí | Sí |
| Errores en la consola | 0 | 0 |

También:

- 1440x900 y 1366x768: las tres tarjetas en fila como antes, sin copias ni controles visibles, sin scroll horizontal, globo de pago centrado bajo el botón, 0 errores.
- Movimiento reducido a 390x844: Tab recorre las tarjetas y cada una se centra al recibir el foco; las flechas cambian al instante y dan la vuelta; el riel no aparece y se ven los seis pasos.
- `npm run lint`, `npm run typecheck` y `npm run build` pasan.

## Segunda vuelta (24 de noviembre)

Pedidos de Juani, con el trabajo ya unido a `juanikitro/landing-redesign`:

1. "el (?) de como se paga no se ve bien. aparece abajo y por el scroll automatico no llego nunca a leerlo comodo, debe aparecer arriba del (?) o en un lugar donde el usuario lo vea"
2. "mejora la animacion de movimiento del packs__dots"
3. "dentro de cada detalle de cada pack, hay un scroll vertical que te come el dedo, no quiero que eso pase"

### 1. El globo de "Cómo se paga" se ve entero

- Se abre **arriba** del (?) cuando entra entre el menú fijo y el botón. Si no entra arriba, se abre abajo, siempre que entre antes del borde inferior de la pantalla. Si no entra en ninguno de los dos lados, la página baja lo justo para que entre arriba.
- La flecha del globo apunta al (?), no al centro del texto.
- Mientras el globo está abierto, el scroll guiado no acomoda la página. `PaymentTip` pone `data-popover-open` en `<html>` y `guided-scroll.ts` no llama a nadie al terminar un gesto mientras ese atributo está. Así, después de deslizar para leer, nada se lleva el globo.
- Antes, apoyar el dedo fuera del globo lo cerraba, aunque fuera para deslizar. Ahora lo cierra solo un toque o clic afuera, Escape o Tab hacia otro lugar.
- Archivos: `payment-tip.tsx`, `guided-scroll.ts` (solo la constante `POPOVER_OPEN` y el chequeo; `section-snap.tsx` no cambió) y el bloque de CSS.

### 2. La píldora de los puntos sigue al carrusel

- Antes, el punto activo saltaba de golpe cuando cambiaba de tarjeta. Ahora una píldora verde se mueve con la posición real del carrusel, cuadro a cuadro: a mitad de camino se estira hacia el punto siguiente y después suelta el anterior, con una curva suave.
- En la vuelta del final al principio, la píldora sale por un borde mientras otra entra por el otro, con un leve desvanecido en los bordes. El salto de la copia a la tarjeta real no se nota.
- No tiene animación propia: sigue al scroll. Con movimiento reducido el carrusel cambia al instante, y la píldora también.
- Archivos: `pack-carousel.tsx` (función `paint`) y el bloque de CSS (`.packs__worms`, `.packs__worm`).

### 3. Los detalles de cada pack no tienen scroll adentro

- "Ver todo lo que incluye" ya no abre una caja con scroll propio. La lista se muestra completa y un deslizamiento vertical sobre la tarjeta siempre mueve la página.
- En el celular, la tarjeta dada vuelta crece hasta el alto de sus detalles. Las otras tarjetas del carrusel crecen con ella (la fila tiene un solo alto). "Volver" la deja como estaba.
- Desde tablet, las tres tarjetas comparten filas para alinear precios y botones. Para no estirar las otras dos, la tarjeta dada vuelta crece hacia abajo, por encima de "En todos los packs", hasta que se toca "Volver".
- Solo afecta a las tarjetas de los packs. La tarjeta de mantenimiento de la isla 7 usa el mismo componente (`FlipCard`) y no cambió.

### Verificación de la segunda vuelta

Playwright en Chromium, con toques simulados por CDP:

| Prueba | 390x844 | 360x800 | 1440x900 |
|---|---|---|---|
| Globo con el botón al 20%, 50% y 85% de la pantalla: siempre entero entre el menú y el borde inferior | Sí (abajo, arriba, arriba) | Sí (abajo, arriba con la página 33 px más abajo, arriba) | Sí (abajo, arriba, arriba) |
| Deslizar para leer con el globo abierto: la página no se acomoda sola después | 0 px | 0 px | No aplica |
| Deslizar empezando fuera del globo no lo cierra; un toque afuera, Escape y Tab sí | Sí | Sí | Escape sí |
| Píldora: a un cuarto del arrastre mide 37 px, a la mitad 46 px y vuelve a 21 px al llegar | Sí | Sí | No aplica |
| Píldora en la vuelta de Sistema a Landing: sale por la derecha, entra por la izquierda y termina en el primer punto | Sí | Sí | No aplica |
| Detalles abiertos: ningún elemento con scroll vertical propio dentro de los packs | Sí | Sí | Sí |
| Deslizar hacia arriba sobre una tarjeta dada vuelta mueve la página unos 255 px y el carrusel no se mueve | Sí | Sí | No aplica |
| Alto de las otras tarjetas en computadora con una dada vuelta | No aplica | No aplica | Igual (677 px) |
| Errores en la consola | 0 | 0 | 0 |

Con movimiento reducido a 390x844, las flechas mueven la píldora al instante al punto correcto, incluida la vuelta. `npm run lint`, `npm run typecheck` y `npm run build` pasan.

## Pendiente

- No se probó en Safari ni Firefox reales. Safari no tiene el evento `scrollend`: para ese caso el carrusel espera 160 ms sin scroll y con el dedo levantado antes de saltar de una copia a la tarjeta real. Conviene que el agente de QA lo pruebe en un iPhone.
- No se probó con un lector de pantalla real (VoiceOver o TalkBack), solo los nombres y estados en el DOM.
- Las tarjetas de los packs son altas en el celular (unos 700 px), así que las flechas y los puntos quedan debajo del primer vistazo de la tarjeta.
- En computadora, la tarjeta dada vuelta tapa parte de "En todos los packs" hasta que se toca "Volver". Es la forma de no estirar las otras dos tarjetas; si molesta, la alternativa es abrir los detalles en un panel aparte.
- En el celular, el alto de la tarjeta cambia de golpe al darla vuelta (la rotación 3D sigue igual).

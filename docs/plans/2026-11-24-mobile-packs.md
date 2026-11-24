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
- Debajo hay dos flechas y tres puntos, uno por pack. El punto del pack visible se alarga y queda verde.
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
- Al tocarlo o hacer clic se abre un globo con las mismas cuatro líneas. Funciona igual en celular y en computadora.
- `/terminos` no cambia: sigue mostrando el texto completo.

### Cómo funciona

- Archivo: `src/components/world/payment-tip.tsx` (nuevo).
- El título sigue siendo un encabezado (`h3`) y adentro tiene el botón, con `aria-expanded` y `aria-controls`.
- Se abre y se cierra con toque, clic, Enter o Espacio. Escape lo cierra y deja el foco en el botón. Un toque afuera, o mover el foco con Tab a otro lugar, también lo cierra.
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

## Pendiente

- No se probó en Safari ni Firefox reales. Safari no tiene el evento `scrollend`: para ese caso el carrusel espera 160 ms sin scroll y con el dedo levantado antes de saltar de una copia a la tarjeta real. Conviene que el agente de QA lo pruebe en un iPhone.
- No se probó con un lector de pantalla real (VoiceOver o TalkBack), solo los nombres y estados en el DOM.
- Las tarjetas de los packs son altas en el celular (unos 700 px), así que las flechas y los puntos quedan debajo del primer vistazo de la tarjeta.

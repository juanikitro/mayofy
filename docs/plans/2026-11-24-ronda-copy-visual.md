# Ronda de texto y visual (24 de noviembre de 2026)

Pedido de Juani (24 de noviembre de 2026), puntos 1, 4, 5 y 6. Rama `juanikitro/landing-copy-visual`, un commit por sección.

## Qué cambió y por qué

### Isla 2: propuesta y sombra de Mayo

- La tarjeta base de la propuesta queda solo con su título, «Hecho para tu negocio». Se borró «Lo que tu negocio necesite.» y las reglas CSS que daban estilo a esa línea. En celular y en el escenario de escritorio la tarjeta se lee como el encabezado verde de la lista de módulos.
- Sombra de Mayo. El «círculo extra» no estaba pintado en la tira: venía de las elipses CSS de contacto (`mayoAnchors.problem.contact` en `src/content/stage.ts`). Se verificó ocultando esa capa: sin ella no aparece ningún círculo. Las elipses eran altas (5,5 a 12 % de la celda) y opacas, así que se veían como manchas redondas al costado, y ninguna cubría el cuerpo.
- Ahora usa la misma técnica que la isla 1: elipses planas y largas. Hay una sombra bajo todo el cuerpo, de la pata trasera a las delanteras; una oclusión más oscura bajo cada pata; y una proyección suave hacia abajo y a la izquierda, como la de las rocas. La capa no se anima: en las 12 poses del saludo las patas quedan en el mismo lugar, así que la sombra acompaña la pose sin moverse.

### Trabajos

- Se borró la bajada «Un sistema con agenda para lavaderos, una página para una consignataria y una web personal. Se suman más a medida que terminan.». La lista va directo bajo el título.
- Tarjetas: «ShineApp» (Software as a Service), «Página para una consignataria» (Landing) y «Portfolio de un programador» (Landing).
- `title` y `category` de `src/content/projects.ts` alimentan otras partes del sitio, que cambiaron igual:
  - el título, el eyebrow «Caso · …» y los «otros casos» de cada página de caso;
  - el título y el alt de Open Graph;
  - el mensaje de WhatsApp del caso;
  - el JSON-LD (`name`, `genre` y la miga de pan);
  - `llms.txt`.
- Se regeneraron las tres tarjetas para compartir de `public/og/proyectos/` con `scripts/og-cards.mjs`.
- No cambiaron los titulares largos de las páginas de caso («Un sistema de gestión para un lavadero de autos», «Una página web para una consignataria de hacienda», «Una web personal para un programador»). Describen el trabajo, siguen siendo ciertos y no se pidió tocarlos.
- El título «Trabajos que ya están andando» quedó igual: el coordinador le pasa alternativas a Juani.

### Seis pasos

- Se borró la bajada «Vas a saber en qué etapa está tu proyecto y qué falta para publicar.» y su CSS.
- Paso 1: «Nos contás cómo trabajás hoy y qué querés resolver primero.». No repite los 30 minutos que ya dice el título del paso («Charla gratis de 30 minutos»).
- Paso 4: «Hacés seguimiento mientras lo construimos, no recién al final.».
- Hover de los pasos: sin subrayado. Queda el fondo crema y la etiqueta pasa a tinta plena. El anillo de foco no cambió (2 px, verde musgo).
- Animación de cambio del número:
  - Escritorio: cuando un paso pasa a ser el actual, el número anterior sube y se desvanece mientras el nuevo entra desde abajo. Al volver hacia arriba la dirección se invierte.
  - Celular: el riel no muestra el número. Ahí sube la etiqueta «Paso N de 6».
  - Cómo funciona: `SenderoController` escribe `data-from` (número anterior) y `data-dir` (`down` o `up`) en el número del paso actual. El CSS lo muestra con `attr(data-from)` en un `::before`.
  - Solo animan `translate` y `opacity`: 520 ms de entrada y 320 ms de salida, sin rebote.
  - Solo existe con el recorrido fijado, o sea con movimiento permitido y animaciones por scroll. Además se apaga con `html[data-motion-tier="reduced"]`.

### Isla 6

- Se quitó el fondo oscuro difuminado detrás de «Vas a hablar conmigo…», que se veía como una caja.
- En su lugar, en pantallas anchas el cielo se oscurece hacia la columna del texto: un velo radial muy amplio, en el azul noche del propio cielo, sin borde visible. Se apaga antes de la isla.
- Entre 1024 y 1366 px la isla se acerca al texto, así que el párrafo corta la línea antes (`max-width: min(52ch, 38vw)`) y no queda sobre el borde de pasto.
- En celular no hace falta velo: el texto ya queda sobre el azul profundo.
- «Soy Juani…» pierde la negrita (peso 400). Sigue leyéndose como bajada por su tamaño (24 px en escritorio) y por la tinta más clara.

## Cómo se verificó

- Playwright con Chromium 1248 y WebKit 2388 (equivale a Safari), `waitUntil: "domcontentloaded"`, Google Analytics y Cal.com bloqueados. Primero contra `next dev` y después contra el build de producción (`next build` y `next start`).
- Contraste: se ocultan los glifos, se toma la captura y se compara el color del texto con cada píxel del fondo dentro de los rectángulos de cada línea. Se informa el peor píxel.

| Ventana | Bajada «Soy Juani…», antes → después | Párrafo «Vas a hablar…», antes → después |
|---|---:|---:|
| 1440 × 900 | 3,53 → 6,91 | 6,14 (con la caja oscura) → 4,94 |
| 1366 × 768 | 3,29 → 6,36 | 6,54 → 7,59 |
| 1024 × 768 | sin medir → 7,12 | 3,55 (primer intento, sin cortar la línea) → 7,25 |
| 390 × 844 | 7,89 → 7,70 | 9,23 → 6,07 |
| 360 × 800 | 8,78 → 8,62 | 9,59 → 6,48 |

Mínimo exigido: 4,5:1. Se cumple en todos los casos, también a 1180 × 820, 1280 × 800 y 1920 × 1080.

- Animación de los pasos: se pausó con la Web Animations API en 0, 90, 180, 300 y 520 ms, bajando (2 → 3) y subiendo (3 → 2). Se probó a 1440 × 900 en Chromium y WebKit y a 390 × 844 en Chromium y WebKit. Con `prefers-reduced-motion` y con el nivel `reduced` no corre ninguna animación.
- Foco con teclado en un paso: contorno sólido de 2 px. Hover: sin subrayado.
- Página `/proyectos/shineapp`: título «ShineApp — Mayofy», eyebrow «Caso · Software as a Service», JSON-LD con `name` y `genre` nuevos.
- Sin errores de consola, de página ni de red, fuera de los pedidos bloqueados a propósito.
- `npm run lint`, `npm run typecheck`, `npm test` y `npm run build`: sin errores.

## Límites

- La sombra de la isla 2 está afinada para la pose del saludo. Si se repinta la tira con otra pose, hay que medir de nuevo las patas.
- El velo de la isla 6 depende de dónde cae el texto sobre el cielo pintado. Si cambia la placa, el corrimiento `--hearth-shift` o el largo del texto, hay que repetir la medición de contraste.
- La animación del número no corre en navegadores sin `animation-timeline`, porque ahí el recorrido no se fija y se muestran los seis pasos abiertos.
- No se hizo una prueba con lector de pantalla. El número sigue con `aria-hidden` y el `<ol>` no cambió.

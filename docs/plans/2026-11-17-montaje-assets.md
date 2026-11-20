# Montaje de los assets generados en la landing

**Fecha:** 17 de noviembre de 2026
**Estado:** en curso. Placas, rocas, plataformas con sombras y objetos de las siete islas montados con los archivos optimizados del worker de assets; parallax real en el hero y en la isla 2 (escritorio y celular), las islas con recorte entregado. No está publicado.
**Rama:** `juanikitro/landing-redesign`. Los AVIF y los WebP con pérdida (calidad 82) se versionan acá.

## Qué cambió

- **`src/content/stage.ts` es la fuente de todo el montaje:** placas por isla (escritorio 1672×941 y celular 864×1536), anclas de Mayo en porcentaje de la placa (escritorio y celular), objetos por isla con posición y ancho en porcentaje (rocas sueltas, invernadero y piezas, piedras e hitos del sendero, fogón y banco, farol y luciérnagas) y las tres plataformas de packs con las coordenadas del manifiesto del agente de assets (lienzo 1254×1254, piezas y sombras de contacto).
- **Parallax fuera del hero:** cada `.isle` nombra su propia `view-timeline` (`--isle`) y el fondo deriva un 9 % entre que la sección entra y sale de la pantalla. Una `view()` anónima sobre la imagen no sirve: la placa recorta (`overflow`) y la timeline se mide contra ella, no contra la página. Si el par existe también en celular (`mobileLayers` en `stage.ts`), la isla recortada se muestra en ambos tamaños; si no, en celular queda la placa única.
- **`island-plate.tsx`:** la placa cubre el ancho del contenedor anclada abajo; las secciones altas muestran el cielo CSS arriba (el color de arranque de cada cielo se tomó del borde superior de la placa) y la isla abajo, así el texto pisa el cielo y no la isla. El hero escala la placa un 14 % y la corre a la derecha para despejar la columna de texto. Con par de parallax (`-fondo` + `-isla`) el fondo deriva un 9 % mientras la isla queda fija.
- **`plate-objects.tsx`:** objetos aislados con ancla en la base; los resplandores menta van con mezcla `screen` sobre negro y pulsan en el nivel completo; las rocas sueltas flotan apenas.
- **`rock-island.tsx`:** las plataformas usan las piezas reales; cada sombra de contacto se pinta debajo de su roca emisora y encima de las receptoras, y aparece solo al final del ensamble (`cover 52 % a 58 %` del timeline, o al entrar en celular).
- **Mayo pintada por cuadros:** `mayoSprites` en `stage.ts` registra cada tira entregada (`70-mayo-<isla>-tira`, celdas de 1024, cuadros, fps y línea de patas del manifiesto). `MayoFigure` muestra la tira en una ventana cuadrada y la avanza con `steps()` en los niveles completo y liviano; el nivel reducido y la primera pintura sin JavaScript muestran el primer cuadro. Las tiras se reproducen en ping-pong (ida y vuelta, `animation-direction: alternate`) para que el último cuadro nunca corte al primero y el hervor generativo se note menos; las carreras y la persecución (trabajos, preguntas) se pintan como ciclo cerrado y usan `loop: "cycle"`. Montadas el 17 de noviembre: hero (ampliado a 12 cuadros, 10 fps: los 6 aprobados en las posiciones impares y 6 intermedios en las pares), caída (12, 10 fps, aprobada por Juani) y sistemas (12, 10 fps); las islas sin tira siguen con las imágenes del modelo 3D.
- **Mayo integrada en cada isla (17 de noviembre, pedido de Juani):** sombra de contacto bajo la línea de patas en todas las islas con ancla (`.mayo--shadow`, elipse con degradado radial); las tiras están pintadas mirando a la izquierda y `face: "right"` en `mayoAnchors` la espeja hacia aquello con lo que interactúa (el fogón en la isla de Juani, las luciérnagas en preguntas); `travel: { from, to }` la desplaza por la placa con el scroll de la sección (timeline `--isle`, del 40 % de la entrada al 60 % de la salida): en trabajos corre de derecha a izquierda por el prado y en preguntas avanza hacia una luciérnaga que se le escapa adelante (`chasedTo` en el objeto, que suma la deriva a su flote). Anclas revisadas: hero dentro del prado, isla 2 frente a las rocas sueltas, sistemas con el hocico en el montículo, packs sobre el prado a la derecha de la tercera plataforma (antes vivía dentro de la plataforma y quedaba tapada por la tarjeta; ahora es hija de la placa, aparece al terminar el ensamble y en celular está siempre visible). Sin animaciones por scroll (niveles liviano y reducido, o navegadores sin soporte) queda en su ancla.
- **Mayo** se ancla en cada placa con `translate(-50 %, calc(-1 * var(--feet-y)))`, con la línea de patas de la tira (80 % para las imágenes del modelo) y un cuadrado proporcional al ancho de la placa; en escritorio se la corre a los bordes de la isla donde el panel de contenido ocupa el centro.
- **`?diag`:** sobreimpreso con las señales del nivel de rendimiento para pruebas en dispositivos reales.
- **Revisión de UI/UX (17 de noviembre):** `stage.ts` suma la holgura de cada placa (`clear`), la posición de cada objeto en la placa móvil (último argumento de `obj()`) y el cielo de cada sección pasa a ser continuo con los colores de borde de las placas; ver `2026-11-17-revision-ui-ux.md`.

## Cómo se verificó

Chromium a 1440×900 y 390×844 sobre `next dev`: las siete islas con sus placas y objetos, el ensamble de rocas con sombras naturales, el parallax del hero (fondo a −46 px con la isla fija a 500 px de scroll), sin scroll horizontal, sin errores de consola; lint, typecheck y build limpios.

## Pendiente

- Pares de parallax completos: islas 2 a 7 en escritorio y celular (isla 3 con un solo par para ambos tamaños), hero solo en escritorio el 17 de noviembre en escritorio y celular (deriva medida de 0 a −44 px). Isla 3 montada el 17 de noviembre sobre el escenario pegajoso de las rocas con su propia timeline (`--rocks`, deriva medida de −8 a −57 px); como no tiene placa de celular, el mismo par sirve en ambos tamaños. El hero en celular queda bloqueado: tres recortes de ChatGPT y uno local (BiRefNet) fallaron en el suelo y las raíces. Isla 2 montada el 17 de noviembre: la deriva medida va de 0 a −72 px en escritorio y de 0 a −62 px en celular a lo largo de la sección, sin costura visible en las raíces.
- ~~Lote C (cuadros de nubes) para la caída.~~ Montado el 19 de noviembre: diez cuadros por orientación y cuatro nubes sueltas (ver "Caída entre nubes con cuadros pintados").
- ~~WebP con pérdida para el respaldo de los AVIF.~~ Entregados y versionados el 17 de noviembre (90 archivos, calidad 82, 5,8 MB en total).
- Afinar anclas de Mayo con Juani sobre las placas definitivas.

## Peso de las tiras de Mayo

Las tiras pintadas (`70-mayo-<isla>-tira`) se entregaron con celdas de 1024 × 1024 y pesaban cerca de 1 MB cada una (unos 9 MB en total), pero Mayo nunca se muestra a más de ~250 px CSS (500 px a 2× DPR). El 17 de noviembre se recodificaron a celdas de 640 × 640 (misma cantidad y orden de cuadros, alfa intacto, sin recorte) desde los PNG maestros sin pérdida de los checkouts `mayo-world-assets` (hero, caída, problema, packs) y `mayo-paint-b` (sistemas, trabajos, Juani, preguntas), y `cell` en `sprite()` de `src/content/stage.ts` pasó de 1024 a 640.

Calidad elegida tras un barrido con PSNR sobre la tira de trabajos (pelaje y lengua) y comparación visual al 2× de celdas sueltas: AVIF calidad 48, `effort` 9, croma 4:4:4; WebP calidad 58, `alphaQuality` 100. Por debajo de eso el pelaje fino se empasta; por encima el WebP se dispara de peso sin ganancia visible al tamaño de pantalla. Remuestreo Lanczos3 con alfa premultiplicado (sharp lo hace al redimensionar), sin halos oscuros en los bordes.

Comando (desde una carpeta temporal con `npm init -y && npm i sharp`, script guardado en `docs/archive/tools/encode-mayo-strips.mjs`):

```sh
node encode-mayo-strips.mjs --out <salida> --cell 640 --avif 48 --webp 58 \
  <checkout>/public/images/mundo-mayo/70-mayo-<isla>-tira.png ...
```

| Tira | Cuadros | AVIF antes | AVIF después | WebP antes | WebP después |
| --- | --- | --- | --- | --- | --- |
| hero | 6 | 465 KB | 101 KB | 376 KB | 161 KB |
| fall | 12 | 1096 KB | 254 KB | 826 KB | 377 KB |
| problem | 12 | 943 KB | 226 KB | 819 KB | 380 KB |
| packs | 12 | 984 KB | 219 KB | 782 KB | 336 KB |
| systems | 12 | 1196 KB | 263 KB | 899 KB | 403 KB |
| works | 12 | 976 KB | 228 KB | 748 KB | 348 KB |
| host | 12 | 1095 KB | 224 KB | 815 KB | 351 KB |
| questions | 12 | 1002 KB | 241 KB | 729 KB | 375 KB |
| **Total** | | **7757 KB** | **1756 KB** | **5994 KB** | **2731 KB** |

Objetivo pedido: AVIF ≤ 250 KB y WebP ≤ 350 KB por tira de 12 cuadros. AVIF lo cumple salvo caída (254 KB) y sistemas (263 KB), que quedan apenas por encima; el WebP (respaldo para navegadores sin AVIF) queda entre 336 y 403 KB porque bajar más la calidad ya mostraba bloques en el pelaje. En total las tiras pasan de ~13,4 MB (ambos formatos) a ~4,4 MB; un navegador con AVIF descarga 1,7 MB en lugar de 7,6 MB.

Verificado en Chromium a 1440 × 900: capturas del Mayo del hero y de trabajos antes y después en la misma posición de scroll, sin degradación visible; cada `[data-mayo-slot] .mayo__sprite img` reporta `naturalWidth = cuadros × 640` y el `transform` cambia a lo largo de 300 ms (la animación sigue avanzando). A 390 × 844, `scrollWidth === innerWidth`.

## Caída entre nubes con cuadros pintados

El 19 de noviembre la caída entre la isla 1 y la isla 2 (`src/components/world/cloud-fall.tsx`) dejó las capas SVG provisorias y pasó a los assets del lote C: `60-nubes-01..10` (escritorio, 1672 × 941), `61-nubes-cel-01..10` (celular, 864 × 1536) y `62-nube-suelta-1..4` (nubes aisladas con alfa). Se copiaron sólo el AVIF y el WebP desde el checkout `mayo-world-assets`; la lista de cuadros y nubes vive en `cloudFall` de `src/content/stage.ts`.

### Cómo funciona

- Sigue siendo CSS puro sobre la timeline `--fall` (la sección de 160vh con su escenario pegajoso de 100svh), sin secuestrar el scroll. La altura de la sección, el degradado de fondo y la máscara que desvanece los bordes del escenario no cambiaron.
- Los diez cuadros están apilados a pantalla completa (`object-fit: cover`), cada uno en un `<picture>` con AVIF primero, WebP de respaldo y `<source media="(max-width: 48rem)">` para los cuadros de celular.
- El cuadro 01 está opaco desde el principio; entre `cover 18%` y `cover 82%` los cuadros 02 a 10 entran en orden, cada uno en un tramo de ~7,1 % del rango. Cada cuadro aparece en la primera mitad de su rango y se apaga de golpe cuando el siguiente ya está opaco encima, así nunca hay más de dos cuadros visibles. Los rangos se calculan en `frameRange()` y llegan al CSS como `--frame-from` y `--frame-to`.
- Costuras: el cuadro 01 abre con un cielo lavanda y el 10 cierra con una bruma clara, así que cada uno lleva un velo (`::after`) hacia el color del extremo de la sección (`--fall-top` = `#b38fa0`, `--fall-bottom` = `#90c5fb`; en celular `#b690b3` y `#8bc3f8`). Sin ese velo quedaba una franja blanquecina sobre el cielo de la isla 2.
- La tira pintada de Mayo (`[data-mayo-slot="fall"]`, z-index 1) sigue cayendo con la animación `mayo-fall` (`cover 20%`–`80%`). Las nubes sueltas suben más rápido que los cuadros: la 1 y la 2 pasan por detrás de Mayo (z-index 0, 85 % de opacidad, de +45vh a −95vh) y la 3 y la 4 por delante (z-index 2, de +75vh a −140vh), cada una con su propio rango entre `cover 8%` y `cover 88%`. La nube 3 está corrida a la izquierda para que tape a Mayo sólo en parte al cruzarla.

### Modo reducido

Con `data-motion-tier="reduced"`, con `prefers-reduced-motion: reduce` y en navegadores sin animaciones por scroll se ve una sola composición fija: el cuadro 05 (el último con horizonte, el que mejor se lee quieto), las cuatro nubes en su posición de reposo y Mayo. El CSS deja todos los cuadros en opacidad 0 salvo el marcado `data-still`, así que el primer pintado nunca muestra la pila entera. Con `prefers-reduced-motion` la sección baja a 60vh como antes.

### Pesos

Todas las imágenes son `loading="lazy"` y `decoding="async"` con `width` y `height`; la caída queda lejos del primer viewport, por eso ni el cuadro 01 se pide de entrada.

| Lo que carga | 1440 × 900 | 390 × 844 |
| --- | --- | --- |
| Diez cuadros (AVIF) | 579 KB (`60-nubes`) | 531 KB (`61-nubes-cel`) |
| Cuatro nubes sueltas (AVIF) | 152 KB | 152 KB |
| **Total** | **731 KB** | **683 KB** |

El navegador sólo descarga la orientación que corresponde (medido con `performance.getEntriesByType("resource")`). Ojo: en este lote el WebP pesa menos que el AVIF (cuadros de escritorio 359 KB contra 579 KB; de celular 328 KB contra 531 KB), así que el AVIF primero cuesta ~220 KB de más por orientación. Conviene recodificar el AVIF o servir WebP primero para estos cuadros.

### Cómo se verificó

Chromium (Playwright) a 1440 × 900 y 390 × 844 sobre `next dev`, recorriendo la caída en nueve pasos: los cuadros visibles fueron `01`, `01+02`, `02+03`, `04+05`, `05+06`, `06+07`, `08+09`, `09+10`, `10` en ambos tamaños (avance monótono, nunca más de dos). La transformación de Mayo cambia en cada paso, las nubes 3 y 4 tienen z-index 2 sobre el 1 de Mayo, `scrollWidth === innerWidth` a 390 y no hubo errores de consola. Con `reducedMotion: 'reduce'` sólo el cuadro 05 queda visible y no corre ninguna animación dentro de la caída. Capturas al principio, al medio y al final: el color en la unión con el hero es continuo (`#b38fa0` a ambos lados) y el final se funde con el cielo de la isla 2 sin franja. `npm run typecheck`, `npm run lint` y `npm run build` limpios; el repositorio no tiene runner de tests.

Pendiente: las nubes sueltas traen un halo rosado en el borde del alfa que se nota sobre los cuadros más oscuros; si molesta, pedir un recorte más limpio al agente de assets. En el hero, la placa termina en una banda plana de `#b38fa0` con un borde horizontal visible por encima de la caída; es anterior a este cambio.

Los cuadros de la caída se sirven sólo en WebP: en este lote el WebP pesa alrededor de un 40 % menos que el AVIF (359 KB contra 579 KB en escritorio, 328 KB contra 531 KB en celular), así que los AVIF de 60 y 61 no se versionan. Las nubes sueltas (62) siguen con AVIF primero.

## Islas como una sola ilustración (19 de noviembre de 2026)

Juani decidió que las islas dejen de ser un collage: los objetos fijos (rocas, invernadero, sendero, banco, fogón, farol) se pintan dentro de cada placa con la placa como base de edición, así toman su luz, su perspectiva y su sombra de contacto. La edición se limita al prado con una máscara difuminada y fuera de ella la placa queda idéntica a la original. Mayo y las luciérnagas siguen separadas porque se mueven; en cada isla queda libre su parcela o su recorrido. Las placas nuevas llevan el sufijo `-v2` (placa, `-v2-isla` y `-v2-fondo`, en escritorio y celular) y se producen en las ramas de los ilustradores a partir de `juanikitro/mayo-world-assets`.

- **Isla 2 (piloto, aprobada por Juani):** siete rocas con musgo y ramilletes de flores blancas, amarillas y rosa pálido. Se quitaron las ocho rocas pegadas (`plateObjects.problem`). La placa de celular conserva su cielo original, distinto del fondo de parallax anterior, así que se actualizaron los colores de unión de la isla en celular (`--sky-plate: #8bb8e3`, `--sky-bottom: #eed5c2` y el comienzo de la isla 3).
- **Isla 6:** banco y fogón pintados, con la luz cálida del fuego sobre el pasto, el banco y las piedras. Se quitaron los objetos pegados (`plateObjects.host`).
- **Isla 7:** el farol quedó pintado en el suelo, delante de la roca de la izquierda (escritorio ~36,6 % / 48 %, celular ~27 % / 73,3 %), con su luz cálida sobre el pasto; en su lugar original habría quedado fuera del suelo. Las luciérnagas siguen siendo sprites animados. Se quitó el farol pegado.
- **Isla 4:** invernadero, maceta, montículos de tierra, engranaje y caja pintados sobre el suelo arado con la luz dorada; se quitaron los seis objetos pegados (`plateObjects.systems`). Los colores de borde del fondo nuevo coinciden con los de la isla (diferencia de uno o dos tonos).
- **Isla 5:** seis piedras planas en el sendero y seis hitos bajos (tres de madera y tres de piedra) fuera del camino, con los más altos detrás de la franja por donde corre Mayo; se quitaron los doce objetos pegados (`plateObjects.works`). El fondo nuevo empieza y termina unos tonos más oscuro, así que se actualizaron los colores de unión del atardecer y el comienzo de la isla 6 (escritorio `#8d68b4` / `#c47fa1`, celular `#805dad` / `#b57aa2`).
- **Estado:** las islas 2, 4, 5, 6 y 7 ya son una sola ilustración; ya no queda ningún objeto fijo pegado encima (sólo las luciérnagas, que se mueven). El hero ya era una sola pieza y las plataformas de packs siguen separadas porque se arman con el scroll.
- **Observado sin resolver:** en celular, alrededor de la placa de la isla 2 se ve un recuadro más claro y, en escritorio, un borde horizontal al pie de algunas islas cuando el fondo deriva; no lo causan las placas nuevas, queda para revisar la deriva del fondo. Resuelto el 19 de noviembre: el fondo subía y destapaba el cielo de la sección; ahora baja y funde su pie (ver `2026-11-19-revision-diseno.md`).

## Mayo atada al scroll y apoyada en el suelo

**Fecha:** 19 de noviembre de 2026. Pedido de Juani, textual: "quiero cambiar el comportamiento. La idea es que se mueva solo al scrollear, no como un gif todo el tiempo, entonces al scrollear avanza la animacion y al volver lo mismo". Además pidió integrar bien a Mayo en cada isla, porque parecía pegada encima.

### Comportamiento

- La tira de Mayo ya no corre con el reloj. El cuadro depende de la posición del scroll sobre la timeline con nombre de la sección: al bajar avanza, al subir retrocede y, con la página quieta, Mayo queda quieta. Se quitó el bucle infinito por tiempo y el `fps` de los datos (ya no significaba nada).
- CSS puro (`.mayo__sprite img` en `world.css`): `animation-timeline: var(--scrub-timeline)`, `animation-range: var(--scrub-range)`, `steps(<cuadros>, jump-none)` para que nunca se mezclen dos cuadros y `animation-iteration-count: var(--cycles)`. El fotograma clave termina una celda antes del final de la tira (`translateX(-100% · 11/12)`), así `jump-none` cae justo en el primer y el último cuadro y nunca muestra el vacío después de la tira. Las tiras `pingpong` alternan la dirección en cada vuelta y las `cycle` repiten hacia adelante.
- `MayoFigure` toma los valores de `mayoSprites[].scrub` en `stage.ts` (timeline, rango de escritorio, rango de celular y vueltas) y los publica como variables en el elemento de Mayo. El recorrido (`mayo--travel`) usa la misma timeline y el mismo rango, así las patas y el desplazamiento van juntos. La luciérnaga perseguida de la isla 7 usa el mismo rango que Mayo (`--chase-range` en `world.css`).
- Sin animaciones por scroll, en el nivel `reduced` y con `prefers-reduced-motion: reduce` se ve el cuadro 1 fijo; no hay respaldo por tiempo.

### Timelines, rangos y vueltas

Los rangos se midieron en la página: la parte del rango `cover` de cada sección durante la que Mayo está en pantalla, a 1440 × 900 y a 390 × 844. La isla 7 es la última sección, así que su rango termina antes de que la página deje de scrollear (a 1440 el scroll llega a `cover 71,7 %`; el recorrido anterior, `entry 40 %`–`exit 60 %`, nunca terminaba).

| Lugar | Timeline | Rango escritorio | Rango celular | Tira | Vueltas |
| --- | --- | --- | --- | --- | --- |
| Hero | `--dawn` | `cover 50%`–`78%` | `cover 48%`–`78%` | pingpong | 2 (cola, mientras salta con `mayo-leap`) |
| Caída | `--fall` | `cover 20%`–`80%` | igual | pingpong | 3 (al ritmo de `mayo-fall`) |
| Isla 2 | `--isle` | `cover 30%`–`85%` | `cover 35%`–`88%` | pingpong | 3 |
| Isla 3 | `--rocks` | `cover 60%`–`90%` (aparece en 58–63 %) | `cover 55%`–`96%` | cycle | 3 |
| Isla 4 | `--isle` | `cover 50%`–`92%` | `cover 66%`–`97%` | pingpong | 4 (escarbar es repetitivo) |
| Isla 5 | `--isle` | `cover 46%`–`88%` | `cover 68%`–`96%` | cycle | 4 (cerca de una zancada por largo de cuerpo recorrido) |
| Isla 6 | `--isle` | `cover 62%`–`93%` | `cover 72%`–`98%` | pingpong | 2 (respira, apenas se mueve) |
| Isla 7 | `--isle` | `cover 47%`–`70%` | `cover 57%`–`77%` | cycle | 3 |

### Cómo se derivaron las anclas

- Sobre la página real se superpuso una grilla del 5 % a cada `.plate` (que es el sistema de coordenadas de las anclas) y se leyó, sobre el recorte `-v2-isla` que se pinta, el borde trasero del prado, el labio delantero y los objetos pintados; para el celular se usaron las placas móviles con la misma grilla. Las patas quedan sobre el prado, entre el borde trasero y el labio, y el tamaño se ajustó a los objetos vecinos (más chica cuanto más atrás y cuanto más chica es la isla).
- Se midió la línea de patas de cada tira (el píxel opaco más bajo de cada celda): hero 95 %, caída 88 %, isla 2 93 %, isla 6 91,6 %, isla 7 92 %; isla 3 y 5 se quedan en la sombra pintada de la tira (90,8 % y 87 %) porque tienen cuadros en el aire; isla 4 94 %.
- La sombra de contacto ahora está centrada justo en la línea de patas, más baja y tenue (`--shadow-opacity` 0,26–0,32) y se corre en contra de la luz principal de cada isla (`--shadow-lean`, en % del ancho de Mayo).

| Lugar | Escritorio (x, y, tamaño) | Celular (x, y, tamaño) | Mira a | Sombra | Antes |
| --- | --- | --- | --- | --- | --- |
| Hero | 51 %, 72,5 %, 10 % | 56 %, 80,5 %, 22 % | izquierda | −6 % (amanecer por la derecha) | flotaba contra el borde trasero, demasiado grande frente al árbol |
| Isla 2 | 45 %, 63 %, 10,5 % | 43 %, 69,5 %, 22 % | izquierda | +6 % (mañana por la izquierda) | sobre el labio delantero |
| Isla 3 | 62,5 %, 55,5 %, 8 % (entre las plataformas 2 y 3) | 72 %, 54 %, 18 % (a la derecha de la pila) | derecha | +2 % (mediodía) | en el aire junto a la tarjeta 3 |
| Isla 4 | 42,5 %, 67,5 %, 11 % (hocico en el montículo de 46 %, 66 %) | 42 %, 76,8 %, 17 % (montículo de 48,5 %, 75,8 %) | derecha | −6 % (dorada por la derecha) | escarbaba en el borde |
| Isla 5 | 49 %, 67 %, 10 %; corre de 60 % a 38 % | 48 %, 72,5 %, 20 %; de 58 % a 38 % | izquierda | +6 % (atardecer por la izquierda) | corría por el borde |
| Isla 6 | 45 %, 61,5 %, 10,5 % | 36 %, 74,5 %, 21 % | derecha (al fogón) | −8 % (fogón a su derecha) | sobre el labio |
| Isla 7 | 45,5 %, 47 %, 7 %; trota de 40,5 % a 50,5 % | 45 %, 73,5 %, 18 %; de 37 % a 53 % | derecha | +7 % (farol a su izquierda) | caminaba sobre las raíces (y 62 %, debajo del prado) |

`MayoAnchor` suma `travelMobile` (el recorrido en la placa de celular, que encuadra el prado distinto) y `shadow` pasa a ser `false` o `{ lean, opacity }`. La luciérnaga perseguida de la isla 7 se movió para ir delante de la cabeza de Mayo (escritorio 45 %, 41 % → 56 %; celular 45 %, 66,5 % → 60 %).

### Cómo se verificó

Chromium (Playwright) sobre `next dev`, a 1440 × 900 y 390 × 844, en los ocho lugares: con el scroll quieto 1,5 s la transformación de la tira no cambia; bajando en diez pasos el índice de cuadro avanza (por ejemplo isla 4: 0, 1, 2 … 10) y subiendo por las mismas posiciones vuelven los mismos índices; antes del rango se ve el cuadro 1. Con `prefers-reduced-motion: reduce` las ocho tiras quedan con `animation: none` y cuadro 1 en todo el recorrido. Recortes alrededor de Mayo revisados a ojo (patas en el prado, sin tapar objetos pintados). `scrollWidth === innerWidth` a 390, sin errores de consola; typecheck, lint y build.

### Pendiente

- Los rangos son porcentajes de `cover` medidos a 1440 × 900 y 390 × 844; en alturas de ventana muy distintas Mayo puede empezar a moverse un poco antes o después de entrar en pantalla.
- El resto de las luciérnagas de la isla 7 sigue en las posiciones de la placa anterior (varias quedan debajo del prado en escritorio); conviene reubicarlas.
- En la isla 4 de celular la cola de Mayo roza la maceta pintada; en la isla 3 la ubicación depende de dónde caen las tarjetas a cada ancho.
- Validar con Juani la cantidad de vueltas por isla (la sensación de "velocidad" depende de cuánto se scrollea por cuadro).

### Ajustes de Juani (19 de noviembre de 2026)

- **Hero:** "mayo no debe volar, debe quedarse sentada". Se quitó el salto (`mayo-leap`); sigue sentada y su animación avanza con el scroll.
- **Caída:** "si me gustaria que se mueva constantemente". Es el único lugar donde Mayo se mueve sola: su tira corre en bucle de 1,2 s (ida y vuelta) mientras las nubes siguen el scroll.
- **Isla 3:** "debe aparecer desde el inicio, no al final de la aparicion de las piedras". Se quitó la aparición diferida (`mayo-appear`) y el rango de su animación empieza al 25 % de la sección. La animación de las piedras y su ubicación quedan para después, como pidió Juani.
- **Isla 4:** "no me parece que este bien integrada, quizas por el angulo". Piloto en curso: repintar sus cuadros sobre un recorte de la placa v2 para que tome la cámara, la luz y la sombra de la escena.
- **Isla 7:** "quiero que sea como la primera". Se interpretó como el hero: Mayo queda en su lugar, sin recorrido, y su animación avanza con el scroll; la luciérnaga que perseguía queda flotando delante de ella.

### Mayo pintada en su lugar: piloto en la isla 4

Para la isla 4, Juani dijo que Mayo cavando "no me parece que este bien integrada, quizas por el angulo". Sus doce cuadros se repintaron sobre un recorte de la placa `40-isla4-escritorio-v2` (izquierda 31,52 %, arriba 33,05 %, lado 22,01 % del ancho de la placa), así toman la cámara de tres cuartos, la luz dorada y la sombra de la escena; después se extrajo sólo lo que cambia (Mayo, su sombra y la tierra que salta) por diferencia contra el recorte limpio. La celda de la tira (`70-mayo-systems-v2-tira`, 12 × 640 px) es ese recorte: el ancla usa su centro (42,52 %), la línea de patas al 67,5 % de la placa y el tamaño 22,01 %; la sombra viene pintada, por eso `shadow: false`. Celular usa la misma tira en 34 %. Límite: la generación alteró algo la textura del fondo dentro del recorte; se excluyó de la tira, así que el recorte pegado sobre la placa coincide, pero la imagen generada original no era idéntica píxel a píxel.

- **Hero, pintada en su lugar:** recorte de la placa del hero (izquierda 798 px, lado 109 px de 1672, ancla 50,99 % / 72,5 %, celda = 6,52 % del ancho; patas al 88,28 % de la celda). Sentada, sin salto; mide alrededor de un tercio del árbol, como pedía Juani ("el tamaño de [Mayo] al lado de los otros elementos naturales"). Celular 14,3 %. Tira `70-mayo-hero-v2-tira`.
- **Isla 6, pintada en su lugar:** recorte de la placa v2 (izquierda 681 px, lado 142 px de 1672; ancla 44,98 % / 61,1 %, celda 8,49 %, patas al 85,16 %). Echada mirando el fogón, con la luz del fuego a su derecha y el relleno azul del crepúsculo a la izquierda, respiración lenta y un parpadeo. Celular 17 %. Tira `70-mayo-host-v2-tira`.
- **Isla 2, pintada en su lugar:** recorte de la placa v2 (izquierda 681 px, arriba 468 px, lado 142 px de 1672; ancla 44,98 % / 63 %, celda 8,49 %, patas al 87,91 %). Reverencia de juego y pequeños saltos entre las rocas pintadas, lengua afuera en cuadros alternos. Celular 17,8 %. Tira `70-mayo-problem-v2-tira`.
- **Isla 7, pintada en su lugar:** recorte de la placa v2 (izquierda 711 px, arriba 354 px, lado 100 px de 1672; ancla 45,51 % / 47 %, celda 5,98 %, patas al 88,27 %). Sentada, sigue una luciérnaga con la cabeza, levanta una pata y mueve cola y orejas; luz menta desde arriba a la derecha y cálida del farol a la izquierda. Pasa a ida y vuelta (2 ciclos) porque ya no es un trote. Celular 15,4 %. Tira `70-mayo-questions-v2-tira`.
- **Isla 5, pintada en su lugar:** galope visto desde la cámara de la escena, recorte de la placa v2 (izquierda 752 px, arriba 513 px, lado 134 px de 1672; ancla 48,98 % / 65,64 %, celda 8,01 %, línea de suelo al 78,13 %). Se aplicó la propuesta de la revisión de diseño (commit `ecbc139` de su rama): el recorrido avanza una vez por cuadro pintado y la cantidad de zancadas sigue el largo de su cuerpo (3 en escritorio, 1,5 en celular, nuevo `cyclesMobile`), así las patas no patinan. Medido en escritorio: unos 9 px por cuadro. Celular 16 %. Tira `70-mayo-works-v2-tira`. Con esto Mayo está pintada en su lugar en todas las islas salvo la caída (sin suelo) y packs (pendiente del rediseño de la isla 3).

### Mayo en bucle propio (20 de noviembre de 2026)

Juani: "Quiero que en las islas 1, 2, 4, 6 y 7 la animacion no dependa del scroll (como en la caida libre)". En el hero y las islas 2, 4, 6 y 7 la tira corre sola, ida y vuelta, con una duración por isla (hero 2,6 s, isla 2 1,4 s, isla 4 1,3 s, isla 6 3,2 s, isla 7 2,2 s; variable `--loop-duration` en `world.css`). Siguen atadas al scroll la isla 5 (la carrera avanza con el recorrido) y la isla 3 (los saltos entre plataformas). Con movimiento reducido no se anima.

### Sombras de Mayo en las islas 2, 4 y 7

Juani: "En la isla 2, 4 y 7, podriamos mejorar la sombra de mayo para que se integre mejor".

**Diagnóstico.** Las tres tiras traen la sombra pintada (por eso `shadow: false`), sin cortes en los bordes de la celda y presente en los doce cuadros, con la dirección correcta (hacia la derecha, como la de los objetos de la placa). El problema es la fuerza: medida en el alfa de cada celda, la parte semitransparente promedia ~13 % en la isla 2 (además manchada, con huecos de pasto por la extracción por diferencia), ~20 % en la isla 4 y ~16 % en la isla 7, mientras que las rocas, la maceta, los montículos y el engranaje de la placa apoyan sobre sombras oscuras y bien definidas. Faltaba sobre todo la oclusión bajo las patas: en la isla 2 parecía flotar sobre el pasto, en la isla 4 las patas traseras quedaban en el aire y en la isla 7 sentada de noche no tenía base.

**Qué se agregó.** Una capa de contacto CSS por debajo de la tira (`.mayo__contact` en `world.css`, generada por `MayoFigure`): elipses suaves dibujadas como capas de `radial-gradient` de una sola caja que cubre la celda, en porcentaje de la celda (escala sola en escritorio y celular) y en el tono de sombra de cada placa. Se configura con `mayoAnchors[slot].contact = { tint, layers }`, donde cada capa es `{ kind: "ao" | "cast", x, y, w, h, opacity }` (centro, radios y alfa en el centro, que se desvanece hasta el borde). Es estática: no sigue los cuadros, así que se queda quieta mientras Mayo corre en bucle y no necesita nada para movimiento reducido. Se usa mezcla normal con un tono oscuro de la placa en vez de `multiply`, porque `.mayo--anchored` tiene `transform` y es un grupo aislado donde `multiply` sólo mezclaría con transparencia. La sombra pintada de la tira se mantiene encima. Los demás slots (hero, caída, packs, trabajos, anfitriona) no cambian; packs conserva su `.mayo--shadow`.

**Parámetros** (celda en %):

| Isla | Tono | Capas |
| --- | --- | --- |
| 2 (sol de la mañana) | `26 46 10` | proyección 56/82, radios 34×9, 0,38; oclusión patas delanteras 26/88 y 46/89,5 (9×2,6, 0,65); patas traseras 74/73 (7×2, 0,6) |
| 4 (hora dorada) | `58 24 10` | proyección 66/79, 22×5,5, 0,3; oclusión patas delanteras en la tierra 40/87,5 (10×2,2, 0,45); patas traseras 65/75,5 (8×1,8, 0,5) |
| 7 (noche) | `2 20 22` | proyección del farol hacia la derecha 64/89, 26×5, 0,35; proyección de la luz menta hacia abajo a la izquierda 36/92, 18×3,5, 0,2; oclusión del asiento 45/90,5, 24×3, 0,6 |

**Cómo se verificó.** Recortes antes y después de las tres islas a 1440×900 y 390×844 en los cuadros 0, 6 y 9 (el 9 de la isla 2 es el salto: la sombra queda en el suelo), sin errores de consola, estilos calculados de los demás slots idénticos antes y después, y la capa sin animación con movimiento reducido; `typecheck` y `lint` limpios. No hay corredor de tests en el proyecto.

**Límite.** Las posiciones están en espacio de pantalla: un slot con `face: "right"` tendría que espejar sus elipses a mano. La capa no reacciona a los cuadros, así que en el salto de la isla 2 la oclusión bajo las patas delanteras sigue en el pasto (se lee como la sombra del salto).

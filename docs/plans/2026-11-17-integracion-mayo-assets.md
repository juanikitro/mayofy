# Integración de Mayo, los assets y la página

**Fecha:** 17 de noviembre de 2026
**Estado:** análisis previo a la integración. No hay código nuevo; define cómo encajan el modelo 3D de Mayo (`mayo-3d`), las imágenes del agente de producción (`Desktop/MayofyMundo`) y la página construida en `juanikitro/landing-redesign`.
**Fuentes:** `mayo-3d/docs/LANDING_INTEGRATION.md` (aprobado por Juani el 16 de noviembre), `mayo-3d/preview/moments.js`, `lighting.js`, `journey.html`; carpeta `C:\Users\Juanito\Desktop\MayofyMundo` (81 PNG originales más estudios de montaje); rama `juanikitro/mayo-world-assets` (originales archivados, sin lote optimizado todavía).

## 1. Qué hay de cada lado

**Mayo (listo):** `dist/mayo.glb` (1,63 MB, meshopt, texturas WebP 2048 px), 12 clips nombrados (`sit`, `idle`, `jump_void`, `fall_float`, `land`, `play_rocks`, `platform_jump`, `dig`, `run`, `chase_firefly`, `lie_down`, `rest`), 10 "momentos" con cámara, luz por isla y cuadro fijo, y por cada momento una imagen fija (1600×1600, AVIF de 28 a 33 KB) y un loop animado (800×800, AVIF de 71 a 178 KB). Las imágenes se capturan de la misma escena en tiempo real, así que el reemplazo imagen → 3D puede ser exacto si la página respeta la cámara de cada momento.

**Assets de escenario (en producción):** placas de escritorio 1672×941 (16:9) y de celular 941×1672 para las islas 1, 2, 4, 5 y 6; placa base de la isla 3; capas de cielo y de primer plano para las islas 1, 2, 4, 5 y 6; objetos aislados sobre magenta: 12 rocas de plataformas (3 × 4), 4 rocas sueltas, 8 rocas de la isla 2, invernadero, caja, engranaje, maceta y dos montículos (isla 4), 6 piedras y 6 hitos del sendero (isla 5), fogón y banco (isla 6). Todo son originales de 1,4 a 2 MB cada uno: todavía nada está recortado, con alpha ni optimizado.

**Página (lista con arte provisorio):** 7 islas en SVG, caída entre nubes, nav, progreso, Cal.com, formulario, casos y privacidad. Cada capa provisoria ya ocupa el lugar de un asset (`scene__sky`, `scene__island`, `scene__fore`, `rock--*`, `isle__mayo`, `fall__layer--*`).

## 2. Cómo son las placas (medido)

Caja de la isla dentro de cada placa de escritorio (porcentaje del ancho y del alto):

| Placa | Isla ocupa x | Isla ocupa y | Observación |
|---|---|---|---|
| 01 hero | 26–74 % | 48–98 % | Árbol grande y cartel a la izquierda de la isla, prado libre a la derecha. Cielo limpio arriba del 48 %. |
| 02 hero celular | 6–86 % | 67–94 % | Dos tercios superiores de cielo. Coincide con el layout móvil actual (texto arriba, isla abajo). |
| 10 isla 3 base | 9–96 % | 42–96 % | Isla ancha y vacía, lista para las tres plataformas. |
| 30 isla 2 | 19–81 % | 53–91 % | Prado vacío para las 8 rocas sueltas. |
| 40 isla 4 | 21–78 % | 52–92 % | Surcos de huerta y un claro de tierra para el invernadero y las piezas. |
| 45 isla 5 | 12–96 % | 33–91 % | Sendero en S ya pintado en la placa. |
| 50 isla 6 (Juani, crepúsculo) | 7–95 % | 30–93 % | Árbol y rocas con musgo; lugar libre para fogón y banco. |
| 55 isla 7 (preguntas, noche) | — | — | Solo existe la placa de escritorio; faltan celular, cielo, primer plano, luciérnagas y farol. |

Consecuencia para el hero: a 1440×900 el texto ocupa la columna izquierda hasta el 45 % del ancho y baja hasta el 65 % del alto; la isla de la placa arranca en el 48 % del alto y entre el 26 % y el 74 % del ancho. El solapamiento es pequeño pero existe (botones sobre el cielo que ya toca la copa del árbol). Dos remedios compatibles: `object-position: 72% 100%` en la placa (al recortar con `cover` la isla se corre a la derecha) y mantener el bloque de texto en 44 rem como hoy. En celular no hay conflicto.

## 3. Cómo se monta cada isla

Principio: la placa es el fondo completo de la isla (`<picture>` con escritorio y celular, `object-fit: cover`), los objetos aislados van encima como capas posicionadas en porcentaje de la placa, y Mayo es la última capa, en el ancla definida abajo. Las capas de cielo (03, 31, 41, 46, 51) sirven para dos cosas: rellenar el alto que la placa no cubre (las islas miden más que 16:9) y hacer el parallax lento detrás de la placa. Para que la unión placa/cielo no se note, el color del borde superior e inferior de cada placa se vuelca a los tokens de cielo de `world.css` (hoy son degradés aproximados).

| Isla | Fondo | Capas encima | Animación atada al scroll |
|---|---|---|---|
| 1 Hero | 01 / 02 + cielo 03 | primer plano 04 abajo a la izquierda (ya hay un slot `scene__fore`) | cielo a 0,3× y primer plano a 1,2× del scroll, como hoy |
| Caída 1→2 | cielo 03 fundiendo a cielo 31 | nubes: **no hay cuadros generados** (lote C sin producir); se mantienen las nubes CSS actuales sobre los cielos reales, o se le pide al agente los 10 a 12 cuadros | igual que hoy |
| 2 Rocas sueltas | 30 + cielo 31 | 8 rocas 33-* dispersas sobre el prado, primer plano 32 | rocas con vaivén suave (nivel completo), Mayo juega entre ellas |
| 3 Packs | 10 (sin cielo aparte: usar el degradé de la placa) | 12 piezas 14/15/16-* + 4 rocas sueltas 20-* flotando; sombras de contacto como capas separadas | ensamble con `--rocks` como hoy; las sombras entran en el último 10 % del rango |
| 4 Taller | 40 / celular + cielo 41 | invernadero 43 sobre el claro, piezas (engranaje, caja, maceta) y montículos | piezas "desenterrándose" (aparecen desde el montículo) mientras Mayo escarba |
| 5 Jardín | 45 / celular + cielo 46 | 6 piedras 48-paso-* sobre el sendero pintado y 6 hitos 48-hito-* | hitos aparecen por paso del proceso; Mayo corre por el sendero |
| 6 Juani | 50 / celular + cielo 51 | fogón 53 y banco 53, primer plano 52 | llama con parpadeo (ya existe `flame-flicker`), Mayo llega y se echa |
| 7 Preguntas | 55 (solo escritorio) | luciérnagas y farol: faltan | luciérnagas como hoy en SVG hasta tener assets |

Plataformas de la isla 3: el manifiesto del agente trae las coordenadas de montaje probadas (lienzo 1254×1254; por ejemplo plataforma 3: base en (240,675) ancho 740, derecha (550,300) ancho 345, izquierda (265,365) ancho 365, cima (420,130) ancho 385). Se convierten a porcentaje del contenedor de cada plataforma y reemplazan las posiciones de `.rock--base/left/right/top` sin tocar la mecánica de `rock-settle`. Las sombras de contacto que el agente entrega como PNG separados se montan como capas con `opacity` animada en el mismo timeline, para que aparezcan solo al final del ensamble, como pide el manifiesto.

## 4. Mayo: cómo se coloca y cómo se mueve

**Idea central: Mayo como "sprite" cuadrado.** Las imágenes de Mayo son cuadradas y la cámara de cada momento vive en `moments.js`. Si la página le da al nivel completo un canvas cuadrado del mismo tamaño y en la misma posición que tendría la `<img>` del nivel liviano, el reemplazo imagen → 3D es exacto y el 3D no necesita saber dónde está la isla: la cámara encuadra a Mayo como en la captura, y es el contenedor el que se mueve por la página. Es lo contrario del prototipo `journey.html`, donde el canvas cubre toda la pantalla y Mayo queda siempre centrada; ese prototipo sirve para la cámara y los clips, no para la posición en pantalla.

Esto define el slot de Mayo por isla con tres números: ancla (x, y en porcentaje de la placa, donde apoyan las patas) y tamaño (ancho del cuadrado como porcentaje del ancho de la isla). En las imágenes el perro ocupa aproximadamente el 55 % del ancho del cuadrado y las patas quedan en el 80 % del alto, así que el cuadrado se posiciona con `translate(-50%, -80%)` respecto del ancla. La regla de la biblia (Mayo ≈ un octavo del ancho de la isla) da un cuadrado de aproximadamente un cuarto del ancho de la isla.

| Isla | Momento | Clip | Ancla en la placa (x, y) | Cuadrado | Nota |
|---|---|---|---|---|---|
| 1 Hero | 01-hero | `sit` (mirada sigue al cursor) | 58 %, 69 % | 24 % del ancho de la isla | Sentada en el prado, a la derecha del árbol. Sale con `jump_void` al scrollear (momento 02, la cámara sube a 48° de elevación). |
| Caída | 03-fall-float | `fall_float` | centro del escenario, baja con el scroll | 30 % del ancho de pantalla, máx. 10 rem | Igual que el slot `.fall__mayo` actual. |
| 2 Rocas sueltas | 04-play-rocks | `land` → `play_rocks` | 52 %, 62 % | 24 % | Entre las rocas 33-02 y 33-05. |
| 3 Packs | 05-platform-jump | `platform_jump` (una vez) | sobre la plataforma 3, como hoy `.platform__mayo` | 26 % del ancho de la plataforma | Se dispara cuando el ensamble llega al 60 % del rango; luego queda en `idle`. |
| 4 Taller | 06-dig | `dig` | 44 %, 66 % | 24 % | Frente al montículo 43-tierra-01. |
| 5 Jardín | 07-run | `run` (cámara lateral, azimut 90°) | 50 %, 60 % | 22 % | Sobre el sendero; en el nivel completo avanza por la S con el scroll (translación del contenedor, el clip no se desplaza). |
| 6 Juani | 09-arrive-right → 10-rest | `run` (yaw 90°) → `lie_down` → `rest` | 56 %, 62 % | 24 % | Junto al fogón; el banco queda para el avatar de Juani. |
| 7 Preguntas | 08-chase-firefly | `chase_firefly` | 46 %, 60 % | 22 % | Persigue las luciérnagas cuando existan. |

Cambio respecto de la especificación original: tras invertir las islas 6 y 7, la llegada y el descanso junto a Juani ocurren en la isla 6 (crepúsculo) y la persecución de luciérnagas cierra en la 7 (noche). En `moments.js` el momento 09/10 usa luz `night` y el 08 `twilight`: hay que intercambiar esas dos luces y volver a capturar las imágenes de los momentos 08, 09 y 10 (sección 6 de la guía de integración), para que las fijas coincidan con la luz real de cada isla.

**Niveles:**

- **Completo:** un único canvas WebGL transparente y cuadrado que viaja por la página siguiendo las anclas (posición absoluta dentro de cada isla; entre islas, `position: fixed` con interpolación por scroll, como hace `journey.html` con la cámara). Se carga después de pintar el hero y solo si `data-motion-tier="full"`; mientras tanto el hero muestra la imagen fija `mayo-pose-01-hero`. Cámara, clip y preset de luz cambian por momento; la mirada al cursor solo en `sit`, `idle` y `rest`.
- **Liviano:** `<img>` del loop `mayo-pose-<id>-loop.avif` (fallback WebP) en cada ancla.
- **Estático:** `<img>` de la imagen fija `mayo-pose-<id>.avif` (fallback WebP/PNG).

En código, `MayoFigure` conserva su contrato (`pose` + clase de posición) y pasa a renderizar la `<picture>` del momento; el canvas 3D es un componente hermano que lee las mismas anclas. Las anclas viven en un archivo de contenido (`src/content/stage.ts`) junto con las posiciones de los objetos de cada isla, para que el montaje sea datos y no CSS a mano.

## 5. Three.js: la propuesta

El nivel completo necesita `three` (0.187.0, la versión con la que se validó el modelo), `GLTFLoader`, el decodificador meshopt y `RoomEnvironment`/`PMREMGenerator`. Es una dependencia nueva, así que requiere aprobación.

- **Costo:** unos 150 KB comprimidos de JavaScript más el GLB de 1,63 MB, cargados únicamente en el nivel completo, después del primer pliegue y por `next/dynamic` sin SSR. Los niveles liviano y estático no descargan nada de esto. El primer pliegue sigue sin depender de la carga (promesa y CTA en el servidor, imagen fija de Mayo).
- **Beneficio:** Mayo viva de verdad (clips reales, mirada al cursor, luz por isla), que es el núcleo de la decisión 4 de la especificación.
- **Alternativa descartada:** `<model-viewer>` o un visor genérico no permite atar clips y cámara al scroll ni el reemplazo exacto con las imágenes.
- **Riesgo residual:** rendimiento en celulares medios con 40 k triángulos y sombras; el detector de nivel (`world-motion.tsx`) ya manda a liviano a dispositivos con poca memoria o CPU, y se puede bajar el `pixelRatio` a 1,5 en móvil.

Recomendación: aprobar `three` como dependencia y portar `preview/mayo-scene.js` a un componente cliente, sin `react-three-fiber` (no hace falta otra capa).

## 6. Qué falta del lado de los assets antes de montar

1. Recorte con alpha y optimización de todo (AVIF/WebP, placas ≤ 2048 px, objetos ≤ 1024 px). Hoy son originales sobre magenta o con fondo.
2. Las sombras de contacto de las plataformas como PNG separados, más las coordenadas finales en el manifiesto (ya están para las plataformas 1 a 3 como prueba).
3. Isla 7 completa: placa de celular, cielo, primer plano, luciérnagas y farol.
4. Lote C (caída entre nubes): 10 a 12 cuadros o la decisión de mantener las nubes CSS sobre los cielos reales.
5. Opcional pero recomendado: la isla de cada placa recortada con alpha (`*-isla.png`). Permite parallax real entre cielo e isla y que el texto pueden pisar el cielo sin tocar la isla. Sin eso, el parallax es de la placa entera.
6. Sin uso: `05-mayo-provisoria.png` (las poses reales la reemplazan).

## 7. Qué falta del lado de Mayo

1. Intercambiar las luces de los momentos 08 (twilight → night) y 09/10 (night → twilight) y recapturar fijas y loops, por el cambio de orden de las islas 6 y 7.
2. Copiar `dist/mayo.glb` y `dist/poses/mayo-pose-*` al `public/` de la landing (1,6 MB más unos 2,5 MB de imágenes en AVIF/WebP; el repo de la landing no usa Git LFS, es aceptable).
3. Validar escala y cámara de los momentos 04 y 05 contra las placas finales de las islas 2 y 3 (abierto en la guía).
4. El avatar de Juani (repo `juani-3d`) comparte el preset `twilight` ahora que la isla de Juani es la 6; se monta sobre el banco 53-isla6-banco.

## 8. Orden de integración propuesto

1. Datos de montaje (`stage.ts`) con anclas y capas por isla, a partir de las tablas de este documento.
2. Placas y cielos de las islas 1 a 6 sobre la estructura actual; tokens de cielo recalibrados; verificación a 1440 y 390.
3. Isla 3 con las piezas reales y sombras; isla 2 con sus rocas; islas 4 a 6 con sus objetos.
4. Mayo en niveles liviano y estático con las imágenes reales (sin dependencia nueva).
5. Three.js aprobado → canvas cuadrado viajero, clips por momento, luz por preset, mirada al cursor.
6. Caída entre nubes con el lote C o con cielos reales; isla 7 cuando lleguen sus assets.

## 9. Decisiones que necesita Juani

1. Aprobar `three` como dependencia (sección 5).
2. Pedirle al agente de assets las islas recortadas con alpha (sección 6, punto 5) o aceptar parallax de placa entera.
3. Lote C: producir los cuadros de nubes o quedarse con las nubes CSS.
4. Autorizar al agente de Mayo a intercambiar las luces de los momentos 08 a 10 y recapturar (sección 7, punto 1).

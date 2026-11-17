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

## Cómo se verificó

Chromium a 1440×900 y 390×844 sobre `next dev`: las siete islas con sus placas y objetos, el ensamble de rocas con sombras naturales, el parallax del hero (fondo a −46 px con la isla fija a 500 px de scroll), sin scroll horizontal, sin errores de consola; lint, typecheck y build limpios.

## Pendiente

- Pares de parallax de las islas 5 (celular), 6 y 7 (el worker los está produciendo); isla 5 en escritorio e isla 4 montadas el 17 de noviembre en escritorio y celular (deriva medida de 0 a −44 px). Isla 3 montada el 17 de noviembre sobre el escenario pegajoso de las rocas con su propia timeline (`--rocks`, deriva medida de −8 a −57 px); como no tiene placa de celular, el mismo par sirve en ambos tamaños. El hero en celular queda bloqueado: tres recortes de ChatGPT y uno local (BiRefNet) fallaron en el suelo y las raíces. Isla 2 montada el 17 de noviembre: la deriva medida va de 0 a −72 px en escritorio y de 0 a −62 px en celular a lo largo de la sección, sin costura visible en las raíces.
- Lote C (cuadros de nubes) para la caída.
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

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
- **Mayo pintada por cuadros:** `mayoSprites` en `stage.ts` registra cada tira entregada (`70-mayo-<isla>-tira`, celdas de 1024, cuadros, fps y línea de patas del manifiesto). `MayoFigure` muestra la tira en una ventana cuadrada y la avanza con `steps()` en los niveles completo y liviano; el nivel reducido y la primera pintura sin JavaScript muestran el primer cuadro. Las tiras se reproducen en ping-pong (ida y vuelta, `animation-direction: alternate`) para que el último cuadro nunca corte al primero y el hervor generativo se note menos; las carreras y la persecución (trabajos, preguntas) se pintan como ciclo cerrado y usan `loop: "cycle"`. Montadas el 17 de noviembre: hero (6 cuadros, 6 fps), caída (12, 10 fps, aprobada por Juani) y sistemas (12, 10 fps); las islas sin tira siguen con las imágenes del modelo 3D.
- **Mayo integrada en cada isla (17 de noviembre, pedido de Juani):** sombra de contacto bajo la línea de patas en todas las islas con ancla (`.mayo--shadow`, elipse con degradado radial); las tiras están pintadas mirando a la izquierda y `face: "right"` en `mayoAnchors` la espeja hacia aquello con lo que interactúa (el fogón en la isla de Juani, las luciérnagas en preguntas); `travel: { from, to }` la desplaza por la placa con el scroll de la sección (timeline `--isle`, del 40 % de la entrada al 60 % de la salida): en trabajos corre de derecha a izquierda por el prado y en preguntas avanza hacia una luciérnaga que se le escapa adelante (`chasedTo` en el objeto, que suma la deriva a su flote). Anclas revisadas: hero dentro del prado, isla 2 frente a las rocas sueltas, sistemas con el hocico en el montículo, packs sobre el prado a la derecha de la tercera plataforma (antes vivía dentro de la plataforma y quedaba tapada por la tarjeta; ahora es hija de la placa, aparece al terminar el ensamble y en celular está siempre visible). Sin animaciones por scroll (niveles liviano y reducido, o navegadores sin soporte) queda en su ancla.
- **Mayo** se ancla en cada placa con `translate(-50 %, calc(-1 * var(--feet-y)))`, con la línea de patas de la tira (80 % para las imágenes del modelo) y un cuadrado proporcional al ancho de la placa; en escritorio se la corre a los bordes de la isla donde el panel de contenido ocupa el centro.
- **`?diag`:** sobreimpreso con las señales del nivel de rendimiento para pruebas en dispositivos reales.

## Cómo se verificó

Chromium a 1440×900 y 390×844 sobre `next dev`: las siete islas con sus placas y objetos, el ensamble de rocas con sombras naturales, el parallax del hero (fondo a −46 px con la isla fija a 500 px de scroll), sin scroll horizontal, sin errores de consola; lint, typecheck y build limpios.

## Pendiente

- Pares de parallax de las islas 3 a 7 y del hero en celular (el worker los está produciendo). Isla 2 montada el 17 de noviembre: la deriva medida va de 0 a −72 px en escritorio y de 0 a −62 px en celular a lo largo de la sección, sin costura visible en las raíces.
- Lote C (cuadros de nubes) para la caída.
- ~~WebP con pérdida para el respaldo de los AVIF.~~ Entregados y versionados el 17 de noviembre (90 archivos, calidad 82, 5,8 MB en total).
- Afinar anclas de Mayo con Juani sobre las placas definitivas.

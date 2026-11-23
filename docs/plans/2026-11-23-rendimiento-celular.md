# Rendimiento en el celular y carga completa (23 de noviembre de 2026)

Pedido de Juani: "desplega un agente especializado que busque mejorar el puntaje de rendimiento en el celular y la carga completa".

Rama `juanikitro/landing-rendimiento-celular`, desde `juanikitro/landing-redesign` (`00a2858`), con `landing-redesign` (`89f798a`, que incluye `c1cca9d`: packs redefinidos y navegación nueva) mergeado antes de la medición final.

## Resumen

- **En un celular real con 4G y CPU lenta, la página termina de cargar en 5,8 s en vez de 14,8 s**, y las nubes de la caída (lo primero que se ve al bajar) están listas a los 5,8 s en vez de 14,7 s.
- **Baja menos:** 2,72 MB y 47 pedidos en vez de 3,19 MB y 60.
- **Lighthouse en celular pasa de 74 a 83; en escritorio, de 93 a 97.** No llega a 90: lo que queda es el costo de dibujar la página por primera vez y el JavaScript de Next/React (ver "Lo que queda").
- **Nada visible cambia.** 60 capturas de toda la página (1440 × 900 y 390 × 844) son iguales a las de antes; Mayo, las rocas y las escenas se mueven igual.

## Números

### Cómo se midió

- Base: `landing-redesign` en `89f798a`. Final: esta rama (`500d562` + el merge). Las dos con `next build` y el servidor de producción (`output: standalone`), una al lado de la otra en la misma máquina.
- **Lighthouse 13**, 5 corridas por caso, mediana. Celular es el perfil por defecto (Moto G Power simulado, 4G lento, CPU 4x); escritorio es `--preset=desktop`.
- **Celular real con throttling:** Playwright + Chrome, 390 × 844 a 3x, red de 1,6 Mbps y 150 ms, CPU 4x, sin caché. Base y final intercaladas (6 corridas cada una, mediana) para que la carga de la máquina afecte a las dos por igual: otras sesiones compilaban al mismo tiempo.
- "Carga completa" es el evento `load`. Como ahora parte del arte espera a que el lector se acerque, también se mide cuándo llegó el arte de la caída y cuándo llegó el último byte (incluida la precarga de las islas 2 y 3 después de la carga).

### Lighthouse (mediana de 5)

| | Rendimiento | FCP | LCP | TBT | Speed Index | Peso |
|---|---|---|---|---|---|---|
| Celular, base | 74 | 1,51 s | 10,21 s* | 50 ms | 2,76 s | 3.831 KB |
| Celular, final | **83** | **1,32 s** | **4,56 s*** | 131 ms | **2,01 s** | **3.021 KB** |
| Escritorio, base | 93 | 0,37 s | 1,75 s | 0 ms | 0,72 s | 3.841 KB |
| Escritorio, final | **97** | **0,31 s** | **1,33 s** | 0 ms | **0,61 s** | **3.710 KB** |

CLS 0 en todos los casos.

\* El LCP de celular de Lighthouse es **simulado**: suma lo que se bajó antes de que se pinte el héroe en una corrida sin throttling y lo recalcula a 1,6 Mbps. Por eso pesa tanto lo que se pide al principio aunque esté lejos de la pantalla. El LCP que ve un celular real está en la tabla de abajo.

El TBT de Lighthouse sube de 50 a 131 ms porque, una vez cargada la página, aparecen las rocas de la isla 3 (antes estaban desde el principio, en medio de la carga). Sigue dentro de lo que Lighthouse considera bueno (menos de 200 ms).

### Celular real con throttling (mediana de 6, intercaladas)

| | FCP | LCP | Carga completa (`load`) | Nubes de la caída listas | Último byte | Bajado | Pedidos |
|---|---|---|---|---|---|---|---|
| Base | 2,57 s | 2,73 s | 14,8 s | 14,7 s | 15,4 s | 3.194 KB | 60 |
| Final | **2,34 s** | **2,46 s** | **5,8 s** | **5,8 s** | 16,8 s | **2.724 KB** | **47** |

- El último byte llega un poco más tarde (16,8 s contra 15,4 s) porque las islas 2 y 3 se precargan **después** de la página, una por vez, en vez de competir con el héroe. Es a propósito: lo que se ve primero llega antes.
- Con "Ahorro de datos" activado en el teléfono no se precarga nada: cada isla baja cuando el lector se acerca.

### Palanca por palanca (Lighthouse, mediana de 5, sobre `00a2858`)

| Estado | Celular | Escritorio | `load` real |
|---|---|---|---|
| Base (`00a2858`) | 73 | 93 | 15,0 s |
| + palancas 1 a 3 | 77 | 94 | 7,3 s |
| + palancas 4 a 7 | 80 | 95 | 6,9 s |
| + palanca 8 | 83 | 98 | 3,0 s† |
| Final, con el merge y las palancas 9 y 10 | 83 | 97 | 5,8 s |

† En ese paso el arte de la caída arrancaba después del evento `load`, así que ese número era engañoso: las nubes llegaban a los 12,9 s. La palanca 10 lo corrige (ver abajo).

## Qué cambió (una palanca por commit)

| # | Commit | Palanca | Efecto medido |
|---|---|---|---|
| 1 | `daf3865` | **El héroe ya no baja su isla de escritorio en el celular.** El celular la oculta, pero la imagen igual se pedía con prioridad alta (99 KB, al lado de la imagen principal). Ahora, en pantallas de hasta 48rem, esa capa apunta a un píxel transparente. | −99 KB al entrar, con prioridad alta |
| 2 | `d861560` | **Las 12 rocas de la isla 3 bajan cuando el lector se acerca** (o cuando la página terminó de cargar). Antes se pedían todas al entrar (~1,15 MB) porque su máscara CSS usa el mismo archivo, y las tiras de pasto pedían la placa de la isla (141 KB) como fondo. | −1,3 MB al entrar |
| 3 | `56b5851`, `7d4db8c` | **Tiras de Mayo para celular.** El celular mostraba a Mayo a 56–101 px y bajaba celdas de 640 px. Ahora hay una copia por tira con celdas de 224, 256 o 320 px (siempre al menos 3 veces lo que se ve en un celular de 390 px), recortadas cuadro por cuadro de los originales pintados, AVIF calidad 85 como las originales. Se usan hasta 480 px de ancho: tablets y escritorio siguen con las de 640. La tira de la caída no tiene copia: en el celular Mayo se ve a ~600 px. | 25–38 % del peso de cada tira; la del héroe pasa de 321 a 82 KB |
| 4 | `1c2ce95` | **El flotar de las rocas se pausa fuera de pantalla.** Las 22 rocas tienen 5 animaciones infinitas cada una sobre propiedades CSS registradas, que el navegador recalcula en el hilo principal en cada cuadro, aunque la isla esté lejos. | Junto con las palancas 5 a 7, el bloqueo del hilo principal en el celular real bajó de ~1,0 s a ~0,6 s; de esas cuatro, esta es la que actúa sobre el hilo principal |
| 5 | `e272f8b` | **La mariposa de la isla 2 baja cuando el lector se acerca.** Es una tira de fondo CSS (147 KB) que se pedía con el héroe; su aleteo también se pausa fuera de pantalla. | −147 KB al entrar |
| 6 | `5764319` | **Favicon de 66 a 7 KB.** El ícono de 512 px tenía 4.422 colores por el suavizado; con una paleta de 256 colores la diferencia promedio es menor a 0,3/255 y se ve igual (comparado a ojo). Se pedía con prioridad alta en cada primera visita. | −59 KB |
| 7 | `2615547` | **Fraunces fijada en peso 400, como fuente local (146 → 71 KB).** Toda la serif del sitio es Fraunces itálica 400 (comprobado en las tres páginas y los dos tamaños), pero el archivo de Google traía todo el eje de pesos (100–900). `scripts/subset-fraunces.py` fija el peso con fontTools y deja enteros el tamaño óptico y SOFT, así que los títulos (`opsz` 120, `SOFT` 60) y los números (tamaño óptico automático) dibujan los mismos glifos. La fuente de reemplazo mientras carga mantiene las medidas que generaba `next/font/google`. | −75 KB precargados en cada página |
| 8 | `15308c7` | **El arte de la caída y de la isla 2 sigue al héroe en vez de competir con él.** Esas imágenes estaban dentro de la distancia de carga diferida del navegador y se pedían antes del primer dibujo. Ahora esperan a que se pinte el héroe. Todas están posicionadas en cajas cuyo tamaño no depende de ellas: nada se mueve al aparecer. | Lighthouse celular 80 → 83 |
| 9 | merge | `landing-redesign` (`89f798a`): conflicto solo al final de `world.css` (el bloque de la navegación nueva y el de carga, uno después del otro). | — |
| 10 | `500d562` | **Las nubes arrancan con el primer dibujo y las islas se precargan en orden.** Con la palanca 8, la caída esperaba a que React hidratara y, además, la precarga de la isla 3 competía con ella: en el celular real las nubes llegaban a los 12,9 s. Ahora un script en línea marca la caída apenas se pinta la página, y después de la carga las islas se abren de a una, en orden, cada una cuando llegó lo que ya había empezado a bajar la anterior. | Nubes listas a los 5,8 s (base: 14,7 s) |

### Cómo funciona `NearGate`

`src/components/world/near-gate.tsx`, usado en la caída, la isla 2 y la isla 3. Marca su sección con dos atributos que lee el bloque "Loading" al final de `world.css`:

- `data-near`: cuando el lector está a `ahead` pantallas (2 por defecto, 1 en la isla 2), o cuando le toca en la precarga posterior a la carga. Antes de eso, el CSS oculta (`display: none`) el arte pesado de la sección; una imagen `loading="lazy"` oculta no se pide, y tampoco una máscara ni un fondo CSS.
- `data-onscreen`: mientras la sección está en pantalla. Sin él, las animaciones infinitas que corren en el hilo principal se pausan.
- `early` (solo la caída): el mismo observador como script en línea, que corre mientras se lee el HTML en vez de después de hidratar. La sección lleva `suppressHydrationWarning` porque el atributo ya está cuando React hidrata.
- Precarga: después del `load` y de un momento libre (`src/lib/after-load.ts`, el mismo mecanismo que ya usaba Google Analytics), abre las secciones en orden de página, esperando las imágenes que el navegador ya empezó a bajar de la anterior (con un tope de 10 s por sección). No precarga con "Ahorro de datos".
- Todo el bloque CSS está dentro de `@media (scripting: enabled)`: sin JavaScript todo baja con la página y se mueve siempre, como antes (comprobado).

## Herramientas instaladas

- **fontTools 4.68.0 y brotli**, con `python -m pip install --user fonttools brotli`, en `C:\Users\Juanito\AppData\Roaming\Python\Python314\site-packages` (nivel usuario, no son dependencias del proyecto). Autorizado por Juani ("autorizo") vía el coordinador. Se usan solo para regenerar la fuente: instrucciones al principio de `scripts/subset-fraunces.py`.
- Las tiras de celular se generaron con Pillow (ya instalado), desde los PNG originales pintados de `mayo-islas-ilustradas` y `mayo-islas-ilustradas-b`; se comprobó que son el mismo dibujo que las AVIF publicadas (diferencia media 0,1–0,25 %) antes de usarlos.

## Descartado y por qué

- **Recortar Fraunces a menos glifos** (solo latín básico + latín-1): ahorra 3–5 KB y una palabra con otra letra caería en la fuente de reemplazo.
- **Limitar los rangos de tamaño óptico y SOFT** de Fraunces: ahorra 3 KB y cualquier valor fuera del rango se vería distinto.
- **Que la precarga baje todas las imágenes de las islas 2 y 3**: la probé; agregaba 1,5 MB para quien no baja hasta ahí (4,3 MB en total contra 2,7).
- **Abrir la caída recién al hidratar React** (versión intermedia de la palanca 8): retrasaba las nubes a 8,5–12,9 s en el celular real. Reemplazado por el script en línea.
- **Copia para celular de la tira de la caída**: en el celular Mayo cae a ~600 px; achicarla se notaría.

## Verificación

Sobre el build final (`next build`, servidor de producción):

- `npm run typecheck`, `npm run lint` y `next build`: sin errores.
- **Capturas de toda la página** cada 3/4 de pantalla, en 1440 × 900 y 390 × 844, base contra final, con las animaciones por tiempo congeladas: 60 de 60 sin diferencias. En una pasada intermedia apareció un corrimiento de ~4 px en la isla 4, pero aparece también comparando la base contra sí misma (el controlador del taller), así que no es de estos cambios.
- **Tiras:** el celular (390) usa las copias `-cel`; tablet (768) y escritorio (1440) usan las de 640.
- **Rocas:** al llegar a la isla 3 están las 12 visibles y cargadas, recorriendo la página y también saltando directo a la isla después de la carga.
- **Movimiento reducido:** ninguna animación por tiempo corriendo, rocas cargadas en la isla 3.
- **Teclado:** el primer Tab va a "Saltar al contenido".
- **Sin JavaScript:** las 12 rocas y las imágenes de la caída se muestran.
- **Consola y red:** 0 errores y ningún 404 en las dos medidas de pantalla.
- **No se pudo probar:** un teléfono físico y producción (Railway sirve HTTP/2 detrás de su borde; local es HTTP/1.1). Los números son de laboratorio, no de usuarios reales.

## Lo que queda (por impacto)

| # | Qué | Por qué importa | Dueño |
|---|---|---|---|
| 1 | **Costo del primer dibujo.** Con CPU 4x, el primer layout tarda ~450 ms (1.270 nodos, `world.css` con unidades de contenedor). Es lo que más sostiene el LCP simulado (~4,5 s) y el FCP. Probar `content-visibility: auto` en las islas 4 a 7 (no en las que tienen tramos fijos con `sticky`). Riesgo: la altura estimada de las islas sin dibujar mueve los saltos del menú y del botón "Ver packs", y el scroll guiado calcula posiciones. | Alto: es lo que separa 83 de 90+ | Scroll |
| 2 | **Payload de React en el HTML.** El HTML pesa 385 KB (75 KB comprimido); más de la mitad es el payload RSC, que repite los 27 KB de keyframes de Mayo que ya están en un `<style>` y ~47 KB de estilos en línea (rocas, pasto). | Medio | — |
| 3 | **Fraunces solo en la home.** Se precarga en todas las páginas (está en el layout raíz) pero solo la home la usa. Moverla al contenedor `.world` de la home ahorra 71 KB en los casos y en privacidad. | Bajo (la home no cambia) | — |
| 4 | **Flotar de las rocas en el compositor.** Ahora se pausa fuera de pantalla, pero en pantalla son 110 animaciones de propiedades registradas recalculadas en el hilo principal. Pasarlas a `transform` las llevaría al compositor. | Medio en celulares lentos, en la isla 3 | Isla 3 |
| 5 | **CSP (backlog 7 del SEO):** si se agrega, el script en línea de la caída necesita su hash o nonce. | — | — |
| 6 | **Limpieza** (backlog 9 del SEO): `hero-umbral-*.png` y `@next/third-parties` siguen sin uso. | Bajo | Limpieza |

# Microinteracciones de la landing (mundo de Mayo)

**Fecha:** 19 de noviembre de 2026.
**Rama:** `juanikitro/landing-microinteracciones` (desde `juanikitro/landing-redesign`, `7e7ab59`).
**Pedido de Juani:** "Lanza otro que utilice https://github.com/voltagent/awesome-design-md, /design-taste-frontend y https://bencho.dev/ para añadir microanimaciones y microinteracciones que hagan sentir a la pagina mas premium".
**Alcance:** botones, enlaces, navegación en píldora, riel de huellas, tarjetas de packs y trabajos, detalles desplegables, preguntas frecuentes, formulario de contacto, botón flotante de WhatsApp, carga de Cal.com, entrada del texto y enlace "Saltar al contenido". Fuera de alcance (otros agentes): arte de las islas, placas, cielos, parallax, alturas de secciones, Mayo y las rocas de la isla 3.

## Fuentes y qué se tomó de cada una

No se copió código ni recursos de marca: se reprodujo la sensación con los tokens de `src/app/world.css`.

### bencho.dev (estudiado en vivo con Playwright)

Se leyeron las reglas CSS computadas y se midió cada estado con el puntero real.

| Elemento de bencho | Lo medido | Qué se tomó |
| --- | --- | --- |
| Enlaces del nav (`bench-navlink`) | color 160 ms; al presionar `scale: 0.985` | Hover de color en 160 ms y una presión que achica el elemento. |
| Botón principal (`bench-join`, `hero-join`) | hover `scale 0.98`, presión `scale 0.95–0.96`; `scale 200ms cubic-bezier(0.28, 1.4, 0.36, 1)` | La presión como escala (0,97 acá). **No** se tomó la curva con rebote: el skill prohíbe curvas que pasan de su destino. |
| Botones redondos (`bench-round`) | una burbuja `::before` que pasa de `scale 0.86` y opacidad 0 a 1 en 150/260 ms; el ícono `1.04` en hover y `0.96` al presionar en 90 ms | La burbuja que crece detrás de cada huella del riel y la presión de 90 ms. |
| Tooltip (`bench-tip`) | aparece tras 420 ms de intención; opacidad 120 ms y 4 px de desplazamiento | La etiqueta de cada huella: 350 ms de espera con el mouse, inmediata con el teclado. |
| Pestañas (`bench-chip`) | color y borde inferior de 2 px, 160 ms | La barra fija de 2 px bajo el enlace de la isla visible. |
| Tarjetas (`bench-card`) | velo y acciones que entran con opacidad y 4 px | El contenido de los desplegables, que se asienta 4 px al abrirse. |
| Entradas (`hero-rise`, `block-in`) | 620 ms, `cubic-bezier(0.22, 1, 0.36, 1)`, 10 px; 420 ms, 6 px | La entrada del hero: la misma curva, 12 px, al cargar y una sola vez. |
| Foco | anillo doble (2 px de fondo + 2 px de tinta al 35 %), sin animación | El anillo nunca se anima y sigue la forma del control. |
| Movimiento reducido | todas las duraciones a 1 ms, animaciones en `none` | Mismo criterio: duraciones a 0 y sin transformaciones. |

### awesome-design-md (VoltAgent)

Se revisaron Airbnb, Cal.com, Framer, Notion, Clay, Stripe y Mercury. Estos archivos documentan poco el hover (tienen una política de "no documentar hover"), así que se tomaron reglas puntuales de cuatro:

- **Airbnb** (`design-md/airbnb/DESIGN.md`): un solo nivel de elevación para las tarjetas que flotan en hover; la presión cambia el tono sin animar sombras. → Las tarjetas de packs y trabajos suben con una sola sombra más profunda (`--m-shadow-card`) y los botones presionados toman un tono más oscuro.
- **Cal.com** (`design-md/cal/DESIGN.md`): la tarjeta destacada se marca sin escala ni brillo; el primario sólo se oscurece al presionar. → La tarjeta destacada no se agranda; ninguna tarjeta escala. (Se probó su "pill-in-pill" para el enlace activo, pero el checker lo cuenta como un tercer estilo de botón y el skill pide una barra fija: quedó la barra.)
- **Framer** (`design-md/framer/DESIGN.md`): la presión es una escala que achica, no un relleno más oscuro; el foco es un anillo suave teñido con el acento. → Presión `scale(0.97)` y el halo de 3 px de menta en los campos.
- **Notion** (`design-md/notion/DESIGN.md`): transiciones de 150 a 200 ms con ease. → Hover en 160 ms.

### design-taste-frontend (skill)

`references/motion.md` fija los números base: hover 150 ms de entrada y 120 ms de salida, presión 90 ms, tarjeta que sube 2 px, flecha que se corre 3 px, subrayado que se dibuja de izquierda a derecha y se va hacia la derecha, foco sin transición, sólo `transform` y `opacity`, nada de rebote, hover sólo con puntero fino. También su checker y su *finish gate* (ver Verificación).

## Sistema de movimiento

Todo vive en una sección nueva al final de `src/app/world.css` ("Micro-interactions"), para no chocar con los agentes que trabajan en paralelo.

### Tokens (en `.world`)

| Token | Valor | Uso |
| --- | --- | --- |
| `--m-fast` | 120 ms | Salida de un hover, cierre de una etiqueta. |
| `--m-base` | 160 ms | Entrada de un hover, color, subrayado. |
| `--m-press` | 90 ms | Puntero presionado. |
| `--m-panel` | 220 ms | Un desplegable o un mensaje que llega. |
| `--m-reveal` | 520 ms | Texto que entra (cuerpo y botones del hero). |
| `--m-enter` | 700 ms | Líneas del título del hero. |
| `--ease-ui` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Cambios de estado. |
| `--ease-enter` | `cubic-bezier(0.22, 1, 0.36, 1)` | Algo que llega y se asienta. |
| `--ease-travel` | `cubic-bezier(0.65, 0, 0.35, 1)` | Reservado para un recorrido (hoy sin uso). |
| `--m-lift` / `--m-step` | −2 px / −1 px | Tarjeta / botón bajo el puntero. |
| `--m-press-scale` | 0,97 | Presión. |
| `--m-nudge` | 3 px | Flecha. |
| `--m-rise` | 12 px | Texto que entra desde abajo. |

### Reglas

1. Sólo se mueven `transform` y `opacity`; colores, bordes y sombras pueden cambiar. Nada anima ancho, alto, márgenes ni posición (el desplegable sigue usando la transición de `grid-template-rows` que ya existía en `AnimatedDetails`).
2. La salida siempre es más rápida que la entrada: la interfaz nunca queda detrás del puntero. Todo es interrumpible (transiciones CSS, no secuencias).
3. Ninguna curva rebota ni se pasa de su destino.
4. El hover que mueve algo sólo corre con `(hover: hover) and (pointer: fine)`; el teclado muestra el mismo estado con `:focus-visible`. En pantallas táctiles sólo queda la presión.
5. Con `prefers-reduced-motion: reduce` o `html[data-motion-tier="reduced"]` todos los tokens de duración pasan a 0 y no se aplica ninguna transformación: los estados cambian al instante.
6. El texto nunca queda oculto sin CSS de movimiento: sin JavaScript, sin soporte de `animation-timeline` o con movimiento reducido, todo está visible.

## Microinteracciones por componente

| Componente | Comportamiento | Archivos |
| --- | --- | --- |
| Botones (`.btn`) | Hover: el tono se profundiza, sube 1 px y aparece una sombra suave; presión: vuelve abajo y se achica a 0,97 en 90 ms (en táctil también). Con movimiento reducido, la presión es sólo un tono más oscuro. | `world.css` |
| Enlaces de texto | La etiqueta (`.link-label`) descansa sobre una línea del 40 %; con hover o foco se dibuja la línea completa desde la izquierda y se va hacia la derecha. La flecha (`.link-arrow`) se corre 3 px (`↗` 2 px en diagonal). Aplica a casos, LinkedIn, WhatsApp, Cal.com, footer, privacidad, "Ver todo lo que incluye". | `page.tsx`, `islands.tsx`, `cal-booking.tsx`, `world-footer.tsx`, `contact-form.tsx`, `pack-details.tsx` |
| "Saltar al contenido" | Baja desde arriba en 220 ms al recibir foco. | `world.css` |
| Navegación en píldora | Sobre el hero la píldora está plana; tras 160 px de scroll aparece su sombra (opacidad de un `::before` atada al scroll, sólo compositor). El enlace de la isla visible (Packs, Trabajos o Preguntas) lleva `aria-current="location"`, color musgo y una barra fija de 2 px. Presión de 0,97. | `island-nav.tsx` (ahora cliente), `use-active-island.ts` (nuevo), `world.css` |
| Riel de huellas | Hover: crece una burbuja suave detrás de la huella; la isla visible queda sellada en musgo y su huella "se estampa" (de 0,6 a 1 en 320 ms). Una etiqueta con el nombre de la isla aparece tras 350 ms de hover, o al instante con Tab (arriba de la huella en celular). Se quitó el `title` para no duplicar el tooltip nativo. | `island-progress.tsx`, `world.css` |
| WhatsApp flotante (celular) | Llega al pasar el hero: sube 8 px y pasa de 0,92 a 1 en 320 ms; presión 0,94. Mientras está oculto ya no recibe toques (antes un toque en la zona invisible abría WhatsApp). | `world.css` |
| Tarjetas de packs y de trabajos | Con puntero fino suben 2 px y su sombra se profundiza (180 ms de entrada, 120 ms de salida). Sin escala, sin inclinación. | `world.css` |
| Detalles desplegables y FAQ | El "+" son dos barras: la vertical gira 90° y se acuesta sobre la otra, así el "+" se vuelve "−" al abrir y vuelve al cerrar (sigue el `data-collapsing` de `AnimatedDetails`). El contenido se asienta 4 px mientras aparece. En las FAQ, la fila se aclara en hover y queda aclarada mientras está abierta. | `pack-details.tsx`, `islands.tsx`, `world.css` |
| Campos del formulario | Al enfocar: borde menta con un halo de 3 px (sin animación, como todo anillo de foco) y la etiqueta se enciende en menta. Un campo inválido enfocado usa el coral. | `world.css` |
| Envío del formulario | "Enviando…" muestra un aro de 14 px que gira dentro del botón y el formulario queda `aria-busy`. Cada mensaje nuevo llega 4 px desde abajo; el de éxito dibuja un tilde y el de error muestra un signo de exclamación. El texto de reposo no se anima. La región `aria-live` se mantiene: sólo cambia su contenido. | `contact-form.tsx`, `world.css` |
| Cal.com (carga) | Hasta que Cal.com avisa `linkReady` (o `linkFailed`, o pasan 15 s) un esqueleto quieto del mes ocupa el lugar con una respiración lenta de opacidad (1,6 s); después se desvanece en 220 ms. El contenedor queda `aria-busy` mientras carga. El enlace de respaldo pasó a 44 px de alto. | `cal-booking.tsx`, `world.css` |
| Entrada del hero | Al cargar, una vez: el descriptor con la primera línea del título, la segunda 80 ms después (700 ms, 12 px), y luego cuerpo, botones y enlace de WhatsApp (520 ms, 60 ms entre sí). Todo termina en ~1 s y los enlaces reciben clics desde el primer cuadro. | `world.css` |
| Entrada del texto de cada isla | El eyebrow, el título, la bajada y el cuerpo de las islas 2, 4, 5, 6 y 7 se asientan 12 px mientras entran por el borde inferior, atados al scroll (`animation-timeline: view()`, rango `entry 0% entry 100%`): terminan apenas cada línea está entera en pantalla, así nunca se lee texto a medio aparecer. La isla 3 queda fuera (es del especialista de rocas). | `world.css` |
| Anillos de foco | Siguen la forma del control: círculo en las huellas, píldora en botones, enlaces del nav y WhatsApp (antes todos tomaban la esquina genérica de 0,25 rem). | `world.css` |
| Footer | Los enlaces pasaron a 44 px de alto (antes 25 px) con el subrayado dibujado. | `world-footer.tsx`, `world.css` |

## Accesibilidad

- Movimiento reducido (media query y `data-motion-tier="reduced"`): verificado con Playwright: sin animación de entrada en el hero, títulos de isla visibles al instante, botones sin transformación y transiciones en 0 s, sombra del nav fija, sin "estampado" de huella, desplegables instantáneos.
- Teclado: el primer Tab llega a "Saltar al contenido", que baja visible; el orden sigue por el nav, el riel de huellas (cada una muestra su etiqueta), las tarjetas y el formulario. Todos los anillos se ven y siguen la forma del control.
- Táctil: ningún estado depende del hover; la presión funciona con el dedo y las etiquetas del riel aparecen con el teclado.
- Nada demora el contenido ni la entrada: la entrada del hero dura ~1 s y no bloquea clics; el esqueleto de Cal.com no tapa el enlace de respaldo.
- El estado actual del nav y del riel se anuncia con `aria-current="location"`.

## Grabaciones (secuencias de cuadros)

Carpeta `docs/plans/microinteracciones/` (JPEG, 1440 × 900 salvo el 10, a 390 × 844). Los tiempos son aproximados: la captura en Chromium tarda unas decenas de ms.

| Interacción | Cuadros |
| --- | --- |
| Entrada del hero | `01-hero-entrada-60ms.jpg`, `01-hero-entrada-300ms.jpg`, `01-hero-entrada-600ms.jpg`, `01-hero-entrada-1100ms.jpg` |
| Botón: reposo, hover y presión | `02-boton-reposo.jpg`, `02-boton-hover.jpg`, `02-boton-press.jpg` |
| Subrayado que se dibuja | `03-enlace-0ms.jpg`, `03-enlace-50ms.jpg`, `03-enlace-300ms.jpg` |
| Nav plano y nav con sombra y enlace activo | `04-nav-arriba.jpg`, `04-nav-scroll-trabajos.jpg` |
| Etiqueta de la huella | `05-huellas-hover-150ms.jpg`, `05-huellas-hover-650ms.jpg` |
| Tarjeta que sube | `06-tarjeta-reposo.jpg`, `06-tarjeta-hover.jpg` |
| "+" que se vuelve "−" | `07-detalle-cerrado.jpg`, `07-detalle-90ms.jpg`, `07-detalle-abierto.jpg` |
| Campo enfocado, enviando y enviado | `08-campo-foco.jpg`, `08-enviando.jpg`, `08-enviado.jpg` |
| Agenda cargando y lista | `09-agenda-cargando.jpg`, `09-agenda-lista.jpg` |
| WhatsApp que llega (celular) | `10-whatsapp-80ms.jpg`, `10-whatsapp-580ms.jpg` |

## Verificación

- `npm run lint`, `npm run typecheck` y `npm run build`: sin errores. No hay test runner en el repositorio.
- Playwright contra `next dev` en el puerto 3013, a 1440 × 900 y 390 × 844 (`waitUntil: "load"`, `scrollTo({ behavior: "instant" })`): estados medidos con `getComputedStyle` (botón `translateY(-1px)` en hover; subrayado de 0 % a 100 %; sombra del nav de opacidad 0 a 1; `aria-current` en el enlace y la huella de Trabajos; "+" girado a 180° al abrir; formulario `aria-busy` y luego mensaje de éxito; Cal.com de `aria-busy="true"` a listo en ~4,4 s con el script demorado 3 s). Sin scroll horizontal a 390. Sin errores de consola (el único error visto fue el 500 que simulé a propósito para probar el mensaje de error).
- El envío del formulario se probó con `/api/contact` interceptado: no se envió ninguna consulta real.
- Finish gate del skill (`gate.mjs`, kind `service`, 3 rondas): 92 → 87 → **`GATE: OPEN 84 (rounds used up)`**. Para separar lo propio de lo previo se corrió el checker también sobre `7e7ab59`. Lo que este trabajo agregó y se corrigió: tercer estilo de botón (el enlace activo como píldora, ahora barra), animación del mensaje de reposo del formulario leída como revelado al hacer scroll, enlace de Cal.com y del footer por debajo de 44 px. Waivers en `.taste-skill/waivers.json` (no versionado): tres `contrast` sobre `.link-label` (el checker lee como "efecto" la línea de 1 px dibujada con `background-image`; el texto está sobre la tarjeta sólida) y el `text-contrast` de `#contacto-title em` (lee el beige de la página detrás de la isla nocturna, igual que en la revisión del 17).
- FAIL abiertos: casi todos son decisiones de concepto previas (scroll atado al arte, secciones de más de dos pantallas, nav en píldora, placas que exceden su panel, copy aprobado). El único propio es `scroll-linked` en los títulos y cuerpos de las islas: es la entrada del texto que pidió el brief. El skill prohíbe el texto que aparece al hacer scroll; acá se aplicó con la restricción más fuerte posible (sólo mientras la línea cruza el borde inferior). Si se prefiere seguir al skill al pie de la letra, basta con borrar el bloque "Island copy" de `world.css`.
- El `text-contrast` del cuerpo de `#contacto` sigue abierto: es el mismo falso positivo del beige detrás de la escena nocturna (no quedaban waivers).

## Límites y pendientes

- No se probó en un teléfono real ni en Safari/Firefox. Sin `animation-timeline` (Firefox estable, Safari < 26) la sombra del nav queda siempre visible y el texto de las islas aparece sin entrada: el contenido no depende de eso.
- Los eventos `linkReady`/`linkFailed` de Cal.com se registran por la cola del cargador oficial; si Cal.com los dejara de emitir, el esqueleto se va solo a los 15 s.
- La rama toca `world.css`, `islands.tsx` e `island-progress.tsx`, que otros agentes también editan; todo lo nuevo de CSS está al final del archivo para que el merge sea simple.

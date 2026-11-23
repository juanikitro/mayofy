# SEO y rendimiento de la landing

Pedido de Juani, 22 de noviembre de 2026: "despliega una sesion especializada en SEO y rendimiento, que utilize /seo-audit /programmatic-seo /design-taste-frontend /performance /audit-website y /grilling para dejar el esos dos temas lo mejor posible".

Rama `juanikitro/landing-seo-rendimiento`, desde `juanikitro/landing-redesign` (con `b82fe3e` ya mezclado). Producción estaba en `b1d4042`.

## Resumen

- **Google ya entiende qué es Mayofy.** La home lleva datos estructurados: la organización (con Juani como fundador y la zona que atiende), los tres packs con su precio "desde" y las preguntas frecuentes. Cada caso lleva su "miga de pan" (Inicio › Trabajos › caso).
- **El sitemap ahora tiene los 3 casos reales.** Antes solo tenía la home y la privacidad. Los casos de relleno ("Nombre del proyecto 04") ya no se publican: dan 404 en producción.
- **Compartir por WhatsApp ahora muestra una tarjeta.** La imagen de antes era un PNG de 2,4 MB y WhatsApp descarta las imágenes pesadas. Ahora hay una tarjeta de 1200 × 630 de ~80 KB para la home y una por caso, con las capturas reales. Antes, al compartir un caso salía el título de la home.
- **Título y descripción apuntan a lo que Juani quiere ganar** ("páginas web con turnos online", "sistemas a medida", "diseño de páginas web para negocios de servicios"), sin tocar el texto visible.
- **El celular carga más liviano.** Las capturas de trabajos ya no se bajan al entrar, Google Analytics carga cuando la página terminó, y las imágenes quedan una semana en el navegador (antes se revalidaban las ~150 en cada visita).
- **Lo que más pesa sigue abierto** y es de otras áreas: las 12 rocas de la isla 3 que se bajan al entrar, las tiras de Mayo en tamaño de escritorio en el celular y el costo de dibujar la página entera de una vez. Está en el backlog con su dueño.

## Números antes y después

### Cómo se midió

- **Lighthouse 13** con Chrome local, 3 corridas por caso, mediana. "Celular" es el perfil por defecto (Moto G Power simulado, 4G lento, CPU 4x); "escritorio" es `--preset=desktop`.
- **Medición real con throttling** (Playwright + Chrome, red 4G lenta de 1,6 Mbps y 150 ms, CPU 4x, 390 × 844): mide el LCP que ve el navegador, no el simulado. Hace falta porque el LCP simulado de Lighthouse en celular salta mucho en esta página (de 10 a 25 s entre corridas iguales).
- **Base vs. rama:** la misma máquina, servidores de producción locales (`next build && next start`) uno al lado del otro: la base es `landing-redesign` sin mis commits y la rama es esta. Otras sesiones compilaban en la misma máquina, así que las diferencias chicas son ruido.
- **squirrelscan** 0.0.189 (`squirrel audit --offline --level quick`).

### Producción hoy (`b1d4042`, mayofy.dev)

| | Rendimiento | SEO | Accesibilidad | Buenas prácticas | FCP | LCP | TBT | CLS | Peso |
|---|---|---|---|---|---|---|---|---|---|
| Celular | 58 | 100 | 100 | 100 | 3,6 s | 10,6 s | 251 ms | 0 | 6,2 MB, 160 pedidos |
| Escritorio | 80 | 100 | 100 | 100 | 1,2 s | 2,3 s | 0 ms | 0 | 6,2 MB |

squirrelscan sobre producción: **77/100** (95 antes del ajuste por densidad de problemas). SEO 97, rendimiento 91, seguridad 89. Solo encontró 2 páginas: los casos no estaban en el sitemap.

### Base vs. rama (local)

Base: `landing-redesign` en `b82fe3e`, que ya trae Cal.com diferido (ronda 2 de contacto). Rama: esta, con GA cargando después de la página.

**Lighthouse (mediana de 3):**

| | Rendimiento | FCP | LCP | TBT | Speed Index | Peso |
|---|---|---|---|---|---|---|
| Celular, base | 66 | 3,0 s | 10,2 s* | 89 ms | 4,3 s | 4,4 MB |
| Celular, rama | **73** | **1,5 s** | 10,3 s* | 48 ms | **3,4 s** | **3,9 MB** |
| Escritorio, base | 91 | 0,83 s | 1,77 s | 0 ms | 1,13 s | 4,4 MB |
| Escritorio, rama | **93** | **0,37 s** | 1,77 s | 0 ms | **0,86 s** | **3,9 MB** |

SEO, accesibilidad y buenas prácticas quedan iguales (100 / 96-100 / 100). El 96 de accesibilidad en escritorio también está en la base (lo marca la agenda de Cal.com, ver backlog). CLS 0 en todos los casos.

\* El LCP simulado de celular no sirve para comparar en esta página: entre corridas iguales va de 10 a 25 s. Para eso está la medición real de abajo.

**Medición real con throttling (celular 390 × 844, 4G lento, CPU 4x; base 3 corridas, rama 6, mediana):**

| | FCP | LCP | Carga completa (`load`) | Bajado en los primeros 12 s | Pedidos |
|---|---|---|---|---|---|
| Base | 2,27 s | 2,39 s | 18,6 s | 3.781 KB | 70 |
| Rama | 2,08 s | 2,31 s | **15,0 s** | **3.231 KB** | **64** |

Lectura honesta:

- **Lo que sí mejora con claridad:** la página termina de cargar 3,6 s antes en celular, baja 550 KB menos al entrar y hace 6 pedidos menos. Lighthouse pasa de 66 a 73 en celular y el primer dibujo (FCP) se adelanta.
- **El LCP casi no cambia** (2,39 → 2,31 s, dentro del ruido). La imagen principal ya cargaba primero; lo que la frena es el costo de dibujar la página (backlog 3) y las rocas de la isla 3 (backlog 1), que son de otras áreas.
- Sobre producción, la mejora total va a ser mayor: ahí todavía no está Cal.com diferido, que en la ronda anterior (base `a6d5dc0`, sin ese cambio) era la mayor parte del peso extra (6,0 → 5,3 MB solo con mis cambios).

**squirrelscan:**

| | Puntaje | SEO | Rendimiento | Seguridad | Páginas encontradas |
|---|---|---|---|---|---|
| Producción (`b1d4042`) | 77 | 97 | 91 | 89 | 2 |
| Rama (local) | 80 | 83† | 93 | **94** | **5** |

† El SEO local baja por un falso error: el sitemap apunta a `https://mayofy.dev` y la auditoría corrió sobre `localhost`. En producción ese error no existe. Resueltos respecto de producción: HSTS, protección contra marcos, `security.txt`, `llms.txt`, descripción corta de privacidad, imágenes sin carga diferida, caché de imágenes y casos fuera del sitemap. Lo nuevo que aparece al encontrar los casos: tienen poco texto (157 a 161 palabras) y un solo enlace interno cada uno (backlog 6).

## Qué cambió y por qué

### SEO técnico

1. **Datos estructurados (JSON-LD)** — `src/lib/structured-data.ts`, `src/components/json-ld.tsx`.
   - Home: `Organization` (nombre, logo, email, Instagram, fundador `Person` "Juan Ignacio Portilla Kitroser" con su LinkedIn), `WebSite`, un `Service` por pack con `PriceSpecification.minPrice` en USD (son precios "desde") y `FAQPage` con las mismas 10 preguntas que se ven en la isla 7.
   - Casos: `BreadcrumbList` y `CreativeWork` con la primera captura.
   - Zona: `areaServed` = Argentina + Latinoamérica + los 20 partidos de la tabla del Perfil de Google (`docs/plans/2026-11-22-perfil-google.md`), para el trabajo en persona. Ningún título nombra el pueblo (Juani: "Preferiria figurar de alguna manera que me permita apuntar a todo argentina y latinoamerica, no a mi pueblo").
   - Todo se arma desde `src/content/*`: si cambia un precio o una pregunta, el JSON-LD cambia solo.
   - Se usa `Organization` y no `ProfessionalService`: este último es un negocio local y Google espera una dirección, que Juani no quiere mostrar.
   - **Pendiente:** cuando el Perfil de Google esté verificado, agregar su URL en `sameAs` (hay un `TODO(Juani)` en el código).
   - Las preguntas frecuentes no van a salir como resultado enriquecido: Google las muestra solo para sitios de salud y gobierno desde 2023. Igual sirven para Bing y para los asistentes de IA.
2. **Sitemap** (`src/app/sitemap.ts`): home, los 3 casos publicados y privacidad, con fechas reales.
3. **Casos de relleno**: `generateStaticParams` solo publica los casos reales en producción; en desarrollo siguen visibles para probar la plantilla. Antes tenían `noindex`, pero cualquiera podía abrir "Nombre del proyecto 04". Helper nuevo: `publishedProjects` en `src/content/projects.ts`.
4. **robots.txt**: deja afuera `/api/` (el formulario) y declara el host.
5. **Títulos y descripciones** (`src/app/layout.tsx`):
   - Home: "Mayofy — Páginas web con turnos online y sistemas a medida" (58 caracteres) y "Diseño de páginas web para negocios de servicios: landing pages, webs con turnos online y sistemas a medida en Argentina y LATAM. Charla gratis para empezar." (157).
   - La tarjeta para compartir mantiene el lema "Mayofy — webs que venden, sistemas que ordenan".
   - Casos: el resumen más "Caso de Mayofy: qué necesitaba y cómo lo construimos." (138 a 157 caracteres).
   - Privacidad: descripción de más de 120 caracteres (squirrelscan la marcaba corta).
6. **Open Graph y Twitter por página** (`src/lib/share-metadata.ts`). En Next.js, si una página define `openGraph`, reemplaza el de la plantilla entero; por eso cada página arma el suyo completo (título, URL, imagen).
7. **Search Console por meta etiqueta**, solo si se carga `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. La vía recomendada es el registro DNS (ver "Lo que tiene que hacer Juani").
8. **`/llms.txt`** (`src/app/llms.txt/route.ts`): resumen en texto plano para asistentes de IA (packs, casos, preguntas, contacto), armado desde el mismo contenido.
9. **`/.well-known/security.txt`** con el email de contacto (vence el 22/11/2027).

### Tarjetas para compartir (design-taste-frontend)

- `scripts/og-cards.mjs` abre una página del sitio en Chrome (así carga las fuentes y los colores reales), dibuja la tarjeta y la guarda en JPEG en `public/og/`.
- **Home:** el cielo del amanecer, la isla con Mayo sentada donde está pintada, el título del héroe con las palabras en itálica verde y "mayofy.dev". ~78 KB.
- **Casos:** el mismo cielo, "Caso · categoría", el título, y las capturas reales en marco de navegador y de celular, como en la isla de trabajos. 72 a 92 KB.
- Sin texto bajo las imágenes ni botones falsos.
- Hay que volver a correrlo cuando cambie el título del héroe, un caso o sus capturas (instrucciones al principio del script). Playwright no es dependencia del proyecto: el script usa una copia local.

### Rendimiento

1. **Caché de imágenes** (`next.config.ts`): `/images`, `/mayo` y `/og` pasan de `max-age=0` a `public, max-age=604800, stale-while-revalidate=2592000`. Las imágenes se renombran cuando se repintan (v2, v3…), así que una semana es seguro. Riesgo: si alguien reemplaza una imagen con el mismo nombre, un visitante que vuelve puede ver la vieja hasta una semana.
2. **Capturas de la isla 5 en diferido** (`works-index.tsx`): las 6 capturas se precargaban junto con el héroe (~600 KB compitiendo con la imagen principal). Ahora llevan `loading="lazy"`.
3. **Mayo del héroe sin prioridad alta** (`mayo-figure.tsx`): la tira de 322 KB pedía prioridad alta y competía con el fondo del héroe, que es la imagen LCP. Sigue cargando de entrada, con prioridad normal.
4. **Google Analytics después de la carga** (`src/components/google-analytics.tsx`, aprobado por Juani como "lazyOnload"): `gtag.js` (~180 KB) se pide recién después del evento `load` y de un momento libre del navegador, con un tope de 3 s. Costo aceptado: las visitas que se van en los primeros segundos no se cuentan. Reemplaza al componente de `@next/third-parties`, que cargaba apenas hidrataba (la dependencia quedó sin uso, ver backlog).
   - **Por qué no `next/script` con `strategy="lazyOnload"`:** lo probé primero y GA no cargaba nunca en Chrome sin ventana. Esa estrategia espera un `requestIdleCallback` sin tope de tiempo, y ese aviso no llega en Chrome sin ventana ni en pestañas en segundo plano. Comprobado: después de 15 s no hubo pedido a `googletagmanager`; con el cargador nuevo, el pedido sale ~0,7 s después de `load` y se envía la visita (`/g/collect`).
5. **Cabeceras de seguridad**: `Strict-Transport-Security: max-age=31536000` (sin subdominios hasta confirmar que todos sirven HTTPS) y `X-Frame-Options: SAMEORIGIN`.
6. **Cal.com en diferido:** lo hizo la sesión de contacto (ronda 2, carga con `IntersectionObserver`). Mi versión se revirtió a pedido del coordinador; los números de abajo ya lo incluyen en los dos lados.

### Herramienta instalada

- **squirrelscan 0.0.189** en `~/.local/bin/squirrel.exe` (nivel usuario, no es dependencia del proyecto), bajado de la release oficial de GitHub y verificado con su SHA-256. Autorizado por Juani ("hazlo").

## Backlog, por impacto y esfuerzo

| # | Qué | Impacto | Esfuerzo | Dueño |
|---|---|---|---|---|
| 1 | **Rocas de la isla 3:** las 12 piezas (~1,15 MB en AVIF) se piden al entrar, con `loading="eager"` porque su máscara CSS usa el mismo archivo. Cargar pieza y máscara recién cuando la isla 3 está a ~1 pantalla (por ejemplo, poner `--mask` desde un observer). | Alto en celular: libera ~1,1 MB de la primera carga | Medio | Isla 3 |
| 2 | **Tiras de Mayo para celular:** el celular baja las mismas tiras que el escritorio (celdas de 640 px, 250 a 570 KB cada una) y las muestra a ~150 px. Una versión de celdas de 320 px con `<source media>` bajaría ~60 % de ese peso. | Alto | Medio (exportar tiras) | Mayo / assets |
| 3 | **Costo de dibujar la página:** aun en local, con CPU 4x, el primer dibujo tarda ~1,5 s: hay 1.250 nodos, 200 KB de CSS con unidades de contenedor y varias pasadas de layout antes del primer dibujo. Probar `content-visibility: auto` en las islas 2 a 8 (en una prueba de 3 corridas bajó el FCP en celular, pero hay que validarlo con el snap por secciones, los anclajes y las animaciones por scroll antes de adoptarlo). | Alto (FCP/LCP en celulares de gama media) | Alto, con riesgo de romper el scroll | Scroll |
| 4 | **Fuente Fraunces:** se precargan 149 KB (variable, con pesos, `opsz` y `SOFT`) para usar una sola instancia (itálica 400, `opsz` 120, `SOFT` 60). Un archivo recortado a esa instancia pesaría ~30-40 KB. Hace falta `fonttools` (herramienta de Python, a aprobar) y `next/font/local`. Ojo: los números de la isla 5 usan `opsz` automático. | Medio | Bajo | SEO/rendimiento, con aprobación |
| 5 | **Medir Cal.com diferido en producción** cuando salga la ronda 2 de contacto. | Alto (ya hecho) | Bajo | Contacto |
| 6 | **Contenido y enlaces de los casos:** tienen 157 a 161 palabras (squirrelscan pide 300) y un solo enlace que llega a cada uno (el carrusel de la isla 5). Muestran "Captura pendiente" aunque las capturas existen, y el contador dice "01 / 06" contando los de relleno. Propuesta: más texto propio (resultado, números, una cita del cliente), la galería con las capturas reales y un enlace "Otro caso" al pie de cada caso. | Medio en SEO | Medio | Contenido / Juani |
| 7 | **Política de seguridad de contenido (CSP):** squirrelscan la pide. Requiere permitir GA, Cal.com y FormSubmit y poner nonce a los scripts de Next, lo que vuelve dinámicas las páginas. | Bajo en SEO, medio en seguridad | Medio | — |
| 8 | **Formulario:** `enterkeyhint` en los campos (squirrelscan). Lighthouse también marca `aria-label` en un `div` sin rol en `booking__inline`. | Bajo | Bajo | Contacto |
| 9 | **Limpieza:** `public/images/hero-umbral-*.png` (4,8 MB) ya no se usan; conviene borrarlos dentro de unas semanas, cuando las redes ya no tengan en caché la tarjeta vieja. `@next/third-parties` quedó sin uso (sacarlo es un cambio de dependencias). | Bajo | Bajo | Limpieza |
| 10 | **JavaScript heredado** (13 KB de polyfills que Lighthouse marca) y HTML de 340 KB (71 KB comprimido) por el payload de React. | Bajo | Medio | — |

## Páginas programáticas (descartado)

La propuesta era armar páginas por rubro ("páginas web para peluquerías", "para gimnasios", "para lavaderos"), solo donde hubiera un caso real o contenido propio del rubro, y nunca páginas por ciudad (sin presencia local son páginas puerta, que Google penaliza). Juani respondió "no armemos paginas por rubro", así que no se hace.

Lo que reemplaza esa idea sin páginas nuevas:

- Cada caso nuevo es, en la práctica, una página de su rubro (ShineApp ya es "sistema para lavaderos"). Vale más un caso con texto y resultados que diez páginas de plantilla.
- Si más adelante se reconsidera, el riesgo principal es el contenido fino: páginas que solo cambian el nombre del rubro bajan la calidad de todo el sitio.

## Lo que tiene que hacer Juani (fuera del código)

1. **Search Console** (lo más importante):
   - Agregar una propiedad de **dominio** `mayofy.dev` y verificarla con el registro TXT que da Google, cargado en el DNS de Vercel (el dominio usa DNS de Vercel y apunta a Railway).
   - Enviar `https://mayofy.dev/sitemap.xml`.
   - Pedir indexación de la home y de los 3 casos con "Inspección de URL".
   - En unas semanas, revisar "Páginas" (que estén las 5), "Mejoras" (datos estructurados sin errores) y "Métricas web principales".
2. **Bing Webmaster Tools:** importar la propiedad desde Search Console (2 minutos). Bing alimenta a Copilot y es una de las fuentes de búsqueda de ChatGPT.
3. **Perfil de Google:** lo prepara otra sesión. Cuando esté verificado, pasar su URL pública para agregarla al `sameAs`.
4. **Enlaces que apunten a mayofy.dev** (backlinks):
   - Instagram (link en la bio) y LinkedIn (campo "sitio web" y una publicación destacada).
   - Un "Hecho por Mayofy" con enlace en el pie de los sitios de clientes (shineapp.lat, gymg.com.ar, el portfolio), si los clientes aceptan.
   - Directorios de estudios y freelancers de Argentina y LATAM, y cámaras de comercio de la zona.
5. **Reseñas** de clientes reales en el Perfil de Google, apenas esté verificado.
6. **Después de publicar:** pasar la home y un caso por el [depurador de Facebook](https://developers.facebook.com/tools/debug/) para que WhatsApp, Facebook e Instagram tomen la tarjeta nueva, y por la [prueba de resultados enriquecidos](https://search.google.com/test/rich-results).

## Verificación

Sobre el build final de la rama (`next build` + `next start`, con `31db488` de limpieza ya mezclado):

- `npm run typecheck` y `npm run lint`: sin errores. `next build`: sin errores.
- **Navegador, 1440 × 900 y 390 × 844**, en `/`, `/proyectos/shineapp` y `/privacidad`, recorriendo la página entera: 0 errores de consola, un solo `h1`, sin saltos de nivel en los títulos, todas las imágenes con `alt`, sin scroll horizontal, y el primer Tab va al enlace "Saltar al contenido".
- **JSON-LD:** se lee bien en las tres páginas (home: Organization + WebSite + 3 Service + FAQPage; caso: BreadcrumbList + CreativeWork).
- **Metaetiquetas:** cada página tiene su título, canónica, `og:url` e imagen propia (verificado con `curl`).
- **GA:** sin precarga en el `<head>`; el pedido a `gtag.js` sale después de `load` y se envía la visita.
- **Cabeceras:** `Cache-Control` de imágenes, HSTS y `X-Frame-Options` presentes. `/robots.txt`, `/sitemap.xml` (5 URL), `/llms.txt` y `/.well-known/security.txt` responden 200. `/proyectos/proyecto-04` responde 404.
- **Tarjetas:** las 4 se revisaron a ojo (texto completo, nada tapado) y pesan entre 72 y 92 KB.
- **Sin cambios visuales:** la captura del héroe en 1440 y 390 es la misma de antes. Ningún cambio toca el texto visible, el CSS ni los controladores de scroll.
- **No se pudo probar:** la vista previa real en WhatsApp, Facebook y la prueba de resultados enriquecidos de Google necesitan la URL pública; quedan para después de publicar (paso 6 de la lista de Juani).

## Limitaciones

- Los números son locales, no de usuarios reales. Los datos de campo (CrUX) aparecen en Search Console cuando haya tráfico suficiente.
- El LCP simulado de Lighthouse en celular es inestable en esta página; por eso hay una medición real con throttling.
- squirrelscan corrió sin conexión (`--offline`, nivel rápido): no revisó enlaces externos, la página 404 ni archivos expuestos.

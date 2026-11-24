# Eventos de Analytics (23 de noviembre de 2026)

Pedido de Juani: "Desplega otro agente especializado para el punto de analytics". El punto: hoy nadie sabe cuántos visitantes tocan "Agendá", WhatsApp o mandan el formulario; registrarlos como eventos.

Rama `juanikitro/landing-analytics`, desde `juanikitro/landing-redesign` (`dacd92c`). Cierra el punto 7 del backlog ("Medición") y el evento de reservas que faltaba en el punto 5.

## Resumen

- **Google Analytics 4 ya cuenta cada paso del embudo:** toques en "Agendá" y en los demás botones, cada WhatsApp (con dónde estaba), el formulario (enviado, salió bien, falló), la agenda de Cal.com (abierta, empezada, reservada), casos de estudio, links a sitios de clientes, islas alcanzadas y uso del menú.
- **La carga no cambia.** Analytics sigue esperando a que la página termine; los eventos de antes esperan en una cola y se mandan después. Se suman 2,2 KB de JavaScript comprimido (+1 %), sin pedidos nuevos.
- **Sin datos personales.** Ningún evento lleva lo que escribe el visitante: solo nombres de secciones, packs, textos de botones y dominios.
- **Google Analytics quedó configurado** (24 de noviembre): conversiones, dimensiones, retención de 14 meses, tráfico interno, filtros en prueba y Search Console. La propiedad vieja de juanikitro.com se borró. Falta pasar los filtros a Active cuando los informes muestren la marca.

## Qué se registra

Todos los eventos aparecen en GA4 en **Informes > Interacción > Eventos** (los nuevos tardan hasta 24 h en verse ahí; en **DebugView** se ven al instante, ver "Cómo probarlo").

| Evento | Cuándo | Parámetros |
|---|---|---|
| `cta_click` | Un botón que lleva a la agenda, a los packs o a un pack: héroe, "Agendá" del menú, recomendación de la isla 2, links de la isla 4, packs. | `cta` (`agenda`, `packs`, `pack`), `pack` (`landing`, `gestion`, `sistema`), `placement`, `link_text` |
| `whatsapp_click` | Cualquier link o botón de WhatsApp. | `placement`, `pack` (si estaba en una tarjeta de pack), `link_text` |
| `contact_form_submit` | Se envía el formulario. | `channel` (`whatsapp` o `callback` = "Prefiero que me contacten") |
| `contact_form_success` | El envío salió bien (o se abrió WhatsApp con la consulta). | `channel` |
| `contact_form_error` | El envío falló. | `reason` (`timeout`, `network`, `rejected`) |
| `booking_open` | En el celular, el botón que abre la agenda de Cal.com. | `placement` |
| `booking_view` | La agenda de Cal.com terminó de cargar y está a la vista. | `mode` (`inline` en compu, `popup` en celular) |
| `booking_started` | La primera vez que el visitante elige un día o un horario. | `mode` |
| `booking_complete` | Se reservó una llamada. | `mode` |
| `booking_link_click` | El link directo a cal.com (respaldo o falla). | `placement` |
| `pack_details_open` | "Ver todo lo que incluye" en una tarjeta de pack. | `pack` |
| `case_study_view` | Se abrió un caso de estudio. | `project` (por ejemplo `shineapp`) |
| `outbound_click` | Un link a otro sitio. | `link_type` (`client_site`, `social`, `email`), `link_domain`, `placement`, `link_text` |
| `section_reached` | El lector llegó a una isla (una vez por isla y por visita a la página). | `section` (id de la isla), `island` (1 a 7) |
| `nav_click` | Un salto desde el menú de arriba. | `section`, `item` (`brand`, `link`, `sheet` = lista del celular, `cta` = "Agendá") |
| `nav_menu_open` | En el celular, se abrió la lista de secciones. | `section` (dónde estaba el lector) |

`placement` dice dónde estaba lo que se tocó: el id de la isla (`inicio`, `problema`, `packs`, `packs-detalle`, `sistemas`, `trabajos`, `contacto`, `preguntas`), `agenda`, `nav` (menú), `float` (el botón flotante de WhatsApp), `footer`, `contact_form`, `case_study` (página de un caso) o `privacy`.

Ejemplos reales de la prueba:

- El botón de WhatsApp del héroe: `whatsapp_click` con `placement: inicio`, `link_text: Escribinos por WhatsApp`.
- "Quiero mi página" del pack Landing: `whatsapp_click` con `placement: packs-detalle`, `pack: landing`.
- La recomendación de la isla 2: `cta_click` con `placement: problema`, `cta: agenda`.
- El link de la isla 4 al pack Sistema: `cta_click` con `placement: sistemas`, `cta: pack`, `pack: sistema`.

Además, GA sigue mandando sus eventos automáticos ("medición mejorada"): `page_view`, `scroll` (90 %), `click` en links a otros sitios. Los WhatsApp y los sitios de clientes aparecen dos veces (el `click` de GA y el nuestro); el nuestro es el que dice dónde estaba.

## Cómo funciona

- **`src/lib/analytics.ts`:** la función `track(nombre, parámetros)`, con cada evento y sus parámetros tipados (un nombre mal escrito no compila). Si GA todavía no cargó, guarda el evento en una cola de hasta 40 y lo manda cuando GA está listo, en orden. Nunca tira errores: un clic o una navegación nunca dependen de Analytics.
- **Consentimiento:** `track` pregunta antes a una sola función de consentimiento, que por ahora siempre dice que sí. Si se suma un aviso de cookies, se reemplaza con `setAnalyticsConsent(() => …)`; desde ahí todo `track` la respeta, y si dice que no se borra lo que esperaba en la cola.
- **`src/components/analytics-tracker.tsx`** (montado en `layout.tsx`, solo si hay id de GA): un único listener de clics para todo el sitio. Lee el `href` de cada link tocado y decide: WhatsApp, agenda, packs, sitio externo, menú. Por eso un botón nuevo con `href="#agenda"` o un WhatsApp nuevo se registran solos, sin código nuevo. Escucha en fase de captura y solo lee: no cancela ni demora el clic. Ignora los clics que hace el código (no el visitante). También cuenta las islas alcanzadas (una isla cuenta cuando ocupa la mitad de arriba de la pantalla durante 1 segundo, así las que pasan volando en un salto a la agenda no cuentan) y las visitas a casos de estudio.
- **`src/components/google-analytics.tsx`:** después de `config`, le avisa a la cola que GA está listo. Suma dos ayudas para Juani: `?ga_debug=1` (DebugView) y `?interno=1` (tráfico interno), ver la lista.
- **Componentes tocados (una o dos líneas cada uno):** el formulario (`contact-form.tsx`) manda enviado / bien / falló; la agenda (`cal-booking.tsx`) escucha los eventos de Cal.com y el botón del celular; el menú (`island-nav.tsx`) avisa cuando se abre la lista. La carga diferida de Cal.com no cambia.

### Cal.com: qué eventos da y cuáles no

Se probó en vivo con el embed real (23 de noviembre, escuchando todos sus eventos):

- Usamos los públicos: `bookerViewed` (agenda a la vista) y `bookingSuccessfulV2` (reserva hecha).
- **Cal.com no tiene un evento público de "eligió un día" ni de "eligió un horario".** Lo único que dispara al elegir cualquiera de los dos es un evento interno, `__routeChanged`. Lo usamos para `booking_started`, una sola vez por carga del sitio. Como es interno, Cal.com puede cambiarlo sin aviso; si deja de llegar, `booking_started` queda en cero pero nada se rompe.
- `booking_complete` no se probó con una reserva real (habría creado una reunión en el calendario de Juani): se probó disparando el mismo evento de Cal.com en el navegador. **La primera reserva real va a confirmarlo**: conviene mirar DebugView o el informe en tiempo real la próxima vez que alguien reserve.

## Cómo se verificó

- Playwright contra el servidor de desarrollo y el de producción (`next build` + `next start`), a 1440 × 900 y 390 × 844 (celular táctil y con movimiento reducido), interceptando los pedidos `/g/collect` que GA manda a Google y leyendo `dataLayer`.
- Recorrido completo: "Agendá" del héroe y del menú, WhatsApp del héroe, del pack, de la isla 6, del flotante y del formulario, recomendación de la isla 2 con teclado (Enter), link de la isla 4, lista del menú del celular, popup de la agenda, días elegidos en la agenda real, formulario con respuesta buena y con error (la API simulada), caso de estudio y su link al sitio, tarjeta de pack con teclado. Cada evento llegó con los parámetros de la tabla.
- **La cola funciona:** con las imágenes retenidas para que la página no termine de cargar, "Agendá" se tocó antes de que existiera GA; el evento salió después, en orden, detrás de `config`.
- **Sin datos personales:** el formulario se llenó con un nombre y un correo de prueba; ninguno aparece en ningún evento.
- Los saltos con `#` no suman vistas de página: una sola `page_view` por carga.
- Cero errores de consola, sin scroll horizontal, `lint`, `typecheck` y `build` en verde.
- **Peso:** el JavaScript de la portada pasa de 207,6 KB a 209,8 KB comprimidos (+2,2 KB, +1 %); el HTML, +217 bytes. Ningún pedido nuevo antes de la carga; GA se pide en el mismo momento que antes.

**Ojo:** las pruebas de hoy mandaron eventos de `localhost` a la propiedad real de GA (el id por defecto está en `layout.tsx` y el entorno local también lo usa). Las de `localhost` no las saca ningún filtro: en los informes conviene filtrar por nombre de host `mayofy.dev`. Las de producción con `?ga_debug=1` las saca el filtro "Developer traffic" cuando esté activo.

## Configuración de Google Analytics (24 de noviembre)

Pedido de Juani (23 de noviembre): "Sobre lo que hay que hacer en google analytics, en el agente desplegado autorizo a utiliza el mcp de google analytics para hacerlo vos (https://developers.google.com/analytics/devguides/MCP). De paso si podes elimina el de juanikitro.com que no pertenece a juanikitro.com (ya que hay dos y uno es viejo) y configura correctamente el de mayofy landing y todo lo que puedas mejorar".

### Cómo se hizo

- **El MCP oficial de Google Analytics es solo lectura** (lo dice su documentación: no puede crear, cambiar ni borrar configuración). Quedó instalado para consultas a nivel usuario, no en el proyecto: `claude mcp add analytics-mcp --scope user … -- uvx --from analytics-mcp google-analytics-mcp`.
- **Las escrituras se hicieron con la Admin API de Google Analytics** (cliente oficial de Python `google-analytics-admin`, corrido con `uv` sin instalarlo en el proyecto), con las mismas credenciales.
- **Credenciales:** gcloud CLI a nivel usuario (`%LOCALAPPDATA%\google-cloud-sdk`). Proyecto de Google Cloud nuevo, `mayofy-analytics-mcp` ("Mayofy Analytics MCP"), con la Admin API, la Data API y Resource Manager activadas (sin costo). Google bloquea la app genérica de gcloud para los permisos de Analytics ("Esta app está bloqueada"), así que Juani creó en ese proyecto una app de escritorio propia ("Mayofy Analytics", en modo prueba, con él como único usuario de prueba). El archivo de esa app está en `%APPDATA%\gcloud\mayofy-analytics-oauth-client.json` y las credenciales en `%APPDATA%\gcloud\application_default_credentials.json`. Juani hizo los inicios de sesión; nadie más vio su contraseña.
- Para sacar el acceso: `gcloud auth application-default revoke` y borrar la app en https://console.cloud.google.com/auth/clients?project=mayofy-analytics-mcp.

### Inventario (cuenta "juanikitro", 215430953)

| Propiedad | ID | Flujo / ID de medición | Creada | Último dato |
|---|---|---|---|---|
| juanikitro.com (vieja) | 296960689 | juanikitro, `G-QQN0E354J2`, www.juanikitro.com | 15/12/2021 | 04/08/2022 |
| The King Shine | 547423482 | `G-M02T0YSQQY`, thekingshine.vercel.app | 28/07/2026 | 07/11/2026 |
| Mayofy landing | 547554982 | `G-F2DHJCS51K` | 29/07/2026 | al día |
| juanikitro.com | 559155441 | Juani Kitro, `G-S38VY0DW86`, juanikitro.com | 15/10/2026 | al día |

### juanikitro.com: propiedad vieja borrada

- **Evidencia:** https://juanikitro.com (y www, que redirige ahí) carga `G-S38VY0DW86` (propiedad 559155441, 339 eventos de juanikitro.com en 30 días). `G-QQN0E354J2` no aparece en el sitio, y su propiedad (296960689) no recibe datos desde el 4 de agosto de 2022 (482 eventos en total).
- Juani confirmó ("si") y se borró la **296960689** el 23 de noviembre a las 15:15. Queda en la papelera hasta el **28 de diciembre de 2026**. Para recuperarla: Admin > Account > Trash > marcarla > Restore. Después de esa fecha se borra para siempre.

### Mayofy landing (547554982): cambios

| Qué | Antes | Después | Cómo |
|---|---|---|---|
| Eventos clave | `purchase`, `close_convert_lead`, `qualify_lead` (los que GA crea por defecto) | además `booking_complete`, `contact_form_success`, `whatsapp_click` (una vez por evento) | API |
| Dimensiones personalizadas (alcance evento) | ninguna | `placement`, `cta`, `pack`, `channel`, `reason`, `mode`, `section`, `island`, `item`, `project`, `link_type` (`link_text` y `link_domain` ya son dimensiones de GA) | API |
| Retención de datos de eventos | 2 meses | **14 meses** (usuarios: 14 meses, sin cambio; se reinicia con nueva actividad). Coincide con la política de privacidad. | API, releído |
| Medición mejorada | todo encendido | **clics salientes y formularios apagados** (duplicaban `whatsapp_click`, `outbound_click` y `contact_form_*` con menos detalle); siguen vistas de página, cambios de historial (casos de estudio), scroll, búsqueda, videos y descargas | API |
| Flujo web | "Mayofy Landing Web", `https://mayofy.vercel.app` | "Mayofy landing web", `https://mayofy.dev` | API |
| Moneda | USD | USD (Juani eligió USD: los precios del sitio están en dólares) | sin cambio |
| Zona horaria | `America/Buenos_Aires` | sin cambio: es el mismo huso que `America/Argentina/Buenos_Aires`, y cambiarla corta los días en los informes | sin cambio |
| Google signals | apagado | apagado (Juani no lo pidió) | sin cambio |
| Tráfico interno | sin definir | regla "Juani casa": la IPv4 de su casa (igual a) o su red IPv6 (rango CIDR /64) → `traffic_type=internal`; si cambia la IP de casa, hay que actualizar la regla; además, `?interno=1` en cada navegador de Juani | Juani, en la interfaz (el Google tag ahora es un contenedor de Tag Manager: Settings > Define internal traffic; no hizo falta publicar) |
| Filtros de datos | ninguno visible | "Internal Traffic" y "Developer traffic", los dos **Exclude** en **Testing** | Juani, en la interfaz (la API no maneja filtros) |
| Search Console | sin vincular | vinculado a mayofy.dev y al flujo web | Juani, en la interfaz (la API no lo lee: queda por su confirmación) |

### Verificación

- Todo lo hecho por la API se releyó después de escribirlo.
- Desde la máquina de Juani se mandaron visitas a https://mayofy.dev: con `?interno=1`, cada evento sale con `traffic_type=internal`; con `?ga_debug=1`, sale como depuración. Google respondió 204 (recibido) a cada envío.
- **Pendiente:** el informe de Tiempo real no mostró esas visitas en los primeros 30 minutos, y los informes normales tardan unas horas. Hay que confirmar en los informes que "Test data filter name" las marca como "Internal Traffic" / "Developer traffic" y **recién ahí pasar los dos filtros a Active**. Active borra ese tráfico para siempre: no se activa sin ver primero la marca.

### Lo que sigue en la interfaz

1. Abrí **https://mayofy.dev/?interno=1** una vez en cada navegador y celular tuyo (queda guardado; `?interno=0` lo saca). En el celular con datos móviles la regla de IP de casa no aplica, así que esto es lo único que marca esas visitas.
2. Cuando los informes muestren tus visitas con "Test data filter name" = Internal Traffic: Admin > Data filters > Internal Traffic > Filter state **Active** > Save. Lo mismo con Developer traffic.
3. Opcional: Reports > Library > publicar la colección **Search Console** para ver búsquedas y páginas de entrada.

### Cómo probarlo

- Abrí **https://mayofy.dev/?ga_debug=1** y, en otra pestaña, Administrar > DebugView. Tocá "Agendá", un WhatsApp, abrí un caso: cada evento aparece en segundos con sus parámetros.
- Para ver el embudo: Explorar > "Exploración de embudo", con pasos `section_reached` (sección `contacto`) > `booking_view` > `booking_started` > `booking_complete`.

## Lo que queda

- **`booking_complete` con una reserva real:** se va a confirmar la primera vez que alguien reserve (ver arriba).
- **`booking_started` depende de un evento interno de Cal.com.** Si Cal.com lo cambia, ese paso deja de contarse; las reservas siguen contándose.
- **Visitas que se van en los primeros segundos:** siguen sin contarse (decisión de rendimiento del 22 de noviembre). Si tocan algo antes de irse, el evento se pierde junto con la visita.
- **Consentimiento:** la ronda de privacidad conectó `setAnalyticsConsent` con la opción de no medir en /privacidad y con Global Privacy Control (`analytics-consent.ts`); no hay aviso de cookies.
- **Filtros en Active:** pendientes de ver la marca en los informes (ver "Verificación").
- **Desarrollo local manda a la propiedad real.** Para evitarlo, el `.env.local` de quien desarrolle puede tener `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=` vacío (no se cambió el valor por defecto porque producción depende de él).

## Ajustes de la revisión (24 de noviembre de 2026)

Observaciones menores de las dos revisiones de Gentle AI, ya resueltas:

- **Ruta de un caso mal escrita.** `decodeURIComponent` tiraba un error con una URL rota (por ejemplo `/proyectos/%E0%A4%A`). Ahora `caseStudyProject` (`src/lib/case-study-path.ts`) devuelve el texto sin decodificar y el evento `case_study_view` se manda igual.
- **`?ga_debug=0` también activaba DebugView.** Ahora solo `?ga_debug=1` lo activa (`google-analytics.tsx`).
- **Baja en otra pestaña.** Si alguien desactiva la medición en /privacidad con otra pestaña del sitio abierta, esa otra pestaña ahora se entera: `followOtherTabs` (`analytics-consent.ts`) escucha el evento `storage`, olvida la elección guardada en la pestaña, vuelve a leer y prende el interruptor de GA (`ga-disable-<id>`). El interruptor de /privacidad se actualiza con el mismo evento.
- **Tests (Vitest, `npm test`):**
  - `src/lib/analytics.test.ts`: la cola manda en orden cuando GA está listo, guarda como máximo 40 eventos, descarta lo pendiente si se retira el consentimiento, trata un error del chequeo como "no medir", nunca tira errores y no hace nada en el servidor.
  - `src/lib/analytics-consent.test.ts`: medición por defecto, baja, Global Privacy Control y la sincronización entre pestañas.
  - `src/lib/case-study-path.test.ts`: rutas bien y mal escritas.

Límite: la sincronización entre pestañas se probó con un navegador simulado en los tests, no con dos pestañas reales.

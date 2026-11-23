# Eventos de Analytics (23 de noviembre de 2026)

Pedido de Juani: "Desplega otro agente especializado para el punto de analytics". El punto: hoy nadie sabe cuántos visitantes tocan "Agendá", WhatsApp o mandan el formulario; registrarlos como eventos.

Rama `juanikitro/landing-analytics`, desde `juanikitro/landing-redesign` (`dacd92c`). Cierra el punto 7 del backlog ("Medición") y el evento de reservas que faltaba en el punto 5.

## Resumen

- **Google Analytics 4 ya cuenta cada paso del embudo:** toques en "Agendá" y en los demás botones, cada WhatsApp (con dónde estaba), el formulario (enviado, salió bien, falló), la agenda de Cal.com (abierta, empezada, reservada), casos de estudio, links a sitios de clientes, islas alcanzadas y uso del menú.
- **La carga no cambia.** Analytics sigue esperando a que la página termine; los eventos de antes esperan en una cola y se mandan después. Se suman 2,2 KB de JavaScript comprimido (+1 %), sin pedidos nuevos.
- **Sin datos personales.** Ningún evento lleva lo que escribe el visitante: solo nombres de secciones, packs, textos de botones y dominios.
- **Falta lo de Juani en la interfaz de GA** (marcar conversiones, dimensiones, filtros): lista guiada al final.

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

**Ojo:** las pruebas de hoy mandaron eventos de `localhost` a la propiedad real de GA (el id por defecto está en `layout.tsx` y el entorno local también lo usa). Están marcados como depuración y se filtran con el filtro de tráfico de desarrolladores (paso 5 de la lista).

## Lo que tiene que hacer Juani en Google Analytics

Todo en [analytics.google.com](https://analytics.google.com), propiedad de mayofy.dev. Se puede hacer apenas esté publicado (los eventos tardan hasta 24 h en aparecer en las listas; si un evento todavía no figura, se puede crear la conversión escribiendo el nombre a mano).

1. **Marcar las conversiones ("eventos clave").** Administrar > Visualización de datos > Eventos clave > Nuevo evento clave. Crear estos cuatro, escritos exactamente así:
   - `booking_complete` (reservó una llamada; la principal)
   - `contact_form_success` (mandó el formulario)
   - `whatsapp_click` (tocó WhatsApp)
   - `cta_click` es opcional: cuenta intención, no contacto. Recomendación: no marcarla, para que "conversiones" sea solo gente que contactó.
2. **Dimensiones personalizadas** (para poder ver los parámetros en los informes). Administrar > Visualización de datos > Definiciones personalizadas > Crear dimensión personalizada, alcance "Evento". Una por cada uno, con el mismo nombre en "Nombre de la dimensión" y en "Parámetro de evento":
   `placement`, `cta`, `pack`, `channel`, `reason`, `mode`, `section`, `item`, `project`, `link_type`, `link_text`.
   (`link_domain` ya lo trae GA.) Solo cuentan desde que se crean, no para atrás: conviene hacerlo el primer día.
3. **Retención de datos.** Administrar > Recopilación y modificación de datos > Retención de datos > "Retención de datos de eventos": cambiar de 2 a **14 meses** y guardar. Sin esto, las exploraciones no pueden comparar con el año anterior.
4. **Filtrar tus propias visitas.** Dos partes:
   - Administrar > Flujos de datos > (el flujo web) > Configurar etiqueta > Mostrar más > Definir tráfico interno > Crear: nombre "Juani", `traffic_type` = `internal`, "La dirección IP es igual a" tu IP (buscá "cuál es mi IP" en Google). Si tu IP de casa cambia, este paso solo no alcanza; por eso la segunda parte.
   - En cada navegador y celular tuyo, abrí una vez **https://mayofy.dev/?interno=1**. Queda guardado en ese navegador y tus visitas salen marcadas como internas aunque cambie la IP (`?interno=0` lo saca).
   - Después: Administrar > Recopilación y modificación de datos > Filtros de datos > "Internal Traffic": primero dejalo en "Prueba" un par de días; si en tiempo real ves que tus visitas tienen la dimensión "Filtro de datos de prueba", pasalo a **Activo**. Activo borra esas visitas para siempre.
5. **Filtrar las pruebas de desarrollo.** En el mismo lugar (Filtros de datos) debería estar "Developer traffic"; si no, crear uno de tipo "Tráfico de desarrolladores". Dejarlo **Activo**: saca los eventos de depuración (como las pruebas de hoy desde `localhost`).
6. **Vincular Search Console.** Administrar > Vínculos de productos > Vínculos de Search Console > Vincular > elegir la propiedad `mayofy.dev` (la que verificaste en el plan de SEO) > elegir el flujo web > Enviar. Después, en Informes > Biblioteca, publicar la colección "Search Console" para ver búsquedas y páginas de entrada. Si Search Console todavía no está verificado, hacerlo primero (ver `2026-11-22-seo-rendimiento.md`).
7. **Opcional, para menos ruido:** en el flujo web > Medición mejorada > engranaje, apagar "Interacciones con formularios". Manda `form_start` / `form_submit` propios de GA que no saben si el envío salió bien; los nuestros (`contact_form_*`) sí.

### Cómo probarlo

- Abrí **https://mayofy.dev/?ga_debug=1** y, en otra pestaña, Administrar > DebugView. Tocá "Agendá", un WhatsApp, abrí un caso: cada evento aparece en segundos con sus parámetros.
- Para ver el embudo: Explorar > "Exploración de embudo", con pasos `section_reached` (sección `contacto`) > `booking_view` > `booking_started` > `booking_complete`.

## Lo que queda

- **`booking_complete` con una reserva real:** se va a confirmar la primera vez que alguien reserve (ver arriba).
- **`booking_started` depende de un evento interno de Cal.com.** Si Cal.com lo cambia, ese paso deja de contarse; las reservas siguen contándose.
- **Visitas que se van en los primeros segundos:** siguen sin contarse (decisión de rendimiento del 22 de noviembre). Si tocan algo antes de irse, el evento se pierde junto con la visita.
- **Aviso de cookies:** si el agente de privacidad suma uno, se conecta con `setAnalyticsConsent`; también conviene sumar el modo de consentimiento de Google. Hasta entonces, todo se mide.
- **Desarrollo local manda a la propiedad real.** Para evitarlo, el `.env.local` de quien desarrolle puede tener `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=` vacío (no se cambió el valor por defecto porque producción depende de él).

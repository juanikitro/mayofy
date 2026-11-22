# Isla 6: la agenda sin trampa de scroll, el formulario que llega y la foto de Juani

> Actualización del 22/11: la **segunda ronda** (al final de este documento) reemplaza la vista de columnas por la vista de mes compacta en escritorio y un botón que abre Cal.com en el celular, compone la sección y carga Cal.com recién cuando hace falta.

Pedido de Juani, 22 de noviembre de 2026: "Despliega un agente dedicado a arreglar eso. si es posible, modifica la caja del cal.com para que sea mas acorde al reseto de la pagina".

"Eso" es el hallazgo **A4** de la prueba de usuario simulada (`docs/plans/2026-11-20-prueba-usuario.md`): en el celular, el calendario atrapaba el dedo, y la caja de Cal.com se veía como un widget pegado.

Rama: `juanikitro/landing-contacto-cal`. Archivos: `src/components/world/cal-booking.tsx`, `src/components/world/host-island.tsx`, `src/content/site.ts` (`scheduling`) y el bloque "Island 6: Cal.com booking" de `src/app/world.css`.

## Qué pasaba (evidencia)

- La trampa era nuestra, no de Cal.com. Nuestro CSS limitaba la caja en el celular a `max-height: min(44rem, 82svh)` con `overflow-y: auto`. Cal.com, en cambio, ya agranda el iframe a la altura de su contenido: medía **1.735 px** adentro de una caja de **656 px**, y adentro del iframe no hay ningún scroll propio.
- Se midió con los mismos deslizamientos táctiles por CDP de la prueba (`Input.dispatchTouchEvent` con inercia; ver `contacto-agenda/scripts/flick.cjs`). En el sitio en vivo, con el dedo apoyado sobre el calendario, **3 de 3 deslizamientos hacia abajo movieron la página 0 px**.
- En escritorio, la vista de mes (`month_view`) de Cal.com pone los horarios en una columna de 437 px que scrollea adentro (1.072 px de contenido). Con el puntero sobre esa columna, **4 muescas de rueda hacia abajo y 1 hacia arriba movieron la página 0 px**.
- El encabezado de Cal.com mostraba "Mayofy First Meeting" en inglés, "30m", "Cal Video" y el selector "America/Argentina/Buenos Aires". El fondo era casi negro y el acento, el de Cal.com.

## Qué cambió

1. **Sin scroll adentro, en ningún ancho.** Se sacaron el `max-height` y el `overflow` de la caja: el iframe toma la altura de su contenido y el panel crece con él. Cualquier deslizamiento o muesca sobre el calendario mueve la página.
2. **Vista de columnas (`column_view`).** En escritorio muestra el mes y, al lado, los horarios de dos días completos, sin columna con scroll propio. En el celular y en tablet (iframe de menos de unos 768 px), Cal.com apila el mes y los horarios del día elegido en una sola columna, igual que antes.
3. **Opciones que se probaron y se descartaron:**
   - `useSlotsViewOnSmallScreen` deja el calendario del celular en 367 px, pero abre los horarios en una capa fija de 367 px que scrollea adentro (1.173 px de contenido). Era la misma trampa, más chica.
   - La vista de mes deja la columna de horarios con scroll propio en escritorio.
4. **Autoscroll de Cal.com apagado** (`disableAutoScroll`). Cal.com puede mover la página por su cuenta (`__scrollByDistance`, `scrollIntoView` al cambiar de ruta). Apagado, la página se mueve solo cuando la mueve el lector. Al tocar un día, la página no se movió (0 px).
5. **La caja con la ropa de la isla:**
   - Se ocultó el encabezado de Cal.com (`hideEventTypeDetails`). En su lugar va un encabezado propio en la tipografía del sitio: "Elegí un día y un horario" y "Son 30 minutos por videollamada. Los horarios se muestran en tu hora local." Así desaparecen el título en inglés, "30m" y "Cal Video".
   - Los colores de Cal.com salen de los tokens del sitio con `cssVarsPerTheme` (doc de Cal.com: https://cal.com/docs/developing/guides/embeds/customize-embed-css-variables). `cal-booking.tsx` lee de `world.css`, en tiempo de ejecución, `--booking-surface`, `--night-ink`, `--night-ink-soft`, `--night-deep` y `--mint`, y arma con ellos las variables `cal-bg`, `cal-brand`, `cal-text*`, `cal-border*` y `radius`. Las mezclas se hacen en `oklab`: en `oklch`, la mezcla de menta con azul giraba el tono y los días disponibles salían azules.
   - `cal-bg` y `cal-bg-muted` (el fondo que pinta el contenedor del calendario) son la misma superficie que el panel, así que el iframe no se nota. Se quitó el borde propio de Cal.com.
   - El panel es un azul noche un poco más claro que el cielo de la isla, con el radio del sitio, una línea fina y la sombra suave de los paneles oscuros.
6. **Estado de carga claro.** Mientras Cal.com no avisa que está listo (`linkReady`), queda el esqueleto del mes con la línea visible "Cargando la agenda…". El esqueleto respira solo si no hay movimiento reducido.
7. **Si falla, un enlace en lugar de una caja vacía.** Si no carga el script, Cal.com avisa `linkFailed`, o pasan 15 s sin `linkReady`, el panel muestra "La agenda no cargó. Podés abrirla en Cal.com o escribirnos por WhatsApp." y el botón "Abrir la agenda en Cal.com". Si `linkReady` llega tarde, el calendario vuelve a aparecer. Antes, a los 15 s se ocultaba el esqueleto aunque no hubiera calendario. El enlace chico de abajo ("Si la agenda no carga, abrila en Cal.com") se oculta en ese estado para no repetir la acción.
8. El CSS de la agenda quedó en un solo bloque, "Island 6: Cal.com booking", en `world.css`. Antes estaba repartido en tres lugares.

## Cómo se verificó

Playwright con Chromium headless contra `next dev`. Los scripts están en `docs/plans/contacto-agenda/scripts/` (`lib.cjs` es el de la prueba de usuario).

| Prueba | Antes (mayofy.dev) | Después |
|---|---|---|
| 360x800: altura de la caja / del iframe | 656 / 1.735 px, `overflow: auto` | 1.495 / 1.495 px, sin overflow |
| 360x800: 3 deslizamientos hacia abajo con el dedo en el calendario | 0, 0, 0 px | 426, 502, 438 px |
| 360x800: deslizamientos hacia arriba con el dedo en el calendario | (no comparable) | −451, −365 px |
| 360x800: después de tocar un día, deslizar sobre la lista de horarios | — | 457 px; la página no se mueve sola al tocar (0 px) |
| 1366x768: 4 muescas abajo y 1 arriba sobre los horarios | 0, 0, 0, 0, 0 px (vista de mes, medido en local) | 100, 100, 100, 100, −100 px |
| 1366x768: lo mismo sobre el mes y sobre el encabezado | — | 100 px por muesca |
| Scroll propio adentro del iframe (360, 768, 1024, 1366, 1440) | columna de horarios en escritorio | ninguno |

- **Estados:** script bloqueado → error al instante. Iframe bloqueado → "Cargando la agenda…" y, a los 15 s, el error. Script demorado 9 s → esqueleto con la línea de carga (captura `a03`).
- **Anchos** 320, 360, 390, 768, 1024, 1366 y 1440: sin desborde horizontal. El panel queda alineado con el borde del texto de la isla (16 px en el celular, 80 px en escritorio). El enlace de respaldo mide 44 px de alto.
- **Movimiento reducido** (`prefers-reduced-motion: reduce`): el esqueleto no se anima.
- **Teclado:** desde "Escribir por WhatsApp", Tab entra al calendario de Cal.com (días y horarios son botones del iframe), y el foco se ve en el enlace de respaldo.
- **Consola:** cero errores con la agenda cargada.
- `eslint`, `tsc --noEmit` y `next build` sin errores.
- No se reservó ningún turno: la prueba llegó hasta tocar un día y ver sus horarios. El paso siguiente sería tocar un horario y llenar el formulario de Cal.com.

Capturas en `docs/plans/contacto-agenda/`:

- `a01`: celular, la agenda completa en tres pantallas.
- `a02`: escritorio, vista de columnas.
- `a03`: celular, carga y error.
- `a04`: tablet de 768 px.

## Límites

- **La agenda es larga en el celular:** 1.495 px, casi dos pantallas, porque Cal.com lista los 24 horarios del día. Es el precio de no tener scroll adentro. Si molesta, la alternativa es un botón "Elegir día y hora" que abra Cal.com en su ventana de pantalla completa: es un solo scroll, pero agrega un toque.
- **El texto de los horarios sigue siendo de Cal.com:** "7:00am", y el selector "12 h / 24hs" queda a la vista. El formato de 24 h y el idioma del título del evento se configuran en la cuenta de Cal.com, no desde el código. El título ya no se muestra.
- **"30 minutos por videollamada" está escrito en `site.ts`.** Si Juani cambia la duración o el lugar del evento en Cal.com, hay que actualizar ese texto.
- **Las fuentes de adentro del iframe son las de Cal.com.** Las CSS variables no cambian la tipografía, y no se puede cargar la del sitio adentro de un iframe de otro dominio.
- **Lo que no se pudo probar:** un Android y un iPhone reales (los toques son emulados por CDP) y un touchpad de precisión. El acomodo por secciones (`section-snap.tsx`) es de otro agente; con la isla 6 más alta se comportó como en cualquier sección alta (sin tirones hacia atrás en las mediciones).

## El formulario llega a jpkitro@gmail.com

Pedido de Juani, 22 de noviembre de 2026: "hagamos que el envio de formulario funcione a jpkitro@gmail.com. Tengo una cuenta de resend, pero me mantendria no tener que usarla. Debe llegar a jpkitro@gmail.com por ahora."

Archivos: `src/app/api/contact/route.ts`, `src/components/contact-form.tsx` y `README.md`.

### Por qué no llegaba (evidencia e hipótesis)

1. **Causa probable principal (comprobada en el código, no en producción): la dirección de destino estaba mal armada.**
   - Railway tiene `CONTACT_FORM_ENDPOINT=https://formsubmit.co/ajax/jpkitro@gmail.com`, en forma de URL (`odd/tasks/landing-followups.md`, L3).
   - La ruta probaba primero si el valor era un correo, con un patrón laxo (`algo@algo.algo`), y esa URL lo cumple: `https://formsubmit.co/ajax/jpkitro` + `@` + `gmail.com`. Así que la envolvía otra vez y mandaba cada consulta a `https://formsubmit.co/ajax/https%3A%2F%2Fformsubmit.co%2Fajax%2Fjpkitro%40gmail.com`, una casilla que no existe.
   - Se reprodujo con el mismo valor en local, contra un FormSubmit simulado. La versión de producción (`b1d4042`) tiene el mismo código.
   - No se pudo ver qué responde FormSubmit a esa dirección, porque probarlo sería un envío real.
2. **Falta de página de origen.** La ayuda de FormSubmit (https://formsubmit.co/help, "Why am I always getting an error 'Unable to submit form'?") explica que rechaza los envíos que no dicen de qué página vienen ("Make sure you open this page through a web server") y que se arregla con un campo `_url`. La consulta sale de nuestro servidor, sin `Referer` de navegador, y no mandaba `_url`.
3. **Activación pendiente.** La prueba del 16/11 disparó el correo de activación, y Juani informó que no le llegó (`docs/plans/landing-iteration-backlog.md`, punto 1). Mientras FormSubmit no está activado, responde HTTP 200 con `success: "false"` y un mensaje que pide activar. Según su ayuda, guarda las consultas 30 días y las entrega cuando se activa.
4. **Lentitud.** FormSubmit tardó de 25 a 60 s en las pruebas del 16/11, y la ruta cortaba a los 20 s. Eso daba error aunque FormSubmit tal vez entregara después.

### Qué cambió

- **Destino por defecto en el servidor:** sin `CONTACT_FORM_ENDPOINT`, las consultas van por FormSubmit a `jpkitro@gmail.com`. La dirección es una constante de la ruta (`DEFAULT_CONTACT_EMAIL`) y nunca llega al navegador. Sigue habiendo un override: `CONTACT_FORM_ENDPOINT` acepta un correo, la URL de FormSubmit o cualquier endpoint HTTPS. Se quitó la respuesta 503 de "formulario no configurado".
- **URL antes que correo:** un valor que empieza con un esquema (`https://`) se trata siempre como URL. El valor que ya está en Railway funciona tal cual, y también funcionaría si se borra.
- **Lo que FormSubmit necesita:**
  - Encabezados `Origin` y `Referer`, y el campo `_url`, con la página de contacto. Se toman del `Origin` del navegador que envía y, si no hay, de `NEXT_PUBLIC_SITE_URL`.
  - `_subject`: "Nueva consulta desde mayofy.dev: <nombre>".
  - `_replyto`: el correo de la persona, cuando dejó un correo.
  - `_template: "table"` y `_captcha: "false"`. Las opciones especiales están documentadas en https://formsubmit.co, y la forma AJAX en https://formsubmit.co/ajax-documentation.
- **Un correo legible:** los campos van con nombres en castellano (Nombre, Negocio, Responder a, Qué necesita, Plazo, Presupuesto, Referencia, Mensaje), con el texto de la opción elegida y no su código, y sin las filas vacías. Un endpoint propio (no FormSubmit) recibe el mismo JSON de antes, sin cambios.
- **Espera honesta:**
  - La ruta espera hasta 55 s.
  - En el formulario, a los 6 s, "Enviando tu consulta…" pasa a "Sigue enviándose. A veces tarda hasta un minuto: no cierres esta página."
  - Si se cumplen los 55 s, la respuesta dice "El envío tardó demasiado y no sabemos si llegó. Escribinos por WhatsApp para confirmarlo." No dice que falló, porque no se sabe.
- **Mensajes claros cuando FormSubmit dice que no:**
  - Si pide activación: "El formulario todavía no está activado, así que tu consulta puede demorar en llegarnos. Escribinos por WhatsApp y lo vemos enseguida."
  - Cualquier otro rechazo: "No pudimos enviar la consulta. Probá por WhatsApp."
  - En los dos casos aparece el enlace "Continuar por WhatsApp".
- **Diagnóstico en los logs de Railway:** cada falla deja una línea `[contact] …` con el motivo. Por ejemplo, `[contact] formsubmit.co did not deliver: This form needs Activation…`, un HTTP distinto de 200, o que pasaron los 55 s.
- Se mantienen la validación, el límite de 12 KB, el campo trampa (`company`) y la espera mínima de 2,5 s. No había un límite por IP y no se agregó.

### Cómo se verificó (sin envíos reales)

En `next dev`, un módulo precargado (`NODE_OPTIONS=--import`) intercepta solo los `fetch` a `formsubmit.co`. Registra encabezados y cuerpo, y contesta lo que se le pida. Ninguna consulta salió a FormSubmit.

| Caso | Resultado |
|---|---|
| Sin `CONTACT_FORM_ENDPOINT` | Va a `formsubmit.co/ajax/jpkitro%40gmail.com` con `Origin`, `Referer`, `_url`, `_subject`, `_replyto`, `_template` y `_captcha`. HTTP 200 `{ok: true}`. |
| `CONTACT_FORM_ENDPOINT=https://formsubmit.co/ajax/jpkitro@gmail.com` (el valor de Railway) | Antes: `formsubmit.co/ajax/https%3A%2F%2F…`. Después: `formsubmit.co/ajax/jpkitro@gmail.com`. |
| Endpoint propio (`https://hooks.example.test/contact`) | El mismo JSON de antes, sin encabezados de origen. |
| Valor inválido | 503 "El formulario no está disponible. Escribinos por WhatsApp." y una línea en el log. |
| FormSubmit pide activación | 502 con el mensaje de activación y el motivo en el log. |
| FormSubmit "web server" / HTTP 500 | 502 con el mensaje general y el motivo en el log. |
| FormSubmit no responde en 60 s | 504 a los 55,2 s, "no sabemos si llegó". |
| Campo trampa lleno | 200 sin llamar a FormSubmit. |
| Navegador, 390x844, FormSubmit simulado tarda 10 s | A los 2 s, "Enviando tu consulta…" con el botón deshabilitado. A los 7 s, el aviso de que puede tardar un minuto. A los 12 s, "Consulta enviada…". Los acentos y "¿" llegan bien en el cuerpo. |

`eslint` y `tsc --noEmit` sin errores.

### Qué va a pasar con el primer envío real (para hacerlo con Juani)

1. Publicar esta rama. El valor de `CONTACT_FORM_ENDPOINT` en Railway puede quedar como está o borrarse: los dos llevan a jpkitro@gmail.com.
2. Mandar una consulta de prueba desde https://mayofy.dev ("Prefiero completar un formulario" → "Prefiero que me contacten"). Puede tardar hasta un minuto.
3. Si la casilla no está activada, la pantalla va a mostrar "El formulario todavía no está activado…", y FormSubmit le manda a jpkitro@gmail.com un correo de activación con un botón "Activate Form". **Juani tiene que abrirlo y tocar el botón.** Conviene buscarlo también en Spam y Promociones. Si encuentra un correo de activación viejo de FormSubmit (del 16/11), puede probar con ese.
4. Después de activar, FormSubmit entrega la consulta de prueba guardada y las siguientes llegan directo, con asunto "Nueva consulta desde mayofy.dev: …". Responder a ese correo le contesta a la persona si dejó un correo.
5. Si algo falla, el motivo exacto queda en los logs del servicio `web` de Railway, en las líneas que empiezan con `[contact]`.

FormSubmit también ofrece reemplazar la dirección por un alias aleatorio, para no exponer el correo en la URL. No hace falta, porque la dirección vive solo en el servidor.

### Límites del formulario

- No se pudo confirmar en producción cuál de las causas pesaba más. La dirección mal armada es segura en el código; la activación y la lentitud dependen de FormSubmit.
- FormSubmit es un servicio gratuito sin garantía de entrega ni de velocidad. Si falla seguido, la alternativa es Resend con su clave de API, que Juani prefirió no usar.

## La foto de Juani junto a "Soy Juani"

Pedido de Juani, 22 de noviembre de 2026: "SObre mi foto, usa esta por ahora ( [photo] ) (el avatar lo voy a hacer mas adelante)".

Archivos: `src/components/world/host-island.tsx`, `src/content/site.ts` (`founder.portraitAlt`), las imágenes de `public/images/juani/` y el bloque "Island 6: contact" de `world.css`.

- **Dónde va:** en la primera pantalla de la isla 6, debajo de "Mayofy es la marca. Detrás estoy yo." y al lado de "Soy Juani. Hace 5 años…". Así la foto responde al título: detrás de la marca, una persona.
- **Recorte:** de la foto de 800x800 se recortó un cuadrado de 580 px centrado en la cara, con el pelo entero y el cuello de la camisa. Se exportó en AVIF (calidad 62) y WebP (calidad 82) a 160, 240 y 320 px. Pesan entre 5,6 y 20 KB.
- **Tamaños:** se muestra a 5rem en el celular y a 7rem desde tablet (`sizes`), con `srcset` para pantallas de 1x a 3x. El navegador elige: a 390 px con pantalla 2x carga la de 160 px. Lleva `loading="lazy"`, `width` y `height` fijos (no corre el texto al cargar) y el texto alternativo "Juan Ignacio Portilla Kitroser, fundador de Mayofy".
- **Cómo se integra:** usa el radio del sitio, un borde fino cálido (el tono del fuego) y una sombra doble: la sombra oscura del atardecer y un resplandor bajo de fogata. El verde de las hojas del fondo de la foto ya combina con el musgo de la isla. No está inclinada ni se anima.
- **Verificado** a 320, 390 y 1440 px: la imagen carga, no desborda a lo ancho y no hay errores en la consola (captura `a05`). `eslint`, `tsc --noEmit` y `next build` sin errores.
- La foto entrante (`juani-foto-entrante.png`) se borró de la raíz del repositorio, donde nunca estuvo versionada.
- **Límite:** es una foto provisoria. Cuando exista el avatar, basta con reemplazar los seis archivos de `public/images/juani/` con los mismos nombres o cambiar la ruta en `host-island.tsx`.

Captura `a06`: el aviso "Sigue enviándose…" del formulario, a 390 px. Los scripts del simulador de FormSubmit (`fsmock.mjs`) y de las pruebas del formulario y de la foto están en `contacto-agenda/scripts/`.

## Segunda ronda: la sección compuesta, la agenda compacta y el botón en el celular

Pedido de Juani, 22 de noviembre de 2026:

> "sobre la caja de cal.com: Quiero que despliegues un agente para para mejorar la estetica y simetria de la seccion, como los botones para abrir el formulario y eso. Ademas, no me gusta lo larga que queda la lista de horarios (en desktop me gustaba la version anterior que era compacta), menos en mobile, que podria abrirse con un boton. utiliza /design-taste-frontend"
>
> "A la foto dal lado de "soy juani", alejala un poco"

Archivos: `src/components/world/cal-booking.tsx`, `src/components/world/contact-alternatives.tsx` (nuevo), `src/components/world/host-island.tsx`, `src/content/site.ts` (`scheduling`) y el bloque "Island 6: contact" de `world.css`. Esta ronda reemplaza la vista de columnas de la primera.

### Qué estaba mal

- En escritorio, la columna izquierda era un título corto con mucho vacío debajo, al lado de una agenda de 1.184 px de alto (captura de Juani; `b01` a la izquierda).
- En el celular, la agenda medía 1.495 px: casi dos pantallas de horarios.
- El botón verde de WhatsApp competía con la agenda como acción principal, y "Prefiero completar un formulario" era un enlace suelto debajo de todo.
- La agenda se cargaba con la página, en la primera pantalla: cerca de 1 MB de código de Cal.com, una fuente de 146 KB y llamadas a su API (medición del agente de SEO).

### Qué cambió

1. **Una sola sección compuesta, con una acción principal.**
   - **En el celular**, una columna: el título, el texto y tres pasos ("Elegís un día y un horario." / "Te llega la confirmación por correo, con el enlace a la videollamada." / "Charlamos 30 minutos sobre tu negocio."); después la tarjeta de la agenda; después "¿Preferís escribirnos?", con dos botones secundarios iguales (WhatsApp y "Completar un formulario"); y por último el formulario.
   - **Desde 1.280 px**, el título y los pasos quedan a la izquierda, con el borde de arriba alineado con el del panel de la agenda. El par de botones queda abajo, alineado con el borde de abajo del panel. Así los dos bordes coinciden y el vacío queda en el medio, como aire, no como un hueco.
   - El formulario se abre como un panel de la misma superficie que la agenda, a todo el ancho, debajo de las dos columnas.
   - La única acción llena (menta) es la de la agenda. WhatsApp y el formulario pasan a botones con contorno. El botón flotante de WhatsApp sigue en toda la página.
2. **Agenda compacta en escritorio (desde 1.024 px).** Vuelve la vista de mes de Cal.com (`month_view`): el mes al lado de una columna corta de horarios. El panel mide 700 px y entra entero en 1366x768.
   - La columna de horarios scrollea solo con el puntero encima, y en sus extremos le devuelve la rueda a la página.
   - Medido con muescas de 100 px cada 250 ms: sobre los horarios, las primeras 7 muescas recorren la lista (lo que le falta del día) y desde la octava la página baja 100 px por muesca. Sobre el mes y sobre la columna izquierda, la página se mueve desde la primera muesca. Igual a 1366x768 y a 1440x900.
   - Las primeras 7 muescas sobre la lista no mueven la página: es el precio de la versión compacta que pidió Juani, acotado a esa columna.
3. **En el celular y la tablet (menos de 1.024 px), la agenda se abre con un botón.** La tarjeta muestra "Elegí un día y un horario", "Los horarios se muestran en tu hora local.", el botón "Ver días y horarios" y el enlace de respaldo. El botón abre la ventana de Cal.com a pantalla completa (`Cal("modal")`), con los mismos colores. Mientras está abierta, la página de atrás no se mueve. Al cerrarla (con la ×), la página vuelve a scrollear normal: un deslizamiento después de cerrar movió 824 px. La tarjeta es HTML común, sin scroll propio, y los deslizamientos que empiezan sobre ella mueven la página en los dos sentidos.
4. **Cal.com ya no carga con la página.**
   - **En escritorio** arranca cuando la agenda está a 1,5 pantallas de entrar (`IntersectionObserver` con `rootMargin: 150%`). Medido: cero pedidos a Cal.com con la agenda a 2,5 pantallas o más del borde de arriba, y empieza a cargar entre 2,5 y 2 pantallas.
   - **En el celular** carga recién al tocar el botón: cero pedidos aunque la tarjeta esté en pantalla, y unos 435 KB al abrir la ventana.
   - Mientras carga en escritorio, queda el esqueleto (mes y horarios) con "Cargando la agenda…", con la misma altura que el calendario, así que nada se corre.
   - El temporizador de 15 s para mostrar el error arranca cuando empieza la carga, no al abrir la página.
   - Si el script no carga, si Cal.com avisa error o si pasan 15 s, aparece "La agenda no cargó…" con el botón "Abrir la agenda en Cal.com", en escritorio y en el celular.
5. **El modo (en línea o botón) lo decide el CSS** (`64rem`), y el código usa la misma media query para saber qué cargar. Así no hay un parpadeo entre la tarjeta y el calendario al hidratar.
6. **El enlace de respaldo** ("Si la agenda no carga, abrila en Cal.com") pasó al pie del panel, para que el borde de abajo de la agenda sea el del panel.

### Idioma y formato de 24 h (punto 4 del pedido)

- **Idioma:** Cal.com muestra la agenda en el idioma del navegador de quien la mira. Por eso Juani la vio en inglés ("November", "MON", "Mon 23rd") y en esta prueba, con el navegador en español, sale en español.
  - Se probaron, en un navegador en inglés, los parámetros `lng=es`, `locale=es` y `ui.locale=es`: ninguno cambia nada.
  - Lo que lo fija es una opción del tipo de evento en la cuenta de Cal.com. La API de Cal.com la documenta como `interfaceLanguage` ("Set preferred language for the booking interface", https://cal.com/docs/api-reference/v2/event-types/create-an-event-type), con las opciones `es` y `es-419`.
  - **Juani tiene que entrar al evento "Mayofy First Meeting" en Cal.com y, en la configuración avanzada, elegir Español en el idioma de la interfaz.** En la misma pantalla puede cambiar el título del evento.
- **24 horas:** no hay ningún parámetro del embed que lo fije (`timeFormat=24` tampoco cambia nada). La agenda trae el selector "12 h / 24h" a la vista y recuerda lo que elige cada visitante. No se encontró una opción del evento que lo fije para todos.

### Cómo se verificó

Playwright con Chromium headless contra `next dev`. Los scripts de esta ronda están en `contacto-agenda/scripts/`: `wheel2.cjs`, `lazy.cjs`, `checks2.cjs`, `fail2.cjs` y `cardflick.cjs`.

- **Anchos** 320, 390, 768, 1024, 1280, 1366 y 1440: sin desborde horizontal.
  - En escritorio, el panel y la columna izquierda comparten el borde de arriba y el de abajo (por ejemplo, a 1366: arriba 14.083 los dos, abajo 14.783 los dos).
  - Los bordes laterales son 16 px en el celular y 80 px en escritorio.
  - El iframe mide 814 px a 1.280 y 822 px desde 1.366, siempre en la vista compacta.
- **Teclado:** desde el botón de WhatsApp, Tab va al botón del formulario. Con el formulario cerrado, Tab lo saltea (`inert`). Enter lo abre (`aria-expanded="true"`), y Tab entra al primer campo.
- **Toques:** los botones miden de 44 a 53 px de alto.
- **Movimiento reducido** (`prefers-reduced-motion`): el formulario se abre sin animación y el esqueleto no respira.
- **Estados de falla:** script bloqueado en escritorio y en el celular → error al instante. Iframe bloqueado → "Cargando la agenda…" y, a los 15 s, el error. Script demorado 8 s → esqueleto con la línea de carga (captura `b05`).
- **Consola:** cero errores en todos los anchos.
- `eslint`, `tsc --noEmit` y `next build` sin errores.
- En una corrida a 1.024 px, la agenda quedó sin cargar. No se repitió en tres corridas seguidas: probablemente fue una recarga del servidor de desarrollo, que coincidió con el cambio de las imágenes.
- No se reservó ningún turno ni se envió el formulario.

Capturas en `docs/plans/contacto-agenda/`:

- `b01`: escritorio, antes y después.
- `b02`: escritorio a 1366.
- `b03`: celular antes, la tarjeta nueva y la ventana de Cal.com.
- `b04`: el formulario abierto.
- `b05`: carga y error.
- `b06` y `b07`: la foto.

### La foto, un poco más lejos

Se volvió a recortar desde la foto original de 800x800, recuperada de los adjuntos de Orca porque no estaba en git. El recorte pasó de 580 a 720 px de lado: se ve más de los hombros y de las hojas alrededor, con la cara todavía centrada (`b06` y `b07`). Se mantienen los mismos seis archivos y tamaños (160, 240 y 320 px, en AVIF y WebP), de 6 a 26 KB.

### Límites de esta ronda

- En escritorio, la lista de horarios scrollea adentro antes de devolverle la rueda a la página: hasta 7 muescas con un día completo.
- Al cerrar la ventana de Cal.com en el celular, el foco lo maneja Cal.com y no vuelve al botón "Ver días y horarios".
- El idioma y el formato de horas dependen de la cuenta de Cal.com o del navegador (ver arriba).
- El acomodo por secciones (`section-snap.tsx`) es de otro agente. En las mediciones sobre el mes, después de la tercera muesca, se ve el acomodo terminando de llevar la página.

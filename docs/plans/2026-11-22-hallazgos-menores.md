# Hallazgos menores de la prueba de usuario: arreglos

Pedido de Juani, 22 de noviembre de 2026: "Despliega un agente dedicado a arreglar todos esos hallazgos menores".

Base: `docs/plans/2026-11-20-prueba-usuario.md` (Marta, 54 años, peluquería). Rama `juanikitro/landing-hallazgos-menores`, desde `d03a311`. Este trabajo cubre la jerga (M4), los elementos fijos (M5), la isla 4 en laptops bajas (M6), el mensaje de WhatsApp (M7) y los hallazgos medios y bajos que no son del scroll, de la caja de Cal.com ni de la rotación de la isla 2.

## Resumen

- **WhatsApp:** el mensaje ya no llega con "�". Los enlaces van directo a `api.whatsapp.com/send` y el mensaje del héroe y del botón flotante ya no lleva el 👋.
- **Isla 4 en 1366x768 y 1280x720:** la frase de abajo del título ya no queda tapada por los cartelitos ni por el dibujo.
- **Celular:** el botón verde y la barra de patitas ya no tapan campos del formulario ni horarios de la agenda. Con la misma pasada de deslizamientos, los choques bajaron de 11-12 a 0.
- **Patitas:** cada una es un botón de 44 px. Al llegar a una isla nueva, su nombre aparece 2,5 s arriba de la patita.
- **Palabras:** se cambiaron 43 textos con jerga por palabras de todos los días. "Reunión de diagnóstico" pasa a ser "charla gratis". La lista completa está abajo para que Juani la revise.
- **Precio:** debajo de cada precio de los packs dice "Se puede pagar en pesos. El mantenimiento mensual es opcional."

## Qué cambió y cómo funciona

### 1. Mensaje de WhatsApp (M7)

- **Causa (verificada con `curl`):** `wa.me` responde con un 302 a `api.whatsapp.com/send/` y, al reescribir el texto, cambia todo carácter de 4 bytes (todos los emojis) por `%EF%BF%BD`. Las tildes llegan bien (`Gesti%C3%B3n` sobrevive).
- **Arreglo:**
  - `src/lib/whatsapp.ts` arma `https://api.whatsapp.com/send?phone=…&text=…`. Esa página responde 200, sin desvío, y su enlace a WhatsApp Web conserva el texto tal cual.
  - Además, el mensaje por defecto y `siteContent.hero.primaryMessage` ya no llevan 👋.
  - Las dos cosas juntas cubren también lo que la persona escribe en el formulario: un emoji ahí antes también se rompía.

### 2. Isla 4 en laptops bajas (M6)

- **Causa:** la isla se dibuja según el ancho de la pantalla. En una pantalla ancha y baja sube, y sus cartelitos quedan encima de la frase, que está a una altura fija.
- **Arreglo:** solo CSS, en el bloque "Minor findings" al final de `src/app/world.css`. Con 800 px de alto o menos (y más de 768 px de ancho):
  - el título se achica según la altura (`min(…, 6.2svh)`);
  - el texto sube 1rem;
  - la isla baja 4svh (`--workshop-y: 0svh`).
- No se tocó `workshop-controller.tsx`.

| Pantalla | Antes (frase, en px desde arriba) | Antes, la tapa | Después (frase) | Cartel más alto que cruza la frase |
|---|---|---|---|---|
| 1366x768 | 310-337 | "Seguimiento automático" (311) | 212-239 | "Sistema a medida", 268 |
| 1280x720 | 310-337 | "Más consultas" y "Seguimiento automático" | 206-233 | "Sistema a medida", 249 |
| 1280x800 | — | — | 216-243 | 329 |
| 1024x768 | — | — | 262-316 | 382 |
| 1440x900 y 1536x864 | sin choque | — | sin cambios (fuera de la regla) | — |

Capturas: `hallazgos-menores/h01_laptop_isla4_antes.jpg` y `h02_laptop_isla4_despues.jpg`.

### 3. Botón verde y patitas en el celular (M5)

En `src/components/world/island-progress.tsx` y en `world.css`:

- **Botón verde flotante:**
  - Se esconde en la isla 6 (contacto), que ya tiene sus propios botones de WhatsApp.
  - También se esconde mientras la agenda (`#agenda`) o el formulario (`.contact-form`) están en pantalla, y mientras hay un campo con foco.
- **Barra de patitas:**
  - En el celular se esconde mientras la agenda o el formulario están en pantalla, o hay un campo con foco (el teclado está abierto).
  - Escondida no recibe toques ni foco (`visibility: hidden`).
- **Campos del formulario:** tienen `scroll-margin-block`, así que el navegador los deja lejos de la píldora cuando los acomoda al enfocarlos.
- **Nombre de la isla:** al llegar a una isla nueva, su patita muestra el nombre durante 2,5 s, solo en el celular (en la laptop ya aparece al pasar el mouse). Con movimiento reducido aparece sin animación.

Medido con deslizamientos reales por CDP (`Input.dispatchTouchEvent`, con inercia), formulario abierto, 16 paradas desde el final de Trabajos hasta Preguntas:

| | En vivo (`mayofy.dev`, antes) | Esta rama |
|---|---|---|
| 360x800: elementos fijos sobre un campo o la agenda | 11 | 0 |
| 390x844: elementos fijos sobre un campo o la agenda | 12 | 0 |
| 360x800, escribiendo en "¿Dónde querés que te respondamos?" | botón sobre "referencia", barra sobre "Contanos" | nada visible encima |
| Campos tapados al enfocarlos uno por uno (360x800) | 2 de 9 | 0 de 9 |

Capturas: `h03_celular_formulario_antes.jpg` (en vivo) y `h04_celular_formulario_despues.jpg`.

**Píldora "Mayofy / Agendá" al llegar por un enlace:** en esta rama, "Agendá" deja la agenda a 80 px y "Ver qué incluye" deja la tarjeta del pack a 80 px, con la píldora terminando en 67 px. No queda nada abajo de la píldora. Lo de `c14` pasa mientras se scrollea o después de un acomodo, que es del agente de scroll.

### 4. Botones chicos (L3) y letra chica (L4)

| Elemento | Antes | Después |
|---|---|---|
| Patitas | 32x32 | 44x44 (el círculo sigue de 32; el resto es margen que también se puede tocar) |
| Enlace "Mayofy" de la píldora | 67x26 | 67x44 |
| Rayitas de los seis pasos | 30x44 | 44x44 |
| "Ver los dos niveles" y demás desplegables | 40 de alto | 44 de alto |
| Propuesta de la isla 2, celular | 11,5 a 13,6 px | 12,8 a 15,2 px |
| Propuesta de la isla 2, laptop (versión fija sobre la isla) | 11,5 a 13,6 px | 12,8 a 14 px |
| "Te conviene empezar por" | 12 px | 12,8 px |

En la laptop, la barra de patitas mide 316 px de alto (antes 270); en el celular, 316x44 (antes 270x45). Entra en 320 px de ancho sin desbordar.

### 5. Precio (L2)

`commercialIntro.priceNote` aparece debajo de cada precio, adentro del encabezado de la tarjeta, así que no mueve la grilla: "Se puede pagar en pesos. El mantenimiento mensual es opcional." La línea de pago de abajo de los packs no cambia.

## Palabras: antes y después (M4)

Para que Juani revise. Todo está en `src/content/*`, salvo las dos últimas filas.

| Dónde | Antes | Después |
|---|---|---|
| Héroe, botón | Agendá tu diagnóstico gratis | Agendá una charla gratis |
| Héroe, mensaje de WhatsApp | 👋 Hola Juani, quiero trabajar con Mayofy... | Hola Juani, quiero trabajar con Mayofy... |
| Seis pasos, paso 1 | Reunión de diagnóstico gratis | Charla gratis de 30 minutos |
| Isla 4, sistema a medida | Paneles de gestión | Un panel con todo |
| Isla 4, sistema a medida | Usuarios con roles y permisos | Cada uno ve lo que le toca |
| Contacto, Juani | desde la reunión de diagnóstico hasta la publicación | desde la primera charla hasta la publicación |
| Contacto, título | Empecemos por una reunión de diagnóstico *gratis*. | Empecemos por una charla *gratis*. |
| Isla 3, bajada | …se definen después de una reunión de diagnóstico gratis. | …el precio final se definen después de una charla gratis. |
| Trabajos, título | Nuestra siembra, *tus resultados*. | Trabajos que ya *están andando*. |
| Trabajos, bajada | Un sistema a medida, una landing y una web personal, funcionando. Los casos completos se suman a medida que avanzan. | Un sistema con agenda para lavaderos, una página para una consignataria y una web personal. Se suman más a medida que terminan. |
| Trabajo 01, resumen | Plataforma para que lavaderos y negocios de detailing gestionen clientes, servicios y la operación del día a día. | Sistema para que lavaderos de autos manejen clientes, servicios y la agenda del día. |
| Trabajo 02, título | Landing para una consignataria de hacienda | Página para una consignataria de hacienda |
| Trabajo 03, título | Portfolio de un desarrollador | Web personal de un programador |
| Packs, título | Tres packs. Desde una landing hasta tu propio sistema. | Tres packs. De una página simple a tu propio sistema. |
| Packs, bajada | …la inversión final se definen después de una reunión de diagnóstico gratis. | …el precio final se definen después de una charla gratis. |
| Landing, nota | El dominio, el hosting y los servicios externos se abonan por separado. | La dirección web, el alojamiento y otros servicios se pagan aparte. |
| Landing, botón | Quiero mi landing | Quiero mi página |
| Web + Gestión, se cotiza aparte | Usuarios con distintos roles y permisos. | Un acceso distinto para cada empleado. |
| Sistema a Medida, incluye | Usuarios con roles y permisos. | Cada uno ve lo que le toca. |
| Sistema a Medida, incluye | Paneles con la información que necesitás para decidir. | Pantallas con la información que necesitás para decidir. |
| Sistema a Medida, nota | …la inversión final se definen después de la reunión de diagnóstico. | …el precio final se definen después de la primera charla. |
| Bot, mensual | USD 30 por mes por hosting, monitoreo y ajustes menores. | USD 30 por mes: alojamiento, control y ajustes menores. |
| Garantías, sello | Código y dominio tuyos | Todo queda a tu nombre |
| Garantías, sello | SEO técnico desde el primer día | Lista para aparecer en Google |
| Garantías, sello | Rondas de revisión acordadas | Vueltas de cambios pactadas |
| Garantías, lista | El código y el dominio son tuyos. | La web y su dirección son tuyas. |
| Garantías, lista | Carga rápida en el celular, medida con Core Web Vitals. Si no pasa, la corregimos sin costo. | Carga rápida en el celular, medida con la prueba de Google. Si no pasa, la corregimos gratis. |
| Garantías, lista | SEO técnico desde el primer día. | Lista para aparecer en Google desde el primer día. |
| Garantías, lista | Rondas de revisión acordadas antes de empezar. | Las vueltas de cambios se pactan antes de empezar. |
| Automatizaciones | Landings para campañas específicas. | Páginas para una promoción puntual. |
| Automatizaciones | Meta Pixel y Google Ads. | Medir tus anuncios en redes y Google. |
| Automatizaciones | Google Business Profile y SEO local. | Aparecer en Google Maps de tu zona. |
| Automatizaciones | Cotizadores interactivos. | Presupuestos al instante. |
| Automatizaciones | Envío de contactos a Google Sheets. | Consultas guardadas en una planilla. |
| Automatizaciones | Integración con CRM. | Lista de clientes ordenada. |
| Automatizaciones | Notificaciones por correo. | Avisos por correo. |
| Preguntas | Como referencia: una landing, de 1 a 2 semanas; una web con turnos y panel de gestión… | Como referencia: el pack Landing, de 1 a 2 semanas; una web con turnos y panel… |
| Preguntas | …después de la reunión de diagnóstico te mandamos… | …después de la charla te mandamos… |
| Preguntas | ¿Qué pasa en la reunión de diagnóstico? / Es una charla gratuita y sin compromiso… | ¿Qué pasa en la charla gratis? / Es una videollamada de 30 minutos, sin compromiso… |
| Preguntas | ¿Se encargan del hosting y el dominio? / …El costo del dominio y del hosting se paga aparte, y tanto el dominio como el código son tuyos. | ¿Se ocupan del dominio y el alojamiento? / …El dominio (tu dirección, como tunegocio.com) y el alojamiento se pagan aparte, y los dos quedan a tu nombre, igual que el código. |
| Preguntas | Cuesta USD 50 por mes para una landing… | Cuesta USD 50 por mes para el pack Landing… |
| Metadatos (`layout.tsx`) | …Empezamos con una reunión de diagnóstico gratis. / Reunión de diagnóstico gratis. | …Empezamos con una charla gratis. / Charla gratis. |
| Privacidad | al reservar la reunión de diagnóstico en Cal.com | al reservar la charla en Cal.com |

Notas sobre la lista:

- **Largo:** casi todos los cambios tienen el mismo largo o son más cortos. Son más largos cuando hacía falta explicar la palabra: el dominio en Preguntas, "Medir tus anuncios en redes y Google", "Lista de clientes ordenada" y la garantía de Google en la lista.
- **"Charla de 30 minutos":** sale del paso 1 aprobado ("Charlamos 30 minutos sobre tu negocio…").
- **"Agenda del día" de los lavaderos:** sale del texto alternativo de la captura real del panel de ShineApp ("la agenda del día"). Con eso, la bajada de Trabajos le dice a Marta que hay un caso con turnos (L1), sin inventar nada.
- **`siteContent.hero.body`:** no se muestra (Juani lo sacó del héroe el 20/11). Solo se cambió "reunión de diagnóstico" por "charla gratis" para que quede coherente si se reutiliza.

### Sugerencias sin aplicar (copy de la isla 2, que es del coordinador)

El coordinador avisó que Juani reescribió hoy la isla 2. Estas quedan como sugerencias:

- `case-picker.ts`, `bookingCta`: "Agendá tu diagnóstico" → "Agendá una charla gratis". Hoy es el único lugar del sitio que todavía dice "diagnóstico".
- `case-picker.ts`, módulo de la propuesta: "Disponibilidad offline" → "Anda sin internet".
- Pack Landing: el nombre "Landing" se queda porque es el nombre del pack (lo usan los mensajes, el formulario y Preguntas). Si Juani quiere una bajada, conviene un campo nuevo y no `eyebrow`, porque `eyebrow` marca la tarjeta como destacada (`pack--featured`).

## Lo que quedó sin hacer, y por qué

| Hallazgo | Por qué no |
|---|---|
| M3: bajada del héroe con comprador y dato ("Desde USD 85"), y "WhatsApp" escrito junto al ícono | El 20/11 Juani sacó a propósito la bajada del héroe y eligió el botón de WhatsApp solo con ícono. Es una decisión de producto. Propuesta: volver a mostrar `hero.body` con "Hacemos páginas web, turnos online y sistemas a medida para negocios y comercios. Desde USD 85." y escribir "WhatsApp" al lado del ícono. |
| M4: "El invernadero", "La maceta", "La caja de herramientas", "El engranaje" (isla 4) | Nombran los objetos pintados a los que apunta cada tarjeta (maqueta aprobada). Quedan para que Juani decida. |
| M4: "Mayofy First Meeting", "Cal Video", "12 h / 24hs", am/pm | Es la configuración del evento en Cal.com (cuenta de Juani) y del agente de contacto. |
| M4: "¿Qué tecnologías usan?" (Next.js, Django…) | Es la respuesta técnica a una pregunta técnica, para quien la busca. |
| L3: "Privacidad" en el formulario (16 px) y L4: ayudas del formulario (12,8 px) | Son del formulario, que es del agente de contacto. |
| L5: tirones con 4G lento | Hay que investigarlos aparte (sobre todo el armado de las rocas). Este trabajo no agrega peso: una regla de CSS y dos observadores. |
| L6: íconos de garantías cada 1 s y rocas que flotan | Lo pidió Juani explícitamente (garantías a 1 s, ya publicado). |
| L7, M1, M2: teclado, acomodo y tramos fijados | Son del agente de scroll. |

## Verificación

- **Navegador:** Chromium 1248 por Playwright (`playwright-core`), contra `next dev` en el puerto 3017, con los scripts de la prueba de usuario (`lib.cjs`) adaptados.
- **Isla 4:** posiciones medidas de la frase y de los cartelitos a 1366x768, 1280x720, 1280x800, 1024x768, 1440x900 y 1536x864, antes y después.
- **Celular, 360x800 y 390x844 (`isMobile`, `hasTouch`):**
  - 16 deslizamientos con inercia real (CDP) desde Trabajos hasta Preguntas, contra `mayofy.dev` y contra esta rama;
  - toque en el campo y escritura con el teclado;
  - campos enfocados uno por uno;
  - sin desborde horizontal y sin errores de consola.
- **Movimiento reducido** (`prefers-reduced-motion: reduce`): el nombre de la isla aparece con opacidad 1 y transición de 0 s.
- **Teclado** (1440x900):
  - el orden de Tab es: saltar al contenido, píldora, las 7 patitas, héroe…;
  - cada patita mide 44x44 y tiene anillo de foco visible;
  - la barra escondida usa `visibility: hidden`, así que no se le puede dar foco (por diseño; no se probó con Tab).
- **Laptop 1366x768:** la propuesta de la isla 2 armada entera entra arriba de la isla con la letra nueva.
- **WhatsApp:** `curl` con agentes de Android y de escritorio.
  - El enlace del héroe responde 200, sin desvío, y conserva "Hola Juani, quiero trabajar con Mayofy...".
  - Un texto de formulario con emoji ("Hola 😀 Peluquería Marta") llega intacto al enlace de WhatsApp Web.
- **Calidad:** `npm run lint`, `npm run typecheck` y `next build`, sin errores.

## Límites

- **WhatsApp en un teléfono real:** no se probó en un teléfono con WhatsApp instalado. En Android la app puede abrir el enlace sin pasar por la web; como el mensaje ya no lleva emoji, el texto por defecto llega bien por cualquier camino.
- **Navegador emulado:** el celular es Chromium emulado. `:has()` necesita Chrome 105+ o Safari 15.4+; en un navegador más viejo la barra no se esconde al escribir, pero el observador del formulario sigue funcionando.
- **Indicador de Next:** las capturas "después" muestran el botón "N" de desarrollo de Next (abajo a la izquierda), que no aparece en producción.
- **Nombre de la isla:** también aparece cuando un acomodo automático cambia de isla. Dura 2,5 s y no se anuncia al lector de pantalla, que ya tiene `aria-current`.
- **Isla 2 durante la prueba:** las medidas de la isla 2 son de antes de la reescritura de Juani que aplicó el coordinador. Si "Tu propuesta" ya no existe, esa regla no hace nada.

## Evidencia

En `docs/plans/hallazgos-menores/`:

| Archivo | Qué muestra |
|---|---|
| `h01_laptop_isla4_antes.jpg` | 1366x768: "Seguimiento automático" sobre la frase |
| `h02_laptop_isla4_despues.jpg` | 1366x768: frase libre |
| `h03_celular_formulario_antes.jpg` | En vivo, 360x800, escribiendo: el botón verde y la barra sobre los campos |
| `h04_celular_formulario_despues.jpg` | Esta rama, mismo momento: nada encima |
| `h05_celular_patitas_y_nombre.jpg` | Patitas de 44 px, el nombre "Trabajos" al llegar, y las rayitas de 44 px de los seis pasos |
| `h06_laptop_propuesta_letra.jpg` | 1366x768: la propuesta de la isla 2 con la letra nueva |

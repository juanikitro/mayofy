# Propuesta de texto por isla

**Fecha:** 16 de noviembre de 2026
**Estado:** aprobado por Juani el 16 de noviembre de 2026 con sus propias correcciones en esta tabla ("apruebo como esta ahora, igual puede cambiar mas adelante"). Implementado en `src/content/islands.ts`.
**Regla:** la sustancia comercial (precios, plazos, packs, garantías, FAQ) no cambia. Solo se reescriben títulos y entradas para acompañar el recorrido y se acorta el texto. Mayo no habla.

La palabra en cursiva es la que va en Fraunces.

| #   | Isla                   | Título actual                                             | Título propuesto                                                                     | Entrada propuesta                                                                                                                             |
| --- | ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Prado del amanecer     | Webs que venden. Sistemas que ordenan.                    | *Sin cambios* (promesa aprobada)                                                     | Diseñamos landings, webs con turnos y sistemas a medida para negocios de servicios. Empezamos con una reunión de diagnóstico gratis.          |
| 2   | Rocas sueltas          | Ya te están mirando. / La página decide qué pasa después. | Construyamos tu lugar en *internet*                                                  | Instagram, Google Maps y recomendaciones ya te traen gente. Sin una página propia, cada consulta queda suelta, como estas rocas.              |
| 3   | Las rocas se ensamblan | Tres packs. Desde una landing hasta tu propio sistema.    | Encontramos lo que necesita *tu negocio*.                                            | Precios de referencia para saber por dónde arrancar. El alcance y la inversión final se definen después de una reunión de diagnóstico gratis. |
| 4   | Taller o invernadero   | Cuando una planilla ya no alcanza.                        | Desde una web memorable para *impactar,* hasta un sistema a medida para *optimizar*. | Construimos el software que tu operación necesita, sin convertir la tecnología en protagonista.                                               |
| 5   | Jardín de trabajos     | Primero, el trabajo.                                      | Nuestra siembra, *tus resultados*.                                                   | Un sistema a medida, una landing y una web personal, funcionando. Los casos completos se suman a medida que avanzan.                          |
| 6   | Isla de las preguntas  | Antes de escribir.                                        | Algunos detalles.                                                                    | Lo importante, sin letra chica ni respuestas de agencia.                                                                                      |
| 7   | Isla de Juani          | Mayofy es la marca. Detrás estoy yo.                      | Mayofy es la marca. Detrás *estoy yo*.                                               | Soy Juani. Hace 5 años construyo software \[...\] (se mantiene).                                                                              |

Bloques secundarios:

- Isla 5, proceso: "Un proceso claro. Seis movimientos." → "Seis pasos, sin *sorpresas*."
- Isla 7, contacto: "Empecemos por una reunión de diagnóstico gratis." → se mantiene.

Los títulos y entradas viven en `src/content/islands.ts` (segmentos con `{ em }` para la palabra en Fraunces). Para cambiarlos más adelante se edita ese archivo; la sustancia comercial sigue en `commercial-plans.ts`, `projects.ts` y `site.ts`.

## Cambios del 20 de noviembre de 2026 (pedido de Juani)

- Navegación: el botón dice "Agendá" (antes "Agendá tu diagnóstico").
- Hero: se quitaron la bajada "Estudio de desarrollo web y software a medida" y el párrafo "Diseñamos landings, webs con turnos y sistemas a medida..."; quedan la promesa y los botones.
- Isla 2: se quitaron las etiquetas Instagram, Google Maps y Recomendaciones.
- Isla 3: se quitó "Precios de referencia para saber por dónde arrancar...".
- Los textos siguen en src/content por si se reutilizan (metadatos, otras páginas).

## Cambios del 22 de noviembre (pedido de Juani)

### Aplicados

- **Título de la isla 2:** "Construyamos tu lugar en *internet*" pasó a "Construimos lo que *necesitás*." Ojo: queda parecido al título de la isla 3, "Encontramos lo que necesita *tu negocio*".
- **Textos eliminados de la isla 2:**
  - la bajada "Cada pregunta que hoy respondés a mano se convierte en una pieza de tu sistema.";
  - "Elegí lo que más se parece y te mostramos por dónde empezar." (queda solo "¿Qué te está pasando hoy?");
  - "Tu propuesta" en la tarjeta del sistema de gestión.
- **Tercer caso:** "Mi operación vive en planillas y ya no alcanza." pasó a "Mi negocio vive en Excel, WhatsApp y mi cerebro."
- **"Te conviene empezar por":** el plazo ahora dice "Plazo: 1 a 2 semanas", y así en cada pack.

### Propuesta A: mensajes para la animación del sistema de gestión

La animación tiene lugar para cuatro piezas. Cada una nace de una pregunta que hoy se responde a mano, y todas se apoyan en lo que los packs ofrecen de verdad.

**Recomendadas:**

| Pregunta del cliente | Pieza | Qué hace |
|---|---|---|
| ¿Hay lugar el sábado? | Turnos online | Tus clientes eligen día y hora solos. |
| ¿Me pasás los precios? | Respuestas por WhatsApp | Contesta precios y horarios aunque estés ocupado. |
| ¿Cuánto te debo? | Cuentas y cobros | Sabés quién pagó y quién te debe. |
| ¿Cómo vino el mes? | Tus números | Ventas y ganancias del mes, de un vistazo. |

**De reserva**, según el rubro:

| Pregunta del cliente | Pieza | Qué hace |
|---|---|---|
| ¿Te queda en stock? | Stock | Sabés qué hay y qué falta antes de vender. |
| ¿Quién atendió a este cliente? | Equipo | Cada uno ve y hace solo lo suyo. |

**Tarjeta base:** "Sistema de gestión: Clientes, turnos y cobros en un solo lugar."
**Cierre:** se mantiene "Un solo sistema, armado a tu medida."

Se va "Disponibilidad offline": es abstracta para alguien que no es técnico y no es lo que la convence.

### Propuesta B: qué se puede hacer con cada servicio (recomendación de la isla 2)

| Pack | Texto propuesto |
|---|---|
| Landing | Una página con tu negocio, tus servicios y un botón de WhatsApp, para que quien te busca en Google o Instagram te escriba directo. |
| Web + Gestión | Tu página más una agenda online: tus clientes sacan turno solos, a cualquier hora, y vos ves todo desde un panel. |
| Sistema a Medida | Pasamos tus planillas, tus chats y lo que tenés en la cabeza a un sistema propio: clientes, stock, cobros y números en un solo lugar. |

Hoy la isla 2 muestra la misma descripción que las tarjetas de packs (`commercial-plans.ts`). Si se aprueba, conviene que sea un texto propio de la isla 2, así las tarjetas de packs no cambian.

## Cambios del 22 de noviembre, segunda tanda (aplicados)

- **Tarjeta base de la animación:**
  - "Sistema de gestión" → "Tu solución digital";
  - "Clientes, ventas y turnos en un solo panel." → "Lo que tu negocio necesite.".
- **Piezas de la animación (seis):** "¿Me pasás los precios?" → Bot de WhatsApp, turnos, stock, "¿Cuánto te debo?" → Cuentas y cobros, "¿Cómo vino el mes?" → Tus números, y modo sin conexión.
- **Preguntas flotantes:** cada pregunta aparece justo antes de volar a su pieza, así nunca hay dos quietas encimadas ("no quiero solapar mensajes quietos").
- **Título de la isla 3:** "Encontramos lo que necesita *tu negocio*." → "Elegí por dónde *empezamos*.".
- **Recomendación de la isla 2:** cada situación tiene ahora su propio texto (campo `pitch` en `case-picker.ts`), con el texto exacto de Juani. Las tarjetas de packs conservan su descripción.
- **Packs:** la definición de los packs se rehace en una sesión aparte con Juani (`docs/plans/2026-11-22-packs.md`). El texto de "Web + Gestión" puede cambiar según lo que salga de ahí.

## Isla 4, 23 de noviembre (aplicado)

Pedido de Juani: "Cambiaria los copies de la seccion 'Sistemas y automatizaciones a medida' ya que parecen muy de IA. Le quitaria lo que dice 'El invernadero', 'La maceta' y eso."

- **Etiquetas de objeto:** "01 · El invernadero", "02 · La maceta" y las demás se quitaron. Quedan los carteles cortos sobre la isla.
- **Bajada:** "Lo que tu operación necesita, sin convertir la tecnología en protagonista." → "Un sistema completo o una sola tarea que hoy hacés a mano. Lo armamos para cómo trabajás vos."
- **Tarjetas:** el texto ahora está en `src/content/workshop.ts`, propio de la isla 4. Las tarjetas de packs no cambian.
  - **"Un sistema a medida" → "Tu propio sistema"**
    - Turnos y reservas online.
    - Clientes, ventas y cobros en un solo panel.
    - Cada persona del equipo ve lo suyo.
    - Conectado con lo que ya usás: planillas, facturación o pagos.
  - **"Conseguí más consultas" → "Que te encuentren más"**
    - Una página para cada promoción.
    - Una página por servicio o por zona.
    - Saber qué anuncios te traen clientes.
    - Aparecer en Google Maps de tu zona.
    - Tu página en otros idiomas.
  - **"Simplificá el contacto" → "Que te escriban más fácil"**
    - Formularios que piden solo lo necesario.
    - Presupuestos que se calculan solos.
    - Cobro de señas online.
    - Un catálogo de lo que vendés o hacés.
  - **"Automatizá el seguimiento" → "Que no se te escape ninguna consulta"**
    - Cada consulta queda guardada en una planilla.
    - Tu lista de clientes, ordenada.
    - Un aviso por mail cuando entra algo nuevo.
    - Respuestas automáticas.
    - Saber en qué quedó cada consulta.

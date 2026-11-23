# Privacidad y legales (2026-11-23)

Rama: `juanikitro/landing-legales` (desde `juanikitro/landing-redesign`, con el merge de analytics `1e75cda`).

> No es asesoramiento legal. Se redactó con fuentes oficiales y queda marcado qué conviene que revise un abogado antes de darlo por cerrado.

## Pedido

Juani (2026-11-23): "Desplega un agente especializado en el punto de privacidad y legales. Que me hagan las preguntas que deba hacerme y resuelva todo lo que pueda. SObre el permiso escrito de los clientes para mostrar sus datos, los tenemos asi que no te preocupes".

## Qué hace el sitio con los datos (auditoría del 2026-11-23)

Se auditó mayofy.dev en vivo con Playwright y se revisó el código.

| Flujo | Qué viaja | A quién | Dónde |
| --- | --- | --- | --- |
| Formulario de contacto | Los campos del formulario | `/api/contact` (Railway) → FormSubmit → Gmail de Juani | EE. UU. |
| Agenda (Cal.com embebido) | Nombre, correo, notas y horario | Cal.com; el iframe usa Cloudflare (cookie `__cf_bm`) y reporta errores a Sentry (`o574544.ingest.us.sentry.io`) | EE. UU. |
| Google Analytics 4 | Páginas, eventos del embudo, dispositivo, ubicación aproximada | Google (`googletagmanager.com`, `google-analytics.com`); cookies `_ga` y `_ga_F2DHJCS51K` (2 años) | EE. UU. y otros |
| WhatsApp, Instagram, LinkedIn | Nada hasta que la persona toca el enlace | Meta / LinkedIn | — |
| Alojamiento | IP y navegador en los registros del servidor | Railway | EE. UU. |
| Tipografías e imágenes | — | Servidas desde el propio sitio (`next/font` las descarga en el build) | — |
| Almacenamiento local | `mayofy:analytics-off` (solo si la persona apaga la medición) y `mayofy:internal` (solo en los navegadores de Juani, `?interno=1`) | Navegador | — |

El DNS de mayofy.dev está en Vercel, pero Vercel no recibe datos de las visitas.

## Decisiones

1. **Sin banner de cookies.** Juani: "no pongamos banners y pone la politica clara".
   - **Por qué alcanza:** en Argentina ninguna norma pide un banner. La Ley 25.326 exige informar y pedir consentimiento para los datos personales, y no encontramos criterios oficiales de la AAIP sobre cookies. El GDPR no se aplica, porque el sitio no apunta a la UE.
   - **Qué se hizo en su lugar:** una política explícita, el botón "No medir mis visitas" en `/privacidad` y el respeto de Global Privacy Control.
2. **Cómo se apaga la medición.**
   - `src/lib/analytics-consent.ts` registra `analyticsAllowed` en `setAnalyticsConsent` (el hook del agente de analytics). Con eso, `track()` deja de enviar y vacía su cola.
   - `GoogleAnalytics` no carga gtag.js mientras la medición esté apagada.
   - Al apagarla, el sitio pone `window['ga-disable-<id>'] = true`, que es el interruptor oficial de Google, y borra las cookies `_ga*`.
   - Si la persona la vuelve a encender, GA carga en ese momento.
3. **Responsable de los datos:** Juan Ignacio Portilla Kitroser, monotributista, CUIT 20-44535030-4 (dígito verificador comprobado), con domicilio en 25 de Mayo, provincia de Buenos Aires. Aparece en `/privacidad`, en `/terminos` y en el pie de todas las páginas (`src/content/legal.ts`).
4. **Correo para pedidos de datos:** por ahora `jpkitro@gmail.com`, leído de `publicChannels.email`. El coordinador lo cambia a `hola@mayofy.dev` cuando el agente de correo confirme que envía y recibe.
5. **Plazos de guarda (Juani, 2026-11-23):**
   - Consultas que no terminan en trabajo: 3 meses.
   - Clientes, propuesta, facturas y comprobantes de pago: 5 años después de terminado el trabajo (prueba ante reclamos, art. 2560 del CCyC). Las facturas electrónicas además quedan en ARCA.
   - Clientes, chats, materiales, accesos y archivos del proyecto: 1 año después de terminado el trabajo.
   - GA4: 14 meses.

   Están en `retention` de `src/content/legal.ts`. **Para el contador:** confirmar el plazo de conservación fiscal vigente; la Ley 27.799 habría bajado la prescripción de 5 a 3 años desde el 2 de enero de 2026 (sin verificar en el texto oficial).
6. **Términos y condiciones (`/terminos`).**
   - Leen los precios, el pago y el mantenimiento de `src/content/commercial-plans.ts`, así que nunca contradicen a los packs.
   - Incluyen una cláusula de encargado de tratamiento (art. 25 de la Ley 25.326) para los sistemas que guardan datos de los clientes de Juani.
   - **Puntos propuestos que faltan confirmar con Juani:**
     - Arrepentimiento de 10 días para consumidores (art. 34 de la Ley 24.240) y cancelación posterior en la que el anticipo cubre lo hecho; si cancela Mayofy, devuelve lo no trabajado (Juani, 2026-11-23: "si").
     - Mantenimiento sin permanencia. Revisión anual del precio y las condiciones con 30 días de aviso y baja sin costo (Juani, 2026-11-23: "si").
     - Jurisdicción en el Departamento Judicial de Mercedes, salvo para consumidores.
   - **Pendiente del agente comercial:** la flexibilidad de pago (tipo de cambio, medios y cuotas). Hoy el sitio muestra el 50/50 de `commercialIntro.payment`, y el párrafo se completa cuando el coordinador pase el resultado.

## Lo que Juani tiene que hacer fuera del código

1. **QR de Data Fiscal (F. 960/D).**
   - Lo exige ARCA a quien presta servicios y tiene web: va en la página principal.
   - Se genera con clave fiscal en el servicio "Formulario 960" cargando la URL `https://mayofy.dev`.
   - Después hay que pasar el código HTML que da ARCA para ponerlo en el pie.
2. **Registro de la base en la AAIP (Registro Nacional de Bases de Datos).**
   - La AAIP pide inscribir las bases privadas que no son de uso exclusivamente personal; la base de consultas y clientes no lo es.
   - Es gratis y se hace por TAD con clave fiscal nivel 2.
   - Ver la pregunta pendiente más abajo.
3. **Retención en GA4:** Administrar → Recopilación y modificación de datos → Retención de datos → 14 meses.
4. **Limpieza periódica:** borrar de Gmail, de WhatsApp y de Cal.com las consultas de más de 3 meses que no terminaron en trabajo.

## Para revisar con un abogado

- La base para transferir datos a EE. UU. Hoy se usa el consentimiento informado (art. 12 de la Ley 25.326); EE. UU. no figura entre los países adecuados de la Disposición 60/2016.
- Si el formulario necesita una casilla de consentimiento expreso (art. 5) o alcanza con el aviso.
- Si corresponde el "botón de arrepentimiento" (Res. SCI 424/2020). Mayofy no vende con checkout web, pero cierra contratos a distancia.
- La cláusula de cancelación y la jurisdicción frente a clientes que sean consumidores (arts. 36 y 37 de la Ley 24.240).
- La exclusión de responsabilidad por servicios de terceros, que frente a consumidores puede considerarse abusiva.

## Verificación

Se probó con un build de producción local (`next start`) en Playwright, a 1440×900 y 390×844, con movimiento reducido.

- **Sin cambios:** GA carga y deja `_ga` y `_ga_F2DHJCS51K`.
- **"No medir mis visitas":**
  - Guarda la elección, pone `ga-disable-G-F2DHJCS51K = true` y borra las cookies.
  - Al recargar `/privacidad` y en la home: gtag no carga y no sale ningún pedido a Google.
- **"Volver a medir":** GA carga en el momento.
- **Global Privacy Control:** muestra el aviso, no ofrece botón y no carga GA.
- **Teclado:** el botón se alcanza con Tab y se activa con Enter.
- **General:**
  - Sin scroll horizontal en las dos páginas y los dos tamaños, y sin errores en consola.
  - `tsc`, `eslint` y `next build` pasan sin errores.

## Fuentes (consultadas el 2026-11-23)

- Ley 25.326 y decreto 1558/2001: https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790/texto
- AAIP, obligaciones de los responsables: https://www.argentina.gob.ar/node/53779
- AAIP, trámites (inscripción de bases): https://www.argentina.gob.ar/aaip/datospersonales/tramites
- AAIP, transferencias internacionales: https://argentina.gob.ar/aaip/datospersonales/transferencias-internacionales
- Disposición 60-E/2016: https://www.argentina.gob.ar/normativa/nacional/267922/texto
- ARCA, F. 960/D (obligados): https://www.arca.gob.ar/960/formulario-960/obligados.asp
- Res. SCI 424/2020 (botón de arrepentimiento): https://www.argentina.gob.ar/normativa/nacional/norma-342869/texto
- Google Analytics, cookies y duración: https://support.google.com/analytics/answer/11397207
- Google Analytics, desactivar la medición: https://developers.google.com/analytics/devguides/collection/ga4/disable-analytics
- Cloudflare, cookies (`__cf_bm`): https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/
- Global Privacy Control: https://globalprivacycontrol.org
- SCBA, Departamento Judicial Mercedes: https://www.scba.gov.ar/guia/mapadeptos.asp?depto=Mercedes

# Correo hola@mayofy.dev

Estado: funcionando desde el 2026-11-23. Juani hace todas las acciones de cuentas y DNS; el agente guía y verifica.

## Pedido

> "Desplega un agente especializado para crear hola@mayofy.dev y configurarlo correctamente. que me pida la ayuda que necesite"

## Decisión

Juani eligió **ImprovMX (gratis) para recibir + Brevo (gratis) como SMTP para enviar desde Gmail** ("Enviar como" en jpkitro@gmail.com).

| Opción | Recibir | Enviar como hola@ | Costo | Por qué no |
|---|---|---|---|---|
| **ImprovMX + Brevo** (elegida) | Reenvío a Gmail | Gmail "Enviar como" vía smtp-relay.brevo.com con DKIM de mayofy.dev | $0 | — |
| ImprovMX + SMTP de Gmail | Reenvío | Sin DKIM propio: DMARC no alinea, Gmail personal en encabezados | $0 | Peor entregabilidad |
| Cloudflare Email Routing | Reenvío | No | $0 | Exige mover los nameservers de Vercel a Cloudflare |
| Forward Email free | Reenvío | No (USD 3/mes) | $0 | Sin envío; según su FAQ las direcciones de reenvío serían públicas en el plan gratis (no confirmado textual) |
| Zoho Mail free | Casilla propia | Solo web/app Zoho (sin IMAP/SMTP en free) | $0 | Otra bandeja para revisar |
| Google Workspace Starter | Casilla | Sí | USD 7/usuario/mes | Pago |

Límites del plan elegido: ImprovMX free 1 dominio, 25 alias, 500 correos recibidos por día, 0 envíos SMTP. Brevo free 300 envíos por día.

Fuentes: https://improvmx.com/pricing, https://improvmx.com/guides/sending-receiving-limits, https://forwardemail.net/en/pricing, https://forwardemail.net/en/faq, https://www.brevo.com/free-smtp-server, https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/, https://workspace.google.com/pricing.

## DNS antes del cambio

Consulta del 2026-11-23 a 8.8.8.8: NS `ns1/ns2.vercel-dns.com`; A `153.52.255.40` (Railway); **sin** MX, TXT, `_dmarc` ni DKIM. No hay registros de correo previos que preservar.

## Cómo funciona

- **Recibir:** quien escribe a `hola@mayofy.dev` entrega en los MX de ImprovMX, que reenvía a `jpkitro@gmail.com`. Alias en ImprovMX: `hola` y `dmarc`, los dos hacia `jpkitro@gmail.com`. Se borró el catch-all `*` para no juntar spam.
- **Enviar:** en Gmail, "Enviar como" `hola@mayofy.dev` (tratado como alias) usa el SMTP `smtp-relay.brevo.com:587` con TLS. El usuario es el login SMTP de Brevo y la contraseña es una clave SMTP llamada `gmail-hola`, que solo tiene Juani. Brevo firma con DKIM `d=mayofy.dev`, así que DMARC alinea. En Gmail está activado "Responder desde la misma dirección a la que se envió el mensaje".
- En Brevo, el dominio `mayofy.dev` está autenticado y `hola@mayofy.dev` está dado de alta como remitente.

## Registros en Vercel (cargados por Juani el 2026-11-23)

| Nombre | Tipo | Valor | Para qué |
|---|---|---|---|
| _(raíz)_ | MX 10 | `mx1.improvmx.com` | Recibir (ImprovMX) |
| _(raíz)_ | MX 20 | `mx2.improvmx.com` | Recibir (ImprovMX, respaldo) |
| _(raíz)_ | TXT | `v=spf1 include:spf.improvmx.com include:spf.brevo.com ~all` | SPF único con los dos remitentes (2 consultas DNS de 10) |
| _(raíz)_ | TXT | `brevo-code:a7d7899f2a6b188a58079a9cb9d9437a` | Verificación de dominio en Brevo |
| `brevo1._domainkey` | CNAME | `b1.mayofy-dev.dkim.brevo.com` | DKIM de Brevo |
| `brevo2._domainkey` | CNAME | `b2.mayofy-dev.dkim.brevo.com` | DKIM de Brevo (rotación) |
| `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:dmarc@mayofy.dev` | DMARC en modo observación; los reportes llegan a Gmail por el alias `dmarc` |

No se tocó ningún registro existente: el ALIAS de la raíz y el CNAME `www` hacia Railway, los TXT `_railway-verify` y los CAA/HTTPS que administra Vercel siguen iguales. No se usó el DMARC que sugiere Brevo (`rua@dmarc.brevo.com`), para que los reportes lleguen a Juani.

## Verificación

- **DNS (2026-11-23):** con `nslookup` contra `8.8.8.8`, `1.1.1.1` y `ns1.vercel-dns.com`, los 7 registros devuelven exactamente los valores de la tabla. `spf.improvmx.com` y `spf.brevo.com` son listas de IP sin includes anidados. Las claves DKIM `b1`/`b2` resuelven a claves RSA publicadas por Brevo. `https://mayofy.dev` sigue respondiendo 200 y el A no cambió.
- **Paneles:** ImprovMX muestra "Forwarding" en verde. Brevo muestra el dominio autenticado y el remitente verificado.
- **Recepción:** un correo desde una cuenta externa a `hola@mayofy.dev` llegó a Gmail.
- **Envío a otra persona:** un correo desde `hola@mayofy.dev` a una cuenta externa llegó, y su respuesta volvió a Gmail.
- **mail-tester.com** (`https://www.mail-tester.com/test-6rargoiet`), un correo de prueba con asunto y cuerpo "test":
  - SPF pass, DKIM pass con `header.d=mayofy.dev` (selector `brevo1`, 2048 bits) y DMARC pass. La IP de Brevo no figura en ninguna de las 20 listas negras revisadas.
  - Puntaje 6.5/10. Los descuentos no son de configuración:
    - `FROM_FMBLA_NEWDOM14`: dominio registrado hace menos de 14 días. Desaparece solo.
    - `HTML_IMAGE_ONLY_08` y "1 % de texto": el cuerpo era solo "test" más los píxeles de seguimiento de Brevo.
    - Dos imágenes sin `alt`: son esos mismos píxeles.

## Límites y riesgos conocidos

- **Seguimiento de Brevo:** Brevo agrega un píxel de apertura y un encabezado `List-Unsubscribe` hacia `sendibt2.com`. No hay marca visible de Brevo en el cuerpo. En un correo con texto real, el píxel pesa poco en el puntaje.
- **Límites diarios:** ImprovMX free recibe hasta 500 correos por día y se reanuda a las 00:00 UTC. Brevo free envía hasta 300 por día.
- **Correos a uno mismo:** Gmail no muestra en Recibidos los correos que Juani se manda a sí mismo desde jpkitro@gmail.com a hola@. Hay que probar siempre desde otra cuenta.
- **DMARC:** queda en `p=none`. Después de unas semanas de reportes limpios en `dmarc@`, se puede subir a `p=quarantine`. Es un cambio de un solo registro.

## Dónde se usa la dirección

Aprobado por Juani el 2026-11-23 ("si"):

- **Cambiado en el sitio:**
  - `publicChannels.email` en `src/content/site.ts` pasó a `hola@mayofy.dev`. Ese valor lo leen los dos enlaces de `/privacidad` y la línea "Email" de `/llms.txt`.
  - `public/.well-known/security.txt` → `Contact: mailto:hola@mayofy.dev`.
  - El pie (`src/components/world/world-footer.tsx`) suma un enlace `mailto:` entre LinkedIn y Privacidad. Lo pidió Juani: "agregá el correo al pie del sitio". El texto visible es la dirección misma, para que se pueda leer y copiar, y sale de `publicChannels.email`. No hizo falta CSS nuevo: el contenedor ya envuelve los enlaces y les da 44 px de alto táctil.
- **Sin cambio, a propósito:** el formulario sigue entregando por FormSubmit a `jpkitro@gmail.com` (`DEFAULT_CONTACT_EMAIL` en `src/app/api/contact/route.ts` y `CONTACT_FORM_ENDPOINT` en Railway). Esa dirección nunca llega al navegador. Pasarla a hola@ obligaría a reactivar FormSubmit y sumaría ImprovMX como intermediario, sin ninguna ganancia.
- **A cargo de Juani:** cambiar el email del perfil de Cal.com, que es el que ven quienes reservan.
- **No hace falta:** el Perfil de Empresa de Google no muestra un email público. Agregar hola@ como usuario en Search Console es opcional.
- **Verificado localmente** (`next start`):
  - `/privacidad` a 1440×900 y 390×844: los dos `mailto:hola@mayofy.dev`, sin restos de la dirección anterior, sin desborde horizontal, el foco de teclado llega al enlace y la consola no tiene errores.
  - `/llms.txt` y `/.well-known/security.txt` sirven la dirección nueva.
  - Pie a 390×844: el correo pasa a la segunda fila junto a Privacidad (131×44 px). A 1440×900 queda en una sola fila. En los dos tamaños no hay desborde horizontal, el foco de teclado muestra el contorno menta y la consola no tiene errores.
  - Lint, typecheck y build pasan.

## Cómo deshacer

- **Dejar de recibir:** borrar los dos MX en Vercel. Para pausar sin tocar el DNS, desactivar los alias en ImprovMX.
- **Dejar de enviar:** quitar `hola@mayofy.dev` en Gmail (Cuentas e importación → Enviar como) y borrar la clave SMTP `gmail-hola` en Brevo (SMTP & API).
- **Limpieza total:** borrar en Vercel el TXT `brevo-code`, los CNAME `brevo1/brevo2._domainkey`, el TXT SPF y el TXT `_dmarc`, y después borrar el dominio en Brevo y en ImprovMX.

Ninguno de estos registros afecta al sitio (raíz y `www` hacia Railway).

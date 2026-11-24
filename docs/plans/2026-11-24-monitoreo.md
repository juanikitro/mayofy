# Monitoreo y alertas de mayofy.dev

Pedido de Juani (24 de noviembre de 2026): "Implementa alerta de si el sitio se cae y eso".

## Estado

- Hecho: ruta `GET /api/health` en el código (sin publicar todavía).
- Decidido (Juani, 24 de noviembre de 2026: "apruebo"): Better Stack Uptime, plan gratis.
- Hecho (24 de noviembre de 2026): Juani creó la cuenta (Google, `jpkitro@gmail.com`, plan **Free**; el onboarding traía preseleccionado el plan pago de USD 29 y se cambió a Free). El agente creó dos monitores desde el Chrome de Juani:

  | Monitor | URL | Frecuencia | Confirmación | Aviso |
  |---|---|---|---|---|
  | Mayofy home | `https://mayofy.dev/` | 3 min | 1 min | email |
  | Mayofy caso ShineApp | `https://mayofy.dev/proyectos/shineapp` | 3 min | 1 min | email |

  Ambos quedaron en **Up**. Con 1 minuto de confirmación, Better Stack vuelve a chequear antes de abrir un incidente, así que un error aislado no dispara un mail. El resto quedó por defecto: `GET`, timeout de 30 s, sigue redirecciones, chequea desde Europa, Norteamérica, Asia y Australia. El onboarding creó un "Sample incident" de `google.com`; es de ejemplo y se puede resolver o ignorar.
- Verificado: Juani recibió en Gmail la alerta de prueba ("Send test alert") del monitor de la home.
- Railway, alertas de deploy (revisado en `railway.com/account/notifications`, sin cambios): para todos los proyectos ya están activas, por **Email & In-App**, las reglas *Deployment Failed* y *Deployment Crashed / Oom Killed*, además de las de uso y restricciones. No hace falta configurar nada. Railway no vigila el sitio después del deploy; eso lo cubre Better Stack.
- La ruta de salud ya está publicada. Falta confirmar si existe el monitor «Mayofy health»; si no aparece en Better Stack, Juani puede crearlo con los ajustes de abajo.
- Las alertas van a `jpkitro@gmail.com` y no a `hola@mayofy.dev`, porque el reenvío de `hola@` depende del mismo DNS que el sitio: si se rompe el DNS, se perderían el sitio y el aviso a la vez.
- Decidido (Juani, 24 de noviembre de 2026: "no agregues"): **sin seguimiento de errores por ahora**. Se evaluó Better Stack Errors (gratis, compatible con el SDK de Sentry: https://betterstack.com/docs/errors/collecting-errors/sentry-sdk/). Se descartó porque sumaba la dependencia `@sentry/nextjs` a una página ya pesada y procesaba datos de visitantes, lo que obligaba a cambiar la política de privacidad, para un sitio casi todo estático. Los errores del servidor siguen en los logs de Railway. Revisarlo si el sitio suma lógica propia (turnos, pagos). La política de privacidad no cambia.

## Crear el monitor «Mayofy health»

En Better Stack Uptime, entrá a **Monitors → Create monitor** y elegí **URL doesn't contain keyword** en **Alert us when**. Usá estos ajustes:

| Campo | Valor |
|---|---|
| Nombre | `Mayofy health` |
| URL | `https://mayofy.dev/api/health` |
| Método | `GET` |
| Estado esperado | `200` |
| Texto que debe aparecer | `"ok":true` |
| Intervalo | 3 minutos |
| Alerta | Email, al mismo destinatario que los otros monitores |

Guardá el monitor y verificá que quede en **Up**. El chequeo de keyword debe buscar el literal sin espacios alrededor de los dos puntos.

El estado `200` es el esperado de la ruta. Better Stack documenta el [chequeo de keyword](https://betterstack.com/docs/uptime/keyword-monitor/) y el [chequeo de código exacto](https://betterstack.com/docs/uptime/api/create-a-new-monitor/) como tipos separados; no se verificó que la cuenta permita exigir ambas condiciones en un mismo monitor.

## Qué cambió en el código

`src/app/api/health/route.ts` responde `200` con un JSON chico:

```json
{ "ok": true, "pesoRate": "ok", "uptimeSeconds": 1234, "commit": "d68ae99" }
```

- `ok`: el servidor de Node responde. Si la ruta no contesta o no da `200`, el sitio está caído.
- `pesoRate`: `"ok"` o `"unavailable"`. Es informativo: sin cotización, los packs muestran solo USD y el sitio sigue funcionando, así que **no** hace fallar el chequeo.
- `uptimeSeconds`: segundos desde que arrancó el proceso. Si vuelve a valores bajos sin un deploy, Railway reinició el servicio.
- `commit`: los primeros 7 caracteres de `RAILWAY_GIT_COMMIT_SHA`, que Railway define en cada deploy. Dice qué versión está publicada. En local vale `null`.

La ruta no llama a FormSubmit (no manda mails ni gasta cupo) y reutiliza la cotización que Next ya guarda en caché por tres horas, así que consultarla cada pocos minutos no aumenta las llamadas a dolarapi.com. Responde con `Cache-Control: no-store`, acepta `HEAD` y rechaza `POST` con `405`.

Por qué no se vigila `/api/contact` directamente: es un `POST` que reenvía la consulta a FormSubmit. Un monitor que lo llamara mandaría un mail por chequeo. `/api/health` vive en el mismo servidor, así que si responde, `/api/contact` también está en pie; lo que no detecta es una falla de FormSubmit (ver "Límites").

## Opciones de monitoreo (investigadas el 24 de noviembre de 2026)

| Opción | Gratis | Frecuencia | Alertas gratis | Notas |
|---|---|---|---|---|
| Better Stack Uptime | 10 monitores | cada 3 min | email | Página de estado incluida. |
| UptimeRobot | 50 monitores | cada 5 min | email | Entre 2024 y 2025 el plan gratis prohibía uso comercial; hoy sus términos y su centro de ayuda dicen que se permite. Telegram parece estar en planes pagos (no confirmado). |
| Railway | incluido | solo durante el deploy | email / in-app | Avisa si falla el build o el deploy. **No** vigila el sitio una vez publicado. |
| GitHub Actions programado | gratis | cada 5 min como mínimo, con demoras frecuentes | email de GitHub si falla | Poco confiable como alarma y hay que mantener un workflow. Descartado. |

Fuentes:

- Better Stack, frecuencia de chequeo: https://betterstack.com/docs/uptime/check-frequency/ y https://betterstack.com/uptime
- UptimeRobot, precios: https://uptimerobot.com/pricing/ ; uso comercial del plan gratis: https://help.uptimerobot.com/en/articles/11604710-who-should-use-uptimerobot-s-free-plan y https://uptimerobot.com/terms
- Railway, healthchecks (solo durante el deploy): https://docs.railway.com/reference/healthchecks
- Railway, notificaciones de build/deploy fallido: https://railway.com/changelog/2025-11-21-notifications y https://docs.railway.com/guides/alerts-crashes-failed-deploys

## Verificación

- `lint`, `typecheck` y `build` pasan; el build lista `/api/health` como dinámica (`ƒ`).
- Con `next start` local: `GET` → `200` y el JSON de arriba (0,25 s); `HEAD` → `200`; `POST` → `405`.
- El GET público a `https://mayofy.dev/api/health` ya responde `200` y contiene `"ok":true`. Esto confirma la ruta, no la creación del monitor.
- No hay corredor de tests en el proyecto, así que no hubo test automático (RED/GREEN); la verificación fue funcional con `curl`.

## Qué hacer cuando llega una alerta

1. **Confirmar.** Abrí https://mayofy.dev en el celular con datos móviles, sin Wi-Fi. Si carga, puede ser un problema de red de Better Stack; esperá el próximo chequeo (3 min).
2. **Mirar qué monitor cayó.**
   - Solo cae `Mayofy caso ShineApp`: falla esa página. Revisá el último deploy.
   - Caen todos: el servidor o el DNS están caídos. Seguí con el paso 3.
3. **Railway.** Entrá al proyecto `mayofy`, servicio `web`:
   - Si el último deploy dice *Failed* o *Crashed*, abrí sus logs. Para volver atrás, en el deploy anterior que funcionaba usá **Redeploy**.
   - Si el deploy está *Active* pero el sitio no responde, mirá los logs del servicio (los errores del formulario empiezan con `[contact]`) y la página de estado de Railway: https://status.railway.com
4. **DNS.** Si Railway está bien pero el dominio no responde, revisá los registros en Vercel (ver [docs/ops/domains.md](../ops/domains.md)).
5. **Cierre.** Better Stack te manda otro mail cuando el sitio vuelve. Anotá en este documento qué pasó si fue algo nuevo.

## Límites

- Ningún monitor externo detecta que FormSubmit deje de entregar mails. La ruta de contacto ya registra esos fallos en los logs de Railway con el prefijo `[contact]`.
- Los chequeos gratis son cada 3 o 5 minutos: una caída más corta puede pasar sin aviso.

# Monitoreo y alertas de mayofy.dev

Pedido de Juani (24 de noviembre de 2026): "Implementa alerta de si el sitio se cae y eso".

## Estado

- Hecho: ruta `GET /api/health` en el código (sin publicar todavía).
- Pendiente de Juani: elegir el servicio de monitoreo y crear los monitores (guía abajo).
- Pendiente de decisión: seguimiento de errores.

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
- En producción `https://mayofy.dev/api/health` da `404` hasta que se publique este cambio. La home y `/proyectos/shineapp` dan `200`.
- No hay corredor de tests en el proyecto, así que no hubo test automático (RED/GREEN); la verificación fue funcional con `curl`.

## Límites

- Ningún monitor externo detecta que FormSubmit deje de entregar mails. La ruta de contacto ya registra esos fallos en los logs de Railway con el prefijo `[contact]`.
- Los chequeos gratis son cada 3 o 5 minutos: una caída más corta puede pasar sin aviso.

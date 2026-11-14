# Backlog para la próxima iteración de la landing

**Creado:** 14 de noviembre de 2026, después de publicar el sitio alineado al brief v2.
**Uso:** revisar este documento al empezar la próxima iteración sobre la landing. Cada punto indica qué hay que decidir o hacer y qué hay hoy.

## Para decidir en la iteración

1. **Destino del formulario.** "Prefiero que me contacten" usa `/api/contact`, que reenvía a `CONTACT_FORM_ENDPOINT`. Sin esa variable en Railway, el sitio muestra un aviso y deriva a WhatsApp. Opciones: un correo (por ejemplo, con Resend), una planilla de Google (Apps Script) o un servicio de formularios (Formspree, Basin). Elegir uno y configurar la variable.
2. **Correo comercial.** El dominio `mayofy.dev` ya está activo (ver `docs/ops/domains.md`). Falta un correo en ese dominio: hoy el contacto es `jpkitro@gmail.com` (también figura en `/privacidad`). Al tenerlo, cambiar `publicChannels.email` en `src/content/site.ts`.
3. **Imagen de Juani.** Decisión: usar un avatar en lugar de una foto. Recomendación: un avatar basado en una foto real y reconocible, tratado con la estética de `Umbral Vivo`, mejor que uno genérico o caricaturesco. La sección "Quién está detrás" vende trato directo, y un avatar que no se parece a nadie resta confianza. Hoy la sección muestra la letra "J".
4. **Bot de WhatsApp y Telegram.** Hoy figura como "Próximamente". Precios y plazos aprobados por Juani el 14 de noviembre de 2026; falta publicarlos en el sitio y detallar el alcance final:

   | Escalón | Qué incluye | Desde | Plazo |
   |---|---|---|---|
   | Bot Esencial | Un canal (WhatsApp o Telegram), respuestas a preguntas frecuentes, toma de datos del cliente y derivación a una persona. | USD 120 | 2 a 3 semanas |
   | Bot Integrado | Todo lo anterior, los dos canales y conexión con Web + Gestión o un sistema: reservar turnos, consultar estados o datos. | USD 250 | 4 a 6 semanas |

   Abono mensual: USD 30 por hosting, monitoreo y ajustes menores. Las tarifas de WhatsApp Business (Meta cobra por conversación) y el uso de IA, si se usa, se trasladan aparte.

5. **Agenda online para la reunión de diagnóstico.** Objetivo: que el cliente reserve la reunión de diagnóstico directamente en el calendario de Juani, sin ir y venir por WhatsApp. Hoy todos los CTA "Agendá tu diagnóstico gratis" abren WhatsApp con un mensaje precargado.
   - **Herramienta (a decidir):** Google Calendar con páginas de reserva (gratis con la cuenta de Google actual y sin otra plataforma), Cal.com (código abierto, plan gratuito, se embebe bien y sincroniza con Google Calendar) o Calendly (el más conocido; el plan gratuito permite un solo tipo de evento).
   - **Definir:** duración de la reunión, días y horarios disponibles, margen entre reuniones, anticipación mínima, videollamada (Google Meet) y recordatorios por correo.
   - **Preguntas previas:** reutilizar los datos del formulario calificador (negocio, pack de interés, plazo y presupuesto) como preguntas de la reserva.
   - **En el sitio:** que "Agendá tu diagnóstico gratis" abra la reserva (embebida en la sección de contacto o en una página propia) y mantener WhatsApp como alternativa visible.
   - **Medición y privacidad:** registrar las reservas como evento en Analytics y sumar la herramienta elegida a la lista de servicios de `/privacidad`.

## Para hacer en la iteración

6. **Revisión legal de la privacidad.** `/privacidad` es un borrador basado en la Ley 25.326. Revisarlo con un profesional y evaluar si corresponde inscribir la base de contactos en el Registro Nacional de Bases de Datos.
7. **Medición.** Google Analytics registra visitas, pero no eventos. Sumar eventos para: clics en cada CTA de WhatsApp (diferenciando pack y ubicación), envío del formulario por cada vía y apertura de los detalles de cada pack.
8. **Testimonios.** No hay. Pedirlos a los primeros clientes con nombre, rubro y una frase concreta sobre el resultado; nunca inventarlos.
9. **Idiomas.** Prioridad: español rioplatense (actual), portugués después e inglés en tercer lugar. Requiere decidir la estructura de rutas (`/pt`, `/en`) y traducir el contenido de `src/content/`.
10. **Portfolio.** Los tres primeros trabajos son reales (sistema para lavaderos, landing de una consignataria y portfolio de desarrollador) y enlazan a cada sitio en vivo, pero usan visuales abstractos ("Visual pendiente"). Faltan capturas reales, casos completos y reemplazar los tres placeholders restantes con un proyecto por pack.

## Diferido hasta tener conversaciones comerciales

11. **Proceso comercial.** Se arma cuando llegue el primer contacto: guion de la reunión de diagnóstico, propuesta modelo (alcance, plazo, inversión y rondas de revisión) y términos del servicio (cambios de alcance, demoras, cancelación, pago y mantenimiento).

## Descartado

- **TikTok:** Juani decidió no usarlo. Los canales con contenido son Instagram y LinkedIn.

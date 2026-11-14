# Backlog para la próxima iteración de la landing

**Creado:** 14 de noviembre de 2026, después de publicar el sitio alineado al brief v2.
**Uso:** revisar este documento al empezar la próxima iteración sobre la landing. Cada punto indica qué hay que decidir o hacer y qué hay hoy.

## Para decidir en la iteración

1. **Destino del formulario.** "Prefiero que me contacten" usa `/api/contact`, que reenvía a `CONTACT_FORM_ENDPOINT`. Sin esa variable en Railway, el sitio muestra un aviso y deriva a WhatsApp. Opciones: un correo (por ejemplo, con Resend), una planilla de Google (Apps Script) o un servicio de formularios (Formspree, Basin). Elegir uno y configurar la variable.
2. **Dominio propio y correo comercial.** Hoy el sitio está en `mayofy.juanikitro.com` (Railway) y el correo de contacto es `jpkitro@gmail.com` (también figura en `/privacidad`). Al tener dominio propio: agregarlo al servicio `web` de Railway, actualizar `NEXT_PUBLIC_SITE_URL` en Railway y cambiar `publicChannels.email` en `src/content/site.ts`.
3. **Imagen de Juani.** Decisión: usar un avatar en lugar de una foto. Recomendación: un avatar basado en una foto real y reconocible, tratado con la estética de `Umbral Vivo`, mejor que uno genérico o caricaturesco. La sección "Quién está detrás" vende trato directo, y un avatar que no se parece a nadie resta confianza. Hoy la sección muestra la letra "J".
4. **Bot de WhatsApp y Telegram.** Hoy figura como "Próximamente". Precios y plazos aprobados por Juani el 14 de noviembre de 2026; falta publicarlos en el sitio y detallar el alcance final:

   | Escalón | Qué incluye | Desde | Plazo |
   |---|---|---|---|
   | Bot Esencial | Un canal (WhatsApp o Telegram), respuestas a preguntas frecuentes, toma de datos del cliente y derivación a una persona. | USD 120 | 2 a 3 semanas |
   | Bot Integrado | Todo lo anterior, los dos canales y conexión con Web + Gestión o un sistema: reservar turnos, consultar estados o datos. | USD 250 | 4 a 6 semanas |

   Abono mensual: USD 30 por hosting, monitoreo y ajustes menores. Las tarifas de WhatsApp Business (Meta cobra por conversación) y el uso de IA, si se usa, se trasladan aparte.

## Para hacer en la iteración

5. **Revisión legal de la privacidad.** `/privacidad` es un borrador basado en la Ley 25.326. Revisarlo con un profesional y evaluar si corresponde inscribir la base de contactos en el Registro Nacional de Bases de Datos.
6. **Medición.** Google Analytics registra visitas, pero no eventos. Sumar eventos para: clics en cada CTA de WhatsApp (diferenciando pack y ubicación), envío del formulario por cada vía y apertura de los detalles de cada pack.
7. **Testimonios.** No hay. Pedirlos a los primeros clientes con nombre, rubro y una frase concreta sobre el resultado; nunca inventarlos.
8. **Idiomas.** Prioridad: español rioplatense (actual), portugués después e inglés en tercer lugar. Requiere decidir la estructura de rutas (`/pt`, `/en`) y traducir el contenido de `src/content/`.
9. **Portfolio.** Los tres primeros trabajos son reales (sistema para lavaderos, landing de una consignataria y portfolio de desarrollador) y enlazan a cada sitio en vivo, pero usan visuales abstractos ("Visual pendiente"). Faltan capturas reales, casos completos y reemplazar los tres placeholders restantes con un proyecto por pack.

## Diferido hasta tener conversaciones comerciales

10. **Proceso comercial.** Se arma cuando llegue el primer contacto: guion de la reunión de diagnóstico, propuesta modelo (alcance, plazo, inversión y rondas de revisión) y términos del servicio (cambios de alcance, demoras, cancelación, pago y mantenimiento).

## Descartado

- **TikTok:** Juani decidió no usarlo. Los canales con contenido son Instagram y LinkedIn.

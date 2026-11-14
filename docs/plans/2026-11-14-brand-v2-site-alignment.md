# Sitio alineado al brief de marca v2

**Fecha:** 14 de noviembre de 2026
**Estado:** publicado en Railway (`https://mayofy.juanikitro.com`), que despliega automáticamente cada push a `master` en GitHub.
**Fuente:** `BRIEF.md` (brief v2), construido a partir del benchmark contra Villex, QKStudio, Ideas Web, Paisanos y DHNN y del formulario de definiciones respondido por Juani.

## Qué cambió

- **Hero:** promesa "Webs que venden. Sistemas que ordenan.", descriptor "Estudio de desarrollo web y software a medida" y CTA principal hacia la reunión de diagnóstico gratis por WhatsApp. El CTA secundario lleva a los packs.
- **Packs (`src/content/commercial-plans.ts`):** tres packs con precio "desde" y plazo estimado: Landing (USD 85, 1 a 2 semanas), Web + Gestión (USD 150, 3 a 9 semanas) y Sistema a Medida (USD 450, 1 a 6 meses). Landing incluye la nota (*) de la web institucional (desde USD 95, 3 a 4 semanas). Web + Gestión separa lo que entra en el precio base de lo que se cotiza aparte.
- **Próximamente:** tarjeta del bot de WhatsApp y Telegram con CTA para avisar cuando esté disponible.
- **Garantías:** reemplazan la lista anterior de beneficios. Siete promesas medibles, sin promesas de resultados de negocio.
- **Mantenimiento:** USD 50 por mes (Landing) y USD 25 por mes (Web + Gestión y Sistema a Medida), con notas (*) y (**) que explican los límites mensuales y el precio promocional.
- **Automatizaciones sueltas:** la sección "¿Necesitás algo más?" se renombró y perdió los ítems que ahora cubre Web + Gestión (turnos, reservas, panel).
- **Sistemas:** la sección "La página es la base. No el límite." pasó a "Cuando una planilla ya no alcanza." con capacidades de software.
- **Proceso:** seis pasos que empiezan en la reunión de diagnóstico y terminan en el soporte posterior al lanzamiento.
- **Trabajos:** los tres primeros espacios muestran proyectos reales (sistema para lavaderos, landing de una consignataria y portfolio de desarrollador) con enlace al sitio en vivo; las páginas de caso solo se generan para los placeholders.
- **Quién está detrás:** suma las señales de experiencia verificadas (5 años, sistema en producción con unos 750 usuarios activos, equipo de 4) sin nombrar organizaciones.
- **FAQ:** diez preguntas: plazos, costos, reunión de diagnóstico, pago, tecnologías, hosting y dominio, mantenimiento, diseño propio, alcance geográfico y con quién se trabaja.
- **Formulario calificador (`src/components/contact-form.tsx`):** suma pack, plazo, presupuesto, dominio y web de referencia. "Enviar por WhatsApp" arma el mensaje con todos los datos y abre WhatsApp sin pasar por el servidor. "Prefiero que me contacten" usa `/api/contact`.
- **API (`src/app/api/contact/route.ts`):** acepta los campos nuevos, descarta opciones que no estén en `src/content/contact-options.ts` y referencias que no sean URLs http(s).
- **Privacidad:** nueva página `/privacidad` (incluida en el sitemap y en el footer) y aviso debajo del formulario.
- **Metadatos:** título, descripción y Open Graph actualizados; idioma `es-AR` y locale `es_AR`.

## Cómo se verificó

- `npm run typecheck`, `npm run lint` y `npm run build` sin errores.
- Navegador real (build de producción local) en 1440 px y 390 px: hero, packs, garantías, mantenimiento, contacto y privacidad, sin scroll horizontal.
- "Enviar por WhatsApp" genera el mensaje con nombre, negocio, pack, plazo, presupuesto, dominio, referencia y necesidad.
- `/api/contact` rechaza campos inválidos y, sin `CONTACT_FORM_ENDPOINT`, responde el aviso honesto de formulario no configurado.

## Limitaciones

- "Prefiero que me contacten" solo funciona en producción si `CONTACT_FORM_ENDPOINT` está configurado en Railway.
- La política de privacidad es un borrador; conviene revisión profesional y evaluar la inscripción de la base de datos en el Registro Nacional de Bases de Datos.
- Los precios se muestran en USD con la aclaración de pago en pesos al cambio del día, sin un equivalente fijo en pesos que quedaría desactualizado.
- El sitio está solo en español; portugués e inglés quedan para una etapa posterior.
- El portfolio muestra tres proyectos reales de forma general (enlazan a cada sitio en vivo, sin página de caso) y tres placeholders.
- Los pendientes de la próxima iteración están en `docs/plans/landing-iteration-backlog.md`.

# Guía para Juani: cuentas y configuración fuera del código

Pedido de Juani, 23 de noviembre de 2026: "quiero que levantes una sesion que me guie a dar de alta google search console, el perfil de google y todo lo que me toque a mi".

Rama `juanikitro/landing-guia-juani` (desde `juanikitro/landing-redesign`, `00a2858`). Solo cambia este documento. Juani hace cada paso con sus cuentas; la sesión guía y revisa lo que muestra. Nadie más entra a sus cuentas ni toca el DNS.

**La versión nueva ya está publicada** (master `89f798a`, 23/11/2026; antes producción estaba en `b1d4042`). Lo marcado **[después de publicar]** ya se puede hacer.

Fuentes: `docs/plans/2026-11-22-seo-rendimiento.md` ("Lo que tiene que hacer Juani"), `docs/plans/2026-11-22-perfil-google.md` ("Lista única para Juani"), `docs/plans/2026-11-22-contacto-agenda.md` (idioma de Cal.com y primer envío del formulario).

## Estado

Leyenda: `[ ]` pendiente, `[x]` hecho y comprobado, `[~]` empezado o esperando a Google.

### 1. Google Search Console (hecho el 24/11/2026)

- [x] Cuenta: jpkitro@gmail.com (la misma de Analytics).
- [x] Propiedad de **Dominio** `mayofy.dev` creada y verificada (ya estaba verificada al empezar esta sesión).
- [x] Sitemap `https://mayofy.dev/sitemap.xml` enviado: estado "Success", 6 páginas encontradas.
- [x] Indexación solicitada para la home (ya estaba en Google) y los 3 casos (estaban "Discovered - currently not indexed"): las 4 quedaron en la cola prioritaria.
- [ ] En unas semanas: revisar "Páginas" (que estén las 6), "Mejoras" (datos estructurados) y "Métricas web principales".

### 2. Bing Webmaster Tools (hecho el 24/11/2026)

- [x] Cuenta de Bing Webmaster creada con "Sign in with Google" (jpkitro@gmail.com).
- [x] `https://mayofy.dev/` importado desde Search Console (rol Administrator). Bing recibió acceso de solo lectura a Search Console; se puede quitar en la cuenta de Google, en "Terceros con acceso".
- [x] Sitemap `https://mayofy.dev/sitemap.xml` enviado en Bing (no venía en la importación porque se había enviado minutos antes): estado "Processing".

### 3. Perfil de Empresa en Google (creado el 24/11/2026, falta verificar)

Sigue la "Lista única para Juani" de `docs/plans/2026-11-22-perfil-google.md`.

- [x] Horario (Juani, 24/11): "mi horario es de 9hs a 19hs". Se cargó de lunes a sábado (los días que ya ofrecía Cal.com) y domingo cerrado.
- [x] Creado con jpkitro@gmail.com: nombre `Mayofy`, categoría "Website designer" (Diseñador de sitios web), sin local que se visite, las 20 zonas de la tabla (sin reemplazos: no se midieron en Maps las 6 con ⚠), teléfono `02345 45-5007`, web con UTM, chat de WhatsApp `https://wa.me/542345455007`.
- [x] Dirección para verificar: la de Juani en 25 de Mayo (oculta al público; no se copia en este documento). Google exigió el código postal completo: se cargó `B6660AAA`, el mismo del otro perfil de la cuenta. Supuesto: solo importa si Google manda una postal.
- [x] Descripción (637 caracteres), categoría adicional "Software company" y horario lunes a sábado 9 a 19, guardados.
- [~] **Verificación por video:** Juani la grabó y la envió el 24/11 (escaneando el QR que da "Get verified" en la PC; en la app de Maps no le aparecía el perfil). Estado en el panel: "Processing", "Google is processing your verification. It may take up to five days". Requisitos que pedía Google: Google ofreció un único método: un video continuo con (1) la calle o un lugar conocido de la zona, (2) el nombre Mayofy impreso o en pantalla y (3) acceso a una herramienta del negocio (por ejemplo, el panel de Cal.com o de Vercel con mayofy.dev). Sin caras ni documentos sensibles; de 1 a 2 minutos. La revisión tarda hasta 5 días hábiles.
- [ ] Redes (Instagram, LinkedIn): el editor no abre con el perfil sin verificar; cargar después.
- [x] Servicios: Google agregó solos 8 sugeridos de la categoría (Application development, Domain hosting, Landing pages, Mobile app development, Self-managed websites, SEO services, Software development, Web design); se sumaron "Corporate websites" y "Online stores" (el sitio ofrece web institucional y tienda online en Gestión) y 6 propios con descripción: Landing, Gestión, Sistema a Medida, Mantenimiento mensual, Charla inicial gratis y Automatizaciones sueltas. Los precios y plazos salen de `src/content/commercial-plans.ts` en master (el pack ahora es "Gestión", de 3 a 6 semanas; mantenimiento USD 25 Landing y USD 50 Gestión y Sistema a Medida), no del plan del 22/11. El campo de precio solo acepta ARS: quedó "No price" y el "Desde USD" va al principio de la descripción.
- [ ] Revisar con Juani si quitar "Mobile app development" y "Domain hosting" (sugeridos por Google; el sitio no los ofrece como servicio aparte).
- [x] Fotos: logo `01-logo-720.jpg`, portada `02-portada-1280x720.jpg` y las 4 de trabajos subidas; quedan "PENDING" hasta la verificación.
- [ ] Atributos y la primera publicación: después de la verificación.
- [ ] Pasar la URL pública del perfil al coordinador (va en `sameAs`, `src/lib/structured-data.ts`).
- Nota: la cuenta tiene otro perfil sin verificar, "Zona Marcial 25 de Mayo", que no es de Mayofy y no se tocó.

URL del perfil: _pendiente de verificación_ (id interno 7328409250559941765).

### 4. Cal.com

- [x] Evento "Mayofy First Meeting" → Appearance → "Interface language" activado en **Español Latinoamericano** (en Cal.com 7 la opción ya no está en "Avanzado"). La vista previa pasó a "noviembre", "LUN", "Horarios disponibles".
- [x] Disponibilidad (Juani, 24/11: "los horarios de cal.com deben ser esos mismos"): pasó de lunes a sábado 7 a 19 a lunes a sábado **9 a 19**.
- [ ] Título del evento (hoy "Mayofy First Meeting", en inglés): esperar la decisión de Juani. Sugerido: `Charla inicial con Mayofy`. Cambiar solo el título, no el slug `mayofy-first-meeting`, que usa el sitio. Si cambia la duración o el lugar, avisar: `src/content/site.ts` dice "30 minutos por videollamada".
- Formato de 24 h: sigue sin opción por evento; el selector "12h / 24h" queda a la vista del visitante.

### 5. FormSubmit (hecho el 24/11/2026)

- [x] Consulta de prueba enviada desde https://mayofy.dev/#contacto: el sitio mostró "El formulario todavía no está activado…", como se esperaba.
- [x] Correo "Action Required: Activate FormSubmit on https://mayofy.dev/#contacto" (24/11, 10:35) → "Activate Form". La primera carga dio error 500 de FormSubmit; al recargar mostró "Form Activated".
- [x] Llegó a jpkitro@gmail.com la consulta "Nueva consulta desde mayofy.dev: Juani (prueba)". Se puede borrar.

### 6. Vistas previas y Analytics (hecho el 24/11/2026)

- [x] Facebook Sharing Debugger, "Recuperar nueva información" en la home y los 3 casos: las 4 responden 200 con su imagen propia (`/og/home.jpg`, `/og/proyectos/<caso>.jpg`) y su título. El aviso "Falta fb:app_id" no afecta la vista previa.
- [x] LinkedIn Post Inspector con la home: leída de nuevo, título "Mayofy — webs que venden, sistemas que ordenan" e imagen.
- [ ] WhatsApp guarda la vista previa por URL: para probar la nueva, compartir `https://mayofy.dev/?v=2` desde el celular.
- [x] Prueba de resultados enriquecidos con la home: "Organization", 1 elemento válido. Las preguntas frecuentes no aparecen, como estaba previsto (Google las muestra solo para salud y gobierno).
- [x] Google Analytics en tiempo real (propiedad 547554982): 1 usuario activo en la home, escritorio.

### 7. Enlaces y perfiles que apuntan a mayofy.dev (unos 20 minutos)

- [ ] Instagram `@mayofy.web`: enlace de la bio a `https://mayofy.dev`.
- [ ] LinkedIn: sitio web en el perfil y en "Destacados".
- [ ] GitHub: campo "Website" del perfil y README del perfil.
- [ ] Sitios de clientes: "Hecho por Mayofy" en el pie de shineapp.lat y gymg.com.ar, si los dueños aceptan. juanikitro.com es propio: se puede sumar sin pedir permiso.
- [ ] Directorios: los que Juani elija de la lista de la sesión.

## Textos listos para pegar

### Bio de Instagram (150 caracteres como máximo)

```
Webs con turnos online y sistemas a medida para negocios de servicios. Argentina y LATAM. Charla gratis 👇
```

### LinkedIn, título (220 como máximo)

```
Fundador de Mayofy · Páginas web con turnos online y sistemas a medida para negocios de servicios · Argentina y LATAM
```

### GitHub, bio

```
Fundador de Mayofy. Webs con turnos online y sistemas a medida para negocios de servicios. https://mayofy.dev
```

### Pie de los sitios de clientes

```html
Hecho por <a href="https://mayofy.dev/?utm_source=cliente&utm_medium=referral&utm_campaign=credito">Mayofy</a>
```

En el sitio de cada cliente cambiar `cliente` por su nombre (`shineapp`, `gymg`, `juanikitro`). Así Analytics separa cada origen.

## Registro

- 2026-11-23: guía creada a partir de los tres documentos de origen. Nada hecho todavía.
- 2026-11-23: el coordinador publicó la versión nueva (master `89f798a`; sitemap.xml, og/home.jpg y los casos responden 200). Los pasos marcados "después de publicar" quedan habilitados.
- 2026-11-24: Juani pidió ejecutar los pasos con el MCP de Chrome. Se instaló Chrome DevTools MCP (`--autoConnect`) a pedido suyo; la sesión opera su Chrome con sus sesiones iniciadas, sin manejar contraseñas. Search Console terminado (ver sección 1).
- 2026-11-24: Bing, Cal.com (idioma), FormSubmit, vistas previas y Analytics hechos desde el Chrome de Juani (secciones 2, 4, 5 y 6). Quedan: Perfil de Google (necesita horario, dirección y la verificación de Juani), título del evento de Cal.com, enlaces en perfiles y WhatsApp desde el celular.
- 2026-11-24: Juani pasó horario y dirección. Cal.com quedó lunes a sábado 9 a 19. Perfil de Google creado y completado en lo básico; falta el video de verificación, que solo puede grabar Juani.
- 2026-11-24: Juani, sobre Google Ads: "quiero reclamar los 300000 creditos en google ads pero desde la pc no desde el clular". La oferta para anunciantes nuevos en Argentina (business.google.com/es-all/google-ads/) dice: "Invierte 300.000 ARS con Google Ads durante los primeros 60 días para acceder al crédito" de 300.000 ARS. El botón "Advertise" del perfil abrió el alta de una campaña inteligente en la cuenta de Google Ads 249-764-5529 (jpkitro@gmail.com), sin terminar. No se creó ninguna campaña ni se cargó un medio de pago: esperar la decisión de Juani sobre el gasto.
- 2026-11-24: Juani descartó la oferta de Google Ads ("entonces no"). Se cerró el alta sin crear campaña ni cargar pago.
- 2026-11-24: perfil de Google con servicios y fotos cargados mientras se revisa el video.

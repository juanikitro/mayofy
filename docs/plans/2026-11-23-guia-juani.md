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

### 2. Bing Webmaster Tools (unos 5 minutos, requiere el paso 1 verificado)

- [ ] Entrar a https://www.bing.com/webmasters con la misma cuenta de Google y elegir "Importar desde Google Search Console".
- [ ] Confirmar que `mayofy.dev` aparece verificado. El sitemap se importa solo si ya estaba enviado en Search Console; si no, se envía después de publicar.

### 3. Perfil de Empresa en Google (unos 45 minutos, más hasta 5 días hábiles de verificación)

Sigue la "Lista única para Juani" de `docs/plans/2026-11-22-perfil-google.md`.

- [ ] Antes: revisar en Google Maps las 6 zonas con ⚠ y decidir el horario real.
- [ ] Crear: nombre `Mayofy`, categoría "Diseñador de sitios web", sin local que se visite, las 20 zonas, teléfono, web con UTM, dirección solo para verificar.
- [ ] Verificar con el método que ofrezca Google (video si lo pide).
- [ ] Completar: descripción, categoría "Empresa de software", servicios, horario, atributos, enlaces (Cal.com, WhatsApp, Instagram, LinkedIn).
- [ ] Fotos de `docs/plans/perfil-google/`: logo, portada y 4 fotos.
- [ ] Publicación de la semana 1 lista.
- [ ] Pasar la URL pública del perfil al coordinador (va en `sameAs`, `src/lib/structured-data.ts`).

URL del perfil: _pendiente_.

### 4. Cal.com (unos 5 minutos)

- [ ] En el evento "Mayofy First Meeting", configuración avanzada → idioma de la interfaz: Español.
- [ ] Revisar el título del evento (hoy en inglés). Sugerido: `Charla inicial con Mayofy`. Si cambia la duración o el lugar, avisar: `src/content/site.ts` dice "30 minutos por videollamada".

### 5. FormSubmit (unos 5 minutos) **[después de publicar]**

- [ ] Mandar una consulta de prueba desde https://mayofy.dev/#contacto ("Completar un formulario"). Puede tardar hasta un minuto.
- [ ] En jpkitro@gmail.com (mirar también Spam y Promociones), abrir el correo de FormSubmit y tocar "Activate Form".
- [ ] Confirmar que llega la consulta con asunto "Nueva consulta desde mayofy.dev: …".

### 6. Vistas previas y Analytics (unos 10 minutos) **[después de publicar]**

- [ ] Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/): la home y un caso → "Volver a extraer".
- [ ] LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/): la home.
- [ ] WhatsApp guarda la vista previa por URL: para probar la nueva, compartir `https://mayofy.dev/?v=2`.
- [ ] Prueba de resultados enriquecidos (https://search.google.com/test/rich-results) con la home.
- [ ] Google Analytics → Informes → Tiempo real: abrir la web desde el celular y ver la visita.

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

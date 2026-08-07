# Mayofy — Diseño aprobado: Umbral Vivo

**Fecha:** 12 de julio de 2026  
**Estado:** dirección visual y sistema de movimiento aprobados; preview local implementado  
**Fuente de verdad comercial:** `BRIEF.md` y `CONTEXT.md`

## 1. Decisión

El Portfolio Mayofy usará `Umbral Vivo` como sistema creativo. La experiencia debe sentirse como cruzar desde una atención dispersa hacia una conversación concreta: una escena natural extraordinaria abre el recorrido, la oferta se vuelve progresivamente más clara y el cierre desemboca en WhatsApp o, de forma secundaria, en un formulario breve.

La página no será una galería personal ni una landing convencional de agencia. Será una pieza comercial que también demuestra criterio, dirección de arte y capacidad técnica.

## 2. Principios

1. **Conversión visible.** El hero explica qué hace Mayofy y muestra el CTA principal sin exigir scroll ni esperar animaciones.
2. **Naturaleza con función.** Cada escena expresa transformación, crecimiento, tensión o apertura; nunca funciona como decoración intercambiable.
3. **Continuidad nocturna.** Todo el recorrido permanece oscuro y separa emoción, evidencia y decisión mediante profundidad, ritmo y variaciones tonales continuas, no mediante bloques claros pegados a bloques negros.
4. **Marca honesta.** Mayofy habla como estudio; Juani aparece de forma personal cuando aporta confianza, sin simular un equipo.
5. **Prueba antes que promesa.** Los proyectos, cifras y señales de escala serán reales, autorizados o estarán claramente etiquetados como conceptuales.
6. **Movimiento con propósito.** Los efectos revelan profundidad y relaciones; la información esencial nunca depende de ellos.

## 3. Firma visual

### Paleta

- Ancla: `#00F69D`, reservada para acciones, focos, señales de vida y conexiones.
- Fondo principal: petróleo nocturno casi negro, con matiz frío.
- Texto principal: blanco mineral, no blanco puro.
- Texto secundario: gris verdoso desaturado.
- Superficies secundarias: petróleo elevado, azul mineral y verde profundo con contraste interno suficiente; no usar papel claro en la V1.
- Regla: el verde no ocupa grandes superficies continuas; aparece como energía y dirección.

Los valores definitivos se expresarán como tokens OKLCH. No habrá colores improvisados dentro de componentes.

### Tipografía

- Display: serif editorial de alto contraste, romana, para titulares breves y escenas manifiesto.
- Lectura: sans humanista limpia y contemporánea.
- Soporte: mono discreta únicamente para anotaciones, datos o señales técnicas.
- Base de exploración: Cormorant Garamond + General Sans + IBM Plex Mono. Antes de producción se verificará carga, licencia, legibilidad y rendimiento.

### Composición

- Hero Photographic Fold asimétrico con imagen dominante y bloque comercial legible.
- Navegación flotante compacta, con acceso directo a WhatsApp.
- Ritmo editorial variable; no repetir una grilla de tarjetas como unidad universal.
- Bordes, máscaras y líneas pueden responder a formas orgánicas del paisaje.
- En móvil, imagen, texto y CTA se recomponen como una escena propia; no se reduce el escritorio proporcionalmente.

## 4. Dirección del hero

### Mensaje de trabajo

**Titular:** “La consulta entra por acá.”  
**Apoyo:** “Cuando ya te miran por Instagram, Maps o recomendación, la página tiene que abrir una escena clara, humana y fácil de escribir.”  
**CTA principal:** “Escribinos por WhatsApp”  
**CTA secundario:** “Ver cómo trabajamos”

El copy sigue siendo borrador de diseño. Se revisará junto con el resto de la página antes de publicarlo.

### Imagen hero

La escena debe mostrar un paisaje húmedo y oscuro —bosque, manglar, humedal o vegetación monumental— atravesado por una abertura o corriente luminosa verde. Lo imposible debe surgir de la escala, la luz o la geometría natural, no de objetos fantásticos obvios.

Requisitos:

- credibilidad fotográfica;
- profundidad clara en primer plano, plano medio y fondo;
- espacio negativo previsto para el copy;
- crops independientes para escritorio y móvil;
- ausencia de personas, texto, edificios o iconografía tecnológica;
- textura orgánica, niebla controlada y luz física coherente;
- arte final optimizado en AVIF/WebP con fallback.

Durante implementación se producirá una exploración generada y se la tratará como asset de dirección de arte, no como fotografía documental.

## 5. Recorrido de la home

1. **Umbral / Hero.** Oferta, audiencia y WhatsApp dentro del primer pliegue.
2. **La atención ya existe.** Transición nocturna más abierta que explica el problema: Instagram, Maps y recomendaciones generan interés que una página debe ordenar.
3. **Trabajos seleccionados.** Dos o tres casos presentados como escenas distintas, con contexto y decisión comercial; no como miniaturas uniformes.
4. **Qué construimos primero.** Páginas web y landings como oferta central, explicadas mediante un recorrido visual desde interés hasta consulta.
5. **Cómo trabajamos.** Secuencia breve: entender, ordenar, diseñar, construir, publicar y medir.
6. **Capacidad para extender.** Automatizaciones, integraciones y herramientas personalizadas aparecen después de consolidar la oferta principal.
7. **Juani, detrás de Mayofy.** Retrato secundario, texto en primera persona y una o dos señales de experiencia verificables.
8. **Preguntas frecuentes.** Alcance, materiales, plazos, propuesta, atención remota y continuidad.
9. **Contacto.** WhatsApp inmediato como salida dominante y formulario breve como alternativa.

Los casos individuales tendrán su propia macroestructura basada en el material disponible; no serán clones de la home.

## 6. Movimiento

La V1 usa un sistema cinético expresivo pero acotado, concebido como un ecosistema nocturno vivo:

1. **Cámara única.** La escena usa una sola fotografía con un desplazamiento vertical máximo de 16 px y escala fija. La profundidad cercana proviene de un primer plano vectorial de cauce y raíces, no de repetir la textura fotográfica.
2. **Corriente vertebral.** Una línea orgánica estática recorre la home para relacionar el inicio, el proceso y el contacto sin repintarse en cada evento de scroll.
3. **Puentes naturales.** Agua, raíces, copa y niebla cruzan los límites entre secciones; cada puente se revela una vez al entrar en viewport y deja de consumir trabajo después.
4. **Atmósfera contenida.** La respiración lumínica se limita al hero y anima únicamente opacidad. No se usa Canvas global, blur de fondo fijo ni mezcla de pantalla sobre todo el viewport.
5. **Respuesta comercial.** Los CTAs principales tienen atracción magnética breve y los contenidos entran con direcciones alternadas, siempre mediante `transform` y `opacity`.

No hay scroll secuestrado, cursor personalizado ni información esencial dependiente del movimiento. La ejecución es progresiva: `full` habilita el parallax corto y los reveals; `lite` y `reduced` presentan la corriente, el primer plano y los puentes estáticos, sin movimiento espacial.

## 7. Componentes y contenido

- `SiteHeader`: wordmark, navegación mínima y WhatsApp.
- `HeroThreshold`: escena, titular, apoyo y dos acciones.
- `AttentionTransition`: puente entre problema y propuesta.
- `ProjectPortal`: presentación adaptable a cada caso, no card genérica.
- `OfferPath`: explicación visual del servicio principal.
- `ProcessSequence`: seis pasos sin convertirlos en un grid de iconos.
- `CapabilitiesAside`: capacidades complementarias subordinadas.
- `FounderTrust`: retrato y voz personal de Juani.
- `Faq`: preguntas reales con interacción accesible.
- `ContactThreshold`: CTA principal y formulario alternativo.
- `SiteFooter`: canales activos y datos mínimos.

El contenido se almacenará en archivos TypeScript estructurados. No habrá CMS, base de prospectos ni panel administrativo en la V1.

## 8. Fotografía de Juani

Se necesitará una fotografía horizontal o vertical flexible para `FounderTrust`, no para el hero.

Brief sugerido:

- plano medio o medio corto, torso ligeramente de perfil y mirada a cámara;
- luz natural lateral suave, sin aro de luz visible;
- fondo oscuro neutro o exterior con vegetación desenfocada;
- ropa lisa en negro, petróleo, gris o crudo; evitar verde saturado y estampas;
- expresión tranquila y directa, no pose corporativa ni brazos cruzados;
- archivo original, sin filtros ni recorte, idealmente de 3000 px o más en el lado largo;
- tomar también una variante con espacio negativo a un costado.

## 9. Accesibilidad y rendimiento

- Contraste AA para texto, controles y foco visible.
- Semántica y navegación completa por teclado.
- Objetivos táctiles mínimos de 44 px.
- CTAs y enlaces no se parten en dos líneas en anchos objetivo.
- Verificación en 320, 375, 414, 768 y escritorio.
- Hero textual disponible en HTML antes de la imagen o de cualquier efecto.
- Imagen responsive con prioridad solo para el recurso crítico.
- Efectos secundarios diferidos y degradación automática en dispositivos modestos.
- Sin desbordamiento horizontal; `overflow-x: clip`, nunca ocultamiento de errores con `hidden`.

## 10. Conversión y medición

- Cada CTA de WhatsApp llevará un mensaje contextual según la sección de origen.
- El formulario pedirá solo nombre, actividad, contacto y necesidad.
- Eventos mínimos: clic a WhatsApp, envío exitoso del formulario, apertura de un caso y fuente conocida.
- No se almacenará información adicional sin una necesidad operativa concreta.
- La herramienta de analítica y el mecanismo antispam se elegirán antes de implementar contacto.

## 11. Criterios de aceptación visual

- La oferta puede entenderse en menos de diez segundos sin ver el resto de la página.
- La escena hero se siente propia de Mayofy y no como una imagen de stock o un render genérico de IA.
- WhatsApp aparece antes del primer scroll significativo en escritorio y móvil.
- El recorrido muestra al menos tres cambios claros de atmósfera sin perder continuidad.
- La presencia de Juani aporta confianza pero no convierte el sitio en una marca personal.
- Automatizaciones e integraciones no compiten con páginas web y landings.
- Ninguna sección depende de métricas, testimonios o proyectos inventados.

## 12. Decisiones pendientes antes de publicar

- número final de WhatsApp y correo;
- lista y material de proyectos;
- una o dos señales de experiencia verificables;
- fotografía de Juani;
- proveedor de formulario, antispam y analítica;
- copy final aprobado;
- dominio definitivo cuando corresponda.

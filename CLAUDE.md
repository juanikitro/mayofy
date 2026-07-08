# CLAUDE.md

Preferencias explícitas del usuario para este repositorio. Tienen prioridad sobre el ruteo por defecto del CLAUDE.md global.

## División de roles: Claude diseña, Codex programa

- **Diseño de landings: Claude Code, siempre.** El diseño se hace en la sesión de Claude con la skill `frontend-design` cargada. El usuario comparó resultados y prefiere el diseño de Claude. Claude NO delega el diseño a Codex ni a subagentes.
- **Programación/implementación: Codex, siempre que esté disponible.** El usuario tiene más tokens en la suscripción de Codex. Una vez definido el diseño, Claude delega la escritura del código a Codex vía `/codex:rescue`.
- **Revisión: Claude.** Claude revisa el código que devuelve Codex contra el brief de diseño y `docs/DESIGN_STANDARDS.md` antes de generar y correr QA.

## Qué entrega Claude como "diseño"

El output de la fase de diseño es un brief de implementación por landing, listo para pasarle a Codex. Debe incluir:

- Dirección de arte con nombre propio y tesis visual (ej.: "Cartel de cerrajería porteña"), derivada de las fotos reales del negocio.
- Par tipográfico exacto (Google Fonts) y paleta en CSS variables (dominante + acento para CTA).
- Estructura de secciones con jerarquía, composición del hero y motivos gráficos del oficio (SVG/CSS inline).
- Copy completo en español argentino con datos verificados: titulares, CTAs, reseñas literales con autor, horarios, teléfonos y links (tel:/wa.me/Maps).
- Contrato QA que el código debe cumplir (footer exacto `Creado por JuaniKitro`, palabras prohibidas, imágenes locales, sin datos inventados — ver `docs/DESIGN_STANDARDS.md` punto 10 y `docs/DATA_RULES.md`).
- Plan de motion (reveals, reduced-motion) y requisitos mobile (barra sticky de llamada, CTA arriba del fold).

## Gate del diseño

La etapa de diseño está formalizada como el agente `design-director` (`agents/design-director.md`), entre `site-planner` y `copywriter`. Su entregable —`conversion_template` + `design_brief` con `designed_by: "claude-code"`— es un dato requerido y validado, no solo una convención:

- `npm run qa:design` falla si algún spec no tiene `conversion_template`, `design_brief` completo o el sello `designed_by: "claude-code"`.
- `npm run generate ... --require-design-brief` rechaza generar el sitio final sin ese brief firmado.

Correr `qa:design` después de escribir los specs y antes de delegar el código a Codex. El sello `designed_by` es autodeclarado (no prueba técnicamente quién diseñó), pero hace del split un artefacto explícito y revisable en cada spec.

## Estándares de calidad

`docs/DESIGN_STANDARDS.md` define los golden samples vigentes: las 3 landings de `amba-alta-conversion`. Toda landing nueva debe igualar esa barra. No degradarla ni aceptar output de Codex que quede por debajo; si el resultado no llega, iterar con `/codex:rescue --resume` con correcciones puntuales.

## Fallback

Si Codex no está disponible por límites de uso, Claude implementa directo y lo reporta en una línea (regla del CLAUDE.md global). El diseño no cambia de dueño en ningún caso.

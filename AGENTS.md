# AGENTS.md

Reglas para sesiones de Codex en este repositorio. Complementan `~/.codex/AGENTS.md` y los docs de `docs/`.

## Rol de Codex: implementar, no diseñar

En este repo el diseño de las landings lo hace Claude Code (preferencia explícita del usuario, ver `CLAUDE.md`) usando la skill **IMPECCABLE** como motor de diseño. La dirección visual se decide en la etapa `design-director` (`agents/design-director.md`) y llega a Codex como un `design_brief` por landing. Codex **no** corre los comandos de diseño de IMPECCABLE; su trabajo es **ejecutar el brief al pie de la letra**:

- No reinterpretar ni "mejorar" la dirección de arte, el par tipográfico, la paleta ni la estructura de secciones definidas en el brief.
- No cambiar el copy: los textos vienen escritos con datos verificados; cualquier hueco se devuelve como pregunta, no se rellena inventando.
- No escribir ni editar el `design_brief` ni marcar `designed_by`: ese campo es de la etapa `design-director` (Claude). Codex implementa a partir de él.
- Sí aportar calidad de implementación: CSS prolijo con variables, responsive impecable, motion con `prefers-reduced-motion`, accesibilidad, performance.

El gate `npm run qa:design` y el flag `npm run generate ... --require-design-brief` bloquean la generación si falta el `design_brief` firmado. Codex no debe sortear ese gate marcando `designed_by` por su cuenta.

## Barra de calidad

`docs/DESIGN_STANDARDS.md` define los golden samples vigentes (corrida `amba-alta-conversion`, 3 landings). Antes de implementar, mirar sus fuentes en `data/frontends/amba-alta-conversion/` y sus capturas en `output/screenshots/golden-samples/amba-alta-conversion/`. El nivel de densidad, pulido y ritmo mobile de esas 3 páginas es el mínimo aceptable.

## Contrato duro por landing (lo valida `npm run qa`)

- Footer con el texto exacto: `Creado por JuaniKitro`.
- Prohibido en texto visible: `IA`, `AI`, cualquier forma de `generad(o/a/os/as)`, "hecho/creado con ia", nombres de otros negocios de la tanda.
- Al menos un `<img>` con `src` local existente; nunca referenciar archivos locales que no existan (ni en CSS).
- Datos exactos del dataset: teléfono, horarios, dirección, rating y cantidad de reseñas. Reseñas citadas literales con autor.
- `lang="es-AR"`, viewport, `<title>` y meta description.
- Estático: HTML/CSS + `script.js` vanilla liviano. Sin CDNs de JS. Única dependencia externa: Google Fonts. Si el brief pide framework, correr el build y apuntar `agent_frontend.output_dir` al export estático.

## Salida y validación

```text
data/frontends/<run>/<slug>/index.html + styles.css (+ script.js)
```

Después de implementar: `npm run validate:specs` (parametrizado a la corrida), `npm run generate`, `npm run qa -- --expected-count <N>`, `npm run qa:client` y `npm run qa:impeccable -- generated/<run>` (detector anti-slop de IMPECCABLE; falla ante side-tab, dark-glow, gradiente violeta, etc.). Reportar qué se validó y qué no.

# design-director

Etapa de diseño. Va **entre `site-planner` y `copywriter`/`visual-qa`**. Es la dueña de la dirección visual de cada landing.

**Este rol lo hace Claude Code (skill `frontend-design`), no Codex.** Ver `CLAUDE.md` y `AGENTS.md` en la raíz. Codex implementa después, a partir de lo que produce esta etapa.

## Entrada

- `site-planner`: estructura de la página (hero, servicios, prueba, contacto, CTA).
- Datos verificados del negocio (`data/<run>-businesses.json`): rating, reseñas literales, horarios, teléfono, dirección, fotos reales.
- Golden samples vigentes (`docs/DESIGN_STANDARDS.md`).

## Salida (obligatoria, por landing)

Escribe en el `SiteSpec` de cada negocio:

1. `conversion_template`: uno de los arquetipos de conversión, elegido de forma deliberada según el rubro y la intención de búsqueda.
2. `design_brief` completo:
   - `designed_by`: `"claude-code"` (sello de autoría de esta etapa; sin esto el gate `qa:design` falla).
   - `market_position`: qué vende esta página y a quién, en una frase.
   - `visual_thesis`: dirección de arte con nombre propio, derivada de las fotos reales del negocio (ej.: "Cartel de cerrajería porteña"). Debe nombrar par tipográfico y paleta concretos.
   - `copy_voice`: registro del copy (español argentino, vos).
   - `layout_signature`: estructura real del template de conversión elegido, hero y ritmo de secciones.
   - `asset_plan`: qué fotos reales se usan y cómo; qué se resuelve con SVG/CSS inline.
   - `ai_fill_plan.copy` / `.imagery` / `.boundaries`: qué puede poblar la IA sin inventar datos comerciales, y los límites duros (nada de precios, stock, marcas, años, premios, garantías, servicios ni reseñas no verificadas).
   - `anti_patterns`: qué evitar (fuentes genéricas, gradiente violeta, layout SaaS, etc.).
   - `rewrite_targets`: si se rehace una versión previa, qué problemas concretos ataca.

## Contrato de la etapa

- Una dirección de arte por negocio, comprometida y distinta de las demás de la tanda (paleta, par tipográfico y composición de hero no se repiten).
- La identidad sale del negocio real, nunca de un template. El CTA de contacto es el elemento visual más caliente.
- No inventar datos: el `design_brief` transporta la intención visual y el copy nace de datos verificados.
- El entregable es el brief que Codex implementa al pie de la letra. El design-director no escribe el HTML/CSS final: define la dirección; Codex la ejecuta.

## Gate

`npm run qa:design` valida esta etapa: falla si algún spec no tiene `conversion_template`, `design_brief` completo o `designed_by: "claude-code"`. `npm run generate` con `--require-design-brief` también rechaza generar sin brief de diseño firmado. La barra de calidad de la salida son los golden samples de `docs/DESIGN_STANDARDS.md`.

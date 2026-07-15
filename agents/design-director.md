# design-director

Etapa de diseño. Va **entre `site-planner` y `copywriter`/`visual-qa`**. Es la dueña de la dirección visual de cada landing.

**Este rol lo hace Claude Code, no Codex.** Ver `CLAUDE.md` y `AGENTS.md` en la raíz. Codex implementa después, a partir de lo que produce esta etapa.

## Motor de diseño obligatorio: IMPECCABLE

La dirección de arte y el `design_brief` se producen **usando la skill IMPECCABLE** (register `brand`), que es el motor de diseño por defecto del repo. `frontend-design` queda como fallback compatible, no como default.

Setup por sesión (una vez): `node .agents/skills/impeccable/scripts/context.mjs` (o `.claude/skills/...`), que carga `PRODUCT.md` y `DESIGN.md` del repo. Si la skill no está materializada en un clon nuevo, correr `npm run impeccable:install`.

Flujo de diseño con IMPECCABLE, por landing:

1. `shape` — entrevista de diseño y brief a partir de los datos verificados del negocio y sus fotos reales (register `brand`, ver `reference/brand.md`).
2. `critique` — revisión crítica de la dirección propuesta contra el anti-slop y la barra de los golden samples.
3. Volcar el resultado al `design_brief` del `SiteSpec` (contrato de salida, abajo). IMPECCABLE se usa para **decidir la dirección y firmar el brief**, no para que un agente escriba el HTML final salteando el gate.

Todo lo que sugiera IMPECCABLE (copy, assets, paleta) queda subordinado a `docs/DATA_RULES.md` (nada inventado, footer `Creado por JuaniKitro`, imágenes locales) y a `docs/DESIGN_STANDARDS.md`. El sello `designed_by: "claude-code"` y el contrato de salida no cambian.

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

Además, `npm run qa:impeccable` corre el detector determinístico de IMPECCABLE sobre las landings generadas y falla ante slop. Es una capa de calidad **adicional** a `qa:design`/`qa`/`qa:client`, no un reemplazo. Los 3 golden samples de `amba-alta-conversion` están excepcionados por archivo en `.impeccable/config.json` (output aprobado); toda landing nueva se scanea completa.

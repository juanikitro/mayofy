# Agent Guide

Los agentes trabajan por etapas. Ningun agente puede inventar datos ni relajar validaciones finales.

Division de roles creativos: el diseno de las landings lo hace Claude Code y la implementacion la hace Codex (ver `CLAUDE.md` y `AGENTS.md` en la raiz, y `docs/DESIGN_STANDARDS.md` para la barra de calidad).

## Orden sugerido

1. `business-researcher`
2. `data-verifier`
3. `brand-extractor`
4. `site-planner`
5. `design-director` — dueño de la dirección visual; produce `conversion_template` y `design_brief` (firmado `designed_by: "claude-code"`). Lo hace Claude, no Codex. Ver `agents/design-director.md`.
6. `copywriter`
7. `visual-qa`
8. `deployer`

La etapa `design-director` tiene su propio gate: `npm run qa:design` falla si algún spec no trae `conversion_template`, `design_brief` completo o `designed_by: "claude-code"`, y `npm run generate` con `--require-design-brief` rechaza generar sin ese brief.

## Contrato comun

Cada agente debe devolver:

- entradas usadas
- salidas producidas
- fuentes revisadas
- decisiones tomadas
- riesgos o datos faltantes

Si un dato no se puede verificar, debe quedar como `null` o bloquear aprobacion final.

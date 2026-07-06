# Agent Guide

Los agentes trabajan por etapas. Ningun agente puede inventar datos ni relajar validaciones finales.

## Orden sugerido

1. `business-researcher`
2. `data-verifier`
3. `brand-extractor`
4. `site-planner`
5. `copywriter`
6. `visual-qa`
7. `deployer`

## Contrato comun

Cada agente debe devolver:

- entradas usadas
- salidas producidas
- fuentes revisadas
- decisiones tomadas
- riesgos o datos faltantes

Si un dato no se puede verificar, debe quedar como `null` o bloquear aprobacion final.

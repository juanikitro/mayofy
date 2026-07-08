# Deployment

El deploy a Vercel es automatico. No hay comando local que publique nada.

## Disparadores

`.github/workflows/deploy-vercel.yml` corre:

- En cada push a `main` que modifique `data/*-businesses.json`, `data/site-specs/*.json` o `data/frontends/**`. `scripts/detect-deploy-runs.mjs` detecta que tanda(s) cambiaron a partir del diff.
- Manualmente via `workflow_dispatch`, pasando el nombre de la tanda (`run`) y opcionalmente un `vercel_scope`.

## Que hace el workflow por cada tanda detectada

1. `npx tsx src/validators/validate-design-gate.ts` — exige `conversion_template` + `design_brief` firmado (`designed_by: "claude-code"`).
2. `npx tsx src/generator/generate-sites.ts ... --require-real-images --require-agent-frontends` — genera `generated/<run>/`.
3. `npx tsx src/validators/validate-generated-sites.ts --session <run> --require-agent-frontends` — QA tecnico.
4. `npx tsx src/validators/validate-client-readiness.ts --session <run> --min-score 85` — gate de entrega a cliente.
5. `node scripts/deploy-generated.mjs --session <run>` — publica cada sitio de `generated/<run>/manifest.json` como proyecto `local-<slug>` en Vercel y escribe un resumen (`GITHUB_STEP_SUMMARY` o consola).

Si cualquier paso falla, no se publica esa tanda.

## Secrets requeridos

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID` (opcional segun cuenta)
- `VERCEL_SCOPE` (opcional, o se pasa por `workflow_dispatch`)

## URLs finales

`scripts/deploy-generated.mjs` imprime/anota una tabla con negocio, slug, proyecto, estado y URL por sitio deployado. Esa tabla es el registro de entrega; no hace falta llevarlo a mano.

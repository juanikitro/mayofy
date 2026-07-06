# ia-landing-generator

Base reusable para investigar negocios locales reales, verificar datos con evidencia y generar un sitio estatico separado por negocio.

El repositorio empieza sin datos reales finales. `data/tandil-businesses.json` existe como destino del caso Tandil, pero queda vacio hasta cargar negocios verificados desde fuentes permitidas. Los fixtures bajo `data/fixtures/` son mock y nunca deben usarse para deploy final.

## Stack

- TypeScript para scripts, validadores y generador.
- JSON como fuente inicial de datos.
- HTML/CSS estatico generado por negocio, con arquetipos reutilizables.
- Vercel preparado como opcion de deploy por carpeta generada, sin ejecutar deploys automaticamente.

Elegimos generacion estatica directa en vez de Next/Astro para la base inicial porque el requisito central es producir 10 builds independientes y repetibles. El generador puede migrar a Astro mas adelante sin cambiar el contrato del dataset.

## Comandos

```bash
npm install
npm run validate:mock
npm run generate:mock
npm run qa:mock
```

Cuando existan 10 negocios reales aprobados:

```bash
npm run compose:local
npm run validate:data
npm run generate
npm run qa
npm run deploy:plan
```

Para componer la direccion visual/copy con OpenAI:

```bash
$env:OPENAI_API_KEY="..."
npm run compose:ai
```

El flujo recomendado es agent-first, no API-first:

```bash
npm run agent:briefs:tandil
# Codex/Claude edita data/site-specs/tandil-site-specs.json usando la sesion actual
npm run validate:specs:tandil
npm run generate:preview
npm run qa
```

`compose:ai` queda como opcion secundaria para quien quiera usar billing de OpenAI API. `npm run generate` exige fotos reales descargadas desde Google Places. Para revisar UI sin bloquear por fotos, usar `npm run generate:preview`.

## Busqueda automatica de candidatos

Con Google Places API:

```bash
$env:GOOGLE_PLACES_API_KEY="..."
npm run search:tandil
npm run validate:intake
```

Esto genera `data/intake/tandil-candidates.json` con candidatos no aprobados. Sirve para acelerar investigacion, no para deploy directo.

Shortlist automatico y promocion al dataset final:

```bash
npm run shortlist:tandil
npm run promote:tandil
npm run compose:local
npm run validate:data
npm run generate
npm run qa
```

## Flujo

1. Buscar candidatos reales con `npm run search:tandil`.
2. Generar shortlist con `npm run shortlist:tandil`.
3. Promover 10 negocios con `npm run promote:tandil`.
4. Preparar briefs con `npm run agent:briefs:tandil`.
5. Codex/Claude escribe `data/site-specs/tandil-site-specs.json` usando la sesion actual.
6. Validar specs con `npm run validate:specs:tandil`.
7. Validar que no haya datos inventados ni negocios con sitio propio.
8. Generar un sitio separado por negocio en `generated/<slug>/`.
9. Ejecutar QA de contenido y reglas visuales.
10. Crear plan de deploy para 10 URLs separadas.

Ver detalles en `docs/PIPELINE.md`, `docs/DATA_RULES.md` y `docs/DEPLOYMENT.md`.

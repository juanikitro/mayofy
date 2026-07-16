# Santiago de Chile Agent Briefs

Use these briefs from a Codex/Claude session to rewrite the configured site specs file.

- city: Santiago de Chile
- segment: lavadero y detailing de autos
- specs: data/site-specs/santiago-automotor-site-specs.json

Recommended flow:

```powershell
npm run agent:briefs -- --input data/santiago-automotor-businesses.json --specs data/site-specs/santiago-automotor-site-specs.json --out data/agent-briefs/santiago-automotor --city "Santiago de Chile" --segment "lavadero y detailing de autos"
# Agent edits data/site-specs/santiago-automotor-site-specs.json
npm run validate:specs -- --businesses data/santiago-automotor-businesses.json --specs data/site-specs/santiago-automotor-site-specs.json
npm run generate:preview -- data/santiago-automotor-businesses.json --specs data/site-specs/santiago-automotor-site-specs.json --session santiago-de-chile-lavadero-y-detailing-de-autos
npm run generate -- data/santiago-automotor-businesses.json --specs data/site-specs/santiago-automotor-site-specs.json --session santiago-de-chile-lavadero-y-detailing-de-autos
npm run qa -- --session santiago-de-chile-lavadero-y-detailing-de-autos
```

Remake flow for an existing weak batch:

```powershell
npm run agent:briefs -- --input <businesses.json> --specs <site-specs.json> --out <briefs-dir> --city "Santiago de Chile" --segment "lavadero y detailing de autos" --remake-from <generated-run-dir> --screenshots <screenshots-dir>
```

Each remake brief includes current HTML/CSS excerpts and screenshot paths when available. Replace the frontend instead of preserving a weak structure.

Businesses:

1. [Infinity X Car Detail](./infinity-x-car-detail.md)
2. [VAPOR CAR](./vapor-car.md)
3. [Lavado de autos El Cafetero 2](./lavado-de-autos-el-cafetero-2.md)

# San Carlos de Bariloche Agent Briefs

Use these briefs from a Codex/Claude session to rewrite the configured site specs file.

- city: San Carlos de Bariloche
- segment: escuelas de ski y snowboard, alquiler de equipos y traslados al Cerro Catedral
- specs: data/site-specs/bariloche-ski-site-specs.json

Recommended flow:

```powershell
npm run agent:briefs -- --input data/bariloche-ski-businesses.json --specs data/site-specs/bariloche-ski-site-specs.json --out data/agent-briefs/bariloche-ski --city "San Carlos de Bariloche" --segment "escuelas de ski y snowboard, alquiler de equipos y traslados al Cerro Catedral"
# Agent edits data/site-specs/bariloche-ski-site-specs.json
npm run validate:specs -- --businesses data/bariloche-ski-businesses.json --specs data/site-specs/bariloche-ski-site-specs.json
npm run generate:preview -- data/bariloche-ski-businesses.json --specs data/site-specs/bariloche-ski-site-specs.json --session san-carlos-de-bariloche-escuelas-de-ski-y-snowboard-alquiler-de-equipos-y-traslados-al-cerro-catedral
npm run generate -- data/bariloche-ski-businesses.json --specs data/site-specs/bariloche-ski-site-specs.json --session san-carlos-de-bariloche-escuelas-de-ski-y-snowboard-alquiler-de-equipos-y-traslados-al-cerro-catedral
npm run qa -- --session san-carlos-de-bariloche-escuelas-de-ski-y-snowboard-alquiler-de-equipos-y-traslados-al-cerro-catedral
```

Remake flow for an existing weak batch:

```powershell
npm run agent:briefs -- --input <businesses.json> --specs <site-specs.json> --out <briefs-dir> --city "San Carlos de Bariloche" --segment "escuelas de ski y snowboard, alquiler de equipos y traslados al Cerro Catedral" --remake-from <generated-run-dir> --screenshots <screenshots-dir>
```

Each remake brief includes current HTML/CSS excerpts and screenshot paths when available. Replace the frontend instead of preserving a weak structure.

Businesses:

1. [Sandrik - Alquiler ropa nieve](./sandrik-alquiler-ropa-nieve.md)
2. [SRN.Rental Alquiler de Ropa de nieve - Ski & snowboard](./srn-rental-alquiler-de-ropa-de-nieve-ski-snowboard.md)
3. [Nestor Ski](./nestor-ski.md)
4. [El Russo Rental](./el-russo-rental.md)
5. [Tierra de Mestizos Rental](./tierra-de-mestizos-rental.md)
6. [Epic Bariloche](./epic-bariloche.md)
7. [Aluguel Ropa para nieve](./aluguel-ropa-para-nieve.md)
8. [Alquiler Ropa Para Nieve](./alquiler-ropa-para-nieve.md)
9. [Bari Snow](./bari-snow.md)
10. [Travesías Ropa De Nieve](./travesias-ropa-de-nieve.md)

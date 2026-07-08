# CABA y AMBA Agent Briefs

Use these briefs from a Codex/Claude session to rewrite the configured site specs file.

- city: CABA y AMBA
- segment: servicios de alta conversion
- specs: data/site-specs/amba-alta-conversion-site-specs.json

Recommended flow:

```powershell
npm run agent:briefs
# Agent edits data/site-specs/tandil-site-specs.json
npm run validate:specs
npm run generate:preview
npm run qa
```

Businesses:

1. [Cerrajería La Madrileña](./cerrajeria-la-madrilena.md)
2. [Depilación Definitiva (Guapísimas Depilación)](./depilacion-definitiva-guapisimas-depilacion.md)
3. [CALDERAS YA !!! SERVICE 24 Hs.](./calderas-ya-service-24-hs.md)

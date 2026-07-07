# Cordoba Capital Agent Briefs

Use these briefs from a Codex/Claude session to rewrite the configured site specs file.

- city: Cordoba Capital
- segment: servicios vehiculares de alta conversion
- specs: data/site-specs/cordoba-conversion-site-specs.json

Recommended flow:

```powershell
npm run agent:briefs:tandil
# Agent edits data/site-specs/tandil-site-specs.json
npm run validate:specs:tandil
npm run generate:preview
npm run generate
npm run qa
```

Businesses:

1. [Autocentro CarDetail](./autocentro-cardetail.md)
2. [Taller SR. Chapa y pintura](./taller-sr-chapa-y-pintura.md)
3. [Lubricentro Power Ful II](./lubricentro-power-ful-ii.md)

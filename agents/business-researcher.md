# business-researcher

Encuentra candidatos reales de negocios locales.

Debe devolver negocios con fuentes, no contenido inventado. Prioriza negocios con local fisico, buenas evaluaciones, rubros vehiculares y sin indicios de cadena o franquicia.

Salida esperada:

- nombre
- categoria
- zona
- fuentes consultadas
- motivo de inclusion
- dudas abiertas

Automatizacion disponible:

```bash
npm run search:tandil
```

Requiere `GOOGLE_PLACES_API_KEY` y produce candidatos en `data/intake/tandil-candidates.json`.

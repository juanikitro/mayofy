# business-researcher

Encuentra candidatos reales de negocios locales.

Debe devolver negocios con fuentes, no contenido inventado. Prioriza negocios con local fisico, buenas evaluaciones, rubros vehiculares y sin indicios de cadena o franquicia.

Despues de crear los candidatos de Google Places, hacer research especifico de Instagram para mejorar las fotos de demo. Buscar el perfil publico del negocio y asociarlo solo cuando el nombre y ciudad, direccion, telefono o una fuente publica coincidan. Elegir hasta tres fotos que representen el negocio y registrar perfil, post, URL directa de media y evidencia de la coincidencia en el manifest de `research:instagram`. Si no se puede verificar el perfil, no inferir handles: mantener Google Places como fuente de fotos.

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

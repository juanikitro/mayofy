# Prompt To Agent

El disparador recomendado es una sesion de Codex/Claude. El usuario pide una ciudad y un rubro; el agente ejecuta busqueda, shortlist, promocion, briefs, specs, generacion y QA.

## Prompt ejemplo

```text
Genera 10 landings para negocios reales de venta de ropa en Chivilcoy, Argentina.
Hace desde la busqueda hasta los sitios generados.
Usa datos verificados, evita cadenas/franquicias y negocios con web propia.
No uses OpenAI API; usa esta sesion de agente para la composicion.
```

## Flujo que debe ejecutar el agente

Elegir un slug de corrida, por ejemplo:

```text
chivilcoy-ropa
```

Buscar candidatos:

```powershell
npm run search -- --city Chivilcoy --country Argentina --segment "venta de ropa" --not-vehicle-related --queries "tienda de ropa|indumentaria|boutique|ropa mujer|ropa hombre|ropa infantil|zapateria|lenceria" --exclude "nike|adidas|puma|grisino|mimo|cheeky|open sports|dexter" --out data/intake/chivilcoy-ropa-candidates.json --limit 40
```

Validar intake:

```powershell
tsx src/validators/validate-dataset.ts data/intake/chivilcoy-ropa-candidates.json --allow-incomplete
```

Generar shortlist:

```powershell
npm run shortlist -- --input data/intake/chivilcoy-ropa-candidates.json --out data/intake/chivilcoy-ropa-shortlist.json --limit 10 --terms "ropa|indumentaria|boutique|moda|prenda|zapateria|lenceria" --title "Chivilcoy ropa shortlist"
```

Promover dataset final de la corrida:

```powershell
npm run promote -- --input data/intake/chivilcoy-ropa-shortlist.json --out data/chivilcoy-ropa-businesses.json --limit 10
```

Crear specs fallback y briefs para el agente:

```powershell
tsx src/site-specs/compose-site-specs.ts --provider local --input data/chivilcoy-ropa-businesses.json --out data/site-specs/chivilcoy-ropa-site-specs.json
npm run agent:briefs -- --input data/chivilcoy-ropa-businesses.json --specs data/site-specs/chivilcoy-ropa-site-specs.json --out data/agent-briefs/chivilcoy-ropa --city Chivilcoy --segment "venta de ropa"
```

El agente debe leer `data/agent-briefs/chivilcoy-ropa/` y reescribir:

```text
data/site-specs/chivilcoy-ropa-site-specs.json
```

Validar specs:

```powershell
npm run validate:specs -- --businesses data/chivilcoy-ropa-businesses.json --specs data/site-specs/chivilcoy-ropa-site-specs.json
```

Generar preview:

```powershell
tsx src/generator/generate-sites.ts data/chivilcoy-ropa-businesses.json --specs data/site-specs/chivilcoy-ropa-site-specs.json --out generated/chivilcoy-ropa
tsx src/validators/validate-generated-sites.ts generated/chivilcoy-ropa
```

Generar final con fotos reales:

```powershell
tsx src/generator/generate-sites.ts data/chivilcoy-ropa-businesses.json --specs data/site-specs/chivilcoy-ropa-site-specs.json --out generated/chivilcoy-ropa --require-real-images
tsx src/validators/validate-generated-sites.ts generated/chivilcoy-ropa
```

## Responsabilidad del agente

- Ajustar queries si la busqueda no devuelve 10 candidatos buenos.
- Revisar el shortlist report antes de promover si el rubro trae falsos positivos.
- Editar los `site-specs` usando criterio visual y copy natural.
- No inventar marcas, stock, precios, descuentos, talles ni envios.
- Reportar si el rubro o ciudad no tiene datos suficientes.

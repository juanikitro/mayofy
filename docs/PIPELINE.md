# Pipeline

## Fase 1: repo base

Estructura, schema, validadores, generador, arquetipos, agentes, skills y docs iniciales.

## Fase 2: dataset schema

`data/tandil-businesses.json` debe contener solo negocios reales. El archivo puede estar vacio mientras no haya datos verificados.

Validacion:

```bash
npm run validate:data
```

Este comando exige exactamente 10 negocios aprobados y rechaza mocks.

## Fase 3: investigacion e importacion

Fuentes permitidas:

- API oficial.
- Export del usuario.
- Busqueda autorizada.
- Carga manual asistida.
- URLs publicas verificables.

Importar un export JSON ya verificado:

```bash
npm run import:businesses -- --input verified-export.json
```

No se incluye scraping agresivo ni scraping que viole terminos de servicio.

### Busqueda automatica con Google Places

Configurar una API key en la shell:

```bash
$env:GOOGLE_PLACES_API_KEY="..."
```

Buscar candidatos vehiculares en Tandil:

```bash
npm run search:tandil
npm run validate:intake
```

El resultado se guarda en `data/intake/tandil-candidates.json`.

Esta salida no aprueba negocios para deploy. Marca `approved_for_generation: false`. Por configuracion local, las fotos de Google Places se cargan como `allowed` por defecto. Los candidatos con `websiteUri` informado por Google Places se descartan automaticamente.

Crear shortlist automatico:

```bash
npm run shortlist:tandil
```

El comando escribe:

- `data/intake/tandil-shortlist.json`
- `data/intake/tandil-shortlist.report.md`

Promover los 10 negocios al dataset final:

```bash
npm run promote:tandil
npm run validate:data
```

Componer direccion visual, estructura y copy por negocio:

```bash
npm run agent:briefs
```

Luego Codex/Claude debe editar `data/site-specs/tandil-site-specs.json` desde la sesion de agente. Validar:

```bash
npm run validate:specs
```

`npm run compose:local` queda como fallback mecanico. `npm run compose:ai` queda como opcion secundaria con billing de OpenAI API; no usa tokens de Codex Desktop.

El generador usa `data/site-specs/tandil-site-specs.json` para variar mood visual, composicion, CTAs, proof points, recursos y textos por negocio.

Variables opcionales:

```bash
$env:LOCAL_WEB_SEARCH_MIN_RATING="4.3"
$env:LOCAL_WEB_SEARCH_MIN_REVIEWS="10"
```

## Fase 4: generacion visual

Probar con fixture mock:

```bash
npm run validate:mock
npm run generate:mock
```

Generar final:

```bash
npm run generate
```

Cada negocio aprobado crea una carpeta `generated/<slug>/` con `index.html`, `styles.css` y `site.json`.

`npm run generate` exige `GOOGLE_PLACES_API_KEY` y descarga la foto principal a `generated/<slug>/assets/`. Si queres revisar UI sin fotos reales, usar:

```bash
npm run generate:preview
```

## Fase 5: QA

```bash
npm run qa
```

Controla cantidad de sitios, footer, texto prohibido, datos cruzados, arquetipos, paletas, tipografias y carpetas separadas.

## Fase 6: deploy

```bash
npm run deploy:plan
```

El comando escribe `generated/deploy-plan.json`. No publica nada. El deploy real debe ejecutarse explicitamente.

## Repetir con otra ciudad

1. Crear `data/<ciudad>-businesses.json`.
2. Cargar negocios con la misma estructura.
3. Ejecutar `tsx src/validators/validate-dataset.ts data/<ciudad>-businesses.json --strict-final`.
4. Ejecutar `tsx src/generator/generate-sites.ts data/<ciudad>-businesses.json --out generated/<ciudad>`.
5. Ejecutar `tsx src/validators/validate-generated-sites.ts generated/<ciudad>`.

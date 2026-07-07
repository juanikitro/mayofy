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

Componer direccion visual y preparar el trabajo del agente:

```bash
npm run agent:briefs
```

Luego Codex/Claude debe:

- disenar una landing real por negocio
- trabajar desde una estructura comercial completa: hero fuerte, trust bar, servicios, razones para elegir, paquetes editables, antes/despues o galeria, proceso, resenas/contacto y CTA final
- usar datos reales cuando existan y placeholders claramente editables cuando falten datos comerciales importantes
- crear HTML/CSS propio o un framework/libreria de UI, animaciones o iconos exportado a estatico
- guardar el resultado dentro de `data/frontends/<run>/<slug>/`
- agregar `agent_frontend` en `data/site-specs/tandil-site-specs.json`

Validar:

```bash
npm run validate:specs
```

`npm run compose:local` queda como fallback mecanico, pero tambien genera un bloque `commercial` con servicios, paquetes demo editables, galeria, proceso y CTA final. `npm run compose:ai` queda como opcion secundaria con billing de OpenAI API; no usa tokens de Codex Desktop.

El generador usa `data/site-specs/tandil-site-specs.json` para validar datos, ubicar el frontend de agente y copiar el artefacto final. El renderer interno solo queda como fallback de preview.

Variables opcionales:

```bash
$env:LOCAL_WEB_SEARCH_MIN_RATING="4.3"
$env:LOCAL_WEB_SEARCH_MIN_REVIEWS="10"
```

## Fase 4: frontend de agente

El agente tiene libertad para crear una UI destacable. Puede usar:

- HTML/CSS estatico dedicado por negocio.
- Frameworks o librerias cuando aporten calidad real.
- Librerias de frontend, animacion e iconos con bastante libertad si elevan el producto final, por ejemplo Aceternity UI (https://ui.aceternity.com/components), shadcn/ui (https://ui.shadcn.com/docs/components), Magic UI (https://magicui.design/), Framer Motion, GSAP, Motion One, lucide-react o React Icons.
- Builds/export estaticos como salida final.

Ejemplo para una landing escrita a mano:

```json
{
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/tandil-servicios-vehiculares/mecanica-maz",
    "notes": "Landing editorial de taller basada en reseñas de viaje."
  }
}
```

Ejemplo con framework:

```json
{
  "agent_frontend": {
    "mode": "framework-build",
    "source_dir": "data/frontends/chivilcoy-ropa/la-tienda",
    "output_dir": "data/frontends/chivilcoy-ropa/la-tienda/dist",
    "build_command": "npm run build",
    "libraries": ["vite", "shadcn/ui", "magicui", "framer-motion", "lucide-react"],
    "notes": "Vidriera editorial con motion y composicion propia."
  }
}
```

El generador no ejecuta `build_command`. El agente debe correr el build y dejar listo `output_dir`.

## Fase 5: generacion

Probar con fixture mock:

```bash
npm run validate:mock
npm run generate:mock
```

Generar final:

```bash
npm run generate
```

Cada corrida crea una carpeta de sesion dentro de `generated/`. Por defecto el nombre sale del dataset (`data/tandil-businesses.json` -> `generated/tandil`; `data/chivilcoy-ropa-businesses.json` -> `generated/chivilcoy-ropa`). Tambien se puede fijar con `--session <slug>`.

Dentro de `generated/<sesion>/` queda una carpeta por negocio (`<slug>/`) con `index.html`, `styles.css` y `site.json`, mas `manifest.json` e `index.html` de indice de la tanda.

`npm run generate` exige `GOOGLE_PLACES_API_KEY`, fotos reales y `agent_frontend`. Si queres revisar UI sin fotos reales o sin frontend final, usar:

```bash
npm run generate:preview
```

## Fase 6: QA

```bash
npm run qa
npm run qa:client
```

`npm run qa` controla cantidad de sitios, footer, texto prohibido, datos cruzados, frontends de agente y carpetas separadas.

`npm run qa:client` es mas estricto y responde otra pregunta: si la landing esta para mostrarsela a un cliente potencial. Falla por senales como:

- copy interno visible (`landing`, `template`, `editable`, `demo`, `la pagina`, `sin inventar`)
- placeholders demasiado crudos
- falta de estructura comercial
- CTAs debiles
- accesibilidad basica floja
- demasiada similitud visual/estructural entre landings consecutivas

El comando escribe `generated/<sesion>/client-readiness-report.md` salvo que se pase `--report`. Aunque pase, la revision visual con screenshots sigue siendo responsabilidad del agente antes de deploy.

## Fase 7: estudio final

Despues de `qa:client` y revision visual, generar una entrega comercial:

```bash
npm run study:final -- --price "[PRECIO]"
```

El comando escribe:

- `generated/<sesion>/final-study.md`
- `generated/<sesion>/final-study.json`

El estudio final cruza `generated/<sesion>/manifest.json`, el dataset de negocios, los site specs y los briefs de la corrida. Para cada negocio entrega:

- link/path de la landing
- medio de contacto favorito: Instagram, WhatsApp, WhatsApp probable o telefono
- razon y confianza de esa eleccion
- lead score con prioridad, probabilidad de contacto, oportunidad, motivos y riesgos
- mini auditoria comercial con problema que resuelve, señales publicas, datos a pedirle al dueño y mejoras vendibles
- paquete de outreach con mensaje corto, mensaje formal, follow-ups, cierre directo y objeciones
- mensaje de propuesta para mostrar lo hecho y ofrecer mejoras por el precio indicado

El reporte tambien incluye un resumen ejecutivo con top 3 para contactar primero, contactos mas fuertes, mejores oportunidades, negocios que requieren validar canal y desglose de canales.

No buscar redes nuevas ni inventar canales. Si no hay Instagram/WhatsApp verificado, usar el telefono publicado como fallback seguro.

## Fase 8: deploy

```bash
npm run deploy:plan
```

El comando escribe `generated/<sesion>/deploy-plan.json`. No publica nada. El deploy real debe ejecutarse explicitamente.

## Repetir con otra ciudad

1. Crear `data/<ciudad>-businesses.json`.
2. Cargar negocios con la misma estructura.
3. Ejecutar `tsx src/validators/validate-dataset.ts data/<ciudad>-businesses.json --strict-final`.
4. Ejecutar `tsx src/generator/generate-sites.ts data/<ciudad>-businesses.json --session <ciudad>`.
5. Ejecutar `tsx src/validators/validate-generated-sites.ts --session <ciudad>`.

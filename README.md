# ia-landing-generator

Base reusable para investigar negocios locales reales, verificar datos con evidencia y generar una landing destacable separada por negocio.

El repositorio empieza sin datos reales finales. `data/tandil-businesses.json` existe como destino del caso Tandil, pero queda vacio hasta cargar negocios verificados desde fuentes permitidas. Los fixtures bajo `data/fixtures/` son mock y nunca deben usarse para deploy final.

## Stack

- TypeScript para scripts, validadores y generador.
- JSON como fuente inicial de datos.
- Frontend escrito por agente por negocio: HTML/CSS propio o framework/librerias cuando aporten calidad.
- Renderer estatico interno solo como fallback de preview.
- Vercel preparado como opcion de deploy por carpeta generada, sin ejecutar deploys automaticamente.

La prioridad es calidad visual, no velocidad ni costo. El agente tiene libertad para usar frameworks, librerias, composiciones propias y CSS dedicado, siempre que el resultado final exporte archivos estaticos y respete los datos verificados.

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
# Codex/Claude crea data/frontends/<run>/<slug>/ y edita data/site-specs/tandil-site-specs.json
npm run validate:specs:tandil
npm run generate:preview
npm run generate
npm run qa
npm run qa:client
npm run study:final -- --price "[PRECIO]"
```

`compose:ai` queda como opcion secundaria para quien quiera usar billing de OpenAI API. `npm run generate` exige fotos reales descargadas desde Google Places y frontends escritos por agente. Para revisar datos/UI sin bloquear por fotos o frontends finales, usar `npm run generate:preview`.

`npm run qa` valida integridad tecnica. `npm run qa:client` es el gate de entrega: falla si la tanda todavia parece demo interna, template repetido, copy con placeholders visibles o landing no vendible.

`npm run study:final -- --price "[PRECIO]"` escribe `generated/<sesion>/final-study.md` y `generated/<sesion>/final-study.json` junto a las landings, con el contacto recomendado, lead score, mini auditoria comercial, paquete de mensajes/follow-ups/objeciones y propuesta lista para enviar por negocio. El precio no se inventa: pasalo por `--price` o quedara como placeholder.

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
5. Codex/Claude diseña y escribe un frontend real por negocio.
6. Codex/Claude agrega `agent_frontend` en `data/site-specs/tandil-site-specs.json`.
7. Validar specs con `npm run validate:specs:tandil`.
8. Validar que no haya datos inventados ni negocios con sitio propio.
9. Generar una carpeta de sesion en `generated/<sesion>/`; adentro queda una carpeta por negocio (`generated/<sesion>/<slug>/`) con todo su codigo.
10. Ejecutar QA de contenido, datos y frontends authored.
11. Ejecutar `npm run qa:client` y revisar screenshots desktop/mobile.
12. Generar el estudio final con `npm run study:final -- --price "[PRECIO]"`; el Markdown queda en `generated/<sesion>/final-study.md`.
13. Crear plan de deploy para 10 URLs separadas.

Ver detalles en `docs/PIPELINE.md`, `docs/DATA_RULES.md`, `docs/CLIENT_READINESS_QA.md` y `docs/DEPLOYMENT.md`.

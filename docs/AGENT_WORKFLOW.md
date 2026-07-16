# Agent Workflow

Este repositorio esta pensado para que sesiones de agente hagan el trabajo creativo usando sus propios tokens/contexto. Los comandos npm existen para preparar contexto, validar y copiar artefactos, no para reemplazar al agente.

La prioridad actual es calidad visual, no costo ni velocidad. El camino final esperado es que el agente escriba el frontend real de cada landing. El renderer interno queda como fallback de preview.

## Division de roles (preferencia explicita del usuario)

- **El agente de la sesion disena, con la skill IMPECCABLE** (motor de diseño por defecto; `frontend-design` como fallback). Direccion de arte, tipografias, paleta, estructura, motion y copy con datos verificados se definen en la etapa `design-director`: en sesion de Claude lo hace Claude (no lo delega a Codex); en sesion de Codex lo hace Codex. Ver `CLAUDE.md` y `agents/design-director.md`.
- **Codex implementa el codigo.** El HTML/CSS/JS lo escribe Codex a partir del brief de diseno, sin reinterpretar la direccion de arte. Ver `AGENTS.md` en la raiz.
- **Claude revisa** el resultado contra `docs/DESIGN_STANDARDS.md` antes de generar y correr QA.

## Flujo principal

```powershell
npm run validate:data -- data/<run>-businesses.json
npm run agent:briefs -- --input data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --out data/agent-briefs/<run> --city "<Ciudad>" --segment "<Rubro>"
```

El comando escribe briefs en:

```text
data/agent-briefs/<run>/
```

Luego el agente debe leer:

- `data/<run>-businesses.json`
- `data/agent-briefs/<run>/README.md`
- los briefs individuales relevantes
- `data/site-specs/<run>-site-specs.json` si ya existe

El agente de la sesión (Claude, o Codex si corre en Codex; etapa `design-director`, ver `agents/design-director.md`) escribe, por cada landing, `conversion_template` y un `design_brief` completo con `designed_by: "claude-code" o "codex"` en

```text
data/site-specs/<run>-site-specs.json
```

**El design-director no escribe HTML/CSS/JS.** A partir de ese `design_brief`, Codex crea el frontend de cada negocio en una carpeta del repo, por ejemplo:

```text
data/frontends/<run>/<slug>/index.html
data/frontends/<run>/<slug>/styles.css
```

Si una landing necesita framework o librerias, Codex puede usarlos con bastante libertad para subir la calidad final. Esto incluye librerias de UI/frontend, animaciones e iconos como Aceternity UI (https://ui.aceternity.com/components), shadcn/ui (https://ui.shadcn.com/docs/components), Magic UI (https://magicui.design/), Framer Motion, GSAP, Motion One, lucide-react o React Icons. En ese caso debe ejecutar el build/export y apuntar `agent_frontend.output_dir` al resultado estatico.

Despues:

```powershell
npm run validate:specs -- --businesses data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json
npm run qa:design -- --businesses data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json
npm run generate:preview -- data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --session <run>
npm run generate -- data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --session <run>
npm run qa -- --session <run> --expected-count <N>
npm run qa:client -- --session <run>
npm run qa:impeccable -- generated/<run>
```

`npm run qa:design` es el gate de la etapa `design-director`: falla si algun spec no tiene `conversion_template`, `design_brief` completo o `designed_by: "claude-code" o "codex"`. Para corridas nuevas, generar con `--require-design-brief` para que el propio `generate` rechace landings sin brief de diseno firmado. `npm run qa:impeccable` corre el detector anti-slop de IMPECCABLE sobre las landings generadas (capa adicional; excepciones en `.impeccable/config.json`, ver `docs/DESIGN_STANDARDS.md`).

Para ciudades/rubros nuevos, usar paths parametrizados en vez de los archivos de Tandil. Ver `docs/PROMPT_TO_AGENT.md`.

## Responsabilidad del agente

El agente debe producir una landing real por negocio:

- copy natural en espanol argentino
- claim fuerte y orientado al resultado que busca el cliente
- `conversion_template` elegido de forma deliberada; si parece template, que sea un template de alta conversion bien ejecutado
- `design_brief` completo: posicionamiento, tesis visual, voz de copy, firma de layout, plan de assets, plan de IA segura, anti-patrones y objetivos de remake
- estructura comercial completa: hero, confianza, servicios, por que elegir, paquetes editables, galeria/antes-despues, proceso, resenas/contacto y CTA final
- direcciones visuales diferentes entre negocios
- recursos alineados al rubro
- proof points basados en datos reales
- copy, secciones e imagenes genericas seguras generadas por IA cuando faltan datos de venta o las fotos sean pobres
- campos internos a confirmar en el spec cuando falten datos de venta; la version cliente no debe mostrar corchetes, `placeholder`, `demo`, `editable`, `template`, `landing` ni texto meta de IA
- CTAs concretos
- HTML/CSS propio, framework o librerias de frontend, animaciones e iconos cuando aporten calidad real
- composicion, tipografia, ritmo visual y assets pensados para ese negocio
- `agent_frontend` configurado para que el final no use el fallback
- sin claims inventados
- sin texto meta sobre IA

## Criterio de landing vendible

Para servicios vehiculares, no alcanza con listar direccion, horario y resenas. La pagina debe hacer que alguien quiera consultar turno, presupuesto o disponibilidad. El flujo esperado es:

1. Hero con promesa concreta del rubro.
2. Trust bar con rating, horario, rubro, telefono/WhatsApp y placeholders editables para volumen o trayectoria si faltan.
3. Servicios explicados por beneficio, no solo nombres.
4. Razones para elegir basadas en datos reales o reglas de decision.
5. Paquetes/combos demo marcados como editables, sin precios falsos.
6. Galeria o antes/despues con placeholders visuales reemplazables por fotos reales.
7. Proceso desde consulta hasta visita/turno.
8. Resenas reales o bloque de resenas futuras claramente rotulado.
9. Contacto, ubicacion y CTA final.

El bloque `commercial` del `SiteSpec` existe para transportar esa estructura al brief y al renderer fallback. El frontend de agente puede reorganizarlo, pero no deberia bajar la densidad comercial.

El bloque `design_brief` es la barra de calidad visual y de remake. Debe explicar que vende la pagina, que tesis visual sigue, que puede poblar la IA con seguridad y que debe evitar. Si una landing anterior se rehace, `rewrite_targets` tiene que atacar los problemas visibles de esa version, no solo repetir el spec.

## Gate de cliente

`npm run qa` no significa "listo para vender". Solo significa que el output es coherente tecnicamente.

Antes de entregar, correr:

```powershell
npm run qa:client -- --session <run>
```

Este gate debe ser incomodo. Falla si detecta lenguaje interno, placeholders visibles, copy flojo, falta de secciones comerciales, CTAs insuficientes, problemas basicos de accesibilidad o landings demasiado parecidas entre si. Si falla, el agente debe corregir los sitios, regenerar y volver a correrlo.

Tambien falla si falta `conversion_template`, `design_brief`, plan de IA para copy/imagenes o limites explicitos contra datos inventados.

Despues del comando, el agente debe revisar screenshots desktop/mobile y contestar explicitamente:

```text
Juicio de entrega: CLIENT_READY / NOT_READY
Razon principal:
Sitios que reharia antes de enviar:
```

No declarar una tanda como entregable si el juicio humano es `NOT_READY`, aunque los validadores tecnicos pasen.

## Estudio final

Cuando la tanda queda `CLIENT_READY`, el agente debe preparar la entrega comercial:

```powershell
npm run study:final -- --session <run> --businesses data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --briefs data/agent-briefs/<run> --price "[PRECIO]"
```

El comando escribe:

```text
generated/<sesion>/final-study.md
generated/<sesion>/final-study.json
```

La carpeta `generated/<sesion>/` es el paquete de salida de la corrida: contiene una carpeta por landing, `manifest.json`, `index.html`, los reportes de QA que no tengan override y el estudio final Markdown. Es salida reproducible local/CI y no se versiona; la fuente versionada vive en datasets, specs y `data/frontends/**`.

El estudio final debe incluir, por cada negocio:

- link/path de la landing generada
- todos los contactos encontrados, enlazados (WhatsApp mediante `wa.me`)
- prioridad interna, nivel de confianza y razon del canal elegido para el lead score
- lead score con prioridad, probabilidad de contacto, oportunidad, motivos y riesgos
- mini auditoria comercial con problema que resuelve, señales publicas usadas, datos a pedirle al dueño y mejoras vendibles
- paquete de outreach: mensaje inicial personalizado con una señal pública concreta, follow-ups de 24 y 28 horas y respuestas a objeciones

Tambien debe incluir un resumen ejecutivo con top 3 para contactar primero, contactos mas fuertes, mejores oportunidades, negocios que requieren validar canal y desglose de canales.

Regla de prioridad interna de contacto:

1. Si hay Instagram verificado en datos, brief o HTML, usar Instagram.
2. Si hay link de WhatsApp verificado, usar WhatsApp.
3. Si el material menciona WhatsApp o el telefono parece celular argentino, usar `WhatsApp probable` y dejar claro que no hay link verificado.
4. Si no hay senal social, usar el telefono publicado.

No inventar handles, links de WhatsApp, precios ni canales. El precio de la oferta debe entrar por `--price`; si falta, queda como `[PRECIO]`.

## Golden sample

Un golden sample es una landing que el usuario acepta como barra visual y comercial para el resto. Sirve para evitar que el agente optimice contra validadores pero entregue paginas "correctas" y poco vendibles.

**Los golden samples vigentes son las 3 landings de `amba-alta-conversion`** (Cerrajeria La Madrilena, Guapisimas Depilacion y Calderas YA), disenadas con Claude Code. Son el unico estandar aprobado: los samples anteriores de Tandil y Cordoba fueron eliminados. Ver `docs/DESIGN_STANDARDS.md` para el detalle de cada una, los principios que definen la barra y el procedimiento para aprobar un sample nuevo.

Capturar evidencia de una tanda con:

```powershell
node scripts/capture-golden-screenshots.mjs --base-url http://localhost:4173 --out output/screenshots/golden-samples/<run> --slugs "slug-1|slug-2|slug-3"
```

En futuras tandas, usar los golden samples como referencia de densidad, pulido, ritmo mobile, calidad de copy y nivel de diferenciacion. No copiar sus layouts literalmente.

## Frontends de agente

`agent_frontend` acepta dos modos:

```json
{
  "mode": "static-files",
  "source_dir": "data/frontends/<run>/<slug>",
  "notes": "Landing editorial de taller con bitacora de ruta y CTA directo."
}
```

## Rehacer landings existentes

Para una tanda ya generada, crear briefs con contexto de remake:

```powershell
npm run agent:briefs -- --input data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --out data/agent-briefs/<run> --city "<Ciudad>" --segment "<Rubro>" --remake-from generated/<run> --screenshots output/screenshots/<run>
```

Cada brief incluye rutas de screenshots y excerpts del HTML/CSS actual si existen. El agente debe empezar criticando la version anterior y luego reemplazarla con una pagina mejor, no parchar cosmeticamente una estructura mediocre.

```json
{
  "mode": "framework-build",
  "source_dir": "data/frontends/chivilcoy-ropa/la-tienda",
  "output_dir": "data/frontends/chivilcoy-ropa/la-tienda/dist",
  "build_command": "npm run build",
  "libraries": ["vite", "shadcn/ui", "magicui", "framer-motion", "lucide-react"],
  "notes": "Vidriera editorial con transiciones suaves y grilla de temporada."
}
```

El generador no ejecuta `build_command`; solo copia `source_dir` u `output_dir`. El agente debe correr el build cuando use framework.

## Uso de compose

`npm run compose:local` existe como fallback mecanico para arrancar el archivo de specs.

`npm run compose:ai` existe como opcion secundaria, pero usa `OPENAI_API_KEY` y billing de OpenAI API. No usa los tokens de Codex Desktop. Para usar tokens/contexto de la sesion, el camino correcto es que Codex/Claude edite `data/site-specs/<run>-site-specs.json` directamente.

## Build final

`npm run generate` exige fotos reales, `agent_frontend` y requiere `GOOGLE_PLACES_API_KEY`. Para iteracion visual con fallback usar:

```powershell
npm run generate:preview -- data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --session <run>
```

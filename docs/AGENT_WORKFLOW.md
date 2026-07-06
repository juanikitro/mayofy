# Agent Workflow

Este repositorio esta pensado para que una sesion de Codex o Claude haga el trabajo creativo usando sus propios tokens/contexto. Los comandos npm existen para preparar contexto, validar y generar archivos, no para reemplazar al agente.

## Flujo principal

```powershell
npm run validate:data
npm run agent:briefs:tandil
```

El comando escribe briefs en:

```text
data/agent-briefs/tandil/
```

Luego el agente debe leer:

- `data/tandil-businesses.json`
- `data/agent-briefs/tandil/README.md`
- los briefs individuales relevantes
- `data/site-specs/tandil-site-specs.json` si ya existe

Y escribir:

```text
data/site-specs/tandil-site-specs.json
```

Despues:

```powershell
npm run validate:specs:tandil
npm run generate:preview
npm run qa
```

Para ciudades/rubros nuevos, usar paths parametrizados en vez de los archivos de Tandil. Ver `docs/PROMPT_TO_AGENT.md`.

## Responsabilidad del agente

El agente debe producir specs mejores que un fallback mecanico:

- copy natural en espanol argentino
- direcciones visuales diferentes entre negocios
- recursos alineados al rubro
- proof points basados en datos reales
- CTAs concretos
- sin claims inventados
- sin texto meta sobre IA

## Uso de compose

`npm run compose:local` existe como fallback mecanico para arrancar el archivo de specs.

`npm run compose:ai` existe como opcion secundaria, pero usa `OPENAI_API_KEY` y billing de OpenAI API. No usa los tokens de Codex Desktop. Para usar tokens/contexto de la sesion, el camino correcto es que Codex/Claude edite `data/site-specs/tandil-site-specs.json` directamente.

## Build final

`npm run generate` exige fotos reales y requiere `GOOGLE_PLACES_API_KEY`. Para iteracion visual usar:

```powershell
npm run generate:preview
```

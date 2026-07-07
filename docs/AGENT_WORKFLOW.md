# Agent Workflow

Este repositorio esta pensado para que una sesion de Codex o Claude haga el trabajo creativo usando sus propios tokens/contexto. Los comandos npm existen para preparar contexto, validar y copiar artefactos, no para reemplazar al agente.

La prioridad actual es calidad visual, no costo ni velocidad. El camino final esperado es que el agente escriba el frontend real de cada landing. El renderer interno queda como fallback de preview.

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

Ademas debe crear el frontend de cada negocio en una carpeta del repo, por ejemplo:

```text
data/frontends/tandil-servicios-vehiculares/<slug>/index.html
data/frontends/tandil-servicios-vehiculares/<slug>/styles.css
```

Si una landing necesita framework o librerias, el agente puede usarlos con bastante libertad para subir la calidad final. Esto incluye librerias de UI/frontend, animaciones e iconos como Aceternity UI (https://ui.aceternity.com/components), shadcn/ui (https://ui.shadcn.com/docs/components), Magic UI (https://magicui.design/), Framer Motion, GSAP, Motion One, lucide-react o React Icons. En ese caso debe ejecutar el build/export y apuntar `agent_frontend.output_dir` al resultado estatico.

Despues:

```powershell
npm run validate:specs:tandil
npm run generate:preview
npm run generate
npm run qa
npm run qa:client
```

Para ciudades/rubros nuevos, usar paths parametrizados en vez de los archivos de Tandil. Ver `docs/PROMPT_TO_AGENT.md`.

## Responsabilidad del agente

El agente debe producir una landing real por negocio:

- copy natural en espanol argentino
- claim fuerte y orientado al resultado que busca el cliente
- estructura comercial completa: hero, confianza, servicios, por que elegir, paquetes editables, galeria/antes-despues, proceso, resenas/contacto y CTA final
- direcciones visuales diferentes entre negocios
- recursos alineados al rubro
- proof points basados en datos reales
- placeholders editables cuando faltan datos de venta, por ejemplo `[X] vehiculos atendidos`, `[Precio editable]`, `Opiniones reales proximamente`
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

## Gate de cliente

`npm run qa` no significa "listo para vender". Solo significa que el output es coherente tecnicamente.

Antes de entregar, correr:

```powershell
npm run qa:client
```

Este gate debe ser incomodo. Falla si detecta lenguaje interno, placeholders visibles, copy flojo, falta de secciones comerciales, CTAs insuficientes, problemas basicos de accesibilidad o landings demasiado parecidas entre si. Si falla, el agente debe corregir los sitios, regenerar y volver a correrlo.

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
npm run study:final -- --price "[PRECIO]"
```

El comando escribe:

```text
generated/<sesion>/final-study.md
generated/<sesion>/final-study.json
```

La carpeta `generated/<sesion>/` es el paquete de salida de la corrida: contiene una carpeta por landing, `manifest.json`, `index.html`, los reportes de QA que no tengan override y el estudio final Markdown.

El estudio final debe incluir, por cada negocio:

- link/path de la landing generada
- medio de contacto recomendado
- nivel de confianza y razon del contacto elegido
- lead score con prioridad, probabilidad de contacto, oportunidad, motivos y riesgos
- mini auditoria comercial con problema que resuelve, señales publicas usadas, datos a pedirle al dueño y mejoras vendibles
- paquete de outreach: mensaje corto, mensaje formal, follow-ups, cierre directo y respuestas a objeciones
- mensaje de propuesta listo para enviar

Tambien debe incluir un resumen ejecutivo con top 3 para contactar primero, contactos mas fuertes, mejores oportunidades, negocios que requieren validar canal y desglose de canales.

Regla de contacto favorito:

1. Si hay Instagram verificado en datos, brief o HTML, usar Instagram.
2. Si hay link de WhatsApp verificado, usar WhatsApp.
3. Si el material menciona WhatsApp o el telefono parece celular argentino, usar `WhatsApp probable` y dejar claro que no hay link verificado.
4. Si no hay senal social, usar el telefono publicado.

No inventar handles, links de WhatsApp, precios ni canales. El precio de la oferta debe entrar por `--price`; si falta, queda como `[PRECIO]`.

## Golden sample

Un golden sample es una landing que el usuario acepta como barra visual y comercial para el resto. Sirve para evitar que el agente optimice contra validadores pero entregue paginas "correctas" y poco vendibles.

Para crear uno:

1. Elegir un negocio representativo, idealmente el rubro mas visual o exigente de la tanda.
2. Autorizar una landing final para ese negocio en su carpeta normal de frontend, por ejemplo `data/frontends/tandil-servicios-vehiculares/luxe-detailing/`.
3. Correr `npm run generate`, abrir desktop/mobile y ajustar hasta que el usuario diga explicitamente: "este es el golden sample".
4. Guardar capturas en `output/screenshots/golden-samples/<run>/<slug>-desktop.png` y `<slug>-mobile.png`.
5. En futuras tandas, usar ese sitio como referencia de densidad, pulido, ritmo mobile, calidad de copy y nivel de diferenciacion. No copiar su layout literalmente.

Si no hay golden sample aprobado, el agente debe usar `qa:client` y su propio juicio visual como barra minima, pero debe reportar que falta una referencia aprobada por el usuario.

## Frontends de agente

`agent_frontend` acepta dos modos:

```json
{
  "mode": "static-files",
  "source_dir": "data/frontends/tandil-servicios-vehiculares/mecanica-maz",
  "notes": "Landing editorial de taller con bitacora de ruta y CTA directo."
}
```

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

`npm run compose:ai` existe como opcion secundaria, pero usa `OPENAI_API_KEY` y billing de OpenAI API. No usa los tokens de Codex Desktop. Para usar tokens/contexto de la sesion, el camino correcto es que Codex/Claude edite `data/site-specs/tandil-site-specs.json` directamente.

## Build final

`npm run generate` exige fotos reales, `agent_frontend` y requiere `GOOGLE_PLACES_API_KEY`. Para iteracion visual con fallback usar:

```powershell
npm run generate:preview
```

# Prompt To Agent

El disparador recomendado es una sesion de agente. El usuario pide una ciudad y un rubro; el agente ejecuta busqueda, shortlist, promocion, briefs, specs, generacion y QA. El diseno de cada landing lo hace, con la skill IMPECCABLE, el agente que corre la sesion (Claude cuando orquesta Claude; Codex cuando la sesion corre en Codex) y la implementacion del codigo la hace Codex (ver `CLAUDE.md`, `AGENTS.md` y `docs/DESIGN_STANDARDS.md`).

## Prompt ejemplo

```text
Genera 10 landings para negocios reales de venta de ropa en Chivilcoy, Argentina.
Hace desde la busqueda hasta los sitios generados.
Usa datos verificados, evita cadenas/franquicias y negocios con web propia.
No uses OpenAI API; usa esta sesion de agente para la composicion.
Prioriza calidad visual sobre velocidad/costo. Podes usar framework o librerias de frontend, animaciones e iconos con bastante libertad si mejora la UI final, incluyendo Aceternity UI (https://ui.aceternity.com/components), shadcn/ui (https://ui.shadcn.com/docs/components), Magic UI (https://magicui.design/), Framer Motion, GSAP, Motion One, lucide-react o React Icons.
Si los datos o fotos publicas son pobres, poblá la página con copy comercial e imágenes genéricas seguras generadas por IA: escenas del rubro, texturas, proceso, producto sin marca, herramientas, mostrador o contexto local. No inventes precios, stock, marcas, años, premios, garantías, servicios ni reseñas.
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

Antes de armar el shortlist, investigar Instagram para cada candidato. Verificar que el perfil publico corresponda al negocio por nombre y ciudad, direccion, telefono o un enlace desde una fuente publica. Guardar hasta tres fotos seleccionadas en `data/intake/chivilcoy-ropa-instagram-research.json` con perfil, post, URL directa de media y evidencia; no inventar handles ni asociar homonimos. En demos, las fotos de un perfil verificado se usan sin una revision de permiso extra.

```powershell
npm run research:instagram -- --input data/intake/chivilcoy-ropa-candidates.json --research data/intake/chivilcoy-ropa-instagram-research.json --out data/intake/chivilcoy-ropa-instagram-candidates.json --assets-dir data/intake/chivilcoy-ropa-assets
tsx src/validators/validate-dataset.ts data/intake/chivilcoy-ropa-instagram-candidates.json --allow-incomplete
```

Usar `data/intake/chivilcoy-ropa-instagram-candidates.json` como input del shortlist. Si no se encontraron perfiles verificables, dejar el manifest con `{"businesses": []}`: el archivo enriquecido conserva las fotos de Google Places.

Generar shortlist:

```powershell
npm run shortlist -- --input data/intake/chivilcoy-ropa-instagram-candidates.json --out data/intake/chivilcoy-ropa-shortlist.json --limit 10 --terms "ropa|indumentaria|boutique|moda|prenda|zapateria|lenceria" --title "Chivilcoy ropa shortlist"
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

El agente debe leer `data/agent-briefs/chivilcoy-ropa/`, disenar cada landing y crear sus frontends en:

```text
data/frontends/chivilcoy-ropa/<slug>/
```

Puede escribir HTML/CSS directo o usar framework/librerias. Tiene permiso amplio para incorporar librerias de UI/frontend, animacion e iconos cuando eleven el producto final, incluyendo Aceternity UI (https://ui.aceternity.com/components), shadcn/ui (https://ui.shadcn.com/docs/components), Magic UI (https://magicui.design/), Framer Motion, GSAP, Motion One, lucide-react o React Icons. Si usa framework, debe ejecutar el build/export y dejar un output estatico.

Luego debe reescribir:

```text
data/site-specs/chivilcoy-ropa-site-specs.json
```

Cada spec final debe incluir `agent_frontend`, por ejemplo:

```json
{
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/chivilcoy-ropa/nombre-del-negocio",
    "notes": "Landing editorial de indumentaria con vidriera, composicion propia y CTA de consulta."
  }
}
```

Cada spec final tambien debe incluir:

- `conversion_template`: estructura de alta conversion elegida deliberadamente.
- `design_brief`: posicionamiento, tesis visual, voz de copy, firma de layout, plan de assets, plan de IA segura, anti-patrones y objetivos de remake.

Si una pagina termina pareciendo template, el criterio no es "evitar templates a toda costa"; el criterio es usar un template de conversion muy bueno: promesa clara, prueba visible, foto dominante, objeciones resueltas, oferta/opciones, proceso y CTA repetido.

O, si usa framework:

```json
{
  "agent_frontend": {
    "mode": "framework-build",
    "source_dir": "data/frontends/chivilcoy-ropa/nombre-del-negocio",
    "output_dir": "data/frontends/chivilcoy-ropa/nombre-del-negocio/dist",
    "build_command": "npm run build",
    "libraries": ["vite", "shadcn/ui", "magicui", "framer-motion", "lucide-react"],
    "notes": "Landing con layout editorial y motion suave para vidriera."
  }
}
```

Validar specs:

```powershell
npm run validate:specs -- --businesses data/chivilcoy-ropa-businesses.json --specs data/site-specs/chivilcoy-ropa-site-specs.json
```

Generar preview:

```powershell
tsx src/generator/generate-sites.ts data/chivilcoy-ropa-businesses.json --specs data/site-specs/chivilcoy-ropa-site-specs.json --session chivilcoy-ropa
tsx src/validators/validate-generated-sites.ts --session chivilcoy-ropa
```

Generar final con fotos reales:

```powershell
tsx src/generator/generate-sites.ts data/chivilcoy-ropa-businesses.json --specs data/site-specs/chivilcoy-ropa-site-specs.json --session chivilcoy-ropa --require-real-images
tsx src/validators/validate-generated-sites.ts --session chivilcoy-ropa
tsx src/delivery/create-final-study.ts --session chivilcoy-ropa --businesses data/chivilcoy-ropa-businesses.json --specs data/site-specs/chivilcoy-ropa-site-specs.json --briefs data/agent-briefs/chivilcoy-ropa --price "[PRECIO]"
```

La salida final de la sesion queda concentrada en `generated/chivilcoy-ropa/`: una carpeta por landing, `manifest.json`, `index.html` y `final-study.md`.

## Responsabilidad del agente

- Ajustar queries si la busqueda no devuelve 10 candidatos buenos.
- Revisar el shortlist report antes de promover si el rubro trae falsos positivos.
- Editar los `site-specs` usando criterio visual y copy natural.
- Elegir `conversion_template` y completar `design_brief` antes de escribir HTML/CSS.
- Usar IA para poblar copy, nombres de secciones, prompts e imagenes genericas seguras cuando los datos/fotos reales no alcancen.
- Crear frontends authored por negocio; el renderer interno solo sirve como fallback de preview.
- Usar framework o librerias cuando aporten calidad real; puede apoyarse con bastante libertad en librerias de UI, animaciones e iconos como Aceternity UI, shadcn/ui, Magic UI, Framer Motion, GSAP, Motion One, lucide-react o React Icons si eso mejora la landing final.
- Ejecutar build/export si se usa framework y apuntar `agent_frontend.output_dir` al resultado.
- No inventar marcas, stock, precios, descuentos, talles ni envios.
- Reportar si el rubro o ciudad no tiene datos suficientes.

## Rehacer una tanda existente

```powershell
npm run agent:briefs -- --input data/chivilcoy-ropa-businesses.json --specs data/site-specs/chivilcoy-ropa-site-specs.json --out data/agent-briefs/chivilcoy-ropa --city Chivilcoy --segment "venta de ropa" --remake-from generated/chivilcoy-ropa --screenshots output/screenshots/chivilcoy-ropa
```

El brief de remake incluye excerpts de HTML/CSS y rutas de screenshots cuando existen. La tarea es reemplazar la landing floja con una version mejor; no preservar una grilla repetida solo porque ya esta hecha.

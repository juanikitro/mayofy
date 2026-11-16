# Template de proyectos (casos)

**Fecha:** 16 de noviembre de 2026
**Estado:** vigente. Juani pidió "un template para que cada proyecto que cargue siga un mismo camino"; el detalle de cada caso se completa después.

## Cómo se carga un proyecto

Cada proyecto es una entrada de `src/content/projects.ts`. Con eso solo, aparece en el jardín de trabajos (isla 5) y tiene su página en `/proyectos/<slug>` con la misma estructura que los demás. No hay que tocar componentes.

Campos de la entrada, en el orden en que se ven en la página:

| Campo | Qué es | Dónde se ve |
|---|---|---|
| `slug` | Identificador en la URL, en minúsculas y con guiones. | `/proyectos/<slug>` |
| `index` | Número de orden de dos dígitos ("01"). | Jardín y portada del caso |
| `title` | Nombre del proyecto. | Jardín, portada, pestaña del navegador |
| `category` | Tipo: Landing, Web + Gestión, Sistema a medida, Web personal. | Jardín, portada, ficha |
| `summary` | Una o dos frases: qué es y qué aporta. | Jardín, portada, descripción para buscadores |
| `context` | Qué estaba pasando en el negocio antes del proyecto. | Capítulo "Qué estaba pasando." |
| `challenge` | Qué necesitaba cambiar, en términos comerciales. | Capítulo "Qué necesitaba cambiar." |
| `approach` | Cómo se encaró: estrategia, diseño, desarrollo. | Capítulo "Cómo lo encaramos." |
| `decisions` | Tres decisiones clave (mensaje, experiencia, técnica). | Capítulo "Las decisiones que sostienen la pieza." |
| `conversionSteps` | Las etapas del recorrido del cliente hasta contactar o reservar. | Capítulo "El recorrido de conversión." |
| `outcome` | Resultado o señal verificable. Nunca inventada. | Ficha |
| `scope` | Alcance del trabajo ("Diseño, desarrollo y publicación"). | Ficha |
| `visual` y `layout` | Heredados del sitio anterior; hoy no cambian la página. Quedan hasta tener capturas reales. | — |
| `placeholder` | `true` mientras el caso no tenga contenido real: la página se marca `noindex` y el jardín lo muestra como placeholder. | Jardín, portada, ficha |
| `url` | Opcional. Sitio en vivo; agrega "Visitar sitio". | Jardín y portada |

## Estructura fija de la página

1. **Portada:** categoría, número, título, resumen y enlace al sitio en vivo.
2. **Ficha:** tipo, alcance, estado y resultado.
3. **Historia** con índice lateral: contexto, desafío, enfoque.
4. **Decisiones:** lista numerada de tres.
5. **Recorrido de conversión:** etapas numeradas.
6. **Galería:** tres espacios ("Vista principal", "Vista secundaria", "Detalle de interfaz"). Hoy muestran "Captura pendiente"; cuando haya capturas se agrega un campo `images` a la entrada y se reemplazan.
7. **Siguiente paso:** CTA a la agenda y a WhatsApp.

## Reglas

- Nada inventado: sin clientes, testimonios, logos ni métricas que no existan (brief v2). Un caso sin datos reales sigue en `placeholder: true`.
- Nombrar organizaciones de terceros requiere decisión explícita de Juani.
- Los textos van en español rioplatense, en la voz híbrida de la marca.
- Mayo no habla en los casos.

## Qué falta decidir

- Capturas reales y el campo `images` cuando Juani entregue material.
- Si los tres placeholders se reemplazan por un proyecto por pack (brief) o se retiran del jardín hasta entonces.

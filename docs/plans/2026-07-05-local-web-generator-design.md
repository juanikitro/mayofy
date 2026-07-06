# Local Web Generator Design

## Alcance aprobado

Construir primero una base reusable, mantenible y extensible. No se cargan datos reales finales de Tandil en esta fase. El dataset real queda separado del generador y solo se acepta para generacion final si pasa validaciones estrictas.

## Decision principal

El sistema se arma como generador estatico TypeScript:

- `data/` contiene datasets y schemas.
- `src/content/` define contratos de datos.
- `src/validators/` bloquea datasets incompletos, mock o sin evidencia.
- `src/generator/` produce un sitio por negocio.
- `src/archetypes/` define 8 arquetipos visuales.
- `src/deploy/` crea planes de deploy, sin publicar automaticamente.
- `agents/` y `skills/` documentan fases delegables.

La base evita scraping improvisado como parte productiva. Puede admitir resultados obtenidos por busqueda autorizada, API oficial, export manual o carga asistida, siempre con fuente por dato.

## Alternativas consideradas

1. Next.js multi-ruta: rapido para una app unica, pero contradice el requisito de sitios separados.
2. Astro multi-build: buen destino futuro, pero agrega complejidad antes de cerrar el contrato de datos.
3. Generador estatico TypeScript: menor superficie, facil de auditar, produce carpetas independientes. Es la opcion inicial.

## Datos

`data/tandil-businesses.json` es un array de negocios. La estructura minima pedida se conserva y se agregan campos opcionales de control:

- `approved_for_generation`
- `is_mock`
- `verification`
- `brand`
- `site_plan`

Los validadores finales rechazan mocks, fuentes `mock://`, negocios con sitio propio, menos de 3 resenas, fotos no permitidas y evidencia insuficiente.

## Generacion visual

Cada sitio usa un solo negocio. La pagina incluye marca, servicio principal, direccion, horario, telefono, resenas, foto principal si esta permitida y footer exacto: `Creado por JuaniKitro`.

Los arquetipos iniciales son:

1. `automotive-premium-dark`
2. `local-clean-service`
3. `industrial-garage`
4. `minimal-professional`
5. `bold-hero-photo`
6. `cards-and-services`
7. `classic-neighborhood-business`
8. `modern-conversion-landing`

## Validacion

La validacion se divide en dataset y sitios generados. El dataset valida completitud, evidencia y reglas de fuente. Los sitios generados validan contenido visible, footer, texto meta prohibido, datos cruzados, arquetipos, paletas, tipografias y separacion por carpeta.

## Riesgos

- Las resenas literales y fotos pueden estar restringidas por terminos de servicio o permisos de uso.
- La ausencia de sitio propio requiere evidencia negativa razonable, no una afirmacion sin fuentes.
- El deploy real debe ser una accion explicita porque publica contenido externo.

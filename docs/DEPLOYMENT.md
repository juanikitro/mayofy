# Deployment

El repositorio prepara deploys separados, pero no publica automaticamente.

## Precondiciones

1. `npm run validate:data`
2. `npm run generate`
3. `npm run qa`
4. `npm run deploy:plan`

## Vercel

`generated/deploy-plan.json` contiene una entrada por sitio:

- negocio
- slug
- nombre sugerido de proyecto
- carpeta
- comando sugerido
- estado

Ejecutar deploys reales es una accion externa y debe hacerse de forma explicita.

## URLs finales

Cuando se publiquen los 10 sitios, registrar las URLs en un reporte de entrega con:

1. URL.
2. Negocio.
3. Arquetipo.
4. Fecha de deploy.
5. Fuente del dataset usado.

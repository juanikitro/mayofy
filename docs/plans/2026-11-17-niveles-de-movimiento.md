# Niveles de movimiento del mundo Mayo

**Fecha:** 17 de noviembre de 2026.
**Alcance:** `src/components/world/world-motion.tsx`, `src/components/world/mayo-figure.tsx`, `src/app/world.css`.
**Motivo:** el teléfono de Juani (Redmi Note 13 Pro, 8 núcleos, 8 GB, Chrome Android) caía en el nivel `lite` y no veía ninguna animación; además `?diag` no le mostraba nada.

## Qué había

`WorldMotion` (montado en la home) decidía un nivel de movimiento y lo escribía en `<html data-motion-tier>`. Había tres niveles:

| Nivel | Cuándo | Efecto en CSS |
|---|---|---|
| `full` | Resto de los casos | Todo: rocas que se arman con el scroll, parallax de las islas (`--isle`, `--dawn`), caída entre nubes, viaje de Mayo, flotación y brillo de objetos, luciérnagas, fogata y la tira de sprites de Mayo. |
| `lite` | `navigator.connection.saveData`, `effectiveType` `slow-2g`/`2g`/`3g`, `deviceMemory <= 2` o `hardwareConcurrency <= 2` | Sin animaciones ligadas al scroll ni pulsos; sólo la tira de sprites de Mayo y, en los slots sin tira, el GIF-loop capturado (`.mayo__picture--loop`) en lugar del still. |
| `reduced` | `prefers-reduced-motion: reduce` | Nada se mueve: primer frame del sprite, escena armada. |

El nivel `lite` se diseñó cuando Mayo era un modelo 3D en tiempo real (WebGL): ahí sí había que proteger a los teléfonos flojos. Ese 3D quedó archivado (ver `2026-11-17-mayo-3d-en-la-landing.md`) y hoy todo el movimiento es CSS: animaciones scroll-driven que corren en el compositor y una tira de sprites con `steps()`. Es barato en cualquier teléfono moderno.

## Por qué se eliminó `lite`

1. **La razón de ser desapareció.** No hay 3D que proteger; las animaciones CSS no justifican un nivel intermedio.
2. **Clasificaba mal.** `navigator.connection.effectiveType` en Chrome Android se calcula por latencia medida, no por la red real: un 4G o un wifi con algo de latencia informan `3g` y el teléfono quedaba en `lite`. Lo mismo con el modo "ahorro de datos" (`saveData`), que no dice nada de la capacidad del equipo. Un teléfono de 8 núcleos y 8 GB terminaba sin animaciones.
3. **Menos CSS que mantener.** Cada efecto nuevo necesitaba una regla `[data-motion-tier="lite"]` y las fotos-loop de Mayo existían sólo para ese nivel.

## Reglas nuevas

- Hay dos niveles: `full` y `reduced`.
- `reduced` lo decide únicamente `prefers-reduced-motion: reduce`. Ninguna señal de hardware o de red baja el nivel.
- El CSS no depende del atributo para mostrar contenido: sin JavaScript y en el primer pintado la escena está armada y Mayo muestra el primer frame. El atributo sólo enciende (`full`) o apaga (`reduced`) movimiento, y la media query `prefers-reduced-motion` apaga todo también sin JavaScript (`!important`).
- `MayoFigure`: los slots con tira de sprites la animan en `full` y muestran el primer frame en `reduced`. Los slots sin tira muestran sólo el still capturado; se quitó el `<picture>` del loop y las reglas `.mayo__picture--loop` / `visibility: hidden` del still.
- `detectMotionTier(reducedMotion)` y `describeMotionSignals(nav, reducedMotion)` siguen exportadas; la primera ya no recibe `navigator`.

## Cómo probar en un teléfono con `?diag`

1. **Usar una build que tenga el código.** El 17 de noviembre, `https://mayofy.dev/` todavía servía la build anterior de `master` (sin `.world`, sin `data-mayo-slot`, sin `WorldMotion`), así que `?diag` ahí no muestra nada: ésa fue la causa de "no veo el overlay" cuando la prueba se hace contra producción. Hay que probar contra el servidor de desarrollo (`http://<ip-de-la-pc>:3010/?diag`, con el teléfono en la misma red; `allowedDevOrigins` en `next.config.ts` puede necesitar esa IP) o esperar al deploy de la rama.
2. **Sólo en la home.** `WorldMotion` se monta en `src/app/page.tsx`; en `/proyectos` o `/privacidad` no hay overlay.
3. Abrir `/?diag` (también sirve `/#diag`). Abajo a la izquierda aparece un recuadro oscuro con texto verde monoespaciado, por encima de la navegación y de la escena pegajosa (`z-index` máximo, `position: fixed`, respetando `safe-area-inset-*`). Las líneas:
   - `tier`: `full` o `reduced`.
   - `prefersReducedMotion`: resultado de la media query. Si da `true` en el teléfono, revisar en Android **Ajustes → Accesibilidad → Eliminar animaciones** (o "Reducir movimiento" en MIUI/HyperOS): Chrome lo toma de ahí.
   - `scrollTimeline`: si el navegador soporta `animation-timeline: view()`. En `false` no hay parallax ni armado de rocas, sólo el sprite de Mayo (Chrome Android lo soporta desde la versión 115).
   - `saveData`, `effectiveType`, `deviceMemory`, `cores`, `dpr`, `viewport`, `ua`: informativas; ya no cambian el nivel.
4. El mismo objeto se escribe en la consola con `console.info("[motion]", …)`: con Chrome en escritorio, `chrome://inspect` → el teléfono por USB → pestaña Console.
5. Qué tiene que verse en `full`: Mayo del hero animado; al hacer scroll, las rocas se arman y los fondos de las islas se desplazan.

## Correcciones al overlay (por qué podía no verse)

- **Color inválido:** `.motion-diag` usaba `color: var(--mint)`, pero `--mint` está definido en `.world` y el overlay se agrega a `<body>`, fuera de `.world`: el texto heredaba el color del body sobre fondo casi negro. Ahora usa colores literales.
- **Tamaño y capas:** 11 px pasó a 13 px, `z-index` máximo, insets con `env(safe-area-inset-*)`, `overflow-wrap: anywhere` para la línea `ua` en pantallas angostas.
- **Hash en la URL:** `location.search` no incluye el hash, así que `/?diag#contacto` funcionaba; ahora `#diag` también se acepta.
- **Montaje:** el overlay se crea en un `useEffect`, cuando `document.body` ya existe; se mantiene con un fallback a `<html>` por si acaso.

## Verificación

- `grep -rn "lite" src`: ningún resto relacionado con niveles (queda un comentario en `src/components/world/cloud-fall.tsx`, fuera del alcance de este cambio).
- `npm run typecheck`, `npm run lint`, `npm run build`.
- Playwright contra `http://localhost:3010/?diag`: overlay visible con `tier: full` y sprite del hero `running` a 1440×900; con `reducedMotion: reduce` el tier es `reduced`, el sprite no anima y el fondo parallax tampoco; a 390×844 con UA de Chrome Android y las señales viejas de `lite` forzadas (`connection.effectiveType = "3g"`, `saveData = true`, `deviceMemory = 2`), el tier sigue `full` y el overlay queda dentro del viewport sin scroll horizontal.
- No hay test runner en el repositorio.

## Límites

- No se probó en el teléfono real: la prueba móvil es emulada. Queda para Juani con el paso 1 de arriba.

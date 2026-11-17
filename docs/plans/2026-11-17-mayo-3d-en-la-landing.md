# Mayo 3D en la landing

**Fecha:** 17 de noviembre de 2026
**Estado:** integrado y verificado en local con las islas provisorias. Juani aprobó `three` como dependencia. No está publicado.
**Rama:** `juanikitro/landing-redesign`. Sin push.
**Depende de:** `2026-11-17-integracion-mayo-assets.md` (análisis y anclas) y `mayo-3d/docs/LANDING_INTEGRATION.md` (contrato del modelo).

## Qué cambió

- **Dependencia:** `three` 0.187.0 y `@types/three` 0.187.0, fijadas a la versión con la que se validó el modelo. Solo las descarga el nivel completo, con `next/dynamic` sin SSR, después del evento `load` y en un momento ocioso del navegador. El hero, la promesa y el CTA no esperan nada.
- **Assets de Mayo en `public/mayo/`:** `mayo.glb` (1,63 MB) y 40 imágenes de poses (fijas 1600×1600 y loops 800×800, en AVIF y WebP). Copiados de `mayo-3d/dist/`.
- **`src/content/stage.ts`:** un slot por isla con su momento, su etiqueta accesible y el lado del cuadrado. Las anclas en porcentaje de la placa se cargan cuando lleguen las placas; hoy las posiciones siguen siendo las de las escenas provisorias.
- **`src/lib/mayo/`:** `moments.ts` (los 10 momentos, con las luces de los momentos 08 a 10 ya en el orden de islas de la landing), `lighting.ts` (presets por isla y mezcla) y `scene.ts` (la escena de referencia portada a TypeScript: renderizado, luces, materiales, clips, cámara por momento y mirada al cursor).
- **`MayoFigure`:** ya no dibuja el SVG provisorio. Renderiza un cuadrado con dos `<picture>`: la imagen fija (nivel estático y primer pintado) y el loop (nivel liviano). Con `html[data-mayo3d="ready"]` el nivel completo las oculta y dibuja encima.
- **`MayoStage`:** un único canvas cuadrado, transparente y fijo que viaja entre los slots. Cada cuadro mide los slots, sostiene el momento actual durante el 55 % del tramo entre dos slots y viaja en el 45 % restante mezclando cámara, rotación del modelo y luz de isla, igual que el prototipo `journey.html`. Al salir del hero reproduce `jump_void` una vez; al llegar a las rocas sueltas, `land` y después `play_rocks`. La mirada sigue al cursor en `sit`, `idle` y `rest`. Fuera de pantalla no renderiza, solo avanza la animación.
- **`MayoStageLoader`:** decide si corresponde cargar el 3D: nivel completo según el detector de `world-motion.tsx`, WebGL disponible, sin `prefers-reduced-motion`.

## Cómo se verificó

Chromium con Playwright sobre `next dev`:

| Chequeo | Resultado |
|---|---|
| Nivel completo a 1440×900 | `data-motion-tier="full"`, `data-mayo3d="ready"`, canvas de 272×272 exactamente sobre el cuadrado del slot del hero; la imagen fija queda oculta debajo |
| Recorrido | Mayo sentada en el hero, salto al salir, flotando en la caída, jugando en la isla 2, salto sobre la plataforma 3, descanso junto al fogón |
| Movimiento reducido | `data-motion-tier="reduced"`, sin canvas, imagen fija visible |
| 390×844 | Sin scroll horizontal; canvas de 144 px sobre el slot del hero |
| Consola | Sin errores (se reemplazó `THREE.Clock`, marcado como obsoleto, por `THREE.Timer`) |
| `npm run lint`, `typecheck`, `build` | Sin errores |

No verificado: nivel liviano en un dispositivo real (solo por la lógica del detector), rendimiento en celulares medios, Safari y Firefox.

## Limitaciones y pendientes

- Las imágenes de los momentos 08 (luciérnagas), 09 (llegada) y 10 (descanso) se capturaron con las luces del orden anterior de islas; el agente de Mayo debe intercambiarlas y recapturar. El 3D ya usa las luces correctas.
- Las anclas definitivas de Mayo se aplican cuando lleguen las placas; hoy Mayo se apoya en las islas provisorias.
- El avatar de Juani (repo `juani-3d`) no está integrado; comparte el preset `twilight` de la isla 6.
- El salto entre plataformas de la isla 3 se reproduce una vez al llegar al slot, no sincronizado con el ensamble de las rocas.

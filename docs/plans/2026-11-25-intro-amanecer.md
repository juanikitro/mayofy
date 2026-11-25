# Amanecer: entrada breve de la isla 1

La home presenta el paso de la hora azul al amanecer. Se abren las nubes y la isla sube un poco; el título y las acciones quedan visibles y utilizables. No es una pantalla de carga.

## Cómo reproducirla

- Abrir la home desde una sesión nueva, arriba de todo y con movimiento normal. La entrada espera que se decodifique el arte de la isla. La fase de luz azul dura 140 ms y la transición, 900 ms.
- Volver en la misma pestaña, abrir `/#packs` desde una sesión nueva o activar movimiento reducido: se muestra la escena final sin la intro.
- Pulsar Tab, hacer scroll o iniciar un clic durante la entrada: el efecto termina y el navegador conserva la interacción normal.

## Implementación y límites

- `intro-dawn.tsx` renderiza capas decorativas, con `aria-hidden` y sin captura de eventos. La cortina reutiliza un puff de la caída en AVIF o WebP. Hay dos nubes en celular y tres en escritorio. No se agregaron imágenes ni dependencias.
- `intro.ts` decide una vez por pestaña con `sessionStorage`, sin esperar la hidratación. Si el navegador bloquea el almacenamiento, puede repetir en una navegación nueva. Ahorro de datos, pestaña oculta, recarga, navegación de historial y enlaces a otras secciones omiten la intro. Si el arte no llega antes de 1,8 s desde la navegación, no aparece el tinte azul.
- `world.css` usa opacidad y transformaciones para el efecto. El tinte usa gradientes con transparencia en vez de modos de mezcla: el prototipo con mezcla aumentó el bloqueo del hilo principal. La calidez final viene de la ilustración existente.
- Para desactivar globalmente, quitar `IntroScript` e `IntroLayers` de `HeroIsland` y la excepción de hidratación de la sección. No hace falta tocar el ambiente, el sprite ni la política de seguridad.

## Verificación de la vista previa local

Base: la revisión local `9bca3fd` tiene el mismo árbol de archivos que `afa944c`. Se usaron builds de producción independientes y corridas intercaladas en la misma máquina. Las pruebas bloquearon servicios externos en los dos builds.

| Medición mediana | Base | Amanecer |
|---|---:|---:|
| Lighthouse móvil, 5 corridas | 79 | 78 |
| LCP simulado por Lighthouse | 4,54 s | 4,63 s |
| Bloqueo total del hilo principal (TBT) | 205 ms | 221 ms |
| CLS en Lighthouse | 0 | 0 |
| Speed Index en Lighthouse | 3,00 s | 3,40 s |
| Celular simulado, LCP | 2,46 s | 2,41 s |
| Celular simulado, evento `load` | 6,357 s | 6,371 s |

El celular simulado usó Chromium a 390 × 844, escala 3×, CPU 4×, 1,6 Mbps y 150 ms, sin caché; se hicieron tres corridas por build. En las tres corridas del candidato se omitió la intro. La carga completa cambió 14 ms; el Speed Index sí fue 0,40 s más lento en Lighthouse. Estas corridas no sustituyen datos de dispositivos de usuarios.

El build, TypeScript, ESLint y Vitest pasaron. Playwright ejercitó Tab, el clic en el enlace a Packs, el scroll, demora artificial del arte y volver a la home desde otra página en la misma pestaña. No se verificó en un teléfono físico. Si el puff todavía no está disponible al empezar la transición, se mantienen la luz y el movimiento de la isla sin la cortina de nubes.
La matriz incluyó Chromium (1440, 1366, 390 y 360 px), WebKit (390 px) y Firefox (1440 px), además de los descartes por segunda visita, enlace a Packs, movimiento reducido, ahorro de datos y JavaScript desactivado. No hubo errores de la página ni avisos de hidratación. Firefox no expuso el observador de CLS del script de pruebas.

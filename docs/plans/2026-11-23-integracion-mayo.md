# Integración de Mayo en las islas 2, 3, 6 y 7

Pedido de Juani (23/11/2026): mejorar la integración de Mayo (interacción con el entorno, luces y sombras, velocidad de las animaciones que responden al scroll) en todas las islas menos la 1, 4 y 5. En la isla 3 faltaba sombra y la animación resultaba incómoda.

## Qué cambió

**Primera entrega (f6fdbc8, solo código)**

- Isla 3: una sombra de contacto, separada de las tiras, sigue el desplazamiento de Mayo a la altura de sus patas, también durante los relevos entre tiras.
- Isla 3: la vuelta al cuadro de unión avanza al ritmo normal del bucle. El ajuste por scroll se reparte sobre el 80 % del tramo en lugar del 25 %. La altura sigue en 320 vh y el scroll guiado no cambió.
- Islas 2, 6 y 7: menos repeticiones del ciclo en cada tramo.

**Segunda entrega (tiras repintadas)**

Las tiras de escritorio (`*-tira.avif`/`.webp`, 12 cuadros de 640 px) y las de celular (`*-tira-cel.avif`) se pintaron de nuevo con la hoja de estilo `70-mayo-hoja-estilo.png` como referencia de identidad: pelaje carbón, pechera blanca y una línea blanca fina en la frente. Las tiras anteriores se habían corrido a un marrón cálido.

- Isla 2 (`problem-v2`): Mayo juega con una reverencia y un salto corto en el claro, entre las rocas.
- Isla 3 (`packs-mira`): Mayo gira la cabeza siguiendo las rocas que caen, antes del salto.
- Isla 6 (`host-v2`): Mayo pasa de echada a sentada, mirando la fogata. El cambio de pose obligó a agregar una capa de contacto CSS (`mayoAnchors.host.contact`), porque la sombra pintada de la pose echada ya no servía.
- Isla 7 (`questions-v2`): Mayo, sentada, levanta la cabeza hacia la luciérnaga. Se rehízo la capa de contacto para la nueva silueta.
- Ritmo del bucle: isla 2 de 1,4 s a 2 s e isla 7 de 2,2 s a 2,6 s (`world.css`).

## Evidencia

- `integracion-mayo/isla-{2,3,6,7}.jpg`: cuatro cuadros por isla. Arriba, la tira anterior; abajo, la nueva.
- `integracion-mayo/en-escena.jpg`: Mayo en su placa a 1440x900, en tres puntos del scroll por isla (filas 2, 3, 6 y 7).

## Verificación (24/11/2026)

- Lint, typecheck y `next build` (Turbopack, con `node_modules` propio) pasan.
- 1440x900 con rueda (100 px por paso): en las islas 2, 6 y 7 el cuadro cambia cada uno o dos pasos, sin saltos ni pausas largas. En la isla 3 se lee la secuencia mirar, saltar, aterrizar y sentarse. El segundo salto cubre unos 300 px de pantalla en dos pasos de rueda: es rápido, pero se lee como un solo gesto.
- 390x844 táctil (gestos sintéticos de CDP): el scroll funciona, sin errores de consola ni desborde horizontal. Las tiras `-cel` cargan.
- Movimiento reducido: todas las animaciones de Mayo quedan en `none`.
- Cero errores de consola en escritorio y celular.

## Limitaciones

- **Luz principal en las islas 6 y 7.** La interacción y la sombra quedaron bien, pero la luz cálida de la fogata (isla 6, desde la derecha) y del farol (isla 7, desde la izquierda) casi no llega a Mayo: se ve iluminada con luz fría y pareja. Hace falta repintar con un borde de luz cálido del lado de la fuente. El escenario no tiene un mecanismo CSS de luz direccional, así que el arreglo correcto es pintado. Esta sesión no tenía herramienta para generar imágenes.
- Isla 6: Juani queda fuera del encuadre de Mayo, que mira al fuego y no a él.
- No se probó un trackpad real ni un teléfono físico: el gesto táctil fue sintético.
- Sombra de contacto: se ve en los cuatro casos, pero es tenue en las islas 2 y 3 (escritorio).

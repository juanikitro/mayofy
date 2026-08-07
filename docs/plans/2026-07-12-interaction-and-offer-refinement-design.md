# Refinamiento de interacción y oferta — diseño aprobado

**Fecha:** 12 de julio de 2026  
**Estado:** aprobado para implementación

## Objetivo

Corregir el salto del primer plano del hero, devolver movimiento orgánico y visible a las partículas, suavizar los desplegables de Proyectos y FAQ, integrar la escena de bosque con la oferta y activar todos los CTA de WhatsApp con el número real de Mayofy.

## Hero: retorno amortiguado

El bug reproducido ocurre porque `pointerleave` elimina el offset del puntero y el siguiente frame reemplaza inmediatamente el `transform` del primer plano. Con scroll activo, la misma escritura también cambia la base vertical y genera una vuelta diagonal incorrecta.

La solución mantiene offsets `target` y `current`. El puntero actualiza el objetivo; al salir, el objetivo vuelve a cero. Un RAF interpola únicamente mientras existe diferencia entre ambos. El parallax de scroll mantiene su respuesta inmediata y no se agrega una transición CSS global sobre `transform`.

## Partículas

- Conservar tres profundidades y 28 puntos totales.
- Mover individualmente 12 puntos en escritorio mediante trayectorias CSS determinísticas con duraciones y desfases distintos; móvil conserva 6–7 puntos activos repartidos entre las tres profundidades para proteger fluidez.
- Movimiento lento, continuo y perceptible; sin Canvas, aleatoriedad por frame ni listeners de scroll.
- El resto de puntos queda estático para controlar el costo de composición.
- `lite` y `prefers-reduced-motion` presentan el campo estático.

## Desplegables

Crear un `AnimatedDetails` compartido para Proyectos y FAQ:

- Mantener semántica nativa `<details>/<summary>` y fallback sin JavaScript.
- Animar apertura y cierre en aproximadamente 220 ms mediante una pista CSS Grid de `0fr` a `1fr`, opacidad y un desplazamiento mínimo.
- No animar `height`; la pista colapsable evita mediciones continuas durante scroll.
- Una nueva interacción revierte limpiamente la transición anterior.
- Movimiento reducido cambia el estado de forma inmediata.

## Bosque y oferta

`ForestRift` deja de ocupar espacio como sección independiente. Se mueve dentro de la sección Oferta como fondo absoluto de su cabecera:

- El título “No vendemos una página suelta” aparece sobre el bosque.
- Un velo garantiza legibilidad y la imagen se funde antes de la lista de tres pasos.
- Desktop usa el asset panorámico; móvil conserva la composición vertical.
- La lista de pasos continúa sobre superficie oscura estable.

## Copy y WhatsApp

- Cambiar “La página es la base. No necesariamente el límite.” por “La página es la base. No el límite.”
- Usar `542345455007` como número público predeterminado.
- Mantener `NEXT_PUBLIC_WHATSAPP_NUMBER` como override opcional.
- Conservar los mensajes contextuales ya existentes.

## Foto de Juani — insumo futuro

Se elige la opción 2, “Dirección en movimiento”:

- Fotografía horizontal 3:2, de perfil o tres cuartos, trabajando frente a una mesa.
- Rostro y manos visibles; pantalla desenfocada o apagada.
- Luz de ventana recortada por hojas, vestuario oscuro y ambiente real.
- Evitar setup gamer, pose corporativa, brazos cruzados y contenido sensible en pantalla.

La fotografía no se implementa en esta iteración.

## Validación

- Reproducción hero: el offset no puede colapsar a cero en un solo frame al cruzar el borde.
- Reingreso y salida repetidos, también con scroll vertical activo.
- Apertura, cierre y clic rápido en Proyectos y FAQ.
- Teclado, movimiento reducido y JavaScript desactivado.
- CTA principal, navegación, contacto y páginas de proyecto apuntan al número correcto.
- Responsive en 320, 375, 414, 768 y 1280 px.
- Perfil focalizado de scroll y consola limpia.

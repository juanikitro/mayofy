# Propuesta de texto por isla

**Fecha:** 16 de noviembre de 2026
**Estado:** aprobado por Juani el 16 de noviembre de 2026 con sus propias correcciones en esta tabla ("apruebo como esta ahora, igual puede cambiar mas adelante"). Implementado en `src/content/islands.ts`.
**Regla:** la sustancia comercial (precios, plazos, packs, garantías, FAQ) no cambia. Solo se reescriben títulos y entradas para acompañar el recorrido y se acorta el texto. Mayo no habla.

La palabra en cursiva es la que va en Fraunces.

| #   | Isla                   | Título actual                                             | Título propuesto                                                                     | Entrada propuesta                                                                                                                             |
| --- | ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Prado del amanecer     | Webs que venden. Sistemas que ordenan.                    | *Sin cambios* (promesa aprobada)                                                     | Diseñamos landings, webs con turnos y sistemas a medida para negocios de servicios. Empezamos con una reunión de diagnóstico gratis.          |
| 2   | Rocas sueltas          | Ya te están mirando. / La página decide qué pasa después. | Construyamos tu lugar en *internet*                                                  | Instagram, Google Maps y recomendaciones ya te traen gente. Sin una página propia, cada consulta queda suelta, como estas rocas.              |
| 3   | Las rocas se ensamblan | Tres packs. Desde una landing hasta tu propio sistema.    | Encontramos lo que necesita *tu negocio*.                                            | Precios de referencia para saber por dónde arrancar. El alcance y la inversión final se definen después de una reunión de diagnóstico gratis. |
| 4   | Taller o invernadero   | Cuando una planilla ya no alcanza.                        | Desde una web memorable para *impactar,* hasta un sistema a medida para *optimizar*. | Construimos el software que tu operación necesita, sin convertir la tecnología en protagonista.                                               |
| 5   | Jardín de trabajos     | Primero, el trabajo.                                      | Nuestra siembra, *tus resultados*.                                                   | Un sistema a medida, una landing y una web personal, funcionando. Los casos completos se suman a medida que avanzan.                          |
| 6   | Isla de las preguntas  | Antes de escribir.                                        | Algunos detalles.                                                                    | Lo importante, sin letra chica ni respuestas de agencia.                                                                                      |
| 7   | Isla de Juani          | Mayofy es la marca. Detrás estoy yo.                      | Mayofy es la marca. Detrás *estoy yo*.                                               | Soy Juani. Hace 5 años construyo software \[...\] (se mantiene).                                                                              |

Bloques secundarios:

- Isla 5, proceso: "Un proceso claro. Seis movimientos." → "Seis pasos, sin *sorpresas*."
- Isla 7, contacto: "Empecemos por una reunión de diagnóstico gratis." → se mantiene.

Los títulos y entradas viven en `src/content/islands.ts` (segmentos con `{ em }` para la palabra en Fraunces). Para cambiarlos más adelante se edita ese archivo; la sustancia comercial sigue en `commercial-plans.ts`, `projects.ts` y `site.ts`.

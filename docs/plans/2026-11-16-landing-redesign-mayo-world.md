# Rediseño de la landing: el mundo de Mayo

**Fecha:** 16 de noviembre de 2026
**Estado:** biblia visual y porción vertical (hero + isla 3) aprobadas por Juani el 16 de noviembre de 2026; ver `2026-11-16-biblia-visual-mundo-mayo.md` y `2026-11-16-porcion-vertical-mundo-mayo.md`.
**Objetivo:** reunir las decisiones para lanzar después una sesión dedicada de diseño de la landing.

## Decisiones tomadas

1. **Rediseño desde cero.** Se abandona la dirección visual `Umbral Vivo`. Se conservan las reglas técnicas: rendimiento en celular, mensaje y CTA visibles sin depender de la animación y movimiento reducido respetado.
2. **Estética:** 3D estilo Pixar en toda la página, lúdica y luminosa, con naturaleza y profundidad. Las secciones claras usan beige o crema, no blanco; la paleta exacta se calibra con el verde de marca.
3. **Mayo como hilo conductor.** Mayo, la border collie de Juani que da nombre a Mayofy, aparece viva en el hero y acompaña el scroll hasta terminar junto al avatar de Juani.
4. **Técnica híbrida.** Mayo es el único elemento 3D en tiempo real: un GLB animado en Three.js, sobre un canvas transparente que acompaña el scroll. Escenarios y objetos son imágenes 3D prerenderizadas o generadas con IA, en capas para el parallax. El modelo de Mayo debe poder reutilizarse en otros proyectos.
5. **Agente de Mayo.** Corre en una sesión independiente de Orca, en el worktree `mayo-3d-character`. Digitaliza a Mayo a partir de fotos reales (`C:\Users\Juanito\Desktop\Mayo`), elige herramientas gratuitas, con IA si son confiables, y valida primero la animación de correr.
6. **Acciones de Mayo (lista entregada al agente):** idle vivo (respira, mueve la cola y sigue el cursor con la mirada), salto al vacío, caída o flotar con el viento, jugar entre rocas flotantes, saltar entre plataformas, escarbar, correr, perseguir luciérnagas y llegar a echarse al lado de Juani.
7. **Mundo:** un archipiélago de islas flotantes, una por sección. El cielo avanza del amanecer a la noche: las secciones claras son de día y las oscuras, del crepúsculo y la noche.
8. **Metáfora de orden (inspirada en Villex, pero con elementos naturales):** rocas sueltas que se ensamblan y con las que Mayo interactúa y juega.
9. **Paleta:** el verde evoluciona. El principal pasa a un verde hoja o musgo, más profundo y natural, que se lea sobre beige. El menta actual (`oklch(86% 0.2 158)`) queda como color de "luz" en las secciones nocturnas (luciérnagas, brillos, CTA sobre fondo oscuro). El beige es cálido y apenas tirando a durazno.
10. **Tipografía:** firme y cálida, nada infantil. Mayo y las islas aportan lo lúdico; el texto aporta la seriedad comercial. Los titulares usan una sans firme y moderna (candidatas: Instrument Sans o Geist) y la palabra clave va en una serif suave en cursiva (candidata: Fraunces). Se elimina la mono. **Actualización del 16 de noviembre de 2026:** Juani descartó el acento manuscrito y las notas de Mayo; la tipografía queda en dos familias (sans firme y serif cursiva para la palabra clave). Las fuentes finales las elige el agente de diseño probándolas sobre las escenas.
11. **Niveles de rendimiento (automáticos):**
    - **Completo** (escritorio y celulares buenos): Mayo en 3D en tiempo real.
    - **Liviano** (celulares lentos, ahorro de datos o conexión mala): una imagen prerenderizada de Mayo por isla, con animación CSS simple.
    - **Estático** (`prefers-reduced-motion`): las mismas imágenes sin animación.

    El hero se ve completo de entrada con una imagen de Mayo y el modelo 3D la reemplaza después, sin bloquear el mensaje ni el CTA. El agente de Mayo exporta las 8 a 10 poses fijas desde el mismo modelo.
12. **Movimiento atado al scroll:**
    - **Ensamble de rocas (isla 3):** sin video. Rocas prerenderizadas independientes, movidas con Scroll-Driven Animations en CSS (`animation-timeline: view()` dentro de `@supports`). Flotan dispersas y se encastran hasta formar las tres plataformas de los packs. Con movimiento reducido se muestran ya ensambladas.
    - **Único video breve:** la caída de Mayo entre nubes, en la transición entre las islas 1 y 2. Va como secuencia corta de imágenes livianas, no como video atado al scroll. En el nivel liviano se reemplaza por una sola imagen.
13. **Generación de imágenes:** Juani genera las imágenes con su ChatGPT Pro, siempre con la misma herramienta y una imagen de referencia de estilo para mantener la coherencia. El agente de diseño arma la biblia visual (estilo, luz, paleta y cámara por isla) con un prompt listo para cada imagen, y después recorta, separa en capas, optimiza y monta los resultados. Se estiman entre 30 y 50 imágenes en varias tandas.
14. **Texto:** la sustancia comercial (precios, plazos, contenido de los packs, garantías y FAQ) no cambia. Se reescriben los títulos y las entradas de cada isla para acompañar la narrativa, y se acorta el texto en general. La promesa del hero se mantiene. Mayo no habla: Juani decidió el 16 de noviembre de 2026 eliminar las notas manuscritas; Mayo comunica solo con acciones. El agente de diseño propone el texto y Juani lo aprueba antes de implementarlo.
15. **Navegación:**
    - Pill flotante con Packs, Trabajos, Preguntas y el CTA "Agendá tu diagnóstico". Al saltar a una isla, Mayo aparece en la pose que corresponde.
    - Indicador de progreso con una huella de Mayo: al costado en escritorio y abajo en celular, con clic para ir a cada isla.
    - CTA flotante de WhatsApp en celular desde la isla 2.
16. **Agenda:** Cal.com integrado con el Google Calendar de Juani.

## Recorrido aprobado (7 islas)

| # | Isla | Cielo | Contenido | Mayo |
|---|---|---|---|---|
| 1 | Prado del amanecer | Amanecer | Hero: promesa y CTA | Viva en primer plano; al scrollear salta al vacío |
| 2 | Rocas sueltas | Mañana | El problema: el negocio desordenado | Juega entre rocas desordenadas |
| 3 | Las rocas se ensamblan | Mediodía | Packs con precios (momento "orden") | Salta entre tres plataformas, una por pack |
| 4 | Taller o invernadero | Tarde dorada | Sistemas a medida, automatizaciones y bot "Próximamente" | Escarba y desentierra piezas |
| 5 | Jardín de trabajos | Atardecer | Trabajos y proceso | Corre por un sendero de seis pasos |
| 6 | Isla de las preguntas | Crepúsculo | FAQ y mantenimiento | Persigue luciérnagas (una por pregunta) |
| 7 | Isla de Juani | Noche estrellada | Quién está detrás, agenda Cal.com y contacto | Llega y se echa al lado de Juani |

Fusiones respecto del sitio actual: el proceso pasa a la isla de trabajos, el mantenimiento a la FAQ y las automatizaciones a la isla de sistemas.

## Referencias de Juani

- Videos que acompañan el scroll: https://latitudnomade.com/demo/terratrack/ (usar alguno breve en alguna sección).
- Galaxia que se construye y se deconstruye con el scroll para ilustrar el orden: https://villex.com.ar/
- Rocas realistas flotando: https://www.getlayers.ai/3d-scenes?layer=mossy-rocks-002
- Heroes de DinamoSites: AERIA (isla flotante), Diario Asombro, Taller Celeste y Entre Flores. Patrón común: naturaleza cinematográfica, titular grande que mezcla sans con serif en cursiva y una figura pequeña dentro de un mundo grande.
- Efectos de https://reactbits.dev/
- Referencias de estilo para Mayo: renders de border collies estilo Pixar y Bolt (solo como guía de estilo, sin copiar el personaje).

## Plan de la sesión de diseño (Fable)

1. **Biblia visual y prompts:** paleta, tipografías, luz por isla y prompts de ChatGPT para el hero y la isla 3. Juani genera esas imágenes.
2. **Porción vertical:** el hero (isla 1) y el ensamble de rocas (isla 3), funcionando con el scroll, con los tres niveles de rendimiento y una imagen provisoria de Mayo. Se verifica en escritorio y en 390 px.
3. **Aprobación de Juani.** Recién entonces se escala a las 7 islas, el texto nuevo, la navegación y Cal.com.

## Pendiente para después

- **Avatar de Juani:** 3D estilo Pixar, hecho por el mismo agente de Mayo y con el mismo proceso, para que los dos personajes compartan estilo, proporciones e iluminación. Falta definir si va en tiempo real (reacciona cuando llega Mayo) o como imagen prerenderizada (más liviano). Se lanza cuando el modelo de Mayo esté validado.

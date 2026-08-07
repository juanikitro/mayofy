# QA del preview local — Umbral Vivo

**Fecha:** 12 de julio de 2026  
**Estado:** validación focalizada completada; build productivo pendiente de autorización

## Validado

- Home renderizada en navegador real con Next.js 16.2.10 y React 19.2.4.
- Hero y CTA principal completos dentro del primer pliegue a 1280 × 800.
- Responsive comprobado en 320, 375, 414 y 768 px.
- Sin overflow horizontal en documento ni body.
- Ningún CTA, botón o enlace visible se parte o queda por debajo de 44 px en móvil.
- Art direction correcta: asset desktop en escritorio y asset mobile en anchos pequeños.
- Imagen LCP con `loading="eager"` y `fetchpriority="high"`.
- Navegación, FAQ, motion controller y formulario hidratados.
- Sistema cinético optimizado: siete puentes de reveal único, corriente vertical estática, cámara fotográfica única, primer plano vectorial y CTAs magnéticos.
- Parallax limitado al hero y actualizado directamente sobre dos capas concretas; no hay propiedades heredables globales ni trabajo cinético sobre secciones fuera del hero.
- En 1280×800 y 375×812 el CTA principal permanece dentro del primer pliegue y no aparece overflow horizontal.
- El Canvas global y la copia fotográfica del hero fueron eliminados después de perfilar rasterizado y recálculo de estilos.
- Perfil CDP sobre 4.000 px: tareas del hilo principal de 393,5 ms a 69,7 ms en scroll estabilizado; recálculo de estilos de 62,8 ms a 9,3 ms; cero layouts durante el recorrido.
- Primera pasada con reveals: 109,7 ms de tareas, todavía un 72% menos que la implementación anterior.
- Formulario sin endpoint configurado: devuelve error honesto y muestra fallback.
- `robots.txt` y `sitemap.xml` responden 200; ruta inexistente responde 404.
- Consola sin errores ni warnings después de habilitar el origen local de desarrollo.
- ESLint focalizado sin errores ni warnings.
- `npm audit --omit=dev`: cero vulnerabilidades.
- Hallmark slop test: 58 / 58 tras correcciones.
- Refinamiento cromático posterior: todas las secciones usan superficies oscuras conectadas por gradientes tonales continuos; no quedan fondos de papel claro.
- Sección de trabajos ubicada antes de la oferta: muestra exactamente tres proyectos al cargar y conserva tres adicionales dentro de un desplegable nativo cerrado por defecto.
- Los seis proyectos enlazan a páginas de detalle estáticas (`/proyectos/proyecto-01` a `/proyectos/proyecto-06`) y responden 200.
- Cada página placeholder declara `noindex, nofollow`, mientras que la home no hereda esa directiva.
- Páginas de detalle verificadas con contexto, desafío, enfoque, decisiones, recorrido de conversión, tres espacios visuales, resultado y CTA.
- Responsive de proyectos comprobado en 320, 375, 414, 768 y 1280 px: sin overflow horizontal ni portales recortados; enlaces de proyecto de 45 px en móvil.
- Consola limpia en home y detalle. Primera pasada de 4.000 px después de sumar proyectos: 128 ms de tareas del hilo principal, todavía muy por debajo de la implementación cinética anterior.
- Hallmark aplicado a la nueva superficie: portales editoriales en lugar de una grilla uniforme, un único reveal orquestado por bloque y placeholders visuales explícitos sin clientes ni resultados inventados.
- Campo atmosférico restaurado con 28 partículas SVG en tres capas: 21 visibles a 320–375 px, 26 a 414–768 px y 28 a 1280 px.
- Las partículas permanecen fijas frente al desplazamiento del contenido; 12 puntos en escritorio y 6–7 en móvil siguen cuatro trayectorias lentas con duraciones y fases determinísticas independientes, repartidos entre las tres profundidades. No usan Canvas, `mix-blend-mode`, cálculos por frame ni listeners de scroll adicionales.
- `ForestRift` integrado como fondo absoluto de la cabecera “No vendemos una página suelta”: WebP desktop de 179 KB y móvil de 216 KB, carga diferida, velo legible y fundido antes de los pasos.
- `CanopyConvergence` integrado entre FAQ y Contacto con masas de copa, siluetas de troncos y tres raíces/corrientes SVG que se revelan una sola vez mediante el observer existente.
- Responsive específico de las nuevas costuras verificado en 320, 375, 414, 768 y 1280 px: assets correctos, sin overflow y sin recortes laterales.
- Modos `lite`, movimiento reducido y JavaScript desactivado verificados: densidad menor o composición estática completa, sin contenido decorativo oculto a mitad de transición.
- Retorno del primer plano del hero verificado en cinco muestras progresivas (`2,22 px → 1,82 → 0,55 → 0,17 → 0,02 → 0`) y con scroll activo: vuelve a la base vertical de `-0,77 px` sin salto diagonal.
- Proyectos y FAQ usan el mismo `<details>/<summary>` nativo con pista CSS Grid `0fr → 1fr`; apertura, cierre e inversión durante la transición verificados sin estilos residuales.
- Movimiento reducido verificado: partículas estáticas y desplegables inmediatos. Sin JavaScript se conserva el comportamiento nativo de `<details>`.
- Los cuatro CTA de WhatsApp de la home apuntan a `https://wa.me/542345455007` con su mensaje contextual.
- Perfil CDP estabilizado sobre un salto de 4.000 px con partículas activas: 33,6 ms de tareas principales, 0,2 ms de script, 1,0 ms de layout y 5,8 ms de recálculo de estilos; sin trabajo JavaScript continuo agregado al scroll.

## Contraste WCAG focalizado — sistema nocturno

- Texto principal nocturno / fondo nocturno: 16.72:1.
- Texto secundario nocturno / fondo nocturno: 9.98:1.
- Texto atenuado nocturno / fondo nocturno: 6.42:1.
- Texto principal / superficie nocturna elevada: 13.78:1.
- Texto secundario / superficie nocturna elevada: 8.23:1.
- Texto atenuado / superficie nocturna elevada: 5.29:1.
- Texto del CTA / verde Mayofy: 13.51:1.
- Error / formulario oscuro: 8.28:1.
- Foco / superficie nocturna elevada: 12.88:1.

## Pendiente antes de publicar

- `npm run typecheck` y `npm run build`, sujetos a aprobación por ser validaciones completas.
- URL canónica.
- Endpoint del formulario y antispam definitivo.
- Fotografía de Juani según la dirección aprobada “Dirección en movimiento” (horizontal 3:2, perfil o tres cuartos, rostro y manos visibles).
- Proyectos reales o conceptuales seleccionados y su material.
- Reemplazo de los seis placeholders, manteniendo `noindex` hasta que cada caso sea publicable.
- Señales de experiencia verificables.
- Copy final y revisión de privacidad.
- Preview de Vercel y smoke test remoto.

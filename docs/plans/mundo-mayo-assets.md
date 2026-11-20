# Assets del mundo de Mayo

## Estado actual
Lote A: entregado, incluidas 8 sombras de contacto separadas con sus formatos optimizados. La referencia00 no se monta. Mayo05 está obsoleta y se conserva solo como material histórico; Mayo pintada70 reemplaza el modelo3D en tiempo real.
Lote B: islas2,4,5,6,7 entregadas y optimizadas. Isla7 y sus glows aprobados. Pares de parallax entregados para todas las placas disponibles salvo02-hero-celular: matte bloqueado y documentado; no usar candidatos contaminados.
Lote C: 20 frames entregados (10 por orientación) y4 nubes aisladas aprobadas por el coordinador. Nombres finales60-nubes,61-nubes-cel y62-nube-suelta; el catálogo de trabajo histórico no es el inventario de entrega.

Confirmado por Juani: isla6=fogón al crepúsculo; isla7=luciérnagas de noche. La discrepancia histórica quedó resuelta.
Sin cambios en src/, dependencias del proyecto, push, merge ni deploy.

## Archivos procesados
Raíz: public/images/mundo-mayo/. Anclas sugeridas respecto del PNG recortado, izquierda/arriba; ajustar junto al terreno en montaje real. Las piezas apiladas usan las posiciones de ensamble siguientes, no un ancla de suelo individual.

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla |
|---|---|---|---|---|---|
| 00-referencia-estilo.png | 1 | plate | 1672×941 | No | No aplica |
| 01-hero-escritorio.png | 1 | plate | 1672×941 | No | No aplica |
| 02-hero-celular.png | 1 | plate | 864×1536 | No | No aplica |
| 03-hero-cielo.png | 1 | sky | 1672×941 | No | No aplica |
| 04-hero-primer-plano.png | 1 | foreground | 703×435 | Sí | 50% / 99% (sugerida) |
| 05-mayo-provisoria.png | 1 | mayo-provisional | 912×1024 | Sí | 50% / 99% (sugerida) |
| 10-isla3-base.png | 3 | plate | 1672×941 | No | No aplica |
| 11-plataforma-1.png | 3 | object | 1024×671 | Sí | 50% / 99% (sugerida) |
| 12-plataforma-2.png | 3 | object | 625×956 | Sí | 50% / 99% (sugerida) |
| 13-plataforma-3.png | 3 | object | 742×1013 | Sí | 50% / 99% (sugerida) |
| 14-p1-base.png | 3 | object | 1024×500 | Sí | 50% / 99% (sugerida) |
| 14-p1-der.png | 3 | object | 736×938 | Sí | 50% / 99% (sugerida) |
| 14-p1-izq.png | 3 | object | 962×659 | Sí | 50% / 99% (sugerida) |
| 14-p1-shadow-izq.png | 3 | shadow | 262×261 | Sí | Ver contact-shadows.json |
| 14-p1-shadow-tapa.png | 3 | shadow | 442×192 | Sí | Ver contact-shadows.json |
| 14-p1-tapa.png | 3 | object | 980×670 | Sí | 50% / 99% (sugerida) |
| 15-p2-base.png | 3 | object | 958×623 | Sí | 50% / 99% (sugerida) |
| 15-p2-der.png | 3 | object | 602×951 | Sí | 50% / 99% (sugerida) |
| 15-p2-izq.png | 3 | object | 614×872 | Sí | 50% / 99% (sugerida) |
| 15-p2-shadow-der.png | 3 | shadow | 295×153 | Sí | Ver contact-shadows.json |
| 15-p2-shadow-izq.png | 3 | shadow | 315×455 | Sí | Ver contact-shadows.json |
| 15-p2-shadow-tapa.png | 3 | shadow | 412×203 | Sí | Ver contact-shadows.json |
| 15-p2-tapa.png | 3 | object | 900×608 | Sí | 50% / 99% (sugerida) |
| 16-p3-base.png | 3 | object | 952×597 | Sí | 50% / 99% (sugerida) |
| 16-p3-der.png | 3 | object | 550×903 | Sí | 50% / 99% (sugerida) |
| 16-p3-izq.png | 3 | object | 617×853 | Sí | 50% / 99% (sugerida) |
| 16-p3-shadow-der.png | 3 | shadow | 334×221 | Sí | Ver contact-shadows.json |
| 16-p3-shadow-izq.png | 3 | shadow | 369×482 | Sí | Ver contact-shadows.json |
| 16-p3-shadow-tapa.png | 3 | shadow | 397×155 | Sí | Ver contact-shadows.json |
| 16-p3-tapa.png | 3 | object | 908×699 | Sí | 50% / 99% (sugerida) |
| 20-roca-suelta-1.png | 3 | object | 861×699 | Sí | 50% / 99% (sugerida) |
| 20-roca-suelta-2.png | 3 | object | 997×376 | Sí | 50% / 99% (sugerida) |
| 20-roca-suelta-3.png | 3 | object | 995×388 | Sí | 50% / 99% (sugerida) |
| 20-roca-suelta-4.png | 3 | object | 923×731 | Sí | 50% / 99% (sugerida) |
## Ensamble y sombras
Lienzo de diseño1254×1254. Coordenadas de esquina superior izquierda y ancho; mantener proporción original. Z-order en el orden indicado:
- P1: derecha(765,355),350; base(320,550),815; cima(390,400),450; izquierda(120,650),435.
- P2: base(310,705),625; derecha(565,300),335; izquierda(340,420),320; cima(395,180),435.
- P3: base(240,675),740; derecha(550,300),345; izquierda(265,365),365; cima(420,130),385.

contact-shadows.json registra el recorte de cada sombra sobre ese lienzo; colocar con esos offsets y escalar junto con el conjunto. Cada sombra va debajo de su roca emisora y encima de las receptoras. Mostrar solo al ensamblar: nunca pegarlas permanentemente al PNG de roca dispersa.
Sombras artísticas derivadas de alpha, recortadas por receptor: P1 desplazamiento7/14, blur8; P2/P3 desplazamiento6/12, blur7; opacidad65%, color#352719.
P1v4 y P2v1 aprobadas por Juani. P3v1 revisada visualmente por el agente: no implica aceptación humana. Última referenciaP3 elegida por Juani; no rediseñar.

## Verificación y límites
- PNGs dentro de máximos: placas2048, móvil1536, objetos1024; originales preservados aparte.
- Fondo magenta eliminado, márgenes transparentes recortados. Mayo provisional con eliminación de exceso verde de chroma.
- QA visual de formas completas, ausencia de texto/personajes extra y bordes sobre claro/oscuro. No es prueba de animación ni de integración.
- Anclas sugeridas, no calibración física3D. Cambios de iluminación entre piezas generadas son aproximados.
- No hay tests de aplicación pertinentes para PNGs; no se ejecutó build y no se editó código.
- Reversión por lote: retirar solo assets y filas correspondientes; conservar originales externos.
- Engram falló previamente con Transport closed; continuidad conservada en odd/tasks/mayo-world-assets.md.

## Originales versionados
SHA-256 comparado con Desktop/MayofyMundo. El fondo sólido forma parte del original; no tiene transparencia útil para montar.

| Archivo | Tamaño px | Alpha útil | Uso |
|---|---|---|---|
| raw/00-referencia-estilo.png | 1672x941 | No | Original sin modificación; no montar |
| raw/01-hero-escritorio.png | 1672x941 | No | Original sin modificación; no montar |
| raw/02-hero-celular.png | 941x1672 | No | Original sin modificación; no montar |
| raw/03-hero-cielo.png | 1672x941 | No | Original sin modificación; no montar |
| raw/04-hero-primer-plano.png | 1672x941 | No | Original sin modificación; no montar |
| raw/05-mayo-provisoria.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/10-isla3-base.png | 1672x941 | No | Original sin modificación; no montar |
| raw/11-plataforma-1.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/12-plataforma-2.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/13-plataforma-3.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/14-p1-base.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/14-p1-der.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/14-p1-izq.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/14-p1-tapa.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/15-p2-base.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/15-p2-der.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/15-p2-izq.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/15-p2-tapa.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/16-p3-base.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/16-p3-der.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/16-p3-izq.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/16-p3-tapa.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/20-roca-suelta-1.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/20-roca-suelta-2.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/20-roca-suelta-3.png | 1254x1254 | No | Original sin modificación; no montar |
| raw/20-roca-suelta-4.png | 1254x1254 | No | Original sin modificación; no montar |

## Entrega isla 2

12 imágenes: placas desktop/mobile, cielo, primer plano y8 rocas. Mañana clara; sin personajes. Primera placa rechazada por margen inferior; segunda versión corregida. Objetos completos y fondo sólido removido; originales verificados por SHA-256.

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla |
|---|---|---|---|---|---|
| 30-isla2-celular.png | 2 | plate | 864×1536 | No | No aplica |
| raw/30-isla2-celular.png | 2 | plate | 941x1672 | No | Original; no montar |
| 30-isla2-escritorio.png | 2 | plate | 1672×941 | No | No aplica |
| raw/30-isla2-escritorio.png | 2 | plate | 1672x941 | No | Original; no montar |
| 31-isla2-cielo.png | 2 | sky | 1672×941 | No | No aplica |
| raw/31-isla2-cielo.png | 2 | sky | 1672x941 | No | Original; no montar |
| 32-isla2-primer-plano.png | 2 | foreground | 852×499 | Sí | 50% / 99% sugerida |
| raw/32-isla2-primer-plano.png | 2 | foreground | 1254x1254 | No | Original; no montar |
| 33-isla2-roca-01.png | 2 | object | 916×780 | Sí | 50% / 99% sugerida |
| raw/33-isla2-roca-01.png | 2 | object | 1254x1254 | No | Original; no montar |
| 33-isla2-roca-02.png | 2 | object | 1024×486 | Sí | 50% / 99% sugerida |
| raw/33-isla2-roca-02.png | 2 | object | 1254x1254 | No | Original; no montar |
| 33-isla2-roca-03.png | 2 | object | 994×464 | Sí | 50% / 99% sugerida |
| raw/33-isla2-roca-03.png | 2 | object | 1254x1254 | No | Original; no montar |
| 33-isla2-roca-04.png | 2 | object | 911×711 | Sí | 50% / 99% sugerida |
| raw/33-isla2-roca-04.png | 2 | object | 1254x1254 | No | Original; no montar |
| 33-isla2-roca-05.png | 2 | object | 943×633 | Sí | 50% / 99% sugerida |
| raw/33-isla2-roca-05.png | 2 | object | 1254x1254 | No | Original; no montar |
| 33-isla2-roca-06.png | 2 | object | 1024×570 | Sí | 50% / 99% sugerida |
| raw/33-isla2-roca-06.png | 2 | object | 1254x1254 | No | Original; no montar |
| 33-isla2-roca-07.png | 2 | object | 926×503 | Sí | 50% / 99% sugerida |
| raw/33-isla2-roca-07.png | 2 | object | 1254x1254 | No | Original; no montar |
| 33-isla2-roca-08.png | 2 | object | 672×961 | Sí | 50% / 99% sugerida |
| raw/33-isla2-roca-08.png | 2 | object | 1254x1254 | No | Original; no montar |

## Entrega isla 4

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla |
|---|---|---|---|---|---|
| 40-isla4-escritorio.png | 4 | plate | 1672x941 | No | No aplica |
| raw/40-isla4-escritorio.png | 4 | plate | 1672x941 | No | Original; no montar |
| 40-isla4-celular.png | 4 | plate | 864x1536 | No | No aplica |
| raw/40-isla4-celular.png | 4 | plate | 941x1672 | No | Original; no montar |
| 41-isla4-cielo.png | 4 | sky | 1672x941 | No | No aplica |
| raw/41-isla4-cielo.png | 4 | sky | 1672x941 | No | Original; no montar |
| 42-isla4-primer-plano.png | 4 | foreground | 1024x556 | Sí | 50% / 99% sugerida |
| raw/42-isla4-primer-plano.png | 4 | foreground | 1254x1254 | No | Original; no montar |
| 43-isla4-invernadero.png | 4 | object | 1024x807 | Sí | 50% / 99% sugerida |
| raw/43-isla4-invernadero.png | 4 | object | 1254x1254 | No | Original; no montar |
| 43-isla4-engranaje.png | 4 | object | 996x692 | Sí | 50% / 99% sugerida |
| raw/43-isla4-engranaje.png | 4 | object | 1254x1254 | No | Original; no montar |
| 43-isla4-maceta.png | 4 | object | 863x700 | Sí | 50% / 99% sugerida |
| raw/43-isla4-maceta.png | 4 | object | 1254x1254 | No | Original; no montar |
| 43-isla4-caja.png | 4 | object | 1024x684 | Sí | 50% / 99% sugerida |
| raw/43-isla4-caja.png | 4 | object | 1254x1254 | No | Original; no montar |
| 43-isla4-tierra-01.png | 4 | object | 1024x423 | Sí | 50% / 99% sugerida |
| raw/43-isla4-tierra-01.png | 4 | object | 1254x1254 | No | Original; no montar |
| 43-isla4-tierra-02.png | 4 | object | 1024x341 | Sí | 50% / 99% sugerida |
| raw/43-isla4-tierra-02.png | 4 | object | 1254x1254 | No | Original; no montar |

## Entrega isla 5

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla |
|---|---|---|---|---|---|
| 45-isla5-escritorio.png | 5 | plate | 1672x941 | No | No aplica |
| raw/45-isla5-escritorio.png | 5 | plate | 1672x941 | No | Original; no montar |
| 45-isla5-celular.png | 5 | plate | 864x1536 | No | No aplica |
| raw/45-isla5-celular.png | 5 | plate | 941x1672 | No | Original; no montar |
| 46-isla5-cielo.png | 5 | sky | 1672x941 | No | No aplica |
| raw/46-isla5-cielo.png | 5 | sky | 1672x941 | No | Original; no montar |
| 47-isla5-primer-plano.png | 5 | foreground | 1024x594 | Sí | 50% / 99% sugerida |
| raw/47-isla5-primer-plano.png | 5 | foreground | 1254x1254 | No | Original; no montar |
| 48-isla5-paso-01.png | 5 | object | 1024x522 | Sí | 50% / 99% sugerida |
| raw/48-isla5-paso-01.png | 5 | object | 1254x1254 | No | Original; no montar |
| 48-isla5-hito-01.png | 5 | object | 883x672 | Sí | 50% / 99% sugerida |
| raw/48-isla5-hito-01.png | 5 | object | 1254x1254 | No | Original; no montar |
| 48-isla5-paso-02.png | 5 | object | 983x532 | Sí | 50% / 99% sugerida |
| raw/48-isla5-paso-02.png | 5 | object | 1254x1254 | No | Original; no montar |
| 48-isla5-hito-02.png | 5 | object | 693x768 | Sí | 50% / 99% sugerida |
| raw/48-isla5-hito-02.png | 5 | object | 1254x1254 | No | Original; no montar |
| 48-isla5-paso-03.png | 5 | object | 1024x498 | Sí | 50% / 99% sugerida |
| raw/48-isla5-paso-03.png | 5 | object | 1254x1254 | No | Original; no montar |
| 48-isla5-hito-03.png | 5 | object | 758x821 | Sí | 50% / 99% sugerida |
| raw/48-isla5-hito-03.png | 5 | object | 1254x1254 | No | Original; no montar |
| 48-isla5-paso-04.png | 5 | object | 1024x378 | Sí | 50% / 99% sugerida |
| raw/48-isla5-paso-04.png | 5 | object | 1254x1254 | No | Original; no montar |
| 48-isla5-hito-04.png | 5 | object | 841x595 | Sí | 50% / 99% sugerida |
| raw/48-isla5-hito-04.png | 5 | object | 1254x1254 | No | Original; no montar |
| 48-isla5-paso-05.png | 5 | object | 992x614 | Sí | 50% / 99% sugerida |
| raw/48-isla5-paso-05.png | 5 | object | 1254x1254 | No | Original; no montar |
| 48-isla5-hito-05.png | 5 | object | 919x577 | Sí | 50% / 99% sugerida |
| raw/48-isla5-hito-05.png | 5 | object | 1254x1254 | No | Original; no montar |
| 48-isla5-paso-06.png | 5 | object | 1024x465 | Sí | 50% / 99% sugerida |
| raw/48-isla5-paso-06.png | 5 | object | 1254x1254 | No | Original; no montar |
| 48-isla5-hito-06.png | 5 | object | 638x799 | Sí | 50% / 99% sugerida |
| raw/48-isla5-hito-06.png | 5 | object | 1254x1254 | No | Original; no montar |

## Entrega isla 6

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla |
|---|---|---|---|---|---|
| 50-isla6-escritorio.png | 6 | plate | 1672x941 | No | No aplica |
| raw/50-isla6-escritorio.png | 6 | plate | 1672x941 | No | Original; no montar |
| 50-isla6-celular.png | 6 | plate | 864x1536 | No | No aplica |
| raw/50-isla6-celular.png | 6 | plate | 941x1672 | No | Original; no montar |
| 51-isla6-cielo.png | 6 | sky | 1672x941 | No | No aplica |
| raw/51-isla6-cielo.png | 6 | sky | 1672x941 | No | Original; no montar |
| 52-isla6-primer-plano.png | 6 | foreground | 1024x480 | Sí | 50% / 99% sugerida |
| raw/52-isla6-primer-plano.png | 6 | foreground | 1254x1254 | No | Original; no montar |
| 53-isla6-fogon.png | 6 | object | 1024x1024 | Sí | 50% / 99% sugerida |
| raw/53-isla6-fogon.png | 6 | object | 1254x1254 | No | Original; no montar |
| 53-isla6-banco.png | 6 | object | 1024x457 | Sí | 50% / 99% sugerida |
| raw/53-isla6-banco.png | 6 | object | 1254x1254 | No | Original; no montar |

## Entrega isla 7 — 17 de noviembre de 2026

Lote visual aprobado por Juani; tres sprites menta sobre negro aceptados por el coordinador. Los sprites no tienen alpha: requieren screen/additive blending. No usar chroma key ni tratarlos como PNG transparentes. Originales externos preservados; raw/ sin cambios.

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla | Estado |
|---|---|---|---|---|---|---|
| 55-isla7-celular.avif | 7 | plate | 864x1536 | No | No aplica | Entregado |
| 55-isla7-celular.png | 7 | plate | 864x1536 | No | No aplica | Entregado |
| 55-isla7-celular.webp | 7 | plate | 864x1536 | No | No aplica | Entregado |
| 55-isla7-escritorio.avif | 7 | plate | 1672x941 | No | No aplica | Entregado |
| 55-isla7-escritorio.png | 7 | plate | 1672x941 | No | No aplica | Entregado |
| 55-isla7-escritorio.webp | 7 | plate | 1672x941 | No | No aplica | Entregado |
| 56-isla7-cielo.avif | 7 | sky | 1672x941 | No | No aplica | Entregado |
| 56-isla7-cielo.png | 7 | sky | 1672x941 | No | No aplica | Entregado |
| 56-isla7-cielo.webp | 7 | sky | 1672x941 | No | No aplica | Entregado |
| 57-isla7-primer-plano.avif | 7 | foreground | 1024x493 | Sí | 50% / 99% sugerida | Entregado |
| 57-isla7-primer-plano.png | 7 | foreground | 1024x493 | Sí | 50% / 99% sugerida | Entregado |
| 57-isla7-primer-plano.webp | 7 | foreground | 1024x493 | Sí | 50% / 99% sugerida | Entregado |
| 58-isla7-farol.avif | 7 | object | 592x1024 | Sí | 50% / 99% sugerida | Entregado |
| 58-isla7-farol.png | 7 | object | 592x1024 | Sí | 50% / 99% sugerida | Entregado |
| 58-isla7-farol.webp | 7 | object | 592x1024 | Sí | 50% / 99% sugerida | Entregado |
| 58-isla7-luciernaga-01.avif | 7 | object | 512x512 | No | 50% / 50%; screen/additive | Entregado |
| 58-isla7-luciernaga-01.png | 7 | object | 512x512 | No | 50% / 50%; screen/additive | Entregado |
| 58-isla7-luciernaga-01.webp | 7 | object | 512x512 | No | 50% / 50%; screen/additive | Entregado |
| 58-isla7-luciernaga-02.avif | 7 | object | 512x512 | No | 50% / 50%; screen/additive | Entregado |
| 58-isla7-luciernaga-02.png | 7 | object | 512x512 | No | 50% / 50%; screen/additive | Entregado |
| 58-isla7-luciernaga-02.webp | 7 | object | 512x512 | No | 50% / 50%; screen/additive | Entregado |
| 58-isla7-luciernaga-03.avif | 7 | object | 512x512 | No | 50% / 50%; screen/additive | Entregado |
| 58-isla7-luciernaga-03.png | 7 | object | 512x512 | No | 50% / 50%; screen/additive | Entregado |
| 58-isla7-luciernaga-03.webp | 7 | object | 512x512 | No | 50% / 50%; screen/additive | Entregado |

Verificación: 24 archivos decodificados; placas dentro de 2048 px, móvil 1536 px, objetos 1024 px y sprites 512x512. Recortes inspeccionados sobre azul oscuro; dimensiones y transparencia comprobadas. WebP sin pérdida; AVIF calidad 85 (sprites 90). Sin prueba de integración en navegador.
Las hojas y el farol usan eliminación de magenta, trim y reducción de contaminación de color. Las sombras de contacto de plataformas permanecen separadas y mantienen las coordenadas originales.


## Parallax: hero escritorio

Criterio acordado con el coordinador: RGB original exacto en el interior opaco; inspección visual sin costura ni halo de cielo anterior en el borde suavizado. Se corrige el RGB semitransparente contra el nuevo fondo antes de componer. La máscara mantiene el lienzo y la posición originales; no se recorta el canvas.

| Archivo | Isla | Rol | Tamaño px | Alpha | Bbox/ancla | Estado |
|---|---|---|---|---|---|---|
| 01-hero-escritorio-isla.png | 1 | island-cutout | 1672x941 | Sí | L26.02%, T46.87%, R74.34%, B99.26% | Entregado |
| 01-hero-escritorio-fondo.png | 1 | background | 1672x941 | No | Overlay 1:1 | Entregado |
| 01-hero-escritorio-isla.webp | 1 | island-cutout | 1672x941 | Sí | L26.02%, T46.87%, R74.34%, B99.26% | Entregado |
| 01-hero-escritorio-fondo.webp | 1 | background | 1672x941 | No | Overlay 1:1 | Entregado |
| 01-hero-escritorio-isla.avif | 1 | island-cutout | 1672x941 | Sí | L26.02%, T46.87%, R74.34%, B99.26% | Entregado |
| 01-hero-escritorio-fondo.avif | 1 | background | 1672x941 | No | Overlay 1:1 | Entregado |
| 01-hero-escritorio-composite-check.png | 1 | plate | 1672x941 | No | QA, no montar | Verificado |

Composición PNG: diferencia absoluta RGB ponderada por alpha, normalizada 0–1 y promediada sobre todo el canvas: media 0.000043392, máximo 0.184543. Interior con alpha=1: media 0, máximo 0. Bbox del soporte alpha>0: x435,y441,w808,h493. Las métricas corresponden a PNG; AVIF/WebP son derivados con pérdida, no igualdad de píxeles.
QA visual: composición sobre fondo inpainted y recorte sobre azul oscuro; no se observó borde lavanda ni costura a escala de inspección. No equivale a validación de parallax en navegador. Composición de prueba: [PNG](../../public/images/mundo-mayo/01-hero-escritorio-composite-check.png).


## Parallax: isla 2 escritorio

| Archivo | Isla | Rol | Tamaño px | Alpha | Bbox/ancla | Estado |
|---|---|---|---|---|---|---|
| 30-isla2-escritorio-isla.png | 2 | island-cutout | 1672x941 | Sí | L,T,R,B: 18,42%, 52,28%, 81,22%, 92,56% | Entregado |
| 30-isla2-escritorio-fondo.png | 2 | background | 1672x941 | No | Overlay 1:1 | Entregado |
| 30-isla2-escritorio-isla.webp | 2 | island-cutout | 1672x941 | Sí | L,T,R,B: 18,42%, 52,28%, 81,22%, 92,56% | Entregado |
| 30-isla2-escritorio-fondo.webp | 2 | background | 1672x941 | No | Overlay 1:1 | Entregado |
| 30-isla2-escritorio-isla.avif | 2 | island-cutout | 1672x941 | Sí | L,T,R,B: 18,42%, 52,28%, 81,22%, 92,56% | Entregado |
| 30-isla2-escritorio-fondo.avif | 2 | background | 1672x941 | No | Overlay 1:1 | Entregado |
| 30-isla2-escritorio-composite-check.png | 2 | plate | 1672x941 | No | QA, no montar | Verificado |

Mismo método y definición de métricas que el hero: diferencia RGB ponderada por alpha, media 0.0000272417 y máximo 0.217029; interior opaco: media 0, máximo 0. Bbox alpha>0: x308,y492,w1050,h379. PNG original conservado en interior; borde corregido contra fondo. Composición y recorte inspeccionados sobre cielo y azul oscuro; sin prueba de parallax en navegador. WebP calidad 82, AVIF calidad 85.
Composición de prueba: [PNG](../../public/images/mundo-mayo/30-isla2-escritorio-composite-check.png).


## Parallax: isla 2 celular

| Archivo | Isla | Rol | Tamaño px | Alpha | Bbox/ancla | Estado |
|---|---|---|---|---|---|---|
| 30-isla2-celular-isla.png | 2 | island-cutout | 864x1536 | Sí | L5.21%, T62.57%, R95.02%, B91.73% | Entregado |
| 30-isla2-celular-fondo.png | 2 | background | 864x1536 | No | Overlay 1:1 | Entregado |
| 30-isla2-celular-isla.webp | 2 | island-cutout | 864x1536 | Sí | L5.21%, T62.57%, R95.02%, B91.73% | Entregado |
| 30-isla2-celular-fondo.webp | 2 | background | 864x1536 | No | Overlay 1:1 | Entregado |
| 30-isla2-celular-isla.avif | 2 | island-cutout | 864x1536 | Sí | L5.21%, T62.57%, R95.02%, B91.73% | Entregado |
| 30-isla2-celular-fondo.avif | 2 | background | 864x1536 | No | Overlay 1:1 | Entregado |
| 30-isla2-celular-composite-check.png | 2 | plate | 864x1536 | No | QA, no montar | Verificado |

Diferencia RGB ponderada por alpha: media 0.000109646, máximo 0.201663; interior opaco: media 0, máximo 0. Bbox alpha>0: x45,y961,w776,h448. Máscara y fondo generados normalizados al canvas final 864x1536; interior RGB tomado de la placa final original. Bordes corregidos contra fondo. Composición inspeccionada sobre cielo y azul oscuro: las raíces finas conservan brillos claros; verificar desplazamiento real antes de aceptación de integración. WebP calidad 82, AVIF calidad 85.
Composición: [PNG](../../public/images/mundo-mayo/30-isla2-celular-composite-check.png).


## Cambio de prioridad: Mayo pintada (17 de noviembre de 2026)

El coordinador transmite la decisión de Juani: reemplazar Mayo 3D en tiempo real por arte prerenderizado con frames. Después de isla 2 móvil, prioridad a 70-mayo-hoja-estilo.png (1536x1024, frente y tres cuartos, fondo magenta), aprobada por Juani el 17 de noviembre de 2026 antes de generar poses. Identidad única: mayo-3d/dist/keyframes/mayo-identity.png; poses: mayo-key-<id>-f1..f6.png, lectura solamente.
Slots: hero=01-hero; fall=03-fall-float; problem=04-play-rocks; packs=05-platform-jump; systems=06-dig; works=07-run; host=10-rest; questions=08-chase-firefly. Cada slot entrega 4–6 celdas 1024x1024, tira horizontal, AVIF/WebP con pérdida, fps sugeridos 4–8 y ancla de patas. No generar poses hasta aprobar identidad. Hero (primer slot) requiere aceptación; los posteriores se reportan.
Pendientes anteriores conservados: pares 10/40/45/50/55 y hero móvil, lote C y reconversión de todos los WebP existentes a calidad aproximada 82 manteniendo alpha y dimensiones; AVIF sin cambios. No tocar src/ ni agregar dependencias.


| Archivo | Rol | Tamaño px | Alpha | Estado |
|---|---|---|---|---|
| 70-mayo-hoja-estilo.png | Referencia de identidad, no montar | 1536x1024 | No, magenta | Aprobada por Juani, incluido el matiz cálido |

Referencias adjuntas: mayo-identity.png del export de keyframes y 00-referencia-estilo.png. Generada una hoja con frente y tres cuartos. Juani aprobó la hoja sin cambios, incluido el matiz cálido del pelaje; se bloquea como referencia de identidad para todas las poses.


## Mayo pintada: hero (primer slot)

Seis frames generados en orden con hoja aprobada, keyframe correspondiente y frame pintado anterior adjuntos. Luz de amanecer, pose sentada, ojos abiertos, lengua breve y movimiento de cola. Canvas común sin recorte individual: 1024x1024 por celda; tira horizontal de 6144x1024. Reproducción sugerida: 6 fps, orden f1–f6; ancla de patas común aproximada: x50%, y94.7% de la celda.

Magenta eliminado por matte de crominancia con transición suave y descontaminación RGB; sombra de contacto conservada como alpha. Sin dependencias nuevas. WebP con pérdida calidad 82 y alpha calidad 100; AVIF calidad 85. Los PNG conservan el canvas completo para evitar saltos de posición al montar la tira. La aprobación de este primer slot se solicita exclusivamente mediante el coordinador; no iniciar fall hasta su respuesta.

| Archivo | Isla / slot | Rol | Tamaño px | Alpha | Ancla / celdas / fps | Estado |
|---|---|---|---|---|---|---|
| 70-mayo-hero-f1.png | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 1 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f1.webp | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 1 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f1.avif | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 1 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f2.png | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 2 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f2.webp | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 2 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f2.avif | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 2 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f3.png | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 3 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f3.webp | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 3 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f3.avif | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 3 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f4.png | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 4 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f4.webp | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 4 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f4.avif | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 4 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f5.png | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 5 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f5.webp | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 5 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f5.avif | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 5 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f6.png | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 6 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f6.webp | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 6 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-f6.avif | 1 / hero | object | 1024x1024 | Sí | Patas 50%,94.7%; frame 6 de 6; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-tira.png | 1 / hero | object | 6144x1024 | Sí | 6 celdas 1024x1024; patas 50%,94.7%; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-tira.webp | 1 / hero | object | 6144x1024 | Sí | 6 celdas 1024x1024; patas 50%,94.7%; 6 fps | Entregado, aceptación pendiente |
| 70-mayo-hero-tira.avif | 1 / hero | object | 6144x1024 | Sí | 6 celdas 1024x1024; patas 50%,94.7%; 6 fps | Entregado, aceptación pendiente |

Verificación: lectura de dimensiones y alpha en los 21 archivos; inspección de los seis originales y del recorte sobre fondo oscuro. La aprobación visual y la animación montada en la landing siguen pendientes; la inspección de frames estáticos no equivale a aceptación del loop.

## Ampliación de animación (17 de noviembre de 2026)

El coordinador confirma hero aprobado y montado en 05c3fd0, loop verificado en navegador a 6 fps. Juani amplía a 12 frames por slot y 8–12 fps; los seis intermedios de hero quedan para el final. Este agente continúa fall, problem y packs; un segundo agente produce systems, works, host y questions en otra conversación. Se esperan keyframes de 12 pasos; mientras tanto se permiten poses intermedias entre los seis existentes. Mantener preset de luz por isla mientras el coordinador precisa el ajuste de integración solicitado por Juani. No se requieren nuevas aceptaciones por slot.

## WebP con pérdida (17 de noviembre de 2026)

Reconversión de los 90 WebP de islas, objetos, sombras y pares de parallax existentes (excluye Mayo 70, ya con pérdida). Calidad 82, alpha-quality 100, mismas dimensiones y transparencia; PNG y AVIF sin cambios. Tamaño total anterior 48.249.576 bytes; nuevo 5.452.588 bytes (reducción 88,7%). Se verificaron decodificación, dimensiones y opacidad de los 90 archivos. El peso depende del detalle y del canal alpha; no se fuerza una relación fija con AVIF. optimization-report.json actualiza los tamaños de los 76 originales incluidos en ese informe.

## Mayo pintada: fall (12 frames)

Referencias de pose: mayo-key-03-fall-float-f1..f12.png, export estable 2d7c4e4. Se descartó el intermedio creado con la numeración anterior. Frame 1 conserva la pose inicial; los siguientes siguen los nuevos keyframes. Boca abierta y lengua al viento. Desde la corrección de f6 se adjuntan el frame anterior como referencia primaria, pose y los cielos 31-isla2-cielo / 03-hero-cielo. Se rechazó la primera versión de f6 por cambio visible del pelaje; la sustitución reduce ese cambio. Comparaciones al 50% de pares consecutivos realizadas; persiste variación fina del render, no se declara identidad píxel a píxel entre poses.

Canvas 1024x1024 por frame; no se escala cada perro por separado. Tras descontaminar magenta, cada canvas recibe solamente una traslación vertical para dejar el píxel inferior de las patas (alpha>50%) en y900: 87,89%. Ancla sugerida 20%,87,89% (patas delanteras); en esta pose aérea es un punto de montaje, no contacto con suelo. Sin plano ni sombra de suelo añadidos al perro que cae. Tira horizontal en orden numérico f1..f12: 12288x1024, 12 celdas, 10 fps sugeridos. PNG8-bit, AVIF85, WebP82 con alpha100.

| Archivo | Isla / slot | Rol | Tamaño px | Alpha | Ancla / celdas / fps | Estado |
|---|---|---|---|---|---|---|
| 70-mayo-fall-f1.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 1 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f1.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 1 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f1.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 1 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f2.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 2 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f2.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 2 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f2.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 2 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f3.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 3 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f3.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 3 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f3.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 3 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f4.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 4 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f4.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 4 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f4.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 4 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f5.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 5 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f5.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 5 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f5.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 5 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f6.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 6 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f6.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 6 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f6.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 6 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f7.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 7 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f7.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 7 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f7.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 7 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f8.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 8 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f8.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 8 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f8.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 8 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f9.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 9 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f9.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 9 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f9.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 9 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f10.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 10 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f10.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 10 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f10.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 10 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f11.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 11 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f11.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 11 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f11.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 11 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f12.png | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 12 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f12.webp | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 12 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-f12.avif | Transición 1–2 / fall | object | 1024x1024 | Sí | 20%,87.89%; frame 12 de 12; 10 fps | Entregado técnico |
| 70-mayo-fall-tira.png | Transición 1–2 / fall | object | 12288x1024 | Sí | 12 celdas 1024x1024; 20%,87.89%; 10 fps | Entregado técnico |
| 70-mayo-fall-tira.webp | Transición 1–2 / fall | object | 12288x1024 | Sí | 12 celdas 1024x1024; 20%,87.89%; 10 fps | Entregado técnico |
| 70-mayo-fall-tira.avif | Transición 1–2 / fall | object | 12288x1024 | Sí | 12 celdas 1024x1024; 20%,87.89%; 10 fps | Entregado técnico |

Verificación: decodificación y dimensiones/alpha de los 39 archivos, orden numérico de celdas y revisión visual del recorte sobre fondo oscuro. Integración y reproducción real en la landing pendientes del coordinador.

## Hero móvil: máscara rechazada tras tres candidatos

No se entrega todavía el par 02-hero-celular-isla/fondo. La primera máscara recuperada tenía un desplazamiento vertical de unos 50 px; corregirlo dejó contaminación de cielo en raíces finas. La segunda generación conservó mejor la posición pero inventó puntas de hojas y bordes de raíces fuera de la silueta. La tercera volvió a desplazar la isla significativamente hacia arriba. Todas se comprobaron componiendo la placa original con el matte sobre azul oscuro. El refinamiento cromático local reduce el halo, pero elimina raíces finas; no cumple la calidad acordada. Candidatos preservados en Desktop/MayofyMundo/02-hero-mobile-mask[-v2/-v3]-candidate.png; fondo candidato conservado por separado. Se solicita al coordinador una alternativa tras tres intentos; no se publica un recorte defectuoso.

### Prueba local autorizada: bloqueo confirmado

Se instaló rembg 2.0.87 con CPU en %TEMP%/mayofy-matting-venv (Python 3.12), sin dependencias del proyecto ni instalación global. Modelo birefnet-general descargado en %TEMP%/mayofy-matting-work; inferencia local con 4 threads sobre la placa original 864x1536. El resultado conservó las copas y parte del extremo derecho, pero eliminó casi toda la plataforma y las raíces: no cumple la silueta. QA: %TEMP%/mayofy-matting-work/02-dark-check.png. Se deja el par hero móvil bloqueado, conforme a la instrucción del coordinador si también falla el método local; no se hacen más generaciones. Referencias técnicas: [rembg](https://github.com/danielgatis/rembg), [BiRefNet](https://github.com/ZhengPeng7/BiRefNet). Los candidatos no están publicados bajo nombres finales.

## Mayo pintada: problem (12 frames)

Secuencia de aterrizaje f1–f6 y juego f7–f12, según mayo-key-04-play-rocks-f1..f12 del export estable 2d7c4e4. Identidad aprobada c25f278 y luz de mañana de 30-isla2-escritorio. Desde f2 se adjuntaron el frame pintado anterior, el keyframe de pose y la placa; comparación consecutiva al 50% antes de continuar. Boca juguetona con lengua extendida en frames pares, más recogida en impares. Se conserva variación fina generativa del pelo; no se declara coherencia píxel a píxel.

Recorte de magenta descontaminado, sombra suave incluida y canvas común 1024x1024. Sin escalado individual: traslación vertical de cada canvas para fijar el borde inferior alpha>50% en y950 (92,77%). Ancla sugerida de las patas delanteras: 40%,92,77%. Tira numérica f1..f12, 12288x1024; 12 celdas de 1024, 10 fps sugeridos. Reproducir en ping-pong, conforme a la decisión de Juani; no usar salto directo de f12 a f1. La misma decisión aplica a hero y fall, ya aceptados por Juani.

| Archivo | Isla / slot | Rol | Tamaño px | Alpha | Ancla / celdas / fps | Estado |
|---|---|---|---|---|---|---|
| 70-mayo-problem-f1.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 1 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f1.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 1 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f1.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 1 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f2.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 2 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f2.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 2 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f2.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 2 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f3.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 3 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f3.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 3 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f3.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 3 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f4.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 4 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f4.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 4 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f4.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 4 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f5.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 5 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f5.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 5 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f5.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 5 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f6.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 6 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f6.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 6 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f6.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 6 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f7.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 7 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f7.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 7 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f7.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 7 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f8.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 8 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f8.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 8 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f8.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 8 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f9.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 9 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f9.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 9 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f9.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 9 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f10.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 10 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f10.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 10 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f10.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 10 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f11.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 11 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f11.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 11 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f11.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 11 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f12.png | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 12 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f12.avif | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 12 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-f12.webp | 2 / problem | object | 1024x1024 | Sí | 40%,92.77%; frame 12 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-tira.png | 2 / problem | object | 12288x1024 | Sí | 12 celdas 1024x1024; 40%,92.77%; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-tira.avif | 2 / problem | object | 12288x1024 | Sí | 12 celdas 1024x1024; 40%,92.77%; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-problem-tira.webp | 2 / problem | object | 12288x1024 | Sí | 12 celdas 1024x1024; 40%,92.77%; 10 fps; ping-pong | Entregado técnico |

Formatos: PNG8-bit, AVIF85 y WebP82 con pérdida y alpha100. Verificación: dimensiones, decodificación y alpha de los 39 archivos; línea inferior común y orden numérico comprobados; recortes inspeccionados sobre fondo oscuro. QA local: %TEMP%/mayo-problem-processing/qa-grid.png. Integración y reproducción real en la landing pendientes del coordinador.

## Mayo pintada: packs (12 frames)

Salto entre plataformas según mayo-key-05-platform-jump-f1..f12 (2d7c4e4), vista lateral izquierda del keyframe y luz de mediodía de 10-isla3-base. Frame anterior, pose y placa como referencias; desde la sustitución de f7 se suma el f1 original como cuarta referencia fija de identidad/textura, autorizado por el coordinador. Se regeneraron f7–f10 por deriva del pelaje. Rechazados también dos candidatos de f6 (tercera oreja y pose incorrecta) y candidatos de f7/f9 que copiaban una pose equivocada. Comparaciones consecutivas al 50%; permanece variación fina generativa, sin promesa de identidad píxel a píxel.

Aclaración aprobada: el ancla de patas representa la línea del suelo/sombra de contacto, no el píxel más bajo del perro en vuelo. Se fija esa línea en y930 (90,82%) y se permite que las patas suban durante el salto. Recorte descontaminado con sombra incluida; traslación vertical sin escalado individual. Ancla de montaje sugerida 50%,90,82%. Celdas 1024x1024; tira de 12288x1024 en orden f1..f12; 10 fps, ping-pong.

| Archivo | Isla / slot | Rol | Tamaño px | Alpha | Ancla / celdas / fps | Estado |
|---|---|---|---|---|---|---|
| 70-mayo-packs-f1.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 1 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f1.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 1 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f1.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 1 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f2.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 2 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f2.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 2 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f2.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 2 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f3.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 3 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f3.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 3 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f3.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 3 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f4.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 4 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f4.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 4 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f4.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 4 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f5.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 5 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f5.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 5 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f5.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 5 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f6.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 6 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f6.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 6 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f6.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 6 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f7.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 7 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f7.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 7 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f7.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 7 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f8.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 8 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f8.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 8 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f8.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 8 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f9.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 9 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f9.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 9 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f9.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 9 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f10.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 10 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f10.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 10 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f10.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 10 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f11.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 11 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f11.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 11 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f11.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 11 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f12.png | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 12 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f12.avif | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 12 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-f12.webp | 3 / packs | object | 1024x1024 | Sí | Suelo 50%,90.82%; frame 12 de 12; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-tira.png | 3 / packs | object | 12288x1024 | Sí | 12 celdas 1024x1024; suelo 50%,90.82%; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-tira.avif | 3 / packs | object | 12288x1024 | Sí | 12 celdas 1024x1024; suelo 50%,90.82%; 10 fps; ping-pong | Entregado técnico |
| 70-mayo-packs-tira.webp | 3 / packs | object | 12288x1024 | Sí | 12 celdas 1024x1024; suelo 50%,90.82%; 10 fps; ping-pong | Entregado técnico |

Formatos PNG8-bit, AVIF85 y WebP82 con pérdida y alpha100. Verificación: dimensiones y alpha de los 39 archivos, orden numérico y revisión de la grilla sobre fondo oscuro; sombra sin recorte al borde inferior. QA local: %TEMP%/mayo-packs-processing/qa-grid.png. Reproducción montada pendiente del coordinador.

## Hero ampliado a 12 frames (sustituye la entrega de seis)

El coordinador confirma conservar la pose sentada aprobada e ignorar los keyframes nuevos de pie. Los seis originales no se repintan ni recodifican: se reubican como f1, f3, f5, f7, f9 y f11, conservando sus bytes en cada formato. Después de cada original se inserta un intermedio generado con ambas pinturas vecinas, el f1 original como referencia fija de identidad y la placa de amanecer. El último intermedio toma los originales 6 y 1 como vecinos; la reproducción sigue siendo ping-pong.

Se reemplazan los nombres hero en el mismo directorio. Celdas 1024x1024, tira 12288x1024, 12 frames, 10 fps sugeridos. Se mantiene el ancla existente 50%,94.7%; los nuevos recortes quedan alineados con las patas de los originales (borde alpha>50% y972; los originales varían ±1 px y se preservan). Magenta descontaminado, sombra incluida, sin escalado individual. Persisten pequeñas variaciones generativas de mirada y pelo; no se declara interpolación geométrica exacta.

| Archivo | Isla / slot | Rol | Tamaño px | Alpha | Ancla / celdas / fps | Estado |
|---|---|---|---|---|---|---|
| 70-mayo-hero-f1.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 1 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f1.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 1 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f1.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 1 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f2.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 2 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f2.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 2 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f2.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 2 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f3.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 3 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f3.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 3 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f3.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 3 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f4.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 4 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f4.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 4 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f4.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 4 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f5.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 5 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f5.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 5 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f5.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 5 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f6.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 6 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f6.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 6 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f6.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 6 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f7.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 7 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f7.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 7 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f7.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 7 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f8.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 8 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f8.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 8 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f8.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 8 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f9.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 9 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f9.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 9 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f9.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 9 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f10.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 10 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f10.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 10 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f10.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 10 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f11.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 11 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f11.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 11 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f11.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 11 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f12.png | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 12 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f12.avif | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 12 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-f12.webp | 1 / hero | object | 1024x1024 | Sí | 50%,94.7%; frame 12 de 12; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-tira.png | 1 / hero | object | 12288x1024 | Sí | 12 celdas 1024x1024; 50%,94.7%; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-tira.avif | 1 / hero | object | 12288x1024 | Sí | 12 celdas 1024x1024; 50%,94.7%; 10 fps; ping-pong | Ampliación entregada |
| 70-mayo-hero-tira.webp | 1 / hero | object | 12288x1024 | Sí | 12 celdas 1024x1024; 50%,94.7%; 10 fps; ping-pong | Ampliación entregada |

Verificación: hash de los 18 archivos originales preservado en las posiciones impares; dimensiones y alpha de los 39 archivos; comparación al 50% de cada nuevo intermedio con su vecino anterior y grilla sobre fondo oscuro. QA local: %TEMP%/mayo-hero12-processing/qa-grid.png. Reproducción de la ampliación en la landing pendiente del coordinador.

## Parallax: isla 3 base

Recorte sobre el lienzo original, sin mover ni escalar la isla. Matte local BiRefNet, refinado en la banda de dos píxeles contra el color interior cercano y el cielo reconstruido para quitar contaminación azul en las raíces. Fondo reconstruido a partir de la placa mediante inpainting; conserva las nubes periféricas y la isla lejana, excluida del recorte. RGB original exacto en el interior opaco.

Diferencia RGB normalizada ponderada por alpha: media 0.0000377214, máximo 0.2383391 en la banda de borde; máximo interior opaco 0. Bbox alpha>0: x190,y409,right1452,bottom908 (11.36%,43.46%,86.84%,96.49%). Composición y recorte inspeccionados sobre cielo y azul oscuro; sin costura visible a escala de inspección, sin validación de desplazamiento en navegador por este agente. AVIF calidad 85, WebP con pérdida calidad 82 y alpha-quality 100.

[Composición de control](../../public/images/mundo-mayo/10-isla3-base-composite-check.png).

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 10-isla3-base-isla.png | 3 | island-cutout | 1672x941 | Sí | bbox 11.36%,43.46%,86.84%,96.49% | Entregado |
| 10-isla3-base-isla.avif | 3 | island-cutout | 1672x941 | Sí | bbox 11.36%,43.46%,86.84%,96.49% | Entregado |
| 10-isla3-base-isla.webp | 3 | island-cutout | 1672x941 | Sí | bbox 11.36%,43.46%,86.84%,96.49% | Entregado |
| 10-isla3-base-fondo.png | 3 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 10-isla3-base-fondo.avif | 3 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 10-isla3-base-fondo.webp | 3 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 10-isla3-base-composite-check.png | 3 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |
| 10-isla3-base-composite-check.avif | 3 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |
| 10-isla3-base-composite-check.webp | 3 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |


## Parallax: 40-isla4-escritorio

Matte local BiRefNet con refinado cromático del borde. Inpainting local del cielo liso mediante ajuste polinómico bidimensional sobre píxeles exteriores; mezcla en una banda de cielo limpia, sin generar arte nuevo. RGB original exacto en el interior opaco. Sin desplazamiento ni escalado del recorte.

Diferencia RGB normalizada ponderada por alpha: media 2.49453708913235E-05, máximo 0.161384083044983 en bordes; máximo interior opaco 0. Bbox (left,top,right,bottom): 20,22%,51,33%,78,59%,93,73%. QA visual sobre cielo y azul oscuro; sin costura visible a escala de inspección. No se ejecutó prueba de parallax en navegador por este agente. AVIF calidad 85, WebP con pérdida calidad 82 y alpha-quality 100. Dimensiones y alpha verificados en los nueve archivos.

[Composición de control](../../public/images/mundo-mayo/40-isla4-escritorio-composite-check.png).

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 40-isla4-escritorio-isla.png | 4 | island-cutout | 1672x941 | Sí | bbox 20,22%,51,33%,78,59%,93,73% | Entregado |
| 40-isla4-escritorio-isla.avif | 4 | island-cutout | 1672x941 | Sí | bbox 20,22%,51,33%,78,59%,93,73% | Entregado |
| 40-isla4-escritorio-isla.webp | 4 | island-cutout | 1672x941 | Sí | bbox 20,22%,51,33%,78,59%,93,73% | Entregado |
| 40-isla4-escritorio-fondo.png | 4 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 40-isla4-escritorio-fondo.avif | 4 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 40-isla4-escritorio-fondo.webp | 4 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 40-isla4-escritorio-composite-check.png | 4 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |
| 40-isla4-escritorio-composite-check.avif | 4 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |
| 40-isla4-escritorio-composite-check.webp | 4 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |


## Parallax: 40-isla4-celular

Matte local BiRefNet con refinado cromático del borde. Inpainting local del cielo liso mediante ajuste polinómico bidimensional sobre píxeles exteriores; mezcla en una banda de cielo limpia, sin generar arte nuevo. RGB original exacto en el interior opaco. Sin desplazamiento ni escalado del recorte.

Diferencia RGB normalizada ponderada por alpha: media 2.97718065084879E-05, máximo 0.179284890426759 en bordes; máximo interior opaco 0. Bbox (left,top,right,bottom): 13,66%,69,53%,87,15%,87,24%. QA visual sobre cielo y azul oscuro; sin costura visible a escala de inspección. No se ejecutó prueba de parallax en navegador por este agente. AVIF calidad 85, WebP con pérdida calidad 82 y alpha-quality 100. Dimensiones y alpha verificados en los nueve archivos.

[Composición de control](../../public/images/mundo-mayo/40-isla4-celular-composite-check.png).

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 40-isla4-celular-isla.png | 4 | island-cutout | 864x1536 | Sí | bbox 13,66%,69,53%,87,15%,87,24% | Entregado |
| 40-isla4-celular-isla.avif | 4 | island-cutout | 864x1536 | Sí | bbox 13,66%,69,53%,87,15%,87,24% | Entregado |
| 40-isla4-celular-isla.webp | 4 | island-cutout | 864x1536 | Sí | bbox 13,66%,69,53%,87,15%,87,24% | Entregado |
| 40-isla4-celular-fondo.png | 4 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 40-isla4-celular-fondo.avif | 4 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 40-isla4-celular-fondo.webp | 4 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 40-isla4-celular-composite-check.png | 4 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |
| 40-isla4-celular-composite-check.avif | 4 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |
| 40-isla4-celular-composite-check.webp | 4 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |


## Parallax: 45-isla5-escritorio

Matte local BiRefNet, refinado cromático de la banda de borde y descontaminación contra el fondo. Fondo inpainted con la placa como referencia, conservando el cielo y las nubes laterales. RGB original exacto en el interior opaco. Sin desplazamiento ni escalado del recorte.

Diferencia RGB normalizada ponderada por alpha: media 2.19514747065157E-05, máximo 0.159354094579008 en bordes; máximo interior opaco 0. Bbox (left,top,right,bottom): 24,10%,45,48%,72,85%,92,24%. QA visual sobre cielo y azul oscuro; sin costura visible a escala de inspección. No se ejecutó prueba de parallax en navegador por este agente. AVIF calidad 85, WebP con pérdida calidad 82 y alpha-quality 100. Dimensiones y alpha verificados en los nueve archivos.

[Composición de control](../../public/images/mundo-mayo/45-isla5-escritorio-composite-check.png).

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 45-isla5-escritorio-isla.png | 5 | island-cutout | 1672x941 | Sí | bbox 24,10%,45,48%,72,85%,92,24% | Entregado |
| 45-isla5-escritorio-isla.avif | 5 | island-cutout | 1672x941 | Sí | bbox 24,10%,45,48%,72,85%,92,24% | Entregado |
| 45-isla5-escritorio-isla.webp | 5 | island-cutout | 1672x941 | Sí | bbox 24,10%,45,48%,72,85%,92,24% | Entregado |
| 45-isla5-escritorio-fondo.png | 5 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 45-isla5-escritorio-fondo.avif | 5 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 45-isla5-escritorio-fondo.webp | 5 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 45-isla5-escritorio-composite-check.png | 5 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |
| 45-isla5-escritorio-composite-check.avif | 5 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |
| 45-isla5-escritorio-composite-check.webp | 5 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |


## Parallax: 45-isla5-celular

Matte local BiRefNet, refinado cromático de la banda de borde y descontaminación contra el fondo. Fondo inpainted con la placa como referencia, conservando el cielo y las nubes laterales. RGB original exacto en el interior opaco. Sin desplazamiento ni escalado del recorte.

Diferencia RGB normalizada ponderada por alpha: media 3.20507298533787E-05, máximo 0.132317882934553 en bordes; máximo interior opaco 0. Bbox (left,top,right,bottom): 7,41%,60,16%,92,48%,94,14%. QA visual sobre cielo y azul oscuro; sin costura visible a escala de inspección. No se ejecutó prueba de parallax en navegador por este agente. AVIF calidad 85, WebP con pérdida calidad 82 y alpha-quality 100. Dimensiones y alpha verificados en los nueve archivos.

[Composición de control](../../public/images/mundo-mayo/45-isla5-celular-composite-check.png).

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 45-isla5-celular-isla.png | 5 | island-cutout | 864x1536 | Sí | bbox 7,41%,60,16%,92,48%,94,14% | Entregado |
| 45-isla5-celular-isla.avif | 5 | island-cutout | 864x1536 | Sí | bbox 7,41%,60,16%,92,48%,94,14% | Entregado |
| 45-isla5-celular-isla.webp | 5 | island-cutout | 864x1536 | Sí | bbox 7,41%,60,16%,92,48%,94,14% | Entregado |
| 45-isla5-celular-fondo.png | 5 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 45-isla5-celular-fondo.avif | 5 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 45-isla5-celular-fondo.webp | 5 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 45-isla5-celular-composite-check.png | 5 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |
| 45-isla5-celular-composite-check.avif | 5 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |
| 45-isla5-celular-composite-check.webp | 5 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |


## Parallax: 50-isla6-escritorio

Matte local BiRefNet con refinado cromático del borde. Fondo inpainted con referencia original y corrección armónica de color para conservar el cielo exterior exacto y eliminar el cambio tonal de la generación. RGB original exacto en el interior opaco. Sin desplazamiento ni escalado del recorte.

Diferencia RGB normalizada ponderada por alpha: media 2.74343084779876E-05, máximo 0.212272202998847 en bordes; máximo interior opaco 0. Bbox (left,top,right,bottom): 21,29%,30,18%,77,21%,94,26%. QA visual sobre cielo y azul oscuro; sin costura visible a escala de inspección. No se ejecutó prueba de parallax en navegador por este agente. AVIF calidad 85, WebP con pérdida calidad 82 y alpha-quality 100. Dimensiones y alpha verificados en los nueve archivos.

[Composición de control](../../public/images/mundo-mayo/50-isla6-escritorio-composite-check.png).

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 50-isla6-escritorio-isla.png | 6 | island-cutout | 1672x941 | Sí | bbox 21,29%,30,18%,77,21%,94,26% | Entregado |
| 50-isla6-escritorio-isla.avif | 6 | island-cutout | 1672x941 | Sí | bbox 21,29%,30,18%,77,21%,94,26% | Entregado |
| 50-isla6-escritorio-isla.webp | 6 | island-cutout | 1672x941 | Sí | bbox 21,29%,30,18%,77,21%,94,26% | Entregado |
| 50-isla6-escritorio-fondo.png | 6 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 50-isla6-escritorio-fondo.avif | 6 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 50-isla6-escritorio-fondo.webp | 6 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 50-isla6-escritorio-composite-check.png | 6 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |
| 50-isla6-escritorio-composite-check.avif | 6 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |
| 50-isla6-escritorio-composite-check.webp | 6 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |


## Parallax: 50-isla6-celular

Matte local BiRefNet con recuperación cromática de una porción de roca y vegetación izquierda omitida por el modelo, más refinado del borde. Fondo inpainted con corrección armónica de color que conserva el cielo exterior original. RGB original exacto en el interior opaco. Sin desplazamiento ni escalado del recorte.

Diferencia RGB normalizada ponderada por alpha: media 2.44455577973357E-05, máximo 0.183437139561707 en bordes; máximo interior opaco 0. Bbox (left,top,right,bottom): 7,18%,59,31%,92,48%,91,47%. QA visual sobre cielo y azul oscuro; sin costura visible a escala de inspección. No se ejecutó prueba de parallax en navegador por este agente. AVIF calidad 85, WebP con pérdida calidad 82 y alpha-quality 100. Dimensiones y alpha verificados en los nueve archivos.

[Composición de control](../../public/images/mundo-mayo/50-isla6-celular-composite-check.png).

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 50-isla6-celular-isla.png | 6 | island-cutout | 864x1536 | Sí | bbox 7,18%,59,31%,92,48%,91,47% | Entregado |
| 50-isla6-celular-isla.avif | 6 | island-cutout | 864x1536 | Sí | bbox 7,18%,59,31%,92,48%,91,47% | Entregado |
| 50-isla6-celular-isla.webp | 6 | island-cutout | 864x1536 | Sí | bbox 7,18%,59,31%,92,48%,91,47% | Entregado |
| 50-isla6-celular-fondo.png | 6 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 50-isla6-celular-fondo.avif | 6 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 50-isla6-celular-fondo.webp | 6 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 50-isla6-celular-composite-check.png | 6 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |
| 50-isla6-celular-composite-check.avif | 6 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |
| 50-isla6-celular-composite-check.webp | 6 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |


## Parallax: 55-isla7-escritorio

Matte local BiRefNet con refinado cromático del borde. Fondo inpainted y corrección armónica que conserva el cielo exterior original; estrellas reconstruidas donde estaba la isla. RGB original exacto en el interior opaco. Sin desplazamiento ni escalado del recorte.

Diferencia RGB normalizada ponderada por alpha: media 1.07348454471281E-05, máximo 0.249534794309881 en bordes; máximo interior opaco 0. Bbox (left,top,right,bottom): 29,19%,19,13%,67,94%,79,38%. QA visual sobre cielo y azul oscuro; sin costura visible a escala de inspección. No se ejecutó prueba de parallax en navegador por este agente. AVIF calidad 85, WebP con pérdida calidad 82 y alpha-quality 100. Dimensiones y alpha verificados en los nueve archivos.

[Composición de control](../../public/images/mundo-mayo/55-isla7-escritorio-composite-check.png).

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 55-isla7-escritorio-isla.png | 7 | island-cutout | 1672x941 | Sí | bbox 29,19%,19,13%,67,94%,79,38% | Entregado |
| 55-isla7-escritorio-isla.avif | 7 | island-cutout | 1672x941 | Sí | bbox 29,19%,19,13%,67,94%,79,38% | Entregado |
| 55-isla7-escritorio-isla.webp | 7 | island-cutout | 1672x941 | Sí | bbox 29,19%,19,13%,67,94%,79,38% | Entregado |
| 55-isla7-escritorio-fondo.png | 7 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 55-isla7-escritorio-fondo.avif | 7 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 55-isla7-escritorio-fondo.webp | 7 | background | 1672x941 | No | Lienzo 1:1 | Entregado |
| 55-isla7-escritorio-composite-check.png | 7 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |
| 55-isla7-escritorio-composite-check.avif | 7 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |
| 55-isla7-escritorio-composite-check.webp | 7 | plate (QA) | 1672x941 | No | Lienzo 1:1 | Entregado |


## Parallax: 55-isla7-celular

Matte local BiRefNet con refinado cromático del borde. Fondo inpainted y corrección armónica que conserva el cielo exterior original; estrellas reconstruidas donde estaba la isla. RGB original exacto en el interior opaco. Sin desplazamiento ni escalado del recorte.

Diferencia RGB normalizada ponderada por alpha: media 1.4660171286178E-05, máximo 0.232710495963091 en bordes; máximo interior opaco 0. Bbox (left,top,right,bottom): 9,49%,53,71%,89,35%,93,75%. QA visual sobre cielo y azul oscuro; sin costura visible a escala de inspección. No se ejecutó prueba de parallax en navegador por este agente. AVIF calidad 85, WebP con pérdida calidad 82 y alpha-quality 100. Dimensiones y alpha verificados en los nueve archivos.

[Composición de control](../../public/images/mundo-mayo/55-isla7-celular-composite-check.png).

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 55-isla7-celular-isla.png | 7 | island-cutout | 864x1536 | Sí | bbox 9,49%,53,71%,89,35%,93,75% | Entregado |
| 55-isla7-celular-isla.avif | 7 | island-cutout | 864x1536 | Sí | bbox 9,49%,53,71%,89,35%,93,75% | Entregado |
| 55-isla7-celular-isla.webp | 7 | island-cutout | 864x1536 | Sí | bbox 9,49%,53,71%,89,35%,93,75% | Entregado |
| 55-isla7-celular-fondo.png | 7 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 55-isla7-celular-fondo.avif | 7 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 55-isla7-celular-fondo.webp | 7 | background | 864x1536 | No | Lienzo 1:1 | Entregado |
| 55-isla7-celular-composite-check.png | 7 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |
| 55-isla7-celular-composite-check.avif | 7 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |
| 55-isla7-celular-composite-check.webp | 7 | plate (QA) | 864x1536 | No | Lienzo 1:1 | Entregado |

## Lote C: primera vista previa pendiente de revisión

Primeros tres frames 16:9 generados en Desktop/MayofyMundo: `60-nubes-01.png`, `60-nubes-02.png`, `60-nubes-03.png`; montaje `qa-cloud-first-three.png` (orden vertical 01,02,03). No se publican aún como assets finales: revisión del coordinador pendiente antes de ampliar la secuencia.

Cada continuación adjunta el frame anterior y la referencia de estilo00. El primer frame incluyó los cielos03/31 como extremos cromáticos; repetir ambos cielos en el segundo prompt provocó una composición nueva de nubes dispersas, rechazada (`60-nubes-02-layout-rejected.png`). La sustitución mantiene los bancos de nubes del primer plano. La progresión generativa conserva la composición general, pero no garantiza desplazamiento geométrico exacto; revisar especialmente la lectura de caída. Pendientes: frames04–10, secuencia9:16, cuatro nubes sueltas y optimización/registro definitivo.


## Lote C: secuencia de escritorio, diez frames

El coordinador aprobó continuidad y estilo de los tres primeros frames. Desde el cuarto se aplicó el descenso solicitado: bancos crecen y ascienden, entrada en la capa en 07 y salida bajo ella en 09–10, sin horizonte. Luz rosa/dorada hasta 05 y transición azul desde 06 con referencia 31-isla2-cielo. Cada frame adjunta el anterior y estilo00. La generación no garantiza desplazamiento geométrico exacto de 8–10%; la lectura visual del lote requiere revisión del coordinador.

PNG 8 bits, AVIF calidad 85, WebP con pérdida calidad 82. Lienzos normalizados a 1672x941 (algunas fuentes tenían 1671 px de ancho). Verificadas dimensiones y opacidad de los 30 archivos. Vista previa: Desktop/MayofyMundo/qa-cloud-desktop-ten.png, filas 01–02,03–04,05–06,07–08,09–10. El primer intento de 08 falló sin imagen; un reintento produjo el frame entregado. Pendientes: secuencia móvil y cuatro nubes sueltas.

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 60-nubes-01.png | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 1/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-01.avif | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 1/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-01.webp | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 1/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-02.png | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 2/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-02.avif | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 2/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-02.webp | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 2/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-03.png | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 3/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-03.avif | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 3/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-03.webp | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 3/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-04.png | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 4/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-04.avif | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 4/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-04.webp | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 4/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-05.png | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 5/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-05.avif | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 5/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-05.webp | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 5/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-06.png | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 6/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-06.avif | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 6/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-06.webp | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 6/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-07.png | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 7/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-07.avif | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 7/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-07.webp | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 7/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-08.png | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 8/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-08.avif | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 8/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-08.webp | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 8/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-09.png | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 9/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-09.avif | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 9/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-09.webp | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 9/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-10.png | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 10/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-10.avif | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 10/10 | Entregado; revisión visual del lote pendiente |
| 60-nubes-10.webp | 1→2 | cloud frame | 1672x941 | No | Centro 50%,50%; frame 10/10 | Entregado; revisión visual del lote pendiente |

Corrección solicitada por el coordinador: 06 regenerado entre 05 y 07, conserva el horizonte rosa-dorado y enfría solo las sombras; 07 conserva la inmersión sin horizonte con reflejos melocotón más cálidos. El primer 06 se rechazó por salto cromático brusco. Grid actualizado en la misma ruta. Aceptación de esta corrección pendiente.


## Lote C: secuencia móvil, diez frames

Diez composiciones 9:16 nuevas, encadenadas con frame anterior y estilo00; desde 06 también cielo31. Se conserva rosa-dorado en 06, transición lavanda en 07 y azul en 08; salida bajo el banco en 09–10. No son recortes del escritorio. PNG 8 bits, AVIF85, WebP82 con pérdida. Verificados tamaño 864x1536 y opacidad de los 30 archivos. Grid Desktop/MayofyMundo/qa-cloud-mobile-ten.png: primera fila 01–05, segunda 06–10. La progresión geométrica es visual, no una simulación exacta. Revisión del coordinador pendiente; faltan cuatro nubes sueltas.

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 61-nubes-cel-01.png | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 1/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-01.avif | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 1/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-01.webp | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 1/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-02.png | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 2/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-02.avif | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 2/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-02.webp | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 2/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-03.png | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 3/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-03.avif | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 3/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-03.webp | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 3/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-04.png | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 4/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-04.avif | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 4/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-04.webp | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 4/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-05.png | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 5/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-05.avif | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 5/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-05.webp | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 5/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-06.png | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 6/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-06.avif | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 6/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-06.webp | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 6/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-07.png | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 7/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-07.avif | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 7/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-07.webp | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 7/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-08.png | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 8/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-08.avif | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 8/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-08.webp | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 8/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-09.png | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 9/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-09.avif | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 9/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-09.webp | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 9/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-10.png | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 10/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-10.avif | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 10/10 | Entregado; revisión visual pendiente |
| 61-nubes-cel-10.webp | 1→2 | cloud frame | 864x1536 | No | Centro 50%,50%; frame 10/10 | Entregado; revisión visual pendiente |


## Lote C: cuatro nubes sueltas

Cuatro siluetas nuevas: compacta, ancha, irregular y alta. Fondo magenta retirado mediante matte cromático y descontaminación contra el color de fondo; margen recortado y lado mayor limitado a 1024 px. QA sobre azul oscuro: Desktop/MayofyMundo/qa-cloud-puffs.png. AVIF85 y WebP82 con alpha100; alpha comprobado en los doce archivos. Sin sombras de contacto: son nubes suspendidas.

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 62-nube-suelta-1.png | 1→2 | object | 812x471 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |
| 62-nube-suelta-1.avif | 1→2 | object | 812x471 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |
| 62-nube-suelta-1.webp | 1→2 | object | 812x471 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |
| 62-nube-suelta-2.png | 1→2 | object | 1024x725 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |
| 62-nube-suelta-2.avif | 1→2 | object | 1024x725 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |
| 62-nube-suelta-2.webp | 1→2 | object | 1024x725 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |
| 62-nube-suelta-3.png | 1→2 | object | 1024x813 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |
| 62-nube-suelta-3.avif | 1→2 | object | 1024x813 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |
| 62-nube-suelta-3.webp | 1→2 | object | 1024x813 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |
| 62-nube-suelta-4.png | 1→2 | object | 1024x915 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |
| 62-nube-suelta-4.avif | 1→2 | object | 1024x915 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |
| 62-nube-suelta-4.webp | 1→2 | object | 1024x915 | Sí | Centro 50%,50% | Entregado; aceptación visual pendiente |


## Auditoría de cobertura final

Comprobación estructural: 199 PNG, 597 archivos de imagen abiertos y dimensiones comparadas por familia; 8 PNG de sombras de contacto. Faltantes de formato: ninguno. Incidencias: ninguna. WebP comprobados como codificación con pérdida. Las tiras70 mantienen el ancho autorizado de12 celdas y no se someten al límite de una placa.

La revisión visual y de drift en la landing corresponde al coordinador; esta auditoría no repite esas pruebas ni constituye aceptación de Juani. Nubes sueltas aceptadas por el coordinador. Única entrega bloqueada conocida: parallax del hero móvil02, por matte contaminado; se conserva la placa original. Sin cambios en raw/, src/, dependencias, push ni deploy.

### Formatos derivados de A/B: filas complementarias

| Archivo | Isla | Rol | Tamaño px | Alpha | Ancla / bbox | Estado |
|---|---|---|---|---|---|---|
| 00-referencia-estilo.avif | 1 | plate | 1672x941 | No | No aplica | Entregado |
| 00-referencia-estilo.webp | 1 | plate | 1672x941 | No | No aplica | Entregado |
| 01-hero-escritorio-composite-check.avif | 1 | plate | 1672x941 | No | QA, no montar | Entregado |
| 01-hero-escritorio-composite-check.webp | 1 | plate | 1672x941 | No | QA, no montar | Entregado |
| 01-hero-escritorio.avif | 1 | plate | 1672x941 | No | No aplica | Entregado |
| 01-hero-escritorio.webp | 1 | plate | 1672x941 | No | No aplica | Entregado |
| 02-hero-celular.avif | 1 | plate | 864x1536 | No | No aplica | Entregado |
| 02-hero-celular.webp | 1 | plate | 864x1536 | No | No aplica | Entregado |
| 03-hero-cielo.avif | 1 | sky | 1672x941 | No | No aplica | Entregado |
| 03-hero-cielo.webp | 1 | sky | 1672x941 | No | No aplica | Entregado |
| 04-hero-primer-plano.avif | 1 | foreground | 703x435 | Sí | 50% / 99% (sugerida) | Entregado |
| 04-hero-primer-plano.webp | 1 | foreground | 703x435 | Sí | 50% / 99% (sugerida) | Entregado |
| 05-mayo-provisoria.avif | 1 | mayo-provisional | 912x1024 | Sí | 50% / 99% (sugerida) | Entregado |
| 05-mayo-provisoria.webp | 1 | mayo-provisional | 912x1024 | Sí | 50% / 99% (sugerida) | Entregado |
| 10-isla3-base.avif | 3 | plate | 1672x941 | No | No aplica | Entregado |
| 10-isla3-base.webp | 3 | plate | 1672x941 | No | No aplica | Entregado |
| 11-plataforma-1.avif | 3 | object | 1024x671 | Sí | 50% / 99% (sugerida) | Entregado |
| 11-plataforma-1.webp | 3 | object | 1024x671 | Sí | 50% / 99% (sugerida) | Entregado |
| 12-plataforma-2.avif | 3 | object | 625x956 | Sí | 50% / 99% (sugerida) | Entregado |
| 12-plataforma-2.webp | 3 | object | 625x956 | Sí | 50% / 99% (sugerida) | Entregado |
| 13-plataforma-3.avif | 3 | object | 742x1013 | Sí | 50% / 99% (sugerida) | Entregado |
| 13-plataforma-3.webp | 3 | object | 742x1013 | Sí | 50% / 99% (sugerida) | Entregado |
| 14-p1-base.avif | 3 | object | 1024x500 | Sí | 50% / 99% (sugerida) | Entregado |
| 14-p1-base.webp | 3 | object | 1024x500 | Sí | 50% / 99% (sugerida) | Entregado |
| 14-p1-der.avif | 3 | object | 736x938 | Sí | 50% / 99% (sugerida) | Entregado |
| 14-p1-der.webp | 3 | object | 736x938 | Sí | 50% / 99% (sugerida) | Entregado |
| 14-p1-izq.avif | 3 | object | 962x659 | Sí | 50% / 99% (sugerida) | Entregado |
| 14-p1-izq.webp | 3 | object | 962x659 | Sí | 50% / 99% (sugerida) | Entregado |
| 14-p1-shadow-izq.avif | 3 | shadow | 262x261 | Sí | Ver contact-shadows.json | Entregado |
| 14-p1-shadow-izq.webp | 3 | shadow | 262x261 | Sí | Ver contact-shadows.json | Entregado |
| 14-p1-shadow-tapa.avif | 3 | shadow | 442x192 | Sí | Ver contact-shadows.json | Entregado |
| 14-p1-shadow-tapa.webp | 3 | shadow | 442x192 | Sí | Ver contact-shadows.json | Entregado |
| 14-p1-tapa.avif | 3 | object | 980x670 | Sí | 50% / 99% (sugerida) | Entregado |
| 14-p1-tapa.webp | 3 | object | 980x670 | Sí | 50% / 99% (sugerida) | Entregado |
| 15-p2-base.avif | 3 | object | 958x623 | Sí | 50% / 99% (sugerida) | Entregado |
| 15-p2-base.webp | 3 | object | 958x623 | Sí | 50% / 99% (sugerida) | Entregado |
| 15-p2-der.avif | 3 | object | 602x951 | Sí | 50% / 99% (sugerida) | Entregado |
| 15-p2-der.webp | 3 | object | 602x951 | Sí | 50% / 99% (sugerida) | Entregado |
| 15-p2-izq.avif | 3 | object | 614x872 | Sí | 50% / 99% (sugerida) | Entregado |
| 15-p2-izq.webp | 3 | object | 614x872 | Sí | 50% / 99% (sugerida) | Entregado |
| 15-p2-shadow-der.avif | 3 | shadow | 295x153 | Sí | Ver contact-shadows.json | Entregado |
| 15-p2-shadow-der.webp | 3 | shadow | 295x153 | Sí | Ver contact-shadows.json | Entregado |
| 15-p2-shadow-izq.avif | 3 | shadow | 315x455 | Sí | Ver contact-shadows.json | Entregado |
| 15-p2-shadow-izq.webp | 3 | shadow | 315x455 | Sí | Ver contact-shadows.json | Entregado |
| 15-p2-shadow-tapa.avif | 3 | shadow | 412x203 | Sí | Ver contact-shadows.json | Entregado |
| 15-p2-shadow-tapa.webp | 3 | shadow | 412x203 | Sí | Ver contact-shadows.json | Entregado |
| 15-p2-tapa.avif | 3 | object | 900x608 | Sí | 50% / 99% (sugerida) | Entregado |
| 15-p2-tapa.webp | 3 | object | 900x608 | Sí | 50% / 99% (sugerida) | Entregado |
| 16-p3-base.avif | 3 | object | 952x597 | Sí | 50% / 99% (sugerida) | Entregado |
| 16-p3-base.webp | 3 | object | 952x597 | Sí | 50% / 99% (sugerida) | Entregado |
| 16-p3-der.avif | 3 | object | 550x903 | Sí | 50% / 99% (sugerida) | Entregado |
| 16-p3-der.webp | 3 | object | 550x903 | Sí | 50% / 99% (sugerida) | Entregado |
| 16-p3-izq.avif | 3 | object | 617x853 | Sí | 50% / 99% (sugerida) | Entregado |
| 16-p3-izq.webp | 3 | object | 617x853 | Sí | 50% / 99% (sugerida) | Entregado |
| 16-p3-shadow-der.avif | 3 | shadow | 334x221 | Sí | Ver contact-shadows.json | Entregado |
| 16-p3-shadow-der.webp | 3 | shadow | 334x221 | Sí | Ver contact-shadows.json | Entregado |
| 16-p3-shadow-izq.avif | 3 | shadow | 369x482 | Sí | Ver contact-shadows.json | Entregado |
| 16-p3-shadow-izq.webp | 3 | shadow | 369x482 | Sí | Ver contact-shadows.json | Entregado |
| 16-p3-shadow-tapa.avif | 3 | shadow | 397x155 | Sí | Ver contact-shadows.json | Entregado |
| 16-p3-shadow-tapa.webp | 3 | shadow | 397x155 | Sí | Ver contact-shadows.json | Entregado |
| 16-p3-tapa.avif | 3 | object | 908x699 | Sí | 50% / 99% (sugerida) | Entregado |
| 16-p3-tapa.webp | 3 | object | 908x699 | Sí | 50% / 99% (sugerida) | Entregado |
| 20-roca-suelta-1.avif | 3 | object | 861x699 | Sí | 50% / 99% (sugerida) | Entregado |
| 20-roca-suelta-1.webp | 3 | object | 861x699 | Sí | 50% / 99% (sugerida) | Entregado |
| 20-roca-suelta-2.avif | 3 | object | 997x376 | Sí | 50% / 99% (sugerida) | Entregado |
| 20-roca-suelta-2.webp | 3 | object | 997x376 | Sí | 50% / 99% (sugerida) | Entregado |
| 20-roca-suelta-3.avif | 3 | object | 995x388 | Sí | 50% / 99% (sugerida) | Entregado |
| 20-roca-suelta-3.webp | 3 | object | 995x388 | Sí | 50% / 99% (sugerida) | Entregado |
| 20-roca-suelta-4.avif | 3 | object | 923x731 | Sí | 50% / 99% (sugerida) | Entregado |
| 20-roca-suelta-4.webp | 3 | object | 923x731 | Sí | 50% / 99% (sugerida) | Entregado |
| 30-isla2-celular-composite-check.avif | 2 | plate | 864x1536 | No | QA, no montar | Entregado |
| 30-isla2-celular-composite-check.webp | 2 | plate | 864x1536 | No | QA, no montar | Entregado |
| 30-isla2-celular.avif | 2 | plate | 864x1536 | No | No aplica | Entregado |
| 30-isla2-celular.webp | 2 | plate | 864x1536 | No | No aplica | Entregado |
| 30-isla2-escritorio-composite-check.avif | 2 | plate | 1672x941 | No | QA, no montar | Entregado |
| 30-isla2-escritorio-composite-check.webp | 2 | plate | 1672x941 | No | QA, no montar | Entregado |
| 30-isla2-escritorio.avif | 2 | plate | 1672x941 | No | No aplica | Entregado |
| 30-isla2-escritorio.webp | 2 | plate | 1672x941 | No | No aplica | Entregado |
| 31-isla2-cielo.avif | 2 | sky | 1672x941 | No | No aplica | Entregado |
| 31-isla2-cielo.webp | 2 | sky | 1672x941 | No | No aplica | Entregado |
| 32-isla2-primer-plano.avif | 2 | foreground | 852x499 | Sí | 50% / 99% sugerida | Entregado |
| 32-isla2-primer-plano.webp | 2 | foreground | 852x499 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-01.avif | 2 | object | 916x780 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-01.webp | 2 | object | 916x780 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-02.avif | 2 | object | 1024x486 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-02.webp | 2 | object | 1024x486 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-03.avif | 2 | object | 994x464 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-03.webp | 2 | object | 994x464 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-04.avif | 2 | object | 911x711 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-04.webp | 2 | object | 911x711 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-05.avif | 2 | object | 943x633 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-05.webp | 2 | object | 943x633 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-06.avif | 2 | object | 1024x570 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-06.webp | 2 | object | 1024x570 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-07.avif | 2 | object | 926x503 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-07.webp | 2 | object | 926x503 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-08.avif | 2 | object | 672x961 | Sí | 50% / 99% sugerida | Entregado |
| 33-isla2-roca-08.webp | 2 | object | 672x961 | Sí | 50% / 99% sugerida | Entregado |
| 40-isla4-celular.avif | 4 | plate | 864x1536 | No | No aplica | Entregado |
| 40-isla4-celular.webp | 4 | plate | 864x1536 | No | No aplica | Entregado |
| 40-isla4-escritorio.avif | 4 | plate | 1672x941 | No | No aplica | Entregado |
| 40-isla4-escritorio.webp | 4 | plate | 1672x941 | No | No aplica | Entregado |
| 41-isla4-cielo.avif | 4 | sky | 1672x941 | No | No aplica | Entregado |
| 41-isla4-cielo.webp | 4 | sky | 1672x941 | No | No aplica | Entregado |
| 42-isla4-primer-plano.avif | 4 | foreground | 1024x556 | Sí | 50% / 99% sugerida | Entregado |
| 42-isla4-primer-plano.webp | 4 | foreground | 1024x556 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-caja.avif | 4 | object | 1024x684 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-caja.webp | 4 | object | 1024x684 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-engranaje.avif | 4 | object | 996x692 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-engranaje.webp | 4 | object | 996x692 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-invernadero.avif | 4 | object | 1024x807 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-invernadero.webp | 4 | object | 1024x807 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-maceta.avif | 4 | object | 863x700 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-maceta.webp | 4 | object | 863x700 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-tierra-01.avif | 4 | object | 1024x423 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-tierra-01.webp | 4 | object | 1024x423 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-tierra-02.avif | 4 | object | 1024x341 | Sí | 50% / 99% sugerida | Entregado |
| 43-isla4-tierra-02.webp | 4 | object | 1024x341 | Sí | 50% / 99% sugerida | Entregado |
| 45-isla5-celular.avif | 5 | plate | 864x1536 | No | No aplica | Entregado |
| 45-isla5-celular.webp | 5 | plate | 864x1536 | No | No aplica | Entregado |
| 45-isla5-escritorio.avif | 5 | plate | 1672x941 | No | No aplica | Entregado |
| 45-isla5-escritorio.webp | 5 | plate | 1672x941 | No | No aplica | Entregado |
| 46-isla5-cielo.avif | 5 | sky | 1672x941 | No | No aplica | Entregado |
| 46-isla5-cielo.webp | 5 | sky | 1672x941 | No | No aplica | Entregado |
| 47-isla5-primer-plano.avif | 5 | foreground | 1024x594 | Sí | 50% / 99% sugerida | Entregado |
| 47-isla5-primer-plano.webp | 5 | foreground | 1024x594 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-01.avif | 5 | object | 883x672 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-01.webp | 5 | object | 883x672 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-02.avif | 5 | object | 693x768 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-02.webp | 5 | object | 693x768 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-03.avif | 5 | object | 758x821 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-03.webp | 5 | object | 758x821 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-04.avif | 5 | object | 841x595 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-04.webp | 5 | object | 841x595 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-05.avif | 5 | object | 919x577 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-05.webp | 5 | object | 919x577 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-06.avif | 5 | object | 638x799 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-hito-06.webp | 5 | object | 638x799 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-01.avif | 5 | object | 1024x522 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-01.webp | 5 | object | 1024x522 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-02.avif | 5 | object | 983x532 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-02.webp | 5 | object | 983x532 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-03.avif | 5 | object | 1024x498 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-03.webp | 5 | object | 1024x498 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-04.avif | 5 | object | 1024x378 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-04.webp | 5 | object | 1024x378 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-05.avif | 5 | object | 992x614 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-05.webp | 5 | object | 992x614 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-06.avif | 5 | object | 1024x465 | Sí | 50% / 99% sugerida | Entregado |
| 48-isla5-paso-06.webp | 5 | object | 1024x465 | Sí | 50% / 99% sugerida | Entregado |
| 50-isla6-celular.avif | 6 | plate | 864x1536 | No | No aplica | Entregado |
| 50-isla6-celular.webp | 6 | plate | 864x1536 | No | No aplica | Entregado |
| 50-isla6-escritorio.avif | 6 | plate | 1672x941 | No | No aplica | Entregado |
| 50-isla6-escritorio.webp | 6 | plate | 1672x941 | No | No aplica | Entregado |
| 51-isla6-cielo.avif | 6 | sky | 1672x941 | No | No aplica | Entregado |
| 51-isla6-cielo.webp | 6 | sky | 1672x941 | No | No aplica | Entregado |
| 52-isla6-primer-plano.avif | 6 | foreground | 1024x480 | Sí | 50% / 99% sugerida | Entregado |
| 52-isla6-primer-plano.webp | 6 | foreground | 1024x480 | Sí | 50% / 99% sugerida | Entregado |
| 53-isla6-banco.avif | 6 | object | 1024x457 | Sí | 50% / 99% sugerida | Entregado |
| 53-isla6-banco.webp | 6 | object | 1024x457 | Sí | 50% / 99% sugerida | Entregado |
| 53-isla6-fogon.avif | 6 | object | 1024x1024 | Sí | 50% / 99% sugerida | Entregado |
| 53-isla6-fogon.webp | 6 | object | 1024x1024 | Sí | 50% / 99% sugerida | Entregado |

| 70-mayo-hoja-estilo.avif | Mayo | object (referencia) | 1536x1024 | No | No montar | Referencia aprobada |
| 70-mayo-hoja-estilo.webp | Mayo | object (referencia) | 1536x1024 | No | No montar | Referencia aprobada |

Los formatos añadidos para00,05 y70-hoja-estilo son referencias/históricos, no assets de montaje. Se completaron también los formatos de los tres composite-check antiguos. Las8 sombras conservan su geometría, offsets y orden de ensamblado aprobados.


## Isla 2 v2: rocas y flores integradas (19 de noviembre de 2026)

Juani aprobó la placa de escritorio con siete rocas y flores pequeñas blancas, amarillo suave y rosa/lila pálido. La placa móvil adapta ese tratamiento al encuadre vertical. Edición con `image_gen`, adjuntando cada placa como base; la placa de escritorio aprobada sirve de referencia para móvil. Sin Mayo. Las rocas tienen contacto con el pasto, oclusión y sombras de mañana. Se conservan despejados el labio frontal y el espacio futuro de Mayo.

La edición generativa se compuso únicamente dentro de máscaras suaves del prado. Diferencia RGB fuera de sus soportes: máximo 0 en ambas orientaciones; cielo exterior, borde y raíces originales se conservan píxel a píxel. Las siete rocas se protegieron al añadir las flores. Revisión de recortes al 100 % y superposiciones al 50 % antes del commit.

Parallax: se reutilizó la geometría del matte previo para las raíces, se amplió con inferencia local BiRefNet sobre las nuevas rocas y se refinó la banda de borde con color interior cercano y descontaminación contra cielo reconstruido. No se reutilizaron los fondos anteriores: su cielo presentaba diferencias visibles con las placas originales. Se reconstruyó el cielo oculto con ajuste polinómico bidimensional de grado 4, mezclado solo en la banda de 18 px alrededor de la isla; fuera de esa banda el cielo mantiene RGB exacto de la placa. RGB del recorte opaco idéntico a la placa v2. Sin traslación ni escalado del recorte. Composiciones y fondos oscuros revisados; no es validación de parallax en navegador.

Los objetos `33-isla2-roca-*` quedan sustituidos para la landing por la placa v2; se conservan todos sus archivos. No se modificó `src/`, dependencias ni originales. Sin build ni pruebas de aplicación: entrega pasiva de imágenes; integración y aceptación móvil corresponden al coordinador. PNG de 8 bits, AVIF calidad 85 y WebP con pérdida calidad 82, alpha-quality 100.

- escritorio: bbox alpha>0 (left,top,right,bottom) `[315, 482, 1350, 865]`; error RGB normalizado ponderado por alpha, media 0.000282936, máximo 0.249788197; máximo opaco 0; MAE de composición 0.112309/255.
- celular: bbox alpha>0 (left,top,right,bottom) `[46, 947, 821, 1408]`; error RGB normalizado ponderado por alpha, media 0.000443925, máximo 0.303972188; máximo opaco 0; MAE de composición 0.294304/255.

| Archivo | Rol | Tamaño px | Alpha | Bbox / método |
|---|---|---|---|---|
| 30-isla2-escritorio-v2.png | plate | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-escritorio-v2.avif | plate | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-escritorio-v2.webp | plate | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-escritorio-v2-isla.png | island-cutout | 1672x941 | Sí | [315, 482, 1350, 865]; método descrito arriba |
| 30-isla2-escritorio-v2-isla.avif | island-cutout | 1672x941 | Sí | [315, 482, 1350, 865]; método descrito arriba |
| 30-isla2-escritorio-v2-isla.webp | island-cutout | 1672x941 | Sí | [315, 482, 1350, 865]; método descrito arriba |
| 30-isla2-escritorio-v2-fondo.png | background | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-escritorio-v2-fondo.avif | background | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-escritorio-v2-fondo.webp | background | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-escritorio-v2-composite-check.png | plate (QA) | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-escritorio-v2-composite-check.avif | plate (QA) | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-escritorio-v2-composite-check.webp | plate (QA) | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-celular-v2.png | plate | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-celular-v2.avif | plate | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-celular-v2.webp | plate | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-celular-v2-isla.png | island-cutout | 864x1536 | Sí | [46, 947, 821, 1408]; método descrito arriba |
| 30-isla2-celular-v2-isla.avif | island-cutout | 864x1536 | Sí | [46, 947, 821, 1408]; método descrito arriba |
| 30-isla2-celular-v2-isla.webp | island-cutout | 864x1536 | Sí | [46, 947, 821, 1408]; método descrito arriba |
| 30-isla2-celular-v2-fondo.png | background | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-celular-v2-fondo.avif | background | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-celular-v2-fondo.webp | background | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-celular-v2-composite-check.png | plate (QA) | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-celular-v2-composite-check.avif | plate (QA) | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 30-isla2-celular-v2-composite-check.webp | plate (QA) | 864x1536 | No | Lienzo 1:1; método descrito arriba |


## Isla 4 v2: objetos del taller integrados (19 de noviembre de 2026)

Integración de un invernadero de madera y vidrio, una caja de herramientas, una maceta, un engranaje y dos montículos bajos de tierra. Cada placa original se adjuntó como base a `image_gen`; la versión de escritorio sirvió de referencia para móvil. Objetos apoyados en la tierra, con oclusión y sombras consistentes con la luz dorada desde la izquierda. Se conservaron los surcos, el borde frontal y el espacio de Mayo junto al montículo izquierdo; sin personajes. Las posiciones se ajustaron hacia el interior para evitar apoyos en el borde.

Composición local con máscaras suaves restringidas al suelo y a las siluetas de los objetos que sobresalen. Fuera del soporte de edición, diferencia RGB máxima 0 contra cada original: cielo exterior, borde y raíces permanecen exactos. Recortes del suelo al 100 % y superposiciones al 50 % inspeccionados.

Parallax: matte local BiRefNet para las adiciones, geometría anterior conservada para las raíces y refinado de una banda de borde contra color interior cercano y cielo reconstruido. Fondos v2 reconstruidos mediante ajuste polinómico bidimensional de grado 4, mezcla de 18 px y cielo exterior exacto fuera de esa banda; no se reutilizó el fondo previo. RGB opaco del recorte idéntico a la placa v2. Composición y fondo oscuro inspeccionados. AVIF calidad 85, WebP con pérdida calidad 82 y alpha-quality 100; mismas dimensiones y alpha.

Los objetos sueltos `43-isla4-*` quedan sustituidos en la landing por v2; se conservan sus archivos. Sin cambios en `src/`, dependencias, originales, push o deploy. No se ejecutó build ni prueba de parallax en navegador: entrega de imágenes, integración a cargo del coordinador.

- escritorio: bbox alpha>0 (left,top,right,bottom) `[341, 458, 1312, 881]`; diferencia RGB ponderada por alpha media 0.000472302, máxima 0.281178705; máximo opaco 0; MAE composición 0.124538/255; máximo exterior a la máscara 0.
- celular: bbox alpha>0 (left,top,right,bottom) `[118, 1056, 753, 1339]`; diferencia RGB ponderada por alpha media 0.000348175, máxima 0.279792155; máximo opaco 0; MAE composición 0.091699/255; máximo exterior a la máscara 0.

| Archivo | Rol | Tamaño px | Alpha | Bbox / método |
|---|---|---|---|---|
| 40-isla4-escritorio-v2.png | plate | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-escritorio-v2.avif | plate | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-escritorio-v2.webp | plate | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-escritorio-v2-isla.png | island-cutout | 1672x941 | Sí | [341, 458, 1312, 881]; método descrito arriba |
| 40-isla4-escritorio-v2-isla.avif | island-cutout | 1672x941 | Sí | [341, 458, 1312, 881]; método descrito arriba |
| 40-isla4-escritorio-v2-isla.webp | island-cutout | 1672x941 | Sí | [341, 458, 1312, 881]; método descrito arriba |
| 40-isla4-escritorio-v2-fondo.png | background | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-escritorio-v2-fondo.avif | background | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-escritorio-v2-fondo.webp | background | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-escritorio-v2-composite-check.png | plate (QA) | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-escritorio-v2-composite-check.avif | plate (QA) | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-escritorio-v2-composite-check.webp | plate (QA) | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-celular-v2.png | plate | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-celular-v2.avif | plate | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-celular-v2.webp | plate | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-celular-v2-isla.png | island-cutout | 864x1536 | Sí | [118, 1056, 753, 1339]; método descrito arriba |
| 40-isla4-celular-v2-isla.avif | island-cutout | 864x1536 | Sí | [118, 1056, 753, 1339]; método descrito arriba |
| 40-isla4-celular-v2-isla.webp | island-cutout | 864x1536 | Sí | [118, 1056, 753, 1339]; método descrito arriba |
| 40-isla4-celular-v2-fondo.png | background | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-celular-v2-fondo.avif | background | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-celular-v2-fondo.webp | background | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-celular-v2-composite-check.png | plate (QA) | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-celular-v2-composite-check.avif | plate (QA) | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 40-isla4-celular-v2-composite-check.webp | plate (QA) | 864x1536 | No | Lienzo 1:1; método descrito arriba |


## Isla 5 v2: pasos e hitos integrados en el sendero (19 de noviembre de 2026)

Se integraron seis piedras planas en el sendero y seis hitos pequeños a sus lados, con escala por perspectiva, contacto y sombras de atardecer. Cada placa original se adjuntó a `image_gen`; escritorio sirvió de referencia para móvil. Se mantuvo despejado el recorrido transversal de Mayo; sin personajes.

Composición local con máscaras suaves restringidas al suelo y a las siluetas de los objetos que sobresalen. Fuera del soporte de edición, diferencia RGB máxima 0 contra cada original: cielo exterior, borde y raíces permanecen exactos. Recortes del suelo al 100 % y superposiciones al 50 % inspeccionados.

Parallax: matte local BiRefNet para las adiciones, geometría anterior conservada para las raíces y refinado de una banda de borde contra color interior cercano y cielo reconstruido. Fondos v2 reconstruidos mediante ajuste polinómico bidimensional de grado 4, mezcla de 18 px y cielo exterior exacto fuera de esa banda; no se reutilizó el fondo previo. RGB opaco del recorte idéntico a la placa v2. Composición y fondo oscuro inspeccionados. AVIF calidad 85, WebP con pérdida calidad 82 y alpha-quality 100; mismas dimensiones y alpha.

Los objetos sueltos `48-isla5-paso-*` y `48-isla5-hito-*` quedan sustituidos en la landing por v2; se conservan sus archivos. Sin cambios en `src/`, dependencias, originales, push o deploy. No se ejecutó build ni prueba de parallax en navegador: entrega de imágenes, integración a cargo del coordinador.

- escritorio: bbox alpha>0 (left,top,right,bottom) `[403, 428, 1217, 867]`; diferencia RGB ponderada por alpha media 0.000371517, máxima 0.407863428; máximo opaco 0; MAE composición 0.198211/255; máximo exterior a la máscara 0.
- celular: bbox alpha>0 (left,top,right,bottom) `[64, 924, 799, 1445]`; diferencia RGB ponderada por alpha media 0.000525694, máxima 0.318597200; máximo opaco 0; MAE composición 0.326260/255; máximo exterior a la máscara 0.

| Archivo | Rol | Tamaño px | Alpha | Bbox / método |
|---|---|---|---|---|
| 45-isla5-escritorio-v2.png | plate | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-escritorio-v2.avif | plate | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-escritorio-v2.webp | plate | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-escritorio-v2-isla.png | island-cutout | 1672x941 | Sí | [403, 428, 1217, 867]; método descrito arriba |
| 45-isla5-escritorio-v2-isla.avif | island-cutout | 1672x941 | Sí | [403, 428, 1217, 867]; método descrito arriba |
| 45-isla5-escritorio-v2-isla.webp | island-cutout | 1672x941 | Sí | [403, 428, 1217, 867]; método descrito arriba |
| 45-isla5-escritorio-v2-fondo.png | background | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-escritorio-v2-fondo.avif | background | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-escritorio-v2-fondo.webp | background | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-escritorio-v2-composite-check.png | plate (QA) | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-escritorio-v2-composite-check.avif | plate (QA) | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-escritorio-v2-composite-check.webp | plate (QA) | 1672x941 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-celular-v2.png | plate | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-celular-v2.avif | plate | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-celular-v2.webp | plate | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-celular-v2-isla.png | island-cutout | 864x1536 | Sí | [64, 924, 799, 1445]; método descrito arriba |
| 45-isla5-celular-v2-isla.avif | island-cutout | 864x1536 | Sí | [64, 924, 799, 1445]; método descrito arriba |
| 45-isla5-celular-v2-isla.webp | island-cutout | 864x1536 | Sí | [64, 924, 799, 1445]; método descrito arriba |
| 45-isla5-celular-v2-fondo.png | background | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-celular-v2-fondo.avif | background | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-celular-v2-fondo.webp | background | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-celular-v2-composite-check.png | plate (QA) | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-celular-v2-composite-check.avif | plate (QA) | 864x1536 | No | Lienzo 1:1; método descrito arriba |
| 45-isla5-celular-v2-composite-check.webp | plate (QA) | 864x1536 | No | Lienzo 1:1; método descrito arriba |


## Mayo systems v2: excavación pintada en la escena (19 de noviembre de 2026)

Piloto solicitado para corregir el ángulo lateral de la tira anterior. Doce poses nuevas de Mayo se pintaron con `image_gen` sobre un recorte de `40-isla4-escritorio-v2.png`, con cámara de tres cuartos ligeramente elevada y luz dorada desde la izquierda. La hoja `70-mayo-hoja-estilo.png` fija identidad y matiz cálido. Los keyframes de pose `mayo-key-06-dig-f1..f12.png` proceden del SHA `2d7c4e4` de `mayo-3d`; Git contiene punteros LFS y se resolvieron sus objetos locales verificando SHA-256, sin modificar ese repositorio ni descargar. F1 adjunta recorte, hoja y pose; f2–f12 adjuntan recorte, f1 original, frame anterior y pose correspondiente. F4 tiene los ojos abiertos. Las poses conservan escala de lienzo; no se escala ni traslada cada perro por separado.

### Rectángulo y montaje

- Placa: 1672x941. Rectángulo `(left,top,width,height) = (527,311,368,368)`; límites exclusivos `(527,311,895,679)`.
- Porcentajes de placa: izquierda 31.519139 %, arriba 33.049947 %, ancho 22.009569 %, alto 39.107333 %. Centro horizontal 42.523923 %.
- Línea de contacto de referencia: y = 635.175 px de placa (67.5 %). Dentro del recorte: y = 324.175/368 = 88.091033 %. Dentro de cada celda de 640: y = 563.782609 px; ancla horizontal de referencia x = 320 px (50 %). Las patas delanteras se levantan y retraen al excavar; esta línea no es el último píxel alpha de cada pose.
- Recorte ampliado a 1024x1024 por Lanczos para generación; extracción y reducción Lanczos a celdas 640x640. Tira 7680x640, 12 celdas en orden f1..f12.
- Preview a escala 1x de placa: 368x368, 10 fps, orden ping-pong f1..f12,f11..f2 (22 frames, 2.2 s), repetición continua. Móvil reutiliza la tira; su colocación queda a cargo del coordinador.

### Extracción y límites observados

Diferencia contra el recorte limpio, con BiRefNet local para aislar Mayo; refinado del borde contra el fondo conocido y descontaminación RGB. La sombra se separó como oscurecimiento suave semitransparente de la diferencia, sin copiar textura de tierra. Se conservaron los pequeños componentes de tierra que vuelan cerca de las patas. Controles alpha transparentes en cielo alto, maceta y engranaje; revisión visual de las doce celdas sobre fondo oscuro sin esas piezas de fondo.

**Limitación:** el generador alteró ligeramente la textura y el color del fondo pese al prompt. Esos cambios no se incorporan a la tira. La recomposición sobre el recorte original conserva el fondo fuera de Mayo/sombra/motas, pero NO reproduce píxel a píxel los brutos generados. Se informan ambos errores: MAE RGB contra el bruto a 1024 y MAE de exportación a 640 contra la escena con fondo original restituido. Este segundo valor mide exportación y reducción, no prueba identidad del bruto. No se declara aceptación humana ni integración en navegador; piloto pendiente de revisión del coordinador.

| Frame | MAE bruto /255 | MAE exportación normalizada /255 |
|---|---|---|
| f1 | 7.040203 | 0.031022 |
| f2 | 8.088804 | 0.033927 |
| f3 | 8.481439 | 0.037231 |
| f4 | 9.297815 | 0.039889 |
| f5 | 8.118007 | 0.038222 |
| f6 | 8.481179 | 0.036743 |
| f7 | 8.658393 | 0.039845 |
| f8 | 9.919549 | 0.042112 |
| f9 | 9.643221 | 0.040658 |
| f10 | 9.269803 | 0.034266 |
| f11 | 8.134546 | 0.041383 |
| f12 | 8.409794 | 0.037146 |

Verificación: 12 PNG RGBA 640x640, orden de tira comparado píxel a píxel con sus celdas, alpha y dimensiones de PNG/AVIF/WebP, GIF con 22 frames a 100 ms y revisión de cámara, contacto y movimiento en grilla/preview a 1x. Sin build ni pruebas de aplicación, por tratarse de assets pasivos; sin cambios en `src/`, dependencias, placas originales ni tiras anteriores. Sin push, merge ni deploy. AVIF calidad 85; WebP con pérdida calidad 82 y alpha-quality 100.

| Archivo | Rol | Tamaño px | Alpha | Montaje / estado |
|---|---|---|---|---|
| 70-mayo-systems-v2-f1.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 1/12 |
| 70-mayo-systems-v2-f2.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 2/12 |
| 70-mayo-systems-v2-f3.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 3/12 |
| 70-mayo-systems-v2-f4.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 4/12 |
| 70-mayo-systems-v2-f5.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 5/12 |
| 70-mayo-systems-v2-f6.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 6/12 |
| 70-mayo-systems-v2-f7.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 7/12 |
| 70-mayo-systems-v2-f8.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 8/12 |
| 70-mayo-systems-v2-f9.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 9/12 |
| 70-mayo-systems-v2-f10.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 10/12 |
| 70-mayo-systems-v2-f11.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 11/12 |
| 70-mayo-systems-v2-f12.png | animated-character-frame | 640x640 | Sí | crop y ancla descritos arriba; frame 12/12 |
| 70-mayo-systems-v2-tira.png | animated-character-strip | 7680x640 | Sí | 12 celdas; 10 fps ping-pong |
| 70-mayo-systems-v2-tira.avif | animated-character-strip | 7680x640 | Sí | 12 celdas; 10 fps ping-pong |
| 70-mayo-systems-v2-tira.webp | animated-character-strip | 7680x640 | Sí | 12 celdas; 10 fps ping-pong |
| 70-mayo-systems-v2-preview.gif | preview (QA) | 368x368 | No | 1x del recorte; pendiente de revisión |


## Mayo hero v2: integración en la escena

Mayo permanece sentada. Solo gira suavemente la cabeza, mueve la cola y hace pequeños movimientos de orejas. Luz rosa dorada del amanecer desde la derecha. Las poses de pie de los keyframes se sustituyen expresamente por la pose sentada autorizada.

### Escala y rectángulo

Recorte de 109 px (6.5191 % del ancho de placa), conforme a la propuesta de 6.5 %. Mayo sentada mide aproximadamente 70 px frente a unos 200 px del árbol de 4–6 m: cerca de un tercio de su altura pintada, no del tamaño del árbol.

Placa fuente: `01-hero-escritorio.png`. Tamaño 1672x941.
- Rectángulo `(left,top,width,height)`: `(798,586,109,109)` px.
- Porcentajes de placa: `47.727273 %, 62.274176 %, 6.519139 %, 11.583422 %`.
- Contacto de referencia en placa: `(852.720,682.225)` px = `(51.000000 %, 72.500000 %)`. Sin cambio de ancla salvo indicación explícita.
- Contacto dentro de celda 640: `(321.291743,564.990826)` px; línea vertical `88.279817 %`. La línea es referencia de suelo, no el último píxel de una pata en movimiento.

### Método y verificación

Recorte original ampliado por Lanczos a 1024. `image_gen` adjunta recorte, hoja de identidad aprobada y keyframe de pose en f1; en f2–f12 adjunta el recorte limpio, f1 original, el frame anterior y su referencia de pose. Identidad cálida bloqueada a `70-mayo-hoja-estilo.png`; cámara de tres cuartos ligeramente elevada. Sin escalado ni traslación independiente de cada perro. Keyframes locales con SHA/LFS verificados.

Extracción por diferencia contra el recorte y matte local BiRefNet, refinado y descontaminado en el borde; sombra pintada extraída como oscurecimiento suave semitransparente, sin arrastrar textura de suelo. El fondo del generador presenta deriva leve: se excluye de la tira y se conserva el recorte original fuera del alpha. No se declara recomposición exacta del bruto: la tabla distingue MAE contra bruto y MAE de exportación contra escena con fondo restituido. Máximo RGB exterior al alpha: 0 en las doce recomposiciones.

Revisión de las doce poses y bordes sobre oscuro, contacto y escala en placa completa; dimensiones/alpha, orden numérico de celdas y preview verificados. Sin test de aplicación ni build (assets pasivos), sin cambios en src, dependencias, placas o sprites anteriores, sin push/merge/deploy. Integración móvil y aceptación humana corresponden al coordinador.

| Frame | MAE bruto /255 | MAE exportación normalizada /255 |
|---|---|---|
| f1 | 5.400865 | 0.030955 |
| f2 | 5.855226 | 0.031756 |
| f3 | 5.817421 | 0.030531 |
| f4 | 6.933628 | 0.031739 |
| f5 | 6.076275 | 0.030625 |
| f6 | 6.926442 | 0.034694 |
| f7 | 6.204898 | 0.035654 |
| f8 | 6.218380 | 0.031219 |
| f9 | 7.042334 | 0.031767 |
| f10 | 6.673513 | 0.030659 |
| f11 | 5.500160 | 0.030962 |
| f12 | 4.660790 | 0.030748 |

PNG RGBA de 8 bits; tira AVIF85 y WebP82 con pérdida, alpha-quality100. Preview ping-pong de 22 frames, 10 fps, f1..f12,f11..f2; extremos no duplicados.

| Archivo | Rol | Tamaño px | Alpha | Montaje |
|---|---|---|---|---|
| 70-mayo-hero-v2-f1.png | animated-character-frame | 640x640 | Sí | frame 1/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-f2.png | animated-character-frame | 640x640 | Sí | frame 2/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-f3.png | animated-character-frame | 640x640 | Sí | frame 3/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-f4.png | animated-character-frame | 640x640 | Sí | frame 4/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-f5.png | animated-character-frame | 640x640 | Sí | frame 5/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-f6.png | animated-character-frame | 640x640 | Sí | frame 6/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-f7.png | animated-character-frame | 640x640 | Sí | frame 7/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-f8.png | animated-character-frame | 640x640 | Sí | frame 8/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-f9.png | animated-character-frame | 640x640 | Sí | frame 9/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-f10.png | animated-character-frame | 640x640 | Sí | frame 10/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-f11.png | animated-character-frame | 640x640 | Sí | frame 11/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-f12.png | animated-character-frame | 640x640 | Sí | frame 12/12; rectángulo y contacto arriba |
| 70-mayo-hero-v2-tira.png | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-hero-v2-tira.avif | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-hero-v2-tira.webp | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-hero-v2-preview.gif | preview (QA) | 109x109 | No | 1x del recorte |


## Mayo host v2: integración en la escena

Mayo yace descansando y mira al fuego, con respiración lenta y pequeños movimientos de oreja. Luz cálida del fogón a su derecha y ambiente azul del crepúsculo.

### Escala y rectángulo

Recorte de 142 px (8.4928 %), conforme a la propuesta de 8.5 %. El cuerpo acostado ocupa aproximadamente 90–110 px frente al banco de unos 160 px; lectura de collie de cerca de 1 m junto a un banco de 1.5–2 m y asiento de unos 45 cm.

Placa fuente: `50-isla6-escritorio-v2.png`, exportada del commit `e58b245`. Tamaño 1672x941.
- Rectángulo `(left,top,width,height)`: `(681,454,142,142)` px.
- Porcentajes de placa: `40.729665 %, 48.246546 %, 8.492823 %, 15.090329 %`.
- Contacto de referencia en placa: `(752.400,574.922)` px = `(45.000000 %, 61.096905 %)`. Sin cambio de ancla salvo indicación explícita.
- Contacto dentro de celda 640: `(321.802817,545.000000)` px; línea vertical `85.156250 %`. La línea es referencia de suelo, no el último píxel de una pata en movimiento.

### Método y verificación

Recorte original ampliado por Lanczos a 1024. `image_gen` adjunta recorte, hoja de identidad aprobada y keyframe de pose en f1; en f2–f12 adjunta el recorte limpio, f1 original, el frame anterior y su referencia de pose. Identidad cálida bloqueada a `70-mayo-hoja-estilo.png`; cámara de tres cuartos ligeramente elevada. Sin escalado ni traslación independiente de cada perro. Keyframes locales con SHA/LFS verificados.

Extracción por diferencia contra el recorte y matte local BiRefNet, refinado y descontaminado en el borde; sombra pintada extraída como oscurecimiento suave semitransparente, sin arrastrar textura de suelo. El fondo del generador presenta deriva leve: se excluye de la tira y se conserva el recorte original fuera del alpha. No se declara recomposición exacta del bruto: la tabla distingue MAE contra bruto y MAE de exportación contra escena con fondo restituido. Máximo RGB exterior al alpha: 0 en las doce recomposiciones.

Revisión de las doce poses y bordes sobre oscuro, contacto y escala en placa completa; dimensiones/alpha, orden numérico de celdas y preview verificados. Sin test de aplicación ni build (assets pasivos), sin cambios en src, dependencias, placas o sprites anteriores, sin push/merge/deploy. Integración móvil y aceptación humana corresponden al coordinador.

| Frame | MAE bruto /255 | MAE exportación normalizada /255 |
|---|---|---|
| f1 | 18.660620 | 0.065923 |
| f2 | 20.082677 | 0.064216 |
| f3 | 21.770413 | 0.067511 |
| f4 | 20.863438 | 0.062278 |
| f5 | 22.888414 | 0.062625 |
| f6 | 21.873205 | 0.061261 |
| f7 | 22.839429 | 0.063655 |
| f8 | 21.047531 | 0.063822 |
| f9 | 21.443139 | 0.063722 |
| f10 | 20.376026 | 0.061591 |
| f11 | 24.072508 | 0.067520 |
| f12 | 21.780466 | 0.065264 |

PNG RGBA de 8 bits; tira AVIF85 y WebP82 con pérdida, alpha-quality100. Preview ping-pong de 22 frames, 10 fps, f1..f12,f11..f2; extremos no duplicados.

| Archivo | Rol | Tamaño px | Alpha | Montaje |
|---|---|---|---|---|
| 70-mayo-host-v2-f1.png | animated-character-frame | 640x640 | Sí | frame 1/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-f2.png | animated-character-frame | 640x640 | Sí | frame 2/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-f3.png | animated-character-frame | 640x640 | Sí | frame 3/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-f4.png | animated-character-frame | 640x640 | Sí | frame 4/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-f5.png | animated-character-frame | 640x640 | Sí | frame 5/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-f6.png | animated-character-frame | 640x640 | Sí | frame 6/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-f7.png | animated-character-frame | 640x640 | Sí | frame 7/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-f8.png | animated-character-frame | 640x640 | Sí | frame 8/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-f9.png | animated-character-frame | 640x640 | Sí | frame 9/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-f10.png | animated-character-frame | 640x640 | Sí | frame 10/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-f11.png | animated-character-frame | 640x640 | Sí | frame 11/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-f12.png | animated-character-frame | 640x640 | Sí | frame 12/12; rectángulo y contacto arriba |
| 70-mayo-host-v2-tira.png | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-host-v2-tira.avif | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-host-v2-tira.webp | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-host-v2-preview.gif | preview (QA) | 142x142 | No | 1x del recorte |

Contacto medido de reposo: la línea de patas queda en 85.15625 % de la celda, y = 574.925781 px de placa (aproximadamente 61.09732 %), 3.7892 px por encima del ancla propuesta de 61.5 %. Se informa este ajuste de colocación; no se trasladó ni escaló cada perro por separado.


## Mayo problem v2: integración en la escena

Mayo hace una reverencia juguetona y pequeños rebotes en el lugar, con lengua fuera en frames alternos. Se usan únicamente poses de juego f7–f12, no la caída de f1–f6. Luz clara de mañana.

### Escala y rectángulo

Recorte de 142 px (8.4928 %), conforme a 8.5 %. Cuerpo de aproximadamente 90–110 px junto a rocas de 0.5–1 m; la postura baja y sus cambios verticales corresponden al juego, sin agrandar cada frame.

Placa fuente: `30-isla2-escritorio-v2.png`. Tamaño 1672x941.
- Rectángulo `(left,top,width,height)`: `(681,468,142,142)` px.
- Porcentajes de placa: `40.729665 %, 49.734325 %, 8.492823 %, 15.090329 %`.
- Contacto de referencia en placa: `(752.400,592.830)` px = `(45.000000 %, 63.000000 %)`. Sin cambio de ancla salvo indicación explícita.
- Contacto dentro de celda 640: `(321.802817,562.614085)` px; línea vertical `87.908451 %`. La línea es referencia de suelo, no el último píxel de una pata en movimiento.

### Método y verificación

Recorte original ampliado por Lanczos a 1024. `image_gen` adjunta recorte, hoja de identidad aprobada y keyframe de pose en f1; en f2–f12 adjunta el recorte limpio, f1 original, el frame anterior y su referencia de pose. Identidad cálida bloqueada a `70-mayo-hoja-estilo.png`; cámara de tres cuartos ligeramente elevada. Sin escalado ni traslación independiente de cada perro. Keyframes locales con SHA/LFS verificados.

Extracción por diferencia contra el recorte y matte local BiRefNet, refinado y descontaminado en el borde; sombra pintada extraída como oscurecimiento suave semitransparente, sin arrastrar textura de suelo. El fondo del generador presenta deriva leve: se excluye de la tira y se conserva el recorte original fuera del alpha. No se declara recomposición exacta del bruto: la tabla distingue MAE contra bruto y MAE de exportación contra escena con fondo restituido. Máximo RGB exterior al alpha: 0 en las doce recomposiciones.

Revisión de las doce poses y bordes sobre oscuro, contacto y escala en placa completa; dimensiones/alpha, orden numérico de celdas y preview verificados. Sin test de aplicación ni build (assets pasivos), sin cambios en src, dependencias, placas o sprites anteriores, sin push/merge/deploy. Integración móvil y aceptación humana corresponden al coordinador.

| Frame | MAE bruto /255 | MAE exportación normalizada /255 |
|---|---|---|
| f1 | 9.039618 | 0.050848 |
| f2 | 9.878141 | 0.052596 |
| f3 | 9.775341 | 0.044918 |
| f4 | 9.788420 | 0.047970 |
| f5 | 9.705860 | 0.049571 |
| f6 | 9.868238 | 0.049157 |
| f7 | 9.787291 | 0.047121 |
| f8 | 9.413201 | 0.046430 |
| f9 | 10.408360 | 0.051591 |
| f10 | 10.299150 | 0.052404 |
| f11 | 9.324310 | 0.046670 |
| f12 | 9.372903 | 0.047699 |

PNG RGBA de 8 bits; tira AVIF85 y WebP82 con pérdida, alpha-quality100. Preview ping-pong de 22 frames, 10 fps, f1..f12,f11..f2; extremos no duplicados.

| Archivo | Rol | Tamaño px | Alpha | Montaje |
|---|---|---|---|---|
| 70-mayo-problem-v2-f1.png | animated-character-frame | 640x640 | Sí | frame 1/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-f2.png | animated-character-frame | 640x640 | Sí | frame 2/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-f3.png | animated-character-frame | 640x640 | Sí | frame 3/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-f4.png | animated-character-frame | 640x640 | Sí | frame 4/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-f5.png | animated-character-frame | 640x640 | Sí | frame 5/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-f6.png | animated-character-frame | 640x640 | Sí | frame 6/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-f7.png | animated-character-frame | 640x640 | Sí | frame 7/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-f8.png | animated-character-frame | 640x640 | Sí | frame 8/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-f9.png | animated-character-frame | 640x640 | Sí | frame 9/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-f10.png | animated-character-frame | 640x640 | Sí | frame 10/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-f11.png | animated-character-frame | 640x640 | Sí | frame 11/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-f12.png | animated-character-frame | 640x640 | Sí | frame 12/12; rectángulo y contacto arriba |
| 70-mayo-problem-v2-tira.png | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-problem-v2-tira.avif | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-problem-v2-tira.webp | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-problem-v2-preview.gif | preview (QA) | 142x142 | No | 1x del recorte |


## Mayo questions v2: integración en la escena

Mayo permanece en el lugar y sigue con la cabeza una luciérnaga que no se hornea en el sprite. Cola y una pata se mueven suavemente. Luz menta desde arriba/derecha y farol cálido a la izquierda.

### Escala y rectángulo

Recorte de 100 px (5.9809 %), conforme a 6 %. Mayo mide aproximadamente 60–70 px sentada frente al árbol de unos 220 px; el farol de unos 40 cm queda claramente menor que el perro.

Placa fuente: `55-isla7-escritorio-v2.png`, exportada del commit `fa6de5c`. Tamaño 1672x941.
- Rectángulo `(left,top,width,height)`: `(711,354,100,100)` px.
- Porcentajes de placa: `42.523923 %, 37.619554 %, 5.980861 %, 10.626993 %`.
- Contacto de referencia en placa: `(760.760,442.270)` px = `(45.500000 %, 47.000000 %)`. Sin cambio de ancla salvo indicación explícita.
- Contacto dentro de celda 640: `(318.464000,564.928000)` px; línea vertical `88.270000 %`. La línea es referencia de suelo, no el último píxel de una pata en movimiento.

### Método y verificación

Recorte original ampliado por Lanczos a 1024. `image_gen` adjunta recorte, hoja de identidad aprobada y keyframe de pose en f1; en f2–f12 adjunta el recorte limpio, f1 original, el frame anterior y su referencia de pose. Identidad cálida bloqueada a `70-mayo-hoja-estilo.png`; cámara de tres cuartos ligeramente elevada. Sin escalado ni traslación independiente de cada perro. Keyframes locales con SHA/LFS verificados.

Extracción por diferencia contra el recorte y matte local BiRefNet, refinado y descontaminado en el borde; sombra pintada extraída como oscurecimiento suave semitransparente, sin arrastrar textura de suelo. El fondo del generador presenta deriva leve: se excluye de la tira y se conserva el recorte original fuera del alpha. No se declara recomposición exacta del bruto: la tabla distingue MAE contra bruto y MAE de exportación contra escena con fondo restituido. Máximo RGB exterior al alpha: 0 en las doce recomposiciones.

Revisión de las doce poses y bordes sobre oscuro, contacto y escala en placa completa; dimensiones/alpha, orden numérico de celdas y preview verificados. Sin test de aplicación ni build (assets pasivos), sin cambios en src, dependencias, placas o sprites anteriores, sin push/merge/deploy. Integración móvil y aceptación humana corresponden al coordinador.

| Frame | MAE bruto /255 | MAE exportación normalizada /255 |
|---|---|---|
| f1 | 10.634962 | 0.031485 |
| f2 | 11.195204 | 0.032199 |
| f3 | 10.130466 | 0.032457 |
| f4 | 9.860583 | 0.033038 |
| f5 | 10.378534 | 0.033495 |
| f6 | 9.896244 | 0.034268 |
| f7 | 10.314424 | 0.036861 |
| f8 | 11.309237 | 0.035325 |
| f9 | 12.001828 | 0.036461 |
| f10 | 9.732996 | 0.032657 |
| f11 | 10.895202 | 0.033576 |
| f12 | 10.911728 | 0.033206 |

PNG RGBA de 8 bits; tira AVIF85 y WebP82 con pérdida, alpha-quality100. Preview ping-pong de 22 frames, 10 fps, f1..f12,f11..f2; extremos no duplicados.

| Archivo | Rol | Tamaño px | Alpha | Montaje |
|---|---|---|---|---|
| 70-mayo-questions-v2-f1.png | animated-character-frame | 640x640 | Sí | frame 1/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-f2.png | animated-character-frame | 640x640 | Sí | frame 2/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-f3.png | animated-character-frame | 640x640 | Sí | frame 3/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-f4.png | animated-character-frame | 640x640 | Sí | frame 4/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-f5.png | animated-character-frame | 640x640 | Sí | frame 5/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-f6.png | animated-character-frame | 640x640 | Sí | frame 6/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-f7.png | animated-character-frame | 640x640 | Sí | frame 7/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-f8.png | animated-character-frame | 640x640 | Sí | frame 8/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-f9.png | animated-character-frame | 640x640 | Sí | frame 9/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-f10.png | animated-character-frame | 640x640 | Sí | frame 10/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-f11.png | animated-character-frame | 640x640 | Sí | frame 11/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-f12.png | animated-character-frame | 640x640 | Sí | frame 12/12; rectángulo y contacto arriba |
| 70-mayo-questions-v2-tira.png | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-questions-v2-tira.avif | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-questions-v2-tira.webp | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-questions-v2-preview.gif | preview (QA) | 100x100 | No | 1x del recorte |

Contacto visible medido de las patas: y=581.875–583.750 px de celda (90.92–91.21 %), unos 2.65–2.94 px de placa por debajo de la referencia nominal de suelo. Se conserva el ancla nominal solicitada; el coordinador puede compensar esta diferencia de montaje. Las luciérnagas permanecen separadas; no se extrajo ningún farol, roca, raíz ni césped.


## Mayo works v2: integración en la escena

Galope en el lugar visto desde la cámara elevada de la placa, orientado de derecha a izquierda; boca abierta jadeando. El desplazamiento real queda para CSS. Ciclo cerrado f12→f1, sin inversión ping-pong.

### Escala y rectángulo

Recorte de 134 px (8.0144 %), conforme a 8 %. El cuerpo y la extensión de las patas se contrastaron con las piedras de unos 40 cm; escala visual aproximada, no calibración métrica de una escena 3D.

Placa fuente: `45-isla5-escritorio-v2.png`. Tamaño 1672x941.
- Rectángulo `(left,top,width,height)`: `(752,513,134,134)` px.
- Porcentajes de placa: `44.976077 %, 54.516472 %, 8.014354 %, 14.240170 %`.
- Contacto de referencia en placa: `(819.280,617.688)` px = `(49.000000 %, 65.641605 %)`. Sin cambio de ancla salvo indicación explícita.
- Contacto dentro de celda 640: `(321.337313,500.000000)` px; línea vertical `78.125000 %`. La línea es referencia de suelo, no el último píxel de una pata en movimiento.

### Método y verificación

Recorte original ampliado por Lanczos a 1024. `image_gen` adjunta recorte, hoja de identidad aprobada y keyframe de pose en f1; en f2–f12 adjunta el recorte limpio, f1 original, el frame anterior y su referencia de pose. Identidad cálida bloqueada a `70-mayo-hoja-estilo.png`; cámara de tres cuartos ligeramente elevada. Sin escalado ni traslación independiente de cada perro. Keyframes locales con SHA/LFS verificados.

Extracción por diferencia contra el recorte y matte local BiRefNet, refinado y descontaminado en el borde; sombra pintada extraída como oscurecimiento suave semitransparente, sin arrastrar textura de suelo. El fondo del generador presenta deriva leve: se excluye de la tira y se conserva el recorte original fuera del alpha. No se declara recomposición exacta del bruto: la tabla distingue MAE contra bruto y MAE de exportación contra escena con fondo restituido. Máximo RGB exterior al alpha: 0 en las doce recomposiciones.

Revisión de las doce poses y bordes sobre oscuro, contacto y escala en placa completa; dimensiones/alpha, orden numérico de celdas y preview verificados. Sin test de aplicación ni build (assets pasivos), sin cambios en src, dependencias, placas o sprites anteriores, sin push/merge/deploy. Integración móvil y aceptación humana corresponden al coordinador.

| Frame | MAE bruto /255 | MAE exportación normalizada /255 |
|---|---|---|
| f1 | 17.753579 | 0.057201 |
| f2 | 18.478289 | 0.061869 |
| f3 | 18.408969 | 0.057337 |
| f4 | 17.526143 | 0.051597 |
| f5 | 18.831376 | 0.047935 |
| f6 | 17.663809 | 0.054751 |
| f7 | 17.686967 | 0.065404 |
| f8 | 18.446884 | 0.057808 |
| f9 | 17.253410 | 0.050724 |
| f10 | 17.611138 | 0.049526 |
| f11 | 17.848192 | 0.063249 |
| f12 | 17.655609 | 0.060385 |

PNG RGBA de 8 bits; tira AVIF85 y WebP82 con pérdida, alpha-quality100. Preview cerrado de 12 frames, 10 fps, f1..f12→f1.

| Archivo | Rol | Tamaño px | Alpha | Montaje |
|---|---|---|---|---|
| 70-mayo-works-v2-f1.png | animated-character-frame | 640x640 | Sí | frame 1/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-f2.png | animated-character-frame | 640x640 | Sí | frame 2/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-f3.png | animated-character-frame | 640x640 | Sí | frame 3/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-f4.png | animated-character-frame | 640x640 | Sí | frame 4/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-f5.png | animated-character-frame | 640x640 | Sí | frame 5/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-f6.png | animated-character-frame | 640x640 | Sí | frame 6/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-f7.png | animated-character-frame | 640x640 | Sí | frame 7/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-f8.png | animated-character-frame | 640x640 | Sí | frame 8/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-f9.png | animated-character-frame | 640x640 | Sí | frame 9/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-f10.png | animated-character-frame | 640x640 | Sí | frame 10/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-f11.png | animated-character-frame | 640x640 | Sí | frame 11/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-f12.png | animated-character-frame | 640x640 | Sí | frame 12/12; rectángulo y contacto arriba |
| 70-mayo-works-v2-tira.png | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-works-v2-tira.avif | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-works-v2-tira.webp | animated-character-strip | 7680x640 | Sí | 12 celdas |
| 70-mayo-works-v2-preview.gif | preview (QA) | 134x134 | No | 1x del recorte |

Ajuste explícito de ancla: suelo y sombra del galope medidos en y=800/1024 (500/640, 78.125 % de celda). El ancla de placa pasa de 49 % / 67 % a 49 % / 65.641605 %: 12.783 px hacia arriba, dentro de la banda libre del recorrido. No se trasladaron ni escalaron perros individualmente. Los pies se separan del suelo en la suspensión; f3, f6 y f7 aportan apoyos. Las referencias corresponden al galope retocado 07-run del commit da63a48 de mayo-3d. La sombra permanece en el suelo; no se incluye ningún camino, piedra ni poste dentro del alpha.


## 70-mayo-works-v3: galope frontal de tres cuartos

Doce celdas, dos zancadas, ciclo cerrado f12→f1. Mayo avanza hacia la izquierda y unos 30 grados hacia la cámara; se ven el pecho y ambos ojos. No es el perfil lateral de v2. El desplazamiento y el escalado por profundidad corresponden al consumidor; la tira se pinta en el lugar. Se conservan los assets anteriores.

### Recorte y montaje

Placa original `45-isla5-escritorio-v2.png`, 1672x941. Recorte `(left,top,width,height)=(786,467,134,134)` px: `(47.009569 %, 49.628055 %, 8.014354 %, 14.240170 %)` de placa. Tamaño de celda sobre placa: `8.014354 %` de ancho; misma escala natural del collie de works-v2, no escala del árbol.
Ancla de referencia de suelo: placa `(852.720,571.520)` px = `(51.000000 %, 60.735388 %)`, celda `(318.663,499.200)` px. Normalización autorizada: traslación vertical ÚNICA de `-25` px sobre 1024 (`-15.625` px sobre 640), aplicada por igual a Mayo y sombra en TODOS los frames; sin escalado individual, deformación de patas ni realineación por frame. Referencia nominal de suelo: 78 %, y=499.2/640; pequeñas variaciones de las patas corresponden a postura y perspectiva.

### Método y controles

Edición con `image_gen` integrado sobre el recorte original ampliado a 1024 por Lanczos. Identidad de `70-mayo-hoja-estilo.png`, iluminación cálida del atardecer. En el galope se adjuntaron poses de las primeras seis celdas de works-v2 y keyframes 07-run del commit `da63a48` de mayo-3d, adaptadas a la vista frontal. Las continuaciones usan recorte limpio, f1 original, frame anterior y referencia de pose/identidad. El reposo cambia las patas antes de detenerlas y luego solo gira la cabeza.

Extracción guiada por diferencia contra el recorte limpio, matte local BiRefNet, refinado de bordes y descontaminación. Sombra semitransparente como oscurecimiento suave sin textura de suelo. Se descarta la deriva de fondo del generador: no se arrastran piedras, postes, camino ni césped al alpha. Fuera del alpha, recomposición contra el recorte original con RGB máximo de diferencia 0 en cada frame. Sobre oscuro se revisaron las siluetas, patas, huecos y ausencia de fragmentos estáticos; en placa completa se revisaron escala y contacto. Dimensiones, alpha, orden numérico y celdas de la tira verificados por comparación de píxeles.

El coordinador autorizó terminar con las distancias de apoyo medidas en vez de declarar 5.5 % exacto. Para mantener el apoyo trasero estable en la segunda zancada se reutilizan f4→f10 y f5→f11: 12 celdas y 10 poses distintas, sin inventar cuadros nuevos. El resto conserva los cambios de la segunda zancada. La tabla siguiente es la calibración que debe usar el consumidor.

| Frame | Fase | Punta apoyada x/y, celda 640 | Delta x desde frame previo | Delta / ancho de celda |
|---|---|---|---|---|
| f1 | delantera, inicio | 190.625 / 497.500 | no comparable: nueva pata o suspensión | — |
| f2 | delantera, barrido | 231.875 / 501.875 | 41.250 px | 6.445312 % |
| f3 | suspensión recogida | — | no comparable: nueva pata o suspensión | — |
| f4 | trasera, inicio | 383.125 / 500.625 | no comparable: nueva pata o suspensión | — |
| f5 | trasera, impulso | 428.125 / 491.875 | 45.000 px | 7.031250 % |
| f6 | suspensión extendida | — | no comparable: nueva pata o suspensión | — |
| f7 | delantera, inicio | 188.750 / 499.375 | no comparable: nueva pata o suspensión | — |
| f8 | delantera, barrido | 226.250 / 504.375 | 37.500 px | 5.859375 % |
| f9 | suspensión recogida | — | no comparable: nueva pata o suspensión | — |
| f10 | trasera, inicio (f4) | 383.125 / 500.625 | no comparable: nueva pata o suspensión | — |
| f11 | trasera, impulso (f5) | 428.125 / 491.875 | 45.000 px | 7.031250 % |
| f12 | suspensión extendida | — | no comparable: nueva pata o suspensión | — |

Medición: centro horizontal de los últimos cuatro píxeles opacos de la punta clara, dentro de la región de la pata identificada, después de la traslación común. Error visual aproximado ±2 px de celda por pelo/antialiasing. El signo positivo es hacia atrás en el cuerpo: a la derecha de la celda. No se presenta un delta entre patas distintas como si fuera una velocidad física.

### Error de recomposición

MAE RGB en escala 0–255. `Bruto` corresponde a la extracción antes de normalizar posición; `Final/bruto` incluye el desplazamiento vertical autorizado y la deriva descartada del fondo. `Exportación` compara el sprite 640 con la escena de fondo original restituido y la misma normalización. Ninguno de los valores pequeños de exportación demuestra una recomposición exacta del bruto del generador.

| Frame | Bruto | Final/bruto | Exportación normalizada |
|---|---|---|---|
| f1 | 8.154630 | 17.565070 | 0.034385 |
| f2 | 9.728221 | 19.467814 | 0.039810 |
| f3 | 10.228889 | 19.169789 | 0.032126 |
| f4 | 9.502696 | 19.139663 | 0.035045 |
| f5 | 9.181969 | 20.690622 | 0.043177 |
| f6 | 9.499832 | 21.938132 | 0.041899 |
| f7 | 9.400545 | 19.481571 | 0.040285 |
| f8 | 9.755209 | 19.550528 | 0.035673 |
| f9 | 9.298149 | 18.167117 | 0.032836 |
| f10 | 9.502696 | 19.139663 | 0.035045 |
| f11 | 9.181969 | 20.690622 | 0.043177 |
| f12 | 9.853767 | 21.933097 | 0.045217 |

PNG RGBA8; AVIF calidad85; WebP con pérdida calidad82, alpha-quality100. Preview 1x del recorte, 10 fps: 12 frames con repetición del ciclo. Sin test de aplicación/build por ser assets pasivos; montaje, recorrido CSS y aceptación humana quedan en el coordinador. Sin cambios en src/dependencias/placas ni push/merge/deploy.

| Archivo | Rol | Tamaño | Alpha | Bbox/método |
|---|---|---|---|---|
| 70-mayo-works-v3-f1.png | character-frame | 640x640 | Sí | [150, 69, 615, 508]; extracción y normalización descritas |
| 70-mayo-works-v3-f2.png | character-frame | 640x640 | Sí | [131, 53, 615, 526]; extracción y normalización descritas |
| 70-mayo-works-v3-f3.png | character-frame | 640x640 | Sí | [136, 106, 615, 528]; extracción y normalización descritas |
| 70-mayo-works-v3-f4.png | character-frame | 640x640 | Sí | [127, 129, 615, 525]; extracción y normalización descritas |
| 70-mayo-works-v3-f5.png | character-frame | 640x640 | Sí | [79, 112, 615, 530]; extracción y normalización descritas |
| 70-mayo-works-v3-f6.png | character-frame | 640x640 | Sí | [44, 73, 615, 527]; extracción y normalización descritas |
| 70-mayo-works-v3-f7.png | character-frame | 640x640 | Sí | [118, 49, 615, 527]; extracción y normalización descritas |
| 70-mayo-works-v3-f8.png | character-frame | 640x640 | Sí | [136, 92, 615, 528]; extracción y normalización descritas |
| 70-mayo-works-v3-f9.png | character-frame | 640x640 | Sí | [151, 82, 615, 509]; extracción y normalización descritas |
| 70-mayo-works-v3-f10.png | character-frame | 640x640 | Sí | [127, 129, 615, 525]; extracción y normalización descritas |
| 70-mayo-works-v3-f11.png | character-frame | 640x640 | Sí | [79, 112, 615, 530]; extracción y normalización descritas |
| 70-mayo-works-v3-f12.png | character-frame | 640x640 | Sí | [50, 79, 615, 525]; extracción y normalización descritas |
| 70-mayo-works-v3-tira.png | character-strip | 7680x640 | Sí | 12 celdas numéricas |
| 70-mayo-works-v3-tira.avif | character-strip | 7680x640 | Sí | 12 celdas numéricas |
| 70-mayo-works-v3-tira.webp | character-strip | 7680x640 | Sí | 12 celdas numéricas |
| 70-mayo-works-v3-preview.gif | QA preview | 134x134 | No | fondo original, 1x |


## 70-mayo-works-llegada: llegada y reposo

Ocho frames de una sola pasada: galope, trote corto, frenado, parada sobre la piedra delantera y mirada hacia la cámara. f8 queda de pie, adecuado para el estado final y reduced motion. f1 toma como referencia la primera postura de apoyo de works-v3. El desplazamiento y el escalado por profundidad corresponden al consumidor; la tira se pinta en el lugar. Se conservan los assets anteriores.

### Recorte y montaje

Placa original `45-isla5-escritorio-v2.png`, 1672x941. Recorte `(left,top,width,height)=(694,513,134,134)` px: `(41.507177 %, 54.516472 %, 8.014354 %, 14.240170 %)` de placa. Tamaño de celda sobre placa: `8.014354 %` de ancho; misma escala natural del collie de works-v2, no escala del árbol.
Ancla de referencia de suelo: placa `(760.760,617.520)` px = `(45.500000 %, 65.623804 %)`, celda `(318.854,499.200)` px. Normalización autorizada: traslación vertical ÚNICA de `-51` px sobre 1024 (`-31.875` px sobre 640), aplicada por igual a Mayo y sombra en TODOS los frames; sin escalado individual, deformación de patas ni realineación por frame. Referencia nominal de suelo: 78 %, y=499.2/640; pequeñas variaciones de las patas corresponden a postura y perspectiva.

### Método y controles

Edición con `image_gen` integrado sobre el recorte original ampliado a 1024 por Lanczos. Identidad de `70-mayo-hoja-estilo.png`, iluminación cálida del atardecer. En el galope se adjuntaron poses de las primeras seis celdas de works-v2 y keyframes 07-run del commit `da63a48` de mayo-3d, adaptadas a la vista frontal. Las continuaciones usan recorte limpio, f1 original, frame anterior y referencia de pose/identidad. El reposo cambia las patas antes de detenerlas y luego solo gira la cabeza.

Extracción guiada por diferencia contra el recorte limpio, matte local BiRefNet, refinado de bordes y descontaminación. Sombra semitransparente como oscurecimiento suave sin textura de suelo. Se descarta la deriva de fondo del generador: no se arrastran piedras, postes, camino ni césped al alpha. Fuera del alpha, recomposición contra el recorte original con RGB máximo de diferencia 0 en cada frame. Sobre oscuro se revisaron las siluetas, patas, huecos y ausencia de fragmentos estáticos; en placa completa se revisaron escala y contacto. Dimensiones, alpha, orden numérico y celdas de la tira verificados por comparación de píxeles.

### Error de recomposición

MAE RGB en escala 0–255. `Bruto` corresponde a la extracción antes de normalizar posición; `Final/bruto` incluye el desplazamiento vertical autorizado y la deriva descartada del fondo. `Exportación` compara el sprite 640 con la escena de fondo original restituido y la misma normalización. Ninguno de los valores pequeños de exportación demuestra una recomposición exacta del bruto del generador.

| Frame | Bruto | Final/bruto | Exportación normalizada |
|---|---|---|---|
| f1 | 8.728847 | 23.028947 | 0.039981 |
| f2 | 8.273025 | 22.846051 | 0.042598 |
| f3 | 9.063211 | 24.020061 | 0.041036 |
| f4 | 9.054668 | 22.850794 | 0.040716 |
| f5 | 8.881474 | 21.684097 | 0.038165 |
| f6 | 9.229492 | 21.434027 | 0.037669 |
| f7 | 9.171087 | 21.579693 | 0.036160 |
| f8 | 9.073545 | 21.372182 | 0.037847 |

PNG RGBA8; AVIF calidad85; WebP con pérdida calidad82, alpha-quality100. Preview 1x del recorte, 10 fps: 8 frames en orden, una sola pasada y pausa final de 1.5 s; no ping-pong. Sin test de aplicación/build por ser assets pasivos; montaje, recorrido CSS y aceptación humana quedan en el coordinador. Sin cambios en src/dependencias/placas ni push/merge/deploy.

| Archivo | Rol | Tamaño | Alpha | Bbox/método |
|---|---|---|---|---|
| 70-mayo-works-llegada-f1.png | character-frame | 640x640 | Sí | [115, 48, 577, 506]; extracción y normalización descritas |
| 70-mayo-works-llegada-f2.png | character-frame | 640x640 | Sí | [107, 78, 578, 512]; extracción y normalización descritas |
| 70-mayo-works-llegada-f3.png | character-frame | 640x640 | Sí | [97, 130, 597, 506]; extracción y normalización descritas |
| 70-mayo-works-llegada-f4.png | character-frame | 640x640 | Sí | [97, 78, 596, 505]; extracción y normalización descritas |
| 70-mayo-works-llegada-f5.png | character-frame | 640x640 | Sí | [96, 77, 536, 509]; extracción y normalización descritas |
| 70-mayo-works-llegada-f6.png | character-frame | 640x640 | Sí | [104, 76, 510, 509]; extracción y normalización descritas |
| 70-mayo-works-llegada-f7.png | character-frame | 640x640 | Sí | [105, 77, 508, 508]; extracción y normalización descritas |
| 70-mayo-works-llegada-f8.png | character-frame | 640x640 | Sí | [105, 73, 497, 509]; extracción y normalización descritas |
| 70-mayo-works-llegada-tira.png | character-strip | 5120x640 | Sí | 8 celdas numéricas |
| 70-mayo-works-llegada-tira.avif | character-strip | 5120x640 | Sí | 8 celdas numéricas |
| 70-mayo-works-llegada-tira.webp | character-strip | 5120x640 | Sí | 8 celdas numéricas |
| 70-mayo-works-llegada-preview.gif | QA preview | 134x134 | No | fondo original, 1x |


## 70-mayo-works-salto: salto corto entre peldaños

Seis celdas de una sola pasada: preparación, despegue, vuelo, aterrizaje, asentamiento y pose de pie. Vista frontal izquierda de tres cuartos, luz del atardecer. El movimiento entre las seis piedras lo controla el consumidor: no se hornea en la tira la distancia de 0.3–1.1 celdas del recorrido.

### Recorte y continuidad

Fuente `45-isla5-escritorio-v2.png`, 1672x941. Recorte `(left,top,width,height)=(724,486,134,134)` px = `(43.301435 %, 51.647184 %, 8.014354 %, 14.240170 %)` de placa. Centro horizontal 47.308612 %; referencia de suelo `(790.856,590.520)` px = `(47.300000 %, 62.754516 %)`, cerca de piedra 3 (47.3 % / 62.8 %). Celda de montaje `(319.312,499.2)` px, suelo nominal 78 %. Escala: 134 px de placa, 8.014354 % de ancho, igual a las otras tiras de isla 5.

f1–f5 se editaron sobre el recorte original ampliado a 1024 por Lanczos, con hoja de identidad y referencia de works-llegada. Las continuaciones usaron recorte, f1, frame anterior y pose objetivo; se corrigió la altura de vuelo para mantener las orejas dentro del encuadre. Extracción por diferencia y matte local BiRefNet, borde refinado y descontaminado, sombra suave semitransparente sin textura del suelo. Traslación vertical común de −51 px/1024 (−31.875 px/640) para situar el suelo en 78 %, sin escalado por frame.

f6 reutiliza EXACTAMENTE el matte de works-llegada f8, con la misma normalización. La igualdad RGBA de `70-mayo-works-salto-f6.png` y `70-mayo-works-llegada-f8.png` fue comprobada píxel a píxel: no se intenta aproximar otra vez la pose con generación. La celda 6 de la tira PNG también coincide. En AVIF/WebP, la codificación con pérdida puede introducir variaciones mínimas; el empalme exacto corresponde al maestro PNG.

### Desplazamiento horizontal por frame

Medición reproducible: centroide de los píxeles corporales con alpha >240/255, sin sombra semitransparente; x sobre celda 640. Delta respecto del frame anterior dividido por 640. Signo negativo: izquierda. Esta es la deriva aparente de la silueta, influida por cambios de postura, cabeza y cola; no es una medida de un root 3D ni una traslación extra que deba sumarse sin criterio al recorrido CSS.

| Frame | Fase | Centro x (px / % celda) | Delta x (% celda) | En el aire |
|---|---|---|---|---|
| f1 | preparación agachada | 315.207 / 49.251067 % | +0.000000 % | No |
| f2 | despegue | 297.953 / 46.555227 % | -2.695840 % | Sí |
| f3 | vuelo recogido | 305.035 / 47.661723 % | +1.106496 % | Sí |
| f4 | aterrizaje | 305.548 / 47.741917 % | +0.080194 % | No |
| f5 | asentamiento | 279.874 / 43.730250 % | -4.011668 % | No |
| f6 | de pie, empalme | 274.833 / 42.942696 % | -0.787553 % | No |

Frames aéreos: f2 y f3. f2 deja atrás el apoyo trasero; f3 recoge las cuatro patas y muestra separación clara respecto de la piedra. f4 recupera contacto, f5 absorbe el movimiento y f6 permanece de pie. No se añade desplazamiento de cámara o del fondo.

### Verificación y error

Siluetas y huecos entre patas revisados sobre oscuro; contacto revisado sobre la placa original. El generador deriva el fondo, en especial f4/f5; se descarta ese fondo. Ninguna piedra, poste, césped o textura de camino entra en el alpha. Máximo RGB de diferencia fuera del alpha en cada recomposición normalizada: 0. Se verificaron seis celdas de 640, alpha, bordes transparentes, orden numérico y tira de 3840x640. Preview 134x134 a 1x, 10 fps, sin extensión de repetición y con pausa final de 1.5 s.

MAE RGB /255: bruto antes de traslación; final contra bruto después de la traslación y restauración del fondo; exportación contra la escena normalizada con fondo original. No se afirma recomposición exacta del bruto. f6 no tiene bruto de generación: es una referencia determinista reutilizada, por lo que esos errores no aplican.

| Frame | Bruto | Final/bruto | Exportación normalizada |
|---|---|---|---|
| f1 | 10.340413 | 20.440576 | 0.028291 |
| f2 | 9.542122 | 19.620228 | 0.030132 |
| f3 | 10.990233 | 20.543781 | 0.026375 |
| f4 | 34.078721 | 45.011942 | 0.039088 |
| f5 | 33.439325 | 44.378238 | 0.043228 |
| f6 | no aplica | no aplica | 0.037715 |

PNG RGBA8, tira AVIF85 y WebP82 con pérdida, alpha-quality100. Sin cambios en src/dependencias ni placas anteriores; sin build/test de aplicación por tratarse de assets pasivos. El montaje de los saltos, profundidad y aceptación humana corresponde al coordinador. Sin push/merge/deploy.

| Archivo | Rol | Tamaño | Alpha | Bbox/método |
|---|---|---|---|---|
| 70-mayo-works-salto-f1.png | character-frame | 640x640 | Sí | [103, 222, 528, 550]; método anterior |
| 70-mayo-works-salto-f2.png | character-frame | 640x640 | Sí | [137, 60, 502, 549]; método anterior |
| 70-mayo-works-salto-f3.png | character-frame | 640x640 | Sí | [126, 52, 502, 550]; método anterior |
| 70-mayo-works-salto-f4.png | character-frame | 640x640 | Sí | [58, 176, 539, 550]; método anterior |
| 70-mayo-works-salto-f5.png | character-frame | 640x640 | Sí | [60, 69, 508, 550]; método anterior |
| 70-mayo-works-salto-f6.png | character-frame | 640x640 | Sí | [105, 73, 497, 509]; método anterior |
| 70-mayo-works-salto-tira.png | character-strip | 3840x640 | Sí | 6 celdas, f6 igual al maestro de llegada f8 |
| 70-mayo-works-salto-tira.avif | character-strip | 3840x640 | Sí | 6 celdas, f6 igual al maestro de llegada f8 |
| 70-mayo-works-salto-tira.webp | character-strip | 3840x640 | Sí | 6 celdas, f6 igual al maestro de llegada f8 |
| 70-mayo-works-salto-preview.gif | QA preview | 134x134 | No | one-shot sobre recorte original |


## Selector de casos: flor, brote y mariposa pintados

Tres ilustraciones originales para «Elegí tu caso», en sustitución de los recortes de plantas. No contienen texto ni una tarjeta horneada. Paleta y superficies pintadas del mundo de islas, referenciadas a `30-isla2-escritorio-v2.png` y `70-mayo-hoja-estilo.png`; luz de mañana desde arriba a la izquierda.

### Generación y montaje

Generación con `image_gen` integrado sobre fondo magenta puro, seguida de chroma key local. Flor: margarita de pétalos marfil y centro dorado, tallo verde con dos hojas y pequeño pie de musgo/tierra. Brote: cuatro hojas verdes, botón central nuevo y pie compacto. Mariposa: vista de tres cuartos en vuelo, alas azul cielo/turquesa con bordes miel, puntos crema y venas marrones. Sin rosa, violeta ni magenta en los sujetos para permitir el key. Las superficies conservan trazos suaves y volumen orgánico, no un icono plano.

Flor y brote: base de apoyo centrada en x=256, y=450.5 px de celda 512 (87.988281 %, referencia solicitada 88 %); la sombra semitransparente se prolonga unos 13 px por debajo. Se ajustó el lienzo completo, sin deformar las plantas: flor (+14,−43) px y brote (+10,+6) px sobre el bruto 1024 antes de reducir por Lanczos. La sombra pintada se conserva como oscurecimiento verde/marrón suave, con caída hacia abajo/derecha; no incluye un rectángulo de suelo. Permite anclar la base dentro del rebaje y hacer sobresalir la parte superior de la tarjeta.

Mariposa: cinco poses de aleteo suave, con f1 como ancla de color, proporciones y encuadre; cada edición adjunta f1 original y frame anterior. Direcciones de pose: f1 alas abiertas, f2 elevación leve (~10°), f3 media (~20°), f4 mayor (~30°), f5 máxima del gesto (~40°), sin cerrar completamente. Los ángulos son instrucciones artísticas, no mediciones de una escena 3D. No lleva sombra de suelo porque está en vuelo. Orden de tira: f1..f5, 5 celdas 512; reproducción ping-pong recomendada f1,f2,f3,f4,f5,f4,f3,f2 (8 pasos, extremos no duplicados). El preview usa 130 ms por paso, ciclo total 1.04 s. `34-isla2-mariposa.png` coincide píxel a píxel con f1 y sirve como estado estático/reduced motion.

### Key, formatos y controles

Key de magenta por dominancia de R/B respecto a G; alpha de borde reconstruido por proyección contra el color del primer plano próximo. Descontaminación de color en el borde y eliminación del spill magenta, incluidos tonos oscuros alrededor de la tierra. Sombra de flor/brote extraída por oscurecimiento del fondo magenta dentro de una región suave bajo el pie, convertida a alpha y tinta vegetal: no se conserva el magenta del bruto. PNG RGBA8 a 512; tira 2560x512. AVIF calidad85 y WebP con pérdida calidad82, alpha-quality100, de CADA PNG entregado.

Revisión sobre fondo claro y oscuro a 100 %: pétalos, hojas, antenas, huecos y patas sin halo magenta ni caja opaca. Cero píxeles magenta de alta dominancia con alpha>40 en los maestros según el detector de key; bordes exteriores de 8 px completamente transparentes. Se comprobaron dimensiones/alpha de los 27 archivos de imagen, igualdad numérica de las cinco celdas de la tira, coincidencia base=f1 y preview ping-pong de 8 frames. El pie de flor/brote queda en 88 %; la mariposa no tiene ancla de suelo. Sin cambios en src/dependencias ni reemplazo de assets anteriores; sin test de aplicación/build por tratarse de imágenes pasivas. El montaje en tarjetas y la aceptación humana corresponden al coordinador; sin push/merge/deploy.

Bbox PNG: `(left,top,right,bottom)`, límites derecho/inferior exclusivos; incluye sombra en flor/brote.

| Archivo | Rol | Tamaño px | Alpha | Bbox / método |
|---|---|---|---|---|
| 34-isla2-flor.png | case-picker-illustration | 512x512 | Sí | [137, 18, 380, 463]; generación + key descritos |
| 34-isla2-flor.avif | case-picker-illustration | 512x512 | Sí | [137, 18, 380, 463]; generación + key descritos |
| 34-isla2-flor.webp | case-picker-illustration | 512x512 | Sí | [137, 18, 380, 463]; generación + key descritos |
| 34-isla2-brote.png | case-picker-illustration | 512x512 | Sí | [75, 105, 437, 464]; generación + key descritos |
| 34-isla2-brote.avif | case-picker-illustration | 512x512 | Sí | [75, 105, 437, 464]; generación + key descritos |
| 34-isla2-brote.webp | case-picker-illustration | 512x512 | Sí | [75, 105, 437, 464]; generación + key descritos |
| 34-isla2-mariposa.png | case-picker-illustration | 512x512 | Sí | [46, 61, 465, 402]; generación + key descritos |
| 34-isla2-mariposa.avif | case-picker-illustration | 512x512 | Sí | [46, 61, 465, 402]; generación + key descritos |
| 34-isla2-mariposa.webp | case-picker-illustration | 512x512 | Sí | [46, 61, 465, 402]; generación + key descritos |
| 34-isla2-mariposa-f1.png | case-picker-animation-frame | 512x512 | Sí | [46, 61, 465, 402]; generación + key descritos |
| 34-isla2-mariposa-f1.avif | case-picker-animation-frame | 512x512 | Sí | [46, 61, 465, 402]; generación + key descritos |
| 34-isla2-mariposa-f1.webp | case-picker-animation-frame | 512x512 | Sí | [46, 61, 465, 402]; generación + key descritos |
| 34-isla2-mariposa-f2.png | case-picker-animation-frame | 512x512 | Sí | [48, 52, 461, 389]; generación + key descritos |
| 34-isla2-mariposa-f2.avif | case-picker-animation-frame | 512x512 | Sí | [48, 52, 461, 389]; generación + key descritos |
| 34-isla2-mariposa-f2.webp | case-picker-animation-frame | 512x512 | Sí | [48, 52, 461, 389]; generación + key descritos |
| 34-isla2-mariposa-f3.png | case-picker-animation-frame | 512x512 | Sí | [82, 44, 429, 376]; generación + key descritos |
| 34-isla2-mariposa-f3.avif | case-picker-animation-frame | 512x512 | Sí | [82, 44, 429, 376]; generación + key descritos |
| 34-isla2-mariposa-f3.webp | case-picker-animation-frame | 512x512 | Sí | [82, 44, 429, 376]; generación + key descritos |
| 34-isla2-mariposa-f4.png | case-picker-animation-frame | 512x512 | Sí | [85, 41, 417, 374]; generación + key descritos |
| 34-isla2-mariposa-f4.avif | case-picker-animation-frame | 512x512 | Sí | [85, 41, 417, 374]; generación + key descritos |
| 34-isla2-mariposa-f4.webp | case-picker-animation-frame | 512x512 | Sí | [85, 41, 417, 374]; generación + key descritos |
| 34-isla2-mariposa-f5.png | case-picker-animation-frame | 512x512 | Sí | [96, 25, 397, 370]; generación + key descritos |
| 34-isla2-mariposa-f5.avif | case-picker-animation-frame | 512x512 | Sí | [96, 25, 397, 370]; generación + key descritos |
| 34-isla2-mariposa-f5.webp | case-picker-animation-frame | 512x512 | Sí | [96, 25, 397, 370]; generación + key descritos |
| 34-isla2-mariposa-tira.png | case-picker-animation-strip | 2560x512 | Sí | 5 celdas; bboxes individuales anteriores; generación + key descritos |
| 34-isla2-mariposa-tira.avif | case-picker-animation-strip | 2560x512 | Sí | 5 celdas; bboxes individuales anteriores; generación + key descritos |
| 34-isla2-mariposa-tira.webp | case-picker-animation-strip | 2560x512 | Sí | 5 celdas; bboxes individuales anteriores; generación + key descritos |
| 34-isla2-mariposa-preview.gif | QA preview | 512x512 | No | fondo crema, 8 pasos ping-pong |

# Client Readiness QA

Este paso responde una pregunta distinta a `npm run qa`:

> ¿Le mandaria esta landing a un negocio real sin pedir disculpas ni aclarar que es un prototipo?

## Comando

```powershell
npm run qa:client
```

Salida principal:

```text
generated/<sesion>/client-readiness-report.md
```

## Criterio de bloqueo

Una landing no esta lista para cliente si aparece cualquiera de estas senales:

- copy interno visible: `landing`, `template`, `editable`, `demo`, `placeholder`, `la pagina`, `sin inventar`
- placeholders crudos como `[X]`, `[Precio editable]` o textos que anuncian que falta contenido
- falta de `conversion_template`
- falta de `design_brief` con tesis visual, firma de layout, plan de assets y plan de IA segura
- la pagina no compensa fotos malas o datos pobres con imagenes genericas seguras, textura, proceso visual o microcopy de decision
- estructura demasiado fina: hero + contacto sin oferta, servicios, prueba visual, proceso y CTA final
- CTAs genericos o insuficientes
- varias landings con la misma estructura visible, aunque cambien colores
- problemas basicos de accesibilidad: imagenes sin `alt`, falta de responsive CSS, sin foco visible
- mobile correcto tecnicamente pero con ritmo de columna interminable y poco trabajado

## Juicio humano obligatorio

El validador es un filtro, no reemplaza criterio. Antes de cerrar una tanda:

1. Generar screenshots desktop y mobile.
2. Abrir una hoja de contacto o revisar cada sitio.
3. Clasificar:
   - `CLIENT_READY`: se puede enviar a un cliente potencial.
   - `INTERNAL_DEMO`: sirve para mostrar el sistema, no para entregar.
   - `REMAKE`: parece template, incompleta o con copy interno.
4. Rehacer cualquier sitio `REMAKE`.

## Arquetipos de conversion

Si la pagina se apoya en un template, debe elegirlo bien y ejecutarlo mejor:

- `hero-proof-offer`: promesa fuerte, prueba social arriba, foto dominante, oferta/opciones y CTA repetido.
- `editorial-local-story`: identidad local, oficio, direccion y relato breve antes de vender.
- `visual-menu`: productos/servicios como menu visual para elegir rapido.
- `service-diagnostic`: problema, datos a mandar, proceso y presupuesto a confirmar.
- `catalog-counter`: mostrador/catalogo, compatibilidad y disponibilidad a confirmar.
- `urgent-call-first`: telefono, zona, horario y urgencia antes de cualquier bloque largo.

La diferencia entre buen template y pagina mediocre es la ejecucion: jerarquia clara, imagen protagonista, copy natural, objeciones resueltas, mobile con ritmo y CTA util.

## IA segura para poblar paginas

Permitido:

- microcopy comercial, nombres de secciones, CTAs y prompts de imagen
- escenas genericas del rubro, texturas, proceso, herramientas, mostrador o producto sin marca
- placeholders visuales honestos para antes/durante/despues cuando faltan fotos reales

Prohibido:

- precios, stock, marcas, años de experiencia, premios, garantias, servicios o reseñas no verificadas
- presentar imagenes generadas como si fueran fotos reales del negocio
- mostrar texto interno como `demo`, `editable`, `placeholder`, `template`, `landing` o `creado con IA`

## Entrega comercial

Si la tanda queda `CLIENT_READY`, generar el estudio final antes de cerrar:

```powershell
npm run study:final -- --price "[PRECIO]"
```

Esto escribe `generated/<sesion>/final-study.md` y `generated/<sesion>/final-study.json` con landing, contacto recomendado, lead score, mini auditoria comercial, paquete de outreach, objeciones y mensaje de propuesta por negocio. El contacto se elige solo con datos disponibles: Instagram verificado, WhatsApp verificado/probable o telefono publicado.

## Golden sample

El mejor flujo es aprobar primero una landing como golden sample.

Procedimiento recomendado:

1. Elegir un negocio visualmente fuerte, por ejemplo detailing, wrapping, chapa/pintura o un comercio con buenas fotos.
2. Crear una landing completa solo para ese negocio.
3. Validarla con:

```powershell
npm run generate
npm run qa
npm run qa:client
```

4. Revisarla visualmente en desktop y mobile.
5. Cuando el usuario la apruebe, guardar screenshots en:

```text
output/screenshots/golden-samples/<run>/<slug>-desktop.png
output/screenshots/golden-samples/<run>/<slug>-mobile.png
```

6. Usarla como estandar de calidad para densidad comercial, naturalidad de copy, ritmo mobile, nivel visual y pulido. No copiarla literalmente.

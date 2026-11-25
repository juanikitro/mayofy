# Isla 4: extras con precio

Estado: implementado el 24 de noviembre de 2026 en la rama `juanikitro/landing-isla4-extras`. No está publicado.

## Qué decidió Juani

Sobre la propuesta (24 de noviembre de 2026):

> "1. Busca precios en internet 2. Me gusta el botón sumar 3. Déjalo como alcance y es un buen momento para sacarle el próximamente y añadirlo como un producto a vender"

1. Los precios se buscaron en internet (ver "Fuentes").
2. Cada extra tiene un botón "Sumar" y la isla arma la consulta.
3. "Automatizaciones sueltas" queda solo como un enlace a la isla 4, sin repetir la lista. El bot de WhatsApp y Telegram deja de ser "próximamente" y se vende.

## Qué cambió

- La isla 4 se llama "Extras para sumar a tu pack". Sus cuatro objetos pintados son cuatro grupos de extras: maceta, caja de herramientas, engranaje e invernadero. El engranaje tiene dos paneles (ver "Los paneles vuelven a desaparecer en la isla").
- Cada extra muestra el precio del trabajo de Mayofy en USD y un sello.
- Al final de la lista está "Tu consulta": suma lo elegido y arma el mensaje para WhatsApp.
- Debajo está el bot de WhatsApp y Telegram como producto, con sus dos niveles y un botón "Lo quiero" en cada uno.
- La opción del formulario de contacto, el JSON-LD y `llms.txt` muestran el bot como producto a la venta y los extras con su precio.
- "Automatizaciones sueltas" ya no tiene lista. Nunca fue un bloque propio: su lista eran los ítems de la isla 4 y su botón estaba en el engranaje. Ahora queda una sola línea debajo de las tarjetas de los packs (isla 3, después de "Cómo se paga"): "No hace falta un sistema completo para dejar de hacer una tarea a mano. Ver los extras y sus precios", con un enlace a la isla 4.

## Cómo se cobran los servicios externos

Mayofy cobra solo su trabajo. Los servicios externos se contratan a nombre del cliente y el proveedor se los cobra directo. La página nombra al proveedor y cómo cobra, nunca un monto.

| Sello | Qué significa |
|---|---|
| Precio cerrado | Solo trabajo de Mayofy. |
| Precio cerrado + servicio a tu nombre | Precio fijo de Mayofy. El servicio lo pagás directo al proveedor. |
| Desde | Depende del alcance. El precio final queda escrito en la propuesta, antes de empezar. |

Texto fijo bajo el total: "Los servicios externos quedan a tu nombre y te los cobra cada proveedor. Mayofy no les suma nada."

## Precios finales

**Maceta: que te encuentren más**

| Extra | Precio | Sello |
|---|---|---|
| Página extra por servicio o zona | USD 20 cada una (con cantidad, hasta 10) | Cerrado |
| Página para una promoción | USD 60 | Cerrado |
| Tu página en otro idioma | Desde USD 35 por idioma (con cantidad, hasta 5) | Desde |
| Aparecer en Google Maps | USD 35 | Cerrado. Google no cobra. |
| Medir qué anuncios te traen clientes (Meta y Google, hasta 3 acciones) | USD 45 | + servicio: lo que inviertas en anuncios lo pagás a Meta o Google |

**Caja de herramientas: que te escriban más fácil**

| Extra | Precio | Sello |
|---|---|---|
| Formulario a medida, con aviso por mail | USD 25 | Cerrado |
| Presupuesto que se calcula solo (hasta 5 opciones) | USD 60 | Cerrado |
| Cobro de señas con link de pago | USD 50 | + servicio: comisión de Mercado Pago por cada cobro |
| Cobro en tu página, con confirmación automática | USD 90 | + servicio: Mercado Pago |
| Catálogo de hasta 30 productos o servicios | USD 60 | Cerrado |

**Engranaje: que no se te escape ninguna consulta**

| Extra | Precio | Sello |
|---|---|---|
| Cada consulta guardada en una planilla | USD 20 | + servicio: Google Sheets, gratis con tu cuenta |
| Aviso por mail cuando entra algo | USD 15 | Cerrado |
| Respuesta automática por mail | USD 15 | Cerrado |
| Seguimiento de consultas en una planilla | USD 35 | Cerrado |
| Panel web de consultas | Desde USD 90 | Desde |
| Bot Esencial | USD 120 | + servicio: Meta cobra cada mensaje de WhatsApp |
| Bot Integrado | USD 250 | + servicio: Meta cobra cada mensaje de WhatsApp |

**Invernadero: conectarlo con lo que ya usás**

| Extra | Precio | Sello |
|---|---|---|
| Conectar con pagos o planillas que ya usás | Desde USD 40 | Desde |
| Facturación electrónica con ARCA | Desde USD 150 | Desde. Si hace falta un servicio de facturación, queda a tu nombre. |

Debajo del invernadero: "¿Necesitás todo esto junto?" con un enlace al pack Sistema a Medida (desde USD 450). No se suma desde la lista.

Los bots se excluyen entre sí: sumar uno quita el otro. El abono del bot (USD 30 por mes) no entra en el total.

## Fuentes

Investigación del coordinador, 24 de noviembre de 2026. Dólar de referencia: ARS 1.630.

- Hora freelance en Argentina para funciones extra: ARS 12.000 a 22.000 (FrandoWeb, octubre de 2026, https://frandoweb.com.ar/cuanto-cuesta-hacer-una-pagina-web).
- Landing de estudio chico: ARS 290.000 a 400.000; institucional: ARS 400.000 a 600.000 (Estudio Pixel Web, agosto de 2026, https://www.estudiopixelweb.com/blog/cuanto-cuesta-una-pagina-web-en-argentina/).
- Perfil de Google Maps, píxel de Meta y Google, bots y Mercado Pago: rangos de Fiverr, Workana y Freelancer.
- Comisiones de Mercado Pago y tarifas de WhatsApp Business: páginas de ayuda de Mercado Pago y precios de WhatsApp en developers.facebook.com. No se muestran en la página.

En Argentina casi nadie publica el precio de un extra suelto. La mayoría de los precios son estimaciones por horas (2 a 6 horas a la tarifa freelance baja), alineadas con el pack Landing de USD 85.

## Cómo funciona "Sumar"

- Los extras están en `src/content/extras.ts`: id, grupo, título, precio en USD, tipo (`fixed`, `fixed+service`, `from`), nota del proveedor y cantidad opcional.
- La cuenta y el mensaje son funciones puras en `src/lib/extras-request.ts`, con pruebas en `src/lib/extras-request.test.ts`.
- `src/components/world/extras-builder.tsx` tiene el botón "Sumar" (un "+" redondo con `aria-pressed`; su nombre accesible es "Sumar" y el extra), el contador de cantidad y "Tu consulta".
- "Tu consulta" ofrece el pack: Landing, Gestión, Sistema a Medida o "Todavía no sé". Los precios salen de `commercialPlans`.
- El total dice "Trabajo de Mayofy: USD X". Dice "desde" si hay un pack (sus precios son "desde") o un extra "desde".
- Muestra el mismo total en pesos al dólar blue del día, con el redondeo de los packs. Si no hay cotización, muestra "Se puede pagar en pesos.".
- Lista los servicios que quedan a nombre del cliente, cada uno una sola vez.
- El botón "Enviar la consulta por WhatsApp" abre WhatsApp con el pedido escrito. Ejemplo: "Hola, quiero consultar por: pack Gestión + 2 páginas extra por servicio o zona + Cobro de señas con link de pago. Trabajo de Mayofy estimado: desde USD 240."
- Al enviar se registra el evento `extras_request` (pack, cantidad de extras, total y si es "desde"). Respeta la opción de no medir.
- Cuando hay algo sumado, "Tu consulta" queda como una barra fija abajo mientras se lee la lista. Se abre en el lugar; en el celular, como una hoja desde abajo. No bloquea el scroll de la página. Escape la cierra.
- Una región `aria-live` lee el total después de cada cambio, no al recuperar la selección.
- La selección dura mientras la pestaña está abierta (`sessionStorage`). Si el navegador no lo permite, todo funciona igual.

### Los paneles vuelven a desaparecer en la isla

Pedido de Juani (24 de noviembre de 2026, después de probarlo en su Android): "quiero que los extras tengan el efecto que tenían antes, que desaparecían en la isla de los engranajes".

Con los precios, cada grupo medía casi una pantalla (791 a 1211 px de alto a 360x800). Por eso la primera versión de los extras cambió el efecto en el celular: paneles opacos que pasaban por encima de la isla y se desvanecían recién al salir de la pantalla, con 40svh entre grupos. Ahora vuelve el efecto de antes (el de `ad02c09`), en el celular y en la compu:

- En el celular, cada panel aparece desde abajo, queda entero bajo la isla y se desvanece al subir hacia ella: la misma animación de antes (`workshop-part-phone`: aparece hasta el 20 % de su recorrido, queda entero hasta el 36 % y desaparece al 46 %), 12svh entre paneles y el fondo translúcido de siempre. En la compu, el mismo atenuado de antes (`workshop-part`). Con movimiento reducido, los paneles quedan quietos y enteros, como antes.
- **Cómo entran las filas.** Cada extra ocupa una línea compacta: el título (hasta dos renglones), el precio con el sello debajo y un "+" redondo. El sello es una etiqueta corta del color de su tipo ("Cerrado", "+ Servicio", "Según alcance"). Al tocarla (o con hover o foco) se abre el `Toggletip` de siempre con el sello completo y qué significa, el límite del extra ("Hasta 5 opciones") y quién cobra el servicio externo. Nada se perdió: cada extra, precio, sello y nota del proveedor sigue en la página. La etiqueta mide 16 px y su zona táctil 24 px.
- **El engranaje tiene dos paneles.** Sus siete extras no entraban en un panel a 360x800. El primero ("Que no se te escape ninguna consulta") tiene los cinco extras de consultas; el segundo ("Un bot que responde por vos"), los dos bots. Los dos iluminan el engranaje y su pin. La división está en `src/content/workshop.ts` (`split`).
- **Altos a 360x800:** maceta 272 px, caja de herramientas 290, engranaje 293 y 137, invernadero 264. El espacio bajo la isla donde descansa cada panel mide 320 px.
- **"Tu consulta" en el celular.** Con algo sumado, la barra fija ocupaba dos renglones (unos 95 px) y tapaba las últimas filas. Ahora es un solo renglón: el título sobre el resumen y el botón al lado (62 px). Mientras se ve, el espacio donde descansa cada panel termina encima de la barra (`--workshop-zone-bottom: 90`).

## Cómo se verificó

- Pruebas unitarias del total y del mensaje (`npm test`), lint, typecheck y build.
- Playwright con `waitUntil: "domcontentloaded"` en 1440x900, 1366x768, 390x844, 360x800 y WebKit 390x844. En cada tamaño:
  - la isla queda fija y cada grupo ilumina su objeto y su pin;
  - sumar, quitar, cantidad, un solo bot, elección de pack;
  - total en USD y en pesos, la palabra "desde" y el texto del enlace de WhatsApp;
  - la hoja abierta no queda debajo del menú ni fuera de la pantalla;
  - la selección vuelve al recargar y no se lee en voz alta;
  - los "Lo quiero" del bot, sin "próximamente" en la página;
  - sin scroll horizontal y sin errores en la consola.
- El enlace "Ver los extras y sus precios" debajo de los packs lleva a la isla 4 (1440x900 y 390x844).
- Paneles de la isla 4 con el efecto restaurado (Playwright, cuadro por cuadro cada 5 % de pantalla, antes en `ad02c09` y después, en 1440x900, 1366x768, 390x844 y 360x800): cada panel tiene cuadros enteramente opacos con todas sus filas a la vista, también con "Tu consulta" fija abajo. En el lugar donde descansa cada panel después de un scroll guiado: opacidad 1, todas las filas visibles (por encima de la barra, si está) y su objeto iluminado, en los cuatro tamaños y en WebKit con emulación de iPhone 13. Movimiento reducido: paneles quietos y enteros.
- Recorrido solo con teclado en 1440x900: Tab hasta "Sumar", Enter, cantidad con Espacio, abrir "Tu consulta", elegir pack con flechas, "Quitar" (el foco pasa a la línea siguiente), enlace de WhatsApp y Escape (el foco vuelve a "Ver tu consulta").

## Límites

- Si se suma un extra con cantidad, el contador ocupa un renglón más en su panel. La maceta pasa a unos 320 px y, a 360x800 con "Tu consulta" fija, su última fila queda entera solo en un tramo corto del scroll.

- Con teclado, para llegar a "Tu consulta" hay que pasar por todos los "Sumar" de la lista.
- El abono mensual del bot y el mantenimiento no entran en el total.
- Los nombres y reglas de cobro de los proveedores cambian. Por eso el sello nombra al proveedor y nunca pone un monto.
- Un precio cerrado bajo puede atraer pedidos más grandes. Para eso están los límites escritos ("hasta 5 opciones", "hasta 30 productos").

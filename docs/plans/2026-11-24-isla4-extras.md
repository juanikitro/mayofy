# Isla 4: extras con precio (propuesta)

Estado: propuesta para que Juani decida. No hay nada implementado. Los precios son una sugerencia del coordinador, anclada en los precios actuales de los packs, y Juani los tiene que validar.

## Problema

La isla 4 repite lo que ya dicen otras partes de la página:

- Sus cuatro objetos listan casi las mismas cosas que el bloque "Automatizaciones sueltas" (`extensions` en `src/content/commercial-plans.ts`, que se muestra en `systems-island.tsx`).
- Esas cosas también aparecen en los "Incluye" de los packs.
- No dice cuánto cuesta nada: "Estas automatizaciones se cotizan según cada caso."

## Idea

La isla 4 pasa a ser **el menú de extras que se suman a un pack**. Cada extra tiene precio. Así contesta la pregunta que hoy queda abierta: "¿y si además quiero X?".

## Cómo manejar los servicios externos sin calcularlos

Mayofy cobra solo su trabajo. Los servicios externos nunca se revenden: se contratan **a nombre del cliente** y el proveedor se los cobra directo a él. Por eso no hace falta calcular ni actualizar sus precios.

Cada extra lleva uno de tres sellos:

| Sello | Qué significa | Ejemplo |
|---|---|---|
| **Precio cerrado** | Solo trabajo de Mayofy. Sin costos externos. | Página extra por zona |
| **Precio cerrado + servicio a tu nombre** | Mayofy lo configura por un precio fijo. El servicio lo pagás directo al proveedor, si cobra. Se nombra el proveedor sin poner un monto. | Cobro de señas con Mercado Pago (comisión de Mercado Pago por cada cobro) |
| **Desde** | Depende del alcance. El precio final queda escrito en la propuesta antes de empezar. | Conectar con tu sistema de facturación |

Texto fijo bajo la lista: "Los servicios externos quedan a tu nombre y te los cobra cada proveedor. Mayofy no les suma nada."

Así se evita lo difícil: Mayofy nunca promete un monto que no controla. El sello solo avisa que existe ese costo y quién lo cobra.

## Extras propuestos (precios a validar)

Los cuatro objetos de la isla se quedan como cuatro grupos.

**Maceta: que te encuentren más**

| Extra | Precio | Sello |
|---|---|---|
| Página extra por servicio o zona | USD 20 cada una | Cerrado |
| Página para una promoción | USD 25 | Cerrado |
| Tu página en otro idioma | USD 30 por idioma | Cerrado (vos revisás la traducción) |
| Aparecer en Google Maps (perfil de empresa) | USD 20 | Cerrado (Google no cobra) |
| Medir qué anuncios te traen clientes | USD 30 | + servicio: lo que inviertas en anuncios lo pagás a Meta o Google |

**Caja de herramientas: que te escriban más fácil**

| Extra | Precio | Sello |
|---|---|---|
| Formulario a medida | USD 25 | Cerrado |
| Presupuesto que se calcula solo (hasta 5 opciones) | USD 60 | Cerrado; más opciones: desde |
| Cobro de señas online | USD 40 | + servicio: comisión de Mercado Pago por cobro |
| Catálogo (hasta 30 productos o servicios) | USD 40 | Cerrado |

**Engranaje: que no se te escape ninguna consulta**

| Extra | Precio | Sello |
|---|---|---|
| Cada consulta guardada en una planilla | USD 25 | Cerrado (Google Sheets no cobra) |
| Aviso por mail cuando entra algo | USD 15 | Cerrado |
| Respuesta automática por mail | USD 20 | Cerrado |
| Lista de clientes y estado de cada consulta | USD 40 | Cerrado |
| Avisos automáticos por WhatsApp | Ver Bot de WhatsApp | + servicio: Meta cobra cada mensaje |

**Invernadero: conectarlo con lo que ya usás**

| Extra | Precio | Sello |
|---|---|---|
| Conectar con facturación, pagos o planillas que ya usás | Desde USD 80 | + servicio, si el proveedor cobra |
| ¿Necesitás todo esto junto? | Pasá a Sistema a Medida (USD 450) | — |

## Valor extra: armar la consulta

Cada extra tiene un botón "Sumar". La isla muestra:

- El pack elegido y los extras sumados.
- "Trabajo de Mayofy: USD X" (más "desde" si algún extra es variable).
- Los servicios externos que vas a tener a tu nombre.
- El precio en pesos con el dólar blue del día, igual que los packs.

El botón final abre WhatsApp con el mensaje ya escrito ("Quiero el pack Gestión + cobro de señas + aviso por mail"). No es un carrito ni un pago: es una consulta mejor armada. Juani recibe pedidos concretos y el visitante sabe el número antes de escribir.

## Cambios en la página

- El bloque "Automatizaciones sueltas" desaparece, o queda solo como un enlace a la isla 4. Así deja de repetirse el contenido.
- Mantenimiento: los extras de precio cerrado entran en el mantenimiento mensual del pack. Los que dependen de un servicio externo siguen a nombre del cliente.

## Decisiones abiertas para Juani

1. Validar o corregir cada precio.
2. Elegir entre "Sumar" con total, o solo la lista con precios.
3. Elegir entre eliminar "Automatizaciones sueltas" o dejarla como enlace.

## Riesgos

- Un precio cerrado bajo puede atraer pedidos que se agrandan. Para eso existen los límites escritos ("hasta 5 opciones", "hasta 30 productos").
- Los nombres y las reglas de cobro de los proveedores cambian. Por eso el sello nombra al proveedor y nunca pone un monto.

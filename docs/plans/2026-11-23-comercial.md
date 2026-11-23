# Lo comercial: cómo se cobra, precios en pesos y condiciones de venta

Pedido de Juani, 23 de noviembre de 2026: "Desplega otro agente especializado para el punto de lo comercial detras de la web. Sobre como cobro, quiero mostrar flexibilidad (ademas de eso, necesitaria alguna forma que se muestre actualizado el valor de mis precios de dolar a pesos (y en lo posible redondearlos) sin tener que crear un backend o algo que cueste plata para traer el valor del dolar). Sobre el whatsapp business, documenta que lo voy a hacer mas adelante"

Las decisiones se tomaron con Juani el mismo día, con preguntas de a una y una recomendación en cada una. Este documento registra qué se decidió, cómo funciona, cómo se verificó y qué queda pendiente.

## Decisiones

| # | Pregunta | Decisión | Palabras de Juani |
|---|---|---|---|
| 1 | ¿Qué dólar se usa para mostrar los precios en pesos? | Dólar blue, valor de venta. La recomendación era el oficial; Juani eligió el blue. | "utiliza el dolar blue" |
| 2 | ¿Cómo se redondea? | Hacia arriba, de a $5.000. Un pago en pesos nunca queda por debajo del precio en USD. | "hacia arriba de a 5k" |
| 3 | ¿Con qué medios se paga? | Transferencia (pesos o dólares), Mercado Pago (también tarjeta en cuotas, con el recargo a cargo del cliente), efectivo y USDT. | "si" |
| 4 | ¿En cuántas partes se paga? | Landing y Gestión: 50% al empezar y 50% en la entrega. Sistema a Medida: 30% al empezar y el resto por etapas, junto con cada entrega. | "me parece bien" |
| 5 | ¿Cómo paga un cliente fuera de Argentina? | En dólares, por transferencia o USDT. También por Wise, coordinándolo antes con Juani. | "si y suma wise (pero a contactar conmigo)" |
| 6 | Condiciones de venta | Aprobadas tal como se proponen más abajo. | "apruebo" |

Decidido sin preguntar, por ser una cuestión de diseño: los pesos se muestran en las tarjetas de los packs y en la recomendación de la isla 2. Las plataformas de la isla 3 siguen mostrando solo USD, porque son etiquetas chicas sobre la ilustración.

## Precios en pesos, siempre actualizados y sin costo

### Cómo funciona

- `src/lib/peso-prices.ts` pide el dólar blue a [dolarapi.com](https://dolarapi.com/v1/dolares/blue) (gratis, sin clave). Si no responde, lo pide a [bluelytics](https://api.bluelytics.com.ar/v2/latest).
- El pedido lo hace el servidor de Next que ya corre en Railway, con `next: { revalidate: 10800 }`. La página de inicio pasa a ser ISR: se genera con la cotización, queda en caché y cada 3 horas Next la regenera en segundo plano. El build muestra `○ /  3h`.
- Las personas que visitan la web nunca llaman a la API: reciben HTML ya generado. No hay backend nuevo, servicio pago ni JavaScript extra en el navegador.
- Cálculo: `ceil(USD × blue / 5.000) × 5.000`, con formato `$ 145.000`. Con el blue de $1.675 del 23/11: Landing $145.000, Gestión $255.000 y Sistema a Medida $755.000.
- El USD sigue siendo el precio base. El JSON-LD (`structured-data.ts`) publica solo USD y comparte con las tarjetas la función que lee el precio (`usdAmount`).

### Si la API falla

1. Se prueba la segunda fuente.
2. Si ninguna responde, se usa la última cotización buena que tuvo el servidor, siempre que tenga menos de 24 horas.
3. Si tampoco hay una, la tarjeta vuelve a la nota anterior: "Se puede pagar en pesos. El mantenimiento mensual es opcional." Y la isla 2 muestra solo el USD.

Los errores se capturan: un fallo de la API nunca rompe el build ni la página. Se descarta cualquier valor fuera del rango de $100 a $100.000, para que una respuesta rota no muestre un precio absurdo. Cada pedido corta a los 5 segundos.

### Qué se ve

| Dónde | Antes | Después |
|---|---|---|
| Tarjeta de cada pack, debajo del precio | Se puede pagar en pesos. El mantenimiento mensual es opcional. | ≈ **$ 145.000** al dólar blue de hoy / El mantenimiento mensual es opcional. |
| Isla 2, recomendación | Desde USD 85 · Plazo: 1 a 2 semanas | Desde USD 85 (≈ $ 145.000) · Plazo: 1 a 2 semanas |
| Debajo de las garantías | Pago: 50% al inicio y 50% en la entrega. Precios en USD; podés pagar en pesos al cambio del día. | Bloque "Cómo se paga" con cuatro líneas (abajo). |
| Pregunta "¿Cómo se paga?" | 50% al inicio y 50% en la entrega. Los precios están en USD y podés pagar en pesos al cambio del día. | Landing y Gestión, 50% al empezar y 50% en la entrega. Sistema a Medida, 30% al empezar y el resto por etapas. Podés pagar por transferencia, Mercado Pago (también en cuotas con tarjeta, con su recargo), efectivo o USDT. Los precios están en USD; si pagás en pesos, se toma el dólar blue del día del pago. Desde fuera de Argentina pagás en dólares, por transferencia, USDT o Wise. |

Bloque "Cómo se paga":

- Landing y Gestión: 50% al empezar y 50% en la entrega. Sistema a Medida: 30% al empezar y el resto por etapas, a medida que lo usás.
- Por transferencia, Mercado Pago (también en cuotas con tarjeta, con su recargo), efectivo o USDT.
- Los precios están en USD. Si pagás en pesos, se toma el dólar blue del día del pago.
- ¿Estás fuera de Argentina? Pagás en dólares, por transferencia o USDT. También por Wise, si lo coordinamos antes.

En el celular las líneas se alinean a la izquierda, cada una con un punto verde como las listas de los packs. En escritorio van centradas, como la nota que reemplazan.

## Condiciones de venta (aprobadas, para la página de términos)

Las aprobó Juani el 23/11/2026 y se pasan al agente de legales a través del coordinador para que escriba la página de términos.

1. **Propuesta escrita:** incluye el alcance, el precio en USD, el plazo y el cronograma de pagos. Vale 15 días.
2. **Pago en pesos:** se toma el dólar blue venta del día de cada pago. El monto en pesos de la web es una referencia.
3. **Inicio:** el trabajo arranca con el anticipo y el material del cliente (textos, fotos, accesos).
4. **Plazos:** son estimados y corren desde que llega el material. Si el cliente tarda en responder, el plazo se corre lo mismo que tardó.
5. **Vueltas de cambios:** Landing, 1 antes de publicar; Gestión, 2; Sistema a Medida, 1 por etapa. Lo que quede fuera del alcance se cotiza aparte.
6. **Entrega:** se publica con el saldo pagado. Después hay 1 semana de soporte.
7. **Propiedad:** con el pago completo, todo queda a nombre del cliente: dominio, cuentas y código. El trabajo se muestra en el portfolio de Mayofy solo si el cliente lo permite.
8. **Servicios de terceros:** el dominio, el alojamiento y las tarifas de Meta los paga el cliente.
9. **Mantenimiento:** es opcional, se paga cada mes por adelantado y se da de baja con 15 días de aviso. Los cambios que no se usan no se acumulan (ya figura en la web).
10. **Cancelación:** si cancela el cliente, el anticipo no se devuelve y se queda con lo entregado. Si cancela Mayofy, devuelve lo que corresponde a lo que no entregó.
11. **Proyecto sin respuesta:** si el cliente no responde en 30 días, el proyecto queda en pausa y para retomarlo se reprograma.

Medios y esquema de pago: los de la tabla de decisiones (3, 4 y 5).

## WhatsApp Business: queda para más adelante

Juani lo va a configurar más adelante. Lo hace él desde la app; ningún agente toca la cuenta. Cuando lo haga, conviene dejar esto:

- **Perfil de empresa:** nombre Mayofy, categoría (servicios de tecnología o diseño web), una descripción corta con la misma idea que el héroe de la web, horario de atención, `https://mayofy.dev` y el correo de contacto.
- **Catálogo:** un ítem por pack (Landing desde USD 85, Gestión desde USD 150, Sistema a Medida desde USD 450), uno por el mantenimiento mensual y uno por el bot "Próximamente". Cada ítem enlaza a su tarjeta (`https://mayofy.dev/#pack-landing`, `#pack-gestion`, `#pack-sistema`). Los precios en USD, como en la web, que es la que muestra los pesos actualizados.
- **Mensaje de bienvenida:** saludo, que respondés en menos de 24 h hábiles (la misma promesa de la web) y el enlace para agendar la charla gratis.
- **Mensaje de ausencia:** fuera de horario, con la misma promesa de respuesta.
- **Respuestas rápidas:** una por cada mensaje que la web deja escrito, para contestar al toque:
  - "Hola, quiero consultar por el pack Landing de Mayofy." → `/landing`
  - "Hola, quiero consultar por el pack Gestión de Mayofy." → `/gestion`
  - "Hola, quiero consultar por un Sistema a Medida de Mayofy." → `/sistema`
  - "Hola, quiero consultar por el mantenimiento mensual de Mayofy." → `/mantenimiento`
  - "Hola, quiero consultar por una automatización con Mayofy." → `/automatizacion`
  - el aviso del bot "Próximamente" y el saludo del héroe ("Hola Juani, quiero trabajar con Mayofy...")
  - y dos más: `/pagos`, con los medios y el esquema de pago de este documento, y `/pesos`, que explica que se toma el dólar blue del día del pago.
- **Etiquetas:** Nuevo contacto, Landing, Gestión, Sistema a Medida, Mantenimiento, Propuesta enviada, Anticipo pagado, Cliente, Postventa.
- **Coherencia con la web:** si cambia un texto de `whatsappMessage` en `src/content/commercial-plans.ts` o el `primaryMessage` de `src/content/site.ts`, hay que actualizar la respuesta rápida correspondiente. El número es el mismo de `src/lib/whatsapp.ts`.

## Verificación

- Funciones puras y fallas, probadas con un script fuera del repositorio que reemplaza `fetch`:
  - el redondeo (85, 150 y 450 a $1.675 dan $145.000, $255.000 y $755.000; un múltiplo exacto queda igual);
  - el formato `$ 145.000`;
  - las dos fuentes caídas sin cotización previa, que dejan solo el USD;
  - un valor basura de la primera fuente, que resuelve la segunda;
  - la segunda fuente, que no se llama si la primera responde;
  - las fuentes caídas después de una cotización buena, que reusan la última;
  - un valor absurdo, que se descarta;
  - el uso de `revalidate: 10800` y del corte por tiempo.
- `npm run typecheck` y `npx eslint src`: sin errores. `npm run build`: sin errores, `/` queda como `○` con revalidación cada 3 h. El HTML generado tiene los tres montos en pesos y el JSON-LD solo `priceCurrency: USD`.
- Navegador (Playwright, servidor de producción local), a 1440x900 y 390x844:
  - las tarjetas muestran "≈ $ 145.000 / $ 255.000 / $ 755.000 al dólar blue de hoy", y en escritorio las tres miden lo mismo (677 px);
  - la isla 2 muestra "Desde USD 85 (≈ $ 145.000) · Plazo: 1 a 2 semanas", y el plazo nunca se corta en dos renglones;
  - el bloque "Cómo se paga" tiene sus cuatro líneas;
  - sin scroll horizontal y sin errores de consola, también con movimiento reducido;
  - el teclado recorre los botones de las tarjetas en orden; el bloque nuevo no tiene controles.

## Límites y riesgos

- **"De hoy" puede tener hasta 3 horas de atraso.** Si las fuentes fallan, hasta 24 horas. El fin de semana el blue es el del viernes. Por eso el monto lleva "≈" y la condición 2 aclara que vale el blue del día del pago.
- **Fuentes gratuitas de terceros:** si dolarapi y bluelytics cambian su formato o dejan de existir, la web vuelve a mostrar solo USD; no se rompe. Para arreglarlo alcanza con cambiar la lista `sources` de `peso-prices.ts`.
- **ISR en Railway:** la página regenerada se guarda en el disco del contenedor. Con cada deploy se genera de nuevo en el build, así que no hay datos viejos que migrar.
- **La caída a solo USD no se probó en el navegador.** El script la cubre: la función devuelve `undefined` y los componentes muestran la nota anterior.
- **Archivos de otras áreas:** `problem-island.tsx` y `case-picker.tsx` son de la isla 2. El cambio es chico: una prop `pesoPrices` y un `<span>` en la línea del precio.
- **Pendiente:** la página de términos (agente de legales) y la configuración de WhatsApp Business (Juani, más adelante).

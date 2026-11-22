# Prueba de usuario simulada: Marta en mayofy.dev

Pedido de Juani, 20 de noviembre de 2026: "quiero que despliegues un agente especifico que simule ser un usuario real y normal, no tan habitue de la tecnologia, y analices la UX del scroll y en general".

Sitio probado: https://mayofy.dev en producción (rama `juanikitro/landing-redesign`, commit `b1d4042`), el 20/11/2026. Es una prueba **simulada**: la hizo un agente que actúa como la persona descripta abajo. No es una sesión con una persona real (ver "Límites" al final).

## Resumen

- **Lo más grave está en el scroll de la laptop.** Con un touchpad que manda movimientos chicos, Marta no logra pasar del héroe: en cada gesto la página vuelve arriba sola. Con la rueda, dos o tres muescas seguidas en el borde de una sección también rebotan, y en "Preguntas" rebotaron cuatro veces seguidas. En los dos casos la causa probable es la misma regla del acomodo por secciones (`section-snap.tsx`).
- **En el celular el acomodo ayuda más de lo que molesta**, pero tiene tres trampas. El calendario de la agenda es una caja con scroll propio que atrapa el dedo. La recomendación de la isla 2 (con su precio) cambia sola cada 5 s mientras Marta la lee. Y un deslizamiento corto después de elegir su caso la lleva a la isla siguiente.
- **"Atrás" está roto** si antes tocó cualquier enlace interno ("Ver packs", "Ver qué incluye", las patitas, "Agendá"). Vuelve la dirección de la landing, pero la pantalla sigue mostrando el caso de estudio. Pasa en celular y en laptop.
- Marta **sí encuentra el precio y cómo escribir**. Entiende tarde qué hacen (recién en la segunda o tercera pantalla) y no encuentra un trabajo parecido al suyo.

## La persona

**Marta, 54 años**, tiene una peluquería en un pueblo de la provincia de Buenos Aires. Usa WhatsApp todo el día, Facebook e Instagram un poco, y Mercado Pago. Toma los turnos por WhatsApp y los anota en un cuaderno. No es "de la tecnología": no sabe qué es una landing, un SaaS, un CRM ni el SEO. Lee despacio. La mayor parte del tiempo usa un Android de gama media; en casa, una laptop vieja de 1366x768 con una ruedita barata o el touchpad. Se enoja cuando una página "se mueve sola" o cuando no encuentra el precio. Le llegó el link de una prima: "estos te hacen la página y te ordenan los turnos".

Sus objetivos, con sus palabras:

1. "¿Qué hacen estos y me sirve a mí?"
2. "¿Cuánto sale?" (y qué pack es para ella)
3. "¿Hicieron algo parecido para otros?"
4. "¿Cómo les escribo o pido una reunión?"

## Método

Playwright 1.65 con Chromium 156 en modo headless, contra el sitio real. Cada pasada se grabó en video. Un script inyectado registró cada entrada (toque, rueda, tecla) y cada `window.scrollTo` del sitio. Así se separa lo que movió Marta de lo que movió la página sola. También se registraron los cuadros de más de 50 ms (tirones).

| Pasada | Dispositivo | Entrada | Duración |
|---|---|---|---|
| Celular A: recorrido libre | 360x800, `isMobile`, `hasTouch` | Deslizamientos con inercia real (toques por CDP), de 220 a 800 px y velocidades variadas; pausas de 2 a 5,5 s para leer; a veces dos seguidos, a veces vuelve para releer. Después sube hasta arriba. | 3 min 35 s |
| Celular B: objetivos | Igual | Toca lo que tocaría ella: su situación en la isla 2, "Ver qué incluye", un trabajo, "Atrás", el botón de WhatsApp, "Agendá", un día del calendario y "Prefiero completar un formulario". | 2 min |
| Celular C: 4G lento | Igual, con red de 9 Mbps de bajada, 1,5 Mbps de subida y 165 ms de latencia, y CPU 4 veces más lenta | Igual que la A | 4 min 10 s |
| Laptop rueda | 1366x768 | Muescas de 100 px: de 1 a 3 con 120 a 300 ms entre sí y después 2 a 6 s de lectura; a veces una ráfaga de 5 a 9 muescas. A mitad de camino, una ráfaga hacia arriba para releer precios. | 3 min 30 s |
| Laptop touchpad | 1366x768 | Gestos de 18 a 40 eventos de rueda de 5 a 30 px cada 16 ms (como un touchpad sin "precisión"), con pausas | 7 min 30 s |
| Laptop teclado | 1366x768 | Espacio y AvPág, como quien está cansada; después Mayús+Espacio y RePág | 1 min 15 s |
| Laptop menú | 1366x768 | Clic en Packs, Trabajos, Preguntas y Agendá; rueda sobre el calendario | 50 s |
| Repros puntuales | Los dos | Calendario en el celular, "Atrás" desde un caso, toquecito después de elegir el caso, tramos fijados (isla 3, isla 4, seis pasos) con y sin 4G lento, desvío del mensaje de WhatsApp (`curl`) | — |

Notas de método:

- `Input.synthesizeScrollGesture` con `gestureSourceType: "touch"` no movía ninguna página en este Chromium headless, ni siquiera una en blanco. Por eso los deslizamientos se mandaron como secuencias reales de `Input.dispatchTouchEvent` (apoyar, mover, soltar). Se verificó que el navegador les aplica inercia: un deslizamiento de 400 px en 80 ms recorre unos 800 px.
- Los `scrollTo` solo se usaron para preparar un repro (por ejemplo, ubicar la pantalla justo arriba del calendario), nunca como parte de la experiencia. Cada repro lo aclara.
- Una primera versión del registro tenía un error propio que mandaba la página arriba de todo. Se detectó comparando con una página en blanco, se corrigió, y todos los resultados de este informe son posteriores a la corrección.

## Resultados por objetivo

Tiempos de la pasada de objetivos en el celular (B). Incluyen las pausas de lectura que se programaron, así que valen para comparar, no como medida real.

| Objetivo | Éxito | Tiempo | Desvíos | Fricción principal |
|---|---|---|---|---|
| 1. ¿Qué hacen y me sirve? | **Sí, tarde** | 28 s, 3 deslizamientos | 0 en la pasada B; 1 en la primera corrida (se le fue la recomendación y tuvo que volver) | El héroe no dice para quién es ni nombra turnos. Recién la isla 2 ("Paso el día coordinando turnos por WhatsApp") le habla a ella. La recomendación cambia sola cada 5 s. |
| 2. ¿Cuánto sale? ¿Qué pack? | **Parcial** | 14 s (desde la recomendación) | 0 | Encuentra "Web + Gestión, desde USD 150" y que es para "centros de estética". Le quedan dudas: el precio está en dólares (lo de pagar en pesos está al final del bloque), "desde" no dice hasta cuánto, y el mantenimiento mensual aparece recién en la isla 7. Si no toca su caso, puede ver "USD 450" en la misma tarjeta. |
| 3. ¿Hicieron algo parecido? | **Parcial** | 50 s, 7 deslizamientos | 2 ("Atrás" no volvió y después volvió a otro lugar) | Los tres trabajos son un sistema para lavaderos, una landing para una consignataria de hacienda y el portfolio de un desarrollador. Ninguno es de turnos ni de un local como el de ella. Al volver del caso, "Atrás" falla. |
| 4. ¿Cómo les escribo o pido reunión? | **Sí** | 18 s | 0 | WhatsApp está siempre a mano y "Agendá" lleva al calendario. El calendario mezcla inglés ("Mayofy First Meeting", "7:00am"), en el celular es una caja con scroll propio, y el 👋 del mensaje armado llega como "�". |

En la laptop, con el menú de arriba, los cuatro objetivos se alcanzan rápido con un clic. Scrolleando con el touchpad, en cambio, no pasa del héroe (ver B1).

## Lo que pensó Marta, en orden

**Celular**

1. Carga: "Ah, abrió enseguida." El título es lo primero que se pinta, a los 1,3 s (2,5 s con 4G lento y CPU x4), sin pantalla en blanco larga (captura `c15`).
2. Héroe: "Webs que venden. Sistemas que ordenan... ¿sistemas de qué? ¿Esto es para mí o para empresas?" No ve nada de turnos ni de peluquerías. "¿Diagnóstico gratis? ¿Qué me van a diagnosticar?" El círculo con el logo de WhatsApp lo reconoce, pero no sabe si es para escribir o para compartir.
3. Primer deslizamiento corto: "¿Y ahora por qué se movió tanto?" Un deslizamiento de 320 px terminó en una pantalla entera de nubes, y otro de 444 px la dejó en la isla 2 (video `v07`, 0:02 y 0:08). Le parece lindo el perrito, pero no entiende para qué son las nubes.
4. Isla 2: "Construyamos tu lugar en internet... Bot de WhatsApp, turnos online, ¡eso!" Lee las tres situaciones. Mientras lee la recomendación "Landing, USD 85", la tarjeta cambia sola: "¿Eh? ¿Cambió? Ahora dice otra cosa". En la primera corrida pasó de "Web + Gestión USD 150" a "Sistema a Medida USD 450" (captura `c02`, video `v05`).
5. Toca "Paso el día coordinando turnos por WhatsApp": "Esa soy yo." Lee "Web + Gestión, desde USD 150, 3 a 9 semanas". Desliza un poquito para leer los botones y la página se va a otra isla, con rocas que caen: "¿Y lo que estaba leyendo? ¿Dónde quedó?" (captura `c03`, video `v06`).
6. "Ver qué incluye": la lleva a la tarjeta del pack. "Ideal para... centros de estética. Bueno, una peluquería es parecido." "Ver todo lo que incluye" da vuelta la tarjeta: "Turnos o reservas online, un panel, aviso por correo... ¿y por WhatsApp no me avisa?" (captura `c04`).
7. Bajando por la isla 4: "Meta Pixel, Google Business Profile, CRM, Google Sheets... no entiendo nada de esto." Cada deslizamiento la acomoda en una tarjeta, pero una se la saltea (de la 02 a la 04, captura `c11`).
8. Trabajos: "Lavaderos, hacienda, un desarrollador... ¿nada de peluquerías? ¿Nada con turnos?" Entra al de lavaderos (lo más parecido, porque tiene clientes y servicios) y aprieta "Atrás": "Sigo acá. ¿Se colgó?" (captura `c06`, video `v04`). Con un segundo "Atrás" vuelve a la página, pero en la isla 2 y con la recomendación de nuevo en "Landing": perdió su elección y el lugar donde estaba.
9. Seis pasos: "Seis pasos, sin sorpresas... ¿cuántas veces más tengo que bajar? El dibujo es siempre el mismo." Le lleva unos 10 deslizamientos, y uno se salteó el paso 5 (captura `c10`, video `v08`).
10. Contacto: "Soy Juani... ah, es una persona, eso me gusta." Toca el botón verde de WhatsApp y se abre WhatsApp con el mensaje armado. Toca "Agendá": aparece un calendario que dice "Mayofy First Meeting" y "7:00am". "¿First meeting? ¿Es en inglés esto?" Quiere seguir bajando y no puede: se mueve el calendario, no la página (captura `c07`, video `v03`). "¿Esto se trabó?"
11. "Prefiero completar un formulario": "Esto lo entiendo, como un formulario de Mercado Pago." Al bajar, el botón verde y la barra de patitas le tapan los campos (captura `c09`).

**Laptop**

1. Con el touchpad: "No baja. Bajo y vuelve arriba. Bajo y vuelve arriba." Intenta 110 veces en casi siete minutos (video `v01`). Una persona real se iría mucho antes o tocaría "Ver packs".
2. Con la ruedita va bien hasta el final de cada isla. Ahí, dos o tres muescas "rebotan": la página baja un poco y vuelve sola. En "Preguntas" le pasa cuatro veces seguidas: "¿Por qué no me deja bajar?" (video `v02`). Una sola muesca, en cambio, la lleva una pantalla entera.
3. En la isla 4 no puede leer la frase de abajo del título: la tapan los cartelitos "Seguimiento automático" y el dibujo (captura `c12`).
4. El menú de arriba (Packs, Trabajos, Preguntas, Agendá) funciona bien y es lo que más la ayuda.
5. Con Espacio o AvPág baja sin trabarse.

## Hallazgos por severidad

Las capturas y los videos están en `docs/plans/prueba-usuario/`. Los tiempos de video son relativos al clip.

### Bloqueante

**B1. Laptop con touchpad: no puede bajar del héroe.**

- **Qué pasó:** cada gesto del touchpad (de 200 a 400 px en eventos de 5 a 30 px) mueve la página entre 18 y 30 px, y la página vuelve sola a 0. Pasó 110 veces seguidas en 6 minutos y 43 segundos, hasta que un gesto más largo pasó la primera costura. Después se trabó de la misma forma al final de la caída de nubes, en `y=1229`, con 8 de 8 intentos fallidos.
- **Dónde:** héroe y caída de nubes, a 1366x768.
- **Evidencia:** video `v01` desde 0:04, con un rebote cada 3 o 4 s. Además, un control aislado:
  - con eventos de 24 px o menos, ningún gesto avanzó, y dentro de cada gesto se dispararon de 30 a 42 `scrollend`;
  - con eventos de 40 px, avanzó siempre;
  - con el acomodo desactivado, los mismos gestos de 24 px avanzaron 380 px cada uno.
- **Causa probable (hipótesis):** cada evento chico termina como un scroll propio, y `SectionSnap` lo toma como un "toque de menos de 24 px" (`JITTER`) que vuelve al punto más cercano. Con eventos grandes no pasa.
- **Por qué importa para Marta:** con la laptop vieja y el touchpad, la página "no anda". No se le ocurre usar el menú y se va.
- **Recomendación:**
  - Que el acomodo no vaya nunca en contra de la dirección del lector: sacar la vuelta por `JITTER`, o aplicarla solo si no hubo entrada en los últimos 400 ms.
  - Calcular el recorrido desde donde empezó el gesto, no desde el último `scrollend`.
  - Esperar unos 300 ms sin eventos de rueda antes de acomodar.
  - Confirmarlo en hardware real: un touchpad sin precisión (ELAN o Synaptics viejo), uno de precisión de Windows, el trackpad de una Mac y un mouse de rueda libre.

### Alta

**A1. Rueda: dos o tres muescas seguidas en el borde de una sección rebotan.**

- **Qué pasó:** 9 de las 45 entradas de la pasada con rueda no avanzaron. Todas eran de 2 o 3 muescas y todas fueron al final de una sección: final de la isla 2 (`y=2995`), rocas (`4838`), detalle de packs (`5883`), contacto (`13331`, dos veces) y el comienzo de Preguntas (`14375`, cuatro veces seguidas). En cada una, la página bajó 100 px y volvió. Con una sola muesca, en cambio, saltó 768 px (una pantalla entera).
- **Dónde:** laptop, en las costuras de las secciones de unas dos pantallas (isla 2, rocas, contacto y preguntas).
- **Evidencia:** video `v02`, con rebotes en 0:06, 0:10, 0:15 y 0:21 y la salida en 0:25 con una sola muesca.
- **Causa probable (hipótesis):** la primera muesca termina, `SectionSnap` arranca el acomodo, la segunda muesca lo interrumpe y el recorrido se vuelve a medir desde el punto de la interrupción. Así queda por debajo de 24 px y vuelve atrás.
- **Por qué importa para Marta:** siente que "la página no la deja" justo donde está la información que busca (Preguntas, contacto) y no sabe que tiene que dar una sola muesca.
- **Recomendación:** la misma raíz que B1. Si el lector interrumpe un acomodo en la misma dirección, conservar el destino del acomodo o medir desde el comienzo del gesto. Probar la regla con 1, 2, 3 y 5 muescas a 100, 200 y 300 ms entre sí en cada costura.

**A2. "Atrás" desde un caso de estudio no vuelve a la landing.**

- **Qué pasó:** si antes tocó cualquier enlace interno de la landing (en el repro, "Ver packs"), al apretar "Atrás" en `/proyectos/shineapp` la dirección cambia a `https://mayofy.dev/#packs`, pero la pantalla sigue mostrando el caso, scrolleado abajo, a los 1 y a los 8 segundos. Pasa igual en celular y en laptop. Sin un enlace interno previo, "Atrás" vuelve bien y a la misma altura. En la pasada de objetivos hizo falta un segundo "Atrás", que la dejó en la isla 2 en lugar de en Trabajos y sin su elección.
- **Dónde:** caso de estudio → landing, en todos los tamaños.
- **Evidencia:** video `v04` (toca "Ver packs" en 0:02; para llegar al trabajo se usó un salto de preparación; entra al caso y desde 0:12 aprieta "Atrás" y no vuelve). Captura `c06`.
- **Causa probable (hipótesis):** los enlaces internos (`#packs`, `#agenda`, etcétera) agregan entradas nativas al historial, y el router de Next no vuelve a dibujar la landing al regresar a una de esas entradas.
- **Por qué importa para Marta:** "Atrás" es lo único que sabe usar para volver, y cree que la página se colgó.
- **Recomendación:** que los enlaces internos no agreguen entradas al historial (`history.replaceState` y un desplazamiento suave a mano), o abrir los casos con navegación completa. Reproducirlo en desarrollo y agregar una prueba E2E: tocar un enlace interno, abrir un caso, "Atrás" y verificar que se ve la landing.

**A3. La recomendación de la isla 2 (con su precio) cambia sola mientras Marta lee.**

- **Qué pasó:** sin tocar nada, la selección pasa de un caso al siguiente cada 5 s, y con ella la tarjeta "Te conviene empezar por" cambia de nombre, de precio y de plazo (por ejemplo, de USD 150 a USD 450). Al volver de un caso, la elección que había tocado se pierde y la rotación arranca de nuevo.
- **Dónde:** isla 2, celular y laptop.
- **Evidencia:** captura `c02` (antes y 5,6 s después) y video `v05` (0:03 → 0:08).
- **Por qué importa para Marta:** lee despacio, y si el precio cambia mientras lo lee, desconfía.
- **Recomendación:**
  - No rotar mientras la tarjeta está en pantalla, o que la rotación mueva solo la ilustración y no el texto ni el precio.
  - O empezar sin ningún caso elegido, con "Tocá el que más se parece a vos".
  - Recordar la elección durante la visita (`sessionStorage`).

**A4. En el celular, el calendario atrapa el dedo.**

- **Qué pasó:** `.booking__inline.cal-inline-container` es una caja de 656 px de alto (82 % de la pantalla) con `overflow: auto` y 1.735 px de contenido. Los deslizamientos que empiezan sobre la caja mueven solo la caja: hacen falta tres deslizamientos (1.079 px de scroll interno) antes de que la página vuelva a bajar. Al subir pasa lo mismo: 3 intentos sin avance en la pasada con 4G lento. Además, la lista de horarios tiene su propio scroll dentro del calendario.
- **Dónde:** isla 6 (contacto), a 360x800.
- **Evidencia:** video `v03`, de 0:06 a 0:16 (la página quieta, se mueve el calendario); captura `c07`; registro de la pasada A (pasos 29 a 31, sin avance en `y=15478`).
- **Por qué importa para Marta:** "se trabó" justo en la parte de pedir la reunión, y no entiende que hay dos scrolls, uno adentro del otro.
- **Recomendación:** en pantallas angostas, dejar que el iframe tome su altura (el embed de Cal permite el ajuste automático) y sacar el `overflow: auto`. Otra opción es reemplazar el calendario en línea por un botón "Elegir día y hora" que abra Cal en pantalla completa.

### Media

**M1. Un toque corto mueve una pantalla entera, y a veces se lleva lo que estaba leyendo.**

- **Qué pasó:** en el recorrido del celular hubo 31 movimientos que hizo la página sola, de unos 0,6 s cada uno. Algunos ejemplos: un deslizamiento de 233 px terminó a 800 px; uno de 321 px, en la caída de nubes entera. Desde el final de la isla 2, con la recomendación en pantalla, un deslizamiento de 300 px la llevó a la isla 3; uno de 220 a 260 px no.
- **Dónde:** costuras entre secciones, en el celular.
- **Evidencia:** video `v06` (desde 0:02), captura `c03` y video `v07`.
- **Por qué importa para Marta:** "se mueve sola", y la tarjeta con los botones "Ver qué incluye" y "Agendá tu diagnóstico" desaparece justo cuando iba a tocar.
- **Recomendación:** en el celular, acomodar en la costura solo si el recorrido supera un tercio de pantalla; si no, quedarse donde la dejó el dedo. Tratar el final de una sección con botones como un punto de descanso que no se saltea con un toque corto.

**M2. Los tramos fijados saltean pasos y piden muchos deslizamientos.**

- **Qué pasó:** en los seis pasos, un deslizamiento fue del paso 4 al 6 sin mostrar el 5. En la isla 4, uno fue de la tarjeta 02 a la 04. Los seis pasos llevan unos 10 deslizamientos con el mismo dibujo, y la isla 4 entre 4 y 7 (con 4G lento).
- **Dónde:** isla 4 y seis pasos, en el celular.
- **Evidencia:** capturas `c10` y `c11`, y video `v08` (0:05 → 0:09).
- **Por qué importa para Marta:** no sabe cuánto falta, y se pierde un paso ("Publicación y medición").
- **Recomendación:** limitar el avance a un paso por gesto aunque haya inercia, y mostrar "Paso 4 de 6" con texto, no solo las rayitas.

**M3. La primera pantalla no dice qué hacen ni para quién.**

- **Qué pasó:** "Webs que venden. Sistemas que ordenan." no nombra turnos, negocios chicos ni el tipo de cliente, y no hay ningún dato concreto (precio o plazo). "Agendá tu diagnóstico gratis" suena médico. El botón de WhatsApp es solo un ícono, y nada avisa que hay más abajo.
- **Dónde:** héroe, celular y laptop.
- **Evidencia:** capturas `c01` y `c13`.
- **Por qué importa para Marta:** su pregunta 1 se responde recién en la isla 2.
- **Recomendación:** una bajada con el comprador y un dato, por ejemplo "Páginas y sistemas de turnos para negocios y comercios. Desde USD 85." Cambiar "diagnóstico" por "charla gratis de 30 minutos" o "reunión gratis". Poner el texto "WhatsApp" junto al ícono.

**M4. Jerga que Marta no entiende.**

- **Qué pasó:** aparecen, entre otros: "Landing", "SEO técnico", "Meta Pixel y Google Ads", "Google Business Profile y SEO local", "Integración con CRM", "Usuarios con roles y permisos", "Disponibilidad offline", "Paneles de gestión", "Cotizadores interactivos", "hosting", "Código y dominio tuyos", "Rondas de revisión acordadas", "detailing", "Portfolio de un desarrollador". También las metáforas "El invernadero", "La maceta", "El engranaje" y "Nuestra siembra, tus resultados". En la agenda: "Mayofy First Meeting", "Cal Video", "12 h / 24hs" y horarios con "am" y "pm".
- **Dónde:** isla 2, packs, isla 4, trabajos, agenda y preguntas.
- **Por qué importa para Marta:** cada palabra que no entiende la hace sentir que "no es para ella".
- **Recomendación:** usar palabras de ella. Por ejemplo:
  - "Landing" → "Página web de una sola página".
  - "SEO" → "Que te encuentren en Google".
  - "Offline" → "Funciona aunque se corte internet".
  - "CRM" → "Lista de clientes ordenada".

  Si el nombre "Landing" se queda, ponerle una bajada. Traducir el evento de Cal ("Primera reunión con Mayofy") y usar el formato de 24 h.

**M5. Los elementos fijos tapan contenido en el celular.**

- **Qué pasó:**
  - La píldora "Mayofy / Agendá" queda encima de títulos y precios cuando se llega por un enlace (por ejemplo, el título del calendario y "DESDE USD").
  - El botón verde de WhatsApp tapa el final de los renglones y la mitad derecha de los campos del formulario.
  - La barra de patitas tapa la última línea de cada pantalla y un campo del formulario.
  - Las patitas no tienen texto: Marta no sabe qué son.
- **Dónde:** todo el sitio, a 360x800.
- **Evidencia:** capturas `c14`, `c08` y `c09`.
- **Recomendación:** dejar un margen de scroll igual a la altura de la píldora (`scroll-margin-top`) en los destinos de los enlaces. Esconder el botón de WhatsApp y la barra de patitas mientras hay un campo con foco o se está en contacto. Ponerle nombre visible a la isla activa o cambiar las patitas por números.

**M6. Laptop 1366x768: el subtítulo de la isla 4 queda tapado.**

- **Qué pasó:** "Lo que tu operación necesita, sin convertir la tecnología en protagonista" queda debajo del cartel "Seguimiento automático" y de la ilustración.
- **Dónde:** isla 4, a 1366x768.
- **Evidencia:** captura `c12`.
- **Recomendación:** mover el bloque de texto o las etiquetas a esa altura de pantalla, y agregar 1366x768 a las medidas que se revisan.

**M7. El mensaje armado de WhatsApp empieza con "�".**

- **Qué pasó:** `wa.me` redirige a `api.whatsapp.com` y cambia el 👋 (`%F0%9F%91%8B`) por `%EF%BF%BD` (el carácter de reemplazo). Se comprobó con `curl` usando agentes de Android y de escritorio. Los mensajes de los packs no tienen emoji y no les pasa.
- **Dónde:** botón flotante, botón del héroe y "Escribir por WhatsApp".
- **Por qué importa para Marta:** el primer mensaje "se ve roto". Si en Android la app intercepta el enlace antes del desvío, puede que no pase: hay que confirmarlo en un teléfono.
- **Recomendación:** sacar el emoji del texto o enlazar directo a `https://api.whatsapp.com/send?phone=...`, y probarlo en un teléfono con WhatsApp instalado y en WhatsApp Web.

### Baja

- **L1. Ningún trabajo se parece al de ella.** No hay comercio de barrio ni turnos. Recomendación: cuando haya un caso de turnos, ponerlo primero. Mientras tanto, una frase del tipo "El sistema de lavaderos maneja clientes y turnos de servicio, como una peluquería".
- **L2. Dudas con el precio.** Está en USD con "desde", lo de pagar en pesos está al pie del bloque de packs, y el mantenimiento mensual (USD 25 o 50 por mes) recién aparece en la isla 7. Recomendación: poner "se puede pagar en pesos" junto al precio, y "más mantenimiento opcional" en la tarjeta.
- **L3. Objetivos táctiles chicos.**
  - Las patitas de las islas: 32x32 px.
  - Los botones de los seis pasos: 30 px de ancho.
  - El enlace "Mayofy": 26 px de alto.
  - "Ver los dos niveles": 40 px de alto.
  - "Privacidad" en el formulario: 16 px de alto.

  Lo recomendable es al menos 44 px.
- **L4. Textos chicos.** En la isla 2, "Tu propuesta" va de 11,8 a 12,3 px en la laptop y 13,6 px en el celular; las ayudas del formulario, 12,8 px. Para una lectora de 54 años conviene un mínimo de 14 a 15 px.
- **L5. Tirones con 4G lento y CPU x4.** Hubo 455 cuadros de más de 50 ms en toda la pasada (16 de más de 100 ms; el peor, 733 ms), contra 24 sin limitar. Por sección, el armado de las rocas (isla 3) es lo más pesado: 18 cuadros lentos en 15 s. No se localizó dónde caen los picos de más de 700 ms; probablemente en la carga inicial o del calendario (hipótesis).
- **L6. Movimiento que no pidió.** Los íconos de garantías se mueven cada 1 s y las rocas flotan. No la molestan, pero suman ruido mientras lee precios.
- **L7. Teclado.** Espacio a veces salta más de una pantalla (hasta 1.229 px, por el acomodo). No se traba.

## Lo que funciona bien

- **Carga rápida.** El título es lo primero que se pinta: FCP de 1,3 s (2,5 s con 4G lento y CPU x4), y `load` a los 3,4 s (5,9 s limitado). La página pesa 3,5 MB.
- **La isla 2 le habla a ella.** Elegir "Paso el día coordinando turnos por WhatsApp" y recibir "Web + Gestión, USD 150, 3 a 9 semanas" es el momento más claro de toda la visita.
- **Los packs se entienden.** Tienen precio, plazo e "Ideal para", con "centros de estética" nombrados. "Quiero web con turnos" abre WhatsApp con el pack ya escrito.
- **WhatsApp siempre a mano**, y el formulario tiene etiquetas claras ("lo vemos por WhatsApp").
- **Confianza.** "Mayofy es la marca. Detrás estoy yo": una persona, 5 años de experiencia, LinkedIn, y trabajos reales con enlace al sitio en vivo.
- **El acomodo en el celular la deja casi siempre en el comienzo de cada isla**, y subir hasta arriba fue fluido (24 deslizamientos, sin trabas fuera del calendario).
- **En la laptop, el menú de arriba y el teclado funcionan sin trabas.**
- **Los seis pasos tienen textos claros** ("sin sorpresas", "te mandamos por escrito cuánto sale").

## Límites de esta prueba

- **No es una persona real.** Las frases de Marta las escribió el agente a partir de lo que se vio en pantalla. La comprensión, la confianza y el enojo son inferencias. Los tiempos incluyen pausas de lectura programadas.
- **El navegador es emulado.** Chromium 156 de escritorio en modo headless, con emulación de celular, no Chrome en un Android real. El toque se generó con eventos CDP y la rueda y el touchpad con eventos de rueda sintéticos. Un touchpad de precisión real manda gestos continuos y puede no mostrar B1; un touchpad viejo o un mouse de rueda libre, sí.
- **Qué no se probó:** iPhone con Safari, el tamaño de letra grande de Android, el zoom, la pantalla horizontal, lectores de pantalla, redes reales inestables, y enviar el formulario o reservar un turno (se frenó antes, como se pidió).

Una sesión real debería confirmar:

1. **B1 y A1** en una laptop con touchpad viejo, una con touchpad de precisión, una Mac y un mouse barato.
2. **A2**, apretando "Atrás" en un Android real, con el botón del sistema y con el gesto.
3. **A4**, en un Android de gama media: si el dedo queda atrapado en el calendario.
4. **M7:** qué texto llega a WhatsApp desde un teléfono con la app instalada.
5. Si una persona como Marta entiende "Landing", "diagnóstico" y las patitas, y si decide escribir. Lo ideal son 5 sesiones moderadas, pensando en voz alta, con dueños de comercios de 45 a 65 años.

## Evidencia

Clips comprimidos (H.264, de 9 a 30 s cada uno) en `docs/plans/prueba-usuario/`:

| Archivo | Qué muestra |
|---|---|
| `v01_laptop_touchpad_heroe_vuelve_arriba.mp4` | B1: cada gesto del touchpad vuelve al héroe |
| `v02_laptop_rueda_preguntas_rebota.mp4` | A1: 2 o 3 muescas rebotan en Preguntas |
| `v03_celular_calendario_atrapa_el_dedo.mp4` | A4: se mueve el calendario, no la página |
| `v04_celular_atras_no_vuelve.mp4` | A2: "Atrás" deja el caso en pantalla |
| `v05_celular_casos_cambian_solos.mp4` | A3: la recomendación cambia sola |
| `v06_celular_toquecito_salta_de_isla.mp4` | M1: un deslizamiento corto se lleva la recomendación |
| `v07_celular_recorrido_se_completa_solo.mp4` | M1: el acomodo después de un deslizamiento corto |
| `v08_celular_seis_pasos_saltea_el_5.mp4` | M2: del paso 4 al 6 |

Capturas en la misma carpeta: de `c01` a `c15`, nombradas por lo que muestran.

Los videos completos de cada pasada (WebM, unos 250 MB) y los registros JSON con cada entrada y cada movimiento del sitio quedaron fuera del repositorio, en `C:\Users\Juanito\AppData\Local\Temp\claude\C--Users-Juanito-orca-workspaces-mayofy-landing-landing-prueba-usuario\bfbf730d-0d7d-4ac6-9cd5-5a67ad1e32bf\scratchpad\out`, junto con los scripts de Playwright en la carpeta de arriba (`lib.cjs`, `phoneA.cjs`, `phoneB.cjs`, `laptop.cjs`, `pins.cjs`, `cal.cjs`, `back.cjs`, `rec.cjs` y `tp.cjs`). Es una carpeta temporal: si hace falta conservarlos, hay que copiarlos.

## Arreglos del coordinador (22/11)

- **A2, "Atrás" roto.** Causa confirmada en `node_modules/next/dist/client/components/app-router.js`: el App Router ignora un `popstate` cuya entrada no trae su estado (`if (!event.state) return`). Un `<a href="#...">` nativo crea justamente esa entrada sin estado, y `platform-markers.tsx` hacía `pushState(null, ...)`.
  - **Arreglo:** `src/components/hash-link-history.tsx`, montado en `src/app/layout.tsx`, toma los enlaces `#` de la misma página. Hace scroll al destino con el `scroll-behavior` propio de la página (suave, o instantáneo con movimiento reducido), mueve el foco ahí y agrega la entrada al historial conservando el estado del router. `platform-markers.tsx` ahora conserva `history.state`.
  - **Verificado (1440 y 390):** "Ver packs" → caso de ShineApp → Atrás vuelve a la landing en `#packs`, a la misma altura. Un segundo Atrás vuelve a `/`. Sin errores de consola.
- **A3, la recomendación cambia mientras se lee.** La rotación de la isla 2 pasó de 5 a 12 s (`.case__progress` en `world.css`). Así alcanza para leer el precio y el párrafo mirando la isla. La barra de progreso, la pausa con el puntero o el foco, la pausa fuera de pantalla y la ausencia de rotación con movimiento reducido no cambian. Verificado a 390: el primer caso sigue elegido a los 6 s y cambia a los 13 s.
- El resto de los hallazgos quedó a cargo de tres agentes: el scroll (A1, M1), la caja de Cal.com (A4) y los hallazgos menores.

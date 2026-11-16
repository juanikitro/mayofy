# Biblia visual: el mundo de Mayo

**Fecha:** 16 de noviembre de 2026
**Estado:** aprobada por Juani el 16 de noviembre de 2026, con una corrección: Mayo no habla, así que no hay notas manuscritas ni fuente Caveat. Complementa `2026-11-16-landing-redesign-mayo-world.md` (las decisiones de ese documento no se reabren acá).
**Para qué sirve:** fija paleta, tipografía, luz y cámara por isla, y deja listos los prompts de ChatGPT para generar las imágenes del hero (isla 1) y del ensamble de rocas (isla 3).

## 1. Paleta

El verde deja de ser un neón sobre fondo negro y pasa a ser un verde de hoja y musgo sobre beige cálido. El menta `#00F69D` se conserva, pero solo como "luz" en las islas nocturnas.

| Token | OKLCH | Hex aprox. | Rol |
|---|---|---|---|
| `--color-moss` | `oklch(42% 0.11 150)` | `#0B5D2A` | Verde principal: palabra clave de los titulares, botones y enlaces sobre beige. |
| `--color-leaf` | `oklch(55% 0.14 145)` | `#308639` | Verde medio para ilustración, pasto y detalles grandes. No para texto chico. |
| `--color-leaf-light` | `oklch(74% 0.13 140)` | `#7DBF6E` | Verde claro para brillos y musgo iluminado. Solo decorativo. |
| `--color-mint` | `oklch(85.7% 0.1995 158.3)` | `#00F69D` | Luz nocturna: luciérnagas, brillos, palabra clave y CTA sobre fondo oscuro. |
| `--color-cream` | `oklch(96% 0.018 75)` | `#F9F0E5` | Fondo más claro (tarjetas sobre beige, texto sobre verde). |
| `--color-beige` | `oklch(92% 0.03 68)` | `#F2E1D0` | Fondo base de las secciones claras. Cálido, apenas durazno. |
| `--color-beige-deep` | `oklch(86% 0.045 62)` | `#E7CBB4` | Beige profundo para suelos, sombras suaves y bordes. |
| `--color-ink` | `oklch(24% 0.03 150)` | `#152318` | Texto principal sobre claro (verde casi negro, no negro puro). |
| `--color-ink-soft` | `oklch(40% 0.03 150)` | `#3C4C3F` | Texto secundario sobre claro. |
| `--color-bark` | `oklch(45% 0.06 55)` | `#6F4C34` | Marrón corteza: notas manuscritas de Mayo sobre claro, tierra, rocas. |
| `--color-night` | `oklch(17% 0.04 265)` | `#070E21` | Fondo de las islas nocturnas (azul noche, no negro). |
| `--color-night-deep` | `oklch(12% 0.03 265)` | `#020511` | Noche profunda, cielo alto. |
| `--color-night-ink` | `oklch(94% 0.012 160)` | `#E5EEE8` | Texto sobre noche. |
| `--color-night-ink-soft` | `oklch(78% 0.02 200)` | `#A9BCBC` | Texto secundario sobre noche. |

Contrastes medidos (WCAG, texto normal necesita 4.5, grande 3):

| Par | Ratio |
|---|---|
| ink sobre beige | 12.8 |
| ink-soft sobre beige | 7.2 |
| moss sobre beige | 6.3 |
| moss sobre beige-deep | 5.2 |
| cream sobre moss (botón) | 7.1 |
| bark sobre beige (notas) | 6.0 |
| leaf sobre beige | 3.6 (solo texto grande o decoración) |
| night-ink sobre night | 16.2 |
| night-ink-soft sobre night | 9.7 |
| mint sobre night | 13.4 |
| night-deep sobre mint (botón nocturno) | 14.2 |

Regla: en las islas claras el verde es tinta (moss) y el beige es fondo; en las nocturnas el fondo es azul noche y el menta es luz, nunca relleno de superficies grandes.

## 2. Tipografía (decisión)

Se probaron Instrument Sans y Geist como sans, Fraunces en cursiva para la palabra clave y Caveat, Patrick Hand y Kalam como acento manuscrito, sobre fondos de amanecer, mediodía y noche, a 1440 px y 390 px.

**Elegida:** Instrument Sans (titulares en 600 y texto en 400) + Fraunces cursiva (ejes `opsz 120`, `SOFT 60`, peso 400) para la palabra clave. Caveat se había elegido para las notas de Mayo, pero Juani decidió que Mayo no habla: no hay notas manuscritas ni acento caligráfico, y la fuente no se carga.

- Instrument Sans es firme pero tiene calor: las curvas de la "a" y la "g" conviven con las islas. Geist se lee más frío y más "herramienta de desarrollador"; funciona, pero empuja al sitio hacia el SaaS y no hacia el mundo de Mayo.
- Fraunces cursiva con `SOFT` alto da la nota orgánica sin volverse decorativa. Va en una o dos palabras por titular, nunca en frases enteras.
- Caveat ganaba a Patrick Hand (infantil, de trazo parejo) y a Kalam (correcta pero más seca); queda registrado por si algún día se quiere un acento manuscrito, pero hoy no se usa.
- La mono desaparece. Los números de precio van en Instrument Sans con `font-variant-numeric: tabular-nums`.

Escala: titular del hero `clamp(2.6rem, 1.4rem + 4.6vw, 4.75rem)` con interlineado 0.98 y tracking -0.03em; cuerpo 1.0625 a 1.1875rem con interlineado 1.5.

## 3. Luz, cielo y cámara por isla

Todas las islas comparten la misma cámara base para que las imágenes se puedan montar en capas: **tres cuartos frontal, levemente elevada (unos 15° por encima del horizonte), lente equivalente a 35 mm, horizonte en el tercio superior**. La isla ocupa el centro, el cielo queda limpio arriba para el texto, y la escala de Mayo es aproximadamente un octavo del ancho de la isla.

| # | Isla | Cielo (de arriba a abajo) | Luz principal | Cámara | Mayo |
|---|---|---|---|---|---|
| 1 | Prado del amanecer | durazno `oklch(88% 0.06 55)` → lavanda `oklch(90% 0.05 320)` → beige | Sol bajo desde la derecha, cálida, sombras largas y suaves, neblina baja | Base; isla centrada abajo, cielo libre en la mitad superior | De pie en el borde, mirando a cámara |
| 2 | Rocas sueltas | celeste pálido `oklch(90% 0.05 220)` → beige | Mañana, sol a 40°, luz clara y limpia | Base, apenas más abierta para mostrar rocas dispersas alrededor | Jugando entre rocas |
| 3 | Las rocas se ensamblan | azul cielo `oklch(80% 0.11 235)` → celeste → beige | Mediodía, sol alto, sombras cortas, colores saturados | Base; tres plataformas en fila con aire entre ellas | Saltando entre plataformas |
| 4 | Taller o invernadero | ámbar `oklch(85% 0.09 75)` → crema | Tarde dorada, sol a 25° desde la izquierda, contraluz suave | Base, más cerrada sobre el invernadero | Escarbando |
| 5 | Jardín de trabajos | coral `oklch(78% 0.13 40)` → violeta `oklch(70% 0.1 310)` | Atardecer, cielo como fuente de luz, siluetas cálidas | Base, horizonte más alto para el sendero | Corriendo por el sendero |
| 6 | Isla de las preguntas | índigo `oklch(40% 0.09 280)` → verde azulado `oklch(30% 0.05 220)` | Crepúsculo, luz residual azul y luciérnagas menta como luz práctica | Base, un poco más baja (mirada a la altura de Mayo) | Persiguiendo luciérnagas |
| 7 | Isla de Juani | noche `oklch(17% 0.04 265)` → noche profunda con estrellas | Noche estrellada, luz de fogón o farol cálida y menta en los brillos | Base, cerrada sobre la escena del fogón | Echada junto a Juani |

Las secciones de texto que cubren el cielo usan beige/crema (islas 1 a 5) y azul noche (6 y 7). Nada de blanco puro ni negro puro.

## 4. Estilo base para todas las imágenes

Este bloque se pega al principio de cada prompt. Es lo que mantiene la coherencia entre tandas.

```text
ESTILO MAYOFY (usar siempre):
Render 3D estilo película animada tipo Pixar: formas redondeadas y amables, materiales con textura suave (pasto como felpa corta, roca con musgo, madera cálida), iluminación cinematográfica con luz principal clara y rebote cálido, profundidad de campo leve, sin contornos de dibujo, sin estilo "cartoon plano". Colores: verdes de hoja y musgo (no neón), beige cálido apenas durazno, cielo según la hora indicada. Nada de texto, logos, marcas de agua ni personas. Composición limpia, con aire alrededor del sujeto. Calidad de fotograma final de película.
```

Reglas de salida que se piden en cada prompt:

- **Formato:** paisajes del hero en 16:9 (1536×1024 en ChatGPT) y 9:16 (1024×1536) para celular; objetos aislados en 1:1 (1024×1024).
- **Objetos aislados:** fondo liso de un solo color, **verde flúo `#00FF00`** o **magenta `#FF00FF`** (el que no aparezca en el objeto), sin sombra proyectada sobre el fondo, sin reflejos del fondo en el objeto. Así se recortan limpios.
- **Mismo ángulo de cámara** que la isla donde se van a usar (tres cuartos, 15° elevada).
- **Imagen de referencia:** desde la segunda imagen en adelante, se adjunta siempre `00-referencia-estilo.png` y se escribe "mantené exactamente el estilo, los materiales y la luz de la imagen adjunta".

## 5. Prompts listos para pegar

Orden recomendado: primero la referencia de estilo (00), después el hero (01 a 05) y por último la isla 3 (10 a 19). Cada prompt es independiente; si una imagen sale mal, se vuelve a generar solo esa.

### 00. Referencia de estilo (se genera una sola vez)

```text
ESTILO MAYOFY (usar siempre): [pegar el bloque de la sección 4]

Imagen de referencia de estilo para una serie. Una pequeña isla flotante en el cielo, vista en tres cuartos desde apenas arriba (unos 15° sobre el horizonte, lente 35 mm). La isla tiene un prado verde musgo redondeado arriba, raíces y roca con musgo colgando abajo, un árbol pequeño de copa redonda y tres rocas lisas con musgo apoyadas en el pasto. Cielo de amanecer: durazno cálido abajo que pasa a lavanda suave arriba, con dos o tres nubes blandas. Luz de sol bajo desde la derecha, sombras largas y suaves, neblina fina a la altura del prado. Formato 16:9.
```

Si el resultado convence, se guarda como `00-referencia-estilo.png` y se adjunta en todos los prompts siguientes.

### Hero (isla 1: Prado del amanecer)

**01. Escena de escritorio (fondo del hero, sin Mayo)**

```text
[ESTILO MAYOFY] Mantené exactamente el estilo, los materiales y la luz de la imagen adjunta.

Escena para el fondo de una página web, formato 16:9. Una isla flotante con un prado verde musgo ocupa el tercio inferior y el centro de la imagen; arriba queda cielo de amanecer limpio (durazno abajo, lavanda arriba) para colocar texto encima. En el borde izquierdo del prado hay un árbol de copa redonda y un cartel de madera vacío, muy pequeño. A la derecha, el prado termina en un borde de roca con musgo que cae al vacío. Detrás, muy lejos y desenfocadas, dos islas más pequeñas flotando entre nubes. Luz de sol bajo desde la derecha, sombras largas, neblina baja. Nadie en la escena: el espacio del centro-derecha del prado queda vacío para agregar un personaje después.
```

**02. Escena de celular (misma isla, 9:16)**

```text
[ESTILO MAYOFY] Mantené exactamente el estilo, los materiales y la luz de la imagen adjunta.

La misma isla flotante del amanecer de la imagen adjunta, pero en formato vertical 9:16 para celular. La isla ocupa el tercio inferior; los dos tercios superiores son cielo de amanecer limpio (durazno abajo, lavanda arriba) con nubes blandas, para colocar texto. El árbol queda a la izquierda, el borde de roca a la derecha y el centro del prado vacío. Nadie en la escena.
```

**03. Capa de cielo (para parallax, sin isla)**

```text
[ESTILO MAYOFY] Mantené el estilo y la luz de la imagen adjunta.

Solo el cielo del amanecer de la imagen adjunta, formato 16:9, sin isla ni objetos: degradé de durazno cálido abajo a lavanda suave arriba, con cuatro nubes blandas y volumétricas repartidas, algunas apenas iluminadas de rosa por el sol bajo. Sin horizonte visible, sin sol en cuadro.
```

**04. Capa de primer plano (hojas y pasto, aislada)**

```text
[ESTILO MAYOFY] Mantené el estilo, los materiales y la luz de la imagen adjunta.

Objeto aislado para recortar, formato 16:9: un grupo de hojas anchas y tallos de pasto alto visto de cerca y desde abajo, como si estuviera en el borde inferior izquierdo de la cámara, con la luz cálida del amanecer entrando desde la derecha. Fondo liso de un solo color magenta #FF00FF, sin sombra sobre el fondo. Las hojas ocupan la mitad inferior y la esquina izquierda; el resto es magenta liso.
```

**05. Mayo provisoria (hasta tener el modelo 3D)**

```text
[ESTILO MAYOFY] Mantené el estilo, los materiales y la luz de la imagen adjunta.

Objeto aislado para recortar, formato 1:1: una border collie blanca y negra de cuerpo entero, estilo película animada, de pie en tres cuartos mirando a cámara con expresión alegre y atenta, boca apenas abierta, cola levantada. Pelaje con textura suave, luz cálida de amanecer desde la derecha. Fondo liso de un solo color verde #00FF00, sin sombra proyectada sobre el fondo. Las patas apoyan sobre el borde inferior de la imagen.
```

Esta imagen es solo provisoria. Las poses definitivas (8 a 10) salen del modelo 3D de la sesión `mayo-3d-character`, con el mismo ángulo de cámara y la misma luz por isla.

### Isla 3: las rocas se ensamblan

La idea técnica: generamos cada plataforma ya armada (para que las rocas encastren bien) y después pedimos cada roca por separado con el mismo ángulo. En la web las rocas arrancan dispersas y, con el scroll, vuelven a su posición en la plataforma.

**10. Escena base de la isla 3 (sin rocas, sin Mayo)**

```text
[ESTILO MAYOFY] Mantené exactamente el estilo, los materiales y la luz de la imagen adjunta.

Escena para el fondo de una sección web, formato 16:9. Una isla flotante ancha y baja de mediodía: prado verde musgo plano arriba, roca con musgo y raíces colgando abajo, cielo azul saturado que se aclara hacia el horizonte, sol alto, sombras cortas. El prado está vacío: no hay rocas, objetos ni personajes, solo pasto y algunas flores pequeñas blancas. A lo lejos, muy desenfocadas, nubes blandas y una isla pequeña. El tercio superior es cielo limpio para texto.
```

**11, 12 y 13. Las tres plataformas armadas (referencia de encastre)**

Generar tres veces, cambiando el tamaño: la plataforma 1 es la más baja, la 3 la más alta.

```text
[ESTILO MAYOFY] Mantené exactamente el estilo, los materiales y la luz de la imagen adjunta.

Objeto aislado para recortar, formato 1:1, luz de mediodía con sol alto. Una plataforma natural formada por cuatro rocas lisas con musgo encastradas entre sí: una roca base grande y ancha, dos rocas medianas apoyadas a los costados y una roca plana arriba que forma una superficie donde podría pararse un perro. Las cuatro rocas tienen formas claramente distintas y se nota la unión entre ellas. Vista en tres cuartos desde apenas arriba (15°). Fondo liso de un solo color magenta #FF00FF, sin sombra proyectada sobre el fondo.
Plataforma [1 baja | 2 media | 3 alta]: altura total [1 | 1.5 | 2] veces el ancho de la roca base.
```

**14 a 19. Cada roca por separado**

Para cada plataforma, se abre una conversación nueva, se adjunta la imagen de esa plataforma armada y se pide una roca por vez (cuatro pedidos por plataforma; si ChatGPT mantiene bien el contexto, se pueden pedir las cuatro en una misma conversación, una por mensaje):

```text
Mantené exactamente el estilo, los materiales, el ángulo de cámara y la luz de la imagen adjunta.

De la plataforma de la imagen adjunta, mostrá SOLO la roca [base grande | mediana de la izquierda | mediana de la derecha | plana de arriba], completa, con la misma forma, la misma textura de musgo y la misma luz de mediodía, vista desde el mismo ángulo. Sin las demás rocas. Fondo liso de un solo color magenta #FF00FF, sin sombra proyectada sobre el fondo. Formato 1:1, la roca centrada y ocupando el 70% del cuadro.
```

**20. Rocas sueltas de relleno (opcional, para la dispersión)**

```text
[ESTILO MAYOFY] Mantené el estilo, los materiales y la luz de la imagen adjunta.

Objeto aislado para recortar, formato 1:1: una roca pequeña redondeada con musgo en la parte de arriba y roca gris cálida abajo, luz de mediodía, vista en tres cuartos desde apenas arriba. Fondo liso de un solo color magenta #FF00FF, sin sombra sobre el fondo.
```

Generar cuatro variantes cambiando "pequeña redondeada" por "alargada", "achatada" y "con una arista".

## 6. Guía paso a paso para Juani

1. En ChatGPT, elegí la generación de imágenes (modelo con imágenes) y usá siempre la misma; no mezcles herramientas entre tandas.
2. Generá primero la **00. Referencia de estilo**. Si no te gusta, repetila hasta que sí: es la que manda sobre todas las demás. Guardala como `00-referencia-estilo.png`.
3. Para cada prompt siguiente, **adjuntá `00-referencia-estilo.png`** y pegá el prompt completo (con el bloque ESTILO MAYOFY reemplazando el corchete).
4. Para las rocas por separado (14 a 19), adjuntá la plataforma armada correspondiente (11, 12 o 13), no la referencia general.
5. Pedí siempre la resolución más alta que ofrezca la herramienta y descargá en PNG.
6. Nombrá los archivos así y dejalos en una carpeta `C:\Users\Juanito\Desktop\MayofyMundo\`:

   | Archivo | Contenido |
   |---|---|
   | `00-referencia-estilo.png` | referencia de estilo |
   | `01-hero-escritorio.png` | escena 16:9 |
   | `02-hero-celular.png` | escena 9:16 |
   | `03-hero-cielo.png` | capa de cielo |
   | `04-hero-primer-plano.png` | hojas aisladas |
   | `05-mayo-provisoria.png` | Mayo aislada |
   | `10-isla3-base.png` | isla 3 sin rocas |
   | `11-plataforma-1.png`, `12-plataforma-2.png`, `13-plataforma-3.png` | plataformas armadas |
   | `14-p1-base.png`, `14-p1-izq.png`, `14-p1-der.png`, `14-p1-tapa.png` | rocas de la plataforma 1 (igual con `15-p2-*` y `16-p3-*`) |
   | `20-roca-suelta-1.png` a `20-roca-suelta-4.png` | rocas de relleno |

7. Avisame cuando esté la carpeta. Yo recorto los fondos magenta/verde, separo capas, convierto a AVIF/WebP, optimizo y monto. Si alguna imagen no encastra, te pido solo esa de nuevo.

Qué no hace falta todavía: la caída entre nubes (islas 1 y 2), las islas 2 y 4 a 7 y el avatar de Juani. Van en la próxima tanda, después de aprobar la porción vertical.

## 7. Aprobación

Juani aprobó el 16 de noviembre de 2026 la paleta, la tipografía, la cámara base, la tabla de luz por isla, el estilo base y los prompts. Única corrección: sin notas de Mayo. Siguiente paso: generar las imágenes de la sección 6.

Hasta que lleguen las imágenes, la porción vertical se construye con escenas provisorias (degradés y formas CSS) que se reemplazan por las imágenes sin tocar el código.

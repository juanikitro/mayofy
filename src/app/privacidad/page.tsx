import type { Metadata } from "next";
import Link from "next/link";

import { AnalyticsOptOut } from "@/components/analytics-opt-out";
import { IslandNav } from "@/components/world/island-nav";
import { WorldFooter } from "@/components/world/world-footer";
import { legalEntity, legalUpdated, retention } from "@/content/legal";
import { googleAnalyticsId } from "@/lib/analytics-consent";
import { shareMetadata } from "@/lib/share-metadata";

const description =
  "Qué datos recibe Mayofy por su sitio, su formulario, su agenda y WhatsApp, qué servicios intervienen, qué cookies usa y cómo pedir que corrijan o borren tus datos.";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description,
  alternates: { canonical: "/privacidad" },
  ...shareMetadata({ title: "Política de privacidad — Mayofy", description, path: "/privacidad" }),
};

/*
 * Written from an audit of the live site and the code on 23 November 2026;
 * every third party and cookie listed here was observed, not assumed
 * (docs/plans/2026-11-23-privacidad-legales.md). Update it whenever a new
 * service, script or form field is added.
 */
/** GA4 names its session cookie after the measurement ID without "G-". */
const gaSessionCookie = `_ga_${googleAnalyticsId.replace(/^G-/, "")}`;

export default function PrivacyPage() {
  const email = <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a>;

  return (
    <div className="world">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <IslandNav />

      <main id="contenido" className="reading world-shell">
        <Link className="study__back" href="/">
          <span className="link-arrow link-arrow--back" aria-hidden="true">←</span>{" "}
          <span className="link-label">Volver al inicio</span>
        </Link>
        <h1>Política de privacidad</h1>
        <p className="reading__updated">Última actualización: {legalUpdated.privacy}</p>

        <section aria-labelledby="privacidad-resumen">
          <h2 id="privacidad-resumen">En pocas palabras</h2>
          <ul>
            <li>Usamos tus datos solo para responderte y, si trabajamos juntos, para hacer el proyecto.</li>
            <li>No los vendemos ni los usamos para publicidad.</li>
            <li>Medimos las visitas con Google Analytics, y podés apagarlo más abajo.</li>
            <li>Podés pedir ver, corregir o borrar tus datos escribiendo a {email}.</li>
          </ul>
        </section>

        <section aria-labelledby="privacidad-responsable">
          <h2 id="privacidad-responsable">Quién es responsable de tus datos</h2>
          <p>
            Mayofy es la marca de {legalEntity.name}, {legalEntity.taxStatus.toLowerCase()}, CUIT{" "}
            {legalEntity.cuit}, con domicilio en {legalEntity.locality}. Él es el responsable de los
            datos que recibe este sitio. Para cualquier consulta sobre tus datos, escribí a {email}.
          </p>
        </section>

        <section aria-labelledby="privacidad-datos">
          <h2 id="privacidad-datos">Qué datos recibimos y de dónde</h2>
          <ul>
            <li>
              <strong>Formulario de contacto:</strong> nombre, negocio o actividad, cómo contactarte,
              tipo de proyecto, plazo, presupuesto aproximado, una referencia y tu mensaje. Ninguno es
              obligatorio. El sitio no los guarda: los reenvía por correo a través de FormSubmit y
              llegan a nuestra casilla de Gmail.
            </li>
            <li>
              <strong>Agenda:</strong> si reservás una charla, Cal.com recibe tu nombre, tu correo, lo
              que quieras contarnos y el horario elegido, y te manda la confirmación.
            </li>
            <li>
              <strong>WhatsApp y correo:</strong> lo que nos escribas por esos canales. Los botones de
              WhatsApp, Instagram y LinkedIn son enlaces: esos servicios no reciben nada hasta que los
              tocás.
            </li>
            <li>
              <strong>Visitas al sitio:</strong> Google Analytics registra qué páginas y secciones
              mirás, qué botones tocás, tu tipo de dispositivo y navegador y una ubicación aproximada
              (ciudad o país). Usa un identificador al azar guardado en una cookie, no tu nombre. Nunca
              le mandamos lo que escribís en el formulario.
            </li>
            <li>
              <strong>Registros técnicos:</strong> como cualquier servidor, el alojamiento del sitio
              registra por un tiempo corto la dirección IP y el navegador de cada pedido, para
              seguridad y para resolver fallas.
            </li>
          </ul>
        </section>

        <section aria-labelledby="privacidad-usos">
          <h2 id="privacidad-usos">Para qué los usamos</h2>
          <ul>
            <li>Responder tu consulta y preparar una propuesta: los datos que nos das para eso.</li>
            <li>
              Hacer el proyecto, facturarlo y darle soporte si trabajamos juntos: los necesitamos para
              cumplir el trabajo que contrataste.
            </li>
            <li>
              Entender cómo se usa el sitio y mejorarlo, con las estadísticas de Google Analytics.
            </li>
          </ul>
          <p>
            No vendemos ni cedemos tus datos, no los usamos para publicidad y no te vamos a sumar a
            ninguna lista de correo sin pedírtelo.
          </p>
        </section>

        <section aria-labelledby="privacidad-servicios">
          <h2 id="privacidad-servicios">Qué servicios intervienen</h2>
          <p>
            Trabajamos con estos proveedores, que procesan datos por nuestra cuenta y solo para lo que
            se indica:
          </p>
          <ul>
            <li><strong>Railway</strong> (Estados Unidos): aloja el sitio.</li>
            <li><strong>FormSubmit</strong>: reenvía el formulario por correo.</li>
            <li><strong>Google</strong> (Estados Unidos y otros países): Gmail, donde recibimos tus mensajes, y Google Analytics.</li>
            <li>
              <strong>Cal.com</strong> (Estados Unidos): la agenda. Para protegerse de bots usa
              Cloudflare y registra sus propios errores con Sentry.
            </li>
            <li><strong>WhatsApp</strong> (Meta), solo si nos escribís por ahí.</li>
          </ul>
          <p>
            Varios de estos servicios guardan los datos fuera de Argentina, en países que la ley
            argentina no considera de protección adecuada, como Estados Unidos. Al escribirnos,
            reservar una charla o navegar el sitio con la medición encendida, aceptás esa
            transferencia (artículo 12 de la Ley 25.326). Las tipografías y las imágenes del sitio se
            sirven desde nuestro propio servidor, sin pasar por terceros.
          </p>
        </section>

        <section aria-labelledby="privacidad-cookies">
          <h2 id="privacidad-cookies">Cookies y medición</h2>
          <p>El sitio no muestra publicidad y usa muy pocas cookies:</p>
          <ul>
            <li>
              <strong>_ga</strong> y <strong>{gaSessionCookie}</strong>, de Google Analytics: distinguen
              una visita de otra con un identificador al azar. Duran hasta 2 años.
            </li>
            <li>
              <strong>__cf_bm</strong>, de Cloudflare para Cal.com: aparece solo cuando se carga la
              agenda, sirve para frenar bots y se borra sola a los pocos minutos sin uso.
            </li>
            <li>
              Si apagás la medición, guardamos esa elección en tu navegador para respetarla en las
              próximas visitas.
            </li>
          </ul>
          <p>
            Podés apagar Google Analytics en este navegador cuando quieras. Si tu navegador envía la
            señal Global Privacy Control, no te medimos. También podés bloquear o borrar las cookies
            desde la configuración de tu navegador.
          </p>
          <AnalyticsOptOut />
        </section>

        <section aria-labelledby="privacidad-plazos">
          <h2 id="privacidad-plazos">Cuánto tiempo los guardamos</h2>
          <ul>
            <li>Consultas que no terminan en un trabajo: {retention.inquiries}.</li>
            <li>
              Clientes: la propuesta, las facturas y los comprobantes de pago, {retention.clientRecords},
              por las obligaciones fiscales y para responder cualquier reclamo. Los chats, los
              materiales, los accesos y los archivos del proyecto, {retention.clientProject}.
            </li>
            <li>Estadísticas de Google Analytics: {retention.analytics}.</li>
          </ul>
          <p>Podés pedir que borremos tus datos antes, salvo los que la ley nos obliga a conservar.</p>
        </section>

        <section aria-labelledby="privacidad-seguridad">
          <h2 id="privacidad-seguridad">Cómo los cuidamos</h2>
          <p>
            El sitio funciona solo con conexión cifrada (HTTPS), el formulario no se guarda en el
            servidor y a tus datos accede únicamente quien trabaja en tu consulta o tu proyecto.
          </p>
        </section>

        <section aria-labelledby="privacidad-derechos">
          <h2 id="privacidad-derechos">Tus derechos</h2>
          <p>
            Podés pedir acceso, rectificación, actualización o supresión de tus datos escribiendo a{" "}
            {email}. Respondemos los pedidos de acceso dentro de los 10 días corridos y los de
            corrección o borrado dentro de los 5 días hábiles, como fija la Ley 25.326 de Protección
            de Datos Personales.
          </p>
          <p>
            El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los
            mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un
            interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley N°
            25.326.
          </p>
          <p>
            La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la
            Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan
            quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en
            materia de protección de datos personales.
          </p>
          <p>
            Si vivís en otro país, también te amparan las leyes de datos personales de tu país.
            Escribinos al mismo correo y lo resolvemos.
          </p>
        </section>

        <section aria-labelledby="privacidad-menores">
          <h2 id="privacidad-menores">Menores de edad</h2>
          <p>
            El sitio está pensado para negocios y personas adultas. Si sos menor de 18 años, pedile a
            una persona adulta que nos escriba por vos.
          </p>
        </section>

        <section aria-labelledby="privacidad-cambios">
          <h2 id="privacidad-cambios">Cambios en esta política</h2>
          <p>
            Si cambiamos cómo tratamos tus datos, vamos a actualizar esta página y la fecha de arriba.
            Las condiciones de los servicios están en los{" "}
            <Link href="/terminos">términos y condiciones</Link>.
          </p>
        </section>
      </main>

      <WorldFooter />
    </div>
  );
}

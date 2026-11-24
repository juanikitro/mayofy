import type { Metadata } from "next";
import Link from "next/link";

import { IslandNav } from "@/components/world/island-nav";
import { WorldFooter } from "@/components/world/world-footer";
import { commercialIntro, guarantees, maintenancePlan } from "@/content/commercial-plans";
import { legalDateText, legalEntity, legalUpdated } from "@/content/legal";
import { shareMetadata } from "@/lib/share-metadata";

const description =
  "Las condiciones de los servicios de Mayofy en lenguaje simple: cómo se contrata, pagos, plazos, cambios, a nombre de quién queda el trabajo, mantenimiento y cancelación.";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description,
  alternates: { canonical: "/terminos" },
  ...shareMetadata({ title: "Términos y condiciones — Mayofy", description, path: "/terminos" }),
};

/*
 * Prices, payment and maintenance limits are read from the commercial content
 * so this page never contradicts the packs. Decisions and sources:
 * docs/plans/2026-11-23-privacidad-legales.md.
 */
export default function TermsPage() {
  const email = <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a>;
  const maintenancePrices = maintenancePlan.prices.map((item) => `${item.label}: ${item.price}`).join("; ");

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
        <h1>Términos y condiciones</h1>
        <p className="reading__updated">Última actualización: {legalDateText(legalUpdated.terms)}</p>

        <section aria-labelledby="terminos-quien">
          <h2 id="terminos-quien">Quién presta el servicio</h2>
          <p>
            Mayofy es la marca de {legalEntity.name}, {legalEntity.taxStatus.toLowerCase()}, CUIT{" "}
            {legalEntity.cuit}, con domicilio en {legalEntity.locality}. Contacto: {email}.
          </p>
          <p>
            Estos términos valen para todos los trabajos. Si la propuesta que firmamos dice algo
            distinto, manda la propuesta.
          </p>
        </section>

        <section aria-labelledby="terminos-contratar">
          <h2 id="terminos-contratar">Cómo se contrata</h2>
          <ol>
            <li>Tenemos una charla gratis y sin compromiso.</li>
            <li>
              Te mandamos una propuesta escrita con el alcance, el precio en USD, el plazo, el
              cronograma de pagos y las vueltas de cambios incluidas. Vale 15 días.
            </li>
            <li>
              El trabajo arranca cuando aceptás la propuesta por escrito (correo o WhatsApp), pagás el
              anticipo y nos mandás el material (textos, fotos, accesos).
            </li>
          </ol>
          <p>
            Los precios publicados en el sitio son de referencia (&quot;desde&quot;). El precio que
            vale es el de tu propuesta.
          </p>
        </section>

        <section aria-labelledby="terminos-pago">
          <h2 id="terminos-pago">Pagos</h2>
          <ul>
            {commercialIntro.payment.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Si pagás en pesos, vale el dólar blue venta del día de cada pago: el monto en pesos que
            muestra la web es una referencia. Te entregamos factura por cada pago. El dominio, el alojamiento y los servicios de terceros
            que use tu proyecto (por ejemplo, los mensajes de WhatsApp que cobra Meta) se pagan aparte
            y quedan a tu nombre.
          </p>
        </section>

        <section aria-labelledby="terminos-plazos">
          <h2 id="terminos-plazos">Plazos y entrega</h2>
          <p>
            Los plazos de la propuesta son estimados y corren desde que llega tu material (textos,
            fotos, accesos). Si tardás en mandarlo o en responder, el plazo se corre lo mismo que
            tardaste.
          </p>
          <p>
            Si un proyecto queda 30 días sin respuesta de tu parte, pasa a pausa. Para retomarlo,
            reprogramamos los plazos según la agenda de ese momento.
          </p>
          <p>
            Vas viendo avances durante el trabajo. Publicamos tu web o tu sistema y te pasamos los
            accesos cuando el saldo está pagado. Después de publicar tenés una semana de soporte
            incluida para resolver dudas y cualquier falla de lo que hicimos.
          </p>
        </section>

        <section aria-labelledby="terminos-cambios">
          <h2 id="terminos-cambios">Cambios</h2>
          <p>Cada pack incluye estas vueltas de cambios:</p>
          <ul>
            <li>Landing: 1 vuelta antes de publicar.</li>
            <li>Gestión: 2 vueltas.</li>
            <li>Sistema a Medida: 1 vuelta por etapa.</li>
          </ul>
          <p>
            Lo que esté fuera del alcance acordado (una sección nueva, una función nueva, rehacer algo
            ya aprobado) lo cotizamos aparte antes de hacerlo, y solo lo hacemos si lo aceptás.
          </p>
        </section>

        <section aria-labelledby="terminos-propiedad">
          <h2 id="terminos-propiedad">A nombre de quién queda el trabajo</h2>
          <p>
            Cuando el trabajo está pagado completo, todo queda a tu nombre: el dominio, las cuentas, el
            código, los diseños y los contenidos que hicimos para vos. Podés llevarlo a otro proveedor cuando
            quieras.
          </p>
          <p>
            Las herramientas de código abierto y los servicios de terceros que usa el proyecto siguen
            con sus propias licencias. Los textos, fotos y marcas que nos das siguen siendo tuyos, y
            nos asegurás que tenés derecho a usarlos.
          </p>
          <p>
            Mostramos el trabajo terminado en nuestro portfolio solo si nos das permiso.
          </p>
        </section>

        <section aria-labelledby="terminos-datos">
          <h2 id="terminos-datos">Los datos de tus clientes</h2>
          <p>
            Si tu web o tu sistema guarda datos de tus clientes (turnos, contactos, pagos), vos sos el
            responsable de esos datos y nosotros los tratamos solo por tu cuenta: para construir,
            mantener y respaldar el sistema. No los usamos para nada más, no se los pasamos a nadie y,
            cuando termina el trabajo o el mantenimiento, te los entregamos o los borramos, como pide
            el artículo 25 de la Ley 25.326.
          </p>
        </section>

        <section aria-labelledby="terminos-garantias">
          <h2 id="terminos-garantias">Lo que garantizamos</h2>
          <ul>
            {guarantees.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            No respondemos por fallas de servicios de terceros (alojamiento, dominio, Cal.com,
            WhatsApp, pasarelas de pago) ni por cambios que hagan otras personas en el código después
            de la entrega, aunque te ayudamos a resolverlos.
          </p>
        </section>

        <section aria-labelledby="terminos-mantenimiento">
          <h2 id="terminos-mantenimiento">Mantenimiento mensual</h2>
          <p>
            Es opcional. Cuesta {maintenancePrices}. {maintenancePlan.footnotes.join(" ")}
          </p>
          <p>
            Se paga cada mes por adelantado, sin permanencia mínima. Lo podés dar de baja cuando
            quieras avisándonos con 15 días de anticipación. Revisamos el precio y las condiciones del
            mantenimiento una vez al año y te avisamos con 30 días de anticipación; si no te sirven,
            lo das de baja sin costo.
          </p>
        </section>

        <section aria-labelledby="terminos-cancelar">
          <h2 id="terminos-cancelar">Si querés cancelar</h2>
          <p>
            Si contratás como consumidor final, podés arrepentirte dentro de los 10 días corridos de
            aceptar la propuesta, sin dar explicaciones, y te devolvemos todo lo que pagaste (artículo
            34 de la Ley 24.240 de Defensa del Consumidor). Escribinos a {email} o por WhatsApp.
          </p>
          <p>
            Pasado ese plazo, podés cancelar el trabajo en cualquier momento: el anticipo no se
            devuelve, porque cubre lo que ya hicimos, y te quedás con todo lo entregado hasta ese día.
            Si cancelamos nosotros, te devolvemos lo que corresponde a lo que no entregamos.
          </p>
        </section>

        <section aria-labelledby="terminos-ley">
          <h2 id="terminos-ley">Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República Argentina. Ante cualquier problema,
            primero lo hablamos. Si no se resuelve, intervienen los tribunales ordinarios del
            Departamento Judicial de Mercedes, provincia de Buenos Aires, salvo que seas consumidor:
            en ese caso podés reclamar ante los tribunales o la oficina de defensa del consumidor de tu
            domicilio.
          </p>
        </section>

        <section aria-labelledby="terminos-cambios-pagina">
          <h2 id="terminos-cambios-pagina">Cambios en estos términos</h2>
          <p>
            Si los cambiamos, actualizamos esta página y la fecha de arriba. Un trabajo ya contratado
            sigue con los términos vigentes al aceptar su propuesta. Cómo tratamos tus datos está en la{" "}
            <Link href="/privacidad">política de privacidad</Link>.
          </p>
        </section>
      </main>

      <WorldFooter />
    </div>
  );
}

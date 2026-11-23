import type { Metadata } from "next";
import Link from "next/link";

import { IslandNav } from "@/components/world/island-nav";
import { WorldFooter } from "@/components/world/world-footer";
import { publicChannels } from "@/content/site";
import { shareMetadata } from "@/lib/share-metadata";

const description =
  "Cómo Mayofy trata los datos personales que recibe por su sitio, su formulario de contacto, su agenda y WhatsApp, y cómo pedir que los corrijan o borren.";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description,
  alternates: { canonical: "/privacidad" },
  ...shareMetadata({ title: "Política de privacidad — Mayofy", description, path: "/privacidad" }),
};

const lastUpdated = "16 de noviembre de 2026";

export default function PrivacyPage() {
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
        <p className="reading__updated">Última actualización: {lastUpdated}</p>

        <section>
          <h2>Quién es responsable de tus datos</h2>
          <p>
            Mayofy es un estudio de desarrollo web y software a medida operado por
            Juan Ignacio Portilla Kitroser, con domicilio en Argentina. Para
            cualquier consulta sobre tus datos podés escribir a{" "}
            <a href={`mailto:${publicChannels.email}`}>{publicChannels.email}</a>.
          </p>
        </section>

        <section>
          <h2>Qué datos recibimos</h2>
          <ul>
            <li>
              Los que completás en el formulario de contacto: nombre, negocio o
              actividad, canal de contacto, el tipo de proyecto, plazo,
              presupuesto aproximado, una referencia y tu mensaje. Ninguno es
              obligatorio.
            </li>
            <li>Los que nos enviás al escribirnos por WhatsApp o por correo.</li>
            <li>
              Los que cargás al reservar la charla en Cal.com:
              nombre, correo y lo que quieras contarnos.
            </li>
            <li>
              Datos de navegación anónimos y agregados, como páginas visitadas o
              tipo de dispositivo, mediante Google Analytics.
            </li>
          </ul>
        </section>

        <section>
          <h2>Para qué los usamos</h2>
          <p>
            Únicamente para responder tu consulta, preparar una propuesta y, si
            trabajamos juntos, llevar adelante el proyecto. Los datos de navegación
            se usan para entender cómo se usa el sitio y mejorarlo.
          </p>
          <p>
            No vendemos ni cedemos tus datos. Solo intervienen los servicios que
            hacen funcionar el sitio y la comunicación: el proveedor que recibe el
            formulario y lo reenvía por correo, WhatsApp, el correo electrónico,
            Cal.com para la agenda, Google Analytics y el alojamiento del sitio.
            Algunos de ellos pueden procesar datos fuera de Argentina.
          </p>
        </section>

        <section>
          <h2>Cuánto tiempo los guardamos</h2>
          <p>
            Mientras sea necesario para responder tu consulta y, si contratás un
            servicio, durante la relación comercial y el plazo que exijan las
            obligaciones legales y contables. Podés pedir que los borremos antes en
            cualquier momento.
          </p>
        </section>

        <section>
          <h2>Tus derechos</h2>
          <p>
            Podés pedir acceso, rectificación, actualización o supresión de tus
            datos escribiendo a{" "}
            <a href={`mailto:${publicChannels.email}`}>{publicChannels.email}</a>.
            Te respondemos dentro de los plazos de la Ley 25.326 de Protección de
            Datos Personales.
          </p>
          <p>
            El titular de los datos personales tiene la facultad de ejercer el
            derecho de acceso a los mismos en forma gratuita a intervalos no
            inferiores a seis meses, salvo que se acredite un interés legítimo al
            efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley N°
            25.326.
          </p>
          <p>
            La Agencia de Acceso a la Información Pública, en su carácter de Órgano
            de Control de la Ley N° 25.326, tiene la atribución de atender las
            denuncias y reclamos que interpongan quienes resulten afectados en sus
            derechos por incumplimiento de las normas vigentes en materia de
            protección de datos personales.
          </p>
        </section>

        <section>
          <h2>Cambios en esta política</h2>
          <p>
            Si cambiamos cómo tratamos tus datos, vamos a actualizar esta página y
            la fecha de última actualización.
          </p>
        </section>
      </main>

      <WorldFooter />
    </div>
  );
}

import type { Business } from "./business-schema.js";
import { summarizeOpeningHours } from "./hours.js";
import { businessAreaLabel, businessCityLabel } from "./location.js";

export type CommercialTone =
  | "premium-detailing"
  | "urban-custom"
  | "practical-workshop"
  | "fast-local"
  | "parts-counter"
  | "bodyshop-craft";

export type CommercialCard = {
  label?: string;
  title: string;
  body: string;
  meta?: string;
  is_demo?: boolean;
};

export type CommercialPackage = {
  name: string;
  price_label: string;
  body: string;
  items: string[];
  is_demo?: boolean;
};

export type ProcessStep = {
  step: string;
  title: string;
  body: string;
};

export type FinalCta = {
  title: string;
  body: string;
  primary_label: string;
  secondary_label: string;
};

export type BusinessProfile = {
  rubro: string;
  tone: CommercialTone;
  customerType: string;
  heroClaim: string;
  services: string[];
  serviceCards: CommercialCard[];
  trustBar: CommercialCard[];
  whyChoose: CommercialCard[];
  packages: CommercialPackage[];
  gallery: CommercialCard[];
  process: ProcessStep[];
  finalCta: FinalCta;
  resourceTitle: string;
  resourceItems: string[];
  lead: string;
  body: string;
  cta: string;
};

type ProfileDraft = {
  rubro: string;
  tone: CommercialTone;
  customerType: string;
  heroClaim: string;
  services: string[];
  serviceCards: CommercialCard[];
  whyChoose: CommercialCard[];
  packages: CommercialPackage[];
  gallery: CommercialCard[];
  process: ProcessStep[];
  resourceTitle: string;
  resourceItems: string[];
  lead: string;
  body: string;
  cta: string;
};

function hasAny(value: string, terms: string[]): boolean {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function context(business: Business): string {
  return `${business.name} ${business.category} ${business.main_product_or_service} ${business.reviews.map((review) => review.text).join(" ")}`;
}

function area(business: Business): string {
  return businessAreaLabel(business);
}

function reviewSignal(business: Business): string {
  const review = business.reviews.find((item) => item.rating >= 4 && item.text.length > 18);
  if (!review) {
    return "Opiniones reales proximamente";
  }

  return `"${review.text.slice(0, 86)}${review.text.length > 86 ? "..." : ""}"`;
}

function ratingSignal(business: Business): string {
  if (business.rating.reviews_count <= 0) {
    return "Resenas a cargar";
  }

  return `${business.rating.value.toFixed(1)} / 5`;
}

function contactSignal(business: Business): CommercialCard {
  return business.phone
    ? {
        label: "Contacto",
        title: "Telefono directo",
        body: "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
        meta: business.phone,
      }
    : {
        label: "Contacto",
        title: "Canal a confirmar",
        body: "El frontend debe dejar visible que falta cargar telefono o WhatsApp antes de publicar.",
        meta: "[WhatsApp editable]",
        is_demo: true,
      };
}

function trustBar(business: Business, hours: string, rubro: string): CommercialCard[] {
  return [
    {
      label: "Prueba social",
      title: ratingSignal(business),
      body:
        business.rating.reviews_count > 0
          ? `${business.rating.reviews_count} resenas registradas en las fuentes disponibles.`
          : "Bloque listo para cargar resenas verificadas.",
      meta: business.rating.reviews_count > 0 ? "Dato verificado" : "Editable",
      is_demo: business.rating.reviews_count <= 0,
    },
    {
      label: "Rubro",
      title: rubro,
      body: "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas.",
      meta: "Base verificada",
    },
    {
      label: "Agenda",
      title: hours,
      body: "Horario publicado para orientar la primera consulta.",
      meta: hours === "Horario a confirmar" ? "Editable" : "Dato verificado",
      is_demo: hours === "Horario a confirmar",
    },
    contactSignal(business),
    {
      label: "Confianza",
      title: "Mas de [X] vehiculos",
      body: "Placeholder editable para volumen real, anos o trabajos terminados si el negocio lo confirma.",
      meta: "Demo editable",
      is_demo: true,
    },
  ];
}

function commonGallery(rubro: string): CommercialCard[] {
  return [
    {
      label: "Antes",
      title: "Foto real del ingreso",
      body: "Espacio para mostrar el estado inicial del vehiculo, pieza o consulta.",
      meta: "Placeholder visual",
      is_demo: true,
    },
    {
      label: "Despues",
      title: "Resultado o entrega",
      body: "Lugar reservado para una foto propia del negocio, sin usar stock generico.",
      meta: "Editable",
      is_demo: true,
    },
    {
      label: rubro,
      title: "Detalle del trabajo",
      body: "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      meta: "Foto a reemplazar",
      is_demo: true,
    },
  ];
}

function finalCta(business: Business, cta: string, rubro: string): FinalCta {
  return {
    title: `${business.name}: el proximo paso es simple`,
    body: business.phone
      ? `Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: ${rubro.toLowerCase()}, direccion y horario.`
      : `Carga el telefono o WhatsApp para convertir esta landing en una via directa de consulta por ${rubro.toLowerCase()}.`,
    primary_label: cta,
    secondary_label: "Ver ubicacion",
  };
}

function completeProfile(business: Business, draft: ProfileDraft): BusinessProfile {
  const hours = summarizeOpeningHours(business.opening_hours.raw);
  return {
    ...draft,
    trustBar: trustBar(business, hours, draft.rubro).slice(0, 5),
    finalCta: finalCta(business, draft.cta, draft.rubro),
  };
}

export function buildBusinessProfile(business: Business): BusinessProfile {
  const text = context(business);
  const hours = summarizeOpeningHours(business.opening_hours.raw);
  const placeArea = area(business);

  if (hasAny(text, ["wrapping", "wrap", "ploteo", "vinilo", "vinil", "polarizado", "ppf"])) {
    return completeProfile(business, {
      rubro: "Customizacion y proteccion vehicular",
      tone: "urban-custom",
      customerType: "Conductores que quieren cambiar presencia, proteger pintura o consultar un trabajo visual antes de decidir.",
      heroClaim: "Que el auto se vea distinto antes de que arranque.",
      services: ["Wrapping o ploteo", "Polarizado", "Proteccion de pintura", "Consulta por proyecto"],
      serviceCards: [
        {
          label: "Estetica",
          title: "Cambio visual con criterio",
          body: "Landing preparada para mostrar color, terminacion y alcance del proyecto sin prometer marcas o laminas no verificadas.",
        },
        {
          label: "Proteccion",
          title: "Cuidado de pintura",
          body: "Copy orientado a proteger zonas expuestas, mantener el auto presentable y pedir una evaluacion previa.",
        },
        {
          label: "Turno",
          title: "Consulta con fotos",
          body: "CTA pensado para enviar modelo, objetivo y fotos del vehiculo antes de avanzar.",
        },
      ],
      whyChoose: [
        {
          title: "Look propio",
          body: "Direccion visual urbana, alto contraste y foco en el resultado final del auto.",
        },
        {
          title: "Proyecto claro",
          body: "Ordena pedido, referencia visual y datos del vehiculo para evitar una consulta vaga.",
        },
        {
          title: "Sin promesas falsas",
          body: "Marcas, garantia, tiempos y precios quedan como campos editables hasta tener confirmacion.",
        },
      ],
      packages: [
        {
          name: "Consulta visual",
          price_label: "Precio a confirmar",
          body: "Para revisar idea, color, zonas a intervenir y referencias.",
          items: ["Modelo y fotos del vehiculo", "Objetivo visual", "Alcance editable"],
          is_demo: true,
        },
        {
          name: "Detalle exterior",
          price_label: "[Desde editable]",
          body: "Paquete demo para una intervencion parcial o terminacion exterior.",
          items: ["Zonas a definir", "Material a confirmar", "Turno sujeto a agenda"],
          is_demo: true,
        },
        {
          name: "Proyecto integral",
          price_label: "[Presupuesto editable]",
          body: "Bloque listo para trabajos completos si el negocio los confirma.",
          items: ["Brief visual", "Revision del vehiculo", "Entrega con fotos"],
          is_demo: true,
        },
      ],
      gallery: commonGallery("Customizacion"),
      process: [
        { step: "01", title: "Enviar idea", body: "El cliente manda referencia, fotos y objetivo del cambio." },
        { step: "02", title: "Definir alcance", body: "Se separa que esta confirmado de lo que requiere presupuesto." },
        { step: "03", title: "Coordinar turno", body: "Se confirma disponibilidad, direccion y forma de contacto." },
        { step: "04", title: "Mostrar resultado", body: "La landing reserva lugar para fotos reales del antes y despues." },
      ],
      resourceTitle: "Customizacion sin consulta perdida",
      resourceItems: [
        "El visitante entiende que puede pedir una evaluacion visual.",
        "La pagina separa proyecto, alcance y datos aun no confirmados.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} puede convertir consultas de customizacion vehicular en ${placeArea} con una propuesta visual fuerte y pasos concretos.`,
      body: "La pagina debe vender deseo visual sin inventar laminas, marcas, garantia ni precios.",
      cta: "Consultar proyecto",
    });
  }

  if (hasAny(text, ["detailing", "estetica", "estética", "ceramico", "ceramica", "pulido"])) {
    return completeProfile(business, {
      rubro: "Detailing y estetica vehicular",
      tone: "premium-detailing",
      customerType: "Personas que cuidan el auto, quieren recuperar brillo, proteger terminaciones o reservar un lavado detallado.",
      heroClaim: "Que el auto vuelva a sentirse cuidado, limpio y listo para mirar de cerca.",
      services: ["Detailing", "Interior", "Exterior", "Proteccion o consulta"],
      serviceCards: [
        {
          label: "Interior",
          title: "Habitaculo con sensacion de estreno",
          body: "Copy pensado para vender limpieza profunda, orden visual y confort sin inventar tratamientos no verificados.",
        },
        {
          label: "Exterior",
          title: "Brillo y terminacion visible",
          body: "Bloque preparado para lavado detallado, descontaminado o correccion si el negocio lo confirma.",
        },
        {
          label: "Proteccion",
          title: "Cuidado despues del lavado",
          body: "Espacio editable para ceramicos, selladores o mantenimiento cuando existan datos reales.",
          is_demo: true,
        },
      ],
      whyChoose: [
        {
          title: "Resultado fotografiable",
          body: "La estructura empuja a mostrar antes/despues, detalles y terminaciones reales.",
        },
        {
          title: "Reserva simple",
          body: "El CTA lleva a consultar turno, tipo de vehiculo y necesidad concreta.",
        },
        {
          title: "Prueba social visible",
          body: "Rating, resenas y comentarios quedan arriba, no escondidos al final.",
        },
      ],
      packages: [
        {
          name: "Lavado detallado",
          price_label: "Precio a confirmar",
          body: "Para exterior e interior con foco en presentacion general.",
          items: ["Exterior", "Interior", "Terminacion visual"],
          is_demo: true,
        },
        {
          name: "Interior profundo",
          price_label: "[Desde editable]",
          body: "Paquete editable para butacas, alfombras, plasticos y olor.",
          items: ["Aspirado detallado", "Superficies interiores", "Fotos del estado inicial"],
          is_demo: true,
        },
        {
          name: "Proteccion premium",
          price_label: "[Presupuesto editable]",
          body: "Lugar para ceramico, sellador o proteccion si el negocio lo ofrece.",
          items: ["Evaluacion previa", "Producto a confirmar", "Mantenimiento recomendado"],
          is_demo: true,
        },
      ],
      gallery: commonGallery("Detailing"),
      process: [
        { step: "01", title: "Contar el estado del auto", body: "El cliente consulta por interior, exterior o detalle puntual." },
        { step: "02", title: "Elegir nivel de trabajo", body: "La pagina propone paquetes editables y deja claro que el precio se confirma." },
        { step: "03", title: "Reservar turno", body: "CTA directo a telefono o WhatsApp cuando esta disponible." },
        { step: "04", title: "Registrar resultado", body: "Bloque de galeria listo para cargar fotos reales del trabajo terminado." },
      ],
      resourceTitle: "Servicios pensados para que el auto se note",
      resourceItems: [
        "Hero emocional, servicios claros y CTA de turno.",
        "Paquetes demo editables para subir el valor percibido sin falsear precios.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} se presenta como una opcion para cuidar estetica, limpieza y terminacion del vehiculo en ${placeArea}.`,
      body: "La landing debe vender resultado visual y reserva de turno, apoyada en datos reales y placeholders editables.",
      cta: "Reservar turno",
    });
  }

  if (hasAny(text, ["lavadero", "lavado"])) {
    return completeProfile(business, {
      rubro: "Lavadero de autos",
      tone: "premium-detailing",
      customerType: "Conductores que quieren resolver lavado, interior o exterior sin comparar mil mensajes.",
      heroClaim: "Salir con el auto limpio, prolijo y sin vueltas.",
      services: ["Lavado exterior", "Interior", "Lavado completo", "Consulta por disponibilidad"],
      serviceCards: [
        {
          label: "Exterior",
          title: "Carroceria presentable",
          body: "Servicio explicado desde el beneficio: llegar con el auto limpio y una terminacion cuidada.",
        },
        {
          label: "Interior",
          title: "Cabina lista para usar",
          body: "Bloque para aspirado, superficies y detalles internos solo si el negocio los confirma.",
          is_demo: true,
        },
        {
          label: "Turno",
          title: "Pasar o coordinar",
          body: "La landing reduce friccion: horario, direccion, telefono y CTA visibles.",
        },
      ],
      whyChoose: [
        {
          title: "Rapidez para decidir",
          body: "El usuario ve servicio, horario, resenas y contacto en el primer scroll.",
        },
        {
          title: "Servicios empaquetados",
          body: "Combos demo ayudan a vender sin inventar precios; se editan antes de publicar.",
        },
        {
          title: "Fotos con contexto",
          body: "Galeria pensada para autos reales del lavadero, no imagen generica vacia.",
        },
      ],
      packages: [
        {
          name: "Lavado exterior",
          price_label: "Precio a confirmar",
          body: "Para resolver presentacion diaria del auto.",
          items: ["Exterior", "Secado", "Terminacion visual"],
          is_demo: true,
        },
        {
          name: "Completo interior/exterior",
          price_label: "[Desde editable]",
          body: "Combo demo para vender una visita mas completa.",
          items: ["Exterior", "Interior", "Consulta por demora"],
          is_demo: true,
        },
        {
          name: "Detalle puntual",
          price_label: "[Editable]",
          body: "Espacio para agregar motor, tapizados o tratamiento si se verifica.",
          items: ["Necesidad puntual", "Foto previa", "Turno a confirmar"],
          is_demo: true,
        },
      ],
      gallery: commonGallery("Lavado"),
      process: [
        { step: "01", title: "Elegir tipo de lavado", body: "Exterior, interior o completo segun necesidad." },
        { step: "02", title: "Confirmar horario", body: "La pagina muestra disponibilidad publicada y contacto." },
        { step: "03", title: "Dejar o esperar", body: "Texto editable segun modalidad real del negocio." },
        { step: "04", title: "Retirar limpio", body: "La galeria puede mostrar resultados reales del local." },
      ],
      resourceTitle: "Lavado claro, CTA directo",
      resourceItems: [
        "Servicios presentados como decisiones simples.",
        "Paquetes demo editables para no dejar la landing vacia.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} facilita consultar lavado y cuidado del auto en ${placeArea}, con contacto y horario visibles desde el inicio.`,
      body: "La pagina convierte un servicio cotidiano en una decision rapida: que incluye, cuando consultar y como llegar.",
      cta: "Consultar lavado",
    });
  }

  if (hasAny(text, ["lubricentro", "lubricante", "aceite", "filtro"])) {
    return completeProfile(business, {
      rubro: "Lubricentro",
      tone: "practical-workshop",
      customerType: "Conductores que necesitan mantenimiento simple, filtros o cambio de aceite con datos claros.",
      heroClaim: "Mantenimiento del auto sin vueltas: dato, consulta y turno.",
      services: ["Cambio de aceite", "Lubricantes", "Filtros", "Consulta por mantenimiento"],
      serviceCards: [
        {
          label: "Aceite",
          title: "Cambio con datos del vehiculo",
          body: "Pide modelo, kilometraje y uso del auto antes de prometer producto o precio.",
        },
        {
          label: "Filtros",
          title: "Chequeo de consumibles",
          body: "Bloque editable para filtros y repuestos de mantenimiento cuando haya disponibilidad real.",
          is_demo: true,
        },
        {
          label: "Agenda",
          title: "Consulta de paso",
          body: "CTA directo para confirmar horario y evitar ir sin datos.",
        },
      ],
      whyChoose: [
        {
          title: "Menos friccion",
          body: "La pagina dice que informacion llevar para que la consulta sea util.",
        },
        {
          title: "Sin inventar marcas",
          body: "Marcas, stock y precios quedan fuera hasta que el negocio los confirme.",
        },
        {
          title: "Mantenimiento ordenado",
          body: "Servicios, proceso y contacto aparecen en un flujo logico.",
        },
      ],
      packages: [
        {
          name: "Cambio de aceite",
          price_label: "Precio a confirmar",
          body: "Paquete demo para publicar cuando se definan productos y mano de obra.",
          items: ["Aceite a confirmar", "Filtro si corresponde", "Datos del vehiculo"],
          is_demo: true,
        },
        {
          name: "Chequeo rapido",
          price_label: "[Editable]",
          body: "Bloque para mantenimiento preventivo si el negocio lo ofrece.",
          items: ["Kilometraje", "Uso del auto", "Consulta de consumibles"],
          is_demo: true,
        },
        {
          name: "Kit mantenimiento",
          price_label: "[Presupuesto editable]",
          body: "Espacio para combos reales de filtros o lubricantes.",
          items: ["Stock a confirmar", "Marca no inventada", "Turno sujeto a agenda"],
          is_demo: true,
        },
      ],
      gallery: commonGallery("Lubricentro"),
      process: [
        { step: "01", title: "Enviar datos del auto", body: "Modelo, motor si se conoce y kilometraje." },
        { step: "02", title: "Confirmar producto", body: "El negocio valida lubricante, filtro y disponibilidad real." },
        { step: "03", title: "Coordinar visita", body: "Horario, direccion y telefono quedan visibles." },
        { step: "04", title: "Registrar proximo cambio", body: "Campo editable para recomendaciones reales del local." },
      ],
      resourceTitle: "Mantenimiento simple, sin promesas de stock",
      resourceItems: [
        "La consulta pide modelo, kilometraje y necesidad.",
        "No se inventan marcas, stock, garantia ni precios.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} ofrece una referencia directa para mantenimiento, lubricantes y consultas del auto en ${placeArea}.`,
      body: "El contenido se centra en convertir la primera consulta en algo concreto: datos del vehiculo, horario, direccion y telefono.",
      cta: "Consultar mantenimiento",
    });
  }

  if (hasAny(text, ["gomeria", "gomería", "cubierta", "pinchadura", "auxilio", "rueda"])) {
    const hasAuxilio = hasAny(text, ["auxilio", "24 hs", "24 horas"]) || hours.includes("24 horas");
    return completeProfile(business, {
      rubro: "Gomeria",
      tone: hasAuxilio ? "fast-local" : "practical-workshop",
      customerType: hasAuxilio ? "Conductores que necesitan resolver una cubierta rapido." : "Conductores que buscan reparar, cambiar o consultar cubiertas en local.",
      heroClaim: hasAuxilio ? "Cuando una cubierta te frena, el CTA tiene que estar primero." : "Cubiertas, pinchaduras y consultas con direccion clara.",
      services: hasAuxilio
        ? ["Cubiertas", "Pinchaduras", "Auxilio", "Atencion 24 horas"]
        : ["Cubiertas", "Pinchaduras", "Balanceo y consulta", "Atencion en local"],
      serviceCards: [
        {
          label: "Pinchadura",
          title: "Resolver sin perder tiempo",
          body: "La landing prioriza telefono, ubicacion y el dato de disponibilidad.",
        },
        {
          label: "Cubiertas",
          title: "Consulta por medida",
          body: "El copy pide medida y modelo antes de hablar de stock, marca o precio.",
        },
        {
          label: hasAuxilio ? "Auxilio" : "Local",
          title: hasAuxilio ? "Llamar primero" : "Pasar con el dato justo",
          body: hasAuxilio
            ? "CTA de urgencia arriba y bloque de horario visible."
            : "Direccion, horario y resenas ordenados para decidir si acercarse.",
        },
      ],
      whyChoose: [
        {
          title: "Consulta concreta",
          body: "Pedir medida, estado y urgencia evita mensajes que no se pueden responder.",
        },
        {
          title: "Confianza local",
          body: "Rating, resenas y direccion aparecen como prueba rapida.",
        },
        {
          title: "Sin stock inventado",
          body: "Marcas, medidas disponibles y precios quedan a confirmar.",
        },
      ],
      packages: [
        {
          name: "Pinchadura",
          price_label: "Precio a confirmar",
          body: "Consulta demo para evaluar reparacion o reemplazo.",
          items: ["Estado de la cubierta", "Medida", "Disponibilidad"],
          is_demo: true,
        },
        {
          name: "Cambio de cubierta",
          price_label: "[Presupuesto editable]",
          body: "Bloque editable para venta o montaje si el local lo confirma.",
          items: ["Medida a consultar", "Stock a confirmar", "Trabajo en local"],
          is_demo: true,
        },
        {
          name: hasAuxilio ? "Auxilio" : "Balanceo / consulta",
          price_label: "[Editable]",
          body: hasAuxilio ? "Campo para condiciones reales de auxilio." : "Campo para servicios complementarios verificados.",
          items: hasAuxilio ? ["Ubicacion del vehiculo", "Telefono visible", "Disponibilidad real"] : ["Servicio a confirmar", "Turno", "Direccion"],
          is_demo: true,
        },
      ],
      gallery: commonGallery("Gomeria"),
      process: [
        { step: "01", title: "Contar el problema", body: "Pinchadura, cubierta baja, cambio o consulta por medida." },
        { step: "02", title: "Mandar dato clave", body: "Medida, foto o ubicacion si aplica." },
        { step: "03", title: "Confirmar disponibilidad", body: "El negocio valida horario, stock o auxilio real." },
        { step: "04", title: "Resolver en local", body: "Direccion y contacto quedan listos para ir." },
      ],
      resourceTitle: hasAuxilio ? "Auxilio y cubiertas con CTA de urgencia" : "Para resolver cubiertas sin perder tiempo",
      resourceItems: [
        "Direccion visible para llegar directo al local.",
        hasAuxilio ? "Contacto util para urgencias y auxilios." : "Telefono o bloque editable para consultar antes de ir.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} concentra lo importante para resolver cubiertas, pinchaduras y consultas de gomeria en ${placeArea}.`,
      body: "La pagina prioriza accion rapida, datos utiles y ausencia de stock inventado.",
      cta: hasAuxilio ? "Consultar auxilio" : "Consultar disponibilidad",
    });
  }

  if (hasAny(text, ["chapa", "pintura", "golpe", "choque", "pulido"])) {
    return completeProfile(business, {
      rubro: "Chapa y pintura",
      tone: "bodyshop-craft",
      customerType: "Dueños de autos que necesitan evaluar un golpe, pintura o terminacion antes de dejar el vehiculo.",
      heroClaim: "El golpe se consulta con fotos, alcance claro y criterio de terminacion.",
      services: ["Chapa", "Pintura", "Reparaciones", "Consulta con fotos"],
      serviceCards: [
        {
          label: "Chapa",
          title: "Evaluacion del dano",
          body: "Pide fotos y zona afectada antes de prometer plazos o presupuestos.",
        },
        {
          label: "Pintura",
          title: "Terminacion visible",
          body: "La landing deja lugar para mostrar trabajos reales de color, brillo y ajuste.",
        },
        {
          label: "Consulta",
          title: "Primer diagnostico",
          body: "CTA para enviar imagenes y coordinar una visita al taller.",
        },
      ],
      whyChoose: [
        {
          title: "Oficio, no plantilla",
          body: "Visual editorial de taller, superficies, marcas de trabajo y proceso.",
        },
        {
          title: "Antes/despues necesario",
          body: "La pagina obliga a mostrar evidencia visual cuando el negocio la tenga.",
        },
        {
          title: "Sin plazos inventados",
          body: "Tiempo, garantia y presupuesto quedan a confirmar con el caso real.",
        },
      ],
      packages: [
        {
          name: "Evaluacion con fotos",
          price_label: "Sin precio publicado",
          body: "Para entender dano, zona y necesidad antes de presupuestar.",
          items: ["Fotos del golpe", "Zona afectada", "Direccion del taller"],
          is_demo: true,
        },
        {
          name: "Reparacion puntual",
          price_label: "[Presupuesto editable]",
          body: "Bloque demo para trabajos chicos cuando el taller lo confirme.",
          items: ["Alcance a definir", "Materiales a confirmar", "Turno"],
          is_demo: true,
        },
        {
          name: "Pintura / terminacion",
          price_label: "[A cotizar]",
          body: "Espacio para trabajos de pintura verificados por el negocio.",
          items: ["Color", "Paneles afectados", "Revision presencial"],
          is_demo: true,
        },
      ],
      gallery: commonGallery("Chapa y pintura"),
      process: [
        { step: "01", title: "Enviar fotos", body: "Golpe, lateral afectado, detalle de pintura o pieza." },
        { step: "02", title: "Separar alcance", body: "Se define si requiere visita, repuesto o presupuesto formal." },
        { step: "03", title: "Coordinar taller", body: "Contacto, horario y direccion se muestran sin friccion." },
        { step: "04", title: "Cargar antes/despues", body: "La galeria queda lista para trabajos reales terminados." },
      ],
      resourceTitle: "Para evaluar una reparacion de carroceria",
      resourceItems: [
        "Direccion y contacto visibles para consultar el trabajo.",
        "Resenas publicas para revisar referencias de terminacion y atencion.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} ayuda a convertir consultas de chapa, pintura o reparacion de carroceria en ${placeArea} en pedidos con fotos y alcance claro.`,
      body: "La pagina ordena la consulta sin prometer presupuesto, plazo ni resultado no verificado.",
      cta: "Consultar reparacion",
    });
  }

  if (hasAny(text, ["repuesto", "repuestos", "autopart", "parts", "accesorio", "accesorios", "auto parts"])) {
    return completeProfile(business, {
      rubro: "Repuestos para autos",
      tone: "parts-counter",
      customerType: "Clientes que buscan disponibilidad de una pieza, accesorio o dato de mostrador.",
      heroClaim: "Consulta de repuesto con el dato del auto listo desde el primer mensaje.",
      services: ["Repuestos", "Accesorios", "Consulta por disponibilidad", "Atencion en local"],
      serviceCards: [
        {
          label: "Consulta",
          title: "Pedir pieza con datos",
          body: "Modelo, ano, motor o foto de la pieza antes de hablar de stock.",
        },
        {
          label: "Mostrador",
          title: "Direccion y horario",
          body: "La pagina facilita llegar o llamar sin inventar catalogo.",
        },
        {
          label: "Disponibilidad",
          title: "Stock a confirmar",
          body: "El bloque comercial explica que marcas, precios y unidades se validan en el contacto.",
          is_demo: true,
        },
      ],
      whyChoose: [
        {
          title: "Menos ida y vuelta",
          body: "El usuario sabe que datos mandar para que la consulta sea util.",
        },
        {
          title: "Mostrador claro",
          body: "Direccion, horario y telefono dominan la landing.",
        },
        {
          title: "Sin catalogo falso",
          body: "No se listan marcas, stock ni promociones si no estan verificadas.",
        },
      ],
      packages: [
        {
          name: "Consulta por pieza",
          price_label: "Precio a confirmar",
          body: "Para pedir disponibilidad con datos del vehiculo.",
          items: ["Modelo", "Ano o motor", "Foto o codigo si existe"],
          is_demo: true,
        },
        {
          name: "Accesorio puntual",
          price_label: "[Editable]",
          body: "Bloque para accesorios reales si el comercio los confirma.",
          items: ["Tipo de accesorio", "Compatibilidad", "Stock a validar"],
          is_demo: true,
        },
        {
          name: "Retiro en local",
          price_label: "A coordinar",
          body: "CTA para confirmar horario y direccion antes de pasar.",
          items: ["Horario", "Direccion", "Telefono"],
          is_demo: true,
        },
      ],
      gallery: commonGallery("Repuestos"),
      process: [
        { step: "01", title: "Mandar dato del vehiculo", body: "Modelo, ano, motor o foto de la pieza." },
        { step: "02", title: "Validar compatibilidad", body: "El local confirma si corresponde consultar stock." },
        { step: "03", title: "Confirmar precio y retiro", body: "Precio, marca y disponibilidad no se inventan en la landing." },
        { step: "04", title: "Pasar por mostrador", body: "Direccion y horario quedan visibles." },
      ],
      resourceTitle: "Para consultar repuestos sin perder datos",
      resourceItems: [
        "Nombre, direccion y telefono reunidos para una consulta directa.",
        "Resenas visibles para evaluar atencion y disponibilidad.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} presenta datos practicos para consultar repuestos, accesorios o disponibilidad en ${placeArea}.`,
      body: "El sitio evita inventar stock, marcas o precios y orienta la consulta hacia datos concretos del vehiculo.",
      cta: "Consultar repuesto",
    });
  }

  if (hasAny(text, ["mecanica", "mecánica", "multimarca", "taller", "reparacion", "service"])) {
    return completeProfile(business, {
      rubro: "Taller mecanico",
      tone: "practical-workshop",
      customerType: "Conductores que necesitan diagnostico, mantenimiento o una primera consulta confiable.",
      heroClaim: "Primero entender que le pasa al auto. Despues, coordinar bien el turno.",
      services: ["Mecanica general", "Service", "Diagnostico", "Consulta por turno"],
      serviceCards: [
        {
          label: "Diagnostico",
          title: "Consulta con sintomas",
          body: "La landing pide ruido, falla, kilometraje y contexto antes de prometer una solucion.",
        },
        {
          label: "Service",
          title: "Mantenimiento ordenado",
          body: "Bloque para service o revision si el taller lo confirma.",
          is_demo: true,
        },
        {
          label: "Turno",
          title: "Llamar con datos",
          body: "CTA enfocado en coordinar horario, necesidad y disponibilidad.",
        },
      ],
      whyChoose: [
        {
          title: "Consulta mas clara",
          body: "El visitante sabe que informacion dar antes de llevar el auto.",
        },
        {
          title: "Confianza visible",
          body: "Resenas, rating y direccion aparecen como respaldo local.",
        },
        {
          title: "Sin diagnostico inventado",
          body: "La landing no promete fallas resueltas ni marcas atendidas si no existen datos.",
        },
      ],
      packages: [
        {
          name: "Diagnostico inicial",
          price_label: "A confirmar",
          body: "Para evaluar sintomas y definir siguiente paso.",
          items: ["Sintoma", "Kilometraje", "Turno"],
          is_demo: true,
        },
        {
          name: "Service preventivo",
          price_label: "[Editable]",
          body: "Espacio para servicios confirmados por el taller.",
          items: ["Aceite/filtros si aplica", "Revision", "Datos del vehiculo"],
          is_demo: true,
        },
        {
          name: "Reparacion puntual",
          price_label: "[Presupuesto editable]",
          body: "Bloque para trabajos reales luego de diagnostico.",
          items: ["Falla reportada", "Revision presencial", "Piezas a confirmar"],
          is_demo: true,
        },
      ],
      gallery: commonGallery("Taller mecanico"),
      process: [
        { step: "01", title: "Contar sintomas", body: "Ruido, falla, testigo, perdida o mantenimiento pendiente." },
        { step: "02", title: "Enviar datos", body: "Modelo, kilometraje y urgencia ayudan a ordenar la consulta." },
        { step: "03", title: "Coordinar turno", body: "Contacto y horario quedan visibles para avanzar." },
        { step: "04", title: "Definir trabajo", body: "Repuestos, precio y plazo se confirman despues del diagnostico real." },
      ],
      resourceTitle: "Informacion util antes de llevar el auto",
      resourceItems: [
        "Rubro y direccion destacados desde el primer bloque.",
        "Resenas visibles para evaluar la atencion.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} aparece como opcion de taller y mantenimiento automotor en ${placeArea}, con datos de contacto a mano.`,
      body: "La propuesta hace que la primera consulta sea mas precisa sin prometer diagnosticos no verificados.",
      cta: "Consultar turno",
    });
  }

  if (hasAny(text, ["ropa", "indumentaria", "boutique", "moda", "prenda", "vestimenta", "tienda de ropa"])) {
    return completeProfile(business, {
      rubro: "Indumentaria",
      tone: "premium-detailing",
      customerType: "Personas que quieren consultar disponibilidad o acercarse al local con una idea clara.",
      heroClaim: "Ver, consultar y pasar por el local sin perder datos.",
      services: ["Ropa", "Atencion en local", "Consulta por disponibilidad", "Ubicacion comercial"],
      serviceCards: [
        {
          label: "Local",
          title: "Visita con direccion clara",
          body: "Horario, ubicacion y contacto aparecen arriba.",
        },
        {
          label: "Consulta",
          title: "Disponibilidad a confirmar",
          body: "No se inventan marcas, talles, precios ni stock.",
        },
        {
          label: "Vidriera",
          title: "Fotos reales primero",
          body: "La galeria queda lista para imagenes del local o productos reales.",
          is_demo: true,
        },
      ],
      whyChoose: [
        { title: "Sin stock falso", body: "La pagina invita a consultar disponibilidad real." },
        { title: "Datos del local", body: "Direccion, horario y contacto evitan busquedas extra." },
        { title: "Fotos editables", body: "La vidriera se completa con material propio." },
      ],
      packages: [
        {
          name: "Consulta de prenda",
          price_label: "Precio a confirmar",
          body: "Para preguntar por disponibilidad real.",
          items: ["Tipo de prenda", "Talle", "Color si aplica"],
          is_demo: true,
        },
        {
          name: "Visita al local",
          price_label: "Sin precio publicado",
          body: "Direccion y horario para acercarse.",
          items: ["Horario", "Direccion", "Contacto"],
          is_demo: true,
        },
      ],
      gallery: commonGallery("Indumentaria"),
      process: [
        { step: "01", title: "Consultar prenda", body: "El cliente pregunta por tipo, talle o disponibilidad." },
        { step: "02", title: "Confirmar stock", body: "El local responde con datos reales." },
        { step: "03", title: "Coordinar visita", body: "Direccion y horario visibles." },
      ],
      resourceTitle: "Para elegir antes de acercarse",
      resourceItems: [
        "Direccion y contacto visibles para consultar disponibilidad.",
        "Resenas publicas para evaluar atencion y experiencia.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} reune datos utiles para consultar indumentaria, coordinar una visita y ubicar el local en ${placeArea}.`,
      body: "La pagina evita inventar marcas, precios o stock. Ordena contacto, horario, ubicacion y referencias publicas.",
      cta: "Consultar disponibilidad",
    });
  }

  return completeProfile(business, {
    rubro: business.category,
    tone: "practical-workshop",
    customerType: "Clientes locales que necesitan entender el servicio, llamar y llegar sin friccion.",
    heroClaim: "Una landing clara para convertir una busqueda local en una consulta concreta.",
    services: [business.main_product_or_service, "Atencion en local", "Consulta directa", `Ubicacion en ${businessCityLabel(business)}`],
    serviceCards: [
      {
        label: "Servicio",
        title: business.main_product_or_service,
        body: "El servicio principal se muestra sin agregar prestaciones no verificadas.",
      },
      {
        label: "Contacto",
        title: "Consulta directa",
        body: "Telefono, direccion y horario se ordenan para reducir friccion.",
      },
      {
        label: "Prueba",
        title: "Referencias publicas",
        body: "Rating y resenas reales sostienen la decision.",
      },
    ],
    whyChoose: [
      { title: "Datos en orden", body: "Nombre, direccion y contacto en un solo lugar." },
      { title: "Sin claims falsos", body: "No se inventan servicios, premios, precios ni trayectoria." },
      { title: "CTA claro", body: "La pagina empuja al siguiente paso verificable." },
    ],
    packages: [
      {
        name: "Consulta inicial",
        price_label: "A confirmar",
        body: "Bloque editable para convertir visitas en consultas utiles.",
        items: ["Necesidad", "Horario", "Contacto"],
        is_demo: true,
      },
      {
        name: "Servicio principal",
        price_label: "[Editable]",
        body: "Espacio para detallar alcance cuando el negocio lo confirme.",
        items: [business.main_product_or_service, "Alcance a confirmar", "Datos reales"],
        is_demo: true,
      },
    ],
    gallery: commonGallery(business.category),
    process: [
      { step: "01", title: "Contar la necesidad", body: "El visitante consulta el servicio principal." },
      { step: "02", title: "Confirmar disponibilidad", body: "El negocio valida horario, alcance y datos." },
      { step: "03", title: "Coordinar visita", body: "Direccion y contacto quedan visibles." },
    ],
    resourceTitle: "Datos claros para decidir",
    resourceItems: [
      "Nombre, direccion y contacto en un solo lugar.",
      `Resenas: ${reviewSignal(business)}.`,
      `Horario registrado: ${hours}.`,
    ],
    lead: `${business.name} presenta informacion concreta para contactar el local y conocer su servicio principal en ${placeArea}.`,
    body: "El sitio ordena datos publicos relevantes y deja como editable cualquier dato comercial no verificado.",
    cta: "Consultar",
  });
}

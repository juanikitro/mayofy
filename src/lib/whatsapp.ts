const defaultMessage =
  "Hola Juani, vi el portfolio de Mayofy y quiero contarte sobre mi negocio.";
const publicWhatsAppNumber = "542345455007";

export function getWhatsAppHref(message = defaultMessage) {
  const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(
    /\D/g,
    "",
  );
  const number = configuredNumber || publicWhatsAppNumber;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

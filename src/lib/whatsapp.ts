const defaultMessage = "Hola Juani, quiero trabajar con Mayofy...";
const publicWhatsAppNumber = "542345455007";

/**
 * Click-to-chat link. It points at api.whatsapp.com/send, not wa.me: the
 * wa.me redirect re-encodes the text and turns any character outside the
 * basic plane (every emoji) into U+FFFD, so a message typed in the contact
 * form with an emoji arrived broken (simulated user test, M7, 2026-11-20).
 */
export function getWhatsAppHref(message = defaultMessage) {
  const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(
    /\D/g,
    "",
  );
  const number = configuredNumber || publicWhatsAppNumber;

  return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
}

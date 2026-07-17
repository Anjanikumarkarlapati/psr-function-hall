export interface WhatsAppFormData {
  name: string;
  phone: string;
  email?: string;
  event: string;
  date: string;
  guests: string;
  message?: string;
}

/**
 * Constructs a WhatsApp wa.me URL with a pre-filled booking message.
 * Pure function — no side effects.
 */
export function buildWhatsAppUrl(
  data: WhatsAppFormData,
  whatsappNumber: string
): string {
  const lines = [
    '*New Booking Request — Pasumarthi Banquet Hall*',
    '',
    `*Name:* ${data.name}`,
    `*Phone:* ${data.phone}`,
    data.email ? `*Email:* ${data.email}` : null,
    `*Event:* ${data.event}`,
    `*Date:* ${data.date}`,
    `*Guests:* ${data.guests}`,
    data.message ? `\n*Special Requests:*\n${data.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines)}`;
}

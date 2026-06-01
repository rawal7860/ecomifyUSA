/**
 * Single source of truth for company contact details.
 * Update here, not in individual components.
 */

// Digits-only, for wa.me links (e.g. https://wa.me/13072180376)
export const WHATSAPP_E164 = "13072180376";

// Human-readable, for display in copy
export const WHATSAPP_DISPLAY = "+1 (307) 218-0376";

export const SUPPORT_EMAIL = "support@ecomifyusa.com";

// Convenience: a ready-to-use wa.me link with an optional prefilled message.
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_E164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Simple obfuscation for phone numbers.
 * This is NOT encryption — it's meant to prevent casual regex scraping
 * of phone numbers from JS bundles and HTML source.
 *
 * Numbers are stored as reversed, base64-encoded strings.
 * Bots searching for patterns like "91XXXXXXXXXX" or "+91" won't find them.
 */

/**
 * Encode a phone number string into an obfuscated form.
 * Use this offline to generate the values stored in data.ts.
 */
export function encodeNumber(plain: string): string {
  // Reverse the string then base64 encode
  const reversed = plain.split('').reverse().join('');
  if (typeof window !== 'undefined') {
    return btoa(reversed);
  }
  return Buffer.from(reversed).toString('base64');
}

/**
 * Decode an obfuscated number back to its original form.
 * Called at runtime only when the number is actually needed.
 */
export function decodeNumber(encoded: string): string {
  let decoded: string;
  if (typeof window !== 'undefined') {
    decoded = atob(encoded);
  } else {
    decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  }
  // Reverse back to original
  return decoded.split('').reverse().join('');
}

/**
 * Decode a display-format phone number (e.g., "+91 92081 08108").
 * Same logic as decodeNumber, just semantically named for clarity.
 */
export function decodeDisplayNumber(encoded: string): string {
  return decodeNumber(encoded);
}

/** Build a normalized tel: URL without exposing the clear number in initial markup. */
export function getPhoneTelUrl(encoded: string): string {
  const number = decodeDisplayNumber(encoded).replace(/[^\d+]/g, '');
  return `tel:${number}`;
}

/** Open the device dialer from a direct user interaction. */
export function openPhoneDialer(encoded: string): void {
  window.location.assign(getPhoneTelUrl(encoded));
}

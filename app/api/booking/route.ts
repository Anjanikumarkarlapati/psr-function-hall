import { NextRequest, NextResponse } from 'next/server';
import { decodeNumber } from '@/lib/obfuscate';
import { WHATSAPP_NUMBERS } from '@/lib/data';

// ─── In-Memory Rate Limiter ──────────────────────────────────────────────────
// Tracks requests per IP. Resets on server restart (sufficient for a static-ish site).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // max 5 booking attempts per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  return false;
}

// Clean up stale entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

// ─── Route Handler ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, phone, event, date, guests, website } = body;

    // Honeypot check — the "website" field is hidden from humans.
    // If it has a value, this is a bot.
    if (website) {
      // Return a fake "success" so bots think it worked
      return NextResponse.json({ url: 'https://wa.me/0000000000' });
    }

    // Basic validation
    if (!name || !phone || !event || !date || !guests) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Phone number validation — only digits, spaces, +, and dashes allowed; 10-15 chars
    const cleanPhone = phone.replace(/[\s\-\+]/g, '');
    if (!/^\d{10,15}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format.' },
        { status: 400 }
      );
    }

    // Guest count validation
    const guestCount = parseInt(guests, 10);
    if (isNaN(guestCount) || guestCount < 1 || guestCount > 5000) {
      return NextResponse.json(
        { error: 'Guest count must be between 1 and 5000.' },
        { status: 400 }
      );
    }

    // Build the WhatsApp URLs server-side (numbers never sent to client)
    const lines = [
      '*New Booking Request — Pasumarthi Banquet Hall*',
      '',
      `*Name:* ${name.slice(0, 100)}`, // limit lengths to prevent abuse
      `*Phone:* ${phone.slice(0, 20)}`,
      `*Event:* ${event.slice(0, 50)}`,
      `*Date:* ${date.slice(0, 20)}`,
      `*Guests:* ${guestCount}`,
    ].join('\n');

    const encodedText = encodeURIComponent(lines);

    // Build URLs for both numbers so the message reaches both owners
    const urls = WHATSAPP_NUMBERS.map((entry) => {
      const number = decodeNumber(entry.number);
      return `https://wa.me/${number}?text=${encodedText}`;
    });

    return NextResponse.json({ url: urls[0], urls });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 }
    );
  }
}

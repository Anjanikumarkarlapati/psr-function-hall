import { NextRequest, NextResponse } from 'next/server';
import { decodeNumber } from '@/lib/obfuscate';
import { EVENT_TYPES, WHATSAPP_NUMBERS } from '@/lib/data';

// This lightweight limiter is a best-effort safeguard for a single process.
// Production deployments can replace it with a shared store without changing
// the request validation below.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const EVENT_TYPE_SET = new Set(EVENT_TYPES);
const BOOKING_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const VENUE_TIME_ZONE = 'Asia/Kolkata';
const venueDateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: VENUE_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function removeExpiredRateLimits(now: number) {
  for (const [key, value] of rateLimitMap.entries()) {
    if (now >= value.resetAt) rateLimitMap.delete(key);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (rateLimitMap.size > 250) removeExpiredRateLimits(now);

  const entry = rateLimitMap.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

function getClientIp(request: NextRequest): string | null {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    null
  );
}

function getVenueDate(now = new Date()): string {
  const parts = venueDateFormatter.formatToParts(now);
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  if (!year || !month || !day) {
    return now.toISOString().slice(0, 10);
  }

  return `${year}-${month}-${day}`;
}

function isValidBookingDate(value: string): boolean {
  if (!BOOKING_DATE_PATTERN.test(value)) return false;

  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  const isRealDate =
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day;

  return isRealDate && value >= getVenueDate();
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    // Do not group unrelated visitors into a shared "unknown" rate-limit key.
    if (clientIp && isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const { name, phone, event, date, guests, website } = body as Record<
      string,
      unknown
    >;

    // Honeypot: return a harmless fake success without performing more work.
    if (typeof website === 'string' && website.trim()) {
      return NextResponse.json({ url: 'https://wa.me/0000000000' });
    }

    if (
      typeof name !== 'string' ||
      typeof phone !== 'string' ||
      typeof event !== 'string' ||
      typeof date !== 'string' ||
      (typeof guests !== 'string' && typeof guests !== 'number')
    ) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const normalizedName = name.trim();
    const normalizedPhone = phone.trim();
    const normalizedEvent = event.trim();
    const normalizedDate = date.trim();
    const normalizedGuests = String(guests).trim();

    if (
      !normalizedName ||
      !normalizedPhone ||
      !normalizedEvent ||
      !normalizedDate ||
      !normalizedGuests
    ) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (normalizedName.length > 100 || normalizedPhone.length > 20) {
      return NextResponse.json(
        { error: 'Name or phone number is too long.' },
        { status: 400 }
      );
    }

    const cleanPhone = normalizedPhone.replace(/[\s\-+]/g, '');
    if (!/^\d{10,15}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format.' },
        { status: 400 }
      );
    }

    if (!EVENT_TYPE_SET.has(normalizedEvent)) {
      return NextResponse.json(
        { error: 'Please choose a valid event type.' },
        { status: 400 }
      );
    }

    if (!isValidBookingDate(normalizedDate)) {
      return NextResponse.json(
        { error: 'Please choose a valid event date that is today or later.' },
        { status: 400 }
      );
    }

    if (!/^\d+$/.test(normalizedGuests)) {
      return NextResponse.json(
        { error: 'Guest count must be a whole number between 1 and 5000.' },
        { status: 400 }
      );
    }

    const guestCount = Number(normalizedGuests);
    if (!Number.isSafeInteger(guestCount) || guestCount < 1 || guestCount > 5000) {
      return NextResponse.json(
        { error: 'Guest count must be between 1 and 5000.' },
        { status: 400 }
      );
    }

    const lines = [
      '*New Booking Request — Pasumarthi Banquet Hall*',
      '',
      `*Name:* ${normalizedName}`,
      `*Phone:* ${normalizedPhone}`,
      `*Event:* ${normalizedEvent}`,
      `*Date:* ${normalizedDate}`,
      `*Guests:* ${guestCount}`,
    ].join('\n');

    const encodedText = encodeURIComponent(lines);
    const urls = WHATSAPP_NUMBERS.map((entry) => {
      const number = decodeNumber(entry.number);
      return `https://wa.me/${number}?text=${encodedText}`;
    });

    return NextResponse.json({ url: urls[0], urls });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

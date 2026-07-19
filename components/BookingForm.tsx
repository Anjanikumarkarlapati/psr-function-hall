'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, MapPin, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import { ADDRESS, EVENT_TYPES } from '@/lib/data';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ProtectedPhone } from './ProtectedPhone';
import { GlassDatePicker } from './GlassDatePicker';
import { useTranslation } from '@/lib/i18n';

export function BookingForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    event: '',
    date: '',
    guests: '',
    website: '', // honeypot field — bots fill this, humans never see it
  });
  const [sent, setSent] = useState(false);
  const [whatsappUrls, setWhatsappUrls] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [minimumDate, setMinimumDate] = useState<string>();

  useEffect(() => {
    const now = new Date();
    const localToday = new Date(
      now.getTime() - now.getTimezoneOffset() * 60_000
    )
      .toISOString()
      .slice(0, 10);
    setMinimumDate(localToday);
  }, []);

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setWhatsappUrls([]);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }

      // Store all WhatsApp URLs so user can send to both numbers
      const urls: string[] = data.urls || [data.url];
      setWhatsappUrls(urls);
      setSent(true);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[#111009] border border-gold/20 text-white text-[14px] sm:text-[13px] px-4 py-4 sm:py-3.5 rounded-none focus:outline-none focus:border-gold/60 placeholder:text-cream/35 transition-colors';
  const labelClass =
    'block text-cream/75 text-[10px] tracking-[0.22em] sm:tracking-[0.28em] uppercase mb-2';

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border border-gold/12 bg-dark-surface p-4 sm:p-8 space-y-5 sm:space-y-5"
      >
        <div>
          <label className={labelClass}>{t.book.labels.fullName}</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={update('name')}
            placeholder={t.book.placeholders.fullName}
            className={inputClass}
            maxLength={100}
          />
        </div>
        <div>
          <label className={labelClass}>{t.book.labels.phone}</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={update('phone')}
            placeholder={t.book.placeholders.phone}
            className={inputClass}
            maxLength={20}
          />
        </div>
        <div>
          <label className={labelClass}>{t.book.labels.eventType}</label>
          <select
            required
            value={form.event}
            onChange={update('event')}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>
              {t.book.placeholders.eventType}
            </option>
            {EVENT_TYPES.map((eventType) => (
              <option key={eventType} value={eventType}>
                {t.book.eventTypes[eventType] || eventType}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t.book.labels.eventDate}</label>
          <GlassDatePicker
            value={form.date}
            onChange={(date) => setForm((f) => ({ ...f, date }))}
            min={minimumDate}
            placeholder={t.book.placeholders.eventDate || 'Select event date'}
            required
          />
        </div>
        <div>
          <label className={labelClass}>{t.book.labels.guests}</label>
          <input
            type="number"
            required
            value={form.guests}
            onChange={update('guests')}
            placeholder={t.book.placeholders.guests}
            min="1"
            max="5000"
            className={inputClass}
          />
        </div>

        {/* Honeypot field — visually hidden from humans, bots will fill it */}
        <div
          aria-hidden="true"
          className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10 overflow-hidden"
        >
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={update('website')}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400/80 text-sm justify-center pt-1">
            <AlertCircle size={15} /> {error}
          </div>
        )}

        {!sent && (
          <button
            type="submit"
            disabled={loading}
            className="w-full py-[18px] sm:py-4 bg-[#25D366] hover:bg-[#1eb85a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold tracking-widest text-[11px] sm:text-xs uppercase transition-colors flex items-center justify-center gap-3 touch-manipulation"
          >
            <WhatsAppIcon size={18} /> {loading ? 'Sending...' : t.book.submitBtn}
          </button>
        )}

        {sent && whatsappUrls.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-400/80 text-sm justify-center">
              <CheckCircle size={15} /> {t.book.successMsg}
            </div>
            <div className="border border-gold/15 bg-[#111009] p-4 text-center space-y-2">
              <p className="text-cream/90 text-sm font-medium">
                Please send the message to both numbers below
              </p>
              <p className="text-cream/60 text-xs leading-relaxed">
                Tap each button — it will open WhatsApp with your booking details pre-filled. Just hit <span className="text-gold">Send</span> in WhatsApp.
              </p>
            </div>
            <div className="grid gap-3">
              {whatsappUrls.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-[18px] sm:py-4 bg-[#25D366] hover:bg-[#1eb85a] active:bg-[#19a34d] text-white font-bold tracking-widest text-[11px] sm:text-xs uppercase transition-colors flex items-center justify-center gap-3 touch-manipulation"
                >
                  <WhatsAppIcon size={18} /> Send to Owner {index + 1}
                </a>
              ))}
            </div>
            <p className="text-cream/55 text-[10px] text-center leading-relaxed">
              After sending to Owner 1, come back here and tap Owner 2 to confirm your booking with both contacts.
            </p>
            <button
              type="button"
              onClick={() => { setSent(false); setWhatsappUrls([]); }}
              className="w-full py-3 text-cream/60 hover:text-cream/85 text-xs transition-colors touch-manipulation"
            >
              Book another event
            </button>
          </div>
        )}
      </form>

      {/* Contact info below form */}
      <div className="mt-8 sm:mt-10 text-center text-cream/65 text-[12px] sm:text-[13px] space-y-3 sm:space-y-2.5 px-2 sm:px-0">
        <div className="leading-relaxed">
          {t.book.callPrompt}{' '}
          <ProtectedPhone encoded={ADDRESS.phone1} className="text-[12px] sm:text-[13px]" />
        </div>
        <div className="flex items-start justify-center gap-2 max-w-[280px] sm:max-w-xs mx-auto">
          <MapPin size={12} className="text-gold mt-[3px] shrink-0" />
          <span className="leading-relaxed text-[11px] sm:text-xs text-cream/70">{t.addressInfo.full}</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs">
          <Clock size={11} className="text-gold" />{' '}
          <span>{t.addressInfo.timings}</span>
        </div>
        <div className="flex items-center justify-center gap-6 sm:gap-5 pt-2 sm:pt-1">
          <a
            href={ADDRESS.gmaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-bright hover:underline text-xs flex items-center gap-1 py-2 touch-manipulation transition-colors"
          >
            <ExternalLink size={11} /> Google Maps
          </a>
          <a
            href={ADDRESS.justdial}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-bright hover:underline text-xs flex items-center gap-1 py-2 touch-manipulation transition-colors"
          >
            <ExternalLink size={11} /> JustDial
          </a>
        </div>
      </div>
    </div>
  );
}

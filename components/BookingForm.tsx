'use client';

import { useState } from 'react';
import { CheckCircle, MapPin, Clock, ExternalLink } from 'lucide-react';
import { ADDRESS, EVENT_TYPES, WHATSAPP_NUMBER } from '@/lib/data';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    event: '',
    guests: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(form, WHATSAPP_NUMBER);
    window.open(url, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  const inputClass =
    'w-full bg-[#111009] border border-gold/15 text-cream text-[13px] px-4 py-3.5 focus:outline-none focus:border-gold/50 placeholder:text-cream/15 transition-colors';
  const labelClass =
    'block text-cream/40 text-[10px] tracking-[0.28em] uppercase mb-2';

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border border-gold/12 bg-dark-surface p-8 space-y-5"
      >
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={update('name')}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone Number *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={update('phone')}
            placeholder="+91 XXXXX XXXXX"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="Optional"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Event Type *</label>
          <select
            required
            value={form.event}
            onChange={update('event')}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>
              Select event type
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Event Date *</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={update('date')}
            min={new Date().toISOString().split('T')[0]}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Number of Guests *</label>
          <input
            type="number"
            required
            value={form.guests}
            onChange={update('guests')}
            placeholder="e.g. 200"
            min="1"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Special Requests</label>
          <textarea
            value={form.message}
            onChange={update('message')}
            placeholder="Decoration theme, menu preference, special arrangements…"
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold tracking-widest text-xs uppercase transition-colors flex items-center justify-center gap-3"
        >
          <WhatsAppIcon size={18} /> Send Booking Request via WhatsApp
        </button>
        {sent && (
          <div className="flex items-center gap-2 text-green-400/80 text-sm justify-center pt-1">
            <CheckCircle size={15} /> WhatsApp opened — send the message to
            confirm your booking.
          </div>
        )}
      </form>

      {/* Contact info below form */}
      <div className="mt-10 text-center text-cream/28 text-[13px] space-y-2.5">
        <div>
          Prefer to call? <span className="text-gold">{ADDRESS.phone1}</span>
        </div>
        <div className="flex items-start justify-center gap-2 max-w-xs mx-auto">
          <MapPin size={12} className="text-gold mt-[3px] shrink-0" />
          <span className="leading-relaxed text-xs">{ADDRESS.full}</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs">
          <Clock size={11} className="text-gold" />{' '}
          <span>{ADDRESS.timings}</span>
        </div>
        <div className="flex items-center justify-center gap-5 pt-1">
          <a
            href={ADDRESS.gmaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline text-xs flex items-center gap-1"
          >
            <ExternalLink size={11} /> Google Maps
          </a>
          <a
            href={ADDRESS.justdial}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline text-xs flex items-center gap-1"
          >
            <ExternalLink size={11} /> JustDial
          </a>
        </div>
      </div>
    </div>
  );
}

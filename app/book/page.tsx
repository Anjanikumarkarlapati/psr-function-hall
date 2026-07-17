import type { Metadata } from 'next';
import { GoldRule } from '@/components/GoldRule';
import { BookingForm } from '@/components/BookingForm';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Reserve your date at Pasumarthi Banquet Hall. Fill in the form and send your booking request directly via WhatsApp.',
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="py-24 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-5">
              Reserve Your Date
            </p>
            <h1 className="text-[42px] sm:text-5xl text-cream font-bold mb-4 font-display">
              Book an Appointment
            </h1>
            <GoldRule />
            <p className="text-cream/35 text-sm leading-relaxed max-w-sm mx-auto mt-5">
              Fill in your details below. Your request will open directly in
              WhatsApp — just send it to reach our team.
            </p>
          </div>

          {/* Booking Form (client component) */}
          <BookingForm />
        </div>
      </div>
    </div>
  );
}

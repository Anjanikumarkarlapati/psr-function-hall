'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';
import { decodeDisplayNumber } from '@/lib/obfuscate';

interface ProtectedPhoneProps {
  /** The obfuscated (base64) phone number */
  encoded: string;
  /** Optional CSS class for the wrapper */
  className?: string;
  /** Show phone icon */
  showIcon?: boolean;
}

/**
 * Renders a phone number that is hidden until the user clicks/taps.
 * This prevents bots from scraping phone numbers from the DOM.
 * 
 * Before interaction: shows "Tap to reveal number"
 * After interaction: decodes and shows the actual number
 */
export function ProtectedPhone({ encoded, className = '', showIcon = false }: ProtectedPhoneProps) {
  const [revealed, setRevealed] = useState(false);
  const [number, setNumber] = useState('');

  const handleReveal = () => {
    if (!revealed) {
      // Only decode when user explicitly clicks
      setNumber(decodeDisplayNumber(encoded));
      setRevealed(true);
    }
  };

  if (revealed) {
    return (
      <a
        href={`tel:${number.replace(/\s/g, '')}`}
        className={`text-gold hover:underline transition-colors ${className}`}
      >
        {showIcon && <Phone size={12} className="inline mr-1.5 text-gold shrink-0" />}
        {number}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleReveal}
      className={`text-gold/70 hover:text-gold transition-colors cursor-pointer underline decoration-dotted underline-offset-4 ${className}`}
      aria-label="Tap to reveal phone number"
    >
      {showIcon && <Phone size={12} className="inline mr-1.5 text-gold shrink-0" />}
      Tap to reveal number
    </button>
  );
}

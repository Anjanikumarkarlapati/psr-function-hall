'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';
import {
  decodeDisplayNumber,
  getPhoneTelUrl,
  openPhoneDialer,
} from '@/lib/obfuscate';

interface ProtectedPhoneProps {
  /** The obfuscated (base64) phone number. */
  encoded: string;
  /** Optional CSS class for the wrapper. */
  className?: string;
  /** Show a phone icon inside the call action. */
  showIcon?: boolean;
}

/**
 * Keeps the clear number out of the initial DOM, then opens the device dialer
 * on the first explicit tap. The number remains visible after returning.
 */
export function ProtectedPhone({
  encoded,
  className = '',
  showIcon = false,
}: ProtectedPhoneProps) {
  const [number, setNumber] = useState('');

  const handleCall = () => {
    setNumber(decodeDisplayNumber(encoded));
    openPhoneDialer(encoded);
  };

  if (number) {
    return (
      <a
        href={getPhoneTelUrl(encoded)}
        className={`touch-manipulation text-gold transition-colors hover:underline ${className}`}
        aria-label={`Call ${number}`}
      >
        {showIcon && <Phone size={12} className="mr-1.5 inline shrink-0 text-gold" />}
        {number}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCall}
      className={`touch-manipulation cursor-pointer text-gold/70 underline decoration-dotted underline-offset-4 transition-colors hover:text-gold ${className}`}
      aria-label="Call primary phone number"
    >
      {showIcon && <Phone size={12} className="mr-1.5 inline shrink-0 text-gold" />}
      Tap to call
    </button>
  );
}

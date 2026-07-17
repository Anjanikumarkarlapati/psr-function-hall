'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Events', href: '/events' },
  { label: 'Book Now', href: '/book' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-dark/95 backdrop-blur-lg border-b border-gold/15">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-left shrink-0">
          <div
            className="text-gold font-bold text-[22px] leading-none tracking-wide font-display"
          >
            Pasumarthi
          </div>
          <div className="text-cream/30 text-[9px] tracking-[0.32em] uppercase mt-[3px]">
            Banquet Hall · Khammam
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-2 text-[13px] tracking-wide transition-all ${
                isActive(link.href)
                  ? 'text-gold'
                  : 'text-cream/50 hover:text-cream/80'
              } ${
                link.href === '/book'
                  ? 'ml-3 border border-gold/50 hover:border-gold hover:bg-gold/8 text-gold'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-cream/50 hover:text-gold transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-dark-surface border-t border-gold/10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block w-full text-left px-7 py-4 text-sm border-b border-gold/5 transition-colors ${
                isActive(link.href)
                  ? 'text-gold'
                  : 'text-cream/50 hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

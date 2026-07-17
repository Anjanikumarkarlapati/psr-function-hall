'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

function LanguageToggle() {
  const { locale, toggleLanguage } = useTranslation();
  const label = locale === 'en' ? 'Switch to Telugu' : 'Switch to English';
  const text = locale === 'en' ? 'తెలుగు' : 'English';

  return (
    <button
      onClick={toggleLanguage}
      aria-label={label}
      className="px-4 py-2.5 text-gold border border-gold/30 hover:border-gold/60 text-[13px] tracking-wide transition-all whitespace-nowrap touch-manipulation"
    >
      {text}
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  const NAV_LINKS = [
    { label: t.navbar.home, href: '/' },
    { label: t.navbar.menu, href: '/menu' },
    { label: t.navbar.events, href: '/events' },
    { label: t.navbar.bookNow, href: '/book' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-dark/95 backdrop-blur-lg border-b border-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 h-[60px] sm:h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-left shrink-0">
          <div className="text-gold font-bold text-[18px] sm:text-[22px] leading-none tracking-wide font-display">
            Pasumarthi
          </div>
          <div className="text-cream/30 text-[8px] sm:text-[9px] tracking-[0.28em] sm:tracking-[0.32em] uppercase mt-[2px] sm:mt-[3px]">
            {t.navbar.subtitle}
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
          <div className="ml-3">
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-cream/50 hover:text-gold transition-colors p-2 -mr-2 touch-manipulation"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu — slide-down with transition */}
      <div
        className={`md:hidden bg-dark-surface border-t border-gold/10 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`block w-full text-left px-7 py-4.5 text-[15px] border-b border-gold/5 transition-colors touch-manipulation ${
              isActive(link.href)
                ? 'text-gold bg-gold/5'
                : 'text-cream/60 active:text-gold active:bg-gold/5'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="px-7 py-4 border-b border-gold/5">
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}

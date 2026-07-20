'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, toggleLanguage } = useTranslation();
  const label = locale === 'en' ? 'Switch to Telugu' : 'Switch to English';
  const text = locale === 'en' ? 'తెలుగు' : 'EN';

  return (
    <button
      onClick={toggleLanguage}
      aria-label={label}
      className={`text-gold border border-gold/30 hover:border-gold/60 tracking-wide transition-all whitespace-nowrap touch-manipulation ${
        compact
          ? 'px-2.5 py-1.5 text-[11px]'
          : 'px-4 py-2.5 text-[13px]'
      }`}
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
        {/* Brand lockup */}
        <Link
          href="/"
          aria-label={`${t.navbar.brandName} — home`}
          className="group shrink-0 flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-4 focus-visible:ring-offset-dark"
        >
          <Image
            src="/images/brand-lockup.svg"
            alt="Pasumarthi Banquet Hall"
            width={760}
            height={220}
            className="h-auto w-[154px] sm:w-[190px] drop-shadow-[0_2px_8px_rgba(201,168,76,0.16)] transition-[filter,opacity] duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_3px_12px_rgba(201,168,76,0.25)]"
            priority
          />
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

        {/* Mobile: Language toggle + Hamburger */}
        <div className="flex md:hidden items-center gap-2.5">
          <LanguageToggle compact />
          <button
            className="text-cream/50 hover:text-gold active:text-gold transition-colors p-2.5 -mr-2 touch-manipulation"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
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
            className={`block w-full text-left px-7 py-[18px] text-[15px] border-b border-gold/5 transition-colors touch-manipulation ${
              isActive(link.href)
                ? 'text-gold bg-gold/5'
                : 'text-cream/60 active:text-gold active:bg-gold/5'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

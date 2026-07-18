import type { CSSProperties } from 'react';

export type GlassVariant = 'dark' | 'gold' | 'silver' | 'light' | 'chip';

export interface GlassStyle {
  background: string;
  backdropFilter: string;
  WebkitBackdropFilter: string;
  border: string;
  boxShadow: string;
}

export const glass: Record<GlassVariant, GlassStyle> = {
  dark: {
    background: 'var(--glass-dark-background)',
    backdropFilter: 'var(--glass-dark-filter)',
    WebkitBackdropFilter: 'var(--glass-dark-filter)',
    border: 'var(--glass-dark-border)',
    boxShadow: 'var(--glass-dark-shadow)',
  },
  gold: {
    background: 'var(--glass-gold-background)',
    backdropFilter: 'var(--glass-gold-filter)',
    WebkitBackdropFilter: 'var(--glass-gold-filter)',
    border: 'var(--glass-gold-border)',
    boxShadow: 'var(--glass-gold-shadow)',
  },
  silver: {
    background: 'var(--glass-silver-background)',
    backdropFilter: 'var(--glass-silver-filter)',
    WebkitBackdropFilter: 'var(--glass-silver-filter)',
    border: 'var(--glass-silver-border)',
    boxShadow: 'var(--glass-silver-shadow)',
  },
  light: {
    background: 'var(--glass-light-background)',
    backdropFilter: 'var(--glass-light-filter)',
    WebkitBackdropFilter: 'var(--glass-light-filter)',
    border: 'var(--glass-light-border)',
    boxShadow: 'var(--glass-light-shadow)',
  },
  chip: {
    background: 'var(--glass-chip-background)',
    backdropFilter: 'var(--glass-chip-filter)',
    WebkitBackdropFilter: 'var(--glass-chip-filter)',
    border: 'var(--glass-chip-border)',
    boxShadow: 'var(--glass-chip-shadow)',
  },
};

/** Get glass style as CSSProperties (type-safe for React style prop) */
export function glassStyle(variant: GlassVariant): CSSProperties {
  return glass[variant] as unknown as CSSProperties;
}

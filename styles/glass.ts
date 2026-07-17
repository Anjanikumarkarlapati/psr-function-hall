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
    background: 'rgba(6,5,4,0.62)',
    backdropFilter: 'blur(30px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(30px) saturate(1.4)',
    border: '1px solid rgba(212,170,76,0.16)',
    boxShadow:
      '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)',
  },
  gold: {
    background: 'rgba(212,170,76,0.10)',
    backdropFilter: 'blur(22px) saturate(1.3)',
    WebkitBackdropFilter: 'blur(22px) saturate(1.3)',
    border: '1px solid rgba(212,170,76,0.35)',
    boxShadow:
      '0 4px 24px rgba(212,170,76,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
  },
  silver: {
    background: 'rgba(168,165,160,0.07)',
    backdropFilter: 'blur(20px) saturate(1.2)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
    border: '1px solid rgba(168,165,160,0.22)',
    boxShadow:
      '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
  },
  light: {
    background: 'rgba(245,240,232,0.05)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(245,240,232,0.12)',
    boxShadow:
      '0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)',
  },
  chip: {
    background: 'rgba(6,5,4,0.68)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(212,170,76,0.30)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
  },
};

/** Get glass style as CSSProperties (type-safe for React style prop) */
export function glassStyle(variant: GlassVariant): CSSProperties {
  return glass[variant] as unknown as CSSProperties;
}

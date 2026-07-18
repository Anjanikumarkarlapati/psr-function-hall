import { glass, type GlassVariant } from '@/styles/glass';
import type { CSSProperties, ReactNode } from 'react';

interface GlassCardProps {
  variant?: GlassVariant;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function GlassCard({
  variant = 'dark',
  className = '',
  children,
  style,
}: GlassCardProps) {
  return (
    <div
      className={`glass-surface ${className}`}
      data-glass-variant={variant}
      style={{ ...glass[variant], ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}

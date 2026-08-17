import React from 'react';

export type BadgeTone = 'green' | 'gold' | 'neutral' | 'danger' | 'outline';

const tones: Record<BadgeTone, string> = {
  green: 'bg-pharm-100 text-pharm-700 border-pharm-200',
  gold: 'bg-gold-100 text-gold-700 border-gold-200',
  neutral: 'bg-ink-100 text-ink-600 border-ink-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  outline: 'bg-white text-ink-500 border-ink-300'
};

interface BadgeProps {
  tone?: BadgeTone;
  children: React.ReactNode;
}

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded border px-1.5 py-0.5 text-2xs font-medium ${tones[tone]}`}>
      
      {children}
    </span>);

}
export function peso(value: number, withSymbol = true): string {
  const formatted = Math.abs(value).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const sign = value < 0 ? '(' : '';
  const close = value < 0 ? ')' : '';
  return `${sign}${withSymbol ? '\u20B1' : ''}${formatted}${close}`;
}

export function shortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-PH', { month: 'short', day: '2-digit', year: 'numeric' });
}

export function daysUntil(iso: string, from = new Date('2026-08-16T00:00:00')): number {
  const target = new Date(`${iso}T00:00:00`).getTime();
  return Math.round((target - from.getTime()) / 86_400_000);
}

export type ExpiryTier = 'expired' | 'critical' | 'watch' | 'ok';

export function expiryTier(iso: string): ExpiryTier {
  const d = daysUntil(iso);
  if (d < 0) return 'expired';
  if (d <= 90) return 'critical';
  if (d <= 180) return 'watch';
  return 'ok';
}
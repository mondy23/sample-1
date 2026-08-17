import React from 'react';

interface PanelProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function Panel({ title, subtitle, actions, children, className = '', bodyClassName = '' }: PanelProps) {
  return (
    <section className={`flex flex-col rounded-md border border-ink-200 bg-white shadow-panel ${className}`}>
      <header className="flex items-center justify-between gap-3 border-b border-ink-200 px-4 py-2.5">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-ink-900">{title}</h2>
          {subtitle && <p className="truncate text-2xs text-ink-500">{subtitle}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
      </header>
      <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
    </section>);

}
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  ReceiptIcon,
  TruckIcon,
  PackageIcon,
  BookOpenIcon,
  FileBarChartIcon,
  CalendarIcon,
  BellIcon,
  CrossIcon } from
'lucide-react';

const nav = [
{ to: '/', label: 'Dashboard', icon: LayoutDashboardIcon, hint: 'F1' },
{ to: '/sales', label: 'Sales & POS', icon: ReceiptIcon, hint: 'F2' },
{ to: '/purchases', label: 'Purchases', icon: TruckIcon, hint: 'F3' },
{ to: '/inventory', label: 'Inventory', icon: PackageIcon, hint: 'F4' },
{ to: '/ledger', label: 'General Ledger', icon: BookOpenIcon, hint: 'F5' },
{ to: '/reports', label: 'Reports', icon: FileBarChartIcon, hint: 'F6' }];


const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/sales': 'Sales & POS Transactions',
  '/purchases': 'Purchases & Payables',
  '/inventory': 'Drug Inventory',
  '/ledger': 'General Ledger',
  '/reports': 'Financial Reports'
};

export function AppShell({ children }: {children: React.ReactNode;}) {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-ink-50 font-sans text-ink-800">
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-pharm-800 bg-pharm-700 md:flex">
        <div className="flex items-center gap-2 border-b border-pharm-600 px-4 py-3.5">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-gold-400 text-pharm-800">
            <CrossIcon className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight text-white">BOTICARD</p>
            <p className="text-2xs text-pharm-200">Accounting System</p>
          </div>
        </div>

        <nav aria-label="Main" className="flex-1 px-2 py-3">
          <p className="px-2 pb-1.5 text-2xs font-semibold uppercase tracking-wider text-pharm-300">Books</p>
          <ul className="space-y-0.5">
            {nav.map(({ to, label, icon: Icon, hint }) =>
            <li key={to}>
                <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                `group flex items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors duration-150 ${
                isActive ?
                'bg-white font-semibold text-pharm-700' :
                'text-pharm-100 hover:bg-pharm-600 hover:text-white'}`

                }>
                
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{label}</span>
                  <span className="nums text-2xs text-pharm-300 group-hover:text-pharm-100">{hint}</span>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="border-t border-pharm-600 px-4 py-3">
          <p className="text-2xs uppercase tracking-wider text-pharm-300">Fiscal period</p>
          <p className="nums text-sm font-semibold text-white">Aug 2026 · Open</p>
          <p className="mt-2 text-2xs text-pharm-200">Boticard Pharmacy — Main Branch</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-ink-200 bg-white px-4 py-2.5">
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight text-ink-900">
              {titles[pathname] ?? 'Boticard CAS'}
            </h1>
            <p className="nums text-2xs text-ink-500">Posting date · Sunday, 16 August 2026</p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-1.5 rounded border border-ink-300 bg-white px-2.5 py-1.5 text-xs font-medium text-ink-700 transition-colors duration-150 hover:border-pharm-500 hover:text-pharm-700 sm:flex">
              
              <CalendarIcon className="h-3.5 w-3.5" />
              Aug 1 – 16, 2026
            </button>
            <button
              type="button"
              className="relative rounded border border-ink-300 bg-white p-1.5 text-ink-600 transition-colors duration-150 hover:border-pharm-500 hover:text-pharm-700"
              aria-label="3 alerts">
              
              <BellIcon className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 text-2xs font-bold text-pharm-800">
                3
              </span>
            </button>
            <div className="flex items-center gap-2 border-l border-ink-200 pl-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pharm-100 text-2xs font-bold text-pharm-700">
                AR
              </span>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-ink-900">Ana Reyes</p>
                <p className="text-2xs text-ink-500">Bookkeeper</p>
              </div>
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4">{children}</main>
      </div>
    </div>);

}
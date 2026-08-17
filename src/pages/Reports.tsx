import React, { useState } from 'react';
import { PrinterIcon, DownloadIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { chartOfAccounts } from '../data/ledger';
import { peso } from '../utils/format';
import type { Account, AccountType } from '../types';

type ReportKey = 'trial' | 'income' | 'balance';

const tabs: {key: ReportKey;label: string;note: string;}[] = [
{ key: 'trial', label: 'Trial Balance', note: 'Unadjusted, as of Aug 16, 2026' },
{ key: 'income', label: 'Income Statement', note: 'For the period Jan 1 – Aug 16, 2026' },
{ key: 'balance', label: 'Balance Sheet', note: 'As of Aug 16, 2026' }];


const netOf = (types: AccountType[]) =>
chartOfAccounts.filter((a) => types.includes(a.type));

const sum = (accounts: Account[], side: 'debit' | 'credit') =>
accounts.reduce((s, a) => s + a[side], 0);

const revenue = netOf(['Revenue']);
const expenses = netOf(['Expense']);
const grossRevenue = sum(revenue, 'credit') - sum(revenue, 'debit');
const cogs = chartOfAccounts.find((a) => a.code === '5010')?.debit ?? 0;
const operatingExpenses = expenses.filter((a) => a.code !== '5010');
const opexTotal = sum(operatingExpenses, 'debit');
const netIncome = grossRevenue - cogs - opexTotal;

const assets = netOf(['Asset']);
const liabilities = netOf(['Liability']);
const equity = netOf(['Equity']);
const totalAssets = sum(assets, 'debit') - sum(assets, 'credit');
const totalLiabilities = sum(liabilities, 'credit') - sum(liabilities, 'debit');
const capital = sum(equity, 'credit') - sum(equity, 'debit');
const totalEquity = capital + netIncome;

function Row({ label, code, value, bold = false, indent = false }: {label: string;code?: string;value: number;bold?: boolean;indent?: boolean;}) {
  return (
    <tr className={bold ? 'border-t border-ink-300 font-semibold' : 'border-t border-ink-100'}>
      <td className={`px-4 py-1.5 ${indent ? 'pl-8' : ''} ${bold ? 'text-ink-900' : 'text-ink-800'}`}>
        {code && <span className="nums mr-1.5 text-2xs text-ink-400">{code}</span>}
        {label}
      </td>
      <td className="nums px-4 py-1.5 text-right text-ink-900">{peso(value)}</td>
    </tr>);

}

function SectionTitle({ children }: {children: React.ReactNode;}) {
  return (
    <tr className="bg-ink-50">
      <td colSpan={2} className="px-4 py-1.5 text-2xs font-bold uppercase tracking-wide text-ink-600">
        {children}
      </td>
    </tr>);

}

export function Reports() {
  const [active, setActive] = useState<ReportKey>('trial');
  const activeTab = tabs.find((t) => t.key === active)!;
  const totalDebit = sum(chartOfAccounts, 'debit');
  const totalCredit = sum(chartOfAccounts, 'credit');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-1 rounded-md border border-ink-200 bg-white p-1 shadow-panel">
        {tabs.map((t) =>
        <button
          key={t.key}
          type="button"
          onClick={() => setActive(t.key)}
          aria-current={active === t.key}
          className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
          active === t.key ? 'bg-pharm-600 text-white' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'}`
          }>
          
            {t.label}
          </button>
        )}
        <div className="ml-auto flex items-center gap-1.5 pr-1">
          <button
            type="button"
            className="flex items-center gap-1 rounded border border-ink-300 px-2 py-1.5 text-xs font-medium text-ink-700 transition-colors duration-150 hover:border-pharm-500 hover:text-pharm-700">
            
            <PrinterIcon className="h-3.5 w-3.5" />
            Print
          </button>
          <button
            type="button"
            className="flex items-center gap-1 rounded border border-ink-300 px-2 py-1.5 text-xs font-medium text-ink-700 transition-colors duration-150 hover:border-pharm-500 hover:text-pharm-700">
            
            <DownloadIcon className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      <Panel title={`Boticard Pharmacy — ${activeTab.label}`} subtitle={activeTab.note} className="max-w-3xl">
        {active === 'trial' &&
        <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-2xs uppercase tracking-wide text-ink-500">
                <th className="px-4 py-2 text-left font-semibold">Account</th>
                <th className="px-4 py-2 text-right font-semibold">Debit</th>
                <th className="px-4 py-2 text-right font-semibold">Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {chartOfAccounts.map((a) =>
            <tr key={a.code} className="hover:bg-ink-50">
                  <td className="px-4 py-1.5 text-ink-800">
                    <span className="nums mr-1.5 text-2xs text-ink-400">{a.code}</span>
                    {a.name}
                  </td>
                  <td className="nums px-4 py-1.5 text-right text-ink-900">{a.debit ? peso(a.debit) : ''}</td>
                  <td className="nums px-4 py-1.5 text-right text-ink-900">{a.credit ? peso(a.credit) : ''}</td>
                </tr>
            )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink-300 bg-ink-50 font-semibold text-ink-900">
                <td className="px-4 py-2">Totals</td>
                <td className="nums px-4 py-2 text-right">{peso(totalDebit)}</td>
                <td className="nums px-4 py-2 text-right">{peso(totalCredit)}</td>
              </tr>
            </tfoot>
          </table>
        }

        {active === 'income' &&
        <table className="w-full text-sm">
            <tbody>
              <SectionTitle>Revenue</SectionTitle>
              {revenue.map((a) =>
            <Row
              key={a.code}
              code={a.code}
              label={a.name}
              value={a.debit > 0 ? -a.debit : a.credit}
              indent />

            )}
              <Row label="Net sales" value={grossRevenue} bold />

              <SectionTitle>Cost of sales</SectionTitle>
              <Row code="5010" label="Cost of Goods Sold" value={cogs} indent />
              <Row label="Gross profit" value={grossRevenue - cogs} bold />

              <SectionTitle>Operating expenses</SectionTitle>
              {operatingExpenses.map((a) =>
            <Row key={a.code} code={a.code} label={a.name} value={a.debit} indent />
            )}
              <Row label="Total operating expenses" value={opexTotal} bold />
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink-300 bg-pharm-50 text-base font-bold">
                <td className="px-4 py-2.5 text-ink-900">Net income</td>
                <td className="nums px-4 py-2.5 text-right text-pharm-700">{peso(netIncome)}</td>
              </tr>
            </tfoot>
          </table>
        }

        {active === 'balance' &&
        <table className="w-full text-sm">
            <tbody>
              <SectionTitle>Assets</SectionTitle>
              {assets.map((a) =>
            <Row key={a.code} code={a.code} label={a.name} value={a.debit > 0 ? a.debit : -a.credit} indent />
            )}
              <Row label="Total assets" value={totalAssets} bold />

              <SectionTitle>Liabilities</SectionTitle>
              {liabilities.map((a) =>
            <Row key={a.code} code={a.code} label={a.name} value={a.credit} indent />
            )}
              <Row label="Total liabilities" value={totalLiabilities} bold />

              <SectionTitle>Owner's equity</SectionTitle>
              {equity.map((a) =>
            <Row key={a.code} code={a.code} label={a.name} value={a.credit > 0 ? a.credit : -a.debit} indent />
            )}
              <Row label="Net income for the period" value={netIncome} indent />
              <Row label="Total owner's equity" value={totalEquity} bold />
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink-300 bg-pharm-50 text-base font-bold">
                <td className="px-4 py-2.5 text-ink-900">Total liabilities & equity</td>
                <td className="nums px-4 py-2.5 text-right text-pharm-700">{peso(totalLiabilities + totalEquity)}</td>
              </tr>
            </tfoot>
          </table>
        }
      </Panel>

      <p className="max-w-3xl text-2xs text-ink-500">
        Reports are generated from posted journal vouchers only. One adjusting voucher is still unposted, so the
        figures above will shift once the expired-stock write-off is recorded.
      </p>
    </div>);

}
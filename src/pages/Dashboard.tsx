import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowRightIcon, AlertTriangleIcon, CheckIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Badge } from '../components/ui/Badge';
import { sales, salesTrend } from '../data/sales';
import { inventory, inventoryValuation } from '../data/inventory';
import { purchases, payablesAging } from '../data/purchases';
import { journalEntries } from '../data/ledger';
import { peso, daysUntil, expiryTier } from '../utils/format';

const posted = sales.filter((s) => s.status === 'Posted');
const takings = posted.reduce((sum, s) => sum + s.total, 0);
const cashTakings = posted.filter((s) => s.payment === 'Cash').reduce((s, i) => s + i.total, 0);
const digitalTakings = posted.
filter((s) => s.payment === 'GCash' || s.payment === 'Card').
reduce((s, i) => s + i.total, 0);
const chargeTakings = posted.filter((s) => s.payment === 'Charge').reduce((s, i) => s + i.total, 0);
const vatCollected = posted.reduce((s, i) => s + i.vat, 0);
const discountsGiven = posted.reduce((s, i) => s + i.discount, 0);
const payablesTotal = payablesAging.reduce((s, i) => s + i.amount, 0);
const overdue = purchases.filter((p) => p.status !== 'Paid' && daysUntil(p.dueDate) < 0);
const unposted = journalEntries.filter((e) => !e.posted);
const expiring = inventory.
filter((i) => expiryTier(i.expiry) === 'expired' || expiryTier(i.expiry) === 'critical').
sort((a, b) => daysUntil(a.expiry) - daysUntil(b.expiry));
const belowReorder = inventory.filter((i) => i.onHand < i.reorderPoint);

const secondary = [
{ label: 'Output VAT collected', value: peso(vatCollected), note: 'Remittance due Sep 20' },
{ label: 'Senior / PWD discounts', value: peso(discountsGiven), note: 'Deductible from gross sales' },
{ label: 'Inventory at cost', value: peso(inventoryValuation), note: `${inventory.length} active SKUs` },
{ label: 'Accounts payable', value: peso(payablesTotal), note: `${overdue.length} supplier overdue` },
{ label: 'Accounts receivable', value: peso(96540), note: 'Clinics & barangay accounts' }];


export function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Panel
          title="Takings for 16 August 2026"
          subtitle={`${posted.length} posted invoices · 1 draft · 1 void`}
          actions={
          <Link
            to="/sales"
            className="flex items-center gap-1 rounded bg-pharm-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-pharm-700">
            
              Open sales journal
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          }>
          
          <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-end">
            <div>
              <p className="nums text-4xl font-bold tracking-tight text-ink-900">{peso(takings)}</p>
              <p className="mt-1 text-xs text-ink-500">
                Gross sales, VAT inclusive · <span className="font-semibold text-pharm-700">+13.2%</span> vs. last
                Sunday
              </p>
            </div>
            <dl className="grid flex-1 grid-cols-3 gap-3 border-t border-ink-200 pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
              {[
              { l: 'Cash drawer', v: cashTakings },
              { l: 'GCash / card', v: digitalTakings },
              { l: 'Charge accounts', v: chargeTakings }].
              map((row) =>
              <div key={row.l}>
                  <dt className="text-2xs uppercase tracking-wide text-ink-500">{row.l}</dt>
                  <dd className="nums text-sm font-semibold text-ink-900">{peso(row.v)}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="h-44 border-t border-ink-200 px-2 pb-2 pt-3 xl:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesTrend} margin={{ top: 4, right: 8, left: 4, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#EDEFEC" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#666D63' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#666D63' }}
                  axisLine={false}
                  tickLine={false}
                  width={44}
                  tickFormatter={(v: number) => `${v / 1000}k`} />
                
                <Tooltip
                  formatter={(v: number) => peso(v)}
                  contentStyle={{ fontSize: 12, borderRadius: 4, borderColor: '#DFE2DD' }} />
                
                <Bar dataKey="amount" fill="#3C7A32" radius={[2, 2, 0, 0]} maxBarSize={44} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="grid gap-4">
          <Panel title="Needs your action" subtitle="Before the period can be closed">
            <ul className="divide-y divide-ink-200">
              <li className="flex items-start gap-2.5 px-4 py-3">
                <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                <div className="min-w-0">
                  <Link to="/ledger" className="text-sm font-semibold text-ink-900 hover:text-pharm-700">
                    {unposted.length} unposted journal voucher
                  </Link>
                  <p className="text-xs text-ink-500">{unposted[0]?.memo}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5 px-4 py-3">
                <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <div className="min-w-0">
                  <Link to="/inventory" className="text-sm font-semibold text-ink-900 hover:text-pharm-700">
                    {expiring.length} batches expiring or expired
                  </Link>
                  <p className="text-xs text-ink-500">Write-off required before valuation</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5 px-4 py-3">
                <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                <div className="min-w-0">
                  <Link to="/purchases" className="text-sm font-semibold text-ink-900 hover:text-pharm-700">
                    {overdue.length} payable past due date
                  </Link>
                  <p className="text-xs text-ink-500">{overdue[0]?.supplier}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5 px-4 py-3">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-pharm-600" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink-900">Cash count reconciled</p>
                  <p className="text-xs text-ink-500">Drawer tallies with sales journal</p>
                </div>
              </li>
            </ul>
          </Panel>

          <Panel title="Ledger snapshot" subtitle="Month to date">
            <dl className="divide-y divide-ink-200">
              {secondary.map((row) =>
              <div key={row.label} className="flex items-baseline justify-between gap-3 px-4 py-2">
                  <dt className="min-w-0">
                    <span className="block truncate text-xs font-medium text-ink-700">{row.label}</span>
                    <span className="block truncate text-2xs text-ink-400">{row.note}</span>
                  </dt>
                  <dd className="nums shrink-0 text-sm font-semibold text-ink-900">{row.value}</dd>
                </div>
              )}
            </dl>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel
          title="Expiry watchlist"
          subtitle="Nearest first · 90-day window"
          actions={
          <Link to="/inventory" className="text-xs font-semibold text-pharm-700 hover:underline">
              All stock
            </Link>
          }>
          
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-2xs uppercase tracking-wide text-ink-500">
                <th className="px-4 py-1.5 text-left font-semibold">Item / batch</th>
                <th className="px-3 py-1.5 text-right font-semibold">On hand</th>
                <th className="px-3 py-1.5 text-right font-semibold">Cost value</th>
                <th className="px-4 py-1.5 text-right font-semibold">Expiry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {expiring.map((item) => {
                const d = daysUntil(item.expiry);
                return (
                  <tr key={item.sku} className="hover:bg-ink-50">
                    <td className="px-4 py-2">
                      <span className="block font-medium text-ink-900">{item.name}</span>
                      <span className="nums block text-2xs text-ink-500">
                        {item.sku} · {item.batch}
                      </span>
                    </td>
                    <td className="nums px-3 py-2 text-right text-ink-700">
                      {item.onHand.toLocaleString()} {item.unit}
                    </td>
                    <td className="nums px-3 py-2 text-right text-ink-700">{peso(item.onHand * item.cost)}</td>
                    <td className="px-4 py-2 text-right">
                      <Badge tone={d < 0 ? 'danger' : 'gold'}>{d < 0 ? `${Math.abs(d)}d expired` : `${d}d left`}</Badge>
                    </td>
                  </tr>);

              })}
            </tbody>
          </table>
        </Panel>

        <Panel
          title="Payables aging & reorder queue"
          subtitle="Supplier exposure and stock below reorder point">
          
          <div className="grid gap-0 sm:grid-cols-2 sm:divide-x sm:divide-ink-200">
            <div className="p-4">
              <p className="text-2xs font-semibold uppercase tracking-wide text-ink-500">Aging buckets</p>
              <ul className="mt-2 space-y-2">
                {payablesAging.map((b) =>
                <li key={b.bucket}>
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-ink-700">{b.bucket}</span>
                      <span className="nums font-semibold text-ink-900">{peso(b.amount)}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-ink-100">
                      <div
                      className="h-1.5 rounded-full bg-pharm-500"
                      style={{ width: `${b.amount / payablesTotal * 100}%` }} />
                    
                    </div>
                  </li>
                )}
              </ul>
            </div>
            <div className="p-4">
              <p className="text-2xs font-semibold uppercase tracking-wide text-ink-500">
                Below reorder point ({belowReorder.length})
              </p>
              <ul className="mt-2 divide-y divide-ink-100">
                {belowReorder.map((i) =>
                <li key={i.sku} className="flex items-baseline justify-between gap-2 py-1.5 text-xs">
                    <span className="min-w-0 truncate text-ink-800">{i.name}</span>
                    <span className="nums shrink-0 text-ink-500">
                      {i.onHand} / {i.reorderPoint}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Panel>
      </div>
    </div>);

}
import React, { useMemo, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Badge } from '../components/ui/Badge';
import { Toolbar, FilterSelect } from '../components/ui/Toolbar';
import { purchases, payablesAging } from '../data/purchases';
import { peso, shortDate, daysUntil } from '../utils/format';

const statusTone = { Received: 'green', Partial: 'gold', Ordered: 'outline', Paid: 'neutral' } as const;

export function Purchases() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const payablesTotal = payablesAging.reduce((s, i) => s + i.amount, 0);

  const rows = useMemo(
    () =>
    purchases.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery = !q || p.poNo.toLowerCase().includes(q) || p.supplier.toLowerCase().includes(q);
      const matchesStatus = status === 'All statuses' || p.status === status;
      return matchesQuery && matchesStatus;
    }),
    [query, status]
  );

  const outstanding = rows.reduce((s, p) => s + (p.amount - p.paid), 0);

  const bySupplier = useMemo(() => {
    const map = new Map<string, number>();
    purchases.forEach((p) => map.set(p.supplier, (map.get(p.supplier) ?? 0) + (p.amount - p.paid)));
    return [...map.entries()].filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  }, []);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
      <Panel
        title="Purchase journal & payables"
        subtitle="Goods received, supplier terms, and settlement status"
        actions={
        <button
          type="button"
          className="flex items-center gap-1 rounded bg-pharm-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-pharm-700">
          
            <PlusIcon className="h-3.5 w-3.5" />
            Record purchase
          </button>
        }>
        
        <Toolbar
          searchValue={query}
          onSearch={setQuery}
          placeholder="Search PO no. or supplier"
          filters={
          <FilterSelect
            label="Status"
            value={status}
            onChange={setStatus}
            options={['All statuses', 'Ordered', 'Received', 'Partial', 'Paid']} />

          }
          right={<span className="nums text-2xs text-ink-500">{rows.length} of {purchases.length} rows</span>} />
        

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-2xs uppercase tracking-wide text-ink-500">
                <th className="px-3 py-2 text-left font-semibold">PO no.</th>
                <th className="px-3 py-2 text-left font-semibold">Date</th>
                <th className="px-3 py-2 text-left font-semibold">Supplier</th>
                <th className="px-3 py-2 text-left font-semibold">Terms</th>
                <th className="px-3 py-2 text-left font-semibold">Due</th>
                <th className="px-3 py-2 text-right font-semibold">Invoice amt.</th>
                <th className="px-3 py-2 text-right font-semibold">Paid</th>
                <th className="px-3 py-2 text-right font-semibold">Balance</th>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rows.map((p) => {
                const balance = p.amount - p.paid;
                const late = balance > 0 && daysUntil(p.dueDate) < 0;
                return (
                  <tr key={p.id} className="hover:bg-ink-50">
                    <td className="nums px-3 py-2 font-medium text-ink-900">{p.poNo}</td>
                    <td className="nums px-3 py-2 text-ink-500">{shortDate(p.date)}</td>
                    <td className="px-3 py-2 text-ink-800">{p.supplier}</td>
                    <td className="px-3 py-2 text-ink-600">{p.terms}</td>
                    <td className="nums px-3 py-2">
                      <span className={late ? 'font-semibold text-red-700' : 'text-ink-600'}>
                        {shortDate(p.dueDate)}
                      </span>
                      {late && <span className="ml-1 text-2xs text-red-600">{Math.abs(daysUntil(p.dueDate))}d late</span>}
                    </td>
                    <td className="nums px-3 py-2 text-right text-ink-700">{peso(p.amount)}</td>
                    <td className="nums px-3 py-2 text-right text-ink-500">{p.paid ? peso(p.paid) : '—'}</td>
                    <td className="nums px-3 py-2 text-right font-semibold text-ink-900">
                      {balance ? peso(balance) : '—'}
                    </td>
                    <td className="px-3 py-2">
                      <Badge tone={statusTone[p.status]}>{p.status}</Badge>
                    </td>
                  </tr>);

              })}
              {rows.length === 0 &&
              <tr>
                  <td colSpan={9} className="px-3 py-10 text-center text-sm text-ink-500">
                    No purchase orders match this search.
                  </td>
                </tr>
              }
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink-300 bg-ink-50 text-sm font-semibold text-ink-900">
                <td className="px-3 py-2" colSpan={7}>
                  Outstanding balance
                </td>
                <td className="nums px-3 py-2 text-right">{peso(outstanding)}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </Panel>

      <div className="grid gap-4 self-start">
        <Panel title="Payables by supplier" subtitle="Unsettled balances">
          <ul className="divide-y divide-ink-200">
            {bySupplier.map(([supplier, amount]) =>
            <li key={supplier} className="px-4 py-2.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="min-w-0 truncate text-xs font-medium text-ink-800">{supplier}</span>
                  <span className="nums shrink-0 text-sm font-semibold text-ink-900">{peso(amount)}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-ink-100">
                  <div
                  className="h-1.5 rounded-full bg-pharm-500"
                  style={{ width: `${amount / bySupplier[0][1] * 100}%` }} />
                
                </div>
              </li>
            )}
          </ul>
        </Panel>

        <Panel title="Aging summary" subtitle={`Total ${peso(payablesTotal)}`}>
          <dl className="divide-y divide-ink-200">
            {payablesAging.map((b) =>
            <div key={b.bucket} className="flex items-baseline justify-between px-4 py-2">
                <dt className="text-xs text-ink-700">{b.bucket}</dt>
                <dd className="nums text-sm font-semibold text-ink-900">{peso(b.amount)}</dd>
              </div>
            )}
          </dl>
        </Panel>
      </div>
    </div>);

}
import React, { useMemo, useState } from 'react';
import { PlusIcon, PrinterIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Badge } from '../components/ui/Badge';
import { Toolbar, FilterSelect } from '../components/ui/Toolbar';
import { sales } from '../data/sales';
import { peso } from '../utils/format';
import type { Sale } from '../types';

const statusTone = { Posted: 'green', Draft: 'gold', Void: 'danger' } as const;

export function Sales() {
  const [query, setQuery] = useState('');
  const [payment, setPayment] = useState('All payments');
  const [status, setStatus] = useState('All statuses');
  const [selectedId, setSelectedId] = useState<string>(sales[0].id);

  const rows = useMemo(
    () =>
    sales.filter((s) => {
      const matchesQuery =
      !query ||
      s.invoiceNo.toLowerCase().includes(query.toLowerCase()) ||
      s.customer.toLowerCase().includes(query.toLowerCase());
      const matchesPayment = payment === 'All payments' || s.payment === payment;
      const matchesStatus = status === 'All statuses' || s.status === status;
      return matchesQuery && matchesPayment && matchesStatus;
    }),
    [query, payment, status]
  );

  const selected: Sale | undefined = sales.find((s) => s.id === selectedId);
  const postedRows = rows.filter((r) => r.status === 'Posted');
  const totals = {
    gross: postedRows.reduce((s, i) => s + i.total, 0),
    vat: postedRows.reduce((s, i) => s + i.vat, 0),
    discount: postedRows.reduce((s, i) => s + i.discount, 0)
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Panel
        title="Sales journal"
        subtitle="Aug 16, 2026 · Register 1"
        actions={
        <>
            <button
            type="button"
            className="flex items-center gap-1 rounded border border-ink-300 bg-white px-2 py-1.5 text-xs font-medium text-ink-700 transition-colors duration-150 hover:border-pharm-500 hover:text-pharm-700">
            
              <PrinterIcon className="h-3.5 w-3.5" />
              Print
            </button>
            <button
            type="button"
            className="flex items-center gap-1 rounded bg-pharm-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-pharm-700">
            
              <PlusIcon className="h-3.5 w-3.5" />
              New invoice
            </button>
          </>
        }
        bodyClassName="flex flex-col">
        
        <Toolbar
          searchValue={query}
          onSearch={setQuery}
          placeholder="Search invoice no. or customer"
          filters={
          <>
              <FilterSelect
              label="Payment"
              value={payment}
              onChange={setPayment}
              options={['All payments', 'Cash', 'GCash', 'Card', 'Charge']} />
            
              <FilterSelect
              label="Status"
              value={status}
              onChange={setStatus}
              options={['All statuses', 'Posted', 'Draft', 'Void']} />
            
            </>
          }
          right={<span className="nums text-2xs text-ink-500">{rows.length} of {sales.length} rows</span>} />
        

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-ink-200 bg-white text-2xs uppercase tracking-wide text-ink-500">
                <th className="px-3 py-2 text-left font-semibold">Invoice</th>
                <th className="px-3 py-2 text-left font-semibold">Time</th>
                <th className="px-3 py-2 text-left font-semibold">Customer</th>
                <th className="px-3 py-2 text-left font-semibold">Payment</th>
                <th className="px-3 py-2 text-right font-semibold">Discount</th>
                <th className="px-3 py-2 text-right font-semibold">VAT</th>
                <th className="px-3 py-2 text-right font-semibold">Total</th>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rows.map((s) =>
              <tr
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`cursor-pointer transition-colors duration-150 ${
                s.id === selectedId ? 'bg-pharm-50' : 'hover:bg-ink-50'}`
                }>
                
                  <td className="nums px-3 py-2 font-medium text-ink-900">
                    {s.invoiceNo}
                    {s.prescription && <span className="ml-1.5 text-2xs font-semibold text-pharm-600">Rx</span>}
                  </td>
                  <td className="nums px-3 py-2 text-ink-500">{s.time}</td>
                  <td className="px-3 py-2 text-ink-800">{s.customer}</td>
                  <td className="px-3 py-2 text-ink-700">{s.payment}</td>
                  <td className="nums px-3 py-2 text-right text-ink-600">
                    {s.discount ? peso(s.discount) : '—'}
                  </td>
                  <td className="nums px-3 py-2 text-right text-ink-600">{s.vat ? peso(s.vat) : '—'}</td>
                  <td className="nums px-3 py-2 text-right font-semibold text-ink-900">{peso(s.total)}</td>
                  <td className="px-3 py-2">
                    <Badge tone={statusTone[s.status]}>{s.status}</Badge>
                  </td>
                </tr>
              )}
              {rows.length === 0 &&
              <tr>
                  <td colSpan={8} className="px-3 py-10 text-center text-sm text-ink-500">
                    No invoices match these filters. Clear the search or widen the payment type.
                  </td>
                </tr>
              }
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink-300 bg-ink-50 text-sm font-semibold text-ink-900">
                <td className="px-3 py-2" colSpan={4}>
                  Posted subtotal ({postedRows.length})
                </td>
                <td className="nums px-3 py-2 text-right">{peso(totals.discount)}</td>
                <td className="nums px-3 py-2 text-right">{peso(totals.vat)}</td>
                <td className="nums px-3 py-2 text-right">{peso(totals.gross)}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </Panel>

      <Panel
        title={selected ? selected.invoiceNo : 'No invoice selected'}
        subtitle={selected ? `${selected.customer} · ${selected.payment}` : 'Pick a row to inspect'}
        className="self-start">
        
        {selected ?
        <div className="p-4">
            <ul className="divide-y divide-ink-100">
              {selected.lines.map((l) =>
            <li key={l.sku} className="py-2">
                  <p className="text-sm font-medium text-ink-900">{l.name}</p>
                  <p className="nums flex justify-between text-2xs text-ink-500">
                    <span>
                      {l.qty} × {peso(l.unitPrice)}
                    </span>
                    <span className="font-semibold text-ink-700">{peso(l.qty * l.unitPrice)}</span>
                  </p>
                </li>
            )}
            </ul>

            <dl className="mt-3 space-y-1 border-t border-ink-200 pt-3 text-xs">
              <div className="flex justify-between">
                <dt className="text-ink-500">VAT (12%)</dt>
                <dd className="nums text-ink-800">{peso(selected.vat)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">Senior / PWD discount</dt>
                <dd className="nums text-ink-800">{peso(selected.discount)}</dd>
              </div>
              <div className="flex justify-between border-t border-ink-200 pt-2 text-sm font-bold">
                <dt className="text-ink-900">Amount due</dt>
                <dd className="nums text-pharm-700">{peso(selected.total)}</dd>
              </div>
            </dl>

            <div className="mt-4 rounded border border-ink-200 bg-ink-50 p-2.5">
              <p className="text-2xs font-semibold uppercase tracking-wide text-ink-500">Auto journal entry</p>
              <ul className="nums mt-1.5 space-y-1 text-2xs text-ink-700">
                <li className="flex justify-between">
                  <span>{selected.payment === 'Charge' ? '1100 Accounts Receivable' : '1010 Cash on Hand'}</span>
                  <span>{peso(selected.total)}</span>
                </li>
                <li className="flex justify-between pl-3 text-ink-500">
                  <span>{selected.prescription ? '4010 Sales — Prescription' : '4020 Sales — OTC'}</span>
                  <span>{peso(selected.total - selected.vat)}</span>
                </li>
                {selected.vat > 0 &&
              <li className="flex justify-between pl-3 text-ink-500">
                    <span>2050 Output VAT Payable</span>
                    <span>{peso(selected.vat)}</span>
                  </li>
              }
              </ul>
            </div>

            <button
            type="button"
            className="mt-3 w-full rounded bg-gold-400 py-2 text-xs font-bold text-pharm-800 transition-colors duration-150 hover:bg-gold-300">
            
              {selected.status === 'Draft' ? 'Post this invoice' : 'Reprint receipt'}
            </button>
          </div> :

        <p className="p-4 text-sm text-ink-500">Select an invoice to see its lines and journal entry.</p>
        }
      </Panel>
    </div>);

}
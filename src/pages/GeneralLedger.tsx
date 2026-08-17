import React, { useMemo, useState } from 'react';
import { PlusIcon, CheckCircle2Icon, CircleDashedIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Badge } from '../components/ui/Badge';
import { Toolbar, FilterSelect } from '../components/ui/Toolbar';
import { journalEntries, chartOfAccounts } from '../data/ledger';
import { peso, shortDate } from '../utils/format';

export function GeneralLedger() {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('All sources');
  const [openId, setOpenId] = useState<string | null>(journalEntries[0].id);

  const rows = useMemo(
    () =>
    journalEntries.filter((e) => {
      const q = query.toLowerCase();
      const matchesQuery = !q || e.reference.toLowerCase().includes(q) || e.memo.toLowerCase().includes(q);
      const matchesSource = source === 'All sources' || e.source === source;
      return matchesQuery && matchesSource;
    }),
    [query, source]
  );

  const totalDebit = chartOfAccounts.reduce((s, a) => s + a.debit, 0);
  const totalCredit = chartOfAccounts.reduce((s, a) => s + a.credit, 0);
  const balanced = Math.abs(totalDebit - totalCredit) < 0.01;

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <Panel
        title="Journal vouchers"
        subtitle="Expand a voucher to review its debit and credit lines"
        actions={
        <button
          type="button"
          className="flex items-center gap-1 rounded bg-pharm-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-pharm-700">
          
            <PlusIcon className="h-3.5 w-3.5" />
            New voucher
          </button>
        }>
        
        <Toolbar
          searchValue={query}
          onSearch={setQuery}
          placeholder="Search voucher reference or memo"
          filters={
          <FilterSelect
            label="Source"
            value={source}
            onChange={setSource}
            options={['All sources', 'Sales', 'Purchases', 'Cash', 'Adjusting']} />

          }
          right={<span className="nums text-2xs text-ink-500">{rows.length} vouchers</span>} />
        

        <ul className="divide-y divide-ink-200">
          {rows.map((e) => {
            const open = openId === e.id;
            const debit = e.lines.reduce((s, l) => s + l.debit, 0);
            return (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : e.id)}
                  aria-expanded={open}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors duration-150 ${
                  open ? 'bg-pharm-50' : 'hover:bg-ink-50'}`
                  }>
                  
                  {e.posted ?
                  <CheckCircle2Icon className="h-4 w-4 shrink-0 text-pharm-600" /> :

                  <CircleDashedIcon className="h-4 w-4 shrink-0 text-gold-600" />
                  }
                  <span className="nums w-24 shrink-0 text-sm font-medium text-ink-900">{e.reference}</span>
                  <span className="nums w-24 shrink-0 text-xs text-ink-500">{shortDate(e.date)}</span>
                  <span className="min-w-0 flex-1 truncate text-sm text-ink-800">{e.memo}</span>
                  <Badge tone={e.source === 'Adjusting' ? 'gold' : 'neutral'}>{e.source}</Badge>
                  <span className="nums w-28 shrink-0 text-right text-sm font-semibold text-ink-900">
                    {peso(debit)}
                  </span>
                </button>

                {open &&
                <table className="w-full border-t border-ink-200 bg-white text-sm">
                    <thead>
                      <tr className="text-2xs uppercase tracking-wide text-ink-500">
                        <th className="px-3 py-1.5 pl-11 text-left font-semibold">Account</th>
                        <th className="px-3 py-1.5 text-right font-semibold">Debit</th>
                        <th className="px-3 py-1.5 text-right font-semibold">Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {e.lines.map((l) =>
                    <tr key={l.accountCode + l.debit} className="border-t border-ink-100">
                          <td className={`px-3 py-1.5 ${l.credit ? 'pl-16 text-ink-600' : 'pl-11 text-ink-900'}`}>
                            <span className="nums text-ink-400">{l.accountCode}</span> {l.accountName}
                          </td>
                          <td className="nums px-3 py-1.5 text-right text-ink-900">{l.debit ? peso(l.debit) : ''}</td>
                          <td className="nums px-3 py-1.5 text-right text-ink-900">{l.credit ? peso(l.credit) : ''}</td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                }
              </li>);

          })}
          {rows.length === 0 &&
          <li className="px-3 py-10 text-center text-sm text-ink-500">No vouchers match this filter.</li>
          }
        </ul>
      </Panel>

      <Panel
        title="Chart of accounts"
        subtitle={balanced ? 'Debits equal credits' : 'Out of balance — review postings'}
        className="self-start">
        
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-2xs uppercase tracking-wide text-ink-500">
              <th className="px-3 py-1.5 text-left font-semibold">Account</th>
              <th className="px-3 py-1.5 text-right font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {chartOfAccounts.map((a) =>
            <tr key={a.code} className="hover:bg-ink-50">
                <td className="px-3 py-1.5">
                  <span className="nums text-2xs text-ink-400">{a.code}</span>
                  <span className="ml-1.5 text-ink-800">{a.name}</span>
                </td>
                <td className="nums px-3 py-1.5 text-right font-medium text-ink-900">
                  {peso(a.debit > 0 ? a.debit : a.credit)}
                  <span className="ml-1 text-2xs font-normal text-ink-400">{a.debit > 0 ? 'Dr' : 'Cr'}</span>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-ink-300 bg-ink-50 text-sm font-semibold">
              <td className="px-3 py-2 text-ink-900">Totals</td>
              <td className="nums px-3 py-2 text-right text-pharm-700">{peso(totalDebit)}</td>
            </tr>
          </tfoot>
        </table>
      </Panel>
    </div>);

}
import React, { useMemo, useState } from 'react';
import { PlusIcon, DownloadIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Badge } from '../components/ui/Badge';
import { Toolbar, FilterSelect } from '../components/ui/Toolbar';
import { inventory, inventoryValuation, retailValuation } from '../data/inventory';
import { peso, shortDate, daysUntil, expiryTier } from '../utils/format';

const expiryLabel = { expired: 'Expired', critical: '≤ 90 days', watch: '≤ 180 days', ok: 'Good' } as const;
const expiryTone = { expired: 'danger', critical: 'gold', watch: 'outline', ok: 'green' } as const;

export function Inventory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const [flag, setFlag] = useState('All stock');

  const rows = useMemo(
    () =>
    inventory.filter((i) => {
      const q = query.toLowerCase();
      const matchesQuery =
      !q || i.name.toLowerCase().includes(q) || i.generic.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q);
      const matchesCategory = category === 'All categories' || i.category === category;
      const tier = expiryTier(i.expiry);
      const matchesFlag =
      flag === 'All stock' ||
      flag === 'Below reorder' && i.onHand < i.reorderPoint ||
      flag === 'Expiring soon' && (tier === 'critical' || tier === 'expired');
      return matchesQuery && matchesCategory && matchesFlag;
    }),
    [query, category, flag]
  );

  const margin = (retailValuation - inventoryValuation) / retailValuation * 100;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-3 rounded-md border border-ink-200 bg-white px-4 py-3 shadow-panel">
        <div>
          <p className="text-2xs uppercase tracking-wide text-ink-500">Inventory at cost</p>
          <p className="nums text-2xl font-bold tracking-tight text-ink-900">{peso(inventoryValuation)}</p>
        </div>
        <div>
          <p className="text-2xs uppercase tracking-wide text-ink-500">At retail</p>
          <p className="nums text-sm font-semibold text-ink-800">{peso(retailValuation)}</p>
        </div>
        <div>
          <p className="text-2xs uppercase tracking-wide text-ink-500">Gross margin</p>
          <p className="nums text-sm font-semibold text-pharm-700">{margin.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-2xs uppercase tracking-wide text-ink-500">Valuation method</p>
          <p className="text-sm font-semibold text-ink-800">Weighted average · FEFO issue</p>
        </div>
      </div>

      <Panel
        title="Drug inventory"
        subtitle="Batch-level stock card with expiry control"
        actions={
        <>
            <button
            type="button"
            className="flex items-center gap-1 rounded border border-ink-300 bg-white px-2 py-1.5 text-xs font-medium text-ink-700 transition-colors duration-150 hover:border-pharm-500 hover:text-pharm-700">
            
              <DownloadIcon className="h-3.5 w-3.5" />
              Export
            </button>
            <button
            type="button"
            className="flex items-center gap-1 rounded bg-pharm-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-pharm-700">
            
              <PlusIcon className="h-3.5 w-3.5" />
              Stock adjustment
            </button>
          </>
        }>
        
        <Toolbar
          searchValue={query}
          onSearch={setQuery}
          placeholder="Search brand, generic name, or SKU"
          filters={
          <>
              <FilterSelect
              label="Category"
              value={category}
              onChange={setCategory}
              options={['All categories', 'Antibiotic', 'Analgesic', 'Vitamin', 'Cardio', 'Antihistamine', 'Supply']} />
            
              <FilterSelect
              label="Flag"
              value={flag}
              onChange={setFlag}
              options={['All stock', 'Below reorder', 'Expiring soon']} />
            
            </>
          }
          right={<span className="nums text-2xs text-ink-500">{rows.length} SKUs</span>} />
        

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-2xs uppercase tracking-wide text-ink-500">
                <th className="px-3 py-2 text-left font-semibold">SKU</th>
                <th className="px-3 py-2 text-left font-semibold">Item / generic</th>
                <th className="px-3 py-2 text-left font-semibold">Category</th>
                <th className="px-3 py-2 text-right font-semibold">On hand</th>
                <th className="px-3 py-2 text-right font-semibold">Reorder pt.</th>
                <th className="px-3 py-2 text-right font-semibold">Unit cost</th>
                <th className="px-3 py-2 text-right font-semibold">Cost value</th>
                <th className="px-3 py-2 text-left font-semibold">Batch / expiry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rows.map((i) => {
                const tier = expiryTier(i.expiry);
                const low = i.onHand < i.reorderPoint;
                return (
                  <tr key={i.sku} className="hover:bg-ink-50">
                    <td className="nums px-3 py-2 text-ink-500">{i.sku}</td>
                    <td className="px-3 py-2">
                      <span className="block font-medium text-ink-900">{i.name}</span>
                      <span className="block text-2xs text-ink-500">{i.generic}</span>
                    </td>
                    <td className="px-3 py-2 text-ink-700">{i.category}</td>
                    <td className={`nums px-3 py-2 text-right font-semibold ${low ? 'text-red-700' : 'text-ink-900'}`}>
                      {i.onHand.toLocaleString()}
                      <span className="ml-1 text-2xs font-normal text-ink-400">{i.unit}</span>
                    </td>
                    <td className="nums px-3 py-2 text-right text-ink-500">{i.reorderPoint.toLocaleString()}</td>
                    <td className="nums px-3 py-2 text-right text-ink-700">{peso(i.cost)}</td>
                    <td className="nums px-3 py-2 text-right text-ink-900">{peso(i.onHand * i.cost)}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <Badge tone={expiryTone[tier]}>{expiryLabel[tier]}</Badge>
                        <span className="nums text-2xs text-ink-500">
                          {i.batch} · {shortDate(i.expiry)}
                          {tier !== 'ok' && ` (${daysUntil(i.expiry)}d)`}
                        </span>
                      </div>
                    </td>
                  </tr>);

              })}
              {rows.length === 0 &&
              <tr>
                  <td colSpan={8} className="px-3 py-10 text-center text-sm text-ink-500">
                    Nothing here. Try a different category or clear the flag filter.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </Panel>
    </div>);

}
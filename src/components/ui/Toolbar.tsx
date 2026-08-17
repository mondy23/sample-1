import React from 'react';
import { SearchIcon } from 'lucide-react';

interface ToolbarProps {
  searchValue: string;
  onSearch: (value: string) => void;
  placeholder: string;
  filters?: React.ReactNode;
  right?: React.ReactNode;
}

export function Toolbar({ searchValue, onSearch, placeholder, filters, right }: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-ink-200 bg-ink-50 px-3 py-2">
      <label className="relative flex-1 min-w-[220px]">
        <span className="sr-only">{placeholder}</span>
        <SearchIcon className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
        <input
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded border border-ink-300 bg-white py-1.5 pl-7 pr-2 text-sm text-ink-900 placeholder:text-ink-400 focus:border-pharm-500" />
        
      </label>
      {filters}
      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
    </div>);

}

interface SelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function FilterSelect({ label, value, options, onChange }: SelectProps) {
  return (
    <label className="flex items-center gap-1.5 text-2xs font-medium uppercase tracking-wide text-ink-500">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-ink-300 bg-white px-1.5 py-1.5 text-sm font-normal normal-case tracking-normal text-ink-900 focus:border-pharm-500">
        
        {options.map((o) =>
        <option key={o} value={o}>
            {o}
          </option>
        )}
      </select>
    </label>);

}
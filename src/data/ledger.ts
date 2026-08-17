import type { Account, JournalEntry } from '../types';

export const chartOfAccounts: Account[] = [
{ code: '1010', name: 'Cash on Hand', type: 'Asset', debit: 186430.0, credit: 0 },
{ code: '1020', name: 'Cash in Bank — BDO', type: 'Asset', debit: 742180.5, credit: 0 },
{ code: '1100', name: 'Accounts Receivable', type: 'Asset', debit: 96540.0, credit: 0 },
{ code: '1200', name: 'Merchandise Inventory', type: 'Asset', debit: 61234.8, credit: 0 },
{ code: '1400', name: 'Store Equipment', type: 'Asset', debit: 315000.0, credit: 0 },
{ code: '1450', name: 'Accum. Depreciation', type: 'Asset', debit: 0, credit: 78750.0 },
{ code: '2010', name: 'Accounts Payable', type: 'Liability', debit: 0, credit: 285056.25 },
{ code: '2050', name: 'Output VAT Payable', type: 'Liability', debit: 0, credit: 41287.6 },
{ code: '2100', name: 'Withholding Tax Payable', type: 'Liability', debit: 0, credit: 8940.0 },
{ code: '3010', name: "Owner's Capital", type: 'Equity', debit: 0, credit: 850000.0 },
{ code: '3020', name: "Owner's Drawings", type: 'Equity', debit: 45000.0, credit: 0 },
{ code: '4010', name: 'Sales — Prescription', type: 'Revenue', debit: 0, credit: 612480.0 },
{ code: '4020', name: 'Sales — OTC & Supplies', type: 'Revenue', debit: 0, credit: 428915.0 },
{ code: '4090', name: 'Sales Discounts (Senior/PWD)', type: 'Revenue', debit: 38420.0, credit: 0 },
{ code: '5010', name: 'Cost of Goods Sold', type: 'Expense', debit: 604118.0, credit: 0 },
{ code: '6010', name: 'Salaries & Wages', type: 'Expense', debit: 128400.0, credit: 0 },
{ code: '6020', name: 'Rent Expense', type: 'Expense', debit: 66000.0, credit: 0 },
{ code: '6030', name: 'Utilities Expense', type: 'Expense', debit: 31480.55, credit: 0 },
{ code: '6040', name: 'Depreciation Expense', type: 'Expense', debit: 26250.0, credit: 0 },
{ code: '6050', name: 'Expired Stock Write-off', type: 'Expense', debit: 17376.0, credit: 0 }];


export const journalEntries: JournalEntry[] = [
{
  id: 'je1', date: '2026-08-16', reference: 'JV-08-041', source: 'Sales', memo: 'Daily sales summary — cash & e-wallet', posted: true,
  lines: [
  { accountCode: '1010', accountName: 'Cash on Hand', debit: 3856.5, credit: 0 },
  { accountCode: '4020', accountName: 'Sales — OTC & Supplies', debit: 0, credit: 3443.3 },
  { accountCode: '2050', accountName: 'Output VAT Payable', debit: 0, credit: 413.2 }]

},
{
  id: 'je2', date: '2026-08-16', reference: 'JV-08-042', source: 'Sales', memo: 'Charge sales — Sto. Niño Clinic, Barangay Health Unit', posted: true,
  lines: [
  { accountCode: '1100', accountName: 'Accounts Receivable', debit: 2480.0, credit: 0 },
  { accountCode: '4010', accountName: 'Sales — Prescription', debit: 0, credit: 2214.29 },
  { accountCode: '2050', accountName: 'Output VAT Payable', debit: 0, credit: 265.71 }]

},
{
  id: 'je3', date: '2026-08-14', reference: 'JV-08-039', source: 'Purchases', memo: 'PO-002214 receipt — Zuellig Pharma Corp.', posted: true,
  lines: [
  { accountCode: '1200', accountName: 'Merchandise Inventory', debit: 84250.0, credit: 0 },
  { accountCode: '2010', accountName: 'Accounts Payable', debit: 0, credit: 84250.0 }]

},
{
  id: 'je4', date: '2026-08-13', reference: 'JV-08-038', source: 'Cash', memo: 'Partial payment — MedExpress Distribution', posted: true,
  lines: [
  { accountCode: '2010', accountName: 'Accounts Payable', debit: 20000.0, credit: 0 },
  { accountCode: '1020', accountName: 'Cash in Bank — BDO', debit: 0, credit: 20000.0 }]

},
{
  id: 'je5', date: '2026-08-15', reference: 'JV-08-040', source: 'Adjusting', memo: 'Write-off of expired Salbutamol Nebule batch SAL-2401', posted: false,
  lines: [
  { accountCode: '6050', accountName: 'Expired Stock Write-off', debit: 2926.0, credit: 0 },
  { accountCode: '1200', accountName: 'Merchandise Inventory', debit: 0, credit: 2926.0 }]

},
{
  id: 'je6', date: '2026-08-10', reference: 'JV-08-035', source: 'Cash', memo: 'August rent — Boticard Main Branch', posted: true,
  lines: [
  { accountCode: '6020', accountName: 'Rent Expense', debit: 22000.0, credit: 0 },
  { accountCode: '1020', accountName: 'Cash in Bank — BDO', debit: 0, credit: 22000.0 }]

}];
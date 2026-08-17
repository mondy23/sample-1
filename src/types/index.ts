export type AccountType = 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';

export interface Account {
  code: string;
  name: string;
  type: AccountType;
  debit: number;
  credit: number;
}

export interface JournalLine {
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  source: 'Sales' | 'Purchases' | 'Cash' | 'Adjusting';
  memo: string;
  posted: boolean;
  lines: JournalLine[];
}

export interface SaleLine {
  sku: string;
  name: string;
  qty: number;
  unitPrice: number;
}

export interface Sale {
  id: string;
  invoiceNo: string;
  date: string;
  time: string;
  customer: string;
  payment: 'Cash' | 'GCash' | 'Card' | 'Charge';
  prescription: boolean;
  status: 'Posted' | 'Draft' | 'Void';
  lines: SaleLine[];
  vat: number;
  discount: number;
  total: number;
}

export interface Purchase {
  id: string;
  poNo: string;
  date: string;
  supplier: string;
  terms: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: 'Received' | 'Partial' | 'Ordered' | 'Paid';
}

export interface InventoryItem {
  sku: string;
  name: string;
  generic: string;
  category: 'Antibiotic' | 'Analgesic' | 'Vitamin' | 'Cardio' | 'Antihistamine' | 'Supply';
  unit: string;
  onHand: number;
  reorderPoint: number;
  cost: number;
  price: number;
  batch: string;
  expiry: string;
}
import type { Purchase } from '../types';

export const purchases: Purchase[] = [
{ id: 'p1', poNo: 'PO-002214', date: '2026-08-14', supplier: 'Zuellig Pharma Corp.', terms: '30 days', dueDate: '2026-09-13', amount: 84250.0, paid: 0, status: 'Received' },
{ id: 'p2', poNo: 'PO-002213', date: '2026-08-11', supplier: 'MedExpress Distribution', terms: '15 days', dueDate: '2026-08-26', amount: 41680.5, paid: 20000.0, status: 'Partial' },
{ id: 'p3', poNo: 'PO-002212', date: '2026-08-08', supplier: 'Unilab Trading Inc.', terms: '30 days', dueDate: '2026-09-07', amount: 122400.0, paid: 122400.0, status: 'Paid' },
{ id: 'p4', poNo: 'PO-002211', date: '2026-08-05', supplier: 'Pascual Laboratories', terms: 'COD', dueDate: '2026-08-05', amount: 18930.0, paid: 18930.0, status: 'Paid' },
{ id: 'p5', poNo: 'PO-002210', date: '2026-08-16', supplier: 'Zuellig Pharma Corp.', terms: '30 days', dueDate: '2026-09-15', amount: 63500.0, paid: 0, status: 'Ordered' },
{ id: 'p6', poNo: 'PO-002209', date: '2026-07-29', supplier: 'GenericsPro Supply', terms: '45 days', dueDate: '2026-09-12', amount: 57210.75, paid: 0, status: 'Received' },
{ id: 'p7', poNo: 'PO-002208', date: '2026-07-24', supplier: 'MedExpress Distribution', terms: '15 days', dueDate: '2026-08-08', amount: 29875.0, paid: 0, status: 'Received' },
{ id: 'p8', poNo: 'PO-002207', date: '2026-07-18', supplier: 'Unilab Trading Inc.', terms: '30 days', dueDate: '2026-08-17', amount: 96140.0, paid: 50000.0, status: 'Partial' }];


export const payablesAging = [
{ bucket: 'Current', amount: 147750.0 },
{ bucket: '1–30 days', amount: 78891.25 },
{ bucket: '31–60 days', amount: 46015.0 },
{ bucket: '60+ days', amount: 12400.0 }];
import type { Sale } from '../types';

export const sales: Sale[] = [
{
  id: 's1', invoiceNo: 'SI-004812', date: '2026-08-16', time: '08:42', customer: 'Walk-in', payment: 'Cash', prescription: false, status: 'Posted',
  lines: [
  { sku: 'BC-1002', name: 'Paracetamol 500mg Tab', qty: 20, unitPrice: 2.75 },
  { sku: 'BC-1005', name: 'Ascorbic Acid 500mg', qty: 30, unitPrice: 5.5 }],

  vat: 25.5, discount: 0, total: 220.0
},
{
  id: 's2', invoiceNo: 'SI-004813', date: '2026-08-16', time: '09:15', customer: 'R. Villanueva', payment: 'GCash', prescription: true, status: 'Posted',
  lines: [{ sku: 'BC-1001', name: 'Amoxicillin 500mg Cap', qty: 21, unitPrice: 11.5 }],
  vat: 27.98, discount: 0, total: 241.5
},
{
  id: 's3', invoiceNo: 'SI-004814', date: '2026-08-16', time: '10:03', customer: 'L. Bautista (Senior)', payment: 'Cash', prescription: true, status: 'Posted',
  lines: [
  { sku: 'BC-1003', name: 'Losartan 50mg Tab', qty: 30, unitPrice: 15.0 },
  { sku: 'BC-1010', name: 'Amlodipine 5mg Tab', qty: 30, unitPrice: 10.5 }],

  vat: 0, discount: 153.0, total: 612.0
},
{
  id: 's4', invoiceNo: 'SI-004815', date: '2026-08-16', time: '10:47', customer: 'Sto. Niño Clinic', payment: 'Charge', prescription: true, status: 'Posted',
  lines: [
  { sku: 'BC-1011', name: 'Sterile Gauze Pad 4x4', qty: 40, unitPrice: 18.0 },
  { sku: 'BC-1012', name: 'Salbutamol Nebule', qty: 24, unitPrice: 27.5 }],

  vat: 158.14, discount: 0, total: 1380.0
},
{
  id: 's5', invoiceNo: 'SI-004816', date: '2026-08-16', time: '11:22', customer: 'Walk-in', payment: 'Card', prescription: false, status: 'Posted',
  lines: [{ sku: 'BC-1008', name: 'Ibuprofen 400mg Tab', qty: 12, unitPrice: 6.5 }],
  vat: 9.04, discount: 0, total: 78.0
},
{
  id: 's6', invoiceNo: 'SI-004817', date: '2026-08-16', time: '12:05', customer: 'M. Dizon', payment: 'Cash', prescription: false, status: 'Draft',
  lines: [{ sku: 'BC-1004', name: 'Cetirizine 10mg Tab', qty: 10, unitPrice: 7.0 }],
  vat: 8.11, discount: 0, total: 70.0
},
{
  id: 's7', invoiceNo: 'SI-004818', date: '2026-08-16', time: '13:38', customer: 'Walk-in', payment: 'GCash', prescription: false, status: 'Posted',
  lines: [{ sku: 'BC-1009', name: 'Ferrous Sulfate + FA', qty: 60, unitPrice: 7.75 }],
  vat: 53.89, discount: 0, total: 465.0
},
{
  id: 's8', invoiceNo: 'SI-004819', date: '2026-08-16', time: '14:12', customer: 'J. Ocampo (PWD)', payment: 'Cash', prescription: true, status: 'Posted',
  lines: [{ sku: 'BC-1007', name: 'Cefalexin 500mg Cap', qty: 15, unitPrice: 22.0 }],
  vat: 0, discount: 66.0, total: 264.0
},
{
  id: 's9', invoiceNo: 'SI-004820', date: '2026-08-16', time: '15:01', customer: 'Walk-in', payment: 'Cash', prescription: false, status: 'Void',
  lines: [{ sku: 'BC-1006', name: 'Metformin 500mg Tab', qty: 30, unitPrice: 8.25 }],
  vat: 0, discount: 0, total: 0
},
{
  id: 's10', invoiceNo: 'SI-004821', date: '2026-08-16', time: '16:29', customer: 'Barangay Health Unit', payment: 'Charge', prescription: false, status: 'Posted',
  lines: [
  { sku: 'BC-1002', name: 'Paracetamol 500mg Tab', qty: 200, unitPrice: 2.75 },
  { sku: 'BC-1005', name: 'Ascorbic Acid 500mg', qty: 100, unitPrice: 5.5 }],

  vat: 118.39, discount: 0, total: 1100.0
}];


export const salesTrend = [
{ day: 'Mon', amount: 18420 },
{ day: 'Tue', amount: 21350 },
{ day: 'Wed', amount: 16980 },
{ day: 'Thu', amount: 24110 },
{ day: 'Fri', amount: 27640 },
{ day: 'Sat', amount: 31280 },
{ day: 'Sun', amount: 14300 }];
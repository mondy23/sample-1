import type { InventoryItem } from '../types';

export const inventory: InventoryItem[] = [
{ sku: 'BC-1001', name: 'Amoxicillin 500mg Cap', generic: 'Amoxicillin', category: 'Antibiotic', unit: 'cap', onHand: 1840, reorderPoint: 600, cost: 6.4, price: 11.5, batch: 'AMX-2405', expiry: '2026-09-30' },
{ sku: 'BC-1002', name: 'Paracetamol 500mg Tab', generic: 'Paracetamol', category: 'Analgesic', unit: 'tab', onHand: 4210, reorderPoint: 1200, cost: 1.15, price: 2.75, batch: 'PCM-2512', expiry: '2027-12-31' },
{ sku: 'BC-1003', name: 'Losartan 50mg Tab', generic: 'Losartan Potassium', category: 'Cardio', unit: 'tab', onHand: 520, reorderPoint: 800, cost: 8.9, price: 15.0, batch: 'LOS-2407', expiry: '2027-03-31' },
{ sku: 'BC-1004', name: 'Cetirizine 10mg Tab', generic: 'Cetirizine', category: 'Antihistamine', unit: 'tab', onHand: 1150, reorderPoint: 400, cost: 3.2, price: 7.0, batch: 'CTZ-2503', expiry: '2026-10-15' },
{ sku: 'BC-1005', name: 'Ascorbic Acid 500mg', generic: 'Vitamin C', category: 'Vitamin', unit: 'tab', onHand: 2980, reorderPoint: 900, cost: 2.4, price: 5.5, batch: 'VTC-2601', expiry: '2028-01-31' },
{ sku: 'BC-1006', name: 'Metformin 500mg Tab', generic: 'Metformin HCl', category: 'Cardio', unit: 'tab', onHand: 860, reorderPoint: 700, cost: 4.1, price: 8.25, batch: 'MET-2409', expiry: '2026-08-10' },
{ sku: 'BC-1007', name: 'Cefalexin 500mg Cap', generic: 'Cefalexin', category: 'Antibiotic', unit: 'cap', onHand: 340, reorderPoint: 500, cost: 12.8, price: 22.0, batch: 'CFX-2502', expiry: '2027-06-30' },
{ sku: 'BC-1008', name: 'Ibuprofen 400mg Tab', generic: 'Ibuprofen', category: 'Analgesic', unit: 'tab', onHand: 1620, reorderPoint: 600, cost: 2.9, price: 6.5, batch: 'IBU-2506', expiry: '2026-11-30' },
{ sku: 'BC-1009', name: 'Ferrous Sulfate + FA', generic: 'Ferrous Sulfate', category: 'Vitamin', unit: 'cap', onHand: 740, reorderPoint: 300, cost: 3.6, price: 7.75, batch: 'FER-2411', expiry: '2027-09-30' },
{ sku: 'BC-1010', name: 'Amlodipine 5mg Tab', generic: 'Amlodipine Besylate', category: 'Cardio', unit: 'tab', onHand: 1290, reorderPoint: 500, cost: 5.5, price: 10.5, batch: 'AML-2508', expiry: '2027-01-31' },
{ sku: 'BC-1011', name: 'Sterile Gauze Pad 4x4', generic: '—', category: 'Supply', unit: 'pc', onHand: 410, reorderPoint: 200, cost: 9.0, price: 18.0, batch: 'GZE-2504', expiry: '2029-04-30' },
{ sku: 'BC-1012', name: 'Salbutamol Nebule', generic: 'Salbutamol', category: 'Antihistamine', unit: 'neb', onHand: 190, reorderPoint: 250, cost: 15.4, price: 27.5, batch: 'SAL-2401', expiry: '2026-07-31' }];


export const inventoryValuation = inventory.reduce((sum, i) => sum + i.onHand * i.cost, 0);
export const retailValuation = inventory.reduce((sum, i) => sum + i.onHand * i.price, 0);
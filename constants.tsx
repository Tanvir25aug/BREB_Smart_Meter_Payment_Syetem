
import { Category, Biller } from './types';

export const CATEGORIES: Category[] = [
  { id: 'elec', name: 'Electricity', icon: 'lightbulb', active: true },
  { id: 'gas', name: 'Gas', icon: 'local_fire_department' },
  { id: 'water', name: 'Water', icon: 'water_drop' },
  { id: 'internet', name: 'Internet', icon: 'language' },
  { id: 'phone', name: 'Telephone', icon: 'phone_in_talk' },
  { id: 'tv', name: 'TV', icon: 'tv' },
  { id: 'card', name: 'Credit Card', icon: 'credit_card' },
  { id: 'govt', name: 'Govt. Fees', icon: 'account_balance' },
];

export const RECENT_BILLERS: Biller[] = [
  { id: '1', name: 'Palli Bidyut (Prepaid)', type: 'PREPAID', category: 'ELECTRICITY', icon: 'lightbulb' },
  { id: '2', name: 'Palli Bidyut (Postpaid)', type: 'POSTPAID', category: 'ELECTRICITY', icon: 'lightbulb' },
  { id: '3', name: 'Palli Bidyut (Smart Meter)', type: 'SMART METER', category: 'ELECTRICITY', icon: 'lightbulb' },
];

export const PRESET_AMOUNTS = [500, 1000, 2000, 5000];

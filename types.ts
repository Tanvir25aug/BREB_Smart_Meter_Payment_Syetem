
export enum Screen {
  HOME = 'HOME',
  CUSTOMER_DETAILS = 'CUSTOMER_DETAILS',
  AMOUNT_ENTRY = 'AMOUNT_ENTRY',
  PIN_ENTRY = 'PIN_ENTRY',
  SUMMARY = 'SUMMARY', // Review details screen
  SUCCESS = 'SUCCESS',
  LOADING = 'LOADING',
}

export interface Biller {
  id: string;
  name: string;
  type: string;
  category: string;
  icon: string;
}

export interface TransactionData {
  biller: Biller | null;
  customerId: string;
  contactNumber: string;
  amount: number;
  transactionId: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  active?: boolean;
}


import React from 'react';
import { TransactionData } from '../types';

interface BillSummaryProps {
  transaction: TransactionData;
  onBack: () => void;
  onConfirm: () => void;
}

const BillSummary: React.FC<BillSummaryProps> = ({ transaction, onBack, onConfirm }) => {
  return (
    <div className="flex flex-col flex-1 bg-[#F5F6F7] dark:bg-slate-950 min-h-screen">
      <header className="bg-primary text-white pt-2 pb-4 px-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2">
            <span className="material-icons-round">arrow_back</span>
          </button>
          <h1 className="text-lg font-semibold ml-2">Review Details</h1>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="p-4 border-b border-slate-50 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Bill Information</h2>
          </div>
          <div className="p-4 space-y-5">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">{transaction.biller?.name}</h3>
              <p className="text-sm text-slate-500">{transaction.biller?.category} (Smart Prepaid)</p>
            </div>
            <div className="space-y-4 pt-2">
              {[
                { label: 'Customer Name', value: 'Abdur Rahman' },
                { label: 'Customer ID', value: transaction.customerId },
                { label: 'Meter Number', value: '12345678' },
                { label: 'Phone Number', value: transaction.contactNumber || '01712345678' },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-start text-sm">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-sm border-t border-slate-50 dark:border-slate-800 pt-4">
                <span className="text-slate-500 font-medium">Amount</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">৳ {transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <span className="text-primary font-bold">Total Payable</span>
              <span className="text-primary font-bold text-xl">৳ {transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 z-50 pb-10">
        <button 
          onClick={onConfirm}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 active:scale-[0.98] transition-all"
        >
          <span>Proceed to PIN Entry</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <div className="w-32 h-1 bg-slate-200 dark:bg-slate-700 mx-auto rounded-full mt-4"></div>
      </div>
    </div>
  );
};

export default BillSummary;

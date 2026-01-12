
import React from 'react';
import { TransactionData } from '../types';

interface PaymentSuccessProps {
  transaction: TransactionData;
  onHome: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ transaction, onHome }) => {
  return (
    <div className="flex flex-col flex-1 bg-background-light dark:bg-background-dark min-h-screen">
      <header className="bg-primary text-white pt-2 pb-16 px-4 relative z-0">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onHome} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <span className="material-icons-round">close</span>
          </button>
          <h1 className="text-lg font-bold">Payment Success</h1>
          <div className="w-10"></div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3 pb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary shadow-lg ring-4 ring-white/20 animate-bounce">
            <span className="material-icons-round text-5xl">check_circle</span>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Success!</h2>
            <p className="text-white/80 text-sm">Your bill payment is successful</p>
          </div>
        </div>
      </header>

      <main className="px-4 -mt-12 relative z-10 pb-36">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="p-8 border-b border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center">
            <h3 className="font-bold text-xl text-slate-800 dark:text-white text-center leading-tight">{transaction.biller?.name}</h3>
            <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">Smart Prepaid Electricity</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400">Total Amount</span>
              <span className="font-bold text-slate-800 dark:text-white text-base">৳ {transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400">Transaction ID</span>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-slate-800 dark:text-white uppercase">{transaction.transactionId}</span>
                <button className="text-primary hover:opacity-80 transition-opacity">
                  <span className="material-icons-round text-sm">content_copy</span>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400">Customer ID</span>
              <span className="font-semibold text-slate-800 dark:text-white">{transaction.customerId}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400">Date & Time</span>
              <span className="font-semibold text-slate-800 dark:text-white">{transaction.date}</span>
            </div>
          </div>
          <div className="p-6">
            <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 transition-colors">
              <span className="material-icons-round">download</span>
              <span>Download Receipt</span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-8">
          <button className="flex flex-col items-center space-y-1 group">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center text-slate-600 group-active:scale-95 transition-transform">
              <span className="material-icons-round">share</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Share</span>
          </button>
          <button className="flex flex-col items-center space-y-1 group">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center text-slate-600 group-active:scale-95 transition-transform">
              <span className="material-icons-round">help_outline</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Support</span>
          </button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 z-50">
        <button 
          onClick={onHome}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <span className="material-icons-round">home</span>
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;


import React, { useState, useRef, useEffect } from 'react';
import { TransactionData } from '../types';

interface BillSummaryProps {
  transaction: TransactionData;
  onBack: () => void;
  onConfirm: () => void;
}

const BillSummary: React.FC<BillSummaryProps> = ({ transaction, onBack, onConfirm }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHolding) {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(intervalRef.current!);
            onConfirm();
            return 100;
          }
          return prev + 5;
        });
      }, 50);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHolding, onConfirm]);

  return (
    <div className="flex flex-col flex-1 bg-[#F5F6F7] dark:bg-slate-950 min-h-screen">
      <header className="bg-primary text-white pt-2 pb-4 px-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2">
            <span className="material-icons-round">arrow_back</span>
          </button>
          <h1 className="text-lg font-semibold ml-2">Bill Summary</h1>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="p-4 border-b border-slate-50 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Review Details</h2>
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
              <span className="text-primary font-bold">Total</span>
              <span className="text-primary font-bold text-xl">৳ {transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-4 z-50 pb-10">
        <div className="flex flex-col items-center">
          <div 
            onMouseDown={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onMouseLeave={() => setIsHolding(false)}
            onTouchStart={() => setIsHolding(true)}
            onTouchEnd={() => setIsHolding(false)}
            className="relative w-full max-w-sm h-16 bg-primary/20 dark:bg-primary/10 rounded-full overflow-hidden flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition-transform"
          >
            {/* Progress fill */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-primary transition-all duration-75 ease-linear" 
              style={{ width: `${progress}%` }} 
            />
            
            <div className="relative flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${progress > 50 ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                <span className="material-symbols-outlined text-2xl material-symbols-filled">fingerprint</span>
              </div>
              <span className={`font-bold text-base transition-colors ${progress > 50 ? 'text-white' : 'text-primary'}`}>
                {progress >= 100 ? 'Success' : 'Tap and hold to confirm'}
              </span>
            </div>
          </div>
        </div>
        <div className="w-32 h-1 bg-slate-200 dark:bg-slate-700 mx-auto rounded-full"></div>
      </div>
    </div>
  );
};

export default BillSummary;

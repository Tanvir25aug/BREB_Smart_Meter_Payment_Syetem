
import React, { useState } from 'react';
import { Biller } from '../types';
import { PRESET_AMOUNTS } from '../constants';

interface AmountEntryProps {
  biller: Biller;
  onBack: () => void;
  onNext: (amount: number) => void;
}

const AmountEntry: React.FC<AmountEntryProps> = ({ biller, onBack, onNext }) => {
  const [amount, setAmount] = useState('1000');

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => prev.slice(0, -1));
    } else if (key === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + key);
    } else {
      if (amount === '0') setAmount(key);
      else setAmount(prev => prev + key);
    }
  };

  const currentAmount = parseFloat(amount) || 0;

  return (
    <div className="flex flex-col flex-1 bg-background-light dark:bg-background-dark min-h-screen">
      <header className="bg-primary text-white pt-2 pb-4 px-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight ml-2">Pay Bill</h1>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-2xl border border-primary/10">
          <h4 className="font-bold text-primary dark:text-pink-400 text-lg">{biller.name}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">Account: 10345678901</p>
        </div>

        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col items-center">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Enter Amount</p>
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-2xl font-bold text-primary">৳</span>
            <span className="text-5xl font-bold text-slate-900 dark:text-white">{amount || '0'}</span>
          </div>
          <div className="w-full h-px bg-slate-100 dark:bg-slate-700 my-4"></div>
          <div className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/20">
            <span className="text-xs text-primary dark:text-pink-400 font-medium">Available Balance: ৳ 4,560.50</span>
          </div>
        </section>

        <div className="grid grid-cols-4 gap-2">
          {PRESET_AMOUNTS.map(amt => (
            <button
              key={amt}
              onClick={() => setAmount(amt.toString())}
              className={`py-2.5 px-1 rounded-xl border text-sm transition-all ${
                currentAmount === amt 
                  ? 'border-primary bg-primary text-white font-bold shadow-md' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-pink-400 font-semibold'
              }`}
            >
              ৳{amt}
            </button>
          ))}
        </div>

        <div className="pt-2 flex-1">
          <div className="grid grid-cols-3 gap-y-1 gap-x-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="flex items-center justify-center text-2xl font-semibold h-16 w-full rounded-xl active:bg-slate-100 dark:active:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200"
              >
                {key === 'backspace' ? (
                  <span className="material-symbols-outlined text-slate-400">backspace</span>
                ) : key}
              </button>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-10 z-50">
        <button 
          onClick={() => onNext(currentAmount)}
          disabled={currentAmount <= 0}
          className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
        >
          <span>Proceed to Payment</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default AmountEntry;

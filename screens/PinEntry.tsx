
import React, { useState } from 'react';
import { Biller } from '../types';

interface PinEntryProps {
  biller: Biller;
  amount: number;
  onBack: () => void;
  onNext: () => void;
}

const PinEntry: React.FC<PinEntryProps> = ({ biller, amount, onBack, onNext }) => {
  const [pin, setPin] = useState<string[]>([]);
  const MAX_PIN = 5;

  const handleKeyPress = (val: string) => {
    if (val === 'backspace') {
      setPin(prev => prev.slice(0, -1));
    } else {
      if (pin.length < MAX_PIN) {
        setPin(prev => [...prev, val]);
      }
    }
  };

  const handleConfirm = () => {
    if (pin.length === MAX_PIN) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-background-dark min-h-screen">
      <header className="bg-primary text-white pt-2 pb-6 px-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <span className="material-icons-round">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight ml-2">Secure PIN Entry</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-10 pb-12">
        <div className="mb-10 bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="flex flex-col space-y-1">
            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 uppercase tracking-wide">{biller.name}</h2>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-slate-500 font-medium">Smart Prepaid Meter</span>
              <span className="text-xl font-bold text-primary">৳ {amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <div className="text-center space-y-8 flex-1">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Enter Your PIN</h3>
            <p className="text-sm text-slate-500">Securely confirm your payment</p>
          </div>

          <div className="flex justify-center space-x-6 py-4">
            {[...Array(MAX_PIN)].map((_, i) => (
              <div 
                key={i} 
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  pin.length > i 
                    ? 'bg-primary border-primary scale-110' 
                    : 'bg-transparent border-slate-200 dark:border-slate-600'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-y-4 gap-x-8 max-w-[280px] mx-auto mt-12">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(n => (
              <button 
                key={n}
                onClick={() => handleKeyPress(n)}
                className="w-16 h-16 flex items-center justify-center text-2xl font-semibold text-slate-700 dark:text-slate-200 active:bg-slate-100 dark:active:bg-slate-800 rounded-full transition-colors"
              >
                {n}
              </button>
            ))}
            <div className="w-16 h-16"></div>
            <button 
              onClick={() => handleKeyPress('0')}
              className="w-16 h-16 flex items-center justify-center text-2xl font-semibold text-slate-700 dark:text-slate-200 active:bg-slate-100 dark:active:bg-slate-800 rounded-full transition-colors"
            >
              0
            </button>
            <button 
              onClick={() => handleKeyPress('backspace')}
              className="w-16 h-16 flex items-center justify-center text-slate-400 active:text-primary rounded-full transition-colors"
            >
              <span className="material-icons-round text-3xl">backspace</span>
            </button>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <button 
            onClick={handleConfirm}
            disabled={pin.length < MAX_PIN}
            className="w-full bg-primary disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-200 dark:shadow-none flex items-center justify-center space-x-2 active:scale-[0.98] transition-all"
          >
            <span>Confirm Payment</span>
            <span className="material-icons-round">arrow_forward</span>
          </button>
          <p className="text-center text-xs text-slate-400 mt-4 px-6">By confirming, you agree to our Terms & Conditions for utility payments.</p>
        </div>
      </main>
    </div>
  );
};

export default PinEntry;

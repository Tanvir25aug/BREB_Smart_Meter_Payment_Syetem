
import React, { useState, useRef, useEffect } from 'react';
import { Biller } from '../types';

interface PinEntryProps {
  biller: Biller;
  amount: number;
  onBack: () => void;
  onNext: () => void;
}

const PinEntry: React.FC<PinEntryProps> = ({ biller, amount, onBack, onNext }) => {
  const [pin, setPin] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<number | null>(null);
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

  const isPinComplete = pin.length === MAX_PIN;

  useEffect(() => {
    if (isPinComplete && isHolding) {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(intervalRef.current!);
            onNext();
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
  }, [isHolding, isPinComplete, onNext]);

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
        <div className="mb-8 bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
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
            <p className="text-sm text-slate-500">Securely authorize your payment</p>
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

          <div className="grid grid-cols-3 gap-y-4 gap-x-8 max-w-[280px] mx-auto mt-4">
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
          <div className="flex flex-col items-center">
            <div 
              onMouseDown={() => isPinComplete && setIsHolding(true)}
              onMouseUp={() => setIsHolding(false)}
              onMouseLeave={() => setIsHolding(false)}
              onTouchStart={() => isPinComplete && setIsHolding(true)}
              onTouchEnd={() => setIsHolding(false)}
              className={`relative w-full max-w-sm h-16 rounded-full overflow-hidden flex items-center justify-center shadow-lg transition-all ${
                isPinComplete 
                  ? 'bg-primary/20 dark:bg-primary/10 cursor-pointer active:scale-95' 
                  : 'bg-slate-100 dark:bg-slate-800 opacity-50 cursor-not-allowed shadow-none'
              }`}
            >
              {isPinComplete && (
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-primary transition-all duration-75 ease-linear" 
                  style={{ width: `${progress}%` }} 
                />
              )}
              <div className="relative flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  !isPinComplete ? 'bg-slate-300 dark:bg-slate-700 text-slate-500' :
                  progress > 50 ? 'bg-white text-primary' : 'bg-primary text-white'
                }`}>
                  <span className="material-symbols-outlined text-2xl material-symbols-filled">fingerprint</span>
                </div>
                <span className={`font-bold text-base transition-colors ${
                  !isPinComplete ? 'text-slate-400 dark:text-slate-500' :
                  progress > 50 ? 'text-white' : 'text-primary'
                }`}>
                  {progress >= 100 ? 'Success' : 'Tap and hold to confirm'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PinEntry;

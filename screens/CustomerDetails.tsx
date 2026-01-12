
import React, { useState } from 'react';
import { Biller } from '../types';

interface CustomerDetailsProps {
  biller: Biller;
  onBack: () => void;
  onNext: (customerId: string, contact: string) => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ biller, onBack, onNext }) => {
  const [customerId, setCustomerId] = useState('10370425687');
  const [contact, setContact] = useState('');

  return (
    <div className="flex flex-col flex-1 bg-background-light dark:bg-background-dark min-h-screen">
      <header className="bg-primary text-white pt-2 pb-4 px-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold ml-2">Pay Bill</h1>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </header>

      <main className="p-4 space-y-4 pb-32">
        <section className="bg-primary rounded-2xl p-5 flex items-center shadow-md border border-white/10">
          <div>
            <h2 className="font-bold text-white text-lg">{biller.name}</h2>
            <p className="text-white/80 text-sm">Electricity</p>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Enter Customer ID</label>
              <div className="relative">
                <input 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-primary rounded-xl py-4 px-4 text-slate-900 dark:text-slate-100 font-medium" 
                  placeholder="Enter ID" 
                  type="text" 
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                  <span className="material-symbols-outlined">contacts</span>
                </button>
              </div>
              <p className="text-xs text-primary font-medium flex items-center mt-1">
                <span className="material-symbols-outlined text-sm mr-1">info</span>
                Sample of Customer ID
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Enter Contact Number</label>
              <div className="relative">
                <input 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-primary rounded-xl py-4 px-4 text-slate-900 dark:text-slate-100 font-medium" 
                  placeholder="017XXXXXXXX" 
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                  <span className="material-symbols-outlined">call</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded border border-primary flex items-center justify-center bg-primary">
                  <span className="material-symbols-outlined text-white text-xs font-bold">check</span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Save this biller for future payments</span>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex space-x-3">
          <span className="material-symbols-outlined text-primary">lightbulb</span>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Paying this bill will automatically save the biller to your account for quick access next time. A notification will be sent to the provided contact number.
          </p>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-8 z-50">
        <button 
          onClick={() => onNext(customerId, contact)}
          disabled={!customerId}
          className="w-full bg-primary hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
        >
          <span>Proceed to Pay</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerDetails;


import React from 'react';
import { CATEGORIES, RECENT_BILLERS } from '../constants';
import { Biller } from '../types';

interface HomeProps {
  onSelectBiller: (biller: Biller) => void;
  onToggleDarkMode: () => void;
}

const Home: React.FC<HomeProps> = ({ onSelectBiller, onToggleDarkMode }) => {
  return (
    <div className="flex flex-col flex-1 bg-background-light dark:bg-background-dark pb-24">
      <header className="bg-primary text-white pt-2 pb-6 px-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between">
          <button className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <span className="material-icons-round">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight">Pay Bill</h1>
          <button className="p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors">
            <span className="material-icons-round">near_me</span>
          </button>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* Search */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4">
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Search Organization</h2>
          <div className="relative flex items-center">
            <input 
              className="w-full bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-primary rounded-xl py-3 px-4 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500" 
              placeholder="Enter Organization name or type" 
              type="text"
            />
            <span className="material-icons-round absolute right-3 text-slate-400">arrow_forward</span>
          </div>
        </section>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 active:scale-95 transition-transform">
            <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-2">
              <span className="material-icons-round text-primary">receipt_long</span>
            </div>
            <span className="text-xs font-semibold text-primary text-center">Receipts & Tokens</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 active:scale-95 transition-transform">
            <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-2">
              <span className="material-icons-round text-primary">history</span>
            </div>
            <span className="text-xs font-semibold text-primary text-center">Pay Bill History</span>
          </button>
        </div>

        {/* Organizations */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5">
          <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-6">All Organization</h3>
          <div className="grid grid-cols-4 gap-y-8 gap-x-2">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center space-y-2 group cursor-pointer">
                <div className={`w-14 h-14 ${cat.active ? 'bg-pink-50 dark:bg-pink-900/20 border border-primary/20' : 'bg-slate-50 dark:bg-slate-700/50'} rounded-2xl flex items-center justify-center active:scale-90 transition-transform`}>
                  <span className={`material-icons-round text-3xl ${cat.active ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
                    {cat.icon}
                  </span>
                </div>
                <span className={`text-[11px] text-center leading-tight ${cat.active ? 'font-bold text-primary' : 'font-medium text-slate-600 dark:text-slate-300'}`}>
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Billers */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-400">Recent Billers</h3>
            <button className="text-xs font-semibold text-primary">View All</button>
          </div>
          <div className="space-y-2">
            {RECENT_BILLERS.map((biller) => (
              <button
                key={biller.id}
                onClick={() => onSelectBiller(biller)}
                className="w-full bg-white dark:bg-slate-800 p-4 rounded-2xl flex items-center shadow-sm border border-slate-100 dark:border-slate-700 active:bg-slate-50 dark:active:bg-slate-700 transition-colors text-left"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100">{biller.name}</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium uppercase tracking-tight">{biller.category}</p>
                </div>
                <span className="material-icons-round text-slate-300">chevron_right</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-6 py-2 flex justify-between items-center pb-8 z-50">
        <button className="flex flex-col items-center space-y-1 text-slate-400">
          <span className="material-icons-round">home</span>
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-primary">
          <span className="material-icons-round">payments</span>
          <span className="text-[10px] font-bold">Payments</span>
        </button>
        <div className="relative -top-6">
          <button className="w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center border-4 border-white dark:border-slate-900 active:scale-90 transition-transform">
            <span className="material-icons-round text-3xl">qr_code_scanner</span>
          </button>
        </div>
        <button className="flex flex-col items-center space-y-1 text-slate-400">
          <span className="material-icons-round">notifications</span>
          <span className="text-[10px] font-medium">Inbox</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-slate-400">
          <span className="material-icons-round">menu</span>
          <span className="text-[10px] font-medium">More</span>
        </button>
      </nav>
    </div>
  );
};

export default Home;


import React, { useState, useEffect } from 'react';
import { Screen, Biller, TransactionData } from './types';
import Home from './screens/Home';
import CustomerDetails from './screens/CustomerDetails';
import AmountEntry from './screens/AmountEntry';
import PinEntry from './screens/PinEntry';
import BillSummary from './screens/BillSummary';
import PaymentSuccess from './screens/PaymentSuccess';
import Loading from './screens/Loading';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [nextScreenAfterLoading, setNextScreenAfterLoading] = useState<Screen | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [transaction, setTransaction] = useState<TransactionData>({
    biller: null,
    customerId: '',
    contactNumber: '',
    amount: 0,
    transactionId: '',
    date: '',
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (currentScreen === Screen.LOADING && nextScreenAfterLoading) {
      const timer = setTimeout(() => {
        setCurrentScreen(nextScreenAfterLoading);
        setNextScreenAfterLoading(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, nextScreenAfterLoading]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const startLoading = (message: string, next: Screen) => {
    setLoadingMessage(message);
    setNextScreenAfterLoading(next);
    setCurrentScreen(Screen.LOADING);
  };

  const handleSelectBiller = (biller: Biller) => {
    setTransaction(prev => ({ ...prev, biller }));
    setCurrentScreen(Screen.CUSTOMER_DETAILS);
  };

  const handleBack = () => {
    switch (currentScreen) {
      case Screen.CUSTOMER_DETAILS:
        setCurrentScreen(Screen.HOME);
        break;
      case Screen.AMOUNT_ENTRY:
        setCurrentScreen(Screen.CUSTOMER_DETAILS);
        break;
      case Screen.SUMMARY:
        setCurrentScreen(Screen.AMOUNT_ENTRY);
        break;
      case Screen.PIN_ENTRY:
        setCurrentScreen(Screen.SUMMARY);
        break;
      case Screen.SUCCESS:
        setCurrentScreen(Screen.HOME);
        break;
      default:
        break;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.LOADING:
        return <Loading message={loadingMessage} />;
      case Screen.HOME:
        return <Home onSelectBiller={handleSelectBiller} onToggleDarkMode={toggleDarkMode} />;
      case Screen.CUSTOMER_DETAILS:
        return (
          <CustomerDetails
            biller={transaction.biller!}
            onBack={handleBack}
            onNext={(customerId, contact) => {
              setTransaction(prev => ({ ...prev, customerId, contactNumber: contact }));
              setCurrentScreen(Screen.AMOUNT_ENTRY);
            }}
          />
        );
      case Screen.AMOUNT_ENTRY:
        return (
          <AmountEntry
            biller={transaction.biller!}
            onBack={handleBack}
            onNext={(amount) => {
              setTransaction(prev => ({ ...prev, amount }));
              startLoading("Validating Customer Info", Screen.SUMMARY);
            }}
          />
        );
      case Screen.SUMMARY:
        return (
          <BillSummary
            transaction={transaction}
            onBack={handleBack}
            onConfirm={() => setCurrentScreen(Screen.PIN_ENTRY)}
          />
        );
      case Screen.PIN_ENTRY:
        return (
          <PinEntry
            biller={transaction.biller!}
            amount={transaction.amount}
            onBack={handleBack}
            onNext={() => {
              const txId = 'BP' + Math.random().toString().slice(2, 10).toUpperCase();
              const date = new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
              setTransaction(prev => ({ ...prev, transactionId: txId, date }));
              startLoading("Processing Payment", Screen.SUCCESS);
            }}
          />
        );
      case Screen.SUCCESS:
        return (
          <PaymentSuccess
            transaction={transaction}
            onHome={() => setCurrentScreen(Screen.HOME)}
          />
        );
      default:
        return <Home onSelectBiller={handleSelectBiller} onToggleDarkMode={toggleDarkMode} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative flex flex-col transition-colors duration-300">
      <div className="h-11 w-full bg-primary flex items-center justify-between px-6 text-white text-xs font-semibold shrink-0">
        <span>9:41</span>
        <div className="flex items-center space-x-1.5">
          <span className="material-icons-round text-[14px]">signal_cellular_alt</span>
          <span className="material-icons-round text-[14px]">wifi</span>
          <span className="material-icons-round text-[14px]">battery_full</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar">
        {renderScreen()}
      </div>

      {(currentScreen === Screen.HOME || currentScreen === Screen.AMOUNT_ENTRY || currentScreen === Screen.CUSTOMER_DETAILS || currentScreen === Screen.PIN_ENTRY || currentScreen === Screen.SUMMARY) && (
        <button 
          onClick={toggleDarkMode}
          className="fixed bottom-28 right-6 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center text-slate-600 dark:text-yellow-400 z-[60] border border-slate-200 dark:border-slate-700 active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
        </button>
      )}
    </div>
  );
};

export default App;

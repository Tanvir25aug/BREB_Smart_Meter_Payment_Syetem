
import React from 'react';

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background-light dark:bg-background-dark min-h-screen px-6 text-center">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-icons-round text-primary text-4xl animate-pulse">sync</span>
        </div>
      </div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{message}</h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm">Please wait a moment while we process your request...</p>
      
      <div className="mt-12 w-full max-w-xs bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
        <div className="bg-primary h-full w-full origin-left animate-[loading-bar_3s_linear]"></div>
      </div>
      
      <style>{`
        @keyframes loading-bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default Loading;

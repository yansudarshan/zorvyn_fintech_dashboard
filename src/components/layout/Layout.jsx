import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { useStore } from '../../store/useStore';

export const Layout = ({ children }) => {
  const initTheme = useStore(state => state.initTheme);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-grid-pattern">
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 dark:bg-blue-500/10 blur-[130px] pointer-events-none transition-colors duration-1000" />
      <div className="fixed top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[130px] pointer-events-none transition-colors duration-1000" />
      
      <Navbar />
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-6">
        {children}
      </main>
    </div>
  );
};

import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

// this is the main layout wrapping the app content
export const Layout = ({ children }) => {
  

  const initTheme = useStore(state => state.initTheme);
  const role = useStore(state => state.role);

  // loads theme on mount
  useEffect(() => {
    initTheme();
  }, [initTheme]);


  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-grid-pattern">
      
      {/* background blurry blobs */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 dark:bg-blue-500/10 blur-[130px] pointer-events-none transition-colors duration-1000" />
      
      <div className="fixed top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[130px] pointer-events-none transition-colors duration-1000" />

      
      <Navbar />

      <AnimatePresence>
        
        {role === 'Admin' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full glass border-b border-gray-200 dark:border-white/10 z-[40] relative overflow-hidden flex"
          >
            
            <motion.div
              animate={{ x: ["-100%", "100vw"] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="py-1.5 px-4 flex items-center gap-1.5 md:gap-2 text-[11px] md:text-xs min-w-max whitespace-nowrap"
            >
              {/* admin warning banner */}
              <ShieldAlert size={14} className="text-fintech-emerald" />
              <span className="text-fintech-dark dark:text-fintech-lightBg font-bold tracking-widest uppercase">Administrative Session</span>
              
              <span className="text-gray-400 dark:text-gray-600">|</span>
              <span className="text-gray-600 dark:text-gray-400 font-medium">Elevated privileges active. All actions are logged and audited.</span>
            </motion.div>
          </motion.div>
        )}
        
      </AnimatePresence>


      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-6">
        {children}
      </main>
      
    </div>
  );
};

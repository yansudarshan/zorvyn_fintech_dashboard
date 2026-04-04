import React from 'react';
import { Moon, Sun, Shield, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { theme, toggleTheme, role, toggleRole } = useStore();

  return (
    <nav className="sticky top-0 z-50 glass border-t-0 border-x-0 rounded-none px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="text-gray-500 dark:text-gray-300 w-8 h-8 md:w-10 md:h-10 mt-1">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M 5,50 Q 30,60 40,40 Q 30,20 40,15 Q 15,35 5,50 Z" />
            <path d="M 40,85 Q 40,65 60,50 Q 85,35 90,40 Q 60,65 40,85 Z" />
          </svg>
        </div>
        <div className="flex flex-col -gap-2 leading-none">
           <span className="text-2xl md:text-3xl font-medium tracking-tight text-gray-800 dark:text-gray-200 mt-1 flex items-center">
             zorvyn
             <span className="text-[9px] md:text-[11px] text-gray-500 dark:text-gray-400 font-medium tracking-wider relative top-1 md:top-2 ml-1">fintech</span>
           </span>
        </div>
      </div>
      
      <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
         <span className="text-sm font-semibold text-gray-900 dark:text-white border-b-2 border-fintech-teal pb-1 cursor-pointer transition-colors">Home</span>
         <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors flex items-center gap-1">Solutions <span className="text-xs">▾</span></span>
         <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">Features</span>
         <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">Pricing</span>
         <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors flex items-center gap-1">Company <span className="text-xs">▾</span></span>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:flex bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all items-center gap-2 shadow-md mr-2">
          Contact Sales <span className="text-xs">→</span>
        </button>
        <button
          onClick={toggleRole}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-200/50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        >
          <Shield size={16} className={role === 'Admin' ? 'text-fintech-emerald' : 'text-gray-400'} />
          <span className="text-gray-700 dark:text-gray-300">{role}</span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 dark:border-white/20 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <User size={18} />
        </div>
      </div>
    </nav>
  );
};

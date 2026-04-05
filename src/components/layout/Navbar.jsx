import React from 'react';
import { Moon, Sun, Shield, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';

// top navigation bar component
export const Navbar = () => {
  

  const { theme, toggleTheme, role, toggleRole } = useStore();

  return (
    <nav className="sticky top-0 z-50 glass border-t-0 border-x-0 rounded-none px-4 md:px-8 py-4 flex items-center justify-between">
      
      <div className="flex items-center gap-2 md:gap-3 ml-2 md:ml-4">
        
        {/* logo and branding */}
        <motion.div
          className="relative pt-2 pb-2 md:pb-1 flex flex-col justify-center cursor-pointer origin-left"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <span className="text-2xl md:text-3xl font-medium tracking-tight text-gray-800 dark:text-gray-200 leading-none">
            zorvyn
          </span>
          <span className="absolute bottom-0 left-[80%] md:left-[82%] text-[10px] md:text-[12px] text-gray-500 dark:text-gray-400 font-medium tracking-wider leading-none">
            fintech
          </span>
        </motion.div>
        
      </div>


      {/* right side options */}
      <div className="flex items-center gap-4">

        <button
          onClick={toggleRole}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-200/50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        >
          <Shield size={16} className={role === 'Admin' ? 'text-fintech-emerald' : 'text-gray-400'} />
          <span className="text-gray-700 dark:text-gray-300">{role}</span>
        </button>


        {/* dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* avatar placeholder */}
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 dark:border-white/20 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
          
          <User size={18} />
        </div>
        
      </div>
    </nav>
  );
};

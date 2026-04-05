import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

// frosted glass card overlay style
export const GlassCard = ({ children, className, delay = 0, ...props }) => {
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={twMerge('glass rounded-[20px] p-6 transition-all duration-300 relative group hidden-scrollbar overflow-hidden', className)}
      {...props}
    >
      
      {/* dynamic hover sheen over everything */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 dark:from-white/10 dark:via-transparent dark:to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px] pointer-events-none mix-blend-overlay" />
      
      
      {/* subtle border highlight on hover */}
      <div className="absolute inset-0 rounded-[20px] border border-white/0 group-hover:border-white/40 dark:group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />

      <div className="relative z-10 h-full">
        {children}
      </div>
      
    </motion.div>
  );
};

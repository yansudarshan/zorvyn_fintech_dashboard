import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

// styled dynamic button
export const Button = ({ children, variant = 'primary', className, ...props }) => {
  
  // base standard classes definition
  const baseClasses = 'px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-fintech-accent/50';
  
  const variants = {
    primary: 'bg-gradient-to-r from-fintech-accent to-fintech-cyan hover:from-fintech-purple hover:to-fintech-accent text-white shadow-lg shadow-fintech-accent/30',
    secondary: 'glass text-gray-800 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-white/10',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
  };


  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={twMerge(baseClasses, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge(
        'w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-fintech-accent/50 transition-all',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

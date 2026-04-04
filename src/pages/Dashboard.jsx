import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OverviewCards } from '../components/dashboard/OverviewCards';
import { BalanceChart } from '../components/dashboard/BalanceChart';
import { SpendingChart } from '../components/dashboard/SpendingChart';
import { Insights } from '../components/dashboard/Insights';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionModal } from '../components/modal/TransactionModal';

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txToEdit, setTxToEdit] = useState(null);

  const handleOpenAdd = () => {
    setTxToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tx) => {
    setTxToEdit(tx);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-8 pb-10 w-full">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center py-12 md:py-20 px-4 relative mt-4 md:mt-6"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 glass text-xs font-semibold text-gray-700 dark:text-gray-300">
            <span className="text-fintech-emerald">✔</span> Trusted by 600+ Companies Worldwide <span className="text-gray-400">›</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-[1.15] tracking-tight max-w-5xl">
            Building <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-500">Secure</span>,<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-500">Compliant</span>, and <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-400 dark:from-blue-400 dark:to-emerald-400">Intelligent</span><br />
            Financial Systems
          </h1>
          <p className="mt-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Enterprise grade financial infrastructure that scales with you.<br className="hidden md:block"/>
            From startups to enterprises, we power the future of finance.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
             <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3.5 rounded-xl font-medium shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2">
               Get Started <span>→</span>
             </button>
             <button className="bg-transparent glass border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 px-8 py-3.5 rounded-xl font-medium transition-all flex items-center gap-2">
               <span className="text-[10px]">▶</span> See How It Works
             </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full">
          <OverviewCards />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 min-h-[400px]">
          <BalanceChart />
          <SpendingChart />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <Insights />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
          <TransactionTable 
            onOpenModal={handleOpenAdd} 
            onEditTransaction={handleOpenEdit} 
          />
        </motion.div>
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        txToEdit={txToEdit} 
      />
    </>
  );
};

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
        <div className="relative w-full flex items-center justify-center min-h-[45vh] md:min-h-[50vh] mt-4 mb-4 md:mb-8 overflow-visible">
          {/* Subtle Teal/Cyan/Mint Glow Orbs behind Hero */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-cyan-600/30 blur-[100px] opacity-30 dark:opacity-15 pointer-events-none dark:mix-blend-screen" />
          <div className="absolute bottom-0 left-1/3 w-[250px] h-[250px] rounded-full bg-teal-400/20 blur-[90px] opacity-30 dark:opacity-10 pointer-events-none dark:mix-blend-screen" />
          <div className="absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#007f7c]/20 blur-[120px] opacity-30 dark:opacity-15 pointer-events-none dark:mix-blend-screen" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center py-16 px-6 relative z-10 w-full max-w-5xl mx-auto glass rounded-[3rem] border border-white/50 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl bg-white/40 dark:bg-[#0B1026]/40"
          >
            <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200/50 shadow-sm dark:border-white/10 glass text-[13px] font-medium text-gray-700 dark:text-gray-300 transition-all hover:border-fintech-teal/30 dark:hover:border-fintech-teal/50 cursor-default">
              <span className="flex h-2 w-2 relative mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fintech-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fintech-emerald"></span>
              </span>
              Trusted by 600+ Companies Worldwide <span className="text-gray-400 ml-1">→</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight max-w-4xl">
              Building <span className="bg-clip-text text-transparent bg-gradient-to-r from-fintech-accent to-fintech-teal dark:from-fintech-cyan dark:to-fintech-teal drop-shadow-sm">Secure</span>,<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fintech-purple to-fintech-indigo dark:from-fintech-purple dark:to-indigo-400 drop-shadow-sm">Compliant</span>, and <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fintech-teal to-fintech-emerald dark:from-fintech-teal dark:to-fintech-emerald drop-shadow-sm">Intelligent</span><br />
              <span className="text-gray-800 dark:text-gray-100">Financial Systems</span>
            </h1>
            
            <p className="mt-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium tracking-wide">
              Enterprise grade financial infrastructure that scales with you.<br className="hidden md:block"/>
              From startups to enterprises, we power the future of finance.
            </p>
          </motion.div>
        </div>

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

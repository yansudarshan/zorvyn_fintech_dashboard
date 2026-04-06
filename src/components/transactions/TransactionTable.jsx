import React, { useMemo } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useStore } from '../../store/useStore';
import { categories } from '../../data/dummyData';
import { Edit2, Trash2, Plus, Search, FileText, Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';

// shows list of latest transactions
export const TransactionTable = ({ onOpenModal, onEditTransaction }) => {
  

  const { transactions, role, deleteTransaction, filters, setFilters } = useStore();

  // advanced searching filtering and sorting logic
  const filteredTransactions = useMemo(() => {
    
    let result = transactions;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    
    if (filters.category !== 'All') {
      result = result.filter(t => t.category === filters.category);
    }
    
    
    if (filters.type !== 'All') {
      result = result.filter(t => t.type === filters.type);
    }


    result.sort((a, b) => {
      
      if (filters.sort === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (filters.sort === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (filters.sort === 'amount-desc') return b.amount - a.amount;
      if (filters.sort === 'amount-asc') return a.amount - b.amount;
      return 0;
    });

    return result;
  }, [transactions, filters]);


  return (
    <div className="flex flex-col gap-4 w-full">
      <GlassCard delay={0.7} className="flex flex-col gap-6 w-full p-4 md:p-6 overflow-hidden">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Transactions</h2>
        </div>


        <div className="flex flex-col gap-3">
          
          <div className="flex flex-col md:flex-row gap-3 items-center">
            {/* search box element */}
            <div className="relative w-full md:w-auto flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search transactions..."
                className="pl-10 h-[42px] w-full"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
              />
            </div>
            
            <div className="md:hidden w-full relative">
              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
              <Input type="date" className="pl-10 h-[42px] w-full text-gray-500 appearance-none bg-white/50 dark:bg-white/5 cursor-pointer" />
            </div>

            {/* selects for filtering mapping categories */}
            <div className="flex gap-3 w-full md:w-auto shrink-0 overflow-x-auto pb-1 mt-1 md:pb-0 md:mt-0 no-scrollbar">
              <select
                className="min-w-[120px] h-[42px] px-3 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fintech-accent/50 text-sm appearance-none cursor-pointer"
                value={filters.category} onChange={e => setFilters({ category: e.target.value })}
              >
                <option className="dark:bg-gray-800" value="All">All</option>
                {categories.map(c => <option className="dark:bg-gray-800" key={c} value={c}>{c}</option>)}
              </select>
              
              <select
                className="min-w-[120px] h-[42px] px-3 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fintech-accent/50 text-sm appearance-none cursor-pointer"
                value={filters.type} onChange={e => setFilters({ type: e.target.value })}
              >
                <option className="dark:bg-gray-800" value="All">All Types</option>
                <option className="dark:bg-gray-800" value="Income">Income</option>
                <option className="dark:bg-gray-800" value="Expense">Expense</option>
              </select>
              
              <select
                className="min-w-[140px] h-[42px] px-3 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fintech-accent/50 text-sm appearance-none cursor-pointer"
                value={filters.sort} onChange={e => setFilters({ sort: e.target.value })}
              >
                <option className="dark:bg-gray-800" value="date-desc">Sort by Date</option>
                <option className="dark:bg-gray-800" value="amount-desc">Amount (High)</option>
                <option className="dark:bg-gray-800" value="amount-asc">Amount (Low)</option>
              </select>
            </div>
            
          </div>
          
          {role === 'Admin' && (
            <div className="flex justify-start">
              
              {/* opens the tx modal on click */}
              <Button onClick={() => onOpenModal()} className="px-5 py-2 shadow-sm rounded-xl">
                <Plus size={18} className="mr-1" /> Add Transaction
              </Button>
            </div>
          )}
        </div>


        <div className="hidden md:flex justify-between items-center gap-2 mb-2 w-full mt-2">
          <div className="relative">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
            <Input type="date" className="pl-8 h-[36px] text-xs py-1 bg-white/40 border border-white/20 text-gray-500 appearance-none cursor-pointer w-44" />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="px-3 py-1.5 text-sm">
              <FileText size={16} /> CSV
            </Button>
            <Button variant="secondary" className="px-3 py-1.5 text-sm">
              <Download size={16} /> PDF
            </Button>
          </div>
        </div>

        {/* loop through filtered results */}
        <div className="flex flex-col gap-2 mt-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {filteredTransactions.length === 0 ? (
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-gray-400">
                No transactions found.
              </motion.div>
              
            ) : (
              filteredTransactions.map((tx, idx) => {
                const isIncome = tx.type === 'Income';
                
                return (
                  <motion.div
                    key={tx.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: Math.min(idx * 0.05, 0.3),
                      whileHover: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                    className={`shrink-0 flex justify-between py-4 px-4 sm:py-5 sm:px-5 rounded-xl bg-white/60 dark:bg-white/5 border hover:shadow-xl transition-all duration-300 group relative overflow-hidden backdrop-blur-md ${isIncome ? 'border-fintech-emerald/20 dark:border-fintech-emerald/10' : 'border-red-500/20 dark:border-red-500/10'} ${role === 'Admin' ? 'flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-0' : 'flex-row items-center gap-0'}`}
                  >
                    
                    {/* vibrant background glow on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none ${isIncome ? 'bg-fintech-emerald' : 'bg-red-500'}`}></div>

                    {/* left border indicator */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 opacity-80 group-hover:opacity-100 group-hover:w-2.5 transition-all duration-300 z-10 ${isIncome ? 'bg-gradient-to-b from-fintech-emerald to-green-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-b from-red-500 to-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.6)]'}`}></div>


                    <div className="flex items-center gap-4 relative z-20 pl-2">
                      {role !== 'Admin' && (
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 duration-300 ${isIncome ? 'bg-gradient-to-br from-fintech-emerald/20 to-green-500/5 text-fintech-emerald border border-fintech-emerald/20' : 'bg-gradient-to-br from-red-500/20 to-red-500/5 text-red-500 border border-red-500/20'}`}>
                          {isIncome ? <TrendingUp size={20} strokeWidth={2.5} /> : <TrendingDown size={20} strokeWidth={2.5} />}
                        </div>
                      )}
                      
                      <div className="flex flex-col">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 tracking-tight leading-tight">{tx.description}</h4>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-xs font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/5 leading-tight">{tx.category}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-none">• {format(parseISO(tx.date), 'MMM dd, yyyy')}</span>
                        </div>
                        
                      </div>
                    </div>


                    <div className={`flex items-center relative z-20 ${role === 'Admin' ? 'w-full sm:w-auto justify-between sm:justify-end gap-0 sm:gap-5 border-t border-gray-200/60 dark:border-white/10 sm:border-none pt-3 sm:pt-0' : 'gap-5'}`}>
                      <div className={`flex flex-col justify-center ${role === 'Admin' ? 'text-left sm:text-right' : 'text-right'}`}>
                        <span className={`block font-bold tabular-nums tracking-tight text-lg sm:text-xl drop-shadow-sm transition-transform group-hover:scale-105 duration-300 leading-tight ${role === 'Admin' ? 'origin-left sm:origin-right' : 'origin-right'} ${isIncome ? 'text-fintech-emerald' : 'text-red-500 dark:text-red-400'}`}>
                          {isIncome ? '+' : '-'}₹{tx.amount.toFixed(2)}
                        </span>
                        <span className={`text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 font-bold tracking-widest uppercase mt-0.5 sm:mt-1 block leading-none`}>{isIncome ? 'Credit' : 'Debit'}</span>
                      </div>

                      {role === 'Admin' && (
                        <div className="flex flex-row items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:-translate-x-2 sm:group-hover:translate-x-0 transition-all duration-300 shrink-0">
                          {/* edit and delete commands */}
                          <button onClick={() => onEditTransaction(tx)} className="flex items-center justify-center gap-1.5 px-3 py-1.5 sm:p-2.5 text-gray-600 dark:text-gray-300 hover:text-fintech-accent bg-gray-100/80 dark:bg-white/5 hover:bg-white hover:dark:bg-white/20 rounded-lg sm:rounded-xl transition-all shadow-sm border border-gray-200/50 dark:border-white/5 hover:border-fintech-accent/50 text-xs font-bold uppercase tracking-wider"><Edit2 size={14} className="sm:w-[18px] sm:h-[18px]" /><span className="sm:hidden">Edit</span></button>
                          <button onClick={() => deleteTransaction(tx.id)} className="flex items-center justify-center gap-1.5 px-3 py-1.5 sm:p-2.5 text-gray-600 dark:text-gray-300 hover:text-red-500 bg-gray-100/80 dark:bg-white/5 hover:bg-white hover:dark:bg-white/20 rounded-lg sm:rounded-xl transition-all shadow-sm border border-gray-200/50 dark:border-white/5 hover:border-red-500/50 text-xs font-bold uppercase tracking-wider"><Trash2 size={14} className="sm:w-[18px] sm:h-[18px]" /><span className="sm:hidden">Delete</span></button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
            
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
};
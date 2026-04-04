import React, { useMemo } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useStore } from '../../store/useStore';
import { categories } from '../../data/dummyData';
import { Edit2, Trash2, Plus, Search, FileText, Download, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';

export const TransactionTable = ({ onOpenModal, onEditTransaction }) => {
  const { transactions, role, deleteTransaction, filters, setFilters } = useStore();
  
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
    
    result.sort((a,b) => {
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
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="px-3 py-1.5 text-sm hidden sm:flex">
              <FileText size={16} /> CSV
            </Button>
            <Button variant="secondary" className="px-3 py-1.5 text-sm hidden sm:flex">
              <Download size={16} /> PDF
            </Button>
            {role === 'Admin' && (
              <Button onClick={() => onOpenModal()} className="px-4 py-1.5 shadow-fintech-accent/40">
                <Plus size={18} /> Add
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search transactions..." 
              className="pl-10 h-[42px] w-full"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
            />
          </div>
          <Button variant="secondary" className="md:hidden w-full justify-start h-[42px]">
             <Calendar size={18} className="text-gray-400" /> Select date range
          </Button>

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

        <div className="hidden md:flex gap-2 mb-2">
            <Button variant="secondary" className="justify-start h-[36px] text-xs px-3 py-1 bg-white/40 border border-white/20">
             <Calendar size={14} className="text-gray-400 mr-1" /> Select date range
            </Button>
        </div>

        <div className="flex flex-col gap-2 mt-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {filteredTransactions.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-gray-400">
                No transactions found.
              </motion.div>
            ) : (
              filteredTransactions.map((tx, idx) => (
                <motion.div
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.05, 0.5) }}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors group relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-fintech-accent to-fintech-purple"></div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'Income' ? 'bg-fintech-emerald/10 text-fintech-emerald' : 'bg-red-500/10 text-red-400'}`}>
                      {tx.type === 'Income' ? '+' : '-'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">{tx.description}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {tx.category} • {format(parseISO(tx.date), 'yyyy-MM-dd')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <span className={`font-bold tabular-nums tracking-tight ${tx.type === 'Income' ? 'text-fintech-emerald' : 'text-red-500 dark:text-red-400'}`}>
                      {tx.type === 'Income' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                    </span>
                    
                    {role === 'Admin' && (
                      <div className="flex items-center gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEditTransaction(tx)} className="p-1.5 text-gray-400 hover:text-fintech-accent sm:bg-white/50 sm:dark:bg-black/20 rounded-md transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => deleteTransaction(tx.id)} className="p-1.5 text-gray-400 hover:text-red-500 sm:bg-white/50 sm:dark:bg-black/20 rounded-md transition-colors"><Trash2 size={16} /></button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
};

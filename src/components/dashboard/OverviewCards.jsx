import React, { useMemo } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { useStore } from '../../store/useStore';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

// component that shows main user stats
export const OverviewCards = () => {
  const transactions = useStore(state => state.transactions);

  // calculate current amounts mapped in cards
  const { income, expense, balance } = useMemo(() => {
    
    return transactions.reduce(
      (acc, tx) => {
        if (tx.type === 'Income') acc.income += tx.amount;
        if (tx.type === 'Expense') acc.expense += tx.amount;
        acc.balance = acc.income - acc.expense;
        
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);


  const cards = [
    { title: 'Total Balance', amount: balance, icon: Wallet, color: 'text-fintech-accent dark:text-blue-300', bg: 'bg-gradient-to-br from-blue-500/20 to-fintech-accent/5 shadow-inner border border-blue-500/10', hover: 'hover:border-blue-500/30 cursor-pointer', delay: 0.1, trend: '+8.5%' },
    { title: 'Total Income', amount: income, icon: TrendingUp, color: 'text-fintech-purple dark:text-purple-300', bg: 'bg-gradient-to-br from-purple-500/20 to-fintech-purple/5 shadow-inner border border-purple-500/10', hover: 'hover:border-purple-500/30 cursor-pointer', delay: 0.2, trend: '+12.3%' },
    { title: 'Total Expenses', amount: expense, icon: TrendingDown, color: 'text-fintech-emerald dark:text-emerald-300', bg: 'bg-gradient-to-br from-emerald-500/20 to-fintech-emerald/5 shadow-inner border border-emerald-500/10', hover: 'hover:border-emerald-500/30 cursor-pointer', delay: 0.3, trend: '-5.2%' },
  ];


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {cards.map((card, i) => (
        <GlassCard key={card.title} delay={card.delay} className={`flex flex-col gap-4 ${card.hover}`}>
          
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-2">{card.title}</p>
              
              <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                ₹{card.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
            
            <div className={`p-3.5 rounded-[18px] ${card.bg} ${card.color} flex items-center justify-center relative overflow-hidden backdrop-blur-md`}>
              {/* hover effect over icon background */}
              <div className="absolute inset-0 bg-white/20 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <card.icon size={26} className="relative z-10" strokeWidth={2.5} />
            </div>
            
          </div>
          
          <div className="flex items-center gap-2 text-sm mt-2 font-medium">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
              card.trend.startsWith('+') 
                ? 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' 
                : 'bg-red-100/50 text-red-700 dark:bg-red-500/20 dark:text-red-400'
            }`}>
              {card.trend.startsWith('+') ? '↑' : '↓'} {card.trend.replace(/[+-]/,'')}
            </span>
            <span className="text-gray-400 dark:text-gray-500 text-xs">vs last month</span>
          </div>

        </GlassCard>
      ))}
      
    </div>
  );
};

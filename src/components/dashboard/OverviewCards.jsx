import React, { useMemo } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { useStore } from '../../store/useStore';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export const OverviewCards = () => {
  const transactions = useStore(state => state.transactions);

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
    { title: 'Total Balance', amount: balance, icon: Wallet, color: 'text-fintech-accent', bg: 'bg-fintech-accent/20', delay: 0.1, trend: '+8.5%' },
    { title: 'Total Income', amount: income, icon: TrendingUp, color: 'text-fintech-purple', bg: 'bg-fintech-purple/20', delay: 0.2, trend: '+12.3%' },
    { title: 'Total Expenses', amount: expense, icon: TrendingDown, color: 'text-fintech-cyan', bg: 'bg-fintech-cyan/20', delay: 0.3, trend: '-5.2%' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <GlassCard key={card.title} delay={card.delay} className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{card.title}</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{card.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
            <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
              <card.icon size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className={card.trend.startsWith('+') ? 'text-fintech-emerald dark:text-fintech-emerald' : 'text-red-500 dark:text-red-400'}>
              {card.trend.startsWith('+') ? '↑' : '↓'} {card.trend.replace(/[+-]/,'')}
            </span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

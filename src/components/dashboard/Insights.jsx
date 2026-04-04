import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { TrendingUp, Award, Zap } from 'lucide-react';

export const Insights = () => {
  const insights = [
    { title: 'Highest Spending', value: 'Bills', sub: '₹1635.00', icon: Zap, color: 'text-red-500', bg: 'bg-red-500/20' },
    { title: 'Monthly Change', value: '+0.0%', sub: 'vs last month', icon: TrendingUp, color: 'text-fintech-accent', bg: 'bg-fintech-accent/20' },
    { title: 'Total Savings', value: '₹3319.00', sub: 'This period', icon: Award, color: 'text-fintech-emerald', bg: 'bg-fintech-emerald/20' },
  ];

  return (
    <GlassCard delay={0.6} className="bg-white/40 dark:bg-[#ffffff03]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Insights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {insights.map((item, i) => (
          <div key={i} className="p-4 rounded-2xl glass border-none bg-white/50 dark:bg-white/5 flex flex-col justify-center transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">{item.title}</span>
              <div className={`p-1.5 rounded-lg ${item.bg} ${item.color}`}>
                <item.icon size={16} />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

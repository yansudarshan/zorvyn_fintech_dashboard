import React, { useMemo } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { useStore } from '../../store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const SpendingChart = () => {
  const transactions = useStore(state => state.transactions);

  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    const map = {};
    expenses.forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const COLORS = ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <GlassCard delay={0.5} className="h-full min-h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Spending by Category</h3>
      <div className="w-full h-[300px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
               contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
            />
            <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '12px', opacity: 0.8 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

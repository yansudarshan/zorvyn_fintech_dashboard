import React, { useMemo } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { useStore } from '../../store/useStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { parseISO, format } from 'date-fns';

export const BalanceChart = () => {
  const transactions = useStore(state => state.transactions);
  
  const data = useMemo(() => {
    let cumulative = 0;
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const map = {};
    sorted.forEach(tx => {
       const d = format(parseISO(tx.date), 'yyyy-MM-dd');
       cumulative += tx.type === 'Income' ? tx.amount : -tx.amount;
       map[d] = cumulative;
    });
    
    return Object.entries(map).map(([date, balance]) => ({
       date,
       balance
    })).slice(-15);
  }, [transactions]);

  return (
    <GlassCard delay={0.4} className="h-full min-h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">Balance Trend</h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} minTickGap={30} />
            <YAxis tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', backdropFilter: 'blur(10px)' }}
              itemStyle={{ color: '#0EA5E9' }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#0EA5E9' }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

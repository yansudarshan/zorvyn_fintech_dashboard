import React, { useMemo } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { useStore } from '../../store/useStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { parseISO, format } from 'date-fns';
import { motion } from 'framer-motion';

// custom hover tooltip for chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    
    
    // gets stroke color default
    const data = payload[0];
    const color = data.color || data.payload?.stroke || '#0EA5E9'; 

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl rounded-xl p-3 border border-gray-200/50 dark:border-white/10 min-w-[140px]" 
      >
        <p className="font-semibold text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-wider mb-2 text-center pb-2 border-b border-gray-100 dark:border-gray-800/60">
          {label}
        </p>


        <div className="flex items-center gap-3 px-1 mt-1">
          <div 
            className="w-2.5 h-2.5 rounded-full shadow-sm"
            style={{ backgroundColor: color }}
          />

          <div className="flex-1">
            <p className="text-gray-400 dark:text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">
              Balance
            </p>
            <p className="font-extrabold text-lg text-gray-900 dark:text-white leading-none">
              ₹{data.value.toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return null;
};


// renders main balance trend chart
export const BalanceChart = () => {
  
  const transactions = useStore(state => state.transactions);
  
  // calculate map data points
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
          
          <AreaChart data={data} margin={{ top: 15, right: 10, left: 0, bottom: 0 }}>
            {/* defs for filters and gradients */}
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0}/>
              </linearGradient>
              <filter id="glowShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0EA5E9" floodOpacity="0.3"/>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.05} vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#888', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} minTickGap={30} />
            <YAxis tick={{ fill: '#888', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
            
            <Tooltip content={<CustomTooltip />} isAnimationActive={false} cursor={{ stroke: '#0EA5E9', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.4 }} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#0EA5E9"
              fillOpacity={1}
              fill="url(#colorBalance)"
              strokeWidth={4}
              filter="url(#glowShadow)"
              activeDot={{ r: 7, fill: '#0EA5E9', stroke: '#fff', strokeWidth: 3 }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

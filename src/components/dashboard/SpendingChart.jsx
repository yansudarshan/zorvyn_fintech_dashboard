import React, { useMemo, useEffect, useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { useStore } from '../../store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Sector } from 'recharts';
import { IndianRupee } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';

// smooth animated counter for numbers inside charts
const AnimatedCounter = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  
  useEffect(() => {
    const controls = animate(count, value, { duration: 0.8, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};


// helper mapping to draw outline for pie slices
const renderActiveShape = (props) => {
  
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  
  return (
    <g style={{ outline: 'none' }}>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="transition-all duration-300 outline-none focus:outline-none"
        style={{ outline: 'none' }}
      />
    </g>
  );
};


// a small hovering card when pie chart piece selected
const ActiveBox = ({ data, color }) => {
  if (!data) return null;
  

  return (
    <motion.div 
      key={data.name}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="bg-white/90 dark:bg-slate-800/90 sm:bg-white/95 sm:dark:bg-slate-900/95 backdrop-blur-md shadow-lg sm:shadow-2xl rounded-lg sm:rounded-2xl px-3 py-2 sm:p-4 border border-gray-200/50 dark:border-white/10 flex items-center gap-2 sm:gap-4 origin-top-right w-auto sm:min-w-[200px]" 
    >
      <div 
        className="w-3 h-3 sm:w-10 sm:h-10 rounded-full flex items-center justify-center sm:text-white shadow-sm sm:shadow-md relative overflow-hidden shrink-0"
        style={{ backgroundColor: color }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1, stiffness: 300 }}
          className="hidden sm:block"
        >
          <IndianRupee size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
        </motion.div>
      </div>
      <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
        <p className="font-semibold sm:font-bold text-gray-700 dark:text-gray-300 sm:text-gray-500 sm:dark:text-gray-400 text-[11px] sm:text-xs uppercase tracking-wider m-0 sm:mb-0.5">
          {data.name}
        </p>
        <p className="font-bold sm:font-extrabold text-sm sm:text-2xl text-gray-900 dark:text-white leading-none flex items-center m-0">
          ₹<AnimatedCounter value={data.value} />
        </p>
      </div>
    </motion.div>
  );
};


// main pie chart component view
export const SpendingChart = () => {
  
  const transactions = useStore(state => state.transactions);
  const [activeIndex, setActiveIndex] = useState(null);

  // grouping expenses logically
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
    <GlassCard delay={0.5} className="h-full min-h-[400px] flex flex-col relative z-10">
      
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Spending by Category</h3>
      
      
      <div className="absolute top-4 right-4 z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <ActiveBox data={data[activeIndex]} color={COLORS[activeIndex % COLORS.length]} />
          )}
        </AnimatePresence>
      </div>

      <div className="w-full h-[300px] pt-4 mt-8" style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}>
        <ResponsiveContainer width="100%" height="100%" className="outline-none focus:outline-none">
          
          <PieChart>
            <defs>
              {/* dropshodow configurations here */}
              <filter id="glowPieShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#000000" floodOpacity="0.15" />
              </filter>
              <filter id="glowPieShadowDark" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#000000" floodOpacity="0.5" />
              </filter>
            </defs>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="drop-shadow-xl"
              style={{ filter: document.documentElement.classList.contains('dark') ? 'url(#glowPieShadowDark)' : 'url(#glowPieShadow)' }}
            >
              
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="cursor-pointer outline-none focus:outline-none transition-opacity duration-300"
                  style={{ opacity: activeIndex === null || activeIndex === index ? 1 : 0.4, outline: 'none' }}
                />
              ))}
            </Pie>
            
            <Legend verticalAlign="bottom" iconSize={14} iconType="circle" wrapperStyle={{ fontSize: '15px', fontWeight: '500', opacity: 0.9, paddingTop: '15px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

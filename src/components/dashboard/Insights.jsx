import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { TrendingUp, Award, Zap, ArrowUpRight } from 'lucide-react';

// insights component for tracking summary points
export const Insights = () => {
  

  const insights = [
    {
      title: 'Highest Spending',
      value: 'Bills',
      sub: '₹1635.00',
      icon: Zap,
      
      bgGradient: 'from-blue-500/15 via-blue-500/5 to-transparent',
      accentColor: 'text-blue-500 dark:text-blue-400',
      iconBg: 'bg-blue-500',
      shadowColor: 'rgba(59,130,246,0.2)',
      textGradient: 'from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300'
    },
    
    {
      title: 'Monthly Change',
      value: '+12.4%',
      sub: 'vs last month',
      icon: TrendingUp,
      bgGradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
      accentColor: 'text-emerald-500 dark:text-emerald-400',
      iconBg: 'bg-emerald-500',
      
      shadowColor: 'rgba(16,185,129,0.2)',
      textGradient: 'from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300'
    },
    {
      title: 'Total Savings',
      value: '₹3319.00',
      sub: 'This period',
      icon: Award,
      bgGradient: 'from-pink-500/15 via-purple-500/5 to-transparent',
      accentColor: 'text-pink-500 dark:text-pink-400',
      
      iconBg: 'bg-pink-500',
      shadowColor: 'rgba(236,72,153,0.2)',
      textGradient: 'from-pink-600 to-purple-500 dark:from-pink-400 dark:to-purple-300'
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white px-2 tracking-tight">Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        {insights.map((item, i) => (
          <GlassCard
            key={item.title}
            delay={0.6 + (i * 0.1)}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative overflow-hidden flex flex-col flex-1 !p-6 !rounded-[24px] border border-white/40 dark:border-white/10 transition-all duration-300 backdrop-blur-xl bg-white/40 dark:bg-[#111827]/80"
            style={{ boxShadow: `0 12px 40px -12px ${item.shadowColor}` }}
          >
            {/* softened background gradient overlay */}
            <div className={`absolute -inset-6 rounded-[24px] opacity-40 dark:opacity-85 bg-gradient-to-br ${item.bgGradient} pointer-events-none transition-opacity duration-500 group-hover:opacity-100 z-[-1]`} />
            
            {/* animated glow on hover */}
            <div 
              className={`absolute -inset-1 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-3xl ${item.iconBg}`} 
              style={{ zIndex: -1 }} 
            />


            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-8">
                
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl ${item.iconBg} transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <item.icon size={28} strokeWidth={2.5} />
                </div>
                {/* glassy oval see details button */}
                <div className="h-8 px-4 rounded-full flex items-center justify-center bg-white/10 dark:bg-white/5 border border-white/30 dark:border-white/10 backdrop-blur-md group-hover:bg-white/30 dark:group-hover:bg-white/10 transition-all duration-300 cursor-pointer shadow-lg dark:shadow-none">
                  <span className={`text-xs font-bold text-gray-700 dark:text-gray-200 group-hover:${item.accentColor} transition-colors tracking-wide`}>
                    See Details
                  </span>
                </div>
              </div>


              <div>
                {/* high contrast title text */}
                <h4 className="text-[16px] font-bold tracking-tight text-gray-800 dark:text-gray-200 mb-2">{item.title}</h4>
                <div className="flex items-end gap-3">
                  <span className={`text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${item.textGradient} drop-shadow-sm`}>
                    {item.value}
                  </span>
                </div>
                

                <p className="mt-3 text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-300/60 bg-white/50 dark:bg-white/5 w-fit px-3 py-1 rounded-full border border-gray-200/50 dark:border-white/5">
                  {item.sub}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

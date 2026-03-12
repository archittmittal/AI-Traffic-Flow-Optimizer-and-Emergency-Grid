'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: number; isUp: boolean };
  color: 'cyan' | 'green' | 'amber' | 'red' | 'purple';
}

const colorMap = {
  cyan: { bg: 'from-neon-cyan/20 to-neon-cyan/5', border: 'border-neon-cyan/20', text: 'text-neon-cyan', glow: 'shadow-neon-cyan/10' },
  green: { bg: 'from-neon-green/20 to-neon-green/5', border: 'border-neon-green/20', text: 'text-neon-green', glow: 'shadow-neon-green/10' },
  amber: { bg: 'from-neon-amber/20 to-neon-amber/5', border: 'border-neon-amber/20', text: 'text-neon-amber', glow: 'shadow-neon-amber/10' },
  red: { bg: 'from-neon-red/20 to-neon-red/5', border: 'border-neon-red/20', text: 'text-neon-red', glow: 'shadow-neon-red/10' },
  purple: { bg: 'from-neon-purple/20 to-neon-purple/5', border: 'border-neon-purple/20', text: 'text-neon-purple', glow: 'shadow-neon-purple/10' },
};

export default function StatsCard({ title, value, icon, trend, color }: StatsCardProps) {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`stat-card p-4 bg-gradient-to-br ${c.bg} border ${c.border}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{title}</p>
          <p className={`text-2xl font-bold ${c.text}`}>{value}</p>
          {trend && (
            <p className={`text-xs mt-1 font-medium ${trend.isUp ? 'text-neon-red' : 'text-neon-green'}`}>
              {trend.isUp ? '↑' : '↓'} {Math.abs(trend.value)}% vs last hour
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg bg-dark-700/50 ${c.text}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

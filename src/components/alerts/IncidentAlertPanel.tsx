'use client';

import { Incident } from '@/lib/mockData';
import { motion } from 'framer-motion';
import {
  ExclamationTriangleIcon,
  NoSymbolIcon,
  BoltIcon,
} from '@heroicons/react/24/solid';

interface IncidentAlertPanelProps {
  incident: Incident;
  isSelected?: boolean;
  onClick?: () => void;
}

const typeConfig = {
  accident: { icon: ExclamationTriangleIcon, label: 'Accident', color: 'text-neon-red', bg: 'bg-neon-red/10', border: 'border-neon-red/30' },
  blockage: { icon: NoSymbolIcon, label: 'Blockage', color: 'text-neon-amber', bg: 'bg-neon-amber/10', border: 'border-neon-amber/30' },
  congestion_spike: { icon: BoltIcon, label: 'Congestion Spike', color: 'text-neon-purple', bg: 'bg-neon-purple/10', border: 'border-neon-purple/30' },
};

const severityConfig = {
  low: { color: 'text-neon-green', bg: 'bg-neon-green/15' },
  medium: { color: 'text-neon-amber', bg: 'bg-neon-amber/15' },
  high: { color: 'text-neon-red', bg: 'bg-neon-red/15' },
  critical: { color: 'text-neon-red', bg: 'bg-neon-red/20 border border-neon-red/30' },
};

const statusConfig = {
  active: { label: 'Active', color: 'text-neon-red', dot: 'bg-neon-red' },
  responding: { label: 'Responding', color: 'text-neon-amber', dot: 'bg-neon-amber' },
  resolved: { label: 'Resolved', color: 'text-neon-green', dot: 'bg-neon-green' },
};

export default function IncidentAlertPanel({ incident, isSelected, onClick }: IncidentAlertPanelProps) {
  const tc = typeConfig[incident.type];
  const sc = severityConfig[incident.severity];
  const stc = statusConfig[incident.status];
  const Icon = tc.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick}
      className={`glass-panel p-4 cursor-pointer transition-all duration-200 ${
        isSelected ? 'border-neon-cyan/40 glow-cyan' : 'hover:border-slate-600'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${tc.bg} ${tc.border} border`}>
          <Icon className={`w-4 h-4 ${tc.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${tc.color}`}>{tc.label}</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${stc.dot} pulse-dot`} />
              <span className={`text-[10px] font-medium ${stc.color}`}>{stc.label}</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-1 truncate">{incident.location}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{incident.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${sc.bg} ${sc.color}`}>
              {incident.severity}
            </span>
            <span className="text-[10px] text-slate-500">
              Detected: {incident.timeDetected}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

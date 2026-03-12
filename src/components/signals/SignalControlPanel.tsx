'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SignalControlPanelProps {
  signalId: string;
  intersectionName: string;
  currentPhase: 'green' | 'yellow' | 'red';
  countdown: number;
  aiGreen: number;
  aiYellow: number;
  aiRed: number;
  efficiency: number;
  className?: string;
}

export default function SignalControlPanel({
  signalId,
  intersectionName,
  currentPhase,
  countdown: initialCountdown,
  aiGreen,
  aiYellow,
  aiRed,
  efficiency,
  className = '',
}: SignalControlPanelProps) {
  const [phase, setPhase] = useState(currentPhase);
  const [countdown, setCountdown] = useState(initialCountdown);
  const [isPaused, setIsPaused] = useState(false);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (isPaused || isManual) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setPhase((p) => (p === 'green' ? 'yellow' : p === 'yellow' ? 'red' : 'green'));
          return p === 'green' ? 5 : p === 'yellow' ? aiRed : aiGreen;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, isManual, aiGreen, aiRed]);

  const p = phase; // shorthand

  return (
    <div className={`glass-panel p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">{intersectionName}</h3>
          <p className="text-[10px] text-slate-500 font-mono">{signalId}</p>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
          efficiency >= 80 ? 'bg-neon-green/15 text-neon-green' :
          efficiency >= 60 ? 'bg-neon-amber/15 text-neon-amber' :
          'bg-neon-red/15 text-neon-red'
        }`}>
          {efficiency}% Efficient
        </div>
      </div>

      {/* Traffic Signal */}
      <div className="flex items-center justify-center gap-6 mb-5">
        <div className="bg-dark-900 rounded-2xl p-3 flex flex-col gap-2.5 border border-dark-600">
          <div className={`w-10 h-10 rounded-full transition-all duration-300 ${p === 'red' ? 'traffic-red' : 'traffic-off'}`} />
          <div className={`w-10 h-10 rounded-full transition-all duration-300 ${p === 'yellow' ? 'traffic-yellow' : 'traffic-off'}`} />
          <div className={`w-10 h-10 rounded-full transition-all duration-300 ${p === 'green' ? 'traffic-green' : 'traffic-off'}`} />
        </div>
        <div className="text-center">
          <motion.p
            key={countdown}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-4xl font-bold font-mono ${
              p === 'green' ? 'text-neon-green' : p === 'yellow' ? 'text-neon-amber' : 'text-neon-red'
            }`}
          >
            {countdown}s
          </motion.p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
            {isPaused ? 'Paused' : isManual ? 'Manual' : 'Next Change'}
          </p>
        </div>
      </div>

      {/* AI Recommended Timing */}
      <div className="bg-dark-700/50 rounded-lg p-3 mb-4">
        <p className="text-[10px] text-neon-cyan font-semibold uppercase tracking-wider mb-2">🤖 AI Recommended Timing</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-1.5 rounded bg-neon-green/10 border border-neon-green/20">
            <p className="text-xs font-bold text-neon-green">{aiGreen}s</p>
            <p className="text-[9px] text-slate-500">Green</p>
          </div>
          <div className="text-center p-1.5 rounded bg-neon-amber/10 border border-neon-amber/20">
            <p className="text-xs font-bold text-neon-amber">{aiYellow}s</p>
            <p className="text-[9px] text-slate-500">Yellow</p>
          </div>
          <div className="text-center p-1.5 rounded bg-neon-red/10 border border-neon-red/20">
            <p className="text-xs font-bold text-neon-red">{aiRed}s</p>
            <p className="text-[9px] text-slate-500">Red</p>
          </div>
        </div>
      </div>

      {/* Manual Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => { setPhase('green'); setIsManual(true); setIsPaused(false); setCountdown(aiGreen); }}
          className="btn-success text-xs flex-1"
        >
          Force Green
        </button>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="btn-outline text-xs flex-1"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={() => { setIsManual(false); setIsPaused(false); setPhase(currentPhase); setCountdown(initialCountdown); }}
          className="btn-danger text-xs flex-1"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

'use client';

import SignalControlPanel from '@/components/signals/SignalControlPanel';
import { signals } from '@/lib/mockData';

export default function SignalsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">Signal Control</h1>
        <p className="text-xs text-slate-500 mt-0.5">AI-powered signal management with manual override capabilities</p>
      </div>

      {/* Summary bar */}
      <div className="flex items-center gap-6 glass-panel px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full traffic-green" />
          <span className="text-xs text-slate-400">Green: <strong className="text-neon-green">{signals.filter((s) => s.currentPhase === 'green').length}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full traffic-yellow" />
          <span className="text-xs text-slate-400">Yellow: <strong className="text-neon-amber">{signals.filter((s) => s.currentPhase === 'yellow').length}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full traffic-red" />
          <span className="text-xs text-slate-400">Red: <strong className="text-neon-red">{signals.filter((s) => s.currentPhase === 'red').length}</strong></span>
        </div>
        <div className="ml-auto text-xs text-slate-400">
          Avg Efficiency: <strong className="text-neon-cyan">{Math.round(signals.reduce((s, sig) => s + sig.efficiency, 0) / signals.length)}%</strong>
        </div>
      </div>

      {/* Signal grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {signals.map((signal) => (
          <SignalControlPanel
            key={signal.id}
            signalId={signal.id}
            intersectionName={signal.intersectionName}
            currentPhase={signal.currentPhase}
            countdown={signal.countdown}
            aiGreen={signal.aiRecommendedGreen}
            aiYellow={signal.aiRecommendedYellow}
            aiRed={signal.aiRecommendedRed}
            efficiency={signal.efficiency}
          />
        ))}
      </div>
    </div>
  );
}

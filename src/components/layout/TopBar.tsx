'use client';

import { useState } from 'react';
import {
  BellIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { systemAlerts } from '@/lib/mockData';

export default function TopBar() {
  const [showAlerts, setShowAlerts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const criticalCount = systemAlerts.filter((a) => a.type === 'critical' || a.type === 'warning').length;

  return (
    <header className="fixed top-0 left-[240px] right-0 h-14 bg-dark-800/80 backdrop-blur-xl border-b border-panel-border z-40 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search intersection, signal, or incident..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-700/60 border border-panel-border rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-neon-cyan/30 focus:ring-1 focus:ring-neon-cyan/20 transition-all"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* City Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-700/40 border border-panel-border">
          <span className="w-2 h-2 rounded-full bg-neon-amber pulse-dot" />
          <span className="text-xs font-medium text-neon-amber">Moderate Traffic</span>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-red/10 border border-neon-red/20">
          <span className="w-2 h-2 rounded-full bg-neon-red pulse-dot" />
          <span className="text-xs font-semibold text-neon-red">LIVE</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="relative p-2 rounded-lg hover:bg-dark-700/60 transition-colors"
          >
            <BellIcon className="w-5 h-5 text-slate-400" />
            {criticalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neon-red rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                {criticalCount}
              </span>
            )}
          </button>

          {/* Alerts Dropdown */}
          {showAlerts && (
            <div className="absolute right-0 top-12 w-[380px] glass-panel p-0 shadow-2xl shadow-black/50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-panel-border">
                <h3 className="text-sm font-semibold text-white">System Alerts</h3>
                <button onClick={() => setShowAlerts(false)} className="text-slate-500 hover:text-white">
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`px-4 py-3 border-b border-panel-border/50 hover:bg-dark-700/30 transition-colors ${
                      alert.type === 'critical' ? 'border-l-2 border-l-neon-red' :
                      alert.type === 'warning' ? 'border-l-2 border-l-neon-amber' :
                      alert.type === 'success' ? 'border-l-2 border-l-neon-green' :
                      'border-l-2 border-l-neon-cyan'
                    }`}
                  >
                    <p className="text-xs text-slate-300">{alert.message}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Time */}
        <div className="text-right">
          <p className="text-[10px] text-slate-500 font-medium">
            {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
          <p className="text-xs text-slate-300 font-mono font-semibold">
            {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </p>
        </div>
      </div>
    </header>
  );
}

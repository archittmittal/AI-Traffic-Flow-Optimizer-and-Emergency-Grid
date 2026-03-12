'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CameraFeed from '@/components/traffic/CameraFeed';
import { intersections } from '@/lib/mockData';
import { motion } from 'framer-motion';

const MapView = dynamic(() => import('@/components/maps/MapView'), { ssr: false });

export default function IntersectionsPage() {
  const [selectedId, setSelectedId] = useState(intersections[0].id);
  const selected = intersections.find((i) => i.id === selectedId) || intersections[0];
  const [countdown, setCountdown] = useState(selected.nextSignalChange);

  useEffect(() => {
    setCountdown(selected.nextSignalChange);
    const interval = setInterval(() => {
      setCountdown((p) => (p <= 1 ? selected.nextSignalChange : p - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedId, selected.nextSignalChange]);

  const phaseColor = selected.signalPhase === 'green' ? 'text-neon-green' : selected.signalPhase === 'yellow' ? 'text-neon-amber' : 'text-neon-red';
  const congColor = selected.congestionLevel === 'heavy' ? '#ef4444' : selected.congestionLevel === 'moderate' ? '#f59e0b' : '#10b981';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Intersection Monitoring</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time camera feed, map, and traffic statistics</p>
        </div>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="bg-dark-700 border border-panel-border rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:border-neon-cyan/30"
        >
          {intersections.map((i) => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Camera Feed */}
        <div className="lg:col-span-4">
          <CameraFeed
            intersectionName={selected.name}
            className="h-[350px]"
          />
          {/* Lane density heatmap */}
          <div className="glass-panel p-4 mt-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Lane Density Heatmap</h3>
            <div className="grid grid-cols-2 gap-2">
              {selected.lanes.map((lane) => {
                const heatColor = lane.density > 75 ? 'bg-neon-red/30 border-neon-red/40' : lane.density > 50 ? 'bg-neon-amber/30 border-neon-amber/40' : 'bg-neon-green/30 border-neon-green/40';
                const textColor = lane.density > 75 ? 'text-neon-red' : lane.density > 50 ? 'text-neon-amber' : 'text-neon-green';
                return (
                  <div key={lane.name} className={`p-3 rounded-lg border ${heatColor}`}>
                    <p className="text-[10px] text-slate-400 font-medium">{lane.name} Lane</p>
                    <p className={`text-lg font-bold ${textColor}`}>{lane.density}%</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center: Map */}
        <div className="lg:col-span-4">
          <div className="glass-panel p-1 overflow-hidden">
            <div className="px-3 py-2">
              <h3 className="text-sm font-semibold text-white">{selected.name}</h3>
              <p className="text-[10px] text-slate-500">{selected.id} • Lat {selected.lat.toFixed(4)}, Lng {selected.lng.toFixed(4)}</p>
            </div>
            <MapView
              center={[selected.lat, selected.lng]}
              zoom={16}
              markers={[{
                lat: selected.lat,
                lng: selected.lng,
                color: congColor,
                label: selected.name,
                popup: `<strong>${selected.name}</strong><br/>Congestion: ${selected.congestionScore}%`,
              }]}
              className="h-[350px]"
            />
          </div>

          {/* Intersection signal diagram */}
          <div className="glass-panel p-4 mt-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Signal Phase Diagram</h3>
            <div className="relative w-full h-48 bg-dark-900/50 rounded-lg overflow-hidden">
              {/* Roads */}
              <div className="absolute top-[35%] left-0 right-0 h-[30%] bg-slate-800/60" />
              <div className="absolute top-0 bottom-0 left-[35%] w-[30%] bg-slate-800/60" />
              {/* Center intersection */}
              <div className="absolute top-[35%] left-[35%] w-[30%] h-[30%] bg-slate-700/50 border border-slate-600/30" />
              {/* Signal indicators */}
              <div className={`absolute top-[28%] left-[48%] w-3 h-3 rounded-full ${selected.signalPhase === 'green' ? 'traffic-green' : selected.signalPhase === 'yellow' ? 'traffic-yellow' : 'traffic-red'}`} />
              <div className={`absolute top-[48%] right-[28%] w-3 h-3 rounded-full ${selected.signalPhase === 'green' ? 'traffic-green' : selected.signalPhase === 'yellow' ? 'traffic-yellow' : 'traffic-red'}`} />
              <div className={`absolute bottom-[28%] left-[48%] w-3 h-3 rounded-full ${selected.signalPhase === 'red' ? 'traffic-green' : 'traffic-red'}`} />
              <div className={`absolute top-[48%] left-[28%] w-3 h-3 rounded-full ${selected.signalPhase === 'red' ? 'traffic-green' : 'traffic-red'}`} />
              {/* Lane labels */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] text-slate-500 font-medium">N</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-slate-500 font-medium">S</span>
              <span className="absolute top-1/2 left-2 -translate-y-1/2 text-[9px] text-slate-500 font-medium">W</span>
              <span className="absolute top-1/2 right-2 -translate-y-1/2 text-[9px] text-slate-500 font-medium">E</span>
            </div>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="lg:col-span-4 space-y-4">
          {/* Signal Status */}
          <div className="glass-panel p-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Current Signal</h3>
            <div className="flex items-center gap-4">
              <div className="bg-dark-900 rounded-xl p-2.5 flex gap-2 border border-dark-600">
                <div className={`w-7 h-7 rounded-full ${selected.signalPhase === 'red' ? 'traffic-red' : 'traffic-off'}`} />
                <div className={`w-7 h-7 rounded-full ${selected.signalPhase === 'yellow' ? 'traffic-yellow' : 'traffic-off'}`} />
                <div className={`w-7 h-7 rounded-full ${selected.signalPhase === 'green' ? 'traffic-green' : 'traffic-off'}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold font-mono ${phaseColor}`}>{countdown}s</p>
                <p className="text-[10px] text-slate-500">Next change</p>
              </div>
            </div>
          </div>

          {/* Vehicle Stats */}
          <div className="glass-panel p-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Vehicle Count by Lane</h3>
            {selected.lanes.map((lane) => (
              <div key={lane.name} className="flex items-center justify-between py-2 border-b border-panel-border/50 last:border-0">
                <span className="text-xs text-slate-400">{lane.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${lane.density}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full ${
                        lane.density > 75 ? 'bg-neon-red' : lane.density > 50 ? 'bg-neon-amber' : 'bg-neon-green'
                      }`}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300 w-8 text-right">{lane.vehicleCount}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Traffic Density */}
          <div className="glass-panel p-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Traffic Statistics</h3>
            <div className="space-y-3">
              {[
                { label: 'Overall Density', value: `${selected.congestionScore}%`, color: congColor },
                { label: 'Total Vehicles', value: selected.vehicleCount, color: '#06b6d4' },
                { label: 'Avg Wait Time', value: `${selected.avgWaitTime}s`, color: '#a855f7' },
                { label: 'Queue Length', value: `${selected.lanes.reduce((s, l) => s + l.queueLength, 0)} vehicles`, color: '#f59e0b' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{stat.label}</span>
                  <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Congestion Level */}
          <div className={`glass-panel p-4 border-l-4 ${
            selected.congestionLevel === 'heavy' ? 'border-l-neon-red' :
            selected.congestionLevel === 'moderate' ? 'border-l-neon-amber' : 'border-l-neon-green'
          }`}>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Congestion Level</p>
            <p className={`text-lg font-bold uppercase ${
              selected.congestionLevel === 'heavy' ? 'text-neon-red' :
              selected.congestionLevel === 'moderate' ? 'text-neon-amber' : 'text-neon-green'
            }`}>
              {selected.congestionLevel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

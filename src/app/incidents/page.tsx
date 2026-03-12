'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import IncidentAlertPanel from '@/components/alerts/IncidentAlertPanel';
import { incidents } from '@/lib/mockData';

const MapView = dynamic(() => import('@/components/maps/MapView'), { ssr: false });

const typeColors: Record<string, string> = {
  accident: '#ef4444',
  blockage: '#f59e0b',
  congestion_spike: '#a855f7',
};

// Alternate routes (hardcoded)
const alternateRoutes: Record<string, { positions: [number, number][]; label: string }[]> = {
  'INC-001': [
    {
      label: 'Via Mathura Road',
      positions: [[28.6300, 77.2420], [28.6250, 77.2500], [28.6200, 77.2520], [28.6150, 77.2480]],
    },
    {
      label: 'Via Bhairon Marg',
      positions: [[28.6300, 77.2420], [28.6320, 77.2350], [28.6280, 77.2280], [28.6240, 77.2300]],
    },
  ],
  'INC-004': [
    {
      label: 'Via Lala Lajpat Rai Marg',
      positions: [[28.5730, 77.2300], [28.5680, 77.2250], [28.5650, 77.2200]],
    },
  ],
};

export default function IncidentsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? incidents : incidents.filter((i) => i.type === filter);
  const selected = selectedId ? incidents.find((i) => i.id === selectedId) : null;

  const markers = filtered.map((i) => ({
    lat: i.lat,
    lng: i.lng,
    color: typeColors[i.type],
    label: `${i.type === 'accident' ? '⚠️' : i.type === 'blockage' ? '🚧' : '⚡'} ${i.location.split(',')[0]}`,
    popup: `
      <strong>${i.type.replace('_', ' ').toUpperCase()}</strong><br/>
      <span style="color:#94a3b8;font-size:11px;">${i.location}</span><br/>
      <span style="color:#94a3b8;font-size:11px;">Severity: <strong style="color:${
        i.severity === 'critical' || i.severity === 'high' ? '#ef4444' : i.severity === 'medium' ? '#f59e0b' : '#10b981'
      }">${i.severity.toUpperCase()}</strong></span>
    `,
  }));

  const routes = selected && alternateRoutes[selected.id]
    ? alternateRoutes[selected.id].map((r) => ({
        positions: r.positions,
        color: '#10b981',
        weight: 3,
        dashArray: '8 6',
      }))
    : [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Incident Monitoring</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time incident detection and response management</p>
        </div>
        <div className="flex items-center gap-2">
          {['all', 'accident', 'blockage', 'congestion_spike'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === t
                  ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30'
                  : 'bg-dark-700/30 text-slate-400 border border-panel-border hover:text-white'
              }`}
            >
              {t === 'all' ? 'All' : t === 'congestion_spike' ? 'Congestion' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-6 glass-panel px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">⚠️</span>
          <span className="text-xs text-slate-400">Accidents: <strong className="text-neon-red">{incidents.filter((i) => i.type === 'accident').length}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">🚧</span>
          <span className="text-xs text-slate-400">Blockages: <strong className="text-neon-amber">{incidents.filter((i) => i.type === 'blockage').length}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">⚡</span>
          <span className="text-xs text-slate-400">Congestion: <strong className="text-neon-purple">{incidents.filter((i) => i.type === 'congestion_spike').length}</strong></span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neon-red pulse-dot" />
          <span className="text-[10px] font-semibold text-neon-red">
            {incidents.filter((i) => i.status === 'active').length} Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Map */}
        <div className="lg:col-span-8">
          <div className="glass-panel p-1 overflow-hidden">
            <div className="px-4 py-2.5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Incident Map</h2>
              {selected && alternateRoutes[selected.id] && (
                <span className="text-[10px] bg-neon-green/15 text-neon-green px-2 py-1 rounded font-medium">
                  ✓ Showing {alternateRoutes[selected.id].length} alternate route(s)
                </span>
              )}
            </div>
            <MapView
              markers={markers}
              routes={routes}
              className="h-[500px]"
              zoom={12}
            />
          </div>
        </div>

        {/* Incident List */}
        <div className="lg:col-span-4 space-y-3 max-h-[560px] overflow-y-auto pr-1">
          {filtered.map((incident) => (
            <IncidentAlertPanel
              key={incident.id}
              incident={incident}
              isSelected={selectedId === incident.id}
              onClick={() => setSelectedId(selectedId === incident.id ? null : incident.id)}
            />
          ))}

          {/* Alternate routes info */}
          {selected && alternateRoutes[selected.id] && (
            <div className="glass-panel p-4 border-l-4 border-l-neon-green">
              <h3 className="text-xs font-semibold text-neon-green uppercase tracking-wider mb-2">Suggested Alternate Routes</h3>
              {alternateRoutes[selected.id].map((route, idx) => (
                <div key={idx} className="flex items-center gap-2 py-1.5">
                  <span className="w-5 h-5 rounded-full bg-neon-green/15 flex items-center justify-center text-[10px] text-neon-green font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-slate-300">{route.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

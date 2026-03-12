'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { emergencyVehicles } from '@/lib/mockData';
import { motion } from 'framer-motion';
import {
  TruckIcon,
  MapPinIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const MapView = dynamic(() => import('@/components/maps/MapView'), { ssr: false });

const typeConfig = {
  ambulance: { label: 'Ambulance', emoji: '🚑', color: 'text-neon-red', bg: 'bg-neon-red/10' },
  fire_truck: { label: 'Fire Truck', emoji: '🚒', color: 'text-neon-amber', bg: 'bg-neon-amber/10' },
  police: { label: 'Police', emoji: '🚓', color: 'text-neon-cyan', bg: 'bg-neon-cyan/10' },
};

export default function EmergencyPage() {
  const [selectedId, setSelectedId] = useState(emergencyVehicles[0].id);
  const [corridors, setCorridors] = useState<Record<string, boolean>>(
    Object.fromEntries(emergencyVehicles.map((v) => [v.id, v.corridorActive]))
  );

  const selected = emergencyVehicles.find((v) => v.id === selectedId) || emergencyVehicles[0];
  const tc = typeConfig[selected.type];

  const markers = emergencyVehicles.map((v) => ({
    lat: v.currentLat,
    lng: v.currentLng,
    color: v.type === 'ambulance' ? '#ef4444' : v.type === 'fire_truck' ? '#f59e0b' : '#06b6d4',
    label: `${typeConfig[v.type].emoji} ${v.id}`,
    popup: `<strong>${typeConfig[v.type].label} ${v.id}</strong><br/>Dest: ${v.destination}<br/>ETA: ${v.eta}`,
  }));

  // Add destination markers
  emergencyVehicles.forEach((v) => {
    markers.push({
      lat: v.destLat,
      lng: v.destLng,
      color: '#a855f7',
      label: v.destination,
      popup: `<strong>Destination</strong><br/>${v.destination}`,
    });
  });

  const routes = emergencyVehicles
    .filter((v) => corridors[v.id])
    .map((v) => ({
      positions: v.route,
      color: v.type === 'ambulance' ? '#ef4444' : v.type === 'fire_truck' ? '#f59e0b' : '#06b6d4',
      weight: v.id === selectedId ? 5 : 3,
      dashArray: v.id === selectedId ? undefined : '10 5',
    }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">Emergency Corridor</h1>
        <p className="text-xs text-slate-500 mt-0.5">Emergency vehicle tracking and corridor management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Map */}
        <div className="lg:col-span-8">
          <div className="glass-panel p-1 overflow-hidden">
            <div className="px-4 py-2.5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">Emergency Routes</h2>
                <p className="text-[10px] text-slate-500">{emergencyVehicles.filter((v) => corridors[v.id]).length} active corridors</p>
              </div>
              <div className="flex items-center gap-3">
                {Object.entries(typeConfig).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-1">
                    <span className="text-xs">{val.emoji}</span>
                    <span className="text-[10px] text-slate-400">{val.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <MapView
              markers={markers}
              routes={routes}
              className="h-[500px]"
              zoom={13}
            />
          </div>
        </div>

        {/* Vehicle List & Info Panel */}
        <div className="lg:col-span-4 space-y-4">
          {/* Vehicle List */}
          <div className="glass-panel p-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Active Vehicles</h3>
            <div className="space-y-2">
              {emergencyVehicles.map((v) => {
                const vtc = typeConfig[v.type];
                const isActive = corridors[v.id];
                return (
                  <motion.button
                    key={v.id}
                    onClick={() => setSelectedId(v.id)}
                    whileHover={{ scale: 1.01 }}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedId === v.id
                        ? 'bg-neon-cyan/10 border-neon-cyan/30'
                        : 'bg-dark-700/30 border-panel-border hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{vtc.emoji}</span>
                        <div>
                          <p className="text-xs font-bold text-white">{v.id}</p>
                          <p className="text-[10px] text-slate-500">{vtc.label}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isActive ? 'bg-neon-green/15 text-neon-green' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Info Panel */}
          <div className="glass-panel p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{tc.emoji}</span>
              <div>
                <h3 className="text-sm font-bold text-white">{selected.id}</h3>
                <p className={`text-[10px] font-medium ${tc.color}`}>{tc.label}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500">Current Location</p>
                  <p className="text-xs text-slate-300">{selected.currentLat.toFixed(4)}, {selected.currentLng.toFixed(4)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheckIcon className="w-4 h-4 text-neon-purple mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500">Destination</p>
                  <p className="text-xs text-slate-300">{selected.destination}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="w-4 h-4 text-neon-amber mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500">Estimated Arrival</p>
                  <p className="text-xs font-bold text-neon-amber">{selected.eta}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {corridors[selected.id] ? (
                <button
                  onClick={() => setCorridors((p) => ({ ...p, [selected.id]: false }))}
                  className="btn-danger flex-1 flex items-center justify-center gap-2"
                >
                  <TruckIcon className="w-4 h-4" />
                  Deactivate Corridor
                </button>
              ) : (
                <button
                  onClick={() => setCorridors((p) => ({ ...p, [selected.id]: true }))}
                  className="btn-success flex-1 flex items-center justify-center gap-2"
                >
                  <TruckIcon className="w-4 h-4" />
                  Activate Corridor
                </button>
              )}
            </div>
          </div>

          {/* Corridor stats */}
          <div className="glass-panel p-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Corridor Statistics</h3>
            <div className="space-y-2">
              {[
                { label: 'Signals Preempted', value: corridors[selected.id] ? '4' : '—', color: 'text-neon-cyan' },
                { label: 'Route Distance', value: `${(selected.route.length * 1.2).toFixed(1)} km`, color: 'text-slate-300' },
                { label: 'Avg Speed', value: corridors[selected.id] ? '48 km/h' : '—', color: 'text-neon-green' },
                { label: 'Time Saved', value: corridors[selected.id] ? '~3 min' : '—', color: 'text-neon-amber' },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between text-xs">
                  <span className="text-slate-400">{stat.label}</span>
                  <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

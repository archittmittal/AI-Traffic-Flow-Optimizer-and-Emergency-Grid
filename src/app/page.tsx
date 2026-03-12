'use client';

import dynamic from 'next/dynamic';
import StatsCard from '@/components/traffic/StatsCard';
import AnalyticsChart from '@/components/charts/AnalyticsChart';
import {
  intersections,
  trafficDensityOverTime,
  avgWaitTimeData,
  signalEfficiencyData,
} from '@/lib/mockData';
import {
  MapPinIcon,
  ChartBarIcon,
  TruckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const MapView = dynamic(() => import('@/components/maps/MapView'), { ssr: false });

const congestionColor = (level: string) =>
  level === 'heavy' ? '#ef4444' : level === 'moderate' ? '#f59e0b' : '#10b981';

export default function DashboardPage() {
  const avgCongestion = Math.round(
    intersections.reduce((sum, i) => sum + i.congestionScore, 0) / intersections.length
  );
  const activeEmergencies = 2;
  const activeIncidents = 5;

  const markers = intersections.map((i) => ({
    lat: i.lat,
    lng: i.lng,
    color: congestionColor(i.congestionLevel),
    label: i.name,
    popup: `
      <div>
        <div style="font-size:11px;color:#94a3b8;margin-top:2px;">Congestion: <span style="color:${congestionColor(i.congestionLevel)};font-weight:700;">${i.congestionScore}%</span></div>
        <div style="font-size:11px;color:#94a3b8;">Vehicles: <strong style="color:#e2e8f0;">${i.vehicleCount}</strong></div>
        <div style="font-size:11px;color:#94a3b8;">Signal: <span style="color:${i.signalPhase === 'green' ? '#10b981' : i.signalPhase === 'yellow' ? '#f59e0b' : '#ef4444'};font-weight:700;text-transform:uppercase;">${i.signalPhase}</span></div>
      </div>
    `,
  }));

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time traffic monitoring across New Delhi metropolitan area</p>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Intersections"
          value={intersections.length}
          icon={<MapPinIcon className="w-5 h-5" />}
          color="cyan"
          trend={{ value: 2, isUp: true }}
        />
        <StatsCard
          title="Avg Congestion Score"
          value={`${avgCongestion}%`}
          icon={<ChartBarIcon className="w-5 h-5" />}
          color={avgCongestion > 60 ? 'red' : avgCongestion > 40 ? 'amber' : 'green'}
          trend={{ value: 8, isUp: true }}
        />
        <StatsCard
          title="Emergency Corridors"
          value={activeEmergencies}
          icon={<TruckIcon className="w-5 h-5" />}
          color="amber"
        />
        <StatsCard
          title="Active Incidents"
          value={activeIncidents}
          icon={<ExclamationTriangleIcon className="w-5 h-5" />}
          color="red"
          trend={{ value: 3, isUp: true }}
        />
      </div>

      {/* Map */}
      <div className="glass-panel p-1 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div>
            <h2 className="text-sm font-semibold text-white">City Traffic Map</h2>
            <p className="text-[10px] text-slate-500">Live intersection status</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green" />
              <span className="text-[10px] text-slate-400">Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-amber" />
              <span className="text-[10px] text-slate-400">Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-red" />
              <span className="text-[10px] text-slate-400">Heavy</span>
            </div>
          </div>
        </div>
        <MapView
          markers={markers}
          className="h-[400px]"
          zoom={12}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <AnalyticsChart
          type="line"
          data={trafficDensityOverTime}
          title="📊 Traffic Density Over Time"
        />
        <AnalyticsChart
          type="line"
          data={avgWaitTimeData}
          title="⏱️ Average Waiting Time"
        />
        <AnalyticsChart
          type="bar"
          data={signalEfficiencyData}
          title="🚦 Signal Efficiency"
        />
      </div>
    </div>
  );
}

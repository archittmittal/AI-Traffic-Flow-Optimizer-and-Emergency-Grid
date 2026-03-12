'use client';

import { useState } from 'react';
import AnalyticsChart from '@/components/charts/AnalyticsChart';
import {
  congestionByHourData,
  signalEfficiencyData,
  emergencyResponseTimeData,
  trafficPredictionData,
  trafficDensityOverTime,
  avgWaitTimeData,
  intersections,
} from '@/lib/mockData';
import {
  CalendarIcon,
  MapPinIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

const zones = ['All Zones', 'Zone A - Central', 'Zone B - South', 'Zone C - West', 'Zone D - North', 'Zone E - East'];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('today');
  const [zone, setZone] = useState('All Zones');
  const [intersection, setIntersection] = useState('All');

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Analytics & Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">Comprehensive traffic analysis and predictive insights</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="glass-panel px-5 py-3 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-slate-500" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-dark-700 border border-panel-border rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-neon-cyan/30"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 text-slate-500" />
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="bg-dark-700 border border-panel-border rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-neon-cyan/30"
          >
            {zones.map((z) => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-4 h-4 text-slate-500" />
          <select
            value={intersection}
            onChange={(e) => setIntersection(e.target.value)}
            className="bg-dark-700 border border-panel-border rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-neon-cyan/30"
          >
            <option value="All">All Intersections</option>
            {intersections.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Congestion', value: '54%', change: '+8%', isUp: true, color: 'text-neon-amber' },
          { label: 'Signal Efficiency', value: '79%', change: '+3%', isUp: false, color: 'text-neon-green' },
          { label: 'Avg Response Time', value: '7.0 min', change: '-1.2', isUp: false, color: 'text-neon-cyan' },
          { label: 'Incidents Today', value: '5', change: '+2', isUp: true, color: 'text-neon-red' },
        ].map((kpi) => (
          <div key={kpi.label} className="glass-panel p-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{kpi.label}</p>
            <div className="flex items-end justify-between mt-1">
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <span className={`text-xs font-medium ${kpi.isUp ? 'text-neon-red' : 'text-neon-green'}`}>
                {kpi.isUp ? '↑' : '↓'} {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnalyticsChart
          type="bar"
          data={congestionByHourData}
          title="📊 Average Congestion by Hour"
          height={300}
        />
        <AnalyticsChart
          type="bar"
          data={signalEfficiencyData}
          title="🚦 Signal Efficiency Score"
          height={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnalyticsChart
          type="line"
          data={emergencyResponseTimeData}
          title="🚑 Emergency Response Time"
          height={300}
        />
        <AnalyticsChart
          type="line"
          data={trafficPredictionData}
          title="🔮 Traffic Prediction Trend"
          height={300}
        />
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnalyticsChart
          type="line"
          data={trafficDensityOverTime}
          title="📈 Traffic Density by Zone"
          height={300}
        />
        <AnalyticsChart
          type="line"
          data={avgWaitTimeData}
          title="⏱️ Average Waiting Time Trend"
          height={300}
        />
      </div>

      {/* Bottom Table */}
      <div className="glass-panel overflow-hidden">
        <div className="px-5 py-3 border-b border-panel-border">
          <h3 className="text-sm font-semibold text-white">Intersection Performance Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-dark-700/50">
              <tr>
                <th className="text-left px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider">Intersection</th>
                <th className="text-center px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider">Congestion</th>
                <th className="text-center px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider">Vehicles</th>
                <th className="text-center px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider">Wait Time</th>
                <th className="text-center px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider">Signal</th>
                <th className="text-center px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {intersections.map((i) => (
                <tr key={i.id} className="border-b border-panel-border/50 hover:bg-dark-700/20 transition-colors">
                  <td className="px-4 py-2.5">
                    <div>
                      <p className="text-slate-200 font-medium">{i.name}</p>
                      <p className="text-[10px] text-slate-500">{i.id}</p>
                    </div>
                  </td>
                  <td className="text-center px-4 py-2.5">
                    <span className={`font-bold ${
                      i.congestionScore > 70 ? 'text-neon-red' : i.congestionScore > 40 ? 'text-neon-amber' : 'text-neon-green'
                    }`}>
                      {i.congestionScore}%
                    </span>
                  </td>
                  <td className="text-center px-4 py-2.5 text-slate-300 font-mono">{i.vehicleCount}</td>
                  <td className="text-center px-4 py-2.5 text-slate-300 font-mono">{i.avgWaitTime}s</td>
                  <td className="text-center px-4 py-2.5">
                    <span className={`inline-block w-3 h-3 rounded-full ${
                      i.signalPhase === 'green' ? 'traffic-green' : i.signalPhase === 'yellow' ? 'traffic-yellow' : 'traffic-red'
                    }`} />
                  </td>
                  <td className="text-center px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      i.congestionLevel === 'heavy' ? 'bg-neon-red/15 text-neon-red' :
                      i.congestionLevel === 'moderate' ? 'bg-neon-amber/15 text-neon-amber' :
                      'bg-neon-green/15 text-neon-green'
                    }`}>
                      {i.congestionLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

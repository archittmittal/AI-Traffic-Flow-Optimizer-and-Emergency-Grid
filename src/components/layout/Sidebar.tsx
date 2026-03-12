'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ViewColumnsIcon,
  MapPinIcon,
  SignalIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { href: '/', label: 'Dashboard', icon: ViewColumnsIcon },
  { href: '/intersections', label: 'Intersections', icon: MapPinIcon },
  { href: '/signals', label: 'Signals', icon: SignalIcon },
  { href: '/emergency', label: 'Emergency', icon: TruckIcon },
  { href: '/incidents', label: 'Incidents', icon: ExclamationTriangleIcon },
  { href: '/analytics', label: 'Analytics', icon: ChartBarIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-dark-800/90 backdrop-blur-xl border-r border-panel-border flex flex-col z-50">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-panel-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-cyan/50 flex items-center justify-center shadow-lg shadow-neon-cyan/20">
            <CpuChipIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">TrafficAI</h1>
            <p className="text-[10px] text-neon-cyan/70 font-medium uppercase tracking-widest">Command Center</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 mb-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Navigation</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="px-4 py-4 border-t border-panel-border">
        <div className="glass-panel p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">System Status</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neon-green pulse-dot" />
              <span className="text-[10px] text-neon-green font-medium">Online</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500">AI Engine</span>
            <span className="text-neon-cyan font-medium">Active</span>
          </div>
          <div className="flex items-center justify-between text-[11px] mt-1">
            <span className="text-slate-500">Cameras</span>
            <span className="text-slate-300 font-medium">148/152</span>
          </div>
          <div className="flex items-center justify-between text-[11px] mt-1">
            <span className="text-slate-500">Sensors</span>
            <span className="text-slate-300 font-medium">312/320</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

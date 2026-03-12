'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CameraFeedProps {
  intersectionName: string;
  className?: string;
}

interface DetectionBox {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  type: string;
  confidence: number;
}

const vehicleTypes = ['Car', 'Truck', 'Bus', 'Auto', 'Bike', 'SUV'];

function generateDetections(): DetectionBox[] {
  const count = Math.floor(Math.random() * 6) + 4;
  const detections: DetectionBox[] = [];
  for (let i = 0; i < count; i++) {
    detections.push({
      id: i,
      x: Math.random() * 70 + 5,
      y: Math.random() * 60 + 15,
      w: Math.random() * 8 + 6,
      h: Math.random() * 6 + 5,
      type: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
      confidence: Math.floor(Math.random() * 15) + 85,
    });
  }
  return detections;
}

export default function CameraFeed({ intersectionName, className = '' }: CameraFeedProps) {
  const [detections, setDetections] = useState<DetectionBox[]>([]);
  const [frameCount, setFrameCount] = useState(0);

  useEffect(() => {
    setDetections(generateDetections());
    const interval = setInterval(() => {
      setDetections(generateDetections());
      setFrameCount((p) => p + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative bg-dark-900 rounded-xl overflow-hidden border border-panel-border ${className}`}>
      {/* Simulated camera feed background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-700 via-dark-800 to-dark-900">
        {/* Road simulation */}
        <div className="absolute inset-0 opacity-20">
          {/* Horizontal road */}
          <div className="absolute top-[40%] left-0 right-0 h-[20%] bg-slate-700" />
          {/* Vertical road */}
          <div className="absolute top-0 bottom-0 left-[40%] w-[20%] bg-slate-700" />
          {/* Center lines */}
          <div className="absolute top-[49%] left-0 right-0 h-[2%] bg-amber-500/30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(245,158,11,0.3) 20px, rgba(245,158,11,0.3) 40px)' }} />
          <div className="absolute top-0 bottom-0 left-[49%] w-[2%] bg-amber-500/30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(245,158,11,0.3) 20px, rgba(245,158,11,0.3) 40px)' }} />
        </div>

        {/* Scanner line animation */}
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Detection boxes */}
      {detections.map((det) => (
        <motion.div
          key={`${det.id}-${frameCount}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute border border-neon-green/70 rounded-sm"
          style={{
            left: `${det.x}%`,
            top: `${det.y}%`,
            width: `${det.w}%`,
            height: `${det.h}%`,
          }}
        >
          <div className="absolute -top-4 left-0 bg-neon-green/90 text-[8px] px-1 py-0.5 rounded text-dark-900 font-bold whitespace-nowrap">
            {det.type} {det.confidence}%
          </div>
          {/* Corner markers */}
          <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t-2 border-l-2 border-neon-green" />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-t-2 border-r-2 border-neon-green" />
          <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b-2 border-l-2 border-neon-green" />
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b-2 border-r-2 border-neon-green" />
        </motion.div>
      ))}

      {/* Camera overlay info */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-neon-red pulse-dot" />
        <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Live Feed</span>
      </div>
      <div className="absolute top-3 right-3 text-[10px] font-mono text-neon-cyan/70">
        CAM-{intersectionName.slice(0, 3).toUpperCase()}-01
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-dark-900/80 backdrop-blur px-3 py-2 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-medium">{intersectionName}</span>
        <span className="text-[10px] text-neon-cyan font-mono">{detections.length} vehicles detected</span>
      </div>
    </div>
  );
}

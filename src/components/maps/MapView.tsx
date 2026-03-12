'use client';

import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  markers?: {
    lat: number;
    lng: number;
    color: string;
    label: string;
    popup?: string;
  }[];
  routes?: {
    positions: [number, number][];
    color: string;
    weight?: number;
    dashArray?: string;
  }[];
  className?: string;
  children?: React.ReactNode;
  onMapReady?: (map: L.Map) => void;
}

export default function MapView({ center = [28.6139, 77.2090], zoom = 12, markers = [], routes = [], className = '', onMapReady }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: true,
      attributionControl: true,
    });

    // Dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    if (onMapReady) {
      onMapReady(map);
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mounted]);

  // Update markers
  useEffect(() => {
    if (!mapRef.current || !mounted) return;
    const map = mapRef.current;

    // Clear existing markers (simple approach)
    map.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker || layer instanceof L.Polyline) {
        if (!(layer instanceof L.TileLayer)) {
          map.removeLayer(layer);
        }
      }
    });

    // Add markers
    markers.forEach((marker) => {
      const circle = L.circleMarker([marker.lat, marker.lng], {
        radius: 8,
        fillColor: marker.color,
        color: marker.color,
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.7,
      }).addTo(map);

      if (marker.popup) {
        circle.bindPopup(`
          <div style="font-family: Inter, sans-serif; min-width: 150px;">
            <strong style="color: #e2e8f0; font-size: 13px;">${marker.label}</strong>
            <div style="color: #94a3b8; font-size: 11px; margin-top: 4px;">${marker.popup}</div>
          </div>
        `);
      } else {
        circle.bindTooltip(marker.label, {
          permanent: false,
          direction: 'top',
          className: 'leaflet-tooltip-custom',
        });
      }
    });

    // Add routes
    routes.forEach((route) => {
      L.polyline(route.positions, {
        color: route.color,
        weight: route.weight || 4,
        opacity: 0.8,
        dashArray: route.dashArray,
      }).addTo(map);
    });
  }, [markers, routes, mounted]);

  if (!mounted) {
    return (
      <div className={`bg-dark-700 rounded-xl flex items-center justify-center ${className}`}>
        <div className="text-slate-500 text-sm">Loading Map...</div>
      </div>
    );
  }

  return <div ref={containerRef} className={`rounded-xl overflow-hidden ${className}`} />;
}

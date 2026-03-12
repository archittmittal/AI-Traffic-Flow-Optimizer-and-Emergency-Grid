'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

interface AnalyticsChartProps {
  type: 'line' | 'bar' | 'doughnut';
  data: any;
  title: string;
  height?: number;
}

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#94a3b8',
        font: { size: 11, family: 'Inter' },
        padding: 15,
        usePointStyle: true,
        pointStyleWidth: 8,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      titleColor: '#e2e8f0',
      bodyColor: '#94a3b8',
      borderColor: 'rgba(6, 182, 212, 0.2)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      titleFont: { size: 12, weight: 'bold' as const, family: 'Inter' },
      bodyFont: { size: 11, family: 'Inter' },
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(148, 163, 184, 0.06)', drawBorder: false },
      ticks: { color: '#64748b', font: { size: 10, family: 'Inter' } },
      border: { display: false },
    },
    y: {
      grid: { color: 'rgba(148, 163, 184, 0.06)', drawBorder: false },
      ticks: { color: '#64748b', font: { size: 10, family: 'Inter' } },
      border: { display: false },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#94a3b8',
        font: { size: 11, family: 'Inter' },
        padding: 15,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      titleColor: '#e2e8f0',
      bodyColor: '#94a3b8',
      borderColor: 'rgba(6, 182, 212, 0.2)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
    },
  },
};

export default function AnalyticsChart({ type, data, title, height = 280 }: AnalyticsChartProps) {
  return (
    <div className="chart-container">
      <h3 className="text-sm font-semibold text-slate-200 mb-4">{title}</h3>
      <div style={{ height }}>
        {type === 'line' && <Line data={data} options={defaultOptions} />}
        {type === 'bar' && <Bar data={data} options={defaultOptions} />}
        {type === 'doughnut' && <Doughnut data={data} options={doughnutOptions} />}
      </div>
    </div>
  );
}

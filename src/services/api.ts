/**
 * API Service Layer - Connects frontend to Flask backend
 * Base URL: http://localhost:5001/api
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// ── Traffic / Intersections ──────────────────────

export const trafficAPI = {
  getIntersections: () => fetchAPI<{ data: any[]; count: number }>('/intersections'),
  getIntersection: (id: string) => fetchAPI<any>(`/intersections/${id}`),
  getStats: () => fetchAPI<{
    totalActive: number;
    avgCongestionScore: number;
    heavyCount: number;
    moderateCount: number;
    lowCount: number;
    totalVehicles: number;
  }>('/intersections/stats'),
};

// ── Signals ──────────────────────────────────────

export const signalAPI = {
  getSignals: () => fetchAPI<{ data: any[]; count: number }>('/signals'),
  getSignal: (id: string) => fetchAPI<any>(`/signals/${id}`),
  controlSignal: (id: string, action: 'force_green' | 'pause' | 'reset') =>
    fetchAPI<any>(`/signals/${id}/control`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    }),
};

// ── Incidents ────────────────────────────────────

export const incidentAPI = {
  getIncidents: (filters?: { type?: string; severity?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.type) params.set('type', filters.type);
    if (filters?.severity) params.set('severity', filters.severity);
    if (filters?.status) params.set('status', filters.status);
    const query = params.toString() ? `?${params.toString()}` : '';
    return fetchAPI<{ data: any[]; count: number }>(`/incidents${query}`);
  },
  getIncident: (id: string) => fetchAPI<any>(`/incidents/${id}`),
  getSummary: () => fetchAPI<any>('/incidents/summary'),
};

// ── Emergency ────────────────────────────────────

export const emergencyAPI = {
  getVehicles: () => fetchAPI<{ data: any[]; count: number }>('/emergency/vehicles'),
  getVehicle: (id: string) => fetchAPI<any>(`/emergency/vehicles/${id}`),
  toggleCorridor: (id: string, action: 'activate' | 'deactivate') =>
    fetchAPI<any>(`/emergency/vehicles/${id}/corridor`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    }),
};

// ── Analytics ────────────────────────────────────

export const analyticsAPI = {
  getTrafficDensity: () => fetchAPI<any>('/analytics/traffic-density'),
  getCongestionByHour: () => fetchAPI<any>('/analytics/congestion-by-hour'),
  getSignalEfficiency: () => fetchAPI<any>('/analytics/signal-efficiency'),
  getEmergencyResponse: () => fetchAPI<any>('/analytics/emergency-response'),
  getPrediction: () => fetchAPI<any>('/analytics/prediction'),
  getSummary: () => fetchAPI<any>('/analytics/summary'),
};

// ── System ───────────────────────────────────────

export const systemAPI = {
  healthCheck: () => fetchAPI<any>('/health'),
  getAlerts: () => fetchAPI<{ data: any[]; count: number }>('/alerts'),
};

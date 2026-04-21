// Mock data for AI Traffic Management System

export interface Intersection {
  id: string;
  name: string;
  lat: number;
  lng: number;
  congestionLevel: 'low' | 'moderate' | 'heavy';
  congestionScore: number;
  vehicleCount: number;
  avgWaitTime: number;
  signalPhase: 'green' | 'yellow' | 'red';
  nextSignalChange: number;
  lanes: {
    name: string;
    vehicleCount: number;
    density: number;
    queueLength: number;
  }[];
}

export interface Signal {
  id: string;
  intersectionId: string;
  intersectionName: string;
  currentPhase: 'green' | 'yellow' | 'red';
  countdown: number;
  aiRecommendedGreen: number;
  aiRecommendedYellow: number;
  aiRecommendedRed: number;
  efficiency: number;
  isPaused: boolean;
}

export interface Incident {
  id: string;
  type: 'accident' | 'blockage' | 'congestion_spike';
  location: string;
  lat: number;
  lng: number;
  timeDetected: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'responding';
  description: string;
}

export interface EmergencyVehicle {
  id: string;
  type: 'ambulance' | 'fire_truck' | 'police';
  currentLat: number;
  currentLng: number;
  destLat: number;
  destLng: number;
  destination: string;
  eta: string;
  corridorActive: boolean;
  route: [number, number][];
}

// Dehradun-based intersections
export const intersections: Intersection[] = [
  {
    id: 'INT-001',
    name: 'Clock Tower (Ghanta Ghar)',
    lat: 30.3242,
    lng: 78.0416,
    congestionLevel: 'heavy',
    congestionScore: 87,
    vehicleCount: 342,
    avgWaitTime: 45,
    signalPhase: 'red',
    nextSignalChange: 18,
    lanes: [
      { name: 'North', vehicleCount: 89, density: 82, queueLength: 24 },
      { name: 'South', vehicleCount: 95, density: 91, queueLength: 28 },
      { name: 'East', vehicleCount: 78, density: 76, queueLength: 19 },
      { name: 'West', vehicleCount: 80, density: 85, queueLength: 22 },
    ],
  },
  {
    id: 'INT-002',
    name: 'ISBT Crossing',
    lat: 30.2882,
    lng: 77.9984,
    congestionLevel: 'moderate',
    congestionScore: 58,
    vehicleCount: 218,
    avgWaitTime: 28,
    signalPhase: 'green',
    nextSignalChange: 32,
    lanes: [
      { name: 'North', vehicleCount: 56, density: 55, queueLength: 12 },
      { name: 'South', vehicleCount: 62, density: 60, queueLength: 15 },
      { name: 'East', vehicleCount: 48, density: 50, queueLength: 10 },
      { name: 'West', vehicleCount: 52, density: 58, queueLength: 13 },
    ],
  },
  {
    id: 'INT-003',
    name: 'Raipur Chowk',
    lat: 30.3168,
    lng: 78.0863,
    congestionLevel: 'heavy',
    congestionScore: 92,
    vehicleCount: 410,
    avgWaitTime: 52,
    signalPhase: 'red',
    nextSignalChange: 12,
    lanes: [
      { name: 'North', vehicleCount: 110, density: 95, queueLength: 32 },
      { name: 'South', vehicleCount: 105, density: 90, queueLength: 30 },
      { name: 'East', vehicleCount: 98, density: 88, queueLength: 26 },
      { name: 'West', vehicleCount: 97, density: 92, queueLength: 28 },
    ],
  },
  {
    id: 'INT-004',
    name: 'Astley Hall Crossing',
    lat: 30.3283,
    lng: 78.0468,
    congestionLevel: 'low',
    congestionScore: 25,
    vehicleCount: 98,
    avgWaitTime: 12,
    signalPhase: 'green',
    nextSignalChange: 45,
    lanes: [
      { name: 'North', vehicleCount: 25, density: 22, queueLength: 5 },
      { name: 'South', vehicleCount: 28, density: 28, queueLength: 6 },
      { name: 'East', vehicleCount: 22, density: 20, queueLength: 4 },
      { name: 'West', vehicleCount: 23, density: 24, queueLength: 5 },
    ],
  },
  {
    id: 'INT-005',
    name: 'Prem Nagar Chowk',
    lat: 30.3340,
    lng: 77.9620,
    congestionLevel: 'moderate',
    congestionScore: 62,
    vehicleCount: 245,
    avgWaitTime: 30,
    signalPhase: 'yellow',
    nextSignalChange: 5,
    lanes: [
      { name: 'North', vehicleCount: 62, density: 58, queueLength: 14 },
      { name: 'South', vehicleCount: 68, density: 65, queueLength: 17 },
      { name: 'East', vehicleCount: 55, density: 52, queueLength: 11 },
      { name: 'West', vehicleCount: 60, density: 62, queueLength: 15 },
    ],
  },
  {
    id: 'INT-006',
    name: 'Ballupur Chowk',
    lat: 30.3340,
    lng: 78.0125,
    congestionLevel: 'heavy',
    congestionScore: 78,
    vehicleCount: 312,
    avgWaitTime: 38,
    signalPhase: 'red',
    nextSignalChange: 22,
    lanes: [
      { name: 'North', vehicleCount: 82, density: 78, queueLength: 20 },
      { name: 'South', vehicleCount: 85, density: 80, queueLength: 22 },
      { name: 'East', vehicleCount: 72, density: 74, queueLength: 18 },
      { name: 'West', vehicleCount: 73, density: 76, queueLength: 19 },
    ],
  },
  {
    id: 'INT-007',
    name: 'Saharanpur Chowk',
    lat: 30.3142,
    lng: 78.0261,
    congestionLevel: 'moderate',
    congestionScore: 55,
    vehicleCount: 198,
    avgWaitTime: 25,
    signalPhase: 'green',
    nextSignalChange: 38,
    lanes: [
      { name: 'North', vehicleCount: 50, density: 52, queueLength: 11 },
      { name: 'South', vehicleCount: 55, density: 56, queueLength: 13 },
      { name: 'East', vehicleCount: 45, density: 48, queueLength: 9 },
      { name: 'West', vehicleCount: 48, density: 54, queueLength: 12 },
    ],
  },
  {
    id: 'INT-008',
    name: 'Dharampur Chowk',
    lat: 30.3015,
    lng: 78.0438,
    congestionLevel: 'low',
    congestionScore: 32,
    vehicleCount: 120,
    avgWaitTime: 15,
    signalPhase: 'green',
    nextSignalChange: 40,
    lanes: [
      { name: 'North', vehicleCount: 30, density: 30, queueLength: 6 },
      { name: 'South', vehicleCount: 35, density: 35, queueLength: 8 },
      { name: 'East', vehicleCount: 28, density: 28, queueLength: 5 },
      { name: 'West', vehicleCount: 27, density: 32, queueLength: 7 },
    ],
  },
  {
    id: 'INT-009',
    name: 'Rispana Bridge',
    lat: 30.2974,
    lng: 78.0560,
    congestionLevel: 'low',
    congestionScore: 18,
    vehicleCount: 75,
    avgWaitTime: 8,
    signalPhase: 'green',
    nextSignalChange: 50,
    lanes: [
      { name: 'North', vehicleCount: 18, density: 16, queueLength: 3 },
      { name: 'South', vehicleCount: 22, density: 20, queueLength: 4 },
      { name: 'East', vehicleCount: 16, density: 15, queueLength: 2 },
      { name: 'West', vehicleCount: 19, density: 18, queueLength: 3 },
    ],
  },
  {
    id: 'INT-010',
    name: 'Dilaram Chowk',
    lat: 30.3361,
    lng: 78.0494,
    congestionLevel: 'moderate',
    congestionScore: 48,
    vehicleCount: 178,
    avgWaitTime: 22,
    signalPhase: 'yellow',
    nextSignalChange: 8,
    lanes: [
      { name: 'North', vehicleCount: 45, density: 44, queueLength: 10 },
      { name: 'South', vehicleCount: 50, density: 50, queueLength: 12 },
      { name: 'East', vehicleCount: 40, density: 42, queueLength: 8 },
      { name: 'West', vehicleCount: 43, density: 48, queueLength: 11 },
    ],
  },
  {
    id: 'INT-011',
    name: 'Kishannagar Chowk',
    lat: 30.3350,
    lng: 78.0330,
    congestionLevel: 'low',
    congestionScore: 22,
    vehicleCount: 88,
    avgWaitTime: 10,
    signalPhase: 'green',
    nextSignalChange: 42,
    lanes: [
      { name: 'North', vehicleCount: 22, density: 20, queueLength: 4 },
      { name: 'South', vehicleCount: 25, density: 24, queueLength: 5 },
      { name: 'East', vehicleCount: 20, density: 18, queueLength: 3 },
      { name: 'West', vehicleCount: 21, density: 22, queueLength: 4 },
    ],
  },
  {
    id: 'INT-012',
    name: 'Jogiwala Chowk',
    lat: 30.2930,
    lng: 78.0690,
    congestionLevel: 'heavy',
    congestionScore: 82,
    vehicleCount: 330,
    avgWaitTime: 42,
    signalPhase: 'red',
    nextSignalChange: 15,
    lanes: [
      { name: 'North', vehicleCount: 85, density: 80, queueLength: 22 },
      { name: 'South', vehicleCount: 90, density: 85, queueLength: 25 },
      { name: 'East', vehicleCount: 78, density: 78, queueLength: 19 },
      { name: 'West', vehicleCount: 77, density: 82, queueLength: 21 },
    ],
  },
];

export const signals: Signal[] = intersections.map((intersection) => ({
  id: `SIG-${intersection.id.split('-')[1]}`,
  intersectionId: intersection.id,
  intersectionName: intersection.name,
  currentPhase: intersection.signalPhase,
  countdown: intersection.nextSignalChange,
  aiRecommendedGreen: Math.floor(Math.random() * 20) + 30,
  aiRecommendedYellow: 5,
  aiRecommendedRed: Math.floor(Math.random() * 15) + 25,
  efficiency: Math.floor(Math.random() * 30) + 65,
  isPaused: false,
}));

export const incidents: Incident[] = [
  {
    id: 'INC-001',
    type: 'accident',
    location: 'Near ITO Junction, Ring Road',
    lat: 28.6300,
    lng: 77.2420,
    timeDetected: '17:42:15',
    severity: 'high',
    status: 'responding',
    description: 'Multi-vehicle collision on Ring Road. 3 vehicles involved. Emergency services dispatched.',
  },
  {
    id: 'INC-002',
    type: 'blockage',
    location: 'Karol Bagh Main Road',
    lat: 28.6530,
    lng: 77.1920,
    timeDetected: '17:28:30',
    severity: 'medium',
    status: 'active',
    description: 'Road blockage due to fallen tree. Single lane open.',
  },
  {
    id: 'INC-003',
    type: 'congestion_spike',
    location: 'Connaught Place Inner Circle',
    lat: 28.6325,
    lng: 77.2180,
    timeDetected: '17:55:00',
    severity: 'medium',
    status: 'active',
    description: 'Unusual congestion spike detected. Traffic density increased by 45% in last 10 minutes.',
  },
  {
    id: 'INC-004',
    type: 'accident',
    location: 'Moolchand Flyover Ramp',
    lat: 28.5730,
    lng: 77.2300,
    timeDetected: '17:15:45',
    severity: 'critical',
    status: 'responding',
    description: 'Serious accident on flyover ramp. Ambulance and fire truck en route.',
  },
  {
    id: 'INC-005',
    type: 'congestion_spike',
    location: 'Nehru Place Bus Terminal',
    lat: 28.5500,
    lng: 77.2540,
    timeDetected: '17:50:00',
    severity: 'low',
    status: 'active',
    description: 'Evening rush hour congestion spike near bus terminal.',
  },
];

export const emergencyVehicles: EmergencyVehicle[] = [
  {
    id: 'EMV-101',
    type: 'ambulance',
    currentLat: 28.6129,
    currentLng: 77.2295,
    destLat: 28.5672,
    destLng: 77.2100,
    destination: 'AIIMS Hospital',
    eta: '8 min',
    corridorActive: true,
    route: [
      [28.6129, 77.2295],
      [28.6050, 77.2250],
      [28.5950, 77.2200],
      [28.5850, 77.2150],
      [28.5750, 77.2120],
      [28.5672, 77.2100],
    ],
  },
  {
    id: 'EMV-203',
    type: 'fire_truck',
    currentLat: 28.6519,
    currentLng: 77.1905,
    destLat: 28.6300,
    destLng: 77.2420,
    destination: 'ITO Junction (Incident Site)',
    eta: '12 min',
    corridorActive: true,
    route: [
      [28.6519, 77.1905],
      [28.6450, 77.2000],
      [28.6400, 77.2100],
      [28.6370, 77.2200],
      [28.6340, 77.2300],
      [28.6300, 77.2420],
    ],
  },
  {
    id: 'EMV-305',
    type: 'police',
    currentLat: 28.5700,
    currentLng: 77.2397,
    destLat: 28.5730,
    destLng: 77.2300,
    destination: 'Moolchand Flyover (Incident Site)',
    eta: '3 min',
    corridorActive: false,
    route: [
      [28.5700, 77.2397],
      [28.5710, 77.2370],
      [28.5720, 77.2340],
      [28.5730, 77.2300],
    ],
  },
];

// Chart data generators
export const trafficDensityOverTime = {
  labels: ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'],
  datasets: [
    {
      label: 'Zone A - Central',
      data: [15, 35, 72, 88, 65, 52, 58, 55, 60, 68, 78, 92, 85, 72, 55, 30],
      borderColor: '#06b6d4',
      backgroundColor: 'rgba(6, 182, 212, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Zone B - South',
      data: [10, 28, 60, 75, 55, 45, 48, 42, 50, 58, 70, 80, 75, 60, 42, 22],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Zone C - West',
      data: [8, 22, 55, 70, 50, 40, 42, 38, 45, 52, 65, 78, 70, 55, 38, 18],
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

export const avgWaitTimeData = {
  labels: ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'],
  datasets: [
    {
      label: 'Avg Wait Time (sec)',
      data: [8, 18, 35, 48, 32, 25, 28, 24, 30, 35, 42, 52, 45, 35, 22, 12],
      borderColor: '#a855f7',
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

export const signalEfficiencyData = {
  labels: intersections.slice(0, 8).map((i) => i.name.split(' ')[0]),
  datasets: [
    {
      label: 'Efficiency %',
      data: [78, 85, 62, 94, 72, 68, 88, 91],
      backgroundColor: [
        'rgba(6, 182, 212, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(239, 68, 68, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)',
        'rgba(6, 182, 212, 0.7)',
        'rgba(16, 185, 129, 0.7)',
      ],
      borderColor: [
        '#06b6d4',
        '#10b981',
        '#ef4444',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#06b6d4',
        '#10b981',
      ],
      borderWidth: 2,
    },
  ],
};

export const congestionByHourData = {
  labels: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
  datasets: [
    {
      label: 'Avg Congestion Score',
      data: [12, 8, 5, 18, 72, 55, 48, 52, 65, 85, 58, 25],
      backgroundColor: 'rgba(6, 182, 212, 0.6)',
      borderColor: '#06b6d4',
      borderWidth: 2,
      borderRadius: 6,
    },
  ],
};

export const emergencyResponseTimeData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Avg Response Time (min)',
      data: [8.2, 7.5, 9.1, 6.8, 7.2, 5.5, 4.8],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Target Response Time',
      data: [8, 8, 8, 8, 8, 8, 8],
      borderColor: 'rgba(255,255,255,0.3)',
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false,
    },
  ],
};

export const trafficPredictionData = {
  labels: ['Now', '+1h', '+2h', '+3h', '+4h', '+5h', '+6h'],
  datasets: [
    {
      label: 'Predicted Congestion',
      data: [78, 82, 70, 55, 42, 35, 28],
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.15)',
      fill: true,
      tension: 0.4,
      borderDash: [8, 4],
    },
    {
      label: 'Current Trend',
      data: [78, null, null, null, null, null, null],
      borderColor: '#06b6d4',
      backgroundColor: 'rgba(6, 182, 212, 0.15)',
      fill: true,
      tension: 0.4,
      pointRadius: 8,
      pointBackgroundColor: '#06b6d4',
    },
  ],
};

export const systemAlerts = [
  { id: 1, message: 'Critical: Multi-vehicle accident at ITO Junction', type: 'critical' as const, time: '2 min ago' },
  { id: 2, message: 'Emergency corridor activated: EMV-101 → AIIMS', type: 'warning' as const, time: '5 min ago' },
  { id: 3, message: 'Congestion spike detected at Connaught Place', type: 'info' as const, time: '8 min ago' },
  { id: 4, message: 'Signal efficiency drop at Karol Bagh (-15%)', type: 'warning' as const, time: '12 min ago' },
  { id: 5, message: 'Road blockage cleared at Lajpat Nagar', type: 'success' as const, time: '18 min ago' },
];

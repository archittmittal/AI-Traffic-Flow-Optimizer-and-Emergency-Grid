<div align="center">

# 🚦 TrafficAI — Intelligent Traffic Management System

### AI-Powered Smart City Traffic Command Center

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)](https://www.chartjs.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-Maps-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

> **A real-time AI-powered traffic management dashboard** designed for city traffic authorities to monitor intersections, control signals, manage emergency corridors, and detect incidents — all from a single command center interface.

### 🔴 [Live Demo](https://ai-traffic-flow-optimizer-and-emerg.vercel.app) | 🎥 [Demo Video](https://drive.google.com/file/d/1IUy0aksL1vYK7IJwA7jVrZkiXT1F8fA-/view?usp=sharing)

[🚀 Getting Started](#-getting-started) · [📖 Features](#-features) · [🏗️ Architecture](#️-system-architecture) · [📡 API Reference](#-api-reference) · [🎯 Pages](#-dashboard-pages)

</div>

---

## 📌 Problem Statement

Urban traffic congestion leads to **₹1.5 lakh crore** annual economic losses in India. Current traffic management relies on:
- ❌ Fixed-timer signals that ignore real-time conditions
- ❌ Manual monitoring with limited camera coverage
- ❌ Delayed emergency response due to congested routes
- ❌ No predictive capabilities for congestion prevention

**TrafficAI** solves this with an **AI-driven, real-time adaptive system** that brings intelligence to every intersection.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🗺️ Real-Time Monitoring
- Live city map with color-coded intersections
- 🟢 Green = Low Traffic
- 🟡 Yellow = Moderate Traffic
- 🔴 Red = Heavy Congestion
- Vehicle detection with AI bounding boxes
- Lane-wise density heatmaps

</td>
<td width="50%">

### 🚦 AI Signal Control
- AI-recommended signal timing (RL-based)
- Manual override controls (Force Green / Pause / Reset)
- Live countdown timers
- Signal efficiency scoring per intersection

</td>
</tr>
<tr>
<td width="50%">

### 🚑 Emergency Management
- Real-time emergency vehicle tracking
- Green corridor activation/deactivation
- Route visualization on map
- ETA calculation and display

</td>
<td width="50%">

### ⚠️ Incident Detection
- Automatic accident detection alerts
- Road blockage identification
- Congestion spike detection
- AI-suggested alternate routes

</td>
</tr>
<tr>
<td width="50%">

### 📊 Analytics & Prediction
- Congestion trends by hour/zone
- Signal efficiency analytics
- Emergency response time tracking
- AI-powered traffic prediction (6hr horizon)

</td>
<td width="50%">

### 🔌 Real-Time Architecture
- WebSocket-based live updates
- REST API backend
- Background traffic simulation engine
- Multi-channel event system

</td>
</tr>
</table>

---

## 🏗️ System Architecture

### High-Level System Flow

```mermaid
graph TD
    A["📹 Traffic Signal Cameras"] --> B["🧠 Edge AI Processing Node"]

    B --> C["🔍 Vehicle Detection<br/>(Deep Learning - YOLOv8)"]
    B --> D["📊 Grid-Based Traffic<br/>Density Analysis"]

    C --> E["⚙️ Traffic Data Processing"]
    D --> E

    E --> F["🧠 Intersection Signal Intelligence"]

    F --> G["🤖 Reinforcement Learning<br/>Signal Controller"]
    F --> H["🌐 Zone Traffic Coordinator"]

    G --> I["🚦 Traffic Signal Hardware"]
    H --> J["🏙️ City Traffic Brain"]

    J --> K["📈 Traffic Prediction Engine"]
    J --> L["🚑 Emergency Response System"]
    J --> M["💥 Accident Detection System"]
    J --> N["📱 Citizen Traffic App"]

    L --> O["🚑 Emergency Vehicle App"]
    L --> P["🟢 Green Corridor<br/>Signal Control"]
    L --> Q["📡 Cell Tower<br/>Broadcast Alerts"]

    Q --> R["📱 Citizen Mobile Phones"]

    M --> S["🔀 Traffic Rerouting Engine"]
    S --> T["🔴 Dynamic Red Direction<br/>Indicators"]

    N --> U["📍 Live Traffic Updates"]
    N --> V["🆘 Accident Reporting"]
    N --> W["🗺️ Route Optimization"]

    style A fill:#1a1a2e,stroke:#06b6d4,color:#e2e8f0
    style B fill:#1a1a2e,stroke:#06b6d4,color:#e2e8f0
    style C fill:#1a1a2e,stroke:#10b981,color:#e2e8f0
    style D fill:#1a1a2e,stroke:#10b981,color:#e2e8f0
    style E fill:#1a1a2e,stroke:#a855f7,color:#e2e8f0
    style F fill:#1a1a2e,stroke:#f59e0b,color:#e2e8f0
    style G fill:#1a1a2e,stroke:#f59e0b,color:#e2e8f0
    style H fill:#1a1a2e,stroke:#f59e0b,color:#e2e8f0
    style I fill:#1a1a2e,stroke:#ef4444,color:#e2e8f0
    style J fill:#0f172a,stroke:#06b6d4,color:#06b6d4,stroke-width:3px
    style K fill:#1a1a2e,stroke:#a855f7,color:#e2e8f0
    style L fill:#1a1a2e,stroke:#ef4444,color:#e2e8f0
    style M fill:#1a1a2e,stroke:#ef4444,color:#e2e8f0
    style N fill:#1a1a2e,stroke:#06b6d4,color:#e2e8f0
    style O fill:#1e293b,stroke:#94a3b8,color:#94a3b8
    style P fill:#1e293b,stroke:#94a3b8,color:#94a3b8
    style Q fill:#1e293b,stroke:#94a3b8,color:#94a3b8
    style R fill:#1e293b,stroke:#94a3b8,color:#94a3b8
    style S fill:#1e293b,stroke:#94a3b8,color:#94a3b8
    style T fill:#1e293b,stroke:#94a3b8,color:#94a3b8
    style U fill:#1e293b,stroke:#94a3b8,color:#94a3b8
    style V fill:#1e293b,stroke:#94a3b8,color:#94a3b8
    style W fill:#1e293b,stroke:#94a3b8,color:#94a3b8
```

### Application Architecture

```mermaid
graph LR
    subgraph Frontend["🖥️ Frontend (Next.js + React)"]
        direction TB
        UI["Dashboard UI"]
        MAPS["Leaflet Maps"]
        CHARTS["Chart.js Analytics"]
        SOCKET_C["Socket.IO Client"]
        API_C["REST API Client"]
    end

    subgraph Backend["⚙️ Backend (Flask + Python)"]
        direction TB
        REST["REST API Layer"]
        SOCKET_S["Socket.IO Server"]
        SIM["Traffic Simulation Engine"]
        DATA["Data Store (In-Memory)"]
    end

    subgraph AI["🤖 AI/ML Pipeline (Future)"]
        direction TB
        YOLO["YOLOv8 Detection"]
        RL["RL Signal Controller"]
        PRED["Prediction Engine"]
    end

    API_C <-->|"HTTP REST"| REST
    SOCKET_C <-->|"WebSocket"| SOCKET_S
    REST <--> DATA
    SOCKET_S <--> SIM
    SIM <--> DATA
    AI -.->|"Model Inference"| REST

    style Frontend fill:#0f172a,stroke:#06b6d4,color:#e2e8f0,stroke-width:2px
    style Backend fill:#0f172a,stroke:#10b981,color:#e2e8f0,stroke-width:2px
    style AI fill:#0f172a,stroke:#f59e0b,color:#e2e8f0,stroke-width:2px,stroke-dasharray: 5 5
```

### Real-Time Data Flow

```mermaid
sequenceDiagram
    participant C as 📹 Camera/Sensor
    participant E as 🧠 Edge AI Node
    participant B as ⚙️ Flask Backend
    participant S as 🔌 Socket.IO
    participant F as 🖥️ Frontend Dashboard

    C->>E: Raw video feed
    E->>E: YOLOv8 vehicle detection
    E->>B: Processed traffic data
    B->>B: Update intersection state
    B->>S: Emit traffic_update event
    S-->>F: Real-time push update
    F->>F: Re-render map markers & stats

    Note over B,S: Every 5 seconds
    B->>B: Signal countdown tick
    B->>S: Emit signal_update_batch
    S-->>F: Update signal displays

    Note over F: User Action
    F->>B: POST /api/signals/:id/control
    B->>B: Force green / Pause / Reset
    B->>S: Emit signal_update
    S-->>F: Instant UI update
```

---

## 🎯 Dashboard Pages

### 1️⃣ Dashboard Overview — `/`
> **The command center view** — A bird's-eye view of the entire city traffic network

| Component | Description |
|-----------|-------------|
| 📊 **KPI Widgets** | Active Intersections, Avg Congestion Score, Emergency Corridors, Active Incidents |
| 🗺️ **City Map** | Leaflet map with color-coded intersection markers (green/yellow/red) |
| 📈 **Charts** | Traffic Density over Time, Average Wait Time, Signal Efficiency |

### 2️⃣ Intersection Monitoring — `/intersections`
> **Deep-dive into any intersection** — Three-panel real-time monitoring layout

| Panel | Content |
|-------|---------|
| 🎥 **Left — Camera Feed** | Simulated live feed with AI vehicle detection bounding boxes |
| 🗺️ **Center — Map** | Zoomed intersection map with signal phase diagram |
| 📊 **Right — Statistics** | Lane-wise vehicle counts, density bars, queue lengths, signal countdown |

### 3️⃣ Signal Control — `/signals`
> **AI-assisted traffic signal management** with manual override

| Feature | Details |
|---------|---------|
| 🚦 **Traffic Lights** | Animated red/yellow/green with glow effects |
| 🤖 **AI Timing** | Recommended green/yellow/red durations from RL model |
| 🎮 **Controls** | Force Green, Pause Signal, Reset to Auto buttons |
| ⏱️ **Countdown** | Live countdown timer with animated transitions |

### 4️⃣ Emergency Corridor — `/emergency`
> **Emergency vehicle tracking** and green corridor activation

| Feature | Details |
|---------|---------|
| 🗺️ **Route Map** | Emergency vehicle positions + highlighted route paths |
| 📋 **Vehicle List** | ID, type (🚑🚒🚓), status, clickable selection |
| ℹ️ **Info Panel** | Current location, destination, ETA |
| 🟢 **Corridor Toggle** | Activate/Deactivate emergency corridor buttons |

### 5️⃣ Incident Monitoring — `/incidents`
> **Real-time incident detection** with smart rerouting

| Feature | Details |
|---------|---------|
| 🗺️ **Incident Map** | Markers for accidents (⚠️), blockages (🚧), congestion spikes (⚡) |
| 🔍 **Filters** | Filter by type: All / Accident / Blockage / Congestion |
| 📋 **Detail Cards** | Type, location, severity badge, status, description |
| 🔀 **Alt Routes** | AI-suggested alternate routes displayed on map |

### 6️⃣ Analytics — `/analytics`
> **Comprehensive traffic analytics** and predictive insights

| Feature | Details |
|---------|---------|
| 📊 **6 Charts** | Congestion by Hour, Signal Efficiency, Emergency Response, Traffic Prediction, Density by Zone, Wait Time |
| 🎛️ **Filters** | Date range, Zone selector, Intersection dropdown |
| 📋 **Performance Table** | All intersections with congestion %, vehicles, wait time, signal phase |
| 📈 **KPI Cards** | Avg Congestion, Signal Efficiency, Response Time, Incidents Today |

---

## 📡 API Reference

### Base URL: `http://localhost:5001/api`

<details>
<summary><b>🔗 Traffic & Intersections</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/intersections` | List all intersections with real-time data |
| `GET` | `/intersections/:id` | Get single intersection details |
| `GET` | `/intersections/stats` | Aggregate stats (avg congestion, vehicle count) |

**Example Response — `/api/intersections/stats`**
```json
{
  "totalActive": 12,
  "avgCongestionScore": 56,
  "heavyCount": 4,
  "moderateCount": 4,
  "lowCount": 4,
  "totalVehicles": 2557
}
```
</details>

<details>
<summary><b>🚦 Signal Control</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/signals` | List all signals |
| `GET` | `/signals/:id` | Get signal details |
| `POST` | `/signals/:id/control` | Manual control (force_green / pause / reset) |

**POST Body:**
```json
{ "action": "force_green" }
```
</details>

<details>
<summary><b>⚠️ Incidents</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/incidents` | List incidents (filterable: `?type=accident&severity=high`) |
| `GET` | `/incidents/:id` | Get incident with alternate routes |
| `GET` | `/incidents/summary` | Count by type and status |

</details>

<details>
<summary><b>🚑 Emergency</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/emergency/vehicles` | List all emergency vehicles |
| `GET` | `/emergency/vehicles/:id` | Get vehicle details with route |
| `POST` | `/emergency/vehicles/:id/corridor` | Activate/deactivate corridor |

</details>

<details>
<summary><b>📊 Analytics</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/analytics/traffic-density` | Traffic density by zone over time |
| `GET` | `/analytics/congestion-by-hour` | Hourly congestion averages |
| `GET` | `/analytics/signal-efficiency` | Per-intersection signal efficiency |
| `GET` | `/analytics/emergency-response` | Weekly response time trends |
| `GET` | `/analytics/prediction` | 6-hour traffic prediction |
| `GET` | `/analytics/summary` | KPI summary stats |

</details>

<details>
<summary><b>🔌 Socket.IO Events</b></summary>

| Event | Direction | Description |
|-------|-----------|-------------|
| `traffic_update` | Server → Client | Real-time intersection data (every 5s) |
| `signal_update_batch` | Server → Client | All signal countdown updates |
| `signal_update` | Server → Client | Individual signal state change |
| `corridor_update` | Server → Client | Emergency corridor toggle |
| `incident_alert` | Server → Client | New incident detected |

</details>

---

## 📁 Project Structure

```
INDIA_INNOVATES/
│
├── 📂 backend/                        # Python Flask Backend
│   ├── app.py                         # Main server (REST + Socket.IO + Simulation)
│   └── requirements.txt               # Python dependencies
│
├── 📂 src/                            # Next.js Frontend
│   ├── 📂 app/                        # Pages (App Router)
│   │   ├── layout.tsx                 # Root layout (Sidebar + TopBar)
│   │   ├── globals.css                # Dark cyberpunk theme
│   │   ├── page.tsx                   # Dashboard Overview
│   │   ├── 📂 intersections/          # Intersection Monitoring
│   │   ├── 📂 signals/                # Signal Control
│   │   ├── 📂 emergency/              # Emergency Corridor
│   │   ├── 📂 incidents/              # Incident Monitoring
│   │   └── 📂 analytics/              # Analytics & Reports
│   │
│   ├── 📂 components/                 # Reusable UI Components
│   │   ├── 📂 layout/                 # Sidebar, TopBar
│   │   ├── 📂 maps/                   # MapView (Leaflet)
│   │   ├── 📂 traffic/                # StatsCard, CameraFeed
│   │   ├── 📂 signals/                # SignalControlPanel
│   │   ├── 📂 alerts/                 # IncidentAlertPanel
│   │   └── 📂 charts/                 # AnalyticsChart (Chart.js)
│   │
│   ├── 📂 services/                   # API & Socket.IO Client
│   │   ├── api.ts                     # REST API service layer
│   │   └── socket.ts                  # Socket.IO real-time client
│   │
│   └── 📂 lib/                        # Utilities & Mock Data
│       └── mockData.ts                # Hardcoded demo data
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 18.x |
| Python | >= 3.9 |
| npm | >= 9.x |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/INDIA_INNOVATES.git
cd INDIA_INNOVATES

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd backend
pip3 install -r requirements.txt
cd ..
```

### Running the Application

```bash
# Terminal 1 — Frontend (http://localhost:3000)
npm run dev

# Terminal 2 — Backend (http://localhost:5001)
cd backend
python3 app.py
```

> 💡 Open **http://localhost:3000** in your browser to access the dashboard.

### Build for Production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack Deep Dive

```mermaid
graph TB
    subgraph Presentation["🎨 Presentation Layer"]
        NEXT["Next.js 16 (App Router)"]
        REACT["React 19"]
        TW["Tailwind CSS 4"]
        FM["Framer Motion"]
    end

    subgraph Visualization["📊 Visualization Layer"]
        LEAF["Leaflet + CartoDB Dark Tiles"]
        CHART["Chart.js + react-chartjs-2"]
        HERO["Heroicons"]
    end

    subgraph Communication["🔌 Communication Layer"]
        REST_C["REST API (fetch)"]
        WS_C["Socket.IO Client"]
    end

    subgraph Server["⚙️ Server Layer"]
        FLASK["Flask 3.0"]
        CORS["Flask-CORS"]
        SIO["Flask-SocketIO"]
        SIM2["Background Simulator Thread"]
    end

    subgraph Future["🔮 Future: AI/ML Layer"]
        YOLO2["YOLOv8 Object Detection"]
        RL2["Deep RL Signal Optimization"]
        LSTM["LSTM Traffic Prediction"]
        CV["OpenCV Video Processing"]
    end

    Presentation --> Visualization
    Presentation --> Communication
    Communication --> Server
    Future -.-> Server

    style Presentation fill:#0f172a,stroke:#06b6d4,color:#e2e8f0,stroke-width:2px
    style Visualization fill:#0f172a,stroke:#a855f7,color:#e2e8f0,stroke-width:2px
    style Communication fill:#0f172a,stroke:#10b981,color:#e2e8f0,stroke-width:2px
    style Server fill:#0f172a,stroke:#f59e0b,color:#e2e8f0,stroke-width:2px
    style Future fill:#0f172a,stroke:#ef4444,color:#e2e8f0,stroke-width:2px,stroke-dasharray: 5 5
```

---

## 🤖 AI/ML Components (Planned)

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Vehicle Detection** | YOLOv8 + OpenCV | Real-time vehicle counting and classification from camera feeds |
| **Signal Optimization** | Deep Reinforcement Learning (DQN) | Adaptive signal timing that learns from traffic patterns |
| **Traffic Prediction** | LSTM Neural Network | 6-hour congestion forecasting for proactive management |
| **Accident Detection** | CNN-based Anomaly Detection | Automatic accident identification from camera feeds |
| **Density Analysis** | Grid-based Heatmap Algorithm | Lane-wise traffic density calculation |

---

## 🎨 Design Philosophy

The UI is designed as a **professional traffic command center** with:

| Aspect | Implementation |
|--------|---------------|
| 🌑 **Dark Theme** | Navy/slate background (`#0a0e1a`) reducing eye strain for 24/7 operators |
| ✨ **Neon Accents** | Cyan, green, amber, red — following traffic signal conventions |
| 🔮 **Glassmorphism** | Frosted glass panels with `backdrop-blur` for depth |
| 💡 **Glowing Indicators** | CSS `box-shadow` glow effects on traffic signals and status dots |
| 🎬 **Micro-animations** | Framer Motion transitions, pulsing dots, scanner lines |
| 📱 **Responsive** | Adapts from 1080p monitors to ultrawide command center displays |

---

## 👥 Team

| Name | Role |
|------|------|
| Archit Mittal | Full-Stack Developer |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### Built with ❤️ for India Innovates

**🚦 Making India's roads smarter, safer, and more efficient**

[![Stars](https://img.shields.io/github/stars/your-username/INDIA_INNOVATES?style=social)](https://github.com/your-username/INDIA_INNOVATES)
[![Forks](https://img.shields.io/github/forks/your-username/INDIA_INNOVATES?style=social)](https://github.com/your-username/INDIA_INNOVATES)

</div>

"""
AI Traffic Management System - Flask Backend
REST API + Socket.IO for real-time traffic monitoring
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import threading
import time
import random
import math
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# ═══════════════════════════════════════════════════
# MOCK DATA (mirrors frontend mockData.ts)
# ═══════════════════════════════════════════════════

intersections = [
    {
        "id": "INT-001", "name": "Connaught Place Junction",
        "lat": 28.6315, "lng": 77.2167,
        "congestionLevel": "heavy", "congestionScore": 87,
        "vehicleCount": 342, "avgWaitTime": 45,
        "signalPhase": "red", "nextSignalChange": 18,
        "lanes": [
            {"name": "North", "vehicleCount": 89, "density": 82, "queueLength": 24},
            {"name": "South", "vehicleCount": 95, "density": 91, "queueLength": 28},
            {"name": "East", "vehicleCount": 78, "density": 76, "queueLength": 19},
            {"name": "West", "vehicleCount": 80, "density": 85, "queueLength": 22},
        ],
    },
    {
        "id": "INT-002", "name": "India Gate Circle",
        "lat": 28.6129, "lng": 77.2295,
        "congestionLevel": "moderate", "congestionScore": 58,
        "vehicleCount": 218, "avgWaitTime": 28,
        "signalPhase": "green", "nextSignalChange": 32,
        "lanes": [
            {"name": "North", "vehicleCount": 56, "density": 55, "queueLength": 12},
            {"name": "South", "vehicleCount": 62, "density": 60, "queueLength": 15},
            {"name": "East", "vehicleCount": 48, "density": 50, "queueLength": 10},
            {"name": "West", "vehicleCount": 52, "density": 58, "queueLength": 13},
        ],
    },
    {
        "id": "INT-003", "name": "ITO Junction",
        "lat": 28.6287, "lng": 77.2407,
        "congestionLevel": "heavy", "congestionScore": 92,
        "vehicleCount": 410, "avgWaitTime": 52,
        "signalPhase": "red", "nextSignalChange": 12,
        "lanes": [
            {"name": "North", "vehicleCount": 110, "density": 95, "queueLength": 32},
            {"name": "South", "vehicleCount": 105, "density": 90, "queueLength": 30},
            {"name": "East", "vehicleCount": 98, "density": 88, "queueLength": 26},
            {"name": "West", "vehicleCount": 97, "density": 92, "queueLength": 28},
        ],
    },
    {
        "id": "INT-004", "name": "AIIMS Flyover",
        "lat": 28.5672, "lng": 77.2100,
        "congestionLevel": "low", "congestionScore": 25,
        "vehicleCount": 98, "avgWaitTime": 12,
        "signalPhase": "green", "nextSignalChange": 45,
        "lanes": [
            {"name": "North", "vehicleCount": 25, "density": 22, "queueLength": 5},
            {"name": "South", "vehicleCount": 28, "density": 28, "queueLength": 6},
            {"name": "East", "vehicleCount": 22, "density": 20, "queueLength": 4},
            {"name": "West", "vehicleCount": 23, "density": 24, "queueLength": 5},
        ],
    },
    {
        "id": "INT-005", "name": "Nehru Place",
        "lat": 28.5491, "lng": 77.2533,
        "congestionLevel": "moderate", "congestionScore": 62,
        "vehicleCount": 245, "avgWaitTime": 30,
        "signalPhase": "yellow", "nextSignalChange": 5,
        "lanes": [
            {"name": "North", "vehicleCount": 62, "density": 58, "queueLength": 14},
            {"name": "South", "vehicleCount": 68, "density": 65, "queueLength": 17},
            {"name": "East", "vehicleCount": 55, "density": 52, "queueLength": 11},
            {"name": "West", "vehicleCount": 60, "density": 62, "queueLength": 15},
        ],
    },
    {
        "id": "INT-006", "name": "Karol Bagh Crossing",
        "lat": 28.6519, "lng": 77.1905,
        "congestionLevel": "heavy", "congestionScore": 78,
        "vehicleCount": 312, "avgWaitTime": 38,
        "signalPhase": "red", "nextSignalChange": 22,
        "lanes": [
            {"name": "North", "vehicleCount": 82, "density": 78, "queueLength": 20},
            {"name": "South", "vehicleCount": 85, "density": 80, "queueLength": 22},
            {"name": "East", "vehicleCount": 72, "density": 74, "queueLength": 18},
            {"name": "West", "vehicleCount": 73, "density": 76, "queueLength": 19},
        ],
    },
    {
        "id": "INT-007", "name": "Rajiv Chowk Metro",
        "lat": 28.6328, "lng": 77.2197,
        "congestionLevel": "moderate", "congestionScore": 55,
        "vehicleCount": 198, "avgWaitTime": 25,
        "signalPhase": "green", "nextSignalChange": 38,
        "lanes": [
            {"name": "North", "vehicleCount": 50, "density": 52, "queueLength": 11},
            {"name": "South", "vehicleCount": 55, "density": 56, "queueLength": 13},
            {"name": "East", "vehicleCount": 45, "density": 48, "queueLength": 9},
            {"name": "West", "vehicleCount": 48, "density": 54, "queueLength": 12},
        ],
    },
    {
        "id": "INT-008", "name": "Lajpat Nagar",
        "lat": 28.5700, "lng": 77.2397,
        "congestionLevel": "low", "congestionScore": 32,
        "vehicleCount": 120, "avgWaitTime": 15,
        "signalPhase": "green", "nextSignalChange": 40,
        "lanes": [
            {"name": "North", "vehicleCount": 30, "density": 30, "queueLength": 6},
            {"name": "South", "vehicleCount": 35, "density": 35, "queueLength": 8},
            {"name": "East", "vehicleCount": 28, "density": 28, "queueLength": 5},
            {"name": "West", "vehicleCount": 27, "density": 32, "queueLength": 7},
        ],
    },
    {
        "id": "INT-009", "name": "Saket Junction",
        "lat": 28.5245, "lng": 77.2066,
        "congestionLevel": "low", "congestionScore": 18,
        "vehicleCount": 75, "avgWaitTime": 8,
        "signalPhase": "green", "nextSignalChange": 50,
        "lanes": [
            {"name": "North", "vehicleCount": 18, "density": 16, "queueLength": 3},
            {"name": "South", "vehicleCount": 22, "density": 20, "queueLength": 4},
            {"name": "East", "vehicleCount": 16, "density": 15, "queueLength": 2},
            {"name": "West", "vehicleCount": 19, "density": 18, "queueLength": 3},
        ],
    },
    {
        "id": "INT-010", "name": "Pragati Maidan",
        "lat": 28.6183, "lng": 77.2480,
        "congestionLevel": "moderate", "congestionScore": 48,
        "vehicleCount": 178, "avgWaitTime": 22,
        "signalPhase": "yellow", "nextSignalChange": 8,
        "lanes": [
            {"name": "North", "vehicleCount": 45, "density": 44, "queueLength": 10},
            {"name": "South", "vehicleCount": 50, "density": 50, "queueLength": 12},
            {"name": "East", "vehicleCount": 40, "density": 42, "queueLength": 8},
            {"name": "West", "vehicleCount": 43, "density": 48, "queueLength": 11},
        ],
    },
    {
        "id": "INT-011", "name": "Dwarka Sec-21",
        "lat": 28.5562, "lng": 77.0582,
        "congestionLevel": "low", "congestionScore": 22,
        "vehicleCount": 88, "avgWaitTime": 10,
        "signalPhase": "green", "nextSignalChange": 42,
        "lanes": [
            {"name": "North", "vehicleCount": 22, "density": 20, "queueLength": 4},
            {"name": "South", "vehicleCount": 25, "density": 24, "queueLength": 5},
            {"name": "East", "vehicleCount": 20, "density": 18, "queueLength": 3},
            {"name": "West", "vehicleCount": 21, "density": 22, "queueLength": 4},
        ],
    },
    {
        "id": "INT-012", "name": "Moolchand Flyover",
        "lat": 28.5720, "lng": 77.2290,
        "congestionLevel": "heavy", "congestionScore": 82,
        "vehicleCount": 330, "avgWaitTime": 42,
        "signalPhase": "red", "nextSignalChange": 15,
        "lanes": [
            {"name": "North", "vehicleCount": 85, "density": 80, "queueLength": 22},
            {"name": "South", "vehicleCount": 90, "density": 85, "queueLength": 25},
            {"name": "East", "vehicleCount": 78, "density": 78, "queueLength": 19},
            {"name": "West", "vehicleCount": 77, "density": 82, "queueLength": 21},
        ],
    },
]

signals = []
for inter in intersections:
    signals.append({
        "id": f"SIG-{inter['id'].split('-')[1]}",
        "intersectionId": inter["id"],
        "intersectionName": inter["name"],
        "currentPhase": inter["signalPhase"],
        "countdown": inter["nextSignalChange"],
        "aiRecommendedGreen": random.randint(30, 50),
        "aiRecommendedYellow": 5,
        "aiRecommendedRed": random.randint(25, 40),
        "efficiency": random.randint(65, 95),
        "isPaused": False,
    })

incidents = [
    {
        "id": "INC-001", "type": "accident",
        "location": "Near ITO Junction, Ring Road",
        "lat": 28.6300, "lng": 77.2420,
        "timeDetected": "17:42:15", "severity": "high", "status": "responding",
        "description": "Multi-vehicle collision on Ring Road. 3 vehicles involved. Emergency services dispatched.",
    },
    {
        "id": "INC-002", "type": "blockage",
        "location": "Karol Bagh Main Road",
        "lat": 28.6530, "lng": 77.1920,
        "timeDetected": "17:28:30", "severity": "medium", "status": "active",
        "description": "Road blockage due to fallen tree. Single lane open.",
    },
    {
        "id": "INC-003", "type": "congestion_spike",
        "location": "Connaught Place Inner Circle",
        "lat": 28.6325, "lng": 77.2180,
        "timeDetected": "17:55:00", "severity": "medium", "status": "active",
        "description": "Unusual congestion spike detected. Traffic density increased by 45% in last 10 minutes.",
    },
    {
        "id": "INC-004", "type": "accident",
        "location": "Moolchand Flyover Ramp",
        "lat": 28.5730, "lng": 77.2300,
        "timeDetected": "17:15:45", "severity": "critical", "status": "responding",
        "description": "Serious accident on flyover ramp. Ambulance and fire truck en route.",
    },
    {
        "id": "INC-005", "type": "congestion_spike",
        "location": "Nehru Place Bus Terminal",
        "lat": 28.5500, "lng": 77.2540,
        "timeDetected": "17:50:00", "severity": "low", "status": "active",
        "description": "Evening rush hour congestion spike near bus terminal.",
    },
]

emergency_vehicles = [
    {
        "id": "EMV-101", "type": "ambulance",
        "currentLat": 28.6129, "currentLng": 77.2295,
        "destLat": 28.5672, "destLng": 77.2100,
        "destination": "AIIMS Hospital", "eta": "8 min",
        "corridorActive": True,
        "route": [[28.6129, 77.2295], [28.6050, 77.2250], [28.5950, 77.2200],
                  [28.5850, 77.2150], [28.5750, 77.2120], [28.5672, 77.2100]],
    },
    {
        "id": "EMV-203", "type": "fire_truck",
        "currentLat": 28.6519, "currentLng": 77.1905,
        "destLat": 28.6300, "destLng": 77.2420,
        "destination": "ITO Junction (Incident Site)", "eta": "12 min",
        "corridorActive": True,
        "route": [[28.6519, 77.1905], [28.6450, 77.2000], [28.6400, 77.2100],
                  [28.6370, 77.2200], [28.6340, 77.2300], [28.6300, 77.2420]],
    },
    {
        "id": "EMV-305", "type": "police",
        "currentLat": 28.5700, "currentLng": 77.2397,
        "destLat": 28.5730, "destLng": 77.2300,
        "destination": "Moolchand Flyover (Incident Site)", "eta": "3 min",
        "corridorActive": False,
        "route": [[28.5700, 77.2397], [28.5710, 77.2370],
                  [28.5720, 77.2340], [28.5730, 77.2300]],
    },
]

system_alerts = [
    {"id": 1, "message": "Critical: Multi-vehicle accident at ITO Junction", "type": "critical", "time": "2 min ago"},
    {"id": 2, "message": "Emergency corridor activated: EMV-101 → AIIMS", "type": "warning", "time": "5 min ago"},
    {"id": 3, "message": "Congestion spike detected at Connaught Place", "type": "info", "time": "8 min ago"},
    {"id": 4, "message": "Signal efficiency drop at Karol Bagh (-15%)", "type": "warning", "time": "12 min ago"},
    {"id": 5, "message": "Road blockage cleared at Lajpat Nagar", "type": "success", "time": "18 min ago"},
]


# ═══════════════════════════════════════════════════
# REST API ROUTES
# ═══════════════════════════════════════════════════

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "aiEngine": "active",
        "cameras": {"online": 148, "total": 152},
        "sensors": {"online": 312, "total": 320},
        "timestamp": datetime.now().isoformat(),
    })


# ── Traffic / Intersections ──────────────────────

@app.route('/api/intersections', methods=['GET'])
def get_intersections():
    return jsonify({"data": intersections, "count": len(intersections)})


@app.route('/api/intersections/<intersection_id>', methods=['GET'])
def get_intersection(intersection_id):
    inter = next((i for i in intersections if i["id"] == intersection_id), None)
    if not inter:
        return jsonify({"error": "Intersection not found"}), 404
    return jsonify(inter)


@app.route('/api/intersections/stats', methods=['GET'])
def get_intersection_stats():
    total = len(intersections)
    avg_congestion = round(sum(i["congestionScore"] for i in intersections) / total)
    heavy = len([i for i in intersections if i["congestionLevel"] == "heavy"])
    moderate = len([i for i in intersections if i["congestionLevel"] == "moderate"])
    low = len([i for i in intersections if i["congestionLevel"] == "low"])
    return jsonify({
        "totalActive": total,
        "avgCongestionScore": avg_congestion,
        "heavyCount": heavy,
        "moderateCount": moderate,
        "lowCount": low,
        "totalVehicles": sum(i["vehicleCount"] for i in intersections),
    })


# ── Signals ──────────────────────────────────────

@app.route('/api/signals', methods=['GET'])
def get_signals():
    return jsonify({"data": signals, "count": len(signals)})


@app.route('/api/signals/<signal_id>', methods=['GET'])
def get_signal(signal_id):
    sig = next((s for s in signals if s["id"] == signal_id), None)
    if not sig:
        return jsonify({"error": "Signal not found"}), 404
    return jsonify(sig)


@app.route('/api/signals/<signal_id>/control', methods=['POST'])
def control_signal(signal_id):
    """Manual signal control: force_green, pause, reset"""
    sig = next((s for s in signals if s["id"] == signal_id), None)
    if not sig:
        return jsonify({"error": "Signal not found"}), 404

    action = request.json.get("action")  # force_green, pause, reset
    if action == "force_green":
        sig["currentPhase"] = "green"
        sig["countdown"] = sig["aiRecommendedGreen"]
        sig["isPaused"] = False
    elif action == "pause":
        sig["isPaused"] = not sig["isPaused"]
    elif action == "reset":
        inter = next((i for i in intersections if i["id"] == sig["intersectionId"]), None)
        if inter:
            sig["currentPhase"] = inter["signalPhase"]
            sig["countdown"] = inter["nextSignalChange"]
        sig["isPaused"] = False
    else:
        return jsonify({"error": "Invalid action. Use: force_green, pause, reset"}), 400

    # Emit real-time update
    socketio.emit('signal_update', sig)
    return jsonify({"message": f"Signal {signal_id} action '{action}' executed", "signal": sig})


# ── Incidents ────────────────────────────────────

@app.route('/api/incidents', methods=['GET'])
def get_incidents():
    incident_type = request.args.get('type')  # accident, blockage, congestion_spike
    severity = request.args.get('severity')
    status = request.args.get('status')

    filtered = incidents
    if incident_type:
        filtered = [i for i in filtered if i["type"] == incident_type]
    if severity:
        filtered = [i for i in filtered if i["severity"] == severity]
    if status:
        filtered = [i for i in filtered if i["status"] == status]

    return jsonify({"data": filtered, "count": len(filtered)})


@app.route('/api/incidents/<incident_id>', methods=['GET'])
def get_incident(incident_id):
    inc = next((i for i in incidents if i["id"] == incident_id), None)
    if not inc:
        return jsonify({"error": "Incident not found"}), 404

    # Include alternate routes
    alternate_routes = {
        "INC-001": [
            {"label": "Via Mathura Road", "positions": [[28.6300, 77.2420], [28.6250, 77.2500], [28.6200, 77.2520], [28.6150, 77.2480]]},
            {"label": "Via Bhairon Marg", "positions": [[28.6300, 77.2420], [28.6320, 77.2350], [28.6280, 77.2280], [28.6240, 77.2300]]},
        ],
        "INC-004": [
            {"label": "Via Lala Lajpat Rai Marg", "positions": [[28.5730, 77.2300], [28.5680, 77.2250], [28.5650, 77.2200]]},
        ],
    }

    result = {**inc, "alternateRoutes": alternate_routes.get(incident_id, [])}
    return jsonify(result)


@app.route('/api/incidents/summary', methods=['GET'])
def get_incident_summary():
    return jsonify({
        "total": len(incidents),
        "accidents": len([i for i in incidents if i["type"] == "accident"]),
        "blockages": len([i for i in incidents if i["type"] == "blockage"]),
        "congestionSpikes": len([i for i in incidents if i["type"] == "congestion_spike"]),
        "active": len([i for i in incidents if i["status"] == "active"]),
        "responding": len([i for i in incidents if i["status"] == "responding"]),
        "resolved": len([i for i in incidents if i["status"] == "resolved"]),
    })


# ── Emergency Vehicles ───────────────────────────

@app.route('/api/emergency/vehicles', methods=['GET'])
def get_emergency_vehicles():
    return jsonify({"data": emergency_vehicles, "count": len(emergency_vehicles)})


@app.route('/api/emergency/vehicles/<vehicle_id>', methods=['GET'])
def get_emergency_vehicle(vehicle_id):
    vehicle = next((v for v in emergency_vehicles if v["id"] == vehicle_id), None)
    if not vehicle:
        return jsonify({"error": "Vehicle not found"}), 404
    return jsonify(vehicle)


@app.route('/api/emergency/vehicles/<vehicle_id>/corridor', methods=['POST'])
def toggle_corridor(vehicle_id):
    """Activate or deactivate emergency corridor"""
    vehicle = next((v for v in emergency_vehicles if v["id"] == vehicle_id), None)
    if not vehicle:
        return jsonify({"error": "Vehicle not found"}), 404

    action = request.json.get("action")  # activate, deactivate
    if action == "activate":
        vehicle["corridorActive"] = True
    elif action == "deactivate":
        vehicle["corridorActive"] = False
    else:
        return jsonify({"error": "Invalid action. Use: activate, deactivate"}), 400

    socketio.emit('corridor_update', vehicle)
    return jsonify({"message": f"Corridor for {vehicle_id} {action}d", "vehicle": vehicle})


# ── Analytics ────────────────────────────────────

@app.route('/api/analytics/traffic-density', methods=['GET'])
def get_traffic_density():
    hours = ['6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM']
    return jsonify({
        "labels": hours,
        "datasets": [
            {"label": "Zone A - Central", "data": [15,35,72,88,65,52,58,55,60,68,78,92,85,72,55,30]},
            {"label": "Zone B - South", "data": [10,28,60,75,55,45,48,42,50,58,70,80,75,60,42,22]},
            {"label": "Zone C - West", "data": [8,22,55,70,50,40,42,38,45,52,65,78,70,55,38,18]},
        ],
    })


@app.route('/api/analytics/congestion-by-hour', methods=['GET'])
def get_congestion_by_hour():
    return jsonify({
        "labels": ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        "data": [12, 8, 5, 18, 72, 55, 48, 52, 65, 85, 58, 25],
    })


@app.route('/api/analytics/signal-efficiency', methods=['GET'])
def get_signal_efficiency():
    return jsonify({
        "labels": [i["name"].split(" ")[0] for i in intersections[:8]],
        "data": [78, 85, 62, 94, 72, 68, 88, 91],
    })


@app.route('/api/analytics/emergency-response', methods=['GET'])
def get_emergency_response():
    return jsonify({
        "labels": ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        "avgResponseTime": [8.2, 7.5, 9.1, 6.8, 7.2, 5.5, 4.8],
        "targetResponseTime": 8.0,
    })


@app.route('/api/analytics/prediction', methods=['GET'])
def get_traffic_prediction():
    return jsonify({
        "labels": ['Now','+1h','+2h','+3h','+4h','+5h','+6h'],
        "predicted": [78, 82, 70, 55, 42, 35, 28],
        "currentTrend": 78,
    })


@app.route('/api/analytics/summary', methods=['GET'])
def get_analytics_summary():
    avg_congestion = round(sum(i["congestionScore"] for i in intersections) / len(intersections))
    avg_efficiency = round(sum(s["efficiency"] for s in signals) / len(signals))
    return jsonify({
        "avgCongestion": f"{avg_congestion}%",
        "congestionChange": "+8%",
        "signalEfficiency": f"{avg_efficiency}%",
        "efficiencyChange": "+3%",
        "avgResponseTime": "7.0 min",
        "responseChange": "-1.2",
        "incidentsToday": len(incidents),
        "incidentsChange": "+2",
    })


# ── Alerts ───────────────────────────────────────

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    return jsonify({"data": system_alerts, "count": len(system_alerts)})


# ═══════════════════════════════════════════════════
# SOCKET.IO - Real-time Updates
# ═══════════════════════════════════════════════════

@socketio.on('connect')
def handle_connect():
    print(f'[Socket.IO] Client connected')
    emit('connected', {'message': 'Connected to TrafficAI backend', 'timestamp': datetime.now().isoformat()})


@socketio.on('disconnect')
def handle_disconnect():
    print(f'[Socket.IO] Client disconnected')


@socketio.on('subscribe_traffic')
def handle_subscribe_traffic(data):
    """Client subscribes to real-time traffic updates"""
    emit('subscribed', {'channel': 'traffic', 'message': 'Subscribed to traffic updates'})


@socketio.on('subscribe_signals')
def handle_subscribe_signals(data):
    """Client subscribes to real-time signal updates"""
    emit('subscribed', {'channel': 'signals', 'message': 'Subscribed to signal updates'})


@socketio.on('subscribe_incidents')
def handle_subscribe_incidents(data):
    """Client subscribes to real-time incident alerts"""
    emit('subscribed', {'channel': 'incidents', 'message': 'Subscribed to incident alerts'})


def simulate_traffic_updates():
    """Background thread that simulates real-time traffic data changes"""
    while True:
        time.sleep(5)  # Update every 5 seconds

        # Randomly update some intersections
        for inter in intersections:
            # Slightly vary congestion score
            delta = random.randint(-3, 3)
            inter["congestionScore"] = max(5, min(100, inter["congestionScore"] + delta))
            inter["vehicleCount"] = max(20, inter["vehicleCount"] + random.randint(-10, 10))
            inter["avgWaitTime"] = max(3, inter["avgWaitTime"] + random.randint(-2, 2))

            # Update congestion level
            if inter["congestionScore"] > 70:
                inter["congestionLevel"] = "heavy"
            elif inter["congestionScore"] > 40:
                inter["congestionLevel"] = "moderate"
            else:
                inter["congestionLevel"] = "low"

            # Update lane densities
            for lane in inter["lanes"]:
                lane["density"] = max(5, min(100, lane["density"] + random.randint(-3, 3)))
                lane["vehicleCount"] = max(5, lane["vehicleCount"] + random.randint(-5, 5))

        # Emit traffic update
        socketio.emit('traffic_update', {
            "intersections": intersections,
            "timestamp": datetime.now().isoformat(),
        })

        # Update signal countdowns
        for sig in signals:
            if not sig["isPaused"]:
                sig["countdown"] = max(0, sig["countdown"] - 5)
                if sig["countdown"] <= 0:
                    phases = ["green", "yellow", "red"]
                    current_idx = phases.index(sig["currentPhase"])
                    sig["currentPhase"] = phases[(current_idx + 1) % 3]
                    if sig["currentPhase"] == "green":
                        sig["countdown"] = sig["aiRecommendedGreen"]
                    elif sig["currentPhase"] == "yellow":
                        sig["countdown"] = sig["aiRecommendedYellow"]
                    else:
                        sig["countdown"] = sig["aiRecommendedRed"]

        socketio.emit('signal_update_batch', {
            "signals": signals,
            "timestamp": datetime.now().isoformat(),
        })


# ═══════════════════════════════════════════════════
# STARTUP
# ═══════════════════════════════════════════════════

if __name__ == '__main__':
    print("=" * 55)
    print("  🚦 TrafficAI Backend Server")
    print("  REST API:    http://localhost:5001/api/")
    print("  Socket.IO:   http://localhost:5001")
    print("=" * 55)

    # Start background traffic simulation
    traffic_thread = threading.Thread(target=simulate_traffic_updates, daemon=True)
    traffic_thread.start()

    socketio.run(app, host='0.0.0.0', port=5001, debug=True, use_reloader=False, allow_unsafe_werkzeug=True)

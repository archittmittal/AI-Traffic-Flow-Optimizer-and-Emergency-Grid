/**
 * Socket.IO Client - Real-time updates from Flask backend
 * Connects to http://localhost:5001 (Flask-SocketIO)
 */

'use client';

import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5001';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => {
      console.log('[Socket.IO] Connected to TrafficAI backend');
    });

    socket.on('disconnect', () => {
      console.log('[Socket.IO] Disconnected from backend');
    });

    socket.on('connect_error', (err) => {
      console.warn('[Socket.IO] Connection error:', err.message);
    });

    socket.on('connected', (data) => {
      console.log('[Socket.IO] Server says:', data.message);
    });
  }
  return socket;
}

// ── Subscription helpers ─────────────────────────

export function subscribeToTraffic(callback: (data: any) => void) {
  const s = getSocket();
  s.emit('subscribe_traffic', {});
  s.on('traffic_update', callback);
  return () => {
    s.off('traffic_update', callback);
  };
}

export function subscribeToSignals(callback: (data: any) => void) {
  const s = getSocket();
  s.emit('subscribe_signals', {});
  s.on('signal_update_batch', callback);
  s.on('signal_update', callback);
  return () => {
    s.off('signal_update_batch', callback);
    s.off('signal_update', callback);
  };
}

export function subscribeToIncidents(callback: (data: any) => void) {
  const s = getSocket();
  s.emit('subscribe_incidents', {});
  s.on('incident_alert', callback);
  return () => {
    s.off('incident_alert', callback);
  };
}

export function subscribeToCorridors(callback: (data: any) => void) {
  const s = getSocket();
  s.on('corridor_update', callback);
  return () => {
    s.off('corridor_update', callback);
  };
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

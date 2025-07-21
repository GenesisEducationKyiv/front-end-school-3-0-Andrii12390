import { WS_URL } from '@/lib/config';
import { useState, useEffect, useRef } from 'react';

interface IActiveTrackData {
  title: string;
  artist: string;
  timestamp: number;
}

interface WebSocketMessage {
  type: 'activeTrack';
  data: IActiveTrackData;
}

export const useActiveTrack = () => {
  const [activeTrack, setActiveTrack] = useState<IActiveTrackData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    ws.onmessage = event => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        if (message.type === 'activeTrack') {
          setActiveTrack(message.data);
        }
      } catch {
        console.error('Failed to parse WebSocket response');
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = () => {
      setError('Failed to connect');
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return {
    activeTrack,
    isConnected,
    error,
  };
};

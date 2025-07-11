import { useActiveTrack } from '@/hooks/useActiveTrack';
import { Music, Wifi, WifiOff } from 'lucide-react';

function ActiveTrackDisplay() {
  const { activeTrack, isConnected, error } = useActiveTrack();

  if (error) {
    return (
      <div className="flex items-center gap-2 text-destructive text-xs">
        <WifiOff size={16} />
        <span>Connection error</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2 text-yellow-500 text-xs">
        <Wifi size={16} />
        <span>Connecting...</span>
      </div>
    );
  }

  if (!activeTrack) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground text-xs">
        <Music size={16} />
        <span>Expecting track...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="w-2 h-2 bg-green-500 rounded-full" />
      <span className="font-medium">{activeTrack.title}</span>
      <span className="text-muted-foreground">— {activeTrack.artist}</span>
    </div>
  );
}

export default ActiveTrackDisplay;

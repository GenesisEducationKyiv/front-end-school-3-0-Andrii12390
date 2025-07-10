import { useTracks } from '@/api/tracks/hooks';
import PlayerSkeleton from '@/components/player/PlayerSkeleton';
import { ActiveTrack } from '@/components/tracks';
import TrackList from '@/components/tracks/list/TracksList';
import TrackToolbar from '@/components/tracks/toolbar/Toolbar';
import { Logo } from '@/components/ui/logo';
import { usePlayerStore } from '@/store/usePlayerStore';
import { useTrackStore } from '@/store/useTracksStore';
import { lazy, Suspense, useEffect } from 'react';

const AudioPlayer = lazy(() => import('@/components/player'));

function Tracks() {
  const { data: tracks, isLoading } = useTracks();

  const setTracks = useTrackStore(s => s.setTracks);

  const activeTrack = usePlayerStore(state => state.activeTrack);

  useEffect(() => {
    if (tracks) setTracks(tracks?.data);
  }, [tracks, setTracks]);

  return (
    <div className="text-foreground bg-background">
      <div className="pb-4 min-h-dvh flex flex-col">
        <section className="sticky pt-4 top-0 z-5 bg-background">
          <div className="container mx-auto px-2">
            <header
              data-testid="tracks-header"
              className="animate-fade-right flex items-center justify-between mb-6"
            >
              <Logo />
              <ActiveTrack />
            </header>
            <TrackToolbar
              tracks={tracks?.data}
              isLoading={isLoading}
            />
          </div>
        </section>

        <TrackList
          tracks={tracks?.data}
          isLoading={isLoading}
        />

        <footer className="fixed bottom-0 left-0 py-3 w-full bg-background z-50">
          <div className="container mx-auto px-4 py-2">
            <Suspense fallback={<PlayerSkeleton />}>
              <AudioPlayer track={activeTrack} />
            </Suspense>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Tracks;

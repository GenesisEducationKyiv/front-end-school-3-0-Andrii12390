import { useAppSelector } from '@/app/hooks';
import AudioPlayer from '@/components/player';
import TrackList from '@/components/tracks/list/TracksList';
import TrackToolbar from '@/components/tracks/toolbar/Toolbar';
import { Logo } from '@/components/ui/logo';
import { selectTracks } from '@/features/tracks/tracksSlice';

function Tracks() {
  const { activeTrack } = useAppSelector(selectTracks);

  return (
    <div className='text-foreground bg-background'>
      <div className='pb-4 min-h-dvh flex flex-col'>
        <section className='sticky pt-4 top-0 z-5 bg-background'>
          <div className='container mx-auto px-2'>
            <header data-testid='tracks-header' className='animate-fade-right'>
              <Logo />
            </header>
            <TrackToolbar />
          </div>
        </section>

        <TrackList />

        <footer className='fixed bottom-0 left-0 py-3 w-full bg-background z-50'>
          <div className='container mx-auto px-4 py-2'>
            <AudioPlayer track={activeTrack} />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Tracks;

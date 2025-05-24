import TrackBottomControls from '@/components/tracks/TracksFooter';
import TrackHeader from '@/components/tracks/TracksHeader';
import TrackList from '@/components/tracks/TracksList';
import TrackToolbar from '@/components/tracks/TracksToolbar';

function Tracks() {
  return (
    <div className='text-foreground bg-background'>
      <div className='pb-4 min-h-dvh flex flex-col'>
        <section className='sticky pt-4 top-0 z-5 bg-background'>
          <div className='container mx-auto px-2'>
            <TrackHeader />
            <TrackToolbar />
          </div>
        </section>

        <TrackList />

        <TrackBottomControls />
      </div>
    </div>
  );
}

export default Tracks;

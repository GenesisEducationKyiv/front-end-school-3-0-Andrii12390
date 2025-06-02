import { useAppSelector } from '@/app/hooks';
import AudioPlayer from '../player/AudioPlayer';
import { selectTracks } from '@/features/tracks/tracksSlice';

function TracksFooter() {
  const { activeTrack } = useAppSelector(selectTracks);

  return (
    <footer className='fixed bottom-0 left-0 py-3 w-full bg-background z-50'>
      <div className='container mx-auto px-4 py-2'>
        <AudioPlayer track={activeTrack} />
      </div>
    </footer>
  );
}

export default TracksFooter;

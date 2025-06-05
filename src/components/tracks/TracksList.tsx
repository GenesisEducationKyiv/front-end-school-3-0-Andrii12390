import { useAppSelector } from '@/app/hooks';
import { useState } from 'react';
import TrackItem from '../track/TrackItem';
import TrackListSkeleton from './TracksSkeleton';
import { type TTrack } from '@/types';
import EditTrackModal from '../forms/EditTrackForm';
import { selectTracks } from '@/features/tracks/tracksSlice';

function TrackList() {
  const { tracks, isLoading } = useAppSelector(selectTracks);

  const [trackToEdit, setTrackToEdit] = useState<TTrack | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleEditTrack = (track: TTrack) => {
    setTrackToEdit(() => track);
    setIsOpen(true);
  };

  return (
    <section className='flex-1 pt-4 pb-30 bg-tracks-background'>
      <div className='container mx-auto'>
        {isOpen && (
          <EditTrackModal
            track={trackToEdit!}
            isOpenModal={isOpen}
            setIsOpenModal={setIsOpen}
          />
        )}
        {isLoading ? (
          <TrackListSkeleton tracksAmount={10} />
        ) : (
          <ul className='px-2'>
            {tracks.map((track) => (
              <TrackItem
                key={track.id}
                track={track}
                handleEdit={handleEditTrack}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default TrackList;

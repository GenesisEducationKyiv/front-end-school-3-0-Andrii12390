import { lazy, Suspense, useState } from 'react';
import TrackItem from '../item/TrackItem';
import TrackListSkeleton from './TracksSkeleton';
import { type TTrack } from '@/lib/schemas';
import { type Option } from '@mobily/ts-belt';
import { useTrackStore } from '@/store/useTracksStore';

const EditTrackForm = lazy(() => import('@/components/forms/EditTrackForm'));

interface ITrackList {
  tracks?: TTrack[];
  isLoading: boolean;
}

function TrackList({ tracks, isLoading }: ITrackList) {
  const selectedIds = useTrackStore(state => state.selectedIds);

  const [trackToEdit, setTrackToEdit] = useState<Option<TTrack>>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditTrack = (track: TTrack) => {
    setTrackToEdit(() => track);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <section className="flex-1 pt-4 pb-30 bg-tracks-background">
      <div className="container mx-auto">
        {isEditModalOpen && (
          <Suspense fallback={null}>
            <EditTrackForm
              track={trackToEdit!}
              isOpen={isEditModalOpen}
              handleClose={handleCloseModal}
            />
          </Suspense>
        )}
        {isLoading ? (
          <TrackListSkeleton />
        ) : (
          <ul className="px-2">
            {tracks &&
              tracks.map(track => (
                <TrackItem
                  key={track.id}
                  track={track}
                  isChecked={selectedIds.includes(track.id)}
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

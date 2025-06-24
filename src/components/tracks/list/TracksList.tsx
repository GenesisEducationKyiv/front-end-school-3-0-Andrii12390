import { useState } from 'react';
import TrackItem from '../item/TrackItem';
import TrackListSkeleton from './TracksSkeleton';
import { type TTrack } from '@/lib/schemas';
import { EditTrackForm } from '@/components/forms';
import { type Option } from '@mobily/ts-belt';
import { useTrackStore } from '@/store/useTracksStore';

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
          <EditTrackForm
            track={trackToEdit!}
            isOpen={isEditModalOpen}
            handleClose={handleCloseModal}
          />
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

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect, useState } from 'react';
import TrackItem from '../track/TrackItem';
import TrackListSkeleton from './TracksSkeleton';
import EditTrackModal from '../forms/EditTrackForm';
import { selectTracks } from '@/features/tracks/tracksSlice';
import { fetchGenres } from '@/features/genres/genresThunk';
import { fetchTracks } from '@/features/tracks/trackThunks';
import { customToast } from '../ui/toasts';
import { selectFilters } from '@/features/filters/filtersSlice';
import { type TTrack } from '@/lib/schemas';
import { type ApiError } from '@/types';

function TrackList() {
  const { tracks, isLoading } = useAppSelector(selectTracks);

  const dispatch = useAppDispatch();

  const filters = useAppSelector(selectFilters);

  const [trackToEdit, setTrackToEdit] = useState<TTrack | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleEditTrack = (track: TTrack) => {
    setTrackToEdit(() => track);
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(fetchTracks()).then((result) => {
      if (fetchTracks.rejected.match(result)) {
        const err = result.payload ?? {
          message: 'Failed to fetch tracks',
        };
        customToast.error(err.message);
      }
    });
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(fetchGenres())
      .unwrap()
      .catch((err: ApiError) => {
        customToast.error(`Fetch failed: ${err.message}`);
      });
  }, [dispatch]);

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

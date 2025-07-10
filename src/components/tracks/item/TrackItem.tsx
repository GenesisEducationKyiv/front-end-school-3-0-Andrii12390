import { lazy, Suspense, useEffect, useState } from 'react';

import { twMerge } from 'tailwind-merge';
import { API_URL } from '@/lib/config';
import { formatTime, validateAudioFile } from '@/lib/helpers';
import { type TTrack } from '@/lib/schemas';
import { customToast } from '@/components/ui/toasts';
import TrackActions from './TrackActions';
import TrackInfo from './TrackInfo';
import { type Option } from '@mobily/ts-belt';
import { useDeleteTrack, useDeleteTrackFile, useUploadTrackFile } from '@/api/tracks/hooks';
import { usePlayerStore } from '@/store/usePlayerStore';
import { useTrackStore } from '@/store/useTracksStore';

const TrackDeleteDialog = lazy(() => import('./TrackDeleteDialog'));

interface ITrackItemProps {
  track: TTrack;
  isChecked: boolean;
  handleEdit: (track: TTrack) => void;
}

function TrackItem({ track, isChecked, handleEdit }: ITrackItemProps) {
  const activeTrack = usePlayerStore(state => state.activeTrack);
  const toggleIsPlaying = usePlayerStore(state => state.togglePlay);
  const setActiveTrack = usePlayerStore(state => state.setTrack);

  const toggle = useTrackStore(state => state.toggle);

  const { mutateAsync: deleteTrack } = useDeleteTrack();
  const { mutateAsync: deleteTrackFile } = useDeleteTrackFile();
  const { mutateAsync: uploadTrackFile } = useUploadTrackFile();

  const [isTrackDeleteOpen, setIsTrackDeleteOpen] = useState(false);
  const [isFileDeleteOpen, setIsFileDeleteOpen] = useState(false);

  const [duration, setDuration] = useState<Option<number>>(null);

  const handleRemoveTrack = () => {
    deleteTrack(track.id).finally(() => {
      setIsTrackDeleteOpen(false);
    });
  };

  useEffect(() => {
    if (!track.audioFile) return;

    const audio = new Audio(`${API_URL}/api/files/${track.audioFile}`);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    return () => {
      audio.removeAttribute('src');
      audio.load();
    };
  }, [track.audioFile]);

  const handleRemoveFile = () => {
    deleteTrackFile(track.id).finally(() => {
      setIsTrackDeleteOpen(false);
    });
  };

  const validateAndUploadFile = (file: File) => {
    const errorMessage = validateAudioFile(file);
    if (errorMessage) {
      customToast.error(errorMessage);
      return;
    }

    uploadTrackFile({ id: track.id, file }).then(data => {
      setActiveTrack(data);
    });
  };

  const handlePlay = () => {
    if (!track.audioFile) {
      customToast.error('No file uploaded!');
      return;
    }

    if (activeTrack?.id !== track.id) {
      setActiveTrack(track);
    }

    toggleIsPlaying();
  };

  const handleCheckboxToggle = () => {
    toggle(track.id);
  };

  return (
    <>
      <li
        data-testid={`track-item-${track.id}`}
        className={twMerge(
          'px-2 py-3 mb-2 flex justify-between items-center rounded-xl hover:translate-x-1 transition-transform duration-300',
          'hover:bg-slate-700/20',
          track.id === activeTrack?.id && activeTrack.audioFile
            ? 'ring-1 ring-primary/30 bg-slate-700/20'
            : '',
        )}
      >
        <TrackInfo
          coverImage={track.coverImage}
          artist={track.artist}
          title={track.title}
          trackId={track.id}
        />

        <section className="flex items-center gap-4">
          <span className="text-sm">{formatTime(duration!)}</span>
          <TrackActions
            track={track}
            isChecked={isChecked}
            onPlay={handlePlay}
            onEdit={() => handleEdit(track)}
            onFileUpload={validateAndUploadFile}
            handleSelect={handleCheckboxToggle}
            onDeleteFile={() => setIsFileDeleteOpen(true)}
            onDeleteTrack={() => setIsTrackDeleteOpen(true)}
          />
        </section>
      </li>

      <Suspense fallback={null}>
        <TrackDeleteDialog
          isFileDeleteOpen={isFileDeleteOpen}
          isTrackDeleteOpen={isTrackDeleteOpen}
          setIsFileDeleteOpen={setIsFileDeleteOpen}
          setIsTrackDeleteOpen={setIsTrackDeleteOpen}
          onDeleteFile={handleRemoveFile}
          onDeleteTrack={handleRemoveTrack}
        />
      </Suspense>
    </>
  );
}

export default TrackItem;

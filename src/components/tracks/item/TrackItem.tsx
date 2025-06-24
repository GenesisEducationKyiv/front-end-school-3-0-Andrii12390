import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  deleteTrack,
  uploadTrackFile,
  setActiveTrack,
  deleteTrackFile,
} from '@/features/tracks/trackThunks';
import { selectTracks, toggleSelectTrack, togglePlayPause } from '@/features/tracks/tracksSlice';

import { twMerge } from 'tailwind-merge';
import { API_URL } from '@/lib/config';
import { formatTime, validateAudioFile } from '@/lib/helpers';
import { type TTrack } from '@/lib/schemas';
import { customToast } from '@/components/ui/toasts';
import TrackActions from './TrackActions';
import TrackInfo from './TrackInfo';
import TrackDeleteDialog from './TrackDeleteDialog';
import { type Option } from '@mobily/ts-belt';

interface ITrackItemProps {
  track: TTrack;
  handleEdit: (track: TTrack) => void;
}

function TrackItem({ track, handleEdit }: ITrackItemProps) {
  const dispatch = useAppDispatch();
  const { selectedIds, activeTrack } = useAppSelector(selectTracks);
  const [isTrackDeleteOpen, setIsTrackDeleteOpen] = useState(false);
  const [isFileDeleteOpen, setIsFileDeleteOpen] = useState(false);

  const [duration, setDuration] = useState<Option<number>>(null);

  const handleRemoveTrack = () => {
    dispatch(deleteTrack(track.id))
      .then(result => {
        if (deleteTrack.rejected.match(result)) {
          const err = result.payload ?? {
            message: 'Unknown error',
          };
          customToast.error(err.message);
        } else {
          customToast.success('Track successfully removed!');
        }
      })
      .finally(() => {
        setIsTrackDeleteOpen(false);
      });
  };

  useEffect(() => {
    if (track.audioFile) {
      const audio = new Audio(`${API_URL}/api/files/${track.audioFile}`);
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });

      return () => {
        audio.removeAttribute('src');
        audio.load();
      };
    }
  }, [track.audioFile]);

  const handleRemoveFile = () => {
    dispatch(deleteTrackFile(track.id))
      .then(result => {
        if (deleteTrackFile.rejected.match(result)) {
          const err = result.payload ?? {
            message: 'Unknown error',
          };
          customToast.error(err.message);
        } else {
          customToast.success('File successfully removed!');
        }
      })
      .finally(() => {
        setIsFileDeleteOpen(false);
      });
  };

  const validateAndUploadFile = (file: File) => {
    const errorMessage = validateAudioFile(file);
    if (errorMessage) {
      return customToast.error(errorMessage);
    }

    dispatch(uploadTrackFile({ id: track.id, file })).then(result => {
      if (uploadTrackFile.rejected.match(result)) {
        const err = result.payload ?? { message: 'Unknown error' };
        customToast.error(err.message);
      } else {
        customToast.success('File successfully uploaded!');
      }
    });
  };

  const handlePlay = () => {
    if (!track.audioFile) {
      return customToast.error('No file uploaded!');
    }

    const isCurrentTrackActive = activeTrack?.id === track.id;

    if (isCurrentTrackActive) {
      dispatch(togglePlayPause());
    } else {
      dispatch(setActiveTrack(track));
    }
  };

  const handleCheckboxToggle = () => {
    dispatch(toggleSelectTrack(track.id));
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
            isChecked={selectedIds.includes(track.id)}
            onPlay={handlePlay}
            onEdit={() => handleEdit(track)}
            onFileUpload={validateAndUploadFile}
            handleSelect={handleCheckboxToggle}
            onDeleteFile={() => setIsFileDeleteOpen(true)}
            onDeleteTrack={() => setIsTrackDeleteOpen(true)}
          />
        </section>
      </li>

      <TrackDeleteDialog
        isFileDeleteOpen={isFileDeleteOpen}
        isTrackDeleteOpen={isTrackDeleteOpen}
        setIsFileDeleteOpen={setIsFileDeleteOpen}
        setIsTrackDeleteOpen={setIsTrackDeleteOpen}
        onDeleteFile={handleRemoveFile}
        onDeleteTrack={handleRemoveTrack}
      />
    </>
  );
}

export default TrackItem;

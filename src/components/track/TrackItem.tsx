import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { TTrack } from '@/types';
import {
  deleteTrack,
  uploadTrackFile,
  setActiveTrack,
  deleteTrackFile,
} from '@/features/tracks/trackThunks';
import {
  selectTracks,
  toggleSelectTrack,
  togglePlayPause,
} from '@/features/tracks/tracksSlice';
import { customToast } from '../ui/toasts';
import TrackCover from './TrackCover';
import TrackActions from './TrackActions';
import TrackDeleteDialogs from './TrackDeleteDialog';
import TrackInfo from './TrackInfo';
import { twMerge } from 'tailwind-merge';
import { API_URL } from '@/lib/config';
import { formatTime } from '@/lib/helpers';

interface ITrackItemProps {
  track: TTrack;
  handleEdit: (track: TTrack) => void;
}

function TrackItem({ track, handleEdit }: ITrackItemProps) {
  const dispatch = useAppDispatch();
  const { selectedIds, activeTrack } = useAppSelector(selectTracks);
  const isSelected = selectedIds.includes(track.id);

  const [isTrackDeleteOpen, setIsTrackDeleteOpen] = useState(false);
  const [isFileDeleteOpen, setIsFileDeleteOpen] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  const handleRemoveTrack = async () => {
    try {
      await dispatch(deleteTrack(track.id));
      customToast.success('Track successfully removed!');
    } catch (e) {
      customToast.error('Error deleting track!');
    } finally {
      setIsTrackDeleteOpen(false);
    }
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

  const handleRemoveFile = async () => {
    try {
      await dispatch(deleteTrackFile(track.id));
      customToast.success('File successfully removed!');
    } catch (e) {
      customToast.error('Error removing file!');
    } finally {
      setIsFileDeleteOpen(false);
    }
  };

  const validateAndUploadFile = async (file: File) => {
    const maxSizeMB = 10;
    const allowedTypes = [
      'audio/mpeg',
      'audio/wav',
      'audio/x-wav',
      'audio/mp3',
    ];

    if (!allowedTypes.includes(file.type)) {
      return customToast.error('Only MP3 or WAV files are allowed');
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      return customToast.error(`File size should be less than ${maxSizeMB}MB`);
    }

    try {
      await dispatch(uploadTrackFile({ id: track.id, file }));
      customToast.success('File successfully uploaded!');
    } catch (e) {
      customToast.error('Error uploading file!');
    }
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
            : ''
        )}
      >
        <section className='flex gap-4 items-center'>
          <TrackCover coverImage={track.coverImage} />
          <TrackInfo
            artist={track.artist}
            title={track.title}
            trackId={track.id}
          />
        </section>

        <section className='flex items-center gap-4'>
          <span className='text-sm'>{formatTime(duration!)}</span>
          <TrackActions
            track={track}
            isChecked={isSelected}
            onPlay={handlePlay}
            onEdit={() => handleEdit(track)}
            onFileUpload={validateAndUploadFile}
            handleSelect={handleCheckboxToggle}
            onDeleteFile={() => setIsFileDeleteOpen(true)}
            onDeleteTrack={() => setIsTrackDeleteOpen(true)}
          />
        </section>
      </li>

      <TrackDeleteDialogs
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

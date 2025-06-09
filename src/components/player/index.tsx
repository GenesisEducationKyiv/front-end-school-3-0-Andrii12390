import { Pause, Play } from 'lucide-react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Button } from '../ui/button';
import { API_URL } from '@/lib/config';
import { formatTime } from '@/lib/helpers';
import { type TTrack } from '@/lib/schemas';
import { type Option } from '@mobily/ts-belt';

interface IAudioPlayerProps {
  track: Option<TTrack>;
}

const btnStyles =
  'w-12 h-12 bg-gradient-to-br from-[#1e1f25] to-[#5e2ca5] flex items-center justify-center text-white shadow-md rounded-full';

function AudioPlayer({ track }: IAudioPlayerProps) {
  const {
    audioRef,
    progressRef,
    isPlaying,
    progress,
    currentTime,
    duration,
    togglePlay,
    handleSeek,
    onEnded,
  } = useAudioPlayer(track);

  return (
    <div
      className='max-w-4xl mx-auto flex items-center gap-2'
      data-testid={`audio-player-${track?.id}`}
    >
      <Button
        onClick={togglePlay}
        className={btnStyles}
        data-testid={
          isPlaying ? `pause-button-${track?.id}` : `play-button-${track?.id}`
        }
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </Button>

      <div className='flex-1'>
        <span className='text-sm font-medium mr-4'>
          {track?.audioFile ? track?.title : 'No track selected'}
        </span>
        <span className='text-xs text-muted-foreground'>
          {track?.audioFile ? track?.artist : '—'}
        </span>

        <div className='flex items-center gap-2 mt-2'>
          <span className='text-xs text-muted-foreground'>
            {formatTime(currentTime)}
          </span>
          <div
            className='relative h-1 flex-1 bg-muted rounded-full cursor-pointer'
            ref={progressRef}
            onClick={handleSeek}
            data-testid={`audio-progress-${track?.id}`}
          >
            <div
              className='h-full bg-primary rounded-full transition-all'
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className='text-xs text-muted-foreground w-10'>
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {track?.audioFile && (
        <audio ref={audioRef} onEnded={() => onEnded()}>
          <source
            src={`${API_URL}/api/files/${track.audioFile}`}
            type='audio/mpeg'
          />
        </audio>
      )}
    </div>
  );
}

export default AudioPlayer;

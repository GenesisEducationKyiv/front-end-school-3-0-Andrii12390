import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  playNextTrack,
  selectTracks,
  togglePlayPause,
} from '@/features/tracks/tracksSlice';
import { type TTrack } from '@/lib/schemas';

interface IAudioState {
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
}

const initialState: IAudioState = {
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  duration: 0,
};

export function useAudioPlayer(track: TTrack | null) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [audioState, setAudioState] = useState<IAudioState>(initialState);

  const dispatch = useAppDispatch();
  const { isPlaying: reduxIsPlaying } = useAppSelector(selectTracks);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setAudioState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration,
        progress: (audio.currentTime / audio.duration) * 100,
      }));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;

    if (track?.audioFile && audio) {
      audio.load();
      setAudioState((prev) => ({ ...prev, isPlaying: reduxIsPlaying }));
    } else {
      setAudioState(initialState);
    }
  }, [track, reduxIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track?.audioFile) return;

    const handlePlayPause = async () => {
      if (reduxIsPlaying && audio.paused) {
        await audio.play();
      } else if (!reduxIsPlaying && !audio.paused) {
        audio.pause();
      }
      setAudioState((prev) => ({ ...prev, isPlaying: reduxIsPlaying }));
    };

    handlePlayPause();
  }, [reduxIsPlaying, track]);

  const togglePlay = () => {
    dispatch(togglePlayPause());
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audio.duration;

    audio.currentTime = newTime;
  };

  return {
    audioRef,
    progressRef,
    isPlaying: audioState.isPlaying,
    togglePlay,
    progress: audioState.progress,
    currentTime: audioState.currentTime,
    duration: audioState.duration,
    handleSeek,
    onEnded: () => dispatch(playNextTrack()),
  };
}

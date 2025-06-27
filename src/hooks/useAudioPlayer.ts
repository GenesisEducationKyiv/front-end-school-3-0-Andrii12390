import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { API_URL } from '@/lib/config';
import type { TTrack } from '@/lib/schemas';
import { Option } from '@mobily/ts-belt';
import { useTrackStore } from '@/store/useTracksStore';

export const useAudioPlayer = (track: Option<TTrack>) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const tracks = useTrackStore(state => state.tracks);

  const {
    isPlaying,
    togglePlay,
    setTime,
    setDuration,
    setProgress,
    setTrack,
    currentTime,
    duration,
    progress,
  } = usePlayerStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (track && audio) {
      audio.src = `${API_URL}/api/files/${track.audioFile}`;
      audio.load();
      setTrack(track);
    }
  }, [track, setTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying]);

  const onLoadedMetadata = () => {
    const audio = audioRef.current!;
    setDuration(audio.duration);
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current!;
    setTime(audio.currentTime);
    if (audio.duration > 0) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleEnded = () => {
    if (!track) return;

    const idx = tracks.findIndex(t => t.id === track.id);

    const next = tracks.slice(idx + 1).find(t => !!t.audioFile);

    if (next) {
      setTrack(next);
    }

    togglePlay();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current!;
    const bar = progressRef.current!;
    const { left, width } = bar.getBoundingClientRect();
    const clickX = e.clientX - left;
    audio.currentTime = (clickX / width) * audio.duration;
  };

  return {
    audioRef,
    progressRef,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    progress,
    handleSeek,
    handleEnded,
    onLoadedMetadata,
    onTimeUpdate,
  };
};

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { TTrack } from '@/lib/schemas';

export interface PlayerState {
  activeTrack: TTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
}

interface PlayerActions {
  setTrack: (track: TTrack) => void;
  setTime: (time: number) => void;
  setDuration: (dur: number) => void;
  setProgress: (p: number) => void;
  togglePlay: () => void;
}

const initialPlayer: PlayerState = {
  activeTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  progress: 0,
};

export const usePlayerStore = create<PlayerState & PlayerActions>()(
  immer(set => ({
    ...initialPlayer,
    togglePlay: () =>
      set(s => {
        s.isPlaying = !s.isPlaying;
      }),

    setTrack: track =>
      set(state => {
        state.activeTrack = track;
        state.isPlaying = true;
        state.currentTime = 0;
        state.progress = 0;
        state.duration = 0;
      }),

    setTime: time =>
      set(state => {
        state.currentTime = time;
      }),
    setDuration: dur =>
      set(state => {
        state.duration = dur;
      }),
    setProgress: p =>
      set(state => {
        state.progress = p;
      }),
  })),
);

import { TTrack } from '@/lib/schemas';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface TracksState {
  tracks: TTrack[];
  selectedIds: string[];
}

interface TracksActions {
  setTracks: (tracks: TTrack[]) => void;
  toggle: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearAll: () => void;
}

type TracksStore = TracksState & TracksActions;

export const useTrackStore = create<TracksStore>()(
  immer(set => ({
    tracks: [],
    selectedIds: [],

    setTracks: ts =>
      set(state => {
        state.tracks = ts;
      }),

    toggle: id =>
      set(state => {
        const idx = state.selectedIds.indexOf(id);
        if (idx >= 0) state.selectedIds.splice(idx, 1);
        else state.selectedIds.push(id);
      }),

    selectAll: ids =>
      set(state => {
        state.selectedIds = [...ids];
      }),

    clearAll: () =>
      set(state => {
        state.selectedIds = [];
      }),
  })),
);

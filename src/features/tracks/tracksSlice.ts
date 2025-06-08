import {
  createSlice,
  PayloadAction,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import type { ApiError } from '@/types';
import {
  createTrack,
  fetchTracks,
  deleteTrack,
  editTrack,
  uploadTrackFile,
  deleteTrackFile,
  setActiveTrack,
  bulkDeleteTracks,
} from './trackThunks';
import { type RootState } from '@/app/store';
import type { TTrack, TMetaData } from '@/lib/schemas';
import { isApiError } from '@/lib/guards';

export interface ITracksState {
  tracks: TTrack[];
  isLoading: boolean;
  error: ApiError | null;
  selectedIds: string[];
  meta: TMetaData;
  activeTrack: TTrack | null;
  isPlaying: boolean;
}

const initialState: ITracksState = {
  tracks: [],
  isLoading: false,
  error: null,
  selectedIds: [],
  meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
  activeTrack: null,
  isPlaying: false,
};

const handlePending = (state: ITracksState) => {
  state.isLoading = true;
  state.error = null;
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    playNextTrack: (state) => {
      if (!state.activeTrack) return;
      const currentIndex = state.tracks.findIndex(
        (t) => t.id === state.activeTrack?.id
      );
      const nextIndex = currentIndex + 1;
      if (
        nextIndex < state.tracks.length &&
        state.tracks[nextIndex].audioFile
      ) {
        state.activeTrack = state.tracks[nextIndex];
        state.isPlaying = true;
      } else {
        state.activeTrack = null;
        state.isPlaying = false;
      }
    },
    toggleSelectTrack: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.tracks.some((track) => track.id === id)) return;
      const set = new Set(state.selectedIds);
      if (set.has(id)) {
        set.delete(id);
      } else {
        set.add(id);
      }
      state.selectedIds = Array.from(set);
    },
    selectAllTracks: (state) => {
      state.selectedIds = state.tracks.map((track) => track.id);
    },
    clearSelected: (state) => {
      state.selectedIds = [];
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, handlePending)
      .addCase(
        fetchTracks.fulfilled,
        (state, action: PayloadAction<{ data: TTrack[]; meta: TMetaData }>) => {
          state.tracks = action.payload.data;
          state.meta = action.payload.meta;
          state.isLoading = false;
          state.error = null;
          if (
            !state.activeTrack &&
            action.payload.data.length > 0 &&
            action.payload.data[0].audioFile
          ) {
            state.activeTrack = action.payload.data[0];
            state.isPlaying = false;
          }
        }
      )
      .addCase(createTrack.pending, handlePending)
      .addCase(
        createTrack.fulfilled,
        (state, action: PayloadAction<TTrack>) => {
          state.tracks.push(action.payload);
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(editTrack.pending, handlePending)
      .addCase(editTrack.fulfilled, (state, action: PayloadAction<TTrack>) => {
        const updated = action.payload;
        const index = state.tracks.findIndex((i) => i.id === updated.id);
        if (index !== -1) {
          state.tracks[index] = updated;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteTrack.pending, handlePending)
      .addCase(
        deleteTrack.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tracks = state.tracks.filter((i) => i.id !== action.payload);
          if (state.activeTrack?.id === action.payload) {
            state.activeTrack = null;
            state.isPlaying = false;
          }
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(uploadTrackFile.pending, handlePending)
      .addCase(
        uploadTrackFile.fulfilled,
        (state, action: PayloadAction<TTrack>) => {
          const uploaded = action.payload;
          const index = state.tracks.findIndex((i) => i.id === uploaded.id);
          if (index !== -1) {
            state.tracks[index] = uploaded;
          }
          state.activeTrack = uploaded;
          state.isPlaying = true;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(deleteTrackFile.pending, handlePending)
      .addCase(
        deleteTrackFile.fulfilled,
        (state, action: PayloadAction<TTrack>) => {
          const updated = action.payload;
          const index = state.tracks.findIndex((i) => i.id === updated.id);
          if (index !== -1) {
            state.tracks[index] = updated;
          }
          if (state.activeTrack?.id === updated.id) {
            state.activeTrack = null;
            state.isPlaying = false;
          }
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        setActiveTrack.fulfilled,
        (state, action: PayloadAction<TTrack>) => {
          state.activeTrack = action.payload;
          state.isPlaying = true;
          state.error = null;
        }
      )
      .addCase(
        bulkDeleteTracks.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          const ids = action.payload;

          state.tracks = state.tracks.filter(
            (track) => !ids.includes(track.id)
          );

          if (state.activeTrack && !ids.includes(state.activeTrack.id)) {
            state.activeTrack = null;
            state.isPlaying = false;
          }
          state.selectedIds = [];
          state.error = null;
        }
      );
    builder.addMatcher(isRejectedWithValue, (state, action) => {
      state.isLoading = false;
      if (isApiError(action.payload)) {
        state.error = action.payload;
      } else {
        state.error = { message: 'Unknown error' };
      }
    });
  },
});

export const {
  playNextTrack,
  toggleSelectTrack,
  selectAllTracks,
  clearSelected,
  togglePlayPause,
} = tracksSlice.actions;

export const selectTracks = (state: RootState) => state.tracks;

export default tracksSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type TTrack } from '@/types';
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

export interface IMetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ITracksState {
  tracks: TTrack[];
  isLoading: boolean;
  error: string | null;
  selectedIds: string[];
  meta: IMetaData;
  activeTrack: TTrack | null;
  isPlaying: boolean;
}

const initialState: ITracksState = {
  tracks: [],
  isLoading: true,
  error: null,
  selectedIds: [],
  meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
  activeTrack: null,
  isPlaying: false,
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

      const next = state.tracks
        .slice(currentIndex + 1)
        .find((t) => !!t.audioFile);

      state.activeTrack = next ?? null;
      state.isPlaying = !!next;
    },
    toggleSelectTrack: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((i) => i !== id);
      } else {
        state.selectedIds.push(id);
      }
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
      .addCase(fetchTracks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTracks.fulfilled,
        (state, action: PayloadAction<{ data: TTrack[]; meta: IMetaData }>) => {
          state.tracks = action.payload.data;
          state.meta = action.payload.meta;
          state.isLoading = false;

          if (!state.activeTrack && action.payload.data.length > 0) {
            state.activeTrack = action.payload.data[0];
            state.isPlaying = false;
          }
        }
      )
      .addCase(fetchTracks.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Error fetching tracks';
      })
      .addCase(createTrack.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createTrack.fulfilled,
        (state, action: PayloadAction<TTrack>) => {
          state.tracks.push(action.payload);
          state.isLoading = false;
        }
      )
      .addCase(createTrack.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Error creating tracks';
      })
      .addCase(editTrack.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTrack.fulfilled, (state, action: PayloadAction<TTrack>) => {
        const updated = action.payload;
        state.tracks = state.tracks.map((i) =>
          i.id === updated.id ? updated : i
        );
        state.isLoading = false;
      })
      .addCase(editTrack.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Error updating track';
      })
      .addCase(deleteTrack.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteTrack.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tracks = state.tracks.filter((i) => i.id !== action.payload);

          if (state.activeTrack?.id === action.payload) {
            state.activeTrack = null;
            state.isPlaying = false;
          }

          state.isLoading = false;
        }
      )
      .addCase(deleteTrack.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Error deleting track';
      })
      .addCase(uploadTrackFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        uploadTrackFile.fulfilled,
        (state, action: PayloadAction<TTrack>) => {
          const uploaded = action.payload;

          state.tracks = state.tracks.map((i) =>
            i.id === uploaded.id ? uploaded : i
          );

          state.activeTrack = uploaded;
          state.isPlaying = true;
          state.isLoading = false;
        }
      )
      .addCase(uploadTrackFile.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Error uploading file';
      })
      .addCase(
        setActiveTrack.fulfilled,
        (state, action: PayloadAction<TTrack>) => {
          state.activeTrack = action.payload;
          state.isPlaying = true;
        }
      )
      .addCase(deleteTrackFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteTrackFile.fulfilled,
        (state, action: PayloadAction<TTrack>) => {
          const updated = action.payload;

          state.tracks = state.tracks.map((i) =>
            i.id === updated.id ? updated : i
          );

          if (state.activeTrack?.id === updated.id) {
            state.activeTrack = null;
            state.isPlaying = false;
          }

          state.isLoading = false;
        }
      )
      .addCase(deleteTrackFile.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        bulkDeleteTracks.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.tracks = state.tracks.filter(
            (track) => !action.payload.includes(track.id)
          );
          if (
            state.activeTrack &&
            state.selectedIds.includes(state.activeTrack.id)
          ) {
            state.activeTrack = null;
            state.isPlaying = false;
          }

          state.selectedIds = [];
        }
      );
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

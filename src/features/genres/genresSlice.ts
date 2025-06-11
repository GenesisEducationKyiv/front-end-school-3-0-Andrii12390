import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchGenres } from './genresThunk';
import { type RootState } from '@/app/store';
import { type ApiError } from '@/types';
import { type Option } from '@mobily/ts-belt';

interface GenresState {
  genres: string[];
  loading: boolean;
  error: Option<ApiError>;
}

const initialState: GenresState = {
  genres: [],
  loading: false,
  error: null,
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchGenres.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.genres = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;

        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: action.error.message ?? 'Unknown error' };
        }
      });
  },
});

export const selectGenres = (state: RootState) => state.genres;

export default genresSlice.reducer;

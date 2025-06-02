import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGenres } from './genresThunk';
import { type RootState } from '@/app/store';

interface GenresState {
  genres: string[];
  loading: boolean;
  error: string | null;
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
      .addCase(fetchGenres.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching genres';
      });
  },
});

export const selectGenres = (state: RootState) => state.genres;

export default genresSlice.reducer;

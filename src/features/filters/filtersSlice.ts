import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TField = 'title' | 'artist' | 'album' | 'createdAt';

export type TOrder = 'asc' | 'desc';

export type TSort = {
  field: TField;
  order: TOrder;
} | null;

interface FiltersState {
  search: string;
  sort: TSort;
  genre: string;
  artist: string;
  page: number;
  limit: number;
}

const initialState: FiltersState = {
  search: '',
  sort: null,
  genre: '',
  artist: '',
  page: 1,
  limit: 10,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setSort(state, action: PayloadAction<FiltersState['sort']>) {
      state.sort = action.payload;
      state.page = 1;
    },
    setGenre(state, action: PayloadAction<string>) {
      state.genre = action.payload;
      state.page = 1;
    },
    setArtist(state, action: PayloadAction<string>) {
      state.artist = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSearch,
  setSort,
  setGenre,
  setArtist,
  setPage,
  setLimit,
  resetFilters,
} = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;

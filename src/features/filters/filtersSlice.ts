import { type RootState } from '@/app/store';
import { Option } from '@mobily/ts-belt';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TField = 'title' | 'artist' | 'album' | 'createdAt';
export type TOrder = 'asc' | 'desc';

export interface FiltersState {
  search: string;
  order: Option<TOrder>;
  sort: Option<TField>;
  genre: Option<string>;
  artist: Option<string>;
  page: number;
  limit: number;
}

export const initialState: FiltersState = {
  search: '',
  order: null,
  sort: null,
  genre: null,
  artist: null,
  page: 1,
  limit: 10,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FiltersState>>) {
      return { ...state, ...action.payload, page: action.payload.page || 1 };
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;

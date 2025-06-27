import { Option } from '@mobily/ts-belt';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

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

interface FiltersActions {
  resetFilters: () => void;
  setFilters: (filters: Partial<FiltersState>) => void;
}

export const initialFilters: FiltersState = {
  search: '',
  order: null,
  sort: null,
  genre: null,
  artist: null,
  page: 1,
  limit: 10,
};

type FiltersStore = {
  filters: FiltersState;
} & FiltersActions;

export const useFiltersStore = create<FiltersStore>()(
  immer(set => ({
    filters: initialFilters,

    resetFilters() {
      set(state => {
        state.filters = initialFilters;
      });
    },

    setFilters(partial) {
      set(state => {
        state.filters = {
          ...state.filters,
          ...partial,
        };
      });
    },
  })),
);

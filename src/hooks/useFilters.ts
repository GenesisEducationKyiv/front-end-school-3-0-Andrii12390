import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  FiltersState,
  initialState as initialFilters,
  resetFilters,
  selectFilters,
  setFilters,
  TField,
  TOrder,
} from '@/features/filters/filtersSlice';
import { buildQueryParams, parseQueryParams } from '@/lib/helpers';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';

export const useFilters = () => {
  const dispatch = useAppDispatch();
  const storedFilters = useAppSelector(selectFilters);
  const [, setSearchParams] = useSearchParams();
  const [localFilters, setLocalFilters] = useState<FiltersState>(storedFilters);
  const debouncedSearch = useDebounce(localFilters.search, 500);
  const isInitialized = useRef(false);
  const prevDebouncedSearch = useRef(debouncedSearch);

  useEffect(() => {
    if (!isInitialized.current) {
      const queryParams = parseQueryParams();

      dispatch(setFilters({ ...storedFilters, ...queryParams }));
      setLocalFilters({ ...storedFilters, ...queryParams });
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (
      isInitialized.current &&
      debouncedSearch !== prevDebouncedSearch.current &&
      debouncedSearch !== storedFilters.search
    ) {
      const newFilters: FiltersState = {
        ...storedFilters,
        search: debouncedSearch,
        page: 1,
      };

      dispatch(setFilters(newFilters));

      setSearchParams(buildQueryParams(newFilters));
    }

    prevDebouncedSearch.current = debouncedSearch;
  }, [debouncedSearch, dispatch, setSearchParams, storedFilters]);

  useEffect(() => {
    setLocalFilters(storedFilters);
  }, [storedFilters]);

  const updateLocalFilter = <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K]
  ) => {
    const newFilters = {
      ...localFilters,
      [key]: value,
      ...(key !== 'page' && key !== 'search' ? { page: 1 } : {}),
    };

    setLocalFilters(newFilters);

    if (key === 'page') {
      dispatch(setFilters(newFilters));
      setSearchParams(buildQueryParams(newFilters));
    }
  };

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
    setSearchParams(buildQueryParams(localFilters));
  };

  const resetLocalFilters = () => {
    setLocalFilters({ ...initialFilters, page: 1 });
    dispatch(resetFilters());
    setSearchParams({});
  };

  return {
    filters: localFilters,
    setSearch: (value: string) => updateLocalFilter('search', value),
    setOrder: (value: TOrder | null) => updateLocalFilter('order', value),
    setSort: (value: TField | null) => updateLocalFilter('sort', value),
    setGenre: (value: string | null) => updateLocalFilter('genre', value),
    setArtist: (value: string | null) => updateLocalFilter('artist', value),
    setPage: (value: number) => updateLocalFilter('page', value),
    setLimit: (value: number) => updateLocalFilter('limit', value),
    applyFilters,
    resetFilters: resetLocalFilters,
  };
};

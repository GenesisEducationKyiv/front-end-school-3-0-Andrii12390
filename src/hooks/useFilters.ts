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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';

export const useFilters = () => {
  const dispatch = useAppDispatch();
  const storedFilters = useAppSelector(selectFilters);
  const [, setSearchParams] = useSearchParams();
  const [localFilters, setLocalFilters] = useState<FiltersState>(storedFilters);
  const debouncedSearch = useDebounce(localFilters.search);

  useEffect(() => {
    const queryParams = parseQueryParams();
    dispatch(setFilters(queryParams));
    setLocalFilters((prev) => ({ ...prev, ...queryParams }));
  }, [dispatch]);

  useEffect(() => {
    const newFilters: FiltersState = {
      ...localFilters,
      search: debouncedSearch,
      page: 1,
    };
    dispatch(setFilters(newFilters));
    const queryString = buildQueryParams(newFilters);
    setSearchParams(queryString ? new URLSearchParams(queryString) : {});
  }, [debouncedSearch]);

  const updateLocalFilter = <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K]
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== 'page' && key !== 'search' ? { page: 1 } : {}),
    }));
  };

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
    const queryString = buildQueryParams(localFilters);
    setSearchParams(queryString ? new URLSearchParams(queryString) : {});
  };

  const resetLocalFilters = () => {
    setLocalFilters({ ...initialFilters });
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

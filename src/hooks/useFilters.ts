import {
  useFiltersStore,
  initialFilters,
  FiltersState,
  TOrder,
  TField,
} from '@/store/useFiltersStore';

import { buildQueryParams, parseQueryParams } from '@/lib/helpers';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { O, pipe, type Option } from '@mobily/ts-belt';
import { useQueryClient } from '@tanstack/react-query';

export const useFilters = () => {
  const queryClient = useQueryClient();

  const storedFilters = useFiltersStore(state => state.filters);
  const resetFilters = useFiltersStore(state => state.resetFilters);
  const setFilters = useFiltersStore(state => state.setFilters);

  const [searchParams, setSearchParams] = useSearchParams();
  const [localFilters, setLocalFilters] = useState<FiltersState>(storedFilters);
  const debouncedSearch = useDebounce(localFilters.search, 500);
  const isInitialized = useRef(false);
  const prevDebouncedSearch = useRef(debouncedSearch);

  useEffect(() => {
    if (!isInitialized.current) {
      const merged = pipe(
        parseQueryParams(searchParams.toString()),
        O.fromNullable,
        O.map(queryParams => ({ ...storedFilters, ...queryParams })),
        O.getWithDefault(storedFilters),
      );

      setFilters(merged);
      setLocalFilters(merged);

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

      setFilters(newFilters);

      setSearchParams(buildQueryParams(newFilters));
    }

    queryClient.invalidateQueries({ queryKey: ['tracks'] });

    prevDebouncedSearch.current = debouncedSearch;
  }, [debouncedSearch, setSearchParams, storedFilters, setFilters, queryClient]);

  useEffect(() => {
    setLocalFilters(storedFilters);
  }, [storedFilters]);

  const updateLocalFilter = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    const resetPage = (filters: FiltersState) =>
      key === 'page' || key === 'search' ? filters : { ...filters, page: 1 };

    const newFilters = pipe(localFilters, filters => ({ ...filters, [key]: value }), resetPage);

    setLocalFilters(newFilters);

    if (key === 'page') {
      setFilters(newFilters);
      setSearchParams(buildQueryParams(newFilters));
    }
  };

  const applyFilters = () => {
    pipe(localFilters, filters => {
      setFilters(filters);
      setSearchParams(buildQueryParams(filters));
    });
  };

  const resetLocalFilters = () => {
    pipe({ ...initialFilters, page: 1 }, filters => {
      setLocalFilters(filters);
      resetFilters();
      setSearchParams({});
    });
  };

  return {
    filters: localFilters,
    setSearch: (value: string) => updateLocalFilter('search', value),
    setOrder: (value: Option<TOrder>) => updateLocalFilter('order', value),
    setSort: (value: Option<TField>) => updateLocalFilter('sort', value),
    setGenre: (value: Option<string>) => updateLocalFilter('genre', value),
    setArtist: (value: Option<string>) => updateLocalFilter('artist', value),
    setPage: (value: number) => updateLocalFilter('page', value),
    setLimit: (value: number) => updateLocalFilter('limit', value),
    applyFilters,
    resetFilters: resetLocalFilters,
  };
};

import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { TField, TOrder, TSort } from '@/features/filters/filtersSlice';
import { useAppDispatch } from '@/app/hooks';
import {
  setSearch as setGlobalSearch,
  setSort as setGlobalSort,
  setGenre as setGlobalGenre,
  setPage,
} from '@/features/filters/filtersSlice';
import { useSearchParams } from 'react-router-dom';
import { updateUrlParams } from '@/lib/helpers';

interface IUseTrackFiltersUIProps {
  search: string;
  sort: TSort;
  genre: string;
}

export function useTrackFiltersUI(initial: IUseTrackFiltersUIProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const urlSearch = searchParams.get('search') || '';
  const urlSort = searchParams.get('sort') || '';
  const urlOrder = searchParams.get('order') || '';
  const urlGenre = searchParams.get('genre') || '';

  const [search, setSearch] = useState(urlSearch || initial.search);
  const [sort, setSort] = useState<TSort>(
    urlSort && urlOrder
      ? { field: urlSort as TField, order: urlOrder as TOrder }
      : initial.sort
  );

  const [genre, setGenre] = useState(urlGenre || initial.genre);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(setGlobalSearch(debouncedSearch));
    setSearchParams(
      updateUrlParams(searchParams, {
        search: debouncedSearch || null,
        page: 1,
      })
    );
  }, [debouncedSearch]);

  const applyFilters = () => {
    dispatch(setGlobalSort(sort));
    dispatch(setGlobalGenre(genre));
    dispatch(setPage(1));

    setSearchParams(
      updateUrlParams(searchParams, {
        sort: sort?.field || null,
        order: sort?.order || null,
        genre: genre || null,
        page: 1,
      })
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSort(null);
    setGenre('');
    dispatch(setPage(1));
    dispatch(setGlobalSearch(''));
    dispatch(setGlobalSort(null));
    dispatch(setGlobalGenre(''));

    const newParams = new URLSearchParams();
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return {
    search,
    setSearch,
    sort,
    setSort,
    genre,
    setGenre,
    debouncedSearch,
    applyFilters,
    clearFilters,
  };
}

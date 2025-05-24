import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CreateTrackForm from '../forms/CreateTrackForm';
import { selectFilters, TField, TOrder } from '@/features/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { bulkDeleteTracks, fetchTracks } from '@/features/tracks/trackThunks';
import { fetchGenres } from '@/features/genres/genresThunk';
import { Eraser, ListCheck, Plus, Trash } from 'lucide-react';
import {
  clearSelected,
  selectAllTracks,
  selectTracks,
} from '@/features/tracks/tracksSlice';
import Pagination from './TracksPagination';

import { updateUrlParams } from '@/lib/helpers';
import { TrackFilters } from './TrackFilters';
import { useTrackFiltersUI } from '@/hooks/useTrackFiltersUI';

function TracksToolbar() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { selectedIds: selectedTracks, isLoading } =
    useAppSelector(selectTracks);
  const filters = useAppSelector(selectFilters);

  const {
    search,
    setSearch,
    sort,
    setSort,
    genre,
    setGenre,
    applyFilters,
    clearFilters,
  } = useTrackFiltersUI({
    search: filters.search,
    sort: filters.sort,
    genre: filters.genre,
  });

  const isCreateModalOpen = searchParams.get('modal') === 'create';

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTracks());
  }, [
    dispatch,
    filters.page,
    filters.limit,
    filters.search,
    filters.genre,
    filters.sort,
  ]);

  const openModal = () => {
    setSearchParams(updateUrlParams(searchParams, { modal: 'create' }));
  };

  const removeSelectedItems = () => {
    dispatch(bulkDeleteTracks(selectedTracks));
  };

  const clearSelectedItems = () => {
    dispatch(clearSelected());
  };

  const selectAllItems = () => {
    dispatch(selectAllTracks());
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortFieldChange = (value: string) => {
    setSort(
      value ? { field: value as TField, order: sort?.order || 'asc' } : null
    );
  };

  const handleSortOrderChange = (value: string) => {
    if (sort) {
      setSort({ ...sort, order: value as TOrder });
    }
  };

  const handleGenreChange = (value: string) => {
    setGenre(value);
  };

  return (
    <div className='mb-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Input
            placeholder='Search by title, artist, album'
            value={search}
            onChange={handleSearchChange}
            className='w-full md:w-64 bg-input-background'
            type='search'
          />
          <TrackFilters
            isSheetOpen={isSheetOpen}
            setIsSheetOpen={setIsSheetOpen}
            localSort={sort}
            handleSortFieldChange={handleSortFieldChange}
            handleSortOrderChange={handleSortOrderChange}
            localGenre={genre}
            handleGenreChange={handleGenreChange}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
          />
        </div>

        <Button
          onClick={openModal}
          data-testid='create-track-button'
          className='bg-primary rounded active:scale-95 cursor-pointer'
        >
          <Plus /> <span>New Track</span>
        </Button>

        {isCreateModalOpen && <CreateTrackForm />}
      </div>

      <div className='flex gap-4 justify-end mt-2'>
        {selectedTracks.length > 0 && (
          <>
            <Button
              onClick={removeSelectedItems}
              data-testid='bulk-delete-button'
              variant={'destructive'}
              className='rounded active:scale-95 cursor-pointer mt-2'
            >
              <Trash /> <span>Delete</span>
            </Button>
            <Button
              data-testid='clear-selection-button'
              variant={'outline'}
              onClick={clearSelectedItems}
              className='rounded active:scale-95 cursor-pointer mt-2'
            >
              <Eraser /> <span>Clear</span>
            </Button>
          </>
        )}

        <Button
          data-testid='select-all'
          disabled={isLoading}
          variant={'outline'}
          onClick={selectAllItems}
          className='rounded active:scale-95 cursor-pointer mt-2 bg-button'
        >
          <ListCheck /> <span>All</span>
        </Button>
      </div>

      <Pagination />
    </div>
  );
}

export default TracksToolbar;

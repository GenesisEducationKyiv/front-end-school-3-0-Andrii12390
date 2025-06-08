import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { bulkDeleteTracks } from '@/features/tracks/trackThunks';
import { Eraser, ListCheck, Plus, Trash } from 'lucide-react';
import {
  clearSelected,
  selectAllTracks,
  selectTracks,
} from '@/features/tracks/tracksSlice';

import { useFilters } from '@/hooks/useFilters';
import { Filters, Pagination } from '..';
import { CreateTrackForm } from '@/components/forms';
import { customToast } from '@/components/ui/toasts';

function Toolbar() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { selectedIds: selectedTracks, isLoading } =
    useAppSelector(selectTracks);

  const { filters, setSearch } = useFilters();

  const removeSelectedItems = () => {
    dispatch(bulkDeleteTracks(selectedTracks)).then((result) => {
      if (bulkDeleteTracks.rejected.match(result)) {
        const err = result.payload ?? { message: 'Failed to delete tracks' };
        customToast.error(err.message);
      } else {
        customToast.success('Selected tracks deleted');
      }
    });
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

  const handleOpenModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className='mb-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Input
            placeholder='Search by title, artist, album'
            value={filters.search}
            onChange={handleSearchChange}
            className='w-full md:w-64 bg-input-background'
            type='search'
          />
          <Filters isOpen={isSheetOpen} setIsOpen={setIsSheetOpen} />
        </div>

        <Button
          onClick={handleOpenModal}
          data-testid='create-track-button'
          className='bg-primary rounded active:scale-95 cursor-pointer'
        >
          <Plus /> <span>New Track</span>
        </Button>

        <CreateTrackForm
          isOpen={isCreateModalOpen}
          handleClose={handleCloseModal}
        />
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

export default Toolbar;

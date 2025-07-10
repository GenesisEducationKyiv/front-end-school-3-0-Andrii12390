import { lazy, Suspense, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Eraser, ListCheck, Plus, Trash } from 'lucide-react';
import { useFilters } from '@/hooks/useFilters';
import { Filters, Pagination } from '..';

import { useTrackStore } from '@/store/useTracksStore';
import { useDeleteTracks } from '@/api/tracks/hooks';
import { type TTrack } from '@/lib/schemas';

const CreateTrackForm = lazy(() => import('@/components/forms/CreateTrackForm'));

interface IToolbarProps {
  tracks?: TTrack[];
  isLoading: boolean;
}

function Toolbar({ tracks, isLoading }: IToolbarProps) {
  const selectedIds = useTrackStore(state => state.selectedIds);
  const selectAll = useTrackStore(state => state.selectAll);
  const clearAll = useTrackStore(state => state.clearAll);

  const { mutateAsync: deleteTracks } = useDeleteTracks();

  const { filters, setSearch } = useFilters();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const removeSelectedItems = () => {
    deleteTracks(selectedIds).then(() => {
      clearAll();
    });
  };

  const clearSelectedItems = () => clearAll();

  const selectAllItems = () => {
    if (!tracks) return;

    selectAll(tracks.map(track => track.id));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleOpenModal = () => setIsCreateModalOpen(true);

  const handleCloseModal = () => setIsCreateModalOpen(false);

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by title, artist, album"
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full md:w-64 bg-input-background"
            type="search"
          />
          <Filters
            isOpen={isSheetOpen}
            setIsOpen={setIsSheetOpen}
          />
        </div>

        <Button
          onClick={handleOpenModal}
          data-testid="create-track-button"
          disabled={isLoading}
          className="bg-primary rounded active:scale-95 cursor-pointer"
        >
          <Plus /> <span>New Track</span>
        </Button>

        <Suspense fallback={null}>
          <CreateTrackForm
            isOpen={isCreateModalOpen}
            handleClose={handleCloseModal}
          />
        </Suspense>
      </div>

      <div className="flex gap-4 justify-end mt-2">
        {selectedIds.length > 0 && (
          <>
            <Button
              onClick={removeSelectedItems}
              data-testid="bulk-delete-button"
              variant={'destructive'}
              className="rounded active:scale-95 cursor-pointer mt-2"
            >
              <Trash /> <span>Delete</span>
            </Button>
            <Button
              data-testid="clear-selection-button"
              variant={'outline'}
              onClick={clearSelectedItems}
              className="rounded active:scale-95 cursor-pointer mt-2"
            >
              <Eraser /> <span>Clear</span>
            </Button>
          </>
        )}

        <Button
          data-testid="select-all"
          variant={'outline'}
          onClick={selectAllItems}
          disabled={isLoading}
          className="rounded active:scale-95 cursor-pointer mt-2 bg-button"
        >
          <ListCheck /> <span>All</span>
        </Button>
      </div>

      <Pagination />
    </div>
  );
}

export default Toolbar;

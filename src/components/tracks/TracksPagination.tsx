import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectFilters, setPage } from '@/features/filters/filtersSlice';
import { fetchTracks } from '@/features/tracks/trackThunks';
import { twMerge } from 'tailwind-merge';
import { selectTracks } from '@/features/tracks/tracksSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, meta } = useAppSelector(selectTracks);
  const filters = useAppSelector(selectFilters);
  const { page } = filters;

  const updateUrlParams = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (meta.totalPages || 1) && !isLoading) {
      dispatch(setPage(newPage));
      updateUrlParams(newPage);
      dispatch(fetchTracks());
    }
  };

  const handleNext = () => {
    if (page < (meta.totalPages || 1) && !isLoading) {
      handlePageChange(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1 && !isLoading) {
      handlePageChange(page - 1);
    }
  };

  if (!meta.totalPages || meta.totalPages <= 1) {
    return null;
  }

  return (
    <nav
      data-testid='pagination'
      className='flex items-center justify-center gap-2 select-none'
      role='navigation'
      aria-label='Pagination Navigation'
    >
      <button
        onClick={handlePrev}
        disabled={page <= 1 || isLoading}
        data-testid='pagination-prev'
        className={twMerge(
          'size-8 flex items-center justify-center rounded-full border border-muted transition-all duration-200',
          page <= 1 || isLoading
            ? ''
            : 'hover:text-primary hover:border-primary cursor-pointer'
        )}
        aria-label='Go to previous page'
      >
        <ChevronLeft className='size-4' />
      </button>

      <div className='text-sm text-muted font-medium min-w-[3rem] text-center'>
        <span
          aria-live='polite'
          aria-label={`Page ${page} of ${meta.totalPages}`}
        >
          {page}/{meta.totalPages}
        </span>
      </div>

      <button
        onClick={handleNext}
        disabled={page >= (meta.totalPages || 1) || isLoading}
        data-testid='pagination-next'
        className={twMerge(
          'size-8 flex items-center justify-center rounded-full border border-muted transition-all duration-200',
          page >= (meta.totalPages || 1) || isLoading
            ? ''
            : 'hover:text-primary hover:border-primary cursor-pointer'
        )}
        aria-label='Go to next page'
      >
        <ChevronRight className='size-4' />
      </button>
    </nav>
  );
}

export default Pagination;

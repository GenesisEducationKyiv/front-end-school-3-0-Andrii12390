import { useAppSelector } from '@/app/hooks';
import { twMerge } from 'tailwind-merge';
import { selectTracks } from '@/features/tracks/tracksSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFilters } from '@/hooks/useFilters';
import { useEffect } from 'react';

function Pagination() {
  const { setPage, applyFilters, filters } = useFilters();
  const { isLoading, meta } = useAppSelector(selectTracks);

  const { page } = filters;

  useEffect(() => {
    applyFilters();
  }, [filters.page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (meta.totalPages || 1) && !isLoading) {
      setPage(newPage);
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

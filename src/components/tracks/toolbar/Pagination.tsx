import { twMerge } from 'tailwind-merge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePagination } from '@/hooks/usePagination';

function Pagination() {
  const { isLoading, page, handleNext, handlePrev, totalPages } = usePagination();

  if (isLoading || totalPages <= 1) return null;

  return (
    <nav
      data-testid="pagination"
      className="flex items-center justify-center gap-2 select-none"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        onClick={handlePrev}
        disabled={page <= 1 || isLoading}
        data-testid="pagination-prev"
        className={twMerge(
          'size-8 flex items-center justify-center rounded-full border border-muted transition-all duration-200',
          page <= 1 || isLoading ? '' : 'hover:text-primary hover:border-primary cursor-pointer',
        )}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="size-4" />
      </button>

      <div className="text-sm text-muted font-medium min-w-[3rem] text-center">
        <span
          aria-live="polite"
          aria-label={`Page ${page} of ${totalPages}`}
        >
          {page}/{totalPages}
        </span>
      </div>

      <button
        onClick={handleNext}
        disabled={page >= (totalPages || 1) || isLoading}
        data-testid="pagination-next"
        className={twMerge(
          'size-8 flex items-center justify-center rounded-full border border-muted transition-all duration-200',
          page >= (totalPages || 1) || isLoading
            ? ''
            : 'hover:text-primary hover:border-primary cursor-pointer',
        )}
        aria-label="Go to next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}

export default Pagination;

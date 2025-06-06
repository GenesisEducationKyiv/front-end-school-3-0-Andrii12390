import { useAppSelector } from '@/app/hooks';
import { selectTracks } from '@/features/tracks/tracksSlice';
import { useEffect } from 'react';
import { useFilters } from './useFilters';

export const usePagination = () => {
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

  return {
    isLoading,
    page,
    handleNext,
    handlePrev,
    totalPages: meta.totalPages,
  };
};

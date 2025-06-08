import { useAppSelector } from '@/app/hooks';
import { selectTracks } from '@/features/tracks/tracksSlice';
import { useFilters } from './useFilters';

export const usePagination = () => {
  const { setPage, filters } = useFilters();
  const { isLoading, meta } = useAppSelector(selectTracks);

  const { page } = filters;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (meta.totalPages || 1) && !isLoading) {
      setPage(newPage);
    }
  };

  const handleNext = () => {
    handlePageChange(page + 1);
  };

  const handlePrev = () => {
    handlePageChange(page - 1);
  };

  return {
    isLoading,
    page,
    handleNext,
    handlePrev,
    totalPages: meta.totalPages,
  };
};

import { useTracks } from '@/api/tracks/hooks';
import { useFilters } from './useFilters';

export const usePagination = () => {
  const { setPage, filters } = useFilters();
  const { data, isLoading } = useTracks();

  const { page } = filters;
  const totalPages = data?.meta?.totalPages ?? 1;

  const handlePageChange = (newPage: number) => {
    if (!isLoading && newPage >= 1 && newPage <= totalPages) {
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
    totalPages,
    handleNext,
    handlePrev,
  };
};

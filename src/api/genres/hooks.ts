import { useQuery } from '@tanstack/react-query';
import { getGenres } from '.';

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });
};

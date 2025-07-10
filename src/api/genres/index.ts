import { safeApi, api } from '@/lib/api';
import { GenresResponseSchema } from '@/lib/schemas';

export const getGenres = async () => {
  return safeApi<string[]>(api.get<string[]>('/api/genres'), GenresResponseSchema);
};

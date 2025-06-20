import { type FiltersState } from '@/features/filters/filtersSlice';
import { FiltersQuerySchema } from '../schemas';
import { pipe, D, O } from '@mobily/ts-belt';

export const buildQueryParams = (filters: FiltersState): string => {
  return pipe(
    filters,
    D.filterWithKey(
      (_key, val) => val != null && String(val) !== ''
    ),
    D.mapWithKey((_, val) => String(val)),
    (pairs) => new URLSearchParams(pairs).toString()
  );
};

export function parseQueryParams(queryString: string): Partial<FiltersState> {
  const raw = Object.fromEntries(new URLSearchParams(queryString));
  const parsed = FiltersQuerySchema.safeParse(raw);

  return pipe(
    O.fromNullable(parsed.success ? parsed.data : null),
    O.match(
      (data) => data,
      () => ({})
    )
  );
}

export const validateAudioFile = (file: File): string | null => {
  const maxSizeMB = 10;
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp3'];

  if (!allowedTypes.includes(file.type)) {
    return 'Only MP3 or WAV files are allowed';
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `File size should be less than ${maxSizeMB}MB`;
  }
  return null;
};

export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

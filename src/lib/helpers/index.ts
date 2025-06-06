import {
  initialState,
  type FiltersState,
  type TField,
  type TOrder,
} from '@/features/filters/filtersSlice';

export const buildQueryParams = (filters: FiltersState): string => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== null &&
      value !== undefined &&
      value !== initialState[key as keyof FiltersState]
    ) {
      params.set(key, value.toString());
    }
  });

  return params.toString();
};

export const parseQueryParams = (): Partial<FiltersState> => {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get('search') || '',
    order: (params.get('order') as TOrder) || null,
    sort: (params.get('sort') as TField) || null,
    genre: params.get('genre') || null,
    artist: params.get('artist') || null,
    page: params.get('page') ? Number(params.get('page')) : 1,
    limit: params.get('limit') ? Number(params.get('limit')) : 10,
  };
};

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

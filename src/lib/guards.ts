import type { TField, TOrder } from '@/features/filters/filtersSlice';
import type { ApiError } from '@/types';

export const isTField = (value: string): value is TField => {
  return ['title', 'artist', 'album', 'createdAt'].includes(value);
};

export const isTOrder = (value: string): value is TOrder => {
  return ['asc', 'desc'].includes(value);
};

export const isApiError = (payload: unknown): payload is ApiError => {
  return (
    typeof payload === 'object' && payload !== null && 'message' in payload
  );
};

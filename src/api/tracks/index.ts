import { api, safeApi } from '@/lib/api';
import { buildQueryParams } from '@/lib/helpers';
import {
  type TMetaData,
  type TTrack,
  TrackListResponseSchema,
  TrackResponseSchema,
} from '@/lib/schemas';
import { useFiltersStore } from '@/store/useFiltersStore';

export const getTracks = async () => {
  const queryString = buildQueryParams(useFiltersStore.getState().filters);

  return safeApi<{ data: TTrack[]; meta: TMetaData }>(
    api.get<{ data: TTrack[]; meta: TMetaData }>(`/api/tracks?${queryString}`),
    TrackListResponseSchema,
  );
};

export const createTrack = async (data: Omit<TTrack, 'id' | 'slug'>) => {
  return safeApi<TTrack>(api.post<TTrack>('/api/tracks', data), TrackResponseSchema);
};

export const deleteTrack = async (id: string) => {
  return safeApi<string>(api.delete<string>(`/api/tracks/${id}`));
};

export const editTrack = async (data: Partial<TTrack>) => {
  return safeApi<TTrack>(api.put<TTrack>(`/api/tracks/${data.id}`, data), TrackResponseSchema);
};

export const uploadTrackFile = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return safeApi<TTrack>(
    api.post<TTrack>(`/api/tracks/${id}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
    TrackResponseSchema,
  );
};

export const deleteTrackFile = async (id: string) => {
  return safeApi<TTrack>(api.delete<TTrack>(`/api/tracks/${id}/file`), TrackResponseSchema);
};

export const deleteTracks = async (ids: string[]) => {
  return safeApi<string[]>(api.post<string[]>('/api/tracks/delete', { ids }));
};

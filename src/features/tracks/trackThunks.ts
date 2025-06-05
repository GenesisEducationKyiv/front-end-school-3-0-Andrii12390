import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { api, safeApi } from '@/lib/api';
import type { ApiError } from '@/types';
import {
  type TMetaData,
  type TTrack,
  TrackListResponseSchema,
  TrackResponseSchema,
} from '@/lib/schemas';

export const createTrack = createAsyncThunk<
  TTrack,
  Omit<TTrack, 'id' | 'slug'>,
  { rejectValue: ApiError }
>('tracks/create', async (data, { rejectWithValue }) => {
  const result = await safeApi<TTrack>(
    api.post<TTrack>('/api/tracks', data),
    TrackResponseSchema
  );

  if (result.isErr()) {
    return rejectWithValue(result.error);
  }

  return result.value.data;
});

export const fetchTracks = createAsyncThunk<
  { data: TTrack[]; meta: TMetaData },
  void,
  { state: RootState; rejectValue: ApiError }
>('tracks/fetchAll', async (_, { getState, rejectWithValue }) => {
  const { filters } = getState();
  const params: Record<string, string | number> = {
    page: filters.page,
    limit: filters.limit,
  };
  if (filters.sort?.field) params.sort = filters.sort.field;
  if (filters.sort?.order) params.order = filters.sort.order;
  if (filters.search.trim()) params.search = filters.search.trim();
  if (filters.genre.trim()) params.genre = filters.genre.trim();

  const result = await safeApi<{ data: TTrack[]; meta: TMetaData }>(
    api.get<{ data: TTrack[]; meta: TMetaData }>('/api/tracks', { params }),
    TrackListResponseSchema
  );

  if (result.isErr()) {
    return rejectWithValue(result.error);
  }

  const { data, meta } = result.value.data;

  return { data, meta };
});

export const deleteTrack = createAsyncThunk<
  string,
  string,
  { rejectValue: ApiError }
>('tracks/deleteOne', async (id, { rejectWithValue }) => {
  const result = await safeApi<TTrack>(api.delete<TTrack>(`/api/tracks/${id}`));

  if (result.isErr()) {
    return rejectWithValue(result.error);
  }

  return id;
});

export const editTrack = createAsyncThunk<
  TTrack,
  Omit<TTrack, 'slug'>,
  { rejectValue: ApiError }
>('tracks/edit', async (data, { rejectWithValue }) => {
  const result = await safeApi<TTrack>(
    api.put<TTrack>(`/api/tracks/${data.id}`, data),
    TrackResponseSchema
  );

  if (result.isErr()) {
    return rejectWithValue(result.error);
  }

  return result.value.data;
});

export const uploadTrackFile = createAsyncThunk<
  TTrack,
  { id: string; file: File },
  { rejectValue: ApiError }
>('tracks/uploadFile', async ({ id, file }, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('file', file);

  const result = await safeApi<TTrack>(
    api.post<TTrack>(`/api/tracks/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  );

  if (result.isErr()) {
    return rejectWithValue(result.error);
  }

  return result.value.data;
});

export const deleteTrackFile = createAsyncThunk<
  TTrack,
  string,
  { rejectValue: ApiError }
>('tracks/deleteFile', async (id, { rejectWithValue }) => {
  const result = await safeApi<TTrack>(
    api.delete<TTrack>(`/api/tracks/${id}/file`),
    TrackResponseSchema
  );

  if (result.isErr()) {
    return rejectWithValue(result.error);
  }

  return result.value.data;
});

export const setActiveTrack = createAsyncThunk<TTrack, TTrack>(
  'tracks/setActiveTrack',
  async (track) => track
);

export const bulkDeleteTracks = createAsyncThunk<
  string[],
  string[],
  { rejectValue: ApiError }
>('tracks/bulkDelete', async (ids, { rejectWithValue }) => {
  const result = await safeApi<TTrack[]>(
    api.post<TTrack[]>('/api/tracks/delete', { ids })
  );

  if (result.isErr()) {
    return rejectWithValue(result.error);
  }

  return ids;
});

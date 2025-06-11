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
import { buildQueryParams } from '@/lib/helpers';
import { R } from '@mobily/ts-belt';

export const createTrack = createAsyncThunk<
  TTrack,
  Omit<TTrack, 'id' | 'slug'>,
  { rejectValue: ApiError }
>('tracks/create', async (data, { rejectWithValue }) => {
  const result = await safeApi<TTrack>(
    api.post<TTrack>('/api/tracks', data),
    TrackResponseSchema
  );

  if (R.isError(result)) {
    return rejectWithValue(result._0);
  }

  return result._0.data;
});

export const fetchTracks = createAsyncThunk<
  { data: TTrack[]; meta: TMetaData },
  void,
  { state: RootState; rejectValue: ApiError }
>('tracks/fetchAll', async (_, { getState, rejectWithValue }) => {
  const { filters } = getState();

  const queryString = buildQueryParams(filters);

  const result = await safeApi<{ data: TTrack[]; meta: TMetaData }>(
    api.get<{ data: TTrack[]; meta: TMetaData }>(`/api/tracks?${queryString}`),
    TrackListResponseSchema
  );

  if (R.isError(result)) {
    return rejectWithValue(result._0);
  }

  const { data, meta } = result._0.data;

  return { data, meta };
});

export const deleteTrack = createAsyncThunk<
  string,
  string,
  { rejectValue: ApiError }
>('tracks/deleteOne', async (id, { rejectWithValue }) => {
  const result = await safeApi<TTrack>(api.delete<TTrack>(`/api/tracks/${id}`));

  if (R.isError(result)) {
    return rejectWithValue(result._0);
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

  if (R.isError(result)) {
    return rejectWithValue(result._0);
  }

  return result._0.data;
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

  if (R.isError(result)) {
    return rejectWithValue(result._0);
  }

  return result._0.data;
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

  if (R.isError(result)) {
    return rejectWithValue(result._0);
  }

  return result._0.data;
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

  if (R.isError(result)) {
    return rejectWithValue(result._0);
  }

  return ids;
});

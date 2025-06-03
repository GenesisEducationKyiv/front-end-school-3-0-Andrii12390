import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TTrack } from '@/types';
import type { RootState } from '@/app/store';
import type { IMetaData } from './tracksSlice';
import { api, safeApi } from '@/lib/api';
import type { ApiError } from '@/types';

export const createTrack = createAsyncThunk<
  TTrack,
  Omit<TTrack, 'id'>,
  { rejectValue: ApiError }
>('tracks/create', async (data, { rejectWithValue }) => {
  const result = await safeApi<TTrack>(api.post<TTrack>('/api/tracks', data));

  if (result.isErr()) {
    return rejectWithValue(result.error);
  }

  const { data: track } = result.value;

  return track;
});

export const fetchTracks = createAsyncThunk<
  { data: TTrack[]; meta: IMetaData },
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

  const result = await safeApi<{ data: TTrack[]; meta: IMetaData }>(
    api.get<{ data: TTrack[]; meta: IMetaData }>('/api/tracks', { params })
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
  TTrack,
  { rejectValue: ApiError }
>('tracks/edit', async (data, { rejectWithValue }) => {
  const result = await safeApi<TTrack>(
    api.put<TTrack>(`/api/tracks/${data.id}`, data)
  );

  if (result.isErr()) {
    return rejectWithValue(result.error);
  }

  const { data: updated } = result.value;

  return updated;
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

  const { data: updated } = result.value;

  return updated;
});

export const deleteTrackFile = createAsyncThunk<
  TTrack,
  string,
  { rejectValue: ApiError }
>('tracks/deleteFile', async (id, { rejectWithValue }) => {
  const result = await safeApi<TTrack>(
    api.delete<TTrack>(`/api/tracks/${id}/file`)
  );

  if (result.isErr()) {
    return rejectWithValue(result.error);
  }

  const { data: updated } = result.value;

  return updated;
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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTrack,
  deleteTrack,
  deleteTrackFile,
  deleteTracks,
  editTrack,
  getTracks,
  uploadTrackFile,
} from '.';
import { type TTrack } from '@/lib/schemas';
import { type ApiError } from '@/types';
import { customToast } from '@/components/ui/toasts';

export const useTracks = () => {
  return useQuery({
    queryKey: ['tracks'],
    queryFn: getTracks,
  });
};

export const useCreateTrack = () => {
  const queryClient = useQueryClient();

  return useMutation<TTrack, ApiError, Omit<TTrack, 'id' | 'slug'>>({
    mutationFn: data => createTrack(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      customToast.success('Track successfully created!');
    },
    onError: error => {
      customToast.error(error.message || 'Failed to create track');
    },
  });
};

export const useDeleteTrack = () => {
  const queryClient = useQueryClient();

  return useMutation<string, ApiError, string>({
    mutationFn: id => deleteTrack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      customToast.success('Track successfully deleted!');
    },
    onError: error => {
      customToast.error(error.message || 'Failed to delete track');
    },
  });
};

export const useEditTrack = () => {
  const queryClient = useQueryClient();

  return useMutation<TTrack, ApiError, Partial<TTrack>>({
    mutationFn: data => editTrack(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      customToast.success('Track successfully updated!');
    },
    onError: error => {
      customToast.error(error.message || 'Failed to update track');
    },
  });
};

export const useUploadTrackFile = () => {
  const queryClient = useQueryClient();

  return useMutation<TTrack, ApiError, { id: string; file: File }>({
    mutationFn: ({ id, file }) => uploadTrackFile(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      customToast.success('File successfully uploaded!');
    },
    onError: error => {
      customToast.error(error.message || 'Failed to upload file');
    },
  });
};

export const useDeleteTrackFile = () => {
  const queryClient = useQueryClient();

  return useMutation<TTrack, ApiError, string>({
    mutationFn: id => deleteTrackFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      customToast.success('File successfully deleted!');
    },
    onError: error => {
      customToast.error(error.message || 'Failed to delete file');
    },
  });
};

export const useDeleteTracks = () => {
  const queryClient = useQueryClient();

  return useMutation<string[], ApiError, string[]>({
    mutationFn: ids => deleteTracks(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      customToast.success('Tracks successfully deleted!');
    },
    onError: error => {
      customToast.error(error.message || 'Failed to delete tracks');
    },
  });
};

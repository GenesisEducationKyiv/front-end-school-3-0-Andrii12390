import { z } from 'zod';

export const TrackFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title cannot be longer than 50 characters'),
  artist: z
    .string()
    .min(1, 'Artist is required')
    .max(50, "Artist's name cannot be longer than 50 characters"),
  album: z.string().max(50, 'Album name cannot be longer than 50 characters').optional(),
  coverImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  genres: z.array(z.string()).min(1, 'Select at least one genre'),
});

export const GenresResponseSchema = z.array(z.string());

export const TrackResponseSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty(),
  artist: z.string().nonempty(),
  album: z.string().optional(),
  genres: z.array(z.string()),
  slug: z.string().nonempty(),
  coverImage: z.string().optional(),
  audioFile: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const TrackMetadataResponse = z.object({
  total: z.number().nonnegative(),
  page: z.number().nonnegative(),
  limit: z.number().nonnegative(),
  totalPages: z.number().nonnegative(),
});

export const TrackListResponseSchema = z.object({
  data: z.array(TrackResponseSchema),
  meta: TrackMetadataResponse,
});

export const FiltersQuerySchema = z.object({
  search: z.string().optional().default(''),
  sort: z.enum(['title', 'artist', 'album', 'createdAt']).nullable().default(null),
  order: z.enum(['asc', 'desc']).nullable().default(null),
  genre: z.string().nullable().default(null),
  artist: z.string().nullable().default(null),
  page: z.preprocess(
    val => (typeof val === 'string' && !isNaN(+val) ? parseInt(val, 10) : undefined),
    z.number().int().min(1).default(1),
  ),
  limit: z.preprocess(
    val => (typeof val === 'string' && !isNaN(+val) ? parseInt(val, 10) : undefined),
    z.number().int().min(1).default(10),
  ),
});

export type TTrack = z.infer<typeof TrackResponseSchema>;
export type TMetaData = z.infer<typeof TrackMetadataResponse>;
export type TTrackForm = z.infer<typeof TrackFormSchema>;

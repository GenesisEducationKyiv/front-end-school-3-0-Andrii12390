import z from 'zod';

export const trackFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title cannot be longer than 50 characters'),
  artist: z
    .string()
    .min(1, 'Artist is required')
    .max(50, "Artist's name cannot be longer than 50 characters"),
  album: z
    .string()
    .max(50, 'Album name cannot be longer than 50 characters')
    .optional(),
  coverImage: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  genres: z.array(z.string()).min(1, 'Select at least one genre'),
});


export type TTrackForm = z.infer<typeof trackFormSchema>;

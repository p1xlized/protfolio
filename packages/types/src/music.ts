import { z } from 'zod';

export const TrackSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  audioUrl: z.string(),
  duration: z.number().nullable(),
  trackNumber: z.number().nullable(),
  albumId: z.number(),
});
export type Track = z.infer<typeof TrackSchema>;

export const AlbumSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  releaseDate: z.date().or(z.string()), // Drizzle handles timestamp as Date, API sends as string
  coverUrl: z.string().nullable(),
  genre: z.string().nullable(),
  tracks: z.array(TrackSchema).optional(), // For relations
});
export type Album = z.infer<typeof AlbumSchema>;
export const AlbumWithTracksSchema = AlbumSchema.extend({
  tracks: z.array(TrackSchema), // Overwrites the .optional() from AlbumSchema to be required
});

// Generate the type
export type AlbumWithTracks = z.infer<typeof AlbumWithTracksSchema>;

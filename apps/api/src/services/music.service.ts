import { db, albums, tracks } from "@portfolio/db";
import { AlbumWithTracks, AlbumWithTracksSchema } from "@portfolio/types";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const getAllAlbums = async (): Promise<AlbumWithTracks[]> => {
  try {
    const rows = await db
      .select()
      .from(albums)
      .leftJoin(tracks, eq(albums.id, tracks.albumId));

    // 1. Transform flat rows into nested objects
    const grouped = rows.reduce((acc, row) => {
      const album = row.albums;
      const track = row.tracks;

      if (!acc[album.id]) {
        acc[album.id] = {
          ...album,
          // Ensure releaseDate is a Date object if coming from SQLite as timestamp
          releaseDate: new Date(album.releaseDate),
          tracks: []
        };
      }

      if (track) {
        acc[album.id].tracks.push(track);
      }

      return acc;
    }, {} as Record<number, any>);

    const flatResult = Object.values(grouped);

    // 2. Validate and Parse with Zod
    // This ensures the data matches your AlbumWithTracks type perfectly
    return z.array(AlbumWithTracksSchema).parse(flatResult);

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Data validation failed:", error.errors);
    } else {
      console.error("Error fetching albums:", error);
    }
    throw new Error("Failed to fetch albums");
  }
}

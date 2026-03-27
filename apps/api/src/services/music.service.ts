import { db, albums, eq } from "@portfolio/db";

export const getAllAlbums = async () => {
  try {
    const result = await db.select().from(albums);
    console.log("Fetched albums:", result);
    return result || [];
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw new Error("Failed to fetch albums");
  }
}

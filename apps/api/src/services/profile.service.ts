import { db, profiles } from "@portfolio/db";

export const getProfile = async () => {
  try {
    const profile = await db.select().from(profiles);
    console.log("Fetched profile:", profile);
    return profile[0] || null; // Return the profile or null if not found
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
}

import { Elysia } from "elysia";
// Import the actual database client 'db' and the table 'profiles'
import { db, profiles } from "@portfolio/db";
import { count } from "drizzle-orm";
import { getProfile } from "src/services/profile.service";

export const profile = new Elysia({ prefix: "/profile" })
  .get("/", () => {
    try {
      const profile = getProfile();
      return profile;
    }catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error"
      };
    }
  })

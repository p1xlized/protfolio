import { db, testimonials, eq } from "@portfolio/db";

export async function getAllTestimonials() {
  try {
    const result = await db.select().from(testimonials);
    console.log("Fetched testimonials:", result);
    return result || [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw new Error("Failed to fetch testimonials");
  }
}

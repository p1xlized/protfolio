import { db, blogPosts, eq } from "@portfolio/db";

export async function getAllBlogPosts() {
  try {
    const result = await db.select().from(blogPosts);
    console.log("Fetched blog posts:", result);
    return result || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
}
export async function getBlogPostById(id: number) {
  try {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    console.log(`Fetched blog post with id ${id}:`, result);
    return result[0] || null;
  } catch (error) {
    console.error(`Error fetching blog post with id ${id}:`, error);
    throw new Error("Failed to fetch blog post");
  }
}

import Elysia from "elysia";
import { getAllBlogPosts, getBlogPostById } from "src/services/blog.service";
export const blog = new Elysia({ prefix: "/blog" })
  .get("/", () => {
    try {
      const result = getAllBlogPosts();
      return result;
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error"
      };
    }
    })
  .get("/:id", ({ params }) => {
    try {
      const id = parseInt(params.id, 10);
      const result = getBlogPostById(id);
      return result;
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error"
      };
    }
  });

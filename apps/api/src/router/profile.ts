import { Elysia } from "elysia";
import { getAllTestimonials } from "src/services/testimonials.service";
import { getAllProjects } from "src/services/projects.service";
import { getAllAlbums } from "src/services/music.service";

export const profile = new Elysia({ prefix: "/profile" })
  .get("/", async () => {
    try {
      const [testimonials, projects, albums] = await Promise.all([
        getAllTestimonials(),
        getAllProjects(),
        getAllAlbums()

      ]);
      return {
        testimonials: testimonials,
        projects: projects,
        albums: albums
      };
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error"
      };
    }
  });

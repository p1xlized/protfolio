import Elysia from "elysia";
import { getAllProjects, getProjectById } from "src/services/project.service";


export const projects = new Elysia({ prefix: "/projects" })
  .get("/", () => {
    try {
      const result = getAllProjects();
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
      const result = getProjectById(id);
      return result;

      } catch (error) {
        return {
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error"
        };
      }
    });

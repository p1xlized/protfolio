import { db, projects, eq } from "@portfolio/db";

export const getAllProjects = async () => {
  try {
    const result = await db.select().from(projects);
    console.log("Fetched projects:", result);
    return result || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}

export const getProjectById = async (id: number) => {
  try {
    const result = await db.select().from(projects).where(eq(projects.id, id || 0));
    console.log("Fetched project by ID:", result);
    return result[0] || null; // Return the project or null if not found
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw new Error("Failed to fetch project by ID");
  }
}

export * from "./src/projects";
export * from "./src/music";
export * from "./src/testimonials";
export * from "./src/blog";
export * from "./src/contact";

// You can also export a global State type here
import { Project } from "./src/projects";
import { Album } from "./src/music";
import { Testimonial } from "./src/testimonials";

export interface SystemState {
  projects: Project[];
  albums: Album[];
  testimonials: Testimonial[];
}

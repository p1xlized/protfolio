import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  tech: z.string(),
  tag: z.string(),
  role: z.string(),
  date: z.string(),
  cover: z.string(),
  githubUrl: z.string().nullable(),
  projectUrl: z.string().nullable(),
  isVideo: z.boolean(),
  isPersonal: z.boolean(),
  isFeatured: z.boolean(),
  // Matching your mode: "json" fields
  imgs: z.array(z.string()),
  features: z.array(z.string()),
  stack: z.array(z.string()).optional(),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.number()
  })),
  awards: z.array(z.object({
    title: z.string(),
    organization: z.string()
  })).optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

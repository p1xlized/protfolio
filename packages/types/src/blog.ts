import { z } from "zod";

export const BlogPostSchema = z.object({
  id: z.number(),
  img: z.string().nullable(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  published: z.boolean(),
  createdAt: z.date().or(z.string()),
});
export type BlogPost = z.infer<typeof BlogPostSchema>;

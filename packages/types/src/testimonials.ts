import { z } from "zod";


export const TestimonialSchema = z.object({
  id: z.string(),
  author: z.string(),
  role: z.string(),
  project: z.string(),
  date: z.string(),
  content: z.string(),
  hash: z.string(),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;

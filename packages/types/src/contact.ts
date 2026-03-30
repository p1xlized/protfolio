import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  projectType: z.enum(["Software Development", "Design", "Consulting", "Other"], {
    errorMap: () => ({ message: "Please select a project type" }),
  }),
  priority: z.enum(["Standard", "High"], {
    errorMap: () => ({ message: "Please select a priority level" }),
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
export type contactBody = z.infer<typeof ContactSchema>;

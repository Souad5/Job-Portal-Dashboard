// types/job.ts
import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(8, "Job title must be at least 8 characters").max(120),
  type: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
    "Remote",
  ]),
  summary: z
    .string()
    .min(40, "Please provide a more detailed summary (min 40 characters)")
    .max(600),

  companyName: z.string().min(3, "Company name is required").max(100),
  location: z.string().min(2, "Location is required").max(100),
  companyDescription: z
    .string()
    .min(80, "Company description should be at least 80 characters")
    .max(1500),

  experience: z.string().min(1, "Experience level is required"),
  education: z.string().optional(),
  skills: z.string().min(30, "Please list key required skills").max(800),
  niceToHave: z.string().max(600).optional(),
});
export type JobFormValues = z.infer<typeof jobSchema>;

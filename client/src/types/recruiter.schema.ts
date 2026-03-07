import { z } from "zod";

export const recruiterSchema = z
  .object({
    recruiterName: z
      .string()
      .min(2, "Recruiter name must be at least 2 characters"),
    recruiterEmail: z
      .string()
      .email("Please enter a valid email")
      .endsWith(".com", { message: "Email must end with .com" }),
    temPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })

  .refine((data) => data.temPassword === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export type RecruiterFormValues = z.infer<typeof recruiterSchema>;

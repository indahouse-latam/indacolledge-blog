import { z } from "zod";

export const courseFormSchema = z.object({
  title: z.string().min(3).max(100),
  categories: z.string().min(3),
  mainImage: z.string().url(),
  body: z.string(),
});

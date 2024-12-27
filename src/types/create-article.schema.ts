import { courseFormSchema } from "@/lib/schemas/create-article-form-schema";
import { z } from "zod";

export type CreateArticleFormType = z.infer<typeof courseFormSchema>;

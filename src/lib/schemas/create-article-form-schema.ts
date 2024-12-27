import { z } from "zod";

export const courseFormSchema = z.object({
  title: z.string().min(3).max(100),
  categories: z.string().min(3),
  mainImage: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        console.log(res.headers);

        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }),
  body: z.string(),
});

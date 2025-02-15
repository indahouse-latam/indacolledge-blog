import { z } from "zod";

export const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "publisher", "viewer"]),
  locale: z.string().optional(),
});

export type InviteFormType = z.infer<typeof inviteSchema>;

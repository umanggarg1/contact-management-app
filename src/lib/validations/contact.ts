import { z } from "zod";

export const createContactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  userId: z.string(),
});
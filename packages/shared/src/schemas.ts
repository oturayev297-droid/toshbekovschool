import { z } from "zod";

// Umumiy Zod sxemalar — web, api va bot shu yerdan import qiladi.
export const HealthSchema = z.object({
  status: z.enum(["ok", "error"]),
  db: z.enum(["ok", "error"]),
  time: z.string(),
});
export type Health = z.infer<typeof HealthSchema>;

export const StudentSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(2),
  phone: z.string().regex(/^\+998\d{9}$/, "Telefon +998XXXXXXXXX formatida bo'lishi kerak"),
  telegramId: z.number().int().optional(),
  createdAt: z.coerce.date(),
});
export type Student = z.infer<typeof StudentSchema>;

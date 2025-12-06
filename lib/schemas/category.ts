// src/lib/schemas/category.ts
import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string({message: "Le nom est requis." })
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(50, "Le nom ne doit pas dépasser 50 caractères.")
    .trim()
    .refine((val) => val.length > 0, "Le nom ne peut pas être vide."),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
import { z } from "zod";

export const accountTypeSchema = z.enum(["google", "onedrive", "dropbox"]);

export type AccountType = z.infer<typeof accountTypeSchema>;

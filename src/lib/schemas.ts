import { z } from "zod";

export const accountTypeSchema = z.enum([
  "google_drive",
  "one_drive",
  "dropbox",
]);

export type AccountType = z.infer<typeof accountTypeSchema>;

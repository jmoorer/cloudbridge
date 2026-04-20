import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { session, user } from "./auth-schema";

export * from "./auth-schema";

export const connectedAccount = sqliteTable(
  "connected_account",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // Provider info
    provider: text("provider", {
      enum: ["google", "dropbox", "onedrive"],
    }).notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    providerEmail: text("provider_email"),

    // User-facing label ("Work Drive", "School", etc.)
    label: text("label"),

    // OAuth tokens (encrypt before writing, decrypt after reading)
    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token"),
    tokenExpiresAt: integer("token_expires_at", { mode: "timestamp" }),

    // Granted OAuth scopes (comma-separated)
    scopes: text("scopes"),

    connectedAt: integer("connected_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    // Prevent connecting the same exact provider account twice
    uniqueIndex("unique_user_provider_account").on(
      table.userId,
      table.provider,
      table.providerAccountId,
    ),
  ],
);

export const pinnedFile = sqliteTable("pinned_file", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  connectedAccountId: text("connected_account_id")
    .notNull()
    .references(() => connectedAccount.id, { onDelete: "cascade" }),

  // Denormalized for fast dashboard queries
  provider: text("provider", {
    enum: ["google", "dropbox", "onedrive"],
  }).notNull(),

  // Provider's native file identifier
  fileId: text("file_id").notNull(),
  fileName: text("file_name").notNull(),
  mimeType: text("mime_type"),

  pinnedAt: integer("pinned_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// ============================================================
// Type exports
// ============================================================

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type ConnectedAccount = typeof connectedAccount.$inferSelect;
export type NewConnectedAccount = typeof connectedAccount.$inferInsert;
export type PinnedFile = typeof pinnedFile.$inferSelect;
export type NewPinnedFile = typeof pinnedFile.$inferInsert;

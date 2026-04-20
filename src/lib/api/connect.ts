import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";
import { redirect } from "@tanstack/react-router";
import { eq, and } from "drizzle-orm";
import { authMiddleware } from "./middleware";
import { buildGoogleAuthUrl } from "#/lib/providers/google";
import { accountTypeSchema } from "../schemas";
import { db } from "#/lib/db";
import { connectedAccount } from "#/lib/db/schema";
import type { ConnectedAccount } from "#/lib/db/schema";
import z from "zod";

// ── URL builders ───────────────────────────────────────────────────────────────

const authUrlBuilders: Record<string, (state: string) => string> = {
  google: buildGoogleAuthUrl,
  dropbox: () => {
    throw new Error("Dropbox not yet implemented");
  },
  onedrive: () => {
    throw new Error("OneDrive not yet implemented");
  },
};

// ── Server functions ───────────────────────────────────────────────────────────

export const connectAccountFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ type: accountTypeSchema }))
  .handler(async ({ context, data }) => {
    const state = Buffer.from(
      JSON.stringify({
        userId: context.user.id,
        csrf: nanoid(),
      }),
    ).toString("base64url");

    const url = authUrlBuilders[data.type](state);
    throw redirect({ href: url });
  });

export const getConnectedAccountsFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<ConnectedAccount[]> => {
    return db.query.connectedAccount.findMany({
      where: eq(connectedAccount.userId, context.user.id),
      orderBy: (t, { asc }) => asc(t.connectedAt),
    });
  });

export const disconnectAccountFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ accountId: z.string() }))
  .handler(async ({ context, data }) => {
    await db
      .delete(connectedAccount)
      .where(
        and(
          eq(connectedAccount.id, data.accountId),
          eq(connectedAccount.userId, context.user.id),
        ),
      );
  });

export const updateAccountLabelFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ accountId: z.string(), label: z.string().max(64) }))
  .handler(async ({ context, data }) => {
    await db
      .update(connectedAccount)
      .set({ label: data.label, updatedAt: new Date() })
      .where(
        and(
          eq(connectedAccount.id, data.accountId),
          eq(connectedAccount.userId, context.user.id),
        ),
      );
  });

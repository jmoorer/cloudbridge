import { eq, and } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { db } from "./index";
import { connectedAccount } from "./schema";
import type { AccountType } from "#/lib/schemas";

export type OAuthCallbackData = {
  userId: string;
  provider: AccountType;
  providerAccountId: string;
  providerEmail?: string | null;
  accessToken: string;
  refreshToken?: string | null;
  tokenExpiresAt: Date;
  scopes: string;
};

export async function upsertConnectedAccount(
  data: OAuthCallbackData,
): Promise<void> {
  const existing = await db.query.connectedAccount.findFirst({
    where: and(
      eq(connectedAccount.userId, data.userId),
      eq(connectedAccount.provider, data.provider),
      eq(connectedAccount.providerAccountId, data.providerAccountId),
    ),
  });

  if (existing) {
    await db
      .update(connectedAccount)
      .set({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken ?? existing.refreshToken,
        tokenExpiresAt: data.tokenExpiresAt,
        scopes: data.scopes,
        updatedAt: new Date(),
      })
      .where(eq(connectedAccount.id, existing.id));
  } else {
    await db.insert(connectedAccount).values({
      id: createId(),
      userId: data.userId,
      provider: data.provider,
      providerAccountId: data.providerAccountId,
      providerEmail: data.providerEmail,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tokenExpiresAt: data.tokenExpiresAt,
      scopes: data.scopes,
      label: data.provider,
    });
  }
}

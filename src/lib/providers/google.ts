import { createHmac } from "crypto";
import { env } from "#/lib/env";
import { upsertConnectedAccount } from "#/lib/db/connected-accounts";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

const REDIRECT_URI = `${env.BETTER_AUTH_URL}/api/connect/google/callback`;

const SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/drive",
];

export type GoogleTokens = {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope: string;
};

export type GoogleUserInfo = {
  id: string;
  email: string;
  name: string;
  picture: string;
};

export function buildGoogleAuthUrl(state: string): string {
  const signedState = signState(state);
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent select_account",
    state: signedState,
  });
  return `${GOOGLE_AUTH_URL}?${params}`;
}

export async function exchangeGoogleCode(code: string): Promise<GoogleTokens> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google token exchange failed: ${err}`);
  }
  return res.json();
}

export async function getGoogleUserInfo(
  accessToken: string,
): Promise<GoogleUserInfo> {
  const res = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Google userinfo failed: ${res.status}`);
  return res.json();
}

export function verifyGoogleState(signedState: string): {
  userId: string;
  csrf: string;
} {
  const lastDot = signedState.lastIndexOf(".");
  if (lastDot === -1) throw new Error("Invalid state format");
  const payload = signedState.slice(0, lastDot);
  const sig = signedState.slice(lastDot + 1);
  const expected = createHmac("sha256", env.BETTER_AUTH_SECRET)
    .update(payload)
    .digest("base64url");
  if (sig !== expected) throw new Error("Invalid state signature");
  return JSON.parse(Buffer.from(payload, "base64url").toString());
}

function signState(payload: string): string {
  const sig = createHmac("sha256", env.BETTER_AUTH_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export async function processGoogleCallback(
  code: string,
  signedState: string,
): Promise<void> {
  const { userId } = verifyGoogleState(signedState);
  const tokens = await exchangeGoogleCode(code);
  const userInfo = await getGoogleUserInfo(tokens.access_token);

  await upsertConnectedAccount({
    userId,
    provider: "google",
    providerAccountId: userInfo.id,
    providerEmail: userInfo.email,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    tokenExpiresAt: new Date(Date.now() + tokens.expires_in * 1000),
    scopes: tokens.scope,
  });
}

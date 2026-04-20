import { processGoogleCallback } from "#/lib/providers/google";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/connect/google/callback")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        const error = url.searchParams.get("error");

        const failUrl = new URL(
          "/bridge?error=google_oauth_failed",
          url.origin,
        ).toString();

        if (error || !code || !state) {
          return Response.redirect(failUrl, 302);
        }

        try {
          await processGoogleCallback(code, state);
        } catch {
          return Response.redirect(failUrl, 302);
        }

        return Response.redirect(
          new URL("/bridge?connected=google", url.origin).toString(),
          302,
        );
      },
    },
  },
});

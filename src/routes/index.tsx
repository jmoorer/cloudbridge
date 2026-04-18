import { Button } from "#/components/ui/button";
import { deleteSession } from "#/lib/api/session";
import { auth } from "#/lib/auth";
import { authClient } from "#/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";

import { createServerFn, useServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });
  return session;
});

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => {
    const seession = await getSession();
    return seession;
  },
});

function App() {
  const data = Route.useLoaderData();
  const signOut = useServerFn(deleteSession);
  const signIn = () =>
    authClient.signIn.social({
      provider: "google",
    });
  return (
    <div className="p-4">
      <pre>{JSON.stringify({ session: data }, null, 2)}</pre>

      {!data ? (
        <Button onClick={() => signIn()}>Sign in</Button>
      ) : (
        <Button onClick={() => signOut()}>Sign out</Button>
      )}
    </div>
  );
}

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
  const buttonClassName = "bg-amber-500 px-1 py-2";
  return (
    <div className="p-4">
      <pre>{JSON.stringify({ session: data }, null, 2)}</pre>

      {!data ? (
        <button className={buttonClassName} onClick={() => signIn()}>
          Sign in
        </button>
      ) : (
        <button className={buttonClassName} onClick={() => signOut()}>
          Sign out
        </button>
      )}
    </div>
  );
}

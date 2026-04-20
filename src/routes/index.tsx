import { DropboxIcon } from "#/components/DropboxIcon";
import { GoogleIcon } from "#/components/GoogleIcon";
import { OneDriveIcon } from "#/components/OneDriveIcon";
import { LogoIcon } from "#/components/Logo";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { deleteSession } from "#/lib/api/session";
import { auth } from "#/lib/auth";
import { authClient } from "#/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { createServerFn, useServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });
  return session;
});

export const Route = createFileRoute("/")({
  component: App,
  beforeLoad: async () => {
    const session = await getSession();
    if (session) {
      throw redirect({
        to: "/bridge",
      });
    }
  },
});

function App() {
  const signIn = () =>
    authClient.signIn.social({
      provider: "google",
    });
  return (
    <div className=" bg-background h-screen flex flex-col items-center justify-center gap-6">
      <div className="grid place-items-center gap-3">
        <LogoIcon size={60} />
        <h1 className="text-3xl font-bold"> Cloud bridge</h1>
        <span className="text-muted-foreground">
          All your cloud files. One place.
        </span>
      </div>
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <CardTitle>Sign in to continue</CardTitle>
          <CardDescription>
            Connect your cloud providers to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button size="lg" variant="outline" onClick={signIn}>
            <GoogleIcon />
            Continue in with Google
          </Button>
          <Button size="lg" variant="outline" onClick={signIn}>
            <DropboxIcon />
            Continue in with Dropbox
          </Button>
          <Button size="lg" variant="outline" onClick={signIn}>
            <OneDriveIcon />
            Continue in with OneDrive
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

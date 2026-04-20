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
import { getSessionFn } from "#/lib/api/session";
import { authClient } from "#/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  beforeLoad: async () => {
    const session = await getSessionFn();
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

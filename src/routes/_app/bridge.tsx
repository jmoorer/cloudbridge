import { requireSession } from "#/lib/api/session";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/bridge")({
  component: RouteComponent,
  beforeLoad: async () => {
    await requireSession();
  },
});

function RouteComponent() {
  return <div>Hello "/__app/bridge"!</div>;
}

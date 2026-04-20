import AppSidebar from "#/components/AppSidebar";
import Logo from "#/components/Logo";
import { SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";
import { requireSession } from "#/lib/api/session";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  beforeLoad: () => {
    return requireSession();
  },
  loader: async ({ context }) => {
    return { user: context.user };
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

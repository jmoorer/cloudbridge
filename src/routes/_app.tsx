import AppSidebar from "#/components/AppSidebar";
import Logo from "#/components/Logo";
import { SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";
import { getConnectedAccountsFn } from "#/lib/api/connect";
import { requireSessionFn } from "#/lib/api/session";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  beforeLoad: () => {
    return requireSessionFn();
  },
  loader: async ({ context }) => {
    const accounts = await getConnectedAccountsFn();
    return {
      user: { ...context.user, image: context.user.image ?? null },
      accounts,
    };
  },
});

function RouteComponent() {
  const { user, accounts } = Route.useLoaderData();
  return (
    <SidebarProvider>
      <AppSidebar user={user} accounts={accounts} />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

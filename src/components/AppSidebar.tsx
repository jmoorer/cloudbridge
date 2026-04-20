import Logo from "./Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ConnectAccountButton from "./ConnectAccountButton";
import { account, type ConnectedAccount, type User } from "#/lib/db/schema";
import { disconnectAccountFn } from "#/lib/api/connect";
import { authClient } from "#/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { useServerFn } from "@tanstack/react-start";
import { logoutFn } from "#/lib/api/session";
import { TrashIcon } from "lucide-react";

type Props = {
  user: User;
  accounts: ConnectedAccount[];
};
function AppSidebar({ user, accounts }: Props) {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton>Item {index + 1}</SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 justify-between">
            Accounts
            <ConnectAccountButton />
          </SidebarGroupLabel>
          {/* <SidebarMenu>
            {Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton />
              </SidebarMenuItem>
            ))}
          </SidebarMenu> */}
          <AccountList accounts={accounts} />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
function AccountList({ accounts }: { accounts: ConnectedAccount[] }) {
  return (
    <SidebarMenu>
      {accounts.map((account) => (
        <SidebarMenuItem key={account.id}>
          <SidebarMenuButton>{account.label}</SidebarMenuButton>{" "}
          <SidebarMenuAction
            showOnHover
            // className="rounded-sm data-[state=open]:bg-accent"
          >
            <TrashIcon />
          </SidebarMenuAction>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
function UserMenu({ user }: { user: User }) {
  const logout = useServerFn(logoutFn);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="mb-2">
              <Avatar>
                {user.image && <AvatarImage src={user.image} />}
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>

              <span>{user.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default AppSidebar;

import { auth } from "@/lib/auth";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const getSessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });
    return session;
  },
);
export const requireSessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });
    if (!session) {
      throw redirect({
        to: "/",
      });
    }
    return session;
  },
);
export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const headers = getRequestHeaders();
  await auth.api.signOut({ headers });
  throw redirect({
    to: "/",
  });
});

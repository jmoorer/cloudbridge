import { createMiddleware } from "@tanstack/react-start";
import { requireSessionFn } from "./session";

export const authMiddleware = createMiddleware({}).server(async ({ next }) => {
  const session = await requireSessionFn();
  const result = await next({
    context: { user: session.user },
  });
  return result;
});

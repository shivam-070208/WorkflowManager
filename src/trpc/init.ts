import { auth } from "@/lib/auth";
import { polarClient } from "@/lib/polar";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react"; // cache is a React function that helps to create memoized async functions for server components

export const createTRPCContext = cache(async () => {
  return {};
});

const t = initTRPC.create();

export const createTRPCRouter = t.router;
export const createCallerfactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const ProtectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, auth: session } });
});

export const PremiumProcedure = ProtectedProcedure.use(
  async ({ ctx, next }) => {
    const state = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });
    if (!state.activeSubscriptions?.length) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Premium subscription required",
      });
    }
    return next({ ctx: { ...ctx, state: state } });
  },
);

import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { prisma } from "@/lib/db";
import { inngest } from "@/inngest/client";
import { workflowRouter } from "@/services/workflows/server/routers";

export const appRouter = createTRPCRouter({
  workflow: workflowRouter,
});

export type AppRouter = typeof appRouter;

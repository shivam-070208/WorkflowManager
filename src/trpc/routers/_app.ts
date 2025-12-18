import {  createTRPCRouter } from "../init";
import { workflowRouter } from "@/services/workflows/server/routers";

export const appRouter = createTRPCRouter({
  workflow: workflowRouter,
});

export type AppRouter = typeof appRouter;

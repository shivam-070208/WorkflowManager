import { prisma } from "@/lib/db";
import { createTRPCRouter, ProtectedProcedure } from "@/trpc/init";
import {generateSlug} from "random-word-slugs"
import z from "zod";

export const workflowRouter = createTRPCRouter({
  create: ProtectedProcedure.mutation(({ ctx }) => {
    return prisma.workflow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
      },
    });
  }),
  remove: ProtectedProcedure.input(z.object({ id: z.string() })).mutation(
    ({ ctx, input }) => {
      return prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }
  ),
  updateName: ProtectedProcedure.input(
    z.object({ id: z.string(), name: z.string().min(1) })
  ).mutation(({ ctx, input }) => {
    return prisma.workflow.update({
      data: {
        name: input.name,
      },
      where: {
        id: input.id,
        userId: ctx.auth.user.id,
      },
    });
  }),

  getAll: ProtectedProcedure.input(
    z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(12),
    }),
  ).query(async ({ ctx, input }) => {
    const skip = (input.page - 1) * input.limit;
    const [workflows, total] = await Promise.all([
      prisma.workflow.findMany({
        where: {
          userId: ctx.auth.user.id,
        },
        skip,
        take: input.limit,
        orderBy: {
          updatedAt: "desc",
        },
      }),
      prisma.workflow.count({
        where: {
          userId: ctx.auth.user.id,
        },
      }),
    ]);

    return {
      workflows,
      total,
      page: input.page,
      limit: input.limit,
      totalPages: Math.max(1, Math.ceil(total / input.limit)),
    };
  }),
});
export type workflowRouterTypes = typeof workflowRouter
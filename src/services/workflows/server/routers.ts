import { NodeType, Workflow } from "@/generated/prisma/browser";
import { prisma } from "@/lib/db";
import { createTRPCRouter, ProtectedProcedure } from "@/trpc/init";
import { Node } from "@xyflow/react";
import { generateSlug } from "random-word-slugs";
import z from "zod";

export const workflowRouter = createTRPCRouter({
  create: ProtectedProcedure.mutation(({ ctx }) => {
    return prisma.workflow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
        nodes: {
          create: [
            {
              name: generateSlug(3),
              type: "Initial",
              position: {
                x: 100,
                y: 100,
              },
            },
          ],
        },
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
    },
  ),
  getById: ProtectedProcedure.input(z.object({ id: z.string() })).query(
    async ({ input, ctx }) => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        include: {
          nodes: true,
          connections: true,
        },
      });

      if (!workflow) {
        return null;
      }

      const nodes: Node[] = workflow.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        data: (node.data as Record<string, unknown>) ?? {},
        position: {
          x: (node.position as Record<string, number>)?.x ?? 100,
          y: (node.position as Record<string, number>)?.y ?? 100,
        },
        label: node.name,
      }));

      const connections = workflow.connections.map((connection) => ({
        id: connection.id,
        source: connection.fromNode,
        target: connection.toNode,
      }));

      return {
        ...workflow,
        nodes,
        connections,
      };
    },
  ),
  updateName: ProtectedProcedure.input(
    z.object({ id: z.string(), name: z.string().min(1) }),
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
      search: z.string().default(""),
    }),
  ).query(async ({ ctx, input }) => {
    const skip = (input.page - 1) * input.limit;
    const [workflows, total] = await Promise.all([
      prisma.workflow.findMany({
        where: {
          userId: ctx.auth.user.id,
          name: {
            contains: input.search.trim(),
            mode: "insensitive",
          },
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
          name: {
            contains: input.search,
            mode: "insensitive",
          },
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
export type workflowRouterTypes = typeof workflowRouter;

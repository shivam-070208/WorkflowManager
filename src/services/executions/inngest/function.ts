import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { sortWorkflow } from "../lib/utils";
import { Node } from "@/generated/prisma/client";
import { ExecutionRegistry } from "../types/executor-registry";
import { NodeDataMap } from "../types/node-data-map";
import { Events } from "@/inngest/event-type";
import { TriggerNodeTypes } from "../types/classified-node-types";

const ExecuteWorkflow = inngest.createFunction(
  {
    id: "execute-workflow",
  },
  {
    event: Events.WORKFLOW_EXECUTE,
  },
  async ({ event, step }) => {
    const { id } = event.data;
    if (!id)
      throw new NonRetriableError("Id of workflow is required to execute");
    const data = await step.run("Fetching Workflow form Db", async () => {
      const data = await prisma?.workflow.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          nodes: true,
          connections: true,
        },
      });
      if (!data)
        throw new NonRetriableError(
          "No Workflow Found save it before reunning",
        );
      return data;
    });

    const sortedNodes = await step.run("Sorting Nodes", () => {
      try {
        return sortWorkflow(data.nodes, data.connections);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new NonRetriableError(error.message);
        } else {
          throw new NonRetriableError(
            "Unknown error occurred while sorting workflow nodes",
          );
        }
      }
    });
    let context: Record<string, unknown> = event.data?.context ?? {};
    for (const node of sortedNodes) {
      if (TriggerNodeTypes.includes(node.type)) continue;
      const executor =
        ExecutionRegistry[node.type as keyof typeof ExecutionRegistry];
      if (!executor) {
        throw new NonRetriableError(
          `No executor found for node type: ${node.type}`,
        );
      }
      context = await executor({
        data: node.data as NodeDataMap[typeof node.type & keyof NodeDataMap],
        context: context,
        step,
      });
    }

    return {
      Message: "Completed",
      context,
    };
  },
);

export { ExecuteWorkflow };

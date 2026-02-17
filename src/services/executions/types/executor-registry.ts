import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "@/services/executions/types/executor-types";
import { HttpRequestExecutor } from "@/services/executions/nodes/workflownodes/httprequest/inggest/function";
import { NodeDataMap } from "./node-data-map";
import { ResendNodeExecutor } from "../nodes/workflownodes/resend/inngest/function";
import { AINodeExecutor } from "../nodes/workflownodes/ai/inngest/function";

type ExecutionRegistryType = {
  [K in keyof NodeDataMap]: NodeExecutor<NodeDataMap[K]>;
};

export const ExecutionRegistry: ExecutionRegistryType = {
  [NodeType.HTTPREQUEST]: HttpRequestExecutor,
  [NodeType.RESEND]: ResendNodeExecutor,
  [NodeType.AIAGENTS]: AINodeExecutor,
};

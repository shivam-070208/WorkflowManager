import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "@/services/executions/types/executor-types";
import { HttpRequestExecutor } from "@/services/executions/nodes/workflownodes/httprequest/inggest/function";
import { NodeDataMap } from "./node-data-map"
type ExecutionRegistryType = {
    [K in keyof NodeDataMap]: NodeExecutor<NodeDataMap[K]>;
  };
  
export const ExecutionRegistry = {
    [NodeType.HTTPREQUEST]: HttpRequestExecutor,
    [NodeType.MANUALTRIGGER]:()=>({})
};
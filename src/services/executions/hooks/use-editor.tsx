import { useNodeId, useReactFlow } from "@xyflow/react";

export const useWorkflowId = (): string | undefined => {
  const nodeId = useNodeId();
  const { getNode } = useReactFlow();
  if (!nodeId) throw new Error("This hook must be use inside React-Flow Node");
  const node = getNode(nodeId);
  return node?.data?.workflowId as string | undefined;
};

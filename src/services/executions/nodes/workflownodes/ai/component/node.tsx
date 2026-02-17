"use client";

import { BaseNodeContent } from "@/components/react-flow/base-node";
import { WorkflowNode } from "@/components/react-flow/node-layout";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { Brain } from "lucide-react";
import { memo, useMemo, useState } from "react";
import AIDialog from "./dialog";

const AINode = memo(() => {
  const [open, setDialogOpen] = useState(false);
  const nodeId = useNodeId();
  const { getNode } = useReactFlow();

  const node = nodeId ? getNode(nodeId) : null;

  const description = useMemo(() => {
    if (!node) return "unconfigured";
    if (node && node.data && node.data.provider) {
      const provider = (node.data.provider as string).toUpperCase();
      const model = node.data.model
        ? ` - ${node.data.model}`
        : " - no model selected";
      return `${provider}${model}`;
    }
    return "unconfigured";
  }, [node]);

  return (
    <>
      <AIDialog
        open={open}
        data={node?.data as AINodeDataTypes}
        onOpenChange={setDialogOpen}
      />
      <WorkflowNode
        onSettingClick={() => setDialogOpen(true)}
        description={description}
      >
        <BaseNodeContent className="flex h-auto w-auto items-center justify-center">
          <Brain size={30} />
        </BaseNodeContent>
      </WorkflowNode>
    </>
  );
});

AINode.displayName = "AINode";
export default AINode;

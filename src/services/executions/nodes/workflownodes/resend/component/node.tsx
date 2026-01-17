import { BaseNodeContent } from "@/components/react-flow/base-node";
import { WorkflowNode } from "@/components/react-flow/node-layout";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { RefreshCw as ResendIcon } from "lucide-react";
import { memo, useMemo, useState } from "react";
import HttpRequestDialog from "./dialog";

const ResendNode = memo(() => {
  const [open, setDialogOpen] = useState(false);
  const nodeId = useNodeId();
  const { getNode } = useReactFlow();

  const node = nodeId ? getNode(nodeId) : null;

  const description = useMemo(() => {
    if (!node) return "unconfigured";
    if (node && node.data && node.data.endpoint) {
      return (
        (node.data.method ? node.data.method + ": " : "") + node.data.endpoint
      );
    }
    return "unconfigured";
  }, [node]);

  return (
    <>
      {/* @ts-expect-error : TODO REMOVE IT MAKE RESEND DATA TYPE AND ASSIGN IT HERE */}
      <HttpRequestDialog
        open={open}
        data={node?.data}
        onOpenChange={setDialogOpen}
      />
      <WorkflowNode
        onSettingClick={() => setDialogOpen(true)}
        description={description}
      >
        <BaseNodeContent className="flex h-auto w-auto items-center justify-center">
          <ResendIcon size={30} />
        </BaseNodeContent>
      </WorkflowNode>
    </>
  );
});

ResendNode.displayName = "ResendNode";
export default ResendNode;

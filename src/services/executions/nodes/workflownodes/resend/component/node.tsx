import { BaseNodeContent } from "@/components/react-flow/base-node";
import { WorkflowNode } from "@/components/react-flow/node-layout";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { RefreshCw as ResendIcon } from "lucide-react";
import { memo, useMemo, useState } from "react";
import HttpRequestDialog from "./dialog";
const MASKEDLENGTH = 3;
const ResendNode = memo(() => {
  const [open, setDialogOpen] = useState(false);
  const nodeId = useNodeId();
  const { getNode } = useReactFlow();

  const node = nodeId ? getNode(nodeId) : null;

  const description = useMemo(() => {
    if (!node) return "unconfigured";
    if (node && node.data && node.data.api_key) {
      let maskedApiKey = node.data.api_key;
      if (
        typeof maskedApiKey === "string" &&
        maskedApiKey.length > MASKEDLENGTH
      ) {
        maskedApiKey =
          maskedApiKey.substring(0, MASKEDLENGTH) +
          "*".repeat(maskedApiKey.length - MASKEDLENGTH);
      }
      return "api_key:" + maskedApiKey;
    }
    return "unconfigured";
  }, [node]);

  return (
    <>
      <HttpRequestDialog
        open={open}
        data={node?.data as ResendNodeDataTypes}
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

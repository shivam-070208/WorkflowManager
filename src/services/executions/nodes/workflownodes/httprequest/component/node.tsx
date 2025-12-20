import { BaseNodeContent } from "@/components/react-flow/base-node";
import { WorkflowNode } from "@/components/react-flow/node-layout";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { Globe } from "lucide-react";
import { memo, useMemo } from "react";

const HttpRequestNode = memo(() => {
    const nodeId = useNodeId();
    const { getNode } = useReactFlow();

    // Get node data to include in dependencies
    const node = nodeId ? getNode(nodeId) : null;
    const endpoint = node?.data?.endpoint;
    const method = node?.data?.method;

    const description = useMemo(() => {
        if (!nodeId) return "unconfigured";
        if (node && node.data && node.data.endpoint) {
            return (node.data.method ? node.data.method + ": " : "") + node.data.endpoint;
        }
        return "unconfigured";
    }, [nodeId, endpoint, method]);

    return (
        <WorkflowNode description={description}>
            <BaseNodeContent className="w-auto h-auto flex justify-center items-center">
                <Globe size={30} />
            </BaseNodeContent>
        </WorkflowNode>
    );
});

export default HttpRequestNode;
import { BaseNodeContent } from "@/components/react-flow/base-node";
import { WorkflowNode } from "@/components/react-flow/node-layout";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { Globe } from "lucide-react";
import { memo, useMemo, useState } from "react";
import HttpRequestDialog from "./dialog";


const HttpRequestNode = memo(() => {
    const [open,setDialogOpen] = useState(false)
    const nodeId = useNodeId();
    const { getNode } = useReactFlow();

    const node = nodeId ? getNode(nodeId) : null;

    const description = useMemo(() => {
        if (!node) return "unconfigured";
        if (node && node.data && node.data.endpoint) {
            return (node.data.method ? node.data.method + ": " : "") + node.data.endpoint;
        }
        return "unconfigured";
    }, [node]);

    return (
        <>
        <HttpRequestDialog open={open} data={node?.data as HttpRequestNodeDataTypes} onOpenChange={setDialogOpen}/>
        <WorkflowNode onSettingClick={()=>setDialogOpen(true)} description={description}>
            <BaseNodeContent  className="w-auto h-auto flex justify-center items-center">
                <Globe size={30} />
            </BaseNodeContent>
        </WorkflowNode>
        </>
    );
});

HttpRequestNode.displayName = "HttpRequestNode"

export default HttpRequestNode;
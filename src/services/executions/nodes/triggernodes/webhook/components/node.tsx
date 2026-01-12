import { BaseNodeContent } from "@/components/react-flow/base-node"
import {TriggerNode} from "@/components/react-flow/node-layout"
import { Webhook } from "lucide-react"
import  { memo,FC, useState, useMemo } from "react"
import WebHookDialog from "./dialog"
import { useNodeId, useReactFlow } from "@xyflow/react"

const WebHookNode:FC = memo(() => {
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
        <WebHookDialog data={node?.data as WebHookNodeDataTypes} open={open} onOpenChange={setDialogOpen} />
    <TriggerNode onSettingClick={()=>setDialogOpen(true)}>
            <BaseNodeContent  className="w-auto h-auto flex  justify-center items-center">
            <Webhook size={30} />
            </BaseNodeContent>
        </TriggerNode>
        </>
    )
})

WebHookNode.displayName = "WebHookNode"


export default WebHookNode;
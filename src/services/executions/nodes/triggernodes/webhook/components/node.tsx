import { BaseNodeContent } from "@/components/react-flow/base-node"
import {TriggerNode} from "@/components/react-flow/node-layout"
import { Webhook } from "lucide-react"
import  { memo,FC } from "react"

const WebHookNode:FC = memo(() => {
    return (
        <TriggerNode>
            <BaseNodeContent  className="w-auto h-auto flex  justify-center items-center">
            <Webhook size={30} />
            </BaseNodeContent>
        </TriggerNode>
    )
})


export default WebHookNode;
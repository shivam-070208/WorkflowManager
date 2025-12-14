import PlaceholderNode from "@/components/react-flow/placeholder-node";
import { NodeType } from "@/generated/prisma/enums";
import { ManualTriggerNode} from "@/services/executions/nodes"
export const NodesTypes = {
    [NodeType.Initial]:PlaceholderNode,
    [NodeType.ManualTrigger]:ManualTriggerNode
}
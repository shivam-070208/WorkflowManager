import { BaseNode, BaseNodeContent, BaseNodeHeader } from "@/components/react-flow/base-node"
import { Plus } from "lucide-react"

const InitialNode :React.FC = () =>{
    return(
        <BaseNode>
        <BaseNodeHeader>
        Add Node
        </BaseNodeHeader>
        <BaseNodeContent className="cursor-pointer w-80 h-80 flex justify-center items-center border-2 border-dashed">
        <Plus className="mx-auto my-2 text-gray-400"/>
        </BaseNodeContent>
        </BaseNode>
    )
}

export default InitialNode;
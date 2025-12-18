import { BaseNodeContent } from "@/components/react-flow/base-node"
import {TriggerNode} from "@/components/react-flow/node-layout"
import { Github } from "lucide-react"

const GithubHooks = () => {
    return (
        <TriggerNode>
            <BaseNodeContent  className="w-auto h-auto flex  justify-center items-center">
            <Github size={30} />
            </BaseNodeContent>
        </TriggerNode>
    )
}


export default GithubHooks;
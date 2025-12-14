import { cn } from "@/lib/utils";
import { IconCircleDottedLetterE, IconTrash } from "@tabler/icons-react";
import { Handle, Position, useNodeId, useReactFlow, } from "@xyflow/react";

import { useState } from "react";
import { BaseNode } from "./base-node";

interface WorkflowNodeProps extends React.ComponentProps<"div">{
    left?:boolean;
    right?:boolean;
}
const WorkflowNode = ({
    left = true,
    right=true,
    children,
    ...props
}:Readonly<WorkflowNodeProps>)=>{
    const [active,setActive] = useState(false)
    const nodeId = useNodeId();
    const {deleteElements} = useReactFlow()
    const onDelete = () =>{
        if(nodeId){
            deleteElements({nodes:[{id:nodeId}]})
        }
    }
    return (
<div onPointerLeave={()=>setActive(false)} className={cn("p-3 flex flex-col group gap-3 transition-all",active&&"bg-background/50 border rounded ")}>
        <div className={cn("flex items-center justify-center gap-3 transition-all ",!active&&"scale-0")}>
        <IconTrash onClick={onDelete} xlinkTitle="Delete" className="cursor-pointer text-red-500" />
        <IconCircleDottedLetterE title="Execute" className="cursor-pointer" />
        </div>
        <BaseNode {...props} onDoubleClick={()=>setActive(!active)}>
        {left&& <Handle position={Position.Left} type="target" />}
         {children}
         {right&&<Handle position={Position.Right} type="source" />}
        </BaseNode>
</div>
)
}

export default WorkflowNode;
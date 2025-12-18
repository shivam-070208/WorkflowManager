import { cn } from "@/lib/utils";
import {  IconSettings, IconTrash } from "@tabler/icons-react";
import { Handle, Position, useNodeId, useReactFlow, } from "@xyflow/react";

import { useState } from "react";
import { BaseNode } from "./base-node";

interface WorkflowNodeProps extends React.ComponentProps<"div">{
    left?:boolean;
    right?:boolean;
    showtoolBar?:boolean;
    onSettingClick?:()=>void

}
const WorkflowNode = ({
    left = true,
    right=true,
    showtoolBar = true,
    onSettingClick,
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
    const onSetting  = () =>{
        setActive(false);
        onSettingClick?.();
    }
    return (
<div onPointerLeave={()=>setActive(false)} className={cn("p-3 flex flex-col group gap-3 transition-all",active&&"bg-background/50 border rounded ")}>
        {showtoolBar&&<div className={cn("flex items-center justify-center gap-3 transition-all ",!active&&"scale-0")}>
        <IconTrash onClick={onDelete} xlinkTitle="Delete" className="cursor-pointer text-red-500" />
        <IconSettings onClick={onSetting} title="Settings" className="cursor-pointer" />
        </div>}
        <BaseNode {...props} onDoubleClick={()=>setActive(!active)}>
        {left&& <Handle position={Position.Left} type="target" />}
         {children}
         {right&&<Handle position={Position.Right} type="source" />}
        </BaseNode>
</div>
)
}

const TriggerNode = ({left=false,className,...props}:Readonly<WorkflowNodeProps>) =>{
    return (
        <WorkflowNode className={cn("rounded-l-full",className)} left={left} {...props}/>
    )
}

export {
     WorkflowNode,
     TriggerNode
};
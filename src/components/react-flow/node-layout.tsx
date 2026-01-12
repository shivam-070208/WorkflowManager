import { cn } from "@/lib/utils";
import { IconSettings, IconTrash } from "@tabler/icons-react";
import { Handle, Position, useNodeId, useReactFlow, } from "@xyflow/react";

import { useState } from "react";
import { BaseNode } from "./base-node";
import { NodeStatusIndicator } from "./node-status-indicator";
import { SubHeading } from "../ui/sub-heading";
import { Heading } from "../ui/heading";

interface WorkflowNodeProps extends React.ComponentProps<"div"> {
    left?: boolean;
    right?: boolean;
    showtoolBar?: boolean;
    onSettingClick?: () => void;
    title?: string;
    description?: string;

}
const WorkflowNode = ({
    left = true,
    right = true,
    showtoolBar = true,
    onSettingClick,
    children,
    title,
    description,
    ...props
}: Readonly<WorkflowNodeProps>) => {
    const [active, setActive] = useState(false)
    const nodeId = useNodeId();
    const { deleteElements } = useReactFlow()
    const onDelete = () => {
        if (nodeId) {
            deleteElements({ nodes: [{ id: nodeId }] })
        }
    }
    const onSetting = () => {
        setActive(false);
        onSettingClick?.();
    }
    return (
        <div onPointerLeave={() => setActive(false)} className={cn(
            "p-3 flex flex-col gap-2",
             active && "bg-background/50 border rounded "
             )}>
            {showtoolBar && 
            <div className={cn("flex items-center justify-center gap-3 ",
            "pointer-events-auto transition-all", !active && "scale-0")}>
                <button onClick={onDelete} aria-label="Delete node" className="p-1 hover:bg-accent rounded transition-colors">
                    <IconTrash className="text-red-500" />
                </button>
                <button onClick={onSetting} aria-label="Node settings" className="p-1 hover:bg-accent rounded transition-colors">
                    <IconSettings />
                </button>            </div>
            }
            <BaseNode {...props} className="w-fit mx-auto" onDoubleClick={() => setActive(!active)}>
                {left && <Handle position={Position.Left} type="target" />}
                <NodeStatusIndicator status="initial" variant="overlay">
                    {children}
                </NodeStatusIndicator>
                {right && <Handle position={Position.Right} type="source" />}
            </BaseNode>
            {title&&<Heading as="h6" className="text-sm" >{title}</Heading>}
            {description&&<SubHeading as="h6" className="mx-auto max-w-xs text-muted-foreground">{description}</SubHeading>}
        </div>
    )
}

const TriggerNode = ({ left = false, className, ...props }: Readonly<WorkflowNodeProps>) => {
    return (
        <WorkflowNode className={cn("rounded-l-full", className)} left={left} {...props} />
    )
}

export {
    WorkflowNode,
    TriggerNode
};
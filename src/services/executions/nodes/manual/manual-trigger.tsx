"use client";

import React, { memo } from "react";
import {
    BaseNodeContent,
} from "@/components/react-flow/base-node";
import { MousePointerClick } from "lucide-react";
import WorkflowNode from "@/components/react-flow/workflow-node";


const ManualTriggerNode:React.FC = memo(() => {
    return(
        <WorkflowNode left={false} className="rounded-l-full">
        <BaseNodeContent className="w-auto h-auto flex  justify-center items-center">
        <MousePointerClick size={30} />
        </BaseNodeContent>
        </WorkflowNode>
    )
})


export default ManualTriggerNode;
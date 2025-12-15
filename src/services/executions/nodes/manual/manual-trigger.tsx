"use client";

import React, { memo, useState } from "react";
import {
    BaseNodeContent,
} from "@/components/react-flow/base-node";
import { MousePointerClick } from "lucide-react";
import WorkflowNode from "@/components/react-flow/workflow-node";
import ManualTriggerDialog from "./dialog";


const ManualTriggerNode:React.FC = memo(() => {
    const [dialogOpen,setDialogOpen] = useState(false)
    return(
        <>
        <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        <WorkflowNode onSettingClick={()=>setDialogOpen(true)} left={false} className="rounded-l-full">
        <BaseNodeContent className="w-auto h-auto flex  justify-center items-center">
        <MousePointerClick size={30} />
        </BaseNodeContent>
        </WorkflowNode>
        </>
    )
})


export default ManualTriggerNode;
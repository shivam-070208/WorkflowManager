"use client";

import React, { memo, useState } from "react";
import {
    BaseNodeContent,
} from "@/components/react-flow/base-node";
import { MousePointerClick } from "lucide-react";
import {TriggerNode} from "@/components/react-flow/node-layout";
import ManualTriggerDialog from "./dialog";


const ManualTriggerNode:React.FC = memo(() => {
    const [dialogOpen,setDialogOpen] = useState(false)
    return(
        <>
        <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        <TriggerNode onSettingClick={()=>setDialogOpen(true)} left={false} >
        <BaseNodeContent className="w-auto h-auto flex  justify-center items-center">
        <MousePointerClick size={30} />
        </BaseNodeContent>
        </TriggerNode>
        </>
    )
})


export default ManualTriggerNode;
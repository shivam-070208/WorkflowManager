"use client";

import React from "react";
import {
    BaseNode,
    BaseNodeContent,
    BaseNodeFooter
} from "@/components/react-flow/base-node";
import { IconCursorOff } from "@tabler/icons-react";
const ManualTriggerNode:React.FC = () => {
    return(
        <BaseNode>
        <BaseNodeContent className="w-auto h-auto flex justify-center items-center">
        <IconCursorOff size={10} />
        </BaseNodeContent>
        </BaseNode>
    )
}


export default ManualTriggerNode;
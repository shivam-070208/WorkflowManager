"use client"

import { useState } from "react"
import NodeSelector from "./node-selector";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


const AddNode =()=>{
    const[isOpen,setOpen] = useState<boolean>(false);

    return(
        <NodeSelector isOpen={isOpen} setOpen={setOpen}>
            <Button className="bg-background border border-dashed p-3" aria-label="Add node">
                <Plus size={10} />
            </Button>        </NodeSelector>
    )
    
}


export default AddNode;
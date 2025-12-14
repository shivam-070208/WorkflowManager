"use client";

import React, { useEffect, useState } from "react";
import {motion} from "motion/react";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetHeader, SheetTrigger,SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { NodeType } from "@/generated/prisma/enums";
import { Github, ClipboardList, MousePointerClick, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useReactFlow } from "@xyflow/react";

import { generateSlug } from "random-word-slugs";
type NodeSelectorProps = React.ComponentPropsWithRef<"div"> & {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Node={
  icon:React.ReactNode;
  title:string;
  description:string;
  type:NodeType;
}

const NodesOptions: Node[] = [
  {
    icon: <Github className="w-6 h-6" />,
    title: "Github Hooks",
    description: "Trigger workflows from Github events.",
    type: NodeType.GithubHooks,
  },
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: "Google Form",
    description: "Start workflow from Google Form submissions.",
    type: NodeType.GoogleForm,
  },
  {
    icon: <MousePointerClick className="w-6 h-6" />,
    title: "Manual Trigger",
    description: "Manually trigger your workflow.",
    type: NodeType.ManualTrigger,
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Webhook",
    description: "Trigger workflow from an incoming webhook.",
    type: NodeType.Webhook,
  },
];


const NodeSelector = ({
  children,
  isOpen,
  setOpen,
  className,
  ...props
}: NodeSelectorProps) => {


  const [hovered, setHovered] = useState<string | null>(null);
  const [search,setSearch] = useState<string>("");
  const [filteredNodeOption,setFilteredNodeOptions] = useState<Node[]>(NodesOptions);
  const {addNodes,deleteElements,getNodes,screenToFlowPosition} = useReactFlow()
  useEffect(()=>{
    const data = [...NodesOptions]
    setFilteredNodeOptions(data.filter((node)=>node.title.toLowerCase().includes(search.toLowerCase())))
  },[search])
  const AddtoCanvas = (type:NodeType)=>{
    setOpen(false);
    const allNodes = getNodes()
    const isInitialNode = allNodes.find((node)=>node.type===NodeType.Initial)
    if(isInitialNode) deleteElements({nodes:[isInitialNode]});
    const centeX = window.innerWidth/2;
    const centeY = window.innerHeight/2;
    const position = screenToFlowPosition({x:centeX+Math.random()*60 ,y:centeY+Math.random()*60})
    addNodes({
      id:generateSlug(3),
      data:{
        name:generateSlug(3)
      },
      position,
      type,
    })
  }
  return (
    <Sheet open={isOpen} onOpenChange={(open)=>setOpen(open)} {...props}>
        <SheetTrigger asChild className={className}>
         <div> {children}
          </div></SheetTrigger>
       <SheetContent >
      <SheetHeader className="flex  justify-between">
       <SheetTitle>Select Node Type</SheetTitle>
       <SheetDescription>Select a node here to add in workspace , some node may ask for input</SheetDescription>
      </SheetHeader>
      <div onMouseLeave={()=>setHovered(null)} className="flex flex-col gap-4 px-2">
      <Input value={search} className="" onChange={(e)=>setSearch(e.target.value)} placeholder="Search"/>
      <Separator />
          {filteredNodeOption.map((node) => (
            <motion.button
            onClick={()=>{AddtoCanvas(node.type);
            }}
            onMouseEnter={()=>setHovered(node.type as string)}
              key={node.type}
              layoutId={node.type}
              className="group active:scale-80  flex items-center gap-4 rounded-md p-3 hover:border-b  relative transition-all  "
              type="button"
            >
              <span className="mt-1">{node.icon}</span>
              <span className="flex flex-col items-start text-left">
                <span className="font-medium text-base">{node.title}</span>
                <span className="text-xs text-muted-foreground">{node.description}</span>
              </span>
              {hovered===node.type && <motion.div layoutId="movablespan" className="absolute left-0 rounded-3xl w-1 h-full bg-linear-to-b from-transparent via-accent-foreground/80 to-transparent " />}
            </motion.button>
          ))}
        </div>
       </SheetContent>
    </Sheet>
  );
};
export default NodeSelector;

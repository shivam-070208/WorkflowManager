"use client";

import { Separator } from "@/components/ui/separator";
import { Sheet, SheetHeader, SheetTrigger,SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

import { NodeType } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { Github, ClipboardList, MousePointerClick, Globe } from "lucide-react";
import React from "react";
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
const NodeSelector = ({
  children,
  isOpen,
  setOpen,
  className,
  ...props
}: NodeSelectorProps) => {



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
  return (
    <Sheet open={isOpen} onOpenChange={(open)=>setOpen(open)} {...props}>
        <SheetTrigger asChild>{children}</SheetTrigger>
       <SheetContent className={cn("", className)}>
      <SheetHeader className="flex  justify-between">
       <SheetTitle>Select Node Type</SheetTitle>
       <SheetDescription>Select a node here to add in workspace , some node may ask for input</SheetDescription>
      </SheetHeader>
      <Separator />
      <div className="flex flex-col gap-4 px-2">
          {NodesOptions.map((node) => (
            <button
              key={node.type}
              className="group flex items-start gap-4 rounded-md p-3 transition-colors hover:bg-accent border"
              type="button"
            >
              <span className="mt-1">{node.icon}</span>
              <span className="flex flex-col items-start text-left">
                <span className="font-medium text-base">{node.title}</span>
                <span className="text-xs text-muted-foreground">{node.description}</span>
              </span>
            </button>
          ))}
        </div>
       </SheetContent>
    </Sheet>
  );
};
export default NodeSelector;

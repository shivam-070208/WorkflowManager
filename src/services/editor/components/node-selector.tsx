"use client";

import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { NodeType } from "@/generated/prisma/enums";
import { Input } from "@/components/ui/input";
import { useReactFlow, useNodes } from "@xyflow/react";
import { generateSlug } from "random-word-slugs";
import { toast } from "sonner";
import type { Node as ReactFlowNode } from "@xyflow/react";
import { Node, NodesOptions } from "@/config/nodes/node-selector-data";
import { filterBySearch, filterNodesByTypes } from "../utils/utils";
import {
  TriggerNodeTypes,
  WorkflowNodeTypes,
} from "@/services/executions/types/classified-node-types";

interface NodeSelectorProps extends React.ComponentPropsWithRef<"div"> {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NodeSelector = ({
  children,
  isOpen,
  setOpen,
  className,
  ...props
}: NodeSelectorProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const { addNodes, deleteElements, getNodes, screenToFlowPosition } =
    useReactFlow();
  const nodes = useNodes();
  const [isTrigger, setIsTrigger] = useState<boolean>(false);
  const [filteredNodeOption, setFilteredNodeOptions] =
    useState<Node[]>(NodesOptions);
  const [randomOffset] = useState(() => ({
    x: Math.random() * 60,
    y: Math.random() * 60,
  }));
  useEffect(() => {
    const isInitialNodePresent = nodes.some(
      (node) => node.type === NodeType.INITIAL,
    );
    const isTriggerNodePresent = nodes.some((node) =>
      TriggerNodeTypes.includes(node.type as NodeType),
    );
    let nodeOptionsToShow: Node[];
    if (isInitialNodePresent || nodes.length === 0 || !isTriggerNodePresent) {
      setIsTrigger(true);
      nodeOptionsToShow = filterNodesByTypes(
        [...NodesOptions],
        TriggerNodeTypes,
      );
    } else {
      setIsTrigger(false);
      nodeOptionsToShow = filterNodesByTypes(
        [...NodesOptions],
        WorkflowNodeTypes,
      );
    }
    nodeOptionsToShow = filterBySearch(nodeOptionsToShow, search);
    setFilteredNodeOptions(nodeOptionsToShow);
  }, [search, nodes]);

  const AddtoCanvas = (type: NodeType) => {
    setOpen(false);
    const allNodes = getNodes();

    if (
      TriggerNodeTypes.includes(type) &&
      allNodes.some((node: ReactFlowNode) =>
        TriggerNodeTypes.includes(node.type as NodeType),
      )
    ) {
      toast.error("There is only one trigger Node Allowed");
      return;
    }
    const isInitialNode = allNodes.find(
      (node) => node.type === NodeType.INITIAL,
    );
    if (isInitialNode) deleteElements({ nodes: [isInitialNode] });

    const centeX = window.innerWidth / 2;
    const centeY = window.innerHeight / 2;

    const position = screenToFlowPosition({
      x: centeX + randomOffset.x,
      y: centeY + randomOffset.y,
    });

    addNodes({
      id: generateSlug(3),
      data: {
        name: generateSlug(3),
      },
      position,
      type,
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={(open) => setOpen(open)} {...props}>
      <SheetTrigger asChild className={className}>
        <div> {children}</div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex justify-between">
          <SheetTitle>
            {isTrigger ? "Select Trigger Node" : "Select Workflow Node"}
          </SheetTitle>
          <SheetDescription>
            {isTrigger
              ? "Select a Node which will trigger your workflow"
              : "Select a node here to add in workspace. Some nodes may ask for input."}
          </SheetDescription>
        </SheetHeader>
        <div
          onMouseLeave={() => setHovered(null)}
          className="flex flex-col gap-4 px-2"
        >
          <Input
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Search"
          />
          <Separator />
          {filteredNodeOption.map((node) => (
            <motion.button
              onClick={() => {
                AddtoCanvas(node.type);
              }}
              onMouseEnter={() => setHovered(node.type as string)}
              key={node.type}
              layoutId={node.type}
              className="group relative flex items-center gap-4 rounded-md p-3 transition-all hover:border-b active:scale-80"
              type="button"
            >
              <node.icon />
              <span className="flex flex-col items-start text-left">
                <span className="text-base font-medium">{node.title}</span>
                <span className="text-muted-foreground text-xs">
                  {node.description}
                </span>
              </span>
              {hovered === node.type && (
                <motion.div
                  layoutId="movablespan"
                  className="via-accent-foreground/80 absolute left-0 h-full w-1 rounded-3xl bg-linear-to-b from-transparent to-transparent"
                />
              )}
            </motion.button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default NodeSelector;

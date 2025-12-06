"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlowProvider,
  ReactFlow,
  Node,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useGetWorkflowById } from "@/services/workflows/hooks/workflow";
import { NodesTypes } from "@/config/nodes/node-types";

type EditorProps = {
  workflowId: string;
};

const Editor: React.FC<EditorProps> = ({ workflowId }) => (
  <ReactFlowProvider>
    <Canvas workflowId={workflowId} />
  </ReactFlowProvider>
);

const Canvas: React.FC<EditorProps> = ({ workflowId }) => {
  const {  resolvedTheme } = useTheme(); // Use `resolvedTheme` for SSR compatibility
  const { data, isLoading, error } = useGetWorkflowById(workflowId);
  const [nodes, setNodes] = useState<Node[]>([]);
  const CanvaRef = useRef<HTMLDivElement | null>(null);

 

  useEffect(() => {
    if (!isLoading && data && CanvaRef && CanvaRef.current) {
      const updatedNodes = [...data.nodes];
      if (updatedNodes.length === 1 && updatedNodes[0].type === "Initial") {
        const Rect = CanvaRef.current.getBoundingClientRect();
        updatedNodes[0].position = {
          x: (window.innerWidth - Rect.left) / 2,
          y: (window.innerHeight - Rect.top) / 2,
        };
      }
      setNodes(updatedNodes);
    }
  }, [isLoading, data]);


  return (
    <div ref={CanvaRef} className="h-full w-full">
      <ReactFlow
        nodeTypes={NodesTypes}
        nodes={nodes}
        colorMode={resolvedTheme ==="dark"?"dark":"light"}
      >
        <Background />
        <Controls />
        <MiniMap nodeStrokeWidth={3} />
      </ReactFlow>
    </div>
  );
};

export default Editor;

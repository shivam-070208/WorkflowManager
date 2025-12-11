"use client";
import React, {  useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlowProvider,
  ReactFlow,
  Node,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  OnDelete,
  Panel,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useGetWorkflowById } from "@/services/workflows/hooks/workflow";
import { NodesTypes } from "@/config/nodes/node-types";
import AddNode from "./add-node";
import EditorHeader from "./editor-header";

type EditorProps = {
  workflowId: string;
};

const Editor: React.FC<EditorProps> = ({ workflowId }) => (
  <ReactFlowProvider>
    <EditorHeader workflowId={workflowId} />
    <Canvas workflowId={workflowId} />
  </ReactFlowProvider>
);

const Canvas: React.FC<EditorProps> = ({ workflowId }) => {
  const {  resolvedTheme } = useTheme(); 
  const { data, isLoading, error } = useGetWorkflowById(workflowId);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const CanvaRef = useRef<HTMLDivElement | null>(null);

  const ThemeOption: ('dark' | 'light')[] = ["dark", "light"];

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
  
  const onNodesChange:OnNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange:OnEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect:OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
const onDelete: OnDelete = useCallback((params)=>console.log(params),[]);

  return (
    <div ref={CanvaRef} className="h-full w-full">
      <ReactFlow
        nodeTypes={NodesTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        colorMode={
        (resolvedTheme &&ThemeOption.includes(resolvedTheme as "light" | "dark" ))
            ? (resolvedTheme as "light" | "dark")
            : "system"
        }
      >
        <Background />
        <Controls />
        <MiniMap nodeStrokeWidth={3} />
        <Panel position="top-right">
          <AddNode />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default Editor;

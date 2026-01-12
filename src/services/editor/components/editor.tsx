"use client";
import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
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
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useGetWorkflowById } from "@/services/workflows/hooks/use-workflow";
import { NodesTypes } from "@/services/executions/types/node-types";
import AddNode from "./add-node";
import EditorHeader from "./editor-header";
import { EmptyNode, NodePosition } from "@/components/react-flow/empty-node";
import { NodeType } from "@/generated/prisma/enums";
import ExecuteWorkflow from "./execute-workflow";

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
  const { resolvedTheme } = useTheme();
  const { data, isLoading } = useGetWorkflowById(workflowId);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const CanvaRef = useRef<HTMLDivElement | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  const isExecutable = useMemo(() => {
    return nodes.some((n) => n.type === NodeType.MANUALTRIGGER);
  }, [nodes]);

  const getCenteredPosition = useCallback((): NodePosition => {
    return screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  }, [screenToFlowPosition]);

  useEffect(() => {
    if (!isLoading && data) {
      const updatedNodes: Node[] = [...data.nodes];
      if (updatedNodes.length === 0) {
        updatedNodes.push(new EmptyNode({ _position: getCenteredPosition() }));
      }
      if (updatedNodes.length === 1 && updatedNodes[0].type === NodeType.INITIAL) {
        updatedNodes[0].position = getCenteredPosition();
      }
      setNodes(updatedNodes);
      setEdges([...data.connections]);
    }
  }, [isLoading, data, getCenteredPosition]);

  const nodesWithWorkflowId = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        workflowId,
      },
    }));
  }, [nodes, workflowId]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  const onDelete: OnDelete = useCallback((params) => {
    if (params.nodes) {
      setNodes((prevNodes) => {
        const updatedNodes = prevNodes.filter(
          (node) => !params.nodes?.some((deletedNode) => deletedNode.id === node.id)
        );
        if (updatedNodes.length === 0) {
          updatedNodes.push(new EmptyNode({ _position: getCenteredPosition() }));
        }
        return updatedNodes;
      });
    }
  }, [getCenteredPosition]);

  return (
    <div ref={CanvaRef} className="h-full w-full">
      <ReactFlow
        nodeTypes={NodesTypes}
        nodes={nodesWithWorkflowId}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        proOptions={{
          hideAttribution: true,
        }}
        colorMode={resolvedTheme ? (resolvedTheme.toLowerCase() as "light" | "dark") : "dark"}
        snapGrid={[12, 12]}
        snapToGrid
        panOnDrag={false}
        panOnScroll
        selectionOnDrag
      >
        <Background />
        <Controls />
        <MiniMap nodeStrokeWidth={3} />
        <Panel position="top-right">
          <AddNode />
        </Panel>
        {isExecutable && (
          <Panel position="bottom-center">
            <ExecuteWorkflow workflowId={workflowId} />
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default Editor;

"use client";
import React, {  useCallback, useEffect, useRef, useState } from "react";
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
import { useGetWorkflowById } from "@/services/workflows/hooks/workflow";
import { NodesTypes } from "@/config/nodes/node-types";
import AddNode from "./add-node";
import EditorHeader from "./editor-header";
import { EmptyNode, NodePosition } from "@/config/nodes/data";
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
  const {  resolvedTheme } = useTheme(); 
  const { data, isLoading,error } = useGetWorkflowById(workflowId);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const CanvaRef = useRef<HTMLDivElement | null>(null);
 const {screenToFlowPosition} = useReactFlow()
 const getCenteredPosition = useCallback(():NodePosition =>{ 

  return screenToFlowPosition({
    x:window.innerWidth/2,
    y:window.innerHeight/2,
  })
 },[])

  useEffect(() => {
    if (!isLoading && data ) {
      const updatedNodes:Node[] = [...data.nodes];
      if(updatedNodes.length === 0){
        updatedNodes.push(new EmptyNode({_position:getCenteredPosition()}))
      }
      if (updatedNodes.length === 1 && updatedNodes[0].type === NodeType.INITIAL) {
        updatedNodes[0].position = getCenteredPosition();
      } 
      setNodes(updatedNodes);
      setEdges([...data.connections]);
    } 
  }, [isLoading, data,getCenteredPosition]);
  
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
const onDelete: OnDelete = useCallback((params)=>{
  if(params.nodes){
    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.filter(
        (node) => !params.nodes?.some((deletedNode) => deletedNode.id === node.id)
      );
      if (updatedNodes.length === 0) {
        updatedNodes.push(new EmptyNode({_position:getCenteredPosition()}))
      }
      return updatedNodes;
    });
  }
},[getCenteredPosition]);

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
        proOptions={{
          hideAttribution:true
        }}
        colorMode={resolvedTheme ? (resolvedTheme.toLowerCase() as "light" | "dark") :"dark"}
        snapGrid={[12,12]}
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
        <Panel position="bottom-center">
          <ExecuteWorkflow />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default Editor;

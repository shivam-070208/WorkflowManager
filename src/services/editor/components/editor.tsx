"use client"
import React, { useCallback, useEffect,useState } from 'react';
import {ReactFlowProvider,ReactFlow,Node,OnNodesChange,OnNodeDrag,OnNodesDelete,OnConnect,OnConnectEnd,OnConnectStart, Background, Controls,MiniMap} from "@xyflow/react"

import '@xyflow/react/dist/style.css';
import { useTheme } from 'next-themes';
import { useGetWorkflowById } from '@/services/workflows/hooks/workflow';
import { NodesTypes } from '@/services/executions/nodes';


type EditorProps = {
  workflowId:string
}
const Editor: React.FC<EditorProps> = ({workflowId}) => (
  <ReactFlowProvider>
    <Canvas workflowId={workflowId} />
  </ReactFlowProvider>
);


const Canvas:React.FC<EditorProps> = ({workflowId}) => {
  const {theme} = useTheme();
  const {data,isLoading} = useGetWorkflowById(workflowId);
  const [nodes, setNodes] = useState<Node[]>([]);
  useEffect(()=>{
    if(!isLoading &&data){
      setNodes(data.nodes);
    }
  },[isLoading,data])
  console.log(data)
return (
  <div className="w-full h-full">
    <ReactFlow
    nodeTypes={NodesTypes}
    nodes={nodes}
    colorMode={theme=="dark"?"dark":"light"} >
      <Background />
    <Controls />
    <MiniMap nodeStrokeWidth={3} />
    </ReactFlow>
  </div>
)
}

export default Editor;

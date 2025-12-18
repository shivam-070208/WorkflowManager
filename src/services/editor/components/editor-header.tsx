"use client";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/common/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { SaveIcon, WorkflowIcon } from "lucide-react";
import { MutableText } from "@/components/common/mutable-text"
import {
  useGetWorkflowById,
  useUpdateWorkflow,
  useUpdateWorkflowName,
} from "@/services/workflows/hooks/workflow";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";


const EditorBreadCrumb = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useGetWorkflowById(workflowId);
  const updateWorkflowName = useUpdateWorkflowName();
  const onConfirm = (newName: string) => {
    if (
      newName &&
      newName !== workflow?.name &&
      workflow?.id &&
      !updateWorkflowName.isPending
    ) {
      updateWorkflowName.mutate(
        { id: workflow.id, name: newName },
        {
          onError: (e) => {
            toast("Something went wrong");
          },
          onSuccess: () => {
            toast.success("Workflow name updated");
          },
        },
      );
    }
  };
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/workflows">
            <WorkflowIcon />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <MutableText
            text={workflow?.name || "Untitled"}
            editable
            onConfirm={onConfirm}
            inputClassName="w-40 max-w-xs"
          />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const EditorSaveButton=({workflowId}:{workflowId:string})=>{
  const {isPending,mutate :update} = useUpdateWorkflow();
  const {getEdges,getNodes} = useReactFlow();
  const updateWorkflow=()=>{
    update({
      id: workflowId,
      nodes: getNodes().map(node => ({
        id: node.id,
        data: node.data,
        position: typeof node.position === "object" && node.position !== null
          ? { x: (node.position as any).x ?? 0, y: (node.position as any).y ?? 0 }
          : { x: 0, y: 0 },
        type: (node.type as "Initial" | "GithubHooks" | "GoogleForm" | "ManualTrigger" | "Webhook") ?? "ManualTrigger",
        label: (node as any).label ?? "", 
      })),
      edges: getEdges().map(edge => ({
        source: edge.source,
        target: edge.target,
        label: typeof edge.label === "string" ? edge.label : undefined,
      })),
    }, {
      onSuccess: () => {
        toast.success("Saved successfully");
      },
      onError: () => {
        toast.error("Failed to save workflow");
      },
    })
  }
  return(
    <Button size={"sm"} onClick={updateWorkflow} disabled={isPending} className="flex px-3 bg-primary w-fit ">
      <SaveIcon size={4} />Save 
    </Button>
  )
}

const EditorHeader = ({ workflowId }: { workflowId: string }) => {


  return (
    <div className="flex w-full  items-center justify-between  py-4 px-5">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-lg" />
        <EditorBreadCrumb workflowId={workflowId} />
      </div>
      <div className="flex gap-2 ">
    <EditorSaveButton workflowId={workflowId} />
    <ThemeToggle />
      </div>
    </div>
  );
};

export default EditorHeader;

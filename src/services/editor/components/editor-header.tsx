"use client"
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
import { WorkflowIcon } from "lucide-react";
import { PrimitiveText } from "@/components/common/primitive-text";
import {
  useGetWorkflowById,
  useUpdateWorkflows,
} from "@/services/workflows/hooks/workflow";
import { toast } from "sonner";

const EditorBreadCrumb = ({ workflowId }: { workflowId: string }) => {

  const { data: workflow } = useGetWorkflowById(workflowId);
  const updateWorkflowName = useUpdateWorkflows();
  const onConfirm = (newName: string) => {
    if (
      newName &&
      newName !== workflow?.name &&
      workflow?.id &&
      !updateWorkflowName.isPending
    ) {
      updateWorkflowName.mutate({ id: workflow.id, name: newName },{
        onError:(e)=>{
          toast("Something went wrong");
        },
        onSuccess:()=>{
          toast.success("Workflow name updated");
        }
      });
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
          <PrimitiveText
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

const EditorHeader = ({ workflowId }: { workflowId: string }) => {
  return (
    <div className="w-full flex justify-between items-center px-4 py-4">
      <div className="flex gap-2 items-center">
        <SidebarTrigger className="text-lg " />
        <EditorBreadCrumb workflowId={workflowId} />
      </div>
      <ThemeToggle />
    </div>
  );
};

export default EditorHeader;
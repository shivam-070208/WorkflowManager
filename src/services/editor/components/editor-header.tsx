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
import { WorkflowIcon } from "lucide-react";
import { MutableText } from "@/components/common/mutable-text"
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

const EditorHeader = ({ workflowId }: { workflowId: string }) => {
  return (
    <div className="flex w-full items-center justify-between px-4 py-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-lg" />
        <EditorBreadCrumb workflowId={workflowId} />
      </div>
      <ThemeToggle />
    </div>
  );
};

export default EditorHeader;

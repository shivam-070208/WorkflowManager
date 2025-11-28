"use client";
import {
  EntityContent,
  EntityHeader,
  EntityHeaderContent,
  EntityWrapper,
  EntityTable,
} from "@/components/common/entity-layout";
import React, { useState } from "react";
import { useCreateWorkflows, useWorkflows } from "@/hooks/use-workflows";

import Link from "next/link";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";

type Workflow = {
  id: string;
  name: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

const formatDate = (date: Date | string):string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const WorkflowHeader = () => {
  const createWorkflows = useCreateWorkflows();
  const trpc = useTRPC();
  const queryClient = useQueryClient()
  const handleAddNew =  () => {
     createWorkflows.mutate(undefined,{
      onSuccess: () => {
      toast.success("workflow created successfully");
        queryClient.invalidateQueries(trpc.workflow.getAll.queryOptions({}))
      },
      onError: (error) => {
        console.error("Failed to create workflow", error); // replace with your own handling
      }});
  };
  return (
    <EntityHeader actionLabel="Add New" action={handleAddNew}>
      <EntityHeaderContent
        heading="Workflows"
        subheading="Manage your workflows here"
      />
    </EntityHeader>
  );
};

export const WorkflowContainer = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  
  const { data } = useWorkflows({page, limit});
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const columns = [
    {
      id: "name",
      header: "Name",
      accessor: (row: Workflow) => (
        <Link
          href={`/workflows/${row.id}`}
          className="text-primary hover:underline font-medium"
        >
          {row.name}
        </Link>
      ),
    },
    {
      id: "createdAt",
      header: "Created",
      accessor: (row: Workflow) => formatDate(row.createdAt),
    },
    {
      id: "updatedAt",
      header: "Last Updated",
      accessor: (row: Workflow) => formatDate(row.updatedAt),
    },
  ];

  return (
    <EntityWrapper>
      <WorkflowHeader  />
      <EntityContent>
        <EntityTable
          data={data?.workflows || []}
          columns={columns}
          sortOptions={[
            { value: "name", label: "Name" },
            { value: "createdAt", label: "Created" },
          ]}
          pagination={
            data
              ? {
                  page: data.page,
                  totalPages: data.totalPages,
                  total: data.total,
                  limit: data.limit,
                  onPageChange: handlePageChange,
                }
              : undefined
          }
        />
        {children}
      </EntityContent>
    </EntityWrapper>
  );
};

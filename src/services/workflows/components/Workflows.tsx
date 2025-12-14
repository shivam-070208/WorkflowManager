"use client";
import {
  EntityContentProvider,
  EntityHeader,
  EntityHeaderContent,
  EntityWrapper,
  EntityTable,
  EntityTableFooter,
  useEntityContextValues,
  EntityTableHeader,
} from "@/components/common/entity-layout";
import React, { useState } from "react";
import {
  useCreateWorkflows,
  useWorkflows,
} from "@/services/workflows/hooks/workflow";

import Link from "next/link";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";
import { WorkflowIcon } from "lucide-react";

type Workflow = {
  id: string;
  name: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const WorkflowHeader = () => {
  const createWorkflows = useCreateWorkflows();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const handleAddNew = () => {
    createWorkflows.mutate(undefined, {
      onSuccess: () => {
        toast.success("workflow created successfully");
        queryClient.invalidateQueries(trpc.workflow.getAll.queryOptions({}));
      },
      onError: (error) => {
        console.error("Failed to create workflow", error); // replace with your own handling
      },
    });
  };
  const isLoading = createWorkflows?.isPending;
  return (
    <EntityHeader
      isPending={isLoading}
      actionLabel="Add New"
      action={handleAddNew}
    >
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
  return (
    <EntityWrapper>
      <WorkflowHeader />
      <EntityContentProvider>{children}</EntityContentProvider>
    </EntityWrapper>
  );
};
export const WorkflowList = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 12;
  const { search } = useEntityContextValues();
  const { data } = useWorkflows({ page, limit, search });
  const columns = [
    {
      id: "name",
      header: "Name",
      accessor: (row: Workflow) => (
        <Link
          href={`/workflows/${row.id}`}
          className="text-primary font-medium hover:underline"
        >
          <WorkflowIcon className="inline" />
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
    <>
      <EntityTable data={data?.workflows || []} columns={columns} />
      <EntityTableFooter
        pagination={{
          page,
          totalPages: data?.totalPages || 1,
          total: data?.total || 0,
          limit,
          onPageChange: setPage,
        }}
      />
    </>
  );
};
export const WorkflowListHeader = () => {
  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "createdAt", label: "Created" },
  ];
  return (
    <EntityTableHeader
      sortOptions={sortOptions}
      searchPlaceHolder="Search your Workflow by name"
    />
  );
};

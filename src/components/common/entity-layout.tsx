"use client"
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import React from "react";
import { Button } from "../ui/button";


export const EntityWrapper = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex-1 flex flex-col gap-6 p-6 sm:p-10", className)}>{children}</div>
);

type EntityHeaderProps =
  | {
      children: React.ReactNode; // You can pass heading, subheading, etc. as children
      className?: string;
      actionLabel?: string;
      action: () => void;
      actionHref?: never;
    }
  | {
      children: React.ReactNode;
      className?: string;
      actionLabel?: string;
      action?: never;
      actionHref: string;
    };

export const EntityHeader = ({
  children,
  className = "",
  actionLabel,
  action,
  actionHref
}: EntityHeaderProps) => (
  <div
    className={cn(
      "flex flex-col gap-3  sm:flex-row sm:items-center sm:justify-between",
      className
    )}
  >
    <div>{children}</div>
    {!!actionLabel && !action && actionHref && (
      <Link href={actionHref} className=" text-primary  hover:opacity-80">
        {actionLabel}
      </Link>
    )}
    {!!actionLabel && action && (
      <Button onClick={action} variant={"outline"} className="flex bg-primary text-primary-foreground font-medium hover:opacity-80">
      <PlusIcon className="inline" />  {actionLabel}
      </Button>
    )}
  </div>
);

export const EntityContent = ({children,className = ""}:{children:React.ReactNode,className?:string})=>(
    <div className={cn("flex-1",className)}>{children}</div>
)
export const EntityHeaderContent = ({
  heading,
  subheading,
}: {
  heading: React.ReactNode;
  subheading?: React.ReactNode;
}) => (
  <div>
    <div className="text-3xl font-semibold">{heading}</div>
    {subheading && (
      <div className="text-sm text-muted-foreground">{subheading}</div>
    )}
  </div>
);

type Column<T> = {
  id: string;
  header: React.ReactNode;
  accessor: (row: T) => React.ReactNode;
  className?: string;
};

type EntityTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  filterComponent?: React.ReactNode;
  sortOptions?: Array<{ value: string; label: string }>;
  className?: string;
  pagination?: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
    onPageChange: (page: number) => void;
  };
};

export function EntityTable<T extends { [key: string]: any }>({
  data,
  columns,
  searchPlaceholder,
  filterComponent,
  sortOptions,
  className = "",
  pagination,
}: EntityTableProps<T>) {
  const [sortKey, setSortKey] = React.useState(sortOptions?.[0]?.value || "");
  const [sortedData, setSortedData] = React.useState(data);

  React.useEffect(() => {
    let filtered = [...data];
    if (sortKey) {
      const col = columns.find((c) => c.id === sortKey);
      if (col) {
        filtered = [...filtered].sort((a, b) => {
          const aValue = col.accessor(a);
          const bValue = col.accessor(b);
          if (typeof aValue === "string" && typeof bValue === "string") {
            return aValue.localeCompare(bValue);
          }
          if (typeof aValue === "number" && typeof bValue === "number") {
            return aValue - bValue;
          }
          return 0;
        });
      }
    }
    setSortedData(filtered);
  }, [sortKey, data, columns]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center w-full sm:w-auto">
          {filterComponent}
        </div>
        {sortOptions && sortOptions.length > 0 && (
          <select
            className="select select-sm border border-gray-200"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn("font-semibold text-left py-2", col.className)}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No results found.
                </td>
              </tr>
            ) : (
              sortedData.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.id} className={col.className}>
                      {col.accessor(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
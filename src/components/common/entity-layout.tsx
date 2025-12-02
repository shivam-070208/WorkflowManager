"use client";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import {motion} from "motion/react"
import React from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

export const EntityWrapper = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex-1 flex flex-col gap-6 p-6 sm:p-10", className)}>
    {children}
  </div>
);

type EntityHeaderProps =
  | {
      children: React.ReactNode; // You can pass heading, subheading, etc. as children
      className?: string;
      actionLabel?: string;
      action: () => void;
      isPending?:boolean;
      actionHref?: never;
    }
    | {
      children: React.ReactNode;
      className?: string;
      isPending?:never;
      actionLabel?: string;
      action?: never;
      actionHref: string;
    };

export const EntityHeader = ({
  children,
  className = "",
  actionLabel,
  action,
  isPending,
  actionHref,
}: EntityHeaderProps) => (
  <div
    className={cn(
      "flex flex-col gap-3  sm:flex-row sm:items-center sm:justify-between",
      className,
    )}
  >
    <div>{children}</div>
    {!!actionLabel && !action && actionHref && (
      <Link href={actionHref} className=" text-primary  hover:opacity-80">
        {actionLabel}
      </Link>
    )}
    {!!actionLabel && action && (
      <Button
        onClick={action}
        variant={"outline"}
        disabled={isPending}
        className="flex font-medium hover:opacity-80"
      >
        <PlusIcon className="inline" /> {actionLabel}
      </Button>
    )}
  </div>
);

export const EntityContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("flex-1", className)}>{children}</div>;
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
  sortOptions,
  className = "",
}: EntityTableProps<T>) {
  const {sortKey} = useEntityContextValues();
  const [sortedData, setSortedData] = React.useState(data);
  React.useEffect(() => {
    let filtered = [...data];
    if (sortKey) {
      const col = columns.find((c) => c.id === sortKey);
      if (col) {
        filtered = [...filtered].sort((a, b) => {
          let aValue = col.accessor(a);
          let bValue = col.accessor(b);
          if(typeof aValue == "object"){
            aValue = a[sortKey];
          }
          if(typeof bValue == "object"){
            bValue = b[sortKey]
          }          
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
console.log(sortedData);

  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      <div className="flex flex-wrap gap-2 items-center justify-between w-full" >
        <div className="w-full sm:w-fit ">
          {!!searchPlaceholder&&(
            <Input type="text" className="w-full sm:w-100 block border border-foreground/80" placeholder={searchPlaceholder} />
          )}
        </div>
        {sortOptions && sortOptions.length > 0 && (
          <Select
            defaultValue={"Select Value"}
            onValueChange={(value) => setSortKey(value)}
          >
             <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
            {sortOptions.map((s) => (
            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedData.length === 0 ? (
            <div className="col-span-full text-center py-4 border rounded bg-muted text-muted-foreground">
              No results found.
            </div>
          ) : (
            sortedData.map((row, i) => (
              <motion.div
                animate={{ filter: "blur(0px)" }}
                initial={{ filter: "blur(10px)" }}
                transition={{ duration: 0.2}}
                layoutId={row.id}
                key={row.id}
               
              >
              
                <Card className="gap-0">
                  <CardHeader className="border-none ">
                    <CardTitle className="text-sm">
                      {columns
                        .find((col) => col.id === "name" || col.id === "title")?.accessor
                        ? columns.find((col) => col.id === "name" || col.id === "title")!.accessor(row)
                        : row.name || row.title || "Untitled"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-1 ">
                    {columns
                      .filter((col) => col.id !== "name" && col.id !== "title")
                      .map((col) => (
                        <div key={col.id}>
                          <span className="font-medium">{col.header}:</span>{" "}
                          <span>
                            {col.accessor
                              ? col.accessor(row)
                              : row[col.id] ?? ""}
                          </span>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
      {pagination && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
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

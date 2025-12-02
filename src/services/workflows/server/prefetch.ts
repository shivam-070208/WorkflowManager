import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type getAllInput = inferInput<typeof trpc.workflow.getAll>


export const prefetchWorkflows  = (params?:getAllInput)=>{
    return prefetch(trpc.workflow.getAll.queryOptions(params??{page:1,limit:10}))
}

type getByIdInput = inferInput<typeof trpc.workflow.getById>;

export const prefetchWorkflowById = (params:getByIdInput)=>{
    return prefetch(trpc.workflow.getById.queryOptions(params));
}
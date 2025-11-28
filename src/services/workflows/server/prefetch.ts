import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type Input = inferInput<typeof trpc.workflow.getAll>


export const prefetchWorkflows  = (params?:Input)=>{
    return prefetch(trpc.workflow.getAll.queryOptions(params??{page:1,limit:10}))
}
import { useTRPC } from "@/trpc/client"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"

export const useWorkflows = (params:any)=>{
    const trpc = useTRPC()
    return useSuspenseQuery(trpc.workflow.getAll.queryOptions(params))
}
export const useCreateWorkflows = () =>{
    const trpc = useTRPC();
    return useMutation(trpc.workflow.create.mutationOptions())

}
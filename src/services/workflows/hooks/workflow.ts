import { useTRPC } from "@/trpc/client"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { inferInput } from "@trpc/tanstack-react-query";



export const useWorkflows = (params: any) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflow.getAll.queryOptions(params))
}
export const useCreateWorkflows = () => {
    const trpc = useTRPC();
    return useMutation(trpc.workflow.create.mutationOptions())
}

export const useRemoveWorkflows = () => {
    const trpc = useTRPC();
    return useMutation(trpc.workflow.remove.mutationOptions())
}


export const useGetWorkflowById = (id:string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflow.getById.queryOptions({id}))
}

export const useUpdateWorkflows = () => {
    const trpc = useTRPC();
    return useMutation(trpc.workflow.updateName.mutationOptions());
}
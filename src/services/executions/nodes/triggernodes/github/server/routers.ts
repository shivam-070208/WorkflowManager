import { createTRPCRouter, ProtectedProcedure } from "@/trpc/init";
import z from "zod"
export const GithubHooksRouter = createTRPCRouter({
    generateHook:ProtectedProcedure.input(z.object({
        nodeId:z.string()
    })).mutation(async ({ctx})=>{
        return {
            
        }
    })
})